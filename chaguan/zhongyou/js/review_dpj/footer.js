/*


<script type="text/javascript" src="<?php echo $file_url; ?>files/js/vue.min.js" ></script>
<script type="text/javascript" src="<?php echo $file_url; ?>files/js/vue-resource.min.js" ></script>
<script type="text/javascript" src="<?php echo $file_url; ?>files/js/review_bull_daoyou1.js?v=1"></script>

 */

var fuzhiImg = document.getElementById("loadingImg");
fuzhiImg.src = data.file_url + "files/images/common/loading.gif"


var footer_js = [
    "files/js/vue.min.js",
    "files/js/vue-resource.min.js",
]

var footer_css = [
	// 'files/css/review_dpj_dy.css'
]


setJsAndCss(data,footer_css,footer_js)


// setHeaderFuzhi(data,"<?php echo $file_url;?>")
