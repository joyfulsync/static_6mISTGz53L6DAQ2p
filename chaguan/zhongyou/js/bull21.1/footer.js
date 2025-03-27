/*


<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/canvas.js"></script>
<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js" ></script>
<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/bscroll.js"></script>
<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/vue.min.js" ></script>
<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/vue-resource.min.js" ></script>
<script type="text/javascript" src="<?php echo $file_url;?>fiesc/js/bull_cn_daoyou8.js?v=20210502"></script>
<script type="text/javascript" src="<?php echo $file_url;?>files/js/giftFunc_dy.js?v=bs2ssss21"></script>
<script type="text/javascript" src="<?php echo $file_url;?>files/js/gitView_daoyou.js?v=1sssss23s23"></script>
<script src="<?php echo $file_url;?>fiesc/js/fuzhi_xl.js?v=201280918"></script>
<script src="<?php echo $file_url;?>fiesc/js/clipboard.min.js"></script>

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
