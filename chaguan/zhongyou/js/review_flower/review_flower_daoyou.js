
var httpModule = {

    getScoreDetail: function () {

        if (globalData.scoreInfo) {

            console.log(globalData.scoreInfo);

            appData.ruleStartTime = globalData.scoreInfo.start_time;
            appData.ruleEndTime = globalData.scoreInfo.end_time;
            appData.ruleText = globalData.scoreInfo.rule_text;
            appData.player_avatar = globalData.scoreInfo.player_avatar;

            for (var i = 0; i < globalData.scoreInfo.balance_board.length;i++) {
                var item = globalData.scoreInfo.balance_board[i];
                var name = item.nickname;
                var score = item.score;
                if (score > 0) {
                    score = '+' + score;
                }
                appData.gameScoreList.push({"name":name,"avatar":item.headimgurl,"score":score,"code":item.account_id});
            }

            appData.gameDetailList = new Array();

            for (var i = 0; i < globalData.scoreInfo.player_array.length; i++) {
                var item = globalData.scoreInfo.player_array[i];
                var detailArray = new Array();
                var players = item.player_cards;

                for (var j = 0; j < item.player_cards.length; j++) {
                    var value = item.player_cards[j];
                    var name = value.name;
                    var score = value.score;
                    var pscore = value.pscore;
                    var cards = value.player_cards.concat();
                    // if (score > 0) {
                    //     score = '+' + score;
                    // }
                    detailArray.push({
                        "name": name,
                        "card_type": value.card_type_str,
                        "chip": value.chip,
                        "is_banker": value.is_banker,
                        "is_join": value.is_join,
                        "score": score,
                        "pscore": pscore,
                        "cards": cards ,
                        "other": value.other,
                        "ps":value.ps,
                        "pf":value.pf,
                        "account_id": value.account_id
                    });
                }
                appData.gameDetailList.push({ "gnum": item.game_num,
                    "tnum": item.total_num, "detail": detailArray,"show_detail":false,});
            }

            for(var i=0;i<appData.gameDetailList.length;i++){
                for(var j=0;j<appData.gameDetailList[i].detail.length;j++){
                    if(appData.gameDetailList[i].detail[j].account_id==globalData.accountId){
                        appData.gameDetailList[i].my_score=appData.gameDetailList[i].detail[j].score;
                    }
                }


            }

        }
    },
};

var viewMethods = {

};


var viewStyle = {};

var appData = {
    'gameScoreList':[],
    'gameDetailList':[],
    "globalData":globalData,
    'ruleText':'',
    'ruleStartTime':'',
    'ruleEndTime':'',
    'player_array':[],
    'play_type': 1,
    'player_avatar': '',
};

//Vue方法
var methods = {
    showDetail(index){
        document.getElementById("media").play();
        appData.gameDetailList[index].show_detail=!appData.gameDetailList[index].show_detail;
    },
    gotoHall(){
        window.location.replace('roomList.html');
    }
};


//Vue生命周期
var vueLife = {
    vmCreated: function () {
        logMessage('vmCreated')
        $("#loading").hide();
        $(".main").show();
        httpModule.getScoreDetail();
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

//微信配置
wx.config({
    debug:false,
    appId:configData.appId,
    timestamp:configData.timestamp,
    nonceStr:configData.nonceStr,
    signature:configData.signature,
    jsApiList:[ "onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems" ]
});
wx.ready(function() {
    wx.hideOptionMenu();
});
wx.error(function(a) {});

function logMessage(message) {
    console.log(message);
};
