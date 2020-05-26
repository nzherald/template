#!/bin/bash

# This needs aws-cli, pyjwt and jq to run

set -e

dir=${PWD##*/}

R -e "drake::r_make()"

aws s3 sync docs/ s3://nzh-preview.newsapps.nz/$dir/ --size-only

FUNC=$(aws --region us-east-1 \
  lambda get-function-configuration \
  --function-name arn:aws:lambda:us-east-1:990264032570:function:nzh-analysis-preview-prod-get)

SECRET=$(echo $FUNC | jq  -r '.Environment.Variables.SECRET')
TOKEN=$(pyjwt --key=${SECRET[@]} encode sub=$dir exp=$(date -v+1w +%s))

echo "https://dev.pinpoint.io/$dir/?token=$TOKEN"
