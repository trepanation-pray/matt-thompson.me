/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',$(this).attr('data-gravatar'));
  });
	}
} // end function
/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */

(function (window, document, $, undefined) {
  "use strict";

  var H = $("html"),
    W = $(window),
    D = $(document),
    F = $.fancybox = function () {
      F.open.apply( this, arguments );
    },
    IE =  navigator.userAgent.match(/msie/i),
    didUpdate = null,
    isTouch   = document.createTouch !== undefined,

    isQuery = function(obj) {
      return obj && obj.hasOwnProperty && obj instanceof $;
    },
    isString = function(str) {
      return str && $.type(str) === "string";
    },
    isPercentage = function(str) {
      return isString(str) && str.indexOf('%') > 0;
    },
    isScrollable = function(el) {
      return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
    },
    getScalar = function(orig, dim) {
      var value = parseInt(orig, 10) || 0;

      if (dim && isPercentage(orig)) {
        value = F.getViewport()[ dim ] / 100 * value;
      }

      return Math.ceil(value);
    },
    getValue = function(value, dim) {
      return getScalar(value, dim) + 'px';
    };

  $.extend(F, {
    // The current version of fancyBox
    version: '2.1.5',

    defaults: {
      padding : 15,
      margin  : 20,

      width     : 800,
      height    : 600,
      minWidth  : 100,
      minHeight : 100,
      maxWidth  : 9999,
      maxHeight : 9999,
      pixelRatio: 1, // Set to 2 for retina display support

      autoSize   : true,
      autoHeight : false,
      autoWidth  : false,

      autoResize  : true,
      autoCenter  : !isTouch,
      fitToView   : true,
      aspectRatio : false,
      topRatio    : 0.5,
      leftRatio   : 0.5,

      scrolling : 'auto', // 'auto', 'yes' or 'no'
      wrapCSS   : '',

      arrows     : true,
      closeBtn   : true,
      closeClick : false,
      nextClick  : false,
      mouseWheel : true,
      autoPlay   : false,
      playSpeed  : 3000,
      preload    : 3,
      modal      : false,
      loop       : true,

      ajax  : {
        dataType : 'html',
        headers  : { 'X-fancyBox': true }
      },
      iframe : {
        scrolling : 'auto',
        preload   : true
      },
      swf : {
        wmode: 'transparent',
        allowfullscreen   : 'true',
        allowscriptaccess : 'always'
      },

      keys  : {
        next : {
          13 : 'left', // enter
          34 : 'up',   // page down
          39 : 'left', // right arrow
          40 : 'up'    // down arrow
        },
        prev : {
          8  : 'right',  // backspace
          33 : 'down',   // page up
          37 : 'right',  // left arrow
          38 : 'down'    // up arrow
        },
        close  : [27], // escape key
        play   : [32], // space - start/stop slideshow
        toggle : [70]  // letter "f" - toggle fullscreen
      },

      direction : {
        next : 'left',
        prev : 'right'
      },

      scrollOutside  : true,

      // Override some properties
      index   : 0,
      type    : null,
      href    : null,
      content : null,
      title   : null,

      // HTML templates
      tpl: {
        wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image    : '<img class="fancybox-image" src="{href}" alt="" />',
        iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
        error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },

      // Properties for each animation type
      // Opening fancyBox
      openEffect  : 'fade', // 'elastic', 'fade' or 'none'
      openSpeed   : 250,
      openEasing  : 'swing',
      openOpacity : true,
      openMethod  : 'zoomIn',

      // Closing fancyBox
      closeEffect  : 'fade', // 'elastic', 'fade' or 'none'
      closeSpeed   : 250,
      closeEasing  : 'swing',
      closeOpacity : true,
      closeMethod  : 'zoomOut',

      // Changing next gallery item
      nextEffect : 'elastic', // 'elastic', 'fade' or 'none'
      nextSpeed  : 250,
      nextEasing : 'swing',
      nextMethod : 'changeIn',

      // Changing previous gallery item
      prevEffect : 'elastic', // 'elastic', 'fade' or 'none'
      prevSpeed  : 250,
      prevEasing : 'swing',
      prevMethod : 'changeOut',

      // Enable default helpers
      helpers : {
        overlay : true,
        title   : true
      },

      // Callbacks
      onCancel     : $.noop, // If canceling
      beforeLoad   : $.noop, // Before loading
      afterLoad    : $.noop, // After loading
      beforeShow   : $.noop, // Before changing in current item
      afterShow    : $.noop, // After opening
      beforeChange : $.noop, // Before changing gallery item
      beforeClose  : $.noop, // Before closing
      afterClose   : $.noop  // After closing
    },

    //Current state
    group    : {}, // Selected group
    opts     : {}, // Group options
    previous : null,  // Previous element
    coming   : null,  // Element being loaded
    current  : null,  // Currently loaded element
    isActive : false, // Is activated
    isOpen   : false, // Is currently open
    isOpened : false, // Have been fully opened at least once

    wrap  : null,
    skin  : null,
    outer : null,
    inner : null,

    player : {
      timer    : null,
      isActive : false
    },

    // Loaders
    ajaxLoad   : null,
    imgPreload : null,

    // Some collections
    transitions : {},
    helpers     : {},

    /*
     *  Static methods
     */

    open: function (group, opts) {
      if (!group) {
        return;
      }

      if (!$.isPlainObject(opts)) {
        opts = {};
      }

      // Close if already active
      if (false === F.close(true)) {
        return;
      }

      // Normalize group
      if (!$.isArray(group)) {
        group = isQuery(group) ? $(group).get() : [group];
      }

      // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
      $.each(group, function(i, element) {
        var obj = {},
          href,
          title,
          content,
          type,
          rez,
          hrefParts,
          selector;

        if ($.type(element) === "object") {
          // Check if is DOM element
          if (element.nodeType) {
            element = $(element);
          }

          if (isQuery(element)) {
            obj = {
              href    : element.data('fancybox-href') || element.attr('href'),
              title   : element.data('fancybox-title') || element.attr('title'),
              isDom   : true,
              element : element
            };

            if ($.metadata) {
              $.extend(true, obj, element.metadata());
            }

          } else {
            obj = element;
          }
        }

        href  = opts.href  || obj.href || (isString(element) ? element : null);
        title = opts.title !== undefined ? opts.title : obj.title || '';

        content = opts.content || obj.content;
        type    = content ? 'html' : (opts.type  || obj.type);

        if (!type && obj.isDom) {
          type = element.data('fancybox-type');

          if (!type) {
            rez  = element.prop('class').match(/fancybox\.(\w+)/);
            type = rez ? rez[1] : null;
          }
        }

        if (isString(href)) {
          // Try to guess the content type
          if (!type) {
            if (F.isImage(href)) {
              type = 'image';

            } else if (F.isSWF(href)) {
              type = 'swf';

            } else if (href.charAt(0) === '#') {
              type = 'inline';

            } else if (isString(element)) {
              type    = 'html';
              content = element;
            }
          }

          // Split url into two pieces with source url and content selector, e.g,
          // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
          if (type === 'ajax') {
            hrefParts = href.split(/\s+/, 2);
            href      = hrefParts.shift();
            selector  = hrefParts.shift();
          }
        }

        if (!content) {
          if (type === 'inline') {
            if (href) {
              content = $( isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

            } else if (obj.isDom) {
              content = element;
            }

          } else if (type === 'html') {
            content = href;

          } else if (!type && !href && obj.isDom) {
            type    = 'inline';
            content = element;
          }
        }

        $.extend(obj, {
          href     : href,
          type     : type,
          content  : content,
          title    : title,
          selector : selector
        });

        group[ i ] = obj;
      });

      // Extend the defaults
      F.opts = $.extend(true, {}, F.defaults, opts);

      // All options are merged recursive except keys
      if (opts.keys !== undefined) {
        F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
      }

      F.group = group;

      return F._start(F.opts.index);
    },

    // Cancel image loading or abort ajax request
    cancel: function () {
      var coming = F.coming;

      if (!coming || false === F.trigger('onCancel')) {
        return;
      }

      F.hideLoading();

      if (F.ajaxLoad) {
        F.ajaxLoad.abort();
      }

      F.ajaxLoad = null;

      if (F.imgPreload) {
        F.imgPreload.onload = F.imgPreload.onerror = null;
      }

      if (coming.wrap) {
        coming.wrap.stop(true, true).trigger('onReset').remove();
      }

      F.coming = null;

      // If the first item has been canceled, then clear everything
      if (!F.current) {
        F._afterZoomOut( coming );
      }
    },

    // Start closing animation if is open; remove immediately if opening/closing
    close: function (event) {
      F.cancel();

      if (false === F.trigger('beforeClose')) {
        return;
      }

      F.unbindEvents();

      if (!F.isActive) {
        return;
      }

      if (!F.isOpen || event === true) {
        $('.fancybox-wrap').stop(true).trigger('onReset').remove();

        F._afterZoomOut();

      } else {
        F.isOpen = F.isOpened = false;
        F.isClosing = true;

        $('.fancybox-item, .fancybox-nav').remove();

        F.wrap.stop(true, true).removeClass('fancybox-opened');

        F.transitions[ F.current.closeMethod ]();
      }
    },

    // Manage slideshow:
    //   $.fancybox.play(); - toggle slideshow
    //   $.fancybox.play( true ); - start
    //   $.fancybox.play( false ); - stop
    play: function ( action ) {
      var clear = function () {
          clearTimeout(F.player.timer);
        },
        set = function () {
          clear();

          if (F.current && F.player.isActive) {
            F.player.timer = setTimeout(F.next, F.current.playSpeed);
          }
        },
        stop = function () {
          clear();

          D.unbind('.player');

          F.player.isActive = false;

          F.trigger('onPlayEnd');
        },
        start = function () {
          if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
            F.player.isActive = true;

            D.bind({
              'onCancel.player beforeClose.player' : stop,
              'onUpdate.player'   : set,
              'beforeLoad.player' : clear
            });

            set();

            F.trigger('onPlayStart');
          }
        };

      if (action === true || (!F.player.isActive && action !== false)) {
        start();
      } else {
        stop();
      }
    },

    // Navigate to next gallery item
    next: function ( direction ) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.next;
        }

        F.jumpto(current.index + 1, direction, 'next');
      }
    },

    // Navigate to previous gallery item
    prev: function ( direction ) {
      var current = F.current;

      if (current) {
        if (!isString(direction)) {
          direction = current.direction.prev;
        }

        F.jumpto(current.index - 1, direction, 'prev');
      }
    },

    // Navigate to gallery item by index
    jumpto: function ( index, direction, router ) {
      var current = F.current;

      if (!current) {
        return;
      }

      index = getScalar(index);

      F.direction = direction || current.direction[ (index >= current.index ? 'next' : 'prev') ];
      F.router    = router || 'jumpto';

      if (current.loop) {
        if (index < 0) {
          index = current.group.length + (index % current.group.length);
        }

        index = index % current.group.length;
      }

      if (current.group[ index ] !== undefined) {
        F.cancel();

        F._start(index);
      }
    },

    // Center inside viewport and toggle position type to fixed or absolute if needed
    reposition: function (e, onlyAbsolute) {
      var current = F.current,
        wrap    = current ? current.wrap : null,
        pos;

      if (wrap) {
        pos = F._getPosition(onlyAbsolute);

        if (e && e.type === 'scroll') {
          delete pos.position;

          wrap.stop(true, true).animate(pos, 200);

        } else {
          wrap.css(pos);

          current.pos = $.extend({}, current.dim, pos);
        }
      }
    },

    update: function (e) {
      var type = (e && e.type),
        anyway = !type || type === 'orientationchange';

      if (anyway) {
        clearTimeout(didUpdate);

        didUpdate = null;
      }

      if (!F.isOpen || didUpdate) {
        return;
      }

      didUpdate = setTimeout(function() {
        var current = F.current;

        if (!current || F.isClosing) {
          return;
        }

        F.wrap.removeClass('fancybox-tmp');

        if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
          F._setDimension();
        }

        if (!(type === 'scroll' && current.canShrink)) {
          F.reposition(e);
        }

        F.trigger('onUpdate');

        didUpdate = null;

      }, (anyway && !isTouch ? 0 : 300));
    },

    // Shrink content to fit inside viewport or restore if resized
    toggle: function ( action ) {
      if (F.isOpen) {
        F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;

        // Help browser to restore document dimensions
        if (isTouch) {
          F.wrap.removeAttr('style').addClass('fancybox-tmp');

          F.trigger('onUpdate');
        }

        F.update();
      }
    },

    hideLoading: function () {
      D.unbind('.loading');

      $('#fancybox-loading').remove();
    },

    showLoading: function () {
      var el, viewport;

      F.hideLoading();

      el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');

      // If user will press the escape-button, the request will be canceled
      D.bind('keydown.loading', function(e) {
        if ((e.which || e.keyCode) === 27) {
          e.preventDefault();

          F.cancel();
        }
      });

      if (!F.defaults.fixed) {
        viewport = F.getViewport();

        el.css({
          position : 'absolute',
          top  : (viewport.h * 0.5) + viewport.y,
          left : (viewport.w * 0.5) + viewport.x
        });
      }
    },

    getViewport: function () {
      var locked = (F.current && F.current.locked) || false,
        rez    = {
          x: W.scrollLeft(),
          y: W.scrollTop()
        };

      if (locked) {
        rez.w = locked[0].clientWidth;
        rez.h = locked[0].clientHeight;

      } else {
        // See http://bugs.jquery.com/ticket/6724
        rez.w = isTouch && window.innerWidth  ? window.innerWidth  : W.width();
        rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
      }

      return rez;
    },

    // Unbind the keyboard / clicking actions
    unbindEvents: function () {
      if (F.wrap && isQuery(F.wrap)) {
        F.wrap.unbind('.fb');
      }

      D.unbind('.fb');
      W.unbind('.fb');
    },

    bindEvents: function () {
      var current = F.current,
        keys;

      if (!current) {
        return;
      }

      // Changing document height on iOS devices triggers a 'resize' event,
      // that can change document height... repeating infinitely
      W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);

      keys = current.keys;

      if (keys) {
        D.bind('keydown.fb', function (e) {
          var code   = e.which || e.keyCode,
            target = e.target || e.srcElement;

          // Skip esc key if loading, because showLoading will cancel preloading
          if (code === 27 && F.coming) {
            return false;
          }

          // Ignore key combinations and key events within form elements
          if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
            $.each(keys, function(i, val) {
              if (current.group.length > 1 && val[ code ] !== undefined) {
                F[ i ]( val[ code ] );

                e.preventDefault();
                return false;
              }

              if ($.inArray(code, val) > -1) {
                F[ i ] ();

                e.preventDefault();
                return false;
              }
            });
          }
        });
      }

      if ($.fn.mousewheel && current.mouseWheel) {
        F.wrap.bind('mousewheel.fb', function (e, delta, deltaX, deltaY) {
          var target = e.target || null,
            parent = $(target),
            canScroll = false;

          while (parent.length) {
            if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
              break;
            }

            canScroll = isScrollable( parent[0] );
            parent    = $(parent).parent();
          }

          if (delta !== 0 && !canScroll) {
            if (F.group.length > 1 && !current.canShrink) {
              if (deltaY > 0 || deltaX > 0) {
                F.prev( deltaY > 0 ? 'down' : 'left' );

              } else if (deltaY < 0 || deltaX < 0) {
                F.next( deltaY < 0 ? 'up' : 'right' );
              }

              e.preventDefault();
            }
          }
        });
      }
    },

    trigger: function (event, o) {
      var ret, obj = o || F.coming || F.current;

      if (!obj) {
        return;
      }

      if ($.isFunction( obj[event] )) {
        ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
      }

      if (ret === false) {
        return false;
      }

      if (obj.helpers) {
        $.each(obj.helpers, function (helper, opts) {
          if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
            F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
          }
        });
      }

      D.trigger(event);
    },

    isImage: function (str) {
      return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
    },

    isSWF: function (str) {
      return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
    },

    _start: function (index) {
      var coming = {},
        obj,
        href,
        type,
        margin,
        padding;

      index = getScalar( index );
      obj   = F.group[ index ] || null;

      if (!obj) {
        return false;
      }

      coming = $.extend(true, {}, F.opts, obj);

      // Convert margin and padding properties to array - top, right, bottom, left
      margin  = coming.margin;
      padding = coming.padding;

      if ($.type(margin) === 'number') {
        coming.margin = [margin, margin, margin, margin];
      }

      if ($.type(padding) === 'number') {
        coming.padding = [padding, padding, padding, padding];
      }

      // 'modal' propery is just a shortcut
      if (coming.modal) {
        $.extend(true, coming, {
          closeBtn   : false,
          closeClick : false,
          nextClick  : false,
          arrows     : false,
          mouseWheel : false,
          keys       : null,
          helpers: {
            overlay : {
              closeClick : false
            }
          }
        });
      }

      // 'autoSize' property is a shortcut, too
      if (coming.autoSize) {
        coming.autoWidth = coming.autoHeight = true;
      }

      if (coming.width === 'auto') {
        coming.autoWidth = true;
      }

      if (coming.height === 'auto') {
        coming.autoHeight = true;
      }

      /*
       * Add reference to the group, so it`s possible to access from callbacks, example:
       * afterLoad : function() {
       *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
       * }
       */

      coming.group  = F.group;
      coming.index  = index;

      // Give a chance for callback or helpers to update coming item (type, title, etc)
      F.coming = coming;

      if (false === F.trigger('beforeLoad')) {
        F.coming = null;

        return;
      }

      type = coming.type;
      href = coming.href;

      if (!type) {
        F.coming = null;

        //If we can not determine content type then drop silently or display next/prev item if looping through gallery
        if (F.current && F.router && F.router !== 'jumpto') {
          F.current.index = index;

          return F[ F.router ]( F.direction );
        }

        return false;
      }

      F.isActive = true;

      if (type === 'image' || type === 'swf') {
        coming.autoHeight = coming.autoWidth = false;
        coming.scrolling  = 'visible';
      }

      if (type === 'image') {
        coming.aspectRatio = true;
      }

      if (type === 'iframe' && isTouch) {
        coming.scrolling = 'scroll';
      }

      // Build the neccessary markup
      coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo( coming.parent || 'body' );

      $.extend(coming, {
        skin  : $('.fancybox-skin',  coming.wrap),
        outer : $('.fancybox-outer', coming.wrap),
        inner : $('.fancybox-inner', coming.wrap)
      });

      $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
        coming.skin.css('padding' + v, getValue(coming.padding[ i ]));
      });

      F.trigger('onReady');

      // Check before try to load; 'inline' and 'html' types need content, others - href
      if (type === 'inline' || type === 'html') {
        if (!coming.content || !coming.content.length) {
          return F._error( 'content' );
        }

      } else if (!href) {
        return F._error( 'href' );
      }

      if (type === 'image') {
        F._loadImage();

      } else if (type === 'ajax') {
        F._loadAjax();

      } else if (type === 'iframe') {
        F._loadIframe();

      } else {
        F._afterLoad();
      }
    },

    _error: function ( type ) {
      $.extend(F.coming, {
        type       : 'html',
        autoWidth  : true,
        autoHeight : true,
        minWidth   : 0,
        minHeight  : 0,
        scrolling  : 'no',
        hasError   : type,
        content    : F.coming.tpl.error
      });

      F._afterLoad();
    },

    _loadImage: function () {
      // Reset preload image so it is later possible to check "complete" property
      var img = F.imgPreload = new Image();

      img.onload = function () {
        this.onload = this.onerror = null;

        F.coming.width  = this.width / F.opts.pixelRatio;
        F.coming.height = this.height / F.opts.pixelRatio;

        F._afterLoad();
      };

      img.onerror = function () {
        this.onload = this.onerror = null;

        F._error( 'image' );
      };

      img.src = F.coming.href;

      if (img.complete !== true) {
        F.showLoading();
      }
    },

    _loadAjax: function () {
      var coming = F.coming;

      F.showLoading();

      F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
        url: coming.href,
        error: function (jqXHR, textStatus) {
          if (F.coming && textStatus !== 'abort') {
            F._error( 'ajax', jqXHR );

          } else {
            F.hideLoading();
          }
        },
        success: function (data, textStatus) {
          if (textStatus === 'success') {
            coming.content = data;

            F._afterLoad();
          }
        }
      }));
    },

    _loadIframe: function() {
      var coming = F.coming,
        iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
          .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
          .attr('src', coming.href);

      // This helps IE
      $(coming.wrap).bind('onReset', function () {
        try {
          $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
        } catch (e) {}
      });

      if (coming.iframe.preload) {
        F.showLoading();

        iframe.one('load', function() {
          $(this).data('ready', 1);

          // iOS will lose scrolling if we resize
          if (!isTouch) {
            $(this).bind('load.fb', F.update);
          }

          // Without this trick:
          //   - iframe won't scroll on iOS devices
          //   - IE7 sometimes displays empty iframe
          $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();

          F._afterLoad();
        });
      }

      coming.content = iframe.appendTo( coming.inner );

      if (!coming.iframe.preload) {
        F._afterLoad();
      }
    },

    _preloadImages: function() {
      var group   = F.group,
        current = F.current,
        len     = group.length,
        cnt     = current.preload ? Math.min(current.preload, len - 1) : 0,
        item,
        i;

      for (i = 1; i <= cnt; i += 1) {
        item = group[ (current.index + i ) % len ];

        if (item.type === 'image' && item.href) {
          new Image().src = item.href;
        }
      }
    },

    _afterLoad: function () {
      var coming   = F.coming,
        previous = F.current,
        placeholder = 'fancybox-placeholder',
        current,
        content,
        type,
        scrolling,
        href,
        embed;

      F.hideLoading();

      if (!coming || F.isActive === false) {
        return;
      }

      if (false === F.trigger('afterLoad', coming, previous)) {
        coming.wrap.stop(true).trigger('onReset').remove();

        F.coming = null;

        return;
      }

      if (previous) {
        F.trigger('beforeChange', previous);

        previous.wrap.stop(true).removeClass('fancybox-opened')
          .find('.fancybox-item, .fancybox-nav')
          .remove();
      }

      F.unbindEvents();

      current   = coming;
      content   = coming.content;
      type      = coming.type;
      scrolling = coming.scrolling;

      $.extend(F, {
        wrap  : current.wrap,
        skin  : current.skin,
        outer : current.outer,
        inner : current.inner,
        current  : current,
        previous : previous
      });

      href = current.href;

      switch (type) {
        case 'inline':
        case 'ajax':
        case 'html':
          if (current.selector) {
            content = $('<div>').html(content).find(current.selector);

          } else if (isQuery(content)) {
            if (!content.data(placeholder)) {
              content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter( content ).hide() );
            }

            content = content.show().detach();

            current.wrap.bind('onReset', function () {
              if ($(this).find(content).length) {
                content.hide().replaceAll( content.data(placeholder) ).data(placeholder, false);
              }
            });
          }
        break;

        case 'image':
          content = current.tpl.image.replace('{href}', href);
        break;

        case 'swf':
          content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
          embed   = '';

          $.each(current.swf, function(name, val) {
            content += '<param name="' + name + '" value="' + val + '"></param>';
            embed   += ' ' + name + '="' + val + '"';
          });

          content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
        break;
      }

      if (!(isQuery(content) && content.parent().is(current.inner))) {
        current.inner.append( content );
      }

      // Give a chance for helpers or callbacks to update elements
      F.trigger('beforeShow');

      // Set scrolling before calculating dimensions
      current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

      // Set initial dimensions and start position
      F._setDimension();

      F.reposition();

      F.isOpen = false;
      F.coming = null;

      F.bindEvents();

      if (!F.isOpened) {
        $('.fancybox-wrap').not( current.wrap ).stop(true).trigger('onReset').remove();

      } else if (previous.prevMethod) {
        F.transitions[ previous.prevMethod ]();
      }

      F.transitions[ F.isOpened ? current.nextMethod : current.openMethod ]();

      F._preloadImages();
    },

    _setDimension: function () {
      var viewport   = F.getViewport(),
        steps      = 0,
        canShrink  = false,
        canExpand  = false,
        wrap       = F.wrap,
        skin       = F.skin,
        inner      = F.inner,
        current    = F.current,
        width      = current.width,
        height     = current.height,
        minWidth   = current.minWidth,
        minHeight  = current.minHeight,
        maxWidth   = current.maxWidth,
        maxHeight  = current.maxHeight,
        scrolling  = current.scrolling,
        scrollOut  = current.scrollOutside ? current.scrollbarWidth : 0,
        margin     = current.margin,
        wMargin    = getScalar(margin[1] + margin[3]),
        hMargin    = getScalar(margin[0] + margin[2]),
        wPadding,
        hPadding,
        wSpace,
        hSpace,
        origWidth,
        origHeight,
        origMaxWidth,
        origMaxHeight,
        ratio,
        width_,
        height_,
        maxWidth_,
        maxHeight_,
        iframe,
        body;

      // Reset dimensions so we could re-check actual size
      wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');

      wPadding = getScalar(skin.outerWidth(true)  - skin.width());
      hPadding = getScalar(skin.outerHeight(true) - skin.height());

      // Any space between content and viewport (margin, padding, border, title)
      wSpace = wMargin + wPadding;
      hSpace = hMargin + hPadding;

      origWidth  = isPercentage(width)  ? (viewport.w - wSpace) * getScalar(width)  / 100 : width;
      origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;

      if (current.type === 'iframe') {
        iframe = current.content;

        if (current.autoHeight && iframe.data('ready') === 1) {
          try {
            if (iframe[0].contentWindow.document.location) {
              inner.width( origWidth ).height(9999);

              body = iframe.contents().find('body');

              if (scrollOut) {
                body.css('overflow-x', 'hidden');
              }

              origHeight = body.outerHeight(true);
            }

          } catch (e) {}
        }

      } else if (current.autoWidth || current.autoHeight) {
        inner.addClass( 'fancybox-tmp' );

        // Set width or height in case we need to calculate only one dimension
        if (!current.autoWidth) {
          inner.width( origWidth );
        }

        if (!current.autoHeight) {
          inner.height( origHeight );
        }

        if (current.autoWidth) {
          origWidth = inner.width();
        }

        if (current.autoHeight) {
          origHeight = inner.height();
        }

        inner.removeClass( 'fancybox-tmp' );
      }

      width  = getScalar( origWidth );
      height = getScalar( origHeight );

      ratio  = origWidth / origHeight;

      // Calculations for the content
      minWidth  = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
      maxWidth  = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);

      minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
      maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);

      // These will be used to determine if wrap can fit in the viewport
      origMaxWidth  = maxWidth;
      origMaxHeight = maxHeight;

      if (current.fitToView) {
        maxWidth  = Math.min(viewport.w - wSpace, maxWidth);
        maxHeight = Math.min(viewport.h - hSpace, maxHeight);
      }

      maxWidth_  = viewport.w - wMargin;
      maxHeight_ = viewport.h - hMargin;

      if (current.aspectRatio) {
        if (width > maxWidth) {
          width  = maxWidth;
          height = getScalar(width / ratio);
        }

        if (height > maxHeight) {
          height = maxHeight;
          width  = getScalar(height * ratio);
        }

        if (width < minWidth) {
          width  = minWidth;
          height = getScalar(width / ratio);
        }

        if (height < minHeight) {
          height = minHeight;
          width  = getScalar(height * ratio);
        }

      } else {
        width = Math.max(minWidth, Math.min(width, maxWidth));

        if (current.autoHeight && current.type !== 'iframe') {
          inner.width( width );

          height = inner.height();
        }

        height = Math.max(minHeight, Math.min(height, maxHeight));
      }

      // Try to fit inside viewport (including the title)
      if (current.fitToView) {
        inner.width( width ).height( height );

        wrap.width( width + wPadding );

        // Real wrap dimensions
        width_  = wrap.width();
        height_ = wrap.height();

        if (current.aspectRatio) {
          while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
            if (steps++ > 19) {
              break;
            }

            height = Math.max(minHeight, Math.min(maxHeight, height - 10));
            width  = getScalar(height * ratio);

            if (width < minWidth) {
              width  = minWidth;
              height = getScalar(width / ratio);
            }

            if (width > maxWidth) {
              width  = maxWidth;
              height = getScalar(width / ratio);
            }

            inner.width( width ).height( height );

            wrap.width( width + wPadding );

            width_  = wrap.width();
            height_ = wrap.height();
          }

        } else {
          width  = Math.max(minWidth,  Math.min(width,  width  - (width_  - maxWidth_)));
          height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
        }
      }

      if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
        width += scrollOut;
      }

      inner.width( width ).height( height );

      wrap.width( width + wPadding );

      width_  = wrap.width();
      height_ = wrap.height();

      canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
      canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));

      $.extend(current, {
        dim : {
          width : getValue( width_ ),
          height  : getValue( height_ )
        },
        origWidth  : origWidth,
        origHeight : origHeight,
        canShrink  : canShrink,
        canExpand  : canExpand,
        wPadding   : wPadding,
        hPadding   : hPadding,
        wrapSpace  : height_ - skin.outerHeight(true),
        skinSpace  : skin.height() - height
      });

      if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
        inner.height('auto');
      }
    },

    _getPosition: function (onlyAbsolute) {
      var current  = F.current,
        viewport = F.getViewport(),
        margin   = current.margin,
        width    = F.wrap.width()  + margin[1] + margin[3],
        height   = F.wrap.height() + margin[0] + margin[2],
        rez      = {
          position: 'absolute',
          top  : margin[0],
          left : margin[3]
        };

      if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
        rez.position = 'fixed';

      } else if (!current.locked) {
        rez.top  += viewport.y;
        rez.left += viewport.x;
      }

      rez.top  = getValue(Math.max(rez.top,  rez.top  + ((viewport.h - height) * current.topRatio)));
      rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width)  * current.leftRatio)));

      return rez;
    },

    _afterZoomIn: function () {
      var current = F.current;

      if (!current) {
        return;
      }

      F.isOpen = F.isOpened = true;

      F.wrap.css('overflow', 'visible').addClass('fancybox-opened');

      F.update();

      // Assign a click event
      if ( current.closeClick || (current.nextClick && F.group.length > 1) ) {
        F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
          if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
            e.preventDefault();

            F[ current.closeClick ? 'close' : 'next' ]();
          }
        });
      }

      // Create a close button
      if (current.closeBtn) {
        $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
          e.preventDefault();

          F.close();
        });
      }

      // Create navigation arrows
      if (current.arrows && F.group.length > 1) {
        if (current.loop || current.index > 0) {
          $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
        }

        if (current.loop || current.index < F.group.length - 1) {
          $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
        }
      }

      F.trigger('afterShow');

      // Stop the slideshow if this is the last item
      if (!current.loop && current.index === current.group.length - 1) {
        F.play( false );

      } else if (F.opts.autoPlay && !F.player.isActive) {
        F.opts.autoPlay = false;

        F.play();
      }
    },

    _afterZoomOut: function ( obj ) {
      obj = obj || F.current;

      $('.fancybox-wrap').trigger('onReset').remove();

      $.extend(F, {
        group  : {},
        opts   : {},
        router : false,
        current   : null,
        isActive  : false,
        isOpened  : false,
        isOpen    : false,
        isClosing : false,
        wrap   : null,
        skin   : null,
        outer  : null,
        inner  : null
      });

      F.trigger('afterClose', obj);
    }
  });

  /*
   *  Default transitions
   */

  F.transitions = {
    getOrigPosition: function () {
      var current  = F.current,
        element  = current.element,
        orig     = current.orig,
        pos      = {},
        width    = 50,
        height   = 50,
        hPadding = current.hPadding,
        wPadding = current.wPadding,
        viewport = F.getViewport();

      if (!orig && current.isDom && element.is(':visible')) {
        orig = element.find('img:first');

        if (!orig.length) {
          orig = element;
        }
      }

      if (isQuery(orig)) {
        pos = orig.offset();

        if (orig.is('img')) {
          width  = orig.outerWidth();
          height = orig.outerHeight();
        }

      } else {
        pos.top  = viewport.y + (viewport.h - height) * current.topRatio;
        pos.left = viewport.x + (viewport.w - width)  * current.leftRatio;
      }

      if (F.wrap.css('position') === 'fixed' || current.locked) {
        pos.top  -= viewport.y;
        pos.left -= viewport.x;
      }

      pos = {
        top     : getValue(pos.top  - hPadding * current.topRatio),
        left    : getValue(pos.left - wPadding * current.leftRatio),
        width   : getValue(width  + wPadding),
        height  : getValue(height + hPadding)
      };

      return pos;
    },

    step: function (now, fx) {
      var ratio,
        padding,
        value,
        prop       = fx.prop,
        current    = F.current,
        wrapSpace  = current.wrapSpace,
        skinSpace  = current.skinSpace;

      if (prop === 'width' || prop === 'height') {
        ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);

        if (F.isClosing) {
          ratio = 1 - ratio;
        }

        padding = prop === 'width' ? current.wPadding : current.hPadding;
        value   = now - padding;

        F.skin[ prop ](  getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) ) );
        F.inner[ prop ]( getScalar( prop === 'width' ?  value : value - (wrapSpace * ratio) - (skinSpace * ratio) ) );
      }
    },

    zoomIn: function () {
      var current  = F.current,
        startPos = current.pos,
        effect   = current.openEffect,
        elastic  = effect === 'elastic',
        endPos   = $.extend({opacity : 1}, startPos);

      // Remove "position" property that breaks older IE
      delete endPos.position;

      if (elastic) {
        startPos = this.getOrigPosition();

        if (current.openOpacity) {
          startPos.opacity = 0.1;
        }

      } else if (effect === 'fade') {
        startPos.opacity = 0.1;
      }

      F.wrap.css(startPos).animate(endPos, {
        duration : effect === 'none' ? 0 : current.openSpeed,
        easing   : current.openEasing,
        step     : elastic ? this.step : null,
        complete : F._afterZoomIn
      });
    },

    zoomOut: function () {
      var current  = F.current,
        effect   = current.closeEffect,
        elastic  = effect === 'elastic',
        endPos   = {opacity : 0.1};

      if (elastic) {
        endPos = this.getOrigPosition();

        if (current.closeOpacity) {
          endPos.opacity = 0.1;
        }
      }

      F.wrap.animate(endPos, {
        duration : effect === 'none' ? 0 : current.closeSpeed,
        easing   : current.closeEasing,
        step     : elastic ? this.step : null,
        complete : F._afterZoomOut
      });
    },

    changeIn: function () {
      var current   = F.current,
        effect    = current.nextEffect,
        startPos  = current.pos,
        endPos    = { opacity : 1 },
        direction = F.direction,
        distance  = 200,
        field;

      startPos.opacity = 0.1;

      if (effect === 'elastic') {
        field = direction === 'down' || direction === 'up' ? 'top' : 'left';

        if (direction === 'down' || direction === 'right') {
          startPos[ field ] = getValue(getScalar(startPos[ field ]) - distance);
          endPos[ field ]   = '+=' + distance + 'px';

        } else {
          startPos[ field ] = getValue(getScalar(startPos[ field ]) + distance);
          endPos[ field ]   = '-=' + distance + 'px';
        }
      }

      // Workaround for http://bugs.jquery.com/ticket/12273
      if (effect === 'none') {
        F._afterZoomIn();

      } else {
        F.wrap.css(startPos).animate(endPos, {
          duration : current.nextSpeed,
          easing   : current.nextEasing,
          complete : F._afterZoomIn
        });
      }
    },

    changeOut: function () {
      var previous  = F.previous,
        effect    = previous.prevEffect,
        endPos    = { opacity : 0.1 },
        direction = F.direction,
        distance  = 200;

      if (effect === 'elastic') {
        endPos[ direction === 'down' || direction === 'up' ? 'top' : 'left' ] = ( direction === 'up' || direction === 'left' ? '-' : '+' ) + '=' + distance + 'px';
      }

      previous.wrap.animate(endPos, {
        duration : effect === 'none' ? 0 : previous.prevSpeed,
        easing   : previous.prevEasing,
        complete : function () {
          $(this).trigger('onReset').remove();
        }
      });
    }
  };

  /*
   *  Overlay helper
   */

  F.helpers.overlay = {
    defaults : {
      closeClick : true,      // if true, fancyBox will be closed when user clicks on the overlay
      speedOut   : 200,       // duration of fadeOut animation
      showEarly  : true,      // indicates if should be opened immediately or wait until the content is ready
      css        : {},        // custom CSS properties
      locked     : !isTouch,  // if true, the content will be locked into overlay
      fixed      : true       // if false, the overlay CSS position property will not be set to "fixed"
    },

    overlay : null,      // current handle
    fixed   : false,     // indicates if the overlay has position "fixed"
    el      : $('html'), // element that contains "the lock"

    // Public methods
    create : function(opts) {
      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.close();
      }

      this.overlay = $('<div class="fancybox-overlay"></div>').appendTo( F.coming ? F.coming.parent : opts.parent );
      this.fixed   = false;

      if (opts.fixed && F.defaults.fixed) {
        this.overlay.addClass('fancybox-overlay-fixed');

        this.fixed = true;
      }
    },

    open : function(opts) {
      var that = this;

      opts = $.extend({}, this.defaults, opts);

      if (this.overlay) {
        this.overlay.unbind('.overlay').width('auto').height('auto');

      } else {
        this.create(opts);
      }

      if (!this.fixed) {
        W.bind('resize.overlay', $.proxy( this.update, this) );

        this.update();
      }

      if (opts.closeClick) {
        this.overlay.bind('click.overlay', function(e) {
          if ($(e.target).hasClass('fancybox-overlay')) {
            if (F.isActive) {
              F.close();
            } else {
              that.close();
            }

            return false;
          }
        });
      }

      this.overlay.css( opts.css ).show();
    },

    close : function() {
      var scrollV, scrollH;

      W.unbind('resize.overlay');

      if (this.el.hasClass('fancybox-lock')) {
        $('.fancybox-margin').removeClass('fancybox-margin');

        scrollV = W.scrollTop();
        scrollH = W.scrollLeft();

        this.el.removeClass('fancybox-lock');

        W.scrollTop( scrollV ).scrollLeft( scrollH );
      }

      $('.fancybox-overlay').remove().hide();

      $.extend(this, {
        overlay : null,
        fixed   : false
      });
    },

    // Private, callbacks

    update : function () {
      var width = '100%', offsetWidth;

      // Reset width/height so it will not mess
      this.overlay.width(width).height('100%');

      // jQuery does not return reliable result for IE
      if (IE) {
        offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

        if (D.width() > offsetWidth) {
          width = D.width();
        }

      } else if (D.width() > W.width()) {
        width = D.width();
      }

      this.overlay.width(width).height(D.height());
    },

    // This is where we can manipulate DOM, because later it would cause iframes to reload
    onReady : function (opts, obj) {
      var overlay = this.overlay;

      $('.fancybox-overlay').stop(true, true);

      if (!overlay) {
        this.create(opts);
      }

      if (opts.locked && this.fixed && obj.fixed) {
        if (!overlay) {
          this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
        }

        obj.locked = this.overlay.append( obj.wrap );
        obj.fixed  = false;
      }

      if (opts.showEarly === true) {
        this.beforeShow.apply(this, arguments);
      }
    },

    beforeShow : function(opts, obj) {
      var scrollV, scrollH;

      if (obj.locked) {
        if (this.margin !== false) {
          $('*').filter(function(){
            return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap") );
          }).addClass('fancybox-margin');

          this.el.addClass('fancybox-margin');
        }

        scrollV = W.scrollTop();
        scrollH = W.scrollLeft();

        this.el.addClass('fancybox-lock');

        W.scrollTop( scrollV ).scrollLeft( scrollH );
      }

      this.open(opts);
    },

    onUpdate : function() {
      if (!this.fixed) {
        this.update();
      }
    },

    afterClose: function (opts) {
      // Remove overlay if exists and fancyBox is not opening
      // (e.g., it is not being open using afterClose callback)
      //if (this.overlay && !F.isActive) {
      if (this.overlay && !F.coming) {
        this.overlay.fadeOut(opts.speedOut, $.proxy( this.close, this ));
      }
    }
  };

  /*
   *  Title helper
   */

  F.helpers.title = {
    defaults : {
      type     : 'float', // 'float', 'inside', 'outside' or 'over',
      position : 'bottom' // 'top' or 'bottom'
    },

    beforeShow: function (opts) {
      var current = F.current,
        text    = current.title,
        type    = opts.type,
        title,
        target;

      if ($.isFunction(text)) {
        text = text.call(current.element, current);
      }

      if (!isString(text) || $.trim(text) === '') {
        return;
      }

      title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');

      switch (type) {
        case 'inside':
          target = F.skin;
        break;

        case 'outside':
          target = F.wrap;
        break;

        case 'over':
          target = F.inner;
        break;

        default: // 'float'
          target = F.skin;

          title.appendTo('body');

          if (IE) {
            title.width( title.width() );
          }

          title.wrapInner('<span class="child"></span>');

          //Increase bottom margin so this title will also fit into viewport
          F.current.margin[2] += Math.abs( getScalar(title.css('margin-bottom')) );
        break;
      }

      title[ (opts.position === 'top' ? 'prependTo'  : 'appendTo') ](target);
    }
  };

  // jQuery plugin initialization
  $.fn.fancybox = function (options) {
    var index,
      that     = $(this),
      selector = this.selector || '',
      run      = function(e) {
        var what = $(this).blur(), idx = index, relType, relVal;

        if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
          relType = options.groupAttr || 'data-fancybox-group';
          relVal  = what.attr(relType);

          if (!relVal) {
            relType = 'rel';
            relVal  = what.get(0)[ relType ];
          }

          if (relVal && relVal !== '' && relVal !== 'nofollow') {
            what = selector.length ? $(selector) : that;
            what = what.filter('[' + relType + '="' + relVal + '"]');
            idx  = what.index(this);
          }

          options.index = idx;

          // Stop an event from bubbling if everything is fine
          if (F.open(what, options) !== false) {
            e.preventDefault();
          }
        }
      };

    options = options || {};
    index   = options.index || 0;

    if (!selector || options.live === false) {
      that.unbind('click.fb-start').bind('click.fb-start', run);

    } else {
      D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
    }

    this.filter('[data-fancybox-start=1]').trigger('click');

    return this;
  };

  // Tests that need a body at doc ready
  D.ready(function() {
    var w1, w2;

    if ( $.scrollbarWidth === undefined ) {
      // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
      $.scrollbarWidth = function() {
        var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
          child  = parent.children(),
          width  = child.innerWidth() - child.height( 99 ).innerWidth();

        parent.remove();

        return width;
      };
    }

    if ( $.support.fixedPosition === undefined ) {
      $.support.fixedPosition = (function() {
        var elem  = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
          fixed = ( elem[0].offsetTop === 20 || elem[0].offsetTop === 15 );

        elem.remove();

        return fixed;
      }());
    }

    $.extend(F.defaults, {
      scrollbarWidth : $.scrollbarWidth(),
      fixed  : $.support.fixedPosition,
      parent : $('body')
    });

    //Get real width of page scroll-bar
    w1 = $(window).width();

    H.addClass('fancybox-lock-test');

    w2 = $(window).width();

    H.removeClass('fancybox-lock-test');

    $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
  });

}(window, document, jQuery));

