# node-hosts

现在网上有不少提供google hosts的网址（本文的最后提供了几个google hosts的网站地址），当我们访问不了google时，就需要复制这个网站提供的hosts到我们本地的hosts，在粘贴前还要在C盘一层一层的找到本地hosts，比较麻烦。  

于是就想能不能通过运行一条命令就能把网站里的hosts更新到本地，刚开始想的是用php写的，不过在跟同学聊天的过程中，同学建议使用node来实现这个功能，简单方便，而且我对php的正则表达式也不是很熟，那就用node试试吧。  

进入到项目目录中，运行如下命令即可：

```javascript
node index.js
```

这样，本地里的google hosts就更新到了最新！  

更多的内容可查看我的博客：[http://www.xiabingbao.com/node/2015/03/27/node-hosts/](http://www.xiabingbao.com/node/2015/03/27/node-hosts/)