/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
/*jslint */
/*global module: true, exports: true, define: false */

/**
 * jaaulde-cookies.js
 *
 * Copyright (c) 2005-2015, Jim Auldridge MIT License
 *
 */

/**
 *
 * @param {object} scope - a reference to the call scope
 * @param {undefined} undef - an undefined variable for comparison checks
 * @returns {void}
 */
(function (scope, undef) {
    'use strict';

    /**
     * IIFE for injecting cookies module into whichever require/scope is in use
     *
     * @param {string} name - the name of module being created
     * @param {function} definition - function which produces and returns the created module
     * @returns {void}
     */
    (function (name, definition) {
        if (typeof module === 'object' && module !== null && module.exports) {
            module.exports = exports = definition();
        } else if (typeof define === 'function' && define.amd) {
            define(definition);
        } else {
            scope[name] = definition();
        }
    }('cookies', function () {
            /* localize natives */
        var document = scope.document,
            /* opts and support */
            default_options = {
                expires: null,
                path: '/',
                domain: null,
                secure: false
            },
            /**
             *
             * @access private
             * @param {string} msg
             * @returns {void}
             */
            warn = function (msg) {
                if (typeof scope.console === 'object' && scope.console !== null && typeof scope.console.warn === 'function') {
                    warn = function (msg) {
                        scope.console.warn(msg);
                    };
                    warn(msg);
                }
            },
            /**
             *
             * @param {object} o
             * @returns {object}
             */
            resolveOptions = function (o) {
                var r,
                    e;

                if (typeof o !== 'object' || o === null) {
                    r = default_options;
                } else {
                    r = {
                        expires: default_options.expires,
                        path: default_options.path,
                        domain: default_options.domain,
                        secure: default_options.secure
                    };

                    /*
                     * I've been very finicky about the name and format of the expiration option over time,
                     * so I'm accounting for older styles to maintain backwards compatibility. Preferably it
                     * will be called "expires" and will be an instance of Date
                     */
                    if (typeof o.expires === 'object' && o.expires instanceof Date) {
                        r.expires = o.expires;
                    } else if (typeof o.expires_at === 'object' && o.expires_at instanceof Date) {
                        r.expires = o.expires_at;
                        warn('Cookie option "expires_at" has been deprecated. Rename to "expires". Support for "expires_at" will be removed in a version to come.');
                    } else if (typeof o.expiresAt === 'object' && o.expiresAt instanceof Date) {
                        r.expires = o.expiresAt;
                        warn('Cookie option "expiresAt" has been deprecated. Rename to "expires". Support for "expiresAt" will be removed in a version to come.');
                    } else if (typeof o.hoursToLive === 'number' && o.hoursToLive !== 0) {
                        e = new Date();
                        e.setTime(e.getTime() + (o.hoursToLive * 60 * 60 * 1000));
                        r.expires = e;
                        warn('Cookie option "hoursToLive" has been deprecated. Rename to "expires" and prodvide a Date instance (see documentation). Support for "hoursToLive" will be removed in a version to come.');
                    }

                    if (typeof o.path === 'string' && o.path !== '') {
                        r.path = o.path;
                    }

                    if (typeof o.domain === 'string' && o.domain !== '') {
                        r.domain = o.domain;
                    }

                    if (o.secure === true) {
                        r.secure = o.secure;
                    }
                }

                return r;
            },
            /**
             *
             * @access private
             * @param {object} o
             * @returns {string}
             */
            cookieOptions = function (o) {
                o = resolveOptions(o);

                return ([
                    (typeof o.expires === 'object' && o.expires instanceof Date ? '; expires=' + o.expires.toGMTString() : ''),
                    ('; path=' + o.path),
                    (typeof o.domain === 'string' ? '; domain=' + o.domain : ''),
                    (o.secure === true ? '; secure' : '')
                ].join(''));
            },
            /**
             *
             * @access private
             * @param {string} s
             * @returns {string}
             */
            trim = (function () {
                var trim_def;

                /* Some logic for `trim` and `isNaN` borrowed from http://jquery.com/ */
                if (String.prototype.trim) {
                    trim_def = function (s) {
                        return String.prototype.trim.call(s);
                    };
                } else {
                    trim_def = (function () {
                        var l,
                            r;

                        l = /^\s+/;
                        r = /\s+$/;

                        return function (s) {
                            return s.replace(l, '').replace(r, '');
                        };
                    }());
                }

                return trim_def;
            }()),
            /**
             *
             * @access private
             * @param {mixed} v
             * @returns {boolean}
             */
            isNaN = (function () {
                var p = /\d/,
                    native_isNaN = scope.isNaN;

                return function (v) {
                    return (v === null || !p.test(v) || native_isNaN(v));
                };
            }()),
            /**
             *
             * @access private
             * @returns {object}
             */
            parseCookies = (function () {
                var parseJSON,
                    p;

                if (JSON && typeof JSON.parse === 'function') {
                    parseJSON = function (s) {
                        var r = null;

                        if (typeof s === 'string' && s !== '') {
                            s = trim(s);

                            if (s !== '') {
                                try {
                                    r = JSON.parse(s);
                                } catch (e1) {
                                    r = null;
                                }
                            }
                        }

                        return r;
                    };
                } else {
                    parseJSON = function () {
                        return null;
                    };
                }

                p = new RegExp('^(?:\\{.*\\}|\\[.*\\])$');

                return function () {
                    var c = {},
                        s1 = document.cookie.split(';'),
                        q = s1.length,
                        i,
                        s2,
                        n,
                        v,
                        vv;

                    for (i = 0; i < q; i += 1) {
                        s2 = s1[i].split('=');

                        n = trim(s2.shift());
                        if (s2.length >= 1) {
                            v = s2.join('=');
                        } else {
                            v = '';
                        }

                        try {
                            vv = decodeURIComponent(v);
                        } catch (e2) {
                            vv = v;
                        }

                        /* Logic borrowed from http://jquery.com/ dataAttr method */
                        try {
                            vv = (vv === 'true')
                                ? true : (vv === 'false')
                                    ? false : !isNaN(vv)
                                        ? parseFloat(vv) : p.test(vv)
                                            ? parseJSON(vv) : vv;
                        } catch (ignore) {}

                        c[n] = vv;
                    }

                    return c;
                };
            }());

        return {
            /**
             * get - get one, several, or all cookies
             *
             * @access public
             * @static
             * @param {mixed} n {string} name of single cookie
             *                  {array} list of multiple cookie names
             *                  {void} if you want all cookies
             * @return {mixed} type/value of cookie as set
             *                 {null} if only one cookie is requested and is not found
             *                 {object} hash of multiple or all cookies (if multiple or all requested)
             */
            get: function (n) {
                var r,
                    i,
                    c = parseCookies();

                if (typeof n === 'string') {
                    r = (c[n] !== undef) ? c[n] : null;
                } else if (typeof n === 'object' && n !== null) {
                    r = {};

                    for (i in n) {
                        if (Object.prototype.hasOwnProperty.call(n, i)) {
                            if (c[n[i]] !== undef) {
                                r[n[i]] = c[n[i]];
                            } else {
                                r[n[i]] = null;
                            }
                        }
                    }
                } else {
                    r = c;
                }

                return r;
            },
            /**
             * filter - get array of cookies whose names match the provided RegExp
             *
             * @access public
             * @static
             * @param {RegExp} p The regular expression to match against cookie names
             * @return {object} hash of cookies whose names match the RegExp
             */
            filter: function (p) {
                var n,
                    r = {},
                    c = parseCookies();

                if (typeof p === 'string') {
                    p = new RegExp(p);
                }

                for (n in c) {
                    if (Object.prototype.hasOwnProperty.call(c, n) && n.match(p)) {
                        r[n] = c[n];
                    }
                }

                return r;
            },
            /**
             * set - set or delete a cookie with desired options
             *
             * @access public
             * @static
             * @param {string} n name of cookie to set
             * @param {mixed} v Any JS value. If not a string, will be JSON encoded (http://code.google.com/p/cookies/wiki/JSON)
             *                  {null} to delete
             * @param {object} o optional list of cookie options to specify
             * @return {void}
             */
            set: function (n, v, o) {
                if (typeof o !== 'object' || o === null) {
                    o = {};
                }

                if (v === undef || v === null) {
                    v = '';
                    o.expires = new Date();
                    o.expires.setFullYear(1978);
                } else {
                    /* Logic borrowed from http://jquery.com/ dataAttr method and reversed */
                    v = (v === true)
                        ? 'true' : (v === false)
                            ? 'false' : !isNaN(v)
                                ? String(v) : v;

                    if (typeof v !== 'string') {
                        if (typeof JSON === 'object' && JSON !== null && typeof JSON.stringify === 'function') {
                            v = JSON.stringify(v);
                        } else {
                            throw new Error('cookies.set() could not be serialize the value');
                        }
                    }
                }

                document.cookie = n + '=' + encodeURIComponent(v) + cookieOptions(o);
            },
            /**
             * del - delete a cookie (domain and path options must match those with which the cookie was set; this is really an alias for set() with parameters simplified for this use)
             *
             * @access public
             * @static
             * @param {mixed} n {string} name of cookie to delete
             *                  {boolean} true to delete all
             * @param {object} o optional list of cookie options to specify (path, domain)
             * @return {void}
             */
            del: function (n, o) {
                var d = {},
                    i;

                if (typeof o !== 'object' || o === null) {
                    o = {};
                }

                if (typeof n === 'boolean' && n === true) {
                    d = this.get();
                } else if (typeof n === 'string') {
                    d[n] = true;
                }

                for (i in d) {
                    if (Object.prototype.hasOwnProperty.call(d, i) && typeof i === 'string' && i !== '') {
                        this.set(i, null, o);
                    }
                }
            },
            /**
             * test - test whether the browser is accepting cookies
             *
             * @access public
             * @static
             * @return {boolean}
             */
            test: function () {
                var r = false,
                    n = 'test_cookies_jaaulde_js',
                    v = 'data';

                this.set(n, v);

                if (this.get(n) === v) {
                    this.del(n);
                    r = true;
                }

                return r;
            },
            /**
             * setOptions - set default options for calls to cookie methods
             *
             * @access public
             * @static
             * @param {object} o list of cookie options to specify
             * @return {void}
             */
            setOptions: function (o) {
                if (typeof o !== 'object') {
                    o = null;
                }

                default_options = resolveOptions(o);
            }
        };
    }));
}(this));
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map

