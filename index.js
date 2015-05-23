var request = require('request'),
    $ = require('cheerio'),
    async = require('async'),
    fs = require('fs');

var wzHosts = {
    _option : {
        hostsurl : 'http://www.360kb.com/kb/2_122.html',    // 请求地址
        hostsfile : 'C:/Windows/System32/drivers/etc/hosts',// 本地hosts地址
        localfile : './default.txt' // 默认hosts
    },  

    init : function(option){
        this._option = this.extend(this._option, option);
        this.execute();
    },

    // 执行
    execute : function(){
        var self = this;
        async.waterfall([
            function(callback){
                self.log("正在连接 hosts url....");

                request(self._option.hostsurl, function (error, response, body) {
                    callback(error, body);
                });
            },
            function(body, callback){
                self.log("正在解析数据....");

                var $body = $(body),
                    $v_story = $body.find('.v_story pre'),
                    text = $v_story.text(),
                    qualifier = '=====',    // 限定符
                    index = 0;

                index = text.indexOf(qualifier)+qualifier.length;
                text = "\n\r#googlehosts\n\r" + text.substr(index);
                
                callback(null, text);
            },
            function(text, callback){
                self.log('读取本地文件....');

                fs.open(self._option.localfile, 'a+');
                fs.readFile(self._option.localfile,'utf-8', function(err, data){
                    if(err){
                        self.log('读取文件失败....');
                    }
                    self.log('读取文件完毕....');
                    callback(err, data + text);
                }); 
            },
            function(text, callback){
                self.log('正在写入hosts....');
                fs.writeFile(self._option.hostsfile, text, "utf8", function(err, data){
                    if(err){
                        self.log("写入失败....");
                    }else{
                        self.log("写入成功....");
                    }
                    callback(err);
                });
            },
            function(){
                self.log('运行完毕!');
            }
        ], function(err, data){
            console.log('err: '+err);
            // console.log('data: '+data);
        })
    },

    extend : function(source, dest){
        var _extend = function me(dest, source) {
            for (var name in dest) {
                if (dest.hasOwnProperty(name)) {
                    //当前属性是否为对象,如果为对象，则进行递归
                    if ((dest[name] instanceof Object) && (source[name] instanceof Object)) {
                        me(dest[name], source[name]);
                    }
                    //检测该属性是否存在
                    if (source.hasOwnProperty(name)) {
                        continue;
                    } else {
                        source[name] = dest[name];
                    }
                }
            }
        }
        var _result = {},
            arr = arguments;
        //遍历属性，至后向前
        if (!arr.length) return {};
        for (var i = arr.length - 1; i >= 0; i--) {
            _extend(arr[i], _result);
        }
        arr[0] = _result;
        return _result;
    },

    // 显示进度信息
    log : function(string){
        var date = new Date(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();

        hour = hour<10 ? '0'+hour : hour;
        minute = minute<10 ? '0'+minute : minute;
        second = second<10 ? '0'+second : second;

        console.log('['+hour+':'+minute+':'+second+']: '+string);
    }
}


wzHosts.init();