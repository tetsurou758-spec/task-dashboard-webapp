#!/bin/bash
# Codespace / Linux / Mac 起動スクリプト

cd "$(dirname "$0")"

echo "[1] ポート8001を解放..."
fuser -k 8001/tcp 2>/dev/null || true

echo "[2] バックエンド起動..."
echo ">>> http://localhost:8001 をブラウザで開いてください <<<"
python backend/app.py