(function() {
  /////////////////////////////////////////////////////////////////////////////
  // Constants, variables
  /////////////////////////////////////////////////////////////////////////////

  window.pageBuilder = window.pageBuilder || {};
  var testIdToFeatureId = {};
  var status = {};
  var TIMEOUT = 1500;
  var TIME_NOW = Date.now();
  var BANDITO_IS_ADMIN = null;
  var BANDITO_PERF_API = null;
  var BANDITO_TESTS_API = null;
  var BANDITO_EVENTS_API = null;

  /////////////////////////////////////////////////////////////////////////////
  // Checking for passive event listeners
  // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  /////////////////////////////////////////////////////////////////////////////

  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {
    /* do nothing */
  }

  /////////////////////////////////////////////////////////////////////////////
  // Visibility
  /////////////////////////////////////////////////////////////////////////////

  /**
   * { testId: [ element, callback ] }
   */
  var visibilityCallbacks = {};

  function visibilityCallback() {
    var config = null;
    var element = null;
    var callback = null;
    var body = document.body;
    var html = document.documentElement;
    var height = html.clientHeight || body.clientHeight;

    for (var key in visibilityCallbacks) {
      if (visibilityCallbacks.hasOwnProperty(key)) {
        config = visibilityCallbacks[key];
        if (config) {
          element = config[0];
          callback = config[1];
          var boundaries = element.getBoundingClientRect();
          if (boundaries.top > 0 && boundaries.top < height) {
            callback();
            visibilityCallbacks[key] = null;
          }
        }
      }
    }
  }

  window.addEventListener(
      'resize',
      visibilityCallback,
      supportsPassive ? { passive: true } : false
  );
  document.addEventListener(
      'scroll',
      visibilityCallback,
      supportsPassive ? { passive: true } : false
  );

  /////////////////////////////////////////////////////////////////////////////
  // Simple wrapper to make AJAX requests easier
  /////////////////////////////////////////////////////////////////////////////

  function ajax(url, success, failure, timeout) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status === 200) {
          try {
            var response = JSON.parse(xhr.responseText);
            success(response);
          } catch (e) {
            failure();
          }
        } else {
          failure();
        }
      }
    };
    if (timeout) {
      xhr.ontimeout = failure;
      xhr.timeout = timeout;
    }
    xhr.send();
  }

  /////////////////////////////////////////////////////////////////////////////
  // Keep track of performance
  /////////////////////////////////////////////////////////////////////////////

  function perf(status) {
    var elapsed = Date.now() - TIME_NOW;
    var url = BANDITO_PERF_API + '?status=' + status + '&time=' + elapsed;
    ajax(url, function() {}, function() {});
  }

  /////////////////////////////////////////////////////////////////////////////
  // Show the default variant for all tests.
  // This is basically a "failure" mode.
  // It happens when a timeout occurs.
  /////////////////////////////////////////////////////////////////////////////

  function showDefaultVariants() {
    for (var id in window._variantFeatureIds) {
      if (window._variantFeatureIds.hasOwnProperty(id)) {
        perf('failure');
        showDefaultVariant(window._variantFeatureIds[id], false);
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // Show variant for test X
  /////////////////////////////////////////////////////////////////////////////

  // If a feature is linked multiple places (which can happen when you want to
  // show/hide based on outputType), then the _variantFeatureIds will contain
  // each instance. Some of those instances may not be on the page, so we have
  // to go through all of them, and deal with the present ones.
  //
  // Ie, _variantFeatureIds can look like this:
  //
  // {
  //    fingerprint1: test1,
  //    fingerprint2: test1,
  //    ...
  // }
  //
  // But only fingerprint2 is in the DOM.
  function iterateFeatures(testId, callback) {
    var id, feature;
    for (id in window._variantFeatureIds) {
      if (window._variantFeatureIds.hasOwnProperty(id)) {
        if (window._variantFeatureIds[id] == testId) {
          feature = document.getElementById(id);
          if (feature) {
            callback(feature);
          }
        }
      }
    }
  }

  function showDefaultVariant(testId, success) {
    iterateFeatures(testId, function(feature) {
      variantLoaded(testId, testId, feature, success);
    });
  }

  function showOtherVariant(testId, winner, timeLeft) {
    // prettier-ignore
    var uri = window._context + "/api/v2/render/feature/variant/" + winner
        + "?rid=" + window._rid
        + "&uri=" + window._uri
        + "&outputType=" + window._outputType;

    // prettier-ignore
    ajax(uri,
        function(response) {
          iterateFeatures(testId, function(feature) {
            var resources = response.pageResources || {};
            var parent = feature.parentNode;
            var div = document.createElement("div");
            div.innerHTML = response.rendering.trim();
            var newFeature = div.childNodes[0];
            parent.replaceChild(newFeature, feature);
            // Add the scripts to the page
            var scripts = Array.prototype.slice.call(
                newFeature.getElementsByTagName("script")
            );
            for (var i = 0; i < scripts.length; i++) {
              if (scripts[i].src != "") {
                var s = document.createElement("script");
                s.setAttribute("src", scripts[i].src);
                document.body.appendChild(s);
              } else {
                eval(scripts[i].innerHTML);
              }
            }
            for (var file in resources) {
              if (resources.hasOwnProperty(file) && file.endsWith(".js")) {
                var script = document.createElement("script");
                script.setAttribute("src", resources[file]);
                document.body.appendChild(script);
              }
            }
            // Load success
            perf("success-variant");
            variantLoaded(testId, winner, newFeature, true);
          });
        },
        function() {
          iterateFeatures(testId, function(feature) {
            // Load failure
            perf("failure-step2");
            variantLoaded(testId, testId, feature, false);
          });
        },
        timeLeft
    );
  }

  /////////////////////////////////////////////////////////////////////////////
  // Variant Loaded : HTML is in the DOM, show it, mark it as done
  /////////////////////////////////////////////////////////////////////////////

  function variantLoaded(testId, variantId, feature, success) {
    var tag = testId + '-' + feature.id;

    if (!status[tag]) {
      status[tag] = true;

      // Make the feature visible
      feature.style.visibility = 'visible';

      // If this is a "success", tell Bandito
      if (success) {
        // Attach click events
        feature.addEventListener('click', function(event) {
          var url = null;
          var target = event.target;

          // prettier-ignore
          while (target && !(target.tagName.toUpperCase() == "A") && !(target == feature)) {
            target = target.parentNode;
          }

          if (target.tagName.toUpperCase() == 'A') {
            url = target.href;
            if (url) {
              // Send a "clicked" event
              var request = new XMLHttpRequest();
              request.open('POST', BANDITO_EVENTS_API, true);
              request.setRequestHeader('Content-Type', 'application/json');
              request.send(
                  JSON.stringify({
                    event: 'clicked',
                    test_id: testId,
                    variant_id: variantId
                  })
              );
              // To make sure we finish the call, we delay the page transition a few ms,
              // but only if the user did not CMD/CTRL+click (ie did not open a new tab).
              // If the user opened a new tab, this is not an issue, the call will finish.
              // prettier-ignore
              if (event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
                // Do nothing
              } else {
                event.preventDefault();
                setTimeout(function() {
                  document.location = url;
                }, 250);
              }
            }
          }
        });

        // Send a "served" event on visible
        visibilityCallbacks[tag] = [
          feature,
          function() {
            var request = new XMLHttpRequest();
            request.open('POST', BANDITO_EVENTS_API, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(
                JSON.stringify({
                  event: 'served',
                  test_id: testId,
                  variant_id: variantId
                })
            );
          }
        ];
        // Call now in case there is no scroll later
        visibilityCallback();
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // After receiving the correct variant for each test from Bandito,
  // load the appropriate rendering from PB, and show the variant
  /////////////////////////////////////////////////////////////////////////////

  function loadVariants(tests) {
    var testsFound = {},
        testId,
        winner,
        timeLeft;

    if (tests && tests['length']) {
      // For each test found, show default or load variant
      for (var i = 0; i < tests.length; i++) {
        winner = tests[i]['winner'];
        testId = tests[i]['_id'];
        testsFound[testId] = true;
        if (testId == winner) {
          perf('success-default');
          showDefaultVariant(testId, true);
        } else {
          timeLeft = TIMEOUT - (Date.now() - TIME_NOW);
          if (timeLeft > 50) {
            showOtherVariant(testId, winner, timeLeft);
          } else {
            perf('timeout-step1');
            showDefaultVariant(testId, false);
          }
        }
      }
      // If some of the tests on the page were not found, show default
      for (var id in window._variantFeatureIds) {
        if (window._variantFeatureIds.hasOwnProperty(id)) {
          testId = window._variantFeatureIds[id];
          if (!testsFound[testId]) {
            perf('not-found');
            showDefaultVariant(testId, false);
          }
        }
      }
    } else {
      showDefaultVariants();
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // Set all the important variables
  /////////////////////////////////////////////////////////////////////////////

  window.pageBuilder.initVariants = function(opts) {
    opts = opts || {};
    TIMEOUT = opts['TIMEOUT'];
    BANDITO_IS_ADMIN = opts['IS_ADMIN'];
    BANDITO_PERF_API = opts['PERF_API'];
    BANDITO_TESTS_API = opts['TESTS_API'];
    BANDITO_EVENTS_API = opts['EVENTS_API'];
  };

  /////////////////////////////////////////////////////////////////////////////
  // Overwrite PB's default/naive implementation
  /////////////////////////////////////////////////////////////////////////////

  window.pageBuilder.showVariants = function() {
    if (BANDITO_IS_ADMIN) {
      return;
    }

    // Query Bandito Test API to get current variant for each test
    var tests = [];
    for (var id in window._variantFeatureIds) {
      if (window._variantFeatureIds.hasOwnProperty(id)) {
        // Collect the list of test IDs.
        var testId = window._variantFeatureIds[id];
        testIdToFeatureId[testId] = id;
        tests.push(testId);
      }
    }

    // Now, call the Bandito API to get current variant of each
    var url = BANDITO_TESTS_API + '?ids=' + tests.join(',');
    ajax(url, loadVariants, showDefaultVariants);
  };
})();
/*
 *  Determines if an element is in view or not.
 *  Returns: Boolean
 *  Parameters:
 *      - element: jquery element to test
 *      - percentY: percent of element considered in view vertically
 *      - percentX: percent of element considered in view horizontally
 *  Usage:
 *      - inView($('#myDiv')[0]);
 *      - inView($('#myDiv')[0], 50);
 *      - inView($('#myDiv')[0], 50, 50);
 */
function inView(element, percentY, percentX) {

  percentY = percentY || 0.01;
  percentX = percentX || 0.01;

  // Get the vertical positions
  var viewPortYOffset = window.pageYOffset; // Current page scroll Y offset
  var viewPortHeight  = window.innerHeight; // Height of the viewport
  var elementYOffset  = $(element).offset().top; // Fixed Y position of the page
  var elementHeight   = $(element).height(); // Height of element

  // Calculate the top and bottom overlap
  var topDifference   = elementYOffset - viewPortYOffset;
  var bottomDifference= (elementYOffset+elementHeight) - (viewPortYOffset+viewPortHeight);
  var topOverlap      = (topDifference < 0) ? Math.abs(topDifference) : 0;
  var bottomOverlap   = (bottomDifference > 0) ? Math.abs(bottomDifference) : 0;

  // Visibility is inverse of Overlap
  var totalVisibleY   = elementHeight - (topOverlap + bottomOverlap);


  // Get the horizontal positions
  var viewPortXOffset = window.pageXOffset; // Current page scroll X offset
  var viewPortWidth   = window.innerWidth; // Width of the viewport
  var elementXOffset  = $(element).offset().left; // Fixed X position of the page
  var elementWidth    = $(element).width(); // Width of element

  // Calculate the left and right overlap
  var leftDifference  = elementXOffset - viewPortXOffset;
  var rightDifference = (elementXOffset+elementWidth) - (viewPortXOffset+viewPortWidth);
  var leftOverlap     = (leftDifference < 0) ? Math.abs(leftDifference) : 0;
  var rightOverlap    = (rightDifference > 0) ? Math.abs(rightDifference) : 0;

  // Visibility is inverse of Overlap
  var totalVisibleX   = elementWidth - (leftOverlap + rightOverlap);

  return ( ( (totalVisibleY * 100 / elementHeight) >= percentY ) && ( (totalVisibleX * 100 / elementWidth) >= percentX ) );
};

// browser detect
var browserDetect = {
  init: function() {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function(data) {
    for (var i = 0; i < data.length; i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
      } else if (dataProp) return data[i].identity;
    }
  },
  searchVersion: function(dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [{
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
  }, {
    string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
  }, {
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
  }, {
    prop: window.opera,
    identity: "Opera",
    versionSearch: "Version"
  }, {
    string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
  }, {
    string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
  }, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
  }, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
  }, { // for newer Netscapes (6+)
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
  }, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
  }, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
  }, { // for older Netscapes (4-)
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
  }],
  dataOS: [{
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
  }, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
  }, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
  }, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
  }]

};
browserDetect.init();

// Mobile detection
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    AndroidOld: function () {
        return navigator.userAgent.match(/Android 2.3.3/i) ? true : false;
    },
    AndroidTablet: function () {
        return (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i))? true : false;
    },
    Kindle: function () {
        return navigator.userAgent.match(/Kindle/i) ? true : false;
    },
    KindleFire: function () {
        return navigator.userAgent.match(/KFOT/i) ? true : false;
    },
    Silk: function () {
        return navigator.userAgent.match(/Silk/i) ? true : false;
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    iPhone: function () {
        return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
    },
    iPad: function () {
        return navigator.userAgent.match(/iPad/i) ? true : false;
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    FirefoxOS: function () {
        return (navigator.userAgent.match(/Mozilla/i) && navigator.userAgent.match(/Mobile/i)) ? true : false;
    },
    Safari: function () {
        return navigator.userAgent.match(/Version\/[\d\.]+.*Safari/) ? true : false;
    },
    Retina: function () {
        return (window.retina || window.devicePixelRatio > 1) ? true : false
    },
    any: function () {
        return (isMobile.Android() || isMobile.Kindle() || isMobile.KindleFire() || isMobile.Silk() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows() || isMobile.FirefoxOS());
    },
    all: function () {
        return (navigator.userAgent);
    },
    tablet: function () {
  return (isMobile.AndroidTablet() || isMobile.iPad() || isMobile.Kindle() || isMobile.KindleFire() || isMobile.Silk());
    }
};


// Mobile global var
var mobile_browser = isMobile.any() ? 1 : 0,
        iphone_browser = isMobile.iPhone() ? 1 : 0,
        ipad_browser = isMobile.iPad() ? 1 : 0,
        android_browser = isMobile.Android() ? 1 : 0,
        android233_browser = isMobile.AndroidOld() ? 1 : 0,
        kindle_browser = isMobile.Kindle() ? 1 : 0,
        retina_browser = isMobile.Retina() ? 1: 0,
  mobile_tablet = isMobile.tablet() ? 1: 0;

//end of mobile detection

// Globally initialize all video player functionality
var youtubePlayers = {}
var playing = false;
onYouTubeIframeAPIReady = function() {
  $(".video-wrapper-youtube").each(function(index){
        var vid = $(this).attr("data-videoId");
        var auto = $(this).attr("data-autoplay");
        var vidAttr = 'youtube-id-' + vid;
        youtubePlayers[vid] = new YT.Player(vidAttr, {
            height: '349',
            width: '560',
            videoId: vid,
            playerVars: {
                autoplay: auto,
                modestbranding: 1
            },
            events: {
                'onStateChange': youtubeVideoLabelHide,
                'onReady': onPlayerReady
            }
        });
    });
}

function onPlayerReady(event) {
  $("label").on('click',function() {
    var labelId = $(this).data("youtubeid")
    for (var prop in youtubePlayers) {
      if (labelId === prop){
        youtubePlayers[prop].playVideo();
      }
    }
  });
}

youtubeVideoLabelHide = function(event) {
    var $vidLabel = $(event.target.c.offsetParent).siblings("label.overlay");
    var $childLabel = $(event.target.c.offsetParent).children("label.overlay");
    if (event.data == 1) {
        $vidLabel.fadeOut({duration: 400});
        $childLabel.fadeOut({duration: 400});

    }
}

var vimeoPlayers = {};
$(".video-wrapper-vimeo").each(function(){
  var iframe = $(this).children('iframe')[0];
  var iframeId = $(iframe).data("vimeoid")
  // $f == Froogaloop vimeo library
  vimeoPlayers[iframeId] = iframe;
  $f(iframe).addEvent('ready', function() {
    $("label").on('click',function() {
      var labelId = $(this).data("vimeoid")
      for (var iframeId in vimeoPlayers) {
        if (labelId == iframeId){
          $f(vimeoPlayers[iframeId]).api("play");
        }
      }
      $(this).fadeOut({duration: 400});
    });
  });
});

// add border to ad iframes
setTimeout(function(){
  $("iframe").each(function(){
    var parentDiv = $(this).parent().parent()[0];
    if($(parentDiv).hasClass("pb-ad-container")){
      $(this).css("border", "1px solid #3A3A3A")
    }
  })
}, 1000);

// module for string parser helpers to be built upon as needed
var stringParsers = (function(){
  var getUrlParam = function(paramStr, urlStr){
      var results = new RegExp('[\?&]' + paramStr + '=([^&#]*)').exec(urlStr);
      return {
        results: results ? results : null,
        value: results ? results[1] : null,
        matchStr: results ? results[0] : null
      };
    };
  return {
    getUrlParam: getUrlParam
  };
})();

//build and add ref_page_element for DAX
var refPageElementsUtils = {
  helper : {
      buildElement : function(fieldsArray) {
        var ref_page_element = "";
        //add all fields in given order
        $.each(fieldsArray, function() {
          if (ref_page_element != "") {
            ref_page_element += ":";
          }
          ref_page_element += this;
        });

        //cleanup string: all lowercase, remove all but a-z, 0-9, :
        ref_page_element = ref_page_element.toLowerCase().replace(/[^a-z0-9:]/g,'');
        return ref_page_element
      },
      addElementA : function($refElement, refPageString) {
        // check to see if the referring element is an <a>
        if ($refElement.is('a')){
          $refElement.attr('data-ref-page-element', refPageString);
        // if the refElement isn't an <a>, find the <a> tags within it
        } else {
          $refElement.find('a').each(function() {
            var $a = $(this);
            $a.attr('data-ref-page-element', refPageString);
          });
        }
      },
      addElementOther : function($refElement, refPageString) {
        $refElement.each(function() {
          var $other = $(this);
          $other.attr('data-ref-page-element', refPageString);
        });
      },
      buildAndAddElement : function($refElement, fieldsArray, notATag) {
        if ($refElement && $refElement.length > 0) {
          if(notATag) {
            refPageElementsUtils.helper.addElementOther($refElement, refPageElementsUtils.helper.buildElement(fieldsArray));
          } else {
            refPageElementsUtils.helper.addElementA($refElement, refPageElementsUtils.helper.buildElement(fieldsArray));
          }
        }
      }
  },
  getPageType : function() {
    var pageType = "";
    if(window.location.href.indexOf('headlines.cfm') >= 0) {
      pageType = "hdl";
    } else if(window.location.href.indexOf('article.cfm') >= 0) {
      pageType = "art";
    } else if(window.location.href.indexOf('video.cfm') >= 0 || window.location.href.indexOf("type=video") >= 0) {
      pageType = "vid";
    } else if(window.location.href.indexOf('image.cfm') >= 0) {
      pageType = "gal";
    } else if(window.location.href.indexOf('star-signs.cfm') >= 0 || window.location.href.indexOf('/horoscope/') >= 0) {
      pageType = "horo";
    } else if(window.location.href.indexOf('/weather/') >= 0 || window.location.href.indexOf('/weather-home/') >= 0) {
      pageType = "wthr";
    } else if(window.location.href.indexOf('/profile/') >= 0 ) {
        pageType = "profile";
    } else if($("meta[name='pageType']").attr('content') == "homepage" || $("meta[name='page_type']").attr('content') == "homepage") {
      pageType = "hme";
    } else {
      pageType = "othr";
    }
    return pageType
  },
  generateNav : function(pageType) {
    var pageplacement = "nav",
    navLvl = 1,
    $nav = $('#nav');

    //site-logo feature
    refPageElementsUtils.helper.buildAndAddElement($nav.find('.pb-f-navigation-site-logo'), [pageType, pageplacement, navLvl, 'home']);
    refPageElementsUtils.helper.buildAndAddElement($('.pb-f-global-nzme-header-bar .home-logo'), [pageType, pageplacement, navLvl, 'home']);

    //search-bar
    if($nav.find('.pb-f-search-search-bar').length > 0) {
      var widget = 'searchbar';
      refPageElementsUtils.helper.buildAndAddElement($nav.find('.pb-f-search-search-bar').find('form'), [pageType, pageplacement, navLvl, 'search'],true);
    }

    //my-news feature
    $nav.find('.pb-f-navigation-my-news .user-profile a, .premium-sub a').each(function () {
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, navLvl, $(this).data('nav-id')]);
    });

    //menu feature
    $nav.find('.pb-f-navigation-menu').each(function() {
      var primaryNavIndex = 0,
          primaryNavMap = {};

      $(this).find('.header a[href!="#"]').each(function() {
        refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, 0, $(this).text()]);
      });

      $(this).find('.primary-nav-item').each(function() {
        var $this = $(this);
        primaryNavIndex = primaryNavIndex + 1;

        var section = $this.data('nav-id');
        refPageElementsUtils.helper.buildAndAddElement($this, [pageType, pageplacement, navLvl, section, primaryNavIndex]);
      });

      var secondaryNavIndex = 0,
          section = "";
      $(this).find('.secondary-nav-item').each(function() {
        var $this = $(this);
        secondaryNavIndex = secondaryNavIndex + 1;

        if(section != $this.data('nav-id')) {
          section = $this.data('nav-id');
          secondaryNavIndex = 1;
        }
        refPageElementsUtils.helper.buildAndAddElement($this, [pageType, pageplacement, (navLvl + 1), section, secondaryNavIndex]);
      });

      //tertiary nav
      var tertiaryNavIndex = 0;
      $(this).find('.tertiary-nav-item ').each(function() {
        tertiaryNavIndex = tertiaryNavIndex + 1;
        refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, (navLvl + 2), $(this).data('nav-id'), tertiaryNavIndex]);
      });
    });

    //trending-topics feature
    var trendingTopicsIndex = 0;
    $nav.find('.pb-f-global-trending-topics .list-link').each(function() {
      trendingTopicsIndex = trendingTopicsIndex + 1;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, navLvl, 'trending', trendingTopicsIndex]);
    });

    //flex feature
    var flexIndex = 0;
    $nav.find('.pb-f-homepage-story').each(function() {
      flexIndex = flexIndex + 1;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, navLvl, 'content', flexIndex]);
    });

    //company-links feature
    var companyLinksIndex = 0;
    $nav.find('.pb-f-navigation-company-links .list-link').each(function() {
      companyLinksIndex = companyLinksIndex + 1;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, navLvl, 'about', companyLinksIndex]);
    });

    //horizontal tertiary nav
    var horTertiaryNavIndex = 0;
    $('.horizontal-tertiary-nav a').each(function() {
      horTertiaryNavIndex = horTertiaryNavIndex + 1;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, (navLvl + 2), $(this).text(), horTertiaryNavIndex]);
    });
  },
  generateBars : function(pageType) {
    var pageplacement = 'full',
    widgetplacement = 1,
    positioninwidget = 1;

    //nzme-header-bar
    if($('.pb-f-global-nzme-header-bar').length > 0) {
      var widget = 'nzmeheaderbar';
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-global-nzme-header-bar #prev'), [pageType, pageplacement, widget, widgetplacement, positioninwidget]);
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-global-nzme-header-bar #next'),[pageType, pageplacement, widget, widgetplacement, positioninwidget+1]);
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-global-nzme-header-bar .logo'),[pageType, pageplacement, widget, 'logo']);
    }

    //breaking-news-bar
    if($('.pb-f-bars-breaking-news-bar').length > 0) {
      var widget = 'breakingnewsbar';
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-bars-breaking-news-bar'), [pageType, pageplacement, widget, widgetplacement, positioninwidget]);
    }

    //event-bar
    if($('.pb-f-bars-event-bar').length > 0) {
      var widget = 'eventbar';
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-bars-event-bar'), [pageType, pageplacement, widget, widgetplacement, positioninwidget]);
    }

    //sports-bar
    if($('.pb-f-bars-sports-bar').length > 0) {
      var widget = 'livescoring';
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-bars-sports-bar'), [pageType, pageplacement, widget, widgetplacement, positioninwidget]);
    }

    //sponsored-story-bar
    if($('.pb-f-bars-sponsored-story-bar').length > 0) {
      var widget = 'sponsoredstorybar';
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-bars-sponsored-story-bar'), [pageType, pageplacement, widget, widgetplacement, positioninwidget]);
    }

    //search-bar
    if($('#main .pb-f-search-search-bar').length > 0) {
      var widget = 'searchbar';
      refPageElementsUtils.helper.buildAndAddElement($('#main .pb-f-search-search-bar').find('form'), [pageType, pageplacement, widget, widgetplacement, positioninwidget],true);
    }
  },
  generateHomepage : function(pageType) {
    var chainIndex = 0;
    $('#pb-root .pb-chain').each(function() {
      var $chain = $(this),
          chainType = ""; //widget

      //read chain-name
      $.each($chain.attr("class").split(' '), function() {
        if (this.startsWith('pb-c-')) {
          chainType = this.substring(5);
          return true;
        }
      });

      //set global chain index
      chainIndex = chainIndex+1; //widgetplacement
      var featureIndex = 0, //positioninwidget
          chainContentPosition = ""; //pageplacement

      //find the ad in chain for pageplacement
      $.each($chain.find('.pb-feature'), function(index) {
        var $feature = $(this);
        if ($feature.hasClass('pb-f-ads-ad')) {
          if (index == 0) {
            chainContentPosition = "right";
          } else {
            chainContentPosition = "left";
          }
        }
      });
      if (chainContentPosition == "") {
        chainContentPosition = "full";
      }

      //attach ref_page_element to flex-feature, flex-feature-feed and hero
      $.each($chain.find('.pb-feature'), function(index) {
        var $feature = $(this);
        // 4/11 — filter the item out if it's a native-ad container
        if ($feature.is('.pb-f-homepage-story, .pb-f-homepage-hero')
        && !$feature.parents('.pb-f-ads-native-ad').length > 0) {
          featureIndex = featureIndex+1;
          if (chainType == 'slider-chain'){
            $slickIndex = $(this).parent().data('slick-index');
            featureIndex = $slickIndex+1;
          }
          refPageElementsUtils.helper.buildAndAddElement($feature, [pageType, chainContentPosition, chainType, chainIndex, featureIndex]);
        } else if ($feature.is('.pb-f-homepage-story-feed')) {
          $.each($feature.find('.flex-item'), function() {
            featureIndex = featureIndex+1;
            if (chainType == 'slider-chain'){
              $slickIndex = $(this).parent().data('slick-index');
              featureIndex = $slickIndex+1;
            }
            refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, chainContentPosition, chainType, chainIndex, featureIndex]);
          })
        }
      });
    });
    // 4/13 add support for hero features that _aren't_ in a chain
    var $main = $("#main").children('div');
    var heroPlacement = 0;
    $.each($main, function(){
      if ($(this).hasClass('pb-f-homepage-hero')) {
        var currentHero = $(this);
        // set heroType to determine if it's a hero large or hero super
        var heroType = $(this).children('.story-hero')[0]
        heroType = $(heroType).hasClass("hero-super") ? 'herosuper' : 'herolarge';
        heroPlacement = heroPlacement+1;
        refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, 'full', heroType, heroPlacement, 1]);
      } else if ($(this).hasClass('pb-chain')){
        heroPlacement = heroPlacement+1;
      }
    })
    // // 4/13: add correct naming conventions for horoscopes
    if ($('.pb-f-global-horoscope-slider').length > 0){
      var signIndex = 0,
      cloneIndex = 1;
      // set $horoSlider eq to each item
      var $horoSlider = $('.pb-f-global-horoscope-slider .item .sign-box');
      // loop through all horoSlider values (all elems with .sign-box)
      $horoSlider.each(function(){
        var $icon = $(this);
        // for each icon in the sign-box
        $icon.each(function(){
          // get the sign value from the href of the a
          var sign = $icon.children('a')[0];
          var $sign = $(sign).attr('href').split('/horoscope/')[1];
          // generate the ref_page_element as horo:full:horoslider:[signname]
          refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, 'full', 'horoslider', $sign]);
        });
      })
    }

    // Latest From header
    var latestFromIndex = 0;
    $('.latest-from-container').each(function() {
      latestFromIndex++;
      $(this).find('a').each(function() {
        refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, 'full', 'latestfromheader', $(this).text(), latestFromIndex]);
      });
    });

    // brand logos
    var brandIndex = 0;
    $('.brand-image').each(function() {
      brandIndex++;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, 'full', 'brandlogo', brandIndex]);
    });

  },
  generateWeatherPage : function(pageType) {
    var pageplacement = 'full';

    //Code not ready to be added for weather-grid, should come at some point. To be added here.

    var widget = 'related',
      relatedIndex = 0; //widgetplacement
    $('#pb-root .pb-c-triple-large-image').each(function() {
      var $chain = $(this),
          featureIndex = 0; //positioninwidget
      relatedIndex = relatedIndex+1;
      $.each($chain.find('.pb-feature'), function(index) {
        var $feature = $(this);
        if ($feature.is('.pb-f-homepage-story')) {
          featureIndex = featureIndex+1;
          refPageElementsUtils.helper.buildAndAddElement($feature, [pageType, pageplacement, widget, relatedIndex, featureIndex]);
        } else if ($feature.is('.pb-f-homepage-story-feed')) {
          $.each($feature.find('.flex-item'), function() {
            featureIndex = featureIndex+1;
            refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, widget, relatedIndex, featureIndex]);
          });
        }
      });
    });
  },
  generateVideoGalleryPage : function(pageType) {
    var chainContentPosition = 'full', //pageplacement
    chainType = 'related', //widget
    chainIndex = 0; //widgetplacement

    //breadcrumb
    if ($('.pb-f-article-header .header-label').length > 0) {
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-article-header .header-label'), [pageType, chainContentPosition, 'breadcrumb', chainIndex, '1']);
    }

    $('#pb-root .pb-chain').each(function() {
      var $chain = $(this),
      chainTypePb = '' //pagebuilder chain type
      $.each($chain.attr("class").split(' '), function() {
        if (this.startsWith('pb-c-')) {
          chainTypePb = this.substring(5);
          return true;
        }
      });

      //exclude content
      if (!$chain.is('.pb-c-standard-page-chain, .pb-c-rail-chain, .pb-c-list-chain, .pb-c-video-header-chain')) {
        var featureIndex = 0; //positioninwidget
        chainIndex = chainIndex+1;

        //attach ref_page_element to flex-feature
        $.each($chain.find('.pb-feature'), function(index) {
          var $feature = $(this);
          if ($feature.is('.pb-f-homepage-story')) {
            featureIndex = featureIndex+1;
            if (chainTypePb == 'slider-chain'){
              $slickIndex = $(this).parent().data('slick-index');
              featureIndex = $slickIndex+1;
            }
            refPageElementsUtils.helper.buildAndAddElement($feature, [pageType, chainContentPosition, chainType, chainIndex, featureIndex]);
          } else if ($feature.is('.pb-f-homepage-story-feed')) {
            $.each($feature.find('.flex-item'), function() {
              featureIndex = featureIndex+1;
              if (chainTypePb == 'slider-chain'){
                $slickIndex = $(this).parent().data('slick-index');
                featureIndex = $slickIndex+1;
              }
              refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, chainContentPosition, chainType, chainIndex, featureIndex]);
            })
          }
        });
      }
    });
  },
  generateArticlePage : function(pageType) {
    var pageplacement = 'header',
    widgetplacement = 0;

    //breadcrumb
    if ($('.pb-f-article-header .header-label').length > 0) {
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-article-header .header-label'), [pageType, pageplacement, 'breadcrumb', widgetplacement, '1']);
    }

    pageplacement = 'body';

    //author
    if ($('.pb-f-article-slimline-byline .has-author').length > 0) {
      widgetplacement = widgetplacement+1;
      refPageElementsUtils.helper.buildAndAddElement($('.pb-f-article-slimline-byline .has-author'), [pageType, pageplacement, 'author', widgetplacement, '1']);
    }

    //inline related articles
    if($('.pb-f-article-related-articles .related-articles-container').length > 0) {
      var relArticleIndex = 0; //positioninwidget
      widgetplacement = widgetplacement+1;
      $('.pb-f-article-related-articles .related-articles-container').each(function() {
        relArticleIndex = relArticleIndex+1;
        refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, 'related', widgetplacement, relArticleIndex]);
      });
    }

    pageplacement = 'full';
    //all chains
    var chainMap = {};
    $('#pb-root .pb-chain').each(function() {
      var $chain = $(this),
          chainType = ""; //widget

      //exclude article body and right rail
      if(!$chain.is('.pb-c-rail-chain, .pb-c-list-chain')) {
      //read chain-name
        $.each($chain.attr("class").split(' '), function() {
          if (this.startsWith('pb-c-')) {
            chainType = this.substring(5);
            return true;
          }
        });

        var featureIndex = 0; //positioninwidget
        widgetplacement = widgetplacement+1;

        //attach ref_page_element to flex-feature, flex-feature-feed
        $.each($chain.find('.pb-feature'), function(index) {
          var $feature = $(this);
          if ($feature.is('.pb-f-homepage-story')) {
            featureIndex = featureIndex+1;
            if (chainType == 'slider-chain'){
              $slickIndex = $(this).parent().data('slick-index');
              featureIndex = $slickIndex+1;
            }
            refPageElementsUtils.helper.buildAndAddElement($feature, [pageType, pageplacement, chainType, widgetplacement, featureIndex]);
          } else if ($feature.is('.pb-f-homepage-story-feed')) {
            $.each($feature.find('.flex-item'), function() {
              featureIndex = featureIndex+1;
              if (chainType == 'slider-chain'){
                $slickIndex = $(this).parent().data('slick-index');
                featureIndex = $slickIndex+1;
              }
              refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, chainType, widgetplacement, featureIndex]);
            })
          }
        });
      }
    });
  },
  generateRighRail : function(pageType) {
    var pageplacement = 'right';

    var featureIndex = 0; //widgetplacement
    $('.pb-c-rail-chain .pb-feature').each(function() {
      var $feature = $(this);
      featureIndex = featureIndex + 1;

      //trending
      if($feature.is('.pb-f-global-trending-topics')) {
        var featureLinkIndex = 0; //positioninwidget
        $feature.find('.list-link').each(function() {
          var widget = 'trending';
          featureLinkIndex = featureLinkIndex + 1;
          refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, widget, featureIndex, featureLinkIndex]);
        });
      }

      //latest-news
      if($feature.is('.pb-f-global-latest-news')) {
        var featureLinkIndex = 0; //positioninwidget
        $feature.find('#latest-list .story-preview-wrapper').each(function() {
          var widget = 'latestlist';
          featureLinkIndex = featureLinkIndex + 1;
          refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, widget, featureIndex, featureLinkIndex]);
        });

        featureLinkIndex = 0; //positioninwidget
        $feature.find('#most-read-list .story-preview-wrapper').each(function() {
          var widget = 'mostreadlist';
          featureLinkIndex = featureLinkIndex + 1;
          refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, widget, featureIndex, featureLinkIndex]);
        });
      }

      //right-hand-column-module
      if($feature.is('.pb-f-global-right-hand-column-module')) {
        var featureLinkIndex = 0; //positioninwidget
        $feature.find('.story-preview-wrapper').each(function() {
          var widget = 'righthandcm';
          featureLinkIndex = featureLinkIndex + 1;
          refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, pageplacement, widget, featureIndex, featureLinkIndex]);
        });
      }
    });
  },
  generateFooter : function(pageType) {
    var linkIndex = 0;
    $('.pb-f-global-footer .list-link').each(function() {
      linkIndex = linkIndex+1;
      refPageElementsUtils.helper.buildAndAddElement($(this), [pageType, 'full', 'footer', '1', linkIndex]);
    });
  },

  init : function() {

    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      };
    }

    var pageId = refPageElementsUtils.getPageType();

    //nav - all pages
    refPageElementsUtils.generateNav(pageId);

    //bars - all pages
    refPageElementsUtils.generateBars(pageId);

    //homepage/headline only
    if (pageId == 'hdl' || pageId == 'hme' || pageId == 'horo' || pageId == 'othr') {
      refPageElementsUtils.generateHomepage(pageId);
    }

    //weather page only
    if (pageId == 'wthr' || pageId == 'othr') {
      refPageElementsUtils.generateWeatherPage(pageId);
    }

    //video or gal page only
    if (pageId == 'vid' || pageId == 'gal' || pageId == 'othr') {
      refPageElementsUtils.generateVideoGalleryPage(pageId);
    }

    //article page only
    if (pageId == 'art' || pageId == 'othr') {
      refPageElementsUtils.generateArticlePage(pageId);
    }

    //right-rail on availability
    if ($('.pb-c-rail-chain').length > 0) {
      refPageElementsUtils.generateRighRail(pageId);
    }

    //footer on availability
    if($('.pb-f-global-footer').length > 0) {
      refPageElementsUtils.generateFooter(pageId);
    }
  }
}


