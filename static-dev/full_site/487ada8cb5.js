console.log('ntag dev');
/* KPEX Smart Tag Utilities for KPEX
 Copyright 2016 the Rubicon Project, Inc. */
var ktag = function() {
    var a = this,
        b = function(a) {
            return a + Math.floor(1e6 * Math.random())
        },
        c = function() {
            return window != top
        },
        d = function() {
            var a = !1;
            try {
                window.top.location.href
            } catch (b) {
                a = !0
            }
            return a
        },
        e = function() {
            return window.frameElement ? {
                x: window.top.innerWidth,
                y: window.top.pageYOffset || window.top.document.body.scrollTop || window.top.document.documentElement.scrollTop,
                w: window.top.innerWidth || window.top.documentElement.clientWidth || window.top.getElementsByTagName("body")[0].clientWidth,
                h: window.top.innerHeight || window.top.documentElement.clientHeight || window.top.getElementsByTagName("body")[0].clientHeight
            } : {
                x: window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft,
                y: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                w: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth,
                h: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight
            }
        },
        f = function(a) {
            var b = 0,
                c = 0;
            if (a.offsetParent)
                do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent);
            return {
                x: b,
                y: c
            }
        },
        g = function() {
            var a = null;
            try {
                if (d());
                else {
                    var g, h = window,
                        i = e(),
                        j = 90;
                    if (c()) {
                        for (; window.top !== h.parent;) {
                            h = h.parent;
                            try {
                                h.location.href
                            } catch (k) {
                                return a
                            }
                        }
                        g = f(h.frameElement), j = h.frameElement.clientHeight / 2
                    } else {
                        for (var l = document.documentElement; l.childNodes.length && 1 == l.lastChild.nodeType;) l = l.lastChild;
                        var m = document.createElement("div"),
                            n = b("rubicon_chk_position_");
                        m.setAttribute("id", n), m.style.width = "0px", m.style.height = "0px", l.parentNode.appendChild(m), g = f(m), l.parentNode.removeChild(m), j /= 2
                    }
                    a = i.y + i.h < j + g.y || i.y > j + g.y ? "btf" : "atf"
                }
            } catch (o) {}
            return a
        },
        h = function(a) {
            var b = this;
            "function" == typeof a && (window.func = function(a) {
                b.func(a)
            })
        },
        i = function(a, b, c, d, e, f) {
            if (a) {
                var g = e > d ? !0 : !1,
                    h = (new Date).getTime(),
                    i = setInterval(function() {
                        var j = Math.min(1, ((new Date).getTime() - h) / f);
                        g ? (a.style ? a[b] = d + j * (e - d) : a.setAttribute(b, d + j * (e - d)), a.style[b] && (a.style[b] = d + j * (e - d) + c)) : (a.style ? a[s] = d - j * (d - e) : a.setAttribute(b, d - j * (d - e)), a.style[b] && (a.style[b] = d - j * (d - e) + c)), 1 === j && clearInterval(i)
                    }, 25);
                a.style ? a[b] = d : a.setAttribute(b, d), a.style[b] ? a.style[b] = d + c : a.style[b] = d + c
            }
        };
    a.resizeAdSlot = function(a, b) {
        var c, d, e, f;
        d = a.substring(0, a.indexOf("x")), f = a.substring(a.indexOf("x") + 1, a.length), c = window.frameElement, e = c.getBoundingClientRect().height ? c.getBoundingClientRect().height : c.offsetHeight, c.width ? c.width = parseInt(d) : c.setAttribute("width", parseInt(d)), c.style.width && (c.style.width = parseInt(d) + "px"), b === !0 ? i(c, "height", "px", e, f, 500) : (c.height ? c.height = parseInt(f) : c.setAttribute("height", parseInt(f)), c.style.height && (c.style.height = parseInt(f) + "px"))
    }, a.setSite = function(a) {
        var b, c;
        return ("undefined" == typeof a || "" === a || a.indexOf("http") < 0) && (a = d() ? window.document.referrer : window.top.document.location.href), c = window.document.createElement("a"), c.href = a, b = c.hostname
    }, a.setSection = function(a) {
        var b, c, e = "",
            f = "unknown",
            g = [],
            h = [];
        return ("undefined" == typeof a || "" === a || a.indexOf("http") < 0) && (a = d() ? window.document.referrer : window.top.document.location.href), g = ["/news/", "/breaking-news/", "/rural-news/", "/national/", "world", "post", "press", "times", "news", "express", "standard", "mail", "herald", "/auckland", "/science", "/environment", "/oddstuff", "/sport", "/entertainment/", "/lifestyle/", "/life-style/", "/life/", "/motoring", "/technology/", "/travel/", "/business"], h = ["news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "news", "sport", "entertainment", "lifestyle", "lifestyle", "lifestyle", "motoring", "technology", "travel", "business"], c = window.document.createElement("a"), c.href = a.toLowerCase(), b = c.hostname, e = c.pathname, e = "/" === e.charAt(0) ? e : "/" + e, "" === e || "/" === e || b.indexOf("four.co.nz") > -1 && "/tv/home.aspx" === e ? f = "homepage" : g.forEach(function(a, b, c) {
            e.indexOf(a) > -1 && (f = h[b])
        }), (b.indexOf("grabone") > -1 || "www.bite.co.nz" === b || "truecommercial.nzherald.co.nz" === b || "www.farmingshow.co.nz" === b && "news" !== f || "www.viva.co.nz" === b) && "homepage" !== f && (f = "lifestyle"), "www.driven.co.nz" === b && (f = "motoring"), ("www.watchme.co.nz" === b || "www.iheart.com" === b || "www.zmonline.com" === b || "events.stuff.co.nz" === b || "www.tv3.co.nz" === b || "www.four.co.nz" === b || "www.theedge.co.nz" === b || "www.therock.net.nz" === b || "www.georgefm.co.nz" === b || "www.maifm.co.nz" === b || "www.morefm.co.nz" === b || "www.thebreeze.co.nz" === b || "www.thesound.co.nz" === b || "www.magic.co.nz" === b || "www.scout.co.nz" === b || "www.thehits.co.nz" === b && "news" !== f && "lifestyle" !== f || "www.hauraki.co.nz" === b && "news" !== f && "sport" !== f || "www.flava.co.nz" === b && "news" !== f || "www.mixonline.co.nz" === b && "news" !== f || "www.thecoast.net.nz" === b && "lifestyle" !== f && "travel" !== f && "technology" !== f && "news" !== f && "sport" !== f || "www.hokonui.co.nz" === b && "news" !== f || "www.tvnz.co.nz" === b && "news" !== f || "tvnz.co.nz" === b && "news" !== f || "www.radiolive.co.nz" === b && "news" !== f) && "homepage" !== f && (f = "entertainment"), "www.radiosport.co.nz" !== b && "dreamteam.nzherald.co.nz" !== b || "homepage" === f || (f = "sport"), "www.3news.co.nz" === b && "sport" !== f && "business" !== f && "homepage" !== f && (f = "news"), ("sunlive.co.nz" === b || "www.sunlive.co.nz" === b || "m.sunlive.co.nz" === b) && (f = "news"), ("stoppress.co.nz" === b || "www.stoppress.co.nz" === b || "m.stoppress.co.nz" === b || "idealog.co.nz" === b || "www.idealog.co.nz" === b || "m.idealog.co.nz" === b || "theregister.co.nz" === b || "www.theregister.co.nz" === b || "m.theregister.co.nz" === b) && (f = "business"), ("dish.co.nz" === b || "www.dish.co.nz" === b || "m.dish.co.nz" === b || "good.net.nz" === b || "www.good.net.nz" === b || "m.good.net.nz" === b || "newzealandweddings.co.nz" === b || "www.newzealandweddings.co.nz" === b || "m.newzealandweddings.co.nz" === b || "hgtv.co.nz" === b) && (f = "lifestyle"), ("nzfishingworld.co.nz" === b || "www.nzfishingworld.co.nz" === b || "m.nzfishingworld.co.nz" === b) && (f = "sport"), ("theweekendsun.co.nz" === b || "baydriver.co.nz" === b || "coastandcountrynews.co.nz" === b || "waterline.co.nz" === b || "odt.co.nz" === b || "odt.co.nz/regions" === b) && (f = "news"), "odt.co.nz/sport" === b && (f = "sport"), ("odt.co.nz/opinion" === b || "odt.co.nz/lifestyle" === b || "odt.co.nz/features" === b || "drivesouth.co.nz" === b) && (f = "lifestyle"), "odt.co.nz/business" === b && (f = "business"), "trendsideas.com" === b && (f = "lifestyle"), f
    }, a.setPath = function(a) {
        var b, c, e, f = "",
            g = "",
            h = [],
            i = [];
        return ("undefined" == typeof a || "" === a || a.indexOf("http") < 0) && (a = d() ? window.document.referrer : window.top.document.location.href, a.indexOf("http") < 0) ? "/" : (c = window.document.createElement("a"), c.href = a.toLowerCase(), b = c.hostname, f = c.pathname, f = "/" === f.charAt(0) ? f : "/" + f, e = /[^\/]*$/, g = f.replace(e, ""), e = /\/[0-9]+/gi, g = g.replace(e, ""), (b.indexOf(".net.nz") > -1 || b.indexOf(".co.nz") > -1) && "/" !== g && (h = g.split("/"), h.forEach(function(a, b, c) {
            ("" === a || void 0 === a || a.length - a.replace(/-/g, "").length > 3) && i.push(b)
        }), i.forEach(function(a, b, c) {
            h.splice(a - b, 1)
        }), g = "/", h.length > 0 && h[0].length > 0 && (g += h[0] + "/"), h.length > 1 && h[1].length > 0 && (g += h[1] + "/")), g)
    }, a.setPath = a.setSection, a.setPosition = function() {
        return g()
    }, a.runAdSlot = function(a, b, c) {
        var d = b.split("x"),
            e = a + "-fif",
            f = document.createElement("iframe");
        return f.style.cssText = "width: " + d[0] + "px; height: " + d[1] + "px; border: 0; margin: 0; padding: 0; overflow: hidden;", f.setAttribute("scrolling", "no"), f.src = "about:blank", f.id = e, document.getElementById(a).appendChild(f), fifContext = f.contentWindow ? f.contentWindow.document : f.contentDocument.document, fifContext.open().write("<html>\n<head>\n<script type='text/javascript'>inDapIF=true;\n</script>\n</head>\n<body style='margin : 0; padding: 0;'>\n<!-- Rubicon Project Smart Tag -->\n<script type='text/javascript'>\nrp_account = '" + c.acct + "';\nrp_site = '" + c.site + "';\nrp_zonesize  = '" + c.zone + "-" + c.size + "';\nrp_adtype = 'jsonp';\nrp_kw = '" + c.kw + "';\nrp_visitor = " + c.visitor + ";\nrp_inventory = " + c.inventory + ";\nrp_callback = " + c.callback + ";\n</script>\n<script type='text/javascript' src=\"http://ads.rubiconproject.com/ad/" + c.acct + '.js"></script>\n</body>\n</html>'), fifContext.close(), e
    }, a.callBack = function(a) {
        if ("ok" === a.status)
            for (var b, c = 0; c < a.ads.length; c++) b = a.ads[c], "ok" === b.status ? ("script" === b.type && document.write("<script type='text/javascript'>" + b.script + "</script>"), "html" === b.type && document.write(b.html), window.rpx_params.callback && RubiconAdServing && "object" == typeof RubiconAdServing.AdSizes && h(window.rpx_params.callback(RubiconAdServing.AdSizes[b.size_id].dim))) : window.rpx_params.callback && RubiconAdServing && "object" == typeof RubiconAdServing.AdSizes && h(window.rpx_params.callback())
    }, a.getAdDimensions = function() {
        return c ? [window.innerWidth, window.innerHeight].join("x") : [window.top.innerWidth, window.top.innerHeight].join("x")
    }, a.getDeviceType = function() {
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? "mobile" : "desktop"
    }, a.getSiteUrlSection = function() {
        return [a.setSite(), a.setSection()].join("/")
    }, a.setAdDimensions = function() {
        return c ? [window.innerWidth, window.innerHeight].join("x") : [window.top.innerWidth, window.top.innerHeight].join("x")
    }, a.setDeviceType = function() {
        return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? "mobile" : "desktop"
    }, a.setSiteUrlSection = function() {
        return [a.setSite(), a.setSection()].join("/")
    }
};
ktag = new ktag;
/*
 FastLane SAS 
 Property of: the Rubicon Project, Inc. 
 Generated: 2017-03-21 10:03:35
*/
!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=function(){var a,b=this,c=!1,d=14232,e=[];b.receiveMessage=function(a){a.origin||a.originalEvent.origin;if("string"==typeof a.data&&a.data.indexOf("rubicontag")>-1){var b=function(a){var b;try{return b=JSON.parse(a)}catch(c){return a}},c=b(a.data),d=document.getElementById(c.ifm);d.style.cssText="display: none; visibility: hidden;";var e=document.getElementById(c.elemId);window.rubicontag.renderCreative(e,c.elemId,c.sizeId)}},b.setSite=function(a){var b,c;return("undefined"==typeof a||""===a||a.indexOf("http")<0)&&(a=window.document.location.href),c=window.document.createElement("a"),c.href=a,b=c.hostname},b.runAdSlot=function(a,b,c){var d=b.split("x"),e=a+"-sas",f=document.createElement("iframe");f.setAttribute("name", Math.round(Math.random() * 10000000000));return f.style.cssText="width: "+d[0]+"px; height: "+d[1]+"px; border: 0; margin: 0; padding: 0; overflow: hidden;",f.setAttribute("scrolling","no"),f.src=c,f.id=e,document.getElementById(a).appendChild(f),e},b.loadFastLane=function(){var a=document.createElement("script");a.type="text/javascript",a.src=("https:"===document.location.protocol?"https:":"http:")+"//ads.rubiconproject.com/header/"+d+".js";var b=document.getElementsByTagName("script")[0];b.parentNode.appendChild(a)},b.addEventListeners=function(){window.postMessage&&(window.addEventListener?window.addEventListener("message",b.receiveMessage,!1):window.attachEvent&&window.attachEvent("message",b.receiveMessage))},b.loadSlots=function(b){a=b},b.displaySlot=function(d){c=!0;for(var e in a)a[e].divid===d&&b.runSingleSlot(a[e])},b.runSingleSlot=function(a){rubicontag.cmd.push(function(){if(e[0]=rubicontag.defineSlot(a.divid,a.sizes,a.divid).setPosition(a.position||"btf"),a.hasOwnProperty("inventory"))for(var c in a.inventory)e[0].setFPI(c,a.inventory[c]).setFPI("size",a.sizes[0].join("x"));if(a.hasOwnProperty("visitor"))for(var d in a.visitor)e[0].setFPV(d,a.inventory[d]);a.hasOwnProperty("keywords")&&e[0].addKW(a.keywords.join(",")),rubicontag.addKW("fastlane-prototype-test"),rubicontag.setFPI("domain",[b.setSite()]),rubicontag.setIntegration("custom"),rubicontag.run(function(){sasrunslot(a)},{slots:[e[0]]})})},b.addContext=function(a){rubicontag.cmd.push(function(){rubicontag.addContext(a||"desktop")})},sasrunslot=function(a){var c,e={2:"728x90",9:"160x600",10:"300x600",15:"300x250",57:"970x250"},f=["rpfl_",d].join(""),g=a.divid,h=a.sasurl,k=window.rubicontag.getSlot(a.divid).getAdServerTargetingByKey(f),l=window.rubicontag.getSlot(a.divid).getRawResponses(),m=[],n=a.sizes[0].join("x");for(i=0;i<l.length;i++)m.push(parseFloat(l[i].cpm.toFixed(2)));for(m.sort(function(a,b){return b-a}),i=0;i<l.length;i++)parseFloat(l[i].cpm.toFixed(2))===m[0]&&(l=l[i]);for(j=0;j<k.length;j++)c=k[j].split("_")[0],e[c]===l.dimensions.join("x")&&-1!=k[j].indexOf(c)&&(n=e[c],h+=f+"="+k[j]+"/");h+="rpfl_ifm="+g+"-sas/rpfl_elemid="+g,b.runAdSlot(g,n,h),g=h=k=l=m=c=n=void 0},b.sasrun=function(){if(!c){c=!0;for(var d in a){var e=a[d].divid,f=a[d].sasurl,g=a[d].sizes[0].join("x");b.runAdSlot(e,g,f),e=f=g=void 0}}}};ntag=new d,ntag.addEventListeners()},{}]},{},[1]);
var eventMethod=window.addEventListener?"addEventListener":"attachEvent";var eventer=window[eventMethod];var startT;function adopNgmShow(e){document.getElementById("ngmlauncher").style.display="block";startT=(new Date).getTime()}var messageEvent=eventMethod=="attachEvent"?"onmessage":"message";
eventer(messageEvent,function(e){if(e.origin=="https://data.apn.co.nz"||e.origin=="https://data.apn.co.nz"||e.origin==location.origin)if(e.data){var edata;if(typeof e.data==="string")if(e.data.indexOf("nzmeAdID")>-1)edata=JSON.parse(e.data);else return false;else return false;var i;var iframeID;var iframeP;var newW,newH;var tomatch;var ifs=document.getElementsByTagName("iframe");if(edata["resize"]){tomatch=edata["nzmeAdID"];for(i=0;i<ifs.length;i++)if(ifs[i].src.indexOf(tomatch)>-1){iframeID=ifs[i];
break}if(iframeID){newW=edata["resize"]["width"];newH=edata["resize"]["height"];iframeID.height=newH;iframeID.width=newW;iframeP=iframeID.parentNode;iframeP.style.setProperty("width",newW+"px","important");iframeP.style.setProperty("height",newH+"px","important");iframeP.style.setProperty("min-height",newH+"px","important");iframeID.style.setProperty("width",newW+"px","important");iframeID.style.setProperty("height",newH+"px","important");iframeID.style.setProperty("min-height",newH+"px","important")}}if(edata["css"]){function applyCSS(c){var styleEl=
document.createElement("style"),styleSheet;document.head.appendChild(styleEl);styleSheet=styleEl.sheet;for(var key in c)if(c.hasOwnProperty(key))styleSheet.insertRule(key+"{ "+c[key]+" }",0)}applyCSS(edata["css"])}if(edata["collapse"]){function collapse(c){var target=iframeID;do target=target.parentElement;while(target.classList.contains("pb-f-ads-ad")===false);target=target.id;var intent=c["intent"];if(intent=="up")$("#"+target).slideUp();else if(intent=="down")$("#"+target).slideDown()}collapse(edata["collapse"])}if(edata["bustMaxwidth"]){function bustMaxwidth(c){var width=
c["width"];var target=iframeID;do target=target.parentElement;while(target.classList.contains("pb-ad-container")===false);target.style.maxWidth=width+"px";target.className+=" max-width-"+width;do target=target.parentElement;while(target.classList.contains("ad-container")===false);target.style.maxWidth=width+"px";target.className+=" max-width-"+width}bustMaxwidth(edata["bustMaxwidth"])}if(edata["closeAdSpot"]){function closeAdSpot(c){if(iframeP.getAttribute("id")=="ContentRect")iframeP.parentNode.style.display=
"none";else{var adWrapper=c["adWrapper"];var target=iframeID;do target=target.parentElement;while(target.classList.contains(adWrapper)===false);target.style.display="none"}}closeAdSpot(edata["closeAdSpot"])}if(edata["prebidAd"]){function prebidAd(c){var w=c["hb_w"];var h=c["hb_h"];var adid=c["hb_adid"];var wid=c["hb_wid"];var adP=document.getElementById(wid);var sasIfrm=adP.querySelector("iframe");adP.removeChild(sasIfrm);var ifrm=document.createElement("iframe");ifrm.setAttribute("FRAMEBORDER","0");
ifrm.setAttribute("SCROLLING","no");ifrm.setAttribute("MARGINHEIGHT","0");ifrm.setAttribute("MARGINWIDTH","0");ifrm.setAttribute("TOPMARGIN","0");ifrm.setAttribute("LEFTMARGIN","0");ifrm.setAttribute("ALLOWTRANSPARENCY","true");ifrm.setAttribute("name",Math.round(Math.random()*1E10));ifrm.style.width=w;ifrm.style.height=h;ifrm.width=w;ifrm.height=h;adP.appendChild(ifrm);var iframeDoc=ifrm.contentWindow.document;pbjs.renderAd(iframeDoc,adid)}prebidAd(edata["prebidAd"])}if(edata["surveymonkey"]){function surveymonkey(c){(function(t,
e,c,o){var s,n,r;t.SMCX=t.SMCX||[],e.getElementById(o)||(s=e.getElementsByTagName(c),n=s[s.length-1],r=e.createElement(c),r.type="text/javascript",r.async=!0,r.id=o,r.src=["https:"===location.protocol?"https://":"http://","widget.surveymonkey.com/collect/website/js/DEFf7YOHV0FmgI8ttMr4yidF6jpL_2Bqro_2F77MNRqVve249WGRP4LsLfcfTYN6uX5c.js"].join(""),n.parentNode.insertBefore(r,n))})(window,document,"script","smcx-sdk")}surveymonkey(edata["surveymonkey"])}if(edata["ngmlauncher"]){function ngmLauncher(c){var lmedia=
c["lmedia"];lmedia=decodeURIComponent(lmedia);var lcurl=c["lcurl"];lcurl=decodeURIComponent(lcurl);var lprecurl=c["lprecurl"];lprecurl=decodeURIComponent(lprecurl);var limptrk=c["limptrk"];limptrk=decodeURIComponent(limptrk);var sasimp=lcurl.replace("adclick","count/act\x3d1");sasimp='\x3cimg src\x3d"'+sasimp+'" style\x3d"display:none;width:1px;height:1px;"\x3e';if(limptrk)limptrk='\x3cimg src\x3d"'+limptrk+'" style\x3d"display:none;width:1px;height:1px;"\x3e';else limptrk="";var scr=c["scr"];scr=
decodeURIComponent(scr);var cba=c["cba"];function clickOTP(e){var stopT=(new Date).getTime();var timeSinceLaucher=stopT-startT;if(timeSinceLaucher<1E3)e.preventDefault();else{closeOTP();return true}}var dcid=c["ldcid"];var dcOrd=Math.round(Math.random()*1E8);var dcMarkup='\x3cdiv id\x3d"ngmlauncher" style\x3d"display:none;"\x3e\x3ca id\x3d"launcherclose"\x3e\x3cimg src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/rsz_close.png" width\x3d"55" style\x3d"z-index: 3; position:absolute; right:10%;"\x3e\x3cp style\x3d"color: white;position: absolute;right: 20%; top:90%; z-index: 2;font-size: 12px;"\x3e[X]Close\x3c/p\x3e\x3c/a\x3e\x3ca id\x3d"launchercreative"  href\x3d"'+
lprecurl+"https://ad.doubleclick.net/ddm/jump/"+dcid+";sz\x3d320x480;ord\x3d"+dcOrd+'?" target\x3d"_blank"\x3e'+'\x3cIMG onload\x3d"adopNgmShow()" SRC\x3d"https://ad.doubleclick.net/ddm/ad/'+dcid+";sz\x3d320x480;ord\x3d"+dcOrd+';dc_lat\x3d;dc_rdid\x3d;tag_for_child_directed_treatment\x3d?" BORDER\x3d0 WIDTH\x3d320 HEIGHT\x3d480 ALT\x3d"Advertisement" id\x3d"showimage"\x3e\x3c/a\x3e'+limptrk+sasimp+"\x3c/div\x3e";var launchermarkup='\x3cdiv id\x3d"ngmlauncher" style\x3d"display:none;"\x3e\x3cdiv id\x3d"launcherlabel"\x3e\x3cspan\x3eADVERTISEMENT\x3c/span\x3e\x3c/div\x3e\x3ca id\x3d"launcherclose"\x3e\x3cimg src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/inertia_close.jpg" width\x3d"50" style\x3d"z-index: 3;"\x3e\x3cp\x3e[X]Close\x3c/p\x3e\x3c/a\x3e\x3ca id\x3d"launchercreative" href\x3d"'+
lcurl+'" target\x3d"_blank"\x3e\x3cimg onload\x3d"adopNgmShow()" src\x3d"'+lmedia+'"\x3e\x3c/a\x3e'+limptrk+sasimp+"\x3c/div\x3e";var cplacement=c["cplacementID"];var preclickurl=c["preclickurl"];var celtraMarkup="";celtraMarkup+='\x3cdiv class\x3d"celtra-ad-v3"\x3e';celtraMarkup+='\x3cimg src\x3d"data:image/png,celtra" style\x3d"display: none" onerror\x3d"';celtraMarkup+="(function(img) {";celtraMarkup+="    var params \x3d {'clickUrl':'"+preclickurl+"','expandDirection':'undefined','preferredClickThroughWindow':'new','clickEvent':'firstInteraction','externalAdServer':'Custom','tagVersion':'6'};";
celtraMarkup+="    var req \x3d document.createElement('script');";celtraMarkup+="    req.id \x3d params.scriptId \x3d 'celtra-script-' + (window.celtraScriptIndex \x3d (window.celtraScriptIndex||0)+1);";celtraMarkup+="    params.clientTimestamp \x3d new Date/1000;";celtraMarkup+="    params.clientTimeZoneOffsetInMinutes \x3d new Date().getTimezoneOffset();";celtraMarkup+="    params.hostPageLoadId\x3dwindow.celtraHostPageLoadId\x3dwindow.celtraHostPageLoadId||(Math.random()+'').slice(2);";celtraMarkup+=
"    var src \x3d 'https://ads.celtra.com/"+cplacement+"/web.js?';";celtraMarkup+="    for (var k in params) {";celtraMarkup+="        src +\x3d '\x26amp;' + encodeURIComponent(k) + '\x3d' + encodeURIComponent(params[k]);";celtraMarkup+="    }";celtraMarkup+="    req.src \x3d src;";celtraMarkup+="    img.parentNode.insertBefore(req, img.nextSibling);";celtraMarkup+="})(this);";celtraMarkup+='"/\x3e';celtraMarkup+="\x3c/div\x3e";celtraMarkup+=limptrk+sasimp;if(cplacement)document.body.insertAdjacentHTML("afterbegin",
celtraMarkup);else{if(cba!="y")document.body.style.overflow="hidden";if(dcid)document.body.insertAdjacentHTML("afterbegin",dcMarkup);else if(lmedia)document.body.insertAdjacentHTML("afterbegin",launchermarkup);document.getElementById("launchercreative").addEventListener("click",clickOTP);document.getElementById("launcherclose").addEventListener("click",closeOTP);if(scr){var extraScr=document.createElement("script");extraScr.src=scr;document.body.appendChild(extraScr)}}function closeOTP(){var stopT=
(new Date).getTime();var otp=document.getElementById("ngmlauncher");otp.parentElement.removeChild(otp);document.body.style.overflow="auto"}}ngmLauncher(edata["ngmlauncher"])}if(edata["viewroll"]){function renderVideo(a,adspot){$(document).ready(function(){var vsiteVer=a["vsiteVer"];var vmedia=a["vmedia"];vmedia=decodeURIComponent(vmedia);var vcomp=a["vcomp"];vcomp=decodeURIComponent(vcomp);var vcurl=a["vcurl"];vcurl=decodeURIComponent(vcurl);var vsimp=a["vsimp"];vsimp=decodeURIComponent(vsimp);var veimp=
a["veimp"];veimp=decodeURIComponent(veimp);var vpos=a["vpos"];var vwide=a["vwide"];var vfcid=a["vfcid"];var sasimp=vcurl.replace("adclick","count/act\x3d1");var sasact=vcurl.replace("adclick","count/act\x3d3");var vwidth,vheight,vban,voffsetD=210,vCRlab="",vCRcount="",vname,vClass,vskip=-1,video,firstplay=true;var vscripts,vindex=0;vscripts=["https://vjs.zencdn.net/4.7.1/video.js","https://cdn.jsdelivr.net/viewability/latest/viewability.min.js","https://nzme-ads-production.s3.amazonaws.com/js/iphone-inline-video.min.js"];
var wideUICss="";function load_script(){if(vindex<vscripts.length)$.getScript(vscripts[vindex],function(){vindex++;load_script()});else startVR()}load_script();function startVR(){$("head").append('\x3clink rel\x3d"stylesheet" href\x3d"https://vjs.zencdn.net/4.7/video-js.css" type\x3d"text/css" /\x3e');$("head").append('\x3clink rel\x3d"stylesheet" href\x3d"https://nzme-ads-production.s3.amazonaws.com/css/viewroll.css" type\x3d"text/css" /\x3e');if(vpos==1){vClass="vr_block";vwidth=300;if(vcomp){vheight=
200;vClass="vr_block vr_comp"}else vheight=250}if(vpos==2)if(vwide){vwidth=540;vheight=305;vCRlab='\x3cdiv id\x3d"vlab"\x3e\x26dtrif; Advertising \x26dtrif;\x3c/div\x3e';vCRcount='\x3cdiv id\x3d"vcount"\x3e\x3cp\x3eClose ad\x26nbsp;\x26nbsp;\x26nbsp;\x26#10006;\x3c/p\x3e\x3c/div\x3e';voffsetD=260;vClass="vr_wide";vskip=5;wideUICss=" top:auto!important;"}else{vClass="vr_block advert";vwidth=300;if(vcomp){vheight=200;vClass="vr_block advert vr_comp"}else vheight=250}if(vpos==3){vClass="vr_block";vwidth=
300;if(vcomp){vheight=200;vClass="vr_block vr_comp"}else vheight=250}var vmutebutton='\x3cimg id\x3d"vunmutebtn" src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/viewroll-mute.png" style\x3d" display:none; position: absolute; top:8px; z-index: 10; right: 5px; width: 30px; cursor: pointer;'+wideUICss+'"\x3e';var vunmutebutton='\x3cimg id\x3d"vmutebtn" src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/viewroll-unmute.png" style\x3d" display: inline-block; position: absolute; top:8px; z-index: 10; right: 5px; width: 30px; cursor: pointer;'+
wideUICss+'"\x3e';vname="vblock"+vpos;if(vcomp)vban='\x3cp style\x3d"margin:0; height:50px; display:inline-block;"\x3e\x3ca target\x3d"_blank" href\x3d"'+vcurl+'"\x3e\x3cimg src\x3d"'+vcomp+'"\x3e\x3c/a\x3e\x3c/p\x3e';video=vCRlab+'\x3cdiv class\x3d"vidcont '+vClass+'"\x3e'+vCRcount+'\x3cdiv id\x3d"vctr" class\x3d"vctr"\x3e'+vunmutebutton+vmutebutton+'\x3ca target\x3d"_blank" href\x3d"'+vcurl+'"\x3e\x3c/a\x3e\x3c/div\x3e\x3cvideo id\x3d"'+vname+'" class\x3d"video-js vjs-default-skin vjs-big-play-centered" playsinline muted volume webkit-playsinline preload\x3d"auto" width\x3d"'+
vwidth+'" height\x3d"'+vheight+'" data-setup\x3d\'{ "techOrder":["flash", "html5"] }\'\x3e \x3csource src\x3d"'+vmedia+'" type\x3d"video/mp4"\x3e\x3cp class\x3d"vjs-no-js"\x3eTo view this video please enable JavaScript, and consider upgrading to a web browser that \x3ca href\x3d"http://videojs.com/html5-video-support/" target\x3d"_blank"\x3esupports HTML5 video\x3c/a\x3e\x3c/p\x3e\x3c/video\x3e'+vban;$(video).insertAfter(adspot);$(adspot).remove();if(vpos==2&&vwide){if(vsiteVer){var vhaxVideoCont=
$(".vr_wide")[0];do vhaxVideoCont=vhaxVideoCont.parentElement;while(vhaxVideoCont.classList.contains("max-width-300")===false);vhaxVideoCont.style.maxWidth="540px";var vhaxVideoCC=$(vhaxVideoCont).children();for(var i=0;i<vhaxVideoCC.length;i++)if(vhaxVideoCC[i].classList.contains("ad-text-before"))$(vhaxVideoCC[i]).remove();$("#vlab")[0].style.position="absolute";$("#vlab")[0].style.top="-16px"}$("#vmutebtn")[0].style.bottom="0px";$("#vunmutebtn")[0].style.bottom="0px"}var myPlayer=videojs(vname);
var $vidcont=$(".vidcont");var vidcont=document.getElementsByClassName("vidcont")[0];var firstend=true;$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"'+sasact+'"\x3e');var vr_unmutebtn=document.getElementById("vunmutebtn");var vr_mutebtn=document.getElementById("vmutebtn");vr_unmutebtn.addEventListener("click",vr_soundToggle);vr_mutebtn.addEventListener("click",vr_soundToggle);function vr_soundToggle(){if(myPlayer.muted()==true){myPlayer.muted(false);vr_unmutebtn.style.display="inline-block";
vr_mutebtn.style.display="none"}else if(myPlayer.muted()==false){myPlayer.muted(true);vr_unmutebtn.style.display="none";vr_mutebtn.style.display="inline-block"}}myPlayer.ready(function(){if(firstplay){$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdStart/fcid\x3d'+vfcid+'"\x3e');firstplay=false}var vctime,vdur,vprc;var vtime25=false;var vtime50=false;var vtime75=false;var vtime5sec=false;var timeEvent=function(){vctime=Math.round(myPlayer.currentTime());
vdur=Math.round(myPlayer.duration());vprc=Math.round(vctime/vdur*100);if(vctime>=5&&!vtime5sec){vtime5sec=true;$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"'+sasimp+'"\x3e');if(vsimp)$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"'+vsimp+'"\x3e')}if(vprc>=25&&!vtime25){vtime25=true;$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdFirstQuartile/fcid\x3d'+vfcid+'"\x3e')}if(vprc>=50&&!vtime50){vtime50=true;$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdMidPoint/fcid\x3d'+
vfcid+'"\x3e')}if(vprc>=75&&!vtime75){vtime75=true;$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdThirdQuartile/fcid\x3d'+vfcid+'"\x3e')}};myPlayer.on("timeupdate",timeEvent);this.on("loadeddata",function(){var $vcount=$("#vcount");$vcount.on("click",function(event){event.preventDefault();myPlayer.off();window.removeEventListener("scroll",vr_checkScroll);window.removeEventListener("touchend",vr_checkScroll);var vhaxToBeRemoved=$(".vr_wide")[0];
if(vsiteVer){do vhaxToBeRemoved=vhaxToBeRemoved.parentElement;while(vhaxToBeRemoved.classList.contains("max-width-300")===false)}$(vhaxToBeRemoved).slideUp(function(){myPlayer.dispose()});$("#vlab").slideUp()})});this.on("ended",function(){if(firstend){$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdComplete/fcid\x3d'+vfcid+'"\x3e');if(veimp)$vidcont.append('\x3cimg style\x3d"display:none;" src\x3d"'+veimp+'"\x3e');firstend=false;window.removeEventListener("scroll",
vr_checkScroll);window.removeEventListener("touchend",vr_checkScroll)}})});var vr_view;window.addEventListener("scroll",vr_checkScroll);window.addEventListener("touchend",vr_checkScroll);function vr_checkScroll(){vr_view=viewability.vertical(vidcont);if(vr_view.state=="EL_IS_WITHIN_VERTICAL_VIEW")myPlayer.play();else myPlayer.pause()}vr_checkScroll()}})}renderVideo(edata["viewroll"],iframeP)}if(edata["interscroller"]){var adid=edata["interscroller"]["adid"];var curl=edata["interscroller"]["curl"];
var sasimp=curl.replace("adclick","count%2Fact\x3d1");sasimp="\x3c!-- track.creativeLoads \x3d urldecode "+sasimp+" --\x3e";curl=decodeURIComponent(curl);var limptrk=edata["interscroller"]["imptrk"];limptrk=decodeURIComponent(limptrk);var celtra='\x3cdiv class\x3d"celtra-ad-v3"\x3e\n'+limptrk+sasimp+"\n"+'\x3cimg src\x3d"data:image/png,celtra" style\x3d"display: none" onerror\x3d"\n'+"(function(img) {\n"+"var params \x3d\n"+"{'clickUrl':'"+curl+"','expandDirection':'undefined','preferredClickThroughWindow':'new','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'4','useScreenFixation':'1', 'removeAdvertisementBars':'1'};\n"+
"[].slice.apply(img.parentNode.childNodes).forEach(function(n) { var decfs \x3d { urldecode: decodeURIComponent, htmldecode: function(v) { var d \x3d document.createElement('div'); d.innerHTML \x3d v; return d.textContent; }, eval: function(v) { return eval(v); }, raw: function(v) { return v; } }; var m; if (n.nodeType \x3d\x3d 8 \x26amp;\x26amp; (m \x3d n.textContent.match(/^\x26#92;s+([\x26#92;w.]+)(\x26#92;[.+\x26#92;])?\x26#92;s+\x3d\x26#92;s+(\x26#92;w+)\x26#92;s+(.*)$/i))) { try { params[m[1]+(m[2] || '')] \x3d decfs[m[3]](m[4].replace(/^\x26#92;s+|\x26#92;s+$/g, '')); } catch (e) {} } });\n"+
"var req \x3d document.createElement('script');\n"+"req.id \x3d params.scriptId \x3d 'celtra-script-' + (window.celtraScriptIndex \x3d (window.celtraScriptIndex||0)+1);\n"+"params.clientTimestamp \x3d new Date/1000;\n"+"params.clientTimeZoneOffsetInMinutes \x3d new Date().getTimezoneOffset();\n"+"params.hostPageLoadId\x3dwindow.celtraHostPageLoadId\x3dwindow.celtraHostPageLoadId||(Math.random()+'').slice(2);\n"+"var src \x3d (window.location.protocol \x3d\x3d 'https:' ? 'https' : 'http') + '://ads.celtra.com/"+
adid+"/web.js?';\n"+"for (var k in params) {\n"+"src +\x3d '\x26amp;' + encodeURIComponent(k) + '\x3d' + encodeURIComponent(params[k]);\n"+"}\n"+"req.src \x3d src;\n"+"img.parentNode.insertBefore(req, img.nextSibling);\n"+"})(this);\n"+'"/\x3e\n'+"\x3c/div\x3e";var bodyAd=document.querySelector(".ad-container.has-text.max-width-300");if(bodyAd){bodyAd.style.width="100%";bodyAd.insertAdjacentHTML("afterbegin",celtra)}}if(edata["miniscroller"]){document.querySelector("#ContentRect + .ad-contact-text").remove();
var adid=edata["miniscroller"]["adid"];var curl=edata["miniscroller"]["curl"];var sasimp=curl.replace("adclick","count%2Fact\x3d1");sasimp="\x3c!-- track.creativeLoads \x3d urldecode "+sasimp+" --\x3e";curl=decodeURIComponent(curl);var limptrk=edata["miniscroller"]["imptrk"];limptrk=decodeURIComponent(limptrk);var celtra='\x3cdiv class\x3d"celtra-ad-v3"\x3e\n'+limptrk+sasimp+"\n"+'\x3cimg src\x3d"data:image/png,celtra" style\x3d"display: none" onerror\x3d"\n'+"(function(img) {\n"+"var params \x3d\n"+
"{'clickUrl':'"+curl+"','widthBreakpoint':'','expandDirection':'undefined','preferredClickThroughWindow':'new','placementId':'"+adid+"','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'4'};\n"+"var req \x3d document.createElement('script');\n"+"req.id \x3d params.scriptId \x3d 'celtra-script-' + (window.celtraScriptIndex \x3d (window.celtraScriptIndex||0)+1);\n"+"params.clientTimestamp \x3d new Date/1000;\n"+"params.clientTimeZoneOffsetInMinutes \x3d new Date().getTimezoneOffset();\n"+
"params.hostPageLoadId\x3dwindow.celtraHostPageLoadId\x3dwindow.celtraHostPageLoadId||(Math.random()+'').slice(2);\n"+"var src \x3d (window.location.protocol \x3d\x3d 'https:' ? 'https' : 'http') + '://ads.celtra.com/80a2b25a/web.js?';\n"+"for (var k in params) {\n"+"src +\x3d '\x26amp;' + encodeURIComponent(k) + '\x3d' + encodeURIComponent(params[k]);\n"+"}\n"+"req.src \x3d src;\n"+"img.parentNode.insertBefore(req, img.nextSibling);\n"+"})(this);\n"+'"/\x3e\n'+"\x3c/div\x3e";var bodyAd=document.querySelector(".ad-container.has-text.max-width-300");
if(bodyAd){bodyAd.style.width="100%";bodyAd.style.maxWidth="none";bodyAd.insertAdjacentHTML("afterbegin",celtra)}}if(edata["hangtime"]){var preclickurl=decodeURIComponent(edata["hangtime"]["preclickurl"]);var adid=edata["hangtime"]["adid"];var pgImptrk=decodeURIComponent(edata["hangtime"]["imptrk"]);var beaconurl=decodeURIComponent(edata["hangtime"]["beaconurl"]);var randNum=edata["nzmeAdID"];var playgroundxyz="\x3cdiv class\x3d'xyz-ad-content'\x3e"+"\x3cimg src\x3d'data:image/png,xyz' style\x3d'display:none' onerror\x3d'"+
'!function(e){var n\x3d{clickUrl:"'+preclickurl+'",z:"'+randNum+'"},o\x3d"https://ads.playground.xyz/tag/'+adid+'/impression?";try{n.ref\x3dwindow.top.location.href}catch(e){console.log("PLAYGROUND-XYZ: cross-domain iframe prevented host detection")}for(var r in n)n[r]\x26\x26(o+\x3d"\x26amp;"+encodeURIComponent(r)+"\x3d"+encodeURIComponent(n[r]));var i\x3ddocument.createElement("script");i.src\x3do,e.parentNode.insertBefore(i,e.nextSibling)}(this);\'/\x3e'+"\x3c/div\x3e"+"\x3cimg src\x3d'"+pgImptrk+
"' style\x3d'position:absolute;top:0px;left:0px;width\x3d1px;height\x3d1px'\x3e"+"\x3cimg src\x3d'"+beaconurl+"'\x3e";var bodyAd=document.querySelector(".ad-container.has-text.max-width-300");if(bodyAd){bodyAd.style.width="100%";bodyAd.insertAdjacentHTML("afterbegin",playgroundxyz)}}if(edata["ScrollX"]){var adid=edata["ScrollX"]["adid"];var plid=edata["ScrollX"]["plid"];var preclickurl=edata["ScrollX"]["preclickurl"];var beaconurl=edata["ScrollX"]["beaconurl"];var bonzai="\x3cdiv class\x3d'bonzai-wrap'\x3e"+
'\x3cimg src\x3d"data:image/png,bonzai" style\x3d"display:none;" onerror\x3d"'+"(function(img){"+"var bonzai_adid \x3d '"+adid+"';"+"var bonzai_sn \x3d 'Generic';"+"var bonzai_data \x3d JSON.stringify({'network':{'keyId':'Generic','name':'Generic','settings':{'env':'wap','tagType':'iFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{},'clkTr':{'img':['"+preclickurl+"'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['"+
beaconurl+"'],'scr':[]}}}});"+"var protocol \x3d window.location \x26\x26 window.location.protocol;"+"protocol \x3d (protocol \x3d\x3d\x3d 'http:' || protocol \x3d\x3d\x3d 'https:') ? protocol.replace(':', '') : 'https';"+"var script \x3d document.createElement('script');"+"var cacheBuster \x3d Math.random();"+"var index \x3d window.bonzaiScriptIndex  \x3d (typeof window.bonzaiScriptIndex \x3d\x3d 'undefined') ? 0 : ++window.bonzaiScriptIndex;"+"script.id \x3d 'bonzai_script_' + index;"+"if(!window.bonzaiObj || (typeof window.bonzaiObj \x3d\x3d 'undefined')) {window.bonzaiObj \x3d {};}"+
"window.bonzaiObj[script.id] \x3d bonzai_data;"+";script.src \x3d protocol + '://invoke.bonzai.co/mizu/invoke.do?proto\x3d' + protocol + '\x26adid\x3d'+bonzai_adid+'\x26scriptid\x3d' + script.id  +'\x26sn\x3d'+bonzai_sn +'\x26plid\x3d"+plid+"'  + '\x26rnd\x3d' + cacheBuster;"+"img.parentNode.insertBefore(script, img.nextSibling);"+'})(this);"/\x3e'+"\x3cnoscript\x3e"+"\x3cimg src\x3d'https://invoke.bonzai.co/mizu/invoke.do?adid\x3d"+adid+"\x26sn\x3dGeneric\x26type\x3dimp\x26plid\x3d"+plid+"' style\x3d'display:none;' /\x3e"+
"\x3c/noscript\x3e"+"\x3c/div\x3e";var bodyAd=document.querySelector(".ad-container.has-text.max-width-300");if(bodyAd){bodyAd.style.width="100%";bodyAd.style.display="block";bodyAd.insertAdjacentHTML("afterbegin",bonzai)}}if(edata["TruSkinMob"]){var adid=edata["TruSkinMob"]["adid"];var plid=edata["TruSkinMob"]["plid"];var preclickurl=edata["TruSkinMob"]["preclickurl"];var beaconurl=edata["TruSkinMob"]["beaconurl"];var random=edata["nzmeAdID"];var bonzaiTruSkinMob="\x3cdiv class\x3d'bonzai-wrap'\x3e"+
"\x3cimg src\x3d'data:image/png,bonzai' style\x3d'display:none;' onerror\x3d\""+"(function(img){"+"var bonzai_adid \x3d '"+adid+"';"+"var bonzai_sn \x3d 'SAS';"+"var bonzai_data \x3dJSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{'segId':''},'clkTr':{'img':['"+preclickurl+"'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['"+
beaconurl+"'],'scr':[]}}}});"+"var protocol \x3d window.location \x26\x26 window.location.protocol;"+"protocol \x3d (protocol \x3d\x3d\x3d 'http:' || protocol \x3d\x3d\x3d 'https:') ? protocol.replace(':', '') : 'https';"+"var script \x3d document.createElement('script');"+"var cacheBuster \x3d '"+random+"'; "+"var index \x3d window.bonzaiScriptIndex  \x3d (typeof window.bonzaiScriptIndex \x3d\x3d 'undefined') ? 0 : ++window.bonzaiScriptIndex;"+"script.id \x3d 'bonzai_script_' + index;"+"if(!window.bonzaiObj || (typeof window.bonzaiObj \x3d\x3d 'undefined')) {window.bonzaiObj \x3d {};}"+
"window.bonzaiObj[script.id] \x3d bonzai_data;"+";script.src \x3d protocol + '://invoke.bonzai.co/mizu/invoke.do?proto\x3d' + protocol + '\x26adid\x3d'+bonzai_adid+'\x26scriptid\x3d' + script.id  +'\x26sn\x3d'+bonzai_sn+'\x26contTyp\x3ddiv' +'\x26plid\x3d"+plid+"'  + '\x26rnd\x3d' + cacheBuster;"+"img.parentNode.insertBefore(script, img.nextSibling);"+'})(this);"/\x3e';"\x3cnoscript\x3e"+"\x3cimg src\x3d'https://invoke.bonzai.co/mizu/invoke.do?adid\x3d"+adid+"\x26sn\x3dSAS\x26type\x3dimp\x26plid\x3d"+
plid+"' style\x3d'display:none;' /\x3e "+"\x3c/noscript\x3e"+"\x3c/div\x3e";var bodyAd=document.querySelector(".ad-container.has-text.max-width-300");if(bodyAd){bodyAd.style.width="100%";bodyAd.style.display="block";bodyAd.insertAdjacentHTML("afterbegin",bonzaiTruSkinMob)}}if(edata["TruSkinDesktop"]){var adid=edata["TruSkinDesktop"]["adid"];var plid=edata["TruSkinDesktop"]["plid"];var preclickurl=edata["TruSkinDesktop"]["preclickurl"];var beaconurl=edata["TruSkinDesktop"]["beaconurl"];var random=
edata["nzmeAdID"];var bonzaiTruSkinDesk="\x3cdiv class\x3d'bonzai-wrap'\x3e"+"\x3cimg src\x3d'data:image/png,bonzai' style\x3d'display:none;' onerror\x3d\""+"(function(img){"+"var bonzai_adid \x3d '"+adid+"';"+"var bonzai_sn \x3d 'SAS';"+"var bonzai_data \x3dJSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{'segId':''},'clkTr':{'img':['"+
preclickurl+"'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['"+beaconurl+"'],'scr':[]}}}});"+"var protocol \x3d window.location \x26\x26 window.location.protocol;"+"protocol \x3d (protocol \x3d\x3d\x3d 'http:' || protocol \x3d\x3d\x3d 'https:') ? protocol.replace(':', '') : 'https';"+"var script \x3d document.createElement('script');"+"var cacheBuster \x3d '"+random+"';"+"var index \x3d window.bonzaiScriptIndex  \x3d (typeof window.bonzaiScriptIndex \x3d\x3d 'undefined') ? 0 : ++window.bonzaiScriptIndex;"+
"script.id \x3d 'bonzai_script_' + index;"+"if(!window.bonzaiObj || (typeof window.bonzaiObj \x3d\x3d 'undefined')) {window.bonzaiObj \x3d {};}"+"window.bonzaiObj[script.id] \x3d bonzai_data;"+";script.src \x3d protocol + '://invoke.bonzai.co/mizu/invoke.do?proto\x3d' + protocol + '\x26adid\x3d'+bonzai_adid+'\x26scriptid\x3d' + script.id  +'\x26sn\x3d'+bonzai_sn+'\x26contTyp\x3ddiv' +'\x26plid\x3d"+plid+"'  + '\x26rnd\x3d' + cacheBuster;"+"img.parentNode.insertBefore(script, img.nextSibling);"+'})(this);"/\x3e'+
"\x3cnoscript\x3e"+"\x3cimg src\x3d'https://invoke.bonzai.co/mizu/invoke.do?adid\x3d"+adid+"\x26sn\x3dSAS\x26type\x3dimp\x26plid\x3d"+plid+"' style\x3d'display:none;' /\x3e"+"\x3c/noscript\x3e"+"\x3c/div\x3e";document.body.insertAdjacentHTML("afterbegin",bonzaiTruSkinDesk)}if(edata["BonzaiShowcase"]){var adid=edata["BonzaiShowcase"]["adid"];var plid=edata["BonzaiShowcase"]["plid"];var preclickurl=edata["BonzaiShowcase"]["preclickurl"];var beaconurl=edata["BonzaiShowcase"]["beaconurl"];var bonzaiShowcase=
"\x3cdiv class\x3d'bonzai-wrap' style\x3d'height:100%;width:100%;'\x3e"+"\x3cimg src\x3d'data:image/png,bonzai' style\x3d'display:none;' onerror\x3d\""+"(function(img){"+"var bonzai_adid \x3d '"+adid+"';"+"var bonzai_sn \x3d 'SAS';"+"var bonzai_data \x3dJSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y','closeBtn':'Y'},'macros':{'addiTr':{},'clkTr':{'img':['"+
preclickurl+"'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['"+beaconurl+"'],'scr':[]},'clkThru':{'landingUrl':'http://www.nzme.co.nz'}}}});"+"var protocol \x3d window.location \x26\x26 window.location.protocol;"+"protocol \x3d (protocol \x3d\x3d\x3d 'http:' || protocol \x3d\x3d\x3d 'https:') ? protocol.replace(':', '') : 'https';"+"var script \x3d document.createElement('script');"+"var cacheBuster \x3d 'Math.Random()';"+"var index \x3d window.bonzaiScriptIndex  \x3d (typeof window.bonzaiScriptIndex \x3d\x3d 'undefined') ? 0 : ++window.bonzaiScriptIndex;"+
"script.id \x3d 'bonzai_script_' + index;"+"if(!window.bonzaiObj || (typeof window.bonzaiObj \x3d\x3d 'undefined')) {window.bonzaiObj \x3d {};}"+"window.bonzaiObj[script.id] \x3d bonzai_data;"+";script.src \x3d protocol + '://invoke.bonzai.co/mizu/invoke.do?proto\x3d' + protocol + '\x26adid\x3d'+bonzai_adid+'\x26scriptid\x3d' + script.id  +'\x26sn\x3d'+bonzai_sn+'\x26contTyp\x3ddiv' +'\x26plid\x3d"+plid+"'  + '\x26rnd\x3d' + cacheBuster;"+"img.parentNode.insertBefore(script, img.nextSibling);"+'})(this);"/\x3e'+
"\x3cnoscript\x3e"+"\x3cimg src\x3d'https://invoke.bonzai.co/mizu/invoke.do?adid\x3d"+adid+"\x26sn\x3dSAS\x26type\x3dimp\x26plid\x3d"+plid+"' style\x3d'display:none;' /\x3e"+"\x3c/noscript\x3e"+"\x3c/div\x3e";document.body.insertAdjacentHTML("afterbegin",bonzaiShowcase)}if(edata["NZHSlider"]){function SliderLauncherD(c){var lmedia=c["lmedia"];lmedia=decodeURIComponent(lmedia);var lcurl=c["lcurl"];lcurl=decodeURIComponent(lcurl);var limptrk=c["limptrk"];limptrk=decodeURIComponent(limptrk);if(limptrk)limptrk=
'\x3cimg src\x3d"'+limptrk+'" style\x3d"display:none;width:1px;height:1px;"\x3e';else limptrk="";var sasimp=lcurl.replace("adclick","count/act\x3d1");sasimp='\x3cimg src\x3d"'+sasimp+'" style\x3d"display:none;width:1px;height:1px;"\x3e';var zoomtrack=lcurl.replace("adclick","count/act\x3d3");zoomtrack='\x3cimg src\x3d"'+zoomtrack+'" style\x3d"display:none;width:1px;height:1px;"\x3e';var zoomTracked=false;var lotameZoom=c["lotamezoom"];lotameZoom=decodeURIComponent(lotameZoom);lotameZoom='\x3cimg src\x3d"'+
lotameZoom+'" style\x3d"display:none;width:1px;height:1px;"\x3e';var lotameZoomTracked=false;var markup='\x3cdiv id\x3d"sldr_div"\x3e'+'\x3cdiv id\x3d"sldr_clip"\x3e'+'\x3cdiv id\x3d"sldr_crtv"\x3e'+'\x3cimg id\x3d"sldr_img" src\x3d"'+lmedia+'"\x3e'+"\x3c/div\x3e"+"\x3c/div\x3e"+'\x3cspan id\x3d"sldr_lbltop"\x3e\x26#9660; Advertisement \x26#9660;\x3c/span\x3e'+'\x3cspan id\x3d"sldr_lblbot" style\x3d"bottom: 0px;"\x3eClick Ad to Expand\x3c/span\x3e'+limptrk+sasimp+"\x3c/div\x3e";var divCR=iframeID;
do divCR=divCR.parentElement;while(divCR.classList.contains("ad-container")===false);if(divCR){$(divCR).replaceWith(markup);divCR.style.margin=0;divCR.style.width="auto";divCR.style.padding=0;divCR.style["float"]="none";divCR.style.removeProperty("height")}var zoom=""+'\x3cdiv id\x3d"sldr_zm"\x3e'+'\x3cdiv id\x3d"sldr_zm_container"\x3e'+'\x3cdiv id\x3d"sldr_zm_wrap"\x3e'+'\x3ca id\x3d"sldr_close" href\x3d"##"\x3e'+'\x3cimg src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/rsz_close.png" width\x3d"50"\x3e'+
"\x3c/a\x3e"+'\x3ca href\x3d"'+lcurl+'" target\x3d"_blank"\x3e'+'\x3cimg id\x3d"sldr_zm_img" src\x3d"'+lmedia+'"\x3e'+"\x3c/a\x3e"+"\x3c/div\x3e"+"\x3c/div\x3e"+"\x3c/div\x3e";var zoomIns=document.getElementsByTagName("body")[0];if(zoomIns)zoomIns.insertAdjacentHTML("afterbegin",zoom);var zoomState=false;function togZoom(){var zm=document.getElementById("sldr_zm");var zm_container=document.getElementById("sldr_zm_container");var zm_wrap=document.getElementById("sldr_zm_wrap");var zm_img=document.getElementById("sldr_zm_img");
var zm_close=document.getElementById("sldr_close");var crtv=document.getElementById("sldr_crtv");if(!zoomState){zm.setAttribute("style","height:100vh;opacity:1;");zm_container.setAttribute("style","top: auto; margin: 0 auto; width: 100%; left: auto; text-align: center;");zm_wrap.setAttribute("style","position: relative;display: inline-block;");zm_img.setAttribute("style","height:86vh;");zm_close.setAttribute("style","display: block;position: absolute; right: -2px; top:19px");crtv.style.display="none";
zoomState=!zoomState;if(!zoomTracked){document.body.insertAdjacentHTML("afterbegin",zoomtrack);document.body.insertAdjacentHTML("afterbegin",lotameZoom);zoomTracked=true}}else if(zoomState){zm.style.opacity=0;zm.style.height=0;zm_img.style.height=0;zm_close.style.display="none";crtv.style.display="block";zoomState=!zoomState}}document.getElementById("sldr_clip").addEventListener("click",togZoom);document.getElementById("sldr_zm").addEventListener("click",togZoom)}SliderLauncherD(edata["NZHSlider"])}if(edata["pushdown"])(function(){function Pushdown(){var t=
this;t.curl=decodeURIComponent(edata["pushdown"]["curl"]);t.imptrk=decodeURIComponent(edata["pushdown"]["imptrk"]);t.cta=decodeURIComponent(edata["pushdown"]["cta"]);t.logo=decodeURIComponent(edata["pushdown"]["logo"]);t.videoHq=decodeURIComponent(edata["pushdown"]["videoHq"]);t.videoLq=decodeURIComponent(edata["pushdown"]["videoLq"]);t.backupHq=decodeURIComponent(edata["pushdown"]["backupHq"]);t.backupLq=decodeURIComponent(edata["pushdown"]["backupLq"]);t.fcid=edata["fcid"];t.pdEnv=edata["pushdown"]["pdEnv"];
if(t.imptrk)t.imptrk='\x3cimg src\x3d"'+t.imptrk+'" style\x3d"display:none;width:1px;height:1px;"\x3e';t.sasimp=t.curl.replace("adclick","count/act\x3d1");t.sasimp='\x3cimg src\x3d"'+t.sasimp+'" style\x3d"display:none;width:1px;height:1px;"\x3e';t.sasact=t.curl.replace("adclick","count/act\x3d3");t.sasact='\x3cimg src\x3d"'+t.sasact+'" style\x3d"display:none;width:1px;height:1px;"\x3e';t.enviros={"desktop":{"vparams":"playsinline preload loop muted","vasset":t.videoHq,"iasset":t.backupHq},"mobile-data":{"vparams":"playsinline preload loop",
"vasset":t.videoLq,"iasset":t.backupLq},"mobile-wifi":{"vparams":"playsinline preload loop muted","vasset":t.videoLq,"iasset":t.backupLq},"wifi-ios-10":{"vparams":"playsinline preload loop muted","vasset":t.videoLq,"iasset":t.backupLq}};t.window_sY;t.window_w;t.nzh_hamnav;t.main;t.pd_div;t.pd_clip;t.pd_crtv;t.pd_closebtn;t.pd_down;t.pd_logo_link;t.pd_overlay_link;t.main_w;t.main_h;t.main_x;t.pd_view;t.pd_cont=document.createElement("div");t.pd_cont.setAttribute("id","pd_div");t.pd_appeared=false;
t.pd_closeNavBtn=document.getElementById("nav-toggle");t._loadScript=function(url,callback){var script=document.createElement("script");script.type="text/javascript";if(script.readyState)script.onreadystatechange=function(){if(script.readyState=="loaded"||script.readyState=="complete"){script.onreadystatechange=null;if(callback)callback()}};else script.onload=function(){if(callback)callback()};script.src=url;document.getElementsByTagName("head")[0].appendChild(script)};t._loadCss=function(url,callback){var pdcss=
document.createElement("link");pdcss.type="text/css";pdcss.rel="stylesheet";pdcss.href=url;document.head.appendChild(pdcss);if(callback)callback()};t._getMarkupTemplate=function(){var parser=new DOMParser;var m="";m+='  \x3cdiv id\x3d"pd_controls"\x3e';m+='    \x3cdiv id\x3d"pd_closebtn"\x3e\x3c/div\x3e';m+="  \x3c/div\x3e";m+='  \x3cdiv id\x3d"pd_logo"\x3e';m+='    \x3ca target\x3d"_blank" href\x3d"'+t.curl+'"\x3e\x3cimg src\x3d"'+t.logo+'"\x3e\x3c/a\x3e';m+="  \x3c/div\x3e";m+='  \x3cdiv id\x3d"pd_overlay"\x3e';
m+='    \x3ca target\x3d"_blank" href\x3d"'+t.curl+'"\x3e\x3cimg src\x3d"'+t.cta+'"\x3e\x3c/a\x3e';m+="  \x3c/div\x3e";m+='  \x3cdiv id\x3d"pd_up"\x3e';m+='    \x3cspan id\x3d"pd_uptext"\x3eADVERTISEMENT\x3c/span\x3e';m+="  \x3c/div\x3e";m+='  \x3cdiv id\x3d"pd_down"\x3e';m+='    \x3cdiv id\x3d"pd_downarrow"\x3e';m+='      \x3ca href\x3d"#"\x3e';m+='        \x3cspan id\x3d"pd_bottom"\x3e\x3c/span\x3e';m+="      \x3c/a\x3e";m+="    \x3c/div\x3e";m+="    \x3cbr\x3e";m+='    \x3cspan id\x3d"pd_downtext"\x3eCONTINUE TO NZ HERALD\x3c/span\x3e';
m+="  \x3c/div\x3e";m+='  \x3cdiv id\x3d"pd_shadow"\x3e\x3c/div\x3e';m+='  \x3cdiv id\x3d"pd_clip"\x3e';m+='    \x3cdiv id\x3d"pd_crtv" style\x3d"display: block;"\x3e';m+="    \x3c/div\x3e";m+="  \x3c/div\x3e";var markup=parser.parseFromString(m,"text/html");return markup};t._generateFinalMarkup=function(markup){t.pd_cont.innerHTML=markup};t._addEventListeners=function(){window.addEventListener("resize",t._adjustContainer);t.pd_closebtn.addEventListener("click",t._removePushdown);t.pd_down.addEventListener("click",
t._removePushdown);t.pd_logo_link.addEventListener("click",t._clickTrack);t.pd_overlay_link.addEventListener("click",t._clickTrack);t.pd_closeNavBtn.addEventListener("click",t.handleNavOpenAndClose)};t._removeEventListeners=function(){t.pd_closebtn.removeEventListener("click",t._removePushdown);t.pd_down.removeEventListener("click",t._removePushdown);window.removeEventListener("resize",t._adjustContainer);t.pd_logo_link.removeEventListener("click",t._clickTrack);t.pd_overlay_link.removeEventListener("click",
t._clickTrack);t.pd_closeNavBtn.removeEventListener("click",t.handleNavOpenAndClose)};t._addToDOM=function(){t.main=document.getElementById("main");t.main.insertBefore(t.pd_cont,t.main.firstChild);t.nzh_hamnav=document.querySelector(".compressed .site-logo-wrapper");t.pd_div=document.getElementById("pd_div");t.pd_clip=document.getElementById("pd_clip");t.pd_crtv=document.getElementById("pd_crtv");t.pd_closebtn=document.getElementById("pd_closebtn");t.pd_down=document.getElementById("pd_down");t.pd_logo_link=
document.querySelector("#pd_logo a");t.pd_overlay_link=document.querySelector("#pd_overlay a");t.main_w=t.main.offsetWidth;t.main_h=t.main_w/1.78;t.main_x=t.main.getBoundingClientRect();t.main_x=t.main_x.left;t._addEventListeners()};t._showPushdown=function(){t.pd_div.style.display="block";t._adjustContainer();t.pd_div.style.opacity="1";t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdCreativeView/fcid\x3d'+t.fcid+'"\x3e');
t.pd_cont.insertAdjacentHTML("afterend",t.sasimp)};t._clickTrack=function(){console.log("PD click track!");t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dPushdownClick/fcid\x3d'+t.fcid+'"\x3e')};t._checkScroll=function(){t.pd_view=viewability.vertical(t.pd_div);t.pd_view=t.pd_view["value"];t.pd_div.style.opacity=t.pd_view;t.window_sY=window.pageYOffset};t._adjustContainer=function(){t.main_w=t.main.offsetWidth;t.main_h=
t.main_w/1.78;t.main_x=t.main.getBoundingClientRect();t.main_x=t.main_x.left;t.pd_div.style.height=t.main_h+"px";t.pd_clip.style.height=t.main_h+"px";t.pd_crtv.style.height=t.main_h+"px";t.pd_clip.style.width=t.main_w+"px";t.pd_crtv.style.width=t.main_w+"px";t.pd_crtv.style.left=t.main_x+"px";t.window_w=window.innerWidth;if(t.window_w<567&&t.nzh_hamnav)t.nzh_hamnav.style.marginTop=t.main_h+10+"px";else if(t.nzh_hamnav)t.nzh_hamnav.style.removeProperty("margin-top")};t._removePushdown=function(){t.pd_div.style.height=
"0px";t.pd_clip.style.height="0px";if(t.nzh_hamnav)t.nzh_hamnav.style.removeProperty("margin-top");t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdClosed/fcid\x3d'+t.fcid+'"\x3e');t._removeEventListeners()};t.handleNavOpenAndClose=function(){setTimeout(function(){t._adjustContainer()},350)};t._loadCss("https://nzme-ads-production.s3.amazonaws.com/css/pushdown.css")}function PushdownVideo(){Pushdown.call(this);var t=
this;var pd_video;var pd_videoClick;var pd_rdy;var pd_video_rdy;var pd_hasplayed;var pd_volumebtn;var pd_mutebtn;var pd_unmutebtn;var pd_firstRun=true;var pd_overlay;var pd_logo;var firstplay=true;var firstend=true;var soundUnmuted=false;var vctime,vdur,vprc;var vtime25=false;var vtime50=false;var vtime75=false;var vtime100=false;var vtime5sec=false;t.generateVideoMarkup=function(){var markupTemplate=t._getMarkupTemplate();var controlsMarkup="";controlsMarkup+='\x3cdiv id\x3d"pd_volumebtn"\x3e';controlsMarkup+=
' \x3cimg id\x3d"pd_mutebtn" src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/mute.png"\x3e';controlsMarkup+=' \x3cimg id\x3d"pd_unmutebtn" src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/vol.png"\x3e';controlsMarkup+="\x3c/div\x3e";var tar=markupTemplate.querySelector("#pd_closebtn");tar.insertAdjacentHTML("afterend",controlsMarkup);var crtvMarkup="";crtvMarkup+='\x3ca id\x3d"pd_videoClick" target\x3d"_blank" href\x3d"'+t.curl+'"\x3e';crtvMarkup+='\x3cvideo id\x3d"pd_video" class\x3d"video-js"'+
t.enviros[t.pdEnv]["vparams"];crtvMarkup+=' poster\x3d"'+t.enviros[t.pdEnv]["iasset"]+'" data-setup\x3d"{}" width\x3d"100%" height\x3d"100%"\x3e';crtvMarkup+=' \x3csource src\x3d"'+t.enviros[t.pdEnv]["vasset"]+'" type\x3d"video/mp4"\x3e';crtvMarkup+="\x3c/video\x3e";crtvMarkup+="\x3c/a\x3e";tar=markupTemplate.querySelector("#pd_crtv");tar.insertAdjacentHTML("afterbegin",crtvMarkup);var output=markupTemplate.body.innerHTML;t._generateFinalMarkup(output)};t.initVideoElements=function(){pd_video=videojs("pd_video");
pd_rdy=false;pd_video_rdy=false;pd_hasplayed=false;pd_videoClick=document.getElementById("pd_videoClick");pd_volumebtn=document.getElementById("pd_volumebtn");pd_mutebtn=document.getElementById("pd_mutebtn");pd_unmutebtn=document.getElementById("pd_unmutebtn");pd_logo=document.getElementById("pd_logo");pd_overlay=document.getElementById("pd_overlay")};t.videoClickThrough=function(){pd_video.pause()};t.onVideoReady=function(){videojs("pd_video").ready(function(){var timeEvent=function(){var vctime=
Math.round(pd_video.currentTime());var vdur=Math.round(pd_video.duration());var vprc=Math.round(vctime/vdur*100);if(!vtime25)if(vprc>=25){vtime25=true;t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdFirstQuartile/fcid\x3d'+t.fcid+'"\x3e')}if(!vtime50)if(vprc>=50){vtime50=true;t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdMidPoint/fcid\x3d'+
t.fcid+'"\x3e')}if(!vtime75)if(vprc>=75){vtime75=true;t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdThirdQuartile/fcid\x3d'+t.fcid+'"\x3e')}if(!vtime100)if(vprc>=100){vtime100=true;t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdComplete/fcid\x3d'+t.fcid+'"\x3e')}};pd_video.on("timeupdate",timeEvent);pd_video.on("firstplay",function(){if(firstplay){t.pd_cont.insertAdjacentHTML("afterend",
'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dAdStart/fcid\x3d'+t.fcid+'"\x3e');if(t.imptrk)t.pd_cont.insertAdjacentHTML("afterend",t.imptrk);firstplay=false}});t.addPushdownVideoEvents();pd_video_rdy=true})};t.videoSoundToggle=function(){if(pd_video.muted()==true){if(soundUnmuted==false){soundUnmuted=true;t.pd_cont.insertAdjacentHTML("afterend",'\x3cimg style\x3d"display:none;" src\x3d"https://data.apn.co.nz/apnnz/count/actname\x3dPushdownSoundOn/fcid\x3d'+
t.fcid+'"\x3e')}pd_video.muted(false);pd_unmutebtn.style.display="inline-block";pd_mutebtn.style.display="none"}else if(pd_video.muted()==false){pd_video.muted(true);pd_unmutebtn.style.display="none";pd_mutebtn.style.display="inline-block"}};t.videoPlay=function(){if(pd_video_rdy==true){pd_video.play();pd_hasplayed=true}};t.videoCheckScroll=function(){t._checkScroll();if(t.window_sY<t.main_h&&pd_hasplayed==false&&pd_video_rdy==true){t._showPushdown();t.videoPlay();window.scrollTo(0,0)}if(pd_hasplayed==
true&&t.pd_view<=.29&&pd_firstRun==false){pd_video.muted(true);pd_unmutebtn.style.display="none";pd_mutebtn.style.display="inline-block";pd_video.pause()}if(t.pd_view>=.3)t.videoPlay();pd_firstRun=false};t.addPushdownVideoEvents=function(){window.addEventListener("scroll",t.videoCheckScroll);pd_volumebtn.addEventListener("click",t.videoSoundToggle);t.pd_logo_link.addEventListener("click",t.videoClickThrough);t.pd_overlay_link.addEventListener("click",t.videoClickThrough);pd_videoClick.addEventListener("click",
t.videoClickThrough);pd_videoClick.addEventListener("click",t._clickTrack);t.pd_closebtn.addEventListener("click",t.removePushdownVideo);t.pd_down.addEventListener("click",t.removePushdownVideo)};t.removePushdownVideo=function(){pd_video.pause();window.removeEventListener("scroll",t.videoCheckScroll);pd_volumebtn.removeEventListener("click",t.videoSoundToggle);t.pd_logo_link.removeEventListener("click",t.videoClickThrough);t.pd_overlay_link.removeEventListener("click",t.videoClickThrough);pd_videoClick.removeEventListener("click",
t.videoClickThrough);pd_videoClick.removeEventListener("click",t._clickTrack);t.pd_closebtn.removeEventListener("click",t.removePushdownVideo);t.pd_down.removeEventListener("click",t.removePushdownVideo)};t.initPushdownVideo=function(){t.generateVideoMarkup();t._addToDOM();t.initVideoElements();if(edata["pushdown"]["facebook"]){var fburl=decodeURIComponent(edata["pushdown"]["facebook"]);pd_overlay.innerHTML='\x3ciframe src\x3d"https://www.facebook.com/plugins/share_button.php?href\x3d'+fburl+'\x26layout\x3dbutton\x26size\x3dlarge\x26mobile_iframe\x3dtrue\x26appId\x3d1711736142399512\x26width\x3d73\x26height\x3d28" width\x3d"73" height\x3d"28" style\x3d"border:none;overflow:hidden" scrolling\x3d"no" frameborder\x3d"0" allowTransparency\x3d"true"\x3e\x3c/iframe\x3e';
pd_overlay.style.zIndex=5}t.onVideoReady();setTimeout(t.videoCheckScroll,500)};t._loadCss("//vjs.zencdn.net/5.8.8/video-js.css");t._loadScript("//cdn.jsdelivr.net/viewability/latest/viewability.min.js",t._loadScript("//vjs.zencdn.net/4.7.1/video.js",t.initPushdownVideo))}function PushdownStatic(){Pushdown.call(this);var t=this;var pd_imageClick;t.generateStaticMarkup=function(){var markupTemplate=t._getMarkupTemplate();var crtvMarkup="";crtvMarkup+='\x3ca id\x3d"pd_imageClick" href\x3d"'+t.curl+'" target\x3d"_blank"\x3e\x3cimg src\x3d"'+
t.enviros[t.pdEnv]["iasset"]+'" style\x3d"width:100%;"\x3e\x3c/a\x3e';var tar=markupTemplate.querySelector("#pd_crtv");tar.insertAdjacentHTML("afterbegin",crtvMarkup);var output=markupTemplate.body.innerHTML;t._generateFinalMarkup(output)};t.staticCheckScroll=function(){t._checkScroll();if(t.window_sY<t.main_h&&t.pd_appeared==false){t._showPushdown();window.scrollTo(0,0);t.pd_appeared=true;if(t.imptrk)t.pd_cont.insertAdjacentHTML("afterend",t.imptrk)}};t.addPushdownStaticEvents=function(){window.addEventListener("scroll",
t.staticCheckScroll);pd_imageClick.addEventListener("click",t._clickTrack);t.pd_closebtn.addEventListener("click",t.removePushdownStatic);t.pd_down.addEventListener("click",t.removePushdownStatic)};t.removePushdownStatic=function(){pd_imageClick.removeEventListener("click",t._clickTrack);t.pd_closebtn.removeEventListener("click",t.removePushdownStatic);t.pd_down.removeEventListener("click",t.removePushdownStatic);window.removeEventListener("scroll",t.staticCheckScroll)};t.initPushdownStatic=function(){t.generateStaticMarkup();
t._addToDOM();pd_imageClick=document.getElementById("pd_imageClick");t.addPushdownStaticEvents();setTimeout(t.staticCheckScroll,500)};t._loadScript("//cdn.jsdelivr.net/viewability/latest/viewability.min.js",t.initPushdownStatic.bind(t))}if(!edata["pushdown"]["videoHq"]&&!edata["pushdown"]["videoLq"]){PushdownStatic.prototype=Object.create(Pushdown.prototype);PushdownStatic.prototype.constructor=PushdownStatic;var pushdownStatic=new PushdownStatic}else{PushdownVideo.prototype=Object.create(Pushdown.prototype);
PushdownVideo.prototype.constructor=PushdownVideo;var pushdownVideo=new PushdownVideo}})();if(edata["billboardAdvClose"])(function(){var container=iframeID.parentElement;var closebtn=document.createElement("div");closebtn.style.cssText="background: url(https://nzme-ads-production.s3.amazonaws.com/img/inertia_close.jpg); background-attachment: initial; background-clip: initial; background-color: initial; background-origin: initial; background-position-y: initial; background-position-x: initial; background-size: 42px 42px; box-shadow: -3px 1px 4px rgba(0, 0, 0, 0.2); cursor: pointer; height: 42px; margin-bottom: 5px; position: absolute; right: 0px; width: 42px; z-index: 999;";
function secondsUntilMidnight(){var midnight=new Date;midnight.setHours(24);midnight.setMinutes(0);midnight.setSeconds(0);midnight.setMilliseconds(0);return(midnight.getTime()-(new Date).getTime())/1E3}function setTag(){var advid=edata["billboardAdvClose"]["advid"];var secondsToLive=parseInt(secondsUntilMidnight());var bbTag='\x3cimg src\x3d"https://data.apn.co.nz/apnnz/SETTAG/append\x3d1/NAME\x3dbbClosed/TTL\x3d'+secondsToLive+"/TAGS\x3dbbClosed%3D"+advid+'"\x3e';container.insertAdjacentHTML("beforeend",
bbTag);console.log(bbTag)}function closeBB(){setTag();var billboardAdContainer=container.parentElement;billboardAdContainer.parentNode.removeChild(billboardAdContainer)}closebtn.addEventListener("click",closeBB);container.appendChild(closebtn)})();if(edata["billboardSlider"]){var adpos;var targetId;var csssheet=document.createElement("link");csssheet.type="text/css";csssheet.rel="stylesheet";csssheet.href="https://nzme-ads-production.s3.amazonaws.com/css/bbprlx.css";document.head.appendChild(csssheet);
function setCreative(img,cont,adj){var ratio=findRatio(img.clientWidth,img.clientHeight);if(ratio>1&&ratio!=1){img.style.width=cont.clientWidth+"px";img.style.top=(window.innerHeight+adj-img.clientHeight)/2+"px"}else if(ratio<1&&ratio!=1){img.style.height=window.innerHeight-adj+"px";img.style.left=(cont.clientWidth-img.clientWidth)/2+"px";img.style.top=adj+"px"}else if(ratio==1){var inRatio=cont.clientWidth/(window.innerHeight-adj);if(inRatio>1){img.style.height=window.innerHeight-adj+"px";img.style.left=
(cont.clientWidth-img.clientWidth)/2+"px";img.style.top=adj+"px"}else if(inRatio<1){img.style.width=cont.clientWidth+"px";img.style.top=(window.innerHeight-img.clientHeight)/2+"px"}else if(inRatio==1){img.style.width=cont.clientWidth+"px";img.style.top=adj+"px"}}}function setBGWidth(img,cont){var contW=cont.clientWidth;var innerH=window.innerHeight;var ratio=findRatio(img.clientWidth,img.clientHeight);if(ratio>1&&ratio!=1||ratio==1)img.style.height=innerH+"px";else if(ratio<1&&ratio!=1)img.style.width=
contW+"px"}function findRatio(w,h){var ratio=w/h;return ratio}function secondsUntilMidnight(){var midnight=new Date;midnight.setHours(24);midnight.setMinutes(0);midnight.setSeconds(0);midnight.setMilliseconds(0);return(midnight.getTime()-(new Date).getTime())/1E3}function setTag(){var cookieName="billboardPos"+adpos;var secondsToLive=parseInt(secondsUntilMidnight());var bbTag='\x3cimg src\x3d"https://data.apn.co.nz/apnnz/SETTAG/NAME\x3d'+cookieName+"/TTL\x3d"+secondsToLive+"/TAGS\x3d"+cookieName+
'%3dclosed" style\x3d"display:none;width:1px;height:1px;"\x3e';document.getElementById("sldr_div"+targetId).insertAdjacentHTML("beforebegin",bbTag)}function closeBB(e){targetId=e.target.getAttribute("unitid");$("#sldr_div"+targetId).slideUp();$("#sldr_lbltop"+targetId).hide();$("#sldr_lblbot"+targetId).hide();collapse(target,"up")}function SliderLauncherD(c){var unitId=c["unitId"];adpos=c["adpos"];var lsitever=c["lsitever"];var lmedia=c["lmedia"];lmedia=decodeURIComponent(lmedia);var lcurl=c["lcurl"];
lcurl=decodeURIComponent(lcurl);var limptrk=c["limptrk"];limptrk=decodeURIComponent(limptrk);if(limptrk)limptrk='\x3cimg src\x3d"'+limptrk+'" style\x3d"display:none;width:1px;height:1px;"\x3e';else limptrk="";var sasimp=lcurl.replace("adclick","count/act\x3d1");sasimp='\x3cimg src\x3d"'+sasimp+'" style\x3d"display:none;width:1px;height:1px;"\x3e';var zoomtrack=lcurl.replace("adclick","count/act\x3d3");zoomtrack='\x3cimg src\x3d"'+zoomtrack+'" style\x3d"display:none;width:1px;height:1px;"\x3e';var zoomTracked=
false;var lotameZoomTracked=false;var markup='\x3cdiv id\x3d"sldr_div'+unitId+'" class\x3d"sldr_div" style\x3d"width:970px;"\x3e'+'\x3cdiv id\x3d"cubecont'+unitId+'" class\x3d"cubecont"\x3e'+'\x3cdiv class\x3d"cssload-thecube"\x3e'+'\x3cdiv class\x3d"cssload-cube cssload-c1"\x3e\x3c/div\x3e'+'\x3cdiv class\x3d"cssload-cube cssload-c2"\x3e\x3c/div\x3e'+'\x3cdiv class\x3d"cssload-cube cssload-c4"\x3e\x3c/div\x3e'+'\x3cdiv class\x3d"cssload-cube cssload-c3"\x3e\x3c/div\x3e'+"\x3c/div\x3e"+"\x3c/div\x3e"+
'\x3cdiv id\x3d"sldr_clip'+unitId+'" class\x3d"sldr_clip" unitId\x3d"'+unitId+'"\x3e'+'\x3cdiv id\x3d"sldr_crtv'+unitId+'" class\x3d"sldr_crtv"\x3e'+'\x3cimg id\x3d"sldr_bg'+unitId+'" class\x3d"sldr_bg" src\x3d"'+lmedia+'" unitId\x3d"'+unitId+'"\x3e'+'\x3cimg id\x3d"sldr_img'+unitId+'" class\x3d"sldr_img" src\x3d"'+lmedia+'" unitId\x3d"'+unitId+'"\x3e'+"\x3c/div\x3e"+"\x3c/div\x3e"+'\x3cspan id\x3d"sldr_lbltop'+unitId+'" class\x3d"sldr_lbltop"\x3e\x26#9660; Advertisement \x26#9660;\x3c/span\x3e'+
'\x3cspan id\x3d"sldr_lblbot'+unitId+'" class\x3d"sldr_lblbot"\x3eClick Ad to Expand\x3c/span\x3e'+limptrk+sasimp+"\x3c/div\x3e";var sliderTarget=iframeID.parentElement.parentElement;if(sliderTarget){sliderTarget.innerHTML=markup;sliderTarget.style.position="relative"}var zoom='\x3ca id\x3d"sldr_close'+unitId+'" class\x3d"sldr_close" unitId\x3d"'+unitId+'" href\x3d"##"\x3e'+'\x3cimg src\x3d"https://nzme-ads-production.s3.amazonaws.com/img/rsz_close.png" width\x3d"50" unitId\x3d"'+unitId+'"\x3e'+"\x3c/a\x3e"+
'\x3cdiv id\x3d"sldr_zm'+unitId+'" class\x3d"sldr_zm" unitId\x3d"'+unitId+'"\x3e'+'\x3ca href\x3d"'+lcurl+'" target\x3d"_blank"\x3e'+'\x3cimg id\x3d"sldr_zm_img'+unitId+'" class\x3d"sldr_zm_img" src\x3d"'+lmedia+'"\x3e'+"\x3c/a\x3e"+"\x3c/div\x3e";var zoomIns=document.getElementsByTagName("body")[0];if(zoomIns){zoomIns.insertAdjacentHTML("afterbegin",zoom);document.getElementById("sldr_close"+unitId).style.display="none";document.getElementById("sldr_zm"+unitId).style.display="none"}var zoomState=
false;function togZoom(e){var targetId=e.target.getAttribute("unitid");if(zoomState===false){document.getElementById("sldr_zm"+targetId).style.opacity=1;document.getElementById("sldr_zm"+targetId).style.height="100vh";document.getElementById("sldr_zm"+targetId).style.display="inline-block";document.getElementById("sldr_zm_img"+targetId).style.height="auto";document.getElementById("sldr_close"+targetId).style.display="block";document.getElementById("sldr_img"+targetId).style.display="none";zoomState=
true;if(zoomTracked===false){document.body.insertAdjacentHTML("afterbegin",zoomtrack);zoomTracked=true}}else if(zoomState===true){document.getElementById("sldr_zm"+targetId).style.opacity=0;document.getElementById("sldr_zm"+targetId).style.height=0;document.getElementById("sldr_zm_img"+targetId).style.height=0;document.getElementById("sldr_img"+targetId).style.display="block";zoomState=false}}document.getElementById("sldr_clip"+unitId).addEventListener("click",togZoom);document.getElementById("sldr_close"+
unitId).addEventListener("click",togZoom);document.getElementById("sldr_zm"+unitId).addEventListener("click",togZoom);var bg=document.getElementById("sldr_bg"+unitId);var img=document.getElementById("sldr_img"+unitId);var cont=document.getElementById("sldr_div"+unitId);var sldrzm=document.getElementById("sldr_zm"+unitId);var sldrzmimg=document.getElementById("sldr_zm_img"+unitId);$("img#sldr_bg"+unitId).on("load",function(){if(lsitever)$("#sldr_div"+unitId)[0].parentElement.style.maxWidth="970px";
setCreative(img,cont,0);setBGWidth(bg,cont);setTimeout(function(){$("#cubecont"+unitId).slideUp("slow",function(){document.getElementById("cubecont"+unitId).style.height=0;img.style.visibility="true"})},500)})}SliderLauncherD(edata["billboardSlider"])}if(edata["anSync"]){function anSync(c){var ran=edata["nzmeAdID"];var pix='\x3cimg src\x3d"https://secure.adnxs.com/getuid?https%3A%2F%2Fbcp.crwdcntrl.net%2Fmap%2Fc\x3d281%2Frand\x3d'+ran+'%2Ftpid%3D%24UID%2Ftp%3DANXS" height\x3d"1" width\x3d"1"\x3e'+
'\x3cimg src\x3d"https://data.apn.co.nz/apnnz/SETTAG/NAME\x3dANSYNC/TTL\x3d3600/TAGS\x3dANSYNC%3Dy"\x3e';document.body.insertAdjacentHTML("beforeend",pix)}anSync(edata["anSync"])}}},false);
var nzmeads;

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

