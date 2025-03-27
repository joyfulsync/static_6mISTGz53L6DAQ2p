

/*

    <script src=<?php echo $chat_url;?>super_chat/js/wx.js></script>

 */

// var key = getUrlParam("key")
// console.log("token",const_tk)
var data = getChatData()
if(data == undefined || data == null){
    data.platfrom_name = ""
    data.room_number = ""
}
function getChatData(){
    $.ajaxSettings.async = false;
    var res = {}
    let a = $.post(
        request_url+"/chat/index?hallName="+scrName,
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
    if (res.code == -10){
        getAuthCode(oos_url2)
    }
    // console.log("res",res)
    return res.msg
}

var css = [
]


var js = [
    // "fiesc/js/aes.js",
    // "files/js/md5.js"
    "super_chat/js/wx.js"
]
if (css.length > 0){
    css = css.map((value)=>{
        return data.chat_url + value
    })
    for (let i = 0; i < css.length; i++) {
        document.write("<link rel='stylesheet' href="+ css[i] +">");
    }
}
if (js.length>0){
    js = js.map((value)=>{
        return data.chat_url + value
    })
    for (let i = 0; i < js.length; i++) {
        document.write("<script type='text/javascript' src="+ js[i] +"></script>");
    }
}
document.title = data.platfrom_name
data.tk = const_tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
// document.write("<script language=javascript src='./js/hall/alert_box_color.js'></script>");
// document.write("<script language=javascript src='./js/hall/alert_box_css.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
