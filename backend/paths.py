"""パス解決ユーティリティ（WebApp版）

- DATA_DIR  : 問題集など読み取り専用の同梱データ（backend/data）
- DB_DIR    : 設定・キャッシュなど書き込みデータ（プロジェクトルート/db）
"""
import os
import sys


def data_dir() -> str:
    """読み取り専用の同梱データディレクトリ（questions_*.md 等）"""
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")


def db_dir() -> str:
    """書き込み用ディレクトリ（settings.json / outlook_cache.json 等）"""
    d = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "db")
    os.makedirs(d, exist_ok=True)
    return d
