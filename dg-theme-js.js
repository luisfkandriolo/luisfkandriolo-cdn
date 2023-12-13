!(function (t) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], t)
    : "undefined" != typeof exports
    ? (module.exports = t(require("jquery")))
    : t(jQuery);
})(function (t) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (i, o) {
      var a,
        s = this;
      (s.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: t(i),
        appendDots: t(i),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, i) {
          return t('<button type="button" />').text(i + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (s.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        t.extend(s, s.initials),
        (s.activeBreakpoint = null),
        (s.animType = null),
        (s.animProp = null),
        (s.breakpoints = []),
        (s.breakpointSettings = []),
        (s.cssTransitions = !1),
        (s.focussed = !1),
        (s.interrupted = !1),
        (s.hidden = "hidden"),
        (s.paused = !0),
        (s.positionProp = null),
        (s.respondTo = null),
        (s.rowCount = 1),
        (s.shouldClick = !0),
        (s.$slider = t(i)),
        (s.$slidesCache = null),
        (s.transformType = null),
        (s.transitionType = null),
        (s.visibilityChange = "visibilitychange"),
        (s.windowWidth = 0),
        (s.windowTimer = null),
        (a = t(i).data("slick") || {}),
        (s.options = t.extend({}, s.defaults, o, a)),
        (s.currentSlide = s.options.initialSlide),
        (s.originalSettings = s.options),
        void 0 !== document.mozHidden
          ? ((s.hidden = "mozHidden"),
            (s.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((s.hidden = "webkitHidden"),
            (s.visibilityChange = "webkitvisibilitychange")),
        (s.autoPlay = t.proxy(s.autoPlay, s)),
        (s.autoPlayClear = t.proxy(s.autoPlayClear, s)),
        (s.autoPlayIterator = t.proxy(s.autoPlayIterator, s)),
        (s.changeSlide = t.proxy(s.changeSlide, s)),
        (s.clickHandler = t.proxy(s.clickHandler, s)),
        (s.selectHandler = t.proxy(s.selectHandler, s)),
        (s.setPosition = t.proxy(s.setPosition, s)),
        (s.swipeHandler = t.proxy(s.swipeHandler, s)),
        (s.dragHandler = t.proxy(s.dragHandler, s)),
        (s.keyHandler = t.proxy(s.keyHandler, s)),
        (s.instanceUid = e++),
        (s.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        s.registerBreakpoints(),
        s.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, i, o) {
        var a = this;
        if ("boolean" == typeof i) (o = i), (i = null);
        else if (i < 0 || i >= a.slideCount) return !1;
        a.unload(),
          "number" == typeof i
            ? 0 === i && 0 === a.$slides.length
              ? t(e).appendTo(a.$slideTrack)
              : o
              ? t(e).insertBefore(a.$slides.eq(i))
              : t(e).insertAfter(a.$slides.eq(i))
            : !0 === o
            ? t(e).prependTo(a.$slideTrack)
            : t(e).appendTo(a.$slideTrack),
          (a.$slides = a.$slideTrack.children(this.options.slide)),
          a.$slideTrack.children(this.options.slide).detach(),
          a.$slideTrack.append(a.$slides),
          a.$slides.each(function (e, i) {
            t(i).attr("data-slick-index", e);
          }),
          (a.$slidesCache = a.$slides),
          a.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var t = this;
      if (
        1 === t.options.slidesToShow &&
        !0 === t.options.adaptiveHeight &&
        !1 === t.options.vertical
      ) {
        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
        t.$list.animate({ height: e }, t.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, i) {
      var o = {},
        a = this;
      a.animateHeight(),
        !0 === a.options.rtl && !1 === a.options.vertical && (e = -e),
        !1 === a.transformsEnabled
          ? !1 === a.options.vertical
            ? a.$slideTrack.animate(
                { left: e },
                a.options.speed,
                a.options.easing,
                i
              )
            : a.$slideTrack.animate(
                { top: e },
                a.options.speed,
                a.options.easing,
                i
              )
          : !1 === a.cssTransitions
          ? (!0 === a.options.rtl && (a.currentLeft = -a.currentLeft),
            t({ animStart: a.currentLeft }).animate(
              { animStart: e },
              {
                duration: a.options.speed,
                easing: a.options.easing,
                step: function (t) {
                  (t = Math.ceil(t)),
                    !1 === a.options.vertical
                      ? ((o[a.animType] = "translate(" + t + "px, 0px)"),
                        a.$slideTrack.css(o))
                      : ((o[a.animType] = "translate(0px," + t + "px)"),
                        a.$slideTrack.css(o));
                },
                complete: function () {
                  i && i.call();
                },
              }
            ))
          : (a.applyTransition(),
            (e = Math.ceil(e)),
            !1 === a.options.vertical
              ? (o[a.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[a.animType] = "translate3d(0px," + e + "px, 0px)"),
            a.$slideTrack.css(o),
            i &&
              setTimeout(function () {
                a.disableTransition(), i.call();
              }, a.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this.options.asNavFor;
      return e && null !== e && (e = t(e).not(this.$slider)), e;
    }),
    (e.prototype.asNavFor = function (e) {
      var i = this.getNavTarget();
      null !== i &&
        "object" == typeof i &&
        i.each(function () {
          var i = t(this).slick("getSlick");
          i.unslicked || i.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (t) {
      var e = this,
        i = {};
      !1 === e.options.fade
        ? (i[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (i[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
    }),
    (e.prototype.autoPlay = function () {
      var t = this;
      t.autoPlayClear(),
        t.slideCount > t.options.slidesToShow &&
          (t.autoPlayTimer = setInterval(
            t.autoPlayIterator,
            t.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var t = this,
        e = t.currentSlide + t.options.slidesToScroll;
      t.paused ||
        t.interrupted ||
        t.focussed ||
        (!1 === t.options.infinite &&
          (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
            ? (t.direction = 0)
            : 0 === t.direction &&
              ((e = t.currentSlide - t.options.slidesToScroll),
              t.currentSlide - 1 == 0 && (t.direction = 1))),
        t.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = t(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = t(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        i,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            i = t("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          i.append(t("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = i.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, i) {
          t(i)
            .attr("data-slick-index", e)
            .data("originalStyling", t(i).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? t('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        t("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var t,
        e,
        i,
        o,
        a,
        s,
        n,
        r = this;
      if (
        ((o = document.createDocumentFragment()),
        (s = r.$slider.children()),
        r.options.rows > 1)
      ) {
        for (
          n = r.options.slidesPerRow * r.options.rows,
            a = Math.ceil(s.length / n),
            t = 0;
          t < a;
          t++
        ) {
          var l = document.createElement("div");
          for (e = 0; e < r.options.rows; e++) {
            var c = document.createElement("div");
            for (i = 0; i < r.options.slidesPerRow; i++) {
              var d = t * n + (e * r.options.slidesPerRow + i);
              s.get(d) && c.appendChild(s.get(d));
            }
            l.appendChild(c);
          }
          o.appendChild(l);
        }
        r.$slider.empty().append(o),
          r.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / r.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, i) {
      var o,
        a,
        s,
        n = this,
        r = !1,
        l = n.$slider.width(),
        c = window.innerWidth || t(window).width();
      if (
        ("window" === n.respondTo
          ? (s = c)
          : "slider" === n.respondTo
          ? (s = l)
          : "min" === n.respondTo && (s = Math.min(c, l)),
        n.options.responsive &&
          n.options.responsive.length &&
          null !== n.options.responsive)
      ) {
        for (o in ((a = null), n.breakpoints))
          n.breakpoints.hasOwnProperty(o) &&
            (!1 === n.originalSettings.mobileFirst
              ? s < n.breakpoints[o] && (a = n.breakpoints[o])
              : s > n.breakpoints[o] && (a = n.breakpoints[o]));
        null !== a
          ? null !== n.activeBreakpoint
            ? (a !== n.activeBreakpoint || i) &&
              ((n.activeBreakpoint = a),
              "unslick" === n.breakpointSettings[a]
                ? n.unslick(a)
                : ((n.options = t.extend(
                    {},
                    n.originalSettings,
                    n.breakpointSettings[a]
                  )),
                  !0 === e && (n.currentSlide = n.options.initialSlide),
                  n.refresh(e)),
              (r = a))
            : ((n.activeBreakpoint = a),
              "unslick" === n.breakpointSettings[a]
                ? n.unslick(a)
                : ((n.options = t.extend(
                    {},
                    n.originalSettings,
                    n.breakpointSettings[a]
                  )),
                  !0 === e && (n.currentSlide = n.options.initialSlide),
                  n.refresh(e)),
              (r = a))
          : null !== n.activeBreakpoint &&
            ((n.activeBreakpoint = null),
            (n.options = n.originalSettings),
            !0 === e && (n.currentSlide = n.options.initialSlide),
            n.refresh(e),
            (r = a)),
          e || !1 === r || n.$slider.trigger("breakpoint", [n, r]);
      }
    }),
    (e.prototype.changeSlide = function (e, i) {
      var o,
        a,
        s = this,
        n = t(e.currentTarget);
      switch (
        (n.is("a") && e.preventDefault(),
        n.is("li") || (n = n.closest("li")),
        (o =
          s.slideCount % s.options.slidesToScroll != 0
            ? 0
            : (s.slideCount - s.currentSlide) % s.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (a = 0 === o ? s.options.slidesToScroll : s.options.slidesToShow - o),
            s.slideCount > s.options.slidesToShow &&
              s.slideHandler(s.currentSlide - a, !1, i);
          break;
        case "next":
          (a = 0 === o ? s.options.slidesToScroll : o),
            s.slideCount > s.options.slidesToShow &&
              s.slideHandler(s.currentSlide + a, !1, i);
          break;
        case "index":
          var r =
            0 === e.data.index
              ? 0
              : e.data.index || n.index() * s.options.slidesToScroll;
          s.slideHandler(s.checkNavigable(r), !1, i),
            n.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (t) {
      var e, i;
      if (((i = 0), t > (e = this.getNavigableIndexes())[e.length - 1]))
        t = e[e.length - 1];
      else
        for (var o in e) {
          if (t < e[o]) {
            t = i;
            break;
          }
          i = e[o];
        }
      return t;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (t("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", t.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", t.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        t(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          t(e.$slideTrack).children().off("click.slick", e.selectHandler),
        t(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        t(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        t("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        t(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", t.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var t,
        e = this;
      e.options.rows > 1 &&
        ((t = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(t));
    }),
    (e.prototype.clickHandler = function (t) {
      !1 === this.shouldClick &&
        (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var i = this;
      i.autoPlayClear(),
        (i.touchObject = {}),
        i.cleanUpEvents(),
        t(".slick-cloned", i.$slider).detach(),
        i.$dots && i.$dots.remove(),
        i.$prevArrow &&
          i.$prevArrow.length &&
          (i.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
        i.$nextArrow &&
          i.$nextArrow.length &&
          (i.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
        i.$slides &&
          (i.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              t(this).attr("style", t(this).data("originalStyling"));
            }),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slideTrack.detach(),
          i.$list.detach(),
          i.$slider.append(i.$slides)),
        i.cleanUpRows(),
        i.$slider.removeClass("slick-slider"),
        i.$slider.removeClass("slick-initialized"),
        i.$slider.removeClass("slick-dotted"),
        (i.unslicked = !0),
        e || i.$slider.trigger("destroy", [i]);
    }),
    (e.prototype.disableTransition = function (t) {
      var e = this,
        i = {};
      (i[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i);
    }),
    (e.prototype.fadeSlide = function (t, e) {
      var i = this;
      !1 === i.cssTransitions
        ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
          i.$slides
            .eq(t)
            .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
        : (i.applyTransition(t),
          i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
          e &&
            setTimeout(function () {
              i.disableTransition(t), e.call();
            }, i.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (t) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(t)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(t),
          e.$slides.eq(t).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (t) {
        var e = this;
        null !== t &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(t).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (i) {
          i.stopImmediatePropagation();
          var o = t(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var t = this,
        e = 0,
        i = 0,
        o = 0;
      if (!0 === t.options.infinite)
        if (t.slideCount <= t.options.slidesToShow) ++o;
        else
          for (; e < t.slideCount; )
            ++o,
              (e = i + t.options.slidesToScroll),
              (i +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow);
      else if (!0 === t.options.centerMode) o = t.slideCount;
      else if (t.options.asNavFor)
        for (; e < t.slideCount; )
          ++o,
            (e = i + t.options.slidesToScroll),
            (i +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (t) {
      var e,
        i,
        o,
        a,
        s = this,
        n = 0;
      return (
        (s.slideOffset = 0),
        (i = s.$slides.first().outerHeight(!0)),
        !0 === s.options.infinite
          ? (s.slideCount > s.options.slidesToShow &&
              ((s.slideOffset = s.slideWidth * s.options.slidesToShow * -1),
              (a = -1),
              !0 === s.options.vertical &&
                !0 === s.options.centerMode &&
                (2 === s.options.slidesToShow
                  ? (a = -1.5)
                  : 1 === s.options.slidesToShow && (a = -2)),
              (n = i * s.options.slidesToShow * a)),
            s.slideCount % s.options.slidesToScroll != 0 &&
              t + s.options.slidesToScroll > s.slideCount &&
              s.slideCount > s.options.slidesToShow &&
              (t > s.slideCount
                ? ((s.slideOffset =
                    (s.options.slidesToShow - (t - s.slideCount)) *
                    s.slideWidth *
                    -1),
                  (n = (s.options.slidesToShow - (t - s.slideCount)) * i * -1))
                : ((s.slideOffset =
                    (s.slideCount % s.options.slidesToScroll) *
                    s.slideWidth *
                    -1),
                  (n = (s.slideCount % s.options.slidesToScroll) * i * -1))))
          : t + s.options.slidesToShow > s.slideCount &&
            ((s.slideOffset =
              (t + s.options.slidesToShow - s.slideCount) * s.slideWidth),
            (n = (t + s.options.slidesToShow - s.slideCount) * i)),
        s.slideCount <= s.options.slidesToShow &&
          ((s.slideOffset = 0), (n = 0)),
        !0 === s.options.centerMode && s.slideCount <= s.options.slidesToShow
          ? (s.slideOffset =
              (s.slideWidth * Math.floor(s.options.slidesToShow)) / 2 -
              (s.slideWidth * s.slideCount) / 2)
          : !0 === s.options.centerMode && !0 === s.options.infinite
          ? (s.slideOffset +=
              s.slideWidth * Math.floor(s.options.slidesToShow / 2) -
              s.slideWidth)
          : !0 === s.options.centerMode &&
            ((s.slideOffset = 0),
            (s.slideOffset +=
              s.slideWidth * Math.floor(s.options.slidesToShow / 2))),
        (e =
          !1 === s.options.vertical
            ? t * s.slideWidth * -1 + s.slideOffset
            : t * i * -1 + n),
        !0 === s.options.variableWidth &&
          ((o =
            s.slideCount <= s.options.slidesToShow || !1 === s.options.infinite
              ? s.$slideTrack.children(".slick-slide").eq(t)
              : s.$slideTrack
                  .children(".slick-slide")
                  .eq(t + s.options.slidesToShow)),
          (e =
            !0 === s.options.rtl
              ? o[0]
                ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === s.options.centerMode &&
            ((o =
              s.slideCount <= s.options.slidesToShow ||
              !1 === s.options.infinite
                ? s.$slideTrack.children(".slick-slide").eq(t)
                : s.$slideTrack
                    .children(".slick-slide")
                    .eq(t + s.options.slidesToShow + 1)),
            (e =
              !0 === s.options.rtl
                ? o[0]
                  ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (s.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (t) {
        return this.options[t];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var t,
        e = this,
        i = 0,
        o = 0,
        a = [];
      for (
        !1 === e.options.infinite
          ? (t = e.slideCount)
          : ((i = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (t = 2 * e.slideCount));
        i < t;

      )
        a.push(i),
          (i = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return a;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        i,
        o = this;
      return (
        (i =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (a, s) {
              if (s.offsetLeft - i + t(s).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = s), !1;
            }),
            Math.abs(t(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (t, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(t) } }, e);
      }),
    (e.prototype.init = function (e) {
      var i = this;
      t(i.$slider).hasClass("slick-initialized") ||
        (t(i.$slider).addClass("slick-initialized"),
        i.buildRows(),
        i.buildOut(),
        i.setProps(),
        i.startLoad(),
        i.loadSlider(),
        i.initializeEvents(),
        i.updateArrows(),
        i.updateDots(),
        i.checkResponsive(!0),
        i.focusHandler()),
        e && i.$slider.trigger("init", [i]),
        !0 === i.options.accessibility && i.initADA(),
        i.options.autoplay && ((i.paused = !1), i.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        i = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (t) {
          return t >= 0 && t < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (i) {
              var a = o.indexOf(i);
              t(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + i,
                tabindex: -1,
              }),
                -1 !== a &&
                  t(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + a,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (a) {
              var s = o[a];
              t(this).attr({ role: "presentation" }),
                t(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + a,
                    "aria-controls": "slick-slide" + e.instanceUid + s,
                    "aria-label": a + 1 + " of " + i,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var a = e.currentSlide, s = a + e.options.slidesToShow; a < s; a++)
        e.$slides.eq(a).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var t = this;
      !0 === t.options.arrows &&
        t.slideCount > t.options.slidesToShow &&
        (t.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, t.changeSlide),
        t.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, t.changeSlide),
        !0 === t.options.accessibility &&
          (t.$prevArrow.on("keydown.slick", t.keyHandler),
          t.$nextArrow.on("keydown.slick", t.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (t("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          t("li", e.$dots)
            .on("mouseenter.slick", t.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", t.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", t.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", t.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        t(document).on(e.visibilityChange, t.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          t(e.$slideTrack).children().on("click.slick", e.selectHandler),
        t(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          t.proxy(e.orientationChange, e)
        ),
        t(window).on(
          "resize.slick.slick-" + e.instanceUid,
          t.proxy(e.resize, e)
        ),
        t("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        t(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        t(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var t = this;
      !0 === t.options.arrows &&
        t.slideCount > t.options.slidesToShow &&
        (t.$prevArrow.show(), t.$nextArrow.show()),
        !0 === t.options.dots &&
          t.slideCount > t.options.slidesToShow &&
          t.$dots.show();
    }),
    (e.prototype.keyHandler = function (t) {
      var e = this;
      t.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === t.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === t.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        t("img[data-lazy]", e).each(function () {
          var e = t(this),
            i = t(this).attr("data-lazy"),
            o = t(this).attr("data-srcset"),
            a = t(this).attr("data-sizes") || s.$slider.attr("data-sizes"),
            n = document.createElement("img");
          (n.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), a && e.attr("sizes", a)),
                e.attr("src", i).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                s.$slider.trigger("lazyLoaded", [s, e, i]);
            });
          }),
            (n.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                s.$slider.trigger("lazyLoadError", [s, e, i]);
            }),
            (n.src = i);
        });
      }
      var i,
        o,
        a,
        s = this;
      if (
        (!0 === s.options.centerMode
          ? !0 === s.options.infinite
            ? (a =
                (o = s.currentSlide + (s.options.slidesToShow / 2 + 1)) +
                s.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                s.currentSlide - (s.options.slidesToShow / 2 + 1)
              )),
              (a = s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
          : ((o = s.options.infinite
              ? s.options.slidesToShow + s.currentSlide
              : s.currentSlide),
            (a = Math.ceil(o + s.options.slidesToShow)),
            !0 === s.options.fade && (o > 0 && o--, a <= s.slideCount && a++)),
        (i = s.$slider.find(".slick-slide").slice(o, a)),
        "anticipated" === s.options.lazyLoad)
      )
        for (
          var n = o - 1, r = a, l = s.$slider.find(".slick-slide"), c = 0;
          c < s.options.slidesToScroll;
          c++
        )
          n < 0 && (n = s.slideCount - 1),
            (i = (i = i.add(l.eq(n))).add(l.eq(r))),
            n--,
            r++;
      e(i),
        s.slideCount <= s.options.slidesToShow
          ? e(s.$slider.find(".slick-slide"))
          : s.currentSlide >= s.slideCount - s.options.slidesToShow
          ? e(s.$slider.find(".slick-cloned").slice(0, s.options.slidesToShow))
          : 0 === s.currentSlide &&
            e(
              s.$slider.find(".slick-cloned").slice(-1 * s.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var t = this;
      t.setPosition(),
        t.$slideTrack.css({ opacity: 1 }),
        t.$slider.removeClass("slick-loading"),
        t.initUI(),
        "progressive" === t.options.lazyLoad && t.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      this.checkResponsive(), this.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        this.autoPlayClear(), (this.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var t = this;
        t.autoPlay(),
          (t.options.autoplay = !0),
          (t.paused = !1),
          (t.focussed = !1),
          (t.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var i = this;
      i.unslicked ||
        (i.$slider.trigger("afterChange", [i, e]),
        (i.animating = !1),
        i.slideCount > i.options.slidesToShow && i.setPosition(),
        (i.swipeLeft = null),
        i.options.autoplay && i.autoPlay(),
        !0 === i.options.accessibility &&
          (i.initADA(),
          i.options.focusOnChange &&
            t(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (t) {
      t.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var i,
        o,
        a,
        s,
        n,
        r = this,
        l = t("img[data-lazy]", r.$slider);
      l.length
        ? ((i = l.first()),
          (o = i.attr("data-lazy")),
          (a = i.attr("data-srcset")),
          (s = i.attr("data-sizes") || r.$slider.attr("data-sizes")),
          ((n = document.createElement("img")).onload = function () {
            a && (i.attr("srcset", a), s && i.attr("sizes", s)),
              i
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === r.options.adaptiveHeight && r.setPosition(),
              r.$slider.trigger("lazyLoaded", [r, i, o]),
              r.progressiveLazyLoad();
          }),
          (n.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  r.progressiveLazyLoad(e + 1);
                }, 500)
              : (i
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                r.$slider.trigger("lazyLoadError", [r, i, o]),
                r.progressiveLazyLoad());
          }),
          (n.src = o))
        : r.$slider.trigger("allImagesLoaded", [r]);
    }),
    (e.prototype.refresh = function (e) {
      var i,
        o,
        a = this;
      (o = a.slideCount - a.options.slidesToShow),
        !a.options.infinite && a.currentSlide > o && (a.currentSlide = o),
        a.slideCount <= a.options.slidesToShow && (a.currentSlide = 0),
        (i = a.currentSlide),
        a.destroy(!0),
        t.extend(a, a.initials, { currentSlide: i }),
        a.init(),
        e || a.changeSlide({ data: { message: "index", index: i } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        i,
        o,
        a = this,
        s = a.options.responsive || null;
      if ("array" === t.type(s) && s.length) {
        for (e in ((a.respondTo = a.options.respondTo || "window"), s))
          if (((o = a.breakpoints.length - 1), s.hasOwnProperty(e))) {
            for (i = s[e].breakpoint; o >= 0; )
              a.breakpoints[o] &&
                a.breakpoints[o] === i &&
                a.breakpoints.splice(o, 1),
                o--;
            a.breakpoints.push(i), (a.breakpointSettings[i] = s[e].settings);
          }
        a.breakpoints.sort(function (t, e) {
          return a.options.mobileFirst ? t - e : e - t;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          t(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      t(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = t(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (t, e, i) {
        var o = this;
        if (
          ((t =
            "boolean" == typeof t
              ? !0 === (e = t)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --t
              : t),
          o.slideCount < 1 || t < 0 || t > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === i
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(t).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (t) {
      var e,
        i,
        o = this,
        a = {};
      !0 === o.options.rtl && (t = -t),
        (e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
        (i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px"),
        (a[o.positionProp] = t),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(a)
          : ((a = {}),
            !1 === o.cssTransitions
              ? ((a[o.animType] = "translate(" + e + ", " + i + ")"),
                o.$slideTrack.css(a))
              : ((a[o.animType] = "translate3d(" + e + ", " + i + ", 0px)"),
                o.$slideTrack.css(a)));
    }),
    (e.prototype.setDimensions = function () {
      var t = this;
      !1 === t.options.vertical
        ? !0 === t.options.centerMode &&
          t.$list.css({ padding: "0px " + t.options.centerPadding })
        : (t.$list.height(
            t.$slides.first().outerHeight(!0) * t.options.slidesToShow
          ),
          !0 === t.options.centerMode &&
            t.$list.css({ padding: t.options.centerPadding + " 0px" })),
        (t.listWidth = t.$list.width()),
        (t.listHeight = t.$list.height()),
        !1 === t.options.vertical && !1 === t.options.variableWidth
          ? ((t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow)),
            t.$slideTrack.width(
              Math.ceil(
                t.slideWidth * t.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === t.options.variableWidth
          ? t.$slideTrack.width(5e3 * t.slideCount)
          : ((t.slideWidth = Math.ceil(t.listWidth)),
            t.$slideTrack.height(
              Math.ceil(
                t.$slides.first().outerHeight(!0) *
                  t.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
      !1 === t.options.variableWidth &&
        t.$slideTrack.children(".slick-slide").width(t.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        i = this;
      i.$slides.each(function (o, a) {
        (e = i.slideWidth * o * -1),
          !0 === i.options.rtl
            ? t(a).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0,
              })
            : t(a).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: i.options.zIndex - 2,
                opacity: 0,
              });
      }),
        i.$slides
          .eq(i.currentSlide)
          .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var t = this;
      if (
        1 === t.options.slidesToShow &&
        !0 === t.options.adaptiveHeight &&
        !1 === t.options.vertical
      ) {
        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
        t.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          i,
          o,
          a,
          s,
          n = this,
          r = !1;
        if (
          ("object" === t.type(arguments[0])
            ? ((o = arguments[0]), (r = arguments[1]), (s = "multiple"))
            : "string" === t.type(arguments[0]) &&
              ((o = arguments[0]),
              (a = arguments[1]),
              (r = arguments[2]),
              "responsive" === arguments[0] && "array" === t.type(arguments[1])
                ? (s = "responsive")
                : void 0 !== arguments[1] && (s = "single")),
          "single" === s)
        )
          n.options[o] = a;
        else if ("multiple" === s)
          t.each(o, function (t, e) {
            n.options[t] = e;
          });
        else if ("responsive" === s)
          for (i in a)
            if ("array" !== t.type(n.options.responsive))
              n.options.responsive = [a[i]];
            else {
              for (e = n.options.responsive.length - 1; e >= 0; )
                n.options.responsive[e].breakpoint === a[i].breakpoint &&
                  n.options.responsive.splice(e, 1),
                  e--;
              n.options.responsive.push(a[i]);
            }
        r && (n.unload(), n.reinit());
      }),
    (e.prototype.setPosition = function () {
      var t = this;
      t.setDimensions(),
        t.setHeight(),
        !1 === t.options.fade
          ? t.setCSS(t.getLeft(t.currentSlide))
          : t.setFade(),
        t.$slider.trigger("setPosition", [t]);
    }),
    (e.prototype.setProps = function () {
      var t = this,
        e = document.body.style;
      (t.positionProp = !0 === t.options.vertical ? "top" : "left"),
        "top" === t.positionProp
          ? t.$slider.addClass("slick-vertical")
          : t.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === t.options.useCSS && (t.cssTransitions = !0)),
        t.options.fade &&
          ("number" == typeof t.options.zIndex
            ? t.options.zIndex < 3 && (t.options.zIndex = 3)
            : (t.options.zIndex = t.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((t.animType = "OTransform"),
          (t.transformType = "-o-transform"),
          (t.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1)),
        void 0 !== e.MozTransform &&
          ((t.animType = "MozTransform"),
          (t.transformType = "-moz-transform"),
          (t.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (t.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((t.animType = "webkitTransform"),
          (t.transformType = "-webkit-transform"),
          (t.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1)),
        void 0 !== e.msTransform &&
          ((t.animType = "msTransform"),
          (t.transformType = "-ms-transform"),
          (t.transitionType = "msTransition"),
          void 0 === e.msTransform && (t.animType = !1)),
        void 0 !== e.transform &&
          !1 !== t.animType &&
          ((t.animType = "transform"),
          (t.transformType = "transform"),
          (t.transitionType = "transition")),
        (t.transformsEnabled =
          t.options.useTransform && null !== t.animType && !1 !== t.animType);
    }),
    (e.prototype.setSlideClasses = function (t) {
      var e,
        i,
        o,
        a,
        s = this;
      if (
        ((i = s.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        s.$slides.eq(t).addClass("slick-current"),
        !0 === s.options.centerMode)
      ) {
        var n = s.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(s.options.slidesToShow / 2)),
          !0 === s.options.infinite &&
            (t >= e && t <= s.slideCount - 1 - e
              ? s.$slides
                  .slice(t - e + n, t + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = s.options.slidesToShow + t),
                i
                  .slice(o - e + 1 + n, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === t
              ? i
                  .eq(i.length - 1 - s.options.slidesToShow)
                  .addClass("slick-center")
              : t === s.slideCount - 1 &&
                i.eq(s.options.slidesToShow).addClass("slick-center")),
          s.$slides.eq(t).addClass("slick-center");
      } else
        t >= 0 && t <= s.slideCount - s.options.slidesToShow
          ? s.$slides
              .slice(t, t + s.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : i.length <= s.options.slidesToShow
          ? i.addClass("slick-active").attr("aria-hidden", "false")
          : ((a = s.slideCount % s.options.slidesToShow),
            (o = !0 === s.options.infinite ? s.options.slidesToShow + t : t),
            s.options.slidesToShow == s.options.slidesToScroll &&
            s.slideCount - t < s.options.slidesToShow
              ? i
                  .slice(o - (s.options.slidesToShow - a), o + a)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : i
                  .slice(o, o + s.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== s.options.lazyLoad &&
        "anticipated" !== s.options.lazyLoad) ||
        s.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        i,
        o,
        a = this;
      if (
        (!0 === a.options.fade && (a.options.centerMode = !1),
        !0 === a.options.infinite &&
          !1 === a.options.fade &&
          ((i = null), a.slideCount > a.options.slidesToShow))
      ) {
        for (
          o =
            !0 === a.options.centerMode
              ? a.options.slidesToShow + 1
              : a.options.slidesToShow,
            e = a.slideCount;
          e > a.slideCount - o;
          e -= 1
        )
          (i = e - 1),
            t(a.$slides[i])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", i - a.slideCount)
              .prependTo(a.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + a.slideCount; e += 1)
          (i = e),
            t(a.$slides[i])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", i + a.slideCount)
              .appendTo(a.$slideTrack)
              .addClass("slick-cloned");
        a.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            t(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (t) {
      t || this.autoPlay(), (this.interrupted = t);
    }),
    (e.prototype.selectHandler = function (e) {
      var i = this,
        o = t(e.target).is(".slick-slide")
          ? t(e.target)
          : t(e.target).parents(".slick-slide"),
        a = parseInt(o.attr("data-slick-index"));
      a || (a = 0),
        i.slideCount <= i.options.slidesToShow
          ? i.slideHandler(a, !1, !0)
          : i.slideHandler(a);
    }),
    (e.prototype.slideHandler = function (t, e, i) {
      var o,
        a,
        s,
        n,
        r,
        l = null,
        c = this;
      if (
        ((e = e || !1),
        !(
          (!0 === c.animating && !0 === c.options.waitForAnimate) ||
          (!0 === c.options.fade && c.currentSlide === t)
        ))
      )
        if (
          (!1 === e && c.asNavFor(t),
          (o = t),
          (l = c.getLeft(o)),
          (n = c.getLeft(c.currentSlide)),
          (c.currentLeft = null === c.swipeLeft ? n : c.swipeLeft),
          !1 === c.options.infinite &&
            !1 === c.options.centerMode &&
            (t < 0 || t > c.getDotCount() * c.options.slidesToScroll))
        )
          !1 === c.options.fade &&
            ((o = c.currentSlide),
            !0 !== i
              ? c.animateSlide(n, function () {
                  c.postSlide(o);
                })
              : c.postSlide(o));
        else if (
          !1 === c.options.infinite &&
          !0 === c.options.centerMode &&
          (t < 0 || t > c.slideCount - c.options.slidesToScroll)
        )
          !1 === c.options.fade &&
            ((o = c.currentSlide),
            !0 !== i
              ? c.animateSlide(n, function () {
                  c.postSlide(o);
                })
              : c.postSlide(o));
        else {
          if (
            (c.options.autoplay && clearInterval(c.autoPlayTimer),
            (a =
              o < 0
                ? c.slideCount % c.options.slidesToScroll != 0
                  ? c.slideCount - (c.slideCount % c.options.slidesToScroll)
                  : c.slideCount + o
                : o >= c.slideCount
                ? c.slideCount % c.options.slidesToScroll != 0
                  ? 0
                  : o - c.slideCount
                : o),
            (c.animating = !0),
            c.$slider.trigger("beforeChange", [c, c.currentSlide, a]),
            (s = c.currentSlide),
            (c.currentSlide = a),
            c.setSlideClasses(c.currentSlide),
            c.options.asNavFor &&
              (r = (r = c.getNavTarget()).slick("getSlick")).slideCount <=
                r.options.slidesToShow &&
              r.setSlideClasses(c.currentSlide),
            c.updateDots(),
            c.updateArrows(),
            !0 === c.options.fade)
          )
            return (
              !0 !== i
                ? (c.fadeSlideOut(s),
                  c.fadeSlide(a, function () {
                    c.postSlide(a);
                  }))
                : c.postSlide(a),
              void c.animateHeight()
            );
          !0 !== i
            ? c.animateSlide(l, function () {
                c.postSlide(a);
              })
            : c.postSlide(a);
        }
    }),
    (e.prototype.startLoad = function () {
      var t = this;
      !0 === t.options.arrows &&
        t.slideCount > t.options.slidesToShow &&
        (t.$prevArrow.hide(), t.$nextArrow.hide()),
        !0 === t.options.dots &&
          t.slideCount > t.options.slidesToShow &&
          t.$dots.hide(),
        t.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var t,
        e,
        i,
        o,
        a = this;
      return (
        (t = a.touchObject.startX - a.touchObject.curX),
        (e = a.touchObject.startY - a.touchObject.curY),
        (i = Math.atan2(e, t)),
        (o = Math.round((180 * i) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === a.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === a.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === a.options.rtl
            ? "right"
            : "left"
          : !0 === a.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (t) {
      var e,
        i,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((i = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != i &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, i]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (t) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            t.originalEvent && void 0 !== t.originalEvent.touches
              ? t.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          t.data.action)
        ) {
          case "start":
            e.swipeStart(t);
            break;
          case "move":
            e.swipeMove(t);
            break;
          case "end":
            e.swipeEnd(t);
        }
    }),
    (e.prototype.swipeMove = function (t) {
      var e,
        i,
        o,
        a,
        s,
        n,
        r = this;
      return (
        (s = void 0 !== t.originalEvent ? t.originalEvent.touches : null),
        !(!r.dragging || r.scrolling || (s && 1 !== s.length)) &&
          ((e = r.getLeft(r.currentSlide)),
          (r.touchObject.curX = void 0 !== s ? s[0].pageX : t.clientX),
          (r.touchObject.curY = void 0 !== s ? s[0].pageY : t.clientY),
          (r.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))
          )),
          (n = Math.round(
            Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))
          )),
          !r.options.verticalSwiping && !r.swiping && n > 4
            ? ((r.scrolling = !0), !1)
            : (!0 === r.options.verticalSwiping &&
                (r.touchObject.swipeLength = n),
              (i = r.swipeDirection()),
              void 0 !== t.originalEvent &&
                r.touchObject.swipeLength > 4 &&
                ((r.swiping = !0), t.preventDefault()),
              (a =
                (!1 === r.options.rtl ? 1 : -1) *
                (r.touchObject.curX > r.touchObject.startX ? 1 : -1)),
              !0 === r.options.verticalSwiping &&
                (a = r.touchObject.curY > r.touchObject.startY ? 1 : -1),
              (o = r.touchObject.swipeLength),
              (r.touchObject.edgeHit = !1),
              !1 === r.options.infinite &&
                ((0 === r.currentSlide && "right" === i) ||
                  (r.currentSlide >= r.getDotCount() && "left" === i)) &&
                ((o = r.touchObject.swipeLength * r.options.edgeFriction),
                (r.touchObject.edgeHit = !0)),
              !1 === r.options.vertical
                ? (r.swipeLeft = e + o * a)
                : (r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * a),
              !0 === r.options.verticalSwiping && (r.swipeLeft = e + o * a),
              !0 !== r.options.fade &&
                !1 !== r.options.touchMove &&
                (!0 === r.animating
                  ? ((r.swipeLeft = null), !1)
                  : void r.setCSS(r.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (t) {
      var e,
        i = this;
      if (
        ((i.interrupted = !0),
        1 !== i.touchObject.fingerCount ||
          i.slideCount <= i.options.slidesToShow)
      )
        return (i.touchObject = {}), !1;
      void 0 !== t.originalEvent &&
        void 0 !== t.originalEvent.touches &&
        (e = t.originalEvent.touches[0]),
        (i.touchObject.startX = i.touchObject.curX =
          void 0 !== e ? e.pageX : t.clientX),
        (i.touchObject.startY = i.touchObject.curY =
          void 0 !== e ? e.pageY : t.clientY),
        (i.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var t = this;
        null !== t.$slidesCache &&
          (t.unload(),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slidesCache.appendTo(t.$slideTrack),
          t.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      t(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (t) {
      var e = this;
      e.$slider.trigger("unslick", [e, t]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var t = this;
      Math.floor(t.options.slidesToShow / 2),
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          !t.options.infinite &&
          (t.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          t.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === t.currentSlide
            ? (t.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : t.currentSlide >= t.slideCount - t.options.slidesToShow &&
              !1 === t.options.centerMode
            ? (t.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : t.currentSlide >= t.slideCount - 1 &&
              !0 === t.options.centerMode &&
              (t.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              t.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var t = this;
      null !== t.$dots &&
        (t.$dots.find("li").removeClass("slick-active").end(),
        t.$dots
          .find("li")
          .eq(Math.floor(t.currentSlide / t.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var t = this;
      t.options.autoplay &&
        (document[t.hidden] ? (t.interrupted = !0) : (t.interrupted = !1));
    }),
    (t.fn.slick = function () {
      var t,
        i,
        o = this,
        a = arguments[0],
        s = Array.prototype.slice.call(arguments, 1),
        n = o.length;
      for (t = 0; t < n; t++)
        if (
          ("object" == typeof a || void 0 === a
            ? (o[t].slick = new e(o[t], a))
            : (i = o[t].slick[a].apply(o[t].slick, s)),
          void 0 !== i)
        )
          return i;
      return o;
    });
}),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define(e)
      : (t.Sweetalert2 = e());
  })(this, function () {
    "use strict";
    function t(e) {
      return (t =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            })(e);
    }
    function e(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(t, e) {
      for (var i = 0; i < e.length; i++) {
        var o = e[i];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          "value" in o && (o.writable = !0),
          Object.defineProperty(t, o.key, o);
      }
    }
    function o(t, e, o) {
      return e && i(t.prototype, e), o && i(t, o), t;
    }
    function a() {
      return (a =
        Object.assign ||
        function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var o in i)
              Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o]);
          }
          return t;
        }).apply(this, arguments);
    }
    function s(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && r(t, e);
    }
    function n(t) {
      return (n = Object.setPrototypeOf
        ? Object.getPrototypeOf
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          })(t);
    }
    function r(t, e) {
      return (r =
        Object.setPrototypeOf ||
        function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
    }
    function l(t, e, i) {
      return (l = (function () {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function () {})
            ),
            !0
          );
        } catch (t) {
          return !1;
        }
      })()
        ? Reflect.construct
        : function (t, e, i) {
            var o = [null];
            o.push.apply(o, e);
            var a = new (Function.bind.apply(t, o))();
            return i && r(a, i.prototype), a;
          }).apply(null, arguments);
    }
    function c(t, e) {
      return !e || ("object" != typeof e && "function" != typeof e)
        ? (function (t) {
            if (void 0 === t)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return t;
          })(t)
        : e;
    }
    function d(t, e, i) {
      return (d =
        "undefined" != typeof Reflect && Reflect.get
          ? Reflect.get
          : function (t, e, i) {
              var o = (function (t, e) {
                for (
                  ;
                  !Object.prototype.hasOwnProperty.call(t, e) &&
                  null !== (t = n(t));

                );
                return t;
              })(t, e);
              if (o) {
                var a = Object.getOwnPropertyDescriptor(o, e);
                return a.get ? a.get.call(i) : a.value;
              }
            })(t, e, i || t);
    }
    var p = "SweetAlert2:",
      u = function (t) {
        return Array.prototype.slice.call(t);
      },
      h = function (t) {
        console.warn("".concat(p, " ").concat(t));
      },
      f = function (t) {
        console.error("".concat(p, " ").concat(t));
      },
      g = [],
      m = function (t) {
        -1 === g.indexOf(t) && (g.push(t), h(t));
      },
      v = function (t) {
        return "function" == typeof t ? t() : t;
      },
      w = function (e) {
        return e && "object" === t(e) && "function" == typeof e.then;
      },
      b = Object.freeze({
        cancel: "cancel",
        backdrop: "overlay",
        close: "close",
        esc: "esc",
        timer: "timer",
      }),
      y = function (t) {
        var e = {};
        for (var i in t) e[t[i]] = "swal2-" + t[i];
        return e;
      },
      k = y([
        "container",
        "shown",
        "height-auto",
        "iosfix",
        "popup",
        "modal",
        "no-backdrop",
        "toast",
        "toast-shown",
        "toast-column",
        "fade",
        "show",
        "hide",
        "noanimation",
        "close",
        "title",
        "header",
        "content",
        "actions",
        "confirm",
        "cancel",
        "footer",
        "icon",
        "icon-text",
        "image",
        "input",
        "file",
        "range",
        "select",
        "radio",
        "checkbox",
        "label",
        "textarea",
        "inputerror",
        "validation-message",
        "progresssteps",
        "activeprogressstep",
        "progresscircle",
        "progressline",
        "loading",
        "styled",
        "top",
        "top-start",
        "top-end",
        "top-left",
        "top-right",
        "center",
        "center-start",
        "center-end",
        "center-left",
        "center-right",
        "bottom",
        "bottom-start",
        "bottom-end",
        "bottom-left",
        "bottom-right",
        "grow-row",
        "grow-column",
        "grow-fullscreen",
        "rtl",
      ]),
      $ = y(["success", "warning", "info", "question", "error"]),
      C = { previousBodyPadding: null },
      x = function (t, e) {
        return t.classList.contains(e);
      },
      S = function (t) {
        if ((t.focus(), "file" !== t.type)) {
          var e = t.value;
          (t.value = ""), (t.value = e);
        }
      },
      T = function (t, e, i) {
        t &&
          e &&
          ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)),
          e.forEach(function (e) {
            t.forEach
              ? t.forEach(function (t) {
                  i ? t.classList.add(e) : t.classList.remove(e);
                })
              : i
              ? t.classList.add(e)
              : t.classList.remove(e);
          }));
      },
      A = function (t, e) {
        T(t, e, !0);
      },
      M = function (t, e) {
        T(t, e, !1);
      },
      O = function (t, e) {
        for (var i = 0; i < t.childNodes.length; i++)
          if (x(t.childNodes[i], e)) return t.childNodes[i];
      },
      H = function (t) {
        (t.style.opacity = ""),
          (t.style.display = t.id === k.content ? "block" : "flex");
      },
      P = function (t) {
        (t.style.opacity = ""), (t.style.display = "none");
      },
      L = function (t) {
        return (
          t && (t.offsetWidth || t.offsetHeight || t.getClientRects().length)
        );
      },
      B = function () {
        return document.body.querySelector("." + k.container);
      },
      Z = function (t) {
        var e = B();
        return e ? e.querySelector("." + t) : null;
      },
      E = function () {
        return Z(k.popup);
      },
      j = function () {
        var t = E();
        return u(t.querySelectorAll("." + k.icon));
      },
      _ = function () {
        return Z(k.title);
      },
      V = function () {
        return Z(k.content);
      },
      z = function () {
        return Z(k.image);
      },
      I = function () {
        return Z(k.progresssteps);
      },
      q = function () {
        return Z(k["validation-message"]);
      },
      D = function () {
        return Z(k.confirm);
      },
      W = function () {
        return Z(k.cancel);
      },
      R = function () {
        return Z(k.actions);
      },
      N = function () {
        return Z(k.footer);
      },
      U = function () {
        return Z(k.close);
      },
      F = function () {
        var t = u(
            E().querySelectorAll(
              '[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'
            )
          ).sort(function (t, e) {
            return (
              (t = parseInt(t.getAttribute("tabindex"))),
              (e = parseInt(e.getAttribute("tabindex"))) < t
                ? 1
                : t < e
                ? -1
                : 0
            );
          }),
          e = u(
            E().querySelectorAll(
              'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]'
            )
          ).filter(function (t) {
            return "-1" !== t.getAttribute("tabindex");
          });
        return (function (t) {
          for (var e = [], i = 0; i < t.length; i++)
            -1 === e.indexOf(t[i]) && e.push(t[i]);
          return e;
        })(t.concat(e)).filter(function (t) {
          return L(t);
        });
      },
      X = function () {
        return !Y() && !document.body.classList.contains(k["no-backdrop"]);
      },
      Y = function () {
        return document.body.classList.contains(k["toast-shown"]);
      },
      K = function () {
        return "undefined" == typeof window || "undefined" == typeof document;
      },
      Q = '\n <div aria-labelledby="'
        .concat(k.title, '" aria-describedby="')
        .concat(k.content, '" class="')
        .concat(k.popup, '" tabindex="-1">\n   <div class="')
        .concat(k.header, '">\n     <ul class="')
        .concat(k.progresssteps, '"></ul>\n     <div class="')
        .concat(k.icon, " ")
        .concat(
          $.error,
          '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="'
        )
        .concat(k.icon, " ")
        .concat($.question, '">\n       <span class="')
        .concat(k["icon-text"], '">?</span>\n      </div>\n     <div class="')
        .concat(k.icon, " ")
        .concat($.warning, '">\n       <span class="')
        .concat(k["icon-text"], '">!</span>\n      </div>\n     <div class="')
        .concat(k.icon, " ")
        .concat($.info, '">\n       <span class="')
        .concat(k["icon-text"], '">i</span>\n      </div>\n     <div class="')
        .concat(k.icon, " ")
        .concat(
          $.success,
          '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="'
        )
        .concat(k.image, '" />\n     <h2 class="')
        .concat(k.title, '" id="')
        .concat(k.title, '"></h2>\n     <button type="button" class="')
        .concat(k.close, '">Ãƒâ€”</button>\n   </div>\n   <div class="')
        .concat(k.content, '">\n     <div id="')
        .concat(k.content, '"></div>\n     <input class="')
        .concat(k.input, '" />\n     <input type="file" class="')
        .concat(k.file, '" />\n     <div class="')
        .concat(
          k.range,
          '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="'
        )
        .concat(k.select, '"></select>\n     <div class="')
        .concat(k.radio, '"></div>\n     <label for="')
        .concat(k.checkbox, '" class="')
        .concat(
          k.checkbox,
          '">\n       <input type="checkbox" />\n       <span class="'
        )
        .concat(k.label, '"></span>\n     </label>\n     <textarea class="')
        .concat(k.textarea, '"></textarea>\n     <div class="')
        .concat(k["validation-message"], '" id="')
        .concat(k["validation-message"], '"></div>\n   </div>\n   <div class="')
        .concat(k.actions, '">\n     <button type="button" class="')
        .concat(k.confirm, '">OK</button>\n     <button type="button" class="')
        .concat(k.cancel, '">Cancel</button>\n   </div>\n   <div class="')
        .concat(k.footer, '">\n   </div>\n </div>\n')
        .replace(/(^|\n)\s*/g, ""),
      G = function (t) {
        var e = B();
        if (
          (e &&
            (e.parentNode.removeChild(e),
            M(
              [document.documentElement, document.body],
              [k["no-backdrop"], k["toast-shown"], k["has-column"]]
            )),
          !K())
        ) {
          var i = document.createElement("div");
          (i.className = k.container), (i.innerHTML = Q);
          var o =
            "string" == typeof t.target
              ? document.querySelector(t.target)
              : t.target;
          o.appendChild(i);
          var a,
            s = E(),
            n = V(),
            r = O(n, k.input),
            l = O(n, k.file),
            c = n.querySelector(".".concat(k.range, " input")),
            d = n.querySelector(".".concat(k.range, " output")),
            p = O(n, k.select),
            u = n.querySelector(".".concat(k.checkbox, " input")),
            h = O(n, k.textarea);
          s.setAttribute("role", t.toast ? "alert" : "dialog"),
            s.setAttribute("aria-live", t.toast ? "polite" : "assertive"),
            t.toast || s.setAttribute("aria-modal", "true"),
            "rtl" === window.getComputedStyle(o).direction && A(B(), k.rtl);
          var g = function (t) {
            Bt.isVisible() &&
              a !== t.target.value &&
              Bt.resetValidationMessage(),
              (a = t.target.value);
          };
          return (
            (r.oninput = g),
            (l.onchange = g),
            (p.onchange = g),
            (u.onchange = g),
            (h.oninput = g),
            (c.oninput = function (t) {
              g(t), (d.value = c.value);
            }),
            (c.onchange = function (t) {
              g(t), (c.nextSibling.value = c.value);
            }),
            s
          );
        }
        f("SweetAlert2 requires document to initialize");
      },
      J = function (e, i) {
        if (!e) return P(i);
        if ("object" === t(e))
          if (((i.innerHTML = ""), 0 in e))
            for (var o = 0; o in e; o++) i.appendChild(e[o].cloneNode(!0));
          else i.appendChild(e.cloneNode(!0));
        else e && (i.innerHTML = e);
        H(i);
      },
      tt = (function () {
        if (K()) return !1;
        var t = document.createElement("div"),
          e = {
            WebkitAnimation: "webkitAnimationEnd",
            OAnimation: "oAnimationEnd oanimationend",
            animation: "animationend",
          };
        for (var i in e)
          if (e.hasOwnProperty(i) && void 0 !== t.style[i]) return e[i];
        return !1;
      })(),
      et = function (t) {
        var e = I(),
          i = parseInt(
            null === t.currentProgressStep
              ? Bt.getQueueStep()
              : t.currentProgressStep,
            10
          );
        t.progressSteps && t.progressSteps.length
          ? (H(e),
            (e.innerHTML = ""),
            i >= t.progressSteps.length &&
              h(
                "Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"
              ),
            t.progressSteps.forEach(function (o, a) {
              var s = document.createElement("li");
              if (
                (A(s, k.progresscircle),
                (s.innerHTML = o),
                a === i && A(s, k.activeprogressstep),
                e.appendChild(s),
                a !== t.progressSteps.length - 1)
              ) {
                var n = document.createElement("li");
                A(n, k.progressline),
                  t.progressStepsDistance &&
                    (n.style.width = t.progressStepsDistance),
                  e.appendChild(n);
              }
            }))
          : P(e);
      },
      it = function () {
        return !!window.MSInputMethodContext && !!document.documentMode;
      },
      ot = function () {
        var t = B(),
          e = E();
        t.style.removeProperty("align-items"),
          e.offsetTop < 0 && (t.style.alignItems = "flex-start");
      },
      at = {},
      st = function (t, e) {
        var i = B(),
          o = E();
        if (o) {
          null !== t && "function" == typeof t && t(o),
            M(o, k.show),
            A(o, k.hide);
          var a = function () {
            Y()
              ? nt(e)
              : (new Promise(function (t) {
                  var e = window.scrollX,
                    i = window.scrollY;
                  (at.restoreFocusTimeout = setTimeout(function () {
                    at.previousActiveElement && at.previousActiveElement.focus
                      ? (at.previousActiveElement.focus(),
                        (at.previousActiveElement = null))
                      : document.body && document.body.focus(),
                      t();
                  }, 100)),
                    void 0 !== e && void 0 !== i && window.scrollTo(e, i);
                }).then(function () {
                  return nt(e);
                }),
                at.keydownTarget.removeEventListener(
                  "keydown",
                  at.keydownHandler,
                  { capture: at.keydownListenerCapture }
                ),
                (at.keydownHandlerAdded = !1)),
              i.parentNode && i.parentNode.removeChild(i),
              M(
                [document.documentElement, document.body],
                [
                  k.shown,
                  k["height-auto"],
                  k["no-backdrop"],
                  k["toast-shown"],
                  k["toast-column"],
                ]
              ),
              X() &&
                (null !== C.previousBodyPadding &&
                  ((document.body.style.paddingRight = C.previousBodyPadding),
                  (C.previousBodyPadding = null)),
                (function () {
                  if (x(document.body, k.iosfix)) {
                    var t = parseInt(document.body.style.top, 10);
                    M(document.body, k.iosfix),
                      (document.body.style.top = ""),
                      (document.body.scrollTop = -1 * t);
                  }
                })(),
                "undefined" != typeof window &&
                  it() &&
                  window.removeEventListener("resize", ot),
                u(document.body.children).forEach(function (t) {
                  t.hasAttribute("data-previous-aria-hidden")
                    ? (t.setAttribute(
                        "aria-hidden",
                        t.getAttribute("data-previous-aria-hidden")
                      ),
                      t.removeAttribute("data-previous-aria-hidden"))
                    : t.removeAttribute("aria-hidden");
                }));
          };
          tt && !x(o, k.noanimation)
            ? o.addEventListener(tt, function t() {
                o.removeEventListener(tt, t), x(o, k.hide) && a();
              })
            : a();
        }
      },
      nt = function (t) {
        null !== t &&
          "function" == typeof t &&
          setTimeout(function () {
            t();
          });
      };
    function rt(t) {
      var e = function t() {
        for (var e = arguments.length, i = new Array(e), o = 0; o < e; o++)
          i[o] = arguments[o];
        if (!(this instanceof t)) return l(t, i);
        Object.getPrototypeOf(t).apply(this, i);
      };
      return (
        (e.prototype = a(Object.create(t.prototype), { constructor: e })),
        "function" == typeof Object.setPrototypeOf
          ? Object.setPrototypeOf(e, t)
          : (e.__proto__ = t),
        e
      );
    }
    var lt = {
        title: "",
        titleText: "",
        text: "",
        html: "",
        footer: "",
        type: null,
        toast: !1,
        customClass: "",
        target: "body",
        backdrop: !0,
        animation: !0,
        heightAuto: !0,
        allowOutsideClick: !0,
        allowEscapeKey: !0,
        allowEnterKey: !0,
        stopKeydownPropagation: !0,
        keydownListenerCapture: !1,
        showConfirmButton: !0,
        showCancelButton: !1,
        preConfirm: null,
        confirmButtonText: "OK",
        confirmButtonAriaLabel: "",
        confirmButtonColor: null,
        confirmButtonClass: null,
        cancelButtonText: "Cancel",
        cancelButtonAriaLabel: "",
        cancelButtonColor: null,
        cancelButtonClass: null,
        buttonsStyling: !0,
        reverseButtons: !1,
        focusConfirm: !0,
        focusCancel: !1,
        showCloseButton: !1,
        closeButtonAriaLabel: "Close this dialog",
        showLoaderOnConfirm: !1,
        imageUrl: null,
        imageWidth: null,
        imageHeight: null,
        imageAlt: "",
        imageClass: null,
        timer: null,
        width: null,
        padding: null,
        background: null,
        input: null,
        inputPlaceholder: "",
        inputValue: "",
        inputOptions: {},
        inputAutoTrim: !0,
        inputClass: null,
        inputAttributes: {},
        inputValidator: null,
        validationMessage: null,
        grow: !1,
        position: "center",
        progressSteps: [],
        currentProgressStep: null,
        progressStepsDistance: null,
        onBeforeOpen: null,
        onAfterClose: null,
        onOpen: null,
        onClose: null,
        useRejections: !1,
        expectRejections: !1,
      },
      ct = ["useRejections", "expectRejections", "extraParams"],
      dt = [
        "allowOutsideClick",
        "allowEnterKey",
        "backdrop",
        "focusConfirm",
        "focusCancel",
        "heightAuto",
        "keydownListenerCapture",
      ],
      pt = function (t) {
        return lt.hasOwnProperty(t) || "extraParams" === t;
      },
      ut = function (t) {
        return -1 !== ct.indexOf(t);
      },
      ht = function (t) {
        for (var e in t)
          pt(e) || h('Unknown parameter "'.concat(e, '"')),
            t.toast &&
              -1 !== dt.indexOf(e) &&
              h('The parameter "'.concat(e, '" is incompatible with toasts')),
            ut(e) &&
              m(
                'The parameter "'.concat(
                  e,
                  '" is deprecated and will be removed in the next major release.'
                )
              );
      },
      ft =
        '"setDefaults" & "resetDefaults" methods are deprecated in favor of "mixin" method and will be removed in the next major release. For new projects, use "mixin". For past projects already using "setDefaults", support will be provided through an additional package.',
      gt = {},
      mt = [],
      vt = function () {
        var t = E();
        t || Bt(""), (t = E());
        var e = R(),
          i = D(),
          o = W();
        H(e),
          H(i),
          A([t, e], k.loading),
          (i.disabled = !0),
          (o.disabled = !0),
          t.setAttribute("data-loading", !0),
          t.setAttribute("aria-busy", !0),
          t.focus();
      },
      wt = Object.freeze({
        isValidParameter: pt,
        isDeprecatedParameter: ut,
        argsToParams: function (e) {
          var i = {};
          switch (t(e[0])) {
            case "object":
              a(i, e[0]);
              break;
            default:
              ["title", "html", "type"].forEach(function (o, a) {
                switch (t(e[a])) {
                  case "string":
                    i[o] = e[a];
                    break;
                  case "undefined":
                    break;
                  default:
                    f(
                      "Unexpected type of "
                        .concat(o, '! Expected "string", got ')
                        .concat(t(e[a]))
                    );
                }
              });
          }
          return i;
        },
        adaptInputValidator: function (t) {
          return function (e, i) {
            return t.call(this, e, i).then(
              function () {},
              function (t) {
                return t;
              }
            );
          };
        },
        close: st,
        closePopup: st,
        closeModal: st,
        closeToast: st,
        isVisible: function () {
          return !!E();
        },
        clickConfirm: function () {
          return D().click();
        },
        clickCancel: function () {
          return W().click();
        },
        getContainer: B,
        getPopup: E,
        getTitle: _,
        getContent: V,
        getImage: z,
        getIcons: j,
        getCloseButton: U,
        getButtonsWrapper: function () {
          return (
            m(
              "swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead"
            ),
            Z(k.actions)
          );
        },
        getActions: R,
        getConfirmButton: D,
        getCancelButton: W,
        getFooter: N,
        getFocusableElements: F,
        getValidationMessage: q,
        isLoading: function () {
          return E().hasAttribute("data-loading");
        },
        fire: function () {
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
            e[i] = arguments[i];
          return l(this, e);
        },
        mixin: function (t) {
          return rt(
            (function (i) {
              function r() {
                return e(this, r), c(this, n(r).apply(this, arguments));
              }
              return (
                s(r, i),
                o(r, [
                  {
                    key: "_main",
                    value: function (e) {
                      return d(n(r.prototype), "_main", this).call(
                        this,
                        a({}, t, e)
                      );
                    },
                  },
                ]),
                r
              );
            })(this)
          );
        },
        queue: function (t) {
          var e = this;
          mt = t;
          var i = function () {
              (mt = []), document.body.removeAttribute("data-swal2-queue-step");
            },
            o = [];
          return new Promise(function (t) {
            !(function a(s, n) {
              s < mt.length
                ? (document.body.setAttribute("data-swal2-queue-step", s),
                  e(mt[s]).then(function (e) {
                    void 0 !== e.value
                      ? (o.push(e.value), a(s + 1, n))
                      : (i(), t({ dismiss: e.dismiss }));
                  }))
                : (i(), t({ value: o }));
            })(0);
          });
        },
        getQueueStep: function () {
          return document.body.getAttribute("data-swal2-queue-step");
        },
        insertQueueStep: function (t, e) {
          return e && e < mt.length ? mt.splice(e, 0, t) : mt.push(t);
        },
        deleteQueueStep: function (t) {
          void 0 !== mt[t] && mt.splice(t, 1);
        },
        showLoading: vt,
        enableLoading: vt,
        getTimerLeft: function () {
          return at.timeout && at.timeout.getTimerLeft();
        },
      }),
      bt =
        "function" == typeof Symbol
          ? Symbol
          : (function () {
              var t = 0;
              function e(e) {
                return (
                  "__" +
                  e +
                  "_" +
                  Math.floor(1e9 * Math.random()) +
                  "_" +
                  ++t +
                  "__"
                );
              }
              return (e.iterator = e("Symbol.iterator")), e;
            })(),
      yt =
        "function" == typeof WeakMap
          ? WeakMap
          : (function (t, e, i) {
              function o() {
                e(this, t, { value: bt("WeakMap") });
              }
              return (
                (o.prototype = {
                  delete: function (e) {
                    delete e[this[t]];
                  },
                  get: function (e) {
                    return e[this[t]];
                  },
                  has: function (e) {
                    return i.call(e, this[t]);
                  },
                  set: function (i, o) {
                    e(i, this[t], { configurable: !0, value: o });
                  },
                }),
                o
              );
            })(bt("WeakMap"), Object.defineProperty, {}.hasOwnProperty),
      kt = { promise: new yt(), innerParams: new yt(), domCache: new yt() };
    function $t() {
      var t = kt.innerParams.get(this),
        e = kt.domCache.get(this);
      t.showConfirmButton ||
        (P(e.confirmButton), t.showCancelButton || P(e.actions)),
        M([e.popup, e.actions], k.loading),
        e.popup.removeAttribute("aria-busy"),
        e.popup.removeAttribute("data-loading"),
        (e.confirmButton.disabled = !1),
        (e.cancelButton.disabled = !1);
    }
    function Ct(t) {
      var e = kt.domCache.get(this);
      e.validationMessage.innerHTML = t;
      var i = window.getComputedStyle(e.popup);
      (e.validationMessage.style.marginLeft = "-".concat(
        i.getPropertyValue("padding-left")
      )),
        (e.validationMessage.style.marginRight = "-".concat(
          i.getPropertyValue("padding-right")
        )),
        H(e.validationMessage);
      var o = this.getInput();
      o &&
        (o.setAttribute("aria-invalid", !0),
        o.setAttribute("aria-describedBy", k["validation-message"]),
        S(o),
        A(o, k.inputerror));
    }
    function xt() {
      var t = kt.domCache.get(this);
      t.validationMessage && P(t.validationMessage);
      var e = this.getInput();
      e &&
        (e.removeAttribute("aria-invalid"),
        e.removeAttribute("aria-describedBy"),
        M(e, k.inputerror));
    }
    var St,
      Tt = function t(i, o) {
        var a, s, n;
        e(this, t);
        var r = o;
        (this.start = function () {
          (n = !0), (s = new Date()), (a = setTimeout(i, r));
        }),
          (this.stop = function () {
            (n = !1), clearTimeout(a), (r -= new Date() - s);
          }),
          (this.getTimerLeft = function () {
            return n && (this.stop(), this.start()), r;
          }),
          this.start();
      },
      At = {
        email: function (t, e) {
          return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t)
            ? Promise.resolve()
            : Promise.reject(
                e && e.validationMessage
                  ? e.validationMessage
                  : "Invalid email address"
              );
        },
        url: function (t, e) {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&\/\/=]*)$/.test(
            t
          )
            ? Promise.resolve()
            : Promise.reject(
                e && e.validationMessage ? e.validationMessage : "Invalid URL"
              );
        },
      },
      Mt = function (t) {
        var e = B(),
          i = E();
        null !== t.onBeforeOpen &&
          "function" == typeof t.onBeforeOpen &&
          t.onBeforeOpen(i),
          t.animation
            ? (A(i, k.show), A(e, k.fade), M(i, k.hide))
            : M(i, k.fade),
          H(i),
          (e.style.overflowY = "hidden"),
          tt && !x(i, k.noanimation)
            ? i.addEventListener(tt, function t() {
                i.removeEventListener(tt, t), (e.style.overflowY = "auto");
              })
            : (e.style.overflowY = "auto"),
          A([document.documentElement, document.body, e], k.shown),
          t.heightAuto &&
            t.backdrop &&
            !t.toast &&
            A([document.documentElement, document.body], k["height-auto"]),
          X() &&
            (null === C.previousBodyPadding &&
              document.body.scrollHeight > window.innerHeight &&
              ((C.previousBodyPadding = parseInt(
                window
                  .getComputedStyle(document.body)
                  .getPropertyValue("padding-right")
              )),
              (document.body.style.paddingRight =
                C.previousBodyPadding +
                (function () {
                  if ("ontouchstart" in window || navigator.msMaxTouchPoints)
                    return 0;
                  var t = document.createElement("div");
                  (t.style.width = "50px"),
                    (t.style.height = "50px"),
                    (t.style.overflow = "scroll"),
                    document.body.appendChild(t);
                  var e = t.offsetWidth - t.clientWidth;
                  return document.body.removeChild(t), e;
                })() +
                "px")),
            (function () {
              if (
                /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                !window.MSStream &&
                !x(document.body, k.iosfix)
              ) {
                var t = document.body.scrollTop;
                (document.body.style.top = -1 * t + "px"),
                  A(document.body, k.iosfix);
              }
            })(),
            "undefined" != typeof window &&
              it() &&
              (ot(), window.addEventListener("resize", ot)),
            u(document.body.children).forEach(function (t) {
              t === B() ||
                t.contains(B()) ||
                (t.hasAttribute("aria-hidden") &&
                  t.setAttribute(
                    "data-previous-aria-hidden",
                    t.getAttribute("aria-hidden")
                  ),
                t.setAttribute("aria-hidden", "true"));
            }),
            setTimeout(function () {
              e.scrollTop = 0;
            })),
          Y() ||
            at.previousActiveElement ||
            (at.previousActiveElement = document.activeElement),
          null !== t.onOpen &&
            "function" == typeof t.onOpen &&
            setTimeout(function () {
              t.onOpen(i);
            });
      },
      Ot = Object.freeze({
        hideLoading: $t,
        disableLoading: $t,
        getInput: function (t) {
          var e = kt.innerParams.get(this),
            i = kt.domCache.get(this);
          if (!(t = t || e.input)) return null;
          switch (t) {
            case "select":
            case "textarea":
            case "file":
              return O(i.content, k[t]);
            case "checkbox":
              return i.popup.querySelector(".".concat(k.checkbox, " input"));
            case "radio":
              return (
                i.popup.querySelector(".".concat(k.radio, " input:checked")) ||
                i.popup.querySelector(".".concat(k.radio, " input:first-child"))
              );
            case "range":
              return i.popup.querySelector(".".concat(k.range, " input"));
            default:
              return O(i.content, k.input);
          }
        },
        enableButtons: function () {
          var t = kt.domCache.get(this);
          (t.confirmButton.disabled = !1), (t.cancelButton.disabled = !1);
        },
        disableButtons: function () {
          var t = kt.domCache.get(this);
          (t.confirmButton.disabled = !0), (t.cancelButton.disabled = !0);
        },
        enableConfirmButton: function () {
          kt.domCache.get(this).confirmButton.disabled = !1;
        },
        disableConfirmButton: function () {
          kt.domCache.get(this).confirmButton.disabled = !0;
        },
        enableInput: function () {
          var t = this.getInput();
          if (!t) return !1;
          if ("radio" === t.type)
            for (
              var e = t.parentNode.parentNode.querySelectorAll("input"), i = 0;
              i < e.length;
              i++
            )
              e[i].disabled = !1;
          else t.disabled = !1;
        },
        disableInput: function () {
          var t = this.getInput();
          if (!t) return !1;
          if (t && "radio" === t.type)
            for (
              var e = t.parentNode.parentNode.querySelectorAll("input"), i = 0;
              i < e.length;
              i++
            )
              e[i].disabled = !0;
          else t.disabled = !0;
        },
        showValidationMessage: Ct,
        resetValidationMessage: xt,
        resetValidationError: function () {
          m(
            "Swal.resetValidationError() is deprecated and will be removed in the next major release, use Swal.resetValidationMessage() instead"
          ),
            xt.bind(this)();
        },
        showValidationError: function (t) {
          m(
            "Swal.showValidationError() is deprecated and will be removed in the next major release, use Swal.showValidationMessage() instead"
          ),
            Ct.bind(this)(t);
        },
        getProgressSteps: function () {
          return kt.innerParams.get(this).progressSteps;
        },
        setProgressSteps: function (t) {
          var e = a({}, kt.innerParams.get(this), { progressSteps: t });
          kt.innerParams.set(this, e), et(e);
        },
        showProgressSteps: function () {
          var t = kt.domCache.get(this);
          H(t.progressSteps);
        },
        hideProgressSteps: function () {
          var t = kt.domCache.get(this);
          P(t.progressSteps);
        },
        _main: function (e) {
          var i = this;
          ht(e);
          var o = a({}, lt, e);
          !(function (e) {
            var i;
            e.inputValidator ||
              Object.keys(At).forEach(function (t) {
                e.input === t &&
                  (e.inputValidator = e.expectRejections
                    ? At[t]
                    : Bt.adaptInputValidator(At[t]));
              }),
              e.validationMessage &&
                ("object" !== t(e.extraParams) && (e.extraParams = {}),
                (e.extraParams.validationMessage = e.validationMessage)),
              (!e.target ||
                ("string" == typeof e.target &&
                  !document.querySelector(e.target)) ||
                ("string" != typeof e.target && !e.target.appendChild)) &&
                (h('Target parameter is not valid, defaulting to "body"'),
                (e.target = "body")),
              "function" == typeof e.animation &&
                (e.animation = e.animation.call());
            var o = E(),
              a =
                "string" == typeof e.target
                  ? document.querySelector(e.target)
                  : e.target;
            (i = o && a && o.parentNode !== a.parentNode ? G(e) : o || G(e)),
              e.width &&
                (i.style.width =
                  "number" == typeof e.width ? e.width + "px" : e.width),
              e.padding &&
                (i.style.padding =
                  "number" == typeof e.padding ? e.padding + "px" : e.padding),
              e.background && (i.style.background = e.background);
            for (
              var s = window
                  .getComputedStyle(i)
                  .getPropertyValue("background-color"),
                n = i.querySelectorAll(
                  "[class^=swal2-success-circular-line], .swal2-success-fix"
                ),
                r = 0;
              r < n.length;
              r++
            )
              n[r].style.backgroundColor = s;
            var l = B(),
              c = U(),
              d = N();
            if (
              ((function (t) {
                var e = _();
                t.titleText
                  ? (e.innerText = t.titleText)
                  : t.title &&
                    ("string" == typeof t.title &&
                      (t.title = t.title.split("\n").join("<br />")),
                    J(t.title, e));
              })(e),
              (function (t) {
                var e = V().querySelector("#" + k.content);
                t.html
                  ? J(t.html, e)
                  : t.text
                  ? ((e.textContent = t.text), H(e))
                  : P(e);
              })(e),
              "string" == typeof e.backdrop
                ? (B().style.background = e.backdrop)
                : e.backdrop ||
                  A(
                    [document.documentElement, document.body],
                    k["no-backdrop"]
                  ),
              !e.backdrop &&
                e.allowOutsideClick &&
                h(
                  '"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'
                ),
              e.position in k
                ? A(l, k[e.position])
                : (h(
                    'The "position" parameter is not valid, defaulting to "center"'
                  ),
                  A(l, k.center)),
              e.grow && "string" == typeof e.grow)
            ) {
              var p = "grow-" + e.grow;
              p in k && A(l, k[p]);
            }
            e.showCloseButton
              ? (c.setAttribute("aria-label", e.closeButtonAriaLabel), H(c))
              : P(c),
              (i.className = k.popup),
              e.toast
                ? (A(
                    [document.documentElement, document.body],
                    k["toast-shown"]
                  ),
                  A(i, k.toast))
                : A(i, k.modal),
              e.customClass && A(i, e.customClass),
              et(e),
              (function (t) {
                for (var e = j(), i = 0; i < e.length; i++) P(e[i]);
                if (t.type)
                  if (-1 !== Object.keys($).indexOf(t.type)) {
                    var o = Bt.getPopup().querySelector(
                      ".".concat(k.icon, ".").concat($[t.type])
                    );
                    H(o),
                      t.animation &&
                        A(o, "swal2-animate-".concat(t.type, "-icon"));
                  } else
                    f(
                      'Unknown type! Expected "success", "error", "warning", "info" or "question", got "'.concat(
                        t.type,
                        '"'
                      )
                    );
              })(e),
              (function (t) {
                var e = z();
                t.imageUrl
                  ? (e.setAttribute("src", t.imageUrl),
                    e.setAttribute("alt", t.imageAlt),
                    H(e),
                    t.imageWidth
                      ? e.setAttribute("width", t.imageWidth)
                      : e.removeAttribute("width"),
                    t.imageHeight
                      ? e.setAttribute("height", t.imageHeight)
                      : e.removeAttribute("height"),
                    (e.className = k.image),
                    t.imageClass && A(e, t.imageClass))
                  : P(e);
              })(e),
              (function (t) {
                var e = R(),
                  i = D(),
                  o = W();
                if (
                  (t.showConfirmButton || t.showCancelButton ? H(e) : P(e),
                  t.showCancelButton
                    ? (o.style.display = "inline-block")
                    : P(o),
                  t.showConfirmButton
                    ? i.style.removeProperty("display")
                    : P(i),
                  (i.innerHTML = t.confirmButtonText),
                  (o.innerHTML = t.cancelButtonText),
                  i.setAttribute("aria-label", t.confirmButtonAriaLabel),
                  o.setAttribute("aria-label", t.cancelButtonAriaLabel),
                  (i.className = k.confirm),
                  A(i, t.confirmButtonClass),
                  (o.className = k.cancel),
                  A(o, t.cancelButtonClass),
                  t.buttonsStyling)
                ) {
                  A([i, o], k.styled),
                    t.confirmButtonColor &&
                      (i.style.backgroundColor = t.confirmButtonColor),
                    t.cancelButtonColor &&
                      (o.style.backgroundColor = t.cancelButtonColor);
                  var a = window
                    .getComputedStyle(i)
                    .getPropertyValue("background-color");
                  (i.style.borderLeftColor = a), (i.style.borderRightColor = a);
                } else
                  M([i, o], k.styled),
                    (i.style.backgroundColor =
                      i.style.borderLeftColor =
                      i.style.borderRightColor =
                        ""),
                    (o.style.backgroundColor =
                      o.style.borderLeftColor =
                      o.style.borderRightColor =
                        "");
              })(e),
              J(e.footer, d),
              !0 === e.animation ? M(i, k.noanimation) : A(i, k.noanimation),
              e.showLoaderOnConfirm &&
                !e.preConfirm &&
                h(
                  "showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"
                );
          })(o),
            Object.freeze(o),
            kt.innerParams.set(this, o),
            at.timeout && (at.timeout.stop(), delete at.timeout),
            clearTimeout(at.restoreFocusTimeout);
          var s = {
            popup: E(),
            container: B(),
            content: V(),
            actions: R(),
            confirmButton: D(),
            cancelButton: W(),
            closeButton: U(),
            validationMessage: q(),
            progressSteps: I(),
          };
          kt.domCache.set(this, s);
          var n = this.constructor;
          return new Promise(function (e, a) {
            var r = function (t) {
                n.closePopup(o.onClose, o.onAfterClose),
                  o.useRejections ? e(t) : e({ value: t });
              },
              l = function (t) {
                n.closePopup(o.onClose, o.onAfterClose),
                  o.useRejections ? a(t) : e({ dismiss: t });
              },
              c = function (t) {
                n.closePopup(o.onClose, o.onAfterClose), a(t);
              };
            o.timer &&
              (at.timeout = new Tt(function () {
                l("timer"), delete at.timeout;
              }, o.timer)),
              o.input &&
                setTimeout(function () {
                  var t = i.getInput();
                  t && S(t);
                }, 0);
            for (
              var d = function (t) {
                  if (
                    (o.showLoaderOnConfirm && n.showLoading(), o.preConfirm)
                  ) {
                    i.resetValidationMessage();
                    var e = Promise.resolve().then(function () {
                      return o.preConfirm(t, o.extraParams);
                    });
                    o.expectRejections
                      ? e.then(
                          function (e) {
                            return r(e || t);
                          },
                          function (t) {
                            i.hideLoading(), t && i.showValidationMessage(t);
                          }
                        )
                      : e.then(
                          function (e) {
                            L(s.validationMessage) || !1 === e
                              ? i.hideLoading()
                              : r(e || t);
                          },
                          function (t) {
                            return c(t);
                          }
                        );
                  } else r(t);
                },
                p = function (t) {
                  var e = t.target,
                    a = s.confirmButton,
                    r = s.cancelButton,
                    p = a && (a === e || a.contains(e)),
                    u = r && (r === e || r.contains(e));
                  switch (t.type) {
                    case "click":
                      if (p && n.isVisible())
                        if ((i.disableButtons(), o.input)) {
                          var h = (function () {
                            var t = i.getInput();
                            if (!t) return null;
                            switch (o.input) {
                              case "checkbox":
                                return t.checked ? 1 : 0;
                              case "radio":
                                return t.checked ? t.value : null;
                              case "file":
                                return t.files.length ? t.files[0] : null;
                              default:
                                return o.inputAutoTrim
                                  ? t.value.trim()
                                  : t.value;
                            }
                          })();
                          if (o.inputValidator) {
                            i.disableInput();
                            var f = Promise.resolve().then(function () {
                              return o.inputValidator(h, o.extraParams);
                            });
                            o.expectRejections
                              ? f.then(
                                  function () {
                                    i.enableButtons(), i.enableInput(), d(h);
                                  },
                                  function (t) {
                                    i.enableButtons(),
                                      i.enableInput(),
                                      t && i.showValidationMessage(t);
                                  }
                                )
                              : f.then(
                                  function (t) {
                                    i.enableButtons(),
                                      i.enableInput(),
                                      t ? i.showValidationMessage(t) : d(h);
                                  },
                                  function (t) {
                                    return c(t);
                                  }
                                );
                          } else
                            i.getInput().checkValidity()
                              ? d(h)
                              : (i.enableButtons(),
                                i.showValidationMessage(o.validationMessage));
                        } else d(!0);
                      else
                        u &&
                          n.isVisible() &&
                          (i.disableButtons(), l(n.DismissReason.cancel));
                  }
                },
                u = s.popup.querySelectorAll("button"),
                g = 0;
              g < u.length;
              g++
            )
              (u[g].onclick = p),
                (u[g].onmouseover = p),
                (u[g].onmouseout = p),
                (u[g].onmousedown = p);
            if (
              ((s.closeButton.onclick = function () {
                l(n.DismissReason.close);
              }),
              o.toast)
            )
              s.popup.onclick = function () {
                o.showConfirmButton ||
                  o.showCancelButton ||
                  o.showCloseButton ||
                  o.input ||
                  l(n.DismissReason.close);
              };
            else {
              var m = !1;
              (s.popup.onmousedown = function () {
                s.container.onmouseup = function (t) {
                  (s.container.onmouseup = void 0),
                    t.target === s.container && (m = !0);
                };
              }),
                (s.container.onmousedown = function () {
                  s.popup.onmouseup = function (t) {
                    (s.popup.onmouseup = void 0),
                      (t.target === s.popup || s.popup.contains(t.target)) &&
                        (m = !0);
                  };
                }),
                (s.container.onclick = function (t) {
                  m
                    ? (m = !1)
                    : t.target === s.container &&
                      v(o.allowOutsideClick) &&
                      l(n.DismissReason.backdrop);
                });
            }
            o.reverseButtons
              ? s.confirmButton.parentNode.insertBefore(
                  s.cancelButton,
                  s.confirmButton
                )
              : s.confirmButton.parentNode.insertBefore(
                  s.confirmButton,
                  s.cancelButton
                );
            var b = function (t, e) {
              for (var i = F(o.focusCancel), a = 0; a < i.length; a++)
                return (
                  (t += e) === i.length
                    ? (t = 0)
                    : -1 === t && (t = i.length - 1),
                  i[t].focus()
                );
              s.popup.focus();
            };
            at.keydownHandlerAdded &&
              (at.keydownTarget.removeEventListener(
                "keydown",
                at.keydownHandler,
                { capture: at.keydownListenerCapture }
              ),
              (at.keydownHandlerAdded = !1)),
              o.toast ||
                ((at.keydownHandler = function (t) {
                  return (function (t, e) {
                    if (
                      (e.stopKeydownPropagation && t.stopPropagation(),
                      "Enter" !== t.key || t.isComposing)
                    )
                      if ("Tab" === t.key) {
                        for (
                          var o = t.target, a = F(e.focusCancel), r = -1, c = 0;
                          c < a.length;
                          c++
                        )
                          if (o === a[c]) {
                            r = c;
                            break;
                          }
                        t.shiftKey ? b(r, -1) : b(r, 1),
                          t.stopPropagation(),
                          t.preventDefault();
                      } else
                        -1 !==
                        [
                          "ArrowLeft",
                          "ArrowRight",
                          "ArrowUp",
                          "ArrowDown",
                          "Left",
                          "Right",
                          "Up",
                          "Down",
                        ].indexOf(t.key)
                          ? document.activeElement === s.confirmButton &&
                            L(s.cancelButton)
                            ? s.cancelButton.focus()
                            : document.activeElement === s.cancelButton &&
                              L(s.confirmButton) &&
                              s.confirmButton.focus()
                          : ("Escape" !== t.key && "Esc" !== t.key) ||
                            !0 !== v(e.allowEscapeKey) ||
                            (t.preventDefault(), l(n.DismissReason.esc));
                    else if (
                      t.target &&
                      i.getInput() &&
                      t.target.outerHTML === i.getInput().outerHTML
                    ) {
                      if (-1 !== ["textarea", "file"].indexOf(e.input)) return;
                      n.clickConfirm(), t.preventDefault();
                    }
                  })(t, o);
                }),
                (at.keydownTarget = o.keydownListenerCapture
                  ? window
                  : s.popup),
                (at.keydownListenerCapture = o.keydownListenerCapture),
                at.keydownTarget.addEventListener(
                  "keydown",
                  at.keydownHandler,
                  { capture: at.keydownListenerCapture }
                ),
                (at.keydownHandlerAdded = !0)),
              i.enableButtons(),
              i.hideLoading(),
              i.resetValidationMessage(),
              o.toast && (o.input || o.footer || o.showCloseButton)
                ? A(document.body, k["toast-column"])
                : M(document.body, k["toast-column"]);
            for (
              var y,
                $,
                C = [
                  "input",
                  "file",
                  "range",
                  "select",
                  "radio",
                  "checkbox",
                  "textarea",
                ],
                x = function (t) {
                  (t.placeholder && !o.inputPlaceholder) ||
                    (t.placeholder = o.inputPlaceholder);
                },
                T = 0;
              T < C.length;
              T++
            ) {
              var B = k[C[T]],
                Z = O(s.content, B);
              if ((y = i.getInput(C[T]))) {
                for (var E in y.attributes)
                  if (y.attributes.hasOwnProperty(E)) {
                    var j = y.attributes[E].name;
                    "type" !== j && "value" !== j && y.removeAttribute(j);
                  }
                for (var _ in o.inputAttributes)
                  y.setAttribute(_, o.inputAttributes[_]);
              }
              (Z.className = B), o.inputClass && A(Z, o.inputClass), P(Z);
            }
            switch (o.input) {
              case "text":
              case "email":
              case "password":
              case "number":
              case "tel":
              case "url":
                (y = O(s.content, k.input)),
                  "string" == typeof o.inputValue ||
                  "number" == typeof o.inputValue
                    ? (y.value = o.inputValue)
                    : h(
                        'Unexpected type of inputValue! Expected "string" or "number", got "'.concat(
                          t(o.inputValue),
                          '"'
                        )
                      ),
                  x(y),
                  (y.type = o.input),
                  H(y);
                break;
              case "file":
                x((y = O(s.content, k.file))), (y.type = o.input), H(y);
                break;
              case "range":
                var V = O(s.content, k.range),
                  z = V.querySelector("input"),
                  I = V.querySelector("output");
                (z.value = o.inputValue),
                  (z.type = o.input),
                  (I.value = o.inputValue),
                  H(V);
                break;
              case "select":
                var q = O(s.content, k.select);
                if (((q.innerHTML = ""), o.inputPlaceholder)) {
                  var D = document.createElement("option");
                  (D.innerHTML = o.inputPlaceholder),
                    (D.value = ""),
                    (D.disabled = !0),
                    (D.selected = !0),
                    q.appendChild(D);
                }
                $ = function (t) {
                  t.forEach(function (t) {
                    var e = t[0],
                      i = t[1],
                      a = document.createElement("option");
                    (a.value = e),
                      (a.innerHTML = i),
                      o.inputValue.toString() === e.toString() &&
                        (a.selected = !0),
                      q.appendChild(a);
                  }),
                    H(q),
                    q.focus();
                };
                break;
              case "radio":
                var W = O(s.content, k.radio);
                (W.innerHTML = ""),
                  ($ = function (t) {
                    t.forEach(function (t) {
                      var e = t[0],
                        i = t[1],
                        a = document.createElement("input"),
                        s = document.createElement("label");
                      (a.type = "radio"),
                        (a.name = k.radio),
                        (a.value = e),
                        o.inputValue.toString() === e.toString() &&
                          (a.checked = !0);
                      var n = document.createElement("span");
                      (n.innerHTML = i),
                        (n.className = k.label),
                        s.appendChild(a),
                        s.appendChild(n),
                        W.appendChild(s);
                    }),
                      H(W);
                    var e = W.querySelectorAll("input");
                    e.length && e[0].focus();
                  });
                break;
              case "checkbox":
                var R = O(s.content, k.checkbox),
                  N = i.getInput("checkbox");
                (N.type = "checkbox"),
                  (N.value = 1),
                  (N.id = k.checkbox),
                  (N.checked = Boolean(o.inputValue)),
                  (R.querySelector("span").innerHTML = o.inputPlaceholder),
                  H(R);
                break;
              case "textarea":
                var U = O(s.content, k.textarea);
                (U.value = o.inputValue), x(U), H(U);
                break;
              case null:
                break;
              default:
                f(
                  'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
                    o.input,
                    '"'
                  )
                );
            }
            if ("select" === o.input || "radio" === o.input) {
              var X = function (t) {
                return $(
                  ((e = t),
                  (i = []),
                  "undefined" != typeof Map && e instanceof Map
                    ? e.forEach(function (t, e) {
                        i.push([e, t]);
                      })
                    : Object.keys(e).forEach(function (t) {
                        i.push([t, e[t]]);
                      }),
                  i)
                );
                var e, i;
              };
              w(o.inputOptions)
                ? (n.showLoading(),
                  o.inputOptions.then(function (t) {
                    i.hideLoading(), X(t);
                  }))
                : "object" === t(o.inputOptions)
                ? X(o.inputOptions)
                : f(
                    "Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(
                      t(o.inputOptions)
                    )
                  );
            } else
              -1 !==
                ["text", "email", "number", "tel", "textarea"].indexOf(
                  o.input
                ) &&
                w(o.inputValue) &&
                (n.showLoading(),
                P(y),
                o.inputValue
                  .then(function (t) {
                    (y.value =
                      "number" === o.input ? parseFloat(t) || 0 : t + ""),
                      H(y),
                      y.focus(),
                      i.hideLoading();
                  })
                  .catch(function (t) {
                    f("Error in inputValue promise: " + t),
                      (y.value = ""),
                      H(y),
                      y.focus(),
                      i.hideLoading();
                  }));
            Mt(o),
              o.toast ||
                (v(o.allowEnterKey)
                  ? o.focusCancel && L(s.cancelButton)
                    ? s.cancelButton.focus()
                    : o.focusConfirm && L(s.confirmButton)
                    ? s.confirmButton.focus()
                    : b(-1, 1)
                  : document.activeElement && document.activeElement.blur()),
              (s.container.scrollTop = 0);
          });
        },
      });
    function Ht() {
      if ("undefined" != typeof window) {
        "undefined" == typeof Promise &&
          f(
            "This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"
          );
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
          e[i] = arguments[i];
        if (0 === e.length) return f("At least 1 argument is expected!"), !1;
        St = this;
        var o = Object.freeze(this.constructor.argsToParams(e));
        Object.defineProperties(this, {
          params: { value: o, writable: !1, enumerable: !0 },
        });
        var a = this._main(this.params);
        kt.promise.set(this, a);
      }
    }
    (Ht.prototype.then = function (t, e) {
      return kt.promise.get(this).then(t, e);
    }),
      (Ht.prototype.catch = function (t) {
        return kt.promise.get(this).catch(t);
      }),
      (Ht.prototype.finally = function (t) {
        return kt.promise.get(this).finally(t);
      }),
      a(Ht.prototype, Ot),
      a(Ht, wt),
      Object.keys(Ot).forEach(function (t) {
        Ht[t] = function () {
          var e;
          if (St) return (e = St)[t].apply(e, arguments);
        };
      }),
      (Ht.DismissReason = b),
      (Ht.noop = function () {});
    var Pt,
      Lt,
      Bt = rt(
        ((Pt = Ht),
        (Lt = (function (i) {
          function r() {
            return e(this, r), c(this, n(r).apply(this, arguments));
          }
          return (
            s(r, Pt),
            o(
              r,
              [
                {
                  key: "_main",
                  value: function (t) {
                    return d(n(r.prototype), "_main", this).call(
                      this,
                      a({}, gt, t)
                    );
                  },
                },
              ],
              [
                {
                  key: "setDefaults",
                  value: function (e) {
                    if ((m(ft), !e || "object" !== t(e)))
                      throw new TypeError(
                        "SweetAlert2: The argument for setDefaults() is required and has to be a object"
                      );
                    ht(e),
                      Object.keys(e).forEach(function (t) {
                        Pt.isValidParameter(t) && (gt[t] = e[t]);
                      });
                  },
                },
                {
                  key: "resetDefaults",
                  value: function () {
                    m(ft), (gt = {});
                  },
                },
              ]
            ),
            r
          );
        })()),
        "undefined" != typeof window &&
          "object" === t(window._swalDefaults) &&
          Lt.setDefaults(window._swalDefaults),
        Lt)
      );
    return (Bt.default = Bt);
  }),
  "undefined" != typeof window &&
    window.Sweetalert2 &&
    ((window.Sweetalert2.version = "7.29.0"),
    (window.swal =
      window.sweetAlert =
      window.Swal =
      window.SweetAlert =
        window.Sweetalert2)),
  $(function () {
    const t = { methods: {} },
      e = !!$("#cabecalho .btn-group").length;
    (t.methods.account = function () {
      e
        ? $(".account").append(
            $(
              '<ul class="account-list"> <li> <a href="/conta/index"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.59 16.967"> <path d="M.693,16.964a.762.762,0,0,1-.69-.83,12.675,12.675,0,0,1,1.519-5.355A5.28,5.28,0,0,1,6.3,8.045a5.279,5.279,0,0,1,4.773,2.734,12.557,12.557,0,0,1,1.519,5.355.76.76,0,0,1-.69.823.267.267,0,0,1-.07.006.762.762,0,0,1-.753-.69C10.663,11.818,9.055,9.558,6.3,9.558s-4.368,2.26-4.779,6.716a.76.76,0,0,1-.754.693C.74,16.967.717,16.966.693,16.964ZM2.808,3.488A3.488,3.488,0,1,1,6.3,6.975,3.49,3.49,0,0,1,2.808,3.488Zm1.519,0A1.969,1.969,0,1,0,6.3,1.519,1.975,1.975,0,0,0,4.327,3.488Z" /></svg> Minha Conta </a> </li> <li> <a href="/conta/pedido/listar"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17.588"> <g transform="translate(0 -5.301)"> <g transform="translate(0 5.301)"> <path d="M17.537,6.743a.468.468,0,0,0-.466.466v12.38A2.373,2.373,0,0,1,14.7,21.96H3.3A2.373,2.373,0,0,1,.933,19.589V6.234H14.587v12.01a.466.466,0,1,0,.933,0V5.767a.468.468,0,0,0-.466-.466H.466A.468.468,0,0,0,0,5.767V19.585a3.306,3.306,0,0,0,3.3,3.3H14.7a3.306,3.306,0,0,0,3.3-3.3V7.209A.462.462,0,0,0,17.537,6.743Z" transform="translate(0 -5.301)" /> <path d="M66.334,75.434a.466.466,0,1,0,0-.933H56.166a.466.466,0,1,0,0,.933Z" transform="translate(-53.535 -71.811)" /> <path d="M66.334,319.1H56.166a.466.466,0,1,0,0,.933H66.33a.466.466,0,0,0,0-.933Z" transform="translate(-53.535 -306.904)" /> <path d="M106.221,380.6H97.666a.466.466,0,1,0,0,.933h8.555a.466.466,0,1,0,0-.933Z" transform="translate(-93.422 -366.014)" /> <path d="M51.7,128.867v5.045a.468.468,0,0,0,.466.466h5.065a.468.468,0,0,0,.466-.466v-5.045a.468.468,0,0,0-.466-.466H52.166A.468.468,0,0,0,51.7,128.867Zm.933.466h4.132v4.112H52.633Z" transform="translate(-49.691 -123.616)" /> <path d="M241.221,140.4h-3.354a.466.466,0,0,0,0,.933h3.354a.466.466,0,1,0,0-.933Z" transform="translate(-228.173 -135.15)" /> <path d="M241.221,194.6h-3.354a.466.466,0,0,0,0,.933h3.354a.466.466,0,1,0,0-.933Z" transform="translate(-228.173 -187.243)" /> <path d="M241.687,252.667a.468.468,0,0,0-.466-.466h-3.354a.466.466,0,0,0,0,.933h3.354A.465.465,0,0,0,241.687,252.667Z" transform="translate(-228.173 -242.604)" /> </g> </g> </svg> Meus Pedidos </a> </li> <li> <a href="/conta/favorito/listar"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.311 16.548"> <path class="a" d="M15.768,1.393a4.6,4.6,0,0,0-6.544,0l-.644.644-.644-.644A4.627,4.627,0,0,0,1.393,7.937L8.58,15.124l7.188-7.188a4.6,4.6,0,0,0,0-6.544" transform="translate(0.575 0.575)" /></svg> Favoritos </a> </li> <li> <a href="/conta/logout"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.277 18"> <path d="M-7539.275-4612a.688.688,0,0,1-.686-.688.685.685,0,0,1,.686-.684h6.475a1.706,1.706,0,0,0,1.707-1.7v-11.849a1.706,1.706,0,0,0-1.7-1.705h-6.479a.685.685,0,0,1-.686-.684.689.689,0,0,1,.686-.688h6.479a3.08,3.08,0,0,1,3.074,3.077V-4621h0v5.925A3.078,3.078,0,0,1-7532.8-4612Zm-.07-5.95a.686.686,0,0,1,0-.972l1.544-1.546h-9.513a.686.686,0,0,1-.686-.686.688.688,0,0,1,.686-.686h9.513l-1.555-1.574a.686.686,0,0,1,0-.972.686.686,0,0,1,.972,0l2.724,2.722.006.006a.507.507,0,0,1,.04.047c.006.011.011.017.017.028a.1.1,0,0,1,.022.028.114.114,0,0,1,.017.028c.006.012.012.017.017.029l.017.034c0,.012.006.017.012.029s.005.022.011.034a.351.351,0,0,0,.011.034c0,.011.006.025.006.036s.005.022.005.034.006.022.006.034a.211.211,0,0,1,.006.028.29.29,0,0,1,.005.068c0,.023-.005.046-.005.068s-.006.019-.006.028-.006.025-.006.036-.005.023-.005.034a.071.071,0,0,1-.006.034c-.006.011-.006.022-.011.034s-.006.023-.011.034-.006.017-.012.029l-.017.034c-.005.012-.011.017-.017.029a.108.108,0,0,0-.017.03.1.1,0,0,0-.022.028.131.131,0,0,1-.017.028.357.357,0,0,1-.045.051l-2.713,2.716a.685.685,0,0,1-.486.2A.687.687,0,0,1-7539.345-4617.951Zm3.685-2.716h0Z" transform="translate(7548 4630)" /></svg> Sair </a> </li></ul>'
            )
          )
        : $(".account").append(
            $(
              '<ul class="account-list"> <li> <a href="/conta/login"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.59 16.967"> <path d="M.693,16.964a.762.762,0,0,1-.69-.83,12.675,12.675,0,0,1,1.519-5.355A5.28,5.28,0,0,1,6.3,8.045a5.279,5.279,0,0,1,4.773,2.734,12.557,12.557,0,0,1,1.519,5.355.76.76,0,0,1-.69.823.267.267,0,0,1-.07.006.762.762,0,0,1-.753-.69C10.663,11.818,9.055,9.558,6.3,9.558s-4.368,2.26-4.779,6.716a.76.76,0,0,1-.754.693C.74,16.967.717,16.966.693,16.964ZM2.808,3.488A3.488,3.488,0,1,1,6.3,6.975,3.49,3.49,0,0,1,2.808,3.488Zm1.519,0A1.969,1.969,0,1,0,6.3,1.519,1.975,1.975,0,0,0,4.327,3.488Z" /></svg> Cadastrar </a> </li> <li> <a href="/conta/login"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.277 18"> <path d="M-7539.275-4612a.688.688,0,0,1-.686-.688.685.685,0,0,1,.686-.684h6.475a1.706,1.706,0,0,0,1.707-1.7v-11.849a1.706,1.706,0,0,0-1.7-1.705h-6.479a.685.685,0,0,1-.686-.684.689.689,0,0,1,.686-.688h6.479a3.08,3.08,0,0,1,3.074,3.077V-4621h0v5.925A3.078,3.078,0,0,1-7532.8-4612Zm-.07-5.95a.686.686,0,0,1,0-.972l1.544-1.546h-9.513a.686.686,0,0,1-.686-.686.688.688,0,0,1,.686-.686h9.513l-1.555-1.574a.686.686,0,0,1,0-.972.686.686,0,0,1,.972,0l2.724,2.722.006.006a.507.507,0,0,1,.04.047c.006.011.011.017.017.028a.1.1,0,0,1,.022.028.114.114,0,0,1,.017.028c.006.012.012.017.017.029l.017.034c0,.012.006.017.012.029s.005.022.011.034a.351.351,0,0,0,.011.034c0,.011.006.025.006.036s.005.022.005.034.006.022.006.034a.211.211,0,0,1,.006.028.29.29,0,0,1,.005.068c0,.023-.005.046-.005.068s-.006.019-.006.028-.006.025-.006.036-.005.023-.005.034a.071.071,0,0,1-.006.034c-.006.011-.006.022-.011.034s-.006.023-.011.034-.006.017-.012.029l-.017.034c-.005.012-.011.017-.017.029a.108.108,0,0,0-.017.03.1.1,0,0,0-.022.028.131.131,0,0,1-.017.028.357.357,0,0,1-.045.051l-2.713,2.716a.685.685,0,0,1-.486.2A.687.687,0,0,1-7539.345-4617.951Zm3.685-2.716h0Z" transform="translate(7548 4630)" /></svg> Entrar </a> </li></ul>'
            )
          );
    }),
      (t.methods.support = function () {
        var t =
            '<p class="title"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.143 16.143"><g transform="translate(-1143.5 -1316.804)"><g class="a" transform="translate(1143.5 1316.804)"><path class="b" d="M 8.071533203125 15.64306354522705 C 3.896573305130005 15.64306354522705 0.5000032186508179 12.24649333953857 0.5000032186508179 8.071533203125 C 0.5000032186508179 3.896573305130005 3.896573305130005 0.5000032186508179 8.071533203125 0.5000032186508179 C 12.24649333953857 0.5000032186508179 15.64306354522705 3.896573305130005 15.64306354522705 8.071533203125 C 15.64306354522705 12.24649333953857 12.24649333953857 15.64306354522705 8.071533203125 15.64306354522705 Z"/><path class="c" d="M 8.071533203125 1.000002861022949 C 4.172283172607422 1.000002861022949 1.000002861022949 4.172283172607422 1.000002861022949 8.071533203125 C 1.000002861022949 11.97078323364258 4.172283172607422 15.14306354522705 8.071533203125 15.14306354522705 C 11.97078323364258 15.14306354522705 15.14306354522705 11.97078323364258 15.14306354522705 8.071533203125 C 15.14306354522705 4.172283172607422 11.97078323364258 1.000002861022949 8.071533203125 1.000002861022949 M 8.071533203125 3.814697265625e-06 C 12.52931308746338 3.814697265625e-06 16.14306259155273 3.613753318786621 16.14306259155273 8.071533203125 C 16.14306259155273 12.52931308746338 12.52931308746338 16.14306259155273 8.071533203125 16.14306259155273 C 3.613753318786621 16.14306259155273 3.814697265625e-06 12.52931308746338 3.814697265625e-06 8.071533203125 C 3.814697265625e-06 3.613753318786621 3.613753318786621 3.814697265625e-06 8.071533203125 3.814697265625e-06 Z"/></g><rect width="0.897" height="4.933" rx="0.448" transform="translate(1151.123 1320.391)"/><rect width="0.897" height="4.933" rx="0.448" transform="translate(1156.28 1324.651) rotate(90)"/></g></svg> HorÃƒÂ¡rio de atendimento:</p><p>Seg Ãƒ  Sex das 8:00h Ãƒ s 18:00h</p><p>SÃƒÂ¡bado das 8:00 Ãƒ s 14:00h</p>',
          e =
            '<div class="support-items"><ul class="contact">' +
            $("#rodape .visible-phone ul").html() +
            '</ul><div class="tracking"></div></div>';
        if (
          ($(".support").append(e),
          $(".support .contact .fa-whatsapp").replaceWith(
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.371 16.372"><path d="M3.96,15.2a8.126,8.126,0,0,0,4.2,1.162,8.228,8.228,0,0,0,8.215-8.183,8.183,8.183,0,1,0-15.2,4.229L0,16.371ZM.965,8.183a7.189,7.189,0,1,1,3.323,6.1L4.1,14.161l-2.686.792.792-2.686-.118-.184A7.223,7.223,0,0,1,.965,8.183Zm0,0"/><path d="M121.239,96.377a7.229,7.229,0,0,0,5.8,5.8c.953.181,2.35.209,3.033-.474l.381-.381a1.018,1.018,0,0,0,0-1.44l-1.523-1.523a1.018,1.018,0,0,0-1.44,0l-.381.381a.677.677,0,0,1-.906,0l-1.519-1.583-.007-.007a.6.6,0,0,1,0-.845l.381-.381a1.017,1.017,0,0,0,0-1.44l-1.523-1.523a1.019,1.019,0,0,0-1.44,0l-.381.381h0A3.55,3.55,0,0,0,121.239,96.377Zm1.152-2.355c.4-.391.378-.4.422-.4a.059.059,0,0,1,.042.017c1.6,1.613,1.54,1.519,1.54,1.565a.058.058,0,0,1-.017.042l-.381.381a1.556,1.556,0,0,0,0,2.2l1.52,1.584.007.007a1.636,1.636,0,0,0,2.265,0l.381-.381a.059.059,0,0,1,.083,0c1.6,1.613,1.54,1.518,1.54,1.565a.057.057,0,0,1-.017.042l-.381.381a2.837,2.837,0,0,1-2.176.211,6.27,6.27,0,0,1-5.035-5.035A2.836,2.836,0,0,1,122.392,94.022Zm0,0" transform="translate(-117.254 -89.702)"/></svg>'
          ),
          $(".support .contact .fa-envelope").replaceWith(
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.227 11.039"><g transform="translate(0 -38.529)"><path d="M41.35,68.654,36.1,73.285l-5.256-4.63a.5.5,0,1,0-.667.758l5.59,4.925a.5.5,0,0,0,.668,0l5.588-4.925a.5.5,0,1,0-.668-.757Z" transform="translate(-27.981 -27.98)"/><path d="M14.712,38.529H1.515A1.516,1.516,0,0,0,0,40.044v8.01a1.516,1.516,0,0,0,1.515,1.515h13.2a1.516,1.516,0,0,0,1.515-1.515v-8.01A1.516,1.516,0,0,0,14.712,38.529Zm.5,9.525a.505.505,0,0,1-.5.5H1.515a.505.505,0,0,1-.5-.5v-8.01a.505.505,0,0,1,.5-.5h13.2a.505.505,0,0,1,.5.5Z" transform="translate(0 0)"/></g></svg>'
          ),
          $(".support .contact .icon-phone").replaceWith(
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.258 16.725"><g transform="translate(-2.95)"><path d="M112.4,2.191A7.431,7.431,0,0,0,107.11,0a.593.593,0,1,0,0,1.185,6.295,6.295,0,0,1,6.3,6.3.593.593,0,0,0,1.185,0A7.431,7.431,0,0,0,112.4,2.191Z" transform="translate(-95.383)"/><path d="M109.961,47.615a.593.593,0,0,0,1.185,0,4.042,4.042,0,0,0-4.037-4.037h0a.593.593,0,0,0,0,1.185A2.855,2.855,0,0,1,109.961,47.615Z" transform="translate(-95.383 -40.134)"/><path d="M13.267,39.823a1.789,1.789,0,0,0-1.584.948.593.593,0,1,0,.978.669c.261-.381.379-.441.539-.434a7.635,7.635,0,0,1,2.736,2,.613.613,0,0,1-.006.433,2.046,2.046,0,0,1-1.016,1.279,1.9,1.9,0,0,1-1.523-.051,16.752,16.752,0,0,1-5.5-3.578l0,0A16.749,16.749,0,0,1,4.323,35.6a1.9,1.9,0,0,1-.052-1.524A2.045,2.045,0,0,1,5.55,33.064a.612.612,0,0,1,.432-.006,7.649,7.649,0,0,1,2,2.731c.009.166-.052.284-.433.545a.593.593,0,0,0,.669.979,1.788,1.788,0,0,0,.948-1.586A7.256,7.256,0,0,0,6.4,31.947a1.792,1.792,0,0,0-1.224-.007,3.19,3.19,0,0,0-1.979,1.645,3.051,3.051,0,0,0,.031,2.465,17.928,17.928,0,0,0,3.832,5.881l.012.012a17.933,17.933,0,0,0,5.874,3.826,3.517,3.517,0,0,0,1.323.276,2.717,2.717,0,0,0,1.141-.245,3.19,3.19,0,0,0,1.645-1.979,1.793,1.793,0,0,0-.006-1.221A7.254,7.254,0,0,0,13.267,39.823Z" transform="translate(0 -29.32)"/></g></svg>'
          ),
          $(".support .contact .fa-skype").replaceWith(
            '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.487 16.695"><g transform="translate(-1.33)"><path d="M10.788,15.06A6.736,6.736,0,0,1,3.037,7.176a.587.587,0,0,0-.063-.392,3.784,3.784,0,0,1,3.315-5.61A.587.587,0,0,0,6.289,0,4.958,4.958,0,0,0,1.848,7.163a7.909,7.909,0,0,0,9.138,9.055.587.587,0,0,0-.2-1.158Z" transform="translate(0)"/><path d="M95.121,15.959a8,8,0,0,0,.123-1.4,7.914,7.914,0,0,0-7.9-7.9,8,8,0,0,0-1.228.095.587.587,0,1,0,.181,1.16,6.819,6.819,0,0,1,1.047-.081,6.738,6.738,0,0,1,6.73,6.731,6.833,6.833,0,0,1-.135,1.35.587.587,0,0,0,.043.364,3.75,3.75,0,0,1,.353,1.6,3.789,3.789,0,0,1-3.785,3.784.587.587,0,0,0,0,1.174,4.964,4.964,0,0,0,4.959-4.958A4.914,4.914,0,0,0,95.121,15.959Z" transform="translate(-77.688 -6.137)"/><path d="M74.829,65.947a1.8,1.8,0,0,0-.2-.891,1.727,1.727,0,0,0-.569-.6,3.709,3.709,0,0,0-.885-.4c-.341-.11-.733-.212-1.162-.3-.34-.079-.589-.139-.737-.181a2.4,2.4,0,0,1-.441-.171,1.044,1.044,0,0,1-.343-.262.552.552,0,0,1-.124-.362.683.683,0,0,1,.366-.578,1.739,1.739,0,0,1,.963-.24,1.547,1.547,0,0,1,.935.221,1.831,1.831,0,0,1,.5.616,1.613,1.613,0,0,0,.3.4.614.614,0,0,0,.4.121.674.674,0,0,0,.676-.654,1.191,1.191,0,0,0-.156-.564,1.812,1.812,0,0,0-.492-.552A2.66,2.66,0,0,0,73,61.116a4.146,4.146,0,0,0-1.21-.158,4.4,4.4,0,0,0-1.524.24,2.153,2.153,0,0,0-.99.685,1.64,1.64,0,0,0-.342,1.02,1.572,1.572,0,0,0,.324,1.008,2.2,2.2,0,0,0,.877.64,7.673,7.673,0,0,0,1.372.411c.4.084.732.166.979.242a1.527,1.527,0,0,1,.6.33.741.741,0,0,1,.231.564.857.857,0,0,1-.429.731,1.95,1.95,0,0,1-1.114.292,1.9,1.9,0,0,1-.8-.145,1.26,1.26,0,0,1-.475-.369,2.766,2.766,0,0,1-.314-.556,1.119,1.119,0,0,0-.287-.422.619.619,0,0,0-.412-.143.685.685,0,0,0-.494.183.582.582,0,0,0-.194.438,1.607,1.607,0,0,0,.323.908,2.4,2.4,0,0,0,.843.747,3.954,3.954,0,0,0,1.855.387,4.236,4.236,0,0,0,1.622-.284,2.332,2.332,0,0,0,1.039-.787A1.924,1.924,0,0,0,74.829,65.947Z" transform="translate(-62.182 -56.186)"/></g></svg>'
          ),
          "undefined" != typeof $horario)
        ) {
          t =
            '<div class="office-hours"><p class="title"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.143 16.143"><g transform="translate(-1143.5 -1316.804)"><g class="a" transform="translate(1143.5 1316.804)"><path class="b" d="M 8.071533203125 15.64306354522705 C 3.896573305130005 15.64306354522705 0.5000032186508179 12.24649333953857 0.5000032186508179 8.071533203125 C 0.5000032186508179 3.896573305130005 3.896573305130005 0.5000032186508179 8.071533203125 0.5000032186508179 C 12.24649333953857 0.5000032186508179 15.64306354522705 3.896573305130005 15.64306354522705 8.071533203125 C 15.64306354522705 12.24649333953857 12.24649333953857 15.64306354522705 8.071533203125 15.64306354522705 Z"/><path class="c" d="M 8.071533203125 1.000002861022949 C 4.172283172607422 1.000002861022949 1.000002861022949 4.172283172607422 1.000002861022949 8.071533203125 C 1.000002861022949 11.97078323364258 4.172283172607422 15.14306354522705 8.071533203125 15.14306354522705 C 11.97078323364258 15.14306354522705 15.14306354522705 11.97078323364258 15.14306354522705 8.071533203125 C 15.14306354522705 4.172283172607422 11.97078323364258 1.000002861022949 8.071533203125 1.000002861022949 M 8.071533203125 3.814697265625e-06 C 12.52931308746338 3.814697265625e-06 16.14306259155273 3.613753318786621 16.14306259155273 8.071533203125 C 16.14306259155273 12.52931308746338 12.52931308746338 16.14306259155273 8.071533203125 16.14306259155273 C 3.613753318786621 16.14306259155273 3.814697265625e-06 12.52931308746338 3.814697265625e-06 8.071533203125 C 3.814697265625e-06 3.613753318786621 3.613753318786621 3.814697265625e-06 8.071533203125 3.814697265625e-06 Z"/></g><rect width="0.897" height="4.933" rx="0.448" transform="translate(1151.123 1320.391)"/><rect width="0.897" height="4.933" rx="0.448" transform="translate(1156.28 1324.651) rotate(90)"/></g></svg> HorÃƒÂ¡rio de atendimento:</p><p>' +
            $horario +
            "</p></div>";
          $(".support .tracking").before(t);
        }
      }),
      (t.methods.addWishList = function () {
        $('<a class="adic-favo" href="#"></a>').prependTo(
          ".pagina-inicial .listagem-item"
        ),
          $(".pagina-inicial .listagem-item").each(function () {
            var t = $(this)
              .find(".info-produto .hide.trustvox-stars")
              .attr("data-trustvox-product-code");
            $(this)
              .find(".adic-favo")
              .attr("href", "/conta/favorito/" + t + "/adicionar");
          }),
          $(document).on("click", ".adic-favo", function (t) {
            t.preventDefault();
            var e = $(this),
              i = e.attr("href");
            $.post(i).done(function (t) {
              var i = JSON.parse(t);
              "erro" === i.status
                ? swal("Erro!", i.mensagem, "error")
                : (swal(
                    "Produto adicionado!",
                    "Produto adicionado com sucesso na sua lista de desejos!",
                    "success"
                  ),
                  e.addClass("added"));
            });
          });
      }),
      (t.methods.buyOfShowcase = function () {
        $(".listagem .acoes-produto").each(function () {
          $(this).find(".botao-comprar-ajax").length &&
            $(this).prepend(
              $(
                '<div class="prod-counter"><input type="number" min="1" value="1" class="qtd-prod"><div class="qtd-nav"><span class="bt-qty bt-plus"><i class="icon-sort-up" aria-hidden="true"></i></span><span class="bt-qty bt-minus"><i class="icon-sort-down" aria-hidden="true"></i></span></div></div>'
              )
            );
        }),
          $(document).on("click", ".bt-qty", function () {
            var t = $(this),
              e = t.parent().siblings("input").val(),
              i = t.parent().parent().siblings(".botao-comprar-ajax"),
              o = 1;
            t.hasClass("bt-plus") || t.hasClass("prod-bt-plus")
              ? (o = parseFloat(e) + 1)
              : (t.hasClass("bt-minus") || t.hasClass("prod-bt-minus")) &&
                (o = parseFloat(e) - 1),
              o < 1 && (o = 1),
              t.parent().siblings("input").val(o),
              t.parent().siblings("input").change(),
              i.attr(
                "href",
                i.attr("href").replace(/adicionar.*/g, "adicionar/" + o)
              );
          });
      }),
      (t.methods.cartWithPrice = function () {
        var t = $("#cabecalho .carrinho, #barraTopo .carrinho"),
          e = t.eq(0).find(".carrinho-interno .carrino-total .titulo").text(),
          i =
            "<div class='wrap'><h3 class='title-cart'>Meu carrinho</h3><strong class='total-cart titulo'>" +
            (t.length && t.hasClass("vazio") ? "R$ 0,00" : e) +
            "</strong></div>";
        t.find(" > a").append(i);
      }),
      (t.methods.showcase = function () {
        if ($(".listagem").length) {
          $(".listagem-linha").each(function () {
            if ($(this).hasClass("flexslider")) {
              var t = $(this).find("ul").html();
              $(this).find(".flex-viewport").remove(),
                $(this).find(".flex-direction-nav").remove(),
                $(this).append("<ul class='slick-product'>" + t + "</ul>");
            } else $(this).find("li").unwrap().unwrap();
          });
          $(".listagem-linha .slick-product").slick({
            infinite: !0,
            slidesToShow: 4,
            slidesToScroll: 4,
            speed: 250,
            dots: !1,
            afterChange: void $(".slick-product .has-zoom").each(function () {
              var t = $(this)
                .find(".imagem-principal")
                .attr("data-imagem-caminho");
              $(this).append(
                '<img src="' + t + '" class="imagem-zoom" alt="zoom">'
              );
            }),
            prevArrow:
              '<div class="slick-prev"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.446 20.079"><g transform="translate(108.584 20.079) rotate(180)"><path d="M108.173,11.033l-8.634,8.633a1.406,1.406,0,0,1-1.989-1.988l7.639-7.639L97.55,2.4A1.406,1.406,0,1,1,99.539.412l8.634,8.634a1.406,1.406,0,0,1,0,1.988Z" transform="translate(0 0)"/></g></svg></div>',
            nextArrow:
              '<div class="slick-next"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.446 20.079"><g transform="translate(-97.138 0)"><path d="M108.173,11.033l-8.634,8.633a1.406,1.406,0,0,1-1.989-1.988l7.639-7.639L97.55,2.4A1.406,1.406,0,1,1,99.539.412l8.634,8.634a1.406,1.406,0,0,1,0,1.988Z" transform="translate(0 0)"/></g></svg></div>',
            responsive: [
              {
                breakpoint: 1024,
                settings: { slidesToShow: 3, slidesToScroll: 3 },
              },
              {
                breakpoint: 767,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              },
              {
                breakpoint: 480,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
              },
            ],
          });
        }
      }),
      (t.methods.discountOff = function () {
        $(".bandeiras-produto .bandeira-promocao").each(function () {
          var t;
          (t = $(this).text().replace("Desconto", "Off")), $(this).text(t);
        });
      }),
      (t.methods.fullMenu = function () {
        $("#cabecalho .conteiner").after($(".menu.superior").clone()),
          $("#cabecalho .conteiner .menu.superior").attr(
            "class",
            "menu superior visible-phone"
          ),
          $("#cabecalho > .menu.superior").attr(
            "class",
            "full menu hidden-phone"
          ),
          $(".full.menu .nivel-um").wrap("<div class='conteiner'></div>");
      }),
      (t.methods.widthMenu = function () {
        var t = $(".full.menu").find("ul.nivel-um").find(">li"),
          e = 100 / t.length;
        t.css("width", e + "%");
      }),
      (t.methods.toggleMenu = function () {
        $(
          '<button class="open-menu"><span class="line"></span><span class="line"></span><span class="line"></span></button>'
        ).insertBefore($("#cabecalho .busca")),
          $(".open-menu").click(function () {
            $(this).toggleClass("active"),
              $(".full.menu").toggleClass("active");
          });
      }),
      (t.methods.mobileMenu = function () {
        $("#cabecalho .menu.superior.visible-phone").append(
          $("<button class='menu-close'></button>")
        ),
          $(".atalho-menu").click(function () {
            $("#cabecalho .menu.superior.visible-phone").addClass(
              "menu-active"
            );
          }),
          $("#cabecalho .menu.superior.visible-phone > ul.nivel-um").wrap(
            "<div class='wrap'></div>"
          ),
          $("#cabecalho .menu.superior.visible-phone .wrap").append(
            $(
              "<ul class='action-links'><li><a href='/conta/index'>Minha Conta<a></li><li><a href='/carrinho/index'>Meu Carrinho<a></li></ul>"
            )
          ),
          $(".menu-close").click(function () {
            $("#cabecalho .menu.superior.visible-phone").removeClass(
              "menu-active"
            ),
              $(
                "#cabecalho .menu.superior.visible-phone ul.nivel-um"
              ).removeClass("active");
          }),
          $(
            ".menu.superior.visible-phone .nivel-um > li.com-filho > a > i"
          ).click(function (t) {
            t.preventDefault(), $(this).parent().next().toggleClass("active");
          });
      }),
      (t.methods.otherCategories = function () {
        if ($(".full.menu .nivel-um > li").length > 6) {
          var t = $(".full.menu .nivel-um > li").slice(6).detach();
          $(".full.menu .nivel-um").append(
            $(
              "<li class='other-categories com-filho'><a href='#'><strong class='titulo'>Outros<strong></a><ul class='nivel-dois'></ul></li>"
            )
          ),
            $(
              ".full.menu .nivel-um > li.other-categories > .nivel-dois"
            ).append($(t));
        }
      }),
      (t.methods.fixedHeader = function () {
        $(window).scroll(function () {
          $(this).scrollTop() > 20 && !$("body").hasClass("pagina-carrinho")
            ? $("#cabecalho").addClass("fixed")
            : $("#cabecalho").removeClass("fixed");
        });
      }),
      (t.methods.fixedSearch = function () {
        $(window).scroll(function () {
          $(this).scrollTop() > 20 && !$("body").hasClass("pagina-carrinho")
            ? $(".busca-mobile").addClass("fixed")
            : $(".busca-mobile").removeClass("fixed");
        });
      }),
      (t.methods.sizeTable = function () {
        if ("undefined" != typeof $tabela_medidas) {
          $(
            '<div class="size-table"><button class="open-table"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.529 19.785"><g transform="translate(0 -0.355)"><path d="M108.8,80.726c2.2,0,3.988-1.349,3.988-3s-1.786-3-3.988-3-3.988,1.349-3.988,3S106.608,80.726,108.8,80.726Zm0-4.937c1.6,0,2.922.885,2.922,1.935s-1.338,1.935-2.922,1.935-2.922-.885-2.922-1.935,1.338-1.941,2.922-1.941Zm0,0" transform="translate(-99.714 -70.747)"/><path d="M26,12.522H18.127V6.972c0-3.647-4.057-6.616-9.063-6.616S0,3.325,0,6.972v6.558c0,3.359,3.439,6.131,7.869,6.552H7.96c.368.032.741.059,1.12.059H26a.533.533,0,0,0,.533-.533V13.055A.533.533,0,0,0,26,12.522ZM9.09,1.427c4.4,0,8,2.49,8,5.55s-3.577,5.55-8,5.55-8-2.49-8-5.55S4.7,1.427,9.09,1.427Zm8,8.658v2.437H13.995a8.039,8.039,0,0,0,3.066-2.437Zm8.375,8.989H24.4v-2.7a.533.533,0,1,0-1.066,0v2.7H21.2V17.613a.533.533,0,0,0-1.066,0v1.466H18V17.613a.533.533,0,0,0-1.066,0v1.466H14.8v-2.7a.533.533,0,1,0-1.066,0v2.7H11.692V17.613a.533.533,0,0,0-1.066,0v1.466H8.493V17.613a.533.533,0,0,0-1.066,0v1.338c-3.6-.533-6.307-2.762-6.307-5.427V10.085c1.525,2.085,4.526,3.5,8,3.5H25.463Zm0,0"/></g></svg>GUIA DE MEDIDAS</button></div>'
          ).insertAfter($(".pagina-produto .produto .atributos")),
            $(document).on("click", ".open-table", function () {
              $.fancybox({
                autoScale: !0,
                transitionIn: "fade",
                transitionOut: "fade",
                type: "image",
                href: $tabela_medidas,
              });
            });
        }
      }),
      (t.methods.video = function () {
        if ("undefined" != typeof $video) {
          var t = $video.split("v=")[1].toString();
          $(
            '<div id="video"><div class="video-container"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/' +
              t +
              '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div>'
          ).insertAfter($("#corpo"));
        }
      }),
      (t.methods.instagram = function () {
        if ("undefined" != typeof $instagram) {
          var t = $instagram.user,
            e =
              "<div id='instagram'><div class='conteiner'><h2><span><svg class='icon' xmlns='http://www.w3.org/2000/svg' viewBox='-8700.68 2378.321 32.422 32.421'><path id='Union_72' data-name='Union 72' class='cls-1' d='M7835.447-3201.945a8.957,8.957,0,0,1-8.947-8.947v-14.528a8.957,8.957,0,0,1,8.947-8.946h14.526a8.957,8.957,0,0,1,8.949,8.946v14.528a8.957,8.957,0,0,1-8.949,8.947Zm-6.071-23.475v14.528a6.077,6.077,0,0,0,6.071,6.069h14.528a6.075,6.075,0,0,0,6.069-6.069v-14.528a6.079,6.079,0,0,0-6.071-6.071h-14.526A6.078,6.078,0,0,0,7829.376-3225.42Zm4.98,7.264a8.364,8.364,0,0,1,8.355-8.355,8.363,8.363,0,0,1,8.353,8.355,8.361,8.361,0,0,1-8.353,8.353A8.362,8.362,0,0,1,7834.356-3218.156Zm2.877,0a5.483,5.483,0,0,0,5.478,5.477,5.484,5.484,0,0,0,5.477-5.477,5.484,5.484,0,0,0-5.477-5.477A5.483,5.483,0,0,0,7837.233-3218.156Zm12.692-7.191a2.128,2.128,0,0,1-.622-1.493,2.114,2.114,0,0,1,.622-1.491,2.116,2.116,0,0,1,1.489-.617,2.127,2.127,0,0,1,1.493.617,2.118,2.118,0,0,1,.617,1.491,2.132,2.132,0,0,1-.617,1.493,2.138,2.138,0,0,1-1.493.617A2.123,2.123,0,0,1,7849.926-3225.347Z' transform='translate(-16527.18 5612.687)'/></svg>" +
              $instagram.title +
              "</span><a href='https://instagram.com/" +
              t +
              "' target='blank'>@" +
              t +
              "</a></h2><ul></ul></div></div>";
          if (
            ($(".pagina-inicial #video").length
              ? $(e).insertAfter($("#video"))
              : $(e).insertAfter($("#corpo")),
            $("#instagram").length)
          ) {
            var i = $("#instagram ul"),
              o = $instagram.token,
              a = $instagram.userid;
            $.ajax({
              url: "https://api.instagram.com/v1/users/" + a + "/media/recent",
              dataType: "jsonp",
              type: "GET",
              data: { access_token: o, count: 6 },
              success: function (t) {
                for (var e = 0; e < t.data.length; e++)
                  i.append(
                    '<li><a href="' +
                      t.data[e].link +
                      '" target="_blank"><img src="' +
                      t.data[e].images.standard_resolution.url +
                      '" width="250" height="250" /></li>'
                  );
              },
              error: function (t) {
                $("#instagram").hide();
              },
            });
          }
        }
      }),
      (t.methods.instagram2 = function () {
        if ("undefined" != typeof $instagram) {
          var t = `https://www.instagram.com/${$instagram.user}`
              .split("/")
              .pop(),
            e = $instagram.user,
            i = `<div id="instagram"> <div class="conteiner"> <div class="row-fluid">  <h2><span><svg class='icon' xmlns='http://www.w3.org/2000/svg' viewBox='-8700.68 2378.321 32.422 32.421'><path id='Union_72' data-name='Union 72' class='cls-1' d='M7835.447-3201.945a8.957,8.957,0,0,1-8.947-8.947v-14.528a8.957,8.957,0,0,1,8.947-8.946h14.526a8.957,8.957,0,0,1,8.949,8.946v14.528a8.957,8.957,0,0,1-8.949,8.947Zm-6.071-23.475v14.528a6.077,6.077,0,0,0,6.071,6.069h14.528a6.075,6.075,0,0,0,6.069-6.069v-14.528a6.079,6.079,0,0,0-6.071-6.071h-14.526A6.078,6.078,0,0,0,7829.376-3225.42Zm4.98,7.264a8.364,8.364,0,0,1,8.355-8.355,8.363,8.363,0,0,1,8.353,8.355,8.361,8.361,0,0,1-8.353,8.353A8.362,8.362,0,0,1,7834.356-3218.156Zm2.877,0a5.483,5.483,0,0,0,5.478,5.477,5.484,5.484,0,0,0,5.477-5.477,5.484,5.484,0,0,0-5.477-5.477A5.483,5.483,0,0,0,7837.233-3218.156Zm12.692-7.191a2.128,2.128,0,0,1-.622-1.493,2.114,2.114,0,0,1,.622-1.491,2.116,2.116,0,0,1,1.489-.617,2.127,2.127,0,0,1,1.493.617,2.118,2.118,0,0,1,.617,1.491,2.132,2.132,0,0,1-.617,1.493,2.138,2.138,0,0,1-1.493.617A2.123,2.123,0,0,1,7849.926-3225.347Z' transform='translate(-16527.18 5612.687)'/></svg>${$instagram.title}</span><a href='https://instagram.com/${e}' target='blank'>@${e}</a></h2> <span class="traco"></span> <div class="feedInsta"></div></div></div></div>`;
          $("#barraNewsletter.posicao-rodape").length
            ? $("#barraNewsletter").before(i)
            : $("#rodape").before(i),
            (o = jQuery),
            (a = {
              host: "https://www.instagram.com/",
              username: "",
              container: "",
              display_profile: !0,
              display_biography: !0,
              display_gallery: !0,
              get_raw_json: !1,
              callback: null,
              styling: !0,
              items: 8,
              items_per_row: 4,
              margin: 0.5,
            }),
            (o.instagramFeed = function (t) {
              "" == (t = o.fn.extend({}, a, t)).username && "" == t.tag
                ? console.log(
                    "Instagram Feed: Error, no username or tag found."
                  )
                : t.get_raw_json || "" != t.container
                ? t.get_raw_json && null == t.callback
                  ? console.log(
                      "Instagram Feed: Error, no callback defined to get the raw json"
                    )
                  : o.get(t.host + t.username, function (e) {
                      if (
                        ((e = (e = (e = (e = e.split(
                          "window._sharedData = "
                        ))[1].split("</script>"))[0]).substr(0, e.length - 1)),
                        (e = (e = JSON.parse(e)).entry_data.ProfilePage[0]
                          .graphql.user),
                        t.get_raw_json)
                      )
                        t.callback(
                          JSON.stringify({
                            id: e.id,
                            username: e.username,
                            full_name: e.full_name,
                            is_private: e.is_private,
                            is_verified: e.is_verified,
                            biography: e.biography,
                            followed_by: e.edge_followed_by.count,
                            following: e.edge_follow.count,
                            images: e.edge_owner_to_timeline_media.edges,
                          })
                        );
                      else {
                        var i = "",
                          a = "",
                          s = "",
                          n = "",
                          r = "";
                        t.styling &&
                          ((i = " style='text-align:center;'"),
                          (a =
                            " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'"),
                          (s = " style='font-size:1.2em;'"),
                          (n = " style='font-size:1em;'"),
                          (r =
                            " style='margin:" +
                            t.margin +
                            "% " +
                            t.margin +
                            "%;width:" +
                            (100 - 2 * t.margin * t.items_per_row) /
                              t.items_per_row +
                            "%;float:left;'"));
                        var l = "";
                        if (
                          (t.display_profile &&
                            ((l =
                              l +
                              "<div class='instagram_profile'" +
                              i +
                              ">\t<img class='instagram_profile_image' src='" +
                              e.profile_pic_url +
                              "' alt='" +
                              t.username +
                              " profile pic'" +
                              a +
                              " />"),
                            (l +=
                              "\t<p class='instagram_username'" +
                              s +
                              ">@" +
                              e.full_name +
                              " (<a href='https://www.instagram.com/" +
                              t.username +
                              "'>@" +
                              t.username +
                              "</a>)</p>")),
                          t.display_biography &&
                            (l +=
                              "\t<p class='instagram_biography'" +
                              n +
                              ">" +
                              e.biography +
                              "</p>"),
                          t.display_profile && (l += "</div>"),
                          t.display_gallery)
                        )
                          if (e.is_private)
                            l +=
                              "<p class='instagram_private'><strong>This profile is private</strong></p>";
                          else {
                            for (
                              e = e.edge_owner_to_timeline_media.edges,
                                max = e.length > t.items ? t.items : e.length,
                                l += "<ul class='instagram_gallery'>",
                                i = 0;
                              i < max;
                              i++
                            )
                              (l +=
                                "<li><a href='https://www.instagram.com/p/" +
                                e[i].node.shortcode +
                                "' target='_blank'>"),
                                (l +=
                                  "\t<img style='height: 200px;' src='" +
                                  e[i].node.thumbnail_src +
                                  "' alt='" +
                                  t.username +
                                  " instagram image " +
                                  i +
                                  "'" +
                                  r +
                                  " />"),
                                (l += "</a></li>");
                            l += "</ul>";
                          }
                        o(t.container).html(l);
                      }
                    })
                : console.log("Instagram Feed: Error, no container found.");
            }),
            $(window).load(function () {
              $.instagramFeed({
                username: t,
                container: ".feedInsta",
                display_profile: !1,
                display_biography: !1,
                display_gallery: !0,
                callback: null,
                styling: !1,
                items: 6,
                items_per_row: 6,
                margin: 1,
              });
            });
        }
        var o, a;
      }),
      (t.methods.share = function () {
        $("body.pagina-produto div.principal").after(
          $("<div class='sharethis-inline-share-buttons'></div>")
        ),
          $(".sharethis-inline-share-buttons").append(
            $("<script>", {
              src: "//platform-api.sharethis.com/js/sharethis.js#property=5991eb27770096001434ea7d&product=inline-share-buttons",
            })
          );
      }),
      (t.methods.tabs = function () {
        $("ul.tabs li").click(function () {
          var t = $(this).attr("data-tab");
          $("ul.tabs li").removeClass("current"),
            $(".tab-content").removeClass("current"),
            $(this).addClass("current"),
            $("#" + t).addClass("current");
        });
      }),
      (t.methods.tracking = function () {
        $(".tracking").append(
          $(
            '<form class="form-tracking"> <span> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 14"><path d="M65.9,0a5.25,5.25,0,0,0-4.2,8.4L65.9,14l4.2-5.6A5.25,5.25,0,0,0,65.9,0Zm0,8.75a3.5,3.5,0,1,1,3.5-3.5A3.5,3.5,0,0,1,65.9,8.75Z" transform="translate(-60.651)"/></svg> Rastreie aqui seu pedido: </span> <div class="wrap"><input type="text" placeholder="Digite seu código" required><button class="btn-tracking"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M2,7A4.951,4.951,0,0,1,7,2a4.951,4.951,0,0,1,5,5,4.951,4.951,0,0,1-5,5A4.951,4.951,0,0,1,2,7Zm12.3,8.7a.99.99,0,0,0,1.4-1.4l-3.1-3.1A6.847,6.847,0,0,0,14,7,6.957,6.957,0,0,0,7,0,6.957,6.957,0,0,0,0,7a6.957,6.957,0,0,0,7,7,6.847,6.847,0,0,0,4.2-1.4Z"/></svg></button></div></form>'
          )
        ),
          $(".btn-tracking").click(function (t) {
            t.preventDefault();
            var e =
              "https://app.melhorrastreio.com.br/app/" +
              $(".form-tracking input").val();
            window.open(e, "blank");
          });
      }),
      (t.methods.scrollToTop = function () {
        $("body").append(
          "<a href='#' class='scrollToTop'><i class='fa fa-angle-up' aria-hidden='true'></i><span>Topo</span></a>"
        ),
          $(window).scroll(function () {
            $(this).scrollTop() > 100
              ? $(".scrollToTop").fadeIn()
              : $(".scrollToTop").fadeOut();
          }),
          $(".scrollToTop").click(function () {
            return $("html, body").animate({ scrollTop: 0 }, 800), !1;
          });
      }),
      (t.methods.freeShipping = function () {
        if ("undefined" != typeof $frete_gratis) {
          var t = $frete_gratis,
            e = (function (t, e) {
              return (t = t.replace("R$", "").replace(",", ".")), e - Number(t);
            })($(".pagina-carrinho .subtotal strong").text(), t);
          (function (t, e) {
            $(e).insertBefore(t);
          })(
            $(".pagina-carrinho .tabela-carrinho"),
            e < t && e > 0
              ? (function (t) {
                  return (
                    '<span class="free-shipping warning"><svg version="1.1" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M119.467,337.067c-28.237,0-51.2,22.963-51.2,51.2c0,28.237,22.963,51.2,51.2,51.2s51.2-22.963,51.2-51.2C170.667,360.03,147.703,337.067,119.467,337.067z M119.467,422.4c-18.825,0-34.133-15.309-34.133-34.133c0-18.825,15.309-34.133,34.133-34.133s34.133,15.309,34.133,34.133C153.6,407.091,138.291,422.4,119.467,422.4z"/></g></g><g><g><path d="M409.6,337.067c-28.237,0-51.2,22.963-51.2,51.2c0,28.237,22.963,51.2,51.2,51.2c28.237,0,51.2-22.963,51.2-51.2C460.8,360.03,437.837,337.067,409.6,337.067z M409.6,422.4c-18.825,0-34.133-15.309-34.133-34.133c0-18.825,15.309-34.133,34.133-34.133c18.825,0,34.133,15.309,34.133,34.133C443.733,407.091,428.425,422.4,409.6,422.4z"/></g></g><g><g><path d="M510.643,289.784l-76.8-119.467c-1.57-2.441-4.275-3.917-7.177-3.917H332.8c-4.719,0-8.533,3.823-8.533,8.533v213.333c0,4.719,3.814,8.533,8.533,8.533h34.133v-17.067h-25.6V183.467h80.674l72.926,113.442v82.825h-42.667V396.8h51.2c4.719,0,8.533-3.814,8.533-8.533V294.4C512,292.77,511.531,291.157,510.643,289.784z"/></g></g><g><g><path d="M375.467,277.333V217.6h68.267v-17.067h-76.8c-4.719,0-8.533,3.823-8.533,8.533v76.8c0,4.719,3.814,8.533,8.533,8.533h128v-17.067H375.467z"/></g></g><g><g><path d="M332.8,106.667H8.533C3.823,106.667,0,110.49,0,115.2v273.067c0,4.719,3.823,8.533,8.533,8.533H76.8v-17.067H17.067v-256h307.2v256H162.133V396.8H332.8c4.719,0,8.533-3.814,8.533-8.533V115.2C341.333,110.49,337.519,106.667,332.8,106.667z"/></g></g><g><g><rect x="8.533" y="345.6" width="51.2" height="17.067"/></g></g><g><g><rect x="179.2" y="345.6" width="145.067" height="17.067"/></g></g><g><g><rect x="469.333" y="345.6" width="34.133" height="17.067"/></g></g><g><g><rect x="34.133" y="140.8" width="298.667" height="17.067"/></g></g><g><g><rect x="110.933" y="379.733" width="17.067" height="17.067"/></g></g><g><g><rect x="401.067" y="379.733" width="17.067" height="17.067"/></g></g><g><g><rect x="34.133" y="72.533" width="119.467" height="17.067"/></g></g><g><g><rect y="72.533" width="17.067" height="17.067"/></g></g><g></svg>OlÃƒÂ¡, faltam apenas <em>' +
                    t +
                    "</em> de compras para vocÃƒÂª aproveitar o frete grÃƒÂ¡tis!</span>"
                  );
                })(
                  (function (t) {
                    return "R$ " + t.toFixed(2).replace(".", ",").toString();
                  })(e)
                )
              : '<span class="free-shipping success"><svg version="1.1" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M119.467,337.067c-28.237,0-51.2,22.963-51.2,51.2c0,28.237,22.963,51.2,51.2,51.2s51.2-22.963,51.2-51.2C170.667,360.03,147.703,337.067,119.467,337.067z M119.467,422.4c-18.825,0-34.133-15.309-34.133-34.133c0-18.825,15.309-34.133,34.133-34.133s34.133,15.309,34.133,34.133C153.6,407.091,138.291,422.4,119.467,422.4z"/></g></g><g><g><path d="M409.6,337.067c-28.237,0-51.2,22.963-51.2,51.2c0,28.237,22.963,51.2,51.2,51.2c28.237,0,51.2-22.963,51.2-51.2C460.8,360.03,437.837,337.067,409.6,337.067z M409.6,422.4c-18.825,0-34.133-15.309-34.133-34.133c0-18.825,15.309-34.133,34.133-34.133c18.825,0,34.133,15.309,34.133,34.133C443.733,407.091,428.425,422.4,409.6,422.4z"/></g></g><g><g><path d="M510.643,289.784l-76.8-119.467c-1.57-2.441-4.275-3.917-7.177-3.917H332.8c-4.719,0-8.533,3.823-8.533,8.533v213.333c0,4.719,3.814,8.533,8.533,8.533h34.133v-17.067h-25.6V183.467h80.674l72.926,113.442v82.825h-42.667V396.8h51.2c4.719,0,8.533-3.814,8.533-8.533V294.4C512,292.77,511.531,291.157,510.643,289.784z"/></g></g><g><g><path d="M375.467,277.333V217.6h68.267v-17.067h-76.8c-4.719,0-8.533,3.823-8.533,8.533v76.8c0,4.719,3.814,8.533,8.533,8.533h128v-17.067H375.467z"/></g></g><g><g><path d="M332.8,106.667H8.533C3.823,106.667,0,110.49,0,115.2v273.067c0,4.719,3.823,8.533,8.533,8.533H76.8v-17.067H17.067v-256h307.2v256H162.133V396.8H332.8c4.719,0,8.533-3.814,8.533-8.533V115.2C341.333,110.49,337.519,106.667,332.8,106.667z"/></g></g><g><g><rect x="8.533" y="345.6" width="51.2" height="17.067"/></g></g><g><g><rect x="179.2" y="345.6" width="145.067" height="17.067"/></g></g><g><g><rect x="469.333" y="345.6" width="34.133" height="17.067"/></g></g><g><g><rect x="34.133" y="140.8" width="298.667" height="17.067"/></g></g><g><g><rect x="110.933" y="379.733" width="17.067" height="17.067"/></g></g><g><g><rect x="401.067" y="379.733" width="17.067" height="17.067"/></g></g><g><g><rect x="34.133" y="72.533" width="119.467" height="17.067"/></g></g><g><g><rect y="72.533" width="17.067" height="17.067"/></g></g><g></svg>Sua compra serÃƒÂ¡ realizada com frete grÃƒÂ¡tis!</span>'
          );
        }
      }),
      (t.methods.copyright = function () {
        $(
          "#rodape div:last-child .span9.span12 + div,#rodape div:last-child .span9.span12 + div + div "
        ).remove(""),
          $("#rodape div:last-child > .conteiner > .row-fluid").append(
            '<div class="cr conteiner" style="opacity:1!important;display:block!important;visibility:visible!important;margin:0 auto!important;margin-top:20px!important;position:static!important;text-align:center!important;overflow:visible!important;padding:7px 0px!important;"><div>'
          ),
          $(".cr.conteiner").append(
            '<div id="cr-li" style="opacity:1!important;display:inline-block!important;visibility:visible!important;margin:0!important;position:static!important;overflow:visible!important;padding:0 15px 5px 0px!important;"><a href="https://lojaintegrada.com.br/" target="_blank" title="Loja Integrada" style="opacity:1!important;display:inline-block!important;visibility:visible!important;margin:0!important;position:static!important;overflow:visible!important;float:right!important;"><img src="https://cdn.awsli.com.br/150x150/307/307092/arquivos/plataforma-loja-integrada.png" title="Loja Integrada" alt="Loja Integrada" style="opacity:1!important;display:inline-block!important;visibility:visible!important;margin:0!important;position:static!important;overflow:visible!important;max-width: 120px;"></a></div>'
          ),
          $("head").append(
            $(
              "<style>@media screen and (max-width:767px){.span9.span12 p{margin-bottom:-25px!important}}.span9.span12 p{padding:5px 0 15px 0}</style>"
            )
          );
      }),
      (t.methods.fullbannerMobile = function () {
        "undefined" != typeof $banners_mobile &&
          ($(
            '<div id="fullbanner-mob" class="fullbanner-mob"></div>'
          ).insertBefore(".pagina-inicial .secao-banners"),
          $banners_mobile.forEach(function (t) {
            var e, i, o;
            (e = t),
              (i = $("#fullbanner-mob")),
              (o =
                '<div><a href="' +
                e.href +
                '"><img src="' +
                e.src +
                '" alt="' +
                e.alt +
                '" title="' +
                e.title +
                '"></a></div>'),
              $(i).append(o);
          }),
          $("#fullbanner-mob").slick({
            infinite: !0,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 250,
            dots: !0,
            arrows: !1,
          }));
      }),
      (t.methods.floatIcons = function () {
        if (!$("body").hasClass("pagina-carrinho")) {
          ($whats = $(".contact .tel-whatsapp a").length
            ? $(".contact .tel-whatsapp a").attr("href")
            : void 0),
            ($skype = $(".contact .tel-skype a").length
              ? $(".contact .tel-skype a").attr("href")
              : void 0),
            ($messenger = $(".lista-redes .icon-facebook").length
              ? $(".lista-redes .icon-facebook")
                  .closest("a")
                  .attr("href")
                  .replace(window.location.protocol + "//facebook.com/", "")
              : void 0);
          var t =
            '<div class="float-contact"> <ul class="float-items"> <li class="float-modal"> <a href="#modalContato" data-toggle="modal" data-target="#modalContato"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.101 29.151"> <g transform="translate(0 0)"> <path class="a" d="M3.313,29.151a3.187,3.187,0,0,1-2.339-.973A3.186,3.186,0,0,1,0,25.838V9.4a11,11,0,0,0,2.091,1.8q7.5,5.094,10.291,7.143,1.179.869,1.914,1.356a11.8,11.8,0,0,0,1.957.994,5.968,5.968,0,0,0,2.277.507h.042a5.961,5.961,0,0,0,2.277-.507,11.785,11.785,0,0,0,1.957-.994q.735-.486,1.915-1.356Q28.24,15.8,35.031,11.2A11.4,11.4,0,0,0,37.1,9.4V25.838a3.321,3.321,0,0,1-3.312,3.312Zm15.238-10.6H18.53a3.29,3.29,0,0,1-1.035-.186,6.273,6.273,0,0,1-1.19-.558q-.632-.372-1.077-.673t-1.118-.786q-.674-.487-.88-.632-1.885-1.325-5.424-3.778T3.561,8.986A10.266,10.266,0,0,1,1.139,6.594,4.836,4.836,0,0,1,0,3.768,4.177,4.177,0,0,1,.859,1.077,2.957,2.957,0,0,1,3.313,0H33.789a3.2,3.2,0,0,1,2.329.973A3.173,3.173,0,0,1,37.1,3.312a5.47,5.47,0,0,1-1.014,3.126,9.828,9.828,0,0,1-2.526,2.546q-7.783,5.4-9.689,6.729-.207.145-.88.632t-1.118.786q-.446.3-1.077.673a6.245,6.245,0,0,1-1.19.558,3.285,3.285,0,0,1-1.035.186Z" /> </g> </svg> </a> </li> <li class="float-skype"> <a href="' +
            $skype +
            '" title="skype" target="_blank"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.102 37.101"> <g transform="translate(0 0)"> <path class="a" d="M26.841,37.1a10.277,10.277,0,0,1-4.853-1.2,18.317,18.317,0,0,1-3.242.292,17.706,17.706,0,0,1-12.512-5.11A17.279,17.279,0,0,1,1.409,15.237a10.013,10.013,0,0,1,1.6-12.274A10.373,10.373,0,0,1,15.722,1.552,18.114,18.114,0,0,1,18.748,1.3,17.707,17.707,0,0,1,31.261,6.407a17.3,17.3,0,0,1,4.774,16.084A9.9,9.9,0,0,1,37.1,26.985,10.2,10.2,0,0,1,26.841,37.1ZM10.9,21.394a2.614,2.614,0,0,0-1.848.677,2.169,2.169,0,0,0-.737,1.644,5.489,5.489,0,0,0,1.132,3.154,8.234,8.234,0,0,0,2.912,2.55A13.655,13.655,0,0,0,18.7,30.731a14.608,14.608,0,0,0,5.528-.962,8.03,8.03,0,0,0,3.6-2.687,6.567,6.567,0,0,0,1.241-3.892,6.174,6.174,0,0,0-.718-3.075,6.023,6.023,0,0,0-1.994-2.075,12.576,12.576,0,0,0-3.032-1.362c-1.169-.37-2.485-.71-3.911-1.01-1.052-.239-1.921-.449-2.449-.593a7.965,7.965,0,0,1-1.424-.545,3.162,3.162,0,0,1-1.056-.791,1.517,1.517,0,0,1-.355-1.014,1.989,1.989,0,0,1,1.1-1.672,5.592,5.592,0,0,1,3.065-.747,5.044,5.044,0,0,1,2.957.67,5.814,5.814,0,0,1,1.589,1.939A5.665,5.665,0,0,0,23.891,14.3a2.255,2.255,0,0,0,1.523.468,2.456,2.456,0,0,0,1.819-.747,2.354,2.354,0,0,0,.726-1.683,4.157,4.157,0,0,0-.555-1.989,6.258,6.258,0,0,0-1.72-1.908,9.154,9.154,0,0,0-2.921-1.436,14.178,14.178,0,0,0-4.13-.538,15.209,15.209,0,0,0-5.192.8A7.438,7.438,0,0,0,10,9.628a5.617,5.617,0,0,0-1.2,3.529,5.414,5.414,0,0,0,1.146,3.5,7.656,7.656,0,0,0,3.039,2.191,25.8,25.8,0,0,0,4.638,1.368c1.322.273,2.414.539,3.246.792a4.878,4.878,0,0,1,1.888,1.03,2.134,2.134,0,0,1,.681,1.653,2.546,2.546,0,0,1-1.31,2.178,6.3,6.3,0,0,1-3.564.916A6.205,6.205,0,0,1,16,26.333,3.944,3.944,0,0,1,14.511,25.2,8.567,8.567,0,0,1,13.5,23.423a4.032,4.032,0,0,0-1.037-1.5A2.369,2.369,0,0,0,10.9,21.394Z" transform="translate(0)" /> </g> </svg> </a> </li> <li class="float-whats"> <a href="' +
            $whats +
            '" title="Whatsapp" target="_blank"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.1 37.101"> <g transform="translate(0)"> <path class="a" d="M18.554,37.1a18.427,18.427,0,0,1-10.2-3.066l-7.13,2.279,2.312-6.892A18.349,18.349,0,0,1,0,18.551,18.569,18.569,0,0,1,18.545,0h.009a18.551,18.551,0,0,1,0,37.1ZM11.565,8.485a2.689,2.689,0,0,0-1.9.665L9.62,9.2a5.93,5.93,0,0,0-1.848,4.465,9.615,9.615,0,0,0,2.177,5.561l.026.035c.021.027.059.083.117.167a22.02,22.02,0,0,0,9.118,7.991,15.781,15.781,0,0,0,5.433,1.519,4.811,4.811,0,0,0,1.065-.124c1.445-.311,3.2-1.376,3.641-2.617a4.645,4.645,0,0,0,.318-2.574c-.106-.183-.352-.3-.726-.481-.1-.046-.2-.1-.311-.152-.031-.016-3.148-1.564-3.7-1.756a1.342,1.342,0,0,0-.471-.094,1.035,1.035,0,0,0-.86.5l-.216.3a17.839,17.839,0,0,1-1.234,1.618,1.046,1.046,0,0,1-.775.314,1.4,1.4,0,0,1-.532-.108l-.167-.068a13.66,13.66,0,0,1-4.184-2.615,16.3,16.3,0,0,1-3.009-3.741.856.856,0,0,1,.2-1.138l.015-.017c.158-.2.314-.362.465-.522l0,0,0,0c.109-.116.221-.235.335-.366l.05-.057a3,3,0,0,0,.551-.794,1.1,1.1,0,0,0-.079-1c-.09-.19-.638-1.519-1.122-2.692l-.025-.06c-.2-.49-.389-.944-.521-1.261-.354-.847-.617-.893-1.178-.916l-.063,0C11.958,8.494,11.77,8.485,11.565,8.485Z" transform="translate(0 0)" /> </g> </svg> </a> </li> <li class="float-messenger"> <a href="https://m.me/' +
            $messenger +
            '" title="Messenger" target="_blank"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.099 37.101"> <g transform="translate(0 0)"> <path class="a" d="M6.957,37.1a.774.774,0,0,1-.774-.772V31.011A17.418,17.418,0,0,1,0,17.78,18.2,18.2,0,0,1,18.184,0c.12,0,.243,0,.366,0s.246,0,.366,0A18.2,18.2,0,0,1,37.1,17.78,18.2,18.2,0,0,1,18.915,35.559c-.119,0-.242,0-.366,0H18.5a19.052,19.052,0,0,1-6.831-1.262L7.366,36.984A.772.772,0,0,1,6.957,37.1Zm8.407-18.388h0l5,4.289a.771.771,0,0,0,1.049-.04l9.275-9.275a.775.775,0,0,0-.921-1.225l-8.038,4.382-5-4.288a.774.774,0,0,0-1.05.041L6.41,21.871A.773.773,0,0,0,7.325,23.1l8.038-4.382Z" transform="translate(0 0)" /> </g> </svg> </a> </li> </ul> <div class="float-open"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.099 30.106"> <path class="a" d="M3.4,29.529v-2.24H1.8A1.784,1.784,0,0,1,0,25.422V15.036a1.811,1.811,0,0,1,1.8-1.8H4.583v5.4a4.317,4.317,0,0,0,4.311,4.311H20.332v2.579a1.81,1.81,0,0,1-1.8,1.8H6.993L4.379,29.936a.563.563,0,0,1-.407.17A.6.6,0,0,1,3.4,29.529Zm27.017-4.208-3.97-4.005H8.894a2.759,2.759,0,0,1-2.749-2.749V2.75A2.76,2.76,0,0,1,8.894,0H34.35A2.759,2.759,0,0,1,37.1,2.75V18.566a2.759,2.759,0,0,1-2.749,2.749H31.906V24.71a.877.877,0,0,1-.883.882A.853.853,0,0,1,30.412,25.321ZM28.071,11.065A2.546,2.546,0,1,0,30.616,8.52,2.564,2.564,0,0,0,28.071,11.065Zm-8.893,0A2.546,2.546,0,1,0,21.724,8.52,2.564,2.564,0,0,0,19.178,11.065Zm-8.927,0A2.546,2.546,0,1,0,12.8,8.52,2.564,2.564,0,0,0,10.251,11.065Z" transform="translate(0 0)" /></svg> </div></div>';
          $("body").append(t),
            "undefined" == typeof $skype && $(".float-skype").remove(),
            "undefined" == typeof $whats && $(".float-whats").remove(),
            "undefined" == typeof $messenger && $(".float-messenger").remove();
        }
        $(".float-contact .float-open").click(function () {
          $(".float-contact").toggleClass("open-contato");
        });
      }),
      $(".float-contact .float-open").click(function () {
        $(".float-contact").toggleClass("open-contato");
      }),
      (t.methods.menuWithOffers = function () {
        $(".full.menu li:not(.other-categories) .nivel-dois").wrapInner(
          '<div class="mega-categorias span6"></div>'
        ),
          $(".full.menu li:not(.other-categories) .nivel-dois").append(
            '<div class="mega-recebe span6"></div>'
          ),
          $(".full.menu .nivel-um>li .mega-recebe").append(
            '<div class="mega-recebe-prod"><div id="listagemProdutos" class="listagem"><ul><li class="listagem-linha"><ul></ul></li></ul></div></div>'
          ),
          $(".full.menu .nivel-um>li").each(function () {
            var t = $(this),
              e = t.find("a").attr("href");
            t.find(".mega-recebe-prod .listagem ul li ul").load(
              e + " .listagem .listagem-linha:first-child ul li:first-child"
            );
          });
      }),
      (t.methods.offers = function () {
        $('.full.menu a[title="Ofertas Especiais"]')
          .closest("li")
          .addClass("ofertas-especiais"),
          $('.menu.superior a[title="Ofertas Especiais"]')
            .closest("li")
            .addClass("ofertas-especiais"),
          $('.menu.lateral .nivel-um li > a[title="Ofertas Especiais"]')
            .closest("li")
            .addClass("ofertas-especiais"),
          $('.links-rodape-categorias ul li a:contains("Ofertas Especiais")')
            .closest("li")
            .addClass("ofertas-especiais"),
          $(".full.menu .ofertas-especiais").remove(),
          $(".menu.superior .ofertas-especiais").remove(),
          $(".menu.lateral .ofertas-especiais").remove(),
          $(".links-rodape-categorias .ofertas-especiais").remove(),
          $(".full.menu .nivel-um").append(
            '<li class="offers com-filho"><a title="Ofertas"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.198 17.03"><path id="money" class="cls-1" d="M173.088,117.583h-2.371a1.787,1.787,0,0,1,0-3.573H174.9a.815.815,0,0,0,0-1.63h-2.181v-1.664a.815.815,0,1,0-1.63,0v1.664h-.374a3.417,3.417,0,0,0,0,6.834h2.371a1.787,1.787,0,1,1,0,3.573h-4.259a.815.815,0,1,0,0,1.63h2.255v1.7a.815.815,0,1,0,1.63,0v-1.7h.414a3.417,3.417,0,0,0-.041-6.834Z" transform="translate(-167.3 -109.9)"/></svg><strong class="titulo">Ofertas</strong></a><ul class="nivel-dois"></ul></li>'
          ),
          $(".full.menu .nivel-um .offers .nivel-dois").append(
            '<div class="mega-recebe-prod"><div id="listagemProdutos" class="listagem"><ul><li class="listagem-linha"><ul></ul></li></ul></div></div>'
          ),
          $(".offers .mega-recebe-prod .listagem .listagem-linha ul").append(
            '<li class="oferta1"></li>'
          ),
          $(".offers .mega-recebe-prod .listagem .listagem-linha ul").append(
            '<li class="oferta2"></li>'
          ),
          $(".offers .mega-recebe-prod .listagem .listagem-linha ul").append(
            '<li class="oferta3"></li>'
          )
      }),
      (t.methods.counterOffer = function () {
        var t, e, i, o, a, s;
        "undefined" != typeof $data_oferta &&
          ("object" != typeof $data_oferta
            ? (($data_oferta = $data_oferta.split("/")),
              ($data_oferta = new Date($data_oferta.reverse())),
              ($data_oferta = $data_oferta.setDate($data_oferta.getDate() + 1)))
            : ($data_oferta = $data_oferta.setDate($data_oferta.getDate() + 4)),
          $data_oferta > new Date() &&
            ($(".offers .nivel-dois").append(
              '<div class="counter-offer"><div class="promo"><span class="title">APROVEITE NOSSAS SUPER OFERTAS COM</span><p>' +
                $texto_oferta +
                '</p></div><div class="counter"><span class="title">OFERTAS POR TEMPO LIMITADO</span><div class="counter-wrap"><svg class="icon-offer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 53.916 53.916"><g transform="translate(-1187.5 -1284)"><g class="a" transform="translate(1187.5 1284)"><circle class="b" cx="26.958" cy="26.958" r="26.958"/><circle class="c" cx="26.958" cy="26.958" r="25.458"/></g><rect width="2.995" height="16.474" rx="1.498" transform="translate(1212.96 1295.981)"/><rect width="2.995" height="16.474" rx="1.498" transform="translate(1230.183 1310.209) rotate(90)"/></g></svg><div class="item days" data-value=""><span class="description">Dias</span></div><div class="item hours" data-value=""><span class="description">Horas</span></div><div class="item minutes" data-value=""><span class="description">Min</span></div><div class="item seconds" data-value=""><span class="description">Seg</span></div></div></div></div>'
            ),
            (t = $data_oferta),
            (s = new Date(t).getTime()),
            setInterval(function () {
              var t = new Date().getTime(),
                n = (s - t) / 1e3;
              (e = parseInt(n / 86400)),
                (n %= 86400),
                (i = parseInt(n / 3600)),
                (n %= 3600),
                (o = parseInt(n / 60)),
                (a = parseInt(n % 60)),
                s >= t &&
                  ($(".days").attr("date-value", e < 10 ? "0" + e : e),
                  $(".hours").attr("date-value", i < 10 ? "0" + i : i),
                  $(".minutes").attr("date-value", o < 10 ? "0" + o : o),
                  $(".seconds").attr("date-value", a < 10 ? "0" + a : a)),
                0 == e && 0 == i && 0 == o && 0 == a && $(".offers").remove();
            }, 1e3)));
      });
    $("#barraTopo").hide(),
      $(".barra-inicial .row-fluid").append(
        '<ul class="top-actions"> <li class="top-action-item"> <a href="#modalContato" data-toggle="modal" data-target="#modalContato"> <svg class="icon "xmlns="http://www.w3.org/2000/svg" viewBox="-1281.001 13.021 14.704 11.553"><path class="a" d="M6884.314,22.553A1.318,1.318,0,0,1,6883,21.241V14.725a4.339,4.339,0,0,0,.829.715q2.971,2.018,4.079,2.83.467.345.758.537a4.617,4.617,0,0,0,.776.395,2.371,2.371,0,0,0,.9.2h.017a2.371,2.371,0,0,0,.9-.2,4.617,4.617,0,0,0,.776-.395q.291-.192.758-.537,1.395-1.01,4.087-2.83a4.573,4.573,0,0,0,.82-.715v6.516a1.318,1.318,0,0,1-1.314,1.312Zm6.038-4.2h-.009a1.288,1.288,0,0,1-.41-.074,2.511,2.511,0,0,1-.471-.22c-.168-.1-.31-.189-.427-.267s-.265-.183-.443-.313-.294-.211-.348-.249q-.748-.525-2.15-1.5t-1.683-1.17a4.055,4.055,0,0,1-.959-.947,1.913,1.913,0,0,1-.452-1.12,1.658,1.658,0,0,1,.341-1.066,1.174,1.174,0,0,1,.973-.428h12.076a1.277,1.277,0,0,1,.925.386,1.261,1.261,0,0,1,.389.928,2.152,2.152,0,0,1-.4,1.238,3.851,3.851,0,0,1-1,1.009l-3.839,2.668c-.054.038-.171.121-.348.249s-.325.234-.443.313-.259.168-.427.267a2.511,2.511,0,0,1-.471.22,1.288,1.288,0,0,1-.41.074Z" transform="translate(-8164.001 2.021)"/></svg> Fale Conosco </a> </li><li class="top-action-item"> <a href="/conta/favorito/listar"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="-1145 13.105 15.865 14"><path class="a" d="M14.622,1.293a4.263,4.263,0,0,0-6.067,0l-.6.6-.6-.6A4.29,4.29,0,0,0,1.293,7.361l6.664,6.664,6.664-6.664a4.263,4.263,0,0,0,0-6.067" transform="translate(-1145.025 13.08)"/></svg> Meus favoritos </a> </li><li class="top-action-item rastreio"> <a href="#"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="5648 56.875 9.554 13.868"><path class="a" d="M76.233,3.452a4.32,4.32,0,0,0-.224-.555A4.751,4.751,0,0,0,66.9,4.3v.592c0,.025.009.247.021.358C67.1,6.632,68.188,8.1,69,9.48c.875,1.479,1.783,2.934,2.683,4.388.555-.949,1.108-1.911,1.65-2.835.148-.271.319-.542.467-.8.1-.172.287-.345.373-.505.875-1.6,2.284-3.217,2.284-4.808V4.265A4.921,4.921,0,0,0,76.233,3.452ZM71.656,6.423a1.7,1.7,0,0,1-1.623-1.159,1.607,1.607,0,0,1-.046-.432V4.45a1.605,1.605,0,0,1,1.722-1.578,1.746,1.746,0,0,1,1.749,1.775A1.791,1.791,0,0,1,71.656,6.423Z" transform="translate(5581.095 56.875)"/></svg> Rastreie seu pedido </a> </li></ul>'
      );
    var i =
      '<ul class="actions"> <li class="action-item account"> <a href="/conta/index"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37"><g transform="translate(-0.478 3.685)"><g class="a" transform="translate(0.478 -3.685)"><path class="c" d="M18.5,0A18.6,18.6,0,0,1,34.819,9.779,18.162,18.162,0,0,1,37,18.5,18.5,18.5,0,1,1,18.5,0Z"/><path class="d" d="M 18.5 2 C 14.09268951416016 2 9.949180603027344 3.716300964355469 6.832740783691406 6.832740783691406 C 3.716300964355469 9.949180603027344 2 14.09268951416016 2 18.5 C 2 22.90731048583984 3.716300964355469 27.05081939697266 6.832740783691406 30.16725921630859 C 9.949180603027344 33.28369903564453 14.09268951416016 35 18.5 35 C 22.90731048583984 35 27.05081939697266 33.28369903564453 30.16725921630859 30.16725921630859 C 33.28369903564453 27.05081939697266 35 22.90731048583984 35 18.5 C 35 15.74249076843262 34.31491851806641 12.99007034301758 33.07001113891602 10.74802017211914 C 31.60560989379883 8.10453987121582 29.50716972351074 5.900890350341797 27.00154113769531 4.375289916992188 C 24.44939994812012 2.821361541748047 21.50960922241211 2 18.5 2 M 18.5 0 C 25.46812057495117 0 31.53646087646484 3.852439880371094 34.81949996948242 9.778860092163086 C 36.16239166259766 12.19734954833984 37 15.2508602142334 37 18.5 C 37 28.71726989746094 28.71726989746094 37 18.5 37 C 8.282730102539063 37 0 28.71726989746094 0 18.5 C 0 8.282730102539063 8.282730102539063 0 18.5 0 Z"/></g><path class="b" d="M.877,21.449A.964.964,0,0,1,0,20.4a16.026,16.026,0,0,1,1.921-6.771,6.676,6.676,0,0,1,6.034-3.457,6.674,6.674,0,0,1,6.034,3.457A15.876,15.876,0,0,1,15.915,20.4a.96.96,0,0,1-.872,1.041.337.337,0,0,1-.089.008A.964.964,0,0,1,14,20.576c-.52-5.634-2.553-8.492-6.042-8.492s-5.522,2.858-6.042,8.492a.961.961,0,0,1-.953.877C.935,21.453.906,21.452.877,21.449ZM3.55,4.41A4.41,4.41,0,1,1,7.959,8.819,4.413,4.413,0,0,1,3.55,4.41Zm1.92,0A2.489,2.489,0,1,0,7.959,1.921,2.5,2.5,0,0,0,5.47,4.41Z" transform="translate(11.308 4.191)"/></g></svg> ENTRAR </a> </li> <li class="action-item support"> <a href="#modalContato" data-toggle="modal" data-target="#modalContato"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.008 37"><g transform="translate(0 -0.05)"><path class="a" d="M31.579,5.471A18.5,18.5,0,1,0,5.421,31.629,18.377,18.377,0,0,0,18.5,37.05a17.673,17.673,0,0,0,7.567-1.53A7.954,7.954,0,0,0,30.1,31.69a4.616,4.616,0,0,0-1.165-5.207l-.053-.053a.718.718,0,0,1,.076-.076,2.493,2.493,0,0,0-.015-3.67L26.311,20.05a2.5,2.5,0,0,0-1.8-.822,2.571,2.571,0,0,0-1.827.815l-1.37,1.37c-.069-.038-.129-.069-.2-.1a4.788,4.788,0,0,1-.449-.244,16.164,16.164,0,0,1-3.867-3.525,9.676,9.676,0,0,1-1.172-1.8c.343-.32.662-.647.974-.967.129-.137.266-.266.4-.4a2.442,2.442,0,0,0,0-3.685l-1.3-1.3c-.152-.152-.3-.3-.442-.449-.289-.3-.586-.6-.906-.9a2.523,2.523,0,0,0-1.789-.777,2.6,2.6,0,0,0-1.812.777l-.015.015L9.1,9.688a3.739,3.739,0,0,0-1.112,2.391,8.667,8.667,0,0,0,.632,3.662,20.927,20.927,0,0,0,3.7,6.182A22.761,22.761,0,0,0,19.9,27.861a11.992,11.992,0,0,0,4.309,1.271c.107.008.213.008.32.008a3.859,3.859,0,0,0,2.954-1.271l.03-.03a.913.913,0,0,1,.084-.091l.046.046a2.8,2.8,0,0,1,.769,3.22c-.876,2.078-4.279,4.21-9.912,4.21A16.663,16.663,0,1,1,34.571,23a.916.916,0,1,0,1.766.487A18.478,18.478,0,0,0,31.579,5.471ZM26.128,26.628a2.014,2.014,0,0,1-1.6.67,1.855,1.855,0,0,1-.206-.008,10.183,10.183,0,0,1-3.631-1.1,20.938,20.938,0,0,1-6.966-5.459,19.22,19.22,0,0,1-3.4-5.641,6.77,6.77,0,0,1-.525-2.878,1.908,1.908,0,0,1,.586-1.249l1.637-1.629a.854.854,0,0,1,.541-.266.738.738,0,0,1,.51.259l.023.023c.289.266.563.548.853.845.152.152.3.312.457.464l1.3,1.3a.655.655,0,0,1,0,1.1l-.411.411c-.4.4-.777.792-1.188,1.157-.015.008-.023.023-.038.038a1.248,1.248,0,0,0-.312,1.363c.008.023.015.038.023.061a10.7,10.7,0,0,0,1.584,2.581l.008.008a17.816,17.816,0,0,0,4.309,3.921c.206.129.411.236.609.335a4.788,4.788,0,0,1,.449.244.83.83,0,0,0,.084.046,1.312,1.312,0,0,0,.594.145,1.254,1.254,0,0,0,.914-.411l1.637-1.637a.817.817,0,0,1,.533-.282.744.744,0,0,1,.495.266l.015.015,2.634,2.634a.691.691,0,0,1-.015,1.119l-.008.008c-.175.19-.365.373-.571.571C26.753,25.958,26.433,26.27,26.128,26.628Z" transform="translate(0 0)"/></g></svg> SUPORTE </a> </li> <li class="action-item cart carrinho"> <a href="/carrinho/index"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.368 37"><g transform="translate(0 0)"><path class="a" d="M222.512,131.134a.919.919,0,0,0,.649.267.932.932,0,0,0,.649-.267l5.638-5.638a.917.917,0,0,0-1.3-1.3l-4.99,5-2.014-2.014a.917.917,0,0,0-1.3,1.3Z" transform="translate(-204.143 -114.475)"/><path class="a" d="M27,24.289H47.513a4.111,4.111,0,0,0,4.1-4.1V11.54a.916.916,0,0,0-1.831,0v8.637a2.274,2.274,0,0,1-2.274,2.274H27a2.274,2.274,0,0,1-2.274-2.274V3.3a.435.435,0,0,0-.008-.1V3.178c0-.023-.008-.046-.008-.061a.141.141,0,0,0-.015-.053c0-.008-.008-.023-.008-.031-.008-.023-.015-.038-.023-.061,0-.008-.008-.015-.008-.023s-.015-.038-.023-.053-.008-.023-.015-.031l-.023-.046c-.008-.015-.015-.023-.023-.038s-.015-.023-.023-.031a.166.166,0,0,0-.031-.038l-.023-.023c-.015-.015-.023-.031-.038-.046s-.015-.015-.023-.015a.2.2,0,0,0-.046-.038l-.023-.023c-.015-.008-.031-.023-.046-.031s-.038-.023-.053-.038a.016.016,0,0,1-.015-.015l-.092-.046L18.521.073a.915.915,0,0,0-.71,1.686L22.885,3.9V26.609A4.105,4.105,0,0,0,26.646,30.7a4.056,4.056,0,1,0,6.775.015h9.712a4.06,4.06,0,1,0,3.4-1.831H27a2.274,2.274,0,0,1-2.274-2.274V23.6A4.081,4.081,0,0,0,27,24.289Zm5.257,8.652a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,32.254,32.941Zm16.5,0a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,48.749,32.941Z" transform="translate(-17.25 0)"/></g></svg> CARRINHO </a> </li></ul>';
    e &&
      (i =
        '<ul class="actions"> <li class="action-item account"> <a href="/conta/index"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37"><g transform="translate(-0.478 3.685)"><g class="a" transform="translate(0.478 -3.685)"><path class="c" d="M18.5,0A18.6,18.6,0,0,1,34.819,9.779,18.162,18.162,0,0,1,37,18.5,18.5,18.5,0,1,1,18.5,0Z"/><path class="d" d="M 18.5 2 C 14.09268951416016 2 9.949180603027344 3.716300964355469 6.832740783691406 6.832740783691406 C 3.716300964355469 9.949180603027344 2 14.09268951416016 2 18.5 C 2 22.90731048583984 3.716300964355469 27.05081939697266 6.832740783691406 30.16725921630859 C 9.949180603027344 33.28369903564453 14.09268951416016 35 18.5 35 C 22.90731048583984 35 27.05081939697266 33.28369903564453 30.16725921630859 30.16725921630859 C 33.28369903564453 27.05081939697266 35 22.90731048583984 35 18.5 C 35 15.74249076843262 34.31491851806641 12.99007034301758 33.07001113891602 10.74802017211914 C 31.60560989379883 8.10453987121582 29.50716972351074 5.900890350341797 27.00154113769531 4.375289916992188 C 24.44939994812012 2.821361541748047 21.50960922241211 2 18.5 2 M 18.5 0 C 25.46812057495117 0 31.53646087646484 3.852439880371094 34.81949996948242 9.778860092163086 C 36.16239166259766 12.19734954833984 37 15.2508602142334 37 18.5 C 37 28.71726989746094 28.71726989746094 37 18.5 37 C 8.282730102539063 37 0 28.71726989746094 0 18.5 C 0 8.282730102539063 8.282730102539063 0 18.5 0 Z"/></g><path class="b" d="M.877,21.449A.964.964,0,0,1,0,20.4a16.026,16.026,0,0,1,1.921-6.771,6.676,6.676,0,0,1,6.034-3.457,6.674,6.674,0,0,1,6.034,3.457A15.876,15.876,0,0,1,15.915,20.4a.96.96,0,0,1-.872,1.041.337.337,0,0,1-.089.008A.964.964,0,0,1,14,20.576c-.52-5.634-2.553-8.492-6.042-8.492s-5.522,2.858-6.042,8.492a.961.961,0,0,1-.953.877C.935,21.453.906,21.452.877,21.449ZM3.55,4.41A4.41,4.41,0,1,1,7.959,8.819,4.413,4.413,0,0,1,3.55,4.41Zm1.92,0A2.489,2.489,0,1,0,7.959,1.921,2.5,2.5,0,0,0,5.47,4.41Z" transform="translate(11.308 4.191)"/></g></svg> CONTA </a> </li> <li class="action-item support"> <a href="#modalContato" data-toggle="modal" data-target="#modalContato"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.008 37"><g transform="translate(0 -0.05)"><path class="a" d="M31.579,5.471A18.5,18.5,0,1,0,5.421,31.629,18.377,18.377,0,0,0,18.5,37.05a17.673,17.673,0,0,0,7.567-1.53A7.954,7.954,0,0,0,30.1,31.69a4.616,4.616,0,0,0-1.165-5.207l-.053-.053a.718.718,0,0,1,.076-.076,2.493,2.493,0,0,0-.015-3.67L26.311,20.05a2.5,2.5,0,0,0-1.8-.822,2.571,2.571,0,0,0-1.827.815l-1.37,1.37c-.069-.038-.129-.069-.2-.1a4.788,4.788,0,0,1-.449-.244,16.164,16.164,0,0,1-3.867-3.525,9.676,9.676,0,0,1-1.172-1.8c.343-.32.662-.647.974-.967.129-.137.266-.266.4-.4a2.442,2.442,0,0,0,0-3.685l-1.3-1.3c-.152-.152-.3-.3-.442-.449-.289-.3-.586-.6-.906-.9a2.523,2.523,0,0,0-1.789-.777,2.6,2.6,0,0,0-1.812.777l-.015.015L9.1,9.688a3.739,3.739,0,0,0-1.112,2.391,8.667,8.667,0,0,0,.632,3.662,20.927,20.927,0,0,0,3.7,6.182A22.761,22.761,0,0,0,19.9,27.861a11.992,11.992,0,0,0,4.309,1.271c.107.008.213.008.32.008a3.859,3.859,0,0,0,2.954-1.271l.03-.03a.913.913,0,0,1,.084-.091l.046.046a2.8,2.8,0,0,1,.769,3.22c-.876,2.078-4.279,4.21-9.912,4.21A16.663,16.663,0,1,1,34.571,23a.916.916,0,1,0,1.766.487A18.478,18.478,0,0,0,31.579,5.471ZM26.128,26.628a2.014,2.014,0,0,1-1.6.67,1.855,1.855,0,0,1-.206-.008,10.183,10.183,0,0,1-3.631-1.1,20.938,20.938,0,0,1-6.966-5.459,19.22,19.22,0,0,1-3.4-5.641,6.77,6.77,0,0,1-.525-2.878,1.908,1.908,0,0,1,.586-1.249l1.637-1.629a.854.854,0,0,1,.541-.266.738.738,0,0,1,.51.259l.023.023c.289.266.563.548.853.845.152.152.3.312.457.464l1.3,1.3a.655.655,0,0,1,0,1.1l-.411.411c-.4.4-.777.792-1.188,1.157-.015.008-.023.023-.038.038a1.248,1.248,0,0,0-.312,1.363c.008.023.015.038.023.061a10.7,10.7,0,0,0,1.584,2.581l.008.008a17.816,17.816,0,0,0,4.309,3.921c.206.129.411.236.609.335a4.788,4.788,0,0,1,.449.244.83.83,0,0,0,.084.046,1.312,1.312,0,0,0,.594.145,1.254,1.254,0,0,0,.914-.411l1.637-1.637a.817.817,0,0,1,.533-.282.744.744,0,0,1,.495.266l.015.015,2.634,2.634a.691.691,0,0,1-.015,1.119l-.008.008c-.175.19-.365.373-.571.571C26.753,25.958,26.433,26.27,26.128,26.628Z" transform="translate(0 0)"/></g></svg> SUPORTE </a> </li> <li class="action-item cart carrinho"> <a href="/carrinho/index"> <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.368 37"><g transform="translate(0 0)"><path class="a" d="M222.512,131.134a.919.919,0,0,0,.649.267.932.932,0,0,0,.649-.267l5.638-5.638a.917.917,0,0,0-1.3-1.3l-4.99,5-2.014-2.014a.917.917,0,0,0-1.3,1.3Z" transform="translate(-204.143 -114.475)"/><path class="a" d="M27,24.289H47.513a4.111,4.111,0,0,0,4.1-4.1V11.54a.916.916,0,0,0-1.831,0v8.637a2.274,2.274,0,0,1-2.274,2.274H27a2.274,2.274,0,0,1-2.274-2.274V3.3a.435.435,0,0,0-.008-.1V3.178c0-.023-.008-.046-.008-.061a.141.141,0,0,0-.015-.053c0-.008-.008-.023-.008-.031-.008-.023-.015-.038-.023-.061,0-.008-.008-.015-.008-.023s-.015-.038-.023-.053-.008-.023-.015-.031l-.023-.046c-.008-.015-.015-.023-.023-.038s-.015-.023-.023-.031a.166.166,0,0,0-.031-.038l-.023-.023c-.015-.015-.023-.031-.038-.046s-.015-.015-.023-.015a.2.2,0,0,0-.046-.038l-.023-.023c-.015-.008-.031-.023-.046-.031s-.038-.023-.053-.038a.016.016,0,0,1-.015-.015l-.092-.046L18.521.073a.915.915,0,0,0-.71,1.686L22.885,3.9V26.609A4.105,4.105,0,0,0,26.646,30.7a4.056,4.056,0,1,0,6.775.015h9.712a4.06,4.06,0,1,0,3.4-1.831H27a2.274,2.274,0,0,1-2.274-2.274V23.6A4.081,4.081,0,0,0,27,24.289Zm5.257,8.652a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,32.254,32.941Zm16.5,0a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,48.749,32.941Z" transform="translate(-17.25 0)"/></g></svg> CARRINHO </a> </li></ul>'),
      $(".logo-centro").length
        ? $("#cabecalho .inferior .span12").last().append(i)
        : $("#cabecalho .inferior .span4").append(i),
      $("#cabecalho .cart").append(
        $("#cabecalho .carrinho .carrinho-interno-ajax")
      ),
      $("#cabecalho .cart > a").append($("#cabecalho .carrinho .qtd-carrinho")),
      $("#cabecalho .carrinho:not(.cart)").remove(),
      $(".qtd-carrinho").text() > 0
        ? $(".cart").removeClass("vazio")
        : $(".cart").addClass("vazio"),
      $(".mini-banner").removeClass("hidden-phone"),
      $(".flex-prev").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.446 20.079"><g transform="translate(108.584 20.079) rotate(180)"><path d="M108.173,11.033l-8.634,8.633a1.406,1.406,0,0,1-1.989-1.988l7.639-7.639L97.55,2.4A1.406,1.406,0,1,1,99.539.412l8.634,8.634a1.406,1.406,0,0,1,0,1.988Z" transform="translate(0 0)"/></g></svg>'
        )
      ),
      $(".flex-next").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.446 20.079"><g transform="translate(-97.138 0)"><path d="M108.173,11.033l-8.634,8.633a1.406,1.406,0,0,1-1.989-1.988l7.639-7.639L97.55,2.4A1.406,1.406,0,1,1,99.539.412l8.634,8.634a1.406,1.406,0,0,1,0,1.988Z" transform="translate(0 0)"/></g></svg>'
        )
      ),
      $(".marcas").prepend($("<strong>Escolha pela marca</strong>")),
      $(".marcas").appendTo("#corpo .conteiner"),
      $(".pagina-produto .comprar .icon-shopping-cart").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.583 25.536"><path id="cadeado" class="cls-1" d="M323.3,217.862h-2.052V214.6a7.346,7.346,0,1,0-14.692,0v3.265H304.5a1.4,1.4,0,0,0-1.4,1.4v12.127a1.4,1.4,0,0,0,1.4,1.4h18.785a1.4,1.4,0,0,0,1.4-1.4V219.261A1.379,1.379,0,0,0,323.3,217.862Zm-13.946-3.277a4.547,4.547,0,0,1,9.095,0v3.265H309.35ZM321.9,229.977h-16v-9.328h15.986v9.328Z" transform="translate(-303.1 -207.251)"/></svg>'
        )
      ),
      setTimeout(function () {
        $("#carouselImagem .elastislide-carousel ul li a span")
          .find("img")
          .each(function () {
            var t = $(this)
              .attr("src")
              .replace(/\/64x50/, "");
            $(this).attr("src", t);
          });
      }, 500),
      $("#barraNewsletter.posicao-rodape").removeClass("hidden-phone"),
      $(".sobre-loja-rodape").prepend($("#cabecalho .logo").clone()),
      $(".sobre-loja-rodape").append(
        $("<a href='/pagina/sobre-nos.html' class='more'>Conferir</a>")
      ),
      $("#rodape .institucional .conteiner .span9 .row-fluid").prepend(
        $(".sobre-loja-rodape")
      );
    var o = $("#rodape .visible-phone ul").html();
    if (
      ($("#rodape .span9 .row-fluid .links-rodape-paginas").after(
        '<div class="span4 links-rodape links-rodape-atendimento"><span class="titulo">ATENDIMENTO</span><ul class="contact">' +
          o +
          "</ul></div>"
      ),
      $("#rodape .institucional .titulo").click(function () {
        $(this).siblings("ul, .office-hours").toggleClass("active");
      }),
      $.ajax({
        url: "../",
        type: "GET",
        success: function (t) {
          var e = $(t).find("#rodape .visible-phone ul").html();
          $(
            "body.pagina-carrinho #cabecalho .support .support-items .contact"
          ).empty(),
            $(
              "body.pagina-carrinho #cabecalho .support .support-items .contact"
            ).append(e);
        },
      }),
      "undefined" != typeof $horario)
    ) {
      var a =
        '<div class="office-hours"><p class="title"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.143 16.143"><g transform="translate(-1143.5 -1316.804)"><g class="a" transform="translate(1143.5 1316.804)"><path class="b" d="M 8.071533203125 15.64306354522705 C 3.896573305130005 15.64306354522705 0.5000032186508179 12.24649333953857 0.5000032186508179 8.071533203125 C 0.5000032186508179 3.896573305130005 3.896573305130005 0.5000032186508179 8.071533203125 0.5000032186508179 C 12.24649333953857 0.5000032186508179 15.64306354522705 3.896573305130005 15.64306354522705 8.071533203125 C 15.64306354522705 12.24649333953857 12.24649333953857 15.64306354522705 8.071533203125 15.64306354522705 Z"/><path class="c" d="M 8.071533203125 1.000002861022949 C 4.172283172607422 1.000002861022949 1.000002861022949 4.172283172607422 1.000002861022949 8.071533203125 C 1.000002861022949 11.97078323364258 4.172283172607422 15.14306354522705 8.071533203125 15.14306354522705 C 11.97078323364258 15.14306354522705 15.14306354522705 11.97078323364258 15.14306354522705 8.071533203125 C 15.14306354522705 4.172283172607422 11.97078323364258 1.000002861022949 8.071533203125 1.000002861022949 M 8.071533203125 3.814697265625e-06 C 12.52931308746338 3.814697265625e-06 16.14306259155273 3.613753318786621 16.14306259155273 8.071533203125 C 16.14306259155273 12.52931308746338 12.52931308746338 16.14306259155273 8.071533203125 16.14306259155273 C 3.613753318786621 16.14306259155273 3.814697265625e-06 12.52931308746338 3.814697265625e-06 8.071533203125 C 3.814697265625e-06 3.613753318786621 3.613753318786621 3.814697265625e-06 8.071533203125 3.814697265625e-06 Z"/></g><rect width="0.897" height="4.933" rx="0.448" transform="translate(1151.123 1320.391)"/><rect width="0.897" height="4.933" rx="0.448" transform="translate(1156.28 1324.651) rotate(90)"/></g></svg> HorÃƒÂ¡rio de atendimento:</p><p>' +
        $horario +
        "</p></div>";
      $("#rodape .links-rodape-atendimento").append(a);
    }
    $(".listagem .acoes-produto .botao-comprar i").replaceWith(
      '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.368 37"><g transform="translate(0 0)"><path class="a" d="M222.512,131.134a.919.919,0,0,0,.649.267.932.932,0,0,0,.649-.267l5.638-5.638a.917.917,0,0,0-1.3-1.3l-4.99,5-2.014-2.014a.917.917,0,0,0-1.3,1.3Z" transform="translate(-204.143 -114.475)"/><path class="a" d="M27,24.289H47.513a4.111,4.111,0,0,0,4.1-4.1V11.54a.916.916,0,0,0-1.831,0v8.637a2.274,2.274,0,0,1-2.274,2.274H27a2.274,2.274,0,0,1-2.274-2.274V3.3a.435.435,0,0,0-.008-.1V3.178c0-.023-.008-.046-.008-.061a.141.141,0,0,0-.015-.053c0-.008-.008-.023-.008-.031-.008-.023-.015-.038-.023-.061,0-.008-.008-.015-.008-.023s-.015-.038-.023-.053-.008-.023-.015-.031l-.023-.046c-.008-.015-.015-.023-.023-.038s-.015-.023-.023-.031a.166.166,0,0,0-.031-.038l-.023-.023c-.015-.015-.023-.031-.038-.046s-.015-.015-.023-.015a.2.2,0,0,0-.046-.038l-.023-.023c-.015-.008-.031-.023-.046-.031s-.038-.023-.053-.038a.016.016,0,0,1-.015-.015l-.092-.046L18.521.073a.915.915,0,0,0-.71,1.686L22.885,3.9V26.609A4.105,4.105,0,0,0,26.646,30.7a4.056,4.056,0,1,0,6.775.015h9.712a4.06,4.06,0,1,0,3.4-1.831H27a2.274,2.274,0,0,1-2.274-2.274V23.6A4.081,4.081,0,0,0,27,24.289Zm5.257,8.652a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,32.254,32.941Zm16.5,0a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,48.749,32.941Z" transform="translate(-17.25 0)"/></g></svg>'
    ),
      $("#rodape .contact .fa-whatsapp").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.371 16.372"><path d="M3.96,15.2a8.126,8.126,0,0,0,4.2,1.162,8.228,8.228,0,0,0,8.215-8.183,8.183,8.183,0,1,0-15.2,4.229L0,16.371ZM.965,8.183a7.189,7.189,0,1,1,3.323,6.1L4.1,14.161l-2.686.792.792-2.686-.118-.184A7.223,7.223,0,0,1,.965,8.183Zm0,0"/><path d="M121.239,96.377a7.229,7.229,0,0,0,5.8,5.8c.953.181,2.35.209,3.033-.474l.381-.381a1.018,1.018,0,0,0,0-1.44l-1.523-1.523a1.018,1.018,0,0,0-1.44,0l-.381.381a.677.677,0,0,1-.906,0l-1.519-1.583-.007-.007a.6.6,0,0,1,0-.845l.381-.381a1.017,1.017,0,0,0,0-1.44l-1.523-1.523a1.019,1.019,0,0,0-1.44,0l-.381.381h0A3.55,3.55,0,0,0,121.239,96.377Zm1.152-2.355c.4-.391.378-.4.422-.4a.059.059,0,0,1,.042.017c1.6,1.613,1.54,1.519,1.54,1.565a.058.058,0,0,1-.017.042l-.381.381a1.556,1.556,0,0,0,0,2.2l1.52,1.584.007.007a1.636,1.636,0,0,0,2.265,0l.381-.381a.059.059,0,0,1,.083,0c1.6,1.613,1.54,1.518,1.54,1.565a.057.057,0,0,1-.017.042l-.381.381a2.837,2.837,0,0,1-2.176.211,6.27,6.27,0,0,1-5.035-5.035A2.836,2.836,0,0,1,122.392,94.022Zm0,0" transform="translate(-117.254 -89.702)"/></svg>'
      ),
      $("#rodape .contact .fa-envelope").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.227 11.039"><g transform="translate(0 -38.529)"><path d="M41.35,68.654,36.1,73.285l-5.256-4.63a.5.5,0,1,0-.667.758l5.59,4.925a.5.5,0,0,0,.668,0l5.588-4.925a.5.5,0,1,0-.668-.757Z" transform="translate(-27.981 -27.98)"/><path d="M14.712,38.529H1.515A1.516,1.516,0,0,0,0,40.044v8.01a1.516,1.516,0,0,0,1.515,1.515h13.2a1.516,1.516,0,0,0,1.515-1.515v-8.01A1.516,1.516,0,0,0,14.712,38.529Zm.5,9.525a.505.505,0,0,1-.5.5H1.515a.505.505,0,0,1-.5-.5v-8.01a.505.505,0,0,1,.5-.5h13.2a.505.505,0,0,1,.5.5Z" transform="translate(0 0)"/></g></svg>'
      ),
      $("#rodape .contact .icon-phone").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.258 16.725"><g transform="translate(-2.95)"><path d="M112.4,2.191A7.431,7.431,0,0,0,107.11,0a.593.593,0,1,0,0,1.185,6.295,6.295,0,0,1,6.3,6.3.593.593,0,0,0,1.185,0A7.431,7.431,0,0,0,112.4,2.191Z" transform="translate(-95.383)"/><path d="M109.961,47.615a.593.593,0,0,0,1.185,0,4.042,4.042,0,0,0-4.037-4.037h0a.593.593,0,0,0,0,1.185A2.855,2.855,0,0,1,109.961,47.615Z" transform="translate(-95.383 -40.134)"/><path d="M13.267,39.823a1.789,1.789,0,0,0-1.584.948.593.593,0,1,0,.978.669c.261-.381.379-.441.539-.434a7.635,7.635,0,0,1,2.736,2,.613.613,0,0,1-.006.433,2.046,2.046,0,0,1-1.016,1.279,1.9,1.9,0,0,1-1.523-.051,16.752,16.752,0,0,1-5.5-3.578l0,0A16.749,16.749,0,0,1,4.323,35.6a1.9,1.9,0,0,1-.052-1.524A2.045,2.045,0,0,1,5.55,33.064a.612.612,0,0,1,.432-.006,7.649,7.649,0,0,1,2,2.731c.009.166-.052.284-.433.545a.593.593,0,0,0,.669.979,1.788,1.788,0,0,0,.948-1.586A7.256,7.256,0,0,0,6.4,31.947a1.792,1.792,0,0,0-1.224-.007,3.19,3.19,0,0,0-1.979,1.645,3.051,3.051,0,0,0,.031,2.465,17.928,17.928,0,0,0,3.832,5.881l.012.012a17.933,17.933,0,0,0,5.874,3.826,3.517,3.517,0,0,0,1.323.276,2.717,2.717,0,0,0,1.141-.245,3.19,3.19,0,0,0,1.645-1.979,1.793,1.793,0,0,0-.006-1.221A7.254,7.254,0,0,0,13.267,39.823Z" transform="translate(0 -29.32)"/></g></svg>'
      ),
      $("#rodape .contact .fa-skype").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.487 16.695"><g transform="translate(-1.33)"><path d="M10.788,15.06A6.736,6.736,0,0,1,3.037,7.176a.587.587,0,0,0-.063-.392,3.784,3.784,0,0,1,3.315-5.61A.587.587,0,0,0,6.289,0,4.958,4.958,0,0,0,1.848,7.163a7.909,7.909,0,0,0,9.138,9.055.587.587,0,0,0-.2-1.158Z" transform="translate(0)"/><path d="M95.121,15.959a8,8,0,0,0,.123-1.4,7.914,7.914,0,0,0-7.9-7.9,8,8,0,0,0-1.228.095.587.587,0,1,0,.181,1.16,6.819,6.819,0,0,1,1.047-.081,6.738,6.738,0,0,1,6.73,6.731,6.833,6.833,0,0,1-.135,1.35.587.587,0,0,0,.043.364,3.75,3.75,0,0,1,.353,1.6,3.789,3.789,0,0,1-3.785,3.784.587.587,0,0,0,0,1.174,4.964,4.964,0,0,0,4.959-4.958A4.914,4.914,0,0,0,95.121,15.959Z" transform="translate(-77.688 -6.137)"/><path d="M74.829,65.947a1.8,1.8,0,0,0-.2-.891,1.727,1.727,0,0,0-.569-.6,3.709,3.709,0,0,0-.885-.4c-.341-.11-.733-.212-1.162-.3-.34-.079-.589-.139-.737-.181a2.4,2.4,0,0,1-.441-.171,1.044,1.044,0,0,1-.343-.262.552.552,0,0,1-.124-.362.683.683,0,0,1,.366-.578,1.739,1.739,0,0,1,.963-.24,1.547,1.547,0,0,1,.935.221,1.831,1.831,0,0,1,.5.616,1.613,1.613,0,0,0,.3.4.614.614,0,0,0,.4.121.674.674,0,0,0,.676-.654,1.191,1.191,0,0,0-.156-.564,1.812,1.812,0,0,0-.492-.552A2.66,2.66,0,0,0,73,61.116a4.146,4.146,0,0,0-1.21-.158,4.4,4.4,0,0,0-1.524.24,2.153,2.153,0,0,0-.99.685,1.64,1.64,0,0,0-.342,1.02,1.572,1.572,0,0,0,.324,1.008,2.2,2.2,0,0,0,.877.64,7.673,7.673,0,0,0,1.372.411c.4.084.732.166.979.242a1.527,1.527,0,0,1,.6.33.741.741,0,0,1,.231.564.857.857,0,0,1-.429.731,1.95,1.95,0,0,1-1.114.292,1.9,1.9,0,0,1-.8-.145,1.26,1.26,0,0,1-.475-.369,2.766,2.766,0,0,1-.314-.556,1.119,1.119,0,0,0-.287-.422.619.619,0,0,0-.412-.143.685.685,0,0,0-.494.183.582.582,0,0,0-.194.438,1.607,1.607,0,0,0,.323.908,2.4,2.4,0,0,0,.843.747,3.954,3.954,0,0,0,1.855.387,4.236,4.236,0,0,0,1.622-.284,2.332,2.332,0,0,0,1.039-.787A1.924,1.924,0,0,0,74.829,65.947Z" transform="translate(-62.182 -56.186)"/></g></svg>'
      ),
      $(".carrinho-checkout .atendimento .icon-comment").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37"><g transform="translate(-0.478 3.685)"><g class="a" transform="translate(0.478 -3.685)"><path class="c" d="M18.5,0A18.6,18.6,0,0,1,34.819,9.779,18.162,18.162,0,0,1,37,18.5,18.5,18.5,0,1,1,18.5,0Z"/><path class="d" d="M 18.5 2 C 14.09268951416016 2 9.949180603027344 3.716300964355469 6.832740783691406 6.832740783691406 C 3.716300964355469 9.949180603027344 2 14.09268951416016 2 18.5 C 2 22.90731048583984 3.716300964355469 27.05081939697266 6.832740783691406 30.16725921630859 C 9.949180603027344 33.28369903564453 14.09268951416016 35 18.5 35 C 22.90731048583984 35 27.05081939697266 33.28369903564453 30.16725921630859 30.16725921630859 C 33.28369903564453 27.05081939697266 35 22.90731048583984 35 18.5 C 35 15.74249076843262 34.31491851806641 12.99007034301758 33.07001113891602 10.74802017211914 C 31.60560989379883 8.10453987121582 29.50716972351074 5.900890350341797 27.00154113769531 4.375289916992188 C 24.44939994812012 2.821361541748047 21.50960922241211 2 18.5 2 M 18.5 0 C 25.46812057495117 0 31.53646087646484 3.852439880371094 34.81949996948242 9.778860092163086 C 36.16239166259766 12.19734954833984 37 15.2508602142334 37 18.5 C 37 28.71726989746094 28.71726989746094 37 18.5 37 C 8.282730102539063 37 0 28.71726989746094 0 18.5 C 0 8.282730102539063 8.282730102539063 0 18.5 0 Z"/></g><g transform="translate(6.478 -32.214)"><path class="b" d="M47.608,68.724l-8.152,7.184L31.3,68.724A.783.783,0,1,0,30.266,69.9l8.672,7.64a.783.783,0,0,0,1.036,0l8.67-7.64a.783.783,0,1,0-1.036-1.175Z" transform="translate(-26.868 -26.866)"/><path class="b" d="M22.824,38.529H2.35A2.352,2.352,0,0,0,0,40.879V53.306a2.352,2.352,0,0,0,2.35,2.35H22.824a2.352,2.352,0,0,0,2.35-2.35V40.879A2.352,2.352,0,0,0,22.824,38.529Zm.783,14.777a.784.784,0,0,1-.783.783H2.35a.784.784,0,0,1-.783-.783V40.879A.784.784,0,0,1,2.35,40.1H22.824a.784.784,0,0,1,.783.783Z" transform="translate(0 0)"/></g></g></svg>'
      ),
      $(".carrinho-checkout .atendimento .icon-phone").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.008 37"><g transform="translate(0 -0.05)"><path class="a" d="M31.579,5.471A18.5,18.5,0,1,0,5.421,31.629,18.377,18.377,0,0,0,18.5,37.05a17.673,17.673,0,0,0,7.567-1.53A7.954,7.954,0,0,0,30.1,31.69a4.616,4.616,0,0,0-1.165-5.207l-.053-.053a.718.718,0,0,1,.076-.076,2.493,2.493,0,0,0-.015-3.67L26.311,20.05a2.5,2.5,0,0,0-1.8-.822,2.571,2.571,0,0,0-1.827.815l-1.37,1.37c-.069-.038-.129-.069-.2-.1a4.788,4.788,0,0,1-.449-.244,16.164,16.164,0,0,1-3.867-3.525,9.676,9.676,0,0,1-1.172-1.8c.343-.32.662-.647.974-.967.129-.137.266-.266.4-.4a2.442,2.442,0,0,0,0-3.685l-1.3-1.3c-.152-.152-.3-.3-.442-.449-.289-.3-.586-.6-.906-.9a2.523,2.523,0,0,0-1.789-.777,2.6,2.6,0,0,0-1.812.777l-.015.015L9.1,9.688a3.739,3.739,0,0,0-1.112,2.391,8.667,8.667,0,0,0,.632,3.662,20.927,20.927,0,0,0,3.7,6.182A22.761,22.761,0,0,0,19.9,27.861a11.992,11.992,0,0,0,4.309,1.271c.107.008.213.008.32.008a3.859,3.859,0,0,0,2.954-1.271l.03-.03a.913.913,0,0,1,.084-.091l.046.046a2.8,2.8,0,0,1,.769,3.22c-.876,2.078-4.279,4.21-9.912,4.21A16.663,16.663,0,1,1,34.571,23a.916.916,0,1,0,1.766.487A18.478,18.478,0,0,0,31.579,5.471ZM26.128,26.628a2.014,2.014,0,0,1-1.6.67,1.855,1.855,0,0,1-.206-.008,10.183,10.183,0,0,1-3.631-1.1,20.938,20.938,0,0,1-6.966-5.459,19.22,19.22,0,0,1-3.4-5.641,6.77,6.77,0,0,1-.525-2.878,1.908,1.908,0,0,1,.586-1.249l1.637-1.629a.854.854,0,0,1,.541-.266.738.738,0,0,1,.51.259l.023.023c.289.266.563.548.853.845.152.152.3.312.457.464l1.3,1.3a.655.655,0,0,1,0,1.1l-.411.411c-.4.4-.777.792-1.188,1.157-.015.008-.023.023-.038.038a1.248,1.248,0,0,0-.312,1.363c.008.023.015.038.023.061a10.7,10.7,0,0,0,1.584,2.581l.008.008a17.816,17.816,0,0,0,4.309,3.921c.206.129.411.236.609.335a4.788,4.788,0,0,1,.449.244.83.83,0,0,0,.084.046,1.312,1.312,0,0,0,.594.145,1.254,1.254,0,0,0,.914-.411l1.637-1.637a.817.817,0,0,1,.533-.282.744.744,0,0,1,.495.266l.015.015,2.634,2.634a.691.691,0,0,1-.015,1.119l-.008.008c-.175.19-.365.373-.571.571C26.753,25.958,26.433,26.27,26.128,26.628Z" transform="translate(0 0)"/></g></svg>'
      ),
      $(".carrinho-checkout .atendimento .fa-whatsapp").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.527 32.527"><path class="a" d="M7.867,30.206a16.145,16.145,0,0,0,8.339,2.309A16.347,16.347,0,0,0,32.527,16.258a16.258,16.258,0,1,0-30.206,8.4L0,32.527ZM1.917,16.258a14.284,14.284,0,1,1,6.6,12.112l-.366-.234L2.818,29.71l1.574-5.336-.234-.366A14.35,14.35,0,0,1,1.917,16.258Zm0,0"/><path class="a" d="M121.35,100.04a14.363,14.363,0,0,0,11.519,11.519c1.892.36,4.67.415,6.027-.943l.757-.757a2.022,2.022,0,0,0,0-2.86l-3.026-3.026a2.023,2.023,0,0,0-2.86,0l-.756.756a1.346,1.346,0,0,1-1.8.006l-3.018-3.145-.014-.014a1.189,1.189,0,0,1,0-1.679l.756-.756a2.021,2.021,0,0,0,0-2.86l-3.026-3.026a2.025,2.025,0,0,0-2.86,0l-.756.757h0C121.209,95.1,120.848,97.406,121.35,100.04Zm2.29-4.68c.794-.776.752-.791.839-.791a.117.117,0,0,1,.083.034c3.188,3.206,3.06,3.017,3.06,3.109a.115.115,0,0,1-.034.083l-.757.756a3.091,3.091,0,0,0-.008,4.365l3.02,3.147.014.014a3.25,3.25,0,0,0,4.5,0l.756-.756a.117.117,0,0,1,.166,0c3.188,3.205,3.06,3.017,3.06,3.109a.114.114,0,0,1-.034.083l-.757.756c-.518.518-2.17.829-4.324.418a12.458,12.458,0,0,1-10-10C122.811,97.53,123.121,95.878,123.64,95.36Zm0,0" transform="translate(-113.432 -86.778)"/></svg>'
      ),
      $(".carrinho-checkout .atendimento .fa-skype").replaceWith(
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.487 16.695"><g transform="translate(-1.33)"><path d="M10.788,15.06A6.736,6.736,0,0,1,3.037,7.176a.587.587,0,0,0-.063-.392,3.784,3.784,0,0,1,3.315-5.61A.587.587,0,0,0,6.289,0,4.958,4.958,0,0,0,1.848,7.163a7.909,7.909,0,0,0,9.138,9.055.587.587,0,0,0-.2-1.158Z" transform="translate(0)"/><path d="M95.121,15.959a8,8,0,0,0,.123-1.4,7.914,7.914,0,0,0-7.9-7.9,8,8,0,0,0-1.228.095.587.587,0,1,0,.181,1.16,6.819,6.819,0,0,1,1.047-.081,6.738,6.738,0,0,1,6.73,6.731,6.833,6.833,0,0,1-.135,1.35.587.587,0,0,0,.043.364,3.75,3.75,0,0,1,.353,1.6,3.789,3.789,0,0,1-3.785,3.784.587.587,0,0,0,0,1.174,4.964,4.964,0,0,0,4.959-4.958A4.914,4.914,0,0,0,95.121,15.959Z" transform="translate(-77.688 -6.137)"/><path d="M74.829,65.947a1.8,1.8,0,0,0-.2-.891,1.727,1.727,0,0,0-.569-.6,3.709,3.709,0,0,0-.885-.4c-.341-.11-.733-.212-1.162-.3-.34-.079-.589-.139-.737-.181a2.4,2.4,0,0,1-.441-.171,1.044,1.044,0,0,1-.343-.262.552.552,0,0,1-.124-.362.683.683,0,0,1,.366-.578,1.739,1.739,0,0,1,.963-.24,1.547,1.547,0,0,1,.935.221,1.831,1.831,0,0,1,.5.616,1.613,1.613,0,0,0,.3.4.614.614,0,0,0,.4.121.674.674,0,0,0,.676-.654,1.191,1.191,0,0,0-.156-.564,1.812,1.812,0,0,0-.492-.552A2.66,2.66,0,0,0,73,61.116a4.146,4.146,0,0,0-1.21-.158,4.4,4.4,0,0,0-1.524.24,2.153,2.153,0,0,0-.99.685,1.64,1.64,0,0,0-.342,1.02,1.572,1.572,0,0,0,.324,1.008,2.2,2.2,0,0,0,.877.64,7.673,7.673,0,0,0,1.372.411c.4.084.732.166.979.242a1.527,1.527,0,0,1,.6.33.741.741,0,0,1,.231.564.857.857,0,0,1-.429.731,1.95,1.95,0,0,1-1.114.292,1.9,1.9,0,0,1-.8-.145,1.26,1.26,0,0,1-.475-.369,2.766,2.766,0,0,1-.314-.556,1.119,1.119,0,0,0-.287-.422.619.619,0,0,0-.412-.143.685.685,0,0,0-.494.183.582.582,0,0,0-.194.438,1.607,1.607,0,0,0,.323.908,2.4,2.4,0,0,0,.843.747,3.954,3.954,0,0,0,1.855.387,4.236,4.236,0,0,0,1.622-.284,2.332,2.332,0,0,0,1.039-.787A1.924,1.924,0,0,0,74.829,65.947Z" transform="translate(-62.182 -56.186)"/></g></svg>'
      ),
      $("#cabecalho .atalhos-mobile .icon-home").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.36 30"><g transform="translate(0 -31.05)"><g transform="translate(0 31.05)"><path class="a" d="M255.186,263.75h-4.669a2.319,2.319,0,0,0-2.317,2.317v3.581a2.319,2.319,0,0,0,2.317,2.317h4.669a2.319,2.319,0,0,0,2.317-2.317v-3.581A2.319,2.319,0,0,0,255.186,263.75Zm.632,5.9a.634.634,0,0,1-.632.632h-4.669a.634.634,0,0,1-.632-.632v-3.581a.634.634,0,0,1,.632-.632h4.669a.634.634,0,0,1,.632.632Z" transform="translate(-230.774 -247.413)"/><path class="a" d="M34.36,40.879a.782.782,0,0,0-.112-.414l-5.111-8.987a.847.847,0,0,0-.73-.428H5.947a.833.833,0,0,0-.73.428l-5.1,8.987A.852.852,0,0,0,0,40.879a4.928,4.928,0,0,0,2.949,4.507V60.208a.845.845,0,0,0,.842.842h26.77a.845.845,0,0,0,.843-.842V45.492A.371.371,0,0,0,31.4,45.4,4.942,4.942,0,0,0,34.36,40.879ZM6.438,32.742H27.915L31.91,39.77H2.45Zm18.015,8.706a3.238,3.238,0,0,1-6.375,0Zm-8.165,0a3.242,3.242,0,0,1-6.382,0Zm-14.547,0H8.123a3.242,3.242,0,0,1-6.382,0ZM14.154,59.365H9.31V50.273a1.2,1.2,0,0,1,1.2-1.2h2.45a1.2,1.2,0,0,1,1.2,1.2v9.092Zm15.565,0H15.839V50.273a2.89,2.89,0,0,0-2.886-2.886H10.5a2.89,2.89,0,0,0-2.886,2.886v9.1H4.634V45.8c.1.007.2.007.295.007a4.922,4.922,0,0,0,4.086-2.176,4.924,4.924,0,0,0,8.172,0,4.911,4.911,0,0,0,8.158,0,4.922,4.922,0,0,0,4.086,2.176c.1,0,.19-.007.288-.007V59.365Zm-.288-15.242a3.236,3.236,0,0,1-3.187-2.668h6.382A3.256,3.256,0,0,1,29.431,44.123Z" transform="translate(0 -31.05)"/></g></g></svg>'
        )
      ),
      $("#cabecalho .atalhos-mobile .icon-user").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37"><g transform="translate(-0.478 3.685)"><g class="a" transform="translate(0.478 -3.685)"><path class="c" d="M18.5,0A18.6,18.6,0,0,1,34.819,9.779,18.162,18.162,0,0,1,37,18.5,18.5,18.5,0,1,1,18.5,0Z"/><path class="d" d="M 18.5 2 C 14.09268951416016 2 9.949180603027344 3.716300964355469 6.832740783691406 6.832740783691406 C 3.716300964355469 9.949180603027344 2 14.09268951416016 2 18.5 C 2 22.90731048583984 3.716300964355469 27.05081939697266 6.832740783691406 30.16725921630859 C 9.949180603027344 33.28369903564453 14.09268951416016 35 18.5 35 C 22.90731048583984 35 27.05081939697266 33.28369903564453 30.16725921630859 30.16725921630859 C 33.28369903564453 27.05081939697266 35 22.90731048583984 35 18.5 C 35 15.74249076843262 34.31491851806641 12.99007034301758 33.07001113891602 10.74802017211914 C 31.60560989379883 8.10453987121582 29.50716972351074 5.900890350341797 27.00154113769531 4.375289916992188 C 24.44939994812012 2.821361541748047 21.50960922241211 2 18.5 2 M 18.5 0 C 25.46812057495117 0 31.53646087646484 3.852439880371094 34.81949996948242 9.778860092163086 C 36.16239166259766 12.19734954833984 37 15.2508602142334 37 18.5 C 37 28.71726989746094 28.71726989746094 37 18.5 37 C 8.282730102539063 37 0 28.71726989746094 0 18.5 C 0 8.282730102539063 8.282730102539063 0 18.5 0 Z"/></g><path class="b" d="M.877,21.449A.964.964,0,0,1,0,20.4a16.026,16.026,0,0,1,1.921-6.771,6.676,6.676,0,0,1,6.034-3.457,6.674,6.674,0,0,1,6.034,3.457A15.876,15.876,0,0,1,15.915,20.4a.96.96,0,0,1-.872,1.041.337.337,0,0,1-.089.008A.964.964,0,0,1,14,20.576c-.52-5.634-2.553-8.492-6.042-8.492s-5.522,2.858-6.042,8.492a.961.961,0,0,1-.953.877C.935,21.453.906,21.452.877,21.449ZM3.55,4.41A4.41,4.41,0,1,1,7.959,8.819,4.413,4.413,0,0,1,3.55,4.41Zm1.92,0A2.489,2.489,0,1,0,7.959,1.921,2.5,2.5,0,0,0,5.47,4.41Z" transform="translate(11.308 4.191)"/></g></svg>'
        )
      ),
      $("#cabecalho .atalhos-mobile .icon-shopping-cart").append(
        $(
          '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.368 37"><g transform="translate(0 0)"><path class="a" d="M222.512,131.134a.919.919,0,0,0,.649.267.932.932,0,0,0,.649-.267l5.638-5.638a.917.917,0,0,0-1.3-1.3l-4.99,5-2.014-2.014a.917.917,0,0,0-1.3,1.3Z" transform="translate(-204.143 -114.475)"/><path class="a" d="M27,24.289H47.513a4.111,4.111,0,0,0,4.1-4.1V11.54a.916.916,0,0,0-1.831,0v8.637a2.274,2.274,0,0,1-2.274,2.274H27a2.274,2.274,0,0,1-2.274-2.274V3.3a.435.435,0,0,0-.008-.1V3.178c0-.023-.008-.046-.008-.061a.141.141,0,0,0-.015-.053c0-.008-.008-.023-.008-.031-.008-.023-.015-.038-.023-.061,0-.008-.008-.015-.008-.023s-.015-.038-.023-.053-.008-.023-.015-.031l-.023-.046c-.008-.015-.015-.023-.023-.038s-.015-.023-.023-.031a.166.166,0,0,0-.031-.038l-.023-.023c-.015-.015-.023-.031-.038-.046s-.015-.015-.023-.015a.2.2,0,0,0-.046-.038l-.023-.023c-.015-.008-.031-.023-.046-.031s-.038-.023-.053-.038a.016.016,0,0,1-.015-.015l-.092-.046L18.521.073a.915.915,0,0,0-.71,1.686L22.885,3.9V26.609A4.105,4.105,0,0,0,26.646,30.7a4.056,4.056,0,1,0,6.775.015h9.712a4.06,4.06,0,1,0,3.4-1.831H27a2.274,2.274,0,0,1-2.274-2.274V23.6A4.081,4.081,0,0,0,27,24.289Zm5.257,8.652a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,32.254,32.941Zm16.5,0a2.228,2.228,0,1,1-2.228-2.228A2.23,2.23,0,0,1,48.749,32.941Z" transform="translate(-17.25 0)"/></g></svg>'
        )
      ),
      $("#cabecalho .atalhos-mobile .icon-signout").append(
        $(
          "<svg class='icon' xmlns='http://www.w3.org/2000/svg' viewBox='-288.562 1106 19.601 16'><path id='Union_80' data-name='Union 80' class='cls-1' d='M362.053-1095.964a3.467,3.467,0,0,1-2.544-1.057,3.467,3.467,0,0,1-1.056-2.543v-8.8a3.468,3.468,0,0,1,1.056-2.543,3.467,3.467,0,0,1,2.544-1.056h4a.384.384,0,0,1,.281.119.384.384,0,0,1,.119.281c0,.033,0,.117.012.25a3.251,3.251,0,0,1,.006.331,2.07,2.07,0,0,1-.038.293.411.411,0,0,1-.125.244.375.375,0,0,1-.256.081h-4a1.926,1.926,0,0,0-1.413.588,1.925,1.925,0,0,0-.588,1.412v8.8a1.925,1.925,0,0,0,.588,1.412,1.924,1.924,0,0,0,1.413.588h3.9l.144.013q.144.012.144.037c0,.016.033.039.1.068s.1.067.087.113a.324.324,0,0,0,.025.169c0,.034,0,.117.012.25a3,3,0,0,1,.006.331,2.152,2.152,0,0,1-.037.294.415.415,0,0,1-.125.244.38.38,0,0,1-.256.081Zm7.838-.637a.768.768,0,0,1-.238-.563v-3.6h-5.6a.769.769,0,0,1-.563-.238.767.767,0,0,1-.238-.562v-4.8a.769.769,0,0,1,.238-.562.77.77,0,0,1,.563-.238h5.6v-3.6a.771.771,0,0,1,.237-.563.771.771,0,0,1,.563-.237.769.769,0,0,1,.562.237l6.8,6.8a.77.77,0,0,1,.238.563.769.769,0,0,1-.238.563l-6.8,6.8a.77.77,0,0,1-.563.238A.768.768,0,0,1,369.891-1096.6Z' transform='translate(-647.015 2217.964)'/></svg>"
        )
      ),
      $("#cabecalho .atalhos-mobile .icon-shopping-cart").append(
        $("#cabecalho .carrinho .qtd-carrinho").clone()
      ),
      t.methods.showcase(),
      t.methods.buyOfShowcase(),
      t.methods.freeShipping(),
      t.methods.account(),
      t.methods.support(),
      t.methods.addWishList(),
      t.methods.cartWithPrice(),
      t.methods.discountOff(),
      t.methods.fullMenu(),
      t.methods.otherCategories(),
      t.methods.menuWithOffers(),
      t.methods.offers(),
      t.methods.counterOffer(),
      t.methods.widthMenu(),
      t.methods.toggleMenu(),
      t.methods.mobileMenu(),
      t.methods.fullbannerMobile(),
      t.methods.fixedHeader(),
      t.methods.fixedSearch(),
      t.methods.sizeTable(),
      t.methods.share(),
      t.methods.tabs(),
      t.methods.tracking(),
      t.methods.video(),
      t.methods.instagram2(),
      t.methods.floatIcons(),
      t.methods.scrollToTop(),
      t.methods.copyright();
  });
