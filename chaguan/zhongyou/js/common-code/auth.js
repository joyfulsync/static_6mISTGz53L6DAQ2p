var oos_url2,wx_key,request_url,bowerlogin
var thirdparty_key

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true; //是微信浏览器
      } else {
        return false; //其他设备
      }
}
// console.log('gggg',localStorage.getItem('bowerlogin'))
function setBowerLogin(){
    localStorage.setItem('bowerlogin',1)
}

function checkBowerLogin(){
    return localStorage.getItem('bowerlogin')
}

// console.log('checkBowerLogin',checkBowerLogin())

let setCode = function(){
    let code = getUrlParam('code')
    postToken(code)
}

let postToken = function(code){
	$.ajaxSettings.async = false;
    $.ajax({
        type: "GET",
        url:  thirdparty_key + "api/getTokenByCode",
        data: {k:code},
        dataType: "json",
        success: function(data){
            // console.log('data',JSON.stringify(data))
            if (data == null || data == undefined || data == {} || data == ""){
                return {}
            }
            let result = JSON.stringify(data)
            $('#url').html(result)
            if(data.code == 1){
                kxkey = data.tk || null
                if(kxkey) {
                    // postData(kxkey);
                    window.localStorage.setItem('token',kxkey);
                    const_tk = kxkey
                    var test_url = window.location.href
                    var test_first = test_url.split("?")
                    var test_second = test_first[1].split("&")
                    console.log("test_111====",test_second)
                    var test_para = ""
                    for (let i = 0; i < test_second.length; i++) {
                        console.log("tetttt=====",test_second[i].split("=")[0])
                        if(test_second[i].split("=")[0] != "code"){
                            if (test_para == ""){
                                test_para += test_second[i]
                            }else {
                                test_para = test_para + "&" + test_second[i]
                            }
                        }
                    }
                    // var localhost_url = test_first[0]+"?"+test_para
					if(test_para != ""){
									  var localhost_url = test_first[0]+"?"+test_para
					}else{
									  var localhost_url = test_first[0]
					}
                    // console.log("localhost_url ==========",localhost_url)
                    window.location.href = localhost_url
                }
            }else{
                window.localStorage.removeItem('wwid');
                window.localStorage.removeItem('ws_ip');
                window.localStorage.removeItem('token');
				// window.localStorage.removeItem('bowerlogin');
                var test_url = window.location.href
                var test_first = test_url.split("?")
                var test_second = test_first[1].split("&")
                console.log("test_111====",test_second)
                var test_para = ""
                for (let i = 0; i < test_second.length; i++) {
                    console.log("tetttt=====",test_second[i].split("=")[0])
                    if(test_second[i].split("=")[0] != "code"){
                        if (test_para == ""){
                            test_para += test_second[i]
                        }else {
                            test_para = test_para + "&" + test_second[i]
                        }
                    }
                }
                // var localhost_url = test_first[0]+"?"+test_para
				if(test_para != ""){
								  var localhost_url = test_first[0]+"?"+test_para
				}else{
								  var localhost_url = test_first[0]
				}
                // console.log("localhost_url ==========",localhost_url)
                window.location.href = localhost_url
            }

        }
    });
}


let postData = function (){
	$.ajaxSettings.async = false;
    $.ajax({
        type: "GET",
        url:  first_url + "/api/getOosData?hallName="+scrName,
        data: {},
        dataType: "json",
        success: function(data){
            // console.log('data',JSON.stringify(data))
            // let result = JSON.stringify(data)
            // console.log("fuckkkkkk",result)
            // $('#url').html(result)
            if (data == null || data == undefined || data == {} || data == ""){
                return {}
            }
            if(data.code == 1){
				oos_url2 = data.grant_domain
                wx_key = data.appid
                request_url = data.request_url
                thirdparty_key = data.request_url
            }else{
                window.localStorage.removeItem('wwid');
                window.localStorage.removeItem('ws_ip');
                window.localStorage.removeItem('token');
				window.localStorage.removeItem('bowerlogin');
                window.location.href = 'http://' + window.location.host;
            }
        }
    });


}

let getCode = function(oos_url2){

    let obj = window.location.search

    let redirect_uri = 'http://' + window.location.host + window.location.pathname + obj;
		console.log('redirect_uri',redirect_uri)
    let acode = window.btoa(wx_key)
	if(is_tao){
		window.location.href = oos_url2 + 'site/wxredd.html?acode=' + acode + '&rurl='+ redirect_uri;
		
	}else{
		 window.location.href = oos_url2 + 'ss.html?acode=' + acode + '&rurl='+ redirect_uri;
	}
   
}


var code = getUrlParam('code')
var const_tk = localStorage.getItem('token')

postData()




var kxData,kxkey,yqx_url,platform,isScore,apiChatUrl;
var appDownUrl = 'http://' + window.location.host + '/uc/app';
var kaixinJia = '';
var kaixinJiav = 'ver1.0/';
var platform = '----'
var isScore = true


if(checkBowerLogin() == null){
		window.location.href = "./login.html?return_url=" +  window.location.href;
}

if (code == undefined || code == null){
    if (const_tk == undefined || const_tk == null){
		if(!isWeiXin()){
			///site/login?return_url=http%3A%2F%2F81.71.146.27%3A1700%2F
			window.location.href = "./login.html?return_url=" +  window.location.href;
		}else{
			getAuthCode(oos_url2)
		}
    }
}else{
	setBowerLogin()
    postToken(code)
}






// let postData = function(kxkey){
//     $.ajax({
//         type: "GET",
//         url:  thirdparty_key + "bower_api/getData",
//         data: {tk:kxkey},
//         dataType: "json",
//         success: function(data){
//             //console.log('data',JSON.stringify(data))
//             let result = JSON.stringify(data)
//             $('#url2').html(result)
//             let obj = JSON.parse(result)
//             if(obj){
//                 if(obj.result && obj.result < 0){
//                     window.localStorage.removeItem('wwid');
//                     window.localStorage.removeItem('ws_ip');
//                     window.localStorage.removeItem('token');
				// window.localStorage.removeItem('bowerlogin');
//                     getCode()
//                 }else{
//                     kxData = obj.kaixin_data
//                     yqx_url = obj.yqx_url
//                     platform = obj.platform || ''
//                     apiChatUrl = obj.api_url
//                 }
//             }
//         }
//     });
// }

//
// let checkToken = function(){
//     let token = window.localStorage.getItem("token");
//     if(token){
//         // postData(token)
//     }else{
//         if(getUrlParam('code')){
//             //有code,则是从授权回来的这种情况，就直接把code传后台获取token
//             setCode()
//         }else{
//             //无code，则直接走跳转
//             getCode()
//         }
//     }
// }
//
// checkToken()