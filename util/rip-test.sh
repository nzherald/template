#!/bin/bash
# Rips a designated test page from the NZH site and turns it into a local test page
WRK_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DST_DIR=$WRK_DIR/../.nzh-rip
if [[ -z $1 || $1 == "normal" ]]
then
    echo "Ripping normal premium (dj-t2) page..."
    NZH_URL="https://www.nzherald.co.nz/nz/dj-t2/DEYOM6DGQCKKAQ4WBYJB5UJAHU/"
elif [[ $1 == "bigread" ]]
then
    echo "Ripping big-read premium (dj-t3) page..."
    NZH_URL="https://www.nzherald.co.nz/nz/dj-t3/OH4O2PVLHHNA2UY7MHWH55CUOQ/"
else
    echo "Not a valid page type to rip. Choose \"normal\" or \"bigread\"."
    exit 1
fi

cd $DST_DIR
rm -r $DST_DIR/*
wget --convert-links -nv --domains www.nzherald.co.nz $NZH_URL
wget --convert-links -nv --domains www.nzherald.co.nz https://www.nzherald.co.nz/pf/dist/components/combinations/default.js
nodejs $WRK_DIR/rip-test.js $DST_DIR $WRK_DIR
if [[ $? != 0 ]]
then
    echo "WARNING: Test page rips didn't work!"
fi
