
(function () {
    var clipboard = new ClipboardJS('.btn-copy');
    clipboard.on('success', function (e) {
        alert("复制成功,【粘贴】分享给您的好友");
    });
})();

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 通过下面这个API隐藏右上角按钮
    WeixinJSBridge.call('hideOptionMenu');
});

$("#topclass a").on('click', function () {
    $("#topclass a").removeClass('on');
    $(this).addClass('on');
})

var globalData = {
    "baseUrl": BaseUrl + "/api/",
    "groupId": 1
};

var httpModule = {

    search: function (keyword){

        var postData = {
            "group_id": globalData.groupId,
            'key': keyword
        };
        Vue.http.interceptors.push((request, next) => {
            request.credentials = true;
            next();
        });

        Vue.http.post(globalData.baseUrl + 'search/', postData, {"emulateJSON": true}).then(function (response) {
            var bodyData = response.body;

            console.log(bodyData);

            if(bodyData.code == 1){
                appData.gameDetailList = [];
                for(var i = 0; i < bodyData.data.list.length; i++){
                    var item = bodyData.data.list[i];
                    //var str='<div class="btn-item"><a class="btn-link" href=""><img src="/dh/src/1.jpg" alt=""><div>'+result[i].name+
                    //    '</div></a><div class="btn-detail"> <div><font color="#FF0000"></font></div><div><font color="#6666FF"></font></div><div></div><div></div><div>'+
                    //    result[i].remark+'</div><div></div><div></div></div><div class="btn-actions"><a class="btn-play" href="'+result[i].url+'' +
                    //    '">立即试玩</a><a class="btn-play btn-copy" href="javascript:" data-clipboard-text="'+result[i].dremark+'">复制链接</a></div></div>';

                    appData.gameDetailList.push({
                        "name": item.name,
                        "alias": item.alias,
                        "remark": item.remark,
                        "url": item.url,
                        "dremark": item.dremark
                    });

                    console.log(appData.gameDetailList);
                }
            }
        }, function (response) {
            logMessage(response.body);
        });
    }
};

var viewMethods = {
    search(){
        httpModule.search(appData.keyword);
    }
};
var viewStyle = {};

var appData = {
    'gameDetailList': [],
    'keyword' : ''
};
//Vue方法
var methods = {
    search : viewMethods.search
};

//Vue生命周期
var vueLife = {
    vmCreated: function () {
        logMessage('vmCreated')
        viewMethods.search();
    },
    vmUpdated: function () {
        logMessage('vmUpdated');
    },
    vmMounted: function () {
        logMessage('vmMounted');
    },
    vmDestroyed: function () {
        logMessage('vmDestroyed');
    }
};

//Vue实例
var vm = new Vue({
    el: '#app-main',
    data: appData,
    methods: methods,
    created: vueLife.vmCreated,
    updated: vueLife.vmUpdated,
    mounted: vueLife.vmMounted,
    destroyed: vueLife.vmDestroyed,
});

function logMessage(message) {
    console.log(message);
};



