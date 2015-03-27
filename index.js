var request = require('request'),
    $ = require('cheerio'),
    fs = require('fs');

var wzHosts = {
    hostsurl : 'http://www.360kb.com/kb/2_122.html',    // 请求地址
    hostsfile : 'C:/Windows/System32/drivers/etc/hosts',// 本地hosts地址
    localfile : './default.txt',  // 默认hosts

    // 初始化
    init : function(){
        this.start();
        this.requrl();
    },

    start : function(){
        this.log('正在请求url: '+this.hostsurl);
    },

    end : function(){
        this.log('运行完毕!');
    },

    requrl : function(){
        var self = this;
        request(this.hostsurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                self.log('正在解析.....');
                var text = self.filter(body);
                self.log('正在读取默认hosts...');
                var local = self.read(self.localfile);
                self.log('正在写入....');
                self.write(self.hostsfile, local+text);
                self.log('写入完毕....');
            }else{
                self.log('ERROR:请求url出现错误，请检查');
            }
            self.end();
        });
    },

    // 解析页面中的内容
    filter : function(body){
        var $body = $(body),
            $v_story = $body.find('.v_story'),
            text = $v_story.text(),
            qualifier = '=====',    // 限定符
            index = 0;

        index = text.indexOf(qualifier)+qualifier.length;
        return "\n\r#googlehosts\n\r" + text.substr(index);
    },

    /*
     * 写文件
     * @param   filename    文件路径
     * @param   string      写入内容
     */
    write : function(filename, string){
        return fs.writeFileSync(filename, string, "utf8");
    },

    // 读文件
    read : function(filename){
        return fs.readFileSync(filename,'utf-8'); 
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