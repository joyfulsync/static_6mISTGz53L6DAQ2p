


/*
    <script src=<?php echo $chat_url;?>super_chat/js/ rw.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / q.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / aes.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / aesjj.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / md5.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / utf.js ></script>
    <script src=<?php echo $chat_url;?>super_chat / js / jquery.qrcode.js ></script>

        <link href=<?php echo $chat_url;?>super_chat/v3/static/css/app.b45c646ee20993735ed98b032ca94b83.css rel=stylesheet>


<script type=text/javascript src=<?php echo $chat_url;?>super_chat / v3 / static/js/manifest.e662d2eaedc6c57932c5.js ></script>
<script type=text/javascript src=<?php echo $chat_url;?>super_chat / v3 / static/js/vendor.6ecd40b864f0e8680fa6.js ></script>
<script type=text/javascript src=<?php echo $chat_url;?>super_chat / v3 / static/js/app.16046541d4a9de0084a8.js ></script>


<script src=<?php echo $chat_url;?>super_chat / js / hc.js ></script>
<script src=<?php echo $chat_url;?>super_chat / js / cb.js ></script>
 */


var css = [
    "super_chat/v3/static/css/app.b45c646ee20993735ed98b032ca94b83.css"
]


var js = [
    "super_chat/js/rw.js",
    "super_chat/js/q.js",
    "super_chat/js/aes.js",
    "super_chat/js/aesjj.js",
    "super_chat/js/md5.js",
    "super_chat/js/utf.js",
    "super_chat/js/jquery.qrcode.js",

    "super_chat/v3/static/js/manifest.e662d2eaedc6c57932c5.js?v=2",
    "super_chat/v3/static/js/vendor.6ecd40b864f0e8680fa6.js?v=2",
    "super_chat/v3/static/js/app.16046541d4a9de0084a8.js?v=2",

    "super_chat/js/hc.js?v=2",
    "super_chat/js/cb.js?v=2",


]

if (css.length > 0){
    css = css.map((value)=>{
        return '../chat/' + value
    })
    for (let i = 0; i < css.length; i++) {
        document.write("<link rel='stylesheet' href="+ css[i] +">");
    }
}
if (js.length>0){
    js = js.map((value)=>{
        return '../' + value
    })
    for (let i = 0; i < js.length; i++) {
        document.write("<script type='text/javascript' src="+ js[i] +"></script>");
    }
}


