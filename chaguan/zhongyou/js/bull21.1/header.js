

/*
    <link rel="stylesheet" href="<?php echo $file_url;?>fiesc/css/loading_new.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>fiesc/css/bull21_daoyou_v1.css?v=2Xs0271">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>fiesc/css/alertbox.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/giftShop_dy/gift.css?v=ss1">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/skin.css?v=s1">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>fiesc/css/ncomm.css">
    <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>fiesc/css/bbull21.css">
    <script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/fastclick.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/aes.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/md5.js"></script>
 */
var tk = const_tk
var key = getUrlParam("key")
var data = getRoomData(tk,key)
localStorage.getItem("")

var css = [
    "fiesc/css/loading_new.css",
    "fiesc/css/bull21_daoyou_v1.css?v=1111",
    "fiesc/css/alertbox.css",
    "files/giftShop_dy/gift.css?v=ss1",
    "files/css/skin.css?v=s",
    "fiesc/css/ncomm.css",
]


var js = [
    "fiesc/js/fastclick.js",
    // "fiesc/js/aes.js",
    "files/js/md5.js"
]

setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/bull21.1/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
document.title = data.platfrom_name+"：21人拼十(房间号:"+data.room_number+")"