var checkOptaTag = function() {
  // Load Opta v2 plugin when needed
  if ($('opta').length > 0 ) {
    if (typeof jqOpta === 'undefined') {
    	var optaV2BaseUrl = window.location.protocol == 'https:' ? 'https://secure.widget.cloud.opta.net/2.0/' : 'http://widget.cloud.opta.net/2.0/';
      $.getScript(optaV2BaseUrl + 'js/widgets.opta.js', function(data, textStatus) {
        $('head').append($("<link rel='stylesheet' href='" + optaV2BaseUrl + "css/widgets.opta.css' type='text/css' media='screen' />" +
                            "<link rel='stylesheet' href='/pb/resources/styles/opta/optaSkinArc.css' type='text/css' media='screen' />"));
      });
    }
  }

  // Load Opta v3 plugin when needed
  if ($('opta-widget').length > 0) {
    if (typeof Opta === 'undefined') {
      var optaBaseUrl = window.location.protocol == 'https:' ? 'https://secure.widget.cloud.opta.net/v3/' : 'http://widget.cloud.opta.net/v3/';
    	$.getScript(optaBaseUrl + 'v3.opta-widgets.js', function(data, textStatus) {
        if (isMobile.any())
          $('head').append('<link rel="stylesheet" href="' + optaBaseUrl + 'css/v3-mobile.all.opta-widgets.css">');
        else
          $('head').append('<link rel="stylesheet" href="' + optaBaseUrl + 'css/v3.all.opta-widgets.css">');

        $('head').append('<link rel="stylesheet" href="/pb/resources/styles/opta/opta-v3-styles.css?_=20171011">');
    	});
    }
  }
};


