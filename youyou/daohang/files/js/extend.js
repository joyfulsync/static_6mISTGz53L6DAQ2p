var JqExtends = {
    config: function(type, value) {
        this.post('/robot/config', {'type': type, 'value': value}, function (e) {
            if (e.code == 1) {
                this.showmsg(e.msg, 1);
            } else {
                this.showmsg(e.msg, 0);
            }
        });
    },
    post: function (url, data, callback) {
        $.ajax({
            url: BaseUrl + url,
            type: "post",
            dataType: 'JSON',
            data: data,
            async: false,
            headers: {'Accept': 'application/json', 'Authorization': window.localStorage.getItem("wwid")},
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showmsg('请求失败', 0);
            }
        });
    },
    updata: function(url, data, callback) {
        $.ajax({
            url: BaseUrl + url,
            type: "POST",
            data: data,
            processData: false,
            contentType: false,
            dataType: "JSON",
            headers: {'Authorization': window.localStorage.getItem("wwid")},
            success: callback,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showmsg('请求失败', 0);
            }
        });
    },
    showmsg: function(msg, id) {
        $(".alertB").css('display', 'block');
        if (id == 1) {
            $(".alertB>#d").css('display', 'block');
        } else {
            $(".alertB>#x").css('display', 'block');
        }
        $('.alertB>.alertTextB').html(msg);
        setTimeout(function () {
            $(".alertB").css('display', 'none');
            $(".alertB>#d").css('display', 'none');
            $(".alertB>#x").css('display', 'none');
        }, 1500);
    }
};