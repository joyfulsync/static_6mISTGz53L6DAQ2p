

/*
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/angular.min.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/fastclick.js"></script>
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/clipboard.min.js"></script>
 */

var red_code = getUrlParam("red_code")
var tk = const_tk
var data = httpGet(const_tk,red_code)
console.log('data',data)
localStorage.getItem("")

var css = [
    "files/css/activity.css"
]


var js = [
    "files/js/angular.min.js",
    "fiesc/js/fastclick.js",
    "files/js/clipboard.min.js"
]

setJsAndCss(data,css,js)
data.tk = const_tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
// document.write("<script language=javascript src='../js/packageDetail/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)
document.title = data.platfrom_name+"-房卡包:"
// document.title = data.platfrom_name+"："+ data.max_count +"人小天九(房间号:"+ data.room_number+")"
