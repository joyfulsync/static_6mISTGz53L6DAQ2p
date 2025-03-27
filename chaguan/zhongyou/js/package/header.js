

/*
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/angular.min.js"></script>
    <script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/fastclick.js?v=2019"></script>
 */

var key = getUrlParam("key")
var tk = const_tk
var data = getData(tk)
localStorage.getItem("")

var css = [
    "files/css/activity.css"
]


var js = [
    "files/js/angular.min.js",
    "fiesc/js/fastclick.js",
]

setJsAndCss(data,css,js)
data.tk = const_tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/package/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
// document.title = data.platfrom_name+"："+ data.max_count +"人小天九(房间号:"+ data.room_number+")"
