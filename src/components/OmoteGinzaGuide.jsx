import React, { useState } from "react";

const IMGS = {
  hero: "/images/omote-ginza/hero.jpg",
  tsubakuro: "/images/omote-ginza/tsubakuro.jpg",
  cairn: "/images/omote-ginza/cairn.jpg",
  otensho: "/images/omote-ginza/otensho.jpg",
  sunrise: "/images/omote-ginza/sunrise.jpg",
  ridge: "/images/omote-ginza/ridge.jpg",
  morning: "/images/omote-ginza/morning.jpg",
};;

const T = {
  ja: {
    tagline: "北アルプス 表銀座コース",
    title: "燕岳・大天井岳・常念岳",
    sub: "中房温泉 → 一ノ沢 2泊3日トレッキングガイド",
    s1l:"日程",s1v:"2泊3日",s2l:"最高標高",s2v:"2,922m",s3l:"難易度",s3v:"中級",s4l:"ベストシーズン",s4v:"夏・秋",
    hSec:"魅力",
    hItems:[
      {title:"燕岳の花崗岩と白砂",body:"独特の白い花崗岩と砂が織りなす燕岳山頂は、北アルプスの中でも特に個性的な風景。雲の中に浮かぶ燕山荘の赤い屋根が目印。"},
      {title:"燕山荘からの稜線",body:"燕山荘から大天井岳までの稜線歩きは圧巻。左右に深い谷を抱えながら天空の縦走路を歩く感覚は唯一無二。"},
      {title:"大天井岳から槍を望む",body:"大天井岳頂上（標高2,922m）からは槍ヶ岳がすぐ目の前。本来の表銀座コースはここから槍ヶ岳へと続く。"},
      {title:"常念岳のご来光",body:"常念岳山頂から見る夜明け。雲海の上に無数の山並みが浮かぶ光景は、登ってきた人だけが見られる絶景。"},
    ],
    gSec:"装備",
    gNote:"山小屋に食堂・売店・アルコールあり。荷物は最小限に絞るのがこのルートの鉄則。",
    gMust:"必須装備",
    gItems:["ゴアテックス レインウェア","ビブラムソール登山靴","薄手ダウンジャケット（夜は冷える）","速乾性インナーウェア"],
    gTip:"食料・調理器具は不要。荷物を軽くすることで快適な稜線歩きが実現します。",
    aSec:"アクセス",
    aRows:[
      {label:"スタート",val:"中房温泉登山口（長野県安曇野市）"},
      {label:"ゴール",val:"一ノ沢登山口（長野県安曇野市）"},
      {label:"最寄り駅",val:"JR大糸線 穂高駅"},
      {label:"交通",val:"穂高駅からバスまたはタクシーで中房温泉へ（約1時間）"},
      {label:"ポイント",val:"朝イチで中房温泉に着けば2泊3日で完走可能"},
    ],
    rSec:"ルート & タイム",
    days:[
      {label:"Day 1",stops:[
        {name:"中房温泉登山口",note:"早朝スタート推奨",type:"start"},
        {name:"合戦小屋",note:"名物スイカが有名",type:"mid"},
        {name:"燕岳 2,763m",note:"約4〜5時間。花崗岩の個性的な山頂",type:"summit"},
        {name:"燕山荘 泊",note:"稜線上の快適な山小屋。星空観察",type:"hut"},
      ]},
      {label:"Day 2",stops:[
        {name:"燕山荘 出発",note:"早朝出発",type:"start"},
        {name:"大天井岳 2,922m",note:"約3〜4時間の稜線歩き。槍ヶ岳の眺望",type:"summit"},
        {name:"常念小屋 泊",note:"常念乗越。翌朝のご来光に備える",type:"hut"},
      ]},
      {label:"Day 3",stops:[
        {name:"常念岳 2,857m",note:"早朝アタック。山頂でご来光",type:"summit"},
        {name:"一ノ沢登山口",note:"下山約3〜4時間。ゴール",type:"goal"},
      ]},
    ],
    mSec:"ルートマップ",
    rvSec:"感想",
    rvText:"燕山荘から大天井岳への稜線は、歩いても歩いても飽きない。北アルプスの懐の深さをこれほど体感できるルートは他にない。本来の表銀座コースは槍ヶ岳まで続くが、それは体力と時間に余裕のある方へのお楽しみ。まずはこの2泊3日で日本アルプスの真髄を体感してほしい。秋の紅葉シーズンも絶景とのこと——ぜひ再訪したい。マナーを守って、安全に挑戦を。",
    rvNote:"槍ヶ岳延長コースは体力・日数に余裕のある中〜上級者向け",
  },
  en: {
    tagline: "Northern Japan Alps",
    title: "Omote-Ginza Ridge Trail",
    sub: "Nakafusa Onsen → Ichinosawa · 2-Night / 3-Day Trekking Guide",
    s1l:"Duration",s1v:"2 nights / 3 days",s2l:"Max Elevation",s2v:"2,922m",s3l:"Level",s3v:"Intermediate",s4l:"Best Season",s4v:"Summer / Autumn",
    hSec:"Highlights",
    hItems:[
      {title:"Granite & White Sand of Tsubakuro",body:"Mt. Tsubakuro's summit is defined by striking white granite and sand — unlike any other peak in the Northern Alps. The red-roofed Enzanso hut appears like a beacon in the clouds."},
      {title:"The Enzanso Ridge Walk",body:"The ridge from Enzanso hut to Mt. Otensho is unforgettable. Walking a sky-high path with deep valleys on both sides, surrounded by 3,000m peaks — a truly rare experience."},
      {title:"Yarigatake View from Otensho",body:"From Mt. Otensho's summit (2,922m), Mt. Yari pierces the sky directly ahead. The full Omote-Ginza route continues from here to Yarigatake."},
      {title:"Sunrise from Mt. Jonen",body:"Dawn from the summit of Mt. Jonen. A sea of clouds stretches endlessly below, mountain silhouettes emerging in layers — a scene only those who make the climb will ever see."},
    ],
    gSec:"Gear",
    gNote:"Mountain huts provide full dining, snacks and drinks — pack as light as possible.",
    gMust:"Essential gear",
    gItems:["GORE-TEX Rain Jacket","Vibram Sole Hiking Boots","Light Down Jacket (nights get cold)","Quick-Dry Base Layer"],
    gTip:"No need to carry food or cooking gear. A lighter pack makes the ridge walk dramatically more comfortable.",
    aSec:"Access",
    aRows:[
      {label:"Start",val:"Nakafusa Onsen Trailhead, Azumino, Nagano"},
      {label:"Exit",val:"Ichinosawa Trailhead, Azumino, Nagano"},
      {label:"Nearest Station",val:"JR Oito Line — Hotaka Station"},
      {label:"Transport",val:"Bus or taxi from Hotaka Station to Nakafusa Onsen (~1 hour)"},
      {label:"Key Tip",val:"Arrive at Nakafusa Onsen early morning to complete in 2 nights / 3 days"},
    ],
    rSec:"Route & Timeline",
    days:[
      {label:"Day 1",stops:[
        {name:"Nakafusa Onsen Trailhead",note:"Early morning start recommended",type:"start"},
        {name:"Gassen Hut",note:"Famous for fresh watermelon at the rest stop",type:"mid"},
        {name:"Mt. Tsubakuro 2,763m",note:"Approx. 4–5 hrs. Iconic granite summit",type:"summit"},
        {name:"Stay at Enzanso Hut",note:"Comfortable ridge hut. Stargazing at night",type:"hut"},
      ]},
      {label:"Day 2",stops:[
        {name:"Depart Enzanso",note:"Early morning departure",type:"start"},
        {name:"Mt. Otensho 2,922m",note:"Approx. 3–4 hrs ridge walk. Views of Yarigatake",type:"summit"},
        {name:"Stay at Jonen Hut",note:"At Jonen Pass. Rest before the sunrise climb",type:"hut"},
      ]},
      {label:"Day 3",stops:[
        {name:"Mt. Jonen 2,857m",note:"Early morning summit push. Sunrise at the top",type:"summit"},
        {name:"Ichinosawa Trailhead",note:"Descent approx. 3–4 hrs. Journey complete",type:"goal"},
      ]},
    ],
    mSec:"Route Map",
    rvSec:"Personal Review",
    rvText:"The ridge from Enzanso to Mt. Otensho never gets old. No other route gives you this deep sense of the Northern Alps' true scale. The full Omote-Ginza trail continues to Yarigatake — save that for when fitness and time allow. For now, these 3 days deliver the real essence of the Japanese Alps. Autumn foliage is reportedly spectacular too — this trail deserves a return visit. Respect the mountain, stay safe, and take on the challenge.",
    rvNote:"Extension to Yarigatake recommended for experienced hikers with extra time",
  },
};

