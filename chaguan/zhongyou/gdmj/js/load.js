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
    getEnterKey: function () {
        return window.localStorage.getItem("enter_key");
    },
    setEnterKey: function (enter_key) {
        window.localStorage.setItem("enter_key", enter_key);
    },
    getEnterMask: function () {
        return window.localStorage.getItem("enter_mask");
    },
    setEnterMask: function (enter_mask) {
        window.localStorage.setItem("enter_mask", enter_mask);
    },
    checkEnterKey: function (enter_key){
        var ek = this.getEnterKey();
        var isMask = this.getEnterMask();

        if(isMask && isMask == 1){
            return true;
        }
        
        if(ek && ek === enter_key){
            return true;
        }
        return false;
    },
    wxlog: function (url){
        var xhr = this.createXHR();  //实例化XMLHttpRequest 对象
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
var ThisUrl = 'http://' + window.location.host;
var Htmls = {
    getHallUrl: function (){
        return 'index.html';
    },
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
        var t = "&t=" + new Date().getTime();

        if (game_type == 1 || game_type == 2 || game_type == 3 || game_type == 34) {

            if(max_count == 6){
                url = "/bbull6.html?i=" + room_number + t;
            }else if(max_count == 10){
                url = "/bbull10.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/bbull13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/bbull15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/bbull17.html?i=" + room_number + t;
            }else if(max_count == 19){
                url = "/bbull19.html?i=" + room_number + t;
            }else if(max_count == 21){
                url = "/bbull21.html?i=" + room_number + t;
            }else{
                url = "/bbull6.html?i=" + room_number + t;
            }
        }else if (game_type == 4) {

            if(max_count == 6){
                url = "/flower6.html?i=" + room_number + t;
            }else if(max_count == 9){
                url = "/flower9.html?i=" + room_number + t;
            }else if(max_count == 12){
                url = "/flower12.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/flower13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/flower15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/flower17.html?i=" + room_number + t;
            }else{
                url = "/flower6.html?i=" + room_number + t;
            }

        } else if (game_type == 5) {

            if(max_count == 6){
                url = "/sangong6.html?i=" + room_number + t;
            }else if(max_count == 9){
                url = "/sangong9.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/sangong13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/sangong15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/sangong17.html?i=" + room_number + t;
            }else{
                url = "/sangong6.html?i=" + room_number + t;
            }
        } else if (game_type == 6) {
            url = "/erba.html?i=" + room_number + t;
        } else if (game_type == 7) {
            url = "/landlord.html?i=" + room_number + t;
        } else if (game_type == 8) {
            url = "/gdmj.html?i=" + room_number + t;
        } else if (game_type == 9) {
            // url = "/xiaxie.html?i=" + room_number;
			if(max_count == 6) {
				url = "/xiaxie6.html?i=" + room_number + t;
			}else if(max_count == 10){
			    url = "/xiaxie10.html?i=" + room_number + t;
			}else if(max_count == 13){
			    url = "/xiaxie13.html?i=" + room_number + t;
			}else if(max_count == 15){
			    url = "/xiaxie15.html?i=" + room_number + t;
			}else if(max_count == 17){
			    url = "/xiaxie17.html?i=" + room_number + t;
			}else if(max_count == 19){
			    url = "/xiaxie19.html?i=" + room_number + t;
			}else if(max_count == 21){
			    url = "/xiaxie21.html?i=" + room_number + t;
			}
        } else if (game_type == 10) {

            if(max_count == 6){
                url = "/paijiu6.html?i=" + room_number + t;
            }else if(max_count == 9){
                url = "/paijiu9.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/paijiu13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/paijiu15.html?i=" + room_number + t;
            }else{
                url = "/paijiu6.html?i=" + room_number + t;
            }
        } else if (game_type == 12) {
            // url = "/dxbull.html?i=" + room_number;
			if(max_count == 6) {
				url = "/dxbull6.html?i=" + room_number + t;
			}else if(max_count == 10){
                url = "/dxbull10.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/dxbull13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/dxbull15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/dxbull17.html?i=" + room_number + t;
            }else if(max_count == 19){
                url = "/dxbull19.html?i=" + room_number + t;
            }else if(max_count == 21){
                url = "/dxbull21.html?i=" + room_number + t;
            }
        } else if (game_type == 13) {
            if(max_count == 9) {
                url = "/dcx.html?i=" + room_number + t;
            }else if(max_count == 6){
                url = "/dcx6.html?i=" + room_number + t;
            }else if(max_count == 10){
                url = "/dcx10.html?i=" + room_number + t;
            }else if(max_count == 12){
                url = "/dcx12.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/dcx13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/dcx15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/dcx17.html?i=" + room_number + t;
            }else{
                url = "/dcx12.html?i=" + room_number + t;
            }
        } else if (game_type == 14) {
            url = "/home/laib?i=" + room_number + t;
        } else if (game_type == 15) {
            url = "/home/n?i=" + room_number + t;
        } else if (game_type == 16) {
            url = "";
        } else if (game_type == 41) {
            url = "/home/s13?i=" + room_number + t;
        } else if (game_type == 17) {
            if(max_count == 6){
                url = "/jia.html?i=" + room_number + t;
            }else if(max_count == 9){
                url = "/jia.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/jia13.html?i=" + room_number + t;
            }else{
                url = "/jia.html?i=" + room_number + t;
            }
        } else if (game_type == 18) {

            if(max_count == 8){
                url = "/dpj.html?i=" + room_number + t;
            }else if(max_count == 12){
                url = "/dpj12.html?i=" + room_number + t;
            }else if(max_count == 16){
                url = "/dpj16.html?i=" + room_number + t;
            }else{
                url = "/dpj.html?i=" + room_number + t;
            }
        } else if (game_type == 19) {
            url = "/home/gdmj?i=" + room_number + t;
        } else if (game_type == 20) {
            //url = $scope.tzUrl
        } else if (game_type == 30) {
            url = "/home/dpj?i=" + room_number + t;
        } else if (game_type == 38) {
            url = "/home/xp?i=" + room_number + t;
        } else if (game_type == 43) {
            if(max_count == 6){
                url = "/zzbull6.html?i=" + room_number + t;
            }else if(max_count == 10){
                url = "/zzbull10.html?i=" + room_number + t;
            }else if(max_count == 13){
                url = "/zzbull13.html?i=" + room_number + t;
            }else if(max_count == 15){
                url = "/zzbull15.html?i=" + room_number + t;
            }else if(max_count == 17){
                url = "/zzbull17.html?i=" + room_number + t;
            }else if(max_count == 19){
                url = "/zzbull19.html?i=" + room_number + t;
            }else if(max_count == 21){
                url = "/zzbull21.html?i=" + room_number + t;
            }else{
                url = "/zzbull6.html?i=" + room_number + t;
            }
        }
        return url;
    },
    getHaurl: function (s) {
        if (s == 1) {
            return '/friendmember.html'
        } else if (s == 2) {
            return "/roomListPlay.html"
        } else if (s == 3) {
            return '/roomList.html'
        } else if (s == 4) {
            return '/packageRecord.html'
        } else if (s == 5) {
            return '/phoneUsers.html'
        } else if (s == 6) {
            return '/chat/index.html'
        } else if (s == 7) {
            return '/club_invite.html'
        } else if (s == 8) {
            return '/packageDetail.html'
        } else if (s == 9) {
            return '/myRP.html'
        } else if (s == 10) {
            return '/package.html'
        } else if (s == 11) {
            return '/chat/index.html'
        }
    }
};
var PageCode = {


};

