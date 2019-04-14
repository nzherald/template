;(function() {

  if (window.ARC && window.ARC.Tools && window.ARC.Tools.logger) {
    return; // already loaded
  }

  ///////////////////////////////////////////////////////////////////////////
  // Module definition
  ///////////////////////////////////////////////////////////////////////////

  // Define the module (if it doesn't exist yet)
  window.ARC = window.ARC || {};
  window.ARC.Tools = window.ARC.Tools || {};

  // And define a shortcut for the rest of the file
  var T = ARC.Tools;

  // For loops
  var i = 0;

  // We'll reuse this a bit, so keep it in a var
  var location = document.location.toString();

  ///////////////////////////////////////////////////////////////////////////
  // Polyfill old browsers
  ///////////////////////////////////////////////////////////////////////////

  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  ///////////////////////////////////////////////////////////////////////////
  // TIME
  ///////////////////////////////////////////////////////////////////////////

  var start = Date.now();

  T.Time = {

    start: function() {
      return start;
    },

    elapsed: function() {
      return Date.now() - start;
    },

    toHuman: function(milli) {
      if (milli < 1000) {
        return milli + 'ms';
      }

      // Variables
      var string = '';
      var remain = milli;

      // Milliseconds
      var ms  = remain % 1000;
      remain  = (remain - ms) / 1000;

      // Special format for ms
      if (ms < 10) { ms = '00' + ms; }
      else if (ms < 100) { ms = '0' + ms; }

      // Seconds
      var s   = remain % 60;
      remain  = (remain - s) / 60;
      string  = s + '.' + ms + 's';
      if (remain === 0) { return string; }

      // Minutes
      var min = remain % 60;
      remain  = (remain - min) / 60;
      string  = min + (min > 1 ? ' minutes ' : ' minute ') + string;
      if (remain === 0) { return string; }

      // Hours
      var h   = remain % 24;
      remain  = (remain - h) / 24;
      string  = h + (h > 1 ? ' hours ' : ' hour ') + string;
      if (remain === 0) { return string; }

      // Days
      var d   = remain;
      string  = d + (d > 1 ? ' days ' : ' day ') + string;
      return string;
    }

  };

  /////////////////////////////////////////////////////////////////////
  // Original console
  /////////////////////////////////////////////////////////////////////

  // First, we store the existing console, if it exists.
  var origConsole = window.console;

  // We only actually write stuff to the console if we have the right query param
  var useConsole = !!location.match(/console=all/);

  /////////////////////////////////////////////////////////////////////
  // Constructor
  /////////////////////////////////////////////////////////////////////

  // We keep track of all the loggers
  var loggers = [];

  function logger(namespace) {
    // Set a default namespace if none provided
    if (!namespace || namespace === '') {
      namespace = 'DEFAULT';
    }

    // Handle multiple loggers with same name
    var counter = 0;
    var newname = namespace;
    while (loggers[newname]) {
      counter = counter + 1;
      newname = namespace + '_' + counter;
    }

    // Store this logger in the list, and store new namespace
    this.namespace = newname;
    loggers[newname] = this;

    // Set the starting groupLevel
    this.groupLevel = 0;

    // Set the "saved messages"
    this.messages = [];
  }

  // Direct access to the original console
  logger.prototype.originalConsole = origConsole;

  // Allow access to all the loggers
  logger.prototype.loggers = function() {
    return loggers;
  };

  // Allow force logging (for tests)
  logger.prototype.forceLogging = function() {
    useConsole = true;
  };

  // Allow forcing time (for tests)
  logger.prototype.forceStartTime = function(time) {
    start = time;
  };

  // Save the logger in the tools namespace
  ARC.Tools.logger = logger;

  /////////////////////////////////////////////////////////////////////
  // Helpers
  /////////////////////////////////////////////////////////////////////

  // A replacement/improvement for standard log methods
  function writelog(that, method, args) {
    // Transform the arguments object into a real array
    var argsArray = [];
    var savedArray = [];
    for (var i = 0; i < args.length; i++) {
      argsArray.push(args[i]);
      savedArray.push(args[i]);
    }

    // Handle a special convenience method
    if (method.match(/^(log|info|warn|error|debug|trace|_exception)$/)) {
      if ((argsArray.length >= 2) && (typeof argsArray[argsArray.length-1] == 'function')) {
        that.group.apply(that, argsArray.slice(0, argsArray.length-1));
        argsArray[argsArray.length-1]();
        that.groupEnd();
        return;
      }
    }

    // We add the namespace
    argsArray.unshift('[' + that.namespace +']');

    // We add padding
    var padding = '';
    for (i = 0; i < that.groupLevel; i++) { padding = padding + '    '; }
    argsArray.unshift(padding);
    savedArray.unshift(padding);

    // We add the time
    argsArray.push('(' + T.Time.toHuman(T.Time.elapsed()) +')');
    savedArray.push('(' + T.Time.toHuman(T.Time.elapsed()) +')');

    // Check localStorage for this namespace
    var forceConsole = window.localStorage &&
                       window.localStorage.getItem &&
                      (window.localStorage.getItem('console-show-' + that.namespace) || window.localStorage.getItem('console-show-' + that.namespace.toLowerCase()));

    // Check the query params as well
    var nameRegex = new RegExp('[?&]console=' + that.namespace, 'i');
    forceConsole = forceConsole || location.match(nameRegex);

    // Flatten to single string if all args are strings
    var allString = true;
    for (i = 0; i < argsArray.length; i++) {
      if (typeof argsArray[i] != 'string') {
        allString = false;
      }
    }
    if (allString) {
      argsArray = [argsArray.join(' ')];
    }

    // We call the original console method
    if ((useConsole || forceConsole) && origConsole && origConsole[method]) {
      if (method == 'group') {
        try {
          origConsole.log.apply(origConsole, argsArray);
        } catch(e) {
          // IE 8
          origConsole.log(argsArray);
        }
      } else {
        try {
          origConsole[method].apply(origConsole, argsArray);
        } catch(e) {
          // IE 8
          origConsole[method](argsArray);
        }
      }
    }

    // Flatten and save the message
    var flattened = '';
    for (i = 0; i < savedArray.length; i++) {
      if (savedArray[i] === null) {
        savedArray[i] = 'null';
      } else if (typeof(savedArray[i]) == 'undefined') {
        savedArray[i] = 'undefined';
      } else {
        savedArray[i] = savedArray[i].toString();
      }
    }
    that.messages.push(savedArray.join(' '));

    // We only keep a certain number of messages (last 100)
    if (that.messages.length > 100) {
      that.messages.splice(0,1);
    }
  }

  /////////////////////////////////////////////////////////////////////
  // Debugging
  /////////////////////////////////////////////////////////////////////

  logger.prototype.text = function() {
    return this.messages.join("\n");
  };

  logger.prototype.getMessages = function(namespace) {
    if (origConsole && loggers[namespace]) {
      origConsole.log(loggers[namespace].text());
    }
  };

  /////////////////////////////////////////////////////////////////////
  // Prototype - Logging
  /////////////////////////////////////////////////////////////////////

  var logMethods = [
    'log',
    'info',
    'warn',
    'error',
    'debug',
    'trace',
    '_exception'
  ];

  function _logMethodsHelper(method) {
    return function() { writelog(this, method, arguments); };
  }

  for (i = 0; i < logMethods.length; i++) {
    logger.prototype[logMethods[i]] = _logMethodsHelper(logMethods[i]);
  }

  /////////////////////////////////////////////////////////////////////
  // Prototype - Grouping
  /////////////////////////////////////////////////////////////////////

  logger.prototype.group = function() {
    writelog(this, 'group', arguments);
    this.groupLevel = this.groupLevel + 1;
  };

  logger.prototype.groupEnd = function() {
    // origConsole.groupEnd();
    this.groupLevel = this.groupLevel - 1;
  };

  logger.prototype.groupCollapsed = logger.prototype.group;

  /////////////////////////////////////////////////////////////////////
  // Prototype - Others
  /////////////////////////////////////////////////////////////////////

  var otherMethods = [
    'assert',
    'count',
    'dir',
    'dirxml',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'profile',
    'profileEnd'
  ];

  function _otherMethodsHelper(method) {
    return function() {
      if (useConsole && origConsole && origConsole[method]) {
        try {
          origConsole[method].apply(origConsole, arguments);
        } catch(e) {
          // IE 8
          originalConsole[method](arguments);
        }
      }
    };
  }

  for (i = 0; i < otherMethods.length; i++) {
    logger.prototype[otherMethods[i]] = _otherMethodsHelper(otherMethods[i]);
  }

  /////////////////////////////////////////////////////////////////////
  // Override console
  /////////////////////////////////////////////////////////////////////

  if (!location.match(/[?&]console=orig/)) {
    window.console = new T.logger();
  }

})();

