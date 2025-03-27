window.onload = function () {
    $(document).on('click', 'img', function(e){
        e.preventDefault();
    })
    var copyLink = document.getElementById("room_str");

    // 判断平台
    if("undefined" != typeof globalData&&"undefined" != typeof globalData.isXianliao&&globalData.isXianliao==1) {
        console.log('闲聊')
        var copyTitle = globalData.xlTitle
    }else if("undefined" != typeof globalData&&"undefined" != typeof globalData.isWechat&&globalData.isWechat==1){
        console.log('微信')
        var copyTitle = globalData.shareTitle;
    }else{
        console.log('普通')
        var copyTitle = document.title;
    }

    copyLink.value = copyTitle +window.location.href;

    console.log(window.location.href);
    $.fn.BindClipboard = $.fn.BindClipboard || function (target) {
        var options = {};
        if (target) {
            options = {
                "target": function (trigger) {
                    console.log(trigger);
                    return $(target)[0];
                }
            };
        }
        new ClipboardJS($(this)[0], options).on("success", function (e) {
            console.log(e);
        }).on("error", function (e) {
            console.log(e);
        });
    }
    // 调用clipboard
    $(".copyUrl").BindClipboard("#room_str");

}

var fuzhiMain = {
    init: function () {
        $('#tips').show();
        setTimeout(function () {
            $('#tips').hide();
        }, 2000);
        var clipboard = new ClipboardJS('#copy_btn');
        clipboard.on('success', function (e) {
            e.clearSelection();
            console.log(e.clearSelection);
        });
    },
    link: function () {
        var str = navigator.userAgent.toLowerCase();
        var ver = str.match(/cpu iphone os (.*?) like mac os/);
        if (!ver) {
            this.init();
        } else {
            if (parseInt(ver[1].replace(/_/g, ".")) < 10) {
                var copyLink = document.getElementById("main");
                var copyTitle = document.title;
                copyLink.innerHTML = copyTitle + window.location.href;
                $('#dialog').show();
            } else {
                this.init();
            }
        }

    },
    closeDialog: function () {
        $('#dialog').hide();
    },

}


//二维码
let qrScriptUrl = 'https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js';
let qrScript = document.createElement("script");
qrScript.type = "text/javascript";
qrScript.src = qrScriptUrl;
document.body.appendChild(qrScript);

let qrImg = document.createElement("img");
qrImg.setAttribute("id", "qrImg");
qrImg.style.position = "fixed";
qrImg.style.width = "150px";
qrImg.style.height = "150px";
qrImg.style.zIndex = '-99999';
qrImg.style.display = 'block';
document.body.appendChild(qrImg);

let qrDiv = document.createElement("div");
qrDiv.setAttribute("id", "qrDiv");
qrDiv.style.position = "fixed";
qrDiv.style.zIndex = "-999999";
document.body.appendChild(qrDiv);

let drawCanvas = document.createElement("canvas");
drawCanvas.setAttribute("id", "drawCanvas");
drawCanvas.style.position = "fixed";
drawCanvas.style.zIndex = "-999999";
//drawCanvas.style.top = "50%";
//drawCanvas.style.marginTop = "-125px";
drawCanvas.style.left = "-1000%";
//drawCanvas.style.marginLeft = "-135px";
//drawCanvas.style.borderRadius = "6px";
//drawCanvas.style.padding = "8px";
//drawCanvas.style.backgroundColor = "#fff";
drawCanvas.style.display = "block";
document.body.appendChild(drawCanvas);

let copyImg = document.createElement("img");
copyImg.setAttribute("id", "copyImg");
copyImg.style.position = "fixed";
copyImg.style.zIndex = "999999";
copyImg.style.top = "50%";
copyImg.style.marginTop = "-122px";
copyImg.style.left = "50%";
copyImg.style.marginLeft = "-120px";
//copyImg.style.borderRadius = "6px";
//copyImg.style.padding = "8px";
copyImg.style.backgroundColor = "#FBFAF2";
copyImg.style.display = "none";
copyImg.style.minWidth = '240px'
copyImg.style.minHeight = '200px'
document.body.appendChild(copyImg);

