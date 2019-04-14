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
//*****PostMessage-v1.11.1****//
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
// Begin GlobalFunctions
var startT;

function adopNgmShow(e) {
  document.getElementById('ngmlauncher').style.display = 'block';
  startT = new Date().getTime();
}
/////////////// End Global Functions ///////////////
// Now...
// if
//    "attachEvent", then we need to select "onmessage" as the event.
// if
//    "addEventListener", then we need to select "message" as the event
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child IFrame window
eventer(messageEvent, function(e) {
  //check for SAS iframe
  if (e.origin == 'https://data.apn.co.nz' || e.origin == 'https://data.apn.co.nz' || e.origin == location.origin) {

    //if data is being passed through
    if (e.data) {
      var edata;

      if (typeof e.data === 'string') {
        if (e.data.indexOf("nzmeAdID") > -1) {
          edata = JSON.parse(e.data);
        } else {
          return false;
        }
      } else {
        return false;
      }

      var i;
      var iframeID;
      var iframeP;
      var newW, newH;
      var tomatch;
      var ifs = document.getElementsByTagName("iframe");


      // Begin iframe resize
      if (edata["resize"]) {
        //run through iframes and match the adID
        tomatch = edata["nzmeAdID"];

        for (i = 0; i < ifs.length; i++) {
          if (ifs[i].src.indexOf(tomatch) > -1) {
            iframeID = ifs[i];
            break;
          }
        }

        //if iframe is matched
        if (iframeID) {
          //resize as required
          newW = edata["resize"]["width"];
          newH = edata["resize"]["height"];

            iframeID.height = newH;
            iframeID.width = newW;

            iframeP = iframeID.parentNode;
            iframeP.style.setProperty("width", newW + "px", "important");
            iframeP.style.setProperty("height", newH + "px", "important");
            iframeP.style.setProperty("min-height", newH + "px", "important");

            iframeID.style.setProperty("width", newW + "px", "important");
            iframeID.style.setProperty("height", newH + "px", "important");
            iframeID.style.setProperty("min-height", newH + "px", "important");

        }
      }
      // End iframe resize


      // Begin CSS Injection
      if (edata["css"]) {
        function applyCSS(c) {
          var styleEl = document.createElement('style'),
          styleSheet;

          // Append style element to head
          document.head.appendChild(styleEl);

          // Grab style sheet
          styleSheet = styleEl.sheet;

          for (var key in c) {
            if (c.hasOwnProperty(key)) {
              //$(key).css('cssText', c[key]);
              styleSheet.insertRule(key + "{ " + c[key] + " }", 0);
            }
          }
        }
        applyCSS(edata["css"]);
      }
      ///////////////////// End CSS Injection //////////////////////

      // Begin Collapser Utility
      /**
      * NOTE: only for new NZH
      */
      if (edata["collapse"]) {
        function collapse(c) {
          var target = iframeID;
          do {
            target = target.parentElement;
          } while (target.classList.contains('pb-f-ads-ad') === false);
          target = target.id;
          var intent = c["intent"];
          if (intent == 'up') {
            $('#' + target).slideUp();
          } else if (intent == 'down') {
            $('#' + target).slideDown();
          }
        }
        collapse(edata["collapse"]);
      }

      ///////////////////// End Collapser Utility //////////////////////

      // Begin maxwidth-buster Utility
      /**
      * NOTE: only for new NZH
      * 1. change max-width for .pb-ad-container
      * 2. change max-width for .ad-container
      */
      if (edata["bustMaxwidth"]) {
        function bustMaxwidth(c) {
          var width = c["width"];
          var target = iframeID;
          do {
            target = target.parentElement;
          } while (target.classList.contains('pb-ad-container') === false);
          target.style.maxWidth = width+'px';
          target.className += " max-width-"+width;
          do {
            target = target.parentElement;
          } while (target.classList.contains('ad-container') === false);
          target.style.maxWidth = width+'px';
          target.className += " max-width-"+width;
        }
        bustMaxwidth(edata["bustMaxwidth"]);
      }
      ///////////////////// End maxwidth-buster Utility //////////////////////

      // Begin Close Ad Spot utility
      /**
       * NOTE: only for new NZH
       * 1. given a class to target, this utility will trawl up from the iframeID.
       * 2. a display = none; property will be applied to target if found
       */
       if (edata["closeAdSpot"]) {
         function closeAdSpot(c) {
           if(iframeP.getAttribute('id') == 'ContentRect'){
             iframeP.parentNode.style.display = "none";
           }else{
             var adWrapper = c["adWrapper"];
             var target = iframeID;
             do {
               target = target.parentElement;
             } while (target.classList.contains(adWrapper) === false);
             target.style.display = "none";
           }
         }
         closeAdSpot(edata["closeAdSpot"]);
       }
       ///////////////////// End Close Ad Spot Utility //////////////////////

       // Begin Prebid
       if (edata["prebidAd"]) {

        function prebidAd(c) {

           //get width, height, PB adID, page adcontainer ID
           var w = c["hb_w"];
           var h = c["hb_h"];
           var adid = c["hb_adid"];
           var wid = c["hb_wid"];
           var format = c["hb_format"];
           var adP = document.getElementById(wid);

           //remove sas iframe
           var sasIfrm = adP.querySelector('iframe');
           adP.removeChild(sasIfrm);

           //create iframe for PB ad
           if (!format || format === 'undefined' || format === 'banner') {
            var ifrm = document.createElement("iframe");
            ifrm.setAttribute('FRAMEBORDER', '0');
            ifrm.setAttribute('SCROLLING', 'no');
            ifrm.setAttribute('MARGINHEIGHT', '0');
            ifrm.setAttribute('MARGINWIDTH', '0');
            ifrm.setAttribute('TOPMARGIN', '0');
            ifrm.setAttribute('LEFTMARGIN', '0');
            ifrm.setAttribute('ALLOWTRANSPARENCY', 'true');
            ifrm.setAttribute('name', Math.round(Math.random() * 10000000000));
            ifrm.style.width = w;
            ifrm.style.height = h;
            ifrm.width = w;
            ifrm.height = h;
            adP.appendChild(ifrm);

            var iframeDoc = ifrm.contentWindow.document;
            pbjs.renderAd(iframeDoc, adid);
           // Outstream
          } else if (format === 'video') {
            var adContainer = adP.parentNode;

            adContainer.style.setProperty("width", "620px", "important");
            adContainer.style.setProperty("height", "349px", "important");
            adContainer.style.setProperty("min-height", "349px", "important");

            adP.style.setProperty("width", newW + "620px", "important");
            adP.style.setProperty("height", newH + "349px", "important");
            adP.style.setProperty("min-height", newH + "349px", "important");

            adContainer.insertAdjacentHTML('beforebegin', '<div id="tempContentRect"></div>');
            adContainer.parentNode.removeChild(adContainer);
            document.getElementById('tempContentRect').id = 'ContentRect';

            // var styleEl = document.createElement('style'), styleSheet;
            // document.head.appendChild(styleEl);
            // styleSheet = styleEl.sheet;
            // styleSheet.insertRule('#ContentRect + .border-bottom-airy { display: none }', 0);
            pbjs.renderAd(document, adid);
          }
        }
        prebidAd(edata["prebidAd"]);
      }
       ///////////////////// End Prebid //////////////////////

      // Begin Surveymonkey
      /**
      * NOTE: this may not always result in a popup due to SM's sampling rate or previous interactions with the popup. try clearing your cookies.
      */
      if (edata["surveymonkey"]) {
        function surveymonkey(c) {
          (function(t,e,c,o){var s,n,r;t.SMCX=t.SMCX||[],e.getElementById(o)||(s=e.getElementsByTagName(c),n=s[s.length-1],r=e.createElement(c),r.type="text/javascript",r.async=!0,r.id=o,r.src=["https:"===location.protocol?"https://":"http://","widget.surveymonkey.com/collect/website/js/DEFf7YOHV0FmgI8ttMr4yidF6jpL_2Bqro_2F77MNRqVve249WGRP4LsLfcfTYN6uX5c.js"].join(""),n.parentNode.insertBefore(r,n))})(window,document,"script","smcx-sdk");
        }
        surveymonkey(edata["surveymonkey"]);
      }
      ///////////////////// End SURVEYMONKEY //////////////////////

      // Begin NGM Launcher
      if (edata["ngmlauncher"]) {

        function ngmLauncher(c) {

          var lmedia = c["lmedia"];
          lmedia = decodeURIComponent(lmedia);
          var lcurl = c["lcurl"];
          lcurl = decodeURIComponent(lcurl);
          var lprecurl = c["lprecurl"];
          lprecurl = decodeURIComponent(lprecurl);
          var limptrk = c["limptrk"];
          limptrk = decodeURIComponent(limptrk);
          var sasimp = lcurl.replace('adclick', 'count/act=1');
          sasimp = '<img src="' + sasimp + '" style="display:none;width:1px;height:1px;">';
          if (limptrk) {
            limptrk = '<img src="' + limptrk + '" style="display:none;width:1px;height:1px;">';
          } else {
            limptrk = '';
          }
          var scr = c["scr"];
          scr = decodeURIComponent(scr);
          var cba = c["cba"];

          function clickOTP(e) {
            var stopT = new Date().getTime();
            var timeSinceLaucher = (stopT - startT);
            if (timeSinceLaucher < 1000) {
              e.preventDefault();
            } else {
              closeOTP();
              return true;
            }
          }

          // DOUBLECLICK MARKUP
          var dcid = c["ldcid"];
          var dcOrd = Math.round(Math.random()*100000000);
          var dcMarkup = '<div id="ngmlauncher" style="display:none;"><a id="launcherclose"><img src="https://nzme-ads.co.nz/img/rsz_close.png" width="55" style="z-index: 3; position:absolute; right:10%;"><p style="color: white;position: absolute;right: 20%; top:90%; z-index: 2;font-size: 12px;">[X]Close</p></a><a id="launchercreative"  href="'+lprecurl+'https://ad.doubleclick.net/ddm/jump/'+dcid+';sz=320x480;ord='+dcOrd+'?" target="_blank">'+'<IMG onload="adopNgmShow()" SRC="https://ad.doubleclick.net/ddm/ad/'+dcid+';sz=320x480;ord='+dcOrd+';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" BORDER=0 WIDTH=320 HEIGHT=480 ALT="Advertisement" id="showimage"></a>'+limptrk+sasimp+'</div>';

          // SAS IA MARKUP
          var launchermarkup = '<div id="ngmlauncher" style="display:none;"><div id="launcherlabel"><span>ADVERTISEMENT</span></div><a id="launcherclose"><img src="https://nzme-ads.co.nz/img/inertia_close.jpg" width="50" style="z-index: 3;"><p>[X]Close</p></a><a id="launchercreative" href="' + lcurl + '" target="_blank"><img onload="adopNgmShow()" src="' + lmedia + '"></a>' + limptrk + sasimp + '</div>';

          // Celtra MARKUP
          var cplacement = c["cplacementID"];
          var preclickurl = c["preclickurl"];

          var celtraMarkup = "";
          celtraMarkup += "<div class=\"celtra-ad-v3\">";
          celtraMarkup += "<img src=\"data:image\/png,celtra\" style=\"display: none\" onerror=\"";
          celtraMarkup += "(function(img) {";
          celtraMarkup += "    var params = {'clickUrl':'" + preclickurl + "','expandDirection':'undefined','preferredClickThroughWindow':'new','clickEvent':'firstInteraction','externalAdServer':'Custom','tagVersion':'6'};";
          celtraMarkup += "    var req = document.createElement('script');";
          celtraMarkup += "    req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);";
          celtraMarkup += "    params.clientTimestamp = new Date\/1000;";
          celtraMarkup += "    params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();";
          celtraMarkup += "    params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+'').slice(2);";
          celtraMarkup += "    var src = 'https://ads.celtra.com/" + cplacement + "/web.js?';";
          celtraMarkup += "    for (var k in params) {";
          celtraMarkup += "        src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);";
          celtraMarkup += "    }";
          celtraMarkup += "    req.src = src;";
          celtraMarkup += "    img.parentNode.insertBefore(req, img.nextSibling);";
          celtraMarkup += "})(this);";
          celtraMarkup += "\"\/>";
          celtraMarkup += "<\/div>";
          celtraMarkup += limptrk + sasimp;

          // Insert Showcase Markup
          if (cplacement) {
            document.body.insertAdjacentHTML('afterbegin', celtraMarkup);
          }else {
            if (cba != "y") {
              document.body.style.overflow = 'hidden';
            }
            if (dcid) {
              document.body.insertAdjacentHTML('afterbegin', dcMarkup);
            } else if (lmedia) {
              document.body.insertAdjacentHTML('afterbegin', launchermarkup);
            }
            document.getElementById('launchercreative').addEventListener('click', clickOTP);
            document.getElementById('launcherclose').addEventListener('click', closeOTP);

            if(scr){
              var extraScr = document.createElement('script');
              extraScr.src = scr;
              document.body.appendChild(extraScr);
            }

          }
          // Insert Showcase Markup
          function closeOTP() {
            var stopT = new Date().getTime();
            var otp = document.getElementById('ngmlauncher');
            otp.parentElement.removeChild(otp);
            document.body.style.overflow = 'auto';
          }
        }
        ngmLauncher(edata["ngmlauncher"]);
      }
      /////////////////////////////// End NGM Launcher ///////////////////////////////


      /**
      * Viewroll
      */
      if (edata["viewroll"]) {
        function renderVideo(a, adspot) {
          $(document).ready(function() {
            var vsiteVer = a["vsiteVer"];
            //console.log('sitever = ', vsiteVer);
            var vmedia = a["vmedia"];
            vmedia = decodeURIComponent(vmedia);
            var vcomp = a["vcomp"];
            vcomp = decodeURIComponent(vcomp);
            var vcurl = a["vcurl"];
            vcurl = decodeURIComponent(vcurl);
            var vsimp = a["vsimp"];
            vsimp = decodeURIComponent(vsimp);
            var veimp = a["veimp"];
            veimp = decodeURIComponent(veimp);
            var vpos = a["vpos"];
            var vwide = a["vwide"];
            var vfcid = a["vfcid"];
            var sasimp = vcurl.replace('adclick', 'count/act=1');
            var sasact = vcurl.replace('adclick', 'count/act=3');
            var vwidth, vheight, vban, voffsetD = 210,
            vCRlab = '',
            vCRcount = '',
            vname, vClass, vskip = -1,
            video, firstplay = true;
            var vscripts, vindex = 0;
            vscripts = ['https://vjs.zencdn.net/4.7.1/video.js', 'https://cdn.jsdelivr.net/viewability/latest/viewability.min.js', 'https://nzme-ads.co.nz/js/iphone-inline-video.min.js'];
            var wideUICss = '';

            function load_script() {
              if (vindex < vscripts.length) {
                $.getScript(vscripts[vindex], function() {
                  vindex++;
                  load_script();
                });
              } else {
                startVR();
              }
            }
            load_script();

            function startVR() {
              $('head').append('<link rel="stylesheet" href="https://vjs.zencdn.net/4.7/video-js.css" type="text/css" />');
              $('head').append('<link rel="stylesheet" href="https://nzme-ads.co.nz/css/viewroll.css" type="text/css" />');
              if (vpos == 1) {
                vClass = 'vr_block';
                vwidth = 300;
                if (vcomp) {
                  vheight = 200;
                  vClass = 'vr_block vr_comp';
                } else {
                  vheight = 250;
                }
              }
              if (vpos == 2) {
                if (vwide) {
                  vwidth = 540;
                  vheight = 305;
                  vCRlab = '<div id="vlab">&dtrif; Advertising &dtrif;</div>';
                  vCRcount = '<div id="vcount"><p>Close ad&nbsp;&nbsp;&nbsp;&#10006;</p></div>';
                  voffsetD = 260;
                  vClass = 'vr_wide';
                  vskip = 5;
                  wideUICss = ' top:auto!important;';
                } else {
                  vClass = 'vr_block advert';
                  vwidth = 300;
                  if (vcomp) {
                    vheight = 200;
                    vClass = 'vr_block advert vr_comp';
                  } else {
                    vheight = 250;
                  }
                }
              }
              if (vpos == 3) {
                vClass = 'vr_block';
                vwidth = 300;
                if (vcomp) {
                  vheight = 200;
                  vClass = 'vr_block vr_comp';
                } else {
                  vheight = 250;
                }
              }

              var vmutebutton = '<img id="vunmutebtn" src="https://nzme-ads.co.nz/img/viewroll-mute.png" style=" display:none; position: absolute; top:8px; z-index: 10; right: 5px; width: 30px; cursor: pointer;'+wideUICss+'">'
              var vunmutebutton = '<img id="vmutebtn" src="https://nzme-ads.co.nz/img/viewroll-unmute.png" style=" display: inline-block; position: absolute; top:8px; z-index: 10; right: 5px; width: 30px; cursor: pointer;'+wideUICss+'">';

              vname = 'vblock' + vpos;
              if (vcomp) {
                vban = '<p style="margin:0; height:50px; display:inline-block;"><a target="_blank" href="' + vcurl + '"><img src="' + vcomp + '"></a></p>';
              }
              video = vCRlab + '<div class="vidcont ' + vClass + '">' + vCRcount + '<div id="vctr" class="vctr">' + vunmutebutton + vmutebutton + '<a target="_blank" href="' + vcurl + '"></a></div><video id="' + vname + '" class="video-js vjs-default-skin vjs-big-play-centered" playsinline muted volume webkit-playsinline preload="auto" width="' + vwidth + '" height="' + vheight + '" data-setup=\'{ "techOrder":["flash", "html5"] }\'> <source src="' + vmedia + '" type="video/mp4"><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video>' + vban;

              $(video).insertAfter(adspot);
              $(adspot).remove();

              /* New site magic */
              if (vpos == 2 && vwide) {
                //modify parent div with class ad-container has-text max-width-300 - max-width:540px; margin-top: 14px;
                if (vsiteVer) {
                  var vhaxVideoCont = $('.vr_wide')[0];
                  do {
                    vhaxVideoCont = vhaxVideoCont.parentElement;
                  } while (vhaxVideoCont.classList.contains('max-width-300') === false);
                  vhaxVideoCont.style.maxWidth = '540px';
                  //remove ad label - a sibling div with class ad-text-before. assuming the container has been found above
                  var vhaxVideoCC = $(vhaxVideoCont).children();
                  for (var i = 0; i < vhaxVideoCC.length; i++) {
                    //console.log('looping through vhaxVideoCC');
                    if (vhaxVideoCC[i].classList.contains('ad-text-before')) {
                      $(vhaxVideoCC[i]).remove();
                    }
                  }
                  $('#vlab')[0].style.position = 'absolute';
                  $('#vlab')[0].style.top = '-16px';
                }
                // applies to new and old site
                $('#vmutebtn')[0].style.bottom = '0px';
                $('#vunmutebtn')[0].style.bottom = '0px';
              }
              /* END of new site magic */
              var myPlayer = videojs(vname);
              var $vidcont = $('.vidcont');
              var vidcont = document.getElementsByClassName('vidcont')[0];
              var firstend = true;
              $vidcont.append('<img style="display:none;" src="' + sasact + '">');

              var vr_unmutebtn = document.getElementById('vunmutebtn');
              var vr_mutebtn = document.getElementById('vmutebtn');
              vr_unmutebtn.addEventListener('click', vr_soundToggle);
              vr_mutebtn.addEventListener('click', vr_soundToggle);

              function vr_soundToggle() {
                if (myPlayer.muted() == true) {
                  myPlayer.muted(false);
                  vr_unmutebtn.style.display = "inline-block";
                  vr_mutebtn.style.display = "none";
                } else if (myPlayer.muted() == false) {
                  myPlayer.muted(true);
                  vr_unmutebtn.style.display = "none";
                  vr_mutebtn.style.display = "inline-block";
                }
              }
              myPlayer.ready(function() {

                if (firstplay) {
                  $vidcont.append('<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdStart/fcid=' + vfcid + '">');
                  firstplay = false;
                }

                var vctime, vdur, vprc;
                var vtime25 = false;
                var vtime50 = false;
                var vtime75 = false;
                var vtime5sec = false;
                /****timeupdate Event****/
                var timeEvent = function() { // event for the timeupdate, which gets fired every 15-250ms automatically while playing

                  vctime = Math.round(myPlayer.currentTime()); // where is the video currently at, and what is it's duration
                  vdur = Math.round(myPlayer.duration());
                  vprc = Math.round(vctime / vdur * 100); // what percent is it at of the total video duration
                  if (vctime >= 5 && !vtime5sec) { // if it reaches 5sec
                    vtime5sec = true;
                    $vidcont.append('<img style="display:none;" src="' + sasimp + '">');

                    if (vsimp) {
                      $vidcont.append('<img style="display:none;" src="' + vsimp + '">');
                    }
                  }
                  if (vprc >= 25 && !vtime25) { // if it reaches 25%
                    vtime25 = true;
                    $vidcont.append('<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdFirstQuartile/fcid=' + vfcid + '">');
                  }
                  if (vprc >= 50 && !vtime50) { // if it reaches 50%
                    vtime50 = true;
                    $vidcont.append('<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdMidPoint/fcid=' + vfcid + '">');
                  }
                  if (vprc >= 75 && !vtime75) { //if it reaches 75%
                    vtime75 = true;
                    $vidcont.append('<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdThirdQuartile/fcid=' + vfcid + '">');
                  }

                };
                myPlayer.on("timeupdate", timeEvent); //call the timeupdate function when the event fires (every 15-250ms)

                this.on("loadeddata", function() {

                  var $vcount = $('#vcount');

                  $vcount.on('click', function(event) {
                    event.preventDefault();
                    myPlayer.off();
                    window.removeEventListener("scroll", vr_checkScroll);
                    window.removeEventListener("touchend", vr_checkScroll);
                    var vhaxToBeRemoved = $('.vr_wide')[0];
                    if (vsiteVer) {
                      do {
                        vhaxToBeRemoved = vhaxToBeRemoved.parentElement;
                      } while (vhaxToBeRemoved.classList.contains('max-width-300') === false);
                    }
                    $(vhaxToBeRemoved).slideUp(function() {
                      myPlayer.dispose();
                    });
                    $('#vlab').slideUp();
                  });

                });
                this.on("ended", function() {
                  if (firstend) {
                    $vidcont.append('<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdComplete/fcid=' + vfcid + '">');
                    if (veimp) {
                      $vidcont.append('<img style="display:none;" src="' + veimp + '">');
                    }
                    firstend = false;
                    window.removeEventListener("scroll", vr_checkScroll);
                    window.removeEventListener("touchend", vr_checkScroll);
                  }
                });
              });
              var vr_view;
              window.addEventListener("scroll", vr_checkScroll);
              window.addEventListener("touchend", vr_checkScroll);

              function vr_checkScroll() {
                vr_view = viewability.vertical(vidcont);
                //console.log(vr_view.state);
                if (vr_view.state == 'EL_IS_WITHIN_VERTICAL_VIEW') {
                  myPlayer.play();
                } else {
                  myPlayer.pause();
                }
              }
              vr_checkScroll();
            }
          });
        }
        renderVideo(edata["viewroll"], iframeP);
      }
      /**
      * End ViewRoll
      */

      /**
      * Begin Interscroller
      */
      if (edata["interscroller"]) {
        // NOTE: next two lines remove new NZH labels
        // document.querySelector('#ContentRect + .ad-contact-text').remove();
        // document.querySelector('.ad-container.has-text.max-width-300 .ad-text-before').remove();
        var adid = edata["interscroller"]["adid"];
        var curl = edata["interscroller"]["curl"];

        var sasimp = curl.replace('adclick', 'count%2Fact=1');
        sasimp = "<!-- track.creativeLoads = urldecode "+sasimp+" -->";

        curl = decodeURIComponent(curl);

        var limptrk = edata["interscroller"]["imptrk"];
        limptrk = decodeURIComponent(limptrk);
        var celtra = "<div class=\"celtra-ad-v3\">\n"+
        limptrk+sasimp+"\n"+
        "<img src=\"data:image/png,celtra\" style=\"display: none\" onerror=\"\n"+
        "(function(img) {\n"+
        "var params =\n"+ "{'clickUrl':'"+curl+"','expandDirection':'undefined','preferredClickThroughWindow':'new','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'4','useScreenFixation':'1', 'removeAdvertisementBars':'1'};\n"+
        "[].slice.apply(img.parentNode.childNodes).forEach(function(n) { var decfs = { urldecode: decodeURIComponent, htmldecode: function(v) { var d = document.createElement('div'); d.innerHTML = v; return d.textContent; }, eval: function(v) { return eval(v); }, raw: function(v) { return v; } }; var m; if (n.nodeType == 8 &amp;&amp; (m = n.textContent.match(/^&#92;s+([&#92;w.]+)(&#92;[.+&#92;])?&#92;s+=&#92;s+(&#92;w+)&#92;s+(.*)$/i))) { try { params[m[1]+(m[2] || '')] = decfs[m[3]](m[4].replace(/^&#92;s+|&#92;s+$/g, '')); } catch (e) {} } });\n"+
        "var req = document.createElement('script');\n"+
        "req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);\n"+
        "params.clientTimestamp = new Date/1000;\n"+
        "params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();\n"+
        "params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+'').slice(2);\n"+
        "var src = (window.location.protocol == 'https:' ? 'https' : 'http') + '://ads.celtra.com/"+adid+"/web.js?';\n"+
        "for (var k in params) {\n"+
        "src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);\n"+
        "}\n"+
        "req.src = src;\n"+
        "img.parentNode.insertBefore(req, img.nextSibling);\n"+
        "})(this);\n"+
        "\"/>\n"+
        "</div>";

        var bodyAd = document.querySelector('.ad-container.has-text.max-width-300');
        if (bodyAd) {
          bodyAd.style.width = '100%';
          bodyAd.insertAdjacentHTML('afterbegin', celtra);
        }
      }
      /**
      * End Interscroller
      */

    /**
      * Begin celtraExpandable
      */
      if (edata["celtraExpandable"]) {
        var adid = edata["celtraExpandable"]["adid"];
        var preclickurl = decodeURIComponent(edata["celtraExpandable"]["preclickurl"]);
        var externalImpTrk = decodeURIComponent(edata["celtraExpandable"]["imptrk"]);

        var sasImpTrk = preclickurl.replace('adclick', 'count/act=1');
        sasImpTrk = "<!-- track.creativeLoads = urldecode " + sasImpTrk + " -->";

        var celtra = "" +
        "<div class=\"celtra-ad-v3\">" +
            externalImpTrk + sasImpTrk +
            "<img src=\"data:image/png,celtra\" style=\"display: none\" onerror=\"" +
                "(function(img) {" +
                    "var params = {'clickUrl':'" + preclickurl + "','expandDirection':'auto','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'6'};" +
                    "var req = document.createElement('script');" +
                    "req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);" +
                    "params.clientTimestamp = new Date/1000;" +
                    "params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();" +
                    "params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+'').slice(2);" +
                    "var qs = '';" +
                    "for (var k in params) {" +
                        "qs += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);" +
                    "}" +
                    "var src = 'https://ads.celtra.com/" + adid + "/web.js?' + qs;" +
                    "req.src = src;" +
                    "img.parentNode.insertBefore(req, img.nextSibling);" +
                "})(this);" +
            "\"/>" +
        "</div>";

        var bodyAd = iframeP.parentNode;
        if (bodyAd) {
          bodyAd.insertAdjacentHTML('afterbegin', celtra);
        }
      }
      /**
      * End celtraExpandable
      */

      /**
      * Begin Miniscroller
      */
      if (edata["miniscroller"]) {
        // NOTE: next two lines remove new NZH labels
        document.querySelector('#ContentRect + .ad-contact-text').remove();
        //document.querySelector('.ad-container.has-text.max-width-300 .ad-text-before').remove();
        var adid = edata["miniscroller"]["adid"];
        var curl = edata["miniscroller"]["curl"];

        var sasimp = curl.replace('adclick', 'count%2Fact=1');
        sasimp = "<!-- track.creativeLoads = urldecode "+sasimp+" -->";

        curl = decodeURIComponent(curl);

        var limptrk = edata["miniscroller"]["imptrk"];
        limptrk = decodeURIComponent(limptrk);
        var celtra = "<div class=\"celtra-ad-v3\">\n"+
        limptrk+sasimp+"\n"+
        "<img src=\"data:image/png,celtra\" style=\"display: none\" onerror=\"\n"+
        "(function(img) {\n"+
        "var params =\n"+ "{'clickUrl':'" + curl + "','widthBreakpoint':'','expandDirection':'undefined','preferredClickThroughWindow':'new','placementId':'"+adid+"','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'4'};\n"+
        "var req = document.createElement('script');\n"+
        "req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);\n"+
        "params.clientTimestamp = new Date/1000;\n"+
        "params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();\n"+
        "params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+'').slice(2);\n"+
        "var src = (window.location.protocol == 'https:' ? 'https' : 'http') + '://ads.celtra.com/80a2b25a/web.js?';\n"+
        "for (var k in params) {\n"+
        "src += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);\n"+
        "}\n"+
        "req.src = src;\n"+
        "img.parentNode.insertBefore(req, img.nextSibling);\n"+
        "})(this);\n"+
        "\"/>\n"+
        "</div>";

        var bodyAd = document.querySelector('.ad-container.has-text.max-width-300');
        if (bodyAd) {
          bodyAd.style.width = '100%';
          bodyAd.style.maxWidth = 'none';
          bodyAd.insertAdjacentHTML('afterbegin', celtra);
        }
      }
      /**
      * End Miniscroller
      */

      /**
      * Begin Hangtime
      */
      if (edata["hangtime"]) {
        var preclickurl = decodeURIComponent(edata["hangtime"]["preclickurl"]);
        var adid = edata["hangtime"]["adid"];
        var pgImptrk = decodeURIComponent(edata["hangtime"]["imptrk"]);
        var beaconurl = decodeURIComponent(edata["hangtime"]["beaconurl"]);
        var randNum = edata["nzmeAdID"];

        var playgroundxyz =
        "<div class='xyz-ad-content'>" +
          "<img src='data:image/png,xyz' style='display:none' onerror='" +
          "!function(e){var n={clickUrl:\"" + preclickurl + "\",z:\"" + randNum + "\"},o=\"https://ads.playground.xyz/tag/" + adid + "/impression?\";try{n.ref=window.top.location.href}catch(e){console.log(\"PLAYGROUND-XYZ: cross-domain iframe prevented host detection\")}for(var r in n)n[r]&&(o+=\"&amp;\"+encodeURIComponent(r)+\"=\"+encodeURIComponent(n[r]));var i=document.createElement(\"script\");i.src=o,e.parentNode.insertBefore(i,e.nextSibling)}(this);'/>" +
        "</div>" +
        "<img src='" + pgImptrk + "' style='position:absolute;top:0px;left:0px;width=1px;height=1px'>" +
        "<img src='" + beaconurl + "'>";

        var bodyAd = document.querySelector('.ad-container.has-text.max-width-300');
        if (bodyAd) {
          bodyAd.style.width = '100%';
          bodyAd.insertAdjacentHTML('afterbegin', playgroundxyz);
        }
      }

      /**
      * Begin ScrollX
      */
      if (edata["ScrollX"]) {
        var adid = edata["ScrollX"]["adid"];
        var plid = edata["ScrollX"]["plid"];
        var preclickurl = edata["ScrollX"]["preclickurl"];
        var beaconurl = edata["ScrollX"]["beaconurl"];

        var bonzai = "<div class='bonzai-wrap'>" +
        "<img src=\"data:image/png,bonzai\" style=\"display:none;\" onerror=\"" +
        "(function(img){" +
        "var bonzai_adid = '" + adid + "';" +
        "var bonzai_sn = 'Generic';" +
        "var bonzai_data = JSON.stringify({'network':{'keyId':'Generic','name':'Generic','settings':{'env':'wap','tagType':'iFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{},'clkTr':{'img':['" + preclickurl + "'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['" + beaconurl + "'],'scr':[]}}}});" +
        "var protocol = window.location && window.location.protocol;" +
        "protocol = (protocol === 'http:' || protocol === 'https:') ? protocol.replace(':', '') : 'https';" +
        "var script = document.createElement('script');" +
        "var cacheBuster = Math.random();" +
        "var index = window.bonzaiScriptIndex  = (typeof window.bonzaiScriptIndex == 'undefined') ? 0 : ++window.bonzaiScriptIndex;" +
        "script.id = 'bonzai_script_' + index;" +
        "if(!window.bonzaiObj || (typeof window.bonzaiObj == 'undefined')) {window.bonzaiObj = {};}" +
        "window.bonzaiObj[script.id] = bonzai_data;" +
        ";script.src = protocol + '://invoke.bonzai.co/mizu/invoke.do?proto=' + protocol + '&adid='+bonzai_adid+'&scriptid=' + script.id  +'&sn='+bonzai_sn +'&plid=" + plid + "'  + '&rnd=' + cacheBuster;" +
        "img.parentNode.insertBefore(script, img.nextSibling);" +
        "})(this);\"/>" +
        "<noscript>" +
        "<img src='https://invoke.bonzai.co/mizu/invoke.do?adid=" + adid + "&sn=Generic&type=imp&plid=" + plid + "' style='display:none;' />" +
        "</noscript>" +
        "</div>";

        var bodyAd = document.querySelector('.ad-container.has-text.max-width-300');
        if (bodyAd) {
          bodyAd.style.width = '100%';
          bodyAd.style.display = 'block';
          bodyAd.insertAdjacentHTML('afterbegin', bonzai);
        }
      }

      /**
      * Begin TruSkin Mobile
      */
      if (edata["TruSkinMob"]) {
        var adid = edata["TruSkinMob"]["adid"];
        var plid = edata["TruSkinMob"]["plid"];

        var preclickurl = decodeURIComponent(edata["TruSkinMob"]["preclickurl"]);
        var beaconurl = decodeURIComponent(edata["TruSkinMob"]["beaconurl"]);
        var clickdestinationurl = decodeURIComponent(edata["TruSkinMob"]["clickdestinationurl"]);
        var random = edata["nzmeAdID"];

        var bonzaiTruSkinMob = "<div class='bonzai-wrap'>" +
        "<img src='data:image/png,bonzai' style='display:none;' onerror=\"" +
        "(function(img){" +
        "var bonzai_adid = '" + adid + "';" +
        "var bonzai_sn = 'SAS';" +
        "var bonzai_data =JSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{'segId':''},'clkTr':{'img':['" + preclickurl + "'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['" + beaconurl + "'],'scr':[]},'clkThru': {'landingUrl': '" + clickdestinationurl + "'}}}});" +
        "var protocol = window.location && window.location.protocol;" +
         "protocol = (protocol === 'http:' || protocol === 'https:') ? protocol.replace(':', '') : 'https';" +
        "var script = document.createElement('script');" +
        "var cacheBuster = '" + random + "'; " +
        "var index = window.bonzaiScriptIndex  = (typeof window.bonzaiScriptIndex == 'undefined') ? 0 : ++window.bonzaiScriptIndex;" +
        "script.id = 'bonzai_script_' + index;" +
        "if(!window.bonzaiObj || (typeof window.bonzaiObj == 'undefined')) {window.bonzaiObj = {};}" +
        "window.bonzaiObj[script.id] = bonzai_data;" +
        ";script.src = protocol + '://invoke.bonzai.co/mizu/invoke.do?proto=' + protocol + '&adid='+bonzai_adid+'&scriptid=' + script.id  +'&sn='+bonzai_sn+'&contTyp=div' +'&plid=" + plid + "'  + '&rnd=' + cacheBuster;" +
        "img.parentNode.insertBefore(script, img.nextSibling);" +
        "})(this);\"/>"
        "<noscript>" +
        "<img src='https://invoke.bonzai.co/mizu/invoke.do?adid=" + adid + "&sn=SAS&type=imp&plid=" + plid + "' style='display:none;' /> " +
        "</noscript>" +
        "</div>";

        document.body.insertAdjacentHTML('afterbegin', bonzaiTruSkinMob);
      }

      /**
      * Begin TruSkin Desktop
      */
      if (edata["TruSkinDesktop"]) {
        var adid = edata["TruSkinDesktop"]["adid"];
        var plid = edata["TruSkinDesktop"]["plid"];

        var preclickurl = decodeURIComponent(edata["TruSkinDesktop"]["preclickurl"]);
        var beaconurl = decodeURIComponent(edata["TruSkinDesktop"]["beaconurl"]);
        var clickdestinationurl = decodeURIComponent(edata["TruSkinDesktop"]["clickdestinationurl"]);
        var random = edata["nzmeAdID"];

        var bonzaiTruSkinDesk = "<div class='bonzai-wrap'>" +
        "<img src='data:image/png,bonzai' style='display:none;' onerror=\"" +
        "(function(img){" +
        "var bonzai_adid = '" + adid + "';" +
        "var bonzai_sn = 'SAS';" +
        "var bonzai_data =JSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y'},'macros':{'addiTr':{'segId':''},'clkTr':{'img':['" + preclickurl + "'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['" + beaconurl + "'],'scr':[]},'clkThru':{'landingUrl':'" + clickdestinationurl + "'}}}});" +
        "var protocol = window.location && window.location.protocol;" +
         "protocol = (protocol === 'http:' || protocol === 'https:') ? protocol.replace(':', '') : 'https';" +
        "var script = document.createElement('script');" +
        "var cacheBuster = '" + random + "';" +
        "var index = window.bonzaiScriptIndex  = (typeof window.bonzaiScriptIndex == 'undefined') ? 0 : ++window.bonzaiScriptIndex;" +
        "script.id = 'bonzai_script_' + index;" +
        "if(!window.bonzaiObj || (typeof window.bonzaiObj == 'undefined')) {window.bonzaiObj = {};}" +
        "window.bonzaiObj[script.id] = bonzai_data;" +
        ";script.src = protocol + '://invoke.bonzai.co/mizu/invoke.do?proto=' + protocol + '&adid='+bonzai_adid+'&scriptid=' + script.id  +'&sn='+bonzai_sn+'&contTyp=div' +'&plid=" + plid + "'  + '&rnd=' + cacheBuster;" +
        "img.parentNode.insertBefore(script, img.nextSibling);" +
        "})(this);\"/>" +
        "<noscript>" +
        "<img src='https://invoke.bonzai.co/mizu/invoke.do?adid=" + adid + "&sn=SAS&type=imp&plid=" + plid + "' style='display:none;' />" +
        "</noscript>" +
        "</div>";

        document.body.insertAdjacentHTML('afterbegin', bonzaiTruSkinDesk);
      }

      /**
      * Begin Bonzai Showcase
      */
      if (edata["BonzaiShowcase"]) {
        var adid = edata["BonzaiShowcase"]["adid"];
        var plid = edata["BonzaiShowcase"]["plid"];
        var preclickurl = edata["BonzaiShowcase"]["preclickurl"];
        var beaconurl = edata["BonzaiShowcase"]["beaconurl"];

        var bonzaiShowcase = "<div class='bonzai-wrap' style='height:100%;width:100%;'>" +
        "<img src='data:image/png,bonzai' style='display:none;' onerror=\"" +
        "(function(img){" +
        "var bonzai_adid = '" + adid + "';" +
        "var bonzai_sn = 'SAS';" +
        "var bonzai_data =JSON.stringify({'network':{'keyId':'sas','name':'SAS','settings':{'env':'wap','tagType':'noniFrame','iFrmBust':'Y','proto':'agnostic','trackerFireOn':'Clickthrough','viewport':'1','isSAS':'Y','closeBtn':'Y'},'macros':{'addiTr':{},'clkTr':{'img':['" + preclickurl + "'],'scr':[]},'rendTr':{'img':[],'scr':[]},'engmTr':{},'imprTr':{'img':['" + beaconurl + "'],'scr':[]},'clkThru':{'landingUrl':'http://www.nzme.co.nz'}}}});" +
        "var protocol = window.location && window.location.protocol;" +
        "protocol = (protocol === 'http:' || protocol === 'https:') ? protocol.replace(':', '') : 'https';" +
        "var script = document.createElement('script');" +
        "var cacheBuster = 'Math.Random()';" +
        "var index = window.bonzaiScriptIndex  = (typeof window.bonzaiScriptIndex == 'undefined') ? 0 : ++window.bonzaiScriptIndex;" +
        "script.id = 'bonzai_script_' + index;" +
        "if(!window.bonzaiObj || (typeof window.bonzaiObj == 'undefined')) {window.bonzaiObj = {};}" +
        "window.bonzaiObj[script.id] = bonzai_data;" +
        ";script.src = protocol + '://invoke.bonzai.co/mizu/invoke.do?proto=' + protocol + '&adid='+bonzai_adid+'&scriptid=' + script.id  +'&sn='+bonzai_sn+'&contTyp=div' +'&plid=" + plid + "'  + '&rnd=' + cacheBuster;" +
        "img.parentNode.insertBefore(script, img.nextSibling);" +
        "})(this);\"/>" +
        "<noscript>" +
        "<img src='https://invoke.bonzai.co/mizu/invoke.do?adid=" + adid + "&sn=SAS&type=imp&plid=" + plid + "' style='display:none;' />" +
        "</noscript>" +
        "</div>";

        document.body.insertAdjacentHTML('afterbegin', bonzaiShowcase);
      }

      // Begin Slider
      if (edata["NZHSlider"]) {
        function SliderLauncherD(c) {
          var lmedia = c["lmedia"];
          lmedia = decodeURIComponent(lmedia);
          var lcurl = c["lcurl"];
          lcurl = decodeURIComponent(lcurl);
          var limptrk = c["limptrk"];
          limptrk = decodeURIComponent(limptrk);
          if (limptrk) {
            limptrk = '<img src="' + limptrk + '" style="display:none;width:1px;height:1px;">';
          } else {
            limptrk = '';
          }
          var sasimp = lcurl.replace('adclick', 'count/act=1');
          sasimp = '<img src="' + sasimp + '" style="display:none;width:1px;height:1px;">';
          var zoomtrack = lcurl.replace('adclick', 'count/act=3');
          zoomtrack = '<img src="' + zoomtrack + '" style="display:none;width:1px;height:1px;">';
          var zoomTracked = false;
          var lotameZoom = c["lotamezoom"];
          lotameZoom = decodeURIComponent(lotameZoom);
          lotameZoom = '<img src="' + lotameZoom + '" style="display:none;width:1px;height:1px;">';
          var lotameZoomTracked = false;
          var markup = '<div id="sldr_div">' +
          '<div id="sldr_clip">' +
          '<div id="sldr_crtv">' +
          '<img id="sldr_img" src="' + lmedia + '">' +
          '</div>' +
          '</div>' +
          '<span id="sldr_lbltop">&#9660; Advertisement &#9660;</span>' +
          '<span id="sldr_lblbot" style="bottom: 0px;">Click Ad to Expand</span>' +
          limptrk + sasimp +
          '</div>';
          var divCR = iframeID;
          do {
            divCR = divCR.parentElement
          } while (divCR.classList.contains('ad-container') === false);
          if (divCR) {
            $(divCR).replaceWith(markup);
            divCR.style.margin = 0;
            divCR.style.width = 'auto';
            divCR.style.padding = 0;
            divCR.style.float = 'none';
            divCR.style.removeProperty('height');
          }

          var zoom = '' +
          '<div id="sldr_zm">' +
            '<div id="sldr_zm_container">' +
              '<div id="sldr_zm_wrap">' +
                '<a id="sldr_close" href="##">' +
                '<img src="https://nzme-ads.co.nz/img/rsz_close.png" width="50">' +
                '</a>' +
                '<a href="' + lcurl + '" target="_blank">' +
                '<img id="sldr_zm_img" src="' + lmedia + '">' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>';
          var zoomIns = document.getElementsByTagName('body')[0];
          if (zoomIns) {
            zoomIns.insertAdjacentHTML('afterbegin', zoom);
          }
          var zoomState = false;

          function togZoom() {

            var zm = document.getElementById("sldr_zm");
            var zm_container = document.getElementById("sldr_zm_container");
            var zm_wrap = document.getElementById("sldr_zm_wrap");
            var zm_img = document.getElementById("sldr_zm_img");
            var zm_close = document.getElementById("sldr_close");
            var crtv = document.getElementById("sldr_crtv");

            if (!zoomState) {

              zm.setAttribute("style", "height:100vh;opacity:1;");
              zm_container.setAttribute("style", "top: auto; margin: 0 auto; width: 100%; left: auto; text-align: center;");
              zm_wrap.setAttribute("style", "position: relative;display: inline-block;");
              zm_img.setAttribute("style", "height:86vh;");
              zm_close.setAttribute("style", "display: block;position: absolute; right: -2px; top:19px");

              crtv.style.display = 'none';

              zoomState = !zoomState;

              if (!zoomTracked) {
                // NOTE: this is for tracking expands either with a 3rd-party endpoint or Lotame. This is an unused feature but will be kept here for future campaigns.
                document.body.insertAdjacentHTML('afterbegin', zoomtrack);
                document.body.insertAdjacentHTML('afterbegin', lotameZoom);
                zoomTracked = true;
              }
            } else if (zoomState) {
              zm.style.opacity = 0;
              zm.style.height = 0;
              zm_img.style.height = 0;
              zm_close.style.display = 'none';
              crtv.style.display = 'block';
              zoomState = !zoomState;
            }
          }
          document.getElementById('sldr_clip').addEventListener('click', togZoom);
          document.getElementById("sldr_zm").addEventListener('click', togZoom);
        }
        SliderLauncherD(edata["NZHSlider"]); //TODO: test param
      }
      /////////////////////// End Slider ///////////////////////////

      // Begin Pushdown
      if (edata["pushdown"]) {

        (function() {

          /** Pushdown Mainclass */
          function Pushdown() {

            var t = this;

            /** Postm Vars */
            t.curl = decodeURIComponent(edata["pushdown"]["curl"]);
            t.imptrk = decodeURIComponent(edata["pushdown"]["imptrk"]);
            t.cta = decodeURIComponent(edata["pushdown"]["cta"]);
            t.logo = decodeURIComponent(edata["pushdown"]["logo"]);
            t.videoHq = decodeURIComponent(edata["pushdown"]["videoHq"]);
            t.videoLq = decodeURIComponent(edata["pushdown"]["videoLq"]);
            t.backupHq = decodeURIComponent(edata["pushdown"]["backupHq"]);
            t.backupLq = decodeURIComponent(edata["pushdown"]["backupLq"]);
            t.fcid = edata["fcid"];
            t.pdEnv = edata["pushdown"]["pdEnv"];

            if(t.imptrk){
              t.imptrk = '<img src="' + t.imptrk + '" style="display:none;width:1px;height:1px;">';
            }
            t.sasimp = t.curl.replace('adclick', 'count/act=1');
            t.sasimp = '<img src="' + t.sasimp + '" style="display:none;width:1px;height:1px;">';

            t.sasact = t.curl.replace('adclick', 'count/act=3');
            t.sasact = '<img src="' + t.sasact + '" style="display:none;width:1px;height:1px;">';

            t.enviros = {
              'desktop': {
                'vparams': 'playsinline preload loop muted',
                'vasset': t.videoHq,
                'iasset': t.backupHq
              },
              'mobile-data': {
                'vparams': 'playsinline preload loop',
                'vasset': t.videoLq,
                'iasset': t.backupLq
              },
              'mobile-wifi': {
                'vparams': 'playsinline preload loop muted',
                'vasset': t.videoLq,
                'iasset': t.backupLq
              },
              'wifi-ios-10': {
                'vparams': 'playsinline preload loop muted',
                'vasset': t.videoLq,
                'iasset': t.backupLq
              }
            }

            /** DOM Vars */
            t.window_sY;
            t.window_w;
            t.nzh_hamnav;
            t.main;
            t.pd_div;
            t.pd_clip;
            t.pd_crtv;
            t.pd_closebtn;
            t.pd_down;
            t.pd_logo_link;
            t.pd_overlay_link;
            t.main_w;
            t.main_h;
            t.main_x;
            t.pd_view;
            t.pd_cont = document.createElement('div');
            t.pd_cont.setAttribute('id', 'pd_div');
            t.pd_appeared = false;
            t.pd_closeNavBtn = document.getElementById('nav-toggle');

            /** Utility: Loads a script then optionally fires a callback */
            t._loadScript = function(url, callback) {
              var script = document.createElement("script");
              script.type = "text/javascript";

              if (script.readyState) { //IE
                script.onreadystatechange = function() {
                  if (script.readyState == "loaded" ||
                  script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback) {
                      callback();
                    }
                  }
                };
              } else { //Others
                script.onload = function() {
                  //console.log('script loaded: ', script.src);
                  if (callback) {
                    callback();
                  }
                };
              }

              script.src = url;
              document.getElementsByTagName("head")[0].appendChild(script);
            }

            /** Utility: Loads CSS then optionally fires a callback */
            t._loadCss = function(url, callback) {
              var pdcss = document.createElement('link');
              pdcss.type = 'text/css';
              pdcss.rel = 'stylesheet';
              pdcss.href = url;
              document.head.appendChild(pdcss);
              if (callback) {
                callback();
              }
            }

            /** Generates Markup template and returns as an HTML object */
            t._getMarkupTemplate = function() {

              var parser = new DOMParser();

              var m = '';
              m += '  <div id="pd_controls">';
              m += '    <div id="pd_closebtn"></div>';
              //Video controls go inside here
              m += '  </div>';
              m += '  <div id="pd_logo">';
              m += '    <a target="_blank" href="' + t.curl + '"><img src="' + t.logo + '"></a>';
              m += '  </div>';
              m += '  <div id="pd_overlay">';
              m += '    <a target="_blank" href="' + t.curl + '"><img src="' + t.cta + '"></a>';
              m += '  </div>';
              m += '  <div id="pd_up">';
              m += '    <span id="pd_uptext">ADVERTISEMENT</span>';
              m += '  </div>';
              m += '  <div id="pd_down">';
              m += '    <div id="pd_downarrow">';
              m += '      <a href="#">';
              m += '        <span id="pd_bottom"></span>';
              m += '      </a>';
              m += '    </div>';
              m += '    <br>';
              m += '    <span id="pd_downtext">CONTINUE TO NZ HERALD</span>';
              m += '  </div>';
              m += '  <div id="pd_shadow"></div>';
              m += '  <div id="pd_clip">';
              m += '    <div id="pd_crtv" style="display: block;">';
              //Creative goes here
              m += '    </div>';
              m += '  </div>';

              var markup = parser.parseFromString(m, "text/html");
              return markup;

            }

            /** Injects markup into Pushdown HTML container */
            t._generateFinalMarkup = function(markup) {
              t.pd_cont.innerHTML = markup;
            }

            /** Adds event listeners for window resize and close buttons */
            t._addEventListeners = function() {
              window.addEventListener("resize", t._adjustContainer);
              t.pd_closebtn.addEventListener("click", t._removePushdown);
              t.pd_down.addEventListener("click", t._removePushdown);

              t.pd_logo_link.addEventListener("click", t._clickTrack);
              t.pd_overlay_link.addEventListener("click", t._clickTrack);

              t.pd_closeNavBtn.addEventListener("click", t.handleNavOpenAndClose);
            }

            /** Removes event listeners for window resize and close buttons */
            t._removeEventListeners = function() {
              t.pd_closebtn.removeEventListener("click", t._removePushdown);
              t.pd_down.removeEventListener("click", t._removePushdown);
              window.removeEventListener("resize", t._adjustContainer);

              t.pd_logo_link.removeEventListener("click", t._clickTrack);
              t.pd_overlay_link.removeEventListener("click", t._clickTrack);

              t.pd_closeNavBtn.removeEventListener("click", t.handleNavOpenAndClose);
            }

            /**
            * 1. Injects final Pushdown markup into page in #main
            * 2. Assigns selectors to DOM vars
            # 3. Calculates width, height and positioning of #main
            * 4. Runs _addEventListeners
            */
            t._addToDOM = function() {
              t.main = document.getElementById('main');
              t.main.insertBefore(t.pd_cont, t.main.firstChild);

              t.nzh_hamnav = document.querySelector('.compressed .site-logo-wrapper');

              t.pd_div = document.getElementById('pd_div');
              t.pd_clip = document.getElementById('pd_clip');
              t.pd_crtv = document.getElementById('pd_crtv');
              t.pd_closebtn = document.getElementById('pd_closebtn');
              t.pd_down = document.getElementById('pd_down');

              t.pd_logo_link = document.querySelector('#pd_logo a');
              t.pd_overlay_link = document.querySelector('#pd_overlay a');

              t.main_w = t.main.offsetWidth;
              t.main_h = t.main_w / 1.78;
              t.main_x = t.main.getBoundingClientRect();

              t.main_x = t.main_x.left;

              t._addEventListeners();
            }

            /**
            * 1. Shows the Pushdown div
            * 2. Adjusts the Pushdown div according to #main's width
            # 3. Injects a beacon to indicate creative has rendered
            */
            t._showPushdown = function() {
              t.pd_div.style.display = "block";
              t._adjustContainer();
              t.pd_div.style.opacity = "1";

              t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdCreativeView/fcid=' + t.fcid + '">');
              t.pd_cont.insertAdjacentHTML('afterend', t.sasimp);

            }

            /** Drops pixel to track clicks from Pushdown assets */
            t._clickTrack = function() {
              t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=PushdownClick/fcid=' + t.fcid + '">');
            }

            /** Sets viewability and opacity of the Pushdown div */
            t._checkScroll = function() {
              t.pd_view = viewability.vertical(t.pd_div);
              t.pd_view = t.pd_view["value"];
              t.pd_div.style.opacity = t.pd_view;

              t.window_sY = window.pageYOffset;
            }

            /**
            * 1. Adjusts the Pushdown div according to #main's width
            * 2. Adds margin to NZH Hamburger if browser is below 567px
            */
            t._adjustContainer = function() {
              t.main_w = t.main.offsetWidth;
              t.main_h = t.main_w / 1.78;
              t.main_x = t.main.getBoundingClientRect();
              t.main_x = t.main_x.left;

              t.pd_div.style.height = t.main_h + "px";
              t.pd_clip.style.height = t.main_h + "px";
              t.pd_crtv.style.height = t.main_h + "px";

              t.pd_clip.style.width = t.main_w + "px";
              t.pd_crtv.style.width = t.main_w + "px";

              t.pd_crtv.style.left = t.main_x + "px";

              t.window_w = window.innerWidth;

              if (t.window_w < 567 && t.nzh_hamnav) {
                t.nzh_hamnav.style.marginTop = (t.main_h + 10) + "px";
              } else if (t.nzh_hamnav) {
                t.nzh_hamnav.style.removeProperty('margin-top');
              }
            }

            /**
            * 1. Calculates how many seconds there are left until midnight
            * 2. Creates a SAS cookie which expires at midnight. The cookie has the advertiser ID which SAS checks to see if it should serve flights from that advertiser or not.
            */
            t._pushdownAdvClose = function() {
              function secondsUntilMidnight() {
                var midnight = new Date();
                midnight.setHours(24);
                midnight.setMinutes(0);
                midnight.setSeconds(0);
                midnight.setMilliseconds(0);
                return (midnight.getTime() - new Date().getTime()) / 1000;
              }

              var advid = edata["pushdown"]["advid"];
              var secondsToLive = parseInt(secondsUntilMidnight());
              var pdClosedTag = '<img src="https://data.apn.co.nz/apnnz/SETTAG/append=1/NAME=pdClosed/TTL=' + secondsToLive + '/TAGS=pdClosed%3D' + advid + '">';

              t.pd_cont.insertAdjacentHTML('beforeend', pdClosedTag);
            }

            /**
            * 1. Sets height of Pushdown div to 0
            * 2. Removes margin to NZH Hamburger if set earlier
            * 3. Injects a beacon to indicate creative has been closed
            * 4. Removes event listeners
            */
            t._removePushdown = function() { //formely pd_remove()
              t.pd_div.style.height = "0px";
              t.pd_clip.style.height = "0px";

              if (t.nzh_hamnav) {
                t.nzh_hamnav.style.removeProperty('margin-top');
              }
              t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdClosed/fcid=' + t.fcid + '">');

              t._removeEventListeners();
              t._pushdownAdvClose();
            }

      /** Correctly adjusts the container when the nav is opened/closed. The bar fades in/out (same as container width/height) which is why we need a timeout value */
      t.handleNavOpenAndClose = function() {
          setTimeout(function() {
          t._adjustContainer();
        }, 350);
      }

            /** Adds the Pushdown CSS to <head>, executes on init */
            t._loadCss('https://nzme-ads.co.nz/css/pushdown.css');
          }

          /** PushdownVideo Subclass */
          function PushdownVideo() {
            Pushdown.call(this);

            var t = this;

            /** Video Vars */
            var pd_video;
            var pd_videoClick;
            var pd_rdy;
            var pd_video_rdy;
            var pd_hasplayed;
            var pd_volumebtn;
            var pd_mutebtn;
            var pd_unmutebtn;
            var pd_firstRun = true;
            var pd_overlay;
            var pd_logo;

            var firstplay = true;
            var firstend = true;
            var soundUnmuted = false;

            var vctime, vdur, vprc;
            var vtime25 = false;
            var vtime50 = false;
            var vtime75 = false;
            var vtime100 = false;
            var vtime5sec = false;

            /**
            * 1. Get markup template
            * 2. Create and insert volume control markup into template after close button
            * 3. Create and insert video player markup into template inside #pd_crtv
            * 4. Inject markup into Pushdown HTML container
            */
            t.generateVideoMarkup = function() {

              var markupTemplate = t._getMarkupTemplate();

              //Video Controls - placed after #pd_closebtn
              var controlsMarkup = '';
              controlsMarkup += '<div id="pd_volumebtn">';
              controlsMarkup += ' <img id="pd_mutebtn" src="https://nzme-ads.co.nz/img/mute.png">';
              controlsMarkup += ' <img id="pd_unmutebtn" src="https://nzme-ads.co.nz/img/vol.png">';
              controlsMarkup += '</div>';

              var tar = markupTemplate.querySelector('#pd_closebtn');
              tar.insertAdjacentHTML('afterend', controlsMarkup);

              //Video Creative - placed inside #pd_crtv
              var crtvMarkup = '';
              crtvMarkup += '<a id="pd_videoClick" target="_blank" href="' + t.curl + '">';
              crtvMarkup += '<video id="pd_video" class="video-js"' + t.enviros[t.pdEnv]['vparams'];
              crtvMarkup += ' poster="' + t.enviros[t.pdEnv]['iasset'] + '" data-setup="{}" width="100%" height="100%">';
              crtvMarkup += ' <source src="' + t.enviros[t.pdEnv]['vasset'] + '" type="video/mp4">';
              crtvMarkup += '</video>';
              crtvMarkup += '</a>';

              tar = markupTemplate.querySelector('#pd_crtv');
              tar.insertAdjacentHTML('afterbegin', crtvMarkup);

              var output = markupTemplate.body.innerHTML;

              t._generateFinalMarkup(output);
            }

            /** Assigns selectors and values to video vars */
      t.initVideoElements = function() {
              pd_video = videojs('pd_video');
              pd_rdy = false;
              pd_video_rdy = false;
              pd_hasplayed = false;
              pd_videoClick = document.getElementById('pd_videoClick');
              pd_volumebtn = document.getElementById('pd_volumebtn');
              pd_mutebtn = document.getElementById('pd_mutebtn');
              pd_unmutebtn = document.getElementById('pd_unmutebtn');
              pd_logo = document.getElementById('pd_logo');
              pd_overlay = document.getElementById('pd_overlay');
            }

        // Pauses video when user click-through
        t.videoClickThrough = function() {
          pd_video.pause();
        }

            /**
            * 1. Set on videojs ready function
            * 2. Set ontime update function -> injects tracking pixels to reflect video playback progress
            * 3. Adds event listeners to volume & close buttons and on window scroll
            * 4. Indicates video is ready
            */
            t.onVideoReady = function() {

              videojs("pd_video").ready(function() {

                var timeEvent = function() {
                  var vctime = Math.round(pd_video.currentTime());
                  var vdur = Math.round(pd_video.duration());
                  var vprc = Math.round(vctime / vdur * 100);

                  if (!vtime25) {
                    if (vprc >= 25) {
                      vtime25 = true;
                      t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdFirstQuartile/fcid=' + t.fcid + '">');
                    }
                  }
                  if (!vtime50) {
                    if (vprc >= 50) {
                      vtime50 = true;
                      t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdMidPoint/fcid=' + t.fcid + '">');
                    }
                  }
                  if (!vtime75) {
                    if (vprc >= 75) {
                      vtime75 = true;
                      t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdThirdQuartile/fcid=' + t.fcid + '">');
                    }
                  }
                  if (!vtime100) {
                    if (vprc >= 100) {
                      vtime100 = true;
                      t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdComplete/fcid=' + t.fcid + '">');
                    }
                  }
                };

                pd_video.on("timeupdate", timeEvent);

                pd_video.on("firstplay", function() {

                  if (firstplay) {

                    t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=AdStart/fcid=' + t.fcid + '">');
                    if(t.imptrk){
                      t.pd_cont.insertAdjacentHTML('afterend', t.imptrk);
                    }
                    firstplay = false;
                  }
                });

                t.addPushdownVideoEvents();

                pd_video_rdy = true;

              });
            }

            /** Toggles between mute / unmute and displays correct icon */
            t.videoSoundToggle = function() {

              if (pd_video.muted() == true) {

                if(soundUnmuted == false){
                  soundUnmuted = true;
                  t.pd_cont.insertAdjacentHTML('afterend', '<img style="display:none;" src="https://data.apn.co.nz/apnnz/count/actname=PushdownSoundOn/fcid=' + t.fcid + '">');
                }

                pd_video.muted(false);
                pd_unmutebtn.style.display = "inline-block";
                pd_mutebtn.style.display = "none";

              } else if (pd_video.muted() == false) {

                pd_video.muted(true);
                pd_unmutebtn.style.display = "none";
                pd_mutebtn.style.display = "inline-block";

              }
            }

            /** Plays the video if it is ready and indicates that it has played if so */
            t.videoPlay = function() {
              if (pd_video_rdy == true) {
                pd_video.play();
                pd_hasplayed = true;
              }
            }

            /**
            * 1. Fires main checkscroll function
            * 2. If Pushdown has not played and is within view -> Show Pushdown and play video and scroll to 100% view
            * 3. If video has played and is not in view and is not the first run -> mute video and hide Pushdown
            * 4. If view is in view -> play video
            */
            t.videoCheckScroll = function() {
              t._checkScroll();

              if (t.window_sY < t.main_h && pd_hasplayed == false && pd_video_rdy == true) {
                t._showPushdown();
                t.videoPlay();
                window.scrollTo(0, 0);
              }

              if (pd_hasplayed == true && t.pd_view <= 0.29 && pd_firstRun == false) {
                pd_video.muted(true);
                pd_unmutebtn.style.display = "none";
                pd_mutebtn.style.display = "inline-block";
                pd_video.pause();
              }

              if (t.pd_view >= 0.3) {
                t.videoPlay();
              }

              pd_firstRun = false;
            }

            /** Add event listeners for volume, close buttons and window scroll */
          t.addPushdownVideoEvents = function() {

              window.addEventListener("scroll", t.videoCheckScroll);

              pd_volumebtn.addEventListener("click", t.videoSoundToggle);

              t.pd_logo_link.addEventListener("click", t.videoClickThrough);
              t.pd_overlay_link.addEventListener("click", t.videoClickThrough);
              pd_videoClick.addEventListener("click", t.videoClickThrough);
              pd_videoClick.addEventListener("click", t._clickTrack);

              t.pd_closebtn.addEventListener("click", t.removePushdownVideo);
              t.pd_down.addEventListener("click", t.removePushdownVideo);
          }

            /**
            * 1. Pause video
            * 2. Remove event listeners for volume, close buttons and window scrollview
            */
            t.removePushdownVideo = function() {

              pd_video.pause();

              window.removeEventListener("scroll", t.videoCheckScroll);

              pd_volumebtn.removeEventListener("click", t.videoSoundToggle);

              t.pd_logo_link.removeEventListener("click", t.videoClickThrough);
              t.pd_overlay_link.removeEventListener("click", t.videoClickThrough);
              pd_videoClick.removeEventListener("click", t.videoClickThrough);
              pd_videoClick.removeEventListener("click", t._clickTrack);

              t.pd_closebtn.removeEventListener("click", t.removePushdownVideo);
              t.pd_down.removeEventListener("click", t.removePushdownVideo);
            }

            /** Run functions and delay checkscroll (viewability.js workaround) */
            t.initPushdownVideo = function() {

              t.generateVideoMarkup();
              t._addToDOM();

              t.initVideoElements();
              if (edata["pushdown"]["facebook"]) {
                var fburl = decodeURIComponent(edata["pushdown"]["facebook"]);
                pd_overlay.innerHTML = '<iframe src="https://www.facebook.com/plugins/share_button.php?href='+fburl+'&layout=button&size=large&mobile_iframe=true&appId=1711736142399512&width=73&height=28" width="73" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
                pd_overlay.style.zIndex = 5;
              }
              t.onVideoReady();

              setTimeout(t.videoCheckScroll, 500);
            }

            /** Adds Videojs CSS to <head>, executes on init */
            t._loadCss('//vjs.zencdn.net/5.8.8/video-js.css');

            /** Load viewability.js library then videojs then run init() */
            t._loadScript("//cdn.jsdelivr.net/viewability/latest/viewability.min.js",
            t._loadScript("//vjs.zencdn.net/4.7.1/video.js", t.initPushdownVideo)
          );


        }

        /** PushdownStatic Subclass */
        function PushdownStatic() {

          Pushdown.call(this);

          var t = this;
          var pd_imageClick;
          /**
          * 1. Get markup template
          * 2. Create and insert static creative markup into template inside #pd_crtv
          * 3. Inject markup into Pushdown HTML container
          */
          t.generateStaticMarkup = function() {
            var markupTemplate = t._getMarkupTemplate();

            var crtvMarkup = '';
            crtvMarkup += '<a id="pd_imageClick" href="'+t.curl+'" target="_blank"><img src="' + t.enviros[t.pdEnv]['iasset'] + '" style="width:100%;"></a>';

            var tar = markupTemplate.querySelector('#pd_crtv');
            tar.insertAdjacentHTML('afterbegin', crtvMarkup);

            var output = markupTemplate.body.innerHTML;

            t._generateFinalMarkup(output);
          }

          /**
          * 1. Fires main checkscroll function
          * 2. If Pushdown has not appeared yet and is within view -> Show Pushdown=
          */
          t.staticCheckScroll = function() {

            t._checkScroll();

            if (t.window_sY < t.main_h && t.pd_appeared == false) {
              t._showPushdown();
              window.scrollTo(0, 0);
              t.pd_appeared = true;
              if(t.imptrk){
                t.pd_cont.insertAdjacentHTML('afterend', t.imptrk);
              }
            }
          }

          /** Add event listeners for close buttons and window scrollview */
          t.addPushdownStaticEvents = function() {
            window.addEventListener("scroll", t.staticCheckScroll);
            pd_imageClick.addEventListener("click", t._clickTrack);
            t.pd_closebtn.addEventListener("click", t.removePushdownStatic);
            t.pd_down.addEventListener("click", t.removePushdownStatic);
          }

          /** Remove event listeners for close buttons and window scrollview */
          t.removePushdownStatic = function() {
            pd_imageClick.removeEventListener("click", t._clickTrack);
            t.pd_closebtn.removeEventListener("click", t.removePushdownStatic);
            t.pd_down.removeEventListener("click", t.removePushdownStatic);
            window.removeEventListener("scroll", t.staticCheckScroll);
          }

          /** Run functions and delay checkscroll (viewability.js workaround) */
          t.initPushdownStatic = function() {
            t.generateStaticMarkup();
            t._addToDOM();
            pd_imageClick = document.getElementById('pd_imageClick');
            t.addPushdownStaticEvents();

            setTimeout(t.staticCheckScroll, 500);
          }

          /** Load viewability.js library then run init() */
          t._loadScript("//cdn.jsdelivr.net/viewability/latest/viewability.min.js", t.initPushdownStatic.bind(t));

        }

        /** Determine whether to run video or static based on ad resposne data*/
        if (!edata["pushdown"]["videoHq"] && !edata["pushdown"]["videoLq"]) {
          PushdownStatic.prototype = Object.create(Pushdown.prototype);
          PushdownStatic.prototype.constructor = PushdownStatic;
          var pushdownStatic = new PushdownStatic();
        } else {
          PushdownVideo.prototype = Object.create(Pushdown.prototype);
          PushdownVideo.prototype.constructor = PushdownVideo;
          var pushdownVideo = new PushdownVideo();
        }


      })();

    }
    //END PUSHDOWN

    /// Start billboardAdvClose ///

    if (edata["billboardAdvClose"]) {

      (function() {

        var container = iframeID.parentElement;

        var closebtn = document.createElement("div");

        closebtn.style.cssText = "background: url(https://nzme-ads.co.nz/img/inertia_close.jpg); background-attachment: initial; background-clip: initial; background-color: initial; background-origin: initial; background-position-y: initial; background-position-x: initial; background-size: 42px 42px; box-shadow: -3px 1px 4px rgba(0, 0, 0, 0.2); cursor: pointer; height: 42px; margin-bottom: 5px; position: absolute; right: 0px; width: 42px; z-index: 999;";

        function secondsUntilMidnight() {
          var midnight = new Date();
          midnight.setHours(24);
          midnight.setMinutes(0);
          midnight.setSeconds(0);
          midnight.setMilliseconds(0);
          return (midnight.getTime() - new Date().getTime()) / 1000;
        }

        function setTag() {
          var advid = edata["billboardAdvClose"]["advid"];
          var secondsToLive = parseInt(secondsUntilMidnight());
          var bbTag = '<img src="https://data.apn.co.nz/apnnz/SETTAG/append=1/NAME=bbClosed/TTL=' + secondsToLive + '/TAGS=bbClosed%3D'+advid+'">';
          container.insertAdjacentHTML('beforeend', bbTag);
        }

        function closeBB() {
          setTag();

          var billboardAdContainer = container.parentElement;
          billboardAdContainer.parentNode.removeChild(billboardAdContainer);
        }
        closebtn.addEventListener('click', closeBB);

        container.appendChild(closebtn);
      })();

    }
    //END billboardAdvClose


    /// Start newNZH Billboard Parallax ///

    if (edata["billboardSlider"]) {
      // Helper variables
      var adpos;
      var targetId;
      // Helper functions
      var csssheet = document.createElement('link');
      csssheet.type = 'text/css';
      csssheet.rel = 'stylesheet';
      csssheet.href = 'https://nzme-ads.co.nz/css/bbprlx.css';
      document.head.appendChild(csssheet);

      function setCreative(img, cont, adj) {
        var ratio = findRatio(img.clientWidth, img.clientHeight);
        if (ratio > 1 && ratio != 1) {
          img.style.width = cont.clientWidth + 'px';
          img.style.top = (((window.innerHeight + adj) - img.clientHeight) / 2) + 'px';
        } else if (ratio < 1 && ratio != 1) {
          img.style.height = (window.innerHeight - adj) + 'px';
          img.style.left = ((cont.clientWidth - img.clientWidth) / 2) + 'px';
          img.style.top = adj + 'px';
        } else if (ratio == 1) {
          var inRatio = cont.clientWidth / (window.innerHeight - adj);
          if (inRatio > 1) {
            img.style.height = (window.innerHeight - adj) + 'px';
            img.style.left = ((cont.clientWidth - img.clientWidth) / 2) + 'px';
            img.style.top = adj + 'px';
          } else if (inRatio < 1) {
            img.style.width = cont.clientWidth + 'px';
            img.style.top = ((window.innerHeight - img.clientHeight) / 2) + 'px';
          } else if (inRatio == 1) {
            img.style.width = cont.clientWidth + 'px';
            img.style.top = adj + 'px';
          }
        }
      }

      function setBGWidth(img, cont) {
        var contW = cont.clientWidth;
        var innerH = window.innerHeight;
        var ratio = findRatio(img.clientWidth, img.clientHeight);
        if ((ratio > 1 && ratio != 1) || ratio == 1) {
          img.style.height = innerH + 'px';
        } else if (ratio < 1 && ratio != 1) {
          img.style.width = contW + 'px';
        }
      }

      function findRatio(w, h) {
        var ratio = w / h;
        return ratio;
      }

      function secondsUntilMidnight() {
        var midnight = new Date();
        midnight.setHours(24);
        midnight.setMinutes(0);
        midnight.setSeconds(0);
        midnight.setMilliseconds(0);
        return (midnight.getTime() - new Date().getTime()) / 1000;
      }

      function setTag() {
        var cookieName = 'billboardPos' + adpos;
        var secondsToLive = parseInt(secondsUntilMidnight());
        var bbTag = '<img src="https://data.apn.co.nz/apnnz/SETTAG/NAME=' + cookieName + '/TTL=' + secondsToLive + '/TAGS=' + cookieName + '%3dclosed" style="display:none;width:1px;height:1px;">';
        document.getElementById('sldr_div' + targetId).insertAdjacentHTML('beforebegin', bbTag);
      }

      function closeBB(e) {
        targetId = e.target.getAttribute('unitid');
        $('#sldr_div' + targetId).slideUp();
        $('#sldr_lbltop' + targetId).hide();
        $('#sldr_lblbot' + targetId).hide();
        //$('#sldr_closebtn' + targetId).hide();
        collapse(target, 'up');
        //setTag();
      }
      // End of Helper Functions

      function SliderLauncherD(c) {
        var unitId = c["unitId"];
        adpos = c["adpos"];
        var lsitever = c["lsitever"];
        var lmedia = c["lmedia"];
        lmedia = decodeURIComponent(lmedia);
        var lcurl = c["lcurl"];
        lcurl = decodeURIComponent(lcurl);
        var limptrk = c["limptrk"];
        limptrk = decodeURIComponent(limptrk);
        if (limptrk) {
          limptrk = '<img src="' + limptrk + '" style="display:none;width:1px;height:1px;">';
        } else {
          limptrk = '';
        }
        var sasimp = lcurl.replace('adclick', 'count/act=1');
        sasimp = '<img src="' + sasimp + '" style="display:none;width:1px;height:1px;">';
        var zoomtrack = lcurl.replace('adclick', 'count/act=3');
        zoomtrack = '<img src="' + zoomtrack + '" style="display:none;width:1px;height:1px;">';
        var zoomTracked = false;
        var lotameZoomTracked = false;
        var markup = '<div id="sldr_div' + unitId + '" class="sldr_div" style="width:970px;">' + //hardcode width to trigger calc in time
        //'<div id="sldr_closebtn' + unitId + '" unitId="' + unitId + '" class="sldr_closebtn"></div>' +
        '<div id="cubecont' + unitId + '" class="cubecont">' +
        '<div class="cssload-thecube">' +
        '<div class="cssload-cube cssload-c1"></div>' +
        '<div class="cssload-cube cssload-c2"></div>' +
        '<div class="cssload-cube cssload-c4"></div>' +
        '<div class="cssload-cube cssload-c3"></div>' +
        '</div>' +
        '</div>' +
        '<div id="sldr_clip' + unitId + '" class="sldr_clip" unitId="' + unitId + '">' +
        '<div id="sldr_crtv' + unitId + '" class="sldr_crtv">' +
        '<img id="sldr_bg' + unitId + '" class="sldr_bg" src="' + lmedia + '" unitId="' + unitId + '">' + // ADDED
        '<img id="sldr_img' + unitId + '" class="sldr_img" src="' + lmedia + '" unitId="' + unitId + '">' +
        '</div>' +
        '</div>' +
        '<span id="sldr_lbltop' + unitId + '" class="sldr_lbltop">&#9660; Advertisement &#9660;</span>' +
        '<span id="sldr_lblbot' + unitId + '" class="sldr_lblbot">Click Ad to Expand</span>' +
        limptrk + sasimp +
        '</div>';

        var sliderTarget = iframeID.parentElement.parentElement;
        if (sliderTarget) {
          sliderTarget.innerHTML = markup;
          sliderTarget.style.position = 'relative';
        }

        var zoom = '<a id="sldr_close' + unitId + '" class="sldr_close" unitId="' + unitId + '" href="##">' +
        '<img src="https://nzme-ads.co.nz/img/rsz_close.png" width="50" unitId="' + unitId + '">' +
        '</a>' +
        '<div id="sldr_zm' + unitId + '" class="sldr_zm" unitId="' + unitId + '">' +
        '<a href="' + lcurl + '" target="_blank">' +
        '<img id="sldr_zm_img' + unitId + '" class="sldr_zm_img" src="' + lmedia + '">' +
        '</a>' +
        '</div>';
        var zoomIns = document.getElementsByTagName('body')[0];
        if (zoomIns) {
          zoomIns.insertAdjacentHTML('afterbegin', zoom);
      document.getElementById("sldr_close" + unitId).style.display = 'none';
      document.getElementById("sldr_zm" + unitId).style.display = 'none';
        }
        var zoomState = false;


        function togZoom(e) {
          var targetId = e.target.getAttribute('unitid');
          if (zoomState === false) {
            document.getElementById("sldr_zm" + targetId).style.opacity = 1;
            document.getElementById("sldr_zm" + targetId).style.height = '100vh';
            document.getElementById("sldr_zm" + targetId).style.display = 'inline-block';
            document.getElementById("sldr_zm_img" + targetId).style.height = 'auto';
            document.getElementById("sldr_close" + targetId).style.display = 'block';
            document.getElementById("sldr_img" + targetId).style.display = 'none';
            zoomState = true;
            if (zoomTracked === false) {
              document.body.insertAdjacentHTML('afterbegin', zoomtrack);
              zoomTracked = true;
            }
          } else if (zoomState === true) {
            document.getElementById("sldr_zm" + targetId).style.opacity = 0;
            document.getElementById("sldr_zm" + targetId).style.height = 0;
            document.getElementById("sldr_zm_img" + targetId).style.height = 0;
            document.getElementById("sldr_img" + targetId).style.display = 'block';
            zoomState = false;
          }
        }
        document.getElementById('sldr_clip' + unitId).addEventListener('click', togZoom);
        document.getElementById('sldr_close' + unitId).addEventListener('click', togZoom);
        document.getElementById('sldr_zm' + unitId).addEventListener('click', togZoom);
        // document.getElementById('sldr_closebtn' + unitId).addEventListener('click', closeBB);
        // window.addEventListener('scroll', function() {
        //   $('sldr_closebtn').css('z-index', 1);
        //   //console.log('scroll');
        // });

        var bg = document.getElementById('sldr_bg' + unitId);
        var img = document.getElementById('sldr_img' + unitId);
        var cont = document.getElementById('sldr_div' + unitId);
        var sldrzm = document.getElementById('sldr_zm' + unitId);
        var sldrzmimg = document.getElementById("sldr_zm_img" + unitId);

        $('img#sldr_bg' + unitId).on('load', function() {
          /* new site - container max width resizer */
          if (lsitever) {
            //console.log('lsitever is', lsitever);
            $('#sldr_div' + unitId)[0].parentElement.style.maxWidth = '970px';
          }
          /* END of new site - container max width resizer */

          setCreative(img, cont, 0);
          setBGWidth(bg, cont);
          setTimeout(function() {
            $("#cubecont" + unitId).slideUp("slow", function() {
              document.getElementById("cubecont" + unitId).style.height = 0;
              img.style.visibility = 'true';
            });
          }, 500);
        });

      }
      SliderLauncherD(edata["billboardSlider"]);
    }

    ///////////////// End newNZH Billboard Parallax /////////////////

    // Begin Appnexus Sync
    if (edata["anSync"]) {

      function anSync(c) {
        //get width, height, PB adID, page adcontainer ID
        var ran = edata["nzmeAdID"];
        var pix = '<img src="https://secure.adnxs.com/getuid?https%3A%2F%2Fbcp.crwdcntrl.net%2Fmap%2Fc=281%2Frand='+ran+'%2Ftpid%3D%24UID%2Ftp%3DANXS" height="1" width="1">' +
        '<img src="https://data.apn.co.nz/apnnz/SETTAG/NAME=ANSYNC/TTL=3600/TAGS=ANSYNC%3Dy">';

        document.body.insertAdjacentHTML('beforeend', pix);
      }

      anSync(edata["anSync"]);
    }
    ///////////////////// End Appnexus Sync //////////////////////



    /* ========================= FORMATS IN TESTING BELOW THIS LINE ==================================*/

    /**
      * Begin celtraSticky
      */
      if (edata["celtraSticky"]) {

        var adid = edata["celtraSticky"]["adid"];
        var curl = edata["celtraSticky"]["curl"];

        var sasimp = curl.replace('adclick', 'count%2Fact=1');
        sasimp = "<!-- track.creativeLoads = urldecode "+sasimp+" -->";

        curl = decodeURIComponent(curl);

        var limptrk = edata["celtraSticky"]["imptrk"];
        limptrk = decodeURIComponent(limptrk);

        var celtra = "<div class=\"celtra-ad-v3\">\n" +
        limptrk+sasimp+"\n"+
        "<img src=\"data:image/png,celtra\" style=\"display: none\" onerror=\"\n" +
        "(function(img) {\n" +
        "var params =\n"+ "{'clickUrl':'"+curl+"','sticky':'top','clickEvent':'advertiser','externalAdServer':'Custom','tagVersion':'6'};\n"+
        "var req = document.createElement('script');\n" +
        "req.id = params.scriptId = 'celtra-script-' + (window.celtraScriptIndex = (window.celtraScriptIndex||0)+1);\n" +
        "params.clientTimestamp = new Date/1000;\n" +
        "params.clientTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();\n" +
        "params.hostPageLoadId=window.celtraHostPageLoadId=window.celtraHostPageLoadId||(Math.random()+'').slice(2);\n" +
        "var qs = '';\n"+
        "for (var k in params) {\n" +
        "qs += '&amp;' + encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);\n" +
        "}\n" +
        "var src = 'https://ads.celtra.com/"+adid+"/web.js?' + qs;\n" +
        "req.src = src;\n" +
        "img.parentNode.insertBefore(req, img.nextSibling);\n" +
        "})(this);\n" +
        "\"/>\n" +
        "</div>";

        document.body.insertAdjacentHTML('beforeend', celtra);
      }
      /**
      * End celtraSticky
      */


  }

}
}, false);