;(function() {

  if (window.ARC && window.ARC.Tools && window.ARC.Tools.timedToken) {
    return; // already loaded
  }

  ///////////////////////////////////////////////////////////////////////////
  // Module definition
  ///////////////////////////////////////////////////////////////////////////

  /*
    This generates a token that updates based on time. By default, it increments every minute.
    You can pass in an object that increments based on other time parameters.

    Any other types of tokens can be defined here.
  */

  // Define the module (if it doesn't exist yet)
  window.ARC = window.ARC || {};
  window.ARC.Tools = window.ARC.Tools || {};

  ARC.Tools.timedToken = function (config) {
    var config = config || { unit: "minute", increment: 1 },
        unit = config.unit.slice(-1) == 's' ? config.unit.slice(0,-1) : config.unit,
        increment = config.increment,
        numberOfSeconds = {
          "second" : 1,
          "minute" : 60,
          "hour" : 3600,
          "day" : 86400
        },
        date = new Date();

    var coeff = 1000 * numberOfSeconds[unit] * increment; // increment is number of unit. ex: 5 minutes
    var rounded = new Date(Math.round(date.getTime() / coeff) * coeff).getTime();
    return rounded;
  };

})();

sbTracking             = {};// Global navigation tracking structure
sbCollapsedCookie      = 'nav_collapsed'; // Define the global cookie name
navigationReadyEvent    = 'NAVIGATION_READY';
sbTracking['navigation_state'] = getCookie(sbCollapsedCookie === 'true') ? 'closed' : 'open';

