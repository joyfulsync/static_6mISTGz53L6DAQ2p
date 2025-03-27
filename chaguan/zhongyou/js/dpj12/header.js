

/*
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>">
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/fastclick.js"></script>
 */

var key = getUrlParam("key")
var tk = const_tk
var data = getRoomData(tk,key)
localStorage.getItem("")

var css = [
    "files/css/paijiuD12_daoyou_v1.css?v=s11",
    "files/giftShop_dy/gift.css?v=s1",
    "files/css/skin.css?v=s1",
    "files/css/alert.css",
]


var js = [
    "fiesc/js/fastclick.js",
	// "fiesc/js/aes.js",
	"files/js/md5.js"
]


setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/dpj12/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
document.title = data.platfrom_name+"：12人大天九(房间号:"+data.room_number+")"
