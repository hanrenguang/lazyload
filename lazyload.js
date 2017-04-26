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
                }, 100);
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
            var clientH = document.documentElement.clientHeight,
                clientW = document.documentElement.clientWidth,
                imgPosOb, imgH, imgL, imgT, imgW;


            if(typeof img.getBoundingClientRect === "function") {
                imgPosOb = img.getBoundingClientRect();
                imgT = imgPosOb.top;
                imgL = imgPosOb.left;
                imgH = imgPosOb.height;
                imgW = imgPosOb.width;

                if((imgT > -imgH && imgT < clientH) && (imgL > -imgW && imgL < clientW)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                throw new Error("您的浏览器版本过低！");
                return;
            }
        };

        LazyLoad.prototype.loadImg = function (imgList) {
            var self = this;

            imgList.forEach(function (img) {
                var src = img.getAttribute("data-src");
                img.src = src;
                img.removeAttribute("data-src");
                self.removeItem(img);
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