function isWideScreen() {
    return (window.innerWidth >= 1269);
}

// Init the sidebar only when the Nav is ready
$(window).on(navigationReadyEvent, function() {

    // Initialize the sidebar when the nav element is ready
    Sidebar.init();
});



Sidebar = {

    // Initialize the sidebar
    init : function() {

        if (isWideScreen()) {

            // Remember the user's open/closed state. Otherwise default to open
            var sbState        = (getCookie(sbCollapsedCookie)=='true') ? 'closed' : 'open';

            this.setCollapsibleState(sbState);

            sbTracking['navigation_state'] = sbState;
        }
    },

    // Set the collapsible state of the sidebar
    setCollapsibleState : function(state) {

        var body = $('body');
        var nav = $('#nav');
        var navToggle = $('#nav-toggle');

        if (state == 'open') {

            body.removeClass('nav-collapsed');
            nav.removeClass('compressed');
            nav.addClass('expanded');
            navToggle.removeClass('open-nav');
            navToggle.addClass('close-nav');

        } else if (state == 'closed') {

            body.addClass('nav-collapsed');
            nav.addClass('compressed');
            nav.removeClass('expanded');
            navToggle.addClass('open-nav');
            navToggle.removeClass('close-nav');

            // Hide the jumpiness by fading in.
            body.addClass('fade-in');
            nav.addClass('fade-in');
            // Remove the fade-in class once the animation is done to stop buggyness in content resize
            setTimeout(function() {
                body.removeClass('fade-in');
                nav.removeClass('fade-in');
            },450);

        }

        /*  *************************************************************
                                    IMPORTANT!!
            This event listener fires BEFORE the click event which toggles the
            'open-nav' and 'close-nav' classes. Hence we send the 'open'
            tracking event when the class name 'open-nav' is still present
            and visa versa.
        */
        navToggle.on('click',function() {
            if ($(this).hasClass('open-nav')) {
                //cs.customTrack({'navigation_action':'open'});
            } else if ($(this).hasClass('close-nav')) {
                //cs.customTrack({'navigation_action':'close'});
            }
        });
    }
};

