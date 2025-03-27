/*

<script type="text/javascript" :src="data.file_url+'"></script>
<script type="text/javascript" :src="data.file_url+'"></script>

<script type="text/javascript" :src="data.file_url+'"></script>
<script type="text/javascript" :src="data.file_url+'"></script>
<script type="text/javascript" :src="data.file_url+'" ></script>
<script type="text/javascript" :src="data.file_url+'s" ></script>
<script type="text/javascript" :src="data.file_url+'"></script>

<script type="text/javascript" :src="data.file_url+'2"></script>
<script type="text/javascript" :src="data.file_url+'1"></script>
<script type="text/javascript" :src="data.file_url+'"></script>
<script :src="data.file_url+'"></script>
<script :src="data.file_url+'"></script>

 */



var footer_js = [
    "fiesc/js/canvas.js",
    "fiesc/js/jquery-1.9.1.min.js",
    "files/js/jquery.qrcode.min.js",
    "fiesc/js/bscroll.js",
    "fiesc/js/vue.min.js",
    "fiesc/js/vue-resource.min.js",
    "files/js/qrcode.js?v=1",
    "files/js/giftFunc_dy.js?v=bs2ssss2",
    "files/js/gitView_daoyou.js?v=1sssss23s23",
    "fiesc/js/fuzhi_xl_dy.js?v=201280918",
    "fiesc/js/clipboard.min.js",
]

var footer_css = [

]


setJsAndCss(data,footer_css,footer_js)


setHeaderFuzhi(data,"<?php echo $file_url;?>")