(function ($) {

	var mobile = isMobile.any();

	console.log('nzmeads: global ad script v15.0.0');

	nzmeads = {

		log: function (msg) {
			console.log(msg);
		},

		detectLog: function () {
			if (document.location.href.indexOf('adlog') == -1) {
				nzmeads.log = function () {}
			}
		},

		loadScript: function (url, callback) {
			var startT = new Date().getTime();
			var script = document.createElement("script");
			script.type = "text/javascript";

			if (script.readyState) { //IE
				script.onreadystatechange = function () {
					if (script.readyState == "loaded" ||
						script.readyState == "complete") {
						script.onreadystatechange = null;
						if (callback) {
							callback();
						}
					}
				};
			} else { //Others
				script.onload = function () {
					var stopT = new Date().getTime();
					nzmeads.log('nzmeads: script loaded, took: ' + (stopT - startT));
					if (callback) {
						callback();
					}
				};
			}

			script.src = url;
			document.getElementsByTagName("head")[0].appendChild(script);
		},

		getCookieValue: function (a) {
			var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
			return b ? b.pop() : '';
		},

		// Gets the value of the query parameter where name is the key and char is the character that separates the parameters
		getParameter: function (name, url, char) {
			if (!url) url = window.location.href;
			if (!char) char = '&';
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?" + char + "]" + name + "(=([^" + char + "#]*)|" + char + "|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " ")).toLowerCase();
		},

		// Sets the value of a key in a query string given a uri
		setParameter: function(uri, key, value) {
			key = key + '=';
			// Only replace if the uri contains the key
			if (uri.indexOf(key) > -1) {
				var startPos = uri.indexOf(key) + key.length;
				if (uri.indexOf('/', startPos) > -1) {
					var endPos = uri.indexOf('/', startPos);
					var oldValue = uri.substring(startPos, endPos);
					uri = uri.replace(oldValue, value);
					return uri;
				// key is the last query parameter so there's no / at the end
				} else {
					var oldValue = uri.substring(startPos);
					uri = uri.replace(oldValue, value);
					return uri;
				}
			} else {
				console.log('global-ad-script.js setParameter: Key does not exist!');
			}
		},

		browserWidth: $(window).width(),

		getRandomNumber: function (range) { // Used for defining random numbers on the fly, or numbers that can stay consistent.
			return Math.round(Math.random() * range);
		},

		viewId: Math.round(Math.random() * 10000000000),

		syncId: Math.floor((Math.random() * 6) + 1),

		slots: [],

		units: {
			lead: 0,
			rect: 0,
			drec: 0,
			bbrd: 0,
			mast: 0
		},

		recpos: 0,

		cats: "",

		setCats: function () {
			if (typeof oParams === 'undefined' || typeof oParams["content_topics"] === 'undefined') {
				nzmeads.log('nzmeads: no oParams found');
				return;
			} else {
				var cats = oParams["content_topics"];
				cats = cats.replace(/c-/g, "");
				cats = cats.replace(/\|/g, ",");
				nzmeads.log('nzmeads: found oParams content_topics: ' + cats);
				nzmeads.cats = cats;
			}
		},

		prebid: {

			loaded: false,

			pageVars: {
				set: '',
				vert: '',
				dev: ''
			},

			adUnits: [],

			r_aid: 14232,

			map: {
				'nzh': {
					r_sid: {
						'desktop': '162214',
						'mobile': '162590'
					},
					placements: {
						'home': {
							'bigbanner1': {
								a_pid: '12457672',
								a_sizes: [
									[970, 250],
									[728, 90]
								],
								r_zid: '777408',
								r_sizes: [57, 2]
							},
							'bigbanner2': {
								a_pid: '12458059',
								a_sizes: [970, 250],
								r_zid: '777410',
								r_sizes: [57]
							},
							'doublerect1': {
								a_pid: '12458062',
								a_sizes: [
									[300, 250],
									[300, 600]
								],
								r_zid: '777412',
								r_sizes: [15, 10]
							},
							'doublerect2': {
								a_pid: '12458063',
								a_sizes: [300, 600],
								r_zid: '777414',
								r_sizes: [10]
							},
							'rectangle1': {
								a_pid: '12458068',
								a_sizes: [300, 250],
								r_zid: '777416',
								r_sizes: [15]
							},
							'rectangle2': {
								a_pid: '12458068',
								a_sizes: [300, 250],
								r_zid: '777416',
								r_sizes: [15]
							},
							'rectangle3': {
								a_pid: '12458071',
								a_sizes: [300, 250],
								r_zid: '777418',
								r_sizes: [15]
							}
						},
						'index': {
							'bigbanner1': {
								a_pid: '12556048',
								a_sizes: [
									[970, 250],
									[728, 90]
								],
								r_zid: '796244',
								r_sizes: [57, 2]
							},
							'doublerect1': {
								a_pid: '12556049',
								a_sizes: [
									[300, 250],
									[300, 600]
								],
								r_zid: '796246',
								r_sizes: [15, 10]
							},
							'rectangle1': {
								a_pid: '12556050',
								a_sizes: [300, 250],
								r_zid: '796248',
								r_sizes: [15]
							}
						},
						'article': {
							'bigbanner1': {
								a_pid: '12556047',
								a_sizes: [
									[970, 250],
									[728, 90]
								],
								r_zid: '796242',
								r_sizes: [57, 2]
							},
							'rectangle1': {
								a_pid: '12458126',
								a_sizes: [
									[300, 250],
									[300, 600]
								],
								r_zid: '777402',
								r_sizes: [15, 10]
							},
							'rectangle2': {
								a_pid: '12458142',
								a_sizes: [300, 250],
								r_zid: '777406',
								r_sizes: [15]
							},
							'rectangle3': {
								a_pid: '12458140',
								a_sizes: [300, 250],
								r_zid: '777404',
								r_sizes: [15]
							}
						},
						'video': { //get a new set supplied
							'rectangle1': {
								a_pid: '12600808',
								a_sizes: [300, 250],
								r_zid: '806346',
								r_sizes: [15]
							}
						},
						'mobile': {
							'rectangle1': {
								a_pid: '12458160',
								a_sizes: [300, 250],
								r_zid: '780266',
								r_sizes: [15]
							},
							'rectangle2': {
								a_pid: '12458168',
								a_sizes: [300, 250],
								r_zid: '780268',
								r_sizes: [15]
							}
						}
					}
				},
				'catchall': {
					r_sid: {
						'desktop': '162214',
						'mobile': '162590'
					},
					placements: {
						'desktop': {
							'bigbanner': {
								a_pid: '12457672',
								a_sizes: [728, 90],
								r_zid: '777408'
							},
							'doublerect': {
								a_pid: '12458071',
								a_sizes: [300, 600],
								r_zid: '777418',
								r_sizes: [10]
							},
							'rectangle': {
								a_pid: '12458071',
								a_sizes: [300, 250],
								r_zid: '777418',
								r_sizes: [15]
							}
						},
						'mobile': {
							'rectangle': {
								a_pid: '12458168',
								a_sizes: [300, 250],
								r_zid: '780268',
								r_sizes: [15]
							}
						}
					}
				}
			}

		},

		pbLoaded: function () {
			nzmeads.prebid.loaded = true;
			nzmeads.log('nzmeads: pbLoaded = true');
		},

		setPBVars: function () {
			var href = $('.pb-ad-container').attr('data-href');

			if (href) {
				var pt = nzmeads.getParameter('PT', href, '/');
				var area = nzmeads.getParameter('AREA', href, '/');
				if (area) {
					area = area.toLowerCase();
				}
				var dev;
				var kpexVerts = ['home', 'entertainment', 'property', 'travel', 'lifestyle', 'technology', 'sport', 'news', 'business', 'motoring'];

				if (kpexVerts.indexOf(area) > -1) {
					nzmeads.prebid.vert = area;
				} else {
					nzmeads.prebid.vert = 'news';
				}

				if (mobile) {
					nzmeads.log('nzmeads: setPBVars mobile');
					nzmeads.prebid.pageVars.dev = 'mobile';

				} else {
					nzmeads.log('nzmeads: setPBVars desktop');
					nzmeads.prebid.pageVars.dev = 'desktop';

					if (area == 'home') {
						//use home set
						nzmeads.prebid.pageVars.set = 'home';
					} else if (pt == 'index' || pt == 'article' || pt == 'video') {
						//use valid defined set "index/article/video"
						nzmeads.prebid.pageVars.set = pt;
					} else {
						//use fallback article set
						nzmeads.prebid.pageVars.set = 'catchall';
					}
				}
				nzmeads.log('nzmeads: setPBVars vert' + nzmeads.prebid.vert);

			} else {
				nzmeads.log('nzmeads: setPBVars - no data-href detected');
			}
		},

		pushPBAd: function (divId, sizename, pos) {

			var set = nzmeads.prebid.pageVars.set;
			var dev = nzmeads.prebid.pageVars.dev;
			var adspot = sizename + pos;
			var placement, site;
			var a_sizes, a_pid, r_sid, r_zid, r_sizes;

			if (dev === 'mobile') {
				site = nzmeads["prebid"]["map"]["nzh"];
				placement = site["placements"]["mobile"][adspot];
			} else {
				site = nzmeads["prebid"]["map"]["nzh"];
				placement = site["placements"][set][adspot];
			}

			if (!placement) {
				site = nzmeads["prebid"]["map"]["catchall"];
				placement = site["placements"][dev][sizename];
				nzmeads.log('nzmeads: pushPBAd - running CATCHALL for ' + adspot);
				if (!placement) {
					nzmeads.log('nzmeads: pushPBAd - no CATCHALL found for ' + adspot);
					return false;
				}
			}

			a_sizes = placement["a_sizes"];
			a_pid = placement["a_pid"];
			r_sid = site["r_sid"][dev];
			r_zid = placement["r_zid"];
			r_sizes = placement["r_sizes"];

			var adunit = {
				code: divId,
				mediaTypes: {
					banner: {
						sizes: a_sizes,
					}
				},
				bids: [{
						bidder: 'appnexus',
						sizes: a_sizes,
						params: {
							placementId: a_pid,
							keywords: {
								vert: [nzmeads.prebid.vert],
								prebid: ['true']
							},
							referrer: window.location.href
						}
					},
					{
						bidder: 'rubicon',
						params: {
							accountId: nzmeads.prebid.r_aid,
							siteId: r_sid,
							zoneId: r_zid,
							sizes: r_sizes,
							vertical: [nzmeads.prebid.vert],
							inventory: {
								"vertical": [nzmeads.prebid.vert]
							}
						}
					}
				]
			}
			nzmeads.prebid.adUnits.push(adunit);

		},

		runPB: function (callback) {

			pbjs.bidderSettings = {
				standard: {
					bidCpmAdjustment: function (bidCpm) {
						// adjust the bid in real time before the auction takes place
						return bidCpm * 1.4;
					}
				}
			};

			pbjs.que.push(function () {

				var customGranularity = {
					'buckets': [{
							'min': 0,
							'max': 3,
							'increment': 0.01
						},
						{
							'min': 3,
							'max': 7,
							'increment': 0.05
						}
					]
				};

				pbjs.setConfig({
					enableSendAllBids: true,
					priceGranularity: customGranularity
				});

				pbjs.addAdUnits(nzmeads.prebid.adUnits);

				pbjs.requestBids({
					timeout: 2000,
					bidsBackHandler: function () {

						params = pbjs.getAdserverTargeting();
						nzmeads.log('>>>>>>nzmeads: prebid response: ' + JSON.stringify(params));

						if (Object.keys(params).length == 0 || Object.keys(params).length == 1 && params.hasOwnProperty('undefined')) {

							nzmeads.log('XXXXXXnzmeads: prebid - no fill')
						} else {
							nzmeads.log('******nzmeads: prebid - PB filled, adding params');
							nzmeads.addPBParams(params);
						}

						if (callback) {
							nzmeads.log('nzmeads: prebid - 1 callback');
							callback();
						}

					}
				});
			});
		},

		addPBParams: function (p) {

			for (key in p) {

				var $slot = $('#' + key);
				var url = $slot.attr('data-href');
				var hb_bidder = p[key]["hb_bidder"];
				var hb_adid = p[key]["hb_adid"];
				var hb_pb = p[key]["hb_pb"];
				var hb_size = p[key]["hb_size"];
				var size = hb_size.split('x');
				var width = size[0];
				var height = size[1];

				url = url + '/hb_b=' + hb_bidder + '/hb_pb=' + hb_pb + '/hb_adid=' + hb_adid + '/hb_w=' + width + '/hb_h=' + height + '/hb_wid=' + key;
				$slot.attr('data-href', url);
			}

		},

		popSlot: function () {
			var $ad = $(this),
				divId = $ad.attr('id'),
				href = $ad.attr('data-href'),
				width = $ad.attr('data-width'),
				height = $ad.attr('data-height'),
				pos = 0,
				keywords = $ad.attr('data-keywords') ? $ad.attr('data-keywords').split('+') : '',
				loadOnMobile = $ad.data('load-on-mobile'),
				gallery = $ad.attr('data-ad-lazy-load'),
				sizename,
				pb = false;

			//Force https for adcalls
			if (href.substr(0, 2) == "//") {
				href = "https:" + href;
			}
			if (href.substr(0, 5) == "http:") {
				href.replace('http:', 'https:');
			}

			if (width == 300 && height == 250) { //Rectangle 300x250

				if (gallery) { //Article page: gallery unit
					pos = 'GAL';
					nzmeads.recpos = '';
				} else if ($("html").is("[class*='article']") && !gallery) { //Article page: normal unit

					if (nzmeads.browserWidth > 794) { //Desktop BP: Correct the POS values

						//POS param
						nzmeads.units.rect++;

						//RPOS param
						nzmeads.recpos++;

						if (divId.toLowerCase() == 'contentrect') {
							pos = 2;
							nzmeads.units.rect--;
							nzmeads.recpos = 2;
						} else if (nzmeads.units.rect == 1) {
							pos = 1;
							nzmeads.recpos = 1;
						} else if (nzmeads.units.rect == 2) {
							pos = 3;
							nzmeads.recpos = 3;
						}


					} else if (nzmeads.browserWidth < 794) { //Mobile BP: Only serve ContentRect with POS=1

						if (divId.toLowerCase() == 'contentrect') {
							pos = 1;
							nzmeads.recpos = 1;
						} else {
							pos = 0;
						}
					}

				} else { //Non Article page
					nzmeads.units.rect++;
					pos = nzmeads.units.rect;
					nzmeads.recpos++;
				}

				href = href + '/RPOS=' + nzmeads.recpos;
				sizename = 'rectangle';
				pb = true;

			} else if (width == 300 && height == 600) { //Halfpage 300x600

				if (nzmeads.browserWidth < 660) {
					width = 300;
					height = 250;
					nzmeads.units.rect++;
					pos = nzmeads.units.rect;
					href = href.replace(/doublerect/ig, 'RECTANGLE');
					$ad.removeClass('min-height-600');
					$ad.addClass('min-height-250');
					sizename = 'rectangle';

				} else {
					nzmeads.units.drec++;
					pos = nzmeads.units.drec;
					sizename = 'doublerect';

				}
				nzmeads.recpos++;
				href = href + '/RPOS=' + nzmeads.recpos;
				pb = true;

			} else if (width == 728 && height == 90 && nzmeads.browserWidth > 727) {

				nzmeads.units.lead++;
				pos = nzmeads.units.lead;
				pb = true;
				sizename = 'bigbanner';

			} else if ((width == 970 && height == 250 && nzmeads.browserWidth > 727) || (width == 760 && height == 120 && nzmeads.browserWidth > 727)) {

				if (href.toUpperCase().indexOf('/SIZE=') == -1) {
					href = href + "/SIZE=BIGBANNER";
				} else {
					href = href.replace(/billboard/ig, 'BIGBANNER');
				}

				$ad.removeClass('max-width-970 min-height-250 max-width-760 min-height-120');

				width = 728;
				height = 90;
				nzmeads.units.lead++;
				pos = nzmeads.units.lead;
				pb = true;
				sizename = 'bigbanner';

			} else if (width == 300 && height == 50) {

				nzmeads.units.mast++;
				pos = nzmeads.units.mast;
				href = href + '/SIZE=MINIBANNER';

			}

			if (href) {
				href = href.replace('/VURL=WASHPOST', '');
				if (href.toUpperCase().indexOf('/SITE=') == -1) {
					href = href + "/SITE=NZH";
				}
			}

			if (href.toUpperCase().indexOf('/POS=') == -1) {
				href = href + '/POS=' + pos + '/';
			}

			var cats = nzmeads.cats;
			if (cats) {
				cats = "CAT=" + cats + "/";
			}

			var lat = nzmeads.getCookieValue('user_latitude');
			var lng = nzmeads.getCookieValue('user_longitude');

			if (!lat || !lng) { //if any are null, both should be 0
				lat = 0;
				lng = 0;
			}

			// Replace Arc OID with url OID
			href = nzmeads.standardiseOID(href);

			href = href + cats + 'BW=' + nzmeads.browserWidth + '/LATITUDE=' + lat + '/LONGITUDE=' + lng + '/' + 'SYNC=' + nzmeads.syncId + '/' + 'RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/';

			$ad.attr('data-href', href);

			//only render a div ID exists and pos is set, or if is SOC
			if ((divId && pos != 0) || (href.indexOf('SPECIALOFFERCONTAINER') > -1)) {

				if (pb && nzmeads.prebid.loaded && !gallery) {
					//if Prebid is enabled and is not gallery, push adslot to PB adunits array
					nzmeads.log('nzmeads: pushPBAd for id: ' + divId + ' size:' + width + 'x' + height + ' href ' + href);
					nzmeads.pushPBAd(divId, sizename, pos);
				} else if (!gallery) {
					//if not a gallery ad, create standard sas iframe
					nzmeads.log('nzmeads: showOneSlot for id: ' + divId + ' size:' + width + 'x' + height + ' href ' + href);
					nzmeads.showOneSlot('#' + divId);
				}

			} else {
				nzmeads.log('nzmeads: not pushing: div: ' + divId + ' ' + width + 'x' + height + ' href ' + href + ' pos: ' + pos);
				$ad.attr('data-ad-done', 'yes');
			}
		},

		//render iframes for all slots that are not done / yet rendered
		showRemainingSlots: function () {
			nzmeads.log('nzmeads: showRemainingSlots');
			$('.pb-ad-container[data-ad-done!="yes"]').each(function () {

				nzmeads.showOneSlot('#' + $(this).attr('id'));
			});
		},

		//render iframe - pass in divID (or selector), update random param, remove children, create new iframe and flag as done
		showOneSlot: function (slot) {

			var w = $(slot).attr('data-width');
			var h = $(slot).attr('data-height');
			var url = $(slot).attr('data-href');

			url = url.replace(/(random=([^/]*))/ig, '');
			url = url + '/' + 'RANDOM=' + nzmeads.getRandomNumber(10000000000);

			$(slot).empty();

			var adFrame = ($('<iframe/>').attr({
				'height': h,
				'width': w,
				'scrolling': 'no',
				'allowtransparency': 'true',
				'marginWidth': '0',
				'marginHeight': '0',
				'vspace': '0',
				'hspace': '0',
				'noresize': 'true',
				'frameBorder': '0',
				'align': 'left',
				'name': nzmeads.getRandomNumber(10000000000),
				'style': 'border:0px none;padding: 0px ;margin: 0px ;',
				'src': url
			}));

			$(slot).append(adFrame);
			$(slot).attr('data-ad-done', 'yes');
			nzmeads.log('nzmeads: showOneSlot done - ' + $(slot).attr('id'));
		},

		runShowcase: function () {

			nzmeads.log('nzmeads: running showcase!');

			var href = $('.pb-ad-container').attr('data-href');

			if (href) {
				if (href.toUpperCase().indexOf('/SIZE=') == -1) {
					href = href + "/SIZE=LAUNCHER";
				} else {
					href = href.replace(/size=[^/]+/i, 'SIZE=LAUNCHER');
				}

				if (href.toUpperCase().indexOf('/SITE=') == -1) {
					href = href + "/SITE=NZH";
				}

				if (href.toUpperCase().indexOf('/RANDOM=') == -1) {
					href = href + '/RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/';
				}
				href = href.replace('hserver', 'jserver');
			} else {
				href = '//data.apn.co.nz/apnnz/jserver/SITE=NZH/SIZE=LAUNCHER/SV=1/' + 'RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/' + 'BW=' + nzmeads.browserWidth + '/';
			}

			var scr = document.createElement('script');
			scr.src = href;

			$('body').append(scr);

		},

		getPrerollURL: function () {

			var gid = nzmeads.getParameter("gallery_id");
			var cid = nzmeads.getParameter("c_id");

			var videoParams = '';

			if (cid) {
				videoParams = '/CID=' + cid + '/';
			}
			if (gid) {
				videoParams = videoParams + '/GID=' + gid + '/';
			}

			var href = $('.pb-ad-container').attr('data-href');

			if (href) {

				if (href.toUpperCase().indexOf('/SIZE=') == -1) {
					href = href + "/SIZE=PREROLL";
				} else {
					// Match any 'word' that has 'size=' + everything after that that is not a '/'. Stops after it matches a '/'.
					href = href.replace(/size=[^/]+/i, 'SIZE=PREROLL');
				}

				if (href.toUpperCase().indexOf('/SITE=') == -1) {
					href = href + "/SITE=NZH";
				}

				if (href.toUpperCase().indexOf('/RANDOM=') == -1) {
					href = href + '/RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/';
				}

				href = href.replace('hserver', 'tserver');

			} else {
				href = '//data.apn.co.nz/apnnz/tserver/SITE=NZH/SIZE=PREROLL/SV=1/' + 'RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/' + 'BW=' + nzmeads.browserWidth + '/';
			}

			var syncParam = 'SYNC=' + nzmeads.syncId + '/';

			var cats = nzmeads.cats;
			if (cats) {
				cats = "CAT=" + cats + "/";
			}

			href = nzmeads.standardiseOID(href);

			href = href + videoParams + syncParam + cats;
			nzmeads.log('nzmeads: preroll adURL: ' + href);
			return href;
		},

		// There are two OIDs, one from the url (used to target app) and one from ARC (used to target desktop). Use this function to replace the desktop id with the url oid so to roadblock the app and desktop, we just need to use the url oid
		standardiseOID: function(adCall) {
			var url = window.location.href;
			if (url.indexOf('objectid=') > -1) {
				var oid = this.getParameter('objectid', url);
				adCall = this.setParameter(adCall, 'OID', oid);
			}
			return adCall;
		},

		runEvents: function () {

			//Set Prebid page vars
			nzmeads.setPBVars();

			//Build ad params for all adunits and render sas iframe if slot is not PB enabled or is not a gallery ad
			$('.pb-ad-container').each(nzmeads.popSlot);

			//Run PB request if any PB enabled slots exist then render sas iframe - with or without PB params where present
			if (nzmeads.prebid.adUnits.length > 0) {
				nzmeads.log('nzmeads: found PB adunits, running runPB');
				nzmeads.runPB(nzmeads.showRemainingSlots);
			} else {
				nzmeads.log('nzmeads: did not find PB adunits, running showRemainingSlots');
				nzmeads.showRemainingSlots();
			}
		},

		runNonDisplay: function () {

			nzmeads.detectLog();

			nzmeads.log('nzmeads: runNonDisplay');

			//Set categories from oParams
			nzmeads.setCats();

			//--Showcase
			if (mobile) {
				nzmeads.runShowcase();
			}
			//--END Showcase

			//--Native Ad params
			$('.pb-native-ad-container').each(function () {

				//add SITE to native ads if it doesnt exist
				if ($(this).attr('data-href').toUpperCase().indexOf('/SITE=') == -1) {
					nzmeads.log('NATIVE AD DOESNT HAVE SITE');
					var href = $('.pb-ad-container').attr('data-href');
					var site = nzmeads.getParameter('SITE', href, '/');
					nzmeads.log('NATIVE AD FIND HREF' + href);
					if (!site) {
						site = "NZH";
					}

					$(this).attr('data-href', $(this).attr('data-href') + "SITE=" + site);
					nzmeads.log('NATIVE AD HREF', $(this).attr('data-href'));
				} else {
					nzmeads.log('NATIVE AD DOES HAVE SITE');
				}
				//add other params
				$(this).attr('data-href', $(this).attr('data-href') + "/BW=" + nzmeads.browserWidth + "/RANDOM=" + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/');
			});
			//--END Native Ad params
		}
	};

	nzmeads.runNonDisplay();

	//Init: attempt to load PB script then trigger runEvents()
	$.ajax({
		url: 'https://nzme-ads.co.nz/js/prebid1.4.0.js',
		dataType: "script",
		timeout: 2000
	}).done(function () {
		if (document.location.href.indexOf('PREVIEWHINT') > -1) {
			nzmeads.log('nzmeads: prebid loaded but blocked for PREVIEWHINT');
		} else {
			nzmeads.pbLoaded();
			nzmeads.log('nzmeads: prebid loaded');
		}
	}).fail(function (xhr, status, error) {
		nzmeads.log('nzmeads: failed loading prebid', status, error);
	}).always(function () {
		nzmeads.log('nzmeads: runEvents()');
		nzmeads.runEvents();
	});

})(jQuery);
