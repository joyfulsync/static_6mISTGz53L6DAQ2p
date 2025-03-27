/*
<script type="text/javascript" src="<?php echo $file_url;?>files/js/bscroll.min.js"></script>
<script type="text/javascript" src="<?php echo $file_url;?>files/js/vue.min.js"></script>
<script type="text/javascript" src="<?php echo $file_url;?>files/js/vue-resource.min.js"></script>



 */


var fuzhiImg = document.getElementById("loadingImg");
fuzhiImg.src = data.file_url + "files/images/common/loading.gif"

var footer_js = [
    "files/js/bscroll.min.js",
    "files/js/vue.min.js",
    "files/js/vue-resource.min.js",
]

var footer_css = [

]


setJsAndCss(data,footer_css,footer_js)


