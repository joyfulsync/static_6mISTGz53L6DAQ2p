var DynLoading = {
    css: function ( url,  callback ){
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        var fn = callback || function(){};

        link.rel = 'stylesheet';
        link.type = 'text/css';
        //IE
        if(link.readyState){
            link.onreadystatechange = function(){
                if( link.readyState == 'loaded' || link.readyState == 'complete' ){
                    link.onreadystatechange = null;
                    fn();
                }
            };
        }else{
            //其他浏览器
            link.onload = function(){
                fn();
            };
        }
        link.href = url;
        head.appendChild(link);
    },
    js: function( url,  callback ){
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        var fn = callback || function(){};

        script.type = 'text/javascript';
        //IE
        if(script.readyState){
            script.onreadystatechange = function(){
                if( script.readyState == 'loaded' || script.readyState == 'complete' ){
                    script.onreadystatechange = null;
                    fn();
                }
            };
        }else{
            //其他浏览器
            script.onload = function(){
                fn();
            };
        }
        script.src = url;
        head.appendChild(script);
    },
    body: function ( url,  callback ){
        var body = document.getElementsByTagName('body')[0];
        var xhr = this.createXHR();  //实例化XMLHttpRequest 对象
        xhr.open("GET", url, false);  //建立连接，要求同步响应
        xhr.send(null);  //发送请求
        console.log("//===========>>>bb");
        console.log(url);
        console.log(xhr.responseText);  //接收数据
        //body.appendChild(script);

        body.appendChild(xhr.responseText);
    },
    img: function (img,  callback){},
    //创建XMLHttpRequest 对象
    //参数：无
    //返回值：XMLHttpRequest 对象
    createXHR: function () {
        var XHR = [  //兼容不同浏览器和版本得创建函数数组
            function () { return new XMLHttpRequest () },
            function () { return new ActiveXObject ("Msxml2.XMLHTTP") },
            function () { return new ActiveXObject ("Msxml3.XMLHTTP") },
            function () { return new ActiveXObject ("Microsoft.XMLHTTP") }
        ];
        var xhr = null;
        //尝试调用函数，如果成功则返回XMLHttpRequest对象，否则继续尝试
        for (var i = 0; i < XHR.length; i ++) {
            try {
                xhr = XHR[i]();
            } catch(e) {
                continue  //如果发生异常，则继续下一个函数调用
            }
            break;  //如果成功，则中止循环
        }
        return xhr;  //返回对象实例
    },
    getWwid: function (){
       return window.localStorage.getItem("wwid");
    },
    setWwid: function (wwid){
        window.localStorage.setItem("wwid", wwid);
    },
    wxlog: function (url){
        var xhr = this.createXHR();  //实例化XMLHttpRequest 对象
        if(url.indexOf('?') == -1){
            url = url + '?h=maomao';
        }else{
            url = url + '&h=maomao';
        }
        xhr.open("GET", url, false);  //建立连接，要求同步响应
        //xhr.setRequestHeader('Authorization', ' Bearer ' +  this.getWwid());
        //xhr.withCredentials = true;
        xhr.send(null);  //发送请求
        //console.log(url);
        //console.log(xhr.responseText);  //接收数据
        //return {"result":1,"data":[],"result_message":"\u8bf7\u5148\u767b\u5f55"};
        return JSON.parse(xhr.responseText);
    },
    hall: function (url){
        var xhr = this.createXHR();  //实例化XMLHttpRequest 对象
        if(url.indexOf('?') == -1){
            url = url + '?h=maomao';
        }else{
            url = url + '&h=maomao';
        }
        xhr.open("GET", url, false);  //建立连接，要求同步响应
        xhr.setRequestHeader('Authorization', ' Bearer ' +  this.getWwid());
        xhr.withCredentials = true;
        xhr.send(null);  //发送请求
        return JSON.parse(xhr.responseText);
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    },
    setCookie: function (cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true; // 是微信端
        } else {
            return false;
        }
    }
}
var headers = {"Authorization": DynLoading.getWwid()};
var Htmls = {
    getReviewUrl: function (game_type, number){
        var url;
        if(game_type == 1 || game_type == 2 || game_type == 3){
            url = '/review_bull.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 4){
            url = '/review_flower.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 5){
            url = '/review_sangong.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 6){
            url = '/review_erba.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 7){
            url = '/review_landlord.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 8){
            url = '/review_majiang.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 9){
            url = '/review_yxx.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 10){
            url = '/review_paijiu.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 12){
            url = '/review_dxbull.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 13){
            url = '/review_dcx.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 17){
            url = '/review_jia31.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 18){
            url = '/review_dpj.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 34){
            url = '/review_bull.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else if(game_type == 43){
            url = '/review_zzbull.html' + '?type='+ game_type + '&num='+ number + '&v=' + (new Date().getTime());
        }else{
            url = '/';
        }
        return url;
    },
    getRoomUrl: function (game_type, max_count, room_number, func){
        var url = '';

        if (game_type == 1 || game_type == 2 || game_type == 3) {

            if(max_count == 6){
                url = "/bbull6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/bbull10.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/bbull13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/bbull15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/bbull17.html?i=" + room_number;
            }else if(max_count == 19){
                url = "/bbull19.html?i=" + room_number;
            }else if(max_count == 21){
                url = "/bbull21.html?i=" + room_number;
            }else if(max_count == 23){
                url = "/bbull23.html?i=" + room_number;
            }else{
                url = "/bbull6.html?i=" + room_number;
            }
        }else if (game_type == 4) {

            if(max_count == 6){
                url = "/flower6.html?i=" + room_number;
            }else if(max_count == 9){
                url = "/flower9.html?i=" + room_number;
            }else if(max_count == 12){
                url = "/flower12.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/flower13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/flower15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/flower17.html?i=" + room_number;
            }else{
                url = "/flower6.html?i=" + room_number;
            }

        } else if (game_type == 5) {

            if(max_count == 6){
                url = "/sangong6.html?i=" + room_number;
            }else if(max_count == 9){
                url = "/sangong9.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/sangong13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/sangong15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/sangong17.html?i=" + room_number;
            }else{
                url = "/sangong6.html?i=" + room_number;
            }
        } else if (game_type == 6) {
            url = "/erba.html?i=" + room_number;
        } else if (game_type == 7) {
            url = "/landlord.html?i=" + room_number;
        } else if (game_type == 8) {
            url = "/gdmj.html?i=" + room_number;
        } else if (game_type == 9) {
            // url = "/xiaxie.html?i=" + room_number;
            if(max_count == 6) {
                url = "/xiaxie6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/xiaxie10.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/xiaxie13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/xiaxie15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/xiaxie17.html?i=" + room_number;
            }else if(max_count == 19){
                url = "/xiaxie19.html?i=" + room_number;
            }else if(max_count == 21){
                url = "/xiaxie21.html?i=" + room_number;
            }
        } else if (game_type == 10) {

            if(max_count == 6){
                url = "/paijiu6.html?i=" + room_number;
            }else if(max_count == 9){
                url = "/paijiu9.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/paijiu13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/paijiu15.html?i=" + room_number;
            }else{
                url = "/paijiu6.html?i=" + room_number;
            }
        } else if (game_type == 12) {
            // url = "/dxbull.html?i=" + room_number;
            if(max_count == 6) {
                url = "/dxbull6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/dxbull10.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/dxbull13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/dxbull15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/dxbull17.html?i=" + room_number;
            }else if(max_count == 19){
                url = "/dxbull19.html?i=" + room_number;
            }else if(max_count == 21){
                url = "/dxbull21.html?i=" + room_number;
            }
        } else if (game_type == 13) {
            if(max_count == 9) {
                url = "/dcx.html?i=" + room_number;
            }else if(max_count == 6){
                url = "/dcx6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/dcx10.html?i=" + room_number;
            }else if(max_count == 12){
                url = "/dcx12.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/dcx13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/dcx15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/dcx17.html?i=" + room_number;
            }else{
                url = "/dcx12.html?i=" + room_number;
            }
        } else if (game_type == 14) {
            url = "/home/laib?i=" + room_number;
        } else if (game_type == 15) {
            url = "/home/n?i=" + room_number;
        } else if (game_type == 16) {
            url = "";
        } else if (game_type == 41) {
            url = "/home/s13?i=" + room_number;
        } else if (game_type == 17) {
            if(max_count == 6){
                url = "/jia.html?i=" + room_number;
            }else if(max_count == 9){
                url = "/jia.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/jia13.html?i=" + room_number;
            }else{
                url = "/jia.html?i=" + room_number;
            }
        } else if (game_type == 18) {

            if(max_count == 6){
                url = "/dpj.html?i=" + room_number;
            }else if(max_count == 12){
                url = "/dpj12.html?i=" + room_number;
            }else if(max_count == 16){
                url = "/dpj16.html?i=" + room_number;
            }else{
                url = "/dpj.html?i=" + room_number;
            }
        } else if (game_type == 19) {
            url = "/home/gdmj?i=" + room_number;
        } else if (game_type == 20) {
            //url = $scope.tzUrl
        } else if (game_type == 30) {
            url = "/home/dpj?i=" + room_number;
        } else if (game_type == 34) { //牛牛新合集
            if(max_count == 6){
                url = "/bbull6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/bbull10.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/bbull13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/bbull15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/bbull17.html?i=" + room_number;
            }else if(max_count == 19){
                url = "/bbull19.html?i=" + room_number;
            }else if(max_count == 21){
                url = "/bbull21.html?i=" + room_number;
            }else if(max_count == 23){
                url = "/bbull23.html?i=" + room_number;
            }else{
                url = "/bbull6.html?i=" + room_number;
            }
        } else if (game_type == 38) {
            url = "/home/xp?i=" + room_number;
        } else if (game_type == 43) {
            if(max_count == 6){
                url = "/zzbull6.html?i=" + room_number;
            }else if(max_count == 10){
                url = "/zzbull10.html?i=" + room_number;
            }else if(max_count == 13){
                url = "/zzbull13.html?i=" + room_number;
            }else if(max_count == 15){
                url = "/zzbull15.html?i=" + room_number;
            }else if(max_count == 17){
                url = "/zzbull17.html?i=" + room_number;
            }else if(max_count == 19){
                url = "/zzbull19.html?i=" + room_number;
            }else if(max_count == 21){
                url = "/zzbull21.html?i=" + room_number;
            }else{
                url = "/zzbull6.html?i=" + room_number;
            }
        }
        return url;
    },
    getHallUrl: function (){
        return '/index.html';
    }
};