var pageContext = {

    init : function() {},

    getPageType : function() {

        var pageType = "";

        if (window.location.href.indexOf('headlines.cfm') >= 0) {
            pageType = "headline";
        } else if(window.location.href.indexOf('article.cfm') >= 0) {
            pageType = "article";
        } else if(window.location.href.indexOf('video.cfm') >= 0 || window.location.href.indexOf("type=video") >= 0) {
            pageType = "video";
        } else if(window.location.href.indexOf('image.cfm') >= 0) {
            pageType = "gallery";
        } else if(window.location.href.indexOf('star-signs.cfm') >= 0 || window.location.href.indexOf('/horoscope/') >= 0) {
            pageType = "horoscope";
        } else if(window.location.href.indexOf('/weather/') >= 0 || window.location.href.indexOf('/weather-home/') >= 0) {
            pageType = "weather";
        } else if($("meta[name='pageType']").attr('content') == "homepage" || $("meta[name='page_type']").attr('content') == "homepage") {
            pageType = "homepage";
        } else {
            pageType = "other";
        }

        return pageType;
    }
}

var geolocation = {

    init : function() {
        this.incrementUserArticleCount();
    },

    getUserLocation : function() {
        // Criteria for geolocation: article page, non-ios, broswer supports it, not fist article of day
        if (pageContext.getPageType() == 'article') {
            if (!isMobile.iOS() && navigator.geolocation && this.getUserArticleCount() > 1) {
                var options = {maximumAge:0, timeout:10000, enableHighAccuracy: true};

                navigator.geolocation.getCurrentPosition(this.getPosition, this.getPositionError, options);
            }
        }
    },

    getPosition : function(position) {
        myPage.setCookie('user_latitude', position.coords.latitude, 365);
        myPage.setCookie('user_longitude', position.coords.longitude, 365);
    },

    getPositionError : function(error) {
        if (error.code == error.TIMEOUT) {
            navigator.geolocation.getCurrentPosition(geolocation.getPosition);
        }
    },

    getUserArticleCount : function() {
        var sCookieVal = myPage.getCookie('daily_article_count');
        var articleCount = sCookieVal.length > 0 ? parseInt(sCookieVal) : 0;
        return articleCount;
    },

    incrementUserArticleCount : function() {
        if (pageContext.getPageType() == 'article') {
            var articleCount = this.getUserArticleCount();
            articleCount++;

            // Set up midnight UTC cookies expiry
            var dt = new Date();
            dt.setHours(23,59,59,59);
            var dtUTC = dt.toUTCString();

            // write the cookie
            document.cookie = "daily_article_count=" + articleCount + "; expires=" + dtUTC + "; path=/";
        }
    }
}

