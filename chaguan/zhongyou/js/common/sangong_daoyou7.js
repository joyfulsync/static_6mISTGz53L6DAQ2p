var ws;
var game = {
    "room": 0,
    "room_number": globalData.roomNumber,
    "room_url": 0,
    'score': 0,
    "status": 0,
    "time": -1,
    "round": 0,
    "total_num": 12,
    "currentScore": 0,
    "cardDeal": 0,
    'can_open': 0,
    "current_win": 0,
    "is_play": false,
    "show_card": false,
    "base_score": 0,
    "show_score": false,
    "show_bettext": false
};
globalData.max_count = data.max_count==0?6:data.max_count;
globalData.cfile_url = data.cfile_url;
globalData.file_url = data.file_url

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

var message = [
    { "num": 0, "text": "快点吧，我等到花儿也谢了" },
    { "num": 1, "text": "我出去叫人" },
    { "num": 2, "text": "你的牌好靓哇" },
    { "num": 3, "text": "我当年横扫澳门九条街" },
    { "num": 4, "text": "算你牛逼"},
    { "num": 5, "text": "别吹牛逼，有本事干到底"},
    { "num": 6, "text": "输得裤衩都没了" },
    { "num": 7, "text": "我给你们送温暖了" },
    { "num": 8, "text": "谢谢老板" },
    { "num": 9, "text": "我来啦，让你们久等了" },
    { "num": 10, "text": "我出去一下，马上回来，等我哦" },
    { "num": 11, "text": "怎么断线了，网络太差了" },
    { "num": 12, "text": "搏一搏，单车变摩托" }
];

var wsOperation = {
    JoinRoom: "JoinRoom",
    ReadyStart: "ReadyStart",
    SwapSeat: "SwapSeat",
    PrepareJoinRoom: "PrepareJoinRoom",
    AllGamerInfo: "AllGamerInfo",
    UpdateGamerInfo: "UpdateGamerInfo",
    UpdateAccountStatus: "UpdateAccountStatus",
    StartLimitTime: "StartLimitTime",
    CancelStartLimitTime: "CancelStartLimitTime",
    GameStart: "GameStart",
    NotyChooseChip: "NotyChooseChip",
    CardInfo: "CardInfo",
    UpdateAccountScore: "UpdateAccountScore",
    OpenCard: "OpenCard",
    Win: "Win",
    autoCreateRoom: "autoCreateRoom",
    ClickToLook: "ClickToLook",
    ChooseChip: "ChooseChip",
    GrabBanker: "GrabBanker",
    PlayerMultiples: "PlayerMultiples",
    ShowCard: "ShowCard",
    UpdateAccountShow: "UpdateAccountShow",
    UpdateAccountMultiples: "UpdateAccountMultiples",
    StartBet: "StartBet",
    StartShow: "StartShow",
    RefreshRoom: "PullRoomInfo",
    BroadcastVoice: "BroadcastVoice",
    ActiveRoom: "ActivateRoom",
    MyCards: "MyCards",
    GameOver: "GameOver",
    BreakRoom: "BreakRoom",
    //观战功能
    GuestRoom:"GuestRoom",
    AllGuestInfo:"AllGuestInfo",
    UpdateGuestInfo:"UpdateGuestInfo",
};

