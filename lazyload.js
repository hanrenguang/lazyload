(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) { // AMD
        define(factory);
    } else if (typeof module === "object" && typeof module.exports === "object") { // nodeJS commonJS
        module.exports = factory();
    } else { // browser
        factory();
    }
})((function (global) {
    "use strict";
    return function () {
        function addListener(eventList) {
            eventList.forEach(function (event) {
                var elem = event.elem,
                    type = event.type,
                    cb = event.cb;

                elem.addEventListener(type, cb, false);
            });
        }

        function LazyLoad() {
            this.imgList = [].slice.call(document.querySelectorAll(".lazyload-img"));
            this.init();
        }

        LazyLoad.prototype.init = function () {
            var self = this,
                timer = null;

            function callback() {
                timer && clearTimeout(timer);
                setTimeout(function () {
                    var imgInVp = [];

                    self.imgList.forEach(function (img) {
                        if(self.isInViewport(img)) {
                            imgInVp.push(img);
                        }
                    });

                    self.loadImg(imgInVp);
                }, 50);
            }

            callback();

            addListener([
                {
                    elem: document,
                    type: "scroll",
                    cb: callback
                },
                {
                    elem: document,
                    type: "resize",
                    cb: callback
                }
            ]);
        };

        LazyLoad.prototype.isInViewport = function (img) {
            
        };

        LazyLoad.prototype.loadImg = function (imgList) {
            imgList.forEach(function (img) {
                var src = img.getAttribute("data-src");
                img.src = src;
                img.removeAttribute("data-src");
                this.removeItem(img);
            });
        };

        LazyLoad.prototype.removeItem = function (img) {
            var idx = this.imgList.indexOf(img);
            if(idx > -1) {
                this.imgList.splice(idx, 1);
            }
        };

        global && (global.LazyLoad = LazyLoad);
    };
})(this))