/*
 *  jQuery OwlCarousel v1.3.2
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */

if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function ($, window, document) {

    var Carousel = {
        init : function (options, el) {
            var base = this;

            base.$elem = $(el);
            base.options = $.extend({}, $.fn.owlCarousel.options, base.$elem.data(), options);

            base.userOptions = options;
            base.loadContent();
        },

        loadContent : function () {
            var base = this, url;

            function getData(data) {
                var i, content = "";
                if (typeof base.options.jsonSuccess === "function") {
                    base.options.jsonSuccess.apply(this, [data]);
                } else {
                    for (i in data.owl) {
                        if (data.owl.hasOwnProperty(i)) {
                            content += data.owl[i].item;
                        }
                    }
                    base.$elem.html(content);
                }
                base.logIn();
            }

            if (typeof base.options.beforeInit === "function") {
                base.options.beforeInit.apply(this, [base.$elem]);
            }

            if (typeof base.options.jsonPath === "string") {
                url = base.options.jsonPath;
                $.getJSON(url, getData);
            } else {
                base.logIn();
            }
        },

        logIn : function () {
            var base = this;

            base.$elem.data({
                "owl-originalStyles": base.$elem.attr("style"),
                "owl-originalClasses": base.$elem.attr("class")
            });

            base.$elem.css({opacity: 0});
            base.orignalItems = base.options.items;
            base.checkBrowser();
            base.wrapperWidth = 0;
            base.checkVisible = null;
            base.setVars();
        },

        setVars : function () {
            var base = this;
            if (base.$elem.children().length === 0) {return false; }
            base.baseClass();
            base.eventTypes();
            base.$userItems = base.$elem.children();
            base.itemsAmount = base.$userItems.length;
            base.wrapItems();
            base.$owlItems = base.$elem.find(".owl-item");
            base.$owlWrapper = base.$elem.find(".owl-wrapper");
            base.playDirection = "next";
            base.prevItem = 0;
            base.prevArr = [0];
            base.currentItem = 0;
            base.customEvents();
            base.onStartup();
        },

        onStartup : function () {
            var base = this;
            base.updateItems();
            base.calculateAll();
            base.buildControls();
            base.updateControls();
            base.response();
            base.moveEvents();
            base.stopOnHover();
            base.owlStatus();

            if (base.options.transitionStyle !== false) {
                base.transitionTypes(base.options.transitionStyle);
            }
            if (base.options.autoPlay === true) {
                base.options.autoPlay = 5000;
            }
            base.play();

            base.$elem.find(".owl-wrapper").css("display", "block");

            if (!base.$elem.is(":visible")) {
                base.watchVisibility();
            } else {
                base.$elem.css("opacity", 1);
            }
            base.onstartup = false;
            base.eachMoveUpdate();
            if (typeof base.options.afterInit === "function") {
                base.options.afterInit.apply(this, [base.$elem]);
            }
        },

        eachMoveUpdate : function () {
            var base = this;

            if (base.options.lazyLoad === true) {
                base.lazyLoad();
            }
            if (base.options.autoHeight === true) {
                base.autoHeight();
            }
            base.onVisibleItems();

            if (typeof base.options.afterAction === "function") {
                base.options.afterAction.apply(this, [base.$elem]);
            }
        },

        updateVars : function () {
            var base = this;
            if (typeof base.options.beforeUpdate === "function") {
                base.options.beforeUpdate.apply(this, [base.$elem]);
            }
            base.watchVisibility();
            base.updateItems();
            base.calculateAll();
            base.updatePosition();
            base.updateControls();
            base.eachMoveUpdate();
            if (typeof base.options.afterUpdate === "function") {
                base.options.afterUpdate.apply(this, [base.$elem]);
            }
        },

        reload : function () {
            var base = this;
            window.setTimeout(function () {
                base.updateVars();
            }, 0);
        },

        watchVisibility : function () {
            var base = this;

            if (base.$elem.is(":visible") === false) {
                base.$elem.css({opacity: 0});
                window.clearInterval(base.autoPlayInterval);
                window.clearInterval(base.checkVisible);
            } else {
                return false;
            }
            base.checkVisible = window.setInterval(function () {
                if (base.$elem.is(":visible")) {
                    base.reload();
                    base.$elem.animate({opacity: 1}, 200);
                    window.clearInterval(base.checkVisible);
                }
            }, 500);
        },

        wrapItems : function () {
            var base = this;
            base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");
            base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");
            base.wrapperOuter = base.$elem.find(".owl-wrapper-outer");
            base.$elem.css("display", "block");
        },

        baseClass : function () {
            var base = this,
                hasBaseClass = base.$elem.hasClass(base.options.baseClass),
                hasThemeClass = base.$elem.hasClass(base.options.theme);

            if (!hasBaseClass) {
                base.$elem.addClass(base.options.baseClass);
            }

            if (!hasThemeClass) {
                base.$elem.addClass(base.options.theme);
            }
        },

        updateItems : function () {
            var base = this, width, i;

            if (base.options.responsive === false) {
                return false;
            }
            if (base.options.singleItem === true) {
                base.options.items = base.orignalItems = 1;
                base.options.itemsCustom = false;
                base.options.itemsDesktop = false;
                base.options.itemsDesktopSmall = false;
                base.options.itemsTablet = false;
                base.options.itemsTabletSmall = false;
                base.options.itemsMobile = false;
                return false;
            }

            width = $(base.options.responsiveBaseWidth).width();

            if (width > (base.options.itemsDesktop[0] || base.orignalItems)) {
                base.options.items = base.orignalItems;
            }
            if (base.options.itemsCustom !== false) {
                //Reorder array by screen size
                base.options.itemsCustom.sort(function (a, b) {return a[0] - b[0]; });

                for (i = 0; i < base.options.itemsCustom.length; i += 1) {
                    if (base.options.itemsCustom[i][0] <= width) {
                        base.options.items = base.options.itemsCustom[i][1];
                    }
                }

            } else {

                if (width <= base.options.itemsDesktop[0] && base.options.itemsDesktop !== false) {
                    base.options.items = base.options.itemsDesktop[1];
                }

                if (width <= base.options.itemsDesktopSmall[0] && base.options.itemsDesktopSmall !== false) {
                    base.options.items = base.options.itemsDesktopSmall[1];
                }

                if (width <= base.options.itemsTablet[0] && base.options.itemsTablet !== false) {
                    base.options.items = base.options.itemsTablet[1];
                }

                if (width <= base.options.itemsTabletSmall[0] && base.options.itemsTabletSmall !== false) {
                    base.options.items = base.options.itemsTabletSmall[1];
                }

                if (width <= base.options.itemsMobile[0] && base.options.itemsMobile !== false) {
                    base.options.items = base.options.itemsMobile[1];
                }
            }

            //if number of items is less than declared
            if (base.options.items > base.itemsAmount && base.options.itemsScaleUp === true) {
                base.options.items = base.itemsAmount;
            }
        },

        response : function () {
            var base = this,
                smallDelay,
                lastWindowWidth;

            if (base.options.responsive !== true) {
                return false;
            }
            lastWindowWidth = $(window).width();

            base.resizer = function () {
                if ($(window).width() !== lastWindowWidth) {
                    if (base.options.autoPlay !== false) {
                        window.clearInterval(base.autoPlayInterval);
                    }
                    window.clearTimeout(smallDelay);
                    smallDelay = window.setTimeout(function () {
                        lastWindowWidth = $(window).width();
                        base.updateVars();
                    }, base.options.responsiveRefreshRate);
                }
            };
            $(window).resize(base.resizer);
        },

        updatePosition : function () {
            var base = this;
            base.jumpTo(base.currentItem);
            if (base.options.autoPlay !== false) {
                base.checkAp();
            }
        },

        appendItemsSizes : function () {
            var base = this,
                roundPages = 0,
                lastItem = base.itemsAmount - base.options.items;

            base.$owlItems.each(function (index) {
                var $this = $(this);
                $this
                    .css({"width": base.itemWidth})
                    .data("owl-item", Number(index));

                if (index % base.options.items === 0 || index === lastItem) {
                    if (!(index > lastItem)) {
                        roundPages += 1;
                    }
                }
                $this.data("owl-roundPages", roundPages);
            });
        },

        appendWrapperSizes : function () {
            var base = this,
                width = base.$owlItems.length * base.itemWidth;

            base.$owlWrapper.css({
                "width": width * 2,
                "left": 0
            });
            base.appendItemsSizes();
        },

        calculateAll : function () {
            var base = this;
            base.calculateWidth();
            base.appendWrapperSizes();
            base.loops();
            base.max();
        },

        calculateWidth : function () {
            var base = this;
            base.itemWidth = Math.round(base.$elem.width() / base.options.items);
        },

        max : function () {
            var base = this,
                maximum = ((base.itemsAmount * base.itemWidth) - base.options.items * base.itemWidth) * -1;
            if (base.options.items > base.itemsAmount) {
                base.maximumItem = 0;
                maximum = 0;
                base.maximumPixels = 0;
            } else {
                base.maximumItem = base.itemsAmount - base.options.items;
                base.maximumPixels = maximum;
            }
            return maximum;
        },

        min : function () {
            return 0;
        },

        loops : function () {
            var base = this,
                prev = 0,
                elWidth = 0,
                i,
                item,
                roundPageNum;

            base.positionsInArray = [0];
            base.pagesInArray = [];

            for (i = 0; i < base.itemsAmount; i += 1) {
                elWidth += base.itemWidth;
                base.positionsInArray.push(-elWidth);

                if (base.options.scrollPerPage === true) {
                    item = $(base.$owlItems[i]);
                    roundPageNum = item.data("owl-roundPages");
                    if (roundPageNum !== prev) {
                        base.pagesInArray[prev] = base.positionsInArray[i];
                        prev = roundPageNum;
                    }
                }
            }
        },

        buildControls : function () {
            var base = this;
            if (base.options.navigation === true || base.options.pagination === true) {
                base.owlControls = $("<div class=\"owl-controls\"/>").toggleClass("clickable", !base.browser.isTouch).appendTo(base.$elem);
            }
            if (base.options.pagination === true) {
                base.buildPagination();
            }
            if (base.options.navigation === true) {
                base.buildButtons();
            }
        },

        buildButtons : function () {
            var base = this,
                buttonsWrapper = $("<div class=\"owl-buttons\"/>");
            base.owlControls.append(buttonsWrapper);

            base.buttonPrev = $("<div/>", {
                "class" : "owl-prev",
                "html" : base.options.navigationText[0] || ""
            });

            base.buttonNext = $("<div/>", {
                "class" : "owl-next",
                "html" : base.options.navigationText[1] || ""
            });

            buttonsWrapper
                .append(base.buttonPrev)
                .append(base.buttonNext);

            buttonsWrapper.on("touchstart.owlControls mousedown.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
            });

            buttonsWrapper.on("touchend.owlControls mouseup.owlControls", "div[class^=\"owl\"]", function (event) {
                event.preventDefault();
                if ($(this).hasClass("owl-next")) {
                    base.next();
                } else {
                    base.prev();
                }
            });
        },

        buildPagination : function () {
            var base = this;

            base.paginationWrapper = $("<div class=\"owl-pagination\"/>");
            base.owlControls.append(base.paginationWrapper);

            base.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (event) {
                event.preventDefault();
                if (Number($(this).data("owl-page")) !== base.currentItem) {
                    base.goTo(Number($(this).data("owl-page")), true);
                }
            });
        },

        updatePagination : function () {
            var base = this,
                counter,
                lastPage,
                lastItem,
                i,
                paginationButton,
                paginationButtonInner;

            if (base.options.pagination === false) {
                return false;
            }

            base.paginationWrapper.html("");

            counter = 0;
            lastPage = base.itemsAmount - base.itemsAmount % base.options.items;

            for (i = 0; i < base.itemsAmount; i += 1) {
                if (i % base.options.items === 0) {
                    counter += 1;
                    if (lastPage === i) {
                        lastItem = base.itemsAmount - base.options.items;
                    }
                    paginationButton = $("<div/>", {
                        "class" : "owl-page"
                    });
                    paginationButtonInner = $("<span></span>", {
                        "text": base.options.paginationNumbers === true ? counter : "",
                        "class": base.options.paginationNumbers === true ? "owl-numbers" : ""
                    });
                    paginationButton.append(paginationButtonInner);

                    paginationButton.data("owl-page", lastPage === i ? lastItem : i);
                    paginationButton.data("owl-roundPages", counter);

                    base.paginationWrapper.append(paginationButton);
                }
            }
            base.checkPagination();
        },
        checkPagination : function () {
            var base = this;
            if (base.options.pagination === false) {
                return false;
            }
            base.paginationWrapper.find(".owl-page").each(function () {
                if ($(this).data("owl-roundPages") === $(base.$owlItems[base.currentItem]).data("owl-roundPages")) {
                    base.paginationWrapper
                        .find(".owl-page")
                        .removeClass("active");
                    $(this).addClass("active");
                }
            });
        },

        checkNavigation : function () {
            var base = this;

            if (base.options.navigation === false) {
                return false;
            }
            if (base.options.rewindNav === false) {
                if (base.currentItem === 0 && base.maximumItem === 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem === 0 && base.maximumItem !== 0) {
                    base.buttonPrev.addClass("disabled");
                    base.buttonNext.removeClass("disabled");
                } else if (base.currentItem === base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.addClass("disabled");
                } else if (base.currentItem !== 0 && base.currentItem !== base.maximumItem) {
                    base.buttonPrev.removeClass("disabled");
                    base.buttonNext.removeClass("disabled");
                }
            }
        },

        updateControls : function () {
            var base = this;
            base.updatePagination();
            base.checkNavigation();
            if (base.owlControls) {
                if (base.options.items >= base.itemsAmount) {
                    base.owlControls.hide();
                } else {
                    base.owlControls.show();
                }
            }
        },

        destroyControls : function () {
            var base = this;
            if (base.owlControls) {
                base.owlControls.remove();
            }
        },

        next : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            base.currentItem += base.options.scrollPerPage === true ? base.options.items : 1;
            if (base.currentItem > base.maximumItem + (base.options.scrollPerPage === true ? (base.options.items - 1) : 0)) {
                if (base.options.rewindNav === true) {
                    base.currentItem = 0;
                    speed = "rewind";
                } else {
                    base.currentItem = base.maximumItem;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        prev : function (speed) {
            var base = this;

            if (base.isTransition) {
                return false;
            }

            if (base.options.scrollPerPage === true && base.currentItem > 0 && base.currentItem < base.options.items) {
                base.currentItem = 0;
            } else {
                base.currentItem -= base.options.scrollPerPage === true ? base.options.items : 1;
            }
            if (base.currentItem < 0) {
                if (base.options.rewindNav === true) {
                    base.currentItem = base.maximumItem;
                    speed = "rewind";
                } else {
                    base.currentItem = 0;
                    return false;
                }
            }
            base.goTo(base.currentItem, speed);
        },

        goTo : function (position, speed, drag) {
            var base = this,
                goToPixel;

            if (base.isTransition) {
                return false;
            }
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }

            base.currentItem = base.owl.currentItem = position;
            if (base.options.transitionStyle !== false && drag !== "drag" && base.options.items === 1 && base.browser.support3d === true) {
                base.swapSpeed(0);
                if (base.browser.support3d === true) {
                    base.transition3d(base.positionsInArray[position]);
                } else {
                    base.css2slide(base.positionsInArray[position], 1);
                }
                base.afterGo();
                base.singleItemTransition();
                return false;
            }
            goToPixel = base.positionsInArray[position];

            if (base.browser.support3d === true) {
                base.isCss3Finish = false;

                if (speed === true) {
                    base.swapSpeed("paginationSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.paginationSpeed);

                } else if (speed === "rewind") {
                    base.swapSpeed(base.options.rewindSpeed);
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.rewindSpeed);

                } else {
                    base.swapSpeed("slideSpeed");
                    window.setTimeout(function () {
                        base.isCss3Finish = true;
                    }, base.options.slideSpeed);
                }
                base.transition3d(goToPixel);
            } else {
                if (speed === true) {
                    base.css2slide(goToPixel, base.options.paginationSpeed);
                } else if (speed === "rewind") {
                    base.css2slide(goToPixel, base.options.rewindSpeed);
                } else {
                    base.css2slide(goToPixel, base.options.slideSpeed);
                }
            }
            base.afterGo();
        },

        jumpTo : function (position) {
            var base = this;
            if (typeof base.options.beforeMove === "function") {
                base.options.beforeMove.apply(this, [base.$elem]);
            }
            if (position >= base.maximumItem || position === -1) {
                position = base.maximumItem;
            } else if (position <= 0) {
                position = 0;
            }
            base.swapSpeed(0);
            if (base.browser.support3d === true) {
                base.transition3d(base.positionsInArray[position]);
            } else {
                base.css2slide(base.positionsInArray[position], 1);
            }
            base.currentItem = base.owl.currentItem = position;
            base.afterGo();
        },

        afterGo : function () {
            var base = this;

            base.prevArr.push(base.currentItem);
            base.prevItem = base.owl.prevItem = base.prevArr[base.prevArr.length - 2];
            base.prevArr.shift(0);

            if (base.prevItem !== base.currentItem) {
                base.checkPagination();
                base.checkNavigation();
                base.eachMoveUpdate();

                if (base.options.autoPlay !== false) {
                    base.checkAp();
                }
            }
            if (typeof base.options.afterMove === "function" && base.prevItem !== base.currentItem) {
                base.options.afterMove.apply(this, [base.$elem]);
            }
        },

        stop : function () {
            var base = this;
            base.apStatus = "stop";
            window.clearInterval(base.autoPlayInterval);
        },

        checkAp : function () {
            var base = this;
            if (base.apStatus !== "stop") {
                base.play();
            }
        },

        play : function () {
            var base = this;
            base.apStatus = "play";
            if (base.options.autoPlay === false) {
                return false;
            }
            window.clearInterval(base.autoPlayInterval);
            base.autoPlayInterval = window.setInterval(function () {
                base.next(true);
            }, base.options.autoPlay);
        },

        swapSpeed : function (action) {
            var base = this;
            if (action === "slideSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));
            } else if (action === "paginationSpeed") {
                base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));
            } else if (typeof action !== "string") {
                base.$owlWrapper.css(base.addCssSpeed(action));
            }
        },

        addCssSpeed : function (speed) {
            return {
                "-webkit-transition": "all " + speed + "ms ease",
                "-moz-transition": "all " + speed + "ms ease",
                "-o-transition": "all " + speed + "ms ease",
                "transition": "all " + speed + "ms ease"
            };
        },

        removeTransition : function () {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                "transition": ""
            };
        },

        doTranslate : function (pixels) {
            return {
                "-webkit-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + pixels + "px, 0px, 0px)",
                "transform": "translate3d(" + pixels + "px, 0px,0px)"
            };
        },

        transition3d : function (value) {
            var base = this;
            base.$owlWrapper.css(base.doTranslate(value));
        },

        css2move : function (value) {
            var base = this;
            base.$owlWrapper.css({"left" : value});
        },

        css2slide : function (value, speed) {
            var base = this;

            base.isCssFinish = false;
            base.$owlWrapper.stop(true, true).animate({
                "left" : value
            }, {
                duration : speed || base.options.slideSpeed,
                complete : function () {
                    base.isCssFinish = true;
                }
            });
        },

        checkBrowser : function () {
            var base = this,
                translate3D = "translate3d(0px, 0px, 0px)",
                tempElem = document.createElement("div"),
                regex,
                asSupport,
                support3d,
                isTouch;

            tempElem.style.cssText = "  -moz-transform:" + translate3D +
                                  "; -ms-transform:"     + translate3D +
                                  "; -o-transform:"      + translate3D +
                                  "; -webkit-transform:" + translate3D +
                                  "; transform:"         + translate3D;
            regex = /translate3d\(0px, 0px, 0px\)/g;
            asSupport = tempElem.style.cssText.match(regex);
            support3d = (asSupport !== null && asSupport.length === 1);

            isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints;

            base.browser = {
                "support3d" : support3d,
                "isTouch" : isTouch
            };
        },

        moveEvents : function () {
            var base = this;
            if (base.options.mouseDrag !== false || base.options.touchDrag !== false) {
                base.gestures();
                base.disabledEvents();
            }
        },

        eventTypes : function () {
            var base = this,
                types = ["s", "e", "x"];

            base.ev_types = {};

            if (base.options.mouseDrag === true && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl mousedown.owl",
                    "touchmove.owl mousemove.owl",
                    "touchend.owl touchcancel.owl mouseup.owl"
                ];
            } else if (base.options.mouseDrag === false && base.options.touchDrag === true) {
                types = [
                    "touchstart.owl",
                    "touchmove.owl",
                    "touchend.owl touchcancel.owl"
                ];
            } else if (base.options.mouseDrag === true && base.options.touchDrag === false) {
                types = [
                    "mousedown.owl",
                    "mousemove.owl",
                    "mouseup.owl"
                ];
            }

            base.ev_types.start = types[0];
            base.ev_types.move = types[1];
            base.ev_types.end = types[2];
        },

        disabledEvents :  function () {
            var base = this;
            base.$elem.on("dragstart.owl", function (event) { event.preventDefault(); });
            base.$elem.on("mousedown.disableTextSelect", function (e) {
                return $(e.target).is('input, textarea, select, option');
            });
        },

        gestures : function () {
            /*jslint unparam: true*/
            var base = this,
                locals = {
                    offsetX : 0,
                    offsetY : 0,
                    baseElWidth : 0,
                    relativePos : 0,
                    position: null,
                    minSwipe : null,
                    maxSwipe: null,
                    sliding : null,
                    dargging: null,
                    targetElement : null
                };

            base.isCssFinish = true;

            function getTouches(event) {
                if (event.touches !== undefined) {
                    return {
                        x : event.touches[0].pageX,
                        y : event.touches[0].pageY
                    };
                }

                if (event.touches === undefined) {
                    if (event.pageX !== undefined) {
                        return {
                            x : event.pageX,
                            y : event.pageY
                        };
                    }
                    if (event.pageX === undefined) {
                        return {
                            x : event.clientX,
                            y : event.clientY
                        };
                    }
                }
            }

            function swapEvents(type) {
                if (type === "on") {
                    $(document).on(base.ev_types.move, dragMove);
                    $(document).on(base.ev_types.end, dragEnd);
                } else if (type === "off") {
                    $(document).off(base.ev_types.move);
                    $(document).off(base.ev_types.end);
                }
            }

            function dragStart(event) {
                var ev = event.originalEvent || event || window.event,
                    position;

                if (ev.which === 3) {
                    return false;
                }
                if (base.itemsAmount <= base.options.items) {
                    return;
                }
                if (base.isCssFinish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }
                if (base.isCss3Finish === false && !base.options.dragBeforeAnimFinish) {
                    return false;
                }

                if (base.options.autoPlay !== false) {
                    window.clearInterval(base.autoPlayInterval);
                }

                if (base.browser.isTouch !== true && !base.$owlWrapper.hasClass("grabbing")) {
                    base.$owlWrapper.addClass("grabbing");
                }

                base.newPosX = 0;
                base.newRelativeX = 0;

                $(this).css(base.removeTransition());

                position = $(this).position();
                locals.relativePos = position.left;

                locals.offsetX = getTouches(ev).x - position.left;
                locals.offsetY = getTouches(ev).y - position.top;

                swapEvents("on");

                locals.sliding = false;
                locals.targetElement = ev.target || ev.srcElement;
            }

            function dragMove(event) {
                var ev = event.originalEvent || event || window.event,
                    minSwipe,
                    maxSwipe;

                base.newPosX = getTouches(ev).x - locals.offsetX;
                base.newPosY = getTouches(ev).y - locals.offsetY;
                base.newRelativeX = base.newPosX - locals.relativePos;

                if (typeof base.options.startDragging === "function" && locals.dragging !== true && base.newRelativeX !== 0) {
                    locals.dragging = true;
                    base.options.startDragging.apply(base, [base.$elem]);
                }

                if ((base.newRelativeX > 8 || base.newRelativeX < -8) && (base.browser.isTouch === true)) {
                    if (ev.preventDefault !== undefined) {
                        ev.preventDefault();
                    } else {
                        ev.returnValue = false;
                    }
                    locals.sliding = true;
                }

                if ((base.newPosY > 10 || base.newPosY < -10) && locals.sliding === false) {
                    $(document).off("touchmove.owl");
                }

                minSwipe = function () {
                    return base.newRelativeX / 5;
                };

                maxSwipe = function () {
                    return base.maximumPixels + base.newRelativeX / 5;
                };

                base.newPosX = Math.max(Math.min(base.newPosX, minSwipe()), maxSwipe());
                if (base.browser.support3d === true) {
                    base.transition3d(base.newPosX);
                } else {
                    base.css2move(base.newPosX);
                }
            }

            function dragEnd(event) {
                var ev = event.originalEvent || event || window.event,
                    newPosition,
                    handlers,
                    owlStopEvent;

                ev.target = ev.target || ev.srcElement;

                locals.dragging = false;

                if (base.browser.isTouch !== true) {
                    base.$owlWrapper.removeClass("grabbing");
                }

                if (base.newRelativeX < 0) {
                    base.dragDirection = base.owl.dragDirection = "left";
                } else {
                    base.dragDirection = base.owl.dragDirection = "right";
                }

                if (base.newRelativeX !== 0) {
                    newPosition = base.getNewPosition();
                    base.goTo(newPosition, false, "drag");
                    if (locals.targetElement === ev.target && base.browser.isTouch !== true) {
                        $(ev.target).on("click.disable", function (ev) {
                            ev.stopImmediatePropagation();
                            ev.stopPropagation();
                            ev.preventDefault();
                            $(ev.target).off("click.disable");
                        });
                        handlers = $._data(ev.target, "events").click;
                        owlStopEvent = handlers.pop();
                        handlers.splice(0, 0, owlStopEvent);
                    }
                }
                swapEvents("off");
            }
            base.$elem.on(base.ev_types.start, ".owl-wrapper", dragStart);
        },

        getNewPosition : function () {
            var base = this,
                newPosition = base.closestItem();

            if (newPosition > base.maximumItem) {
                base.currentItem = base.maximumItem;
                newPosition  = base.maximumItem;
            } else if (base.newPosX >= 0) {
                newPosition = 0;
                base.currentItem = 0;
            }
            return newPosition;
        },
        closestItem : function () {
            var base = this,
                array = base.options.scrollPerPage === true ? base.pagesInArray : base.positionsInArray,
                goal = base.newPosX,
                closest = null;

            $.each(array, function (i, v) {
                if (goal - (base.itemWidth / 20) > array[i + 1] && goal - (base.itemWidth / 20) < v && base.moveDirection() === "left") {
                    closest = v;
                    if (base.options.scrollPerPage === true) {
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        base.currentItem = i;
                    }
                } else if (goal + (base.itemWidth / 20) < v && goal + (base.itemWidth / 20) > (array[i + 1] || array[i] - base.itemWidth) && base.moveDirection() === "right") {
                    if (base.options.scrollPerPage === true) {
                        closest = array[i + 1] || array[array.length - 1];
                        base.currentItem = $.inArray(closest, base.positionsInArray);
                    } else {
                        closest = array[i + 1];
                        base.currentItem = i + 1;
                    }
                }
            });
            return base.currentItem;
        },

        moveDirection : function () {
            var base = this,
                direction;
            if (base.newRelativeX < 0) {
                direction = "right";
                base.playDirection = "next";
            } else {
                direction = "left";
                base.playDirection = "prev";
            }
            return direction;
        },

        customEvents : function () {
            /*jslint unparam: true*/
            var base = this;
            base.$elem.on("owl.next", function () {
                base.next();
            });
            base.$elem.on("owl.prev", function () {
                base.prev();
            });
            base.$elem.on("owl.play", function (event, speed) {
                base.options.autoPlay = speed;
                base.play();
                base.hoverStatus = "play";
            });
            base.$elem.on("owl.stop", function () {
                base.stop();
                base.hoverStatus = "stop";
            });
            base.$elem.on("owl.goTo", function (event, item) {
                base.goTo(item);
            });
            base.$elem.on("owl.jumpTo", function (event, item) {
                base.jumpTo(item);
            });
        },

        stopOnHover : function () {
            var base = this;
            if (base.options.stopOnHover === true && base.browser.isTouch !== true && base.options.autoPlay !== false) {
                base.$elem.on("mouseover", function () {
                    base.stop();
                });
                base.$elem.on("mouseout", function () {
                    if (base.hoverStatus !== "stop") {
                        base.play();
                    }
                });
            }
        },

        lazyLoad : function () {
            var base = this,
                i,
                $item,
                itemNumber,
                $lazyImg,
                follow;

            if (base.options.lazyLoad === false) {
                return false;
            }
            for (i = 0; i < base.itemsAmount; i += 1) {
                $item = $(base.$owlItems[i]);

                if ($item.data("owl-loaded") === "loaded") {
                    continue;
                }

                itemNumber = $item.data("owl-item");
                $lazyImg = $item.find(".lazyOwl");

                if (typeof $lazyImg.data("src") !== "string") {
                    $item.data("owl-loaded", "loaded");
                    continue;
                }
                if ($item.data("owl-loaded") === undefined) {
                    $lazyImg.hide();
                    $item.addClass("loading").data("owl-loaded", "checked");
                }
                if (base.options.lazyFollow === true) {
                    follow = itemNumber >= base.currentItem;
                } else {
                    follow = true;
                }
                if (follow && itemNumber < base.currentItem + base.options.items && $lazyImg.length) {
                    $lazyImg.each(function() {
                        base.lazyPreload($item, $(this));
                    });
                }
            }
        },

        lazyPreload : function ($item, $lazyImg) {
            var base = this,
                iterations = 0,
                isBackgroundImg;

            if ($lazyImg.prop("tagName") === "DIV") {
                $lazyImg.css("background-image", "url(" + $lazyImg.data("src") + ")");
                isBackgroundImg = true;
            } else {
                $lazyImg[0].src = $lazyImg.data("src");
            }

            function showImage() {
                $item.data("owl-loaded", "loaded").removeClass("loading");
                $lazyImg.removeAttr("data-src");
                if (base.options.lazyEffect === "fade") {
                    $lazyImg.fadeIn(400);
                } else {
                    $lazyImg.show();
                }
                if (typeof base.options.afterLazyLoad === "function") {
                    base.options.afterLazyLoad.apply(this, [base.$elem]);
                }
            }

            function checkLazyImage() {
                iterations += 1;
                if (base.completeImg($lazyImg.get(0)) || isBackgroundImg === true) {
                    showImage();
                } else if (iterations <= 100) {//if image loads in less than 10 seconds 
                    window.setTimeout(checkLazyImage, 100);
                } else {
                    showImage();
                }
            }

            checkLazyImage();
        },

        autoHeight : function () {
            var base = this,
                $currentimg = $(base.$owlItems[base.currentItem]).find("img"),
                iterations;

            function addHeight() {
                var $currentItem = $(base.$owlItems[base.currentItem]).height();
                base.wrapperOuter.css("height", $currentItem + "px");
                if (!base.wrapperOuter.hasClass("autoHeight")) {
                    window.setTimeout(function () {
                        base.wrapperOuter.addClass("autoHeight");
                    }, 0);
                }
            }

            function checkImage() {
                iterations += 1;
                if (base.completeImg($currentimg.get(0))) {
                    addHeight();
                } else if (iterations <= 100) { //if image loads in less than 10 seconds 
                    window.setTimeout(checkImage, 100);
                } else {
                    base.wrapperOuter.css("height", ""); //Else remove height attribute
                }
            }

            if ($currentimg.get(0) !== undefined) {
                iterations = 0;
                checkImage();
            } else {
                addHeight();
            }
        },

        completeImg : function (img) {
            var naturalWidthType;

            if (!img.complete) {
                return false;
            }
            naturalWidthType = typeof img.naturalWidth;
            if (naturalWidthType !== "undefined" && img.naturalWidth === 0) {
                return false;
            }
            return true;
        },

        onVisibleItems : function () {
            var base = this,
                i;

            if (base.options.addClassActive === true) {
                base.$owlItems.removeClass("active");
            }
            base.visibleItems = [];
            for (i = base.currentItem; i < base.currentItem + base.options.items; i += 1) {
                base.visibleItems.push(i);

                if (base.options.addClassActive === true) {
                    $(base.$owlItems[i]).addClass("active");
                }
            }
            base.owl.visibleItems = base.visibleItems;
        },

        transitionTypes : function (className) {
            var base = this;
            //Currently available: "fade", "backSlide", "goDown", "fadeUp"
            base.outClass = "owl-" + className + "-out";
            base.inClass = "owl-" + className + "-in";
        },

        singleItemTransition : function () {
            var base = this,
                outClass = base.outClass,
                inClass = base.inClass,
                $currentItem = base.$owlItems.eq(base.currentItem),
                $prevItem = base.$owlItems.eq(base.prevItem),
                prevPos = Math.abs(base.positionsInArray[base.currentItem]) + base.positionsInArray[base.prevItem],
                origin = Math.abs(base.positionsInArray[base.currentItem]) + base.itemWidth / 2,
                animEnd = 'webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';

            base.isTransition = true;

            base.$owlWrapper
                .addClass('owl-origin')
                .css({
                    "-webkit-transform-origin" : origin + "px",
                    "-moz-perspective-origin" : origin + "px",
                    "perspective-origin" : origin + "px"
                });
            function transStyles(prevPos) {
                return {
                    "position" : "relative",
                    "left" : prevPos + "px"
                };
            }

            $prevItem
                .css(transStyles(prevPos, 10))
                .addClass(outClass)
                .on(animEnd, function () {
                    base.endPrev = true;
                    $prevItem.off(animEnd);
                    base.clearTransStyle($prevItem, outClass);
                });

            $currentItem
                .addClass(inClass)
                .on(animEnd, function () {
                    base.endCurrent = true;
                    $currentItem.off(animEnd);
                    base.clearTransStyle($currentItem, inClass);
                });
        },

        clearTransStyle : function (item, classToRemove) {
            var base = this;
            item.css({
                "position" : "",
                "left" : ""
            }).removeClass(classToRemove);

            if (base.endPrev && base.endCurrent) {
                base.$owlWrapper.removeClass('owl-origin');
                base.endPrev = false;
                base.endCurrent = false;
                base.isTransition = false;
            }
        },

        owlStatus : function () {
            var base = this;
            base.owl = {
                "userOptions"   : base.userOptions,
                "baseElement"   : base.$elem,
                "userItems"     : base.$userItems,
                "owlItems"      : base.$owlItems,
                "currentItem"   : base.currentItem,
                "prevItem"      : base.prevItem,
                "visibleItems"  : base.visibleItems,
                "isTouch"       : base.browser.isTouch,
                "browser"       : base.browser,
                "dragDirection" : base.dragDirection
            };
        },

        clearEvents : function () {
            var base = this;
            base.$elem.off(".owl owl mousedown.disableTextSelect");
            $(document).off(".owl owl");
            $(window).off("resize", base.resizer);
        },

        unWrap : function () {
            var base = this;
            if (base.$elem.children().length !== 0) {
                base.$owlWrapper.unwrap();
                base.$userItems.unwrap().unwrap();
                if (base.owlControls) {
                    base.owlControls.remove();
                }
            }
            base.clearEvents();
            base.$elem.attr({
                style: base.$elem.data("owl-originalStyles") || "",
                class: base.$elem.data("owl-originalClasses")
            });
        },

        destroy : function () {
            var base = this;
            base.stop();
            window.clearInterval(base.checkVisible);
            base.unWrap();
            base.$elem.removeData();
        },

        reinit : function (newOptions) {
            var base = this,
                options = $.extend({}, base.userOptions, newOptions);
            base.unWrap();
            base.init(options, base.$elem);
        },

        addItem : function (htmlString, targetPosition) {
            var base = this,
                position;

            if (!htmlString) {return false; }

            if (base.$elem.children().length === 0) {
                base.$elem.append(htmlString);
                base.setVars();
                return false;
            }
            base.unWrap();
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }
            if (position >= base.$userItems.length || position === -1) {
                base.$userItems.eq(-1).after(htmlString);
            } else {
                base.$userItems.eq(position).before(htmlString);
            }

            base.setVars();
        },

        removeItem : function (targetPosition) {
            var base = this,
                position;

            if (base.$elem.children().length === 0) {
                return false;
            }
            if (targetPosition === undefined || targetPosition === -1) {
                position = -1;
            } else {
                position = targetPosition;
            }

            base.unWrap();
            base.$userItems.eq(position).remove();
            base.setVars();
        }

    };

    $.fn.owlCarousel = function (options) {
        return this.each(function () {
            if ($(this).data("owl-init") === true) {
                return false;
            }
            $(this).data("owl-init", true);
            var carousel = Object.create(Carousel);
            carousel.init(options, this);
            $.data(this, "owlCarousel", carousel);
        });
    };

    $.fn.owlCarousel.options = {

        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [979, 3],
        itemsTablet : [768, 2],
        itemsTabletSmall : false,
        itemsMobile : [479, 1],
        singleItem : false,
        itemsScaleUp : false,

        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        autoPlay : false,
        stopOnHover : false,

        navigation : false,
        navigationText : ["prev", "next"],
        rewindNav : true,
        scrollPerPage : false,

        pagination : true,
        paginationNumbers : false,

        responsive : true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth : window,

        baseClass : "owl-carousel",
        theme : "owl-theme",

        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        autoHeight : false,

        jsonPath : false,
        jsonSuccess : false,

        dragBeforeAnimFinish : true,
        mouseDrag : true,
        touchDrag : true,

        addClassActive : false,
        transitionStyle : false,

        beforeUpdate : false,
        afterUpdate : false,
        beforeInit : false,
        afterInit : false,
        beforeMove : false,
        afterMove : false,
        afterAction : false,
        startDragging : false,
        afterLazyLoad: false
    };
    addEvent(window, 'load', initForm);