// Remove hairline for textlinks chains
var premiumArticleBorderFix = function (selector) {
  if (pageContext.getPageType() === 'headline' || pageContext.getPageType() === 'homepage' || pageContext.getPageType() === 'other') {
    var $wrapper = $(selector);

    $wrapper.each(function () {
      var $articles = $(this).find('article');

      // start: calculate the number of columns
      var cols = 1;
      var firstElemLeft = $articles.eq(0).offset().left;
      var prevElemLeft = firstElemLeft;

      for (var i = 1; i < 3; i++) {
        if( $articles.eq(i).length ){
          if($articles.eq(i).offset().left > prevElemLeft){
            cols++;
          }
          prevElemLeft = $articles.eq(i).offset().left;
        } else {
          break;
        }
      }
      // end: calculate the number of columns

      for (var i = 0; i < $articles.length; i++) {
        if ($articles.eq(i + cols).hasClass('premium')) {
          $articles
            .eq(i)
            .removeClass("border-bottom-hairline-top-table")
            .removeClass("border-bottom-hairline")
            .addClass("border-bottom-no-hairline-with-spacing");
        }
      }
    });
  }
};

// Opta v3 settings
var opta_settings = {
  subscription_id: 'c56f07609302de0a3ea1e40b313f24ae',
  timezone: 'Pacific/Auckland',
  load_when_visible: true
};

