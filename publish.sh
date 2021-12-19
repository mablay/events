#!/bin/bash

v="${1:-patch}"
# rm -rf node_modules
# npm install
npm run build
npm test
tag=`npm version $v`
echo "publishing $tag"
# git push && git push --tags
npm publish --access=public