var highlight_array = new Array();

function initForm(){
  initializeFocus();
  var activeForm = document.getElementsByTagName('form')[0];
  addEvent(activeForm, 'submit', disableSubmitButton);
  ifInstructs();
  showRangeCounters();
}

function disableSubmitButton() {
  document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
  var fields = getElementsByClassName(document, "*", "field");
  
  for(i = 0; i < fields.length; i++) {
    if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
      fields[i].onclick = function() {highlight(this, 4);};
      fields[i].onfocus = function() {highlight(this, 4);};
    }
    else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
      fields[i].onfocus = function(){highlight(this, 3);};
    }
    else {
      fields[i].onfocus = function(){highlight(this, 2); };
    }
  }
}

function highlight(el, depth){
  if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
  if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
  if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
  
  addClassName(fieldContainer, 'focused', true);
  var focusedFields = getElementsByClassName(document, "*", "focused");
  
  for(i = 0; i < focusedFields.length; i++) {
    if(focusedFields[i] != fieldContainer){
      removeClassName(focusedFields[i], 'focused');
    }
  }
}

function ifInstructs(){
  var container = document.getElementById('public');
  if(container){
    removeClassName(container,'noI');
    var instructs = getElementsByClassName(document,"*","instruct");
    if(instructs == ''){
      addClassName(container,'noI',true);
    }
    if(container.offsetWidth <= 450){
      addClassName(container,'altInstruct',true);
    }
  }
}

