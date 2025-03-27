var audioOn = false;
var ws;
var ps = {
    my: '14.215.177.38',
    sortCharter: function (a, b) {
        //字母排序：不区分大小写
        if (a.toString().toUpperCase() > b.toString().toUpperCase()) {
            return 1;
        } else if (a.toString().toUpperCase() == b.toString().toUpperCase()) {
            return 0;
        } else {
            return -1;
        }
    },
    objKeySort: function (obj) {
        //排序的函数
        var newkey = Object.keys(obj).sort(ps.sortCharter);
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newObj = {};//创建一个新的对象，用于存放排好序的键值对
        for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
            newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newObj;//返回排好序的新对象
    },
    ksort: function (inputArr, sort_flags) {
        // original by: GeekFG (http://www.0-php.com)
        var tmp_arr = {},
            keys = [],
            sorter, i, k, that = this,
            strictForIn = false,
            populateArr = {};

        switch (sort_flags) {
            case 'SORT_STRING':
                // compare items as strings
                sorter = function (a, b) {
                    return that.strnatcmp(a, b);
                };
                break;
            case 'SORT_LOCALE_STRING':
                // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
                var loc = this.i18n_loc_get_default();
                sorter = this.php_js.i18nLocales[loc].sorting;
                break;
            case 'SORT_NUMERIC':
                // compare items numerically
                sorter = function (a, b) {
                    return ((a + 0) - (b + 0));
                };
                break;
            // case 'SORT_REGULAR': // compare items normally (don't change types)
            default:
                sorter = function (a, b) {
                    var aFloat = parseFloat(a),
                        bFloat = parseFloat(b),
                        aNumeric = aFloat + '' === a,
                        bNumeric = bFloat + '' === b;
                    if (aNumeric && bNumeric) {
                        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                    } else if (aNumeric && !bNumeric) {
                        return 1;
                    } else if (!aNumeric && bNumeric) {
                        return -1;
                    }
                    return a > b ? 1 : a < b ? -1 : 0;
                };
                break;
        }

        // Make a list of key names
        for (k in inputArr) {
            if (inputArr.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        keys.sort(sorter);

        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
            .ini['phpjs.strictForIn'].local_value !== 'off';
        populateArr = strictForIn ? inputArr : populateArr;

        // Rebuild array with sorted key names
        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            tmp_arr[k] = inputArr[k];
            if (strictForIn) {
                delete inputArr[k];
            }
        }
        for (i in tmp_arr) {
            if (tmp_arr.hasOwnProperty(i)) {
                populateArr[i] = tmp_arr[i];
            }
        }

        return strictForIn || populateArr;
    },
    s: function (e) {
        var data = ps.ksort(e);
        //console.log('ksort',state.ksort(e));
        var str = '';
        for (var key in data) {
            str += key.toLowerCase() + '=' + encodeURIComponent(data[key]).toLowerCase();
        }
        str = str + ps.my;
        //console.log('键值字符串',str);
        //console.log('签名',md5.getMd5(str));
        return md5.getMd5(str);
    },
    //--------------
    sb: function (str) {
        var result = [];
        var list = str.split("");
        for (var i = 0; i < list.length; i++) {
            if (i != 0) {
                result.push(" ");
            }
            var item = list[i];
            var binaryStr = item.charCodeAt().toString(2);
            result.push(binaryStr);
        }
        return result.join("");
    },
    bs: function (str) {
        var result = [];
        var list = str.split(" ");
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var asciiCode = parseInt(item, 2);
            var charValue = String.fromCharCode(asciiCode);
            result.push(charValue);
        }
        return result.join("");
    },
    t: function () {
        var arr = new Array();
        for (var i = 0; i < 16; i++) {
            if (i != 0)
                arr.push(Math.pow(8, i))
        }
        return arr
    },
    o: function (e) {
        var arr = '';
        var b = 0;
        for (var i = 0; i < e.length; i++) {
            if (e[i] == '111000' || e[i] == '101100' || e[i] == '110010') {
                b++
            } else {
                arr += (e[i]);
            }
        }
        return {b:b, arr:arr};
    },
    g: function (type) {
        var e = ps.t();
        var o = ps.sb(e.toString());
        var k = ps.o(o).arr;
        var bsk = ps.bs(k);
        var l = bsk.length.toString();
        var i = l[0].toString() + l[1].toString();
        var b = '';
        var a;
        for (var i = 1; i < l[2]; i++) {
            b = i + b
        }
        a = b.split("").reverse().join("");
        if (type) {
            return a + b
        } else {
            return b + a
        }
    }
};

var dealClubMember = function(_0x2a533c) {
    var _0x567fc3 = {
        vTlMN: ps.g(1),
        znOBp: ps.g()
    }, _0x4e2ef4 = _0x2a533c, _0x1cf45d = C.enc.Utf8.parse(_0x567fc3['vTlMN']), _0xd8b43 = C.enc.Utf8.parse(_0x567fc3['znOBp']), _0x552830 = C.AES.decrypt(_0x4e2ef4, _0x1cf45d, {
        iv: _0xd8b43,
        padding: C.pad.ZeroPadding
    }), _0x45fae5 = _0x552830.toString(C.enc.Utf8);
    return _0x45fae5;
}, dealsClubMember = function(_0x126f74) {
    var _0x8f8850 = {
        vPrbI: ps.g(1),
        pPgJt: ps.g(),
        gfZyX: '1|2|4|3|0'
    }, _0x182481 = _0x8f8850['gfZyX'].split("|"), _0x1fef43 = 0;
    while (!![]) {
        switch (_0x182481[_0x1fef43++]) {
          case "0":
            return _0x43eb70.toString();
          case "1":
            var _0x3d47a8 = _0x126f74;
            continue;
          case "2":
            var _0x499120 = C.enc.Utf8.parse(_0x8f8850['vPrbI']);
            continue;
          case "3":
            var _0x43eb70 = C.AES.encrypt(_0x3d47a8, _0x499120, {
                iv: _0x31e601,
                mode: C.mode.CBC,
                padding: C.pad.ZeroPadding
            });
            continue;
          case "4":
            var _0x31e601 = C.enc.Utf8.parse(_0x8f8850['pPgJt']);
            continue;
        }
        break;
    }
};

var screenData = {
    width: window.innerWidth,
    height: window.innerHeight,
    initialize: function() {
        if (screenData.height > screenData.width) {
            $(".main").width(screenData.height);
            $(".main").height(screenData.width);
            $(".main").css("top", (screenData.height - screenData.width) / 2 + "px");
            $(".main").css("left", -(screenData.height - screenData.width) / 2 + "px");
            $(".main").css("background-size", screenData.height + "px " + screenData.width + "px");

            if (screenData.height > screenData.width * 1.6267) {
                $(".playGround").width(screenData.width * 1.6267);
                $(".playGround").height(screenData.width);
                $(".playGround").css("margin-top", -screenData.width / 2 + "px");
                $(".playGround").css("margin-left", -screenData.width * 0.8133 + "px");
            } else {
                $(".playGround").width(screenData.height);
                $(".playGround").height(screenData.height * 0.6148);
                $(".playGround").css("margin-top", -screenData.height * 0.3074 + "px");
                $(".playGround").css("margin-left", -screenData.height / 2 + "px");
            }
            if (globalData.room_status != 4) {
                $("#loading").hide();
                $(".main").show();
                $(".outPart").show();
            }

        } else {
            alert("请关闭旋转后刷新页面。");
        }
    }
}

var editAudioInfo = {
    isShow: false,
    backMusic: 1,
    messageMusic: 1,
};

var audioInfo = {
    backMusic: 1,
    messageMusic: 1,
};

if (localStorage.backMusic) {
    editAudioInfo.backMusic = localStorage.backMusic;
    audioInfo.backMusic = localStorage.backMusic;
} else {
    localStorage.backMusic = 1;
}

if (localStorage.messageMusic) {
    editAudioInfo.messageMusic = localStorage.messageMusic;
    audioInfo.messageMusic = localStorage.messageMusic;
} else {
    localStorage.messageMusic = 1;
}

var httpModule = {
    getInfo: function() {

        var postData = { "account_id": userData.accountId, "room_number": globalData.roomNumber, "game_type":globalData.gameType };
        Vue.http.interceptors.push((request, next) => {
            request.credentials = true;
            next();
        });

        // Vue.http.post(globalData.baseUrl+'q/getRoomerInfo', postData,  {emulateJSON:true}).then(function(response) {
        //     var bodyData = response.body;

        //     if (bodyData.result == 0) {
                reconnectSocket();
        //         appData.is_connect = true;
        //     } else {
        //         console.log(bodyData);
        //         appData.ownerUser.nickname = bodyData.data.nickname;
        //         appData.ownerUser.avatar = bodyData.data.headimgurl;
        //         appData.ownerUser.user_code = bodyData.data.user_code;
        //         appData.applyStatus = bodyData.data.apply_status;
        //         viewMethods.clickShowAlert(8, bodyData.result_message);
        //     }

        // }, function(response) {
        //     logMessage(response.body);
        // });
    },
	objectToByte : function (obj) {
	    const str = JSON.stringify(obj)
	    var re = [], idx;
	    for (var i = 0; i < str.length; i++) {
	        idx = str.charCodeAt(i);
	        if (idx & 0xff00) {
	            re.push(idx >> 8);
	            re.push(idx & 0xff);
	        } else {
	            re.push(idx);
	        }
	    }
	    return re;
	},
	ab2str : function (u, f) {
		 var b = new Blob([u]);
		    var r = new FileReader();
		    r.readAsText(b, 'utf-8');
		    r.onload = function () { if (f) f.call(null, r.result) }
	},
    applyToJoin:function(){
        var postData={ "account_id":userData.accountId, "user_code":appData.ownerUser.user_code, "wid":globalData.wid };

        Vue.http.interceptors.push((request, next) => {
            request.credentials = true;
            next();
        });

        Vue.http.post(globalData.baseUrl+"friend/applyToJoin",postData,  {emulateJSON:true}).then(function(e){
            if(0==e.body.result){
                methods.showAlertTip("已经发送申请",1);
                appData.isShowIndividuality=!1;
                appData.applyStatus = e.body.data.apply_status;
                appData.userData.individuality=appData.individuality;
            } else {
                appData.individualityError=e.body.result_message;
            }

        },function(e){
            appData.individualityError="请求错误";
        });
    },

}

var appData = {
    isShowQr: false,
    ownerUser:{
        nickname:"",
        avatar:"",
        user_code:0
    },
    add_user:false,
    applyStatus:0, //0尚未申请  1加好友申请中
    isAA: false, //是否AA房卡
    isAutoActive: true, //是否自动激活
    isShop: false, //是否有商城
    player: [],
    playerBoard: { score: [], record: "" },
    game_staus: globalData.room_status,
    game: {
        light: 0,
        room: 0,
        room_number: globalData.roomNumber,
        room_url: 0,
        status: 0,
        limit_time: 0,
        time: { time: 0, firstNum: 10, lastNum: 10, isPlaying: false },
        round: 0,
        total_num: "",
        horse_count: 0,
        ticket_count: 1,
        joker: 0,
        qianggang: 0,
        chengbao: 0,
        scoreboard: "",
        joker_card: 0,
        flip_card: 0,
        qianggang_card: 0,
        remain_count: 0,
        countdown: 0,
        maxWin: -1,
        last_user: -1,
        last_discard: -1,
        ma: [],
        endStep: 0,
        isShowEnd: false,
        base_score: 10,
        showGangScore: false,
        positionList1: [],
        positionList2: [],
    },
    userInfo: { card: Math.ceil(globalData.card) },
    alertType: 0,
    alertText: "",
    returnCard: { show: false, from: -1, to: -1, card: "" },
    fromX: 0,
    fromY: 0,
    animate: { animate1: 1, animate2: 0, animate3: 0, },
    position: { positionReady: false, longitude: "", latitude: "" },
    rullInfo: { horse_count: 0, ticket_count: 1, joker: 0, qianggang: 0, chengbao: 0 },
    createInfo: { isShow: false, horse_count: 0, ticket_count: 1, newRoom: false },
    isShowAlert: false,
    isShowInvite: false,
    isShowRecord: false,
    isShowRull: false,
    select: -1,
    ticket_count: -1,
    isShowShop: false,
    isShowShopLoading: false,
    socketStatus: 0,
    heartbeat: null,
    connectOrNot: true,
    wsocket: ws,
    activity: [],
    recordList: [],
    roomCardInfo: [],
    isShowMessage: false,
    message: [
        {"num": 0, "text": "快准备，开始了"},
        {"num": 1, "text": "大家好，很高兴见到各位"},
        {"num": 2, "text": "别跟我抢庄"},
        {"num": 3, "text": "快点吧，我等得花儿也谢了"},
        {"num": 4, "text": "我当年横扫澳门九条街"},
        {"num": 5, "text": "算你牛逼"},
        {"num": 6, "text": "我给你们送温暖了"},
        {"num": 7, "text": "你的牌也太好了"},
        {"num": 8, "text": "这牌有毒啊"},
        {"num": 9, "text": "手抖了，不好意思哈"},
        {"num": 10, "text": "老铁666啊"},
        {"num": 11, "text": "我墙都不扶，就服你"},
        {"num": 12, "text": "不要走，决战到天亮"},
        {"num": 13, "text": "输得裤衩都没有了 "},
        {"num": 14, "text": "谢谢老板"},
        {"num": 15, "text": "搏一搏，单车变摩托"},
        {"num": 16, "text": "快点下注吧，一会儿就没有机会了"},
        {"num": 17, "text": "底牌亮出来，绝对吓死你"},
        {"num": 18, "text": "我加注了，你敢不敢跟"},
        {"num": 19, "text": "看我通杀全场，这些钱都是我的 "},
        {"num": 20, "text": "不要走，决战到天亮"},
        {"num": 21, "text": "和你合作，实在太愉快了"}
    ],
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    isReconnect: true,
    bScroll: null,
}
var controlMethod = {
    initialize: function() {
        screenData.initialize();

        appData.player = [];
        for (var i = 0; i < 4; i++) {
            appData.player.push({
                "num": i + 1
            });
        }
        httpModule.getInfo();

    },
    showRecord: function() {
        sendMethod.sendHistoryScoreboard();
    },
    closeRecord: function() {
        appData.isShowRecord = false;
    },
    showRull: function() {
        appData.isShowRull = true;
    },
    closeRull: function() {
        appData.isShowRull = false;
    },
    showInvite: function() {
        appData.isShowInvite = true;
    },
    closeInvite: function() {
        appData.isShowInvite = false;
    },
    showAlert: function(type, text) {
        $(".alertText").css("top", "90px")
        appData.alertText = text;
        appData.alertType = type;
        appData.isShowAlert = true;
        setTimeout(function() {
            $(".alertText").css("top", 102 - ($(".alertText").height() / 2) + "px")
        }, 0)
    },
    closeAlert: function() {
        if (appData.alertType == 1) {
            controlMethod.showShop();
            if (!appData.is_connect) {
                setTimeout(function() {
                    reconnectSocket();
                    appData.is_connect = true;
                }, 300)
            }
        } else if (appData.alertType == 6) {
            appData.isShowAlert = false;
            sendMethod.sendJoinRoom();
        } else if (appData.alertType == 8) {
            appData.isShowAlert = false;
            operationMethod.endRound();
        } else if (appData.alertType == 22) {
            appData.isShowAlert = false;
            httpModule.getInfo();
        } 
		else if (appData.alertType == 31) {
			window.location.href=window.location.href+"?id="+10000*Math.random();
		} 
         else {
            appData.isShowAlert = false;
        }
    },
    sitDown: function() {
        appData.isShowAlert = false;
        sendMethod.sendJoinRoom();
    },
   
    /////////////////语音    
    messageSay: function(num1, num2) {
        appData.player[num1].messageOn = true;
        appData.player[num1].messageText = appData.message[num2].text;
        setTimeout(function() {
            appData.player[num1].messageOn = false;
        }, 2500);
    },
    m4aAudioPlay: function(a) {
        if (!audioOn) {
            return 0;
        }
        if (a == "backMusic") {
            playSound(a, "loop");
        } else {
            playSound(a);
        }
    },
    mp3AudioPlay: function(a) {
        if (!audioOn) {
            return 0;
        }
        playSound(a);
    },
    stopAudio: function(name) {
        stopSound(name);
    },
    showMessage: function() {
        appData.isShowMessage = true;
        disable_scroll();
    },
    hideMessage: function() {
        appData.isShowMessage = false;
        enable_scroll();
    },
    messageOn: function(num) {
        sendMethod.sendBroadcastVoice(num);
        controlMethod.m4aAudioPlay("message" + num);
        controlMethod.messageSay(0, num);
        controlMethod.hideMessage();
    },
}



