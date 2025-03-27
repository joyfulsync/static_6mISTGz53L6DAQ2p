var oos_url2,wx_key,request_url,bowerlogin,result_code
var thirdparty_key

/**
 <link rel="stylesheet" type="text/css" href="<?php echo $file_url; ?>files/css/paijiuD.css?v=2019">
 <link rel="stylesheet" type="text/css" href="<?php echo $file_url; ?>files/css/alert.css">
 <link rel="stylesheet" type="text/css" href="<?php echo $file_url; ?>files/giftShop/gift/gift.css?v=1">
 <script type="text/javascript" src="<?php echo $file_url; ?>files/js/fastclick.js"></script>

 */
// http://res.hongloushangcheng.com/allbucket/common/fiesc/css/bull6.css
// http://res.hongloushangcheng.com/allbucket/common/files/css/bull6.css
// document.write("<script language=javascript src='../../../ip.js'></script>")


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
			
            if(data.code != 0){
                oos_url2 = data.grant_domain
                wx_key = data.appid
                request_url = data.request_url
                thirdparty_key = data.request_url
                result_code = data.code
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


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getLogin($return_url){
    if (return_url == null){
        return_url = getUrlParam("return_url")
    }
    $.ajaxSettings.async = false;
    var res = {}
    let a = $.post(
        request_url+"/site/login?"+"hallName="+scrName,
        {
            "hallName":scrName,
			"return_url":return_url
            // tk:"t_10545_b_114ba7d099773eb576789a02370eff2c"
        },
        function (r){
            res = r
        },
        "json"
    )
    if (res.code != 200){
       alert(res.message)
    }
    return res.msg
}
// var css = [
//     "files/css/paijiuD.css?v=20192",
//     "fiesc/css/alertbox.css",
//     "fiesc/css/ncomm.css",
//     "files/giftShop/gift/gift.css?v=1"
// ]

// var js = [
//     "files/js/fastclick.js"
// ]
// setJsAndCss(data,css,js)
// document.title = data.platfrom_name+"登陆"

postData()

var return_url = getUrlParam("return_url");
var data = getLogin(return_url);

console.log('data',data)