$(document).ready(function() {
  if(!pb_global.isAdmin) {
    refPageElementsUtils.init();

    geolocation.init();
    geolocation.getUserLocation();
  }

  function storeRefPageElement(refElement){

    try {
        var vpv = JSON.parse(localStorageWrapper.getItem('vpv'))

        if(vpv && refElement){
            localStorageWrapper.setItem('vpv', JSON.stringify(Object.assign(vpv, {ref_page_element: refElement})))
        }
    } catch(err){}
  }
  // Cookie to store the ref page element to be read on the following page load
  $(document).on('click', 'a,button', function(){
    var refElement = $(this).data('ref-page-element');
    gtm.clickTag(refElement, 'pv');
    storeRefPageElement(refElement);
  });

  // Check if Opta tag exist
  checkOptaTag();

  // Urban Airship Web Notify
  if(!pb_global.isAdmin && pageContext.getPageType() != 'article' && window.location.pathname.indexOf("/my-account/") == -1) {
    // Don't display in admin as it can cover some features & article pages as geolocation prompt will appear on them
    UA.then(function(sdk) {
      var wpnConfig = {
        'popupClosedCookieName'   : 'wpn_closed',
        'popupClosedCookieValue'  : 'true',
        'dismissedCookieName'     : 'wpn_dismissed',
        'dismissedCookieValue'    : 'true',
        'dismissedCookieExpiry'   : 21,
        'allowCookieName'         : 'wpn_allow',
        'allowCookieValue'        : 'true',
        'blockCookieName'         : 'wpn_block',
        'blockCookieValue'        : 'true',
        'wpnRegUrl'               : 'https://' + window.location.hostname + '/account/notifications/'
      };

      function wpnClosePop($wpnPop) {
        $('#wpnPop').removeClass('wpnShow');
        window.setTimeout(function() {
          $wpnPop.remove();
        }, 500);
      }

      if (
        sdk.isSupported &&
        myPage.getCookie(wpnConfig.popupClosedCookieName) !== wpnConfig.popupClosedCookieValue && // check if user has clicked the "x" close button in the current session
        myPage.getCookie(wpnConfig.dismissedCookieName) !== wpnConfig.dismissedCookieValue && // check if user has clicked the "Not Now" button in the past "dismissedCookieExpiry" days
        myPage.getCookie(wpnConfig.allowCookieName) !== wpnConfig.allowCookieValue && // check if the user has already allowed notifications
        myPage.getCookie(wpnConfig.blockCookieName) !== wpnConfig.blockCookieValue && // check if the user has blocked notifications
        sdk.permission !== "granted" &&
        sdk.permission !== "denied"
      ) {
        $('body').append('<div id="wpnPop" class="wpnPop"><div class="wpnClosePop"></div><div class="wpnTitle">Get News Updates</div><div class="wpnDesc">Get instant notifications as they happen</div><div class="wpnBtns"><div class="wpnBtnNotNow">Not Now</div><div class="wpnBtnEnable">Enable</div></div><div class="wpnFootNote">You can manage them anytime using browser settings</div></div>');

        // for transition
        window.setTimeout(function() {
          $('#wpnPop').addClass('wpnShow');
        }, 500);

        $('#wpnPop .wpnClosePop').click(function() {
          myPage.setCookie(wpnConfig.popupClosedCookieName, wpnConfig.popupClosedCookieValue);
          wpnClosePop($(this));
        });

        $('#wpnPop .wpnBtnNotNow').click(function() {
          myPage.setCookie(wpnConfig.dismissedCookieName, wpnConfig.dismissedCookieValue, wpnConfig.dismissedCookieExpiry);
          wpnClosePop($(this));
        });

        $('#wpnPop .wpnBtnEnable').click(function() {
          window.location = wpnConfig.wpnRegUrl;
        });
      }
    });
  }
});

