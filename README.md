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

## License

MIT