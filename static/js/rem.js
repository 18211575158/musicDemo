//获得像素比
var dpr = window.devicePixelRatio;
 //求出缩放比例
var scale = 1/dpr;
/*console.log(scale);*/
//写入meta标签
document.write('<meta name="viewport" content="width=device-width,initial-scale='+scale+',minimum-scale='+scale+',maximum-scale='+scale+',user-scalable=no" />')
var html = document.querySelector("html");
//获取可视宽度
var w = document.documentElement.clientWidth || document.body.clientWidth;
//console.log(w);
//设置根元素字体大小,这里的设计图是640的
html.style.fontSize = w/10 + "px";
