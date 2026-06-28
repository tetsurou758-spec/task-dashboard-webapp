/**
 * ニュース取得 - バックエンドAPI経由（WebApp版）
 * fetchNewsForCategory() はバックエンドの /api/news/ を呼び出す
 * フロントエンド直接RSSはCORSエラーになるため使用しない
 */

const RSS_SOURCES = {
  insurance: [
    // 直接RSS（実URLが取得できるため本文スクレイピング可能）
    { url: "https://www.fsa.go.jp/news/rss.xml",                   source: "金融庁",        keywords: ["保険", "損保", "生保", "代理店", "金融"] },
    { url: "https://prtimes.jp/rss/keyword/損害保険.rss",           source: "PR TIMES",      keywords: [] },
    { url: "https://prtimes.jp/rss/keyword/保険代理店.rss",         source: "PR TIMES",      keywords: [] },
    { url: "https://www.itmedia.co.jp/news/subtop/industry/rss.xml", source: "ITmedia 産業", keywords: ["保険", "損保", "生保", "フィンテック", "InsurTech"] },
    // Google News（幅広い記事収集用・本文はブラウザ参照）
    { url: "https://news.google.com/rss/search?q=損害保険+生命保険&hl=ja&gl=JP&ceid=JP:ja", source: "Google News", keywords: [] },
    { url: "https://news.google.com/rss/search?q=損保+代理店+保険業法&hl=ja&gl=JP&ceid=JP:ja", source: "Google News", keywords: [] },
  ],
  ai: [
    { url: "https://gigazine.net/news/rss_2.0/",            source: "Gigazine",        keywords: ["AI", "人工知能", "ChatGPT", "Claude", "Gemini", "生成AI", "LLM"] },
    { url: "https://jp.techcrunch.com/feed/",               source: "TechCrunch Japan", keywords: ["AI", "人工知能", "OpenAI", "Anthropic", "Google", "Microsoft"] },
    { url: "https://www.itmedia.co.jp/news/subtop/aiplus/index.rdf", source: "ITmedia AI+", keywords: ["AI", "人工知能", "機械学習"] },
  ],
  general: [
    { url: "https://news.yahoo.co.jp/rss/topics/top-picks.xml", source: "Yahoo!ニュース",         keywords: [] },
    { url: "https://news.yahoo.co.jp/rss/topics/business.xml",  source: "Yahoo!ニュース ビジネス", keywords: [] },
  ],
  itconsult: [
    { url: "https://www.itmedia.co.jp/enterprise/subtop/features/rss.xml", source: "ITmedia エンタープライズ", keywords: ["DX", "デジタル", "クラウド", "コンサル", "システム", "SAP", "ERP", "導入", "IT"] },
    { url: "https://japan.zdnet.com/rss/index.rdf",          source: "ZDNet Japan",     keywords: ["DX", "デジタル変革", "クラウド", "コンサル", "IT戦略", "システム", "導入", "アクセンチュア", "デロイト"] },
    { url: "https://rss.itmedia.co.jp/rss/2.0/ait.xml",     source: "@IT",             keywords: ["DX", "クラウド", "システム", "開発", "導入", "IT基盤", "ERP", "SAP"] },
    { url: "https://xtech.nikkei.com/rss/index.rdf",         source: "日経クロステック", keywords: ["DX", "デジタル変革", "ITコンサル", "システム導入", "クラウド", "NTTデータ", "富士通", "アクセンチュア"] },
  ],
};

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').trim();
}

function makeId(str) {
  let h = 0;
  for (let c of str) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return Math.abs(h).toString(16);
}

async function fetchNewsForCategory(category) {
  // バックエンド /api/news/ 経由で取得（サーバー側でRSSをフェッチするのでCORS問題なし）
  try {
    const res = await fetch(`/api/news/?category=${encodeURIComponent(category)}`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch (e) {
    console.warn('[News] バックエンド取得失敗:', e.message);
    return [];
  }
}

// グローバルに公開
window.fetchNewsForCategory = fetchNewsForCategory;
