"""ニュースAPI（保険・AI・一般の3カテゴリ、RSSフィード）"""
import time
from fastapi import APIRouter, Query

router = APIRouter()

# メモリキャッシュ（カテゴリごとに最終取得時刻と結果を保持）
_cache: dict = {}
CACHE_TTL = 60 * 30  # 30分

@router.get("/")
async def get_news(category: str = Query("insurance", pattern="^(insurance|ai|general|itconsult)$")):
    now = time.time()
    cached = _cache.get(category)
    if cached and (now - cached["ts"]) < CACHE_TTL:
        return {"items": cached["data"], "cached": True}

    try:
        from services.news_service import fetch_news
        items = fetch_news(category)
        _cache[category] = {"ts": now, "data": items}
        return {"items": items, "cached": False}
    except Exception as e:
        print(f"[news_api] 取得失敗: {e}")
        return {"items": [], "error": str(e)}

@router.delete("/cache")
async def clear_cache():
    """キャッシュを強制クリア（デバッグ用）"""
    _cache.clear()
    return {"status": "cleared"}
