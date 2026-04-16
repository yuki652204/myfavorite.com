---
title: "WordPressからAstro＋Cloudflare Pagesに移行してみた"
description: "長年使っていたWordPressをAstro製の静的サイトに移行し、Cloudflare Pagesで無料公開するまでの記録です。"
pubDate: "2026-04-16"
heroImage: ""
---

# WordPressからAstro＋Cloudflare Pagesに移行してみた

長年お世話になったWordPressに別れを告げ、**Astro**という静的サイトジェネレーターに移行しました。サーバー代は実質ゼロ、表示速度は爆速。移行作業の全記録をまとめます。

## なぜWordPressをやめたのか

WordPressは優秀なCMSです。プラグインで何でもできるし、管理画面も直感的。でも使い続けるうちに、いくつかの不満が積み重なってきました。

- **サーバー代がかかる** ── 月数百円とはいえ、個人ブログに払い続けるのは地味にしんどい
- **セキュリティ対応が面倒** ── プラグインのアップデート、PHPのバージョン管理、不正アクセス対策
- **表示が遅い** ── PHPで動的にページを生成するため、どうしてもレスポンスに時間がかかる
- **バックアップが怖い** ── データベースが壊れたら全滅

「個人ブログなのに、こんなに管理コストをかけなくていいのでは？」と思い始めたのが移行のきっかけです。

## Astroを選んだ理由

調べていくつかの選択肢（Hugo、Next.js、Gatsby）を比較した結果、**Astro**に決めました。

| | Astro | Hugo | Next.js |
|---|---|---|---|
| 学習コスト | 低〜中 | 低 | 高 |
| 表示速度 | ⚡ 爆速 | ⚡ 爆速 | 普通 |
| JavaScript | 必要な分だけ | ほぼ不要 | 多め |
| ブログ向き | ✅ 得意 | ✅ 得意 | △ |

Astroの最大の特徴は**「必要なJavaScriptだけを送り出す」**設計。静的HTMLを吐き出すので、表示がとにかく速い。

## 移行の流れ

### 1. WordPressからXMLエクスポート

WordPress管理画面 → ツール → エクスポートで全データをXMLファイルに書き出します。

### 2. 画像を一括ダウンロード

WordPressのメディアライブラリにある画像を、`wget`コマンドで一括取得しました。今回は**1,523ファイル**をダウンロード。

```bash
wget -r -np -nd -A jpg,jpeg,png,gif,webp \
  https://自分のサイト/wp-content/uploads/ \
  -P ./public/images/
```

### 3. Astroプロジェクトをセットアップ

```bash
npm create astro@latest my-site
cd my-site
npm install
```

ブログテンプレートを選択すると、すぐに動く雛形ができあがります。

### 4. XMLをMarkdownに変換

`wpxml2md`というツールを使って、WordPressの記事をMarkdownファイルに一括変換しました。

```bash
npx wpxml2md WordPress_export.xml -o ./src/content/blog
```

25件の記事が一気にMarkdownになります。

### 5. 画像パスを修正

変換後のMarkdownには旧WordPressのURLが残っていたので、Pythonスクリプトで一括置換しました。

### 6. Cloudflare PagesにデプロイしてGitHubと連携

Cloudflare Pagesは**GitHubリポジトリと連携するだけで自動デプロイ**が動きます。
eof
