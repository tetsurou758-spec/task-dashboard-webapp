"""バックエンドエントリーポイント（FastAPI + 静的ファイル配信）"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from api import tasks_router, news_router, settings_router, sync_router, certifications_router

app = FastAPI(title="Task Dashbord API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router, prefix="/api/tasks")
app.include_router(news_router, prefix="/api/news")
app.include_router(settings_router, prefix="/api/settings")
app.include_router(sync_router, prefix="/api/sync")
app.include_router(certifications_router, prefix="/api/certifications")

# フロントエンド静的ファイル配信（APIルートの後にマウント）
_root = Path(__file__).parent.parent  # プロジェクトルート
_frontend = _root / "frontend"

@app.get("/")
async def index():
    return FileResponse(str(_frontend / "pages" / "dashboard.html"))

@app.get("/certifications")
async def certifications():
    return FileResponse(str(_frontend / "pages" / "certifications.html"))

@app.get("/scrapbook")
async def scrapbook():
    return FileResponse(str(_frontend / "pages" / "scrapbook.html"))

@app.get("/settings")
async def settings_page():
    return FileResponse(str(_frontend / "pages" / "settings.html"))

# CSS/JS/画像などの静的アセット
if _frontend.exists():
    app.mount("/assets", StaticFiles(directory=str(_frontend / "assets")), name="assets")

if __name__ == "__main__":
    port = int(os.getenv("BACKEND_PORT", 8001))
    # 0.0.0.0でリッスン → Codespace/タブレットからもアクセス可能
    host = os.getenv("BACKEND_HOST", "0.0.0.0")
    uvicorn.run(app, host=host, port=port, reload=False)