let qrBg = document.createElement("div");
qrBg.setAttribute("id", "qrBg");
qrBg.style.position = "fixed";
qrBg.style.width = "100%";
qrBg.style.height = "100%";
qrBg.style.top = "0";
qrBg.style.left = "0";
qrBg.style.zIndex = '99998';
qrBg.style.display = 'none';
qrBg.style.backgroundColor = 'rgba(0,0,0,0.7)';
qrBg.onclick = function() {
	qrBg.style.display = 'none';
	copyImg.style.display = 'none';
};
document.body.appendChild(qrBg);



let qrBgImg = document.createElement("div");
qrBgImg.setAttribute("id", "qrBgImg");
qrBgImg.style.background = 'url(https://gz53002.oss-cn-hangzhou.aliyuncs.com/oldyinghua/common_dy/files/images/daoyou/page/set-indiv-bg.png) no-repeat'
qrBgImg.style.backgroundSize = '100% 100%'
qrBgImg.style.positon = 'fixed'
qrBgImg.style.width = '282px'
qrBgImg.style.height = '364px'
qrBgImg.style.top = '50%'
qrBgImg.style.left = '50%'
qrBgImg.style.position = 'fixed'
qrBgImg.style.transform = 'translate(-50%,-50%)'


qrBg.appendChild(qrBgImg);

$("#imgOne").next().html('(房间:' + globalData.roomNumber  +')')
$("#imgOne").next().css({'width':'60vw',"bottom":"4%","font-size":"12px","word-break":"break-word"})




setTimeout(function() {
	let qrcode = new QRCode(qrDiv, window.location.href);
	setTimeout(function() {
		let url = qrDiv.children[0].toDataURL("image/png", 1);
		console.log('url', qrDiv.children[0].toDataURL("image/png", 1));
		qrImg.src = url;
	},
	50)
},1000)

let createQRImg = function(str) {
	let canvas = document.getElementById("drawCanvas");
	let qrBg = document.getElementById("qrBg");
	let copyImg = document.getElementById("copyImg");
	copyImg.src = '';
	copyImg.style.display = 'block';
	qrBg.style.display = 'block';
	canvas.width = '244';
	canvas.height = '230';
	let context = canvas.getContext("2d");
	context.clearRect(0, 0, 244, 230);
	context.fillStyle = '#FBFAF2';
	context.fillRect(0, 0, canvas.width, canvas.height);
	let path = document.getElementById("qrImg");
	context.drawImage(path, 30, 0, 180, 180);
	context.font = '14px 黑体';
	context.fillStyle = "#444444";
	context.save();

	let lineWidth = 0;
	let initHeight = 200; //绘制字体距离canvas顶部初始的高度
	let lastSubStrIndex = 0; //每次开始截取的字符串的索引
	str = str.toString();
	for (let i = 0; i < str.length; i++) {
		lineWidth += context.measureText(str[i]).width;
		if (lineWidth > canvas.width - 15) {
			context.fillText(str.substring(lastSubStrIndex, i), 0, initHeight); //绘制截取部分
			initHeight += 16; //20为字体的高度
			lineWidth = 0;
			lastSubStrIndex = i;
		}
		if (i == str.length - 1) { //绘制剩余部分
			context.fillText(str.substring(lastSubStrIndex, i + 1), 0, initHeight);
		}
		context.restore();
		context.stroke();
	}
    setTimeout(function() {
       copyImg.src = canvas.toDataURL("image/png", 1)
    },600)  
}
document.getElementById("copy_btn").addEventListener('click', function(){
    let str = '房间:(' + globalData.roomNumber  +')'
	createQRImg(str)
}, false);
