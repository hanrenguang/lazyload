;(function (factory) {
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
        /**
         * 添加多个事件监听
         * @param {Array} eventList [需要添加的监听列表]
         * eventList example:
         * [{
         *     elem: "HTMLElement",
         *     type: "eventType",
         *     cb: callback
         * },]
         */
        function addListener(eventList) {
            var len = eventList.length;

            for (var i = 0; i < len; i++) {
                var elem = eventList[i].elem,
                    type = eventList[i].type,
                    cb = eventList[i].cb;

                elem.addEventListener(type, cb, false);
            }
        }

        /**
         * 懒加载构造函数
         * @constructor
         */
        function LazyLoad() {
            this.imgList = [].slice.call(document.querySelectorAll(".lazyload-img"));
            this.init();
        }

        /**
         * 初始化，添加 "scroll" 和 "resize" 事件监听
         */
        LazyLoad.prototype.init = function () {
            var self = this,
                timer = null;

            function callback() {
                timer && clearTimeout(timer);
                timer = setTimeout(function () {
                    var imgInVp = [];
                    var len = self.imgList.length;

                    for (var i = 0; i < len; i++) {
                        if(self.isInViewport(self.imgList[i])) {
                            imgInVp.push(self.imgList[i]);
                        }
                    }

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
                    elem: window,
                    type: "resize",
                    cb: callback
                }
            ]);
        };

        /**
         * 判断图片是否在可视区
         * @param  {HTMLElement} img [需要进行判断的图片元素]
         * @return {Boolean}     [返回是否在可视区]
         */
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

        /**
         * 图片加载实现
         * @param  {Array} inVpImgList [需要加载的图片列表]
         */
        LazyLoad.prototype.loadImg = function (inVpImgList) {
            var len = inVpImgList.length;
            var src = '';

            for (var i = 0; i < len; i++) {
                src = inVpImgList[i].getAttribute("data-src");
                inVpImgList[i].src = src;
                inVpImgList[i].removeAttribute("data-src");
                this.removeItem(inVpImgList[i]);
            }
        };

        /**
         * 从imgList中移除加载过的图片
         * @param  {HTMLElement} img [需要移除的图片]
         */
        LazyLoad.prototype.removeItem = function (img) {
            var idx = this.imgList.indexOf(img);
            if(idx > -1) {
                this.imgList.splice(idx, 1);
            }
        };

        global && (global.LazyLoad = LazyLoad);

        return LazyLoad;
    };
})(this))
