#!/bin/sh

set -ex

s3bucket="s3://s3.newsapps.nz/apps/2020/ece-map/"

 aws s3 sync \
   dist $s3bucket \
   --acl=public-read \
   --cache-control max-age=2592000,public \
   --size-only \
   --exclude "embed.*" \
   --exclude "*.html"

aws s3 cp --recursive \
  --acl=public-read \
  --cache-control max-age=60,public \
  --exclude "*" \
  --include "embed.*" \
  --include "*.html" \
  dist/ $s3bucket