function showRangeCounters(){
  counters = getElementsByClassName(document, "em", "currently");
  for(i = 0; i < counters.length; i++) {
    counters[i].style.display = 'inline';
  }
}

function validateRange(ColumnId, RangeType) {
  if(document.getElementById('rangeUsedMsg'+ColumnId)) {
    var field = document.getElementById('Field'+ColumnId);
    var msg = document.getElementById('rangeUsedMsg'+ColumnId);

    switch(RangeType) {
      case 'character':
        msg.innerHTML = field.value.length;
        break;
        
      case 'word':
        var val = field.value;
        val = val.replace(/\n/g, " ");
        var words = val.split(" ");
        var used = 0;
        for(i =0; i < words.length; i++) {
          if(words[i].replace(/\s+$/,"") != "") used++;
        }
        msg.innerHTML = used;
        break;
        
      case 'digit':
        msg.innerHTML = field.value.length;
        break;
    }
  }
}

/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];    
    if(oRegExp.test(oElement.className)){
      arrReturnElements.push(oElement);
    } 
  }
  return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );  
  }
}
}(jQuery, window, document));


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {


$('#video h3:empty').parent().parent().remove();
$('#design h3:empty').parent().parent().remove();
$('#photo h3:empty').parent().parent().remove();

 // $(".fancybox[href*='you']").removeClass('fancybox').addClass('fancybox.iframe');
$('.fancybox').fancybox();


  var owl = $("#design, #photo, #video");
 
  owl.owlCarousel({
      items : 5,
      itemsDesktop : [1575,4],
      itemsDesktopSmall : [1350,3],
      itemsTablet: [1000,2],
      itemsMobile : [600,1]
  });
 




  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();
  $('img.inset-shadow').each(function(){
      var $img = $(this);
      $img.load(function(){
          var $div = $('<div/>');
          $div.width($img.width());
          $div.height($img.height());
          $div.css('background-image', 'url('+$img.attr('src')+')');
          var display = $img.css('display');
          //If the div is set to inline the width and height will be 0 :(
          //inline-block appears to be the only way around it but it's not
          //supported in all browsers :( The browsers it's not supported in
          //are probably the same ones that don't support box-shadow,
          //so a solution maybe to add a browser check.
          if(display === 'inline'){
             // $div.css('display', 'inline-block');
          }else{
              $div.css('display', display);
          }
          $div.attr('class', $img.attr('class'));
          $img.replaceWith($div);
      });
  });

}); /* end of as page load scripts */

