var data = getData()
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
data.tk = const_tk

var css = [
    "files/css/loading.css",
    "files/css/alert.css"
]
var js = [
    // "fiesc/js/aes.js",
    "files/js/md5.js",
    "files/js/jquery-1.9.1.min.js",
    "files/js/angular.min.js",
    // "files/js/jweixin-1.0.0.js",
    "files/js/fastclick.js",
    "files/js/jquery.marquee.min.js",
    "files/js/rem.js",
    "files/js/clipboard.min.js",
]

setJsAndCss(data,css,js)
// document.write("<script language=javascript src='../js/common/aes.js'></script>");
document.write("<script language=javascript src='../js/alert_box_color_js.js'></script>");
document.write("<script language=javascript src='../js/alert_box_color.js'></script>");
document.write("<script language=javascript src='../js/set_style.js'></script>");
document.title = data.platfrom_name









