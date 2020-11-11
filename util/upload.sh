#!/bin/sh

set -ex

homepage=$(node -e "const {homepage} = require('./package.json'); console.log(homepage)")
s3bucket="s3://s3.newsapps.nz/${homepage##https://insights.nzherald.co.nz/}"

aws --profile nzherald s3 sync \
  dist $s3bucket \
  --acl=public-read \
  --cache-control max-age=2592000,public \
  --size-only \
  --exclude "embed.*" \
  --exclude "*.html"

aws --profile nzherald s3 cp --recursive \
  --acl=public-read \
  --cache-control max-age=60,public \
  --exclude "*" \
  --include "embed.*" \
  --include "*.html" \
  dist/ $s3bucket
