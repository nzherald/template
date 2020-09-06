#!/bin/sh

set -ex

homepage=$(jq -r .homepage <package.json)
s3bucket="s3://s3.newsapps.nz/${homepage##https://insights.nzherald.co.nz/}"

aws --profile nzherald s3 sync \
  server $s3bucket \
  --acl=public-read \
  --cache-control max-age=2592000,public \
  --size-only \
  --exclude "*" \
  --include "*.png" \
  --include "*.svg" \
  --include "*.jpg"
