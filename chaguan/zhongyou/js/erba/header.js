var key = getUrlParam("key")
var tk = const_tk
var data = getRoomData(tk,key)
localStorage.getItem("")
var css = [
    "files/css/erba2.css",
    "files/css/erba.css"
]
var js = [
    "fiesc/js/fastclick.js",
	"fiesc/js/aes.js",
	"files/js/md5.js"
]


    // <link rel="stylesheet" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/loading_new.css">
    // <link rel="stylesheet" type="text/css" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/erba.css">
    // <link rel="stylesheet" type="text/css" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/erba2.css">
    // <link rel="stylesheet" type="text/css" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/alert.css">
    // <link rel="stylesheet" type="text/css" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/ncomm.css">
    // <link rel="stylesheet" type="text/css" href="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/css/alertbox.css">
    // <script type="text/javascript" src="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/js/fastclick.js"></script>
    // <script type="text/javascript" src="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/fiesc/js/aes.js"></script>
    // <script type="text/javascript" src="http://http://res-1001-1315888888.ap-hongkong.app.cloudstable.cn/xdy/files/js/md5.js"></script

setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
// document.write("<script language=javascript src='../js/erba/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
document.title = data.platfrom_name+"：二八杠(房间号:"+data.room_number+")"
