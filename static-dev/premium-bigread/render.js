;(function($){
  // When the user clicks on one of the nav-toggle buttons, add the expanded class.
  // This triggers the nav to pop into place, if the screen is small.

  var openClose = {
    clickEvents : function () {
      var lastScrollY = 0;

      var NAV_COOKIE_EXPIRY = 365; // days
      var NAV_BREAKPOINT = 1269;

      $('.nav-toggle').click(function(){

        // For collapsible nav on desktop
        var $navCollapsible = $('.nav-collapsible');
        var navCollapsedClass = 'nav-collapsed';

        var $nav = $('#nav');
        var $barWrapper = $('.pb-f-bars-breaking-news-bar #breaking-alert.bar-wrapper');
        var $this = $(this);
        var BREAKPOINT = 660;
        var WINDOW_WIDTH = $(window).innerWidth();

        if (WINDOW_WIDTH <= BREAKPOINT && $this.hasClass('open-nav')) {
          lastScrollY = $(window).scrollTop();
        }

        // Tiny little piece that hides the secondary and tertiary navs, so they don't stick around if you open and close it.
        $('.secondary-nav,.tertiary-nav').removeClass('visible');

        //reposition the breaking newsbar
        $barWrapper.toggleClass('bar-expanded bar-compressed');

        // hide/show nav
        $nav.toggleClass('expanded compressed');
        $this.toggleClass('open-nav close-nav');

        // desktop collapsible nav
        $navCollapsible.toggleClass(navCollapsedClass);
        myPage.setCookie(sbCollapsedCookie, $navCollapsible.hasClass(navCollapsedClass).toString(), NAV_COOKIE_EXPIRY);

        if (WINDOW_WIDTH <= BREAKPOINT) {
          if ($this.hasClass('open-nav')) {
            $(window).scrollTop(lastScrollY);
          } else {
            $nav.scrollTop(0);
          }
        }
      });
    },
    runEvents : function () {
      this.clickEvents();
    }
  };

  var scrolling = {
    hideAndShow : function () {
      var $siteLogo = $('.site-logo-wrapper');
      var $searchBar = $('.pb-f-search-search-bar');
      var scrollLog = [];
      function hideAndShow(){
        // $(window).scrollTop() returns number of pixels from the top of the page.
        var top = $(window).scrollTop(),
            isNavExpanded = $('#nav').hasClass('expanded'),
            windowWidth = $(window).width();
        scrollLog.push(top);
        //last two values in the array are kept
        scrollLog = scrollLog.slice(-2);
        var prevScrollPos = scrollLog[0],
            currScrollPos = scrollLog[1];
        //if the user scrolls down
        if ( currScrollPos > prevScrollPos && currScrollPos > 80 && !isNavExpanded && windowWidth < 1269){
          $siteLogo.addClass('offscreen');
          $searchBar.addClass('pull-right');
        } else { //the user scrolls up
          $siteLogo.removeClass('offscreen');
          $searchBar.removeClass('pull-right');
        }
      };

      $(window).smartscroll(hideAndShow,25);

    },
    runEvents: function () {
      this.hideAndShow();
    }
  };

  var init = function () {
      openClose.runEvents();
      scrolling.runEvents();
  };

  init();
})(jQuery);