;(function() {

  /////////////////////////////////////////////////////////////////////
  // User ID. See:
  // https://arcpublishing.atlassian.net/wiki/display/CD/Read+First
  /////////////////////////////////////////////////////////////////////

  function getUUID() {
    var uuid = localStorage.getItem("uuid");
    if (!uuid) {
      uuid = generateUUID();
      localStorage.setItem("uuid", uuid)
    }
    return uuid;
  }

  function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  /////////////////////////////////////////////////////////////////////
  // Send the pageview to Targeting
  /////////////////////////////////////////////////////////////////////

  // We use DOM ready to make sure theat this gets called after all the inline
  // scripts have been executed. Otherwise, if this code is at the top of the
  // HTML (say head), then `clavis` might be empty. This is IE9+ compatible.
  function domready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  };

  domready(function() {
    var clavis = window.clavis;

    if (clavis &&
        clavis.contentId &&
        clavis.contentId.length > 0 &&
        clavis.targetingUrl &&
        clavis.targetingUrl.length > 0
    ) {
      // Old school AJAX , no jQuery. IE9+.
      var request = new XMLHttpRequest();
      request.open('POST', clavis.targetingUrl, true);
      request.setRequestHeader('Content-Type', 'application/json');

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          localStorage.setItem("clavis.targeting", request.responseText);
        } else {
          // Log / Ignore
        }
      };

      request.send(JSON.stringify({
        "auxiliaries": clavis.auxiliaries,
        "articleid": "contentapi://" + clavis.contentId,
        "referrer": document.referrer,
        "userid": getUUID()
      }));
    }
  });
})();

;(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
    // smartresize 
    $.fn.smartresize = function(fn,threshold,execAsap){  
      return fn ? this.bind('resize', debounce(fn,threshold,execAsap)) : this.trigger(sr); 
    };

})(jQuery,'smartresize');
;(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
    // smartresize
    $.fn.smartscroll = function(fn,threshold,execAsap){
      return fn ? this.bind('scroll', debounce(fn,threshold,execAsap)) : this.trigger(sr);
    };

})(jQuery,'smartscroll');

/*
 * Responsively Lazy
 * http://ivopetkov.com/b/lazy-load-responsive-images/
 * Copyright 2015-2017, Ivo Petkov
 * Free to use under the MIT license.
 */

