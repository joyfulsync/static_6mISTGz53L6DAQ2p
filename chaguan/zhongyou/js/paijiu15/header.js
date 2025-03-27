

/*
<link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/flower12_daoyou_v1.css?v=12s111">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/alertbox.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/giftShop_dy/gift.css?v=s1">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/skin.css?v=s1">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/ncomm.css">

 */

var key = getUrlParam("key")
var tk = const_tk
var data = getRoomData(tk,key)
localStorage.getItem("")

var css = [
    "files/css/paijiu15_daoyou_v1.css?v=12s111",
    "files/css/alert.css",
    "files/giftShop_dy/gift.css?v=s1",
    "files/css/ncomm.css",
    "files/css/skin.css?v=s1",
    "files/css/alertbox.css"
]


var js = [
    "fiesc/js/fastclick.js",
	// "fiesc/js/aes.js",
	"files/js/md5.js"
]

setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/paijiu15/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
document.title = data.platfrom_name+"："+ data.max_count +"人小天九(房间号:"+ data.room_number+")"