var myPage = (function() {
  var setPageCookie = function(name, value, days) { // Sets a cookie
    var expires = '',
        secure = window.location.protocol.toLowerCase() == 'https:' ? '; secure' : '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/' + secure;
  };
  var getPageCookie = function(ckName) { // Gets the cookie value
    var name = ckName + '=',
        allCookies = document.cookie.split(';');
    for(var i = 0; i < allCookies.length; i++) {
      var ck = allCookies[i].trim();
      if (ck.indexOf(name) == 0)
        return decodeURIComponent(ck.substring(name.length, ck.length));
    }
    return '';
  };
  var deletePageCookie = function(name) { // Deletes cookie
    var date = new Date(),
        secure = window.location.protocol.toLowerCase() == 'https:' ? '; secure' : '';
    date.setTime(date.getTime() - (24*60*60*1000));
    document.cookie = name + '=; expires=' + date.toUTCString() + '; path=/' + secure;
  };
  var encodePageHTML = function(value) {
    // Create a in-memory div, set it's inner text (which jQuery automatically encodes).
    // Then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
  };
  return {
    setCookie: setPageCookie,
    getCookie: getPageCookie,
    deleteCookie: deletePageCookie,
    htmlEncode: encodePageHTML
  }
})();

var myAccount = {
  consts: {
    BASE_URL                      : '/my-account/',
    SIGN_IN_URL                   : '/my-account/sign-in/',
    REGISTER_URL                  : '/my-account/register/',
    PROFILE_URL                   : '/my-account/profile/',
    DETAILS_URL                   : '/my-account/profile/details/',
    NEWSLETTERS_URL               : '/my-account/profile/newsletters/',
    OFFERS_URL                    : '/my-account/subscription/offers/',
    OFFERS_SIGN_IN_URL            : '/my-account/subscription/offers/sign-in/',
    HELP_URL                      : 'https://nzherald.custhelp.com/app/answers/list/c/18',
    ARC_API_ORIGIN                : window.env.ARC_API_ORIGIN,
    PROFILE_API_URL               : 'https://' + window.env.ARC_API_ORIGIN + '/identity/public',
    RETAIL_API_URL                : 'https://' + window.env.ARC_API_ORIGIN + '/retail/public/v1',
    SALES_API_URL                 : 'https://' + window.env.ARC_API_ORIGIN + '/sales/public/v1',
    PREFERENCES_API_URL           : window.env.BASE_DYNAMIC_API_URL,
    DEFAULT_SUB_CAMPAIGN          : window.env.DEFAULT_SUB_CAMPAIGN,
    AUTH_URL                      : '/auth/token',
    CLEAR_CART_URL                : '/cart/clear',
    GET_PROFILE_URL               : '/users/',
    CREATE_BOOKMARK_URL           : '/SaveForLater/save/',
    GET_BOOKMARKS_URL             : '/SaveForLater/get/',
    DELETE_BOOKMARK_URL           : '/SaveForLater/delete/',
    REFERRER_COOKIE               : 'sirp', // Sign In Referring Page
    LEGACY_AUTH_COOKIE_DOMAIN     : '.nzherald.co.nz',
    AUTH_COOKIE                   : 'syncData',
    ENTITLEMENT_COOKIE            : 'entitlements',
    BOOKMARK_COOKIE               : 'nzh_b_cache',
    WEATHER_COOKIE                : 'weatherModuleLocation',
    PROFILE_UPDATED_EVENT         : '__profile_updated__',
    BOOKMARK_NAV_EVENT            : '__bookmark_sidebar__',
    BOOKMARK_PAGE_EVENT           : '__bookmark_page__',
    OFFER_URL                     : '/offer/live/'
  },
  init: function() {
    this.resetProfile();
    this.deleteLegacyAuthCookie();
    var syncData = this.getSyncData();
    this.profile.uuid = syncData.uuid;
    this.profile.authToken = syncData.authToken;
    $.ajaxSetup({
      timeout: 30000
    });

    if (this.isSignedIn()) {
      var self = this;
      $.ajax({
        method: 'GET',
        url: this.consts.PROFILE_API_URL + this.consts.GET_PROFILE_URL + this.profile.uuid,
        headers: {
          'Authorization': 'Bearer ' + this.profile.authToken
        },
        success: function(data) {
          self.profile.legacyId = data.hasOwnProperty('legacyId') && data.legacyId ? data.legacyId : self.profile.legacyId;
          self.profile.firstName = data.hasOwnProperty('firstName') ? myPage.htmlEncode(data.firstName) : '';
          self.profile.lastName = data.hasOwnProperty('lastName') ? myPage.htmlEncode(data.lastName) : '';
          if (data.hasOwnProperty('attributes')) {
            $.each(data.attributes, function(k, v) {
              if (v.name == 'weather_location' && v.value) {
                self.profile.weatherLocation = myPage.htmlEncode(v.value);
              }
            });
          }
        },
        complete: function(jqXHR) {
          if (jqXHR.status == 400 || jqXHR.status == 401) {
            self.signOut(); // Sign the user out if an error was returned from Arc ID
          }
          self.resolveProfilePromise();
        }
      });

    } else {
      this.resolveProfilePromise();
    }
  },
  resetProfile: function() {
    this.profile = {
      uuid: '',
      legacyId: '',
      authToken: '',
      firstName: '',
      lastName: '',
      weatherLocation: '',
      $deferred: $.Deferred()
    }
  },
  deleteLegacyAuthCookie: function() {
    var date = new Date();
    date.setTime(date.getTime() - (24*60*60*1000));
    document.cookie = this.consts.AUTH_COOKIE + '=; expires=' + date.toUTCString() + '; path=/; domain=' + this.consts.LEGACY_AUTH_COOKIE_DOMAIN;
  },
  getSyncData: function() {
    var ret = {
          uuid: '',
          authToken: ''
        },
        syncData = myPage.getCookie(this.consts.AUTH_COOKIE);

    try {
      syncData = JSON.parse(window.atob(syncData)); // base64decode the cookie before returning
      ret = {
        uuid: syncData.uuid,
        authToken: syncData.authToken
      };
      if(window.bugsnagClient){
        window.bugsnagClient.user = {
            uuid: syncData.uuid
        }
      }
    } catch(e) {}

    return ret;
  },
  getProfilePromise: function() {
    return this.profile.$deferred.promise();
  },
  resolveProfilePromise: function() {
    this.profile.$deferred.resolve();
  },
  profileCallback: function(cb) {
    return this.getProfilePromise().done(cb);
  },
  setSignInReferrer: function() {
    if (window.location.pathname.indexOf(myAccount.consts.BASE_URL) !== 0) { // only save this from a non my-account page
      myPage.setCookie(this.consts.REFERRER_COOKIE, window.location.href, 1); // just save it for a day
    }
  },
  isSignedIn: function() {
    return Boolean(this.profile.uuid && this.profile.authToken);
  },
  /**
   * Discern if the current user is premium
   * @returns {boolean} if this user is premium or not
   */
  isPremium: function() {
    return Boolean(myPage.getCookie(this.consts.ENTITLEMENT_COOKIE));
  },
  signOut: function() {
    this.deleteCookies();
    this.resetCart();
    $.ajax({
      method: 'DELETE',
      url: this.consts.PROFILE_API_URL + this.consts.AUTH_URL,
      headers: {
        'Authorization': 'Bearer ' + this.profile.authToken
      }
    });
    this.resetProfile();
    this.resetArcP();
  },
  deleteCookies: function() {
    var cookiesToDelete = [this.consts.AUTH_COOKIE, this.consts.ENTITLEMENT_COOKIE];
    $.each(cookiesToDelete, function(i, v) {
      myPage.deleteCookie(v);
    });
  },
  resetArcP: function() {
    if(!window.ArcP){
      // non article page
      window.loadPaywallJs(function(){
        ArcP.reset(); 

        // If my-account pages
        if (window.location.pathname.indexOf(myAccount.consts.BASE_URL) === 0) {
          window.location.href = myAccount.consts.SIGN_IN_URL; // redirect to sign in page if signing out from one of the account pages
        }                                     
      });
            
    } else {
      // article page
      ArcP.reset();
      window.location.reload();
    }
  },
  resetCart: function() {
    $.ajax({
      method: 'DELETE',
      url: this.consts.SALES_API_URL + this.consts.CLEAR_CART_URL,
      headers: {
        'Authorization': 'Bearer ' + this.profile.authToken
      }
    });
  },
  createBookmark: function(contentType, contentId) {
    return $.ajax({
      method: 'POST',
      url: this.consts.PREFERENCES_API_URL + this.consts.CREATE_BOOKMARK_URL,
      headers: {
        'nzh-token': this.profile.authToken
      },
      data: {
        'object_id': contentId,
        'object_type_id': contentType
      },
      dataType: 'text'
    });
  },
  deleteBookmark: function(contentType, contentId) {
    return $.ajax({
      method: 'POST',
      url: this.consts.PREFERENCES_API_URL + this.consts.DELETE_BOOKMARK_URL,
      headers: {
        'nzh-token': this.profile.authToken
      },
      data: {
        'saved_id': contentId
      },
      dataType: 'text'
    });
  },
  getBookmarks: function(contentType) {
    if (contentType === undefined)
      contentType = 0;

    return $.ajax({
      url: this.consts.PREFERENCES_API_URL + this.consts.GET_BOOKMARKS_URL,
      headers: {
        'nzh-token': this.profile.authToken
      }
    });
  },
  getSubscriptionOffer: function() {
    return $.ajax({
      method: 'GET',
      url: this.consts.RETAIL_API_URL + this.consts.OFFER_URL + this.consts.DEFAULT_SUB_CAMPAIGN
    });
  }
};

