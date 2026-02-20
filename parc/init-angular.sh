#!/bin/sh
set -eu

echo "Installation des packages NPM"
if [ ! -d node_modules ]; then
  npm ci --legacy-peer-deps
else
  # Ensure platform-specific native binaries are present (e.g. rollup on Linux)
  npm install --prefer-offline --no-audit --no-fund 2>/dev/null || npm ci --legacy-peer-deps
fi

echo "Done..."
echo "Angular initialisé..."

exec npm run serve
