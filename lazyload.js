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
        function LazyLoad() {
            this.init();
        }

        LazyLoad.prototype.init = function () {

        };

        LazyLoad.prototype.loadImg = function (imgList) {

        };

        LazyLoad.prototype.removeDataUrl = function (imgList) {

        };
    };
})(this))
