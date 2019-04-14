/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
Date.prototype.monthDays = function(month) {
  var d = new Date(this.getFullYear(), month + 1, 0);
  return d.getDate();
};

var ga_ = {};
//cookie write
ga_.cw = function(v, n, e) {
  var a = new Date(),
    b,
    c,
    d;
  b = n ? n : "ga_";
  if (e) {
    c = e == 0 ? 1800000 : e * 86400000;
  } else {
    c = 99999999999;
  }
  if (b.includes("ga_pp_timer_")) {
    c = 10800000;
  }
  a.setTime(a.getTime() + c);
  d = "; expires=" + a.toGMTString();
  document.cookie = b + "=" + v + d + "; path=/";
};
//cookie read
ga_.cr = function(n) {
  var a,
    b,
    c,
    d,
    e = n ? n : "ga_",
    f = "length";
  a = document.cookie.split(";");
  for (var i = 0; i < a[f]; i++) {
    b = $.trim(a[i]);
    if (b.indexOf(e) == 0) {
      c = b.substring(e[f] + 1, b[f]);
    }
  }
  d = c ? c : "";
  return d;
};
//build ppv string and override cookie
ga_.ppv_g = function(p) {
  var a,
    b,
    c = p ? p + "_" : "",
    id = "headlines",
    pp_time,
    ppv_json = {},
    d;
  a = ga_.cr("ga_ppv");
  if (a == "0|||") {
    return "";
  }
  if (a && a.indexOf("|") > -1) {
    d = a.split("|");

    //If content pages, get the contentid (Article/Gallery/Video)
    if (
      d[2] == "NZH:article" ||
      d[2] == "NZH:video" ||
      d[2] == "NZH:imagegallery"
    ) {
      content_id = d[1].split(":");
      id = content_id[3];
    } else {
      //Special pages
      if (
        d[2] == "NZH:gallery" ||
        d[2] == "NZH:horoscopes" ||
        d[2] == "NZH:home" ||
        d[2] == "NZH:searchresults" ||
        d[2] == "NZH:weather" ||
        d[2] == "NZH:classifieds" ||
        d[2] == "NZH:unidentified"
      ) {
        content_id = d[3].split(":");
        id = content_id[1].replace("-", "");
      } else if (
        d[2] == "NZH:registration" ||
        d[2] == "NZH:signin" ||
        d[2] == "NZH:profile_setup" ||
        d[2] == "NZH:newsletter_setup" ||
        d[2] == "NZH:profile" ||
        d[2] == "NZH:profile_details" ||
        d[2] == "NZH:profile_newsletters" ||
        d[2] == "NZH:forgot_password" ||
        d[2] == "NZH:reset_password" ||
        d[2] == "NZH:confirmation" ||
        d[2] == "NZH:offer" ||
        d[2] == "NZH:checkout_register" ||
        d[2] == "NZH:checkout_signin" ||
        d[2] == "NZH:checkout" ||
        d[2] == "NZH:offers_signin" ||
        d[2] == "NZH:offers_register" ||
        d[2] == "NZH:payment"
      ) {
        content_id = d[1].split(":");
        id = content_id[1].replace("-", "");
      } else {
        //Normal headlines pages
        content_id = d[1].split(":");
        if (
          typeof content_id[2] !== "undefined" &&
          content_id[2] != "undefined"
        ) {
          id = content_id[2].replace("-", "");
        }
      }
    }
    pp_time = ga_.cr("ga_pp_timer_" + id);
    //b = (d[0] != 'undefined' ? '&' + c + 'ppv=' + d[0] : '') + (d[1] != 'undefined' ? '&' + c + 'pp_name=' + d[1] : '') + (d[2] != 'undefined' ? '&' + c + 'pp_pagetype=' + d[2] : '') + (d[3] != 'undefined' ? '&' + c + 'pp_section=' + d[3] : '') + (pp_time != 'undefined' ? '&pp_seconds=' + pp_time : '') + (d[4] != 'undefined' ? '&pp_syndicator=' + d[4] : '');
    ppv_json = Object.assign(ppv_json, {
      ppv: d[0] != "undefined" ? d[0] : undefined,
      pp_name: d[1] != "undefined" ? d[1] : undefined,
      pp_pagetype: d[2] != "undefined" ? d[2] : undefined,
      pp_section: d[3] != "undefined" ? d[3] : undefined,
      pp_seconds: pp_time != "undefined" ? pp_time : undefined,
      pp_syndicator: d[4] != "undefined" ? d[4] : undefined
    });
    ga_.cw("0|||", "ga_ppv");
    //clear the timer cookie
    ga_.cw("", "ga_pp_timer_" + id);
    return ppv_json;
  } else {
    ppv_json = Object.assign(ppv_json, {
      ppv: undefined,
      pp_name: undefined,
      pp_pagetype: undefined,
      pp_section: undefined,
      pp_seconds: undefined,
      pp_syndicator: undefined
    });
    return ppv_json;
  }
};
ga_.ss = function() {
  var a,
    b,
    c,
    f = Math,
    g = "max",
    h = document,
    q = h.documentElement,
    j = window,
    k = j.screen,
    l = "client",
    m = "Width",
    n = "Height",
    o = "inner",
    p = "avail";
  a = f[g](q[l + m], j[o + m] || 0);
  b = f[g](q[l + n], j[o + n] || 0);
  c = "&ns_innersize=" + a + "x" + b;
  a = k[p + m];
  b = k[p + n];
  c = c + "&ns_screen=" + a + "x" + b;
  return c;
};