;(function($){
  var logger = new ARC.Tools.logger('MY_NEWS');

  var myNews = {
    openClose : function () { // Opens and closes the My News menu.
      $('.header-arrow-my-news').on('click',function(){
        $(this).toggleClass('open').toggleClass('closed');
        $('.saved-content').toggleClass('collapsed');
      });
    },
    runEvents : function () {
      this.openClose();
    }
  };

  // User profile menu
  var myProfile = {
    openClose : function() {
      $('.header-arrow-profile').on('click', function() {
        $(this).toggleClass('open').toggleClass('closed');
        $('.user-profile-sub-menu').toggleClass('collapsed');
      });
    },
    runEvents : function() {
      this.openClose();
    }
  };
  
  // Signs the user in client side.
  var signIn = {
    premiumSub: $('.premium-sub'),
    loggedInUser: $('.logged-in-user'),
    profileOptions: $('.profile-options'),
    signOut : function() {
      logger.log('signOut');
      // remove all associated cookies and variables
      myAccount.signOut();

      this.showLogoutState();
      // Remove my-news items
      $('.pb-f-navigation-saved-article').remove();
      savedArticles.injectArticleNumber();
    },
    signOutInit : function() {
      var self = this;
      $('#sign-out').on('click', function(e) {
        e.preventDefault();
        self.signOut();
      });
    },
    renderUserName : function() {
      $('.user-name').html(
        (myAccount.profile.firstName || myAccount.profile.lastName ? myAccount.profile.firstName + ' ' + myAccount.profile.lastName : 'My Profile')
      );
    },
    signIn : function () {
      var self = this;

      if (myAccount.isSignedIn()) {
        //check if user has bookmarks in queue from before logging in
        var bookmarkToSave = myPage.getCookie(myAccount.consts.BOOKMARK_COOKIE);
        if(bookmarkToSave) {
          myPage.deleteCookie(myAccount.consts.BOOKMARK_COOKIE);

          // add cached bookmark to saved articles
          myAccount.createBookmark(1, bookmarkToSave)
          .done(function() {
            logger.log('createBookmark:success:'+data);
            //load saved articles AFTER adding cached one
            savedArticles.init();
          })
          .fail(function(jqXHR){
            logger.log('createBookmark:error:'+jqXHR.status+':'+jqXHR.statusText+':'+jqXHR.responseText);
          });
        }

        // once signed in state is confirmed, initialize signOut listener
        this.signOutInit();

        this.renderUserName();
        window.addEventListener(myAccount.consts.PROFILE_UPDATED_EVENT, function(e) {
          myAccount.profile.firstName = e.detail && e.detail.firstName ? myPage.htmlEncode(e.detail.firstName) : '';
          myAccount.profile.lastName = e.detail && e.detail.lastName ? myPage.htmlEncode(e.detail.lastName) : '';
          self.renderUserName();
        });

        this.showLoginState();
        
        if(!bookmarkToSave) {
          //only init savedArticles, if there has not been a bookmark to be saved from cookie, otherwise savedArticles will
          //be initiated after ajax call (see line 122 in this file)
          savedArticles.init();
        }
      } else {
        this.showLogoutState();
      }


    },
    trackLotame : function() {
      // Send lotame call only for signed in users
      if (myAccount.isSignedIn() && myAccount.profile.legacyId) {
          var sUrl = '//bcp.crwdcntrl.net/5/c=5227/tp=HRLD/tpid='+myAccount.profile.legacyId+'/seg=signed_in_user';
          // Use img tag to send request. Ajax get doesnt work because a 1x1 pixel image/gif is returned.
          $('head').append('<img src="' + sUrl + '" style="display:none;" />');
      }
    },
    runEvents : function () {
      var self = this;
      myAccount.getProfilePromise().done(function() {
        self.signIn();
        self.trackLotame();
      });
    },
    /**
     * Ui logic to display content in navbar
     */
    showLoginState: function() {
      this.profileOptions.addClass("hide");
      this.loggedInUser.removeClass("hide");
      this.renderUserName();
      if (myAccount.isPremium()){
        this.premiumSub.addClass('hide');
      } else {
        this.premiumSub.removeClass('hide');
      }
    },
    /**
     * Ui logic to display content in navbar
     */
    showLogoutState: function () {
      this.profileOptions.removeClass("hide");
      this.loggedInUser.addClass("hide");
      this.premiumSub.removeClass('hide');
    }
  };
  // get saved article content
  var savedArticles = {
    articlesHTML : '<h2 class="my-saved-content">my saved content:</h2>',
    init : function(){
        logger.log('savedArticles');
        this.getAllSaved();
        // refresh this list when a bookmark is created/deleted
        $(myAccount).on(myAccount.consts.BOOKMARK_PAGE_EVENT, function() {
          savedArticles.getAllSaved();
        });
    },
    handleDelete : function(articlesObj, articleCat){
      $('.saved-content').off('click').on('click', '.article-close-icon', function(){
        var $self = $(this);
        if(window.confirm("Delete from your \"Saved Articles?\"")){
          var articleObjId = $(this).siblings('.content-wrapper')
                                    .children('.article-title')
                                    .attr('id');
          var articleToDelete = articlesObj.data[articleCat].filter(function(article){
            return article.object_id.toString() === articleObjId;
          });

          $self.closest('.saved-article-wrapper').remove();
          savedArticles.injectArticleNumber();
          myAccount.deleteBookmark(1, articleToDelete.pop().id)
          .done(function(data) {
            logger.log('deleteBookmark:success:'+data);
            $(myAccount).trigger(myAccount.consts.BOOKMARK_NAV_EVENT);
          })
          .fail(function(jqXHR) {
            logger.log('deleteBookmark:error:'+jqXHR.status+':'+jqXHR.statusText+':'+jqXHR.responseText);
          });
        }
      });
    },
    fetchArticles : function(articlesObj, articleCat, callbacks){
      logger.log('fetchArticles');
      // articleObjIds is a formatted string used in the params passed to Content API
      // in the AJAX call below
      var articleObjIds = (function formatFeedParam(){
        var objIds = articlesObj.data[articleCat].map(function(article){
          return article.object_id;
        }).join('+OR+');
        return '(' + objIds + ')';
      })();

      // should you need to modify the params sent to Content API, do so here
      var params = {
        "Query": "source.source_id:" + articleObjIds,
        "Feed-Offset":0,
        "Feed-Order":"publish_date:desc",
        "Feed-Limit":10
      };

      var URL = '/pb/api/v2/render/feature/navigation/saved-article?contentConfig=';

      $.ajax({
        url: URL + encodeURI(JSON.stringify(params)),
        success: function(response){
          var htmlStr = response.rendering;
          $('.saved-content').html(htmlStr);
          // after rendering saved articles to DOM, do additional actions
          callbacks.forEach(function(cb){ cb() });
        },
        error: function(err){
          logger.log('fetchArticles:error:'+err);
        }
      });
    },
    injectArticleNumber : function(){
      var numOfArticles = $('.saved-article-wrapper').length;
      if(numOfArticles) {
        $('.number-content').text('(' + numOfArticles + ' saved content)')
      } else {
        $('.number-content').text("");
        $('.saved-content').html(this.zeroArticlesHTML());
      }
    },
    zeroArticlesHTML : function(){
      return (
        '<div class="title-saved-content">Your news how you want it.</div>' +
        '<div class="blurb-saved-content">' +
          'On the go and no time to finish that story right now? Your News is the place for you to save content to read later from any device. Content you save will appear here so you can access them to read later. Look out for the bookmark icon on article pages.' +
        '</div>'
      );
    },
    getAllSaved : function(){
      logger.log('getAllSaved');
      myAccount.getBookmarks(1)
      .done(function(data) {
        // if there are saved, unread articles, start the process of
        // rendering them, otherwise change text
        if(data.data.aUnread && data.data.aUnread.length){
          savedArticles.fetchArticles(
            data,
            'aUnread',
            [
              savedArticles.handleDelete.bind(null, data, 'aUnread'),
              savedArticles.injectArticleNumber
            ]
          );
        } else {
          $('.saved-content').html(savedArticles.zeroArticlesHTML());
          savedArticles.injectArticleNumber();
        }
      })
      .fail(function(jqXHR){
        logger.log('getBookmarks:error:'+jqXHR.status+':'+jqXHR.statusText+':'+jqXHR.responseText);
      });
    }
  };

  var init = function () {
    myNews.runEvents();
    myProfile.runEvents();
    signIn.runEvents();
  };

  init();

})(jQuery);

