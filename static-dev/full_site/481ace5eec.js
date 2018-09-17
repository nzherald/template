(function($){$(".search-form").on("submit",function(event){event.preventDefault();var searchTerm=$(this).find(".search-term").val();if(searchTerm=="")searchTerm=" ";var keywords=$("meta[name\x3d'news_keywords']").attr("content").split(",");var page=1;searchElasticUtils.item.regional=keywords[0].replace(/ /g,"-").toLowerCase();var elasticSearchUrl=searchElasticUtils.getElasticSearchUrl(searchTerm,1);var refPageElement=$(this).closest("div.form").data("refPageElement");searchElasticUtils.triggerSearch(elasticSearchUrl)});
window.searchElasticUtils=window.searchElasticUtils||{item:{query:"",page:""},refreshItem:function(){searchElasticUtils.item.query=$("#re-search-term").val();searchElasticUtils.item.page=1},getElasticSearchUrl:function(search_term,page){term=search_term.replace(/ /g,"+");var searchUrl="/nzh-search/";var pathSplit=window.location.pathname.split("/");if(pathSplit.length>=5&&pathSplit[1]=="nzh-search")searchUrl+=pathSplit[2]+"/";else if(oParams!==undefined&&oParams.publication!==undefined&&oParams.publication.length)searchUrl+=
oParams.publication+"/";else searchUrl+="NZH/";searchUrl=searchUrl+term+"/";if(page!==undefined)searchUrl=searchUrl+page+"/";return searchUrl},triggerSearch:function(searchUrl){if(!searchUrl)searchUrl=this.getElasticSearchUrl(this.item.query,this.item.page);window.location=searchUrl}}})(jQuery);
(function($){var logger=new ARC.Tools.logger("sharebar");var sharebar={initHiddenShares:function(){var stopScrollingMobile=function(e){e.preventDefault();$("body").scrollTop($("body").scrollTop()+1);setTimeout(function(){$("body").scrollTop($("body").scrollTop()-1)},300)};$(".share-container").click(function(){$(this).siblings(".extra-shares").addClass("show-shares");$(this).siblings(".extra-shares")[0].addEventListener("touchmove",stopScrollingMobile,false);$("html, body").addClass("hidden-share-no-scroll")});
$(".extra-shares .share-close").click(function(){$(this).parent().removeClass("show-shares");$("html, body").removeClass("hidden-share-no-scroll");$(this).parent()[0].removeEventListener("touchmove",stopScrollingMobile)})},initBookmark:function(){$(".bookmark").click(function(){if($(this).hasClass("saved"))savedArticles.removeArticle();else savedArticles.saveArticle()})},init:function(){this.initHiddenShares();this.initBookmark();$(".social-tools a").on("click",function(){var $this=$(this);var evenName=
$this.attr("class").split(" ")[0];if(evenName!="bookmark")$this.trigger("share_content",{"name":evenName})})}};sharebar.init();var savedArticles={saved_id:"",init:function(){if(myAccount.isSignedIn()){var bookmarkToSave=myPage.getCookie(myAccount.consts.BOOKMARK_COOKIE);if(bookmarkToSave.length){myPage.deleteCookie(myAccount.consts.BOOKMARK_COOKIE);this.saveArticle(bookmarkToSave)}this.checkSaved();$(myAccount).on(myAccount.consts.BOOKMARK_NAV_EVENT,function(){savedArticles.checkSaved()})}},getUrlParam:function(name){var results=
(new RegExp("[?\x26]"+name+"\x3d([^\x26#]*)")).exec(window.location.href);return results?results[1]:0},checkSaved:function(){myAccount.getBookmarks(1).done(function(data){var currentObjId=savedArticles.getUrlParam("objectid");$(".bookmark.saved").removeClass("saved svg-bookmark-saved-icon").addClass("svg-bookmark-icon");if(data.data.aUnread)$(data.data.aUnread).each(function(){if(currentObjId==this.object_id){$(".bookmark").removeClass("svg-bookmark-icon").addClass("saved svg-bookmark-saved-icon");
savedArticles.saved_id=this.id}})}).fail(function(jqXHR){logger.log("getBookmarks:error:"+jqXHR.status+":"+jqXHR.statusText+":"+jqXHR.responseText)})},saveArticle:function(objectId){if(myAccount.isSignedIn())myAccount.createBookmark(1,objectId?objectId:this.getUrlParam("objectid")).done(function(data){$(".bookmark").removeClass("svg-bookmark-icon").addClass("saved svg-bookmark-saved-icon");savedArticles.saved_id=data.split('saved_id":')[1].split("}")[0];$(myAccount).trigger(myAccount.consts.BOOKMARK_PAGE_EVENT)}).fail(function(jqXHR){logger.log("createBookmark:error:"+
jqXHR.status+":"+jqXHR.statusText+":"+jqXHR.responseText)});else{myPage.setCookie(myAccount.consts.BOOKMARK_COOKIE,this.getUrlParam("objectid"),10/(24*60));window.location=myAccount.consts.SIGN_IN_URL}},removeArticle:function(){myAccount.deleteBookmark(1,this.saved_id).done(function(data){$(".bookmark.saved").removeClass("saved svg-bookmark-saved-icon").addClass("svg-bookmark-icon");$(myAccount).trigger(myAccount.consts.BOOKMARK_PAGE_EVENT)}).fail(function(jqXHR){logger.log("deleteBookmark:error:"+
jqXHR.status+":"+jqXHR.statusText+":"+jqXHR.responseText)})}};myAccount.getProfilePromise().done(function(){savedArticles.init()})})(jQuery);