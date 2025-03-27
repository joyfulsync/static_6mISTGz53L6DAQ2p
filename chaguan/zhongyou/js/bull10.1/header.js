var key = getUrlParam("key")
var tk = const_tk
var data = getRoomData(tk,key)
localStorage.getItem("")

// setData(data)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
// document.write("<script language=javascript src='../js/alert_box_color_js.js'></script>");
// document.write("<script language=javascript src='../js/alert_box_color.js'></script>");
document.write("<script language=javascript src='../js/bull10.1/dom_css.js'></script>");

var css = [
    "fiesc/css/loading_new.css",
    "fiesc/css/bull10_daoyou_v1.css?v=2Xs020",
    "fiesc/css/alertbox.css",
    "files/giftShop_dy/gift.css?v=ss1",
    "files/css/skin.css?v=s1",
    "fiesc/css/ncomm.css",

]
var js = [
    "fiesc/js/fastclick.js",
	// "fiesc/js/aes.js",
	
]


setJsAndCss(data,css,js)


document.title = data.platfrom_name+"十人拼十(房间号:"+data.room_number+")"




function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