myAccount.setSignInReferrer();
myAccount.init();

// https://github.com/ripeworks/local-storage-fallback
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.localStorageFallback=t():e.localStorageFallback=t()}(this,function(){return function(e){function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(){var e=new l;try{e.setItem("__test","1");var t=e.getItem("__test");return e.removeItem("__test"),"1"===t}catch(e){return!1}}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}();t.hasCookies=n;var i=r(3),u=function(e){return e&&e.__esModule?e:{default:e}}(i),s="lS_",l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};o(this,e),this.cookieOptions=Object.assign({path:"/"},t),s=void 0===t.prefix?s:t.prefix}return a(e,[{key:"getItem",value:function(e){var t=u.default.parse(document.cookie);return t&&t.hasOwnProperty(s+e)?t[s+e]:null}},{key:"setItem",value:function(e,t){return document.cookie=u.default.serialize(s+e,t,this.cookieOptions),t}},{key:"removeItem",value:function(e){var t=Object.assign({},this.cookieOptions,{maxAge:-1});return document.cookie=u.default.serialize(s+e,"",t),null}},{key:"clear",value:function(){var e=u.default.parse(document.cookie);for(var t in e)0===t.indexOf(s)&&this.removeItem(t.substr(s.length));return null}}]),e}();t.default=l},function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.MemoryStorage=t.CookieStorage=t.isSupported=t.storage=void 0;var n=r(2),a=o(n),i=r(0),u=o(i),s=r(4),l=o(s),c=null;(0,a.default)("localStorage")?t.storage=c=window.localStorage:(0,a.default)("sessionStorage")?t.storage=c=window.sessionStorage:(0,a.default)("cookieStorage")?t.storage=c=new u.default:t.storage=c=new l.default,t.default=c,t.storage=c,t.isSupported=a.default,t.CookieStorage=u.default,t.MemoryStorage=l.default},function(e,t,r){"use strict";function o(e){try{var t=window[e];return t.setItem(i,"1"),t.removeItem(i),!0}catch(e){return!1}}function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"localStorage",t=String(e).replace(/storage$/i,"").toLowerCase();if("local"===t)return o("localStorage");if("session"===t)return o("sessionStorage");if("cookie"===t)return(0,a.hasCookies)();if("memory"===t)return!0;throw new Error("Storage method `"+e+"` is not available.\n    Please use one of the following: localStorage, sessionStorage, cookieStorage, memoryStorage.")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var a=r(0),i="__test"},function(e,t,r){"use strict";function o(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},o=t||{},n=e.split(s),u=o.decode||i,l=0;l<n.length;l++){var c=n[l],f=c.indexOf("=");if(!(f<0)){var d=c.substr(0,f).trim(),p=c.substr(++f,c.length).trim();'"'==p[0]&&(p=p.slice(1,-1)),void 0==r[d]&&(r[d]=a(p,u))}}return r}function n(e,t,r){var o=r||{},n=o.encode||u;if("function"!=typeof n)throw new TypeError("option encode is invalid");if(!l.test(e))throw new TypeError("argument name is invalid");var a=n(t);if(a&&!l.test(a))throw new TypeError("argument val is invalid");var i=e+"="+a;if(null!=o.maxAge){var s=o.maxAge-0;if(isNaN(s))throw new Error("maxAge should be a Number");i+="; Max-Age="+Math.floor(s)}if(o.domain){if(!l.test(o.domain))throw new TypeError("option domain is invalid");i+="; Domain="+o.domain}if(o.path){if(!l.test(o.path))throw new TypeError("option path is invalid");i+="; Path="+o.path}if(o.expires){if("function"!=typeof o.expires.toUTCString)throw new TypeError("option expires is invalid");i+="; Expires="+o.expires.toUTCString()}if(o.httpOnly&&(i+="; HttpOnly"),o.secure&&(i+="; Secure"),o.sameSite){switch("string"==typeof o.sameSite?o.sameSite.toLowerCase():o.sameSite){case!0:i+="; SameSite=Strict";break;case"lax":i+="; SameSite=Lax";break;case"strict":i+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return i}function a(e,t){try{return t(e)}catch(t){return e}}/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
t.parse=o,t.serialize=n;var i=decodeURIComponent,u=encodeURIComponent,s=/; */,l=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/},function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),a=function(){function e(){o(this,e),this._data={}}return n(e,[{key:"getItem",value:function(e){return this._data.hasOwnProperty(e)?this._data[e]:null}},{key:"setItem",value:function(e,t){return this._data[e]=String(t)}},{key:"removeItem",value:function(e){return delete this._data[e]}},{key:"clear",value:function(){return this._data={}}}]),e}();t.default=a}]).default});