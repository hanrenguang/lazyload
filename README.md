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

## options

可以在实例化的时候传入一些配置项 `options`，可选参数如下（之后还会增加其他配置）：  
- **delay**：使用函数去抖时的延时，默认为 `100`
- **complete**：当所有懒加载图片都加载完成时执行函数，可选

示例：
```javascript
new LazyLoad({
    delay: 200,
    complete: function () {
        alert("All imgs were loaded! ");
    }
});
```

## License

MIT
