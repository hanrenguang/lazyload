/**
 * Repo: https://github.com/hanrenguang/lazyload
 * Author: Renguang Han
 */

;(function(global, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) { // AMD
        define(factory);
    } else if (typeof module === "object" && typeof module.exports === "object") { // nodeJS commonJS
        module.exports = factory();
    } else { // browser
        global.LazyLoad = factory();
    }
})(this, function() {
    "use strict";
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
     * 监听器
     * @constructor
     */
    function Watcher() {
        this.cbList = [];
    }

    /**
     * 添加触发回调
     * @param {Function} cb [回调函数]
     */
    Watcher.prototype.add = function (cb) {
        this.cbList.push(cb);
    };

    /**
     * 调用回调函数
     */
    Watcher.prototype.excute = function () {
        this.cbList.forEach(function (cb) {
            cb();
        });
        this.cbList = [];
    };

    /**
     * 懒加载构造函数
     * @constructor
     * @param {Object} options [配置项]
     */
    function LazyLoad(options) {
        this.options = options;
        this.imgList = [].slice.call(document.querySelectorAll(".lazyload-img"));
        this.loadFailedImgList = [];
        this.watcher = new Watcher();
        this.init();
    }

    /**
     * 初始化，添加 "scroll" 和 "resize" 事件监听
     */
    LazyLoad.prototype.init = function() {
        var self = this,
            timer = null,
            completeCb = typeof self.options.complete == "function" ? self.options.complete : function () {},
            delay = self.options.delay ? self.options.delay : 100;

        function callback() {
            timer && clearTimeout(timer);
            timer = setTimeout(function() {
                var imgInVp = [];
                var len = self.imgList.length;

                for (var i = 0; i < len; i++) {
                    if (self.isInViewport(self.imgList[i])) {
                        imgInVp.push(self.imgList[i]);
                    }
                }

                self.loadImg(imgInVp);
            }, delay);
        }

        callback();

        addListener([{
            elem: document,
            type: "scroll",
            cb: callback
        }, {
            elem: window,
            type: "resize",
            cb: callback
        }]);

        /**
         * 所有图片都加载完成后移除事件监听并手动清除闭包引用
         */
        function clearReference() {
            document.removeEventListener('scroll', callback);
            window.removeEventListener('resize', callback);
            completeCb();
            self = null;
            return;
        }

        self.watcher.add(clearReference);
    };

    /**
     * 判断图片是否在可视区
     * @param  {HTMLElement} img [需要进行判断的图片元素]
     * @return {Boolean}     [返回是否在可视区]
     */
    LazyLoad.prototype.isInViewport = function(img) {
        var clientH = document.documentElement.clientHeight,
            clientW = document.documentElement.clientWidth,
            spaceH = this.options.spaceH || 0,
            spaceW = this.options.spaceW || 0,
            imgPosOb, imgH, imgL, imgT, imgW;

        if (typeof img.getBoundingClientRect == "function") {
            imgPosOb = img.getBoundingClientRect();
            imgT = imgPosOb.top;
            imgL = imgPosOb.left;
            imgH = imgPosOb.height;
            imgW = imgPosOb.width;

            if ((imgT > -imgH-spaceH && imgT < clientH+spaceH) && 
                (imgL > -imgW-spaceW && imgL < clientW+spaceW)) {
                return true;
            } else {
                return false;
            }
        } else {
            alert("您的浏览器版本过低！");
            return;
        }
    };

    /**
     * 图片加载实现
     * @param  {Array} inVpImgList [需要加载的图片列表]
     */
    LazyLoad.prototype.loadImg = function(inVpImgList) {
        var len = inVpImgList.length;
        var src = '';
        var self = this;

        for (var i = 0; i < len; i++) {
            src = inVpImgList[i].getAttribute("data-src");
            inVpImgList[i].onerror = function err(e) {
                self.loadFailedImgList.push(this);
            };
            inVpImgList[i].src = src;
            inVpImgList[i].removeAttribute("data-src");
            self.removeImgLoaded(inVpImgList[i]);
        }
    };

    /**
     * 从imgList中移除加载过的图片
     * @param  {HTMLElement} img [需要移除的图片]
     */
    LazyLoad.prototype.removeImgLoaded = function(img) {
        var idx = this.imgList.indexOf(img);
        if (idx > -1) {
            this.imgList.splice(idx, 1);
        }

        if (this.imgList.length === 0) {
            this.watcher.excute();
        }
    };

    return LazyLoad;
});