;(function($){
  //This function moves the ad based on screen size. The ad moves below video on 1&2 column views in order to not push the video below the fold.
  //NOTE: this is not mobile first approach and I would recommend reversing the order. (Start with the ad being under video, and moving it up on larger screens.)
  function placeAdOnVideoPages(){

    // determine if we on video page by pageType meta tag
    var pageType = $("meta[name=pageType]").attr("content");

    //this only needs to run on video pages
    if(pageType == 'video'){
      var $adTarget = $(".box-ad-wrapper").first();

      if (window.matchMedia("(max-width: 1269px)").matches) {
        // Put the ad under the first section after the video section which is normally a grey slider
        var $insertionTarget = $(".pb-f-video-video-player").parent().parent().next();
        $insertionTarget.after($adTarget);
      } else {
        $(".col-lg-8.col-md-12.col-sm-12.col-xs-12").after($adTarget);
      }
    }
  }
  // move ad if needed at page load
  placeAdOnVideoPages();
  // move ad if needed on resize
  $(window).smartresize(placeAdOnVideoPages)




    /*
        Native Offsite Ad Responsiveness.
        Get a handle of the following three elements:
            - Right Rail Feature div that the Ad is initially renders in
            - The Ad container itself
            - Global Footer Feature div that the Ad should sit above in for mobile
    */
    var nativeOffsiteFeature    = $('.pb-feature:has(#nativeoffsite)');
    var nativeOffsiteAd         = nativeOffsiteFeature.find('.ad-container');
    var globalFooterFeature     = $('.pb-feature.pb-f-global-footer');

    function moveNativeOffsiteAd() {

        // Check if the Native Offsite Ad is in the Right Rail
        var inRightRail = ( $('.right-rail #nativeoffsite').length > 0 );

        if ( ($(window).width() < 810) && inRightRail) {
            // Move the Ad to above the footer for mobile size screens ( <810px)
            nativeOffsiteAd.remove();
            nativeOffsiteAd.insertBefore(globalFooterFeature);
        } else if ( ($(window).width() >= 810) && !inRightRail ) {
            // Move the Ad to the right rail for desktop size screens ( >=810px)
            nativeOffsiteAd.remove();
            nativeOffsiteFeature.prepend(nativeOffsiteAd);
        }
    }

    // On page load, initialize the ad position
    moveNativeOffsiteAd();
    // Reposition on screen resize
    $(window).smartresize(moveNativeOffsiteAd);


    /************************************************************
      Below functions is to load iframe carousels lazily
    *************************************************************/
    var bRunningLazyFrame = false;

    function initLazyFrame(){
      var $elements = $(".js-lazyIframe");

      // run on pageload
      runLazyFrame($elements);

      // run on scroll
      if($elements.length > 0){
        $(window).scroll(function() {
          runLazyFrame($elements);
        });
      }
    }

    function runLazyFrame($elements){
      if(!bRunningLazyFrame){
        bRunningLazyFrame = true;

        $elements.each(function() {
          if( isFrameVisible(this) ){
            loadFrameSRC(this)
          }
        });

        setTimeout(function () { // throttle it
          bRunningLazyFrame = false;
        }, 400);
      }
    }

    function isFrameVisible(elem){
      var bVisible = false;
      var vThreshold = 600; // number of pixels below fold to start loading
      var top_of_element = $(elem).offset().top - vThreshold;
      var bottom_of_element = $(elem).offset().top + $(elem).outerHeight();
      var bottom_of_screen = $(window).scrollTop() + $(window).height();
      var top_of_screen = $(window).scrollTop();

      if((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        bVisible = true;
      }
      return bVisible;
    }

    function loadFrameSRC(elem) {
      if( $(elem).attr('src').length < 1 ){
        var url = $(elem).attr('data-src');
        $(elem).attr('src',url);
      }
    }

    initLazyFrame();

})(jQuery);

;(function($){

  // Mobile is needed to determine whether users are triggering the Nav over hover or by tapping
  var mobile = isMobile.any();

  // Controls the way the primary nav opens and closes when a user clicks on an arrow.
  var primaryNav = {
    expandCollapse : function () {
      $('.toggle-expand').click(function(){
        $(this).toggleClass('open').toggleClass('closed');
        $(this).closest('.header').siblings('.left-navigation').find('.primary-nav').toggleClass('expanded');
      });
    },
    runEvents : function () {
      this.expandCollapse();
    }
  };

  var secondaryNav = {
    close : function () { // When a user hits the button to close the nav, the 'visible' class is removed.
      $('.nav-back').click(function(){
        $(this).closest('.tertiary-nav,.secondary-nav').removeClass('visible');
      })
    },
    hoverToOpen : function () {
      $('.primary-nav-item').mouseenter(function() {
        var $nav = $(this),
            navId = $nav.attr('data-nav-id'), // Get attribute id of menu you are mousing over.
            $subMenu = $('.secondary-nav[data-nav-id="'+navId+'"]'), // Get the associated sub-menu element.
            $arrow = $nav.find('img'), // Get the icon associated with the menu you are mousing over.
            $arrows = $('.primary-nav-arrow'), // Get all the arrows (makes it easier to reset).
            section = $nav.attr('data-section');

        var setCloseBtnColor = function () {
          var prefix = "section-";
          var $toggle = $('.nav-toggle')[0] || false;

          if ($toggle) {
            var classes = $toggle.className.split(" ").filter(function(c) {
                return c.lastIndexOf(prefix, 0) !== 0;
            });

            $('.nav-toggle')[0].className = classes.join(" ").trim();
          }
        }

        var resetSubmenus = function() { // Effectively "resets" all the sub menus by making them vanish.
          $('.secondary-nav').removeClass('visible');
          setCloseBtnColor();
          $arrows.show();
        };

        var showSubMenu = function () { // Adds the 'visible' class to the corresponding sub menu.
          resetSubmenus();
          $subMenu.addClass('visible');
          $arrow.hide();
          $('.nav-toggle').addClass(section);
        };

        var timeout = window.setTimeout(showSubMenu, 1000); // Hover happens after 1 second.

        $('.tertiary-nav').removeClass('visible'); //Hides any lingering tertiary navs

        resetSubmenus(); // Gives us a clean slate.
        if (!mobile && $(window).width() >= 660) { // Only triggers on really tiny desktop screens
          $subMenu.mouseleave(function(){ resetSubmenus() }); // If a user mouses off a sub menu, reset everything.
        }

        $nav.mouseleave(function(event){
          var leftOffset = $('.pb-f-navigation-menu').eq(0).offset().left;
          var navWidth = $nav[0].offsetWidth;
          var navRightEdge = leftOffset + navWidth;
          //if the mouse is not on the secondary menu collapse the submenus
          if(event.clientX < navRightEdge && $(window).width() >= 660){
            resetSubmenus();
          }
          clearTimeout(timeout) }); // If a user mouses away before the timer is done, make sure to cancel it.
      });
    },
    tapToOpen : function () {
      // TODO replace this with hammer.js functionality soon
      $('.primary-nav-item').click(function(){
        var navId = $(this).attr('data-nav-id');
        var $subMenu = $('.secondary-nav[data-nav-id="'+navId+'"]');
        $('.secondary-nav,.tertiary-nav').removeClass('visible');
        $subMenu.addClass('visible');
      });
    },
    runEvents : function () {
      mobile ? this.tapToOpen() : this.hoverToOpen();
      this.close();
    }
  };

  var tertiaryNav = {
    tapToOpen : function () {
      // TODO replace this with hammer.js functionality soon
      $('.secondary-nav-item').click(function(){
        var navId = $(this).attr('data-nav-id');
        var $subMenu = $('.tertiary-nav[data-nav-id="'+navId+'"]');
        $subMenu.addClass('visible');
      });
    },
    runEvents : function () {
        this.tapToOpen();
    }
  };

  var init = function () {
    primaryNav.runEvents();
    secondaryNav.runEvents();
    tertiaryNav.runEvents();
  };

  init();
})(jQuery);

;(function($){

  var trendingTopics = {
    expandCollapse : function () {
      $('.trending-expand').click(function(){
        $(this).toggleClass('open').toggleClass('closed');
        $(this).closest('.header').siblings('.items-text-scss').find('.trending-list').toggleClass('expanded');
      });
    },
    runEvents : function () {
      this.expandCollapse();
    }
  };

  trendingTopics.runEvents();


})(jQuery);


;(function($){

  var featureAPI = { // This object deals with calling the feature API and returning html for the feature.
    root : '.pb-f-bars-event-bar ',
    counter : 0, // Always call the feature API when the page is loaded, to check for content.
    eventBar : function () {}, // The event bar is initially set to an empty function. Later, it is set to a timer.
    loadData : function () { // This function performs the request to the feature API, performs a few checks to see if the data is new, and loads the data into the feature.
      var $el = $(featureAPI.root+'#event-alert'),
          reload = $el.data('reload'),
          url = $el.attr('data-href'),
          barType = $el.attr('data-bar-type');

      if (!reload) { // Clear the timer and stop hitting the API.
        featureAPI.stopTimer();
      }
      else {
        $.get(url,function(data){
          var html = $(data.rendering).find('.rendered-alert').html(), // Fresh HTML from the new rendering
              $renderEl = $(featureAPI.root+'.rendered-alert'), // The container on the page you want to slot the new HTML in.
              hasNews = $(data.rendering).find('#event-alert').data('has-news'), // Attribute on the rendering that detects if there is no news.
              sameNews = $renderEl.html() == html; // If there's no new info, don't update the feature.

          if (!hasNews) { // If the bar comes back empty, hide it.
            $(featureAPI.root+'#event-alert').addClass('hidden');
          }
          else if (hasNews && !sameNews || featureAPI.counter == 0){ // If news exists, and it's new, show it. If it's the first time we have hit the feature API, show it as well.
            $renderEl.html(html); // Put the HTML into its new home.
            $(featureAPI.root+'#event-alert').removeClass('hidden'); // Show it
            bar.marquee(); // Begin the marquee effect -- if the event is really long, have it scroll.
            featureAPI.counter++; // Upgrade the counter -- useful for ensuring we always hit the feature API on page load.
          }
        })
        .fail(function(response){ // If it errors, stop the timer. Prevents repetitive 404s. Could possibly log this somewhere.
          featureAPI.stopTimer();
        });
      }
    },
    stopTimer : function () { // Clear the timer.
      clearInterval(featureAPI.eventBar);
    },
    startTimer : function () { // Start a simple timer that triggers an API call every 20 seconds
      featureAPI.eventBar = setInterval(function() { // Set the featureAPI.eventBar function that was initially declared above.
          featureAPI.loadData();
      }, 20000);
    },
    runEvents : function () {
      featureAPI.loadData();
      this.startTimer();
    }
  };

  var bar = { // Handles events dealing with the bar, such as closing it by hitting the X, and the marquee effect.
    root : '.pb-f-bars-event-bar ',
    closingTime : function () {
      $(bar.root+'.bar-close-btn').on('click',function(){ // Remove the bar from the DOM and stop the timer, preventing unnecessary calls.
        $(bar.root+'.bar-wrapper').parent().remove();
        featureAPI.stopTimer();
      });
    },
    marquee : function () { // Lovely scrolling effect if the headline is very long.
      var $el = $(bar.root+'.event-item'),
          itemWidth = $(bar.root+'.event-item').width(),
          textWrapperWidth = $(bar.root+'.bar-text').width(),
          closeBtnWidth = $(bar.root+'.bar-close-btn').width(),
          difference = itemWidth - textWrapperWidth;

      if ((itemWidth+closeBtnWidth) > textWrapperWidth) { // Only animate if the text is too long.
        // Wait 1.5 seconds to begin the animation.
        // Take 5 seconds to complete the animation.
        // When complete, wait 2 seconds, then, in half a second, pop the text back where it was.
        $el.delay(1500).animate({"left": (-difference-closeBtnWidth-20)},5000,"linear",function(){
             $el.delay(2000).animate({'left':0},500,"linear",function(){
               $el.css('left','');
             });
        });
      }
    },
    runEvents : function () {
      this.closingTime(featureAPI);
      this.marquee();
    }
  };

  var resize = { // On window resize, call the marquee function.
    runEvents : function (){
      $(window).smartresize(function(){ bar.marquee() },500,false);
    }
  };

  var init = function () {
    bar.runEvents();
    featureAPI.runEvents();
    resize.runEvents();
  };

  init();

})(jQuery);

;(function($){

  // newsbar jQuery object variables (used in multiple functions)
  var $item = $('.pb-f-bars-breaking-news-bar .breaking-news-item'),
      $barLabel = $('.pb-f-bars-breaking-news-bar #breaking-alert .bar-label'),
      $closeBtn = $('.pb-f-bars-breaking-news-bar .bar-close-btn'),
      $barWrapper = $('.pb-f-bars-breaking-news-bar #breaking-alert.bar-wrapper'),
      $nav = $('#nav');

  var breakingNews = {};

  var spoofContent = [
    {
      "inclusions":[1503438],
      "titleimage":"//media.nzherald.co.nz/webcontent/eventbar/TC-Event-Bar.jpg",
      "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Integer nec odio. Praesent libero.",
      "id":206534,
      "url":"/rotorua-daily-post/news/article.cfm?c_id=1503438&objectid=11818983",
      "clickmap":"homeEVT",
      "type":"event",
      "title":""
    }
  ];

  // reloadScript deals with hitting the breaking news bar script file, and putting the text and URL into place.
  var reloadScript = {
    breakingNewsUrl : '',

  // detect if the editor wants to run dummy breaking news across the ticker
    spoofDetected : function() {
      return $('[data-spoof]').attr('data-spoof') === 'true';
    },

    // The breaking news bar is initially set to an empty function. Later, it is set to a timer.
    breakingNewsBar : function () {},

    /*
      renderNews decides to render a news bar with respect to:
        1. whether or not the news API response contains breaking news or is empty
        2. whether or not an API response contains a *new* story or the *same* story
    */

    renderNews : function(data) {
      var currentText = $item.text(),
          isNewItem = currentText !== data.text,
          link = data.url;

      function addItem(item, linkUrl){
        $item
          .text(item)
          .attr('href', linkUrl);
      }

        // there's breaking news, the bar is hidden and
        // the story hasn't been closed out yet by the user on any page
      if (data.text && $barWrapper.hasClass('hidden')) {
        addItem(data.text, link);
        $barWrapper.removeClass('hidden');
        bar.marquee();
        // there's breaking news and the bar is visible
      } else if(data.text){
        if (isNewItem) {
          $item.text("");
          setTimeout(function(){
            addItem(data.text, link);
            bar.marquee();
          }, 1000)
          bar.reset();
        }
      // there's nothing in the breaking news API
      } else {
        $barWrapper.addClass('hidden');
        $item.text("");
        bar.reset();
      }
    },
    // loadData fetches from API every 20 seconds (see 'startTimer' below)
    // Tries to render breaking news no matter the response from the API
    // renderNews function above handles empty vs. populated API responses
    loadData : function () {
      if(!this.spoofDetected()){
        $.ajax({
          url: "//syndication.nzherald.co.nz/shareddata/newsbar/newsbarscript.js",
          dataType: "script"
        }).success(function(){
            // when Breaking News API is populated, send it to renderNews
            // otherwise send null msg to renderNews
            var newsToRender = sNZHBreakingNews.length ?
                sNZHBreakingNews[0] :
                { text: null, url: null };

            // set reloadScript.breakingNewsUrl to article's URL,
            // to be parsed later for 'breakingNewsId' cookie
            // should user decide to "X" out the bar (see bar.closingTime)
            if (newsToRender.url) {
              reloadScript.breakingNewsUrl = newsToRender.url;
              if(!userActions.hasClosedStory(newsToRender.url)){
                reloadScript.renderNews(newsToRender);
              }
            }
          }).fail(function(error){
            console.error(error);
          });
      } else {
        if(!userActions.hasClosedStory(spoofContent[0].url)){
          reloadScript.breakingNewsUrl = spoofContent[0].url;
          reloadScript.renderNews(spoofContent[0]);
        }
      }
    },
    stopTimer : function () { // Clear the timer.
      clearInterval(reloadScript.breakingNewsBar);
    },
    startTimer : function () { // Start a simple timer that triggers a call to the reload script every 30 seconds
      reloadScript.breakingNewsBar = setInterval(function() { // Set the reloadScript.breakingNewsBar function that was initially declared above.
          reloadScript.loadData();
      }, 30000);
    },
    positionBar : function () {
      if ($nav.hasClass('expanded')) {
        $barWrapper.removeClass('bar-compressed');
        $barWrapper.addClass('bar-expanded');
      }
      if ($nav.hasClass('compressed')) {
        $barWrapper.removeClass('bar-expanded');
        $barWrapper.addClass('bar-compressed');
      }
    },
    runEvents : function () {
      reloadScript.loadData();
      this.startTimer();
      this.positionBar();
    }
  };

  var bar = { // Handles events dealing with the bar, such as closing it by hitting the X, and the marquee effect.
    closingTime : function () {
      $closeBtn.on('click', function(){
        // set cookie to track that user has closed this breaking news bar story
        myPage.setCookie(
          'breakingNewsId',
          stringParsers.getUrlParam('objectid', reloadScript.breakingNewsUrl).value,
          1
        );
        // Remove bar from DOM and stop timer, preventing unnecessary calls
        $barWrapper.parent().remove();
        reloadScript.stopTimer();
      });
    },
    tickTime : function(width){
      // speed here is the amount of pixels traveled per second
      var speed = 150;
      return width / speed;
    },
    reset : function(){
      $item.css('left', '0px');
    },
    // 'marquee' determines if the breaking news item will "tick across" the screen
    // from right to left and back, or sit statically on the page
    marquee : function () {

      var barWrapperWidth = $barWrapper.width(),
          closeBtnWidth = $closeBtn.width(),
          itemWidth = $item.outerWidth(true),
          barWrapperPosition = $barWrapper.css('position'),
          barLabelwidth = barWrapperPosition !== 'fixed' ? $barLabel.outerWidth() : 0,
          distanceLeft = (barWrapperWidth - (itemWidth + closeBtnWidth + barLabelwidth)),

          // determines if the marquee should actually run or not
          headlineOverflows = itemWidth > (barWrapperWidth - (closeBtnWidth + barLabelwidth));

          // 'transition end' messages for the various browsers
      var browserTransitionStr = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

      function tickAcross(){
        // If it's already ticked across, breaking news item
        // will tick back to starting place
        if ($item.css('left') !== "0px") {
        // tick back at 4X the speed that it ticks left
          $item
            .css('transition', 'left ' + (bar.tickTime(-distanceLeft) / 4) + 's linear 2s')
            .css('left', 0 + 'px');
        } else {
        // breaking news item will tick across from to the left
          $item
            .css('transition', 'left ' + bar.tickTime(-distanceLeft) + 's linear 2s')
            .css('left', distanceLeft + 'px');
        }
      };

      if ( headlineOverflows ) {
        tickAcross();
        // listen for the end of the tick-across movement...
        $item.one(browserTransitionStr, function() {
        // ... then run the marquee function again.
          bar.marquee();
        });
      }
    },

    runEvents : function () {
      this.closingTime();
    }
  };

  var resize = { // On window resize, call the marquee function.
    runEvents : function (){
      $(window).smartresize(function(){
        reloadScript.positionBar();
        bar.reset();
        bar.marquee();
      }, 1500, false);
    }
  };

  var userActions = {
    // check if user already closed out this breaking news bar headline
    hasClosedStory : function(link){
      var id = stringParsers.getUrlParam('objectid', link).value;
      return id === myPage.getCookie('breakingNewsId');
    }
  };

  var init = function () {
    bar.runEvents();
    reloadScript.runEvents();
    resize.runEvents();
  };

  // use setTimeout to take advantage of queuing
  setTimeout(init, 0);

})(jQuery);

;(function($){

 var headerBar = {
   init : function(){
     // stop. it's hammer time.
     this.hammerTime();
   },
   checkSwipe : function(e) {
     //check if a swipe to the previous/next article/section should happen
     if(e.pointerType === 'mouse') {
       //is this desktop?
       return false;
     }
     if ($(e.target).closest('.pb-feature').hasClass('pb-f-article-slideshow')) {
       //someone swiping gallery?
       return false;
     }
     if ($(e.target).closest('.pb-feature').hasClass('pb-f-global-horoscope-slider')) {
       //someone swiping horoscope?
       return false;
     }
     if ($(e.target).closest('.pb-feature').hasClass('pb-f-ads-ad') && $(e.target).closest('.pb-feature').find('.slider').length > 0 ) {
       //someone swiping ad-carousel?
       return false;
     }
     if ($(e.target).closest('.pb-chain').hasClass('pb-c-image-row')) {
       //someone swiping image-row?
       return false;
     }
     if ($(e.target).closest('.pb-chain').hasClass('pb-c-slider-chain')) {
       //someone swiping sliders?
       return false;
     }
     if ($(e.target).closest('.extra-shares').length > 0) {
       //someone swiping share modal?
       return false;
     }
     if ($(e.target).closest('.pb-c-rail-chain').hasClass('show-mobile')) {
       //someone swiping right hand rail?
       return false;
     }
     if ($(e.target).closest('.pb-feature').hasClass('pb-f-photo-gallery')) {
       //someone swiping gallery?
       return false;
     }
     if ($('#nav').hasClass('expanded')) {
       //someone swiping the nav?
       return false;
     }
     return true;
   },
   hammerTime : function(){
     // create a new Hammer object for the swipe events
     
     // don't add touch events to the react app, 
     // as it impairs ios iframe touch events
    if(document.getElementById('app')) return;

     var carouselTime = new Hammer($('#pb-root')[0], {
       cssProps: {
         userSelect: true
       }
     });
     carouselTime.on('swiperight', this.swipeRightHandler);
     carouselTime.on('swipeleft', this.swipeLeftHandler);
   },
   swipeRightHandler : function(event){
     if (headerBar.checkSwipe(event)) {
       // move to the previous article/section
       var url = $("#prev").data("url");
       if(url){
         window.location.href = url;
       }
     }
   },
   swipeLeftHandler : function(event){
     if (headerBar.checkSwipe(event)) {
       // move to the next slide article/section
       var url = $("#next").data("url");
       if(url){
         window.location.href = url;
       }
     }
   }
 }

 headerBar.init()

 $('.nav-expand').on('click',function() {
     $('.nav-toggle').click();
 });

})(jQuery);


$(document).ready(function() {
  premiumArticleBorderFix('.pb-c-standard-page-chain .pb-f-homepage-story-feed');
});


;(function($){
  var bylineFeat = $(".byline")[0],
      shareBar = $(".byline-shares"),
      scrollLog = [];
  $(window).scroll(function(){
    //on small screens
    pxFromTop = $(window).scrollTop();
    scrollLog.push(pxFromTop);
    //last two values in the array are kept
    scrollLog = scrollLog.slice(-2);
    var prevScrollPos = scrollLog[0],
        currScrollPos = scrollLog[1];
    if ($(window).width()<810){
      if(pxFromTop > $(bylineFeat).offset().top+$(bylineFeat).height()){
        $(shareBar).addClass("share-fixed");
        if ( prevScrollPos < currScrollPos ) {

          
          $(shareBar).addClass("show-share").removeClass('hide-share');
        } else {
          $(shareBar).addClass("hide-share").removeClass('show-share');
        }
      } else {
        $(shareBar).removeClass("share-fixed").removeClass('hide-share').removeClass('show-share');
      }
    }
  })
    $(window).resize(function(){
      if ($(shareBar).hasClass("share-fixed") && $(window).width()>810){
        $(shareBar).removeClass("share-fixed").removeClass("hide-share").removeClass("show-share");
      }
    })
})(jQuery);

;(function($){
  //Put javascript here
  $(".element-related-link a").on("click", function(event){
    event.preventDefault();
    var target = $(this).attr('href');
    // send dax event
    $(this).trigger('link_offsite', {'name':'articleinl;externallink'})
    //open a new tab
    window.open(target);
  });

  // set dax hidden events - DO NOT REMOVE
    // video events
  $('body').on('click', '.vjs-poster',function(event){
    $(this).trigger('play_video',{'name':'articleinl;video'});
  })
  $('body').on('click', '.vjs-big-play-button',function(event){
    $(this).trigger('play_video',{'name':'articleinl;video'});
  })
    // audio events
  var monitor = setInterval(function(){
    var elem = document.activeElement;
    if(elem && elem.tagName == 'IFRAME'){
      clearInterval(monitor);
      $(this).trigger('play_audio',{'name':'articleinl;audio'});
    }
  }, 100);

  $(".fullscreen-btn").on("click", function(event){
    //goes up the event bubble until it reaches <div class="gallery-container"> then adds a full-screen class to it.
    var $elementImage = $(event.target).closest(".element-image");
    $elementImage.addClass("full-screen");

    // Check if is mobile
    if(isMobile.any()) {
      $elementImage.addClass('is-mobile');
    } else {
      $elementImage.removeClass('is-mobile');
    }

    // prevent body scroll
    $('html, body').addClass('image-modal-no-scroll');

    responsivelyLazy.run();
  });

  // Attach event handler to close button
  $(".fullscreen-close-btn").on("click", function(event){
    $(event.target).closest(".element-image").removeClass("full-screen");
    $('html, body').removeClass('image-modal-no-scroll');

    responsivelyLazy.run();
  });

  $(".fullscreen-caption-toggle").on("click", function(event){
    var $this = $(this);
    var $imageCaption = $this.closest('figcaption');
    $imageCaption.toggleClass('closed');
  });

  // check if window > breakpoint-xs 660px, then caption open by default -
  if(window.innerWidth > 660) {
    var $imageCaption = $('figcaption');
    var $imageCaptionToggle = $(".image-caption-toggle");
    $imageCaption.toggleClass('closed');
  }

})(jQuery);


;(function($){

  var chainFunctions = {
    "triplet-image" : function ($chain) {
      $chain.find('.col-sm-4').removeClass('col-sm-4').addClass('col-sm-3');
    },
    "sub-hero-full-300-250" : function ($chain) {
      $chain.find('.portrait-wrapper').removeClass('col-md-8').addClass('col-md-12')
      $chain.find('.native-ad-container').removeClass('col-md-6').addClass('col-md-4')
      $chain.find('.native-ad-container').siblings('.col-md-6').removeClass('col-md-6').addClass('col-md-4');
    }
  };

  var chainParams = {
    "triplet-image" : "TRIPLEPORT",
    "sub-hero-full-300-250" : "SUBHERO",
    "sub-hero-full" : "SUBHERO",
    "sub-hero-half" : "SUBHEROHALF",
    "triple-large-image" : "TRIPLELAND",
    "image-row" : "SUBHEROROW",
    "quad-small-image": "QUADSMALL"
  };

  var nativeAd = {
    injectScript : function () {
      var $ad = $(this),
          adEnabled = $ad.data('ad-enabled'),
          adCampaign = $ad.attr('data-campaign-type'),
          adExpirationDate = $ad.attr('data-expiration') || false,
          adStartDate = $ad.attr('data-start') || false,
          $chainWrapper = $ad.closest('.chain-wrapper'),
          enclosingChain = chainParams[$chainWrapper.attr('data-chain-type')],
          adHref = $ad.attr('data-href')+'MODS='+enclosingChain+'/';

          adScript = '<script src="'+adHref+'" data-nativeslot="' + $ad.attr('data-ad-position') + '"></script>';

      var notExpired = function (expiration) {
        var expirationTime = new Date(Number(expiration)),
            currentTime = new Date();
        return expirationTime > currentTime;
      };

      var hasStarted = function(start) {
        var startTime = new Date(Number(start)),
            currentTime = new Date();
        return startTime < currentTime;
      }

      console.log('enclosingChain: ' + enclosingChain + '; adEnabled: ' + adEnabled + '; adCampaign: ' + adCampaign + '; hasStarted: ' + hasStarted(adStartDate) + '; notExpired: ' + notExpired(adExpirationDate));

      function showAd() {
        return (adEnabled && adCampaign == 'cost-per-click') ||
        (adEnabled && adCampaign == 'tenancy' && hasStarted(adStartDate) && notExpired(adExpirationDate));
      }

      if (showAd()) {
        var $chainWrapper = $ad.closest('.chain-wrapper');
        var chainType = $chainWrapper.attr('data-chain-type');
        if (chainFunctions[chainType]){
          chainFunctions[chainType]($chainWrapper);
        }
        $ad.append(adScript);
        $ad.closest('.native-ad-container').addClass('onscreen ad-on');
        $chainWrapper.addClass('native-on');
      } else {
        $ad.closest('.native-ad-container').remove();
      }

      // trigger event to help (sub-hero-full) chain handle possible rendering of native-ad
      $chainWrapper.trigger('native-ad-container-processed');
    },
    adActions : function () {
      $('.pb-native-ad-container').each(this.injectScript);
    },
    runEvents : function () {
      this.adActions();
    }
  }

  var init = function () {
    nativeAd.runEvents();
  };

  init();
})(jQuery);

/**
 * Clavis Recommendation Module
 *
 *
 * Structure of this file
 * ======================
 *
 * `smartPreload`: takes care of loading the recommendations before the user
 * reaches the bottom of the page. It keeps track of scrolling, where the
 * recommendations are located, and will try to be smart about pre-loading.
 *
 * `ajaxCall`: is just a small wrapper.
 *
 * `Recommend`: is a tiny JS client for the recommendations API. It provides
 * convenience methods to call the different endpoints with the right parameters.
 *
 * `loadSuccess`: takes care of rendering recommendations in the page.
 *
 * `window/scope.recommend` is the function that gets exported to the global
 * scope so it can be called from the JSP/HTML. It wraps all the above in a
 * single call that takes an option object.
 *
 */
;
(function(scope) {
    "use strict";

    /////////////////////////////////////////////////////////////////////////////
    // Keeps track of scrolling position, and:
    // - Runs a function when we get 'close' to the div
    // - Runs a function when the div becomes visible
    //
    // Parameters:
    // - `elem`: DOM element or CSS selector
    // - `options`: {
    //    `screens`: how many screens in advance to start the loader
    //    `preload`: the function to call when we get `close`
    //    `visible`: the function to call when the div becomes visible
    // }
    /////////////////////////////////////////////////////////////////////////////

    function smartPreload(elem, options) {

        // Keep track of when we ran
        var preloadCalled = false;
        var visibleCalled = false;

        // Number of screens
        var screens = (options && options.screens) || 2;

        // Define the callback
        var callback = function() {

            // Calculate position
            var diff = elem.getBoundingClientRect().top - window.innerHeight;
            var size = window.innerHeight * screens;

            // If we are on a small device, double that
            if (window.innerWidth < 768) {
                size = size * 2;
            }

            // If we are 1 (or 2) screens away, load
            if (diff < size) {
                if (options.preload && !preloadCalled) {
                    preloadCalled = true;
                    options.preload();
                }
            }

            // If the element is visible, notify and stop watching
            if (diff < 0) {
                if (options.visible && !visibleCalled) {
                    visibleCalled = true;
                    options.visible();
                }
                window.removeEventListener('scroll', callback);
            }
        };

        // Setup the listener
        window.addEventListener('scroll', callback);

        // Run the callback once
        callback();

    };

    /////////////////////////////////////////////////////////////////////
    // Makes an AJAX call to the API
    /////////////////////////////////////////////////////////////////////

    function ajaxCall(url, payload, success) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                if (success) {
                    success(JSON.parse(request.responseText));
                }
            }
        };

        request.send(JSON.stringify(payload));
    }

    /////////////////////////////////////////////////////////////////////
    // Define the constructor
    /////////////////////////////////////////////////////////////////////

    function Recommend(options) {
        this.count = options.count;
        this.content = options.content;
        this.clientName = options.clientName;

        this.element = document.querySelector(options.element);

        this.endpoint = options.endpoint;
        this.clickedEndpoint = options.endpoint + "/clicked";
        this.renderedEndpoint = options.endpoint + "/rendered";
        this.recommendEndpoint = options.endpoint + "/recommend"
    }

    /////////////////////////////////////////////////////////////////////
    // Define the API
    /////////////////////////////////////////////////////////////////////

    Recommend.prototype = {
        valid: function() {
            return (
                this.count &&
                this.count > 0 &&
                this.clientName &&
                this.clientName.trim().length > 0 &&
                this.endpoint &&
                this.endpoint.trim().length > 0 &&
                this.element
            );
        },
        baseParams: function() {
            var params = {};
            params.url = 'contentapi://' + this.content;
            params.referrer = document.referrer;
            params.count = this.count
            params.client = this.clientName;
            params.imageMaxWidth = this.imageMaxWidth;
            params.imageMaxHeight = this.imageMaxHeight;

            // User ID. See `global/clavis`
            try {
                params.uid = localStorage.getItem('uuid');
            } catch (e) {
                params.uid = null;
            }
            return params;
        },

        recommend: function(success) {
            var self = this;
            return ajaxCall(
                this.recommendEndpoint,
                this.baseParams(),
                function(response) {
                    // We only care about URLs  and response type for follow up calls.
                    // So only keep that for slimmer ajax calls.
                    var slim = {
                        results: []
                    };
                    if (response) {
                        for (var i = 0; i < response.length; i++) {
                            slim.results.push({
                                url: response[i].url,
                                responsetype: response[i].responsetype
                            });
                        }
                    }
                    self.response = slim;
                    // Now execute callback
                    if (success && response) {
                        success(response);
                    }
                }
            );
        },

        rendered: function() {
            var params = this.baseParams()
            params.response = this.response;
            return ajaxCall(this.renderedEndpoint, params);
        },

        clicked: function(url) {
            var params = this.baseParams()
            params.response = this.response;
            params.clickUrl = url;
            return ajaxCall(this.clickedEndpoint, params);
        },

        setVisible: function() {
            this._visible = true;
            if (this._rendered) {
                this.rendered();
            }
        },

        setRendered: function() {
            this._rendered = true;
            if (this._visible) {
                this.rendered();
            }
        }

    };

    /////////////////////////////////////////////////////////////////////////////
    // Render data and track clicks
    /////////////////////////////////////////////////////////////////////////////

    function loadSuccess(client, data) {

        // Check data
        if (!data) {
            return;
        }

        // Get the template
        var tpl = client.element.querySelectorAll('[data-template-id="recommendation"]');
        if (tpl && tpl.length == 1) {
            var classes = '';
            var result = '';
            var html = tpl[0].innerHTML;
            // Iterate over all recommendations
            for (var i = 0; i < data.results.length; i++) {
                var reco = data.results[i];
                classes = 'recommendation';
                if (i == data.results.length - 2) {
                    classes += ' second';
                }

                var headline = reco.headline;
                if (headline.length > 70) {
                    headline = reco.headline.substring(0, 70) + '...';
                }
                result += '<div class="' + classes + '">' + html
                    .replace('{{pictureLink}}', reco.url + '&ref=clavis')
                    .replace('{{picture}}', reco.photo.path)
                    .replace('{{headline}}', headline)
                    .replace('{{headlineLink}}', reco.url + '&ref=clavis') +
                    '<div class="clear"></div></div>';
            }

            // Replace the template
            tpl[0].outerHTML = result;
            client.setRendered();

            // Set click logging
            client.element.querySelectorAll('a').forEach(function(el) {
                el.addEventListener('click', function(event) {
                    if (event && event.currentTarget && event.currentTarget.href) {
                        var clickUrl = event.currentTarget.href;
                        client.clicked(event.currentTarget.href);
                        if (event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
                            // Open in a new tab, so do nothing
                        } else {
                            // Delay the click event to finish the AJAX call
                            event.preventDefault();
                            setTimeout(function() {
                                document.location = clickUrl;
                            }, 250);
                        }
                    }
                });
            });
        }
    };

    /////////////////////////////////////////////////////////////////////////////
    // This is the main function we export to the global scope
    //
    // Options: {
    //    count: N,
    //    content: 'Content API ID',
    //    element: '#recommendations',
    //    endpoint: 'https://recommendations...',
    //    whenToRun: 'always/smart',
    //    clientName: 'recommend-arc'
    // }
    /////////////////////////////////////////////////////////////////////////////

    scope.recommend = function(options) {
        // Create the Recommend client
        var client = new Recommend(options);
        if (!client.valid()) {
            return;
        }

        // Create closures for callbacksl
        function _preload() {
            client.recommend(function(data) {
                loadSuccess(client, data);
            });
        }

        function _visible() {
            client.setVisible();
        }

        // And initialize
        var marker = document.querySelectorAll(options.scrollMarker);
        if (marker && marker.length == 1) {
            if (options && options.whenToRun && options.whenToRun == 'always') {
                _preload();
                smartPreload(marker[0], {
                    visible: _visible
                });
            } else {
                smartPreload(marker[0], {
                    preload: _preload,
                    visible: _visible
                });
            }
        }
    };

})(window);
