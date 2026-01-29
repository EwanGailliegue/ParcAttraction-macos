#!/bin/sh
set -eu

echo "Installation des packages NPM"
if [ ! -d node_modules ]; then
  npm ci --legacy-peer-deps
fi

echo "Done..."
echo "Angular initialisé..."

exec npm run serve