var responsivelyLazy = typeof responsivelyLazy !== 'undefined' ? responsivelyLazy : (function () {

    var hasWebPSupport = false;
    var windowWidth = null;
    var windowHeight = null;
    var hasIntersectionObserverSupport = typeof IntersectionObserver !== 'undefined';
    var mutationObserverIsDisabled = false;
    var doneElements = []; // elements that should never be updated again
    var vThreshold = 300; // how low below the fold we start loading
    var useDevicePixelRatio = false // used for whether we serv larger images for high pixel density screens

    var isVisible = function (element) {
        if (windowWidth === null) {
            return false;
        }
        var rect = element.getBoundingClientRect();
        var elementTop = rect.top;
        var elementLeft = rect.left;
        var elementWidth = rect.width;
        var elementHeight = rect.height;
        return elementTop < windowHeight + vThreshold && elementTop + elementHeight > 0 && elementLeft < windowWidth && elementLeft + elementWidth > 0;
    };

    var evalScripts = function (scripts, startIndex) {
        var scriptsCount = scripts.length;
        for (var i = startIndex; i < scriptsCount; i++) {
            var breakAfterThisScript = false;
            var script = scripts[i];
            var newScript = document.createElement('script');
            var type = script.getAttribute('type');
            if (type !== null) {
                newScript.setAttribute("type", type);
            }
            var src = script.getAttribute('src');
            if (src !== null) {
                newScript.setAttribute("src", src);
                if ((typeof script.async === 'undefined' || script.async === false) && i + 1 < scriptsCount) {
                    breakAfterThisScript = true;
                    newScript.addEventListener('load', function () {
                        evalScripts(scripts, i + 1);
                    });
                }
            }
            newScript.innerHTML = script.innerHTML;
            script.parentNode.insertBefore(newScript, script);
            script.parentNode.removeChild(script);
            if (breakAfterThisScript) {
                break;
            }
        }
    };

    var updateImage = function (container, element) {
        var options = element.getAttribute('data-srcset');
        if (options !== null) {
            options = options.trim();
            if (options.length > 0) {
                options = options.split(',');
                var temp = [];
                var optionsCount = options.length;
                for (var j = 0; j < optionsCount; j++) {
                    var option = options[j].trim();
                    if (option.length === 0) {
                        continue;
                    }
                    var spaceIndex = option.lastIndexOf(' ');
                    if (spaceIndex === -1) {
                        var optionImage = option;
                        var optionWidth = 999998;
                    } else {
                        var optionImage = option.substr(0, spaceIndex);
                        var optionWidth = parseInt(option.substr(spaceIndex + 1, option.length - spaceIndex - 2), 10);
                    }
                    var add = false;
                    if (optionImage.indexOf('.webp', optionImage.length - 5) !== -1) {
                        if (hasWebPSupport) {
                            add = true;
                        }
                    } else {
                        add = true;
                    }
                    if (add) {
                        temp.push([optionImage, optionWidth]);
                    }
                }
                temp.sort(function (a, b) {
                    if (a[1] < b[1]) {
                        return -1;
                    }
                    if (a[1] > b[1]) {
                        return 1;
                    }
                    if (a[1] === b[1]) {
                        if (b[0].indexOf('.webp', b[0].length - 5) !== -1) {
                            return 1;
                        }
                        if (a[0].indexOf('.webp', a[0].length - 5) !== -1) {
                            return -1;
                        }
                    }
                    return 0;
                });
                options = temp;
            } else {
                options = [];
            }
        } else {
            options = [];
        }


        var containerWidth = container.offsetWidth;
        if(useDevicePixelRatio){
          containerWidth = container.offsetWidth * (typeof window.devicePixelRatio !== 'undefined' ? window.devicePixelRatio : 1);
        }

        var bestSelectedOption = null;
        var biggestOption = null;
        var optionsCount = options.length;
        for (var j = 0; j < optionsCount; j++) {
            var optionData = options[j];

            // this is used as the option up to infinity container width
            biggestOption = optionData;

            if (optionData[1] >= containerWidth) {
                bestSelectedOption = optionData;
                break;
            }

        }

        if (bestSelectedOption === null && biggestOption != null) {
            bestSelectedOption = biggestOption;
        }

        if (typeof container.responsivelyLazyLastSetOption === 'undefined') {
            container.responsivelyLazyLastSetOption = ['', 0];
        }
        if (container.responsivelyLazyLastSetOption[1] < bestSelectedOption[1]) {
            container.responsivelyLazyLastSetOption = bestSelectedOption;
            var url = bestSelectedOption[0];
            if (typeof container.responsivelyLazyEventsAttached === 'undefined') {
                container.responsivelyLazyEventsAttached = true;
                element.addEventListener('load', function () {
                    var handler = container.getAttribute('data-onlazyload');
                    if (handler !== null) {
                        (new Function(handler).bind(container))();
                    }
                }, false);
                element.addEventListener('error', function () {
                    container.responsivelyLazyLastSetOption = ['', 0];
                }, false);
            }

            if (url !== element.getAttribute('src')) {
                // preload the image and pump into src attribute
                var preloaderImage = new Image();
                preloaderImage.src = url;

                preloaderImage.onload = function() {
                    element.classList.add("loading");
                    element.classList.add("loaded");
                    element.setAttribute('src', url);
                    // remove loading class so transition doesn't happen again on dom manipulation
                    setTimeout(function(){element.classList.remove("loading");}, 500);
                };
            }
        }
    };

    var updateWindowSize = function () {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    };

    var updateElement = function (element) {

        if (doneElements.indexOf(element) !== -1) {
            return;
        }

        if (!isVisible(element)) {
            return;
        }

        var lazyContent = element.getAttribute('data-lazycontent');
        if (lazyContent !== null) {
            doneElements.push(element);
            mutationObserverIsDisabled = true;
            element.innerHTML = lazyContent;
            var scripts = element.querySelectorAll('script');
            if (scripts.length > 0) {
                evalScripts(scripts, 0);
            }
            mutationObserverIsDisabled = false;
            return;
        }

        if (element.tagName.toLowerCase() === 'img') { // image with unknown height
            updateImage(element, element);
            return;
        }

        var imageElement = element.querySelector('img');
        if (imageElement !== null) { // image with parent container
            updateImage(element, imageElement);
            return;
        }

    };

    var run = function () {
        var elements = document.querySelectorAll('.responsively-lazy');
        var elementsCount = elements.length;
        for (var i = 0; i < elementsCount; i++) {
            updateElement(elements[i]);
        }
    };

    if (typeof window.addEventListener !== 'undefined' && typeof document.querySelectorAll !== 'undefined') {

        updateWindowSize();

        var image = new Image();
        image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEADMDOJaQAA3AA/uuuAAA=';
        image.onload = image.onerror = function () {
            hasWebPSupport = image.width === 2;

            var requestAnimationFrameFunction = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

            var hasChange = true;
            var runIfHasChange = function () {
                if (hasChange) {
                    hasChange = false;
                    run();
                }
                requestAnimationFrameFunction.call(null, runIfHasChange);
            };

            runIfHasChange();

            if (hasIntersectionObserverSupport) {

                var updateIntersectionObservers = function () {
                    var elements = document.querySelectorAll('.responsively-lazy');
                    var elementsCount = elements.length;
                    for (var i = 0; i < elementsCount; i++) {
                        var element = elements[i];
                        if (typeof element.responsivelyLazyObserverAttached === 'undefined') {
                            element.responsivelyLazyObserverAttached = true;
                            intersectionObserver.observe(element);
                        }
                    }
                };

                var intersectionObserver = new IntersectionObserver(function (entries) {
                    for (var i in entries) {
                        var entry = entries[i];
                        if (entry.intersectionRatio > 0) {
                            updateElement(entry.target);
                        }
                    }
                });

                var changeTimeout = null;

            }

            var setChanged = function () {
                if (hasIntersectionObserverSupport) {
                    window.clearTimeout(changeTimeout);
                    changeTimeout = window.setTimeout(function () {
                        hasChange = true;
                    }, 300);
                } else {
                    hasChange = true;
                }
            };

            var updateParentNodesScrollListeners = function () {
                var elements = document.querySelectorAll('.responsively-lazy');
                var elementsCount = elements.length;
                for (var i = 0; i < elementsCount; i++) {
                    var parentNode = elements[i].parentNode;
                    while (parentNode && parentNode.tagName.toLowerCase() !== 'html') {
                        if (typeof parentNode.responsivelyLazyScrollAttached === 'undefined') {
                            parentNode.responsivelyLazyScrollAttached = true;
                            parentNode.addEventListener('scroll', setChanged);
                        }
                        parentNode = parentNode.parentNode;
                    }
                }
            };

            var initialize = function () {
                window.addEventListener('resize', function () {
                    updateWindowSize();
                    setChanged();
                });
                window.addEventListener('scroll', setChanged);
                window.addEventListener('load', setChanged);
                if (hasIntersectionObserverSupport) {
                    updateIntersectionObservers();
                }
                updateParentNodesScrollListeners();
                if (typeof MutationObserver !== 'undefined') {
                    var observer = new MutationObserver(function () {
                        if (!mutationObserverIsDisabled) {
                            if (hasIntersectionObserverSupport) {
                                updateIntersectionObservers();
                            }
                            updateParentNodesScrollListeners();
                            setChanged();
                        }
                    });
                    observer.observe(document.querySelector('body'), {childList: true, subtree: true});
                }
            };
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initialize);
            } else {
                initialize();
            }
        };
    }

    return {
        'run': run,
        'isVisible': isVisible
    };

}());
