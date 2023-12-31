#!/bin/sh

set -e

pnpm i --no-frozen-lockfile
pnpm update:version

pnpm build

cd dist/farst-three
npm publish
cd -

cd internal/eslint-config
npm publish
cd -

# cd internal/metadata
# pnpm build
# npm publish
# cd -

echo "✅ Publish completed"
