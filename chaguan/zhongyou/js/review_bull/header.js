

/*
   <link rel="stylesheet" type="text/css" href="<?php echo $file_url;?>files/css/review_daoyou.css?v=1">
    <script type="text/javascript" src="<?php echo $file_url;?>files/js/rem.js"></script>
 */
var type = getUrlParam("type")
var num = getUrlParam("num")


var tk = const_tk
console.log("type==========",type)
console.log("num==========",num)
// var data = getData(tk)
var data = getReviewRecord(type,num)


data.game_score_url = switchUrl(type)
console.log("data============",data.game_score_url)


localStorage.getItem("")

var css = [
    "files/css/review_daoyou.css?v=1"
]


var js = [
    "files/js/rem.js",
]

setJsAndCss(data,css,js)
data.tk = tk
// data.tk = "t_10545_b_114ba7d099773eb576789a02370eff2c"
document.write("<script language=javascript src='../js/review_bull/style.js'></script>");
//：13人拼十(房间号:<?php echo $room_number;?>)


function switchUrl(type){
    let url = ""
    switch (type) {
        case '1':
            url = "review_bull.html"
            break
        case '2':
            url = "review_bull.html"
            break
        case '3':
            url = "review_bull.html"
            break
        case '4':
            url = "review_flower."
            break
        case '5':
            url = "review_sangong.html"
            break
        case '6':
            url = "review_erba.html"
            break
        case '7':
            url = "review_landlord.html"
            break
        case '8':
            url = "review_majiang.html"
            break
        case '9':
            url = "review_yxx.html"
            break
        case '10':
            url = "review_paijiu.html"
            break
        // case 11:
        //     url = ""
        //     break
        case '12':
            url = "review_dxbull.html"
            break
        case '13':
            url = "review_dcx.html"
            break
        case '14':
            url = "review_laib.html"
            break
        case '15':
            url = "review_hly.html"
            break
        // case 16:
        //     url = ""
        //     break
        case '17':
            url = "review_jia31.html"
            break
        case '18':
            url = "review_dpj.html"
            break
    }
    return url
}