# Rips a designated test page from the NZH site and turns it into a local test page
# To get a fresh rip, just delete nzh-ripped and start over
# If it freezes during the ripping process, just abort and run again
NZH_URL="https://www.nzherald.co.nz/nz/dj-t2/DEYOM6DGQCKKAQ4WBYJB5UJAHU/"
WRK_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DST_DIR=$WRK_DIR/../static-dev

cd $DST_DIR
rm -r $DST_DIR/*
wget --convert-links --domains www.nzherald.co.nz $NZH_URL
wget --convert-links --domains www.nzherald.co.nz https://www.nzherald.co.nz/pf/dist/components/combinations/default.js

echo "Replacing paywall mechanism with rubber stamper..."
# Overwrite antipiracy mechanism and make page run modified JS
sed -i "s|r=function(){document.write(\"\"),window.location=c.a.OFFERS_URL}|r=function(){}|" $DST_DIR/default.js
sed -i "s|https://www.nzherald.co.nz/pf/dist/components/combinations/default.js|default.js|" $DST_DIR/index.html
# Add rubber stamper to bring down paywall (in lieu of actual paywall mechanism)
RUBBER_STAMP=`cat $WRK_DIR/rubberstamp.html`
RUBBER_STAMP=${RUBBER_STAMP//$'\n'/}
sed -i "s|></script></body></html>|></script>$RUBBER_STAMP</body></html>|" $DST_DIR/index.html

echo "Replacing live scripts with local scripts..."
FOOTER=`cat $WRK_DIR/footer.html`
FOOTER=${FOOTER//$'\n'/}
FOOTER=${FOOTER//'/'/'\\/'}
ORIG='raw_text_footer.*\/script>"'
TARG="raw_text_footer\",\"content\":\"$FOOTER\""
sed -i "s|$ORIG|$TARG|" $DST_DIR/index.html

echo "Done."