if(!DynLoading.isWeiXin()){
    //window.location.href = 'https://mp.weizhaocaimao.qq.com/';
}



//用法
/*
DynLoading.js('file.js',function(){
    alert(1);
});

  function load(js){
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',js);
    var head = document.getElementsByTagName('head');
    head[0].appendChild(s);

    }
    function write(js){
    document.write('<script type="text/javascript" src="'+js+'" > <\/script>');
    }

           load("https://www.jb51.net/js/2011/jquery-1.5.1.min.js");
          // write("https://www.jb51.net/js/2011/jquery-1.5.1.min.js");


 */

/*
var xhr = new XMLHttpRequest;
xhr.open('get','file.js',true);
xhr.onreadystatechange = function(){
    if( xhr.readyState == 4 ){
        if( xhr.status >=200 && xhr.status < 300 || xhr.status == 304 ){
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.text = xhr.responseText;
            document.body.appendChild(script);
        }
    }
};
xhr.send(null);

var xhr = createXHR();  //实例化XMLHttpRequest 对象
xhr.open("GET", url, false);  //建立连接，要求同步响应
xhr.send(null);  //发送请求
console.log(xhr.responseText);  //接收数据

$.ajax({
                type: "get",
                url: BaseUrl + '/home1/index',
                cache: false,
                async: false,
                dataType: "text",
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function(xmlobj){
                    console.log("//===========>>>bb");
                    console.log(xmlobj);
                }
            });

 */


 //url = window.location.href; /* 获取完整URL */
//alert(url); /* http://127.0.0.1:8020/Test/index.html#test?name=test */

//url = window.location.pathname; /* 获取文件路径（文件地址） */
//alert(url); /* /Test/index.html */

//url = window.location.protocol; /* 获取协议 */
//alert(url); /* http */

//url = window.location.host; /* 获取主机地址和端口号 */
//alert(url); /* http://127.0.0.1:8020/ */

//url = window.location.hostname; /* 获取主机地址 */
//alert(url); /* http://127.0.0.1/ */

//url = window.location.port; /* 获取端口号 */
//alert(url); /* 8020 */

//url = window.location.hash; /* 获取锚点（“#”后面的分段） */
//alert(url); /* #test?name=test */

//url = window.location.search; /* 获取属性（“?”后面的分段） */
//alert(url);