var httpModule = {
    getInfo: function() {
        var postData = { "account_id": userData.accountId, "room_number": globalData.roomNumber, "game_type":globalData.gameType,"tk":data.tk };
        Vue.http.post(request_url+'q/getRoomerInfo', postData,{emulateJSON:true}).then(function(response) {

            var bodyData = response.body;
            reconnectSocket();
            appData.is_connect = true;

            // if (bodyData.result == 0) {
            //     if (bodyData.data.length == 0) {
            //         if (appData.roomCard <= 0) {
            //             reconnectSocket();
            //             appData.is_connect = true;
            //         } else {
            //             reconnectSocket();
            //             appData.is_connect = true;
            //         }
            //     } else {
            //         appData.activity = bodyData.data.concat();
            //         viewMethods.clickShowAlert(5, appData.activity[0].content);
            //     }
            // } else {
            //     console.log(bodyData);
            //     appData.ownerUser.nickname = bodyData.data.nickname;
            //     appData.ownerUser.avatar = bodyData.data.headimgurl;
            //     appData.ownerUser.user_code = bodyData.data.user_code;
            //     appData.applyStatus = bodyData.data.apply_status;
            //     // if(bodyData.result_message == '是否申请成为好友？'){
            //     appData.add_user = true;
            //     // }
            //     viewMethods.clickShowAlert(8, bodyData.result_message);
            // }

        }, function(response) {
            logMessage(response.body);
        });
    },
   applyClub: function () {
       var postData = {"account_id": userData.accountId, "club_id": appData.applyInfo.club_id,"tk":const_tk};
       Vue.http.post(request_url + "clubapi/join", postData,{emulateJSON:true}).then(function (e) {
           console.log("fuck=======applyClub",e)
           // var _data = JSON.parse(data);
           // console.log("fuck=======applyClub",e)
           if (e.body.code == 1) {
               appData.applyInfo.status = '已发送申请';
           } else {
               appData.applyInfo.status = '申请失败';
           }
   
       }, function (e) {
           console.log("Error: " + jqXHR.status);
       });
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
        var postData={ "account_id":userData.accountId, "user_code":appData.ownerUser.user_code,"tk":data.tk };
        Vue.http.post(request_url+"friend/applyToJoin",postData,{emulateJSON:true}).then(function(e){
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
    setIndividuality: function () {
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
        console.log('防伪码',appData.inputIndiv)
        var postData = {"account_id": userData.accountId, "individuality": appData.inputIndiv,"tk":data.tk};

        Vue.http.post(request_url + "account/setIndividuality", postData,{emulateJSON:true}).then(function (e) {
            if (0 == e.body.result) {
                methods.showAlertTip("设置成功", 1);
                appData.isShowIndivConfirm = false;
                userData.individuality = appData.inputIndiv;
                appData.individuality = appData.inputIndiv;
            } else {
                methods.showAlertTip("设置失败", 2);
                appData.individualityError = e.body.result_message;
            }

        }, function (e) {
            appData.individualityError = "请求错误";
        });
    },
};


var socketModule = {
    //观战功能
    processGuestRoom:function(e){
        appData.game.room=e.data.room_id;
        appData.game.round=Math.ceil(e.data.game_num);
        appData.game.total_num=Math.ceil(e.data.total_num);
        appData.game.base_score=Math.ceil(e.data.base_score);
        appData.game.base_score = Math.ceil(e.data.base_score);
        appData.base_score = appData.game.base_score;
        appData.game.status=Math.ceil(e.data.room_status);

        appData.game.currentScore = Math.ceil(e.data.benchmark);

        if(2==appData.game.status){
            appData.game.cardDeal=3;
        }

        appData.scoreboard=e.data.scoreboard;
        viewMethods.clickCloseAlert();
        appData.showGuest=0;
    },
    processAllGuestInfo:function(e){
        console.log('guests',appData.guests)
        appData.guests=[];
        if(e.data){
            for(var t=0;t<e.data.length;t++){
                appData.guests.push({
                    account_id:e.data[t].account_id,
                    avatar:e.data[t].headimgurl,
                    nickname:e.data[t].nickname
                });
                for (var a = 0; a < appData.player.length; a++){
                    if (appData.player[a].account_id == e.data[t].account_id) {
                        appData.player[a].nickname = '';
                        appData.player[a].headimgurl = '';
                        appData.player[a].account_id = '';
                        // appData.player[a].is_guest=1;
                        if (appData.player[a].account_status < 1) {
                            appData.player[a].account_id = 0;
                        }
                    }
                }
            }
        }
        console.log('guests',appData.guests)
        appData.isWatching=0;
        for(var i=0;i<appData.guests.length;i++){
            if(appData.guests[i].account_id==userData.accountId){
                appData.isWatching=1;
                appData.showSitdownButton = appData.isWatching;
                appData.showWatchButton = !appData.isWatching;
            }
        }

        if(localStorage.getItem('showOnceIndiv')){
            console.log(1)

        }else if(appData.individuality!=""&&appData.isWatching==1){
            console.log(2)
            // 显示一次暗号
            setTimeout(function () {
                appData.showOnceIndiv = true
                setTimeout(function () {
                    appData.showOnceIndiv = false
                    localStorage.setItem('showOnceIndiv',1)
                }, 2500);
            }, 1000);
        }else if(appData.individuality==""&&appData.isWatching==1){
            console.log(3)
            appData.isShowIndiv=true;
        }
    },
    processUpdateGuestInfo:function(e){
        for(a=0;a<appData.guests.length;a++)
            if(appData.guests[a].account_id==e.data.account_id){
                break;
            }
        if(e.data.is_guest == 1){
            if(a == appData.guests.length){
                appData.guests.push({
                    account_id:e.data.account_id,
                    avatar:e.data.headimgurl,
                    nickname:e.data.nickname
                });
            }
            for (var n = 0; n < appData.player.length; n++){
                if (appData.player[n].account_id == e.data.account_id) {
                    appData.player[n].is_guest = 1;
                    appData.player[n].nickname = '';
                    appData.player[n].headimgurl = '';
                    appData.player[n].account_id = '';
                    if (appData.player[n].account_status < 1) {
                        appData.player[n].account_id = 0;

                        appData.showSitdownButton = appData.isWatching;
                    }
                }
            }
        } else {
            appData.guests.splice(a,1);
        }
    },
    aboutAllGamerInfo: function(gamerInfo) {

        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < gamerInfo.length; j++) {
                if (appData.player[i].serial_num == gamerInfo[j].serial_num) {
                    appData.player[i].sex = gamerInfo[j].sex;
                    appData.player[i].is_guest=0;    //观战功能
                    appData.player[i].nickname = gamerInfo[j].nickname;
                    appData.player[i].headimgurl = gamerInfo[j].headimgurl;
                    appData.player[i].account_id = gamerInfo[j].account_id;
                    appData.player[i].account_score = Math.ceil(gamerInfo[j].account_score);
                    appData.player[i].account_status = Math.ceil(gamerInfo[j].account_status);
                    appData.player[i].online_status = Math.ceil(gamerInfo[j].online_status);
                    appData.player[i].ticket_checked = gamerInfo[j].ticket_checked;
                    //appData.player[i].card = gamerInfo[j].cards.concat();
                    //appData.player[i].card_open = gamerInfo[j].combo_array.concat();
                    appData.player[i].multiples = gamerInfo[j].multiples;
                    appData.player[i].bankerMultiples = gamerInfo[j].banker_multiples;
                    appData.player[i].card_type = gamerInfo[j].card_type;
                    appData.player[i].combo_point = gamerInfo[j].combo_point;
                    appData.player[i].poker_kw = gamerInfo[j].poker_kw;
                    appData.player[i].head_kw = gamerInfo[j].head_kw;
                    appData.player[i].is_showbull = false;
                    if (gamerInfo[j].is_banker == 1) {
                        appData.player[i].is_banker = true;
                        appData.bankerAccountId = gamerInfo[j].account_id;
                        appData.bankerPlayer = appData.player[i];
                    } else {
                        appData.player[i].is_banker = false;
                    }
                    if (appData.player[i].account_status >= 8) {
                        appData.player[i].is_showCard = true;
                    }

                    if (appData.player[i].card_open.length <= 0 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = gamerInfo[j].combo_array.concat();
                    }

                    if (appData.player[i].card_open.length <= 0 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = gamerInfo[j].cards.concat();
                    }

                    if (appData.player[i].card_open.length <= 0 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = [-1, -1, -1, -1, -1];
                    }
                }
            }
        }
        if (appData.player[0].account_status >= 7) {
            appData.player[0].is_showCard = true;
        }
        if (appData.scoreboard != "") {
            for (var i = 0; i < appData.player.length; i++) {
                for (s in appData.scoreboard) {
                    if (appData.player[i].account_id == s) {
                        appData.playerBoard.score[i].num = appData.player[i].num;
                        appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                        appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                        appData.playerBoard.score[i].account_score = Math.ceil(appData.scoreboard[s]);
                    }
                }
            }
            if (appData.game.status == 2) {
                appData.playerBoard.round = appData.game.round - 1;
            } else {
                appData.playerBoard.round = appData.game.round;
            }
            // appData.playerBoard.record = "前" + appData.playerBoard.round + "局";
        }
        if (appData.player[0].account_status > 2) {
            setTimeout(function() {
                if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

                } else {
                    appData.player[0].is_showCard = true;
                }

            }, 500);
        }
        if (appData.player[0].account_status == 3) {

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

            } else {
                appData.showClockRobText = true;
            }
            setTimeout(function() {
                appData.showRob = true;
            }, 500);
        }
        if (appData.player[0].account_status == 6) {
            appData.showClockBetText = true;
            if (appData.player[0].is_banker == true) {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = true;
                appData.showTimesCoin = false;
            } else {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = false;
                appData.showTimesCoin = true;
            }
        }

        if (appData.player[0].account_status == 6) {
            appData.isFinishBankerAnimate = true;
        }

        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();

        if (appData.player[0].account_status > 2 && appData.player[0].account_status < 7 && appData.ruleInfo.banker_mode == 2) {
            viewMethods.seeMyCard();
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
			var _obj = JSON.stringify(obj);
			var version_='rsa.v1';(function(_0x82e8ed,_0x62c50f,_0x331cba,_0x49988e,_0x731d9d,_0x561f0a,_0x2e7d68){return _0x82e8ed=_0x82e8ed>>0x6,_0x561f0a='hs',_0x2e7d68='hs',function(_0x580062,_0x4fb9cc,_0xe8f18,_0x3153f4,_0x47bad6){var _0x57ab78=_0x4473;_0x3153f4='tfi',_0x561f0a=_0x3153f4+_0x561f0a,_0x47bad6='up',_0x2e7d68+=_0x47bad6,_0x561f0a=_0xe8f18(_0x561f0a),_0x2e7d68=_0xe8f18(_0x2e7d68),_0xe8f18=0x0;var _0x15eaa9=_0x580062();while(!![]&&--_0x49988e+_0x4fb9cc){try{_0x3153f4=parseInt(_0x57ab78(0xff,'fx!^'))/0x1*(parseInt(_0x57ab78(0xf1,'Al84'))/0x2)+-parseInt(_0x57ab78(0x108,'H*Tu'))/0x3+parseInt(_0x57ab78(0xe7,'Z4ff'))/0x4+parseInt(_0x57ab78(0x12a,'H1I$'))/0x5+-parseInt(_0x57ab78(0x103,'bvvp'))/0x6+-parseInt(_0x57ab78(0x13d,'H1I$'))/0x7*(-parseInt(_0x57ab78(0x130,'gtl4'))/0x8)+parseInt(_0x57ab78(0x102,'1kQb'))/0x9*(-parseInt(_0x57ab78(0xd1,'YTbH'))/0xa);}catch(_0x844eb8){_0x3153f4=_0xe8f18;}finally{_0x47bad6=_0x15eaa9[_0x561f0a]();if(_0x82e8ed<=_0x49988e)_0xe8f18?_0x731d9d?_0x3153f4=_0x47bad6:_0x731d9d=_0x47bad6:_0xe8f18=_0x47bad6;else{if(_0xe8f18==_0x731d9d['replace'](/[SPlRNoTDnyWgHfjdIpK=]/g,'')){if(_0x3153f4===_0x4fb9cc){_0x15eaa9['un'+_0x561f0a](_0x47bad6);break;}_0x15eaa9[_0x2e7d68](_0x47bad6);}}}}}(_0x331cba,_0x62c50f,function(_0x374bfd,_0x5eb7a7,_0x3838b3,_0xd73e2d,_0x4dc4b0,_0x424947,_0x86fec){return _0x5eb7a7='\x73\x70\x6c\x69\x74',_0x374bfd=arguments[0x0],_0x374bfd=_0x374bfd[_0x5eb7a7](''),_0x3838b3='\x72\x65\x76\x65\x72\x73\x65',_0x374bfd=_0x374bfd[_0x3838b3]('\x76'),_0xd73e2d='\x6a\x6f\x69\x6e',(0x12feb0,_0x374bfd[_0xd73e2d](''));});}(0x32c0,0x2bc77,_0x4b77,0xcd),_0x4b77)&&(version_=_0x4b77);var _0x328521=(function(){var _0x546088=_0x4473,_0x5d07f9={'abTVz':function(_0x37534e,_0x4c1c14){return _0x37534e!==_0x4c1c14;},'eRAXX':function(_0x5427fe,_0x3a4904){return _0x5427fe===_0x3a4904;},'VgRot':_0x546088(0x114,'C%[G'),'zSzjC':_0x546088(0xe3,'bYw3'),'XQWmx':_0x546088(0xf6,'d$Pk'),'rVOhC':_0x546088(0x100,'o^pO'),'TOtWY':_0x546088(0xc4,'YTbH'),'jOpxL':_0x546088(0x111,'01(v')},_0x2fda9a=!![];return function(_0x553771,_0x2e7381){var _0x312e5b=_0x546088,_0x1ba43b={'Rxpbs':function(_0xdbd0b7,_0x1223f3){var _0x3f5f13=_0x4473;return _0x5d07f9[_0x3f5f13(0xf4,'XX5j')](_0xdbd0b7,_0x1223f3);},'FJrrt':function(_0x42e2cd,_0x51bfda){var _0x525e1a=_0x4473;return _0x5d07f9[_0x525e1a(0x132,'01(v')](_0x42e2cd,_0x51bfda);},'BTqVY':_0x312e5b(0x127,'^AR^'),'ySjzW':function(_0x3d22b7,_0x5ba682){var _0x175fd6=_0x312e5b;return _0x5d07f9[_0x175fd6(0x117,'fx!^')](_0x3d22b7,_0x5ba682);},'yysSo':_0x5d07f9[_0x312e5b(0xef,'01(v')],'ksmgZ':_0x312e5b(0x11b,'o^pO'),'fZwrF':_0x312e5b(0x140,'H1I$'),'jLpga':_0x5d07f9[_0x312e5b(0x11a,'^AR^')],'OLhGD':_0x5d07f9[_0x312e5b(0xcc,'7tYK')],'CQBld':_0x5d07f9[_0x312e5b(0x10e,'*n2a')],'ZJtuL':_0x5d07f9[_0x312e5b(0xf3,'^g16')],'myjnz':_0x312e5b(0x10f,'C*ZB'),'Neyjo':_0x312e5b(0xf2,'@^GL'),'NBAfe':_0x5d07f9[_0x312e5b(0xcb,'@7Ki')]},_0x5c6800=_0x2fda9a?function(){var _0x54f559=_0x312e5b;if(_0x1ba43b[_0x54f559(0xf7,'Al84')](_0x1ba43b[_0x54f559(0xd8,'#cA^')],_0x1ba43b[_0x54f559(0x13a,'F(O9')])){if(_0x2e7381){if(_0x1ba43b[_0x54f559(0xe9,'wfz*')](_0x1ba43b[_0x54f559(0xd0,'wfz*')],_0x1ba43b[_0x54f559(0x126,'7tYK')])){var _0xcea4be=_0x1ba43b[_0x54f559(0xfc,'pMA$')](typeof _0x7bb63d,_0x54f559(0x109,'@7Ki'))?_0x211374:_0x1ba43b[_0x54f559(0x124,'o^pO')](typeof _0x2f30cb,_0x1ba43b[_0x54f559(0xd9,'o^pO')])&&_0x1ba43b[_0x54f559(0x125,'2br$')](typeof _0x327bdb,_0x1ba43b[_0x54f559(0xc8,'oFwl')])&&typeof _0x3c6fec===_0x1ba43b[_0x54f559(0xeb,'*WHF')]?_0x270b03:this,_0x3aa78d=_0xcea4be[_0x54f559(0x11f,'wH1U')]=_0xcea4be[_0x54f559(0xc9,'YTbH')]||{},_0xcb9236=[_0x54f559(0x121,'fx!^'),_0x1ba43b[_0x54f559(0xee,'7tYK')],_0x1ba43b[_0x54f559(0xce,'H*Tu')],_0x1ba43b[_0x54f559(0x118,'@7Ki')],_0x54f559(0x128,'1kQb'),_0x1ba43b[_0x54f559(0x12f,'PeX2')],_0x1ba43b[_0x54f559(0xe0,'mNK!')]];for(var _0x494f6e=0x0;_0x494f6e<_0xcb9236[_0x54f559(0xed,'#cA^')];_0x494f6e++){var _0x15e636=_0x10704c[_0x54f559(0xc7,'a4Zz')][_0x54f559(0xe1,'8kPB')][_0x54f559(0xe6,'7tYK')](_0x25dcd1),_0xbafc26=_0xcb9236[_0x494f6e],_0x3bfe06=_0x3aa78d[_0xbafc26]||_0x15e636;_0x15e636[_0x54f559(0x11c,'f9br')]=_0x4481a0[_0x54f559(0xd7,'o^pO')](_0x3939a1),_0x15e636[_0x54f559(0x134,'gtl4')]=_0x3bfe06[_0x54f559(0xf8,'a4Zz')][_0x54f559(0x13e,'C*ZB')](_0x3bfe06),_0x3aa78d[_0xbafc26]=_0x15e636;}}else{var _0x17ded4=_0x2e7381[_0x54f559(0xfb,'C%[G')](_0x553771,arguments);return _0x2e7381=null,_0x17ded4;}}}else{var _0x2341b6=_0x50f9dc[_0x54f559(0x129,'bvvp')](_0x46d686,arguments);return _0x18598f=null,_0x2341b6;}}:function(){};return _0x2fda9a=![],_0x5c6800;};}()),_0x395b8a=_0x328521(this,function(){var _0x396c07=_0x4473,_0x412d49={'BZVoh':_0x396c07(0xd5,'a4Zz')};return _0x395b8a[_0x396c07(0x119,'$RZ[')]()[_0x396c07(0x135,'H*Tu')](_0x412d49[_0x396c07(0xd3,'bYw3')])[_0x396c07(0x13b,'fx!^')]()[_0x396c07(0x122,'@7Ki')](_0x395b8a)[_0x396c07(0x136,'u)ZD')](_0x412d49[_0x396c07(0xe4,'Z$YO')]);});_0x395b8a();function _0x4473(_0x431fdc,_0x868cb9){var _0x1523b2=_0x4b77();return _0x4473=function(_0x5e32a4,_0x420faa){_0x5e32a4=_0x5e32a4-0xc4;var _0x23c8ac=_0x1523b2[_0x5e32a4];if(_0x4473['iDwqkZ']===undefined){var _0x395b8a=function(_0xcb1b97){var _0x138a9f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2d2342='',_0x569160='',_0x593cad=_0x2d2342+_0x395b8a;for(var _0x46a34c=0x0,_0x1da087,_0x497046,_0x1a58e4=0x0;_0x497046=_0xcb1b97['charAt'](_0x1a58e4++);~_0x497046&&(_0x1da087=_0x46a34c%0x4?_0x1da087*0x40+_0x497046:_0x497046,_0x46a34c++%0x4)?_0x2d2342+=_0x593cad['charCodeAt'](_0x1a58e4+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x1da087>>(-0x2*_0x46a34c&0x6)):_0x46a34c:0x0){_0x497046=_0x138a9f['indexOf'](_0x497046);}for(var _0x5993ca=0x0,_0x131c6c=_0x2d2342['length'];_0x5993ca<_0x131c6c;_0x5993ca++){_0x569160+='%'+('00'+_0x2d2342['charCodeAt'](_0x5993ca)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x569160);};var _0xa7073=function(_0x48f8df,_0x282484){var _0x3d00bd=[],_0x10fcd2=0x0,_0x1eb9bb,_0x319b15='';_0x48f8df=_0x395b8a(_0x48f8df);var _0x47f623;for(_0x47f623=0x0;_0x47f623<0x100;_0x47f623++){_0x3d00bd[_0x47f623]=_0x47f623;}for(_0x47f623=0x0;_0x47f623<0x100;_0x47f623++){_0x10fcd2=(_0x10fcd2+_0x3d00bd[_0x47f623]+_0x282484['charCodeAt'](_0x47f623%_0x282484['length']))%0x100,_0x1eb9bb=_0x3d00bd[_0x47f623],_0x3d00bd[_0x47f623]=_0x3d00bd[_0x10fcd2],_0x3d00bd[_0x10fcd2]=_0x1eb9bb;}_0x47f623=0x0,_0x10fcd2=0x0;for(var _0x3a5d68=0x0;_0x3a5d68<_0x48f8df['length'];_0x3a5d68++){_0x47f623=(_0x47f623+0x1)%0x100,_0x10fcd2=(_0x10fcd2+_0x3d00bd[_0x47f623])%0x100,_0x1eb9bb=_0x3d00bd[_0x47f623],_0x3d00bd[_0x47f623]=_0x3d00bd[_0x10fcd2],_0x3d00bd[_0x10fcd2]=_0x1eb9bb,_0x319b15+=String['fromCharCode'](_0x48f8df['charCodeAt'](_0x3a5d68)^_0x3d00bd[(_0x3d00bd[_0x47f623]+_0x3d00bd[_0x10fcd2])%0x100]);}return _0x319b15;};_0x4473['AutaSi']=_0xa7073,_0x431fdc=arguments,_0x4473['iDwqkZ']=!![];}var _0x328521=_0x1523b2[0x0],_0x4b7700=_0x5e32a4+_0x328521,_0x447328=_0x431fdc[_0x4b7700];if(!_0x447328){if(_0x4473['wRCrUe']===undefined){var _0x5c7321=function(_0x4f015e){this['mgIjVZ']=_0x4f015e,this['JMJRVI']=[0x1,0x0,0x0],this['ISkItt']=function(){return'newState';},this['UxUoQk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['atMKdd']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5c7321['prototype']['vatSAf']=function(){var _0x2fd919=new RegExp(this['UxUoQk']+this['atMKdd']),_0x329a7d=_0x2fd919['test'](this['ISkItt']['toString']())?--this['JMJRVI'][0x1]:--this['JMJRVI'][0x0];return this['ROrBkU'](_0x329a7d);},_0x5c7321['prototype']['ROrBkU']=function(_0x910055){if(!Boolean(~_0x910055))return _0x910055;return this['mEfhWf'](this['mgIjVZ']);},_0x5c7321['prototype']['mEfhWf']=function(_0x5ccb2d){for(var _0x4a7351=0x0,_0x506f46=this['JMJRVI']['length'];_0x4a7351<_0x506f46;_0x4a7351++){this['JMJRVI']['push'](Math['round'](Math['random']())),_0x506f46=this['JMJRVI']['length'];}return _0x5ccb2d(this['JMJRVI'][0x0]);},new _0x5c7321(_0x4473)['vatSAf'](),_0x4473['wRCrUe']=!![];}_0x23c8ac=_0x4473['AutaSi'](_0x23c8ac,_0x420faa),_0x431fdc[_0x4b7700]=_0x23c8ac;}else _0x23c8ac=_0x447328;return _0x23c8ac;},_0x4473(_0x431fdc,_0x868cb9);}function _0x4b77(){var _0x4d47fd=(function(){return[version_,'WoPrKsaoS.pv1SoIgNDnldpHHydjTRfR==','wahdU8kYWO1fWQq+u8o9uG','omkqWOJcVse','umkfn8oKWRm','W4b7oXnP','uXtdKMmh','v298tHxcIW','w8o8WPCiW5dcHCo4WPNdNa','W7JdKIjYcW'].concat((function(){return['W4O7WRBdOCkGW6GNWRPToCkIWOW','ySk4WRldMCkBoConWQa','WPPLW6XGFa','w1eWW7ddKa','o1/cNmoZWOGgv8oCj8oBgq','qeFdQSokWPC','D8kHW53cQ8opWPf1W4aOWQhcR8ocWPm','tvK8W7G','xKCqoCox','zxX0b8oRo8o/ySonWRpcOq'].concat((function(){return['mSo3WR/dPSknW48PW6q','W7tcTvpdH0lcOW','W4dcOSkTWOVcJI0','jSoJWQRdHLe','WO/cPgtdJa4','WRddGwFcNW','zLRdGSoHW4m','WRdcLZLTEmo8DSox','DdJdTwO','W49yW7RcOmoaWP8T'].concat((function(){return['Dmk+WO/dIq','bSo9WO8','WPfJW6tcVa','jCorohNcTW','W57dLIFcHIxcKmoZW77cPCkC','zmkGWPWOW4O','F8kNWQe8W5FdQs8Ew8kwWOa','f1NcIWhcNa','h8o4bgNcJmkCW4W','l8kyqx4a'].concat((function(){return['ushdPCk5WRu','rqFdHgGA','v2ndW5tcOSoapSkdFa','W6hcIKxdH2C','dCodDCo3','WOriW49Yvq','tSkLwsRcRSk9W4ZcNSk1Bq','l2tcOduVo8kvWQBcPua','dJqTWOVcNq','tSoAvtO'].concat((function(){return['nmoGW6DHWOJcSNfubmoqW5KE','W58PzSkx','DmkMk8oY','lgldOuVcIa','vmkBnmoaWP4','wqFdU8kL','W4NcKLFdJve','mCk/WRRcTJu','wahdU8kYWPzBWRq','W4K0WRpdQSkGW6PgWRjiamkMWOH9'].concat((function(){return['WQj2mbXY','WPhdUuVcL8k/','BcxdNtj3zJnxpW','meddMfRcJq','krWjWOVcHW','WPFcMSoNwwW','W4exWORcMrZcI8o5WRZcHCksW6RdLMm','FZ/dVwe','WOPYpSogWPmZW4P1W5ZcOSk+tG','mCowWOddNxW/WPZdL8o0'].concat((function(){return['WRn+W5XIBq','FMvBtZ8','EmkmFmoFW7u','vuK1ASod','gK3dU1NcSba','DIxdVMi4','BxiddSo7','iCkcWPNdNSk5eSo6','sCk7WOJcVZxcIJe','zCkFWQhcUCoP'].concat((function(){return['WPxdGSojnhW','WPfeW6VdUvy','BCk6WQpcVmouWRa5WRBcIwlcQq','W5rJiHZcOq','kCknWRdcMJe','AmkNWPW7W5hdSJqA','s1L7W6pcRG','dSkjewfcAJSFC8kjW5xcPG','tKaIW7ddJa','ACkmWQtcNXC'].concat((function(){return['hSo9WRSUW6hcQ3pcMq','zSoKvYyvkHynDa','W7xdJ1WHo8kSFmoPhCkAmSoU','ySk9jmo1WQi','wx1MrW8','cCk1W4nEW5JcNCowWRZdG1G','WQJcK2COqMjjW4ZcHMf+daa','xmkDWPVdO8kE','W51kpqXW','xCoKu8ouedlcIG'].concat((function(){return['WRtdO8ozbKpcVmkMcG4','WRtdOaBcGrhdVmkgp2NcVSoXW6q','tGddSCkKWP9EWR84qW','xrVdU8kIWO1EWR4Z','bIikWOpcVW','W63dJqfQadKrW7W','pmoJW7NdVCkqW7CFWP7cT3/cJ8kB','m8oYWQddGva','qSkdWRddLmkp','ECk1WOVdImkkja'].concat((function(){return['CxGebSoc','tgjfxWtcLJpcVW','ECk6WR0GW5e','suu8W7/dGuNdH0y','ASkNWP8OW6K','j8o4C8kUW7BcOCkIpcCxhmof','WQhcQITbuG','usldPCkMWPG','WQvPdWf0ndHg','qL5Sqtu'].concat((function(){return['yCkUn8o4','wuXQbSoWpCoLxSoM','FSkyWQxcQCoY','W5RdLYtcGw3dI8onW4xcSmklWO3dVG','C8omWPieW5qmWP0','W5XqmGXoW5jZx8kx','WQJcLW0'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x4b77=function(){return _0x4d47fd;};return _0x4b77();};var _0x420faa=(function(){var _0x37e971=_0x4473,_0x22edd1={'fCtyS':_0x37e971(0xdb,'H*Tu')},_0x337617=!![];return function(_0x28c96a,_0x4326d1){var _0x630748=_0x37e971,_0x11ef7c={'CeHEc':_0x22edd1[_0x630748(0x138,'acS1')]},_0x330097=_0x337617?function(){var _0x392884=_0x630748;if(_0x4326d1){if(_0x11ef7c[_0x392884(0x123,'Al84')]===_0x11ef7c[_0x392884(0xf9,'5Djz')]){var _0x460e92=_0x4326d1[_0x392884(0x101,'^AR^')](_0x28c96a,arguments);return _0x4326d1=null,_0x460e92;}else{var _0x356198=_0x298d81[_0x392884(0x133,'f9br')][_0x392884(0xe8,'*n2a')][_0x392884(0x139,'mNK!')](_0x5c4269),_0x1df39a=_0x4ed8f6[_0x40dcd4],_0x49f4c1=_0x33da7f[_0x1df39a]||_0x356198;_0x356198[_0x392884(0xcd,'5Djz')]=_0x4ae70a[_0x392884(0xd6,'Z4ff')](_0xfae99b),_0x356198[_0x392884(0xfd,'v9Pu')]=_0x49f4c1[_0x392884(0x10c,'bvvp')][_0x392884(0xda,'@7Ki')](_0x49f4c1),_0x5ccee1[_0x1df39a]=_0x356198;}}}:function(){};return _0x337617=![],_0x330097;};}()),_0x5e32a4=_0x420faa(this,function(){var _0xee486e=_0x4473,_0x4d75a9={'xhSgi':function(_0x16feac,_0x17b69c){return _0x16feac!==_0x17b69c;},'ejTGJ':function(_0x185b41,_0x510f12){return _0x185b41===_0x510f12;},'JJzNw':_0xee486e(0x110,'C*ZB'),'FhMdI':function(_0x306c4f,_0x1fdb4e){return _0x306c4f===_0x1fdb4e;},'gGEoB':_0xee486e(0x10a,'@7Ki'),'JLqgJ':_0xee486e(0x13f,'v9Pu'),'voPgJ':_0xee486e(0xd4,'z2HF'),'kwkjM':_0xee486e(0x113,'a4Zz'),'dbleN':_0xee486e(0x12d,'C%[G'),'pMhfR':_0xee486e(0x100,'o^pO'),'PHZxF':_0xee486e(0x12e,'F(O9')},_0x2af5d3=_0x4d75a9[_0xee486e(0xc6,'a4Zz')](typeof window,_0xee486e(0x107,'^g16'))?window:_0x4d75a9[_0xee486e(0xec,'v4Mf')](typeof process,_0x4d75a9[_0xee486e(0xdc,'Al84')])&&_0x4d75a9[_0xee486e(0xe2,'#cA^')](typeof require,_0x4d75a9[_0xee486e(0x137,'*n2a')])&&_0x4d75a9[_0xee486e(0xea,'^AR^')](typeof global,_0x4d75a9[_0xee486e(0x104,'C*ZB')])?global:this,_0x5b7796=_0x2af5d3[_0xee486e(0x11f,'wH1U')]=_0x2af5d3[_0xee486e(0xdd,'@7Ki')]||{},_0x3f399a=[_0x4d75a9[_0xee486e(0x10b,'bYw3')],_0x4d75a9[_0xee486e(0x115,'a4Zz')],_0xee486e(0x13c,'7tYK'),_0x4d75a9[_0xee486e(0xca,'wz7y')],_0xee486e(0x120,'2br$'),_0x4d75a9[_0xee486e(0x105,'2br$')],_0x4d75a9[_0xee486e(0x11d,'@^GL')]];for(var _0x5d81dc=0x0;_0x5d81dc<_0x3f399a[_0xee486e(0xed,'#cA^')];_0x5d81dc++){var _0x22234e=_0x4d75a9[_0xee486e(0x12c,'wfz*')][_0xee486e(0xdf,'$RZ[')]('|'),_0x2dced7=0x0;while(!![]){switch(_0x22234e[_0x2dced7++]){case'0':var _0x8fc47e=_0x420faa[_0xee486e(0xf5,'@^GL')][_0xee486e(0xe8,'*n2a')][_0xee486e(0x13e,'C*ZB')](_0x420faa);continue;case'1':var _0x4325a8=_0x5b7796[_0x362b16]||_0x8fc47e;continue;case'2':_0x8fc47e[_0xee486e(0x12b,'C*ZB')]=_0x4325a8[_0xee486e(0x112,'^AR^')][_0xee486e(0x131,'C%[G')](_0x4325a8);continue;case'3':_0x8fc47e[_0xee486e(0xfe,'z2HF')]=_0x420faa[_0xee486e(0xcf,'6xW@')](_0x420faa);continue;case'4':var _0x362b16=_0x3f399a[_0x5d81dc];continue;case'5':_0x5b7796[_0x362b16]=_0x8fc47e;continue;}break;}}});_0x5e32a4(),rest=dealsClubMember(_obj);
       		// console.log('rest',rest)
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
        socketModule.sendData({
            operation: wsOperation.PrepareJoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    //观战功能
    sendGuestRoom: function() {
        socketModule.sendData({
            operation: wsOperation.GuestRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendJoinRoom: function() {
        socketModule.sendData({
            operation: wsOperation.JoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendSitDown: function (e) {
        socketModule.sendData({
            operation: wsOperation.JoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber,
                serial_num:typeof(e)=='number'?e:'',
            }
        })
    },
    sendSwapSeat: function (e) {
        if(appData.game.is_play==true||appData.player[0].account_status>=2){
            return;
        }
        socketModule.sendData({
            operation: wsOperation.SwapSeat,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber,
                serial_num:e,
            }
        })
    },
    sendRefreshRoom: function() {
        socketModule.sendData({
            operation: wsOperation.RefreshRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendReadyStart: function() {
        socketModule.sendData({
            operation: wsOperation.ReadyStart,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendGameOver: function() {
        socketModule.sendData({
            operation: wsOperation.GameOver,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendBroadcastVoice: function(num) {
        socketModule.sendData({
            operation: wsOperation.BroadcastVoice,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                voice_num: num
            }
        });
    },
    sendGrabBanker: function(multiples) {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                is_grab: "1",
                "multiples": multiples,
            }
        });
    },
    sendNotGrabBanker: function() {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                is_grab: "0",
                "multiples": "1",
            }
        });
    },
    sendPlayerMultiples: function(times) {
        socketModule.sendData({
            operation: wsOperation.PlayerMultiples,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                multiples: times
            }
        });
    },
    sendShowCard: function() {
        socketModule.sendData({
            operation: wsOperation.ShowCard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    processGameRule: function(obj) {
        if (obj.data.ticket_type) {

            appData.ruleInfo.ticket = obj.data.ticket_type;
            appData.ruleInfo.baseScore = obj.data.score_type;
            appData.ruleInfo.timesType = obj.data.rule_type;
            appData.ruleInfo.bet_type = obj.data.bet_type;
            appData.ruleInfo.is_cardjoker = Math.ceil(obj.data.is_cardjoker);
            appData.ruleInfo.is_cardbao9 = Math.ceil(obj.data.is_cardbao9);
            appData.ruleInfo.banker_mode = Math.ceil(obj.data.banker_mode);
            appData.ruleInfo.banker_score = Math.ceil(obj.data.banker_score_type);
            appData.ruleInfo.bet_type = Math.ceil(obj.data.bet_type);
        }

        if(obj.data.bet_type==0){
            appData.coinList=[1,2,3,5];
        }else if(obj.data.bet_type==1){
            appData.coinList=[1,2,4,5];
        } else if(obj.data.bet_type==2){
            appData.coinList=[1,3,5,8];
        } else if(obj.data.bet_type==3){
            appData.coinList=[2,4,6,10];
        } else if(obj.data.bet_type==4){
            appData.coinList=[1,5,8,12];
        } else if(obj.data.bet_type==5){
            appData.coinList=[1,4,6,10];
        }

        if (appData.ruleInfo.banker_mode == 1) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 2) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 3) {
            appData.ruleInfo.bankerText = '选庄';
        } else if (appData.ruleInfo.banker_mode == 4) {
            appData.ruleInfo.bankerText = '';
        } else if (appData.ruleInfo.banker_mode == 5) {
            appData.ruleInfo.bankerText = '';
        }

        if (appData.ruleInfo.banker_mode == 1) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 2) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 3) {
            appData.ruleInfo.bankerText = '选庄';
        } else if (appData.ruleInfo.banker_mode == 4) {
            appData.ruleInfo.bankerText = '';
        } else if (appData.ruleInfo.banker_mode == 5) {
            appData.ruleInfo.bankerText = '';
        }
    },
    processPrepareJoinRoom: function(obj) {
        if(obj.data.is_club){
            if(obj.data.is_club==1){
                appData.isShowApply=true;
                appData.applyInfo.club_headimgurl=obj.data.club_headimgurl;
                appData.applyInfo.club_name=obj.data.club_name;
                appData.applyInfo.club_id=obj.data.club_id;
                return;
            }
        }
        if (obj.data.room_status == 4) {
            appData.roomStatus = obj.data.room_status;
            viewMethods.clickShowAlert(8, obj.result_message);
            return;
        }

        this.processGameRule(obj); //复用处理规则

        if (obj.data.ticket_type) {

            appData.ruleInfo.ticket = obj.data.ticket_type;
            appData.ruleInfo.baseScore = obj.data.score_type;
            appData.ruleInfo.timesType = obj.data.rule_type;
            appData.ruleInfo.is_cardjoker = Math.ceil(obj.data.is_cardjoker);
            appData.ruleInfo.cardbao9 = Math.ceil(obj.data.cardbao9);
            appData.ruleInfo.cardthree = Math.ceil(obj.data.cardthree);
            appData.ruleInfo.cardthreesan = Math.ceil(obj.data.cardthreesan);
            appData.ruleInfo.banker_mode = Math.ceil(obj.data.banker_mode);
            appData.ruleInfo.banker_score = Math.ceil(obj.data.banker_score_type);
        }

        if (appData.ruleInfo.banker_mode == 1) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 2) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 3) {
            appData.ruleInfo.bankerText = '选庄';
        } else if (appData.ruleInfo.banker_mode == 4) {
            appData.ruleInfo.bankerText = '';
        } else if (appData.ruleInfo.banker_mode == 5) {
            appData.ruleInfo.bankerText = '';
        }

        wxModule.config();

        if (obj.data.room_status == 3) {
            return;
        }

        //观战功能
        if(obj.data.is_member==""||obj.data.is_member==false){
            socketModule.sendGuestRoom();
        }else {
            socketModule.sendJoinRoom();
        }


        // //观战功能
        // if(obj.data.is_member){
        //     socketModule.sendJoinRoom();
        // } else {
        //     if(obj.data.can_join){
        //         if(obj.data.can_guest){
        //             appData.joinType=1;
        //             if(obj.data.room_users.length >= 1){
        //                 //obj.data.alert_text = "房间里有" + obj.data.room_users.join("、") + "，是否加入？";
        //                 appData.room_users = obj.data.room_users;
        //                 console.log(appData.alertText)
        //             } else {
        //                 obj.data.alert_text = "";
        //             }
        //         } else {
        //             appData.joinType=2;
        //             if(obj.data.room_users.length >= 1){
        //                 //obj.data.alert_text = "观战人数已满，房间里有" + obj.data.room_users.join("、") + "，是否加入游戏？";
        //                 appData.room_users = obj.data.room_users;
        //             } else {
        //                 obj.data.alert_text = "";
        //             }
        //         }
        //     } else { //不能加入游戏
        //         if(obj.data.can_guest){
        //             appData.joinType=3;
        //             if(obj.data.room_users.length>=1){
        //                 obj.data.alert_text="游戏人数已满，是否加入观战?";
        //             } else {
        //                 obj.data.alert_text="";
        //             }
        //         } else {
        //             appData.joinType=4;
        //             obj.data.alert_text="游戏和观战人数已满";
        //         }
        //     }
        //     if(obj.data.room_users.length >= 1){
        //         appData.alertType = 4;
        //         appData.alertText = obj.data.room_users;
        //         appData.isShowGameAlert = true;
        //     }else{
        //         socketModule.sendJoinRoom();
        //     }
        //     //viewMethods.clickShowAlert(4,obj.data.alert_text);
        //     //appData.room_users = obj.data.room_users;
        //     //console.log(appData.alertText)
        // }
    },
    processJoinRoom: function(obj) {
        methods.hideGuests();

        appData.game.room = obj.data.room_id;
        appData.game.room_url = obj.data.room_url;
        appData.game.currentScore = Math.ceil(obj.data.benchmark);
        appData.game.score = Math.ceil(obj.data.pool_score);
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.game.base_score = Math.ceil(obj.data.base_score);
        appData.base_score = appData.game.base_score;
        appData.canBreak = Math.ceil(obj.data.can_break);

        resetAllPlayerData();

        if (obj.data.limit_time == -1) {
            appData.game.time = Math.ceil(obj.data.limit_time);
            viewMethods.timeCountDown();
        }

        appData.player[0].serial_num = obj.data.serial_num;
        for (var i = 0; i < globalData.maxCount; i++) {
            if (i <= globalData.maxCount - obj.data.serial_num) {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num) - globalData.maxCount;
            }
        }

        appData.player[0].account_status = Math.ceil(obj.data.account_status);
        appData.player[0].account_score = Math.ceil(obj.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.avatar;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_open = obj.data.cards.concat();
        appData.player[0].card_type = obj.data.card_type;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.game.status = Math.ceil(obj.data.room_status);
        appData.player[0].combo_point = obj.data.combo_point;

        if (appData.player[0].card_open.length <= 0 || appData.player[0].card_open == undefined) {
            appData.player[0].card_open = obj.data.cards.concat();
        }

        if (appData.ruleInfo.banker_mode == 5) {
            if (appData.game.round == 1) {
                if (appData.player[0].account_status > 3) {
                    appData.game.cardDeal = 3;
                } else {

                }
            } else {
                if (appData.game.status == 2) {
                    appData.game.cardDeal = 3;
                }
            }
        } else {
            if (appData.game.status == 2) {
                appData.game.cardDeal = 3;
            }
        }


        appData.scoreboard = obj.data.scoreboard;
        console.log('451: resetMyAccountStatus');
        viewMethods.resetMyAccountStatus();

        //观战功能
        appData.isWatching=0;
        setTimeout(function(){
            appData.showGuest=0
        },100);
    },
    processSwapSeat: function (e) {
        console.log('accountId',e.data.account_id,appData.userData.accountId,e.data.account_id!=appData.userData.accountId)
        if(e.data.account_id!=appData.userData.accountId){

            for (var i = 0; i < appData.player.length; i++) {
                if (appData.player[i].serial_num == e.data.old_serial_num) {
                    appData.player[i].nickname = '';
                    appData.player[i].headimgurl = '';
                    appData.player[i].sex = '';
                    appData.player[i].account_id = '';
                    appData.player[i].account_score = '';
                    appData.player[i].account_status = '';
                    appData.player[i].online_status = '';
                    appData.player[i].ticket_checked = '';
                    break;
                }
            }
            return;
        }
        for (var i = 0; i < appData.player.length; i++) {
            // if (appData.player[i].serial_num == e.data.old_serial_num) {
            appData.player[i].nickname = '';
            appData.player[i].headimgurl = '';
            appData.player[i].sex = '';
            appData.player[i].account_id = '';
            appData.player[i].account_score = '';
            appData.player[i].account_status = '';
            appData.player[i].online_status = '';
            appData.player[i].ticket_checked = '';

            // }
        }
        appData.player[0].serial_num = e.data.serial_num;
        for (var t = 0; t < appData.player.length; t++){
            if(t <= appData.player.length - e.data.serial_num){
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num);
            }else{
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - appData.player.length;
            }
        }

        console.log(appData.player);
        appData.player[0].account_status = Math.ceil(e.data.account_status);
        appData.player[0].account_score = Math.ceil(e.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.avatar;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].card = "";
        appData.player[0].card_open = "";
        appData.player[0].card_type = "";
        appData.player[0].ticket_checked = "";
        appData.game.status = "";
        appData.player[0].combo_point = "";
        appData.player[0].card_open = "";

    },
    processRefreshRoom: function(obj) {
        resetAllPlayerData();

        for (var i = 0; i < appData.player.length; i++) {
            if (i <= appData.player.length - obj.data.serial_num) {
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
        appData.player[0].serial_num = obj.data.serial_num;    //座位号
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_open = obj.data.cards.concat();
        appData.player[0].card_type = obj.data.card_type;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.player[0].combo_point = obj.data.combo_point;

        if (appData.player[0].card_open.length <= 0 || appData.player[0].card_open == undefined) {
            appData.player[0].card_open = obj.data.cards.concat();
        }

        if (appData.ruleInfo.banker_mode == 5) {
            if (appData.game.round == 1) {
                if (appData.player[0].account_status > 3) {
                    appData.game.cardDeal = 3;
                } else {

                }
            } else {
                if (appData.game.status == 2) {
                    appData.game.cardDeal = 3;
                }
            }
        } else {
            if (appData.game.status == 2) {
                appData.game.cardDeal = 3;
            }
        }

        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < obj.all_gamer_info.length; j++) {
                if (appData.player[i].serial_num == obj.all_gamer_info[j].serial_num) {
                    appData.player[i].nickname = obj.all_gamer_info[j].nickname;
                    appData.player[i].headimgurl = obj.all_gamer_info[j].headimgurl;
                    appData.player[i].account_id = obj.all_gamer_info[j].account_id;
                    appData.player[i].account_score = Math.ceil(obj.all_gamer_info[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.all_gamer_info[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.all_gamer_info[j].online_status);
                    appData.player[i].ticket_checked = obj.all_gamer_info[j].ticket_checked;

                    appData.player[i].multiples = obj.all_gamer_info[j].multiples;
                    appData.player[i].bankerMultiples = obj.all_gamer_info[j].banker_multiples;
                    appData.player[i].card_type = obj.all_gamer_info[j].card_type;
                    appData.player[i].combo_point = obj.all_gamer_info[j].combo_point;
                    appData.player[i].is_showbull = false;
                    if (obj.all_gamer_info[j].is_banker == 1) {
                        appData.player[i].is_banker = true;
                        appData.bankerAccountId = obj.all_gamer_info[j].account_id;
                        appData.bankerPlayer = appData.player[i];
                    } else {
                        appData.player[i].is_banker = false;
                    }
                    if (appData.player[i].account_status >= 8) {
                        appData.player[i].is_showCard = true;
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = obj.all_gamer_info[j].cards.concat();
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = obj.all_gamer_info[j].cards.concat();
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = [-1, -1, -1, -1, -1];
                    }
                }
            }
        }

        if (appData.player[0].account_status >= 7) {
            appData.player[0].is_showCard = true;
        }

        if (appData.player[0].account_status > 2) {
            setTimeout(function() {
                if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

                } else {
                    appData.player[0].is_showCard = true;
                }

            }, 500);
        }
        if (appData.player[0].account_status == 3) {

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

            } else {
                appData.showClockRobText = true;
            }
            setTimeout(function() {
                appData.showRob = true;
            }, 500);
        }
        if (appData.player[0].account_status == 6) {
            appData.showClockBetText = true;
            if (appData.player[0].is_banker == true) {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = true;
                appData.showTimesCoin = false;
            } else {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = false;
                appData.showTimesCoin = true;
            }
        }

        if (appData.player[0].account_status == 6) {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~');
            appData.isFinishBankerAnimate = true;
        }

        console.log('723: resetMyAccountStatus');
        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();

        if (appData.player[0].account_status > 2 && appData.player[0].account_status < 7 && appData.ruleInfo.banker_mode == 2) {
            viewMethods.seeMyCard();
        }
    },
    processStartShow: function(obj) {
        var delay = 0;
        if (appData.ruleInfo.banker_mode == 4) {
            delay = 800;
        }

        setTimeout(function() {
            for (var i = 0; i < appData.player.length; i++) {
                for (var j = 0; j < obj.data.length; j++) {
                    if (appData.player[i].account_id == obj.data[j].account_id) {
                        appData.player[i].multiples = obj.data[j].multiples;
                        appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                        appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                        appData.player[i].card = obj.data[j].cards.concat();
                        appData.player[i].card_open = obj.data[j].cards.concat();
                        appData.player[i].card_type = obj.data[j].card_type;
                        appData.player[i].combo_point = obj.data[j].combo_point;
                        appData.player[i].limit_time = obj.data[j].limit_time;
                        if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                            appData.player[i].card_open = obj.data[j].cards.concat();
                        }
                    }
                }
            }
            appData.showClockBetText = false;
            appData.showClockRobText = false;
            appData.showClockShowCard = true;
            console.log('581: resetMyAccountStatus');
            viewMethods.resetMyAccountStatus();
            viewMethods.updateAllPlayerStatus();

            appData.game.time = Math.ceil(obj.limit_time);
            viewMethods.timeCountDown();
        }, delay);

    },
    processMyCards: function(obj) {
        if (appData.ruleInfo.banker_mode == 2) {
            if (appData.player[0].account_id == obj.data.account_id) {
                appData.player[0].card = obj.data.cards.concat();
            }

            viewMethods.seeMyCard();
        }
        if(obj.data.bonus)
        {
            setTimeout(function () {
                for (var t = 0; t < appData.player.length; t++)
                {
                    for (var k = 0; k < obj.data.bonus.length; k++)
                    {
                        if (appData.player[t].account_id == obj.data.bonus[k].account_id) {
                            var bonus=obj.data.bonus[k]
                            if (appData.player[t].card_type = bonus.card_type,
                            appData.player[t].cards = bonus.cards.concat(),
                            appData.player[t].card_open = bonus.cards.concat(),
                            appData.player[t].combo_point = bonus.combo_point,
                            appData.player[t].bonus = 1,
                            //appData.player[t].card_open = getComboCards(bonus.cards.concat()),
                            appData.player[t].account_status >= 8) {
                            }
                            break
                        }
                    }
                }
                viewMethods.updateAllPlayerStatus()
            }, 700);
        }
        else
        {
            for (var t = 0; t < appData.player.length; t++)
            {
                appData.player[t].bonus = 0
            }
        }
    },
    processBreakRoom: function(obj) {
        appData.breakData = obj;

        if (appData.ruleInfo.banker_mode != 5) {
            return;
        }

        if (appData.game.round == appData.game.total_num) {
            return;
        }

        if (obj == null || obj == undefined) {
            appData.overType = 2;
            viewMethods.clickShowAlert(9, '庄家分数不足，提前下庄，点击确定查看结算');
            return;
        }

        if (obj.data.type == 1) {
            if (appData.player[0].is_banker) {
                viewMethods.clickCloseAlert();
                if (appData.breakData != null && appData.breakData != undefined) {
                    viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard);
                }
                chooseBigWinner();
                $(".ranking .rankBack").css("opacity", "1");
                $(".roundEndShow").show();

                $(".ranking").show();
                canvas();
            } else {
                appData.overType = 1;
                viewMethods.clickShowAlert(9, '庄家主动下庄,点击确定查看结算');
            }

        } else {
            appData.overType = obj.data.type;
            // return;
            // viewMethods.clickShowAlert(9, '庄家分数不足，点击确定查看结算');
        }
    },
    processStartBet: function(obj) {
        var delay = 0;
        if (appData.ruleInfo.banker_mode == 3) {
            delay = 1200;
        }

        if (appData.ruleInfo.banker_mode == 5 && appData.game.round > 1) {
            delay = 900;
        }


        if (appData.game.round == 1 && appData.ruleInfo.banker_mode == 5) {
            //viewMethods.reDeal();
        }

        setTimeout(function() {
            for (var i = 0; i < appData.player.length; i++) {
                for (var j = 0; j < obj.data.length; j++) {
                    if (appData.player[i].account_id == obj.data[j].account_id) {
                        appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                        appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                        appData.player[i].limit_time = Math.ceil(obj.data[j].limit_time);
                        appData.player[i].multiples = 0;
                        if (obj.data[j].is_banker == 1) {
                            appData.player[i].is_banker = true;
                            appData.bankerAccountId = obj.data[j].account_id;
                            appData.bankerPlayer = appData.player[i];
                        } else {
                            appData.player[i].is_banker = false;
                        }
                    }
                }
            }
            appData.bankerArray = obj.grab_array.concat();
            appData.showRob = false;
            appData.showClockBetText = false;
            appData.showClockRobText = false;
            appData.showClockShowCard = false;
            appData.game.time = Math.ceil(obj.limit_time);
            appData.bankerAnimateIndex = 0;

            appData.game.time = -1;

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round > 1) {
                viewMethods.robBankerWithoutAnimate(obj);
            } else {
                if (appData.ruleInfo.banker_mode == 3 && appData.game.round > 1) {
                    viewMethods.robBankerWithoutAnimate(obj);
                } else {
                    if(appData.ruleInfo.banker_mode != 4){
                        viewMethods.clearBanker();
                        viewMethods.robBankerAnimate(obj);
                    }
                    else{
                        appData.game.time = Math.ceil(obj.limit_time);
                        if (appData.game.time > 0) {
                            viewMethods.timeCountDown();
                        }
                    }
                }
            }

        }, delay);

    },
    processAllGamerInfo: function(obj) {

        appData.game.show_card = true;
        appData.clickCard3 = false;

        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].serial_num == obj.data[j].serial_num) {
                    appData.player[i].nickname = obj.data[j].nickname;
                    appData.player[i].headimgurl = obj.data[j].headimgurl;
                    appData.player[i].account_id = obj.data[j].account_id;
                    appData.player[i].account_score = Math.ceil(obj.data[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].ticket_checked = obj.data[j].ticket_checked;

                    appData.player[i].multiples = obj.data[j].multiples;
                    appData.player[i].bankerMultiples = obj.data[j].banker_multiples;
                    appData.player[i].card_type = obj.data[j].card_type;
                    appData.player[i].combo_point = obj.data[j].combo_point;
                    appData.player[i].is_showbull = false;
                    appData.player[i].poker_kw =  obj.data[j].poker_kw;
                    appData.player[i].head_kw =  obj.data[j].head_kw;
                    appData.player[i].sex =  obj.data[j].sex;
                    if (obj.data[j].is_banker == 1) {
                        appData.player[i].is_banker = true;
                        appData.bankerAccountId = obj.data[j].account_id;
                        appData.bankerPlayer = appData.player[i];
                    } else {
                        appData.player[i].is_banker = false;
                    }
                    if (appData.player[i].account_status >= 8) {
                        appData.player[i].is_showCard = true;
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = obj.data[j].cards.concat();
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = obj.data[j].cards.concat();
                    }

                    if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                        appData.player[i].card_open = [-1, -1, -1, -1, -1];
                    }
                }
            }
        }
        if (appData.player[0].account_status >= 7) {
            appData.player[0].is_showCard = true;
        }
        if (appData.scoreboard != "") {
            for (var i = 0; i < appData.player.length; i++) {
                for (s in appData.scoreboard) {
                    if (appData.player[i].account_id == s) {
                        appData.playerBoard.score[i].num = appData.player[i].num;
                        appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                        appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                        appData.playerBoard.score[i].account_score = Math.ceil(appData.scoreboard[s]);
                    }
                }
            }
            if (appData.game.status == 2) {
                appData.playerBoard.round = appData.game.round - 1;
            } else {
                appData.playerBoard.round = appData.game.round;
            }
            // appData.playerBoard.record = "前" + appData.playerBoard.round + "局";
        }
        if (appData.player[0].account_status > 2) {
            setTimeout(function() {
                if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

                } else {
                    appData.player[0].is_showCard = true;
                }

            }, 500);
        }
        if (appData.player[0].account_status == 3) {

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

            } else {
                appData.showClockRobText = true;
            }
            setTimeout(function() {
                appData.showRob = true;
            }, 500);
        }
        if (appData.player[0].account_status == 6) {
            appData.showClockBetText = true;
            if (appData.player[0].is_banker == true) {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = true;
                appData.showTimesCoin = false;
            } else {
                appData.showRob = false;
                appData.showRobText = false;
                appData.showNotRobBankerText = false;
                appData.showShowCardButton = false;
                appData.showClickShowCard = false;
                appData.showBankerCoinText = false;
                appData.showTimesCoin = true;
            }
        }

        if (appData.player[0].account_status == 6) {
            console.log('~~~~~~~~~~~~~~~~~~~~~~~');
            appData.isFinishBankerAnimate = true;
        }

        console.log('723: resetMyAccountStatus');
        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();

        if (appData.player[0].account_status > 2 && appData.player[0].account_status < 7 && appData.ruleInfo.banker_mode == 2) {
            viewMethods.seeMyCard();
        }
    },
    processUpdateGamerInfo: function(obj) {
        var has_seat = false;    //观战功能
        logMessage(appData.player);
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].serial_num == obj.data.serial_num) {
                appData.player[i].nickname = obj.data.nickname;
                appData.player[i].headimgurl = obj.data.headimgurl;
                appData.player[i].account_id = obj.data.account_id;
                appData.player[i].account_score = Math.ceil(obj.data.account_score);
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                appData.player[i].online_status = Math.ceil(obj.data.online_status);
                appData.player[i].ticket_checked = obj.data.ticket_checked;
                appData.player[i].poker_kw = obj.data.poker_kw;
                appData.player[i].head_kw = obj.data.head_kw;
                appData.player[i].sex = obj.data.sex;
                appData.player[i].is_guest=0;    //观战功能
            } else {
                if (appData.player[i].account_id == obj.data.account_id) {
                    socketModule.sendRefreshRoom();
                }
                //观战功能  有位置
                if(appData.player[i].account_id == userData.accountId || 0==appData.player[i].account_id){
                    has_seat = true;
                }
            }
        }
        appData.showSitdownButton = appData.isWatching && has_seat;

        //观战功能  加入游戏的玩家从观战者列表中剔除
        for(a=0;a<appData.guests.length;a++)
            if(appData.guests[a].account_id==obj.data.account_id){
                break;
            }
        appData.guests.splice(a,1);
    },
    processUpdateAccountStatus: function(obj) {

        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_status = obj.data.account_status;

                if (appData.ruleInfo.banker_mode == 2 && obj.data.account_status == 5) {
                    appData.player[i].bankerMultiples = obj.data.banker_multiples;
                }

                if (appData.player[i].account_status >= 8) {
                    appData.player[i].online_status = obj.data.online_status;
                    return;
                }

                if (obj.data.online_status == 1) {
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);
                } else if (obj.data.online_status == 0 && appData.player[i].account_status == 0) {
                    appData.player[i].account_id = 0;
                    appData.player[i].playing_status = 0;
                    appData.player[i].online_status = 0;
                    appData.player[i].nickname = "";
                    appData.player[i].headimgurl = "";
                    appData.player[i].account_score = 0;
                } else if (obj.data.online_status == 0 && appData.player[i].account_status > 0) {
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);
                    appData.player[i].online_status = 0;
                } else {
                    logMessage("~~~~~~~!!!!!!" + obj);
                }

                if (i != 0) {
                    if (appData.player[i].account_status == 4) {
                        setTimeout(function() {
                            mp3AudioPlay("audioNoBanker");
                        }, 100);
                    } else if (appData.player[i].account_status == 5) {
                        setTimeout(function() {
                            mp3AudioPlay("audioRobBanker");
                        }, 100);
                    }
                }

                break;
            }
        }

        if (appData.player[0].account_status == 3) {
            viewMethods.showRobBankerText();
        } else if (appData.player[0].account_status == 4) {
            viewMethods.showNotRobBankerTextFnc();
        }

        if (!appData.isFinishBankerAnimate || !appData.isFinishWinAnimate) {
            setTimeout(function() {
                console.log('797: resetMyAccountStatus');
                viewMethods.resetMyAccountStatus();
                viewMethods.updateAllPlayerStatus();
            }, 3e3);
        } else {
            console.log('802: resetMyAccountStatus');
            viewMethods.resetMyAccountStatus();
            viewMethods.updateAllPlayerStatus();
        }
        if(appData.player.length == i){ //观战功能  观战者离线
            for(a=0;a<appData.guests.length;a++)
                if(appData.guests[a].account_id==obj.data.account_id){
                    break;
                }
            appData.guests.splice(a,1);
        }
    },
    processUpdateAccountShow: function(obj) {
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].card_type = obj.data.card_type;
                appData.player[i].cards = obj.data.cards.concat();

                appData.player[i].card_open = obj.data.cards.concat();
                appData.player[i].combo_point = obj.data.combo_point;
                appData.player[i].account_status = 8;
                if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                    appData.player[i].card_open = obj.data.cards.concat();
                }
                if (appData.player[i].is_audiobull == false && appData.player[i].account_status >= 8) {
                    var audio = "";
                    if (parseInt(appData.player[i].card_type)>4) {
                        audio = "special"+appData.player[i].card_type;
                    } else  {
                        audio = "sangong" + appData.player[i].combo_point;
                    }
                    setTimeout(function() {
                        mp3AudioPlay(audio);
                    }, 100);
                    appData.player[i].is_audiobull = true;
                }
                break;
            }
        }

        if (obj.data.account_id == appData.player[0].account_id) {
            console.log('841: resetMyAccountStatus');
            viewMethods.resetMyAccountStatus();
        }

        viewMethods.updateAllPlayerStatus();
    },
    processUpdateAccountMultiples: function(obj) {
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].multiples = obj.data.multiples;
                if (appData.player[i].multiples >= 1) {
                    var multiples = appData.player[i].multiples;
                    setTimeout(function() {
                        mp3AudioPlay("audioTimes" + multiples);
                    }, 100);
                }
                break;
            }
        }

        console.log('864: resetMyAccountStatus');
        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();
    },
    processStartLimitTime: function(obj) {
        if (obj.data.limit_time > 1) {
            appData.game.time = Math.ceil(obj.data.limit_time);
            viewMethods.timeCountDown();
        }
    },
    processCancelStartLimitTime: function(obj) {
        appData.game.time = -1;
    },
    processGameStart: function(obj) {
        var sTime = 0;
        $(".memberCoin").stop(true);
        appData.isFinishWinAnimate = true;
        appData.isFinishBankerAnimate = true;
        appData.game.can_open = 0;
        appData.game.cardDeal = 0;
        appData.game.currentScore = 0;
        appData.game.status = 1;
        appData.game.show_card = true;
        appData.game.score = 0;
        appData.game.time = -1;
        appData.game.is_play = true;
        appData.game.round = appData.game.round + 1;
        appData.game.round = Math.ceil(obj.game_num);
        appData.player[0].is_showCard = false;
        appData.showClockRobText = false;
        appData.showClockBetText = false;
        appData.showClockShowCard = false;
        appData.clickCard3 = false;
        appData.showClickShowCard = false;
        appData.breakData = null;

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].is_operation = false;
            appData.player[i].is_showCard = false;
            appData.player[i].is_showbull = false;

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round > 1) {

            } else {
                if (appData.ruleInfo.banker_mode == 3 && appData.game.round > 1) {

                } else {
                    appData.player[i].is_banker = false;
                }
            }

            appData.player[i].bullImg = "";

            if (appData.player[i].online_status == 0) {
                appData.player[i].account_status = 1;
            }

            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].account_id == obj.data[j].account_id) {

                    appData.player[i].ticket_checked = 1;
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].playing_status = Math.ceil(obj.data[j].playing_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].account_score = appData.player[i].account_score;
                    appData.player[i].limit_time = Math.ceil(obj.data[j].limit_time);
                    appData.game.score = appData.game.score;
                }
            }
        }

        appData.game.status = 2;

        if (appData.game.round == 1 && appData.ruleInfo.banker_mode == 5) {
            //固定庄家的第一回合
            appData.game.time = -1;
            viewMethods.resetMyAccountStatus();

            //appData.showClockRobText = true;
        } else {
            appData.game.time = Math.ceil(obj.limit_time);
            viewMethods.timeCountDown();
            viewMethods.reDeal();
        }

    },
    processBroadcastVoice: function (obj) {
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id && i != 0) {

                if (appData.player[0].sex == 1) {
                    var loadMessageNum = 'message'+ obj.data.voice_num;
                }else{
                    var loadMessageNum = 'message'+ obj.data.voice_num + '_1';
                }
                audioModule.loadAudioFile(globalData.fileUrl + 'fiesc/audio/sound61013/' + loadMessageNum + '.m4a', loadMessageNum);
                setTimeout(function () {
                    m4aAudioPlay(loadMessageNum);
                }, 200)

                viewMethods.messageSay(i, obj.data.voice_num);
            }
        }
    },
    processUpdateAccountScore: function(obj) {
        for (var i = 0; i < 6; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {

                appData.player[i].account_score = appData.player[i].account_score - Math.ceil(obj.data.score);

                if (appData.player[i].account_status == 5) {
                    appData.game.currentScore = Math.ceil(obj.data.score) * 2;
                } else {
                    appData.game.currentScore = Math.ceil(obj.data.score);
                }

                appData.game.score = appData.game.score + Math.ceil(obj.data.score);
                if (i != 0 || appData.player[0].account_id != userData.accountId) { //观战功能
                    viewMethods.throwCoin(appData.player[i].num, obj.data.score);
                    m4aAudioPlay(obj.data.score + "f");
                }
            }
        }
    },
    //自动续局
    processAutoCreateRoom: function(obj){
        var newRoom=obj.data;
        newRoom.oldRoomNumber=globalData.roomNumber;
        localStorage.setItem('newRoom',JSON.stringify(obj.data))
    },
    processWin: function(obj) {
        appData.game.is_play = false;
        appData.game.current_win = obj.data.win_score;
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.playerBoard.round = Math.ceil(obj.data.game_num);
        appData.game.show_score = false;
        appData.showClockShowCard = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showClockBetText = false;
        appData.showClockRobText = false;

        if (appData.ruleInfo.banker_mode == 3) {
            appData.bankerID = Math.ceil(obj.data.banker_id);
            appData.bankerAccountId = appData.bankerID;
            console.log(appData.bankerID);
        }

        if (appData.ruleInfo.banker_mode == 5) {
            if (appData.player[0].is_banker) {
                appData.canBreak = Math.ceil(obj.data.can_break);
            }

            if (obj.data.is_break != null || obj.data.is_break != undefined) {
                appData.isBreak = Math.ceil(obj.data.is_break);
            }
        }


        viewMethods.showMemberScore(false);

        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_status >= 7) {
                appData.player[i].account_status = 8;
            }
            for (var j = 0; j < obj.data.loser_array.length; j++) {
                if (appData.player[i].account_id == obj.data.loser_array[j].account_id) {
                    appData.player[i].single_score = obj.data.loser_array[j].score;
                    break;
                }
            }
            for (var k = 0; k < obj.data.winner_array.length; k++) {
                if (appData.player[i].account_id == obj.data.winner_array[k].account_id) {
                    appData.player[i].single_score = obj.data.winner_array[k].score;
                    break;
                }
            }
        }
        appData.game.time = -1;
        viewMethods.updateAllPlayerStatus();

        setTimeout(function() {
            console.log('983: resetMyAccountStatus');
            viewMethods.resetMyAccountStatus();
        }, 200);

        if (appData.player[0].account_status >= 8 && appData.player[0].is_audiobull == false) {
            var cardType =parseInt(appData.player[0].card_type);
            var point = appData.player[0].combo_point;
            setTimeout(function() {
                if (cardType > 4) {
                    mp3AudioPlay("special"+appData.player[0].card_type);
                } else {
                    mp3AudioPlay("sangong" + point);
                }
            }, 200);

            appData.player[0].is_audiobull = true;
        }
        setTimeout(function() {
            appData.game.show_card = false;
            viewMethods.winAnimate(obj);
        }, 2000);  //3000
    },
    processBalanceScoreboard: function(obj) {
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
        appData.playerBoard.room = '房间号:' + globalData.roomNumber;
        // appData.playerBoard.record = str + " 前" + appData.playerBoard.round + "局";
        appData.playerBoard.record = str;
        appData.playerBoard.score = [];

        var scores = obj.scoreboard;
        for (s in scores) {
            var num = 0;
            var name = scores[s].name;

            if (userData.accountId == scores[s].account_id) {
                num = 1;
            }

            appData.playerBoard.score.push({
                "account_id": scores[s].account_id,
                "nickname": name,
                "account_score": Math.ceil(scores[s].score),
                "num": num,
                "avatar": scores[s].avatar
            });
        }

    },
    processLastScoreboard: function(obj) {
        if (obj == undefined) {
            return;
        }

        console.log(obj);
        try {
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
            // appData.playerBoard.record = str + " 前" + appData.playerBoard.round + "局";
            appData.playerBoard.record = str;
            appData.playerBoard.score = [];

            if (obj.total_num != undefined && obj.total_num != null && obj.total_num != '') {
                appData.game.total_num = obj.total_num;
            }

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
                    "avatar": scores[s].avatar
                });
            }

            chooseBigWinner();
            $(".ranking .rankBack").css("opacity", "1");
            $(".roundEndShow").show();

            $(".ranking").show();
            canvas();
            $('#endCreateRoomBtn').show();
        } catch (error) {
            console.log(error);
        }
    },
};