var gtm = (function() {
  var pub = {};
  var pubName = "NZH";
  var siteName = "development";
  var aParams = {};
  //var clientID	= 6820959;
  var currentDate = new Date();
  var cYear = currentDate.getFullYear();
  var cMonth = currentDate.getMonth();

  // Public functions
  pub.init = function(publication, site) {
    pubName = publication;
    siteName = site;
    // Check the sessioncui cookie during initalization
    //set the unique id cookie for this browser
    var s_cui = new Date().getTime() + "-" + Math.random() * 1000;
    var mc = 0,
      dr = 30,
      monthly_mc = cMonth + ":0";
    if (
      $.cookie("sessioncui") === undefined ||
      $.cookie("sessioncui") === "" ||
      $.cookie("sessioncui") === null
    ) {
      var cdate = Math.round(new Date().getTime() / 1000);
      // aCookie[ session user id , cookie create date , days remaining , metering count ]
      var cval = s_cui + "|" + cdate + "|" + dr + "|" + mc + "|" + monthly_mc;
      $.cookie("sessioncui", cval, { path: "/", expires: 365 * 5 });
    } else {
      var aCookie = $.cookie("sessioncui").split("|");
      daysRemaining =
        30 -
        parseInt(
          (Math.round(currentDate.getTime() / 1000) - parseInt(aCookie[1])) /
            (60 * 60 * 24)
        );
      var dt = new Date(aCookie[1] * 1000);
      //if Cookie start date is July 2014 and first time since changeover then add Julys metering count to Julys monthly cookie data
      if (
        dt.getMonth() == 6 &&
        dt.getFullYear() == "2014" &&
        aCookie.length == 4
      ) {
        var aDateCont = [];
        aDateCont[0] = "6:" + aCookie[3];
        var k = 0;
        for (k = 7; k <= cMonth; k++) {
          aDateCont[k - 6] = k + ":0";
        }
        aCookie[4] = aDateCont.join(",");
      } else if (aCookie.length > 4) {
        //if they have skipped a month or months
        //Have new format of data so now check that all recent months have data eg 6:23,7:0,8:32
        var m,
          i,
          k = 0,
          max,
          index_sum,
          aDateCont = [],
          ar = [];
        aCookie[4] = aCookie[4].replace(/,\s*$/, "");
        var aMonthly = aCookie[4].split(",");
        last_month = aMonthly[aMonthly.length - 1].split(":")[0];

        if (last_month > cMonth) {
          //add 12 months from the new year
          max = cMonth + 12;
        } else {
          max = cMonth;
        }
        //if there is a gap then populate empty months
        if (!(last_month == max - 1)) {
          for (k = 0; k <= max - last_month - 1; k++) {
            index_sum = parseInt(k) + parseInt(last_month) + 1;
            aDateCont[k] = (index_sum % 12) + ":0";
          }
        }
        //join empty months to existing months
        if (aDateCont.length > 0) {
          //aCookie[4] = aCookie[4] + ',' + aDateCont.join(',');
          ar = ar.concat(aMonthly, aDateCont);
        } else {
          ar = aMonthly;
        }
        if (ar.length > 6) {
          //trim  array to max 6 months of data
          aCookie[4] = ar.slice(ar.length - 7, ar.length - 1).join(",");
        } else {
          aCookie[4] = ar.join(",");
        }
      } else if (aCookie.length == 4) {
        //No mc in july and no Monthly Counts setup: Old cookie format and hasn't been here for a long time
        aCookie[4] = monthly_mc;
        aCookie[5] = "light";
      }

      //check the users cookie has a start date = to this month
      if (cYear == dt.getFullYear() && cMonth == dt.getMonth()) {
        aCookie[2] = daysRemaining; // Decrement the number of days remaining
      } else {
        //New Month
        aCookie[1] = Math.round(currentDate.getTime() / 1000);
        aCookie[2] = dr;
        aCookie[3] = mc;

        var dt = new Date(aCookie[1] * 1000);
        $.cookie("alist", "", { path: "/", expires: 365 * 5 });
      }

      $.cookie("sessioncui", aCookie.join("|"), {
        path: "/",
        expires: 365 * 5
      });
    }

    // Check the cookie and page and increment the count n track it
    if (document.location.pathname.indexOf("article.cfm") != -1) {
      var aList = $.cookie("alist");
      var articleID = getURLParamByName("objectid");
      if (aList === undefined || aList == "") {
        $.cookie("alist", articleID, { path: "/", expires: 365 * 5 });
        incrementArticleCount();
      } else {
        aList = aList.split("|");
        if ($.inArray(articleID, aList) < 0) {
          aList.push(articleID);
          $.cookie("alist", aList.join("|"), { path: "/", expires: 365 * 5 });
          incrementArticleCount();
        }
      }
    }
    //Get the userhive UUID
    myAccount.profileCallback(function() {
      if (myAccount.isSignedIn() && myAccount.profile.legacyId) {
        visitorId = myAccount.profile.legacyId;
        arc_uuid = myAccount.profile.uuid;
        if (visitorId && visitorId != "") {
          $.extend(oParams, {
            visitor_id: visitorId,
            arc_uuid: arc_uuid
          });
        }
      } else {
        $.extend(oParams, {
          visitor_id: undefined,
          arc_uuid: undefined
        });
      }
    });
  };

  //Get the oParams object
  pub.getDataPacket = function() {
    return oParams;
  };

  pub.getUUID = function() {
    var userUUID = undefined;
    myAccount.profileCallback(function() {
      if (myAccount.isSignedIn() && myAccount.profile.legacyId) {
        userUUID = myAccount.profile.legacyId;
      }
    });
    return userUUID;
  };

  pub.getArticleReadCount = function() {
    var aCookie = $.cookie("sessioncui").split("|");
    return aCookie[3] !== "" ? aCookie[3] : undefined;
  };

  //sets the current page data and time on page to be used on the next page
  pub.track = function() {
    pp_time = new Date().getTime();
    ga_.ppv_s();
    ga_.ppv_l();
  };

  //dataLayer push to GTM
  pub.dataLayerPush = function(obj, user_event) {
    var gtm_data = obj;

    if (!user_event) {
      ppv_data = ga_.ppv_g(); //Get the previous page values
      $.extend(gtm_data, { event: "page_dimensions" }); //add the page dimension event
      //$.extend(gtm_data, ppv_data); //Add the previous page data to the data object
      gtm_data = Object.assign(gtm_data, ppv_data);
    }
    //Do not push to GTM from here if it is the react app
    $(document).ready(function() {
      if (!$(".coco-app").length) {
        //Send data to the GTM dataLayer
        dataLayer.push(gtm_data);
      }
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-KGJ3NMV');
    });
  };

  // track custom variables like widget interactions or quick read.
  pub.customTrack = function(event, category, action, label) {
    var obj = {
      event: event,
      category: category,
      action: action,
      label: label
    };

    for (var i in obj) {
      if ($.trim(obj[i]) == "") {
        delete obj[i];
      }
    }

    obj["name"] = oParams["name"];
    obj["section"] = oParams["section"];
    obj["page_type"] = oParams["page_type"];
    obj["visitor_id"] = oParams["visitor_id"];
    obj["arc_uuid"] = oParams["arc_uuid"];

    if (typeof oParams["ref_type"] !== "undefined") {
      obj["ref_type"] = oParams["ref_type"];
    }
    if (typeof oParams["objectid"] !== "undefined") {
      obj["objectid"] = oParams["objectid"];
    }

    gtm.dataLayerPush(obj, true);
  };

  pub.params = function(p) {
    aParams = p;
  };

  pub.getParams = function(param) {
    // Set default param values
    param = getDefaultVal(param);

    if (param != "" && aParams.hasOwnProperty(param)) {
      return aParams[param];
    } else {
      return aParams;
    }
  };

  pub.getVisitorID = function() {
    //returns the userhive UUID
    if (
      $.cookie("cui") !== undefined &&
      $.cookie("cui") != "undefined" &&
      $.cookie("cui") != ""
    ) {
      return $.cookie("cui");
    } else {
      return "";
    }
  };

  pub.userIsSubscriber = function() {
    return false;
  };

  pub.getSubscriberID = function() {
    if (
      $.cookie("subid") !== undefined &&
      $.cookie("subid") != "undefined" &&
      $.cookie("subid") != ""
    ) {
      return $.cookie("subid");
    } else {
      return undefined;
    }
  };

  pub.getPubName = function() {
    return pubName;
  };

  pub.getSiteName = function() {
    return siteName;
  };

  pub.getPageReferrer = function() {
    var urlVars = location.search.substring(1);
    urlVars = urlVars
      ? JSON.parse(
          '{"' + urlVars.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
          function(key, value) {
            return key === "" ? value : decodeURIComponent(value);
          }
        )
      : {};
    var sTemp = urlVars["ref"] !== undefined ? urlVars["ref"] : "";

    if (sTemp != "") {
      return sTemp;
    } else if (document.referrer != "") {
      if (
        document.referrer.search(/dynamic.nzherald.co.nz\/email\/index.cfm/i) !=
        -1
      ) {
        return pubName + ":emailfriend";
      } else if (
        document.referrer.search(
          /www.nzherald.co.nz\/google\/gadget\/topstories.xml/i
        ) != -1
      ) {
        return pubName + ":tsgadget";
      }
    }
    return "";
  };

  // Get page name - register/login/newsletter_setup/profile_setup
  pub.getProfilePageName = function(path) {
    if (path != "" && path != undefined) {
      var page_path = path;
    } else {
      var page_path = window.location.pathname;
    }
    var oPages = {};
    var oProfile = {
      "sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:register",
        pp_name: "NZH:register",
        pp_pagetype: "NZH:registration",
        pp_section: "NZH:register"
      },
      "register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:register",
        pp_name: "NZH:signin",
        pp_pagetype: "NZH:signin",
        pp_section: "NZH:register"
      },
      "register/newsletters-setup/": {
        page_type: "NZH:newsletter_setup",
        name: "NZH:newsletter_setup",
        section: "NZH:register",
        pp_name: "NZH:register",
        pp_pagetype: "NZH:registration",
        pp_section: "NZH:register"
      },
      "register/profile-setup/": {
        page_type: "NZH:profile_setup",
        name: "NZH:profile_setup",
        section: "NZH:register",
        pp_name: "NZH:newsletter_setup",
        pp_pagetype: "NZH:newsletter_setup",
        pp_section: "NZH:register"
      },
      "profile/details/": {
        page_type: "NZH:profile_details",
        name: "NZH:profile_details",
        section: "NZH:profile",
        pp_name: "NZH:profile",
        pp_pagetype: "NZH:profile",
        pp_section: "NZH:profile"
      },
      "profile/newsletters/": {
        page_type: "NZH:profile_newsletters",
        name: "NZH:profile_newsletters",
        section: "NZH:profile",
        pp_name: "NZH:profile",
        pp_pagetype: "NZH:profile",
        pp_section: "NZH:profile"
      },
      "profile/subscriptions/payment/": {
        page_type: "NZH:profile_subscriptionspayment",
        name: "NZH:profile_subscriptionspayment",
        section: "NZH:profile"
      },
      "profile/subscriptions/": {
        page_type: "NZH:profile_subscriptions",
        name: "NZH:profile_subscriptions",
        section: "NZH:profile"
      },
      "profile/": {
        page_type: "NZH:profile",
        name: "NZH:profile",
        section: "NZH:profile",
        pp_name: "NZH:profile",
        pp_pagetype: "NZH:profile",
        pp_section: "NZH:profile"
      },
      "forgot-password/": {
        page_type: "NZH:forgot_password",
        name: "NZH:forgot_password",
        section: "NZH:profile",
        pp_name: "NZH:signin",
        pp_pagetype: "NZH:signin",
        pp_section: "NZH:signin"
      },
      "reset-password/": {
        page_type: "NZH:reset_password",
        name: "NZH:reset_password",
        section: "NZH:profile",
        pp_name: "NZH:signin",
        pp_pagetype: "NZH:signin",
        pp_section: "NZH:signin"
      },
      "subscription/offers/": {
        page_type: "NZH:offer",
        name: "NZH:offer",
        section: "NZH:subscription"
      },
      "subscription/checkout/register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:subscription"
      },
      "subscription/checkout/sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:subscription"
      },
      "subscription/offers/sign-in/": {
        page_type: "NZH:signin",
        name: "NZH:signin",
        section: "NZH:subscription"
      },
      "subscription/offers/register/": {
        page_type: "NZH:registration",
        name: "NZH:register",
        section: "NZH:subscription"
      },
      "subscription/checkout/": {
        page_type: "NZH:your_details",
        name: "NZH:your_details",
        section: "NZH:subscription"
      },
      "subscription/payment/": {
        page_type: "NZH:payment",
        name: "NZH:payment",
        section: "NZH:subscription"
      },
      "subscription/confirmation/": {
        page_type: "NZH:confirmation",
        name: "NZH:confirmation",
        section: "NZH:subscription"
      }
    };
    for (var path in oProfile) {
      if (oProfile.hasOwnProperty(path)) {
        var page_val = "/my-account/" + path;
        if (window.location.pathname.indexOf("app") > -1) {
          page_val = "/app" + page_val;
        }
        if (page_path == page_val) {
          oPages.page_type = oProfile[path].page_type;
          oPages.name = oProfile[path].name;
          oPages.pp_name = oProfile[path].pp_name;
          oPages.pp_pagetype = oProfile[path].pp_pagetype;
          oPages.pp_section = oProfile[path].pp_section;
          //Get the previous page data from somewhere else for subscription pages
          oPages.pp_syndicator = undefined;
          oPages.section = oProfile[path].section;
          oPages.syndicator = undefined;
          oPages.author = undefined;
          oPages.objectid = undefined;
          oPages.publication_time = undefined;
          oPages.publication = oParams.publication;
          oPages.product = oParams.product;
          oPages.platform = oParams.platform;
          oPages.navigation_state = oParams.navigation_state;
          oPages.articles_read = oParams.articles_read;
        }
      }
    }
    return oPages;
  };

  pub.getPlatform = function() {
    var platform = "desktop";
    if (window.location.pathname.indexOf("app") > -1) {
      platform = "app";
    }
    return platform;
  };

  pub.clickTag = function(clickVal, cookieName) {
    var sCookie = getDefaultVal(cookieName, "pv");
    setCookie(setCookieNodeVal(sCookie, clickVal));
  };

  pub.getPreviousVal = function(node) {
    // Read out the value
    var pv = getCookieNodeVal(node);
    // Clear the value
    setCookie(setCookieNodeVal(node, ""));

    // Remove cookie for '.www.nzherald.co.nz' domain which
    // which was conflicting with the cookie on 'www.nzherald.co.nz' domain
    // resulting in ref_page_element not being sent to comscore.
    // This can be remove eventually
    $.removeCookie("ga", { path: "/", domain: ".www.nzherald.co.nz" });

    return pv;
  };

  pub.initLocalStorage = function() {
    var trackingState = {
      arc_uuid: "",
      articles_read: "",
      content_type: "",
      createdAt: "",
      event: "vpv",
      name: "",
      navigation_state: "",
      page_type: "",
      platform: "",
      pp_name: "",
      pp_pagetype: "",
      pp_seconds: "",
      pp_section: "",
      ppv: "",
      product: "",
      publication: "",
      ref_page_element: "",
      section: "",
      sku: "",
      subscriber: "",
      visitor_id: "",
      meta: {
        react: false
      },
      virtualPageURL: "",
      virtualPageTitle: ""
    };
    window.localStorageWrapper.setItem("vpv", JSON.stringify(trackingState));
  };

  pub.writeToCookiesFromLocalStorage = function() {
    // coming out of react
    var ls = JSON.parse(window.localStorageWrapper.getItem("vpv"));
    var ppv_str =
      ls.ppv +
      "|" +
      ls.pp_name +
      "|" +
      ls.pp_pagetype +
      "|" +
      ls.pp_section +
      "|" +
      ls.pp_seconds +
      "|" +
      "undefined";
    $.cookie("ga_ppv", ppv_str);
    $.cookie("ga", ls.ref_page_element);
    oParams.arc_uuid = ls.arc_uuid;
    oParams.articles_read = ls.articles_read;
    oParams.content_type = ls.content_type;
    oParams.name = ls.name;
    oParams.navigation_state = ls.navigation_state;
    oParams.page_type = ls.page_type;
    oParams.site_platform = ls.platform;
    oParams.product = ls.product;
    oParams.publication = ls.publication;
    oParams.section = ls.section;
    oParams.sku = ls.sku;
    oParams.subscriber = ls.subscriber;
    oParams.visitor_id = ls.visitor_id;
    ls.meta.react = false;
    window.localStorageWrapper.setItem("vpv", ls);
  };

  pub.writeLocalStorage = function() {
    // going into react
    if (!document.querySelector(".coco-app")) {
      var trackingState = {
        arc_uuid: oParams.arc_uuid || "",
        articles_read: oParams.articles_read || "",
        content_type: oParams.content_type | "",
        createdAt: Math.round(new Date().getTime() / 1000),
        event: "vpv",
        name: oParams.name || "",
        navigation_state: oParams.navigation_state || "",
        page_type: oParams.page_type || "",
        page_label: "",
        platform: oParams.site_platform || "",
        pp_name: ppv_data.pp_name || "", //this.name,
        pp_pagetype: ppv_data.pp_pagetype || "", //this.page_type,
        pp_seconds: ppv_data.pp_seconds || "",
        pp_section: ppv_data.pp_section || "", //this.section,
        pp_syndicator: ppv_data.pp_syndicator || "", //this.syndicator,
        ppv: ppv_data.ppv || "", //window.scrollY,
        product: oParams.product || "",
        publication: oParams.publication || "",
        ref_page_element: oParams.ref_page_element || "",
        section: oParams.section || "",
        sku: oParams.sku || "",
        subscriber: oParams.subscriber || "",
        syndicator: oParams.syndicator || "",
        visitor_id: oParams.visitor_id || "",
        meta: {
          react: false
        }
      };
      if (!window.localStorageWrapper.getItem("vpv")) {
        gtm.initLocalStorage();
      }
      window.localStorageWrapper.setItem("vpv", JSON.stringify(trackingState));
    }
  };

  // Private functions

  // Removes everything from a string that is not a numeric, alphanumeric or pipe character
  function getStrippedString(str) {
    return str.replace(/[^a-z0-9|]*/gi, "").toLowerCase();
  }

  // Coonverts an object into a string that looks like a url query string (params delimitered by & )
  function paramsToString(param) {
    param = getDefaultVal(param, aParams);
    return $.param(param);
  }

  // Set a default value for a function param that is not provided
  function getDefaultVal(param, defaultVal) {
    defaultVal = typeof defaultVal !== "undefined" ? defaultVal : "";
    param = typeof param !== "undefined" ? param : defaultVal;
    return param;
  }

  // Get the value for a particular node in the cookie data
  function getCookieNodeVal(node) {
    var oCsCookie = cookieToObject();
    var sReturn = "";
    if (oCsCookie.hasOwnProperty(node)) sReturn = oCsCookie[node];
    return sReturn;
  }

  // Add or Update a key value pair in the cs cookie
  function setCookieNodeVal(node, val) {
    var oCsCookie = cookieToObject();
    oCsCookie[node] = val;
    //console.log('oCsCookie');
    var sCookieVal = objectToCookie(oCsCookie);
    return sCookieVal;
  }

  // Write the cookie
  function setCookie(val) {
    // console.log(val);
    $.cookie("ga", val, { path: "/", expires: 365 });
  }

  // Convert the values in the ga cookie to an object
  function cookieToObject(name, delim) {
    name = getDefaultVal(name, "ga");
    delim = getDefaultVal(delim, "|");
    var oReturn = {};
    var csCookie = $.cookie(name);
    //console.log(csCookie);
    if (csCookie !== undefined && csCookie != "" && csCookie !== null) {
      aCookie = csCookie.split(delim);
      if (aCookie.length > 0) {
        for (var n in aCookie) {
          var aKeyVal = aCookie[n].split("=");
          oReturn[aKeyVal[0]] = aKeyVal[1];
        }
      }
    }
    return oReturn;
  }

  // Convert an object to a str that gets written to cookie
  function objectToCookie(obj) {
    var sCookieVal = "";
    for (var n in obj) {
      if (sCookieVal.length > 0) sCookieVal += "|";

      sCookieVal += n + "=" + obj[n];
    }
    return sCookieVal;
  }

  function update_mc(aCookie) {
    var currentDate = new Date();
    var i,
      new_mc,
      avg,
      ret = [];
    //a is a month:articlecount pair
    mc = aCookie[4];
    var a = mc.split(",");
    var total = 0;
    var total_days = 0;
    var count_30_day = 0;
    for (i = 0; i < a.length; ++i) {
      month_ct = a[i].split(":");
      days_in_month = new Date().monthDays(parseInt(month_ct[0]));
      //if this record is for current month
      if (month_ct[0] == cMonth) {
        month_ct[1]++;
        a[i] = month_ct.join(":");
        new_mc = a.join(",");
        days_in_month = currentDate.getDate();
      }

      total = total + parseInt(month_ct[1]);
      total_days = total_days + parseInt(days_in_month);
    }
    if (new_mc === "" || new_mc === undefined) {
      a[a.length] = cMonth + ":1";
      new_mc = a.join(",");
    }
    ret[0] = new_mc;
    //average
    ret[1] = Math.round(((365 / 12) * total) / total_days);
    return ret;
  }

  function getSegment(a) {
    var segment = "";
    if (a[0].split(",").length == 1) {
      var average = a[0].split(":")[1];
    } else {
      var average = a[1];
    }

    if (average <= 10) {
      segment = "light";
    } else if (average > 10 && average <= 24) {
      segment = "moderate";
    } else if (average > 24 && average < 100) {
      segment = "heavy";
    } else if (average > 100) {
      segment = "superheavy";
    }
    return segment;
  }

  // Increase the article read count
  function incrementArticleCount() {
    var aCookie = $.cookie("sessioncui").split("|");
    var a_mc = update_mc(aCookie);
    aCookie[3]++;
    aCookie[4] = a_mc[0];
    aCookie[5] = getSegment(a_mc);
    $.cookie("sessioncui", aCookie.join("|"), { path: "/", expires: 365 * 5 });
    //cs.customTrack({'sessioncui':aCookie[0],'days_remaining':aCookie[2],'articles_read':aCookie[3]});
    $.extend(oParams, {
      articles_read: aCookie[3]
    });
  }

  function getURLParamByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  return pub;
})();

