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
        //console.log('Hello world');
        var str = navigator.userAgent.toLowerCase();
        //console.log(str);
        var ver = str.match(/cpu iphone os (.*?) like mac os/);
        if (!ver) {
            this.init();
        } else {
            //console.log(ver);
            if (parseInt(ver[1].replace(/_/g, ".")) < 10) {
                //console.log('//=======111111======>>>');
                var copyLink = document.getElementById("main");
                var copyTitle = document.title;
                copyLink.innerHTML = copyTitle + window.location.href;
                $('#dialog').show();
            } else {
                //console.log('//========22222222222=====>>>');
                this.init();
            }
        }

    },
    closeDialog: function () {
        $('#dialog').hide();
    },

}