var nzmeads;

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];

(function ($) {

	var mobile = isMobile.any();

	console.log('nzmeads: global ad script v16.0.0');

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

		tryParseJSON: function (jsonString) {
			try {
				var o = JSON.parse(jsonString);

				if (o && typeof o === "object") {
					return o;
				}
			} catch (e) {}

			return false;
		},

		getCookieValue: function (a) {
			var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
			return b ? b.pop() : '';
		},

		setGeoUnitCookie: function (lat, lng) {

			var enc_lat = window.btoa(lat);
			var enc_lng = window.btoa(lng);

			nzmeads.log('nzmeads: setGeoUnitCookie running...');

			$.ajax({
				url: 'https://gp.nzme.io/gp_mba_2018/?lat=' + enc_lat + '&lng=' + enc_lng + '&hg=all',
				dataType: "json",
				cache: true,
				timeout: 5000
			}).done(function (res) {

				nzmeads.log('nzmeads: setGeoUnitCookie data: ' + JSON.stringify(res));

				if (res.errcode && res.errcode === 400) {
					nzmeads.log('nzmeads: setGeoUnitCookie error: ' + JSON.stringify(res));
					return false;
				}
				if (res.data && res.data.mb2018_v1_00 && res.data.sa22018_v1_00) {

					nzmeads.log('nzmeads: setGeoUnitCookie adding nzmeads.geo params and cookie');
					//add nzmeads geo params
					nzmeads.geo.mb = res.data.mb2018_v1_00;
					nzmeads.geo.sa2 = res.data.sa22018_v1_00;

					//set geo cookie with meshblock and sa2 to expire in 24 hours
					var age = 60 * 60 * 24;
					document.cookie = 'ad_gu={"mb":' + JSON.stringify(res.data.mb2018_v1_00) + ', "sa2":' + JSON.stringify(res.data.sa22018_v1_00) + '}; max-age=' + age;
				}
				//generateMarkup(data);
			}).fail(function (xhr, status, error) {
				nzmeads.log('nzmeads: setGeoUnitCookie error: ' + xhr.responseText + status + error);
			});

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
		setParameter: function (uri, key, value) {
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
				nzmeads.log('global-ad-script.js setParameter: Key does not exist - ' + key);
			}
		},

		processGeo: function () {

			var lat = nzmeads.getCookieValue('user_latitude');
			var lng = nzmeads.getCookieValue('user_longitude');
			var ad_gu = nzmeads.getCookieValue('ad_gu'); //structure should be {"sa2":1,"mb":1}

			if (!lat || !lng) { //lat & lng cookies do not exist

				if (!ad_gu) { //GeoUnit cookie does not exist
					//1A1A
					nzmeads.log('nzmeads: processGeo > no location, lat/lng or cookies available');
				} else { //GeoUnit cookie exist, set nzmeads geo params
					//1A1B
					nzmeads.log('nzmeads: processGeo > GeoUnit cookie exists, set nzmeads geo params (A)');
					ad_gu = nzmeads.tryParseJSON(ad_gu) ? JSON.parse(ad_gu) : ad_gu;
					nzmeads.geo.mb = ad_gu.mb ? ad_gu.mb : null;
					nzmeads.geo.sa2 = ad_gu.sa2 ? ad_gu.sa2 : null;
				}

			} else { //lat & lng cookies do exist

				//set nzmeads lat & lng params
				nzmeads.geo.x = lat;
				nzmeads.geo.y = lng;

				if (!ad_gu) { //GeoUnit cookie does not exist, create cookie using lat & lng
					nzmeads.log('nzmeads: processGeo > lat & lng found');
					nzmeads.setGeoUnitCookie(lat, lng);
				} else { //GeoUnit cookie exist, set nzmeads geo params
					nzmeads.log('nzmeads: processGeo > GeoUnit cookie exists, set nzmeads geo params (B)');
					ad_gu = nzmeads.tryParseJSON(ad_gu) ? JSON.parse(ad_gu) : ad_gu;
					nzmeads.geo.mb = ad_gu.mb ? ad_gu.mb : null;
					nzmeads.geo.sa2 = ad_gu.sa2 ? ad_gu.sa2 : null;
				}
			}

		},

		geo: {
			x: 0,
			y: 0,
			mb: null,
			sa2: null
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

        user_type: "none",

        page_type: "", 
        
        content_type: "",

		setCats: function () {
			if (typeof oParams["content_topics"] === 'undefined') {
				nzmeads.log('nzmeads: no oParams content_topics found');
				return;
			} else {
				var cats = oParams["content_topics"];
				cats = cats.replace(/c-/g, "");
				cats = cats.replace(/\|/g, ",");
				nzmeads.log('nzmeads: found oParams content_topics: ' + cats);
				nzmeads.cats = cats;
			}
        },
        
        setUserType: function() {
            if (typeof oParams["arc_uuid"] === 'undefined') {
                nzmeads.log('nzmeads: no oParams for user found');
                return;
            } else {
                nzmeads.user_type = "standard";
                if (oParams["subscriber"] == true) {
                    nzmeads.user_type = "subscriber";
                }                
            }
        },

        setPageType: function(){
            if (typeof oParams["page_type"] === 'undefined') {
                nzmeads.log('nzmeads: no oParams for user found');
                return;
            } else {
                nzmeads.page_type = oParams["page_type"];
            }
        },

        setContentType: function(){
            if (typeof oParams["content_type"] === 'undefined') {
                nzmeads.log('nzmeads: no oParams for user found');
                return;
            } else {
                nzmeads.content_type = oParams["content_type"];
            }
		},
		
		parsePageParams: function (){
            if (typeof oParams === 'undefined') {
                nzmeads.log('nzmeads: no oParams found');
                return;
            }

            nzmeads.setCats();
            nzmeads.setUserType();
            nzmeads.setPageType();
            nzmeads.setContentType();
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

			nzmeads.prebid.adUnits.push({
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
			});

			var desktopArticleContentRectPid = '12458142';
			if (a_pid === desktopArticleContentRectPid) {
				nzmeads.prebid.adUnits.push({
					code: divId,
					mediaTypes: {
						video: {
							context: 'outstream',
							playerSize: [620, 349]
						}
					},
					bids: [{
						bidder: 'appnexus',
						params: {
							placementId: a_pid,
							video: {
								playback_method: ['auto_play_sound_off']
							}
						}
					}]
				});
			}
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
					bidsBackHandler: function (bids) {
						// nzmeads.log('>>>>>>nzmeads: These are the Prebid bids!: ' + JSON.stringify(bids));
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
				var hb_format = p[key]["hb_format"];
				var size = hb_size.split('x');
				var width = size[0];
				var height = size[1];

				// For outstream; in case Adx renders instead of outstream
				if (hb_format === 'video') {
					width = '300';
					height = '250';
				}

				url = url + '/hb_b=' + hb_bidder + '/hb_pb=' + hb_pb + '/hb_adid=' + hb_adid + '/hb_w=' + width + '/hb_h=' + height + '/hb_wid=' + key + '/hb_format=' + hb_format;
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

						if (divId.toLowerCase() === 'contentrect') {
                            
							pos = 2;
							nzmeads.units.rect--;
                            nzmeads.recpos = 2;
							
							//Hide the content rec for a non-sub user on desktop standard premium template
                            if (nzmeads.content_type === 'premium' && nzmeads.user_type !== 'subscriber' && nzmeads.page_type.indexOf('bigread') === -1) {
                                $ad.attr('data-ad-done', 'yes');
                                $ad.parent().hide();
                                return;
                            }

						} else if (nzmeads.units.rect == 1) {
							
							pos = 1;
							nzmeads.recpos = 1;
							
							//Hide the bottom rec for a sub user on desktop big read template
                            if (nzmeads.page_type.indexOf('bigread') > -1 && nzmeads.user_type === 'subscriber') {                                
                                $ad.attr('data-ad-done', 'yes');
                                $ad.parent().hide();
                                return;
							}
							

						} else if (nzmeads.units.rect == 2) {
							pos = 3;
							nzmeads.recpos = 3;
						}


                    } else if (nzmeads.browserWidth < 794) { //Mobile BP: Only serve ContentRect with POS=1
                                                
                        if (nzmeads.user_type !== 'subscriber' && nzmeads.page_type.indexOf('bigread') > -1) {

							//Hide the content rec for a non-sub user on big read template mobile
                            if (divId.toLowerCase() === 'contentrect') {
                                $ad.attr('data-ad-done', 'yes');
                                $ad.parent().hide();
								return;								
							}
							//Show the bottom rec for a non-sub user on big read template mobile
							else{
                                pos = 1;
                                nzmeads.recpos = 1;
							}
							
                        }else{

							//Show the content rec for a sub user on big read template mobile
                            if (divId.toLowerCase() === 'contentrect') {
                                pos = 1;
                                nzmeads.recpos = 1;
							}

							//Hide the bottom rec for a sub user on big read template mobile
							else {
                                $ad.attr('data-ad-done', 'yes');
                                $ad.parent().hide();
                                return;
							}
							
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

                if (nzmeads.browserWidth < 727){
                    nzmeads.units.mast++;
                    pos = nzmeads.units.mast;
                    href = href + '/SIZE=MINIBANNER';
                }else{
                    $ad.attr('data-ad-done', 'yes');
                    $ad.parent().hide();
                    return;
                }
				

			}

			if (href) {
				href = href.replace('/VURL=WASHPOST', '');
				if (href.toUpperCase().indexOf('/SITE=') == -1) {
					href = href + "/SITE=NZH";
				}
				//Hide the sponsored links container on premium content (big read and standard premium)
				if (nzmeads.content_type === 'premium' && href.indexOf('SPECIALOFFERCONTAINER') > -1){
					$ad.attr('data-ad-done', 'yes');
					$ad.parent().hide();
					return;
				}
			}

			if (href.toUpperCase().indexOf('/POS=') == -1) {
				href = href + '/POS=' + pos + '/';
			}

			var cats = nzmeads.cats;
			if (cats) {
				cats = "CAT=" + cats + "/";
			}

			var lat = nzmeads.geo.x;
			var lng = nzmeads.geo.y;
			var mb = nzmeads.geo.mb;
			var sa2 = nzmeads.geo.sa2;

			// Replace Arc OID with url OID
            href = nzmeads.standardiseOID(href);                        

			href = href + cats + 'BW=' + nzmeads.browserWidth + '/LATITUDE=' + lat + '/LONGITUDE=' + lng + '/MB=' + mb + '/SA2=' + sa2 + '/SYNC=' + nzmeads.syncId + '/USER_TYPE=' + nzmeads.user_type + '/TEMPLATE=' + nzmeads.page_type + '/CONTENT_TYPE=' + nzmeads.content_type + '/RANDOM=' + nzmeads.getRandomNumber(10000000000) + '/' + 'VIEWID=' + nzmeads.viewId + '/';

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
		standardiseOID: function (adCall) {
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

			nzmeads.processGeo();

			//Set params from oParams
			nzmeads.parsePageParams();

			//--Showcase
			if (mobile && document.location.href.indexOf('my-account') === -1) {
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