---
title: "手動アップロードの名残をゼロに：hikarinotama.com を2日でGitOps化した記録"
description: "Macのフォルダから手でアップしていたサイトをGitHub起点の自動デプロイへ移し、www転送・使わないメールのなりすまし対策・ブログとEmDashのサブドメイン追加・旧プロジェクト削除までを2日でやりきった作業ログ。"
pubDate: 2026-10-20
tags: ["Cloudflare", "GitOps", "DNS", "Astro", "EmDash", "SPF", "DMARC"]
lang: "ja"
heroImage: "/images/hikarinotama-gitops-hero.jpg"
---

## はじめに

自分のドメイン `hikarinotama.com` を久しぶりに覗いてみたら、思っていたより散らかっていた。

- サイトは**Macのフォルダから手動アップロード**で公開されていて、GitHubに原本がない
- `www` を付けると**壊れた古いサーバー**に飛ぶ
- 使っていないはずの**メール設定**がDNSに残っている

OpenShiftの現場では「Gitにあるものが正、手作業は最小限」というGitOpsの考え方で動いている。それなのに自分の個人ドメインは真逆の運用だった。紺屋の白袴である。

この記事は、それを2日かけて片付けた作業ログだ。

## 全体像：作業前と作業後

```
【作業前】
hikarinotama.com
  ├── @      → Pages（Macから手動アップ）  ← 原本がMacの中だけ
  ├── www    → 壊れた旧サーバー（nginxエラー）
  └── メール  → 使っていないのにMX・SPFが旧サーバーを指したまま

【作業後】
hikarinotama.com（Cloudflare DNS）
  ├── @      → Pages「hikarinotama-dev」   本店（GitHub連携）
  ├── www    → 301で本店へ                  門番
  ├── blog   → Pages「myfavorite-com」     ブログ（GitHub連携・PRで更新）
  ├── lab    → Workers「emdash-lab」       EmDash練習場（GitHub連携・D1/R2）
  └── メール  → SPF -all ＋ DMARC reject    なりすまし防止
DNSの変更履歴 … リポジトリの dns/ フォルダにコミット
```

たとえるなら、1つの土地に**本店・ブログ館・実験工房**の3棟を建て、すべての設計図を**GitHubという金庫**にしまった、という状態だ。

## 0. 原本をMacからGitHubへ移す

最初にやったのは、Macにしかなかったサイトのソースを**privateリポジトリ**に上げること。

1. コミット履歴はローカルにあったので、秘密情報が追跡されていないか確認してからGitHubへpush
2. Cloudflare Pagesに**GitHub連携の新プロジェクト**を作成（フレームワークはAstroプリセット）
3. 独自ドメインを旧プロジェクトから新プロジェクトへ付け替え
4. 試しにページタイトルを1行変えてpush → 自動でビルド・デプロイされることを確認

これで「正しい設計図（source of truth）」の置き場所が**MacからGitHubに移った**。Macが壊れても、リポジトリをつなぎ直せば同じサイトを建て直せる。

## 1. www を本店へ301転送

`www.hikarinotama.com` は古いレンタルサーバーを指したままで、開くとnginxのエラーが出ていた。

- Cloudflareの**Redirect Rules**で `www` → `https://hikarinotama.com` へ301転送
- 転送が効くことを確認してから、古いAレコードを**ダミーのAAAA（`100::`）**に置き換え

ルールはDNSのレコードが「プロキシ経由（オレンジ雲）」でないと発動しないので、行き先のないダミーを置いて**Cloudflareに一度受け取らせる**のがポイント。

```bash
curl -sI https://www.hikarinotama.com | head -3
# HTTP/2 301
# location: https://hikarinotama.com/
```

## 2. 使っていないメールの片付けとなりすまし対策

このドメインでメールは使っていない。だからMXを消して終わり……ではない。

| 設定 | 役割 | 対応 |
|---|---|---|
| MX | どこで**受け取る**か | 削除 |
| SPF | どこから**送ってよい**か | `v=spf1 -all`（どこからも送らない） |
| DMARC | ニセモノを**どう扱うか** | `p=reject`（捨ててください） |

MXを消しても、誰かが `○○@hikarinotama.com` を名乗ってメールを**送ること**自体は止められない。止めるには、郵便局に「うちは手紙を出さない家です。うちの名前の手紙は全部ニセモノなので捨ててください」と**届け出ておく**必要がある。それがSPFとDMARCだ。