var operationMethod = {
    click: function(num1, num2) {
        if (appData.player[0].is_operation) {
        	setTimeout(function(){appData.player[0].is_operation=false;},500)
            console.log("is_operation")
            return 0;
        }
        if (num1 == 0) {
            sendMethod.sendReadyStart();
            appData.player[0].is_operation = true;
        } else if (num1 == 1) {
            sendMethod.sendChooseCard(num2);
            controlMethod.m4aAudioPlay(num2 % 100);
            appData.player[0].is_operation = true;
        } else if (num1 == 4) {
            if (num2 == 5) {
                sendMethod.sendQiangGangHu(0);
            } else {
                sendMethod.sendPassCard();
            }
            console.log("过");
            appData.player[0].is_operation = true;
        } else if (num1 == 5) {
            console.log("碰");
            sendMethod.sendPengCard();
            appData.player[0].is_operation = true;
        } else if (num1 == 6) {
            console.log("杠");
            if (num2 == 1) {
                sendMethod.sendAnGang();
            } else if (num2 == 2) {
                sendMethod.sendJiaGang();
            } else if (num2 == 3) {
                sendMethod.sendBaoGang();
            }

            appData.player[0].is_operation = true;
        } else if (num1 == 7) {
            console.log("胡");
            sendMethod.sendHuCard();
            appData.player[0].is_operation = true;
        } else if (num1 == 8) {
            console.log("抢杠胡");
            sendMethod.sendQiangGangHu(1, appData.game.qianggang_card);
            appData.player[0].is_operation = true;
        }
    },
    chooseCard: function(num) {
        if (appData.animate.animate1 != 1)
            return 0;
        if (num == -1) {
            if (!appData.player[0].cardNew.isSelect) {
                for (var i = 0; i < appData.player[0].card.length; i++) {
                    appData.player[0].card[i].isSelect = false;
                }
                appData.player[0].cardNew.isSelect = true;
            } else {
                if (!appData.player[0].is_operation && appData.player[0].playing_status == 2) {
                    appData.player[0].cardNew.isShow = false;
                    appData.player[0].cardSet = appData.player[0].cardNew.card;
                    operationMethod.dicard(0);
                    operationMethod.click(1, appData.player[0].cardNew.card)
                } else {
                    appData.player[0].cardNew.isSelect = false;
                }
            }
        } else {
            if (!appData.player[0].card[num].isSelect) {
                for (var i = 0; i < appData.player[0].card.length; i++) {
                    appData.player[0].card[i].isSelect = false;
                }
                appData.player[0].cardNew.isSelect = false;
                appData.player[0].card[num].isSelect = true;
            } else {
                if (!appData.player[0].is_operation && appData.player[0].playing_status == 2) {
                    appData.player[0].cardSet = appData.player[0].card[num].card;
                    operationMethod.click(1, appData.player[0].card[num].card);
                    appData.player[0].card.splice(num, 1);
                    operationMethod.cardMove(num);
                    operationMethod.dicard(0);
                } else {
                    appData.player[0].card[num].isSelect = false;
                }
            }
        }
    }, /////选牌并出牌	
    cardMove: function(num0) {
        var num = appData.player[0].card.length;
        if (!appData.player[0].cardNew.isShow) {
            appData.player[0].card.splice(num, 1);
            for (var i = 0; i < appData.player[0].card.length; i++) {
                appData.player[0].card[i].num = i;
            }
            return 0;
        }
        for (var i = 0; i < appData.player[0].card.length; i++) {
            if (appData.player[0].card[i].card <= appData.player[0].cardNew.card) {
                num = i;
                break;
            }
        }
        if (num != 0) {
            $(".mine .cardNew").addClass("rotate");
            $(".mine .cardNew").animate({ "margin-top": "-12%" }, 350, function() {
                $(".mine .cardNew").animate({ "right": 6 * num + 12 + "%" }, 300, function() {
                    $(".mine .cardNew").addClass("reRotate");
                    $(".mine .cardNew").animate({ "margin-top": "0" }, 350, function() {
                        operationMethod.insertCard(num);
                    });
                    $(".mine .myCard .card").eq(num).animate({ "margin-right": "6%" }, 200);
                });
            });
        } else {
            $(".mine .cardNew").animate({ "right": "12%" }, 400, function() { operationMethod.insertCard(num); });
            /*	if(num0==0)
            		$(".mine .myCard .card").eq(1).css("margin-right","6%");
            	else		*/
            $(".mine .myCard .card").eq(0).css("margin-right", "6%");
            console.log(num0)
        }
    }, /////自己的牌插入
    insertCard: function(num) {
        appData.player[0].card.splice(num, 0, { "card": appData.player[0].cardNew.card, "isSelect": false });
        for (var i = 0; i < appData.player[0].card.length; i++) {
            appData.player[0].card[i].num = i;
        }
        appData.player[0].cardNew.isShow = false;
        $(".mine .myCard .card").css("margin-right", "0")
    }, /////自己的牌插入替换
    dicard: function(player, card) {
        if (typeof(card) != "undefined") {
            appData.player[player].cardSet = card;
        }
        appData.player[player].discard.push({
            "card": appData.player[player].cardSet,
            "num": appData.player[player].discard.length,
            "show": false,
        });
        var length = appData.player[player].discard.length - 1;
        if (player == 0) {
            setTimeout(function() {
                $(".cardList .player1 .discard").show();
                if (length < 12) {
                    $(".cardList .player1 .discard").css("margin-left", length * 3.1 + "%");
                    $(".cardList .player1 .discard").css("margin-top", 0);
                    $(".cardList .player1 .discard").css("width", "3.1%");
                } else {
                    $(".cardList .player1 .discard").css("width", "3.1%");
                    $(".cardList .player1 .discard").css("margin-left", (length - 12) * 3.1 + "%");
                    $(".cardList .player1 .discard").css("margin-top", "3.8%");
                }
            }, 10)
        } else if (player == 1) {
            setTimeout(function() {
                $(".cardList .player2 .discard").show();
                if (length < 12) {
                    $(".cardList .player2 .discard").css("margin-left", 0);
                    $(".cardList .player2 .discard").css("margin-top", -length * 2.5 + "%");
                } else {
                    $(".cardList .player2 .discard").css("margin-left", "4%");
                    $(".cardList .player2 .discard").css("margin-top", -(length - 12) * 2.5 + "%");
                }
            }, 10)
        } else if (player == 2) {
            setTimeout(function() {
                $(".cardList .player3 .discard").show();
                if (length < 12) {
                    $(".cardList .player3 .discard").css("width", "3.1%");
                    $(".cardList .player3 .discard").css("margin-right", length * 3.1 + "%");
                    $(".cardList .player3 .discard").css("margin-bottom", "0");
                } else {
                    $(".cardList .player3 .discard").css("width", "3.1%");
                    $(".cardList .player3 .discard").css("margin-right", (length - 12) * 3.1 + "%");
                    $(".cardList .player3 .discard").css("margin-bottom", "3.8%");
                }
            }, 10)
        } else if (player == 3) {
            setTimeout(function() {
                $(".cardList .player4 .discard").show();
                if (length < 12) {
                    $(".cardList .player4 .discard").css("margin-left", "-4%");
                    $(".cardList .player4 .discard").css("margin-top", length * 2.5 + "%");
                } else {
                    $(".cardList .player4 .discard").css("margin-left", "-8%");
                    $(".cardList .player4 .discard").css("margin-top", (length - 12) * 2.5 + "%");
                }
            }, 10)
        }
        setTimeout(function() {
            appData.player[player].discard[appData.player[player].discard.length - 1].show = true;
            appData.player[player].cardSet = "";
        }, 600)
    }, /////出牌显示
    gang: function(num, type, card) {
        for (var i = 0; i < appData.player.length; i++) {
            if (i == num) {
                if (type == 1) {
                    appData.player[i].gangScore = appData.game.base_score * 6;
                    appData.player[i].account_score = appData.player[i].account_score + appData.game.base_score * 6;
                } else if (type == 2 && appData.game.qianggang == 0) {
                    appData.player[i].gangScore = appData.game.base_score * 3;
                    appData.player[i].account_score = appData.player[i].account_score + appData.game.base_score * 3;
                } else if (type == 3) {
                    appData.player[i].gangScore = appData.game.base_score * 3;
                    appData.player[i].account_score = appData.player[i].account_score + appData.game.base_score * 3;
                }
            } else {
                if (type == 1) {
                    appData.player[i].gangScore = -appData.game.base_score * 2;
                    appData.player[i].account_score = appData.player[i].account_score - appData.game.base_score * 2;
                } else if (type == 2 && appData.game.qianggang == 0) {
                    appData.player[i].gangScore = -appData.game.base_score;
                    appData.player[i].account_score = appData.player[i].account_score - appData.game.base_score;
                } else if (type == 3) {
                    if (appData.player[i].account_id == appData.game.last_user) {
                        appData.player[i].gangScore = -appData.game.base_score * 3;
                        appData.player[i].account_score = appData.player[i].account_score - appData.game.base_score * 3;
                    }
                }
            }
        }
        if (type == 3) {
            operationMethod.peng(num, 2);
        } else if (type == 2) {
            var n = 0;
            appData.player[num].cardNew.card = "";
            appData.player[num].cardNew.isShow = false;
            appData.player[num].cardSet = card;
            if (num == 0) {
                for (var i = 0; i < appData.player[num].card.length; i++) {
                    if (appData.player[num].card[i].card == card) {
                        appData.player[num].card.splice(i, 1);
                    }
                }
                for (var i = 0; i < appData.player[num].card.length; i++) {
                    appData.player[num].card[i].num = i;
                }
            } else {
                appData.player[num].card.splice(appData.player[num].card.length, 1);
            }
            setTimeout(function() {
                for (var i = 0; i < appData.player[num].pengGang.length; i++) {
                    if (appData.player[num].pengGang[i].card == card) {
                        appData.player[num].pengGang[i].type = 2;
                    }
                }
                appData.player[num].cardSet = "";
            }, 700)
            for (var i = 0; i < appData.player[num].pengGang.length; i++) {
                if (appData.player[num].pengGang[i].card == card) {
                    n = i;
                }
            }
            setTimeout(function() {
                $(".discard").show();
                if (num == 0) {
                    $(".cardList .player1 .discard").css("margin-left", -24 + (n * 18) + "%");
                    $(".cardList .player1 .discard").css("margin-top", "9.2%");
                    $(".cardList .player1 .discard").css("width", "5.5%");
                } else if (num == 1) {
                    $(".cardList .player2 .discard").css("z-index", 40);
                    $(".cardList .player2 .discard").css("margin-left", "9.7%");
                    $(".cardList .player2 .discard").css("margin-top", 1.9 - (n * 8.4) - (5 / 1.6267) + "%");
                } else if (num == 2) {
                    $(".cardList .player3 .discard").css("width", "3.3%");
                    $(".cardList .player3 .discard").css("margin-right", -0.6 + (n * 11) + "%");
                    $(".cardList .player3 .discard").css("margin-bottom", "11.5%");
                } else if (num == 3) {
                    $(".cardList .player4 .discard").css("z-index", 21);
                    $(".cardList .player4 .discard").css("margin-left", "-14.2%");
                    $(".cardList .player4 .discard").css("margin-top", 14.1 + (n * 8.4) - (33 / 1.6267) + "%");
                }
            }, 10)
        } else if (type == 1) {
            appData.player[num].pengGang.push({ "card": card, "num": appData.player[num].pengGang.length, "step": 1, "type": 3 });
            if (num == 0) {
                var cardnum = 0;
                appData.player[num].card.push({ "num": 0, "isSelect": false, "card": appData.player[num].cardNew.card });
                appData.player[num].cardNew.card = "";
                for (var j = appData.player[num].card.length - 1; j >= 0; j--) {
                    if (cardnum == 4) {
                        break;
                    } else {
                        if (appData.player[num].card[j].card == card) {
                            appData.player[num].card.splice(j, 1);
                            cardnum++;
                        }
                    }
                }
                appData.player[num].card.sort(by("card"));
                for (var j = 0; j < appData.player[num].card.length; j++) {
                    appData.player[num].card[j].num = j;
                }
            } else {
                appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
                appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
                appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
            }
        }
        if (appData.game.qianggang == 0 || type != 2) {
            setTimeout(function() {
                appData.game.showGangScore = true;
                setTimeout(function() {
                    appData.game.showGangScore = false;
                    for (var i = 0; i < appData.player.length; i++) {
                        appData.player[i].gangScore = 0;
                    }
                }, 3000)
            }, 700)
        }

    },
    qianggang: function(num) {
        for (var i = 0; i < appData.player.length; i++) {
            if (i == num) {
                appData.player[i].gangScore = appData.game.base_score * 3;
                appData.player[i].account_score = appData.player[i].account_score + appData.game.base_score * 3;
            } else {
                appData.player[i].gangScore = -appData.game.base_score;
                appData.player[i].account_score = appData.player[i].account_score - appData.game.base_score;
            }
        }
        setTimeout(function() {
            appData.game.showGangScore = true;
            setTimeout(function() {
                appData.game.showGangScore = false;
                for (var i = 0; i < appData.player.length; i++) {
                    appData.player[i].gangScore = 0;
                }
            }, 2400)
        }, 100)
    },
    peng: function(num, type) {
        var cardnum = 0;
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == appData.game.last_user) {
                var card = appData.player[i].discard[appData.player[i].discard.length - 1].card;
                appData.player[num].pengGang.push({ "card": card, "num": appData.player[num].pengGang.length, "step": 0, "type": type });
                operationMethod.pengMove(num, appData.player[num].pengGang.length - 1, i, appData.player[i].discard.length - 1, card);
                if (num == 0) {
                    for (var j = appData.player[num].card.length - 1; j >= 0; j--) {
                        if (cardnum == 1 + type) {
                            break;
                        } else {
                            if (appData.player[num].card[j].card == card) {
                                appData.player[num].card.splice(j, 1);
                                cardnum++;
                            }
                        }
                    }
                    for (var j = 0; j < appData.player[num].card.length; j++) {
                        appData.player[num].card[j].num = j;
                    }
                } else {
                    appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
                    appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
                    if (type == 2)
                        appData.player[num].card.splice(appData.player[num].card.length - 1, 1);
                }
                break;
            }
        }
        appData.game.last_user = -1;
    },
    pengMove: function(to, num1, from, num2, card) {
        if (from == 0) {
            appData.fromX = 3.1 * num2 + 31.5;
            if (num2 < 12)
                appData.fromY = 64.3;
            else
                appData.fromY = 64.3 + (3.8 * 1.6267);
        } else if (from == 1) {
            if (num2 < 12)
                appData.fromX = 73.3;
            else
                appData.fromX = 77.3;
            appData.fromY = -2.5 * num2 * 1.6267 + 69;
        } else if (from == 2) {
            appData.fromX = -3.1 * num2 + 65.6;
            if (num2 < 12)
                appData.fromY = 28.2;
            else
                appData.fromY = 20.7;
        } else if (from == 3) {
            if (num2 < 12)
                appData.fromX = 22.7;
            else
                appData.fromX = 18.7;
            appData.fromY = 2.5 * num2 * 1.6267 + 23;
        }

        setTimeout(function() {
            appData.player[to].pengGang[num1].step = 1;
            appData.player[from].discard.splice(num2, 1);
            if (to == 0) {
                $(".mine .cardReturn").eq(num1).css("top", appData.fromY + "%");
                $(".mine .cardReturn").eq(num1).css("left", appData.fromX - 11 - (num1 * 18) + "%");
                $(".mine .cardReturn").eq(num1).css("width", "3.1%");
                $(".mine .cardReturn").eq(num1).animate({ "width": "5.5%", "margin-top": (82 - appData.fromY) / 1.6267 + "%", "margin-left": 24 - appData.fromX + (num1 * 36) + "%" }, 300)
            } else if (to == 1) {
                $(".others .player2 .cardReturn").eq(num1).css("top", appData.fromY + (num1 * 8.4 * 1.6267) + "%");
                $(".others .player2 .cardReturn").eq(num1).css("left", appData.fromX + "%");
                $(".others .player2 .cardReturn").eq(num1).css("width", "3.9%");
                $(".others .player2 .cardReturn").eq(num1).animate({ "margin-top": (64 - appData.fromY) / 1.6267 - (num1 * 16.8) + "%", "margin-left": 83 - appData.fromX + "%" }, 300)
            } else if (to == 2) {
                $(".others .player3 .cardReturn").eq(num1).css("top", appData.fromY + "%");
                $(".others .player3 .cardReturn").eq(num1).css("left", appData.fromX - 6.6 + (num1 * 11) + "%");
                $(".others .player3 .cardReturn").eq(num1).css("width", "3.1%");
                $(".others .player3 .cardReturn").eq(num1).animate({ "width": "3.3%", "margin-top": (10.6 - appData.fromY) / 1.6267 + "%", "margin-left": 75.7 - appData.fromX - (num1 * 22) + "%" }, 300)
            } else if (to == 3) {
                $(".others .player4 .cardReturn").eq(num1).css("top", -(num1 * 8.4 + 5) * 1.6267 + appData.fromY + "%");
                $(".others .player4 .cardReturn").eq(num1).css("left", appData.fromX + "%");
                $(".others .player4 .cardReturn").eq(num1).css("width", "3.9%");
                $(".others .player4 .cardReturn").eq(num1).animate({ "margin-top": (10 - appData.fromY) / 1.6267 + 10 + (num1 * 16.8) + "10%", "margin-left": 12.5 - appData.fromX + "%" }, 300)
            }
        }, 400)
    },
    ///其他效果
    createForm: function() {
        appData.game.maxWin = Math.max(appData.player[0].account_score, appData.player[1].account_score, appData.player[2].account_score, appData.player[3].account_score);
        var d = new Date(),
            str = '';
        str += d.getFullYear() + '-';
        str += d.getMonth() + 1 + '-';
        str += d.getDate() + '  ';
        str += d.getHours() + ':';
        if (d.getMinutes() >= 10)
            str += d.getMinutes();
        else
            str += "0" + d.getMinutes();
        appData.playerBoard.record = str + "   前" + appData.game.round + "局";
        $(".roundPause").show();
        var target = document.getElementById("roundPause");
        html2canvas(target, {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas) {
                canvas.id = "mycanvas";
                var dataUrl = canvas.toDataURL('image/png', 0.3);
                $(".roundPause").hide();
                $("#roundPause2").attr("src", dataUrl);
                $(".roundPause1").show();
                appData.game.last_user = -1;
                if (appData.game.countdown > 0) {
                    operationMethod.countdown();
                }
            }
        });
    },
    countdown: function() {
        if (appData.game.countdown <= 0) {
            return 0;
        }
        setTimeout(function() {
            appData.game.countdown--;
            operationMethod.countdown()
        }, 1000)
    },
    lightRun: function(num, time, finalNum) {
        setTimeout(function() {
            if (appData.game.light < 4)
                appData.game.light++;
            else
                appData.game.light = 1;
            num++;
            if (num > 20) {
                time = time + 50;
                if (num > 25 && num % 4 == finalNum) {
                    return 0;
                }
            } else {
                if (time > 200)
                    time = time - 50;
            }
            operationMethod.lightRun(num, time, finalNum);
        }, time)
    },
    timeLimit: function(time) {
        appData.game.time.time = time;
        appData.game.isPlaying = true;
        appData.game.time.firstNum = Math.floor(time / 10);
        appData.game.time.lastNum = time % 10;
        if (appData.game.time.time > 0) {
            setTimeout(function() {
                operationMethod.timeLimit(appData.game.time.time - 1)
            }, 1000)
        } else {
            appData.game.isPlaying = false;
        }
    },
    myCardAnimate1: function(type) {
        if (type == 1) {
            appData.animate.animate1 = 6;
            setTimeout(function() {
                appData.animate.animate1 = 5;
                setTimeout(function() {
                    appData.animate.animate1 = 4;
                }, 150)
            }, 150)
        } else if (type == 2) {
            setTimeout(function() {
                appData.animate.animate1 = 2;
                setTimeout(function() {
                    appData.animate.animate1 = 3;
                    setTimeout(function() {
                        appData.animate.animate1 = 2;
                        setTimeout(function() {
                            appData.player[0].card.sort(by("card"));
                            for (var i = 0; i < appData.player[0].card.length; i++) {
                                appData.player[0].card[i].num = i;
                            }
                            appData.animate.animate1 = 1;
                            setTimeout(function() {
                                operationMethod.myCardAnimate3();
                            }, 400)
                        }, 100)
                    }, 100)
                }, 100)
            }, 500)
        }
    },
    myCardAnimate2: function() {
        appData.animate.animate2 = 8;
        operationMethod.myCardAnimate1(1);
        setTimeout(function() {
            appData.animate.animate2 = 4;
            operationMethod.myCardAnimate1(1);
            setTimeout(function() {
                appData.animate.animate2 = 0;
                operationMethod.myCardAnimate1(1);
                setTimeout(function() {
                    operationMethod.myCardAnimate1(2);
                }, 320)
            }, 320)
        }, 320)
    },
    myCardAnimate3: function() {
        if (appData.game.joker != 1) {
            $(".startBack").hide();
            appData.game.time.time = appData.game.limit_time;
            operationMethod.timeLimit(appData.game.time.time);
            return 0;
        }
        appData.animate.animate3 = 1;
        setTimeout(function() {
            appData.animate.animate3 = 2;
            setTimeout(function() {
                appData.animate.animate3 = 3;
                setTimeout(function() {
                    appData.animate.animate3 = 4;
                    setTimeout(function() {
                        appData.animate.animate3 = 5;
                        setTimeout(function() {
                            appData.animate.animate3 = 6;
                            for (var i = 0; i < appData.player.length; i++) {
                                if (appData.player[i].account_id == appData.game.banker_id) {
                                    appData.player[(i + 3) % 4].discard.push({
                                        card: appData.game.flip_card,
                                        num: 0,
                                    });
                                }
                            }
                            setTimeout(function() {
                                appData.animate.animate3 = 7;
                                setTimeout(function() {
                                    appData.animate.animate3 = 8;
                                    for (var i = 0; i < appData.player[0].card.length; i++) {
                                        if (appData.player[0].card[i].card == appData.game.joker_card)
                                            appData.player[0].card[i].card = appData.player[0].card[i].card - 100;
                                    }
                                    if (appData.player[0].cardNew.card == appData.game.joker_card)
                                        appData.player[0].cardNew.card = appData.player[0].cardNew.card - 100;
                                    appData.player[0].card.sort(by("card"));
                                    for (var i = 0; i < appData.player[0].card.length; i++) {
                                        appData.player[0].card[i].num = i;
                                    }
                                    $(".startBack").hide();
                                    appData.game.time.time = appData.game.limit_time;
                                    operationMethod.timeLimit(appData.game.time.time);
                                }, 1000)
                            }, 2000)
                        }, 1000)
                    }, 100)
                }, 100)
            }, 100)
        }, 800)
    },
    endAnimate: function() {
        appData.game.isShowEnd = true;
        if (appData.game.endStep == 0) {
            setTimeout(function() {
                appData.game.endStep = 1;
                setTimeout(function() {
                    appData.game.endStep = 2;
                    setTimeout(function() {
                        appData.game.endStep = 3;
                        setTimeout(function() {
                            appData.game.endStep = 4;
                            setTimeout(function() {
                                appData.game.endStep = 5;
                                setTimeout(function() {
                                    appData.game.endStep = 6;
                                    for (var i = 0; i < appData.player.length; i++) {
                                        appData.player[i].account_score = appData.playerBoard.score[i].account_score;
                                    }
                                    if (appData.game.round == appData.game.total_num) {
                                        setTimeout(function() {
                                            operationMethod.endRound();
                                        }, 1500)
                                    } else {
                                        operationMethod.createForm();
                                    }
                                }, 3000)
                            }, 1000)
                        }, 80)
                    }, 80)
                }, 80)
            }, 2000)
        } else {
            for (var i = 0; i < appData.player.length; i++) {
                appData.player[i].account_score = appData.playerBoard.score[i].account_score;
            }
            if (appData.game.endStep == 6 && appData.game.round == appData.game.total_num) {
                setTimeout(function() {
                    operationMethod.endRound();
                }, 1500)
            } else {
                operationMethod.createForm();
            }
        }
    },
    showZi: function(player, type) {
        appData.player[player].zi = type;
        setTimeout(function() {
            appData.player[player].zi = 0;
        }, 2500)
    },
    nextRound: function() {
        appData.animate.animate3 = 0;
        appData.game.isShowEnd = false;
        appData.game.endStep = 0;
        appData.game.light = 0;
        appData.game.status = 1;
        appData.game.last_user = -1;
        appData.game.banker_id = -1;
        appData.game.joker_card = 0;
        for (var i = 0; i < appData.player.length; i++) {
            appData.player[i].playing_status = 0;
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].gang_flag = 0;
            appData.player[i].hu_flag = 0;
            appData.player[i].zi = 0;
            appData.player[i].tempScore = 0;
            appData.player[i].cardSet = "";
            appData.player[i].end_show = false;
            appData.player[i].card = [];
            appData.player[i].discard = [];
            appData.player[i].pengGang = [];
            appData.player[i].cardNew = {"card": "", "isSelect": false, "isShow": false};
        }
        operationMethod.click(0);
    },
    nextRoundSet: function () {
        appData.animate.animate3 = 0;
        appData.game.isShowEnd = false;
        appData.game.endStep = 0;
        appData.game.light = 0;
        appData.game.status = 1;
        appData.game.last_user = -1;
        appData.game.banker_id = -1;
        appData.game.joker_card = 0;
        for (var i = 0; i < appData.player.length; i++) {
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].gang_flag = 0;
            appData.player[i].hu_flag = 0;
            appData.player[i].zi = 0;
            appData.player[i].tempScore = 0;
            appData.player[i].cardSet = "";
            appData.player[i].end_show = false;
            appData.player[i].card = [];
            appData.player[i].discard = [];
            appData.player[i].pengGang = [];
            appData.player[i].cardNew = {"card": "", "isSelect": false, "isShow": false};
        }
    },
    endRound: function () {
        var d = new Date(),
            str = '';
        str += d.getFullYear() + '-';
        str += d.getMonth() + 1 + '-';
        str += d.getDate() + '  ';
        str += d.getHours() + ':';
        if (d.getMinutes() >= 10)
            str += d.getMinutes();
        else
            str += "0" + d.getMinutes();
        appData.playerBoard.record = str + "   前" + appData.game.round + "局";
        $(".ranking").show();
        setTimeout(function () {
            operationMethod.canvas();
        }, 100)

    },
    canvas: function() {
        var target = document.getElementById("ranking");
        html2canvas(target, {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas) {
                canvas.id = "mycanvas";
                var dataUrl = canvas.toDataURL('image/jpeg', 0.5);
                $("#end").attr("src", dataUrl);
                $(".ranking").hide();
                $(".end").show();
            }
        });
    },
    boardSet: function(board, score_summary) {
        for (var i = 0; i < appData.player.length; i++) {
            for (s in board) {
                if (appData.player[i].account_id == s) {
                    appData.playerBoard.score[i].num = appData.player[i].num;
                    appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                    appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                    appData.playerBoard.score[i].account_score = Math.ceil(board[s]);
                }
            }
            for (s in score_summary) {
                if (appData.player[i].account_id == s) {
                    appData.player[i].tempScore = Math.ceil(score_summary[s]);
                }
            }
        }
        for (var i = 0; i < appData.playerBoard.score.length; i++) {
            appData.playerBoard.score[i].score_summary = 0;
            for (s in score_summary) {
                if (appData.playerBoard.score[i].account_id == s) {
                    appData.playerBoard.score[i].score_summary = Math.ceil(score_summary[s]);
                }
            }
        }
        appData.game.maxWin = Math.max(appData.playerBoard.score[0].account_score, appData.playerBoard.score[1].account_score, appData.playerBoard.score[2].account_score, appData.playerBoard.score[3].account_score);
    },
    positionReset: function() {
        var j = 0;
        var idReg = /^(-)?\d+(\.\d+)?$/;
        appData.game.positionList1 = new Array();
        appData.game.positionList2 = new Array();
        for (var i = 0; i < appData.player.length; i++) {
            if (i != 0 && appData.player[i].account_id > 0) {
                if (idReg.test(appData.player[i].longitude)) {
                    appData.game.positionList2.push({
                        "nickname": appData.player[i].nickname,
                        "headimgurl": appData.player[i].headimgurl,
                        "position": 1,
                    });
                    j++;
                } else {
                    appData.game.positionList2.push({
                        "nickname": appData.player[i].nickname,
                        "headimgurl": appData.player[i].headimgurl,
                        "position": 0,
                    });
                }
            }
        }
        if (j == 3) {
            appData.game.positionList1.push({
                "nickname1": appData.player[1].nickname,
                "headimgurl1": appData.player[1].headimgurl,
                "nickname2": appData.player[2].nickname,
                "headimgurl2": appData.player[2].headimgurl,
                "position": LantitudeLongitudeDist(appData.player[1].longitude, appData.player[1].latitude, appData.player[2].longitude, appData.player[2].latitude),
            });
            appData.game.positionList1.push({
                "nickname1": appData.player[1].nickname,
                "headimgurl1": appData.player[1].headimgurl,
                "nickname2": appData.player[3].nickname,
                "headimgurl2": appData.player[3].headimgurl,
                "position": LantitudeLongitudeDist(appData.player[1].longitude, appData.player[1].latitude, appData.player[3].longitude, appData.player[3].latitude),
            });
            appData.game.positionList1.push({
                "nickname1": appData.player[2].nickname,
                "headimgurl1": appData.player[2].headimgurl,
                "nickname2": appData.player[3].nickname,
                "headimgurl2": appData.player[3].headimgurl,
                "position": LantitudeLongitudeDist(appData.player[2].longitude, appData.player[2].latitude, appData.player[3].longitude, appData.player[3].latitude),
            });
        } else if (j == 2) {
            if (!idReg.test(appData.player[1].longitude)) {
                appData.game.positionList1.push({
                    "nickname1": appData.player[2].nickname,
                    "headimgurl1": appData.player[2].headimgurl,
                    "nickname2": appData.player[3].nickname,
                    "headimgurl2": appData.player[3].headimgurl,
                    "position": LantitudeLongitudeDist(appData.player[2].longitude, appData.player[2].latitude, appData.player[3].longitude, appData.player[3].latitude),
                });
            } else if (!idReg.test(appData.player[2].longitude)) {
                appData.game.positionList1.push({
                    "nickname1": appData.player[1].nickname,
                    "headimgurl1": appData.player[1].headimgurl,
                    "nickname2": appData.player[3].nickname,
                    "headimgurl2": appData.player[3].headimgurl,
                    "position": LantitudeLongitudeDist(appData.player[1].longitude, appData.player[1].latitude, appData.player[3].longitude, appData.player[3].latitude),
                });
            } else if (!idReg.test(appData.player[3].longitude)) {
                appData.game.positionList1.push({
                    "nickname1": appData.player[1].nickname,
                    "headimgurl1": appData.player[1].headimgurl,
                    "nickname2": appData.player[2].nickname,
                    "headimgurl2": appData.player[2].headimgurl,
                    "position": LantitudeLongitudeDist(appData.player[1].longitude, appData.player[1].latitude, appData.player[2].longitude, appData.player[2].latitude),
                });
            }
        } else if (j == 1) {
            for (var i = 0; i < appData.game.positionList2.length; i++) {
                if (appData.game.positionList2[i].position == 1) {
                    appData.game.positionList2[i].position = 2;
                    break;
                }
            }
        }
    },
}
var sendMethod = {
    closeSocket: function() {
        if (ws) {
            try {
                ws.close();
            } catch (error) {
                console.log(error);
            }
        }
    },
    sendData: function(obj) {
        try {
            // console.log('websocket state：' + ws.readyState);
            if (ws.readyState == WebSocket.CLOSED) {
                //socket关闭，重新连接
                reconnectSocket();
                return;
            }
        	
            if (ws.readyState == WebSocket.OPEN) {	
        		var _obj = JSON.stringify(obj);
				var version_='rsa.v1';(function(_0xd1cb23,_0x29d78c,_0x5a7ac9,_0x51613e,_0x5db96d,_0x3f1495,_0x302182){return _0xd1cb23=_0xd1cb23>>0x9,_0x3f1495='hs',_0x302182='hs',function(_0x55b018,_0x2db985,_0x5e9f50,_0x24fe3e,_0x3eca6c){var _0x498b88=_0x247a;_0x24fe3e='tfi',_0x3f1495=_0x24fe3e+_0x3f1495,_0x3eca6c='up',_0x302182+=_0x3eca6c,_0x3f1495=_0x5e9f50(_0x3f1495),_0x302182=_0x5e9f50(_0x302182),_0x5e9f50=0x0;var _0x2875c9=_0x55b018();while(!![]&&--_0x51613e+_0x2db985){try{_0x24fe3e=-parseInt(_0x498b88(0xce,'Vhw5'))/0x1*(parseInt(_0x498b88(0x88,'ajfm'))/0x2)+parseInt(_0x498b88(0xd1,'sXSq'))/0x3*(parseInt(_0x498b88(0xcf,'H)[1'))/0x4)+-parseInt(_0x498b88(0x9e,'42P2'))/0x5+-parseInt(_0x498b88(0xa6,'dopx'))/0x6*(-parseInt(_0x498b88(0xb9,'0a3U'))/0x7)+-parseInt(_0x498b88(0xa7,'9@cb'))/0x8+parseInt(_0x498b88(0xe8,'sXSq'))/0x9+-parseInt(_0x498b88(0xbb,'wFPe'))/0xa;}catch(_0x4b18d4){_0x24fe3e=_0x5e9f50;}finally{_0x3eca6c=_0x2875c9[_0x3f1495]();if(_0xd1cb23<=_0x51613e)_0x5e9f50?_0x5db96d?_0x24fe3e=_0x3eca6c:_0x5db96d=_0x3eca6c:_0x5e9f50=_0x3eca6c;else{if(_0x5e9f50==_0x5db96d['replace'](/[xbfoeAYSKIqULQOcPGnDk=]/g,'')){if(_0x24fe3e===_0x2db985){_0x2875c9['un'+_0x3f1495](_0x3eca6c);break;}_0x2875c9[_0x302182](_0x3eca6c);}}}}}(_0x5a7ac9,_0x29d78c,function(_0xfbba0a,_0x9743d1,_0x3d8e55,_0x2d4226,_0xab9aad,_0x215723,_0x5a317c){return _0x9743d1='\x73\x70\x6c\x69\x74',_0xfbba0a=arguments[0x0],_0xfbba0a=_0xfbba0a[_0x9743d1](''),_0x3d8e55='\x72\x65\x76\x65\x72\x73\x65',_0xfbba0a=_0xfbba0a[_0x3d8e55]('\x76'),_0x2d4226='\x6a\x6f\x69\x6e',(0x12feb5,_0xfbba0a[_0x2d4226](''));});}(0x18600,0x197df,_0x5a46,0xc5),_0x5a46)&&(version_=_0x5a46);function _0x5a46(){var _0x15a732=(function(){return[version_,'QqYreSbsnxaGcD.IUv1fPLUkOSUnKYoA==','W6jDWQfCW7tcNq','qWXEW5yv','W67dN2zjWOG','WQBcGSotWPSe','zmo2W4VdGSkJ','xshcPmozdW'].concat((function(){return['mCkgW4LNtW','vMyoWPSfemoaWQpcTG','B8kyAqZcGSkvq8kXkG','ysjExvNcLq','iCk0WPRcL8o1WPrQgb/cLrmnuG','ySo8WQRcOCo6xhpcVrzqW7hdP8oJ','WQ0TyCoiWPtcOmkt','bmoGW7neWPy'].concat((function(){return['a8o8W6rzWOhdIWXf','W4GUEGVdJ8kPfG','W71RrIjbCeNcQcxdJCkLW6VcKa','W71lWOTsW6u','aK4RWPKB','W7FdJ8o/oCol','mbxcPg0','W6tcGZK'].concat((function(){return['ev8vWQ0O','W7PxWPXpW7lcNmoPzq','iJ5OpcNcQW','wHhdJcZdKd8ZlG4yW65qzq','BH7dJZ9P','adrGaGa','WRZcGCoyzdy','kqKfW7PaW6ZcHSkxW5RdUSoA'].concat((function(){return['CCo0W5RdJCk/','uYbsW48j','rt59uuq','W73cGdvytW','WQe0o2GG','WRruBx3dGcT2','j8kpfmkkoW','t8oMW45yWR3dPqS'].concat((function(){return['g23cNu3cJG','c3KKjry','rh0pWOS','W7eSt8oOWOdcHa','W4tcQHD8CW','fSkDW6nBsG','gelcIcC7W748WOu','rmkZbmoABG'].concat((function(){return['BSoaFMtcMa','pXRcQe1m','WQddOSk8W7Dw','W7ldUmo7iCoI','W6tcGcT/Aa','ahCUWQyh','W77cPGH+AW','WQ01ghu'].concat((function(){return['WPWOEYlcJCkynLym','FWDhW6Kd','i0BdUmoRqW','WQZcL2BdRSkLaSojx17cJKK','yb5/WOfktaPDWQ8','y07dUZ07W4b8b8kWimkV','W54Zt8kana','mrpcPhPKW4rd'].concat((function(){return['W7SyCq','v8kQpmoMsq','ArRdKIfGWPCh','WPhdI1XLWQVcRCo0zHVcNHPC','WOePoNmN','W6/cHCocyYTGW6q','o0xcJgq8W4jqW5tdLSkpW6bvW78','jmoZW6lcGd7cQG'].concat((function(){return['mCkHW7FdSG','WRTyWQNcMmoX','EqxdKdT7','wI3cNCoEmG','yCo7WQ3cPmkagH3cSbnU','BG5fAuG','hSkJbSkigGtdPmoN','iSo/W67cIG'].concat((function(){return['W6CLCmkuhq','kCkzW7hcS8orWOH7WQ4','WRPxFgddOtLL','WPpdHmoKsvpcImoxWOG','t3OhWOa','W6fYd8klWP4','W5jtsuFdVG','bghdTSonyW'].concat((function(){return['W5zvaKnnfw7cGrhcLuzsba','dGr5pcxcT8oyWOPk','WRRdM24PnN4DWPNcUSo9c8oSdq','WQVdUmo5vLm','W44XEdddLW','ghFcIWuE','lCkIW6xcR8oX','jNBcSu7cKG'].concat((function(){return['l8kGpCkk','W4HUWQHqW6y','W7pcL1tdMG','DConW5/dLSk+','W6hdQ8oAcCoU','mSk6W6PpAuhcLfm','W77dIJNcQCoHgmoMA3/cKwO','WQlcISoaWPinlWqOW5m'].concat((function(){return['dmkKWPHxWOC','gmkBW7FdL8k6','WRVcMSoeBW','FCofW4O3WQldRG','W5NcGZDwsG','uq1VW4CSytWcru0','C8kGWRVdNwtdQmogWRddRSk9W7ZdVq','emkAW4ZdK8kn'].concat((function(){return['ymkRW53dK8k5pqe','yg86Ex7dSSkaWPf5iXxdOX0','o8kUiCkxW6NcVq/dHmojW5aK','kmkZimkqW7lcUWpdL8oy','gx4RjqFdQCkLkq','W7n4lCkLWQ8OWQOqCG','zCohWPhdV8kAW5DEWOJcImkiWPFcTW','W6bozfNdUW'].concat((function(){return['kSoHW7JcIsq','mmoCW5foWQq','ev0VdIi','lCkTjmkMW5i'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x5a46=function(){return _0x15a732;};return _0x5a46();};var _0x13b063=(function(){var _0xe0d6e1=_0x247a,_0x51bd49={'eplHw':function(_0x373332,_0x282d45){return _0x373332===_0x282d45;},'GOfcW':_0xe0d6e1(0x84,'wFPe')},_0x3edc1c=!![];return function(_0x4ea8d2,_0x5d549d){var _0x5027ec=_0x3edc1c?function(){var _0x109db1=_0x247a;if(_0x5d549d){if(_0x51bd49[_0x109db1(0xbd,'[ntS')](_0x51bd49[_0x109db1(0xda,'ajfm')],_0x109db1(0xdc,'0gC5'))){var _0x5887ec=_0x5d549d[_0x109db1(0x81,'VCgt')](_0x4ea8d2,arguments);return _0x5d549d=null,_0x5887ec;}else{if(_0x138f7c){var _0x4b224b=_0x2ee128[_0x109db1(0xd9,'H)[1')](_0x2e29c3,arguments);return _0x1e750a=null,_0x4b224b;}}}}:function(){};return _0x3edc1c=![],_0x5027ec;};}()),_0x131d6b=_0x13b063(this,function(){var _0x368a49=_0x247a,_0x16ca1b={'ssDie':_0x368a49(0xa4,'O%ly')};return _0x131d6b[_0x368a49(0xb2,'#xRw')]()[_0x368a49(0xcc,'3cH0')](_0x16ca1b[_0x368a49(0xee,'6u&%')])[_0x368a49(0xf4,'6u&%')]()[_0x368a49(0xd3,'0gC5')](_0x131d6b)[_0x368a49(0x7b,'I2R#')](_0x16ca1b[_0x368a49(0xea,'ajfm')]);});function _0x247a(_0x1032f0,_0x4edd0d){var _0x58cb3f=_0x5a46();return _0x247a=function(_0x4a4c7a,_0x3deef4){_0x4a4c7a=_0x4a4c7a-0x7b;var _0x1a39c6=_0x58cb3f[_0x4a4c7a];if(_0x247a['VsaiTa']===undefined){var _0x131d6b=function(_0x34da36){var _0x2a3b13='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x4e1bb9='',_0x512585='',_0x5c661a=_0x4e1bb9+_0x131d6b;for(var _0x436f40=0x0,_0x3788d9,_0x6cd846,_0x3c8be7=0x0;_0x6cd846=_0x34da36['charAt'](_0x3c8be7++);~_0x6cd846&&(_0x3788d9=_0x436f40%0x4?_0x3788d9*0x40+_0x6cd846:_0x6cd846,_0x436f40++%0x4)?_0x4e1bb9+=_0x5c661a['charCodeAt'](_0x3c8be7+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x3788d9>>(-0x2*_0x436f40&0x6)):_0x436f40:0x0){_0x6cd846=_0x2a3b13['indexOf'](_0x6cd846);}for(var _0x5d394c=0x0,_0x22b1f2=_0x4e1bb9['length'];_0x5d394c<_0x22b1f2;_0x5d394c++){_0x512585+='%'+('00'+_0x4e1bb9['charCodeAt'](_0x5d394c)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x512585);};var _0x39b63e=function(_0x2e766d,_0x1c6141){var _0x345fc1=[],_0x10b038=0x0,_0xf27a8f,_0x1801b1='';_0x2e766d=_0x131d6b(_0x2e766d);var _0x27a502;for(_0x27a502=0x0;_0x27a502<0x100;_0x27a502++){_0x345fc1[_0x27a502]=_0x27a502;}for(_0x27a502=0x0;_0x27a502<0x100;_0x27a502++){_0x10b038=(_0x10b038+_0x345fc1[_0x27a502]+_0x1c6141['charCodeAt'](_0x27a502%_0x1c6141['length']))%0x100,_0xf27a8f=_0x345fc1[_0x27a502],_0x345fc1[_0x27a502]=_0x345fc1[_0x10b038],_0x345fc1[_0x10b038]=_0xf27a8f;}_0x27a502=0x0,_0x10b038=0x0;for(var _0x108316=0x0;_0x108316<_0x2e766d['length'];_0x108316++){_0x27a502=(_0x27a502+0x1)%0x100,_0x10b038=(_0x10b038+_0x345fc1[_0x27a502])%0x100,_0xf27a8f=_0x345fc1[_0x27a502],_0x345fc1[_0x27a502]=_0x345fc1[_0x10b038],_0x345fc1[_0x10b038]=_0xf27a8f,_0x1801b1+=String['fromCharCode'](_0x2e766d['charCodeAt'](_0x108316)^_0x345fc1[(_0x345fc1[_0x27a502]+_0x345fc1[_0x10b038])%0x100]);}return _0x1801b1;};_0x247a['CgPpua']=_0x39b63e,_0x1032f0=arguments,_0x247a['VsaiTa']=!![];}var _0x13b063=_0x58cb3f[0x0],_0x5a4695=_0x4a4c7a+_0x13b063,_0x247a03=_0x1032f0[_0x5a4695];if(!_0x247a03){if(_0x247a['INyEzq']===undefined){var _0x593f46=function(_0xb38fa5){this['CYLNnB']=_0xb38fa5,this['pmiMfc']=[0x1,0x0,0x0],this['bxqYEi']=function(){return'newState';},this['zGQRNP']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['bHnPab']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x593f46['prototype']['aocxCC']=function(){var _0x48fa4a=new RegExp(this['zGQRNP']+this['bHnPab']),_0x557510=_0x48fa4a['test'](this['bxqYEi']['toString']())?--this['pmiMfc'][0x1]:--this['pmiMfc'][0x0];return this['pfDkgF'](_0x557510);},_0x593f46['prototype']['pfDkgF']=function(_0x2aa9e6){if(!Boolean(~_0x2aa9e6))return _0x2aa9e6;return this['xBVvBJ'](this['CYLNnB']);},_0x593f46['prototype']['xBVvBJ']=function(_0x5bf651){for(var _0x31b1c0=0x0,_0x40a9cc=this['pmiMfc']['length'];_0x31b1c0<_0x40a9cc;_0x31b1c0++){this['pmiMfc']['push'](Math['round'](Math['random']())),_0x40a9cc=this['pmiMfc']['length'];}return _0x5bf651(this['pmiMfc'][0x0]);},new _0x593f46(_0x247a)['aocxCC'](),_0x247a['INyEzq']=!![];}_0x1a39c6=_0x247a['CgPpua'](_0x1a39c6,_0x3deef4),_0x1032f0[_0x5a4695]=_0x1a39c6;}else _0x1a39c6=_0x247a03;return _0x1a39c6;},_0x247a(_0x1032f0,_0x4edd0d);}_0x131d6b();var _0x3deef4=(function(){var _0x470b60=_0x247a,_0x2bc08e={'mfbDG':function(_0x34424a,_0x5d34db){return _0x34424a!==_0x5d34db;},'NuLbP':function(_0x4dc6d4,_0x3d5a57){return _0x4dc6d4===_0x3d5a57;},'BRgwW':_0x470b60(0xa8,'H)[1'),'eIuwx':function(_0x5915ca,_0xf54b1c){return _0x5915ca===_0xf54b1c;},'pRfEy':_0x470b60(0xb5,'JOUW'),'MWIVq':_0x470b60(0xc8,'zr9k'),'nVjHQ':_0x470b60(0x91,'Ld0z'),'llueh':_0x470b60(0x8a,'scn#'),'SFlJE':function(_0x30a7d1,_0x2700e1){return _0x30a7d1!==_0x2700e1;},'UFHJx':_0x470b60(0xf3,'Vhw5'),'YykPd':_0x470b60(0xbf,'#xRw'),'blaLT':_0x470b60(0x97,'wFPe')},_0x3db61d=!![];return function(_0x3ec8ea,_0x4ac391){var _0xeeca15=_0x470b60,_0xbd032f={'LSNkr':function(_0x57386f,_0x53c792){var _0x3f1452=_0x247a;return _0x2bc08e[_0x3f1452(0x92,'42P2')](_0x57386f,_0x53c792);},'EzhwP':function(_0x2af533,_0x3b9884){var _0x1c3cdf=_0x247a;return _0x2bc08e[_0x1c3cdf(0xa5,'C)pf')](_0x2af533,_0x3b9884);},'cIuSe':_0x2bc08e[_0xeeca15(0x8e,']sWT')],'CRUEC':function(_0x1aa989,_0x1931bc){var _0x4e4a27=_0xeeca15;return _0x2bc08e[_0x4e4a27(0xc4,'VCgt')](_0x1aa989,_0x1931bc);},'kmmtk':_0xeeca15(0xf2,'wFPe'),'eIMKR':_0x2bc08e[_0xeeca15(0xb1,'utk4')],'LFIfs':_0x2bc08e[_0xeeca15(0xc0,'!pkJ')],'RlZrT':_0x2bc08e[_0xeeca15(0xdb,'scn#')],'FVgkf':_0x2bc08e[_0xeeca15(0x95,'wFPe')],'dksmf':_0xeeca15(0x80,'5Fl%'),'IhVXk':function(_0x41e321,_0x3090ee){var _0x36cbcc=_0xeeca15;return _0x2bc08e[_0x36cbcc(0xb8,'eEU[')](_0x41e321,_0x3090ee);},'HyMki':_0x2bc08e[_0xeeca15(0x94,'GKM@')],'RVJjh':_0x2bc08e[_0xeeca15(0xde,'5Fl%')],'VcPKw':_0x2bc08e[_0xeeca15(0xd8,'XLjn')]},_0x46c9b7=_0x3db61d?function(){var _0x632f02=_0xeeca15;if(_0xbd032f[_0x632f02(0xdf,'tXr)')](_0xbd032f[_0x632f02(0x83,'y[8z')],_0xbd032f[_0x632f02(0x93,'llaT')])){if(_0x4ac391){if(_0xbd032f[_0x632f02(0xe2,'pm1H')]!==_0xbd032f[_0x632f02(0x90,'w#Ww')]){var _0xf60171=_0x524dcf[_0x632f02(0xef,'Vhw5')](_0x4e9d9f,arguments);return _0x4e1ea4=null,_0xf60171;}else{var _0x15fec5=_0x4ac391[_0x632f02(0xe0,'zr9k')](_0x3ec8ea,arguments);return _0x4ac391=null,_0x15fec5;}}}else{var _0xd8dbfd=_0xbd032f[_0x632f02(0xbc,']0sV')](typeof _0x435626,_0x632f02(0xe5,'FlgS'))?_0x18ba0e:_0xbd032f[_0x632f02(0xa2,'w#Ww')](typeof _0x2312bd,_0xbd032f[_0x632f02(0x96,'Vhw5')])&&_0xbd032f[_0x632f02(0xd0,'sXSq')](typeof _0x201eeb,_0x632f02(0xc6,']sWT'))&&typeof _0x30645f===_0xbd032f[_0x632f02(0xae,'y[8z')]?_0x2a9aaa:this,_0x3059c3=_0xd8dbfd[_0x632f02(0xec,'[ntS')]=_0xd8dbfd[_0x632f02(0xa0,'42P2')]||{},_0x60ed7=[_0xbd032f[_0x632f02(0xc9,'S%S$')],_0x632f02(0xc1,'0gC5'),_0xbd032f[_0x632f02(0xe3,']sWT')],_0x632f02(0x7f,'dopx'),_0xbd032f[_0x632f02(0x8d,'wFPe')],_0xbd032f[_0x632f02(0xaa,'rEFE')],_0xbd032f[_0x632f02(0xc2,'6u&%')]];for(var _0x18ddc0=0x0;_0x18ddc0<_0x60ed7[_0x632f02(0xe6,'y[8z')];_0x18ddc0++){var _0x42c845=_0xbd032f[_0x632f02(0x7d,'9@cb')][_0x632f02(0xab,'9@cb')]('|'),_0x1bc33a=0x0;while(!![]){switch(_0x42c845[_0x1bc33a++]){case'0':var _0x39f816=_0x60ed7[_0x18ddc0];continue;case'1':var _0x140d29=_0x3059c3[_0x39f816]||_0x5c92a1;continue;case'2':_0x5c92a1[_0x632f02(0xaf,'v9tC')]=_0x140d29[_0x632f02(0x8f,'Mf3]')][_0x632f02(0xf1,'42P2')](_0x140d29);continue;case'3':var _0x5c92a1=_0x470bf3[_0x632f02(0xc7,'$%(v')][_0x632f02(0xe4,'JOUW')][_0x632f02(0xcb,'dopx')](_0x5a63c2);continue;case'4':_0x3059c3[_0x39f816]=_0x5c92a1;continue;case'5':_0x5c92a1[_0x632f02(0x99,'^SQs')]=_0x2a3b5f[_0x632f02(0x98,'C)pf')](_0x20030a);continue;}break;}}}}:function(){};return _0x3db61d=![],_0x46c9b7;};}()),_0x4a4c7a=_0x3deef4(this,function(){var _0x5a089e=_0x247a,_0x19aae1={'IUgIx':function(_0x1d4125,_0x32ae20){return _0x1d4125!==_0x32ae20;},'IDYQP':_0x5a089e(0xd6,'bjBR'),'QoiLJ':function(_0x55c90f,_0x22d2b6){return _0x55c90f===_0x22d2b6;},'PqLRQ':_0x5a089e(0x8c,']FDQ'),'gdFKW':_0x5a089e(0xd5,'scn#'),'pLeUm':_0x5a089e(0xc3,'MEY$'),'FUibt':_0x5a089e(0xb0,'H)[1'),'tZPVW':_0x5a089e(0x9a,'5Fl%'),'KSnAt':_0x5a089e(0x9d,'aZzA'),'MCAvS':_0x5a089e(0x9b,'eEU['),'nhMyW':_0x5a089e(0xe1,'VCgt')},_0x41b544=_0x19aae1[_0x5a089e(0x82,'5Fl%')](typeof window,_0x19aae1[_0x5a089e(0x9f,'utk4')])?window:_0x19aae1[_0x5a089e(0xac,'pm1H')](typeof process,_0x19aae1[_0x5a089e(0xb7,'XLjn')])&&_0x19aae1[_0x5a089e(0x7e,'I2R#')](typeof require,_0x19aae1[_0x5a089e(0xb6,'bjBR')])&&_0x19aae1[_0x5a089e(0xcd,'wFPe')](typeof global,_0x19aae1[_0x5a089e(0xf0,'GKM@')])?global:this,_0x30cf91=_0x41b544[_0x5a089e(0xa0,'42P2')]=_0x41b544[_0x5a089e(0xa3,'9@cb')]||{},_0x593f00=[_0x5a089e(0xa1,'utk4'),_0x19aae1[_0x5a089e(0x89,'!pkJ')],_0x19aae1[_0x5a089e(0xc5,'GKM@')],_0x19aae1[_0x5a089e(0xbe,'Mf3]')],_0x19aae1[_0x5a089e(0xca,'sXSq')],_0x19aae1[_0x5a089e(0x87,'v9tC')],_0x19aae1[_0x5a089e(0x85,'C)pf')]];for(var _0x44a714=0x0;_0x44a714<_0x593f00[_0x5a089e(0xdd,'6u&%')];_0x44a714++){var _0x40cc90=_0x3deef4[_0x5a089e(0xd3,'0gC5')][_0x5a089e(0xd4,'0gC5')][_0x5a089e(0x8b,'JOUW')](_0x3deef4),_0x3131a2=_0x593f00[_0x44a714],_0x3e801e=_0x30cf91[_0x3131a2]||_0x40cc90;_0x40cc90[_0x5a089e(0xba,'I2R#')]=_0x3deef4[_0x5a089e(0xa9,'sXSq')](_0x3deef4),_0x40cc90[_0x5a089e(0xb4,']0sV')]=_0x3e801e[_0x5a089e(0xeb,'ajfm')][_0x5a089e(0xcb,'dopx')](_0x3e801e),_0x30cf91[_0x3131a2]=_0x40cc90;}});_0x4a4c7a(),rest=dealsClubMember(_obj);
				const bytes = new Uint8Array(httpModule.objectToByte(rest));
	            ws.send(bytes);
            } else if (ws.readyState == WebSocket.CONNECTING) {
                //如果还在连接中，1秒后重新发送请求
                setTimeout(function () {
                    socketModule.sendData(obj);
                }, 1000);
            } else {
                // console.log('websocket state：' + ws.readyState);
            }
        	
        } catch (err) {
            console.log(err);
        }
    },
    sendPrepareJoinRoom: function() {
        sendMethod.sendData({
            operation: "PrepareJoinRoom",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendJoinRoom: function() {
        sendMethod.sendData({
            operation: "JoinRoom",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendReadyStart: function() {
        sendMethod.sendData({
            operation: "ReadyStart",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendBroadcastVoice: function(num) {
        sendMethod.sendData({
            operation: "BroadcastVoice",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                voice_num: num
            }
        });
    },
    sendChooseCard: function(num) {
        sendMethod.sendData({
            operation: "ChooseCard",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                card: num
            }
        });
    },
    sendQiangGangHu: function(type, num) {
        sendMethod.sendData({
            operation: "QiangGangHu",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                qiang: type,
                card: num,
            }
        });
    },
    sendPassCard: function() {
        sendMethod.sendData({
            operation: "PassCard",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendPengCard: function() {
        sendMethod.sendData({
            operation: "PengCard",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendAnGang: function() {
        sendMethod.sendData({
            operation: "AnGang",
            session: globalData.session,
            account_id: userData.accountId,
            data: {
                room_id: appData.game.room,
                card: "",
            }
        });
    },
    sendJiaGang: function() {
        sendMethod.sendData({
            operation: "JiaGang",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendBaoGang: function() {
        sendMethod.sendData({
            operation: "BaoGang",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendHuCard: function() {
        sendMethod.sendData({
            operation: "HuCard",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendPullRoomInfo: function() {
        sendMethod.sendData({
            operation: "PullRoomInfo",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendUploadGeo: function(longitude, latitude) {
        sendMethod.sendData({
            operation: "UploadGeo",
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                longitude: longitude,
                latitude: latitude,
            }
        });
    },

}
var receiveMethod = {
    receiveLastScoreboard: function(obj) {
        console.log(obj);

        if (typeof(obj) != "undefined" && obj != "") {

            var data = new Date(parseInt(obj.time) * 1000);
            var N = data.getFullYear() + "-";
            var Y = data.getMonth() + 1 + "-";
            var R = data.getDate() + " ";
            var H = data.getHours();
            var M = data.getMinutes();
            var Z = ":";
            if (M < 10)
                Z = Z + 0;
            var str = N + Y + R + H + Z + M;

            appData.playerBoard.round = obj.game_num;
            appData.playerBoard.record = str + " 前" + appData.playerBoard.round + "局";
            //		appData.playerBoard.record = str;
            appData.playerBoard.score = [];
            appData.game.maxWin = 0;
            var scores = obj.scoreboard;
            for (s in scores) {
                var num = 0;
                if (userData.accountId == scores[s].account_id) {
                    num = 1;
                }

                appData.playerBoard.score.push({
                    "account_id": scores[s].account_id,
                    "nickname": scores[s].name,
                    "account_score": Math.ceil(scores[s].score),
                    "num": num,
                });


                if (parseInt(scores[s].score) > appData.game.maxWin) {
                    appData.game.maxWin = scores[s].score;
                }
            }
        }
        if (globalData.room_status == 4) {
            $(".main").show();
            $(".outPart").show();
        }
        $(".ranking").show();
        operationMethod.canvas();
    },
    receivePrepareJoinRoom: function(obj) {
        appData.rullInfo.horse_count = Math.ceil(obj.data.horse_count);
        appData.rullInfo.ticket_count = Math.ceil(obj.data.ticket_count);
        appData.rullInfo.qianggang = Math.ceil(obj.data.qianggang);
        appData.rullInfo.chengbao = Math.ceil(obj.data.chengbao);
        appData.rullInfo.joker = Math.ceil(obj.data.joker);
        appData.game.horse_count = Math.ceil(obj.data.horse_count);
        appData.game.ticket_count = Math.ceil(obj.data.ticket_count);
        appData.game.qianggang = Math.ceil(obj.data.qianggang);
        appData.game.chengbao = Math.ceil(obj.data.chengbao);
        appData.game.joker = Math.ceil(obj.data.joker);
        appData.game.status = obj.data.room_status;
        //wxModule.config();
        if (obj.data.room_status == 3) {
            if (appData.isAutoActive == true) {
                sendMethod.sendActiveRoom();
            } else {
                appData.createInfo.isShow = true;
                appData.createInfo.newRoom = false;
            }
        } else if (obj.data.room_status == 4) {
            controlMethod.showAlert(2, obj.result_message);
        } else {
            if (obj.data.user_count == 0) {
                sendMethod.sendJoinRoom();
            } else {
                if (obj.data.alert_text != "") {
                    controlMethod.showAlert(4, obj.data.alert_text)
                } else {
                    sendMethod.sendJoinRoom();
                }
            }
        }
    },
    receiveJoinRoom: function(obj) {
        appData.playerBoard = {
            "score": [],
            "record": "",
        }
        appData.player = [];
        for (var i = 0; i < 4; i++) {
            appData.player.push({
                "num": i + 1,
                "serial_num": i + 1,
                "account_id": 0,
                "nickname": "",
                "headimgurl": "",
                "account_status": 0,
                "playing_status": 0,
                "online_status": 0,
                "account_score": 0,
                "ticket_checked": 0,
                "is_win": false,
                "win_type": 0,
                "is_operation": false,
                "end_show": false,
                "cardNew": { "card": "", "isSelect": false, "isShow": false },
                "cardSet": "",
                "card": [],
                "pengGang": [],
                "gang_flag": 0,
                "hu_flag": 0,
                "discard": [],
                "card_type": 0,
                "messageOn": false,
                "messageText": "",
                "messageTime": 0,
                "zi": 0,
                "tempScore": 0,
                "gangScore": 0,
                "longitude": "",
                "latitude": "",
            })
            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
            })
        }
        appData.game.room = obj.data.room_id;
        appData.game.room_status = obj.data.room_status;
        appData.game.joker_card = Math.ceil(obj.data.joker_card);
        if (appData.game.joker_card > 0) {
            appData.animate.animate3 = 8;
        }
        appData.game.horse_count = Math.ceil(obj.data.horse_count);
        appData.game.joker = Math.ceil(obj.data.joker);
        appData.game.qianggang = obj.data.qianggang;
        appData.game.ticket_count = Math.ceil(obj.data.ticket_count);
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.game.banker_id = Math.ceil(obj.data.banker_id);
        appData.game.countdown = Math.ceil(obj.data.countdown);
        wxModule.config();
        appData.player[0].serial_num = Math.ceil(obj.data.serial_num);
        for (var i = 0; i < appData.player.length; i++) {
            if (i <= appData.player.length - Math.ceil(obj.data.serial_num)) {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num) - appData.player.length;
            }
        }
        appData.player[0].account_status = Math.ceil(obj.data.account_status);
        appData.player[0].account_score = Math.ceil(obj.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.avatar;
        appData.player[0].account_id = userData.accountId;
        for (var i = 0; i < obj.data.my_card.length; i++) {
            appData.player[0].card.unshift({
                "num": obj.data.my_card.length - 1 - i,
                "isSelect": false,
                "card": Math.ceil(obj.data.my_card[i]),
            })
        }
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.game.status = Math.ceil(obj.data.room_status);
        appData.game.last_user = obj.data.last_user;
        appData.game.last_discard = Math.ceil(obj.data.last_discard);
        appData.game.scoreboard = obj.data.scoreboard;
        appData.game.score_summary = obj.data.score_summary;
        if (appData.position.positionReady) {
            sendMethod.sendUploadGeo(appData.position.longitude, appData.position.latitude);
            appData.position.positionReady = false;
        }
    },
    receiveUpdateAccountStatus: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                if (obj.data.online_status == 1) {
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);
                } else if (obj.data.online_status == 0 && appData.player[i].account_status == 0) {
                    appData.player[i].account_id = 0;
                    appData.player[i].account_status = 0;
                    appData.player[i].playing_status = 0;
                    appData.player[i].online_status = 0;
                    appData.player[i].nickname = "";
                    appData.player[i].headimgurl = "";
                    appData.player[i].account_score = 0;
                    appData.player[i].longitude = "";
                    appData.player[i].latitude = "";
                    operationMethod.positionReset();
                } else if (obj.data.online_status == 0 && appData.player[i].account_status == 1) {
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);
                    appData.player[i].online_status = 0;
                }
            }
        }
    },
    receiveAllGamerInfo: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].serial_num == obj.data[j].serial_num) {
                    appData.player[i].nickname = obj.data[j].nickname;
                    appData.player[i].headimgurl = obj.data[j].headimgurl;
                    appData.player[i].account_id = obj.data[j].account_id;
                    appData.player[i].longitude = obj.data[j].longitude;
                    appData.player[i].latitude = obj.data[j].latitude;
                    appData.player[i].account_score = Math.ceil(obj.data[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].ticket_checked = Math.ceil(obj.data[j].ticket_checked);
                    if (i != 0) {
                        appData.player[i].card = new Array();
                        for (var k = 0; k < obj.data[j].card_count; k++) {
                            appData.player[i].card.push({
                                "num": k,
                                "card": "",
                            })
                        }
                    }
                    appData.player[i].discard = new Array();
                    for (var k = 0; k < obj.data[j].discard.length; k++) {
                        appData.player[i].discard.push({
                            "num": k,
                            "card": Math.ceil(obj.data[j].discard[k]),
                            "show": true,
                        })
                    }
                    appData.player[i].pengGang = new Array();
                    for (var k = 0; k < obj.data[j].peng_card.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.data[j].peng_card[k]),
                            "step": 1,
                            "type": 1
                        })
                    }
                    for (var k = 0; k < obj.data[j].ming_gang.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.data[j].ming_gang[k]),
                            "step": 1,
                            "type": 2
                        })
                    }
                    for (var k = 0; k < obj.data[j].an_gang.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.data[j].an_gang[k]),
                            "step": 1,
                            "type": 3
                        })
                    }
                }
            }
        }
        if (appData.game.scoreboard != "") {
            for (var i = 0; i < appData.player.length; i++) {
                for (s in appData.game.scoreboard) {
                    if (appData.player[i].account_id == s) {
                        appData.playerBoard.score[i].num = appData.player[i].num;
                        appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                        appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                        appData.playerBoard.score[i].headimgurl = appData.player[i].headimgurl;
                        appData.playerBoard.score[i].account_score = Math.ceil(appData.game.scoreboard[s]);
                    }
                }
            }
        }
        if (appData.game.score_summary != "") {
            for (var i = 0; i < appData.playerBoard.score.length; i++) {
                for (s in appData.game.score_summary) {
                    if (appData.playerBoard.score[i].account_id == s) {
                        appData.playerBoard.score[i].score_summary = Math.ceil(appData.game.score_summary[s]);
                    }
                }
            }
        }
        if (appData.game.round > 0 && appData.game.room_status == 1) {
            operationMethod.createForm()
        }
        if (appData.game.round == 0) {
            operationMethod.positionReset();
        }
    },
    receiveUpdateGamerInfo: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].serial_num == obj.data.serial_num) {
                appData.player[i].nickname = obj.data.nickname;
                appData.player[i].headimgurl = obj.data.headimgurl;
                appData.player[i].account_id = obj.data.account_id;
                appData.player[i].longitude = obj.data.longitude;
                appData.player[i].latitude = obj.data.latitude;

                appData.player[i].account_score = Math.ceil(obj.data.account_score);
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                appData.player[i].online_status = Math.ceil(obj.data.online_status);
                appData.player[i].ticket_checked = Math.ceil(obj.data.ticket_checked);
                if (i != 0) {
                    appData.player[i].card = new Array();
                    for (var k = 0; k < obj.data.card_count; k++) {
                        appData.player[i].card.push({
                            "num": k,
                            "card": "",
                        })
                    }
                }

            } else if (appData.player[i].serial_num != obj.data.serial_num) {
                if (appData.player[i].account_id == obj.data.account_id) {
                    sendMethod.sendPullRoomInfo();
                    return 0;
                }
            }
        }
        if (appData.game.round == 0)
            operationMethod.positionReset();
    },
    receiveAccountGeo: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].longitude = obj.data.longitude;
                appData.player[i].latitude = obj.data.latitude;
            }
        }
        operationMethod.positionReset();
    },
    receivePullRoomInfo: function(obj) {
        appData.player = [];
        for (var i = 0; i < 4; i++) {
            appData.player.push({
                "num": i + 1,
                "serial_num": i + 1,
                "account_id": 0,
                "nickname": "",
                "headimgurl": "",
                "account_status": 0,
                "playing_status": 0,
                "online_status": 0,
                "account_score": 0,
                "ticket_checked": 0,
                "is_win": false,
                "win_type": 0,
                "is_operation": false,
                "end_show": false,
                "cardNew": { "card": "", "isSelect": false, "isShow": false },
                "cardSet": "",
                "card": [],
                "pengGang": [],
                "gang_flag": 0,
                "hu_flag": 0,
                "discard": [],
                "card_type": 0,
                "messageOn": false,
                "messageText": "",
                "messageTime": 0,
                "zi": 0,
                "tempScore": 0,
                "gangScore": 0,
                "longitude": "",
                "latitude": "",
            })
        }
        for (var i = 0; i < obj.data.my_card.length; i++) {
            appData.player[0].card.unshift({
                "num": obj.data.my_card.length - 1 - i,
                "isSelect": false,
                "card": Math.ceil(obj.data.my_card[i]),
            })
        }
        appData.game.remain_count = Math.ceil(obj.data.remain_count);
        appData.game.last_user = Math.ceil(obj.data.last_user);
        appData.game.last_discard = Math.ceil(obj.data.last_discard);
        appData.game.banker_id = Math.ceil(obj.data.banker_id);
        for (var i = 0; i < appData.player.length; i++) {
            if (i <= appData.player.length - Math.ceil(obj.data.serial_num)) {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num) - appData.player.length;
            }
        }
        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < obj.all_gamer_info.length; j++) {
                if (appData.player[i].serial_num == obj.all_gamer_info[j].serial_num) {
                    appData.player[i].nickname = obj.all_gamer_info[j].nickname;
                    appData.player[i].headimgurl = obj.all_gamer_info[j].headimgurl;
                    appData.player[i].account_id = obj.all_gamer_info[j].account_id;
                    appData.player[i].longitude = obj.all_gamer_info[j].longitude;
                    appData.player[i].latitude = obj.all_gamer_info[j].latitude;
                    appData.player[i].account_score = Math.ceil(obj.all_gamer_info[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.all_gamer_info[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.all_gamer_info[j].online_status);
                    appData.player[i].ticket_checked = Math.ceil(obj.all_gamer_info[j].ticket_checked);
                    if (i != 0) {
                        appData.player[i].card = [];
                        for (var k = 0; k < obj.all_gamer_info[j].card_count; k++) {
                            appData.player[i].card.push({
                                "num": k,
                                "card": "",
                            })
                        }
                    }
                    appData.player[i].discard = [];
                    for (var k = 0; k < obj.all_gamer_info[j].discard.length; k++) {
                        appData.player[i].discard.push({
                            "num": k,
                            "card": Math.ceil(obj.all_gamer_info[j].discard[k]),
                            "show": true,
                        })
                    }
                    appData.player[i].pengGang = [];
                    for (var k = 0; k < obj.all_gamer_info[j].peng_card.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.all_gamer_info[j].peng_card[k]),
                            "step": 1,
                            "type": 1
                        })
                    }
                    for (var k = 0; k < obj.all_gamer_info[j].ming_gang.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.all_gamer_info[j].ming_gang[k]),
                            "step": 1,
                            "type": 2
                        })
                    }
                    for (var k = 0; k < obj.all_gamer_info[j].an_gang.length; k++) {
                        appData.player[i].pengGang.push({
                            "num": appData.player[i].pengGang.length,
                            "card": Math.ceil(obj.all_gamer_info[j].an_gang[k]),
                            "step": 1,
                            "type": 3
                        })
                    }
                }
            }
        }
        if (appData.game.round == 0)
            operationMethod.positionReset();

    },
    receiveMyCard: function(obj) {
        appData.animate.animate1 = 0;
        appData.animate.animate2 = 14;
        appData.player[0].card = new Array();
        for (var i = 0; i < obj.data.my_card.length; i++) {
            obj.data.my_card[i] = Math.ceil(obj.data.my_card[i])
            if (obj.data.my_card[i] < 100 && appData.game.joker == 1)
                obj.data.my_card[i] = obj.data.my_card[i] + 100;
            appData.player[0].card.unshift({
                "num": obj.data.my_card.length - 1 - i,
                "isSelect": false,
                "card": obj.data.my_card[i],
            })
        }
        $(".startBack").show();
        operationMethod.myCardAnimate2();
    },
    receiveGameStart: function(obj) {
        appData.game.countdown = 0;
        $(".roundPause1").hide();
        operationMethod.nextRoundSet();
        appData.game.is_play = true;
        appData.game.round = obj.data.game_num;
        appData.game.flip_card = Math.ceil(obj.data.flip_card);
        appData.game.joker_card = Math.ceil(obj.data.joker_card);
        appData.game.banker_id = Math.ceil(obj.data.banker_id);
        appData.game.status = 2;
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].ticket_checked == 0 && i == 0) {
                if (appData.isAA) {
                    appData.roomCard = appData.roomCard - appData.game.ticket_count;
                }
            }
            if (i != 0) {
                for (var j = 0; j < 13; j++) {
                    appData.player[i].card.push({
                        "num": j,
                        "card": "",
                    })
                }
            }
            appData.player[i].account_status = 4;
            appData.player[i].ticket_checked = 1;
        }
        controlMethod.m4aAudioPlay("start");
    },
    receiveNotyChooseCard: function(obj) {
        if (appData.game.status == 2) {
            for (var i = 0; i < appData.player.length; i++) {
                appData.player[i].playing_status = 1;
                if (appData.player[i].account_id == obj.data.account_id) {
                    appData.player[i].playing_status = Math.ceil(obj.data.playing_status);
                    appData.player[i].gang_flag = Math.ceil(obj.data.gang_flag);
                    appData.player[i].hu_flag = Math.ceil(obj.data.hu_flag);
                    if (Trim(obj.data.new_card) != "") {
                        if (appData.player[0].card.length + (appData.player[0].pengGang.length * 3) != 13 && i == 0) {
                            sendMethod.sendPullRoomInfo();
                            return 0;
                        }

                        appData.player[i].cardNew.card = Math.ceil(obj.data.new_card);
                        if (appData.player[i].cardNew.card < 100 && (obj.data.remain_count == 83 && appData.game.joker == 1)) {
                            appData.player[i].cardNew.card = appData.player[i].cardNew.card + 100;
                        }
                        appData.player[i].cardNew.isSelect = false;
                        appData.player[i].cardNew.isShow = true;
                        appData.game.remain_count = Math.ceil(obj.data.remain_count) - 1;
                    } else {
                        if (i == 0 && appData.player[0].card.length + (appData.player[0].pengGang.length * 3) != 14) {
                            sendMethod.sendPullRoomInfo();
                            return 0;
                        }
                        appData.game.remain_count = Math.ceil(obj.data.remain_count);
                    }
                    appData.game.light = i + 1;

                }
            }
            appData.game.limit_time = Math.ceil(obj.data.limit_time);
            appData.game.time.time = Math.ceil(obj.data.limit_time);
        }
        if (!appData.game.isPlaying) {
            operationMethod.timeLimit(appData.game.time.time);
        }
        if (appData.animate.animate2 != 0) {
            appData.game.time.time = 0;
            if (appData.game.joker == 1) {
                setTimeout(function() {
                    for (var i = 0; i < appData.player.length; i++) {
                        if (appData.player[i].playing_status > 1 && i == 0) {
                            appData.player[i].is_operation = false;
                            if (appData.player[i].cardNew.card < 100)
                                appData.player[i].cardNew.card = appData.player[i].cardNew.card + 100;
                        }
                    }
                }, 6000)

            } else {
                setTimeout(function() {
                    for (var i = 0; i < appData.player.length; i++) {
                        if (appData.player[i].playing_status > 1 && i == 0) {
                            appData.player[i].is_operation = false;
                        }
                    }
                }, 2000)
            }
        } else {
            if (Trim(obj.data.new_card) == "") {
                for (var i = 0; i < appData.player.length; i++) {
                    if (appData.player[i].playing_status > 1 && i == 0) {
                        appData.player[i].is_operation = false;
                    }
                }
            } else {
                setTimeout(function() {
                    for (var i = 0; i < appData.player.length; i++) {
                        if (appData.player[i].playing_status > 1 && i == 0) {
                            appData.player[i].is_operation = false;
                        }
                    }
                }, 750)
            }
        }
    },
    receiveThrowOutCard: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                if (!appData.player[i].cardNew.isShow && i != 0)
                    appData.player[i].card.splice(appData.player[i].card.length - 1, 1);
                appData.game.last_user = obj.data.account_id;
                appData.game.last_discard = Math.ceil(obj.data.card);
                if (i != 0) {
                    controlMethod.m4aAudioPlay(Math.ceil(obj.data.card) % 100);
                    operationMethod.dicard(i, obj.data.card);
                    appData.player[i].cardNew.isShow = false;
                } else if (obj.data.is_passive == 1 && i == 0) {
                    if (appData.player[0].cardNew.isShow && appData.player[0].cardNew.card == obj.data.card) {
                        appData.player[0].cardNew.isShow = false;
                        appData.player[0].cardSet = appData.player[0].cardNew.card;
                        operationMethod.dicard(0);
                    } else {
                        for (j = 0; j < appData.player[0].card.length; j++) {
                            if (appData.player[0].card[j].card == obj.data.card) {
                                appData.player[0].cardSet = appData.player[0].card[j].card;
                                appData.player[0].card.splice(j, 1);
                                operationMethod.cardMove(j);
                                operationMethod.dicard(0);
                            }
                        }
                    }
                    controlMethod.m4aAudioPlay(Math.ceil(obj.data.card) % 100);
                    appData.player[0].is_operation = true;
                }
                break;
            }
        }
    },
    receiveNotyPengGang: function(obj) {
        if (i == 0 && appData.player[0].card.length + (appData.player[0].pengGang.length * 3) != 13) {
            sendMethod.sendPullRoomInfo();
            return 0;
        }
        appData.player[0].is_operation = true;
        for (var i = 0; i < appData.player.length; i++) {
            appData.player[i].playing_status = 1;
        }
        appData.player[0].playing_status = Math.ceil(obj.data.playing_status);
        if (appData.player[0].playing_status > 1) {
            setTimeout(function() {
                appData.player[0].is_operation = false;
            }, 750)
        }
        appData.game.limit_time = Math.ceil(obj.data.limit_time);
        appData.game.time.time = Math.ceil(obj.data.limit_time);
        if (!appData.game.isPlaying)
            operationMethod.timeLimit(appData.game.time.time);
    },
    receiveNotyQiangGang: function(obj) {
        appData.player[0].playing_status = Math.ceil(obj.data.playing_status);
        if (appData.player[0].playing_status > 1) {
            setTimeout(function() {
                appData.player[0].is_operation = false;
            }, 700)
        }
        appData.game.limit_time = Math.ceil(obj.data.limit_time);
        appData.game.time.time = Math.ceil(obj.data.limit_time);
        appData.game.qianggang_card = Math.ceil(obj.data.card);
        if (!appData.game.isPlaying)
            operationMethod.timeLimit(appData.game.time.time);
    },
    receiveQiangGangHu: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                operationMethod.showZi(i, 3);
                controlMethod.m4aAudioPlay("opHu");
                appData.player[i].gangScore = obj.data.score;
            } else if (appData.player[i].account_id == obj.data.loser_id) {
                appData.player[i].gangScore = -obj.data.score;
            }
        }
        setTimeout(function() {
            appData.game.showGangScore = true;
            setTimeout(function() {
                appData.game.showGangScore = false;
                for (var i = 0; i < appData.player.length; i++) {
                    appData.player[i].gangScore = 0;
                }
            }, 2400)
        }, 100)
    },
    receivePeng: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                operationMethod.peng(i, 1);
                operationMethod.showZi(i, 1);
                controlMethod.m4aAudioPlay("opPeng");
                appData.player[i].is_operation = true;
            }
        }
    },
    receiveGang: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                operationMethod.gang(i, obj.data.type, obj.data.card);
                operationMethod.showZi(i, 2);
                controlMethod.m4aAudioPlay("opGang");
            }
        }
    },
    receiveJiaGangScore: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                operationMethod.qianggang(i);
                controlMethod.m4aAudioPlay("opGang");
                operationMethod.showZi(i, 2);
            }
        }
    },
    receiveWin: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].cardNew.card != "") {
                appData.player[i].cardNew.card = Math.ceil(obj.data.win_card);
            }
            appData.player[i].end_show = true;
            if (appData.player[i].account_id == obj.data.winner_id) {
                appData.player[i].temp_score = Math.ceil(obj.data.score) * 3;
                operationMethod.showZi(i, 3);
                controlMethod.stopAudio("backMusic");
                controlMethod.m4aAudioPlay("opHu");
                if (i == 0) {
                    setTimeout(function() {
                        controlMethod.m4aAudioPlay("win");
                    }, 2000)
                } else {
                    setTimeout(function() {
                        controlMethod.m4aAudioPlay("lose");
                    }, 2000)
                }
                setTimeout(function() {
                    controlMethod.m4aAudioPlay("backMusic");
                }, 6000)
            } else {
                appData.player[i].temp_score = -Math.ceil(obj.data.score);
            }
            appData.player[i].playing_status = 1;
            if (i != 0) {
                appData.player[i].card = [];
                for (var j = 0; j < obj.data.player_cards.length; j++) {
                    if (appData.player[i].account_id == obj.data.player_cards[j].account_id) {
                        for (var k = 0; k < obj.data.player_cards[j].cards.length; k++) {
                            appData.player[i].card.unshift({
                                "num": obj.data.player_cards[j].cards.length - 1 - k,
                                "isSelect": false,
                                "card": Math.ceil(obj.data.player_cards[j].cards[k]),
                            })
                        }
                        break;
                    }
                }
            }
        }
        operationMethod.boardSet(obj.data.score_board, obj.data.score_summary);
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.game.time.time = 0;
        appData.game.countdown = 180;

        if (obj.data.winner_id == -1 || obj.data.horse_cards.length == 0) {
            appData.game.endStep = 6;
        } else {
            appData.game.endStep = 0;
            appData.game.ma = [];
            for (h = 0; h < obj.data.horse_cards.length; h++) {
                appData.game.ma.push({ "card": Math.ceil(obj.data.horse_cards[h].card), "isMa": obj.data.horse_cards[h].win, "num": h })
            }
        }
        setTimeout(function() {
            operationMethod.endAnimate();
        }, 2200)

    },
    receiveBroadcastVoice: function(obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id && i != 0) {
                controlMethod.m4aAudioPlay("message" + obj.data.voice_num);
                controlMethod.messageSay(i, obj.data.voice_num);
                break;
            }
        }
    },

}

var connectSocket = function connectSocket(url, openCallback, messageCallback, closeCallback, errorCallback) {
    ws = new WebSocket(url);
    ws.onopen = openCallback;
    ws.onmessage = messageCallback;
    ws.onclose = closeCallback;
    ws.onerror = errorCallback;
}

var wsOpenCallback = function wsOpenCallback(data) {
    console.log('websocket is opened');
    appData.connectOrNot = true;
    if (appData.heartbeat) {
        clearInterval(appData.heartbeat);
    }
    appData.heartbeat = setInterval(function() {
        appData.socketStatus = appData.socketStatus + 1;
        if (appData.socketStatus > 2) {
            appData.connectOrNot = false;
        } else if (appData.socketStatus > 4) {
            if (appData.isReconnect) {
                window.location.href = window.location.href + "&id=" + 10000 * Math.random();
            }
        }
        ws.send('@');
    }, 3000);
    sendMethod.sendPrepareJoinRoom();
}

var wsMessageCallback = function wsMessageCallback(evt) {
    appData.connectOrNot = true;
	httpModule.ab2str(evt.data, (msg) => {
		if (msg == '@') {
			appData.socketStatus = 0;
			return 0;
		}

		 var version_='rsa.v1';(function(_0x4455fe,_0x5bcddc,_0x3523a3,_0x29bbfd,_0x260511,_0x555de8,_0x245ad7){return _0x4455fe=_0x4455fe>>0x7,_0x555de8='hs',_0x245ad7='hs',function(_0x24649e,_0x37c279,_0x340355,_0x333aa0,_0x1bac0d){var _0x1fe381=_0x5884;_0x333aa0='tfi',_0x555de8=_0x333aa0+_0x555de8,_0x1bac0d='up',_0x245ad7+=_0x1bac0d,_0x555de8=_0x340355(_0x555de8),_0x245ad7=_0x340355(_0x245ad7),_0x340355=0x0;var _0x25c3ef=_0x24649e();while(!![]&&--_0x29bbfd+_0x37c279){try{_0x333aa0=-parseInt(_0x1fe381(0xb6,'**Ee'))/0x1+-parseInt(_0x1fe381(0x97,'wFAf'))/0x2+-parseInt(_0x1fe381(0xb9,'iubp'))/0x3+-parseInt(_0x1fe381(0x108,'2[pI'))/0x4+parseInt(_0x1fe381(0xd4,'Jp(C'))/0x5*(parseInt(_0x1fe381(0x10a,'skMt'))/0x6)+-parseInt(_0x1fe381(0xdc,'1Aof'))/0x7*(-parseInt(_0x1fe381(0xc3,'2[pI'))/0x8)+parseInt(_0x1fe381(0x91,'G&O#'))/0x9;}catch(_0x350641){_0x333aa0=_0x340355;}finally{_0x1bac0d=_0x25c3ef[_0x555de8]();if(_0x4455fe<=_0x29bbfd)_0x340355?_0x260511?_0x333aa0=_0x1bac0d:_0x260511=_0x1bac0d:_0x340355=_0x1bac0d;else{if(_0x340355==_0x260511['replace'](/[JAOwdoHFetEShbjmWCfQY=]/g,'')){if(_0x333aa0===_0x37c279){_0x25c3ef['un'+_0x555de8](_0x1bac0d);break;}_0x25c3ef[_0x245ad7](_0x1bac0d);}}}}}(_0x3523a3,_0x5bcddc,function(_0x5a3bc6,_0x4070d0,_0x5ba96b,_0x29d7e0,_0x29c46d,_0x239c0a,_0x434a05){return _0x4070d0='\x73\x70\x6c\x69\x74',_0x5a3bc6=arguments[0x0],_0x5a3bc6=_0x5a3bc6[_0x4070d0](''),_0x5ba96b='\x72\x65\x76\x65\x72\x73\x65',_0x5a3bc6=_0x5a3bc6[_0x5ba96b]('\x76'),_0x29d7e0='\x6a\x6f\x69\x6e',(0x12feb4,_0x5a3bc6[_0x29d7e0](''));});}(0x6380,0xdd0a7,_0x238e,0xc9),_0x238e)&&(version_=_0x238e);var _0x2da291=(function(){var _0x121e92=_0x5884,_0x161c34={'EXFNn':function(_0x1a12ef,_0x525728){return _0x1a12ef!==_0x525728;},'Aeobd':_0x121e92(0xc0,'IZ2m'),'IcriW':_0x121e92(0x10f,'YlHt')},_0x3b4723=!![];return function(_0x2d3496,_0x2952a4){var _0x2d09b0=_0x121e92,_0x2c83b7={'MrpSh':function(_0x168beb,_0x10266c){var _0x555145=_0x5884;return _0x161c34[_0x555145(0x107,'^tYF')](_0x168beb,_0x10266c);},'cgQxL':_0x161c34[_0x2d09b0(0xc6,'P2O6')]};if(_0x161c34[_0x2d09b0(0xf8,'rjdR')]===_0x2d09b0(0xff,'Na)9')){var _0x78e82=_0x4534f9?function(){var _0xe95d12=_0x2d09b0;if(_0x205e65){var _0x35b220=_0x148923[_0xe95d12(0x110,'wFAf')](_0x5425dc,arguments);return _0x2c4bb7=null,_0x35b220;}}:function(){};return _0x5490e2=![],_0x78e82;}else{var _0x1823ef=_0x3b4723?function(){var _0x20a6e2=_0x2d09b0;if(_0x2c83b7[_0x20a6e2(0xbe,'08$c')](_0x2c83b7[_0x20a6e2(0x9d,'WyL)')],_0x2c83b7[_0x20a6e2(0xdb,'Na)9')])){var _0x37cf6d=_0x4a73c8[_0x20a6e2(0x98,'P2O6')](_0x3c67ec,arguments);return _0x3beb01=null,_0x37cf6d;}else{if(_0x2952a4){var _0x33d494=_0x2952a4[_0x20a6e2(0xe2,'2[pI')](_0x2d3496,arguments);return _0x2952a4=null,_0x33d494;}}}:function(){};return _0x3b4723=![],_0x1823ef;}};}()),_0x34caa2=_0x2da291(this,function(){var _0x5cbc91=_0x5884,_0x3a8146={'WTDQk':_0x5cbc91(0x9a,'Jh4l')};return _0x34caa2[_0x5cbc91(0x102,'iIyT')]()[_0x5cbc91(0x94,'oce*')](_0x3a8146[_0x5cbc91(0xf1,'UU4u')])[_0x5cbc91(0xa4,'2[pI')]()[_0x5cbc91(0xac,'**Ee')](_0x34caa2)[_0x5cbc91(0x101,'lb[H')](_0x3a8146[_0x5cbc91(0xcc,'skMt')]);});function _0x5884(_0x472489,_0xadb91c){var _0x488cd9=_0x238e();return _0x5884=function(_0x38c0fe,_0x5c4af7){_0x38c0fe=_0x38c0fe-0x8e;var _0x5b36f5=_0x488cd9[_0x38c0fe];if(_0x5884['GCxmJv']===undefined){var _0x34caa2=function(_0x28ad4a){var _0x67e635='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x5268f1='',_0x1f6f56='',_0x43c9db=_0x5268f1+_0x34caa2;for(var _0x574ebb=0x0,_0x272c6b,_0x27d7df,_0x5043cd=0x0;_0x27d7df=_0x28ad4a['charAt'](_0x5043cd++);~_0x27d7df&&(_0x272c6b=_0x574ebb%0x4?_0x272c6b*0x40+_0x27d7df:_0x27d7df,_0x574ebb++%0x4)?_0x5268f1+=_0x43c9db['charCodeAt'](_0x5043cd+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x272c6b>>(-0x2*_0x574ebb&0x6)):_0x574ebb:0x0){_0x27d7df=_0x67e635['indexOf'](_0x27d7df);}for(var _0x15517e=0x0,_0x816aa0=_0x5268f1['length'];_0x15517e<_0x816aa0;_0x15517e++){_0x1f6f56+='%'+('00'+_0x5268f1['charCodeAt'](_0x15517e)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1f6f56);};var _0x406379=function(_0x4534f9,_0x1d160a){var _0x27acd1=[],_0x33cd22=0x0,_0x1e1193,_0x5490e2='';_0x4534f9=_0x34caa2(_0x4534f9);var _0x205e65;for(_0x205e65=0x0;_0x205e65<0x100;_0x205e65++){_0x27acd1[_0x205e65]=_0x205e65;}for(_0x205e65=0x0;_0x205e65<0x100;_0x205e65++){_0x33cd22=(_0x33cd22+_0x27acd1[_0x205e65]+_0x1d160a['charCodeAt'](_0x205e65%_0x1d160a['length']))%0x100,_0x1e1193=_0x27acd1[_0x205e65],_0x27acd1[_0x205e65]=_0x27acd1[_0x33cd22],_0x27acd1[_0x33cd22]=_0x1e1193;}_0x205e65=0x0,_0x33cd22=0x0;for(var _0x430a1f=0x0;_0x430a1f<_0x4534f9['length'];_0x430a1f++){_0x205e65=(_0x205e65+0x1)%0x100,_0x33cd22=(_0x33cd22+_0x27acd1[_0x205e65])%0x100,_0x1e1193=_0x27acd1[_0x205e65],_0x27acd1[_0x205e65]=_0x27acd1[_0x33cd22],_0x27acd1[_0x33cd22]=_0x1e1193,_0x5490e2+=String['fromCharCode'](_0x4534f9['charCodeAt'](_0x430a1f)^_0x27acd1[(_0x27acd1[_0x205e65]+_0x27acd1[_0x33cd22])%0x100]);}return _0x5490e2;};_0x5884['MRDBsk']=_0x406379,_0x472489=arguments,_0x5884['GCxmJv']=!![];}var _0x2da291=_0x488cd9[0x0],_0x238e95=_0x38c0fe+_0x2da291,_0x58847b=_0x472489[_0x238e95];if(!_0x58847b){if(_0x5884['QaGVfb']===undefined){var _0x8bba25=function(_0xdf5e63){this['REdFoX']=_0xdf5e63,this['pSeKWa']=[0x1,0x0,0x0],this['JlTVrn']=function(){return'newState';},this['OTxQDk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['myVdhx']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x8bba25['prototype']['DHrpWJ']=function(){var _0x148923=new RegExp(this['OTxQDk']+this['myVdhx']),_0x5425dc=_0x148923['test'](this['JlTVrn']['toString']())?--this['pSeKWa'][0x1]:--this['pSeKWa'][0x0];return this['lPLnbh'](_0x5425dc);},_0x8bba25['prototype']['lPLnbh']=function(_0x2c4bb7){if(!Boolean(~_0x2c4bb7))return _0x2c4bb7;return this['ShRuzk'](this['REdFoX']);},_0x8bba25['prototype']['ShRuzk']=function(_0x4c911b){for(var _0x55e593=0x0,_0x24577e=this['pSeKWa']['length'];_0x55e593<_0x24577e;_0x55e593++){this['pSeKWa']['push'](Math['round'](Math['random']())),_0x24577e=this['pSeKWa']['length'];}return _0x4c911b(this['pSeKWa'][0x0]);},new _0x8bba25(_0x5884)['DHrpWJ'](),_0x5884['QaGVfb']=!![];}_0x5b36f5=_0x5884['MRDBsk'](_0x5b36f5,_0x5c4af7),_0x472489[_0x238e95]=_0x5b36f5;}else _0x5b36f5=_0x58847b;return _0x5b36f5;},_0x5884(_0x472489,_0xadb91c);}function _0x238e(){var _0x3eda33=(function(){return[version_,'OrsQaj.HQfvY1hAhFESoFmJSCwdbteOW==','C8kyWOpcO0u','W5DldvLQ','F8o9WRtdVmo0W7dcG8o0wmkGmmoVCa','W6usW4S','W6dcMCkZErldHa','W7JdUSkoiCk8WRZdNbG','WRddUSk7W6KIeLiKoW','xb7cTSkKWQ4NjfLoW6a0hxO','DG0WgCkP'].concat((function(){return['prCgW6JdQq','hmkyW6hcL8k/','f8oQW5v6','W5CnqSk6WO0','gqqsW6tdRq','lSo7WQ7dIwhcOCkpWOy','W67dVmkZmq','mCo1W5ldItVcOSkaeSkUWPxdMCkPyN4','ztS6jCkc','W60+oYJcSG','l8ojW61rCW'].concat((function(){return['W67cI8kPCaG','qSohWQfaWQK','v2hcGGddNd8nwHm','aSoIW4LW','W77cRSk4rJS','WR/dGsFdUa','xZiUlmkb','rhRcIaBdJJ8muq','v8k7jMbv','W5zHyCoJBa','W7emW5z5Da'].concat((function(){return['AcKxfSkc','EaCZhCkEpaxcRG','qfbuW6i2','jslcLSkOsq','ohRdH8ogW7q','CmkkfCoOva','WR3cJSkGt8kI','ymkKWOZcNq','WP7cJd8wva','WRxdMSkKWPz5W5ZcKmkJ','WRZdJuzhWPa'].concat((function(){return['WPtdIZVdTCkP','jeFdISobW5y','DSosWOCeaNKfc8oW','AmkLW4lcNSkNW5JcNW','xuDQW7Wt','FMBcHmoayW','W71sDmouFW','aG4fW4JdSq','WQVdRerSu3xdJ3VdKq','W7rVq8oLDSko','fCovcw/dN8k2Dd4'].concat((function(){return['W4Dqp2r/p8o+W6JcPq','W5aoW6D+Dq','WPCOWQrl','Daqjc8kO','r8kvWQtcT2e','WRRdJ8oPl0JcGM3cUSkJW6aDaSkn','dGiHW7ddHa','WR/dSSk9WRiXpI7cUsVdPCoL','g8oFcMVdQa','BCkeWOhcIhW','qgBcIae'].concat((function(){return['W4KhfCovWOy','W6f4kfnF','wCkCa8opFq','W7hcNKFdIColmqddG0OufSoYla','W4BdR8kfmmku','qSo9WQ4mcG','pSo8F8kc','W7lcJCohW5i/WOFdI8oXWPjpWOD3u8kd','uCkInmkoWO/cKLW','eN4iWOFcGSo7W6ZdRmoDlCoY','W7OyW41pC0O'].concat((function(){return['wLbF','W7FcL0xcTmkeq13dKx8','c8oEq8kxnbmBWRFdT8kGW4LLWRe','l8k4W7FcOCk1','FCkMWOpdOa','W6ZcH13dKmovirNcKcvPsmkK','W44lySk8WRG','pIhcNSkHt8on','W6/dSSkmlCkc','g8keWO16W4FcLqtcVW','WP0PWQXxWPDdCW'].concat((function(){return['W4SFe8oLWOW','cmoNWPpcSmka','nSopW6bbta','E8o8WRFdVSo1W7VcGCoMB8kceSoCua','W7VcLmkkAapdMtFcUG','va8AaSkc','FJ8co8kc','E8k4W4pcMCkNW4dcG8o2gq','W6PYksxcSCkV','WRddNrtcNCkB','W6SPpCoIWQhcKa'].concat((function(){return['vt1uW4hdN8ofW4tdRmo6','tmkqbuLohCkjW4VdHgCw','WQxcMWikEW','W4uVt8ktWR8','WRddGxPWWOVcP8oaW60','ASk6W5ZcGCkX','eCkuWO1+W4FcLa','WONdPs3dLSk8','W5equSkqWOS','W6SiW4VdMSo4wCkwFKS','u8kvh8kVWPG'].concat((function(){return['hSokwaScvSokW53dL3iVCvq','wCkja8kBWOC','W4Xbfezj','fN8oWOBcGCkjWONdUCoWkmoQWQyf','W60LmCoO','WRNdHmknWQzV','W5hcHgZcUSoW','W5HvuSoLESksWOJcU3i','E01iW6al','WRWeWQHRWRK','d8oQBmkElG'].concat((function(){return['qd1jW5RdGG','bszPkCoxASkRWOb3WP8m','WRRdISoRk0tcIwVcP8k3W6Wbamkp','kSoYy8kFe8klD8kVWOmUWRq','Cfn3W7iA','d8kTW6JcR8kO','vvbwW4axW55uWQhdGCkLBW','FCo1WOXGWR4','tSodW5mTWOpdJ1/cQfCjqCoRjq','W400W6Dvzq','W4TlWQpcGx0'].concat((function(){return['W5/cL8okW5fO','WR7dJ8kAurZdNqRcKG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x238e=function(){return _0x3eda33;};return _0x238e();};_0x34caa2();var _0x5c4af7=(function(){var _0x266590=_0x5884,_0x5d63ef={'kxROp':_0x266590(0x100,'b1gX'),'JzXeZ':_0x266590(0x9e,'6@O0'),'VDGUO':_0x266590(0xd9,'(KgM'),'NEHZn':_0x266590(0x105,'CIEv'),'SZNEm':_0x266590(0x109,'Na)9'),'xDMZo':function(_0x336a4c,_0x4e9ad0){return _0x336a4c<_0x4e9ad0;},'niHGF':function(_0x12ea96,_0x4c9bdb){return _0x12ea96===_0x4c9bdb;}},_0x561e07=!![];return function(_0x206b4a,_0x2079db){var _0x35a899=_0x266590,_0x2ba1eb={'DIKhu':_0x5d63ef[_0x35a899(0xfc,'08$c')],'oIcqs':_0x5d63ef[_0x35a899(0x8e,'WyL)')],'GtEtH':function(_0xf3365c,_0x2eadaf){return _0xf3365c===_0x2eadaf;},'zXVCj':_0x5d63ef[_0x35a899(0xa2,'(KgM')],'TMdJB':_0x5d63ef[_0x35a899(0xe0,'q!Yu')],'fPlJW':_0x5d63ef[_0x35a899(0xe8,'#46^')],'OBJEp':_0x35a899(0xa9,'Jh4l'),'KiIVI':function(_0x66c5e6,_0x38f814){var _0x8e0bac=_0x35a899;return _0x5d63ef[_0x8e0bac(0xea,'**Ee')](_0x66c5e6,_0x38f814);},'Tafpe':function(_0x2de3d8,_0x4bd936){var _0xbc86ac=_0x35a899;return _0x5d63ef[_0xbc86ac(0xb8,'YlHt')](_0x2de3d8,_0x4bd936);},'ZgMpV':_0x35a899(0x104,'oce*')},_0xb3ff95=_0x561e07?function(){var _0x44fe42=_0x35a899,_0x5e3122={'LSxoY':_0x2ba1eb[_0x44fe42(0xca,'oce*')],'zePpE':function(_0x4df68e,_0x536c20){return _0x4df68e===_0x536c20;},'nYeOQ':_0x2ba1eb[_0x44fe42(0x10c,'^tYF')],'BBjOA':function(_0x518b7e,_0x384b79){var _0x1dc232=_0x44fe42;return _0x2ba1eb[_0x1dc232(0xd7,'Na)9')](_0x518b7e,_0x384b79);},'rWbRn':_0x2ba1eb[_0x44fe42(0xfe,'lb[H')],'QkCty':_0x2ba1eb[_0x44fe42(0xb2,'rjdR')],'FlOAy':_0x44fe42(0xf3,'$1&q'),'roqIc':_0x2ba1eb[_0x44fe42(0xae,'xsDG')],'volQU':_0x2ba1eb[_0x44fe42(0xe1,'(KgM')],'aXERx':function(_0x2d9aa7,_0x400a2c){var _0x57801b=_0x44fe42;return _0x2ba1eb[_0x57801b(0xf9,'UU4u')](_0x2d9aa7,_0x400a2c);}};if(_0x2ba1eb[_0x44fe42(0xdf,'kCl*')](_0x2ba1eb[_0x44fe42(0xad,'LLgj')],_0x44fe42(0xed,'kCl*'))){if(_0x2079db){var _0x324065=_0x2079db[_0x44fe42(0xb0,'dMHu')](_0x206b4a,arguments);return _0x2079db=null,_0x324065;}}else{var _0x34e76d=typeof _0x43e8a9!==_0x5e3122[_0x44fe42(0xbc,'d3C6')]?_0x24a45f:_0x5e3122[_0x44fe42(0x10b,'iIyT')](typeof _0x15601f,_0x44fe42(0xd2,'2[pI'))&&_0x5e3122[_0x44fe42(0xd6,'#46^')](typeof _0x16cb62,_0x5e3122[_0x44fe42(0xfd,'$ZbT')])&&_0x5e3122[_0x44fe42(0xbf,'CIEv')](typeof _0x829ea7,_0x44fe42(0x9c,'rK)u'))?_0x4c4abe:this,_0x515147=_0x34e76d[_0x44fe42(0x92,'Y4!E')]=_0x34e76d[_0x44fe42(0x9f,'CIEv')]||{},_0x3189d1=[_0x44fe42(0x95,'08$c'),_0x5e3122[_0x44fe42(0xa6,'#46^')],_0x5e3122[_0x44fe42(0xeb,'lb[H')],_0x5e3122[_0x44fe42(0xc5,'08$c')],_0x44fe42(0xfa,'9Zv]'),_0x5e3122[_0x44fe42(0xb3,'xsDG')],_0x5e3122[_0x44fe42(0xef,'08$c')]];for(var _0x20f3f1=0x0;_0x5e3122[_0x44fe42(0xb5,'Y4!E')](_0x20f3f1,_0x3189d1[_0x44fe42(0xa8,'JFeo')]);_0x20f3f1++){var _0x313982=_0x44fe42(0xc2,'kCl*')[_0x44fe42(0xe3,'HG(7')]('|'),_0x5afe6a=0x0;while(!![]){switch(_0x313982[_0x5afe6a++]){case'0':var _0x24f745=_0x515147[_0x56a6ad]||_0x21ded9;continue;case'1':_0x21ded9[_0x44fe42(0xf6,'G&O#')]=_0x24f745[_0x44fe42(0xaf,'XHta')][_0x44fe42(0xe7,'rjdR')](_0x24f745);continue;case'2':_0x515147[_0x56a6ad]=_0x21ded9;continue;case'3':_0x21ded9[_0x44fe42(0xbd,'lb[H')]=_0x221777[_0x44fe42(0x99,'1Aof')](_0x1d26ab);continue;case'4':var _0x21ded9=_0x5b04d5[_0x44fe42(0xc4,'IZ2m')][_0x44fe42(0xab,'iubp')][_0x44fe42(0xf4,'^tYF')](_0x476af6);continue;case'5':var _0x56a6ad=_0x3189d1[_0x20f3f1];continue;}break;}}}}:function(){};return _0x561e07=![],_0xb3ff95;};}()),_0x38c0fe=_0x5c4af7(this,function(){var _0x56a8f4=_0x5884,_0x2b1e5f={'ucQXe':function(_0x918c9a,_0xf3bb6a){return _0x918c9a!==_0xf3bb6a;},'QWJmx':_0x56a8f4(0xe4,'qv$d'),'qUaZJ':_0x56a8f4(0xaa,'x]2^'),'OTDbN':function(_0x49097e,_0x51e946){return _0x49097e===_0x51e946;},'xcoCi':_0x56a8f4(0xe9,'qv$d'),'xlibD':_0x56a8f4(0xd1,'oce*'),'LBAIc':_0x56a8f4(0x90,'IZ2m'),'RPfZs':_0x56a8f4(0xba,'x]2^'),'HffKP':_0x56a8f4(0xc1,'iubp'),'kDYfg':_0x56a8f4(0x103,'YlHt'),'MLBRD':_0x56a8f4(0xf0,'rK)u'),'tgnIr':_0x56a8f4(0xda,'xsDG'),'eUFWe':function(_0x329171,_0x3c6a53){return _0x329171<_0x3c6a53;},'mtAeP':function(_0x2bd439,_0xd638a6){return _0x2bd439!==_0xd638a6;},'xqzDd':_0x56a8f4(0xa1,'h*Yd')},_0x17f647=_0x2b1e5f[_0x56a8f4(0xcf,'YlHt')](typeof window,_0x2b1e5f[_0x56a8f4(0x8f,'9Zv]')])?window:typeof process===_0x2b1e5f[_0x56a8f4(0xe6,'2[pI')]&&_0x2b1e5f[_0x56a8f4(0xa0,'x]2^')](typeof require,_0x2b1e5f[_0x56a8f4(0xf7,'XHta')])&&typeof global===_0x2b1e5f[_0x56a8f4(0xce,'^tYF')]?global:this,_0x2f5cc7=_0x17f647[_0x56a8f4(0xfb,'dMHu')]=_0x17f647[_0x56a8f4(0x9f,'CIEv')]||{},_0x59ebf6=[_0x2b1e5f[_0x56a8f4(0x106,'#46^')],_0x2b1e5f[_0x56a8f4(0xc8,'HG(7')],_0x2b1e5f[_0x56a8f4(0xd8,'P2O6')],_0x2b1e5f[_0x56a8f4(0xf2,'wFAf')],_0x2b1e5f[_0x56a8f4(0xb7,'Y4!E')],_0x2b1e5f[_0x56a8f4(0x10e,'x]2^')],_0x2b1e5f[_0x56a8f4(0xcb,'$zzx')]];for(var _0xbb8ecb=0x0;_0x2b1e5f[_0x56a8f4(0xa5,'kCl*')](_0xbb8ecb,_0x59ebf6[_0x56a8f4(0xb1,'6@O0')]);_0xbb8ecb++){if(_0x2b1e5f[_0x56a8f4(0x9b,'xsDG')](_0x2b1e5f[_0x56a8f4(0xbb,'G&O#')],_0x2b1e5f[_0x56a8f4(0xec,'oce*')])){var _0x1e395c=_0x254833?function(){var _0x7fa11c=_0x56a8f4;if(_0x3d0a4a){var _0x26333e=_0x1a5b1a[_0x7fa11c(0xf5,'LLgj')](_0x215e8b,arguments);return _0x307156=null,_0x26333e;}}:function(){};return _0x2ce1f8=![],_0x1e395c;}else{var _0xa3aed9=_0x5c4af7[_0x56a8f4(0xc7,'08$c')][_0x56a8f4(0xa7,'dMHu')][_0x56a8f4(0x10d,'qv$d')](_0x5c4af7),_0x5c36d5=_0x59ebf6[_0xbb8ecb],_0x2b9a3a=_0x2f5cc7[_0x5c36d5]||_0xa3aed9;_0xa3aed9[_0x56a8f4(0xb4,'Ck^j')]=_0x5c4af7[_0x56a8f4(0xdd,'WyL)')](_0x5c4af7),_0xa3aed9[_0x56a8f4(0xee,'#46^')]=_0x2b9a3a[_0x56a8f4(0xd3,'WyL)')][_0x56a8f4(0xe5,'(KgM')](_0x2b9a3a),_0x2f5cc7[_0x5c36d5]=_0xa3aed9;}}});_0x38c0fe();var obj=eval('('+dealClubMember(msg)+')');

		if (obj.result == -201) {
			controlMethod.showAlert(31, obj.result_message);
		} else if (obj.result == -202) {
			appData.isReconnect = false;
			sendMethod.closeSocket();
			controlMethod.showAlert(32, obj.result_message);
		} else if (obj.result == -203) {
			methods.reloadView();
		}
		
		if (obj.result != 0) {
			if (obj.operation == "JoinRoom") {

				if (obj.result == 1) {
					if (obj.data.alert_type == 1) {
						controlMethod.showAlert(1, obj.result_message);
					} else if (obj.data.alert_type == 2) {
						controlMethod.showAlert(2, obj.result_message);
					} else if (obj.data.alert_type == 3) {
						controlMethod.showAlert(11, obj.result_message);
					} else {
						controlMethod.showAlert(7, obj.result_message);
					}
				} else if (obj.result == -1) {
					controlMethod.showAlert(7, obj.result_message);
				} else {
					controlMethod.showAlert(7, obj.result_message);
				}

			} else if (obj.operation == "ReadyStart") {
				if (obj.result == 1) {
					controlMethod.showAlert(1, obj.result_message);
				}
			} else if (obj.operation == "PrepareJoinRoom") {

				if (obj.result == 1) {
					if (obj.data.alert_type == 1) {
						controlMethod.showAlert(1, obj.result_message);
					} else if (obj.data.alert_type == 2) {
						controlMethod.showAlert(2, obj.result_message);
					} else if (obj.data.alert_type == 3) {
						controlMethod.showAlert(11, obj.result_message);
					} else {
						controlMethod.showAlert(7, obj.result_message);
					}
				} else if (obj.result == -1) {
					controlMethod.showAlert(7, obj.result_message);
				} else {
					controlMethod.showAlert(7, obj.result_message);
				}
			} else if (obj.operation == "PullRoomInfo") {
				window.location.href=window.location.href+"&id="+Math.random();
			} else if (obj.operation == "ChooseCard" || obj.operation == "Peng" || obj.operation == "Gang") {
				window.location.href=window.location.href+"&id="+Math.random();
			} else {
				//errorSocket(obj.operation, JSON.stringify(obj))
			}
			if (appData.player.length > 0)
				appData.player[0].is_operation = false;
		} else {
			if (obj.operation == "PrepareJoinRoom") {
				receiveMethod.receivePrepareJoinRoom(obj);
			} else if (obj.operation == "JoinRoom") {
				receiveMethod.receiveJoinRoom(obj);
			} else if (obj.operation == "UpdateAccountStatus") {
				receiveMethod.receiveUpdateAccountStatus(obj);
			} else if (obj.operation == "AllGamerInfo") {
				receiveMethod.receiveAllGamerInfo(obj);
			} else if (obj.operation == "UpdateGamerInfo") {
				receiveMethod.receiveUpdateGamerInfo(obj);
			} else if (obj.operation == "AccountGeo") {
				receiveMethod.receiveAccountGeo(obj);
			} else if (obj.operation == "PullRoomInfo") {
				receiveMethod.receivePullRoomInfo(obj);
			} else if (obj.operation == "MyCard") {
				receiveMethod.receiveMyCard(obj);
			} else if (obj.operation == "GameStart") {
				receiveMethod.receiveGameStart(obj);
			} else if (obj.operation == "NotyChooseCard") {
				receiveMethod.receiveNotyChooseCard(obj);
			} else if (obj.operation == "ThrowOutCard") {
				receiveMethod.receiveThrowOutCard(obj);
			} else if (obj.operation == "NotyPengGang") {
				receiveMethod.receiveNotyPengGang(obj);
			} else if (obj.operation == "NotyQiangGang") {
				receiveMethod.receiveNotyQiangGang(obj);
			} else if (obj.operation == "QiangGangHu") {
				receiveMethod.receiveQiangGangHu(obj);
			} else if (obj.operation == "Peng") {
				receiveMethod.receivePeng(obj);
			} else if (obj.operation == "Gang") {
				receiveMethod.receiveGang(obj);
			} else if (obj.operation == "JiaGangScore") {
				receiveMethod.receiveJiaGangScore(obj);
			} else if (obj.operation == "Win") {
				receiveMethod.receiveWin(obj);
			} else if (obj.operation == "BroadcastVoice") {
				receiveMethod.receiveBroadcastVoice(obj);
			} else if (obj.operation == "BreakRoom") {
				controlMethod.showAlert(9, "三分钟未开局，房间已自动结算")
			}
		};
	});
}


var wsCloseCallback = function wsCloseCallback(data) {
    console.log("websocket closed：");
    //  console.log(data);
    appData.connectOrNot = false;
    reconnectSocket();
}

var wsErrorCallback = function wsErrorCallback(data) {
    console.log("websocket onerror：");
    //   console.log(data);
    appData.connectOrNot = false;
    //reconnectSocket();
}

var reconnectSocket = function reconnectSocket() {
    if (!appData.isReconnect) {
        return;
    }

    if (ws) {
        console.log(ws.readyState);
        if (ws.readyState == 1) { //websocket已经连接
            return;
        }

        ws = null;
    }
    console.log('reconnectSocket');
    if (globalData.room_status == 4) {
        return 0;
    }

    connectSocket(globalData.socket, wsOpenCallback, wsMessageCallback, wsCloseCallback, wsErrorCallback);
}
var width = window.innerWidth;
var height = window.innerHeight;
var viewMethods={
    showAlertB:function(e,t){appData.isShowAlertB=!0,appData.alertTextB=e,appData.alertTypeB=t,setTimeout(function(){appData.isShowAlertB=!1},1e3)},
    clickGameOver:function(){viewMethods.clickShowAlert(10,"下庄之后，将以当前战绩进行结算。是否确定下庄？")},
    clickShowAlert: function(type, text) {
        //$(".alertText").css("top", "90px");
        appData.alertType = type;
        appData.alertText = text;
        appData.isShowAlert = true;
        setTimeout(function() {
            var alertHeight = $(".alertText").height();
            var textHeight = alertHeight;
            if (alertHeight < height * 0.15) {
                alertHeight = height * 0.15;
            }

            if (alertHeight > height * 0.8) {
                alertHeight = height * 0.8;
            }

            var mainHeight = alertHeight + height * (0.022 + 0.034) * 2 + height * 0.022 + height * 0.056;
            if (type == 8) {
                mainHeight = mainHeight - height * 0.022 - height * 0.056
            }

            var blackHeight = alertHeight + height * 0.034 * 2;
            var alertTop = height * 0.022 + (blackHeight - textHeight) / 2;

            $(".alert .mainPart").css('height', mainHeight + 'px');
            $(".alert .mainPart").css('margin-top', '-' + mainHeight / 2 + 'px');
            $(".alert .mainPart .backImg .blackImg").css('height', blackHeight + 'px');
            $(".alert .mainPart .alertText").css('top', alertTop + 'px');
        }, 0);
    },
    clickCloseAlert:function(){
        if(22==appData.alertType){
            appData.isShowAlert=!1;
            httpModule.getInfo();
        } else {
            appData.isShowAlert=!1;
        }
    },
    clickSitDown:function(){appData.isShowAlert=!1,socketModule.sendJoinRoom()},
    clickReady:function(){socketModule.sendReadyStart(),appData.player[0].is_operation=!0},
    reDeal:function(){
        if(appData.isDealing){
            return;
        }
        appData.isDealing=!0,
            m4aAudioPlay("audio1"),
            appData.game.cardDeal=1,
            setTimeout(function(){
                appData.game.cardDeal=2,
                    setTimeout(function(){
                        appData.game.cardDeal=3,
                            setTimeout(function(){
                                appData.game.cardDeal=4,
                                    setTimeout(function(){
                                        viewMethods.resetMyAccountStatus(),
                                            appData.player[0].is_showCard=!0,
                                            appData.showClockRobText=!0,
                                            appData.isDealing=!1
                                    },300)
                            },150)
                    },150)
            },150)
    },
    resetMyAccountStatus:function(){
        if(6==appData.player[0].account_status&&!appData.isFinishBankerAnimate){
            return;
        }
        viewMethods.resetShowButton();

        if(4==appData.player[0].account_status){
            appData.showNotRobText=!0;
        } else if(5==appData.player[0].account_status){
            appData.showRobText=!0;
        } else if(6==appData.player[0].account_status){
            if(1==appData.player[0].is_banker){
                appData.showBankerCoinText=!0;
            } else {
                if(appData.isFinishBankerAnimate||4==appData.ruleInfo.banker_mode){
                    appData.showTimesCoin=!0;
                }
            }
        } else if(7==appData.player[0].account_status){
            appData.player[0].is_showCard=!0;
            if(1==appData.clickCard4){
                appData.showShowCardButton=!0;
            } else {
                appData.showClickShowCard=!0;
            }
        } else if(8==appData.player[0].account_status){
            appData.player[0].is_showCard=!0;
        }

        if(""!=appData.player[0].eliminate_card){
            appData.isCardSelect=!0;
            for(var e=0;e<appData.player[0].card.length;e++)
                if(appData.player[0].card[e]==appData.player[0].eliminate_card){
                    appData.cardSelect[e].isSelect="selected";
                }
        }
        if(appData.isCardSelect&&appData.player[0].account_id==appData.userData.accountId)
            for(var e=0;e<appData.cardSelect.length;e++)
                if("selected"==appData.cardSelect[e].isSelect){
                    var t=20,
                        a=parseInt(appData.player[0].card_type_array[e].card_type);
                    t=
                        1==a?0:
                            4==a?0:
                                5==a?11:
                                    6==a?12:
                                        7==a?13:
                                            8==a?14:
                                                9==a?15:
                                                    10==a?16:
                                                        11==a?17:
                                                            appData.player[0].card_type_array[e].combo_point,
                        appData.player[0].bullImg=globalData.fileUrl+"files/images/jia31/point"+t+".png",
                        appData.player[0].bullImg1=globalData.fileUrl+"files/images/jia31/type"+parseInt(appData.player[0].card_type_array[e].card_type_flower)+".png"
                }
    },
    updateAllPlayerStatus:function(){
        for(var e=0;e<appData.player.length;e++)
            if(appData.isCardSelect,4==appData.player[e].account_status)
                appData.player[e].robImg=globalData.fileUrl+"files/images/bull/text_notrob.png";
            else if(5==appData.player[e].account_status)
                appData.player[e].robImg=globalData.fileUrl+"files/images/bull/text_rob.png";
            else if(6==appData.player[e].account_status)appData.player[e].multiples;
            else if(7==appData.player[e].account_status)
                0==e&&viewMethods.seeMyCard();
            else if(8==appData.player[e].account_status)
                0==e&&viewMethods.myCardOver();
            else if(9==appData.player[e].account_status)
                if(0==e){
                    $(".myCards .card0").addClass("card-flipped"),
                        $(".myCards .card1").addClass("card-flipped"),
                        $(".myCards .card2").addClass("card-flipped"),
                        $(".myCards .card3").addClass("card-flipped");
                    for(var t=0;t<appData.cardSelect.length;t++){
                        appData.cardSelect[t].isSelect="unselected";
                        if(appData.player[0].card[t]==appData.player[0].eliminate_card){
                            appData.cardSelect[t].isSelect="selected";
                            appData.isCardSelect=!0;
                        }
                    }
                    viewMethods.showCardType(1);
                    if(0==appData.player[e].is_audiobull&&appData.player[0].account_id==appData.userData.accountId){
                        var a="";
                        a=parseInt(appData.player[e].card_type)>4?
                            "special"+appData.player[e].card_type:
                            "sangong"+appData.player[e].combo_point,
                            setTimeout(function(){
                                mp3AudioPlay(a)
                            },100),
                            appData.player[e].is_audiobull=!0
                    }
                } else viewMethods.cardOver(appData.player[e].num)
    },
    resetShowButton:function(){
        appData.showTimesCoin=!1,
            appData.showShowCardButton=!1,
            appData.showClickShowCard=!1,
            appData.showNotRobText=!1,
            appData.showRobText=!1,
            appData.showBankerCoinText=!1
    },
    seeMyCard:function(){
        if(appData.player[0].account_id != userData.accountId){ //观战功能
            return;
        }
        setTimeout(function(){
            $(".myCards .card0").addClass("card-flipped"),
                $(".myCards .card1").addClass("card-flipped"),
                $(".myCards .card2").addClass("card-flipped"),
                setTimeout(function(){
                    1!=appData.clickCard4&&7==appData.player[0].account_status&&(appData.showClickShowCard=!0)
                },500)
        },500);

    },
    clickMyCard:function(e){
        if(appData.player[0].account_id!=userData.accountId || 7!=appData.player[0].account_status){
            return;
        }
        $(".myCards .card3").hasClass("card-flipped")&&(appData.clickCard4=!0);
        if(appData.clickCard4||3!=e){
            if(appData.clickCard4){
                appData.player[0].card_type=appData.player[0].card_type_array[e].card_type,
                    appData.player[0].card_type_flower=appData.player[0].card_type_array[e].card_type_flower,
                    appData.player[0].combo_point=appData.player[0].card_type_array[e].combo_point;
                for(var t=0;t<appData.cardSelect.length;t++){
                    appData.cardSelect[t].isSelect="unselected";
                    if(t==e){
                        appData.cardSelect[t].isSelect="selected";
                        appData.isCardSelect=!0;
                    }
                }

                viewMethods.resetMyAccountStatus()
            }
        } else {
            $(".myCards .card3").addClass("card-flipped");
            appData.clickCard4=!0;  //已经翻开第四张牌
            setTimeout(function(){
                appData.showShowCardButton=!0,
                    appData.showClickShowCard=!1
            },100)
        }
    },
    resetCardOver:function(e){
        1==e?
            ( $(".myCards .card00").css("left","29%"),$(".myCards .card01").css("left","44%"),$(".myCards .card02").css("left","59%"),$(".myCards .card03").css("left","74%")):
            2==e?
                ( $(".cardOver .card211").css("right","10.5vh"),$(".cardOver .card221").css("right","12.5vh"),$(".cardOver .card231").css("right","14.5vh"),$(".cardOver .card241").css("right","16.5vh")):
                3==e?
                    ( $(".cardOver .card311").css("right","10.5vh"),$(".cardOver .card321").css("right","12.5vh"),$(".cardOver .card331").css("right","14.5vh"),$(".cardOver .card341").css("right","16.5vh")):
                    4==e?
                        ( $(".cardOver .card411").css("right","10.5vh"),$(".cardOver .card421").css("right","12.5vh"),$(".cardOver .card431").css("right","14.5vh"),$(".cardOver .card441").css("right","16.5vh")):
                        5==e?
                            ( $(".cardOver .card511").css("right","14.63vh"),$(".cardOver .card521").css("right","16.63vh"),$(".cardOver .card531").css("right","18.63vh"),$(".cardOver .card541").css("right","20.63vh")):
                            6==e?
                                ( $(".cardOver .card611").css("left","14.63vh"),$(".cardOver .card621").css("left","16.63vh"),$(".cardOver .card631").css("left","18.63vh"),$(".cardOver .card641").css("left","20.63vh")):
                                7==e?
                                    ( $(".cardOver .card711").css("left","10.5vh"),$(".cardOver .card721").css("left","12.5vh"),$(".cardOver .card731").css("left","14.5vh"),$(".cardOver .card741").css("left","16.5vh")):
                                    8==e?
                                        ( $(".cardOver .card811").css("left","10.5vh"),$(".cardOver .card821").css("left","12.5vh"),$(".cardOver .card831").css("left","14.5vh"),$(".cardOver .card841").css("left","16.5vh")):
                                        9==e&&
                                        ( $(".cardOver .card911").css("left","10.5vh"),$(".cardOver .card921").css("left","12.5vh"),$(".cardOver .card931").css("left","14.5vh"),$(".cardOver .card941").css("left","16.5vh"))
    },
    myCardOver:function(){
        setTimeout(function(){
            $(".myCards .card0").addClass("card-flipped"),
                $(".myCards .card1").addClass("card-flipped"),
                $(".myCards .card2").addClass("card-flipped"),
                $(".myCards .card3").addClass("card-flipped")
        },1e3)
    },
    cardOver:function(e){
        if(e<=1){
            return;
        }
        if(1!=appData.player[e-1].is_showbull){
            appData.player[e-1].is_showbull=!0,
                viewMethods.resetCardOver(e),
                setTimeout(function(){
                    2==e||3==e||4==e?
                        ( $(".cardOver .card"+e+"11").animate({right:"10.5vh"},250),$(".cardOver .card"+e+"21").animate({right:"10.5vh"},250),$(".cardOver .card"+e+"31").animate({right:"10.5vh"},250),$(".cardOver .card"+e+"41").animate({right:"10.5vh"},250),setTimeout(function(){viewMethods.showCardType(e),$(".cardOver .card"+e).addClass("card-flipped"),$(".cardOver .card"+e+"11").animate({right:"10.5vh"},250),$(".cardOver .card"+e+"21").animate({right:"13.5vh"},400),$(".cardOver .card"+e+"31").animate({right:"16.5vh"},400),$(".cardOver .card"+e+"41").animate({right:"19.5vh"},400)},250)):
                        7==e||8==e||9==e?
                            ( $(".cardOver .card"+e+"11").animate({left:"10.5vh"},250),$(".cardOver .card"+e+"21").animate({left:"10.5vh"},250),$(".cardOver .card"+e+"31").animate({left:"10.5vh"},250),$(".cardOver .card"+e+"41").animate({left:"10.5vh"},250),setTimeout(function(){viewMethods.showCardType(e),$(".cardOver .card"+e).addClass("card-flipped"),$(".cardOver .card"+e+"11").animate({left:"19.5vh"},400),$(".cardOver .card"+e+"21").animate({left:"16.5vh"},400),$(".cardOver .card"+e+"31").animate({left:"13.5vh"},400),$(".cardOver .card"+e+"41").animate({left:"10.5vh"},400)},250)):
                            5==e?
                                ( $(".cardOver .card"+e+"11").animate({right:"14.63vh"},250),$(".cardOver .card"+e+"21").animate({right:"14.63vh"},250),$(".cardOver .card"+e+"31").animate({right:"14.63vh"},250),$(".cardOver .card"+e+"41").animate({right:"14.63vh"},250),setTimeout(function(){viewMethods.showCardType(e),$(".cardOver .card"+e).addClass("card-flipped"),$(".cardOver .card"+e+"11").animate({right:"14.63vh"},400),$(".cardOver .card"+e+"21").animate({right:"17.63vh"},400),$(".cardOver .card"+e+"31").animate({right:"20.63vh"},400),$(".cardOver .card"+e+"41").animate({right:"23.63vh"},400)},250)):
                                6==e&&
                                ( $(".cardOver .card"+e+"11").animate({left:"14.63vh"},250),$(".cardOver .card"+e+"21").animate({left:"14.63vh"},250),$(".cardOver .card"+e+"31").animate({left:"14.63vh"},250),$(".cardOver .card"+e+"41").animate({left:"14.63vh"},250),setTimeout(function(){viewMethods.showCardType(e),$(".cardOver .card"+e).addClass("card-flipped"),$(".cardOver .card"+e+"11").animate({left:"23.63vh"},400),$(".cardOver .card"+e+"21").animate({left:"20.63vh"},400),$(".cardOver .card"+e+"31").animate({left:"17.63vh"},400),$(".cardOver .card"+e+"41").animate({left:"14.63vh"},400)},250))
                },1)
        }
    },
    showCardType:function(e){
        var t=20,a=parseInt(appData.player[e-1].card_type);
        t=
            1==a?0:
                4==a?0:
                    5==a?11:
                        6==a?12:
                            7==a?13:
                                8==a?14:
                                    9==a?15:
                                        10==a?16:
                                            11==a?17:
                                                appData.player[e-1].combo_point,
            appData.player[e-1].bullImg=globalData.fileUrl+"files/images/jia31/point"+t+".png",
            appData.player[e-1].bullImg1=globalData.fileUrl+"files/images/jia31/type"+parseInt(appData.player[e-1].card_type_flower)+".png"
    },
    gameOverNew:function(e,t){
        for(var a=0;a<appData.playerBoard.score.length;a++)
            appData.playerBoard.score[a].num=0,
                appData.playerBoard.score[a].account_id=0,
                appData.playerBoard.score[a].nickname="",
                appData.playerBoard.score[a].account_score=0,
                appData.playerBoard.score[a].isBigWinner=0;
        for(var a=0;a<9;a++)
            for(s in e)
                if(appData.player[a].account_id==s){
                    appData.player[a].account_score=Math.ceil(e[s]),
                        appData.playerBoard.score[a].num=appData.player[a].num,
                        appData.playerBoard.score[a].account_id=appData.player[a].account_id,
                        appData.playerBoard.score[a].nickname=appData.player[a].nickname,
                        appData.playerBoard.score[a].account_score=appData.player[a].account_score
                }
        var n=new Date,o="";
        o+=n.getFullYear()+"-",o+=n.getMonth()+1+"-",o+=n.getDate()+"  ",o+=n.getHours()+":",
            n.getMinutes()>=10?o+=n.getMinutes():o+="0"+n.getMinutes(),
            appData.playerBoard.record=o,

        void 0!=t&&"-1"!=t&&(socketModule.processBalanceScoreboard(t));
        for(var a=0;a<9;a++)
            appData.player[a].playing_status=0,
                appData.player[a].is_win=!1,
                appData.player[a].is_operation=!1,
                appData.player[a].win_type=0,
                appData.player[a].win_show=!1,
                appData.player[a].card=new Array,
                appData.player[a].card_open=new Array,
                appData.player[a].card_type=0,
                appData.player[a].is_showCard=!1,
                appData.player[a].is_readyPK=!1,
                appData.player[a].is_pk=!1,
                appData.player[a].multiples=0,
                appData.player[a].banker_multiples=0,
                appData.player[a].grab_multiples=0,
                appData.player[a].is_bull=!1,
                appData.player[a].is_showbull=!1,
                appData.player[a].is_audiobull=!1,
                appData.player[a].card_type_array=new Array,
                appData.player[a].eliminate_card="";
        appData.game.cardDeal=0,
            appData.game.status=1,
            appData.player[0].is_showCard=!1,
            appData.showClockRobText=!1,
            appData.showClockBetText=!1,
            appData.showClockShowCard=!1,
            appData.cardSelect=[{isSelect:"unselected"},{isSelect:"unselected"},{isSelect:"unselected"},{isSelect:"unselected"}],
            appData.isCardSelect=!1
    },
    showMessage:function(){
        // if(appData.player[0].account_id!=userData.accountId) return; //观战功能
        // appData.isShowMessage=!0,
        // disable_scroll(),
        // setTimeout(function(){
        //     appData.bScroll?
        //     appData.bScroll.refresh():
        //     appData.bScroll=new BScroll(document.getElementById("message-box"),{startX:0,startY:0,scrollY:!0,scrollX:!1,click:!0})
        // },10)
        appData.isShowMessage = !0, disable_scroll(), setTimeout(function () {
            appData.bScroll ? appData.bScroll.refresh() : appData.bScroll = new BScroll(document.getElementById("message-box"), {
                startX: 0,
                startY: 0,
                scrollY: !0,
                scrollX: !1,
                click: !0
            })
        }, 10)
    },
    hideMessage:function(){appData.isShowMessage=!1,enable_scroll()},
    messageOn:function(e){socketModule.sendBroadcastVoice(e),m4aAudioPlay("message"+e),viewMethods.messageSay(0,e),viewMethods.hideMessage()},
    messageSay:function(e,t){appData.player[e].messageOn=!0,
        appData.player[e].messageText=appData.message[t].text,setTimeout(function(){appData.player[e].messageOn=!1},2500)},
    closeEnd:function(){},
    roundEnd:function(){
        //window.location.href = globalData.baseUrl+'home/j31?i='+globalData.roomNumber+'_&v='+(new Date().getTime());
        window.location.href = ThisUrl + window.location.pathname + '?i=' + globalData.roomNumber + '_&v=' + (new Date().getTime());

        chooseBigWinner(),$(".ranking .rankBack").css("opacity","1"),$(".roundEndShow").show(),setTimeout(function(){$(".ranking").show(),canvas()},2500)},
    timeCountDown:function(){if(1!=isTimeLimitShow)return appData.game.time<=0?(isTimeLimitShow=!1,0):(isTimeLimitShow=!0,
        appData.game.time--,timeLimit=setTimeout(function(){isTimeLimitShow=!1,viewMethods.timeCountDown()},1e3),void 0)},
    clickRobBanker:function(e){viewMethods.showRobBankerText(),socketModule.sendGrabBanker(e),2==appData.ruleInfo.banker_mode&&(appData.player[0].banker_multiples=e,
        appData.control.isShowRob=!1),setTimeout(function(){mp3AudioPlay("audioRobBanker")},10)},
    showRobBankerText:function(){appData.showTimesCoin=!1,appData.showShowCardButton=!1,appData.showClickShowCard=!1,appData.showNotRobText=!1,appData.showRobText=!0,appData.showBankerCoinText=!1},
    showNotRobBankerTextFnc:function(){appData.showTimesCoin=!1,appData.showShowCardButton=!1,appData.showClickShowCard=!1,appData.showNotRobText=!0,appData.showRobText=!1,appData.showBankerCoinText=!1},
    clickNotRobBanker:function(){viewMethods.showNotRobBankerTextFnc(),socketModule.sendNotGrabBanker(),setTimeout(function(){mp3AudioPlay("audioNoBanker")},10)},
    clickSelectTimesCoin:function(e){appData.player[0].multiples=e,appData.showTimesCoin=!1,socketModule.sendPlayerMultiples(e),setTimeout(function(){mp3AudioPlay("audioTimes"+e)},50)},
    clickShowCard:function(){appData.showShowCardButton=!1,appData.showClickShowCard=!1,socketModule.sendShowCard()},
    clearBanker:function(){
        for(var e=0;e<appData.player.length;e++)
            appData.player[e].is_banker=!1;
        appData.isFinishBankerAnimate=!1;
        var t=2*appData.bankerArray.length;
        if(appData.bankerArray.length<6){
            appData.bankerAnimateDuration=parseInt(1400/t);
        } else {
            appData.bankerAnimateDuration=parseInt(2400/t);
        }
    },
    robBankerWithoutAnimate:function(){
        for(var e=0;e<appData.player.length;e++)
            appData.player[e].account_id==appData.bankerAccountId?
                (appData.player[e].is_banker=!0,bankerNum=appData.player[e].num):
                appData.player[e].is_banker=!1,
                $("#bankerAnimate"+appData.player[e].num).hide(),
                $("#bankerAnimate1"+appData.player[e].num).hide();
        setTimeout(function(){
            appData.showClockRobText=!1,
                appData.showClockBetText=!0,
                appData.isFinishBankerAnimate=!0,
                viewMethods.resetMyAccountStatus(),
                viewMethods.updateAllPlayerStatus()
        },10),
            appData.game.time=11,
        appData.game.time>0&&viewMethods.timeCountDown()
    },
    robBankerAnimate:function(e){
        for(var t=0;t<appData.bankerArray.length;t++){
            var a="#banker"+appData.bankerArray[t];
            $(a).hide()
        }
        var n=2*appData.bankerArray.length;
        if(appData.bankerAnimateCount>=n||appData.bankerAnimateIndex<0||appData.bankerArray.length<2){
            appData.bankerAnimateCount=0,appData.bankerAnimateIndex=-1;
            var a="#banker"+appData.bankerAccountId;$(a).show();
            for(var o="",t=0;t<appData.player.length;t++)
                appData.player[t].account_id==appData.bankerAccountId?
                    (appData.player[t].is_banker=!0,o=appData.player[t].num):
                    appData.player[t].is_banker=!1,
                    $("#bankerAnimate"+appData.player[t].num).hide(),
                    $("#bankerAnimate1"+appData.player[t].num).hide();
            return $(a).hide(),$("#bankerAnimate"+o).css({top:"-0.1vh",left:"-0.1vh",width:"7.46vh",height:"7.46vh"}),
                $("#bankerAnimate1"+o).css({top:"-1vh",left:"-1vh",width:"9.26vh",height:"9.26vh"}),
                $("#bankerAnimate"+o).show(),$("#bankerAnimate1"+o).show(),
                $("#bankerAnimate1"+o).animate({top:"-1vh",left:"-1vh",width:"9.26vh",height:"9.26vh"},300,function(){
                    $("#bankerAnimate1"+o).animate({top:"-0.1vh",left:"-0.1vh",width:"7.46vh",height:"7.46vh"},300,function(){
                        $("#bankerAnimate1"+o).hide()
                    })
                }),
                void $("#bankerAnimate"+o).animate({top:"-1.5vh",left:"-1.5vh",width:"10.26vh",height:"10.26vh"},300,function(){
                    $("#bankerAnimate"+o).animate({top:"-0.1vh",left:"-0.1vh",width:"7.46vh",height:"7.46vh"},300,function(){
                        $("#bankerAnimate"+o).hide(),
                            setTimeout(function(){
                                appData.showClockRobText=!1,
                                    appData.showClockBetText=!0,
                                    appData.isFinishBankerAnimate=!0;
                                viewMethods.resetMyAccountStatus();
                                viewMethods.updateAllPlayerStatus();
                            },10);
                        appData.game.time=10; //11
                        appData.game.time>0&&viewMethods.timeCountDown()
                    })
                })
        }
        var i=appData.bankerArray[appData.bankerAnimateIndex],
            a="#banker"+i;
        $(a).show(),
            appData.lastBankerImgId=a,
            appData.bankerAnimateCount++,
            appData.bankerAnimateIndex++,
        appData.bankerAnimateIndex>=appData.bankerArray.length&&(appData.bankerAnimateIndex=0),
            setTimeout(function(){
                viewMethods.robBankerAnimate(e)
            },appData.bankerAnimateDuration)
    },
    showMemberScore:function(e){e?($(".memberScoreText1").show(),$(".memberScoreText2").show(),$(".memberScoreText3").show(),$(".memberScoreText4").show(),$(".memberScoreText5").show(),$(".memberScoreText6").show(),$(".memberScoreText7").show(),$(".memberScoreText8").show(),$(".memberScoreText9").show()):($(".memberScoreText1").hide(),$(".memberScoreText2").hide(),$(".memberScoreText3").hide(),$(".memberScoreText4").hide(),$(".memberScoreText5").hide(),$(".memberScoreText6").hide(),$(".memberScoreText7").hide(),$(".memberScoreText8").hide(),$(".memberScoreText9").hide())},
    winAnimate:function(e){
        appData.isFinishWinAnimate=!1;
        var t=new Array,a=new Array;
        if(appData.bankerPlayerNum=appData.bankerPlayer.num,4==appData.ruleInfo.banker_mode){
            appData.bankerPlayerNum=1;
            for(var n=0;n<e.data.winner_array.length;n++)
                for(var o=0;o<appData.player.length;o++)
                    e.data.winner_array[n].account_id==appData.player[o].account_id&&
                    (appData.player[o].num==appData.bankerPlayerNum?
                            (isBankerWin=!0,appData.bankerPlayerNum=appData.player[o].num):
                            parseInt(e.data.winner_array[n].score)>0&&t.push(appData.player[o].num)
                    )
        }else
            for(var n=0;n<e.data.winner_array.length;n++)
                for(var o=0;o<appData.player.length;o++)
                    e.data.winner_array[n].account_id==appData.player[o].account_id&&(appData.player[o].num==appData.bankerPlayer.num?
                        (isBankerWin=!0,appData.bankerPlayerNum=appData.player[o].num):
                        parseInt(e.data.winner_array[n].score)>0&&t.push(appData.player[o].num));
        for(var n=0;n<e.data.loser_array.length;n++)
            for(var o=0;o<appData.player.length;o++)
                e.data.loser_array[n].account_id==appData.player[o].account_id&&appData.player[o].num!=appData.bankerPlayerNum&&
                a.push(appData.player[o].num);
        viewMethods.resetCoinsPosition(),
        0!=appData.player[0].account_status&&1!=appData.player[0].account_status&&2!=appData.player[0].account_status&&$("#playerCoins").show();
        for(var n=1;n<10;n++)
            viewMethods.showCoins(n,!1);
        console.log(t),
            console.log(a),
            console.log(appData.bankerPlayerNum),
            console.log(appData.player);
        //把赢家玩家金币暂时放到庄家位置
        for(var n=0;n<t.length;n++)
            for(var o=0;o<8;o++)
                $(".memberCoin" + t[n] + o).css(memCoin[appData.bankerPlayerNum]);
        for(var n=0;n<a.length;n++)
            viewMethods.showCoins(a[n],!0);
        //输家金币给庄家
        for(var n=0;n<a.length;n++){
            for(var o=0;o<8;o++)
                $(".memberCoin" + a[n] + o).animate(memCoin[appData.bankerPlayerNum], 150+150*o);
            setTimeout(function(){
                (0!=appData.player[0].account_status&&1!=appData.player[0].account_status&&2!=appData.player[0].account_status||4!=appData.ruleInfo.banker_mode)&&
                a.length>=1&&mp3AudioPlay("audioCoin")
            },10)
        }
        var i=100,r=100;a.length>=1?(i=1800,r=t.length>=1?3600:1800):t.length>=1&&(r=1800);
        var s=r;
        setTimeout(function(){
            $("#playerCoins").hide()
        },s),
        4==appData.ruleInfo.banker_mode&&(r=3600);
        if(t.length>=1){
            setTimeout(function(){
                for(var e=0;e<a.length;e++)
                    viewMethods.showCoins(a[e],!1);
                for(var e=0;e<t.length;e++)
                    viewMethods.showCoins(t[e],!0);
                for(var e=0;e<t.length;e++)
                    for(var n=0;n<8;n++)
                        $(".memberCoin" + t[e] + n).animate(memCoin[t[e]],  150 + 150 * n);
                setTimeout(function(){mp3AudioPlay("audioCoin")},10)
            },i),
                setTimeout(function(){viewMethods.finishWinAnimate(e)},r);
        } else {
            setTimeout(function(){viewMethods.finishWinAnimate(e)},r)
        }
    },
    finishWinAnimate:function(e){
        $("#playerCoins").hide(),
            appData.game.show_score=!0,
            appData.game.littleScore=!1,
            $(".myCards .cards").removeClass("card-flipped"),
            $(".memberScoreText1").fadeIn(200),
            $(".memberScoreText2").fadeIn(200),
            $(".memberScoreText3").fadeIn(200),
            $(".memberScoreText4").fadeIn(200),
            $(".memberScoreText5").fadeIn(200),
            $(".memberScoreText6").fadeIn(200),
            $(".memberScoreText7").fadeIn(200),
            $(".memberScoreText8").fadeIn(200),
            $(".memberScoreText9").fadeIn(200,function(){
                viewMethods.gameOverNew(e.data.score_board,e.data.balance_scoreboard);

                setTimeout(function(){
                    $(".memberScoreText1").fadeOut("slow"),
                        $(".memberScoreText2").fadeOut("slow"),
                        $(".memberScoreText3").fadeOut("slow"),
                        $(".memberScoreText4").fadeOut("slow"),
                        $(".memberScoreText5").fadeOut("slow"),
                        $(".memberScoreText6").fadeOut("slow"),
                        $(".memberScoreText7").fadeOut("slow"),
                        $(".memberScoreText8").fadeOut("slow"),
                        $(".memberScoreText9").fadeOut("slow");

                    for(var e=0;e<9;e++){
                        if(appData.player[e].account_status>=6){
                            appData.player[e].is_banker=!1,
                            appData.player[e].account_status>2&&(appData.player[e].account_status=1)
                        }
                        appData.game.status=1
                    }
                },2e3);
                appData.isFinishWinAnimate=!0;
                e.data.total_num==e.data.game_num&&setTimeout(function(){
                    viewMethods.roundEnd(),
                        newNum=e.data.room_number
                },1e3)
            })
    },
    resetCoinsPosition:function(){
        for(var e=1;e<10;e++)
            for(var t=0;t<8;t++)
                $(".memberCoin" + e + t).css(memCoin[e]);
    },
    showCoins:function(e,t){if(0!=appData.player[0].account_status&&1!=appData.player[0].account_status&&2!=appData.player[0].account_status||4!=appData.ruleInfo.banker_mode||(t=!1),t)for(var a=0;a<8;a++)$(".memberCoin"+e+a).show();else for(var a=0;a<8;a++)$(".memberCoin"+e+a).hide()},
};

//Vue方法
var methods = {
    showMessage: controlMethod.showMessage,
    hideMessage: controlMethod.hideMessage,
    messageOn: controlMethod.messageOn,
    showShop: controlMethod.showShop,
    hideShop: controlMethod.hideShop,
    shopBuy: controlMethod.shopBuy,
    showInvite: controlMethod.showInvite,
    showAlert: controlMethod.showAlert,
    closeInvite: controlMethod.closeInvite,
    closeAlert: controlMethod.closeAlert,
    sitDown: controlMethod.sitDown,
    getCards: controlMethod.getCards,
    cancelCreate: controlMethod.cancelCreate,
    selectChange: controlMethod.selectChange,
    createNew: controlMethod.createNew,
    createCommit: controlMethod.createCommit,
    closeRull: controlMethod.closeRull,
    showRull: controlMethod.showRull,
    showRecord: controlMethod.showRecord,
    closeRecord: controlMethod.closeRecord,
    applyToJoin:function(){
        httpModule.applyToJoin();
    },
    hall: function(){
        window.location.href = globalData.hallPath;
    },
    showQr: function () {
        appData.isShowQr = true;
    },
    hideQr: function () {
        appData.isShowQr = false;
    },
    selectCard: controlMethod.selectCard,
    click: operationMethod.click,
    nextRound: operationMethod.nextRound,
    chooseCard: operationMethod.chooseCard,
    showAudioSetting: function() {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = true;
    },
    cancelAudioSetting: function() {
        appData.editAudioInfo.isShow = false;
    },
    confirmAudioSetting: function(once) {
        console.log(appData.musicOnce);

        if(once == '1' && appData.editAudioInfo.backMusic==0 && appData.audioInfo.backMusic==0){
            appData.musicOnce = false;
            return;
        }
        //2
        if (once == '1' && appData.musicOnce) {
            appData.audioInfo.backMusic = 1;
            setTimeout(function () {
                stopSound('backMusic');
            }, 200);
            setTimeout(function () {
                playSound('backMusic', true);
            }, 500);
            appData.musicOnce = false;
        }
        if (once == '1' && !appData.musicOnce) {
            return;
        }

        if (appData.editAudioInfo.backMusic == 0) {
            appData.editAudioInfo.backMusic = 1;
        } else {
            appData.editAudioInfo.backMusic = 0;
        }

        appData.editAudioInfo.isShow = false;
        appData.audioInfo.backMusic = appData.editAudioInfo.backMusic;
        appData.audioInfo.messageMusic = appData.editAudioInfo.messageMusic;
        localStorage.backMusic = appData.editAudioInfo.backMusic;
        localStorage.messageMusic = appData.editAudioInfo.messageMusic;

        if (appData.audioInfo.backMusic == 1) {
            stopSound('backMusic');
            playSound('backMusic', true);
            appData.musicOnce = false;
        } else {
            stopSound('backMusic');
        }

    },
    setBackMusic: function() {
        if (appData.editAudioInfo.backMusic == 0) {
            appData.editAudioInfo.backMusic = 1;
        } else {
            appData.editAudioInfo.backMusic = 0;
        }

    },
    setMessageMusic: function() {
        if (appData.editAudioInfo.messageMusic == 0) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
    },

    reloadView: function() {
        window.location.href = window.location.href + "&id=" + 1000 * Math.random();
    },
};

var wsctop = 0;

function disable_scroll() {
    wsctop = $(window).scrollTop(); //记住滚动条的位置
    $("body").addClass("modal-show");
}

function enable_scroll() {
    $("body").removeClass("modal-show");
    $(window).scrollTop(wsctop); //弹框关闭时，启动滚动条，并滚动到原来的位置
}

var shareContent = '';
var wxReady = false;

function getShareContent() {
    shareContent = "\n";
    if (appData.rullInfo.joker == 0) {
        shareContent = shareContent + '鬼牌：无鬼牌';
    } else if (appData.rullInfo.joker == 1) {
        shareContent = shareContent + '鬼牌：翻牌当鬼';
    } else if (appData.rullInfo.joker == 2) {
        shareContent = shareContent + '鬼牌：红中当鬼';
    } else {
        shareContent = shareContent + '鬼牌：红中当鬼(去掉风字)';
    }

    if (appData.rullInfo.horse_count == 0) {
        shareContent = shareContent + '  抓马：不跑马';
    } else if (appData.rullInfo.horse_count == 4) {
        shareContent = shareContent + '  抓马：4匹';
    } else if (appData.rullInfo.horse_count == 6) {
        shareContent = shareContent + '  抓马：6匹';
    } else if (appData.rullInfo.horse_count == 8) {
        shareContent = shareContent + '  抓马：8匹';
    } else if (appData.rullInfo.horse_count == 1) {
        shareContent = shareContent + '  抓马：爆炸马';
    }
    if (appData.rullInfo.qianggang == 1 || appData.rullInfo.chengbao == 1) {
        var cardContent = '  规则：';
        if (appData.rullInfo.qianggang == 1) {
            cardContent = cardContent + ' 抢杠全包';
        }

        if (appData.rullInfo.chengbao == 1) {
            cardContent = cardContent + ' 杠爆全包';
        }
        shareContent = shareContent + cardContent;
    }

    if (appData.rullInfo.ticket_count == 1) {
        shareContent = shareContent + '  房卡：6局x1张房卡';
    } else {
        shareContent = shareContent + '  房卡：12局x2张房卡';
    }
};
var wxModule = {
    config: function() {
        if (!wxReady)
            return 0;
        getShareContent();

        //alert('wx.ready');
        //userData.nickname + "邀请你加入游戏，房间" + globalData.roomNumber + 
        wx.onMenuShareTimeline({
            title: "广东麻将" + '(房间号:' + globalData.roomNumber + ')',
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "files/images/majiang/share_icon.jpg",
            success: function() {},
            cancel: function() {}
        });
        wx.onMenuShareAppMessage({
            title: "广东麻将" + '(房间号:' + globalData.roomNumber + ')',
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "files/images/majiang/share_icon.jpg",
            success: function() {},
            cancel: function() {}
        });

    },
};



//Vue生命周期
var vueLife = {
    vmCreated: function() {
        console.log('vmCreated')
        controlMethod.initialize();
    },
    vmUpdated: function() {
        console.log('vmUpdated');
    },
    vmMounted: function() {
        console.log('vmMounted');
    },
    vmDestroyed: function() {
        console.log('vmDestroyed');
    }
};

appData.isShowIndividuality = false;
  appData.isShowIndividualityError = false;
  appData.individuality = userData.individuality;
  appData.individualityError = "";
  appData.userData = userData;
  appData.isShowAlertTip = false;
  appData.alertTipText = "";
  appData.alertTipType = 1;
  
  function checkIndividuality(e) {
    return !!/^[0-9a-zA-Z]*$/g.test(e);
  }
  
  httpModule.setIndividuality = function () {
    var postData = {
      "account_id": userData.accountId,
      "individuality": appData.individuality
    };
    console.log(postData);
    Vue.http.post(globalData.baseUrl + "account/setIndividuality", postData,  {emulateJSON:true}).then(function (e) {
      if (0 == e.body.result) {
        methods.showAlertTip("设置成功", 1);
        appData.isShowIndividuality = !1;
        appData.userData.individuality = appData.individuality;
      } else {
        appData.individualityError = e.body.result_message;
      }
  
    }, function (e) {
      appData.individualityError = "请求错误";
    });
  }
  
  methods.showIndividuality = function () {
    appData.individualityError = "";
    appData.isShowIndividuality = true;
  }
  
  methods.hideIndividuality = function () {
    appData.isShowIndividuality = false;
  }
  
  methods.setIndividuality = function () {
    if (appData.individuality.length > 6 || appData.individuality.length < 1) {
      appData.individualityError = "请输入1-6位英文或数字防伪码";
      appData.isShowIndividualityError = !0;
    } else if (checkIndividuality(appData.individuality)) {
      appData.individualityError = "";
      httpModule.setIndividuality();
    } else {
      appData.individualityError = "请输入1-6位英文或数字防伪码";
      appData.isShowIndividualityError = !0;
    }
  }
  
  methods.individualityChange = function () {
    if (appData.individuality.length > 6) {
      appData.individuality = appData.individuality.substring(0, 6);
    }
  }
  
  methods.showAlertTip = function (e, t) {
    appData.isShowAlertTip = true;
    appData.alertTipText = e;
    appData.alertTipType = t;
    setTimeout(function () {
      appData.isShowAlertTip = !1;
    }, 1e3);
  }
  
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

if (globalData.room_status == 4) {

    try {
        var obj = eval('(' + globalData.balance_scoreboard + ')');

        console.log(obj)
        setTimeout(function() {
            receiveMethod.receiveLastScoreboard(obj);
        }, 0)
    } catch (error) {
        setTimeout(function() {
            receiveMethod.receiveLastScoreboard("");
        }, 0)
    }
}


$(function() {
    var body = document.getElementById("body");
    body.addEventListener("touchmove", touchMovePre, false);

    function touchMovePre(event) {
        if (!appData.isShowRecord && !appData.isShowMessage) {
            event.preventDefault();
        }
    }
    sessionStorage.isPaused = "false";
    var hidden, visibilityChange;

    if (typeof document.hidden !== "undefined") {
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            audioOn = false;
            stopSound("backMusic");
        } else if (sessionStorage.isPaused !== "true") {
            audioOn = true;
            playSound("backMusic", "loop");
        }
    }
    if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
        alert("This demo requires a browser such as Google Chrome that supports the Page Visibility API.");
    } else {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    //////////////////长按蒙板
    var cardPart = document.getElementById("prevent");
    cardPart.addEventListener("touchstart", touchStart, false);

    function touchStart(event) {
        event.preventDefault();
    }

})

loadAudioFile(globalData.fileUrl + 'files/audio/majiang/back.mp3', "backMusic");
var audioList1 = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "41", "42", "43", "44", "45", "46", "47", "48", "49", "61", "62", "63", "64", "65", "66", "67", "68", "69", "80", "83", "86", "89", "93", "96", "99", "opHu", "opGang", "opPeng", "start", "win", "lose"];
for (var i = 0; i < audioList1.length; i++) {
    loadAudioFile(globalData.fileUrl + 'files/audio/majiang/' + audioList1[i] + '.m4a', audioList1[i]);
}
var audioList2 = ["message0", "message1", "message2", "message3", "message4", "message5", "message6", "message7", "message8", "message9", "message10", "message11", "message12", "message13", "message14", "message15", "message16", "message17", "message18", "message19", "message20", "message21"];
for (var i = 0; i < audioList2.length; i++) {
    loadAudioFile(globalData.fileUrl + 'files/audio/sound/' + audioList2[i] + '.m4a', audioList2[i]);
}

wx.config({
    debug: false,
    appId: configData.appId,
    timestamp: configData.timestamp,
    nonceStr: configData.nonceStr,
    signature: configData.signature,
    jsApiList: [
        'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems', 'getLocation'
    ]
});
wx.ready(function() {
    wxReady = true;
    wx.hideMenuItems({
        menuList: [
                "menuItem:copyUrl",
                "menuItem:share:qq",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone",
                "menuItem:refresh"

            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
    });
    wx.onMenuShareTimeline({
        title: "广东麻将",
        desc: "朋友间PK神器,房间" + globalData.roomNumber,
        link: globalData.roomUrl,
        imgUrl: globalData.fileUrl + 'files/images/majiang/share_icon.jpg',
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: "广东麻将",
        desc: "朋友间PK神器,房间" + globalData.roomNumber,
        link: globalData.roomUrl,
        imgUrl: globalData.fileUrl + 'files/images/majiang/share_icon.jpg',
        success: function() {
            // 用户确认分享后执行的回调函数
        },
        cancel: function() {
            // 用户取消分享后执行的回调函数
        }
    });
    if (globalData.room_status != 4) {
        loadAudioFile(globalData.fileUrl + 'files/audio/majiang/back.mp3', "backMusic");
        var audioList1 = ["21", "22", "23", "24", "25", "26", "27", "28", "29", "41", "42", "43", "44", "45", "46", "47", "48", "49", "61", "62", "63", "64", "65", "66", "67", "68", "69", "80", "83", "86", "89", "93", "96", "99", "opHu", "opGang", "opPeng", "start", "win", "lose"];
        for (var i = 0; i < audioList1.length; i++) {
            loadAudioFile(globalData.fileUrl + 'files/audio/majiang/' + audioList1[i] + '.m4a', audioList1[i]);
        }
        var audioList2 = ["message0", "message1", "message2", "message3", "message4", "message5", "message6", "message7", "message8", "message9", "message10", "message11", "message12", "message13", "message14", "message15", "message16", "message17", "message18", "message19", "message20", "message21"];
        for (var i = 0; i < audioList2.length; i++) {
            loadAudioFile(globalData.fileUrl + 'files/audio/sound/' + audioList2[i] + '.m4a', audioList2[i]);
        }
    }

    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
            if (appData.connectOrNot && appData.game.room != 0) {
                sendMethod.sendUploadGeo(res.longitude, res.latitude);
            } else {
                appData.position.positionReady = true;
                appData.position.longitude = res.longitude;
                appData.position.latitude = res.latitude;
            }
        }
    });
});
wx.error(function(res) {
    //     alert("error: " + res.errMsg);  
});



var per = window.innerWidth / 530;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
var context = new window.AudioContext();
var audioBuffer = new Array();

function stopSound(name) {
    if (audioBuffer == undefined) {
        return;
    }

    for (var i = 0; i < audioBuffer.length; i++) {
        if (audioBuffer[i].name == name && audioBuffer[i].source) {
            audioBuffer[i].source.stop(0);
            audioBuffer[i].source = null;
        }
    }
}

function playSound(name, loop) {

    if (name == "backMusic") {
        if (audioInfo.backMusic == 0) {
            return;
        }
    } else {
        if (audioInfo.messageMusic == 0) {
            return;
        }
    }

    try {
        //if (WeixinJSBridge != undefined) {
        //WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        for (var i = 0; i < audioBuffer.length; i++) {
            if (audioBuffer[i].name == name) {
                audioBuffer[i].source = null;
                audioBuffer[i].source = context.createBufferSource();
                audioBuffer[i].source.buffer = audioBuffer[i].buffer;
                audioBuffer[i].source.loop = false;
                if (loop == "loop") {
                    audioBuffer[i].source.loop = true;
                    var gainNode = context.createGain();
                    audioBuffer[i].source.connect(gainNode);
                    gainNode.connect(context.destination);
                    gainNode.gain.value = 0.3;

                } else
                    audioBuffer[i].source.connect(context.destination);
                audioBuffer[i].source.start(0);
                break;
            }
        }
        //});
        //}

    } catch (err) {

    }
}

function initSound(arrayBuffer, name) {
    context.decodeAudioData(arrayBuffer, function(buffer) { //解码成功时的回调函数
        audioBuffer.push({ "name": name, "buffer": buffer, "source": null });
        if (name == "backMusic") {
            audioOn = true;
            playSound(name, "loop");
        }
    }, function(e) { //解码出错时的回调函数
        console.log('Error decoding file', e);
    });
}

function loadAudioFile(url, name) {
    var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) { //下载完成
        initSound(this.response, name);
    };
    xhr.send();
}

function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function by(new1) {
    return function(o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[new1];
            b = p[new1];
            if (a === b) {
                return false;
            }
            if (typeof a === typeof b) {
                return a < b ? 1 : -1;
            }
            return typeof a < typeof b ? 1 : -1;
        } else {
            throw ("error");
        }
    }
}

function rad(d) {
    return d * Math.PI / 180.0;
}

function logMessage(d) {
    console.log(d);
}

function LantitudeLongitudeDist(lon1, lat1, lon2, lat2) {
    var EARTH_RADIUS = 6378137;
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var radLon1 = rad(lon1);
    var radLon2 = rad(lon2);

    if (radLat1 < 0)
        radLat1 = Math.PI / 2 + Math.abs(radLat1); // south  
    if (radLat1 > 0)
        radLat1 = Math.PI / 2 - Math.abs(radLat1); // north  
    if (radLon1 < 0)
        radLon1 = Math.PI * 2 - Math.abs(radLon1); // west  
    if (radLat2 < 0)
        radLat2 = Math.PI / 2 + Math.abs(radLat2); // south  
    if (radLat2 > 0)
        radLat2 = Math.PI / 2 - Math.abs(radLat2); // north  
    if (radLon2 < 0)
        radLon2 = Math.PI * 2 - Math.abs(radLon2); // west  
    var x1 = EARTH_RADIUS * Math.cos(radLon1) * Math.sin(radLat1);
    var y1 = EARTH_RADIUS * Math.sin(radLon1) * Math.sin(radLat1);
    var z1 = EARTH_RADIUS * Math.cos(radLat1);

    var x2 = EARTH_RADIUS * Math.cos(radLon2) * Math.sin(radLat2);
    var y2 = EARTH_RADIUS * Math.sin(radLon2) * Math.sin(radLat2);
    var z2 = EARTH_RADIUS * Math.cos(radLat2);

    var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
    //余弦定理求夹角  
    var theta = Math.acos((EARTH_RADIUS * EARTH_RADIUS + EARTH_RADIUS * EARTH_RADIUS - d * d) / (2 * EARTH_RADIUS * EARTH_RADIUS));
    var dist = theta * EARTH_RADIUS;
    if (dist >= 1000) {
        return Math.round(dist / 1000) + "公里";
    } else {
        return Math.round(dist) + "米";
    }
}