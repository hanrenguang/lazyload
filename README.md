# 图片懒加载

## 使用

对页面中需要懒加载的图片标签添加 `lazyload-img` 类，并添加 `data-src` 属性，值为需要加载的图片地址。

`img` 写法示例：

```HTML
<img class="lazyload-img" data-src="cur-src" src="loading.jpg" alt="xxx">
```

加载 `lazyload.js` 后，在你的代码中加入如下一行代码即可工作：

```javascript
new LazyLoad();
```

## 配置项

可以在实例化的时候传入一些配置项 `options`，可选参数如下（之后还会增加其他配置）：  
- **spaceH**：图片在垂直方向上距离视口小于 `spaceH` 距离时加载图片，默认值为 `0`
- **spaceW**：图片在水平方向上距离视口小于 `spaceW` 距离时加载图片，默认值为 `0`
- **delay**：图片停留在视口 `delay(ms)` 时间后会被加载，默认为 `100`
- **complete**：当所有懒加载图片都加载完成时执行函数，可选

## 示例
例子一：
```javascript
new LazyLoad({
    spaceH: 100,
    spaceW: 100,
    delay: 200,
    complete: function () {
        alert("All imgs were loaded!");
    }
});
```

例子二：  
通过访问 `LazyLoad` 实例属性 `loadFailedImgList` 数组来获取加载失败的图片DOM。
```javascript
var lazyload = new LazyLoad({
    spaceH: 0,
    spaceW: 0,
    delay: 200,
    complete: function () {
        alert("All imgs were loaded!");
        console.log('Load failed imgList:', lazyload.loadFailedImgList);
    }
});
```

## 兼容性

由于使用了 `getBoundingClientRect` API的 `width/height` 等属性，所以并不兼容低版本浏览器。详情请移步 [getBoundingClientRect](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)。

## License

MIT
