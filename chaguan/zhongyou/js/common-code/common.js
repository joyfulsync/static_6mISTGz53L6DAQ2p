function isWeiXin(){
     	        var ua = window.navigator.userAgent.toLowerCase();
     	        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
     	          return true; //是微信浏览器
     	        } else {
     	          return false; //其他设备
     	        }
}

var timestamp = Date.parse(new Date())
var ipScript = "<script language=javascript src='../../../ip.js?v=8765711'></script>"

document.write(ipScript)
var authScript = "<script language=javascript src='../js/common/auth.js?v=81111'"+timestamp+"></script>"
document.write(authScript)




 // var scrName="zhongyou"
// var const_tk = 't_1_b_162195220be6b58e0e4801838f44f200'
// var tk = const_tk
// var request_url  = 'http://1.14.205.62:1900/'
function getRoomData(tk,key){
	// console.log('request_url',request_url)
    $.ajaxSettings.async = false;
    var res = {}
    let a = $.post(
        request_url+"room?key="+key+"&hallName="+scrName,
        {
            tk:const_tk
            // tk:"t_10545_b_114ba7d099773eb576789a02370eff2c"
        },
        function (r){
            res = r
        },
        "json"
    )
    if (res == null || res == undefined || res == {} || res == ""){
        return {}
    }
    if (res.code == -10){
	
        getCode(oos_url2)
    }
	
	if (res.code == -1){
	    getCode(oos_url2)
	}
	if (res.code == -30){
	   window.location.href = "http://xhb1004-1312948063.cos-website.ap-beijing.myqcloud.com/zdh"
	}

    return res.msg
}
// t_10545_b_61bd795ce2f01b0ed32f51a6eacc1b32
//http://106.52.140.53:1700/game/queryCard?type=1&num=791422
function getReviewRecord(type,num){
    $.ajaxSettings.async = false;
    let url = request_url+"game/queryCard?type="+type+"&num="+num+"&tk="+const_tk+"&hallName="+scrName
    // console.log("url=======",url)
    var res = {}
    $.get(
        url,
        // request_url+"/game/queryCard",
        // {
        //     tk:tk,
        //     type:type,
        //     num:num,
        // },
        function (r){
            res = r
        },
        "json"
    )
    if (res == null || res == undefined || res == {} || res == ""){
        return {}
    }
    if (res.code == -10){
        getCode(oos_url2)
    }
	if (res.code == -1){
	    getCode(oos_url2)
	}
    return res.msg
}



function setHeaderFuzhi(data,s){
    var fuzhiImg = document.getElementById("fuzhiImg");
    var fuzhiSrc = fuzhiImg.getAttribute("data-src")
    var fuzhiNewSrc = fuzhiSrc.replace(s,data.file_url)
    fuzhiImg.src = fuzhiNewSrc
}



/**
 * 设置头部js和css
 * @param data
 */
function setJsAndCss(data,css,js){
    // console.log("dattttttttatatatta",data)
    if (css.length > 0){
        css = css.map((value)=>{
            return data.file_url + value
        })
        for (let i = 0; i < css.length; i++) {
            document.write("<link rel='stylesheet' href="+ css[i] +">");
        }
    }
    if (js.length>0){
        js = js.map((value)=>{
            return data.file_url + value
        })
        for (let i = 0; i < js.length; i++) {
            document.write("<script type='text/javascript' src="+ js[i] +"></script>");
        }
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function getData(tk){
    $.ajaxSettings.async = false;
    var res = {}
    let a = $.post(
        request_url+"/?hallName="+scrName,
        {
            tk:const_tk,
            "hallName":scrName
            // tk:"t_10545_b_114ba7d099773eb576789a02370eff2c"
        },
        function (r){
            res = r
        },
        "json"
    )
    if (res == null || res == undefined || res == {} || res == ""){
        return {}
    }
    if (res.code == -10){
       if(isWeiXin()){
       	window.localStorage.removeItem('wwid');
       	window.localStorage.removeItem('ws_ip');
       	window.localStorage.removeItem('token');
       	window.localStorage.removeItem('bowerlogin');
       	getCode(oos_url2)
       }else{
       	window.localStorage.removeItem('wwid');
       	window.localStorage.removeItem('ws_ip');
       	window.localStorage.removeItem('token');
       	window.localStorage.removeItem('bowerlogin');
       	window.location.href = "./login.html?return_url=" +  window.location.href;
       }
    }
	
	if (res.code == -1){
	    getCode(oos_url2)
	}
	
	else if(res.code == -40){
				window.location.href = 'weihu.html';
	}
	
	if (res.code == -30){
	   window.location.href = "http://xhb1004-1312948063.cos-website.ap-beijing.myqcloud.com/zdh"
	}

    // console.log("res",res)
    return res.msg
}





function httpGet(tk,red_code){
    $.ajaxSettings.async = false;
    var res = {}
    let a = $.post(
        request_url+"ay/rpD?red_code="+red_code+"&hallName="+scrName,
        {
            tk:const_tk
            // tk:"t_10545_b_114ba7d099773eb576789a02370eff2c"
        },
        function (r){
            res = r
        },
        "json"
    )
    if (res == null || res == undefined || res == {} || res == ""){
        return {}
    }
	  if (res.code == -10){
		  getCode(oos_url2)
	  }
	  
	  if (res.code == -1){
		  getCode(oos_url2)
	  }
  
    return res.msg
}


function toChat(){
    if (data.group_id == 0){
        methods.showAlertTip("房主没有开通聊天室", 2);
    }else {
        window.location.href = "chat_index.html?mid="+data.group_id;
    }
}