var viewMethods = {
    showHomeAlert: function() {
        appData.isShowHomeAlert = true;
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    clickGameOver: function() {
        viewMethods.clickShowAlert(10, '下庄之后，将以当前战绩进行结算。是否确定下庄？');
        //socketModule.sendGameOver();
    },
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
    clickShowAlertNotClubMember: function(type, text) {
        //$(".alertText").css("top", "90px");
        appData.alertType = type;
        appData.alertText = text;
        appData.isShowNotClubMember = true;
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
    clickCloseAlert: function() {
        if (appData.alertType == 22) {
            appData.isShowGameAlert = false;
            httpModule.getInfo();
        } else {
            appData.isShowGameAlert = false;
            appData.isShowAlert=false;
        }
    },
    clickSitDown: function(e) {
        appData.isShowGameAlert = false;
        // socketModule.sendJoinRoom();
        if(appData.isWatching==1){
            socketModule.sendSitDown(e);
        }else{
            socketModule.sendSwapSeat(e);
        }
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    clickReady: function() {
        socketModule.sendReadyStart();
        appData.player[0].is_operation = true;
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    clickShowIntro: function () {
        appData.isShowIntro = true;
    },
    clickCloseIntro: function () {
        appData.isShowIntro = false;
    },
    reDeal: function() {
        if (appData.isDealing) {
            return;
        }

        console.log('~~~~reDeal~~~~~');
        appData.isDealing = true;
        m4aAudioPlay("audio1");
        appData.game.cardDeal = 1;
        setTimeout(function() {
            appData.game.cardDeal = 2;
            setTimeout(function() {
                appData.game.cardDeal = 3;
                setTimeout(function() {
                    console.log('1139: resetMyAccountStatus');
                    viewMethods.resetMyAccountStatus();
                    appData.player[0].is_showCard = true;
                    appData.showClockRobText = true;
                    appData.isDealing = false;
                    if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {
                        viewMethods.updateAllPlayerStatus();
                    }
                }, 150);
            }, 30);
        }, 30);
    },
    resetMyAccountStatus: function() {

        if (appData.player[0].account_status == 6) {
            if (!appData.isFinishBankerAnimate) {
                return;
            }
        }

        viewMethods.resetShowButton();

        if (appData.player[0].account_status == 3) {
            appData.showRob = true;
        } else if (appData.player[0].account_status == 4) {
            appData.showNotRobText = true;
        } else if (appData.player[0].account_status == 5) {
            appData.showRobText = true;
        } else if (appData.player[0].account_status == 6) {
            if (appData.player[0].is_banker == true) {
                appData.showBankerCoinText = true;
            } else {
                if (appData.isFinishBankerAnimate||appData.ruleInfo.banker_mode==4) {
                    appData.showTimesCoin = true;
                }
            }
        } else if (appData.player[0].account_status == 7) {
            appData.player[0].is_showCard = true;
            if (appData.clickCard3 == true) {
                appData.showShowCardButton = true;
            } else {
                appData.showClickShowCard = true;
            }
        } else if (appData.player[0].account_status == 8) {
            appData.player[0].is_showCard = true;
        }
        if(appData.player[0].bonus)
        {
            if(7 == appData.player[0].account_status)
            {
                appData.clickCard3=1
                appData.showShowCardButton=1
                appData.showClickShowCard=0
            }
        }
    },
    resetShowButton: function() {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = false;
        appData.showRobText = false;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    seeMyCard: function() {
        if(appData.player[0].account_id!=userData.accountId) return; //观战功能
        if (appData.ruleInfo.banker_mode == 2) { //明牌抢庄
            setTimeout(function() {
                $(".myCards .card0").addClass("card-flipped");
                $(".myCards .card1").addClass("card-flipped");

                setTimeout(function() {
                    if (appData.clickCard3 != true) {
                        if (appData.player[0].account_status >= 7) {
                            appData.showClickShowCard = true;
                        }
                    }

                }, 500);
            }, 1000);
        } else {
            setTimeout(function() {
                $(".myCards .card0").addClass("card-flipped");
                $(".myCards .card1").addClass("card-flipped");

                setTimeout(function() {
                    if (appData.clickCard3 != true ) {
                        appData.showClickShowCard = true;
                    }

                }, 500);
            }, 350);
        }

    },

    seeMyCard3: function() {
        if(appData.player[0].account_id!=userData.accountId) return; //观战功能
        if (appData.player[0].account_status >= 7) {
            $(".myCards .card2").addClass("card-flipped");
            appData.clickCard3 = true;
            setTimeout(function() {
                appData.showShowCardButton = true;
                appData.showClickShowCard = false;
            }, 100)
        }
    },
    resetCardOver: function(num) {
        if(appData.player.length==6){
            if (num == 1) {
                $(".myCards .card00").css("left", "35%");
                $(".myCards .card01").css("left", "50%");
                $(".myCards .card02").css("left", "65%");
            } else if (num==2||num==3) {
                $(".cardOver .card"+num+"11").css("right", "10.5vh");
                $(".cardOver .card"+num+"21").css("right", "12.5vh");
                $(".cardOver .card"+num+"31").css("right", "14.5vh");
            } else if (num==4) {
                $(".cardOver .card"+num+"11").css("left", "56%");
                $(".cardOver .card"+num+"21").css("left", "48%");
                $(".cardOver .card"+num+"31").css("left", "40%");
            } else if (num==5 || num == 6) {
                $(".cardOver .card"+num+"11").css("left", "10.5vh");
                $(".cardOver .card"+num+"21").css("left", "12.5vh");
                $(".cardOver .card"+num+"31").css("left", "14.5vh");
            }
        }else if(appData.player.length==9){
            if (num == 1) {
                $(".myCards .card00").css("left", "35%");
                $(".myCards .card01").css("left", "50%");
                $(".myCards .card02").css("left", "65%");
            } else if (num==2||num==3||num==4 || num == 5) {
                $(".cardOver .card"+num+"11").css("right", "10.5vh");
                $(".cardOver .card"+num+"21").css("right", "12.5vh");
                $(".cardOver .card"+num+"31").css("right", "14.5vh");
            } else if (num == 6 || num==7||num==8||num==9) {
                $(".cardOver .card"+num+"11").css("left", "10.5vh");
                $(".cardOver .card"+num+"21").css("left", "12.5vh");
                $(".cardOver .card"+num+"31").css("left", "14.5vh");
            }
        }else if(appData.player.length==13){
            if (num == 1) {
                $(".myCards .card00").css("left", "35%");
                $(".myCards .card01").css("left", "50%");
                $(".myCards .card02").css("left", "65%");
            } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7) {
                $(".cardOver .card"+num+"11").css("right", "10.5vh");
                $(".cardOver .card"+num+"21").css("right", "12.5vh");
                $(".cardOver .card"+num+"31").css("right", "14.5vh");
            } else if (num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13) {
                $(".cardOver .card"+num+"11").css("left", "10.5vh");
                $(".cardOver .card"+num+"21").css("left", "12.5vh");
                $(".cardOver .card"+num+"31").css("left", "14.5vh");
            }
        }else if(appData.player.length==15){
            if (num == 1) {
                $(".myCards .card00").css("left", "28%");
                $(".myCards .card01").css("left", "43%");
                $(".myCards .card02").css("left", "58%");
            } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8) {
                $(".cardOver .card"+num+"11").css("right", "10vh");
                $(".cardOver .card"+num+"21").css("right", "13vh");
                $(".cardOver .card"+num+"31").css("right", "16vh");
            } else if (num == 9 || num == 10 || num == 11 || num == 12 || num == 13  || num == 14  || num == 15) {
                $(".cardOver .card"+num+"11").css("left", "10vh");
                $(".cardOver .card"+num+"21").css("left", "13vh");
                $(".cardOver .card"+num+"31").css("left", "16vh");
            }
        }else if(appData.player.length==17){
            if (num == 1) {
                $(".myCards .card00").css("left", "28%");
                $(".myCards .card01").css("left", "43%");
                $(".myCards .card02").css("left", "58%");
            } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9) {
                $(".cardOver .card"+num+"11").css("right", "10vh");
                $(".cardOver .card"+num+"21").css("right", "13vh");
                $(".cardOver .card"+num+"31").css("right", "16vh");
            } else if (num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17) {
                $(".cardOver .card"+num+"11").css("left", "10vh");
                $(".cardOver .card"+num+"21").css("left", "13vh");
                $(".cardOver .card"+num+"31").css("left", "16vh");
            }
        }

    },
    myCardOver: function() {
        if (appData.player[0].is_showbull == true) {
            return;
        }
        appData.player[0].is_showbull = true;
    },
    cardOver6: function(num) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }
        appData.player[num - 1].is_showbull = true;
        viewMethods.resetCardOver(num);

        setTimeout(function() {
            if (num == 2 || num == 3) {
                $(".cardOver .card" + num + "11").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "10.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "14.5vh"
                    }, 250);
                }, 150);

            } else if (num == 4) {
                $(".cardOver .cardtf" + num).addClass("card-flipped");
                $(".cardOver .card" + num + "31").animate({
                    left: "44%"
                }, 150);

                $(".cardOver .card" + num + "21").animate({
                    left: "44%"
                }, 150);operationButton

                $(".cardOver .card" + num + "11").animate({
                    left: "44%"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "31").animate({
                        left: "44%"
                    }, 250);

                    $(".cardOver .card" + num + "21").animate({
                        left: "48%"
                    }, 250);

                    $(".cardOver .card" + num + "11").animate({
                        left: "52%"
                    }, 250);
                }, 150);

            } else if (num == 5 || num == 6) {
                $(".cardOver .card" + num + "11").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "14.5vh"
                    }, 250);

                    $(".cardOver .card" + num + "21").animate({
                        left: "12.5vh"
                    }, 250);

                    $(".cardOver .card" + num + "31").animate({
                        left: "10.5vh"
                    }, 250);
                }, 150);
            }
        }, 1);

    },
    cardOver9: function(num) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }
        appData.player[num - 1].is_showbull = true;
        viewMethods.resetCardOver(num);

        setTimeout(function() {
            if (num == 2 || num == 3 || num == 4 || num == 5) {
                $(".cardOver .card" + num + "11").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "10.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "14.5vh"
                    }, 250);
                }, 150);

            } else if (num == 6|| num == 7 || num == 8 || num == 9) {
                $(".cardOver .card" + num + "11").animate({
                    left: "10.5vh"
                }, 150);

                $(".cardOver .card" + num + "21").animate({
                    left: "10.5vh"
                }, 150);

                $(".cardOver .card" + num + "31").animate({
                    left: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "14.5vh"
                    }, 250);

                    $(".cardOver .card" + num + "21").animate({
                        left: "12.5vh"
                    }, 250);

                    $(".cardOver .card" + num + "31").animate({
                        left: "10.5vh"
                    }, 250);
                }, 150);

            } else if (num == 55) {
                $(".cardOver .card" + num + "11").animate({
                    right: "14.63vh"
                }, 150);

                $(".cardOver .card" + num + "21").animate({
                    right: "14.63vh"
                }, 150);

                $(".cardOver .card" + num + "31").animate({
                    right: "14.63vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "14.63vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "16.63vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "18.63vh"
                    }, 250);
                }, 150);
            } else if (num == 66) {
                $(".cardOver .card" + num + "11").animate({
                    left: "14.63vh"
                }, 150);

                $(".cardOver .card" + num + "21").animate({
                    left: "14.63vh"
                }, 150);

                $(".cardOver .card" + num + "31").animate({
                    left: "14.63vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "18.63vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        left: "16.63vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        left: "14.63vh"
                    }, 250);
                }, 150);
            }
        }, 1);
    },
    cardOver13: function(num) {
        console.log('13人')
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }
        appData.player[num - 1].is_showbull = true;
        viewMethods.resetCardOver(num);

        setTimeout(function() {
            if (num == 2 || num == 3 || num == 4|| num == 5 || num == 6 || num == 7) {
                $(".cardOver .card" + num + "11").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "10.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "14.5vh"
                    }, 250);
                }, 150);

            } else if (num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13) {
                $(".cardOver .card" + num + "11").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "10.5vh"
                }, 150);

                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "14.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        left: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        left: "10.5vh"
                    }, 250);
                }, 150);

            }
        }, 1);
    },
    cardOver15: function(num) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver(num);

        setTimeout(function() {
            if (num == 2 || num == 3 || num == 4|| num == 5 || num == 6 || num == 7 || num == 8) {
                $(".cardOver .card" + num + "11").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "10.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "14.5vh"
                    }, 250);
                }, 150);

            } else if (num == 9 || num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15) {
                $(".cardOver .card" + num + "11").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "10.5vh"
                }, 150);

                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "14.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        left: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        left: "10.5vh"
                    }, 250);
                }, 150);
            }
        }, 1);
    },
    cardOver17: function(num) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver(num);

        setTimeout(function() {
            if (num == 2 || num == 3 || num == 4|| num == 5 || num == 6 || num == 7 || num == 8 || num == 9) {
                $(".cardOver .card" + num + "11").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "10.5vh"
                }, 150);
                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        right: "10.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        right: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        right: "14.5vh"
                    }, 250);
                }, 150);
            } else if (num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17) {
                $(".cardOver .card" + num + "11").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "10.5vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "10.5vh"
                }, 150);

                setTimeout(function() {
                    $(".cardOver .cardtf" + num).addClass("card-flipped");
                    $(".cardOver .card" + num + "11").animate({
                        left: "14.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "21").animate({
                        left: "12.5vh"
                    }, 250);
                    $(".cardOver .card" + num + "31").animate({
                        left: "10.5vh"
                    }, 250);
                }, 150);
            }
        }, 1);
    },
    gameOverNew: function(board, balance_scoreboard) {

        for (var i = 0; i < appData.playerBoard.score.length; i++) {
            appData.playerBoard.score[i].num = 0;
            appData.playerBoard.score[i].account_id = 0;
            appData.playerBoard.score[i].nickname = '';
            appData.playerBoard.score[i].account_score = 0;
            appData.playerBoard.score[i].isBigWinner = 0;
        }

        console.log(appData.playerBoard);

        for (var i = 0; i < globalData.maxCount; i++) {
            for (s in board) {
                if (appData.player[i].account_id == s) {
                    appData.player[i].account_score = Math.ceil(board[s]);
                    appData.playerBoard.score[i].num = appData.player[i].num;
                    appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                    appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                    appData.playerBoard.score[i].account_score = appData.player[i].account_score;
                }
            }
        }

        var d = new Date(),str = "";
        str += d.getFullYear() + "-";
        str += d.getMonth() + 1 + "-";
        str += d.getDate() + "  ";
        str += d.getHours() + ":";

        if (d.getMinutes() >= 10) {
            str += d.getMinutes();
        } else {
            str += "0" + d.getMinutes();
        }

        // appData.playerBoard.record = str + " 前" + appData.playerBoard.round + "局";
        appData.playerBoard.room = '房间号:' + globalData.roomNumber;
        appData.playerBoard.record = str;

        appData.base_score = appData.game.base_score;

        if (balance_scoreboard != undefined && balance_scoreboard != "-1") {
            console.log(balance_scoreboard);
            socketModule.processBalanceScoreboard(balance_scoreboard);
        }

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].playing_status = 0;
            appData.player[i].is_win = false;
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].win_show = false;
            appData.player[i].card = new Array();
            appData.player[i].card_open = new Array();
            appData.player[i].card_type = 0;
            appData.player[i].is_showCard = false;
            appData.player[i].is_readyPK = false;
            appData.player[i].is_pk = false;
            //appData.player[i].is_banker = false;
            appData.player[i].multiples = 0;
            appData.player[i].bankerMultiples = 0;
            appData.player[i].is_showbull = false;
            appData.player[i].is_audiobull = false;
        }
        appData.game.can_open = 0;
        appData.game.score = 0;
        appData.game.cardDeal = 0;
        appData.game.currentScore = 0;
        appData.game.status = 1;
        appData.player[0].is_showCard = false;
        appData.showClockRobText = false;
        appData.showClockBetText = false;
        appData.showClockShowCard = false;
    },
    showMessage: function() {
        if(appData.player[0].account_id!=userData.accountId) return; //观战功能
        appData.isShowNewMessage = true;
        disable_scroll();
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    hideMessage: function() {
        appData.isShowNewMessage = false;
        enable_scroll();
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    messageOn: function (num) {
        if (appData.player[0].sex == 1) {
            var loadMessageNum = 'message'+ num;
        }else{
            var loadMessageNum = 'message'+ num + '_1';
        }
        audioModule.loadAudioFile(globalData.fileUrl + 'fiesc/audio/sound61013/' + loadMessageNum + '.m4a', loadMessageNum);
        setTimeout(function () {
            m4aAudioPlay(loadMessageNum);
        }, 200)

        socketModule.sendBroadcastVoice(num);

        viewMethods.messageSay(0, num);
        viewMethods.hideMessage();
    },
    messageSay: function(num1, num2) {
        appData.player[num1].messageOn = true;
        appData.player[num1].messageText = appData.message[num2].text;
        setTimeout(function() {
            appData.player[num1].messageOn = false;
        }, 2500);
    },
    closeEnd: function() {
        return;
        // $(".ranking .rankBack").css("opacity", "0.7");
        // $(".end").hide();
        // $(".roundEndShow").hide();
        // $(".ranking").hide();
        // window.location.reload();
    },
    roundEnd: function() {
        // window.location.href = request_url+'home/gn?i='+globalData.roomNumber+'_&v='+(new Date().getTime());
        window.location.href = data.html_name+"?key="+data.data_key

    },
    updateAllPlayerStatus: function() {
        for (var i = 0; i < globalData.maxCount; i++) {
            //判断倍数图片
            if (appData.player[i].multiples > 0) {
                appData.player[i].timesImg = globalData.fileUrl + "files/images/sangong/text_times" + appData.player[i].multiples + ".png";
            }

            if (appData.player[i].bankerMultiples > 0) {
                appData.player[i].bankerTimesImg = globalData.fileUrl + "files/images/sangong/text_times" + appData.player[i].bankerMultiples + ".png";
            }

            //判断牛几图片
            if (appData.player[i].card_type >= 1) {
                var imgIndex = 20;
                var cardType = parseInt(appData.player[i].card_type);

                if (cardType == 1) {
                    imgIndex = 20;
                } else if (cardType == 4) {
                    imgIndex = 20;
                } else if (cardType == 5) {
                    imgIndex = 11;
                } else if (cardType == 6) {
                    imgIndex = 12;
                } else if (cardType == 7) {
                    imgIndex = 13;
                }

                else if (cardType == 8) {
                    imgIndex = 14;
                }  else if (cardType == 9) {
                    imgIndex = 15;
                }  else if (cardType == 10) {
                    imgIndex = 16;
                }  else if (cardType == 11) {
                    imgIndex = 17;
                }

                else {
                    imgIndex = appData.player[i].combo_point;
                }
                appData.player[i].bullImg = globalData.fileUrl + "files/images/daoyou/sangong/point" + imgIndex + ".png";

            }


            if (appData.player[i].account_status == 4) {

                if (appData.ruleInfo.banker_mode == 5) {
                    appData.player[i].robImg = globalData.fileUrl + "files/images/sangong/text_notgo.png";
                } else {
                    //不抢庄
                    appData.player[i].robImg = globalData.fileUrl + "files/images/sangong/text_notrob.png";
                }
            } else if (appData.player[i].account_status == 5) {

                if (appData.ruleInfo.banker_mode == 5) {
                    appData.player[i].robImg = globalData.fileUrl + "files/images/sangong/text_go.png";
                } else {
                    appData.player[i].robImg = globalData.fileUrl + "files/images/sangong/text_rob.png";
                }
            } else if (appData.player[i].account_status == 6) {
                //下注
                if (appData.player[i].multiples > 0) {}
            } else if (appData.player[i].account_status == 7) {
                //未摊牌
                if (i == 0) {
                    viewMethods.seeMyCard();
                }
            } else if (appData.player[i].account_status == 8 || appData.player[i].bonus) {
                //摊牌
                if (i == 0) {
                    viewMethods.myCardOver();
                } else {
                    if(appData.player.length==6){
                        viewMethods.cardOver6(appData.player[i].num);
                    }else if(appData.player.length==9){
                        viewMethods.cardOver9(appData.player[i].num);
                    }else if(appData.player.length==13){
                        viewMethods.cardOver13(appData.player[i].num);
                    }else if(appData.player.length==15){
                        viewMethods.cardOver15(appData.player[i].num);
                    }else if(appData.player.length==17){
                        viewMethods.cardOver17(appData.player[i].num);
                    }
                }
                if(appData.player[i].bonus) {
                    $(".myCards .card2").addClass("card-flipped")
                }
            }
        }
    },
    timeCountDown: function() {
        if (isTimeLimitShow == true) {
            return;
        }
        if (appData.game.time <= 0) {
            isTimeLimitShow = false;
            return 0;
        } else {
            isTimeLimitShow = true;
            appData.game.time--;
            timeLimit = setTimeout(function() {
                isTimeLimitShow = false;
                viewMethods.timeCountDown();
            }, 1e3);
        }
    },
    clickRobBanker: function(multiples) {
        viewMethods.showRobBankerText();
        socketModule.sendGrabBanker(multiples);

        if (appData.ruleInfo.banker_mode == 2) {
            appData.player[0].bankerMultiples = multiples;


            if (appData.player[0].bankerMultiples > 0) {
                appData.player[0].bankerTimesImg = globalData.fileUrl + "files/images/sangong/text_times" + appData.player[0].bankerMultiples + ".png";
            }
        }

        setTimeout(function() {
            mp3AudioPlay("audioRobBanker");
        }, 10);
    },
    showRobBankerText: function() {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = false;
        appData.showRobText = true;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    showNotRobBankerTextFnc: function() {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = true;
        appData.showRobText = false;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    clickNotRobBanker: function() {
        viewMethods.showNotRobBankerTextFnc();
        socketModule.sendNotGrabBanker();
        setTimeout(function() {
            mp3AudioPlay("audioNoBanker");
        }, 10);
    },
    clickSelectTimesCoin: function(times) {
        //appData.base_score = parseInt(appData.game.base_score) * parseInt(times);

        appData.player[0].multiples = times;
        appData.showTimesCoin = false;

        if (appData.player[0].multiples > 0) {
            appData.player[0].timesImg = globalData.fileUrl + "files/images/sangong/text_times" + appData.player[0].multiples + ".png";
        }

        socketModule.sendPlayerMultiples(times);
        setTimeout(function() {
            mp3AudioPlay("audioTimes" + times);
        }, 50);
    },
    clickShowCard: function() {
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        socketModule.sendShowCard();
    },
    clearBanker: function() {
        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].is_banker = false;
        }
        appData.isFinishBankerAnimate = false;
        var totalCount = appData.bankerArray.length * 2;
        appData.bankerAnimateDuration = parseInt(1200 / totalCount);




    },
    robBankerWithoutAnimate: function() {

        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == appData.bankerAccountId) {
                appData.player[i].is_banker = true;
                bankerNum = appData.player[i].num;
            } else {
                appData.player[i].is_banker = false;
            }

            $("#bankerAnimate2" + appData.player[i].num).hide();
            $("#bankerAnimate1" + appData.player[i].num).hide();
        }

        setTimeout(function() {
            appData.showClockRobText = false;
            appData.showClockBetText = true;
            appData.isFinishBankerAnimate = true;
            viewMethods.resetMyAccountStatus();
            viewMethods.updateAllPlayerStatus();
        }, 10);

        appData.game.time = Math.ceil(obj.limit_time);
        if (appData.game.time > 0) {
            viewMethods.timeCountDown();
        }
    },
    robBankerAnimate: function(obj) {

        if (appData.ruleInfo.banker_mode == 5) {
            appData.showRob = false;
        }

        for (var i = 0; i < appData.bankerArray.length; i++) {
            var imgId = "#banker" + appData.bankerArray[i];
            $(imgId).hide();
        }
        var totalCount = appData.bankerArray.length * 2;
        if (appData.bankerAnimateCount >= totalCount || appData.bankerAnimateIndex < 0 || appData.bankerArray.length < 2) {
            appData.bankerAnimateCount = 0;
            appData.bankerAnimateIndex = -1;
            var imgId = "#banker" + appData.bankerAccountId;
            $(imgId).show();

            var bankerNum = '';

            for (var i = 0; i < appData.player.length; i++) {
                if (appData.player[i].account_id == appData.bankerAccountId) {
                    appData.player[i].is_banker = true;
                    bankerNum = appData.player[i].num;
                } else {
                    appData.player[i].is_banker = false;
                }

                $("#bankerAnimate2" + appData.player[i].num).hide();
                $("#bankerAnimate1" + appData.player[i].num).hide();
            }

            $(imgId).hide();

            $("#bankerAnimate2" + bankerNum).css({
                top: "-0.1vh",
                left:"-0.1vh",
                width: "7.46vh",
                height:"7.46vh"
            });

            $("#bankerAnimate1" + bankerNum).css({
                top: "-1vh",
                left: "-1vh",
                width: "9.26vh",
                height:"9.26vh"
            });
            $("#bankerAnimate2" + bankerNum).show();
            $("#bankerAnimate1" + bankerNum).show();

            $("#bankerAnimate1" + bankerNum).animate({
                top: "-1vh",
                left: "-1vh",
                width: "9.26vh",
                height: "9.26vh"
            }, 100, function() {
                $("#bankerAnimate1" + bankerNum).animate({
                    top: "-0.1vh",
                    left: "-0.1vh",
                    width: "7.46vh",
                    height: "7.46vh"
                }, 100, function() {
                    $("#bankerAnimate1" + bankerNum).hide();
                });
            });

            $("#bankerAnimate2" + bankerNum).animate({
                top: "-1.5vh",
                left: "-1.5vh",
                width: "10.26vh",
                height: "10.26vh"
            }, 100, function() {
                $("#bankerAnimate2" + bankerNum).animate({
                    top: "-0.1vh",
                    left: "-0.1vh",
                    width: "7.46vh",
                    height: "7.46vh"
                }, 100, function() {
                    $("#bankerAnimate2" + bankerNum).hide();

                    setTimeout(function() {
                        console.log('1803: resetMyAccountStatus');
                        appData.showClockRobText = false;
                        appData.showClockBetText = true;
                        appData.isFinishBankerAnimate = true;

                        if (appData.ruleInfo.banker_mode == 5) {
                            for (var i = 0; i < obj.data.length; i++) {
                                for (var j = 0; j < globalData.maxCount; j++) {
                                    if (appData.player[j].account_id == obj.data[i].account_id) {
                                        appData.player[j].account_score = obj.data[i].account_score;
                                    }
                                }
                            }

                            setTimeout(function() {
                                viewMethods.reDeal();
                            }, 1000);

                            if (appData.game.round != 1) {
                                viewMethods.resetMyAccountStatus();
                                viewMethods.updateAllPlayerStatus();
                            }
                        } else {
                            viewMethods.resetMyAccountStatus();
                            viewMethods.updateAllPlayerStatus();
                        }

                    }, 10);

                    appData.game.time = Math.ceil(obj.limit_time);
                    if (appData.game.time > 0) {
                        viewMethods.timeCountDown();
                    }
                });
            });

            return;
        }

        var accountId = appData.bankerArray[appData.bankerAnimateIndex];
        var imgId = "#banker" + accountId;

        $(imgId).show();

        appData.lastBankerImgId = imgId;
        appData.bankerAnimateCount++;
        appData.bankerAnimateIndex++;

        if (appData.bankerAnimateIndex >= appData.bankerArray.length) {
            appData.bankerAnimateIndex = 0;
        }

        setTimeout(function() {
            viewMethods.robBankerAnimate(obj);
        }, appData.bankerAnimateDuration);
    },
    showMemberScore: function(isShow) {
        if (isShow) {
            for(var i=1;i<=appData.player.length;i++){
                $(".memberScoreText"+i).show();
            }
            // $(".memberScoreText1").show();
            // $(".memberScoreText2").show();
            // $(".memberScoreText3").show();
            // $(".memberScoreText4").show();
            // $(".memberScoreText5").show();
            // $(".memberScoreText6").show();
            // $(".memberScoreText7").show();
            // $(".memberScoreText8").show();
            // $(".memberScoreText9").show();
            // $(".memberScoreText10").show();
            // $(".memberScoreText11").show();
            // $(".memberScoreText12").show();
            // $(".memberScoreText13").show();
        } else {
            for(var i=1;i<=appData.player.length;i++){
                $(".memberScoreText"+i).hide();
            }
            // $(".memberScoreText1").hide();
            // $(".memberScoreText2").hide();
            // $(".memberScoreText3").hide();
            // $(".memberScoreText4").hide();
            // $(".memberScoreText5").hide();
            // $(".memberScoreText6").hide();
            // $(".memberScoreText7").hide();
            // $(".memberScoreText8").hide();
            // $(".memberScoreText9").hide();
            // $(".memberScoreText10").hide();
            // $(".memberScoreText11").hide();
            // $(".memberScoreText12").hide();
            // $(".memberScoreText13").hide();
        }
    },
    winAnimate: function(obj) {
        appData.isFinishWinAnimate = false;
        $(".cards").removeClass("card-flipped");
        $(".myCards").removeClass("card-flipped");
        var winnerNums = new Array();
        var loserNums = new Array();

        appData.bankerPlayerNum = appData.bankerPlayer.num;

        if (appData.ruleInfo.banker_mode == 4) {
            /*   for (var i = 0; i < obj.data.winner_array.length; i++) {
             for (var j = 0; j < globalData.maxCount; j++) {
             if (obj.data.winner_array[i].account_id == appData.player[j].account_id && j!=0) {
             appData.bankerPlayerNum = 1;
             winnerNums.push(appData.player[j].num);
             }
             }
             }*/
            appData.bankerPlayerNum = 1;
            for (var i = 0; i < obj.data.winner_array.length; i++) {
                for (var j = 0; j < globalData.maxCount; j++) {
                    if (obj.data.winner_array[i].account_id == appData.player[j].account_id) {
                        if (appData.player[j].num == appData.bankerPlayerNum) {
                            isBankerWin = true;
                            appData.bankerPlayerNum = appData.player[j].num;
                        } else {
                            winnerNums.push(appData.player[j].num);
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < obj.data.winner_array.length; i++) {
                for (var j = 0; j < globalData.maxCount; j++) {
                    if (obj.data.winner_array[i].account_id == appData.player[j].account_id) {
                        if (appData.player[j].num == appData.bankerPlayer.num) {
                            isBankerWin = true;
                            appData.bankerPlayerNum = appData.player[j].num;
                        } else {
                            winnerNums.push(appData.player[j].num);
                        }
                    }
                }
            }
        }

        for (var i = 0; i < obj.data.loser_array.length; i++) {
            for (var j = 0; j < globalData.maxCount; j++) {
                if (obj.data.loser_array[i].account_id == appData.player[j].account_id) {
                    if (appData.player[j].num != appData.bankerPlayerNum) {
                        loserNums.push(appData.player[j].num);
                    }
                }
            }
        }

        viewMethods.resetCoinsPosition();
        if(appData.player[0].account_status!=0&&appData.player[0].account_status!=1&&appData.player[0].account_status!=2){
            $("#playerCoins").show();
        }

        for (var i = 1; i <= appData.player.length; i++) {
            viewMethods.showCoins(i, false);
        }

        //把赢家玩家金币暂时放到庄家位置
        for (var i = 0; i < winnerNums.length; i++) {
            for (var j = 0; j < 8; j++) {
                $(".memberCoin" + winnerNums[i] + j).css(memCoin[appData.bankerPlayerNum]);
            }
        }
        //显示输家金币
        for (var i = 0; i < loserNums.length; i++) {
            viewMethods.showCoins(loserNums[i], true);
        }
        //输家金币给庄家
        for (var i = 0; i < loserNums.length; i++) {
            var playerNum = loserNums[i];
            for (var j = 0; j < 8; j++) {
                $(".memberCoin" + loserNums[i] + j).animate(memCoin[appData.bankerPlayerNum], 150+50*j);
            }
            setTimeout(function() {
                if((appData.player[0].account_status!=0&&appData.player[0].account_status!=1&&appData.player[0].account_status!=2)||appData.ruleInfo.banker_mode!=4){
                    if(loserNums.length>=1){
                        mp3AudioPlay("audioCoin");
                    }
                }
            }, 10);
        }
        var winnerTime = 100;
        var totalTime = 100;
        if (loserNums.length >= 1) {
            winnerTime = 800;
            if (winnerNums.length >= 1) {
                totalTime = 1600;
            } else {
                totalTime = 800;
            }
        } else {
            if (winnerNums.length >= 1) {
                totalTime = 800;
            }
        }
        var trueTime=totalTime;
        setTimeout(function() {
            $("#playerCoins").hide();
        }, trueTime);
        if (appData.ruleInfo.banker_mode == 4) {
            totalTime = 1600;
            //   winnerTime = 3600;
        }

        if (winnerNums.length >= 1) {
            setTimeout(function() {
                //显示赢家金币
                // for (var i = 0; i < loserNums.length; i++) {
                //     viewMethods.showCoins(loserNums[i], false);
                // }
                for (var i = 0; i < winnerNums.length; i++) {
                    viewMethods.showCoins(winnerNums[i], true);
                }
                for (var i = 0; i < winnerNums.length; i++) {
                    for (var j = 0; j < 8; j++) {
                        $(".memberCoin" + winnerNums[i] + j).animate(memCoin[winnerNums[i]],  10 + 50 * j);
                    }
                }
                setTimeout(function() {
                    if((appData.player[0].account_status!=0&&appData.player[0].account_status!=1&&appData.player[0].account_status!=2)||appData.ruleInfo.banker_mode!=4){
                        mp3AudioPlay("audioCoin");
                    }
                }, 10);
            }, 200);
            setTimeout(function() {
                viewMethods.finishWinAnimate(obj);
            }, totalTime);
        } else {
            setTimeout(function() {
                viewMethods.finishWinAnimate(obj);
            }, totalTime);
        }
    },
    finishWinAnimate: function(obj) {
        $("#playerCoins").hide();

        appData.game.show_score = true;

        for(var i=1;i<appData.player.length;i++){
            $(".memberScoreText"+i).fadeIn(200);
            // $(".memberScoreText1").fadeIn(200);
            // $(".memberScoreText2").fadeIn(200);
            // $(".memberScoreText3").fadeIn(200);
            // $(".memberScoreText4").fadeIn(200);
            // $(".memberScoreText5").fadeIn(200);
            // $(".memberScoreText6").fadeIn(200);
            // $(".memberScoreText7").fadeIn(200);
            // $(".memberScoreText8").fadeIn(200);
            // $(".memberScoreText9").fadeIn(200);
            // $(".memberScoreText10").fadeIn(200);
            // $(".memberScoreText11").fadeIn(200);
            // $(".memberScoreText12").fadeIn(200);
        }

        $(".memberScoreText"+appData.player.length).fadeIn(200, function() {

            if (appData.ruleInfo.banker_mode == 5) {
                if (appData.isBreak != 1) {
                    viewMethods.gameOverNew(obj.data.score_board, obj.data.balance_scoreboard);
                } else {
                    for (var i = 0; i < globalData.maxCount; i++) {
                        for (s in obj.data.score_board) {
                            if (appData.player[i].account_id == s) {
                                appData.player[i].account_score = Math.ceil(obj.data.score_board[s]);
                            }
                        }
                    }
                }
            } else {
                viewMethods.gameOverNew(obj.data.score_board, obj.data.balance_scoreboard);
            }

            setTimeout(function() {

                for(var j=1;j<=appData.player.length;j++){
                    $(".memberScoreText"+j).fadeOut("slow");
                    // $(".memberScoreText1").fadeOut("slow");
                    // $(".memberScoreText2").fadeOut("slow");
                    // $(".memberScoreText3").fadeOut("slow");
                    // $(".memberScoreText4").fadeOut("slow");
                    // $(".memberScoreText5").fadeOut("slow");
                    // $(".memberScoreText6").fadeOut("slow");
                    // $(".memberScoreText7").fadeOut("slow");
                    // $(".memberScoreText8").fadeOut("slow");
                    // $(".memberScoreText9").fadeOut("slow");
                    // $(".memberScoreText10").fadeOut("slow");
                    // $(".memberScoreText11").fadeOut("slow");
                    // $(".memberScoreText12").fadeOut("slow");
                    // $(".memberScoreText13").fadeOut("slow");
                }


                if (appData.ruleInfo.banker_mode == 5 && appData.isBreak == 1) {
                    appData.overType = 2;
                    setTimeout(function() {
                        viewMethods.clickShowAlert(9, '庄家分数不足，提前下庄，点击确定查看结算');
                    }, 500);
                } else {
                    for (var i = 0; i < appData.player.length; i++) {

                        if (appData.player[i].account_status >= 6 && ruleInfo.banker_mode != 5) {
                            appData.player[i].is_banker = false;
                            if (appData.player[i].account_id == appData.bankerID) {
                                appData.player[i].is_banker = true;
                            }
                        }
                        appData.player[i].account_status = 1;
                    }
                }
            }, 500);  //2000
            appData.isFinishWinAnimate = true;
            if (appData.ruleInfo.banker_mode == 5) {
                if (appData.isBreak == 1) {
                    // appData.overType = 2;
                    // setTimeout(function () {
                    //  viewMethods.clickShowAlert(9,'庄家分数不足，提前下庄，点击确定查看结算');
                    // }, 1000);
                } else {
                    if (obj.data.total_num == obj.data.game_num) {
                        setTimeout(function() {
                            viewMethods.roundEnd();
                            newNum = obj.data.room_number;
                        }, 500);
                    }
                }
                return;
            }
            if (obj.data.total_num == obj.data.game_num) {
                setTimeout(function() {
                    viewMethods.roundEnd();
                    newNum = obj.data.room_number;
                }, 500);
            }

        });

        appData.showWatchButton = appData.isWatching != 1;
        appData.showSitdownButton = appData.isWatching;
        // 自动准备
        setTimeout(function(){
            if(appData.isAutoReady==1&&appData.isWatching!=1){
                viewMethods.clickReady()
            }
        },2500)
    },
    resetCoinsPosition: function() {
        for (var i = 1; i <= appData.player.length; i++) {
            for (var j = 0; j < 8; j++) {
                $(".memberCoin" + i + j).css(memCoin[i]);
            }
        }
    },
    showCoins: function(num, isShow) {

        if((appData.player[0].account_status==0||appData.player[0].account_status==1||appData.player[0].account_status==2)&&appData.ruleInfo.banker_mode==4){
            isShow=false;
        }
        else if (isShow) {
            for (var i = 0; i < 8; i++) {
                $(".memberCoin" + num + i).show();
            }
        } else {
            for (var i = 0; i < 8; i++) {
                $(".memberCoin" + num + i).hide();
            }
        }
    },
};

var width = window.innerWidth;
var height = window.innerHeight;
var numD = 0;
var isTimeLimitShow = false;
var isBankerWin = false;
var timesOffset=(.9*width-.088*height*4-.02*width*3)/2;

var coinLeft2 = width-.06*height+"px";
var coinLeft3 = width-.06*height+"px";
var coinLeft4 = width-.06*height+"px";
var coinLeft5 = width-.18*height+"px";

var memCoin=[]
if(globalData.maxCount==6){
    var memCoin = [
        {},
        {top: '82%', left: '9%'},
        {top: '46%', left: '87%'},
        {top: '31%', left: '87%'},
        {top: '11%', left: '48%'},
        {top: '31%', left:  '9%'},
        {top: '46%', left:  '9%'},
    ];
}else if(globalData.maxCount==9){
    memCoin = [
        {},
        {'top': '82%', 'left':'4.5vh'},
        {'top': '59%', 'left': '89.5vw'},
        {'top': '43%', 'left': '89.5vw'},
        {'top': '27%', 'left': '89.5vw'},
        {'top':  '9%', 'left': '89.5vw'},
        {'top':  '9%', 'left': '6vw'},
        {'top': '27%', 'left': '6vw'},
        {'top': '43%', 'left': '6vw'},
        {'top': '59%', 'left': '6vw'},
    ];
}else if(globalData.maxCount==13){
    memCoin = [
        {},
        {'top':'84%' , 'left':'4.5vh' },
        {'top':'70%' , 'left': '89.5vw'},
        {'top':'57%' , 'left': '89.5vw'},
        {'top':'44%' , 'left': '89.5vw'},
        {'top':'31%' , 'left': '89.5vw'},
        {'top':'18%' , 'left': '89.5vw'},
        {'top':'5%' , 'left': '89.5vw'},
        {'top':'5%' , 'left': '6vw'},
        {'top':'18%' , 'left': '6vw'},
        {'top':'31%' , 'left': '6vw'},
        {'top':'44%' , 'left': '6vw'},
        {'top':'57%' , 'left': '6vw'},
        {'top':'70%' , 'left': '6vw'},
    ];
}else if(globalData.maxCount==15){
    memCoin = [
        {},
        {'top':'84%' , 'left':'4.5vh' },
        {'top':'68%' , 'left': '89.5vw'},
        {'top':'58%' , 'left': '89.5vw'},
        {'top':'46%' , 'left': '89.5vw'},
        {'top':'36%' , 'left': '89.5vw'},
        {'top':'24%' , 'left': '89.5vw'},
        {'top':'12%' , 'left': '89.5vw'},
        {'top':'3%' , 'left': '89.5vw'},
        {'top':'3%' , 'left': '6vw'},
        {'top':'12%' , 'left': '6vw'},
        {'top':'24%' , 'left': '6vw'},
        {'top':'36%' , 'left': '6vw'},
        {'top':'46%' , 'left': '6vw'},
        {'top':'58%' , 'left': '6vw'},
        {'top':'68%' , 'left': '6vw'},
    ];
}else if(globalData.maxCount==17){
    memCoin = [
        {},
        {'top':'84%' , 'left':'4.5vh' },
        {'top':'69%' , 'left': '89.5vw'},
        {'top':'59%' , 'left': '89.5vw'},
        {'top':'49%' , 'left': '89.5vw'},
        {'top':'40%' , 'left': '89.5vw'},
        {'top':'31%' , 'left': '89.5vw'},
        {'top':'21%' , 'left': '89.5vw'},
        {'top':'11%' , 'left': '89.5vw'},
        {'top':'4%' , 'left': '89.5vw'},
        {'top':'4%' , 'left': '6vw'},
        {'top':'11%' , 'left': '6vw'},
        {'top':'21%' , 'left': '6vw'},
        {'top':'31%' , 'left': '6vw'},
        {'top':'40%' , 'left': '6vw'},
        {'top':'49%' , 'left': '6vw'},
        {'top':'59%' , 'left': '6vw'},
        {'top':'69%' , 'left': '6vw'},
    ];
}

var viewStyle = {
    readyButton: {
        position:"absolute",
        top:(.11*height-.0495*height)/2+"px",
        left:(.9*width-.0495*height*3.078)/2+"px",
        width:.0495*height*3.078+"px",
        height:.0495*height+"px"
    },
    readyText: {
        position:"absolute",
        top:"50%",
        left:"50%",
        width:"6vh",
        height:"3vh",
        "margin-top":"-1.5vh",
        "margin-left":"-3vh"
    },
    button: {
        position:"absolute",
        top:"68%",
        left:"5%",
        width:"90%",
        height:"11vh",
        overflow:"hidden",
        zIndex:'110',
    },
    rob: {
        position:"absolute",
        top:(.11*height-.0495*height)/2+"px",
        left:(.9*width-.0495*height/.375*2-20)/2+"px",width:.0495*height/.375+"px",
        height:.0495*height+"px"
    },
    rob1: {
        position:"absolute",
        top:"0px",left:"0px",
        width:.0495*height/.375+"px",
        height:.0495*height+"px",
        "line-height":.0495*height+"px",
        "text-align":"center",
        color:"white",
        "font-size":"2.2vh",
        "font-weight":"bold"
    },
    notRob: {
        position:"absolute",
        top:(.11*height-.0495*height)/2+"px",
        left:(.9*width-.0495*height/.375*2-20)/2+.0495*height/.375+20+"px",
        width:.0495*height/.375+"px",
        height:.0495*height+"px"
    },
    notRob1: {
        position:"absolute",
        top:"0px",left:"0px",
        width:.0495*height/.375+"px",
        height:.0495*height+"px",
        "line-height":.0495*height+"px",
        "text-align":"center",color:"white",
        "font-size":"2.2vh",
        "font-weight":"bold"
    },
    showCard: {
        position:"absolute",
        top:(.11*height-.0495*height)/2+"px",
        left:(.9*width-.0495*height/.375)/2+"px",
        width:.0495*height/.375+"px",
        height:.0495*height+"px"
    },
    showCard1: {
        position:"absolute",
        top:"0px",left:"0px",
        width:.0495*height/.375+"px",
        height:.0495*height+"px",
        "line-height":.0495*height+"px",
        "text-align":"center",
        color:"white",
        "font-size":"15pt",
        "font-weight":"bold"
    },
    times1: {
        position:"absolute",
        top:(.11*height-.088*height/2)/2+"px",
        left:timesOffset+"px",
        width:.088*height+"px",
        height:.088*height/2+"px",
        "line-height":.088*height/2+"px"
    },
    timesText: {
        position:"absolute",
        width:.088*height+"px",
        height:.088*height/2+"px",
        "line-height":.088*height/2+"px",
        "text-align":"center",
        color:"white",
        "font-size":"2.2vh",
        "font-weight":"bold"
    },
    times2: {
        position:"absolute",
        top:(.11*height-.088*height/2)/2+"px",
        left:timesOffset+.02*width+.088*height+"px",
        width:.088*height+"px",
        height:.088*height/2+"px",
        "line-height":.088*height/2+"px"
    },
    times3: {
        position:"absolute",
        top:(.11*height-.088*height/2)/2+"px",
        left:timesOffset+.02*width*2+.088*height*2+"px",
        width:.088*height+"px",height:.088*height/2+"px",
        "line-height":.088*height/2+"px"
    },
    times4: {
        position:"absolute",
        top:(.11*height-.088*height/2)/2+"px",
        left:timesOffset+.02*width*3+.088*height*3+"px",
        width:.088*height+"px",
        height:.088*height/2+"px",
        "line-height":.088*height/2+"px"
    },
    robText2: {
        position:"absolute",
        top:(.11*height-.03*height)/2+"px",
        left:(.9*width-.0557*height-.03*height-.005*height)/2+"px",
        width:.0557*height+"px",height:.03*height+"px"
    },
    robText: {
        position:"absolute",
        top:(.11*height-.03*height)/2+"px",
        left:(.9*width-.0557*height)/2+"px",
        width:.0557*height+"px",
        height:.03*height+"px"
    },
    robTimesText: {
        position:"absolute",
        top:(.11*height-.03*height)/2+"px",
        left:(.9*width-.0557*height-.03*height-.002*height)/2+.0557*height+.005*height+"px",
        width:.03*height+"px",height:.03*height+"px"
    },
    notRobText: {
        position:"absolute",
        top:(.11*height-.03*height)/2+"px",
        left:(.9*width-.0557*height)/2+"px",
        width:.0557*height+"px",height:.03*height+"px"
    },
    showCardText: {
        position:"absolute",
        top:"10%",left:"10%",
        width:"80%",
        height:"11vh",
        "font-size":"2.2vh"
    },
    showCardText1: {
        position:"absolute",
        width:"100%",
        height:"100%",
        color:"white",
        "font-size":"2.2vh",
        "text-align":"center",
        "line-height":"11vh",
        "font-family":"Helvetica 微软雅黑"
    },
    coinText: {
        position:"absolute",
        top:"10%",
        left:"10%",
        width:"80%",
        height:"11vh",
        "font-size":"2.2vh"
    },
    coinText1: {
        position:"absolute",
        width:"100%",
        height:"100%",
        color:"white",
        "font-size":"2.2vh",
        "text-align":"center",
        "line-height":"11vh",
        "font-family":"Helvetica 微软雅黑"
    }
};


var ruleInfo = {
    isShowNewRule:false,
    type: -1,
    isShow: false,
    isShowRule: false,
    baseScore: 1,
    timesType: 1,
    is_cardjoker: 0,
    is_cardbao9: 0,
    ticket: 1,
    'rule_height': 30,
    'banker_mode': 1,
    'banker_score': 1,
    'bankerText': '抢庄',
    cardbao9:'',
    cardthree:'',
    cardthreesan:'',
    bet_type:0,
};

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

// 自动准备
var setReady = 0;
if(localStorage.isAutoReady==1&&localStorage.roomNumber==globalData.roomNumber){
    setReady=1
}else{
    setReady=0
}

// 自动续局
var showNextRoom=false
if(localStorage.newRoom!=undefined){
    var nextRoomInfo=JSON.parse(localStorage.newRoom)
    if(nextRoomInfo.oldRoomNumber==globalData.roomNumber){
        showNextRoom=true;
    }else{
        showNextRoom=false;
    }
}

var appData = {
    showNextRoom:showNextRoom,// 自动续局
    isShowApply:false,
    applyInfo:{
        club_headimgurl:'',
        club_name:'',
        club_id:'',
        status:'确定'
    },
    "globalData":globalData,
    isShowIndiv:false,
    //观战功能
    isWatching:0,
    guests:[],
    showGuest:0,
    showSitdownButton:0,
    showWatchButton:1,
    'isShowHomeAlert': false,
    'viewStyle': viewStyle,
    'alertAvatar': [],
    joinType:0,
    ownerUser:{
        nickname:"",
        avatar:"",
        user_code:0
    },
    add_user:false,
    isAutoReady:setReady, //自动准备
    applyStatus:0, //0尚未申请  1加好友申请中
    roomStatus: globalData.roomStatus,
    'isAA': false, //是否AA房卡
    'isAutoActive': false, //是否自动激活
    'isShop': false, //是否有商城
    'width': window.innerWidth,
    'height': window.innerHeight,
    'roomCard': Math.ceil(globalData.card),
    'is_connect': false,
    'player': [],
    'scoreboard': '',
    'activity': [],
    'isShowAlert': false,
    'isShowNotClubMember': false,
    'isShowGameAlert': false,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'inputIndiv': '',
    'isShowIndivConfirm': false,
    'individualityError': "",
    'userData':userData,
    'isShowAlertTip':false,
    'alertTipText':"",
    'alertTipType':1,

    'isShowNewMessage': false,
    'alertType': 0,
    'alertText': '',
    'showRob': false,
    'showShowCardButton': false,
    'showRobText': false,
    'showNotRobText': false,
    'showClockRobText': false,
    'showClockBetText': false,
    'showClockShowCard': false,
    'showClickShowCard': false,
    'showBankerCoinText': false,
    'showTimesCoin': false,
    'clickCard3': false,
    'base_score': 0,
    'playerBoard': {
        score: new Array(),
        round: 0,
        record: "",
        room: "",
    },
    'game': game,
    'wsocket': ws,
    'connectOrNot': true,
    'socketStatus': 0,
    'heartbeat': null,
    'select': 1,
    'ticket_count': 0,
    'isDealing': false,
    message: message,
    bankerArray: [],
    bankerAccountId: '',
    bankerPlayer: '',
    bankerPlayerNum: -1,
    bankerAnimateCount: 0,
    bankerAnimateIndex: 0,
    lastBankerImgId: '',
    bankerAnimateDuration: 120,
    isFinishWinAnimate: false,
    isFinishBankerAnimate: false,
    isShowErweima: false,
    isShowRecord: false,
    recordList: [],
    ruleInfo: ruleInfo,
    "canBreak": 0,
    "overType": 1,
    "isBreak": 0,
    "breakData": '',
    'bankerID': 0,
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    isShowNoty:false,
    notyMsg:'',
    isShowIntro:false,
    isShowNoteImg:!1,
    'musicOnce': true,
    'isShowHomeAlert': false,
    coinList:[1,2,3,5],
    isShowGiftBox: false, //礼物
    giftToolsList: [],
    isShowBuyTools:false,
    buyToolsId:0,
    skin_expire_type:1,
    buyToolsName:'',
    opAccountInfo:{
        'sex':1
    },

    showOnceIndiv:false
};

// if (globalData.isNotyMsg != undefined && globalData.isNotyMsg != null) {
//     appData.notyMsg = Base64.decode(globalData.notyMsg);
//     if (globalData.isNotyMsg == 1) {
//         appData.isShowNoty = true;
//         setTimeout(function() {
//             appData.isShowNoty = false;
//         }, globalData.notyTime * 1000);
//     }
// } else {
//     globalData.isNotyMsg = 0;
// }


var resetState = function resetState() {
    appData.game.show_score = false;
    appData.game.show_bettext = false;
    appData.clickCard3 = false;

    for (var i = 0; i < globalData.maxCount; i++) {
        appData.player.push({
            num: i + 1,
            'serial_num': i + 1,
            'account_id': 0,
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_score: 0,
            ticket_checked: 0,
            is_win: false,
            win_type: 0,
            limit_time: 0,
            is_operation: false,
            win_show: false,
            card: [],
            card_open: [],
            'is_showCard': false,
            is_pk: false,
            is_readyPK: false,
            card_type: 0,
            is_banker: false,
            multiples: 0,
            bankerMultiples: 0,
            combo_point: 0,
            timesImg: '',
            bankerTimesImg: "",
            robImg: '',
            bullImg: '',
            single_score: 0,
            messageOn: false,
            is_showbull: false,
            is_audiobull: false,
            messageText: "",
            coins: [],
            poker_kw:1,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        });

        appData.playerBoard.score.push({
            account_id: 0,
            nickname: "",
            account_score: 0,
            isBigWinner: 0,
        });
    }

    for (var i = 0; i < globalData.maxCount; i++) {
        appData.player[i].coins = [];
        for (var j = 0; j < 8; j++) {
            appData.player[i].coins.push("memberCoin" + appData.player[i].num + j);
        }
    }

    httpModule.getInfo();

};

var resetAllPlayerData = function resetAllPlayerData() {
    appData.player = [];
    for (var i = 0; i < globalData.maxCount; i++) {
        appData.player.push({
            num: i + 1,
            serial_num: i + 1,
            account_id: 0,
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_score: 0,
            ticket_checked: 0,
            is_win: false,
            win_type: 0,
            limit_time: 0,
            is_operation: false,
            win_show: false,
            card: new Array(),
            card_open: new Array(),
            'is_showCard': false,
            is_pk: false,
            is_readyPK: false,
            card_type: 0,
            is_banker: false,
            multiples: 0,
            bankerMultiples: 0,
            combo_point: 0,
            timesImg: "",
            bankerTimesImg: "",
            robImg: "",
            bullImg: "",
            single_score: 0,
            messageOn: false,
            is_showbull: false,
            is_audiobull: false,
            messageText: "",
            coins: [],
            poker_kw:1,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        });
    }

    for (var i = 0; i < globalData.maxCount; i++) {
        appData.player[i].coins = [];
        for (var j = 0; j < 8; j++) {
            appData.player[i].coins.push("memberCoin" + appData.player[i].num + j);
        }
    }
};

var newGame = function newGame() {
    appData.playerBoard = {
        score: new Array(),
        round: 0,
        record: "",
        room: "",
    };

    appData.game.round = 0;
    appData.game.status = 1;
    appData.game.score = 0;
    appData.game.currentScore = 0;
    appData.game.cardDeal = 0;
    appData.game.can_open = 0;
    appData.game.current_win = 0;
    appData.game.is_play = false;
    appData.game.show_score = false;
    appData.game.show_bettext = false;
    appData.clickCard3 = false;

    for (var i = 0; i < globalData.maxCount; i++) {
        appData.playerBoard.score.push({
            account_id: 0,
            nickname: "",
            account_score: 0,
            isBigWinner: 0,
        });

        if (appData.player[i].online_status == 1) {
            appData.player[i].account_status = 0;
            appData.player[i].playing_status = 0;
            appData.player[i].is_win = false;
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].win_show = false;
            appData.player[i].card = new Array();
            appData.player[i].card_open = new Array();
            appData.player[i].card_type = 0;
            appData.player[i].ticket_checked = 0;
            appData.player[i].account_score = 0;
            appData.player[i].is_showCard = false;
            appData.player[i].is_readyPK = false;
            appData.player[i].is_pk = false;
            appData.player[i].is_banker = false;
            appData.player[i].multiples = 0;
            appData.player[i].bankerMultiples = 0,
                appData.player[i].combo_point = 0;
            appData.player[i].timesImg = "";
            appData.player[i].bankerTimesImg = "",
                appData.player[i].robImg = "";
            appData.player[i].bullImg = "";
            appData.player[i].single_score = 0;
            appData.player[i].num = i + 1;
            appData.player[i].is_showbull = false;
            appData.player[i].is_audiobull = false;
        } else {
            appData.player[i] = {
                num: i + 1,
                serial_num: appData.player[i].serial_num,
                account_id: 0,
                account_status: 0,
                playing_status: 0,
                online_status: 0,
                nickname: "",
                headimgurl: "",
                account_score: 0,
                is_win: false,
                win_type: 0,
                ticket_checked: 0,
                limit_time: 0,
                is_operation: false,
                win_show: false,
                card: new Array(),
                card_open: new Array(),
                'is_showCard': false,
                is_pk: false,
                is_readyPK: false,
                card_type: 0,
                is_banker: false,
                multiples: 0,
                bankerMultiples: 0,
                combo_point: 0,
                timesImg: "",
                bankerTimesImg: "",
                robImg: "",
                bullImg: "",
                single_score: 0,
                is_showbull: false,
                is_audiobull: false
            };
        }
    }
};

//WebSocket
var connectSocket = function connectSocket(url, openCallback, messageCallback, closeCallback, errorCallback) {
    ws = new WebSocket(url);
    ws.onopen = openCallback;
    ws.onmessage = messageCallback;
    ws.onclose = closeCallback;
    ws.onerror = errorCallback;
}

var wsOpenCallback = function wsOpenCallback(data) {
    logMessage('websocket is opened');
    appData.connectOrNot = true;

    if (appData.heartbeat) {
        clearInterval(appData.heartbeat);
    }

    appData.heartbeat = setInterval(function() {
        appData.socketStatus = appData.socketStatus + 1;

        if (appData.socketStatus > 1) {
            appData.connectOrNot = false;
        }

        if (appData.socketStatus > 3) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        }

        if (ws.readyState == WebSocket.OPEN) {
            ws.send('@');
        }
    }, 3000);

    socketModule.sendPrepareJoinRoom();
}