**メールを使わないドメインほど、SPF/DMARCは大事。** 使っていない家は、持ち主が気づかないうちに悪用されやすいからだ。

## 3. ブログを blog.hikarinotama.com に

このブログ（myfavorite.com）のPagesプロジェクトに、カスタムドメイン `blog.hikarinotama.com` を追加した。

ついでに見つかったのが、Astroの設定ファイルの `site:` がテンプレートの初期値 `example.com` のままだった問題。RSSやOGPのURLがおかしくなる原因になる。

ここで初めて、**ブランチを切ってPRを出してマージする**流れを自分で通した。

```bash
git switch -c fix/site-url
# astro.config.mjs の site を修正
git commit -m "config: set site url"
git push -u origin fix/site-url
# GitHubでPR作成 → 差分確認 → マージ
```

mainに直接pushしていた頃と比べると、**変更が「差分」という形で一度目に入る**のが安心感につながる。現場で毎日やっているレビューの意味が、自分のリポジトリで腹に落ちた。

## 4. lab.hikarinotama.com に EmDash を建てる

CloudflareのCMS「EmDash」の練習場を、Macでゼロから作り直した。

- privateリポジトリを作り、**Cloudflare WorkersのGit連携**で自動デプロイ
- データベースは**D1**、画像置き場は**R2**（R2は無料枠でも支払い方法の登録が必要だった）
- 他と名前がぶつからないよう、リソース名は `emdash-lab` で統一
- `wrangler.jsonc` の `routes` で `lab.hikarinotama.com` を割り当て
- 管理者の初期設定は**本番ドメイン上で**パスキー登録（プレビューURLで登録すると本番で使えない）
- 設定後、`workers.dev` とプレビューURLは無効化して入口を1つに

ちなみにこのブログ本体は、EmDashに移さずMarkdown＋Gitのままにしている。EmDashは**データベースが正**、このブログは**Gitが正**。どちらが優れているかではなく、**設計思想が違う**ので用途で使い分ける。

## 5. DNSの変更履歴もGitで残す

DNSを触るたびに、Cloudflareの画面から**Export**（今のDNSを丸ごとテキストで書き出し）して、サイトのリポジトリの `dns/` フォルダにコミットした。

```bash
cp ~/Downloads/hikarinotama.com.txt dns/hikarinotama.com.zone
git --no-pager diff
git commit -am "dns: add blog and lab subdomains"
git push
```

本格的にやるならTerraformなどでDNS自体をコードで管理するところだが、まずは**「いつ何を変えたか」がGitの履歴で追える**だけでも大きい。アルバムに写真を1枚ずつ貼っていくイメージだ。

## 6. 旧プロジェクトの削除（1日置いてから）

最後に、手動アップロード時代の旧Pagesプロジェクトを削除した。すぐには消さず、**新しい本店が一晩問題なく動いたのを見てから**にした。

消す前の確認は3つ。

1. 本店が `HTTP/2 200` を返している
2. 旧プロジェクトのCustom domainsが**空**（看板が外れている）
3. 削除画面のプロジェクト名が旧のほう（`-site`）で、新（`-dev`）と取り違えていない

削除後、旧プロジェクトの `pages.dev` アドレスは**名前ごと引けなくなった**。404すら返らない、番地そのものが地図から消えた状態だ。

ここで「Cloudflareのプロジェクトを消したら、GitHubのリポジトリも消えるのでは？」と一瞬不安になった。答えは**消えない**。GitHubが原本（source of truth）で、Cloudflareはそれを**読み取って店を建てる大工**にすぎない。大工さんとの契約を解いても、金庫の中の設計図には指一本触れられない。

## 振り返り

| 学び | 一言で |
|---|---|
| GitOps | 原本の置き場所を決めると、壊すのも建て直すのも怖くなくなる |
| SPF/DMARC | 使わないドメインこそ「出さない家です」と届け出る |
| PR | 個人リポジトリでも、差分を一度目で見る価値がある |
| 削除 | 1日置く、名前を声に出して確認する |
| DNSキャッシュ | 反映されないときは `dig @<Cloudflareのネームサーバー>` で権威側を直接見る |

現場で学んだGitOpsを、自分の小さな土地に持ち帰って実践できた2日間だった。手動アップロードの名残はこれでゼロ。次は `lab` のEmDashで、データベースを定期的にエクスポートしてGitに残す仕組みを試してみたい。
