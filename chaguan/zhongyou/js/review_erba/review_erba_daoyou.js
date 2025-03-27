
var httpModule = {

    getScoreDetail: function () {

        if (globalData.scoreInfo) {

            console.log(globalData.scoreInfo);

            appData.ruleStartTime = globalData.scoreInfo.start_time;
            appData.ruleEndTime = globalData.scoreInfo.end_time;
            appData.ruleText = globalData.scoreInfo.rule_text;
          appData.fun_name = globalData.scoreInfo.fun_name;

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
                console.log("item:",item);
                var detailArray = new Array();
                var players = item.player_cards;

                for (var j = 0; j < item.player_cards.length; j++) {
                    var value = item.player_cards[j];
                    var value2 = item.card_array[j];
                    var name = value.name;
                    var score = value.score;

                    var cards = value2.c;
                    if (score > 0) {
                        score = '+' + score;
                    }
                    detailArray.push({ 
                        "name": name, 
                        "card_type": value.card_type_str,
                         "chip": value.chip,
                         "is_banker": value.is_banker,
                         "is_join": value.is_join,
                         "bet":value.my_bet,
                         "score": value.total,
                         "cards": cards
                    });
                }
                console.log("value2:",value2);
                appData.gameDetailList.push({ "gnum": item.game_num,
                 "tnum": item.total_num, "detail": detailArray});    
            }
            console.log("gameDetailList:",appData.gameDetailList);

        }
    },
};

var viewMethods = {
   
};


var viewStyle = {};

var appData = {
    'gameScoreList':[],
    'gameDetailList':[],
    'ruleText':'',
    'ruleStartTime':'',
    'ruleEndTime':'',
    'player_array':[],
    'fun_name':''
};

//Vue方法
var methods = {
    
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
