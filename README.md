# Task Dashbord - WebApp版

Outlook連携タスク管理 + 資格対策 + ニュース収集のWebアプリ。
GitHub Codespace・タブレット・スマホ等のブラウザから利用できます。

## 起動方法

### Windows
```bat
start.bat
```

### Codespace / Linux / Mac
```bash
pip install -r requirements.txt
bash start.sh
```

ブラウザで `http://localhost:8001` を開く。  
Codespaceの場合はポート転送されたURLを使用。

## ディレクトリ構成

```
task-dashboard-webapp/
├── backend/          # FastAPI バックエンド（Python）
│   ├── api/          # APIルーター
│   ├── data/         # 資格問題集（Markdown）
│   └── app.py        # エントリーポイント（静的配信も兼ねる）
├── frontend/         # フロントエンド（HTML/CSS/JS）
│   ├── assets/       # CSS・JS
│   └── pages/        # 各画面HTML
├── db/               # 設定・キャッシュ（git管理外）
├── start.bat         # Windows起動
├── start.sh          # Linux/Mac/Codespace起動
└── requirements.txt
```

## 画面一覧

| URL | 内容 |
|---|---|
| `/` | ダッシュボード（タスク一覧・ニュース） |
| `/certifications` | 資格対策（G検定/DS検定/AP/Python） |
| `/scrapbook` | スクラップブック |
| `/settings` | 設定 |

## 注意事項

- **メール同期機能**はWindowsのOutlookが必要（Codespaceでは動作しない）
- 資格問題・ニュース取得はCodespaceでも利用可能
- スクラップブックはlocalStorageに保存（ブラウザ内のみ）