var isBlurred = false;
var pp_time = new Date().getTime();
var pp_blurtime = 0;
var pp_timer = 0;

$(window).blur(function() {
  //if change windows stop counting engagement
  isBlurred = true;
  pp_blurtime = new Date().getTime();
  pp_timer = pp_timer + Math.floor((pp_blurtime - pp_time) / 1000);
});

$(window).focus(function() {
  //if change windows back counting engagement
  isBlurred = false;
  pp_time = new Date().getTime();
});

ga_.ppv_s = function(isUserAction) {
  var a,
    b,
    c,
    d,
    e = 0,
    f,
    g = Math,
    h = "max",
    i,
    j = document,
    k = window,
    m = 360, // NZME-1026 Threshold for max value of pp_seconds
    n = new Date().getTime(),
    contentID = "headlines";
  t = Math.floor((n - pp_time) / 1000);

  a = g[h](
    g[h](j.body.scrollHeight, j.documentElement.scrollHeight),
    g[h](j.body.offsetHeight, j.documentElement.offsetHeight),
    g[h](j.body.clientHeight, j.documentElement.clientHeight)
  );
  b =
    window.pageYOffset ||
    (k.document.documentElement.scrollTop || k.document.body.scrollTop);
  c =
    k.innerHeight ||
    (k.document.documentElement.clientHeight || k.document.body.clientHeight);
  d = Math.round(((b + c) / a) * 100);
  d = d > 100 ? 100 : d;
  e = ga_.cr("ga_ppv");
  i = e.split("|");

  if (t < 5) {
    e = d;
  } else {
    e = i[0];
    e = e > d ? e : d;
  }
  //If content pages get the objectid (Article/Gallery/Video)
  if (
    typeof oParams.objectid !== "undefined" &&
    (oParams.page_type == "NZH:article" ||
      oParams.page_type == "NZH:video" ||
      oParams.page_type == "NZH:imagegallery")
  ) {
    contentID = oParams.objectid;
  } else {
    //Other pages
    if (typeof oParams.section !== "undefined") {
      headlinesPage = oParams.section.split(":");
      if (typeof headlinesPage[1] !== "undefined") {
        contentID = headlinesPage[1].replace("-", "");
      }
    }
    //Setting the timer for the registration/profile/subscription pages
    if (
      oParams.section == "NZH:register" ||
      oParams.section == "NZH:profile" ||
      oParams.section == "NZH:subscription"
    ) {
      headlinesPage = oParams.name.split(":");
      if (typeof headlinesPage[1] !== "undefined") {
        contentID = headlinesPage[1].replace("-", "");
      }
    }
  }
  // Work out time viewed
  if (!isBlurred) {
    pp_timer = pp_timer + Math.floor((n - pp_time) / 1000);

    if (pp_timer > m) {
      pp_timer = m;
    }
  }
  if (isUserAction == "timer") {
    //write the pp_timer cookie
    if (contentID !== "") {
      ga_.cw(pp_timer, "ga_pp_timer_" + contentID);
    }
  } else {
    f =
      e +
      "|" +
      oParams["name"] +
      "|" +
      oParams["page_type"] +
      "|" +
      oParams["section"] +
      "|" +
      oParams["syndicator"];
    //oParams["syndicator"] != 'undefined' ? + '|' + oParams["syndicator"]: f;
    ga_.cw(f, "ga_ppv");
    ga_.cw(pp_timer, "ga_pp_timer_" + contentID);
  }
};