const typeColor = {
  start: "#4caf80", summit: "#d4a843", hut: "#3b8bd0", mid: "#888", goal: "#4caf80"
};

export default function OmoteGinzaGuide() {
  const [lang, setLang] = useState("ja");
  const d = T[lang];

  return (
    <div style={{fontFamily:"Georgia, serif", color:"var(--color-text-primary)", maxWidth:680}}>

      {/* Hero */}
      <div style={{position:"relative", borderRadius:16, overflow:"hidden", marginBottom:"1.5rem", height:320}}>
        <img src={IMGS.hero} alt="燕岳頂上" style={{width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%"}} />
        <div style={{position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)"}}>
          <div style={{position:"absolute", bottom:0, left:0, right:0, padding:"1.5rem"}}>
            <p style={{fontSize:11, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)", marginBottom:6}}>{d.tagline}</p>
            <h1 style={{fontSize:24, fontWeight:700, color:"white", lineHeight:1.2, margin:"0 0 6px"}}>{d.title}</h1>
            <p style={{fontSize:13, color:"rgba(255,255,255,0.8)", margin:0}}>{d.sub}</p>
          </div>
        </div>
        <div style={{position:"absolute", top:12, right:12, display:"flex", gap:6}}>
          {["ja","en"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding:"5px 14px", borderRadius:20, fontSize:12, fontWeight:500, cursor:"pointer",
              border: lang===l ? "1.5px solid white" : "1px solid rgba(255,255,255,0.4)",
              background: lang===l ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)",
              color: "white", backdropFilter:"blur(4px)"
            }}>{l==="ja" ? "日本語" : "English"}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:"1.5rem"}}>
        {[
          [d.s1l,d.s1v],[d.s2l,d.s2v],[d.s3l,d.s3v],[d.s4l,d.s4v]
        ].map(([label,val]) => (
          <div key={label} style={{background:"var(--color-background-secondary)", borderRadius:10, padding:"12px 10px", textAlign:"center"}}>
            <p style={{fontSize:10, color:"var(--color-text-secondary)", marginBottom:4, letterSpacing:"0.05em"}}>{label}</p>
            <p style={{fontSize:15, fontWeight:600, margin:0}}>{val}</p>
          </div>
        ))}
      </div>

      {/* Highlights */}
      <Section title={d.hSec}>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
          {d.hItems.map((h,i) => {
            const imgKey = ["tsubakuro","cairn","otensho","sunrise"][i];
            return (
              <div key={i} style={{borderRadius:12, overflow:"hidden", border:"0.5px solid var(--color-border-tertiary)"}}>
                <img src={IMGS[imgKey]} alt={h.title} style={{width:"100%", height:120, objectFit:"cover"}} />
                <div style={{padding:"10px 12px"}}>
                  <p style={{fontSize:13, fontWeight:600, margin:"0 0 4px"}}>{h.title}</p>
                  <p style={{fontSize:12, color:"var(--color-text-secondary)", lineHeight:1.6, margin:0}}>{h.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Gear */}
      <Section title={d.gSec}>
        <p style={{fontSize:13, color:"var(--color-text-secondary)", marginBottom:12}}>{d.gNote}</p>
        <p style={{fontSize:11, color:"var(--color-text-secondary)", marginBottom:8, letterSpacing:"0.08em", textTransform:"uppercase"}}>{d.gMust}</p>
        <div style={{display:"flex", flexWrap:"wrap", gap:6, marginBottom:12}}>
          {d.gItems.map(g => (
            <span key={g} style={{
              fontSize:12, fontWeight:500, padding:"4px 12px", borderRadius:20,
              background:"var(--color-background-info)", color:"var(--color-text-info)"
            }}>{g}</span>
          ))}
        </div>
        <div style={{background:"var(--color-background-secondary)", borderRadius:10, padding:"10px 14px"}}>
          <p style={{fontSize:13, margin:0, lineHeight:1.7}}>{d.gTip}</p>
        </div>
      </Section>

      {/* Access */}
      <Section title={d.aSec}>
        <div style={{display:"flex", flexDirection:"column"}}>
          {d.aRows.map((row,i) => (
            <div key={i} style={{display:"flex", gap:16, padding:"8px 0", borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
              <p style={{fontSize:12, color:"var(--color-text-secondary)", width:80, flexShrink:0, margin:0, paddingTop:1}}>{row.label}</p>
              <p style={{fontSize:13, margin:0, lineHeight:1.6}}>{row.val}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Route Timeline */}
      <Section title={d.rSec}>
        {d.days.map((day,di) => (
          <div key={di} style={{marginBottom: di < d.days.length-1 ? 20 : 0}}>
            <span style={{
              fontSize:11, fontWeight:600, padding:"3px 12px", borderRadius:20,
              background:"var(--color-background-secondary)", color:"var(--color-text-secondary)",
              display:"inline-block", marginBottom:10, letterSpacing:"0.05em"
            }}>{day.label}</span>
            {day.stops.map((stop, si) => (
              <div key={si} style={{display:"flex", gap:12, marginBottom: si < day.stops.length-1 ? 0 : 0}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:14}}>
                  <div style={{
                    width:12, height:12, borderRadius:"50%", flexShrink:0,
                    background: typeColor[stop.type], marginTop:3
                  }} />
                  {si < day.stops.length-1 && <div style={{width:1, flex:1, background:"var(--color-border-secondary)", minHeight:24}} />}
                </div>
                <div style={{paddingBottom:16, flex:1}}>
                  <p style={{fontSize:14, fontWeight:600, margin:"0 0 2px"}}>{stop.name}</p>
                  <p style={{fontSize:12, color:"var(--color-text-secondary)", margin:0}}>{stop.note}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </Section>

      {/* Map */}
      <Section title={d.mSec}>
        <div style={{borderRadius:12, overflow:"hidden", border:"0.5px solid var(--color-border-tertiary)", height:280}}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d51835.5!2d137.6520!3d36.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e2!4m5!1s0x601d22b0d0ee2e6b%3A0x8cc9d4e26b2d7c4f!2z5Lit5oBl5rip5rOJ!5m2!1sja!2sjp!4m5!1s0x601d226b2b0d9e4f%3A0xc2a5f7c1a0b8e291!2z54iy5bKh!5m2!1sja!2sjp!4m5!1s0x601d1f0a73f87e3b%3A0xef5629c3f9a1e2d0!2z5bi455Sw5bKh!5m2!1sja!2sjp&t=p"
            style={{width:"100%", height:"100%", border:"none"}}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>

      {/* Review */}
      <div style={{
        position:"relative", borderRadius:16, overflow:"hidden", marginBottom:"1.5rem"
      }}>
        <img src={IMGS.morning} alt="稜線の朝" style={{width:"100%", height:200, objectFit:"cover", objectPosition:"center 30%"}} />
        <div style={{position:"absolute", inset:0, background:"rgba(10,18,40,0.72)"}} />
        <div style={{position:"relative", padding:"1.5rem"}}>
          <p style={{fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:10}}>{d.rvSec}</p>
          <p style={{fontSize:14, lineHeight:1.9, color:"rgba(255,255,255,0.9)", margin:"0 0 12px"}}>{d.rvText}</p>
          <p style={{fontSize:11, color:"rgba(255,255,255,0.4)", margin:0}}>※ {d.rvNote}</p>
        </div>
      </div>

    </div>
  );
}

function Section({title, children}) {
  return (
    <div style={{
      background:"var(--color-background-primary)",
      border:"0.5px solid var(--color-border-tertiary)",
      borderRadius:14, padding:"1rem 1.25rem", marginBottom:"1rem"
    }}>
      <p style={{fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--color-text-secondary)", marginBottom:14}}>{title}</p>
      {children}
    </div>
  );
}