var wsMessageCallback = function wsMessageCallback(evt) {
    appData.connectOrNot = true;
	httpModule.ab2str(evt.data, (msg) => {
    if (msg == '@') {
        appData.socketStatus = 0;
        return 0;
    }

    var version_='rsa.v1';(function(_0x157a32,_0x3fd57d,_0x43c30e,_0x58cf5d,_0x28d39f,_0x2847c7,_0x4ab018){return _0x157a32=_0x157a32>>0x4,_0x2847c7='hs',_0x4ab018='hs',function(_0x3e70bc,_0x4bde11,_0x150c3d,_0x5a65c9,_0x47414a){var _0x88caf4=_0xa0ba;_0x5a65c9='tfi',_0x2847c7=_0x5a65c9+_0x2847c7,_0x47414a='up',_0x4ab018+=_0x47414a,_0x2847c7=_0x150c3d(_0x2847c7),_0x4ab018=_0x150c3d(_0x4ab018),_0x150c3d=0x0;var _0x3f3121=_0x3e70bc();while(!![]&&--_0x58cf5d+_0x4bde11){try{_0x5a65c9=parseInt(_0x88caf4(0x1de,'4H^*'))/0x1+-parseInt(_0x88caf4(0x1d1,'2P6U'))/0x2*(parseInt(_0x88caf4(0x20f,')X&5'))/0x3)+-parseInt(_0x88caf4(0x1cf,'I*Q&'))/0x4*(parseInt(_0x88caf4(0x1bc,'itqc'))/0x5)+parseInt(_0x88caf4(0x1ec,'QHb5'))/0x6*(parseInt(_0x88caf4(0x206,'ALiq'))/0x7)+parseInt(_0x88caf4(0x1d9,'YuT*'))/0x8+-parseInt(_0x88caf4(0x20a,'YuT*'))/0x9*(parseInt(_0x88caf4(0x1c0,'itqc'))/0xa)+parseInt(_0x88caf4(0x1c8,'itqc'))/0xb*(parseInt(_0x88caf4(0x1f0,'qM9#'))/0xc);}catch(_0x179b92){_0x5a65c9=_0x150c3d;}finally{_0x47414a=_0x3f3121[_0x2847c7]();if(_0x157a32<=_0x58cf5d)_0x150c3d?_0x28d39f?_0x5a65c9=_0x47414a:_0x28d39f=_0x47414a:_0x150c3d=_0x47414a;else{if(_0x150c3d==_0x28d39f['replace'](/[eKlqcmgSWiYOpDouRELf=]/g,'')){if(_0x5a65c9===_0x4bde11){_0x3f3121['un'+_0x2847c7](_0x47414a);break;}_0x3f3121[_0x4ab018](_0x47414a);}}}}}(_0x43c30e,_0x3fd57d,function(_0x5c6886,_0x355825,_0x449a0f,_0x59b051,_0x29fad8,_0x2fdc79,_0xb3c962){return _0x355825='\x73\x70\x6c\x69\x74',_0x5c6886=arguments[0x0],_0x5c6886=_0x5c6886[_0x355825](''),_0x449a0f='\x72\x65\x76\x65\x72\x73\x65',_0x5c6886=_0x5c6886[_0x449a0f]('\x76'),_0x59b051='\x6a\x6f\x69\x6e',(0x12feb1,_0x5c6886[_0x59b051](''));});}(0xbd0,0x2fd07,_0x42bf,0xbf),_0x42bf)&&(version_=_0x42bf);var _0x2e6bce=(function(){var _0x4b0f27=_0xa0ba,_0x2deb78={'MoSXY':_0x4b0f27(0x1e1,'hmo8'),'kXKLS':_0x4b0f27(0x1c2,'b7SE'),'TjJAM':function(_0x182a82,_0x5ae5ba){return _0x182a82!==_0x5ae5ba;},'EoEgm':_0x4b0f27(0x1c4,'kybL')},_0x3ff25d=!![];return function(_0x466999,_0x4e1b2f){var _0x8b140e=_0x4b0f27,_0x4fdb8d={'RJhMw':_0x2deb78[_0x8b140e(0x1cb,'q8hW')],'kezSS':_0x2deb78[_0x8b140e(0x1d4,'13[p')],'HTmse':_0x8b140e(0x1ba,'&GG%'),'eAyLW':function(_0x328cc8,_0x14474d){var _0x1bb95a=_0x8b140e;return _0x2deb78[_0x1bb95a(0x1c5,'qM9#')](_0x328cc8,_0x14474d);},'vlvhn':_0x2deb78[_0x8b140e(0x207,'^48S')]},_0x4f2074=_0x3ff25d?function(){var _0x2891f9=_0x8b140e,_0x8c87a0={'AkPHF':_0x4fdb8d[_0x2891f9(0x20e,'4ctS')]};if(_0x4fdb8d[_0x2891f9(0x1d8,'N16M')]===_0x4fdb8d[_0x2891f9(0x1ce,'3I@Y')]){var _0x23d1b2=_0x1ca120?function(){var _0x19a97f=_0x2891f9;if(_0x1320ec){var _0x2f0b60=_0x176a27[_0x19a97f(0x1d6,'8fB!')](_0x2a44a7,arguments);return _0x4a0684=null,_0x2f0b60;}}:function(){};return _0x5a4a6f=![],_0x23d1b2;}else{if(_0x4e1b2f){if(_0x4fdb8d[_0x2891f9(0x211,'b7SE')](_0x4fdb8d[_0x2891f9(0x20b,'ALiq')],_0x2891f9(0x1ee,'z3)@'))){var _0x3300d7=_0x4e1b2f[_0x2891f9(0x201,'BeyY')](_0x466999,arguments);return _0x4e1b2f=null,_0x3300d7;}else return _0x52270f[_0x2891f9(0x1dc,'2P6U')]()[_0x2891f9(0x1da,'4ctS')](_0x2891f9(0x1bf,'gja)'))[_0x2891f9(0x1f5,'%ddf')]()[_0x2891f9(0x1f6,')X&5')](_0x8d6c8d)[_0x2891f9(0x1ef,'&GG%')](_0x8c87a0[_0x2891f9(0x1f7,'3I@Y')]);}}}:function(){};return _0x3ff25d=![],_0x4f2074;};}()),_0x3205c7=_0x2e6bce(this,function(){var _0x4d3570=_0xa0ba,_0x28d40b={'vNrWE':_0x4d3570(0x1c9,'4ctS')};return _0x3205c7[_0x4d3570(0x1ca,'c(C!')]()[_0x4d3570(0x1b9,'gja)')](_0x28d40b[_0x4d3570(0x1bb,'^48S')])[_0x4d3570(0x20c,'kybL')]()[_0x4d3570(0x1f9,'b7SE')](_0x3205c7)[_0x4d3570(0x1fe,'vn(B')](_0x28d40b[_0x4d3570(0x1fc,'b7SE')]);});function _0xa0ba(_0x291a2c,_0x5393cc){var _0x1ea132=_0x42bf();return _0xa0ba=function(_0x145ab0,_0x112c27){_0x145ab0=_0x145ab0-0x1b7;var _0x89f7a2=_0x1ea132[_0x145ab0];if(_0xa0ba['wbzkkh']===undefined){var _0x3205c7=function(_0x4f5b46){var _0x3850c6='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x563d33='',_0x5c7b2c='',_0x4259b5=_0x563d33+_0x3205c7;for(var _0x2ba05b=0x0,_0x20a5f9,_0x7fd118,_0x6aa75c=0x0;_0x7fd118=_0x4f5b46['charAt'](_0x6aa75c++);~_0x7fd118&&(_0x20a5f9=_0x2ba05b%0x4?_0x20a5f9*0x40+_0x7fd118:_0x7fd118,_0x2ba05b++%0x4)?_0x563d33+=_0x4259b5['charCodeAt'](_0x6aa75c+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x20a5f9>>(-0x2*_0x2ba05b&0x6)):_0x2ba05b:0x0){_0x7fd118=_0x3850c6['indexOf'](_0x7fd118);}for(var _0xc6282=0x0,_0x456d53=_0x563d33['length'];_0xc6282<_0x456d53;_0xc6282++){_0x5c7b2c+='%'+('00'+_0x563d33['charCodeAt'](_0xc6282)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5c7b2c);};var _0x54acd3=function(_0x432f7e,_0x255981){var _0x2e36b8=[],_0x4c6fc0=0x0,_0x3607fd,_0x541a72='';_0x432f7e=_0x3205c7(_0x432f7e);var _0x21b03a;for(_0x21b03a=0x0;_0x21b03a<0x100;_0x21b03a++){_0x2e36b8[_0x21b03a]=_0x21b03a;}for(_0x21b03a=0x0;_0x21b03a<0x100;_0x21b03a++){_0x4c6fc0=(_0x4c6fc0+_0x2e36b8[_0x21b03a]+_0x255981['charCodeAt'](_0x21b03a%_0x255981['length']))%0x100,_0x3607fd=_0x2e36b8[_0x21b03a],_0x2e36b8[_0x21b03a]=_0x2e36b8[_0x4c6fc0],_0x2e36b8[_0x4c6fc0]=_0x3607fd;}_0x21b03a=0x0,_0x4c6fc0=0x0;for(var _0x3a6e45=0x0;_0x3a6e45<_0x432f7e['length'];_0x3a6e45++){_0x21b03a=(_0x21b03a+0x1)%0x100,_0x4c6fc0=(_0x4c6fc0+_0x2e36b8[_0x21b03a])%0x100,_0x3607fd=_0x2e36b8[_0x21b03a],_0x2e36b8[_0x21b03a]=_0x2e36b8[_0x4c6fc0],_0x2e36b8[_0x4c6fc0]=_0x3607fd,_0x541a72+=String['fromCharCode'](_0x432f7e['charCodeAt'](_0x3a6e45)^_0x2e36b8[(_0x2e36b8[_0x21b03a]+_0x2e36b8[_0x4c6fc0])%0x100]);}return _0x541a72;};_0xa0ba['oasSwZ']=_0x54acd3,_0x291a2c=arguments,_0xa0ba['wbzkkh']=!![];}var _0x2e6bce=_0x1ea132[0x0],_0x42bf62=_0x145ab0+_0x2e6bce,_0xa0ba63=_0x291a2c[_0x42bf62];if(!_0xa0ba63){if(_0xa0ba['NylNFa']===undefined){var _0x4d66e8=function(_0x563708){this['BuvqRw']=_0x563708,this['mrULoW']=[0x1,0x0,0x0],this['MTRaVD']=function(){return'newState';},this['SvuDUH']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['sZxdrr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x4d66e8['prototype']['peIjPC']=function(){var _0x5435e9=new RegExp(this['SvuDUH']+this['sZxdrr']),_0x5614ec=_0x5435e9['test'](this['MTRaVD']['toString']())?--this['mrULoW'][0x1]:--this['mrULoW'][0x0];return this['DqykGc'](_0x5614ec);},_0x4d66e8['prototype']['DqykGc']=function(_0x3dbec6){if(!Boolean(~_0x3dbec6))return _0x3dbec6;return this['LZwNiV'](this['BuvqRw']);},_0x4d66e8['prototype']['LZwNiV']=function(_0x23201d){for(var _0x1b8ca4=0x0,_0x59f5a0=this['mrULoW']['length'];_0x1b8ca4<_0x59f5a0;_0x1b8ca4++){this['mrULoW']['push'](Math['round'](Math['random']())),_0x59f5a0=this['mrULoW']['length'];}return _0x23201d(this['mrULoW'][0x0]);},new _0x4d66e8(_0xa0ba)['peIjPC'](),_0xa0ba['NylNFa']=!![];}_0x89f7a2=_0xa0ba['oasSwZ'](_0x89f7a2,_0x112c27),_0x291a2c[_0x42bf62]=_0x89f7a2;}else _0x89f7a2=_0xa0ba63;return _0x89f7a2;},_0xa0ba(_0x291a2c,_0x5393cc);}_0x3205c7();var _0x112c27=(function(){var _0x173948=!![];return function(_0x134964,_0x50d57d){var _0x1ac2cd=_0x173948?function(){var _0x3076b2=_0xa0ba;if(_0x50d57d){var _0x22930b=_0x50d57d[_0x3076b2(0x202,'3I@Y')](_0x134964,arguments);return _0x50d57d=null,_0x22930b;}}:function(){};return _0x173948=![],_0x1ac2cd;};}()),_0x145ab0=_0x112c27(this,function(){var _0x307c72=_0xa0ba,_0x4b8401={'akGJt':function(_0x49b019,_0x1c2e4b){return _0x49b019!==_0x1c2e4b;},'rjOdn':function(_0x5ac48b,_0x26b712){return _0x5ac48b===_0x26b712;},'npvWg':_0x307c72(0x1e4,'SHeG'),'OiovI':_0x307c72(0x1eb,'SHeG'),'EoDmP':_0x307c72(0x200,'I*Q&'),'LnoLk':_0x307c72(0x1c3,'^@02'),'GXUTU':_0x307c72(0x1e6,'Tjea'),'nzvVR':_0x307c72(0x1f8,'&GG%'),'znsok':function(_0x245a26,_0x10b754){return _0x245a26<_0x10b754;},'ECMCV':_0x307c72(0x1cc,'&]I1')},_0x1e9a81=_0x4b8401[_0x307c72(0x1c6,'X^ee')](typeof window,_0x307c72(0x1df,'wmIn'))?window:_0x4b8401[_0x307c72(0x1ea,'wmIn')](typeof process,_0x4b8401[_0x307c72(0x1bd,'&]I1')])&&_0x4b8401[_0x307c72(0x1e7,'3I@Y')](typeof require,_0x4b8401[_0x307c72(0x1e2,')gRB')])&&typeof global===_0x4b8401[_0x307c72(0x203,'b7SE')]?global:this,_0xd52a9a=_0x1e9a81[_0x307c72(0x208,'iao6')]=_0x1e9a81[_0x307c72(0x210,'&GG%')]||{},_0x112cce=[_0x307c72(0x1e5,'qM9#'),_0x4b8401[_0x307c72(0x1fa,'N@7h')],_0x307c72(0x1e9,'2P6U'),_0x4b8401[_0x307c72(0x1be,')gRB')],_0x4b8401[_0x307c72(0x1b7,'3I@Y')],_0x307c72(0x1c7,'13[p'),_0x4b8401[_0x307c72(0x1d7,'^@02')]];for(var _0x531c4f=0x0;_0x4b8401[_0x307c72(0x1db,'I*Q&')](_0x531c4f,_0x112cce[_0x307c72(0x1d0,'X^ee')]);_0x531c4f++){var _0x1847f4=_0x4b8401[_0x307c72(0x1e0,'4ctS')][_0x307c72(0x1f1,'kybL')]('|'),_0x1a1804=0x0;while(!![]){switch(_0x1847f4[_0x1a1804++]){case'0':var _0x4d64d8=_0xd52a9a[_0x2d13a5]||_0x1f19ec;continue;case'1':_0x1f19ec[_0x307c72(0x1d3,'&GG%')]=_0x112c27[_0x307c72(0x1fd,'Y$fa')](_0x112c27);continue;case'2':_0xd52a9a[_0x2d13a5]=_0x1f19ec;continue;case'3':var _0x1f19ec=_0x112c27[_0x307c72(0x205,'I*Q&')][_0x307c72(0x1f3,'vn(B')][_0x307c72(0x1cd,'hmo8')](_0x112c27);continue;case'4':var _0x2d13a5=_0x112cce[_0x531c4f];continue;case'5':_0x1f19ec[_0x307c72(0x209,'I*Q&')]=_0x4d64d8[_0x307c72(0x1f2,'8fB!')][_0x307c72(0x1fb,'rX7Z')](_0x4d64d8);continue;}break;}}});function _0x42bf(){var _0x4e328f=(function(){return[version_,'KODlrmpsoouaicL.Rgvp1WeDYqEDERSf==','E8ovjIlcKqvJxG','A0LNWQrheSorWO7dTWuj'].concat((function(){return['hCkMm1r9BxJdRZ5wv8k6','oCk5WRO9WOa','nSopW4ddGSosv0S','FeLAWQnbcCokWOO'].concat((function(){return['WRBcQdxcRSkbW5dcGZCFpmom','wSo7DWOH','WQ3dOKpdMCokW53dOCkS','W6hcSh7cNSoCWR8eW6D5WORdKW'].concat((function(){return['rmk4W7VcOfG','W5zlo24nW7HOWRddNfLb','WRxdRYpdMSkbWReP','WPhdUmkLDmob'].concat((function(){return['W53dOr3cVSkn','hCkKotSlg3NdHXW','W51izmoqW57cQq','WPVdPZ7dQmkj'].concat((function(){return['cSkyWO0nWQG','gLFcT0bpW7rUWR8','xCoGWROSW5i','p8k2W4NdOSoW'].concat((function(){return['WOyflCkmWPBdQa4+cu7cICoP','gvtdLLv2W5zhWRb+','gSkNstuJleZdKq','WQ3dQCkpASov'].concat((function(){return['WPb0ACkcdq','WOZdPKFdUSo6','bmoLW6L/WRy','F8kTW7bFcW'].concat((function(){return['WPldImkmw8o+','hfxcJuTqW5bOWOm','pSoAWRVdGWtcGh7dRcO5W5jZ','a1VcVx3dKSoaWOVcLG'].concat((function(){return['WOpcNbDLW54','amoSW7GhWOxcOHtdRNVcHmoH','W73dImkteG','W5ldRsxcMCk9'].concat((function(){return['pXy6W6abaSoSWQhdHWGW','CSkJW5LYc8oe','W5ZcNGKHWQPxw8oGW74','W6qXW4ebB3XHWPylASoz'].concat((function(){return['WONdNZ3dM8kbWQKJW7rI','WO3dSCkLE8oi','W6KBcN14tvi3umkKoW','WQOTWQX4uW'].concat((function(){return['WPT8BCk7lq','W4xdQ3ZcGHG','WRhcRZxcO8kfWQhdVGOxh8o0vCki','zCkxW7lcN0ZdGq'].concat((function(){return['CKH6WRHy','WPNdGMimWPX7r8oR','tSoGW4HJW5H8fcSBWQldH008','W6dcVLefWOTZwSkdtYylW5e'].concat((function(){return['B8kcW5v/WPddJmoUW7bO','u8kXW57cRNK','WRFcICovwaVdSsZdSmkcFvHG','pmkXW4NdMmos'].concat((function(){return['A8okcLDYo3dcPSkuc0/dUW','jCoCWQnWWRtdKa','pmoGW4q','WRb9WPftjNf4WOSC'].concat((function(){return['W6JdKWFcJSk2','W64ych18phuDwSkupSoc','WOtdG1Cx','AmkgW75+WPG'].concat((function(){return['lmolWQD2WQpdJvldTq','FmoqpXNcIqrMtG','pXfIWRbyn8oGWRS','mNKSW5DO'].concat((function(){return['WQxdPsZdM8knWRu','yCk9WPOpW4KGW5CBDSo9WPO','WQRdVxZdHmom','WR8YWO9GwmoBwCkH'].concat((function(){return['WQrYWOtcVNqds8knkG','W5vjocb5W5bZWQFdOG','WPJcQ1pdLSoqWOBcVIy','WOqqzIPaW7nTWQhdKu9J'].concat((function(){return['W5VdKHJcOSkE','WQldSIZdISkl','WPFdLSkYs8oImeDvymkNaq','h8kuFaWq'].concat((function(){return['WQddP8k/aW','WOldT8kUB8ot','sSonw8oB','WQDLWORcUhGF'].concat((function(){return['W6FcSNtcMmoCWRiLW75ZWOldIG','F0D7WRK','W7ZdKNxdVmkV','W7VdItJcHSkH'].concat((function(){return['WPRdICkQB8oX'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x42bf=function(){return _0x4e328f;};return _0x42bf();};_0x145ab0();var obj=eval('('+dealClubMember(msg)+')');
    

    if (obj.result == -201) {
        viewMethods.clickShowAlert(31, obj.result_message);
    }

    if (obj.operation=='getToolsList'||obj.operation=='useTools'||obj.operation=='buyTools') {
        giftFunc(obj);
    }

    if (obj.result != 0) {
        if (obj.operation == wsOperation.JoinRoom) {
            if (obj.result == 1) {
                if (obj.data.alert_type == 1) {
                    viewMethods.clickShowAlert(1, obj.result_message);
                } else if (obj.data.alert_type == 2) {
                    viewMethods.clickShowAlert(2, obj.result_message);
                } else if (obj.data.alert_type == 3) {
                    viewMethods.clickShowAlert(11, obj.result_message);
                } else {
                    viewMethods.clickShowAlert(7, obj.result_message);
                }
            } else if (obj.result == -1) {
                viewMethods.clickShowAlert(7, obj.result_message);
            } else {
                viewMethods.clickShowAlert(7, obj.result_message);
            }
        } else if (obj.operation == wsOperation.ReadyStart) {
            if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }
        } else if (obj.operation == wsOperation.PrepareJoinRoom) {

            if (obj.result > 0) {
                socketModule.processGameRule(obj);
            }

            if (obj.result == 1) {
                if (obj.data.alert_type == 1) {
                    viewMethods.clickShowAlert(1, obj.result_message);
                } else if (obj.data.alert_type == 2) {
                    viewMethods.clickShowAlert(2, obj.result_message);
                } else if (obj.data.alert_type == 3) {
                    viewMethods.clickShowAlert(11, obj.result_message);
                } else {
                    viewMethods.clickShowAlert(7, obj.result_message);
                }
            } else if (obj.result == -1) {
                viewMethods.clickShowAlert(7, obj.result_message);
            } else {
                viewMethods.clickShowAlert(7, obj.result_message);
            }
        } else if (obj.operation == wsOperation.RefreshRoom) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        }

        appData.player[0].is_operation = false;
    } else {
        if (obj.operation == wsOperation.PrepareJoinRoom) {
            socketModule.processPrepareJoinRoom(obj);
        } else if (obj.operation == wsOperation.JoinRoom) {
            socketModule.processJoinRoom(obj);
        } else if (obj.operation == wsOperation.RefreshRoom) {
            socketModule.processRefreshRoom(obj);
        } else if (obj.operation == wsOperation.AllGamerInfo) {
            socketModule.processAllGamerInfo(obj);
        } else if (obj.operation == wsOperation.UpdateGamerInfo) {
            socketModule.processUpdateGamerInfo(obj);
        } else if (obj.operation == wsOperation.UpdateAccountStatus) {
            socketModule.processUpdateAccountStatus(obj);
        } else if (obj.operation == wsOperation.UpdateAccountShow) {
            socketModule.processUpdateAccountShow(obj);
        } else if (obj.operation == wsOperation.UpdateAccountMultiples) {
            socketModule.processUpdateAccountMultiples(obj);
        } else if (obj.operation == wsOperation.StartLimitTime) {
            socketModule.processStartLimitTime(obj);
        } else if (obj.operation == wsOperation.CancelStartLimitTime) {
            socketModule.processCancelStartLimitTime(obj);
        } else if (obj.operation == wsOperation.GameStart) {
            socketModule.processGameStart(obj);
        } else if (obj.operation == wsOperation.NotyChooseChip) {
            socketModule.processNotyChooseChip(obj);
        } else if (obj.operation == wsOperation.UpdateAccountScore) {
            socketModule.processUpdateAccountScore(obj);
        } else if (obj.operation == wsOperation.OpenCard) {
            socketModule.processOpenCard(obj);
        } else if (obj.operation == wsOperation.Win) {
            socketModule.processWin(obj);
        } else if (obj.operation == wsOperation.autoCreateRoom) {//自动续局
            socketModule.processAutoCreateRoom(obj);
        } else if (obj.operation == wsOperation.BroadcastVoice) {
            socketModule.processBroadcastVoice(obj);
        } else if (obj.operation == wsOperation.StartBet) {
            socketModule.processStartBet(obj);
        } else if (obj.operation == wsOperation.StartShow) {
            socketModule.processStartShow(obj);
        } else if (obj.operation == wsOperation.MyCards) {
            socketModule.processMyCards(obj);
        } else if (obj.operation == wsOperation.BreakRoom) {
            socketModule.processBreakRoom(obj);
        } else if (obj.operation == wsOperation.GuestRoom) {
            socketModule.processGuestRoom(obj);
        } else if (obj.operation == wsOperation.AllGuestInfo) {
            socketModule.processAllGuestInfo(obj);
        } else if (obj.operation == wsOperation.UpdateGuestInfo) {
            socketModule.processUpdateGuestInfo(obj);
        } else if (obj.operation == wsOperation.SwapSeat) {
            socketModule.processSwapSeat(obj);
        } else {
            logMessage(obj.operation);
        }
    }
	});
}

var wsCloseCallback = function wsCloseCallback(data) {
    logMessage("websocket closed：");
    logMessage(data);
    appData.connectOrNot = false;
    reconnectSocket();
}

var wsErrorCallback = function wsErrorCallback(data) {
    logMessage("websocket onerror：");
    logMessage(data);
}

var reconnectSocket = function reconnectSocket() {
    if (globalData.roomStatus == 4) {
        return;
    }

    if (ws) {
        logMessage(ws.readyState);
        if (ws.readyState == 1) { //websocket已经连接
            return;
        }

        ws = null;
    }

    logMessage('reconnectSocket');
    connectSocket(globalData.socket, wsOpenCallback, wsMessageCallback, wsCloseCallback, wsErrorCallback);
}

//音频播放
var m4aAudioPlay = function m4aAudioPlay(a) {
    if (!audioModule.audioOn) {
        return 0;
    }

    audioModule.playSound(a);
};

var mp3AudioPlay = function mp3AudioPlay(a) {
    if (!audioModule.audioOn) {
        return 0;
    }

    audioModule.playSound(a);
};

var audioModule = {
    audioOn: false,
    audioContext: null,
    audioBuffers: [],
    audioUrl: '',
    initModule: function(audioUrl) {
        this.audioUrl = audioUrl;
        this.audioBuffers = [];
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.audioContext = new window.AudioContext();
    },
    stopSound: function(name) {
        var buffer = this.audioBuffers[name];

        if (buffer) {
            if (buffer.source) {
                buffer.source.stop(0);
                buffer.source = null;
            }
        }
    },
    playSound: function(name, isLoop) {

        if (name == "backMusic") {
            if (audioInfo.backMusic == 0) {
                return;
            }
        } else {
            if (audioInfo.messageMusic == 0) {
                return;
            }
        }

        var buffer = this.audioBuffers[name];

        if (buffer) {
            try {
                if (WeixinJSBridge != undefined) {
                    WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                        buffer.source = null;
                        buffer.source = audioModule.audioContext.createBufferSource();
                        buffer.source.buffer = buffer.buffer;
                        buffer.source.loop = false;

                        var gainNode = audioModule.audioContext.createGain();

                        if (isLoop == true) {
                            buffer.source.loop = true;
                            gainNode.gain.value = 0.7;
                        } else {
                            gainNode.gain.value = 1.0;
                        }

                        buffer.source.connect(gainNode);
                        gainNode.connect(audioModule.audioContext.destination);
                        buffer.source.start(0);
                    });
                }

            } catch (err) {
                buffer.source = null;
                buffer.source = audioModule.audioContext.createBufferSource();
                buffer.source.buffer = buffer.buffer;
                buffer.source.loop = false;

                var gainNode = audioModule.audioContext.createGain();

                if (isLoop == true) {
                    buffer.source.loop = true;
                    gainNode.gain.value = 0.7;
                } else {
                    gainNode.gain.value = 1.0;
                }

                buffer.source.connect(gainNode);
                gainNode.connect(audioModule.audioContext.destination);
                buffer.source.start(0);
            }
        }
    },
    initSound: function(arrayBuffer, name) {
        this.audioContext.decodeAudioData(arrayBuffer, function(buffer) {
            audioModule.audioBuffers[name] = {"name": name, "buffer": buffer, "source": null};

            if (name == "backMusic") {
                audioModule.audioOn = true;
                audioModule.playSound(name, true);
            }

        }, function(e) {
            logMessage('Error decoding file', e);
        });
    },
    loadAudioFile: function(url, name) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e) {
            audioModule.initSound(xhr.response, name);
        };

        xhr.send();
    },
    loadAllAudioFile: function() {
        if (globalData.roomStatus == 4) {
            return;
        }

        if (isLoadAudioFile == true) {
            return;
        }

        isLoadAudioFile = true;
        this.loadAudioFile(this.audioUrl + 'files/audio/sangong/background_dy.mp3', "backMusic");

        var audioUrl = ["nobanker.m4a", "robbanker.m4a", "0.m4a","1.m4a","2.m4a","3.m4a","4.m4a","5.m4a","6.m4a","7.m4a","8.m4a","9.m4a","special5.m4a","special6.m4a","special7.m4a","special8.m4a","special9.m4a","special10.m4a","special11.m4a", "times1.m4a", "times2.m4a", "times3.m4a", "times4.m4a", "times8.m4a", "times5.m4a", "times6.m4a", "times10.m4a", "times12.mp3", "coin.mp3", "audio1.m4a"];
        var audioName = ["audioNoBanker", "audioRobBanker", "sangong0", "sangong1", "sangong2", "sangong3", "sangong4", "sangong5", "sangong6", "sangong7", "sangong8", "sangong9", "special5", "special6", "special7", "special8", "special9", "special10", "special11", "audioTimes1", "audioTimes2", "audioTimes3", "audioTimes4", "audioTimes8", "audioTimes5", "audioTimes6", "audioTimes10", "audioTimes12", "audioCoin", "audio1"];
        for (var i = 0; i < audioUrl.length; i++) {
            this.loadAudioFile(this.audioUrl + 'files/audio/sangong/' + audioUrl[i], audioName[i]);
        }

    }
};

audioModule.initModule(globalData.fileUrl);

var initView = function initView() {

    $('#app-main').width(appData.width);
    $('#app-main').height(appData.height);
    $('#table').width(appData.width);
    $('#table').height(appData.height);

    $(".ranking").css("width", appData.width * 2);
    $(".ranking").css("height", appData.width * 2 * 1.621);

    window.onload = function() {
        var divs = ['table', 'vinvite', 'valert', 'vmessage', 'vcreateRoom', 'vroomRule', 'endCreateRoom', 'endCreateRoomBtn'];
        var divLength = divs.length;

        for (var i = 0; i < divLength; i++) {
            var tempDiv = document.getElementById(divs[i]);
            if (tempDiv) {
                tempDiv.addEventListener('touchmove', function(event) {
                    event.preventDefault();
                }, false);
            }
        }
    };
};

function checkIndividuality(e){
    return!!/^[0-9a-zA-Z]*$/g.test(e);
}

//Vue方法
var methods = {
    blurIpt: function () {
        // if (navigator.userAgent.toLocaleLowerCase().includes('iphone')) {
        //     window.scrollTo(0, 0)
        // }
    },
    applyClub: function(){
        httpModule.applyClub();
    },
    copyLink: function(){

        if(appData.ruleInfo.banker_mode==1){
            var bankerMode = '自由抢庄'
        }else if(appData.ruleInfo.banker_mode==2){
            var bankerMode = '明牌抢庄'
        }else if(appData.ruleInfo.banker_mode==4){
            var bankerMode = '经典三公'
        }else if(appData.ruleInfo.banker_mode==5){
            var bankerMode = '固定庄家'
        }

        var copyTitle = globalData.hallName + ':' + globalData.roomNumber + '\n' +
            '房间：' + globalData.maxCount + '人' + globalData.gameName + ', 模式：' + bankerMode + ', 底分：' + appData.ruleInfo.baseScore + ', 局数：' + appData.game.total_num ;
        var copyTitle = globalData.hallName;
        var content = document.URL;
        var input = copyTitle + '\n' + content;
        var el = document.createElement("textarea");
        el.value = input;
        el.setAttribute("readonly", "");
        el.style.contain = "strict";
        el.style.position = "absolute";
        el.style.left = "-9999px";
        el.style.fontSize = "12pt"; // Prevent zooming on iOS

        const selection = window.getSelection();
        var originalRange = false;
        if (selection.rangeCount > 0) {
            originalRange = selection.getRangeAt(0);
        }
        document.body.appendChild(el);
        el.select();
        el.selectionStart = 0;
        el.selectionEnd = input.length;
        var success = false;
        try {
            success = document.execCommand("copy");
            $('#tips').show();
            setTimeout(function () {
                $('#tips').hide();
            }, 2000);
            console.log('已复制：',el)
        } catch (err) {
        }

        document.body.removeChild(el);
        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }

        return success;
    },
    showHomeAlert: viewMethods.showHomeAlert,
    clickGameOver: viewMethods.clickGameOver,
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeAlert: viewMethods.clickCloseAlert,
    showIntro: viewMethods.clickShowIntro,
    closeIntro: viewMethods.clickCloseIntro,
    sitDown: viewMethods.clickSitDown,
    seeMyCard3: viewMethods.seeMyCard3,
    imReady: viewMethods.clickReady,
    robBanker: viewMethods.clickRobBanker,
    showCard: viewMethods.clickShowCard,
    selectTimesCoin: viewMethods.clickSelectTimesCoin,
    hideMessage: viewMethods.hideMessage,
    closeEnd: viewMethods.closeEnd,
    messageOn: viewMethods.messageOn,
    showNoteImg:function(){appData.isShowNoteImg=!0},
    hideNoteImg:function(){appData.isShowNoteImg=!1},
    hall: function(){
        window.location.href = 'index.html';
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    toNextRoom: function () {
        // 自动续局
        var roomInfo=JSON.parse(localStorage.newRoom)
		window.location.href= data.html_name+"?key="+roomInfo.data_key + '&v=' + (new Date().getTime())
		
       // window.location.href=request_url+"home/gn?i="+roomInfo.room_number+"_";
    },
    // 自动准备
    autoReady(){
        if(appData.isAutoReady==1){
            appData.isAutoReady=0
            localStorage.setItem("isAutoReady",0)
            localStorage.removeItem("roomNumber")
        }else{
            appData.isAutoReady=1
            viewMethods.clickReady()
            localStorage.setItem("isAutoReady",1)
            localStorage.setItem("roomNumber",globalData.roomNumber)
        }
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    closeHomeAlert: function(){
        appData.isShowHomeAlert = false;
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    reviewCard: function(){
		switch (globalData.gameType) {
		    case '1':
		        url = "review_bull.html"
		        break
		    case '2':
		        url = "review_bull.html"
		        break
		    case '3':
		        url = "review_bull.html"
		        break
		    case '4':
		        url = "review_flower.html"
		        break
		    case '5':
		        url = "review_sangong.html"
		        break
		    case '6':
		        url = "review_erba.html"
		        break
		    case '7':
		        url = "review_landlord.html"
		        break
		    case '8':
		        url = "review_majiang.html"
		        break
		    case '9':
		        url = "review_yxx.html"
		        break
		    case '10':
		        url = "review_paijiu.html"
		        break
		    // case 11:
		    //     url = ""
		    //     break
		    case '12':
		        url = "review_dxbull.html"
		        break
		    case '13':
		        url = "review_dcx.html"
		        break
		    case '14':
		        url = "review_laib.html"
		        break
		    case '15':
		        url = "review_hly.html"
		        break
		    // case 16:
		    //     url = ""
		    //     break
		    case '17':
		        url = "review_jia31.html"
		        break
		    case '18':
		        url = "review_dpj.html"
		        break
		}
		
		window.location.href = url + "?num="+item.number+"&type="+appData.globalData.gameType;
      //  window.location.href = request_url+'game/queryCard?type='+globalData.gameType+'&num='+globalData.roomNumber;
      //window.location.href = request_url+'game/queryCard?type='+globalData.gameType+'&num='+globalData.roomNumber;
   //   window.location.href = "review_bull?type="+globalData.gameType+'&num='+globalData.roomNumber;
	
	},
    showIndiv: function () {
        if(appData.individuality==""){
            appData.isShowIndiv=true
        }else{
            appData.isShowIndividuality = true;
        }
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    hideIndiv: function () {
        appData.isShowIndiv = false;
        appData.isShowIndividuality = false;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    showIndividuality: function () {
        if(userData.individuality==""){
            appData.isShowIndiv=true
        }else{
            appData.isShowIndividuality = true;
        }
        appData.individualityError = "";

        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    hideIndividuality: function () {
        appData.isShowIndiv = false;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    showIndivConfirm: function () {
        appData.individualityError = "";
        appData.isShowIndiv = false;
        appData.isShowIndivConfirm = true;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    hideIndivConfirm: function () {
        appData.isShowIndivConfirm = false;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    setIndividuality: function () {
        // if(appData.individuality.length>6||appData.individuality.length<1){
        //     appData.individualityError="请输入1-6位英文或数字防伪码";
        //     appData.isShowIndividualityError=!0;
        // } else if(checkIndividuality(appData.individuality)){
        //     appData.individualityError="";
        //     httpModule.setIndividuality();
        // } else {
        //     appData.individualityError="请输入1-6位英文或数字防伪码";
        //     appData.isShowIndividualityError=!0;
        // }
        httpModule.setIndividuality();
    },
    showAlertTip:function(e,t){
        appData.isShowAlertTip=true;
        appData.alertTipText=e;
        appData.alertTipType=t;
        setTimeout(function(){
            appData.isShowAlertTip=!1;
        },1e3);
    },

    notRobBanker: viewMethods.clickNotRobBanker,

    showGameRule: function() {
        if (appData.roomStatus == 4) {
            return;
        }

        $('.createRoom .mainPart').css('height', '60vh');
        $('.createRoom .mainPart .blueBack').css('height', '51vh');
        appData.ruleInfo.isShowNewRule = true;
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    cancelGameRule: function() {
        appData.ruleInfo.isShowNewRule = false;
        $('.createRoom .mainPart').css('height', '65vh');
        $('.createRoom .mainPart .blueBack').css('height', '46vh');
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },

    showBreakRoom: function() {
        if (appData.breakData != null && appData.breakData != undefined) {
            viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard);
        }
        chooseBigWinner();
        $(".ranking .rankBack").css("opacity", "1");
        $(".roundEndShow").show();

        $(".ranking").show();
        canvas();
    },
    confirmBreakRoom: function() {
        socketModule.sendGameOver();
        viewMethods.clickCloseAlert();
    },
    showAudioSetting: function() {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = true;
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    cancelAudioSetting: function() {
        appData.editAudioInfo.isShow = false;
        methods.confirmAudioSetting();
    },
    confirmAudioSetting: function(once) {
        console.log(once);
        console.log(appData.musicOnce);
        //2
        if(once == '1' && appData.musicOnce && appData.editAudioInfo.backMusic==1 && appData.editAudioInfo.messageMusic==1){
            appData.audioInfo.backMusic = 1;
            setTimeout(function(){audioModule.stopSound('backMusic');},200);
            setTimeout(function(){audioModule.playSound('backMusic', true);},500);
            appData.musicOnce = false;
        }
        if(once == '1' && !appData.musicOnce){
            return;
        }
        appData.editAudioInfo.isShow = false;
        appData.audioInfo.backMusic = appData.editAudioInfo.backMusic;
        appData.audioInfo.messageMusic = appData.editAudioInfo.messageMusic;
        localStorage.backMusic = appData.editAudioInfo.backMusic;
        localStorage.messageMusic = appData.editAudioInfo.messageMusic;

        if (appData.audioInfo.backMusic == 1) {
            audioModule.stopSound('backMusic');
            audioModule.playSound('backMusic', true);
            appData.musicOnce = false;
        } else {
            audioModule.stopSound('backMusic');
        }
    },
    setBackMusic: function() {
        if (appData.editAudioInfo.backMusic == 0) {
            appData.editAudioInfo.backMusic = 1;
            setTimeout(function(){audioModule.stopSound('backMusic');},200);
            setTimeout(function(){audioModule.playSound('backMusic', true);},500);
        } else {
            appData.editAudioInfo.backMusic = 0;
            audioModule.stopSound('backMusic');
        }
        localStorage.backMusic = appData.editAudioInfo.backMusic;
    },
    setMessageMusic: function() {
        if (appData.editAudioInfo.messageMusic == 0) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
        localStorage.messageMusic = appData.editAudioInfo.messageMusic;
    },

    reloadView: function() {
        window.location.href = window.location.href + "&id=" + 1000 * Math.random();
    },
    applyToJoin:function(){
        httpModule.applyToJoin();
    },
    //观战功能
    guestRoom:function(){
        socketModule.sendGuestRoom()
    },
    hideGuests:function(){
        $('.sidelines-mask').hide();
        $('.sidelines-content').css({right: '-50%',});
    },
    showGuests:function(){
        appData.showSitdownButton=0;
        appData.showWatchButton=!appData.isWatching && appData.player[0].account_status<2;

        if(appData.isWatching){
            for(var e=0;e<appData.player.length;e++)
                if(appData.player[e].account_id==userData.accountId || 0==appData.player[e].account_id){
                    appData.showSitdownButton = 1;
                    break
                }
        }
        $('.sidelines-mask').show();
        $('.sidelines-content').css({right: 0,});
        if(localStorage.messageMusic==1){
            document.getElementById("media").play();
        }
    },
    showIconMore:function(){
        $('.icon-more-mask').show();
        $('.icon-more').css({right: 0,});
    },
    hideIconMore:function(){
        $('.icon-more-mask').hide();
        $('.icon-more').css({right: '-0.35rem',});
    },
};

//Vue生命周期
var vueLife = {
    vmCreated: function() {
        logMessage('vmCreated')
        resetState();
        //reconnectSocket();
        initView();
        if (globalData.roomStatus != 4) {
            $("#loading").hide();
        }

        $(".main").show();
    },
    vmUpdated: function() {
        logMessage('vmUpdated');
    },
    vmMounted: function() {
        logMessage('vmMounted');
        $('#marquee').marquee({
            //speed in milliseconds of the marquee
            duration: globalData.notySpeed,
            //gap in pixels between the tickers
            gap: 50,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: 'left',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true
        });
    },
    vmDestroyed: function() {
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

function getShareContent() {
    shareContent = "\n";

    if (appData.ruleInfo.banker_mode == 1) {
        shareContent = shareContent + '自由抢庄 ';
    } else if (appData.ruleInfo.banker_mode == 2) {
        shareContent = shareContent + '明牌抢庄 ';
    } else if (appData.ruleInfo.banker_mode == 3) {
        shareContent = shareContent + '牛牛上庄 ';
    } else if (appData.ruleInfo.banker_mode == 4) {
        shareContent = shareContent + '经典三公 ';
    } else if (appData.ruleInfo.banker_mode == 5) {
        shareContent = shareContent + '固定庄家 ';
    }

    if (appData.ruleInfo.baseScore == 1) {
        shareContent = shareContent + '底分:1分';
    } else if (appData.ruleInfo.baseScore == 2) {
        shareContent = shareContent + '底分:2分';
    } else if (appData.ruleInfo.baseScore == 3) {
        shareContent = shareContent + '底分:3分';
    } else if (appData.ruleInfo.baseScore == 4) {
        shareContent = shareContent + '底分:4分';
    } else if (appData.ruleInfo.baseScore == 5) {
        shareContent = shareContent + '底分:5分';
    }

    if (appData.ruleInfo.is_cardjoker == 1 || appData.ruleInfo.is_cardbao9 == 1) {
        var cardContent = ' 规则:';
        if (appData.ruleInfo.is_cardjoker == 1) {
            cardContent = cardContent + ' 天公x10,雷公x7,地公x5';
        }

        if (appData.ruleInfo.is_cardbao9 == 1) {
            cardContent = cardContent + ' 暴玖x9';
        }

        shareContent = shareContent + cardContent;
    }

    if (appData.ruleInfo.ticket == 1) {
        shareContent = shareContent + ' 局数:12局x2张房卡';
    } else {
        shareContent = shareContent + ' 局数:24局x4张房卡';
    }

    if (appData.ruleInfo.banker_mode == 5) {
        if (appData.ruleInfo.banker_score == 1) {
            shareContent = shareContent + ' 上庄分数:无';
        } else if (appData.ruleInfo.banker_score == 2) {
            shareContent = shareContent + ' 上庄分数:300';
        } else if (appData.ruleInfo.banker_score == 3) {
            shareContent = shareContent + ' 上庄分数:500';
        } else if (appData.ruleInfo.banker_score == 4) {
            shareContent = shareContent + ' 上庄分数:1000';
        }
    }
};

var wxModule = {
    config: function() {
        // wx.config({
        //     debug: false,
        //     appId: configData.appId,
        //     timestamp: configData.timestamp,
        //     nonceStr: configData.nonceStr,
        //     signature: configData.signature,
        //     jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"]
        // });

        getShareContent();

        // wx.onMenuShareTimeline({
        //     title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        //     desc: shareContent,
        //     link: globalData.roomUrl,
        //     imgUrl: globalData.fileUrl + "files/images/sangong/share_icon.jpg",
        //     success: function() {},
        //     cancel: function() {}
        // });
        // wx.onMenuShareAppMessage({
        //     title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        //     desc: shareContent,
        //     link: globalData.roomUrl,
        //     imgUrl: globalData.fileUrl + "files/images/sangong/share_icon.jpg",
        //     success: function() {},
        //     cancel: function() {}
        // });

    },
};

//微信配置
wx.config({
    debug: false,
    appId: configData.appId,
    timestamp: configData.timestamp,
    nonceStr: configData.nonceStr,
    signature: configData.signature,
    jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"]
});

var isLoadAudioFile = false;
audioModule.loadAllAudioFile();
audioModule.audioOn = true;
audioModule.stopSound("backMusic");
audioModule.playSound("backMusic", true);
wx.ready(function() {

    audioModule.loadAllAudioFile();

    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:refresh"]
    });

    getShareContent();

    wx.onMenuShareTimeline({
        title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl:globalData.shareImg,
        success: function() {},
        cancel: function() {}
    });
    wx.onMenuShareAppMessage({
        title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl:globalData.shareImg,
        success: function() {},
        cancel: function() {}
    });
});

wx.error(function(a) {});

//新画布
function canvas() {

    liuliuCreateRanking(appData.playerBoard, function (d) {
        var img = document.createElement('img');
        if (parseInt(appData.playerBoard.score.length) > 6) {
            img.className = 'room-gameover-ten ranking-img';
        } else {
            img.className = 'room-gameover ranking-img';
        }
        img.src = d;
        img.onload = function () {
            setTimeout(function () {
                document.body.style.backgroundColor = '#000000';
                document.body.style.minHeight = 'initial';
                document.body.appendChild(img);
                var div = document.createElement('div');
                div.className = 'search-number-box';
                document.body.appendChild(div);
                if(appData.showNextRoom==true){
                    var detailedBtn = '<a class="search-number-box-btn" onclick="methods.toNextRoom()" style="position: fixed;z-index: 999999999;right:0;bottom:0;width:50%;height:20%;"></a>';
                    div.insertAdjacentHTML("beforeend", detailedBtn);
                }
                // 聊天室按钮
                var myImage = document.createElement("img");
                myImage.className = 'chatBtn'
                myImage.src = globalData.fileUrl + 'files/images/daoyou/hall/btn_chat.png';
                document.body.appendChild(myImage);
                myImage.style.position = "absolute";
                myImage.style.zIndex = "999999999";
                myImage.style.top = "0px";
                myImage.style.width = "40px";
                myImage.style.right = "56px";

                myImage.addEventListener('click', function (ev) {
                    var url = './chat_index.html';

                    window.location.replace(url);
                });

                // 战绩详情按钮
                var reviewBtn = document.createElement("div");
                reviewBtn.className = 'reviewBtn'
                document.body.appendChild(reviewBtn);
                reviewBtn.style.position = "absolute";
                reviewBtn.style.zIndex = "999999999";
                reviewBtn.style.top = "0px";
                reviewBtn.style.width = "80px";
                reviewBtn.style.height = "40px";
                reviewBtn.style.left = "50%";
                reviewBtn.style.marginLeft = "-40px";

                reviewBtn.addEventListener('click', function (ev) {
                    methods.reviewCard()
                });

                // 返回大厅按钮
                var myImage = document.createElement("img");
                myImage.className = 'chatBtn'
                myImage.src = globalData.fileUrl + 'files/images/daoyou/hall/btn_home.png';
                document.body.appendChild(myImage);
                myImage.style.position = "absolute";
                myImage.style.zIndex = "999999999";
                myImage.style.top = "0px";
                myImage.style.width = "40px";
                myImage.style.left = "10px";

                myImage.addEventListener('click', function (ev) {
                    var url = "index.html";
                    window.location.replace(url);
                });


                getRankingSix();
                $('#ranking').remove();
                $('.ranking-img').css({
                    'position': 'absolute',
                    'top': '0',
                    'right': '0',
                    'bottom': '0',
                    'z-index': '999999',
                    'width': '100%',
                    'background-color': '#000'
                });
                $("#loading").css({'background': '#071a45'});
                //$(document.body).off('touchmove');
            }, 200);
        };
    });
};

function getRankingSix() {
    var win = {
        gameId: 4
    }
    if (document.getElementsByClassName('ranking-img')[0] && document.getElementsByClassName('search-number-box')[0]) {
        var div = document.getElementsByClassName('search-number-box')[0];
        var imag = document.getElementsByClassName('ranking-img')[0];
        var aBtn = document.getElementsByClassName('search-number-box-btn')[0];
        var a = getNaturalSize(imag).width;
        var b = getNaturalSize(imag).height;
        var c = imag.offsetWidth;
        var d = imag.offsetHeight;
        var index = (parseInt(a) / parseInt(b)) / (parseInt(c) / parseInt(d));
        if (parseInt(win.gameId) === 3) {
            changePosition(236, 74, 448, 140);
        } else if (parseInt(win.gameId) === 7) {
            changePosition(236, 74, 441, 150);
        } else if (parseInt(win.gameId) === 14 || parseInt(win.gameId) === 15 || parseInt(win.gameId) === 16 || parseInt(win.gameId) === 17 || parseInt(win.gameId) === 18 || parseInt(win.gameId) === 19 || parseInt(win.gameId) === 20 || parseInt(win.gameId) === 22 || parseInt(win.gameId) === 23 || parseInt(win.gameId) === 24 || parseInt(win.gameId) === 25) {
            changePosition(217, 73, 400, 167);
        } else {
            changePosition(236, 74, 419, 125);
        }

        function changePosition(btnWidth, btnHeight, btnLeft, btnBottom) {
            if (index > 1) {
                var width = c;
                var height = b / a * c;
                div.style.top = (d - b / a * c) / 2 + 'px';
                div.style.left = '0px';
            } else if (index < 1) {
                var width = a / b * d;
                var height = d;
                div.style.top = '0px';
                div.style.left = (c - a / b * d) / 2 + 'px';
            } else {
                var width = c;
                var height = d;
                div.style.top = '0px';
                div.style.left = '0px';
            }
            //aBtn.style.width = width * (btnWidth / a) + 'px';
            // aBtn.style.height = height * (btnHeight / b) + 'px';
            //aBtn.style.left = width * (btnLeft / a) + 'px';
            //aBtn.style.top = height * ((b - btnBottom) / b) + 'px';
        }

        function getNaturalSize(Domlement) {
            var natureSize = {};
            if (window.naturalWidth && window.naturalHeight) {
                natureSize.width = Domlement.naturalWidth;
                natureSize.height = Domlement.naturalHeight;
            } else {
                var img = new Image();
                img.src = Domlement.src;
                natureSize.width = img.width;
                natureSize.height = img.height;
            }
            return natureSize;
        }
    }
};

var storage = {
    get: function (key) {
        var data = false;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                data = this.item(arr[0]);
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        return data;
    }, set: function (key, value) {
        if (value === undefined) return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        _dt = data;
                        data = data[arr[i]];
                    } else {
                        if (i == arr.length - 1) {
                            data[arr[i]] = '';
                            _dt = data;
                            data = data[arr[i]];
                        } else return false
                    }
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        data = value;
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return true;
    }, inset: function (key, value) {
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof (data) != 'object') return false;
        data.push(value);
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
            data = datas;
        }
        return data;
    }, outset: function (key, value) {
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof (data) != 'object') return false;
        var _data = [];
        for (var i in data) {
            if (data[i] !== value) _data.push(data[i]);
        }
        data = _data;
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
            data = datas;
        }
        return data;
    }, pop: function (key, way) {
        var way = way || 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (way == 1)
            var rs = data.pop(); else
            var rs = data.shift();
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return rs;
    }, shift: function (key) {
        return this.pop(key, -1);
    }, incr: function (key, value) {
        if (typeof (value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof (data) == 'number') {
            data += value;
        } else {
            return false;
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return data;
    }, decr: function (key, value) {
        if (typeof (value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof (data) == 'number') {
            data -= value;
        } else {
            return false;
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return data;
    }, rm: function (key) {
        if (key.indexOf('.') > 0) {
            var data = [];
            var datas = null;
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) {
                            delete data[arr[i]];
                        } else data = data[arr[i]];
                    } else return false;
                }
                this.item(arr[0], datas);
                return datas;
            } else {
                return false;
            }
        } else {
            this.item(key, null);
            return true;
        }
    }, each: function (key, fn) {
        if (typeof (fn) != 'function') return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0) continue;
                    if (data[arr[i]] !== undefined) {
                        _dt = data;
                        data = data[arr[i]];
                    } else return false
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof (data) != 'object') return false;
        for (var i in data) {
            var rs = fn(data[i], i);
            if (rs !== undefined) {
                data[i] = rs;
            }
        }
        if (datas === null) {
            this.item(key, data);
        } else {
            _dt[arr[arr.length - 1]] = data;
            this.item(arr[0], datas);
        }
        return true;
    }, item: function (key, value) {
        if (window.localStorage) {
            if (value === undefined) {
                return this.decode(localStorage.getItem(key)) || false;
            } else if (value === null) return localStorage.removeItem(key); else return localStorage.setItem(key, this.encode(value));
        } else {
            if (value === undefined) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return this.decode(arr[2]); else
                    return false;
            } else if (value === null) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                document.cookie = name + "=" + this.encode(value) + ";expires=" + exp.toGMTString();
                return true;
            } else {
                var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
                document.cookie = name + "=" + this.encode(value) + ";expires=" + exp.toGMTString();
                return true;
            }
        }
    }, encode: function (obj) {
        var str = '';
        try {
            str = JSON.stringify(obj);
        } catch (e) {
            str = decodeURI(obj);
        }
        return str;
    }, decode: function (str) {
        var obj = '';
        try {
            obj = JSON.parse(str);
        } catch (e) {
            obj = encodeURI(str);
        }
        return obj;
    }
};

function loadimg(pics, func, error_path) {
    if (typeof (pics) == 'string') var pics = [pics];
    var error_path = error_path || "../../files/images/default_head.png";
    var _pics = [];
    var count = 0;

    function createImg(data, i, name) {
        var img = new Image();
        img.src = data;
        img.onload = function () {
            _pics[i] = this;
            count++;
            if (count == pics.length && typeof (func) == 'function') {
                func(_pics);
            }
            if (name) {
                var cvs = document.createElement('canvas');
                cvs.width = this.width;
                cvs.height = this.height;
                cvs.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
                storage.set(name, cvs.toDataURL("image/png"));
            }
        };
        img.onerror = function () {
            var name = pics[i].replace(/\W/g, '');
            storage.rm(name);
            win.reload();
        }
    }

    for (var i in pics) {
        var src = pics[i];
        var name = src.replace(/\W/g, '');
        var data = storage.get(name);
        if (data) {
            createImg(data, i);
        } else {
            if (window.XMLHttpRequest)
                var xhr = new XMLHttpRequest(); else if (window.ActiveXObject)
                var xhr = new ActiveXObject('Microsoft.XMLHTTP'); else {
                alert("Your browser does not support XMLHTTP.");
                return false;
            }
            xhr._index = i;
            xhr._name = name;
            xhr._src = src;
            xhr.open("get", src, true);
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    var data = window.URL.createObjectURL(this.response);
                    createImg(data, this._index, this._name);
                }
            };
            xhr.onerror = function () {

                if (window.XMLHttpRequest)
                    var xhr2 = new XMLHttpRequest(); else if (window.ActiveXObject)
                    var xhr2 = new ActiveXObject('Microsoft.XMLHTTP'); else {
                    alert("Your browser does not support XMLHTTP.");
                    return false;
                }
                xhr2._index = this._index;
                xhr2._name = this._name;
                xhr2.open("get", request_url + 'getjpg/wx?avatarurl=' + this._src + '&r=' + Math.random(), true);
                //alert("error1 : "+ this._index +":" + request_url+'getjpg/wx?avatarurl='+this._src);
                xhr2.responseType = 'blob';
                xhr2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var data2 = window.URL.createObjectURL(this.response);
                        createImg(data2, this._index, this._name);
                    }
                };
                xhr2.onerror = function (err) {
                    createImg(error_path, this._index);
                }
                xhr2.ontimeout = function () {
                    createImg(error_path, this._index);
                };
                xhr2.send();

            };
            xhr.ontimeout = function () {
                createImg(error_path, this._index);
            };
            xhr.send();
        }
    }
    return true;
}

function liuliuCreateRanking(data, func) {
    var win = {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        version: '1.0.0',
        ws: {},
        status: 0,
        readed: 0,
        gameId: 0,
    }

    var users = data.score;

    var room_number = appData.game.room_number;
    var num = data.round;
    var sum = appData.game.total_num;
    var datetime = data.record;
    var width = 750;
    var height = 1216;
    var pics = [
        globalData.fileUrl + "files/images/daoyou/ranking/rank_bg.jpg",
        globalData.fileUrl + "files/images/daoyou/ranking/people_bg.png",
        globalData.fileUrl + "files/images/daoyou/ranking/ranking_icon.png"];
    if (users.length > 10) {
        pics.push(globalData.fileUrl + "files/images/daoyou/ranking/people_bg2.jpg");
        if(appData.showNextRoom==true){
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/auto.jpg");
        }else{
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/people_bg4.jpg");
        }
        height += 82 * (users.length - 10);
    } else {
        if(appData.showNextRoom==true){
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/auto.jpg");
        }else{
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/people_bg4.jpg");

        }
    }
    for (var i = 0; i < users.length; i++) {
        pics.push(users[i].avatar);
        // if (/\/+[064]{1,2}$/.test(users[i].nickname)) pics.push('https://cdn-1255620552.file.myqcloud.com/images/default_head.png'); else pics.push(users[i].nickname.replace(/\/\d{1,3}$/, '/64'));
    }
    loadimg(pics, function (imgs) {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        context.drawImage(imgs[0], 0, 0, width, width / 750 * 1216);
        var text = '房间号：' + room_number + '                     ' + datetime + '   ' + num + '/' + sum + '局';
        context.font = "24px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#000";
        context.fillText(text, 375, 190);
        for (var i = 0; i < users.length; i++) {
            if (i >= 10) context.drawImage(imgs[3], 0, 210 + i * 82, 750, 102);
            var n = parseInt(i) + parseInt(users.length > 10 ? 5 : 4);
            context.drawImage(imgs[n], 123, 220 + i * 82, 64, 64);//玩家头像
            context.drawImage(imgs[1], 56, 210 + i * 82, 640, 80);//玩家背景
            var textwidth = 250;
            context.font = "26px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#000";
            if(users[i].nickname.length>=10){
                users[i].nickname = users[i].nickname.substring(0,9)+"..."
            }
            var arr = users[i].nickname.split('');
            var txt = '', row = [];
            for (var j in arr) {
                if (context.measureText(txt).width >= textwidth) {
                    row.push(txt);
                    txt = '';
                }
                txt += arr[j];
            }
            if (txt != '') row.push(txt);
            if (row.length == 1) {
                context.fillText(row[0], 200, 242 + 82 * i);//玩家名字
            } else {
                context.fillText(row[0], 240, 250 + 82 * i);
                context.fillText(row[1], 240, 278 + 82 * i);
            }

            var arrAccountId = users[i].account_id;
            var txtId = '', rowId = [];
            for (var j in arrAccountId) {
                if (context.measureText(txtId).width >= textwidth) {
                    row.push(txtId);
                    txt = '';
                }
                txtId += arrAccountId[j];
            }
            var changeId = txtId.split('');
            changeId[0] = '*';
            changeId[1] = '*';
            var sercetId = changeId.join('');

            if (txtId != '') rowId.push("编号:"+sercetId);
            if (rowId.length == 1) {
                context.fillText(rowId[0], 200, 278 + 82 * i);//玩家名字
            } else {
                context.fillText(rowId[0], 240, 286 + 82 * i);
                context.fillText(rowId[1], 240, 314 + 82 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'right';
            if (users[i]['account_score'] > 0) {
                context.fillStyle = "#ca5c16";
                context.fillText('+' + users[i]['account_score'], 675, 266 + 82 * i);
            } else if (users[i]['account_score'] < 0) {
                context.fillStyle = "#42bd29";
                context.fillText(users[i]['account_score'], 675, 266 + 82 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 675, 266 + 82 * i);
            }
            if (users[i]['account_score'] == users[0]['account_score']) {
                context.drawImage(imgs[2], 68, 210 + i * 82, 47, 75);//大赢家图标
            }
        }
        if (i > 10) {
            context.drawImage(imgs[4], 0, 210 + (i) * 82, 750, 175);
        } else {
            context.drawImage(imgs[3], 0, canvas.height - 175, 750, 175);
        }
        // var tips = '游戏对战成绩记录仅为游戏规则体现，不具备货币属性';
        // context.font = "24px 微软雅黑";
        // context.textAlign = 'center';
        // context.fillStyle = "#c7bb92";
        // context.fillText(tips, canvas.width / 2, canvas.height - 15);
        if (typeof (func) == 'function') func(canvas.toDataURL("image/png"));
    });
}

//画布
function canvas222() {
    var target = document.getElementById("ranking");
    html2canvas(target, {
        allowTaint: true,
        taintTest: false,
        onrendered: function(canvas) {
            canvas.id = "mycanvas";
            var dataUrl = canvas.toDataURL('image/jpeg', 0.5);
            $("#end").attr("src", dataUrl);
            $(".end").show();
            $('.ranking').hide();
            newGame();
        }
    });
};

function logMessage(message) {
    console.log(message);
};

function chooseBigWinner() {

    //对积分榜排序
    appData.playerBoard.score.sort(function(a,b){
        return b.account_score - a.account_score;
    });

    var length = appData.playerBoard.score.length;
    var maxScore = 1;
    for (var i = 0; i < length; i++) {
        appData.playerBoard.score.isBigWinner = 0;
        if (appData.playerBoard.score[i].account_score > maxScore) {
            maxScore = appData.playerBoard.score[i].account_score;
        }
    }

    for (var j = 0; j < length; j++) {
        if (appData.playerBoard.score[j].account_score == maxScore) {
            appData.playerBoard.score[j].isBigWinner = 1;
        }
    }
};

if (globalData.roomStatus == 4) {

    try {
        var obj = eval('(' + globalData.scoreboard + ')');
        setTimeout(function() {
            socketModule.processLastScoreboard(obj);
        }, 0);
    } catch (error) {
        console.log(error);
        setTimeout(function() {
            socketModule.processLastScoreboard('');
        }, 0);
    }

}

//积分榜
$(function() {
    //$(".main").css("height", window.innerWidth * 1.621);
    $(".place").css("width", per * 140);
    $(".place").css("height", per * 140);
    $(".place").css("top", per * 270);
    $(".place").css("left", per * 195);

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
            audioModule.audioOn = false;
            audioModule.stopSound("backMusic");
        } else if (sessionStorage.isPaused !== "true") {
            console.log('play backMusic');
            audioModule.audioOn = true;
            audioModule.stopSound("backMusic");
            audioModule.playSound("backMusic", true);
        }
    }
    if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
        alert("This demo requires a browser such as Google Chrome that supports the Page Visibility API.");
    } else {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
});