ga_.ppv_l = function(i) {
  var a,
    b = i ? i : 5,
    c = window;
  a = c.document.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    a[i].addEventListener(
      "mousedown",
      function() {
        ga_.ppv_s(true);
      },
      false
    );
  }

  setInterval(function() {
    ga_.ppv_s("timer");
  }, b * 1000); // NZME-1026 Threshold pausing pp_seconds counter
  if (c.document.addEventListener) {
    c.document.addEventListener("load", ga_.ppv_s("timer"), false);
    c.document.addEventListener("scroll", ga_.ppv_s("timer"), false);
    c.document.addEventListener("resize", ga_.ppv_s("timer"), false);
    c.document.addEventListener("focus", ga_.ppv_s("timer"), false);
    c.document.addEventListener("blur", ga_.ppv_s("timer"), false);
  } else if (c.document.attachEvent) {
    c.document.attachEvent("onload", ga_.ppv_s("timer"));
    c.document.attachEvent("onscroll", ga_.ppv_s("timer"));
    c.document.attachEvent("onresize", ga_.ppv_s("timer"));
    c.document.attachEvent("onfocus", ga_.ppv_s("timer"));
    c.document.attachEvent("onblur", ga_.ppv_s("timer"));
  }
};

!(function() {
  window.loadPaywallJs = function(cb) {
    var script = document.createElement("script");
    script.src = window.env.PAYWALL_JS_URL;
    script.async = "true";
    if (cb) {
      script.onload = cb;
    }
    document.body.appendChild(script);
  };

  // Wait for document ready
  $(document).ready(function() {
    var $articleContent = $("#article-content");

    if ($articleContent.length) {
      // configure the paywall's options by passing it
      window.ArcPOptions = {
        customPageData: function() {
          return typeof window.nzhPOptions === "undefined"
            ? {}
            : window.nzhPOptions;
        },
        apiOrigin: myAccount.consts.ARC_API_ORIGIN,
        paywallFunction: function(campaign) {
          myAccount.getSubscriptionOffer().done(function(data) {
            if (typeof data !== "undefined" && data.products.length) {
              // intro offer
              var introOffer = window.env.INTRO_OFFER;
              var nonIntroOffer = window.env.NON_INTRO_OFFER;
              var entitlements = $.cookie("entitlements") || "";

              var hasIntroOffer = false;
              entitlements = entitlements.split("--");

              if (
                entitlements.some(function(item) {
                  return item === introOffer;
                })
              ) {
                hasIntroOffer = true;
              }

              var product = hasIntroOffer ? data.products[1] : data.products[0];
              var hasIntroOrStandardOffer = [introOffer, nonIntroOffer].some(
                function(item) {
                  return item === product.sku;
                }
              );
              var pricingStrategy = product.pricingStrategies[0];
              var attributesMarkup = "";

              for (var i = 0; i < product.attributes.length; i++) {
                if (i > 2) break;
                attributesMarkup +=
                  typeof product.attributes[i] === "undefined"
                    ? ""
                    : "<li>" +
                      product.attributes[i].value.replace(
                        /<{1}[^<>]{1,}>{1}/g,
                        ""
                      ) +
                      "</li>";
              }

              $(
                '\
                        <div class="article-offer" data-test-ui="offer">\
                        <h3 data-test-ui="offer-heading-1">To continue reading this article</h3>\
                        <hr>\
                        <figure>\
                            ' +
                  (!pricingStrategy.description
                    ? ""
                    : '<h2 data-test-ui="offer-heading-2">' +
                      pricingStrategy.description +
                      "</h2>") +
                  '<div>\
                            <h3 data-test-ui="offer-price">\
                            ' +
                  (typeof pricingStrategy.rates[1] === "undefined"
                    ? ""
                    : '<p class="text-muted"><del>$' +
                      (hasIntroOrStandardOffer
                        ? Number(pricingStrategy.rates[1].amount) /
                          pricingStrategy.rates[1].billingCount
                        : Number(pricingStrategy.rates[1].amount)
                      ).toString() +
                      "</del></p>") +
                  "\
                            <sup>$</sup>" +
                  (hasIntroOrStandardOffer
                    ? (
                        Number(pricingStrategy.rates[0].amount) /
                        pricingStrategy.rates[0].billingCount
                      ).toFixed(2)
                    : pricingStrategy.rates[0].amount) +
                  "<sub>per " +
                  pricingStrategy.rates[0].billingFrequency.toLowerCase() +
                  '</sub>\
                            </h3>\
                            <div data-test-ui="see-offers-button"><a href="' +
                  myAccount.consts.OFFERS_URL +
                  '"class="btn btn-premium" data-ref-page-element="see_offers" onclick="gtm.customTrack(\'event_subs\',\'content_page\',\'see_offers\',\'see_offers\');">See offers</a></div>\
                            <ul class="offer-details" data-test-ui="offer-details">' +
                  attributesMarkup +
                  "</ul>\
                            </div>\
                        </figure>\
                        <hr>\
                        " +
                  (myAccount.isSignedIn()
                    ? ""
                    : '<p data-test-ui="offers-sign-in-text">Already have an account? <a class="premium-link" href="' +
                      myAccount.consts.OFFERS_SIGN_IN_URL +
                      "\" name=\"subscriber_signin\" data-ref-page-element=\"signin\" onclick=\"gtm.customTrack('event_subs','content_page','sign_in','sign_in');\">Sign&nbsp;in</a></p>") +
                  '\
                        <p class="activate-link" data-test-ui="offers-activate-text">Eligible newspaper subscribers, find out how to <a href="https://www.nzherald.co.nz/faq/" target="_blank" rel="noopener noreferrer" class="premium-link" data-ref-page-element="activate_here" onclick="gtm.customTrack(\'event_subs\',\'content_page\',\'activate_here\',\'activate_here\');">activate&nbsp;your&nbsp;digital&nbsp;subscription</a></p>\
                      </div>\
                    '
              ).insertAfter($articleContent);
            }
          });
        },
        resultsCallback: function(results) {
          if (results.triggered === null) {
            $articleContent
              .removeClass("premium-content")
              .addClass("full-content");
          }
        }
      };

      // Add jwt if user is signed in
      if (myAccount.isSignedIn()) {
        window.ArcPOptions.jwt = myAccount.profile.authToken;
      }

      // Asynchronously load the script
      window.loadPaywallJs();
    }
  });
})();
