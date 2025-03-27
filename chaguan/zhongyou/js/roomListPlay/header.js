

/*
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/fastclick.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/rem.js"></script>
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/alert.css">
 */

var key = getUrlParam("key")
var tk = const_tk
var data = getData(tk)
localStorage.getItem("")

var css = [
    "files/css/alert.css"
]


var js = [
    "fiesc/js/fastclick.js",
    "files/js/bscroll.min.js",
    "files/js/rem.js"
]

setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/roomListPlay/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
// document.title = data.platfrom_name+"："+ data.max_count +"人小天九(房间号:"+ data.room_number+")"
