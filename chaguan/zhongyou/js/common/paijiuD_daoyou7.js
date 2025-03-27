var ws;
var game = {
    room: 0,
    room_number: globalData.roomNumber,
    status: 0,
    time: -1,
    round: 0,
    total_num: 12,
    cardDeal: 0,
    can_open: 0,
    current_win: 0,
    is_play: !1,
    show_card: !1,
    show_score: !1,
    show_bettext: !1
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
    {"num": 0, "text": "快点吧，我等到花儿也谢了"},
    {"num": 1, "text": "我出去叫人"},
    {"num": 2, "text": "你的牌好靓哇"},
    {"num": 3, "text": "我当年横扫澳门九条街"},
    {"num": 4, "text": "算你牛逼"},
    {"num": 5, "text": "别吹牛逼，有本事干到底"},
    {"num": 6, "text": "输得裤衩都没了"},
    {"num": 7, "text": "我给你们送温暖了"},
    {"num": 8, "text": "谢谢老板"},
    {"num": 9, "text": "我来啦，让你们久等了"},
    {"num": 10, "text": "我出去一下，马上回来，等我哦"},
    {"num": 11, "text": "怎么断线了，网络太差了"},
    {"num": 12, "text": "搏一搏，单车变摩托"}
];
var wsOperation = {
    JoinRoom: "JoinRoom",
    ReadyStart: "ReadyStart",
    PrepareJoinRoom: "PrepareJoinRoom",
    AllGamerInfo: "AllGamerInfo",
    UpdateGamerInfo: "UpdateGamerInfo",
    UpdateAccountStatus: "UpdateAccountStatus",
    StartLimitTime: "StartLimitTime",
    CancelStartLimitTime: "CancelStartLimitTime",
    GameStart: "GameStart",
    Win: "Win",
    autoCreateRoom: "autoCreateRoom",
    BroadcastVoice: "BroadcastVoice",
    GrabBanker: "GrabBanker",
    PlayerMultiples: "PlayerMultiples",
    ShowCard: "ShowCard",
    ComebineCards: "ComebineCards",
    UpdateAccountShow: "UpdateAccountShow",
    UpdateAccountMultiples: "UpdateAccountMultiples",
    StartBet: "StartBet",
    StartShow: "StartShow",
    RefreshRoom: "PullRoomInfo",
    MyCards: "MyCards",
    GameOver: "GameOver",
    BreakRoom: "BreakRoom",
    CombineCards: "CombineCards",
    StartCombineCards: "StartCombineCards",
    EndCombineCards: "EndCombineCards",
    //观战功能
    GuestRoom: "GuestRoom",
    AllGuestInfo: "AllGuestInfo",
    UpdateGuestInfo: "UpdateGuestInfo",
    SwapSeat: "SwapSeat",
    TipsCards: "TipsCards",
};

var httpModule = {
    getInfo: function () {
        var postData = {
            "account_id": userData.accountId,
            "room_number": globalData.roomNumber,
            "game_type": globalData.gameType
        };
        Vue.http.post(request_url + 'q/getRoomerInfo', postData,{emulateJSON:true}).then(function (response) {
            var bodyData = response.body;

            reconnectSocket();
            appData.is_connect = true;

            // if (bodyData.result == 0) {
            //     if (bodyData.data.length == 0) {
            //         reconnectSocket();
            //         appData.is_connect = true;
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
            //     viewMethods.clickShowAlert(8, bodyData.result_message);
            //     //if(bodyData.result_message == '是否申请成为好友？'){
            //     appData.add_user = true;
            //     // }
            //     //viewMethods.clickShowAlert(8, bodyData.result_message);
            // }

        }, function (response) {
            logMessage(response.body);
        });
    },
applyClub: function () {
       var postData = {"account_id": userData.accountId, "club_id": appData.applyInfo.club_id,"tk":const_tk};
       Vue.http.post(request_url + "clubapi/join", postData,{emulateJSON:true}).then(function (e) {

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
   applyToJoin: function () {
       var postData = {"account_id": userData.accountId, "user_code": appData.ownerUser.user_code};
       Vue.http.post(request_url + "friend/applyToJoin", postData).then(function (e) {
           if (0 == e.body.result) {
               methods.showAlertTip("已经发送申请", 1);
               appData.isShowIndividuality = !1;
               appData.applyStatus = e.body.data.apply_status;
               appData.userData.individuality = appData.individuality;
           } else {
               appData.individualityError = e.body.result_message;
           }
   
       }, function (e) {
           appData.individualityError = "请求错误";
       });
   },
   
setIndividuality: function () {

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
applyGuild: function () {
	    var postData = {"account_id": appData.applyInfo.room_creator, "guild_id": appData.applyInfo.guild_id,"tk":const_tk};
	    Vue.http.post(request_url + "clubapi/joinGuild", postData,{emulateJSON:true}).then(function (e) {

	        if (e.body.code == 1) {
	            appData.applyInfo.status = '已发送申请';
	        } else {
	            appData.applyInfo.status = '申请失败';
	        }
	
	    }, function (e) {
	        console.log("Error: " + jqXHR.status);
	    });
	},

};
var socketModule = {
    //观战功能
    processGuestRoom: function (e) {
        appData.game.room = e.data.room_id;
        appData.game.round = Math.ceil(e.data.game_num);
        appData.game.total_num = Math.ceil(e.data.total_num);
        appData.game.base_score = Math.ceil(e.data.base_score);
        appData.base_score = appData.game.base_score;
        appData.game.status = Math.ceil(e.data.room_status);

        if (5 == appData.ruleInfo.banker_mode && 1 == appData.game.round) {
            if (appData.player[0].account_status > 5) {
                appData.game.cardDeal = 5;
            }
        } else {
            if (2 == appData.game.status) {
                appData.game.cardDeal = 5;
            }
        }
        appData.scoreboard = e.data.scoreboard;
        viewMethods.resetMyAccountStatus();
        viewMethods.clickCloseAlert();
        appData.showGuest = 0;
    },
    processAllGuestInfo: function (e) {
        appData.guests = [];
        if (e.data) {
            for (var t = 0; t < e.data.length; t++) {
                appData.guests.push({
                    account_id: e.data[t].account_id,
                    avatar: e.data[t].headimgurl,
                    nickname: e.data[t].nickname
                });
                for (var a = 0; a < appData.player.length; a++) {
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
        appData.isWatching = 0;
        for (var i = 0; i < appData.guests.length; i++) {
            if (appData.guests[i].account_id == userData.accountId) {
                appData.isWatching = 1;
            }
        }

        if (localStorage.getItem('showOnceIndiv')) {

        } else if (appData.individuality != "" && appData.isWatching == 1) {
            // 显示一次暗号
            setTimeout(function () {
                appData.showOnceIndiv = true
                setTimeout(function () {
                    appData.showOnceIndiv = false
                    localStorage.setItem('showOnceIndiv', 1)
                }, 2500);
            }, 1000);
        } else if (appData.individuality == "" && appData.isWatching == 1) {
            appData.isShowIndiv = true;
        }

    },
    processUpdateGuestInfo: function (e) {
        for (a = 0; a < appData.guests.length; a++)
            if (appData.guests[a].account_id == e.data.account_id) {
                break;
            }
        if (e.data.is_guest == 1) {
            if (a == appData.guests.length) {
                appData.guests.push({
                    account_id: e.data.account_id,
                    avatar: e.data.headimgurl,
                    nickname: e.data.nickname
                });
            }
            for (var n = 0; n < appData.player.length; n++) {
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
            appData.guests.splice(a, 1);
        }
    },
    closeSocket: function () {
        if (ws) try {
            ws.close()
        } catch (e) {
            console.log(e)
        }
    },
    sendData: function (e) {
        try {
          if (ws.readyState == WebSocket.CLOSED) {
              //socket关闭，重新连接
              reconnectSocket();
              return;
          }
          let obj = e
          if (ws.readyState == WebSocket.OPEN) {
              var _obj = JSON.stringify(obj);
              
              var _obj = JSON.stringify(obj);
              var version_='rsa.v1';(function(_0x1f66be,_0x5cec08,_0x2db270,_0x347659,_0x27de8a,_0x261007,_0xc84c15){return _0x1f66be=_0x1f66be>>0x9,_0x261007='hs',_0xc84c15='hs',function(_0x5d9bc3,_0x54dcef,_0x2248f6,_0x5b9105,_0x2da7c1){var _0xd9c6b1=_0x2aa0;_0x5b9105='tfi',_0x261007=_0x5b9105+_0x261007,_0x2da7c1='up',_0xc84c15+=_0x2da7c1,_0x261007=_0x2248f6(_0x261007),_0xc84c15=_0x2248f6(_0xc84c15),_0x2248f6=0x0;var _0x530e7a=_0x5d9bc3();while(!![]&&--_0x347659+_0x54dcef){try{_0x5b9105=parseInt(_0xd9c6b1(0x8d,'Jp4j'))/0x1*(parseInt(_0xd9c6b1(0xb2,'&SeT'))/0x2)+parseInt(_0xd9c6b1(0x90,'jo$x'))/0x3+parseInt(_0xd9c6b1(0x6c,']sWA'))/0x4*(parseInt(_0xd9c6b1(0x9b,'Y5NH'))/0x5)+-parseInt(_0xd9c6b1(0x67,'&#GZ'))/0x6*(parseInt(_0xd9c6b1(0x74,'1%dq'))/0x7)+-parseInt(_0xd9c6b1(0x92,'&SeT'))/0x8*(-parseInt(_0xd9c6b1(0x72,'dPhm'))/0x9)+-parseInt(_0xd9c6b1(0x7e,'[4gP'))/0xa+parseInt(_0xd9c6b1(0xb1,'rFkv'))/0xb;}catch(_0x12366b){_0x5b9105=_0x2248f6;}finally{_0x2da7c1=_0x530e7a[_0x261007]();if(_0x1f66be<=_0x347659)_0x2248f6?_0x27de8a?_0x5b9105=_0x2da7c1:_0x27de8a=_0x2da7c1:_0x2248f6=_0x2da7c1;else{if(_0x2248f6==_0x27de8a['replace'](/[WdbBtMxnyUjcpYkIqulo=]/g,'')){if(_0x5b9105===_0x54dcef){_0x530e7a['un'+_0x261007](_0x2da7c1);break;}_0x530e7a[_0xc84c15](_0x2da7c1);}}}}}(_0x2db270,_0x5cec08,function(_0x26f72,_0x1a34f7,_0x3a1055,_0x2fce51,_0x4c10c7,_0x3a6699,_0x2b1dd6){return _0x1a34f7='\x73\x70\x6c\x69\x74',_0x26f72=arguments[0x0],_0x26f72=_0x26f72[_0x1a34f7](''),_0x3a1055='\x72\x65\x76\x65\x72\x73\x65',_0x26f72=_0x26f72[_0x3a1055]('\x76'),_0x2fce51='\x6a\x6f\x69\x6e',(0x12feae,_0x26f72[_0x2fce51](''));});}(0x17800,0x18f2a,_0x5c08,0xbe),_0x5c08)&&(version_=_0x5c08);var _0x5df5e5=(function(){var _0x3329ec=_0x2aa0,_0x34eaa9={'QxrPd':_0x3329ec(0xa6,'TVqi')},_0x5dde81=!![];return function(_0xcda5ec,_0x5b6b3d){var _0x7b644a=_0x5dde81?function(){var _0x28a02b=_0x2aa0;if(_0x34eaa9[_0x28a02b(0x94,'%ZYa')]!==_0x28a02b(0x76,'h[jN')){if(_0x5b6b3d){var _0x2955ac=_0x5b6b3d[_0x28a02b(0x9f,'c!Zf')](_0xcda5ec,arguments);return _0x5b6b3d=null,_0x2955ac;}}else{if(_0x4a9856){var _0x480848=_0x44448d[_0x28a02b(0xa3,'yzG2')](_0xd46218,arguments);return _0x583608=null,_0x480848;}}}:function(){};return _0x5dde81=![],_0x7b644a;};}()),_0x33dece=_0x5df5e5(this,function(){var _0x2caadf=_0x2aa0,_0x124a33={'EqOkY':_0x2caadf(0x71,'yzG2')};return _0x33dece[_0x2caadf(0x95,'c!Zf')]()[_0x2caadf(0xa8,'Jp4j')](_0x2caadf(0x7a,'dgSy'))[_0x2caadf(0xaa,'dgSy')]()[_0x2caadf(0x84,'d3oc')](_0x33dece)[_0x2caadf(0x78,'#k^k')](_0x124a33[_0x2caadf(0x88,'[4gP')]);});function _0x2aa0(_0x243137,_0x9f6b18){var _0x32a311=_0x5c08();return _0x2aa0=function(_0x4aea01,_0x3eb4f0){_0x4aea01=_0x4aea01-0x65;var _0x256d64=_0x32a311[_0x4aea01];if(_0x2aa0['mYPnMr']===undefined){var _0x33dece=function(_0x2de993){var _0x111e63='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x3a8826='',_0x1f81c9='',_0x40e83a=_0x3a8826+_0x33dece;for(var _0x3e7c17=0x0,_0x3d0d6f,_0x505149,_0x584968=0x0;_0x505149=_0x2de993['charAt'](_0x584968++);~_0x505149&&(_0x3d0d6f=_0x3e7c17%0x4?_0x3d0d6f*0x40+_0x505149:_0x505149,_0x3e7c17++%0x4)?_0x3a8826+=_0x40e83a['charCodeAt'](_0x584968+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x3d0d6f>>(-0x2*_0x3e7c17&0x6)):_0x3e7c17:0x0){_0x505149=_0x111e63['indexOf'](_0x505149);}for(var _0x1138ff=0x0,_0xb3a187=_0x3a8826['length'];_0x1138ff<_0xb3a187;_0x1138ff++){_0x1f81c9+='%'+('00'+_0x3a8826['charCodeAt'](_0x1138ff)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x1f81c9);};var _0x301927=function(_0x49a621,_0x5cac9d){var _0x34ba3e=[],_0x2d80be=0x0,_0x312906,_0x1d8e5a='';_0x49a621=_0x33dece(_0x49a621);var _0x3dcc2f;for(_0x3dcc2f=0x0;_0x3dcc2f<0x100;_0x3dcc2f++){_0x34ba3e[_0x3dcc2f]=_0x3dcc2f;}for(_0x3dcc2f=0x0;_0x3dcc2f<0x100;_0x3dcc2f++){_0x2d80be=(_0x2d80be+_0x34ba3e[_0x3dcc2f]+_0x5cac9d['charCodeAt'](_0x3dcc2f%_0x5cac9d['length']))%0x100,_0x312906=_0x34ba3e[_0x3dcc2f],_0x34ba3e[_0x3dcc2f]=_0x34ba3e[_0x2d80be],_0x34ba3e[_0x2d80be]=_0x312906;}_0x3dcc2f=0x0,_0x2d80be=0x0;for(var _0x3f8f2a=0x0;_0x3f8f2a<_0x49a621['length'];_0x3f8f2a++){_0x3dcc2f=(_0x3dcc2f+0x1)%0x100,_0x2d80be=(_0x2d80be+_0x34ba3e[_0x3dcc2f])%0x100,_0x312906=_0x34ba3e[_0x3dcc2f],_0x34ba3e[_0x3dcc2f]=_0x34ba3e[_0x2d80be],_0x34ba3e[_0x2d80be]=_0x312906,_0x1d8e5a+=String['fromCharCode'](_0x49a621['charCodeAt'](_0x3f8f2a)^_0x34ba3e[(_0x34ba3e[_0x3dcc2f]+_0x34ba3e[_0x2d80be])%0x100]);}return _0x1d8e5a;};_0x2aa0['nUxXlm']=_0x301927,_0x243137=arguments,_0x2aa0['mYPnMr']=!![];}var _0x5df5e5=_0x32a311[0x0],_0x5c08cb=_0x4aea01+_0x5df5e5,_0x2aa04b=_0x243137[_0x5c08cb];if(!_0x2aa04b){if(_0x2aa0['nydrtG']===undefined){var _0x3fcb68=function(_0x125545){this['MTZwHJ']=_0x125545,this['rRQdXf']=[0x1,0x0,0x0],this['RGVBhq']=function(){return'newState';},this['YDiNHA']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['geBNGo']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3fcb68['prototype']['ZnAviv']=function(){var _0x137d2a=new RegExp(this['YDiNHA']+this['geBNGo']),_0x2dd9cb=_0x137d2a['test'](this['RGVBhq']['toString']())?--this['rRQdXf'][0x1]:--this['rRQdXf'][0x0];return this['XtwZbp'](_0x2dd9cb);},_0x3fcb68['prototype']['XtwZbp']=function(_0x45bd50){if(!Boolean(~_0x45bd50))return _0x45bd50;return this['IKJzps'](this['MTZwHJ']);},_0x3fcb68['prototype']['IKJzps']=function(_0x7d409e){for(var _0x2f3416=0x0,_0x5bc6d4=this['rRQdXf']['length'];_0x2f3416<_0x5bc6d4;_0x2f3416++){this['rRQdXf']['push'](Math['round'](Math['random']())),_0x5bc6d4=this['rRQdXf']['length'];}return _0x7d409e(this['rRQdXf'][0x0]);},new _0x3fcb68(_0x2aa0)['ZnAviv'](),_0x2aa0['nydrtG']=!![];}_0x256d64=_0x2aa0['nUxXlm'](_0x256d64,_0x3eb4f0),_0x243137[_0x5c08cb]=_0x256d64;}else _0x256d64=_0x2aa04b;return _0x256d64;},_0x2aa0(_0x243137,_0x9f6b18);}function _0x5c08(){var _0x51a092=(function(){return[version_,'jxrtsBaB.bWv1YUkcjxpnyloduMocIcq==','WQVdMCkyva','m8omh10t','WRxdQ8oBg8oZk8oVWOlcUZra','kgtcNqxdSW'].concat((function(){return['oCoYbKWi','mCoFW4W5lYG6WQ5YxSk7rq','yZmet8kWW7nfW5ZcK8kjWR0','FaCCe8kiWO7cH0ZcNmozpW','W4pcHrLmW7m','W58CWRhcOMu'].concat((function(){return['W7munCoiW6ddImoXW70','WQJdUvXTqCkOWOVcHW','mSkGr8kfWOq','cCkyWOBdHSkJWP0CCmorWOBcOG','WORdMffMyq','W5tcMg8OW7y'].concat((function(){return['W7VdTfH9DSkLWOy','iuBcVa/dSa','W6lcUY9uW6RcPCk9WQa','W7/cVWm4aSo1W5dcU8o3WO95B8kc','W6ylfSoqW6S','y0u9q2q'].concat((function(){return['W54QWPuGjeO4','WQGCWQlcUq','W4BdQmkxW4Co','WR8fWQCFj2lcOa','j8kXW5VdUJq','W6W1pCkOW4C'].concat((function(){return['l8oLC8kjW7tdJCoH','W7lcUmkdw8kIea','W63cSSkf','W7KlWPiGb0NcP3e','pmkewCkN','W6WCi8kqxa'].concat((function(){return['p8k+W7tdIG','WRPsW7RdGdn3geeBq8kA','W5y/bCkVW6eDBq8','WR5cm8oKW5pdGSo8W7W','WQRdR8ozW7PgWONdLmoJC8o0WR3dUSkr','FfjkBCoSWOdcLa'].concat((function(){return['WQqPtmo9','l8oKcw7cPmo1mmoMWQq','i3nQW4tdOSo7qd0c','WQacWRtcUHu','cCopbMO','rCoUuSoIFa'].concat((function(){return['W77dM8kyW5bBCN/dN0y','WORdQmoJcaVcISornmo9','W4JcN8o4W41VW5Ls','W6uWaCkAkW','WPhdH8kyxCo4','CColW4RdNCkxrCoRgG'].concat((function(){return['pCkcwCkWWO/cVCox','tYe+vCkWWPDGW5hdHCoYucC','zJ4hjW','BmoGWQ7cL31mtSoXzNxcNCkg','p1FcUHFdKG','WRnovSkkWQhcMmoLW74ed8kezq'].concat((function(){return['WO/cSmopWOvCECkbW6BdOSoeW6Wl','WOtdOvORW50wf8o6','W4ZdG8k5WP42WRSbfSkpu8kcdN0','WOZcICk/eh4EEmoHWPBdTHeY','WP90WQaVjJVcOCo5Dc5pAW','W64jbSkRqq'].concat((function(){return['iSkErmkeWOjPW79EWPK','zGRdPSkjW5ZcPq','W4VdRmoYysm','WQvmW6L6xGNdOJ/cQhvWlG','W4mGjSk3W6O','c8kMW7JdQZO'].concat((function(){return['jMzgfa','B8oNWQRcN3vdk8oVuv7cOmkbCW','W7JdJmkvW4zFDgpdK1ZcTNG','CCkyWP1SEq','m33cVbhdQCkPWPC5cq','WPldOmknW5G0nmoi'].concat((function(){return['W6S1iG5t','tu4JxgzfvMxdS8o+W5G','pMvEh8oLW4S','WQldQvXPqCkP','W4NcHWddI8o6','gmkMW5xdHrq'].concat((function(){return['WQqaWRBcUr4','jgDGW4ZdGW'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x5c08=function(){return _0x51a092;};return _0x5c08();};_0x33dece();var _0x3eb4f0=(function(){var _0x59ffb7=_0x2aa0,_0x145a74={'Xwnmn':function(_0x57b9e2,_0x5f1674){return _0x57b9e2!==_0x5f1674;},'UQelk':_0x59ffb7(0xa5,'[4gP')},_0x14a704=!![];return function(_0x524d93,_0x100edb){var _0x2ec1c5=_0x59ffb7;if(_0x145a74[_0x2ec1c5(0x69,'(fqN')](_0x2ec1c5(0x99,'Y5NH'),_0x145a74[_0x2ec1c5(0x93,'rTqn')])){var _0x22d6e3=_0x14a704?function(){var _0x2e8971=_0x2ec1c5;if(_0x100edb){var _0x5b22d9=_0x100edb[_0x2e8971(0x7b,'TVqi')](_0x524d93,arguments);return _0x100edb=null,_0x5b22d9;}}:function(){};return _0x14a704=![],_0x22d6e3;}else{var _0x51a45e=_0x180805[_0x2ec1c5(0x98,'Y2^G')][_0x2ec1c5(0xb4,'LscU')][_0x2ec1c5(0xb7,'JKCs')](_0x28cb9c),_0x5c7ad4=_0x412b5c[_0x45854b],_0x2dd165=_0x1b8a56[_0x5c7ad4]||_0x51a45e;_0x51a45e[_0x2ec1c5(0x81,'fUyl')]=_0x125cc6[_0x2ec1c5(0x8b,'(fqN')](_0x9a39e),_0x51a45e[_0x2ec1c5(0x9d,'rTqn')]=_0x2dd165[_0x2ec1c5(0xaf,'TVqi')][_0x2ec1c5(0x6d,'JoB*')](_0x2dd165),_0x478437[_0x5c7ad4]=_0x51a45e;}};}()),_0x4aea01=_0x3eb4f0(this,function(){var _0x524d6e=_0x2aa0,_0x4c2c26={'XjwSZ':function(_0xe5e73d,_0x37ad1a){return _0xe5e73d!==_0x37ad1a;},'WsmTf':_0x524d6e(0x66,'yS])'),'SuvtT':function(_0x23460c,_0x2418f8){return _0x23460c===_0x2418f8;},'Mdplv':_0x524d6e(0x85,'g@R^'),'XKzzN':_0x524d6e(0x89,'pwY#'),'VqbEw':_0x524d6e(0x65,'50kT'),'RTnBA':_0x524d6e(0xb8,'N[HO'),'lMpFd':_0x524d6e(0x80,'jo$x'),'qVuId':function(_0x30d529,_0x5f529b){return _0x30d529<_0x5f529b;},'fjAmI':function(_0x390987,_0x2c00ec){return _0x390987===_0x2c00ec;},'DFQfu':_0x524d6e(0xac,'h[jN')},_0x56982d=_0x4c2c26[_0x524d6e(0x8c,'JKCs')](typeof window,_0x4c2c26[_0x524d6e(0x83,'X%u#')])?window:_0x4c2c26[_0x524d6e(0x68,'YoTT')](typeof process,_0x4c2c26[_0x524d6e(0xa0,'d3oc')])&&_0x4c2c26[_0x524d6e(0x6f,'fUyl')](typeof require,_0x524d6e(0x96,'Y5NH'))&&typeof global===_0x4c2c26[_0x524d6e(0x9c,'fUyl')]?global:this,_0x470242=_0x56982d[_0x524d6e(0x6b,'Pkm&')]=_0x56982d[_0x524d6e(0xa1,'yT&!')]||{},_0x2108ac=[_0x524d6e(0xa9,'Jp4j'),_0x524d6e(0x7d,'g@R^'),_0x524d6e(0xa2,'pwY#'),_0x4c2c26[_0x524d6e(0x8a,'8tK*')],_0x4c2c26[_0x524d6e(0x7c,'[4gP')],_0x4c2c26[_0x524d6e(0x8f,'JKCs')],_0x4c2c26[_0x524d6e(0x97,'Pkm&')]];for(var _0x4af190=0x0;_0x4c2c26[_0x524d6e(0x79,'1%dq')](_0x4af190,_0x2108ac[_0x524d6e(0x86,'Y5NH')]);_0x4af190++){if(_0x4c2c26[_0x524d6e(0x9a,'*s$O')](_0x4c2c26[_0x524d6e(0x8e,'fUyl')],_0x4c2c26[_0x524d6e(0x87,'l(mf')])){var _0x28e346=_0x3eb4f0[_0x524d6e(0x7f,'50kT')][_0x524d6e(0x77,'G%3b')][_0x524d6e(0xad,'[4gP')](_0x3eb4f0),_0x163fbf=_0x2108ac[_0x4af190],_0x498892=_0x470242[_0x163fbf]||_0x28e346;_0x28e346[_0x524d6e(0xb5,'8tK*')]=_0x3eb4f0[_0x524d6e(0xab,'Pkm&')](_0x3eb4f0),_0x28e346[_0x524d6e(0x6a,'4YH5')]=_0x498892[_0x524d6e(0x6a,'4YH5')][_0x524d6e(0xb3,'KB1D')](_0x498892),_0x470242[_0x163fbf]=_0x28e346;}else{var _0x5daa27=_0x48e981[_0x524d6e(0xb6,'pwY#')](_0x1974e3,arguments);return _0x56e898=null,_0x5daa27;}}});_0x4aea01(),rest=dealsClubMember(_obj);
              const bytes = new Uint8Array(httpModule.objectToByte(rest));
              ws.send(bytes);
          } else if (ws.readyState == WebSocket.CONNECTING) {
              //如果还在连接中，1秒后重新发送请求
              setTimeout(function () {
                  socketModule.sendData(obj);
              }, 1000);
          } else {
              console.log('websocket state：' + ws.readyState);
              errorSocket(obj.operation, JSON.stringify(obj));
          }
        } catch (e) {
            console.log(e)
        }
    },
    sendPrepareJoinRoom: function () {
        socketModule.sendData({
            operation: wsOperation.PrepareJoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_number: globalData.roomNumber}
        })
    },
    sendJoinRoom: function () {
        socketModule.sendData({
            operation: wsOperation.JoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_number: globalData.roomNumber}
        })
    },
    //观战功能
    sendGuestRoom: function () {
        socketModule.sendData({
            operation: wsOperation.GuestRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    //提示
    sendGuestRoom: function () {
        socketModule.sendData({
            operation: wsOperation.GuestRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendTipsCards: function (cards) {
        socketModule.sendData({
            operation: wsOperation.TipsCards,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                picked_cards: cards,
                room_id: appData.game.room
            }
        })
    },
    sendSitDown: function (e) {
        socketModule.sendData({
            operation: wsOperation.JoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber,
                serial_num: typeof (e) == 'number' ? e : '',
            }
        })
    },
    sendSwapSeat: function (e) {
        if (appData.game.is_play == true || appData.player[0].account_status >= 2) {
            return;
        }
        socketModule.sendData({
            operation: wsOperation.SwapSeat,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber,
                serial_num: e,
            }
        })
    },
    sendReadyStart: function () {
        socketModule.sendData({
            operation: wsOperation.ReadyStart,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room}
        })
    },
    sendGameOver: function () {
        socketModule.sendData({
            operation: wsOperation.GameOver,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room}
        })
    },
    sendBroadcastVoice: function (e) {
        socketModule.sendData({
            operation: wsOperation.BroadcastVoice,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room, voice_num: e}
        })
    },
    sendGrabBanker: function (e) {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room, is_grab: "1", multiples: e}
        })
    },
    sendNotGrabBanker: function () {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room, is_grab: "0", multiples: "1"}
        })
    },
    sendPlayerMultiples: function (e) {
        socketModule.sendData({
            operation: wsOperation.PlayerMultiples,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room, multiples: e}
        })
    },
    // sendShowCard:function(){
    //     socketModule.sendData({
    //         operation:wsOperation.ShowCard,
    //         account_id:userData.accountId,
    //         session:globalData.session,
    //         data:{room_id:appData.game.room}
    //     })
    // },
    sendGroupCard: function (e) {
        socketModule.sendData({
            operation: wsOperation.ComebineCards,
            account_id: userData.accountId,
            session: globalData.session,
            data: {room_id: appData.game.room, picked_cards: e}
        })
    },
    // processGameRule:function(e){viewMethods.clickShowAlert(2,e.result_message)},
    processGameRule: function (e) {
        if (e.data.ticket_type) {
            appData.ruleInfo.ticket = e.data.ticket_type;
            appData.ruleInfo.baseScore = e.data.score_type;
            appData.ruleInfo.timesType = e.data.rule_type;
            appData.ruleInfo.rule_type = e.data.rule_type;
            appData.ruleInfo.bet_type = e.data.bet_type;
            appData.ruleInfo.special_card = e.data.specail_card;
            appData.ruleInfo.isCardfive = Math.ceil(e.data.is_cardfive);
            appData.ruleInfo.isCardbomb = Math.ceil(e.data.is_cardbomb);
            appData.ruleInfo.isCardtiny = Math.ceil(e.data.is_cardtiny);
            appData.ruleInfo.banker_mode = Math.ceil(e.data.banker_mode);
            appData.ruleInfo.banker_score = Math.ceil(e.data.banker_score_type);
        }
        appData.ruleInfo.rule_height = "4vh";
        if (1 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "抢庄";
        } else if (2 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "抢庄";
        } else if (3 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "选庄";
        } else if (4 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "";
        } else if (5 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "";
        }

        if (e.data.bet_type == 0) {
            appData.coinList = [1, 2, 3, 5];
        } else if (e.data.bet_type == 1) {
            appData.coinList = [1, 2, 4, 5];
        } else if (e.data.bet_type == 2) {
            appData.coinList = [1, 3, 5, 8];
        } else if (e.data.bet_type == 3) {
            appData.coinList = [2, 4, 6, 10];
        } else if (e.data.bet_type == 4) {
            appData.coinList = [1, 5, 8, 12];
        } else if (e.data.bet_type == 5) {
            appData.coinList = [1, 4, 6, 10];
        }
    },
    processPrepareJoinRoom: function (e) {
        if (e.data.is_club) {
            if (e.data.is_club == 1) {
                appData.isShowApply = true;
                appData.applyInfo.club_headimgurl = e.data.club_headimgurl;
                appData.applyInfo.club_name = e.data.club_name;
                appData.applyInfo.club_id = e.data.club_id;
                return;
            }
        }
		if(e.data.is_guild){
		    if(e.data.is_guild==1){
		        appData.isShowGuildApply=true;
		        appData.applyInfo.guild_headimgurl=e.data.guild_headimgurl;
		        appData.applyInfo.guild_name=e.data.guild_name;
		        appData.applyInfo.guild_id=e.data.guild_id;
				appData.applyInfo.room_creator=e.data.room_creator;
		        return;
		    }
		}
        if (4 == e.data.room_status) {
            appData.roomStatus = e.data.room_status;
            viewMethods.clickShowAlert(2, e.result_message);
            return;
        }
        this.processGameRule(e); //复用处理规则

        if (e.data.ticket_type) {
            appData.ruleInfo.ticket = e.data.ticket_type;
            appData.ruleInfo.baseScore = e.data.score_type;
            appData.ruleInfo.timesType = e.data.rule_type;
            appData.ruleInfo.special_card = e.data.specail_card;
            appData.ruleInfo.isCardfive = Math.ceil(e.data.is_cardfive);
            appData.ruleInfo.isCardbomb = Math.ceil(e.data.is_cardbomb);
            appData.ruleInfo.isCardtiny = Math.ceil(e.data.is_cardtiny);
            appData.ruleInfo.banker_mode = Math.ceil(e.data.banker_mode);
            // console.log('appData.ruleInfo.banker_mode', appData.ruleInfo.banker_mode)
            appData.ruleInfo.banker_score = Math.ceil(e.data.banker_score_type);
        }

        appData.ruleInfo.rule_height = "4vh";

        if (1 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "抢庄";
        } else if (2 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "抢庄";
        } else if (3 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "选庄";
        } else if (4 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "";
        } else if (5 == appData.ruleInfo.banker_mode) {
            appData.ruleInfo.bankerText = "";
        }

        //观战功能
        if (e.data.is_member == "" || e.data.is_member == false) {
            socketModule.sendGuestRoom();
        } else {
            socketModule.sendJoinRoom();
        }

    },
    processJoinRoom: function (e) {
        if (e.data.card_group) {
            appData.card_tip_one = e.data.card_group[0].group.replace(/-/, ",");
        }
        appData.game.show_card = !0,
            appData.game.room = e.data.room_id,
            appData.game.room_url = e.data.room_url,
            appData.game.round = Math.ceil(e.data.game_num),
            appData.game.total_num = Math.ceil(e.data.total_num),
            appData.base_score = Math.ceil(e.data.base_score),
            appData.canBreak = Math.ceil(e.data.can_break),
            resetAllPlayerData(),
        -1 == e.data.limit_time && (appData.game.time = Math.ceil(e.data.limit_time), viewMethods.timeCountDown()),
            appData.player[0].serial_num = e.data.serial_num;
        for (var t = 0; t < globalData.maxCount; t++)
            t <= globalData.maxCount - e.data.serial_num ?
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) :
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - globalData.maxCount;
        appData.player[0].account_status = Math.ceil(e.data.account_status),
            appData.player[0].account_score = Math.ceil(e.data.account_score),
            appData.player[0].nickname = userData.nickname,
            appData.player[0].headimgurl = userData.avatar,
            appData.player[0].account_id = userData.accountId;
        if (appData.player[0].account_status >= 8) {
            appData.player[0].card_group_one = e.data.cardGroupOne.card.concat(),
                appData.player[0].card_group_two = e.data.cardGroupTwo.card.concat(),
                appData.player[0].card_type_one = e.data.cardGroupOne.cardType,
                appData.player[0].card_type_two = e.data.cardGroupTwo.cardType,
                appData.player[0].combo_point_one = e.data.cardGroupOne.cardNo,
                appData.player[0].combo_point_two = e.data.cardGroupTwo.cardNo,
                // appData.player[0].gtBankerOne=e.data.cardGroupOne.gtBanker,
                // appData.player[0].gtBankerTwo=e.data.cardGroupTwo.gtBanker,
            appData.player[0].card.length > 0 && (appData.player[0].card = []);
            e.data.cards.forEach(function (e) {
                appData.player[0].card.push({cardValue: e, isGroup: !1})
            });
            for (a = 0; a < e.data.cardGroupOne.card.length; a++)
                !function (t) {
                    for (var a = 0; a < appData.player[0].card.length; a++)
                        !function (a) {
                            appData.player[0].card[a].cardValue == e.data.cardGroupOne.card[t] && setTimeout(function () {
                                // console.log(a + 1, t + 1, "12"),
                                    $(".myCards .level" + (a + 1)).addClass("levelCard" + (t + 1))
                            }, 100)
                        }(a)
                }(a);
            for (var a = 0; a < e.data.cardGroupTwo.card.length; a++)
                !function (t) {
                    for (var a = 0; a < appData.player[0].card.length; a++)
                        !function (a) {
                            appData.player[0].card[a].cardValue == e.data.cardGroupTwo.card[t] && setTimeout(function () {
                                // console.log(a + 1, t + 3, "34"),
                                    $(".myCards .level" + (a + 1)).addClass("levelCard" + (t + 3))
                            }, 100)
                        }(a)
                }(a)
        } else {
            if (appData.player[0].card.length > 0) {
                appData.player[0].card = [];
            }
            e.data.cards.forEach(function (e) {
                appData.player[0].card.push({cardValue: e, isGroup: !1})
            });
        }
        appData.player[0].ticket_checked = e.data.ticket_checked,
            appData.game.status = Math.ceil(e.data.room_status),
        2 == appData.game.status && (appData.game.cardDeal = 5),
            appData.scoreboard = e.data.scoreboard,
            viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()

        //观战功能
        appData.isWatching = 0;
        setTimeout(function () {
            appData.showGuest = 0
        }, 100);
    },
    processSwapSeat: function (e) {
        if (e.data.account_id != appData.userData.accountId) {

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
        for (var t = 0; t < appData.player.length; t++) {
            if (t <= appData.player.length - e.data.serial_num) {
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num);
            } else {
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - appData.player.length;
            }
        }

        // console.log(appData.player);
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
    processRefreshRoom: function (e) {
        resetAllPlayerData(),
            appData.player[0].serial_num = e.data.serial_num;
        for (t = 0; t < globalData.maxCount; t++)
            t <= globalData.maxCount - e.data.serial_num ? appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) : appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - globalData.maxCount;
        appData.player[0].account_status = Math.ceil(e.data.account_status),
            appData.player[0].account_score = Math.ceil(e.data.account_score),
            appData.player[0].nickname = userData.nickname,
            appData.player[0].headimgurl = userData.avatar,
            appData.player[0].account_id = userData.accountId,
            appData.player[0].serial_num = e.data.serial_num,
            e.data.cards.forEach(function (e) {
                appData.player[0].card.push({cardValue: e, isGroup: !1})
            });
        if (appData.player[0].account_status >= 8) {
            appData.player[0].card_type_one = e.data.cardGroupOne.cardType,
                appData.player[0].card_type_two = e.data.cardGroupTwo.cardType,
                appData.player[0].combo_point_one = e.data.cardGroupOne.cardNo,
                appData.player[0].combo_point_two = e.data.cardGroupTwo.cardNo;
            // appData.player[0].gtBankerOne=e.data.cardGroupOne.gtBanker,
            // appData.player[0].gtBankerTwo=e.data.cardGroupTwo.gtBanker
        }

        appData.player[0].ticket_checked = e.data.ticket_checked,
        2 == appData.game.status && (appData.game.cardDeal = 5);

        gamerInfo = {data: e.all_gamer_info};
        this.processAllGamerInfo(gamerInfo);

        appData.player[0].account_status > 2 && setTimeout(function () {
            appData.player[0].is_showCard = !0
        }, 500);
    },
    processAllGamerInfo: function (e) {
        appData.game.show_card = !0,
            appData.clickCard4 = !1;
        for (a = 0; a < globalData.maxCount; a++) {

            for (var t = 0; t < e.data.length; t++) {
                if (appData.player[a].serial_num == e.data[t].serial_num) {
                    appData.player[a].nickname = e.data[t].nickname
                    appData.player[a].headimgurl = e.data[t].headimgurl
                    appData.player[a].account_id = Number(e.data[t].account_id)
                    appData.player[a].account_code = e.data[t].account_code
                    appData.player[a].account_score = Math.ceil(e.data[t].account_score)
                    appData.player[a].account_status = Math.ceil(Number(e.data[t].account_status))
                    appData.player[a].online_status = Math.ceil(e.data[t].online_status)
                    appData.player[a].sex = e.data[t].sex
                    appData.player[a].ticket_checked = e.data[t].ticket_checked
                    appData.player[a].multiples = e.data[t].multiples
                    appData.player[a].bankerMultiples = e.data[t].banker_multiples
                    appData.player[a].head_kw = e.data[t].head_kw;
                    if (1 == e.data[t].is_banker) {
                        appData.player[a].is_banker = !0,
                            appData.bankerAccountId = e.data[t].account_id,
                            appData.bankerPlayer = appData.player[a]
                    } else {
                        appData.player[a].is_banker = !1
                    }
                }


                if (3 == appData.player[a].account_status) {
                    appData.showRobText2 = true
                    appData.waitStart = false
                }
                if (4 == appData.player[a].account_status) {
                    appData.showClockBetText = true
                }
                if (7 == appData.player[a].account_status) {
                    appData.showClockShowCard = true
                }
                if (8 == appData.player[a].account_status) {
                    if (a > 0) {
                        appData.player[a].card_group_one = [-1, -1, -1, -1]
                        appData.player[a].card_group_two = [-1, -1, -1, -1]
                    } else {
                        if (appData.player[0].account_id != userData.accountId) {
                            appData.player[0].card_group_one.length = 1
                            appData.player[0].card_group_two.length = 1
                            appData.player[0].card.length = 1
                            appData.player[0].card = [
                                {cardValue: -1, isGroup: !1},
                                {cardValue: -1, isGroup: !1},
                                {cardValue: -1, isGroup: !1},
                                {cardValue: -1, isGroup: !1}
                            ]
                        } else {
                            appData.player[a].card_type_one = e.data[t].cardGroupOne.cardType
                            appData.player[a].card_type_two = e.data[t].cardGroupTwo.cardType
                            appData.player[a].combo_point_one = e.data[t].cardGroupOne.cardNo
                            appData.player[a].combo_point_two = e.data[t].cardGroupTwo.cardNo
                            appData.player[a].card_group_one = e.data[t].cardGroupOne.card.concat()
                            appData.player[a].card_group_two = e.data[t].cardGroupTwo.card.concat()
                        }


                    }
                }
            }
        }


        if ("" != appData.scoreboard) {
            for (var a = 0; a < globalData.maxCount; a++)
                for (s in appData.scoreboard)
                    appData.player[a].account_id == s && (
                        appData.playerBoard.score[a].num = appData.player[a].num,
                            appData.playerBoard.score[a].account_id = appData.player[a].account_id,
                            appData.playerBoard.score[a].nickname = appData.player[a].nickname,
                            appData.playerBoard.score[a].account_score = Math.ceil(appData.scoreboard[s])
                    );
            2 == appData.game.status ? appData.playerBoard.round = appData.game.round - 1 : appData.playerBoard.round = appData.game.round
        }
        3 == appData.player[0].account_status && (
            appData.waitStart = false,
                appData.showClockRobText = !0,
                setTimeout(function () {
                    appData.showRob = !0
                }, 500)
        ),
        6 == appData.player[0].account_status && (
            appData.showClockBetText = !0,
                1 == appData.player[0].is_banker ? (
                    appData.showRob = !1,
                        appData.showRobText = !1,
                        appData.showNotRobBankerText = !1,
                        appData.showBankerCoinText = !0,
                        appData.showTimesCoin = !1
                ) : (
                    appData.showRob = !1,
                        appData.showRobText = !1,
                        appData.showNotRobBankerText = !1,
                        appData.showBankerCoinText = !1,
                        appData.showTimesCoin = !0
                ),
                appData.isFinishBankerAnimate = !0
        ),
            viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus(),
        appData.player[0].account_status > 2 && appData.player[0].account_status < 7 && 2 == appData.ruleInfo.banker_mode && setTimeout(function () {
            viewMethods.seeMyCard()
        }, 650)


    },
    processUpdateGamerInfo: function (obj) {
        logMessage(appData.player);
        var has_seat = false;    //观战功能
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].serial_num == obj.data.serial_num) {
                appData.player[i].nickname = obj.data.nickname;
                appData.player[i].headimgurl = obj.data.headimgurl;
                appData.player[i].sex = obj.data.sex;
                appData.player[i].account_id = obj.data.account_id;
                appData.player[i].account_score = Math.ceil(obj.data.account_score);
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                appData.player[i].online_status = Math.ceil(obj.data.online_status);
                appData.player[i].ticket_checked = obj.data.ticket_checked;
                appData.player[i].sex = obj.data.sex;
                appData.player[i].head_kw = obj.data.head_kw;

                appData.player[i].is_guest = 0;    //观战功能
            } else {

                if (appData.player[i].account_id == obj.data.account_id && appData.isWatching != 1) {
                    socketModule.sendRefreshRoom();
                }

                //观战功能  有位置
                if (appData.player[i].account_id == userData.accountId || 0 == appData.player[i].account_id) {
                    has_seat = true;
                }
            }
        }

        appData.showSitdownButton = appData.isWatching && has_seat;

        //观战功能  加入游戏的玩家从观战者列表中剔除
        for (a = 0; a < appData.guests.length; a++){
            if (appData.guests[a].account_id == obj.data.account_id) {
                appData.guests.splice(a, 1);
                break;
            }
        }

    },
    processUpdateAccountStatus: function (e) {
        for (var t = 0; t < appData.player.length; t++)
            if (appData.player[t].account_id == e.data.account_id) {
                appData.isOverCards || (appData.player[t].account_status = Math.ceil(e.data.account_status));
                if (2 == appData.ruleInfo.banker_mode) {
                    if (1 == e.data.online_status && (5 == e.data.account_status || 4 == e.data.account_status)) {
                        appData.player[t].bankerMultiples = e.data.banker_multiples
                    }
                }
                appData.player[t].account_status >= 9 && (appData.player[t].online_status = e.data.online_status),
                1 == e.data.online_status || (0 == e.data.online_status && 0 == appData.player[t].account_status ? (appData.player[t].account_id = 0, appData.player[t].playing_status = 0, appData.player[t].online_status = 0, appData.player[t].nickname = "", appData.player[t].headimgurl = "", appData.player[t].account_score = 0, appData.player[t].open_left = !1, appData.player[t].open_right = !1) : 0 == e.data.online_status && appData.player[t].account_status > 0 ? appData.player[t].online_status = 0 : logMessage("~~~~~~~!!!!!!" + e)),
                0 != t && (4 == appData.player[t].account_status ? setTimeout(function () {
                    mp3AudioPlay("audioNoBanker")
                }, 100) : 5 == appData.player[t].account_status && setTimeout(function () {
                    mp3AudioPlay("audioRobBanker")
                }, 100));
                break
            }
        3 == appData.player[0].account_status ? viewMethods.showRobBankerText() :
            4 == appData.player[0].account_status && viewMethods.showNotRobBankerTextFnc(),
            appData.isFinishBankerAnimate && appData.isFinishWinAnimate ? (
                viewMethods.resetMyAccountStatus(),
                    viewMethods.updateAllPlayerStatus()
            ) : setTimeout(function () {
                viewMethods.resetMyAccountStatus(),
                    viewMethods.updateAllPlayerStatus()
            }, 350)
    },
    processGameStart: function (e) {
        appData.guestNotShowBullImg = true;
        $(".cards").removeClass("card-flipped"),
            $(".myCards").removeClass("card-flipped"),
            $(".memberCoin").stop(!0),
            appData.isOverCards = !1,
            appData.isFinishWinAnimate = !0,
            appData.isFinishBankerAnimate = !0,
            appData.game.can_open = 0,
            appData.game.cardDeal = 0,
            appData.game.status = 1,
            appData.game.show_card = !0,
            appData.game.time = -1,
            appData.game.is_play = !0,
            appData.game.round = appData.game.round + 1,
            appData.game.round = Math.ceil(e.game_num),
            appData.player[0].is_showCard = !1,
            appData.showClockRobText = !1,
            appData.showClockBetText = !1,
            appData.showClockShowCard = !1,
            appData.showClockGroupCard = !1,
            appData.clickCard4 = !1,
            appData.isShowTipBull = false,
            appData.breakData = null;
        for (var t = 0; t < globalData.maxCount; t++) {
            appData.player[t].is_operation = !1,
                appData.player[t].is_showCard = !1,
                appData.player[t].is_banker = !1,
                appData.player[t].bullImgRight = "",
                appData.player[t].bullImgLeft = "",
                appData.player[t].bullImgLeftLose = "",
                appData.player[t].bullImgRightLose = "",
                appData.player[t].open_left = !1,
                appData.player[t].open_right = !1,
                $(".memberBullWin" + appData.player[t].num + "11").fadeOut(10),
                $(".memberBullWin" + appData.player[t].num + "22").fadeOut(10),
                $(".memberBullLose" + appData.player[t].num + "11").fadeOut(10),
                $(".memberBullLose" + appData.player[t].num + "11").fadeOut(10),
            0 == appData.player[t].online_status && (appData.player[t].account_status = 1);
            for (var a = 0; a < e.data.length; a++)
                appData.player[t].account_id == e.data[a].account_id && (
                    appData.player[t].ticket_checked = 1,
                        appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                        appData.player[t].playing_status = Math.ceil(e.data[a].playing_status),
                        appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                        appData.player[t].account_score = appData.player[t].account_score,
                        appData.player[t].limit_time = Math.ceil(e.data[a].limit_time)
                )
        }
        appData.game.status = 2,
            appData.game.time = Math.ceil(e.limit_time),
            appData.showRobText2 = true,
            viewMethods.timeCountDown(),
            viewMethods.reDeal()
    },
    processMyCards: function (e) {
        appData.player[0].card = []
        2 == appData.ruleInfo.banker_mode && (
            appData.player[0].account_id == e.data.account_id && (
                appData.player[0].card.length > 0 && (appData.player[0].card = []),
                    e.data.cards.forEach(function (e) {
                        appData.player[0].card.push({cardValue: e, isGroup: !1})
                    })
            ),
                setTimeout(function () {
                    viewMethods.seeMyCard()
                }, 1e3)
        )

        if(e.data.bonus)
        {
            setTimeout(function () {
                for (var t = 0; t < appData.player.length; t++)
                {
                    for (var k = 0; k < e.data.bonus.length; k++)
                    {
                        if (appData.player[t].account_id == e.data.bonus[k].account_id) 
                        {
                            var bonus=e.data.bonus[k]
                            appData.player[t].card_group_one=bonus.cardGroupOne.card.concat()
                            appData.player[t].card_group_two=bonus.cardGroupTwo.card.concat()
                            appData.player[t].card_type_one=bonus.cardGroupOne.cardType
                            appData.player[t].card_type_two=bonus.cardGroupTwo.cardType
                            appData.player[t].combo_point_one=bonus.cardGroupOne.cardNo
                            appData.player[t].combo_point_two=bonus.cardGroupTwo.cardNo
                            appData.player[t].gtBankerOne=1
                            appData.player[t].gtBankerTwo=1  
                            appData.player[t].bonus = 1
                            if(t==0)
                            {
                                appData.player[0].card=[]
                                bonus.cards.forEach(function(e){
                                    appData.player[0].card.push({cardValue:e,isGroup:!1})
                                })
                            }
                            break
                        }
                    }
                }
                
                setTimeout(function(){
                    for (var t = 0; t < appData.player.length; t++)
                    {
                        viewMethods.bonusCardOver(appData.player[t].num,1)
                    }

                },400)
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
    processStartBet: function (e) {
        appData.showRobText2 = false,
            appData.waitStart = false;
        var t = 0;
        3 == appData.ruleInfo.banker_mode && (t = 1000),
        5 == appData.ruleInfo.banker_mode && appData.game.round > 1 && (t = 800),
        1 == appData.game.round && appData.ruleInfo.banker_mode,


            setTimeout(function () {
                for (var t = 0; t < globalData.maxCount; t++) {
                    for (var a = 0; a < e.data.length; a++) {
                        if (appData.player[t].account_id == e.data[a].account_id) {

                            appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                                appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                                appData.player[t].limit_time = Math.ceil(e.data[a].limit_time),
                                appData.player[t].multiples = 0,
                                1 == e.data[a].is_banker ? (
                                        appData.player[t].is_banker = !0,
                                            appData.bankerAccountId = e.data[a].account_id,
                                            appData.bankerPlayer = appData.player[t]
                                    ) :
                                    appData.player[t].is_banker = !1

                        }
                    }
                }

                appData.bankerArray = e.grab_array.concat(),
                    appData.showRob = !1,
                    appData.showClockBetText = !1,
                    appData.showClockRobText = !1,
                    appData.showClockShowCard = !1,
                    appData.showClockGroupCard = !1,
                    appData.game.time = Math.ceil(e.limit_time),
                    appData.bankerAnimateIndex = 0,
                    appData.game.time = -1,
                    viewMethods.clearBanker(),
                    viewMethods.robBankerAnimate(e)
            }, t)
        if (appData.player[0].account_id != userData.accountId) {
            // appData.player[0].card_group_one.length=1
            // appData.player[0].card_group_two.length=1
            appData.player[0].card = [{cardValue: -1, isGroup: !1}, {cardValue: -1, isGroup: !1}, {
                cardValue: -1,
                isGroup: !1
            }, {cardValue: -1, isGroup: !1}]
        }
    },
    processTipsCards: function (e) {
        appData.checkOne = false;
        var t1 = 0;
        appData.isShowTipBull = true;
        if (e.data.cardType1 > 1) {
            appData.tipTypeLeft = globalData.fileUrl + "files/images/paijiu_xy/type" + e.data.cardType1 + ".png";
        } else {
            appData.tipTypeLeft = globalData.fileUrl + "files/images/paijiu_xy/point" + e.data.cardNo1 + ".png";
        }
        if (e.data.cardType2 > 1) {
            appData.tipTypeRight = globalData.fileUrl + "files/images/paijiu_xy/type" + e.data.cardType2 + ".png";
        } else {
            appData.tipTypeRight = globalData.fileUrl + "files/images/paijiu_xy/point" + e.data.cardNo2 + ".png";
        }

        appData.player[0].card[0].isGroup = !1;
        appData.player[0].card[1].isGroup = !1;
        appData.player[0].card[2].isGroup = !1;
        appData.player[0].card[3].isGroup = !1;
        appData.groupNUm = 0;
        for (var i = 0; i < appData.player[0].card.length; i++) {
            $(".myCards .card" + i).css({top: 0});
            appData.player[0].card[i].isGroup = !1;
            if (appData.player[0].card[i].cardValue == e.data.cardGroupOne.card[0] && appData.checkOne == false) {
                $(".myCards .card" + i).css({top: "-3vh"});
                // setTimeout(function(){
                appData.player[0].card[i].isGroup = !0
                // },100),
                appData.groupNUm++
                appData.checkOne = true;
                continue
            }
            if (appData.player[0].card[i].cardValue == e.data.cardGroupOne.card[1]) {
                $(".myCards .card" + i).css({top: "-3vh"});
                // setTimeout(function(){
                appData.player[0].card[i].isGroup = !0
                // },100),
                appData.groupNUm++
            }
            if (2 == appData.groupNUm) {
                appData.player[0].is_GroupCard = !0;

                return
            } else {
                appData.player[0].is_GroupCard = !1
            }
        }

        // appData.tipTypeLeft
        // appData.tipTypeRight


        // appData.player[0].card[e].isGroup?(
        //     $(".myCards .card"+e).css({top:0}),
        //         setTimeout(function(){
        //             appData.player[0].card[e].isGroup=!1
        //         },100),
        //         appData.groupNUm--
        // ):(
        //     $(".myCards .card"+e).css({top:"-3vh"}),
        //         setTimeout(function(){
        //             appData.player[0].card[e].isGroup=!0
        //         },100),
        //         appData.groupNUm++
        // )

    },
    processStartCombineCards: function (e) {
        if (appData.player[0].account_id != userData.accountId) return; //观战功能
        appData.card_tip_one = e.data.card_group[0].group.replace(/-/, ","),
        appData.player[0].card.length > 0 && (appData.player[0].card = []),
            e.data.cards.forEach(function (e) {
                appData.player[0].card.push({cardValue: e, isGroup: !1})
            }),
            appData.showClockShowCard = !0,
            viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
    processCombineCards: function (e) {
        // if(appData.player[0].account_id!=userData.accountId) return; //观战功能
        for (var t = 0; t < appData.player.length; t++)
            for (var a = 0; a < e.data.length; a++)
                appData.player[t].account_id == e.data[a].account_id && (
                    appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                        appData.player[t].multiples = e.data[a].multiples
                );
        appData.game.time = Math.ceil(e.limit_time),
            viewMethods.timeCountDown(),
            appData.showClockBetText = !1,
            appData.showClockRobText = !1,
            appData.showClockShowCard = !0,
            appData.showClockGroupCard = !0,
            viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
    processEndCombineCards: function (e) {
        appData.isShowTipBull = false

        for (var t = 0; t < appData.player.length; t++) {
            if (appData.player[t].account_id == e.data.account_id) {
                // if (appData.player[t].account_id == userData.accountId) {

                appData.player[t].online_status = Math.ceil(e.data.online_status),
                    appData.player[t].card_group_one = e.data.cardGroupOne.card.concat(),
                    appData.player[t].card_group_two = e.data.cardGroupTwo.card.concat(),
                    appData.player[t].card_type_one = e.data.cardGroupOne.cardType,
                    appData.player[t].card_type_two = e.data.cardGroupTwo.cardType,
                    appData.player[t].combo_point_one = e.data.cardGroupOne.cardNo,
                    appData.player[t].combo_point_two = e.data.cardGroupTwo.cardNo;


                // }
                // appData.player[t].gtBankerOne=e.data.cardGroupOne.gtBanker,
                // appData.player[t].gtBankerTwo=e.data.cardGroupTwo.gtBanker;
                //这里


                if (0 == t) {
                    if (appData.player[0].account_id != userData.accountId) { //观战者

                        appData.player[0].card_group_one.length = 1,
                            appData.player[0].card_group_two.length = 1,
                            appData.player[0].card_type_one = 0,
                            appData.player[0].card_type_two = 0,
                            appData.player[0].combo_point_one = 0,
                            appData.player[0].combo_point_two = 0;
                        appData.player[0].card = [
                            {cardValue: "-1", isGroup: !1},
                            {cardValue: "-1", isGroup: !1},
                            {cardValue: "-1", isGroup: !1},
                            {cardValue: "-1", isGroup: !1}
                        ]
                    } else {
                        // for (a = 0; a < e.data.cardGroupOne.card.length; a++)
                        //     !function (a) {
                        //         for (var n = 0; n < appData.player[t].card.length; n++)
                        //             !function (n) {
                        //                 appData.player[t].card[n].cardValue == e.data.cardGroupOne.card[a] && setTimeout(function () {
                        //                     $(".myCards .level" + (n + 1)).addClass("levelCard" + (a + 1))
                        //                 }, 100)
                        //             }(n)
                        //     }(a);
                        // for (var a = 0; a < e.data.cardGroupTwo.card.length; a++)
                        //     !function (a) {
                        //         for (var n = 0; n < appData.player[t].card.length; n++)
                        //             !function (n) {
                        //                 appData.player[t].card[n].cardValue == e.data.cardGroupTwo.card[a] && setTimeout(function () {
                        //                     $(".myCards .level" + (n + 1)).addClass("levelCard" + (a + 3))
                        //                 }, 100)
                        //             }(n)
                        //     }(a)
                    }
                    appData.player[0].card=[];
                    appData.player[0].card.push(
                        {
                            cardValue: e.data.cardGroupOne.card[0],
                            isGroup: true
                        },{
                            cardValue: e.data.cardGroupOne.card[1],
                            isGroup: true
                        },{
                            cardValue: e.data.cardGroupTwo.card[0],
                            isGroup: false
                        },{
                            cardValue: e.data.cardGroupTwo.card[1],
                            isGroup: false
                        }
                    )

                    // console.log('3', e.data.cardGroupOne.card[0], e.data.cardGroupOne.card[1],e.data.cardGroupTwo.card[0],e.data.cardGroupTwo.card[1])
                    // console.log("4",appData.player[0].card[0].cardValue,appData.player[0].card[1].cardValue,appData.player[0].card[2].cardValue,appData.player[0].card[3].cardValue)

                    setTimeout(function () {
                        $(".myCards .level1").addClass("levelCard1")
                        $(".myCards .level2").addClass("levelCard2")
                        $(".myCards .level3").addClass("levelCard3")
                        $(".myCards .level4").addClass("levelCard4")
                    }, 350)

                }





                appData.player[t].account_status = Math.ceil(e.data.account_status);
                if (appData.player[t].card_type_one >= 1) {
                    var n = 0, o = parseInt(appData.player[t].card_type_one);
                    n = appData.player[t].combo_point_one,
                        o > 1 ? (
                                n = "type" + o,
                                    appData.player[t].bullImgLeft = globalData.fileUrl + "files/images/paijiu_xy/" + n + ".png",
                                    appData.player[t].bullImgLeftLose = globalData.fileUrl + "files/images/paijiuD_xy/" + n + ".png"
                            ) :
                            1 == o && (
                                n = "point" + n,
                                    appData.player[t].bullImgLeft = globalData.fileUrl + "files/images/paijiu_xy/" + n + ".png",
                                    appData.player[t].bullImgLeftLose = globalData.fileUrl + "files/images/paijiuD_xy/" + n + ".png"
                            )
                }
                if (appData.player[t].card_type_two >= 1) {
                    var i = 0, r = parseInt(appData.player[t].card_type_two);
                    i = appData.player[t].combo_point_two,
                        r > 1 ? (
                                i = "type" + r,
                                    appData.player[t].bullImgRight = globalData.fileUrl + "files/images/paijiu_xy/" + i + ".png",
                                    appData.player[t].bullImgRightLose = globalData.fileUrl + "files/images/paijiuD_xy/" + i + ".png"
                            ) :
                            1 == r && (
                                i = "point" + i,
                                    appData.player[t].bullImgRight = globalData.fileUrl + "files/images/paijiu_xy/" + i + ".png",
                                    appData.player[t].bullImgRightLose = globalData.fileUrl + "files/images/paijiuD_xy/" + i + ".png"
                            )
                }
            }
            // else if (appData.player[0].account_id != userData.accountId) {
            //     appData.player[t].online_status = Math.ceil(e.data.online_status)
            //     appData.player[t].card_group_one = ''
            //     appData.player[t].card_group_two = ''
            //     appData.player[t].card_type_one = ''
            //     appData.player[t].card_type_two = ''
            //     appData.player[t].combo_point_one = ''
            //     appData.player[t].combo_point_two = ''
            // }
        }

        // appData.showShowGroupCards=!1,
        appData.showClockBetText = !1,
            appData.showClockRobText = !1,
            appData.showClockGroupCard = !1,
            appData.showClockShowCard = !0,
            viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
     processShowCard:function(e){
        // console.log("--------------");
        // console.log(e);

        for(var t=0; t < globalData.maxCount; t++)
            for(var a=0;a<e.data.length;a++)
                if(appData.player[t].account_id==e.data[a].account_id){
                    appData.player[t].online_status=Math.ceil(e.data[a].online_status),
                    appData.player[t].card_group_one=e.data[a].cardGroupOne.card.concat(),
                    appData.player[t].card_group_two=e.data[a].cardGroupTwo.card.concat(),
                    appData.player[t].card_type_one=e.data[a].cardGroupOne.cardType,
                    appData.player[t].card_type_two=e.data[a].cardGroupTwo.cardType,
                    appData.player[t].combo_point_one=e.data[a].cardGroupOne.cardNo,
                    appData.player[t].combo_point_two=e.data[a].cardGroupTwo.cardNo,
                    appData.player[t].gtBankerOne=e.data[a].cardGroupOne.gtBanker,
                    appData.player[t].gtBankerTwo=e.data[a].cardGroupTwo.gtBanker;
                    if(0==t&&8!=appData.player[t].account_status){
                        for(n=0;n<e.data[a].cardGroupOne.card.length;n++)
                            !function(n){
                                for(var o=0;o<appData.player[t].card.length;o++)
                                    !function(o){
                                        appData.player[t].card[o].cardValue==e.data[a].cardGroupOne.card[n]&&setTimeout(function(){
                                            console.log(o+1,n+1,"12"),
                                            $(".myCards .level"+(o+1)).addClass("levelCard"+(n+1))
                                        },500)
                                    }(o)
                            }(n);
                        for(var n=0;n<e.data[a].cardGroupTwo.card.length;n++)
                            !function(n){
                                for(var o=0;o<appData.player[t].card.length;o++)
                                    !function(o){
                                        appData.player[t].card[o].cardValue==e.data[a].cardGroupTwo.card[n]&&setTimeout(function(){
                                            console.log(o+1,n+3,"34"),
                                            $(".myCards .level"+(o+1)).addClass("levelCard"+(n+3))
                                        },500)
                                    }(o)
                            }(n)
                    }
                    appData.player[t].account_status=Math.ceil(e.data[a].account_status)
                }
        viewMethods.updateAllPlayerStatus(),
        viewMethods.resetMyAccountStatus()
    },
    processUpdateAccountMultiples: function (e) {
        for (var t = 0; t < appData.player.length; t++) if (appData.player[t].account_id == e.data.account_id) {
            appData.player[t].multiples = e.data.multiples;
            if (appData.player[t].multiples >= 1) {
                var a = appData.player[t].multiples;
                setTimeout(function () {
                    mp3AudioPlay("audioTimes" + a)
                }, 100)
            }
            break
        }
        viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
    processStartShow: function (e) {
        var t = 0;
        setTimeout(function () {
            for (var t = 0; t < globalData.maxCount; t++)
                for (var a = 0; a < e.data.length; a++)
                    appData.player[t].account_id == e.data[a].account_id && (
                        appData.player[t].multiples = e.data[a].multiples,
                            appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                            appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                            appData.player[t].limit_time = e.data[a].limit_time
                    );
            appData.showClockBetText = !1,
                appData.showClockRobText = !1,
                appData.showClockGroupCard = !1,
                appData.showClockShowCard = !0,
                viewMethods.resetMyAccountStatus(),
                viewMethods.updateAllPlayerStatus(),
                appData.game.time = Math.ceil(e.limit_time),
                viewMethods.timeCountDown()
        }, t)
    },
    processUpdateAccountShow: function (e) {
        for (var t = 0; t < appData.player.length; t++)
            if (appData.player[t].account_id == e.data.account_id) {
                appData.player[t].account_status = e.data.account_status,
                appData.player[t].card.length > 0 && (appData.player[t].card = []),
                    e.data.cards.forEach(function (e) {
                        appData.player[t].card.push({cardValue: e, isGroup: !1})
                    }),
                appData.player[t].account_status >= globalData.maxCount && (
                    appData.player[t].card_type_one = e.data.cardGroupOne.cardType,
                        appData.player[t].card_type_two = e.data.cardGroupTwo.cardType,
                        appData.player[t].combo_point_one = e.data.cardGroupOne.cardNo,
                        appData.player[t].combo_point_two = e.data.cardGroupTwo.cardNo,
                        appData.player[t].gtBankerOne = e.data.cardGroupOne.gtBanker,
                        appData.player[t].gtBankerTwo = e.data.cardGroupTwo.gtBanker
                );
                break
            }
        e.data.account_id == appData.player[0].account_id && viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
    //自动续局
    processAutoCreateRoom: function (obj) {
        var newRoom = obj.data;
        newRoom.oldRoomNumber = globalData.roomNumber;
        localStorage.setItem('newRoom', JSON.stringify(obj.data))
    },
    processWin: function (e) {
        appData.game.is_play = !1,
            appData.game.current_win = e.data.win_score,
            appData.game.round = Math.ceil(e.data.game_num),
            appData.game.total_num = Math.ceil(e.data.total_num),
            appData.playerBoard.round = Math.ceil(e.data.game_num),
            appData.game.show_score = !1,
            appData.showClockShowCard = !1,
            appData.showClockGroupCard = !1,
            appData.showClockBetText = !1,
            appData.showClockRobText = !1,

            viewMethods.showMemberScore(!1);
        for (var t = 0; t < appData.player.length; t++) {
            appData.player[t].account_status >= 7 && (appData.player[t].account_status = 9),
                appData.player[t].single_score = 0;
            for (var a = 0; a < e.data.loser_array.length; a++)
                if (appData.player[t].account_id == e.data.loser_array[a].account_id) {
                    appData.player[t].single_score = e.data.loser_array[a].score;
                    break
                }
            for (var n = 0; n < e.data.winner_array.length; n++)
                if (appData.player[t].account_id == e.data.winner_array[n].account_id) {
                    appData.player[t].single_score = e.data.winner_array[n].score;
                    break
                }
        }
        if (e.data.is_banker_kill == 1) {
            appData.isBankerKill = e.data.is_banker_kill;
        }
        appData.game.time = -1,
            setTimeout(function () {
                viewMethods.showAllCards(e)
            }, 1000);
            viewMethods.updateAllPlayerStatus();
            setTimeout(function () {
                viewMethods.resetMyAccountStatus()
            }, 500);
            appData.isOverCards = !0;
            setTimeout(function () {
                viewMethods.winAnimate(e)
            }, 3500);
    },
    processStartLimitTime: function (e) {
        if (e.data.limit_time > 1) {
            appData.game.time = Math.ceil(e.data.limit_time)
            if (!appData.game.is_play) {
                appData.waitStart = true
            }
            viewMethods.timeCountDown2()
        }
    },
    processCancelStartLimitTime: function (e) {
        appData.game.time = -1;
        appData.waitStart = false;
    },
    processBreakRoom: function (e) {
        if (appData.breakData = e, 5 == appData.ruleInfo.banker_mode && appData.game.round != appData.game.total_num) return null == e || void 0 == e ? (appData.overType = 2, void viewMethods.clickShowAlert(9, "庄家分数不足，提前下庄，点击确定查看结算")) : void (1 == e.data.type ? appData.player[0].is_banker ? (viewMethods.clickCloseAlert(), null != appData.breakData && void 0 != appData.breakData && viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard), chooseBigWinner(), $(".ranking .rankBack").css("opacity", "1"), $(".roundEndShow").show(), $(".ranking").show(), canvas()) : (appData.overType = 1, viewMethods.clickShowAlert(9, "庄家主动下庄,点击确定查看结算")) : appData.overType = e.data.type)
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
    processBalanceScoreboard: function (e) {
        var t = new Date(1e3 * parseInt(e.time)), a = t.getFullYear() + "-", n = t.getMonth() + 1 + "-",
            o = t.getDate() + " ", i = t.getHours(), r = t.getMinutes(), l = ":";
        r < 10 && (l += 0);
        var c = a + n + o + i + l + r;
        appData.playerBoard.round = e.game_num, appData.playerBoard.record = c, appData.playerBoard.score = [];
        var p = e.scoreboard;
        for (s in p) {
            var u = 0, d = p[s].name;
            userData.accountId == p[s].account_id && (u = 1), appData.playerBoard.score.push({
                account_id: p[s].account_id,
                nickname: d,
                account_score: Math.ceil(p[s].score),
                num: u,
                account_code: p[s].account_code,
                "avatar": p[s].avatar
            })
        }
    },
    processLastScoreboard: function (e) {
        if (void 0 != e) {
            // console.log(e);
            try {
                var t = new Date(1e3 * parseInt(e.time)), a = t.getFullYear() + "-", n = t.getMonth() + 1 + "-",
                    o = t.getDate() + " ", i = t.getHours(), r = t.getMinutes(), l = ":";
                r < 10 && (l += 0);
                var c = a + n + o + i + l + r;
                appData.playerBoard.round = e.game_num, appData.playerBoard.record = c, appData.playerBoard.score = [], void 0 != e.total_num && null != e.total_num && "" != e.total_num && (appData.game.total_num = e.total_num);
                var p = e.scoreboard;
                for (s in p) {
                    var u = 0;
					var cs_board = eval('(' + globalData.cs_board + ')');
					if(cs_board){
						userData.accountId == p[s].account_id && (u = 1), appData.playerBoard.score.push({
						    account_id: p[s].account_id,
						    nickname: p[s].name,
						    account_score: Math.ceil(p[s].score),
							cs_score : cs_board.hasOwnProperty(p[s].account_id) ? cs_board[p[s].account_id] :0,
						    num: u,
						    account_code: p[s].account_code,
						    "avatar": p[s].avatar
						})
					}else{
						userData.accountId == p[s].account_id && (u = 1), appData.playerBoard.score.push({
						    account_id: p[s].account_id,
						    nickname: p[s].name,
						    account_score: Math.ceil(p[s].score),
						    num: u,
						    account_code: p[s].account_code,
						    "avatar": p[s].avatar
						})
					}
       
                }
                chooseBigWinner(), $(".ranking .rankBack").css("opacity", "1"), $(".roundEndShow").show(), $(".ranking").show(), canvas(), $("#endCreateRoomBtn").show()
            } catch (e) {
                console.log(e)
            }
        }
    }
};
var viewMethods = {
        showHomeAlert: function () {
            appData.isShowHomeAlert = true;
            if (localStorage.messageMusic == 1) {
                document.getElementById("media").play();
            }
        },
        showAlertB: function (e, t) {
            appData.isShowAlertB = !0, appData.alertTextB = e, appData.alertTypeB = t, setTimeout(function () {
                appData.isShowAlertB = !1
            }, 1e3)
        },
        clickGameOver: function () {
            viewMethods.clickShowAlert(10, "下庄之后，将以当前战绩进行结算。是否确定下庄？")
        },
        clickShowAlert: function (e, t) {
            appData.alertType = e, appData.alertText = t, appData.isShowAlert = !0, setTimeout(function () {
                var t = $(".alertText").height(), a = t;
                t < .15 * height && (t = .15 * height), t > .8 * height && (t = .8 * height);
                var n = t + .056 * height * 2 + .022 * height + .056 * height;
                8 == e && (n = n - .022 * height - .056 * height);
                var o = t + .034 * height * 2, i = .022 * height + (o - a) / 2;
                $(".alert .mainPart").css("height", n + "px"), $(".alert .mainPart").css("margin-top", "-" + n / 2 + "px"), $(".alert .mainPart .backImg .blackImg").css("height", o + "px"), $(".alert .mainPart .alertText").css("top", i + "px")
            }, 0)
        },
        clickShowAlertNotClubMember: function (e, t) {
            appData.alertType = e, appData.alertText = t, appData.isShowNotClubMember = !0, setTimeout(function () {
                var t = $(".alertText").height(), a = t;
                t < .15 * height && (t = .15 * height), t > .8 * height && (t = .8 * height);
                var n = t + .056 * height * 2 + .022 * height + .056 * height;
                8 == e && (n = n - .022 * height - .056 * height);
                var o = t + .034 * height * 2, i = .022 * height + (o - a) / 2;
                $(".alert .mainPart").css("height", n + "px"), $(".alert .mainPart").css("margin-top", "-" + n / 2 + "px"), $(".alert .mainPart .backImg .blackImg").css("height", o + "px"), $(".alert .mainPart .alertText").css("top", i + "px")
            }, 0)
        },
        clickCloseAlert: function () {
            appData.isShowAlert = false;
            if (appData.alertType == 22) {
                appData.isShowGameAlert = false;
                httpModule.getInfo();
            } else {
                appData.isShowGameAlert = false;
                appData.isShowAlert = false;
            }
        },
        clickSitDown: function (e) {
            appData.isShowAlert = false;
            appData.isShowGameAlert = false;
            appData.isAutoReady = 0;
            // socketModule.sendSitDown(e);
            $('.sidelines-mask').hide();
            $('.sidelines-content').css({right: '-3.5rem',});
            if (localStorage.messageMusic == 1) {
                document.getElementById("media").play();
            }
            if (appData.isWatching == 1) {
                socketModule.sendSitDown(e);
            } else {
                socketModule.sendSwapSeat(e);
            }
        },
        clickTipsCards: function (e) {

            var picked_cards = appData.card_tip_one;
            for (var i = 0; i < appData.player[0].card.length; i++) {
                appData.player[0].card[i].isGroup = !1;
                $(".myCards .card" + i).css({top: 0});
            }
            socketModule.sendTipsCards(picked_cards);
            if (localStorage.messageMusic == 1) {
                document.getElementById("media").play();
            }
        },
        // 换座
        clickSwapSeat: function (e) {
            socketModule.sendSwapSeat(e);
            if (localStorage.messageMusic == 1) {
                document.getElementById("media").play();
            }
        }, clickReady: function () {
            socketModule.sendReadyStart(), appData.player[0].is_operation = !0
        },
        reDeal: function () {
            appData.isDealing || (appData.isDealing = !0, m4aAudioPlay("audio1"), appData.game.cardDeal = 1, setTimeout(function () {
                appData.game.cardDeal = 2, m4aAudioPlay("audio1"), setTimeout(function () {
                    appData.game.cardDeal = 3, m4aAudioPlay("audio1"), setTimeout(function () {
                        appData.game.cardDeal = 4, m4aAudioPlay("audio1"), setTimeout(function () {
                            appData.game.cardDeal = 5, setTimeout(function () {
                                appData.isDealing = !1, viewMethods.resetMyAccountStatus(), appData.showClockRobText = !0, 5 == appData.ruleInfo.banker_mode && 1 == appData.game.round && viewMethods.updateAllPlayerStatus()
                            }, 150)
                        }, 10)
                    }, 10)
                }, 10)
            }, 10))
        },
        resetMyAccountStatus: function () {
            if (6 != appData.player[0].account_status || appData.isFinishBankerAnimate) {
                viewMethods.resetShowButton();
                if (3 == appData.player[0].account_status) {
                    appData.showRob = !0;
                } else if (4 == appData.player[0].account_status) {
                    appData.showNotRobText = !0
                } else if (5 == appData.player[0].account_status) {
                    appData.showRobText = !0;
                } else if (6 == appData.player[0].account_status) {
                    if (1 == appData.player[0].is_banker) {
                        appData.showBankerCoinText = !0;
                        appData.player[0].is_showCard = !0;
                    } else if (appData.isFinishBankerAnimate) {
                        appData.showTimesCoin = !0;
                        appData.player[0].is_showCard = !0;
                    }
                } else if (7 == appData.player[0].account_status) {
                    appData.player[0].is_showCard = !0;
                    viewMethods.seeMyCard()
                } else if (8 == appData.player[0].account_status) {
                    appData.player[0].is_showCard = !1;
                    appData.player[0].is_GroupCard = !0;
                    appData.player[0].open_left = !0;
                    appData.player[0].open_right = !0;
                    setTimeout(function () {
                        $(".memberBullWin111").fadeIn(300);
                        $(".memberBullWin122").fadeIn(300)
                    }, 1e3)
                } else if (9 == appData.player[0].account_status) {
                    appData.player[0].open_left = !0;
                    appData.player[0].open_right = !0;
                    setTimeout(function () {
                        $(".memberBullWin111").fadeIn(300);
                        $(".memberBullWin122").fadeIn(300);
                    }, 1e3)
                }

            }
            if(appData.player[0].bonus)
            {
                if(7 == appData.player[0].account_status)
                {
                    appData.player[0].is_showCard = 0 
                    appData.player[0].is_GroupCard = 0
                    appData.player[0].open_left = 1 
                    appData.player[0].open_right = 1
                }
            
            }
        },
        updateAllPlayerStatus: function () {
            for (var e = 0; e < appData.player.length; e++) {
                4 == appData.player[e].account_status ?
                    appData.player[e].robImg = globalData.fileUrl + "files/images/bull/text_notrob.png" :
                    5 == appData.player[e].account_status ?
                        appData.player[e].robImg = globalData.fileUrl + "files/images/bull/text_rob.png" :
                        6 == appData.player[e].account_status ? appData.player[e].is_showCard = !0 :
                            7 == appData.player[e].account_status ? (appData.player[e].is_showCard = !0, 0 == e && viewMethods.seeMyCard()) :
                                8 == appData.player[e].account_status ?
                                    e > 0 && (appData.player[e].card_group_one = [-1, -1, -1, -1], appData.player[e].card_group_two = [-1, -1, -1, -1]) :
                                    9 == appData.player[e].account_status && (
                                        0 == e ?
                                            viewMethods.myCardOver() :
                                            viewMethods.cardOver(appData.player[e].num, appData.player[e].account_status)
                                    ),
                appData.player[e].multiples > 0 && (appData.player[e].timesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[e].multiples + ".png"),
                appData.player[e].bankerMultiples > 0 && (appData.player[e].bankerTimesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[e].bankerMultiples + ".png");
                if (appData.player[e].card_type_one >= 1) {
                    var t = 0,
                        a = parseInt(appData.player[e].card_type_one);
                    t = appData.player[e].combo_point_one,
                        a > 1 ?
                            (
                                t = "type" + a,
                                    appData.player[e].bullImgLeft = globalData.fileUrl + "files/images/paijiu_xy/" + t + ".png",
                                    appData.player[e].bullImgLeftLose = globalData.fileUrl + "files/images/paijiuD_xy/" + t + ".png"
                            ) :
                            1 == a && (
                                t = "point" + t,
                                    appData.player[e].bullImgLeft = globalData.fileUrl + "files/images/paijiu_xy/" + t + ".png",
                                    appData.player[e].bullImgLeftLose = globalData.fileUrl + "files/images/paijiuD_xy/" + t + ".png"
                            )
                }
                if (appData.player[e].card_type_two >= 1) {
                    var n = 0, o = parseInt(appData.player[e].card_type_two);
                    n = appData.player[e].combo_point_two,
                        o > 1 ?
                            (
                                n = "type" + o,
                                    appData.player[e].bullImgRight = globalData.fileUrl + "files/images/paijiu_xy/" + n + ".png",
                                    appData.player[e].bullImgRightLose = globalData.fileUrl + "files/images/paijiuD_xy/" + n + ".png"
                            ) :
                            1 == o && (
                                n = "point" + n,
                                    appData.player[e].bullImgRight = globalData.fileUrl + "files/images/paijiu_xy/" + n + ".png",
                                    appData.player[e].bullImgRightLose = globalData.fileUrl + "files/images/paijiuD_xy/" + n + ".png"
                            )
                }
            }
        },
        resetShowButton: function () {
            appData.showTimesCoin = !1, appData.showRob = !1, appData.showNotRobText = !1, appData.showRobText = !1, appData.showBankerCoinText = !1
        },
        seeMyCard: function () {
            if (appData.player[0].account_id != userData.accountId) return; //观战功能
            2 == appData.ruleInfo.banker_mode ? (
                appData.player[0].is_showCard || (appData.player[0].is_showCard = !0),
                    setTimeout(function () {
                        $(".myCards .card0,.myCards .card1").addClass("card-flipped"),
                        7 == appData.player[0].account_status && (
                            $(".myCards .card2,.myCards .card3").addClass("card-flipped"),
                                setTimeout(function () {
                                    appData.showShowGroupCards = !0
                                }, 550)
                        )
                    }, 450)
            ) : setTimeout(function () {
                $(".myCards .card0").addClass("card-flipped"),
                    setTimeout(function () {
                        appData.clickCard4 || (appData.showShowGroupCards = !0)
                    }, 500)
            }, 350)
        }
        ,
        seeMyCard4: function (e) {
            if (appData.player[0].account_id != userData.accountId) return; //观战功能
            appData.isShowTipBull = false;
            appData.player[0].account_status >= 7 && (
                appData.showShowGroupCards = !0,
                    appData.showClickShowCard = !1,
                    appData.player[0].card[e].isGroup ? (
                        $(".myCards .card" + e).css({top: 0}),
                            setTimeout(function () {
                                appData.player[0].card[e].isGroup = !1
                            }, 100),
                            appData.groupNUm--
                    ) : (
                        $(".myCards .card" + e).css({top: "-3vh"}),
                            setTimeout(function () {
                                appData.player[0].card[e].isGroup = !0
                            }, 100),
                            appData.groupNUm++
                    ),
                    2 == appData.groupNUm ? appData.player[0].is_GroupCard = !0 : appData.player[0].is_GroupCard = !1)
        }
        ,
        myCardOver: function () {
            $(".myCards .card").removeClass("card-flipped")
        }
        ,
        cardOver: function (e, a) {
            if (e <= 1) {
                return;
            }
            a >= 9 && (
                appData.player[e - 1].open_right = !0,
                    setTimeout(function () {
                        $(".cardOver .cardSet" + e + "31").addClass("card-flipped"),
                            $(".cardOver .cardSet" + e + "41").addClass("card-flipped"),
                            setTimeout(function () {
                                $(".memberBullWin" + e + "22").fadeIn(300)
                            }, 1e3)
                    }, 800)
            )
        }
        ,
        bonusCardOver:function(e,a){ 
            if(e==1)
            {
                $(".myCards .card0").addClass("card-flipped")
                $(".myCards .card1").addClass("card-flipped")
                $(".myCards .card2").addClass("card-flipped")
                $(".myCards .card3").addClass("card-flipped")
            }
            else
            {
                $(".cardOver .cardSet"+e+"11").addClass("card-flipped")
                $(".cardOver .cardSet"+e+"21").addClass("card-flipped")
                $(".cardOver .cardSet"+e+"31").addClass("card-flipped")
                $(".cardOver .cardSet"+e+"41").addClass("card-flipped")
            }
        }
        ,
        gameOverNew: function (e, t) {
            for (o = 0; o < appData.playerBoard.score.length; o++)
                appData.playerBoard.score[o].num = 0,
                    appData.playerBoard.score[o].account_id = 0,
                    appData.playerBoard.score[o].nickname = "",
                    appData.playerBoard.score[o].account_score = 0,
                    appData.playerBoard.score[o].isBigWinner = 0,
                    appData.playerBoard.score[o].account_code = "";
            for (o = 0; o < globalData.maxCount; o++)
                for (s in e)
                    appData.player[o].account_id == s && (
                        appData.player[o].account_score = Math.ceil(e[s]),
                            appData.playerBoard.score[o].num = appData.player[o].num,
                            appData.playerBoard.score[o].account_id = appData.player[o].account_id,
                            appData.playerBoard.score[o].nickname = appData.player[o].nickname,
                            appData.playerBoard.score[o].account_score = appData.player[o].account_score,
                            appData.playerBoard.score[o].account_code = appData.player[o].account_code);
            var a = new Date, n = "";
            n += a.getFullYear() + "-", n += a.getMonth() + 1 + "-", n += a.getDate() + "  ", n += a.getHours() + ":",
                a.getMinutes() >= 10 ? n += a.getMinutes() : n += "0" + a.getMinutes(),
                appData.playerBoard.record = n,
            void 0 != t && "-1" != t && socketModule.processBalanceScoreboard(t);
            for (var o = 0; o < globalData.maxCount; o++) {
                var i = appData.player[o].num;
                appData.player[o].is_banker ?
                    o > 0 ? (
                        $(".cardOver .cardSet" + i + "11").removeClass("card-flipped"),
                            $(".cardOver .cardSet" + i + "21").removeClass("card-flipped"),
                            $(".cardOver .cardSet" + i + "11").removeClass("boxShadow3"),
                            $(".cardOver .cardSet" + i + "21").removeClass("boxShadow3")
                    ) : (
                        $(".myCards .level1").removeClass("boxShadow3"),
                            $(".myCards .level2").removeClass("boxShadow3")
                    ) :
                    o > 0 ? (
                        $(".cardOver .cardSet" + i + "11").removeClass("card-flipped"),
                            $(".cardOver .cardSet" + i + "21").removeClass("card-flipped"),
                            $(".cardOver .cardSet" + i + "11").removeClass("boxShadow1"),
                            $(".cardOver .cardSet" + i + "21").removeClass("boxShadow1"),
                            $(".cardOver .cardSet" + i + "11").removeClass("boxShadow2"),
                            $(".cardOver .cardSet" + i + "21").removeClass("boxShadow2")
                    ) : (
                        $(".myCards .level1").removeClass("boxShadow1"),
                            $(".myCards .level2").removeClass("boxShadow1"),
                            $(".myCards .level1").addClass("boxShadow2"),
                            $(".myCards .level2").addClass("boxShadow2")
                    ),
                    $(".memberBullWin" + i + "11").fadeOut(100),
                    $(".memberBullLose" + i + "11").fadeOut(100),
                    $(".memberBullWin" + i + "22").fadeOut(100),
                    $(".memberBullLose" + i + "22").fadeOut(100),
                    appData.player[o].playing_status = 0,
                    appData.player[o].is_win = !1,
                    appData.player[o].is_operation = !1,
                    appData.player[o].win_type = 0,
                    appData.player[o].win_show = !1,
                    appData.player[o].card = new Array,
                    appData.player[o].card_type = 0,
                    appData.player[o].is_showCard = !1,
                    appData.player[o].is_GroupCard = !1,
                    appData.player[o].is_readyPK = !1,
                    appData.player[o].is_pk = !1,
                    appData.player[o].is_banker = !1,
                    appData.player[o].multiples = 0,
                    appData.player[o].bankerMultiples = 0,
                    appData.player[o].card_group_one = new Array,
                    appData.player[o].card_group_two = new Array,
                    appData.player[o].combo_point_one = 0,
                    appData.player[o].combo_point_two = 0,
                    appData.player[o].open_left = !1,
                    appData.player[o].open_right = !1,
                    appData.player[o].gtBankerOne = 0,
                    appData.player[o].gtBankerTwo = 0,
                    appData.player[o].card_type_one = 0,
                    appData.player[o].card_type_two = 0,
                    appData.player[o].bullImgLeft = "",
                    appData.player[o].bullImgRight = "",
                    appData.player[o].bullImgLeftLose = "",
                    appData.player[o].bullImgRightLose = ""
            }
            appData.game.can_open = 0,
                appData.game.cardDeal = 0,
                appData.game.status = 1,
                appData.player[0].is_showCard = !1,
                appData.player[0].is_GroupCard = !1,
                appData.showClockRobText = !1,
                appData.showClockBetText = !1,
                appData.showClockShowCard = !1,
                appData.showClockGroupCard = !1,
                appData.groupNUm = 0
        }
        ,

        showAllCards: function (e) {
            // for(var i=0;i<appData.player.length;i++){
            //     console.log('玩家',i,':',appData.player[i],'is_banker',appData.player[i].is_banker,"gtBankerOne",appData.player[i].gtBankerOne,'gtBankerTwo',appData.player[i].gtBankerTwo)
            // }
            var bankerNum = 0;
            for (var t = 0; t < globalData.maxCount; t++)
                // if(appData.player[t].is_banker){
                //     bankerNum=appData.player[t].num
                // }
                !function (e) {
                    var t = appData.player[e].num;

                    if (appData.player[e].is_banker) {
                        // console.log('showAllCards-e',e)
                        bankerNum = e + 1;
                        // e是第几个玩家,0开始

                        if (e > 0) {
                            $(".cardOver .cardSet" + t + "31").addClass("boxShadow3");
                            $(".cardOver .cardSet" + t + "41").addClass("boxShadow3");
                            setTimeout(function () {
                                $(".cardOver .cardSet" + t + "31").removeClass("boxShadow3");
                                $(".cardOver .cardSet" + t + "41").removeClass("boxShadow3");
                                $(".cardOver .cardSet" + t + "11").addClass("card-flipped");
                                $(".cardOver .cardSet" + t + "21").addClass("card-flipped");
                                if (appData.player[e].account_status > 2 && appData.player[e].account_status < 10) {
                                    appData.player[e].open_left = !0;
                                    setTimeout(function () {
                                        $(".memberBullWin" + t + "11").fadeIn(300)
                                    }, 500)
                                }

                            }, 500);
                            setTimeout(function () {
                                $(".cardOver .cardSet" + t + "11").addClass("boxShadow3");
                                $(".cardOver .cardSet" + t + "21").addClass("boxShadow3")
                            }, 1000)
                        } else {
                            $(".myCards .levelCard3").addClass("boxShadow3");
                            $(".myCards .levelCard4").addClass("boxShadow3");
                            setTimeout(function () {
                                $(".myCards .levelCard3").removeClass("boxShadow3");
                                $(".myCards .levelCard4").removeClass("boxShadow3");
                                $(".myCards .levelCard1").addClass("boxShadow3");
                                $(".myCards .levelCard2").addClass("boxShadow3")
                            }, 1000)
                        }
                    } else {
                        if (e > 0) {
                            if (appData.player[e].gtBankerTwo >= 1) {
                                $(".cardOver .cardSet" + t + "31").addClass("boxShadow2");
                                $(".cardOver .cardSet" + t + "41").addClass("boxShadow2");
                            } else {
                                $(".cardOver .cardSet" + t + "31").addClass("boxShadow1");
                                $(".cardOver .cardSet" + t + "41").addClass("boxShadow1");
                                setTimeout(function () {
                                    $(".memberBullWin" + t + "22").fadeOut(300);
                                    if (appData.player[e].account_status > 2 && appData.player[e].account_status < 10) {
                                        $(".memberBullLose" + t + "22").fadeIn(200)
                                    }
                                }, 1000)
                            }

                            setTimeout(function () {
                                if (appData.player[e].gtBankerTwo >= 1) {
                                    $(".cardOver .cardSet" + t + "31").removeClass("boxShadow2");
                                    $(".cardOver .cardSet" + t + "41").removeClass("boxShadow2")
                                } else {
                                    $(".cardOver .cardSet" + t + "31").removeClass("boxShadow1");
                                    $(".cardOver .cardSet" + t + "41").removeClass("boxShadow1")
                                }

                                $(".cardOver .cardSet" + t + "11").addClass("card-flipped");
                                $(".cardOver .cardSet" + t + "21").addClass("card-flipped");
                                if (appData.player[e].account_status > 2 && appData.player[e].account_status < 10) {
                                    appData.player[e].open_left = !0;
                                    setTimeout(function () {
                                        $(".memberBullWin" + t + "11").fadeIn(300)
                                    }, 500)
                                }

                            }, 1000);
                            setTimeout(function () {
                                if (appData.player[e].gtBankerOne >= 1) {
                                    $(".cardOver .cardSet" + t + "11").addClass("boxShadow2");
                                    $(".cardOver .cardSet" + t + "21").addClass("boxShadow2");
                                } else {
                                    $(".cardOver .cardSet" + t + "11").addClass("boxShadow1");
                                    $(".cardOver .cardSet" + t + "21").addClass("boxShadow1");
                                    setTimeout(function () {
                                        $(".memberBullWin" + t + "11").fadeOut(300);
                                        if (appData.player[e].account_status > 2 && appData.player[e].account_status < 10) {
                                            $(".memberBullLose" + t + "11").fadeIn(200);
                                        }
                                    }, 1000)
                                }

                            }, 1000)
                        } else {
                            if (appData.player[e].gtBankerTwo >= 1) {
                                $(".myCards .levelCard3").addClass("boxShadow2");
                                $(".myCards .levelCard4").addClass("boxShadow2");
                            } else {
                                $(".myCards .levelCard3").addClass("boxShadow1");
                                $(".myCards .levelCard4").addClass("boxShadow1");
                                setTimeout(function () {
                                    $(".memberBullWin" + t + "22").fadeOut(300);
                                    appData.player[e].account_status > 2 && appData.player[e].account_status < 10 && $(".memberBullLose" + t + "22").fadeIn(200)
                                }, 1000)
                            }

                            setTimeout(function () {
                                if (appData.player[e].gtBankerTwo >= 1) {
                                    $(".myCards .levelCard3").removeClass("boxShadow2");
                                    $(".myCards .levelCard4").removeClass("boxShadow2");
                                    // console.log('牌组2比庄家大');
                                    // console.log('bankerNum',$(".memberBullWin"+bankerNum+"22"),$(".memberBullLose"+bankerNum+"22")),=;
                                    $(".memberBullWin" + bankerNum + "22").fadeOut(300);
                                    $(".memberBullLose" + bankerNum + "22").fadeIn(200);
                                } else {
                                    $(".myCards .levelCard3").removeClass("boxShadow1");
                                    $(".myCards .levelCard4").removeClass("boxShadow1");
                                }
                                if (appData.player[e].gtBankerOne >= 1) {
                                    $(".myCards .levelCard1").addClass("boxShadow2");
                                    $(".myCards .levelCard2").addClass("boxShadow2");

                                    setTimeout(function () {
                                        // console.log('牌组1比庄家大');
                                        // console.log('bankerNum',$(".memberBullWin"+bankerNum+"11"),$(".memberBullLose"+bankerNum+"11"))=;
                                        $(".memberBullWin" + bankerNum + "11").fadeOut(300);
                                        $(".memberBullLose" + bankerNum + "11").fadeIn(200)
                                    }, 1000)
                                } else {
                                    $(".myCards .levelCard1").addClass("boxShadow1");
                                    $(".myCards .levelCard2").addClass("boxShadow1");
                                    setTimeout(function () {
                                        $(".memberBullWin" + t + "11").fadeOut(300);
                                        if (appData.player[e].account_status > 2 && appData.player[e].account_status < 10) {
                                            $(".memberBullLose" + t + "11").fadeIn(200)
                                        }
                                    }, 1000)
                                }

                            }, 1000)
                        }
                    }
                }(t)
        }
        ,
        showMessage: function () {
            // console.log(111)
            if (appData.player[0].account_id != userData.accountId) return; //观战功能

            appData.isShowNewMessage = !appData.isShowNewMessage;
            if (localStorage.messageMusic == 1) {
                document.getElementById("media").play();
            }
        }
        ,
        hideMessage: function () {
            // $(".message .textPart").animate({
            // height:0
            // }, function() {
            // appData.isShowMessage = false;
            // });
            appData.isShowNewMessage = false;

        }
        ,
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
        }
        ,
        messageSay: function (e, t) {
            appData.player[e].messageOn = !0, appData.player[e].messageText = appData.message[t].text, setTimeout(function () {
                appData.player[e].messageOn = !1
            }, 2500)
        }
        ,
        closeEnd: function () {
        }
        ,
        roundEnd: function () {
            chooseBigWinner(), $(".ranking .rankBack").css("opacity", "1"), $(".roundEndShow").show(), setTimeout(function () {
                // $(".ranking").show(),canvas()
                window.location.href = data.html_name+"?key="+data.data_key + '&v=' + (new Date().getTime());
            }, 2500)
        }
        ,
        timeCountDown: function () {
            if (1 != isTimeLimitShow) return appData.game.time <= 0 ? (isTimeLimitShow = !1, 0) : (isTimeLimitShow = !0, appData.game.time--, void (timeLimit = setTimeout(function () {
                isTimeLimitShow = !1, viewMethods.timeCountDown()
            }, 1e3)))
        }
        ,
        timeCountDown2: function () {
            if (1 != isTimeLimitShow) return appData.game.time <= 0 ? (isTimeLimitShow = !1, 0) : (isTimeLimitShow = !0, appData.game.time--, void (timeLimit = setTimeout(function () {
                isTimeLimitShow = !1, viewMethods.timeCountDown2()
                if (appData.game.time == 0) {
                    appData.waitStart = false
                }
            }, 1e3)))
        }
        ,
        clickRobBanker: function (e) {
            viewMethods.showRobBankerText(),
                socketModule.sendGrabBanker(e),
            2 == appData.ruleInfo.banker_mode && (
                appData.player[0].bankerMultiples = e,
                appData.player[0].bankerMultiples > 0 && (
                    appData.player[0].bankerTimesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[0].bankerMultiples + ".png"
                )
            ),
                setTimeout(function () {
                    mp3AudioPlay("audioRobBanker")
                }, 10)
        }
        ,
        showRobBankerText: function () {
            appData.showTimesCoin = !1, appData.showRob = !1, appData.showNotRobText = !1, appData.showRobText = !0, appData.showBankerCoinText = !1
        }
        ,
        showNotRobBankerTextFnc: function () {
            appData.showTimesCoin = !1, appData.showRob = !1, appData.showNotRobText = !0, appData.showRobText = !1, appData.showBankerCoinText = !1
        }
        ,
        clickNotRobBanker: function () {
            viewMethods.showNotRobBankerTextFnc(), socketModule.sendNotGrabBanker(), setTimeout(function () {
                mp3AudioPlay("audioNoBanker")
            }, 10)
        }
        ,
        clickSelectTimesCoin: function (e) {
            appData.player[0].multiples = e,
                appData.showTimesCoin = !1,
            appData.player[0].multiples > 0 && (
                appData.player[0].timesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[0].multiples + ".png"
            ),
                socketModule.sendPlayerMultiples(e),
                setTimeout(function () {
                    mp3AudioPlay("audioTimes" + e)
                }, 50)
        }
        ,
// clickShowCard:function(){
//     appData.player[0].is_GroupCard=!0,
//     console.log(appData.player[0].is_showCard,"is_showCard"),
//     console.log(appData.player[0].is_GroupCard,"is_GroupCard"),
//     socketModule.sendShowCard()
// },
        clickGroupCards: function () {
            if (console.log(appData.player[0].is_GroupCard, "is_GroupCard"), appData.player[0].is_GroupCard) {
                appData.showShowGroupCards = !1;
                var e = new Array;
                appData.player[0].card.forEach(function (t) {
                    1 == t.isGroup && e.push(t.cardValue)
                }),
                    socketModule.sendGroupCard(e);
                if (localStorage.messageMusic == 1) {
                    document.getElementById("media").play();
                }
            }
        }
        ,
        clickGroup: function (e) {
            // console.log(e, "牌的号码")
        }
        ,
        clearBanker: function () {
            for (var e = 0; e < appData.player.length; e++)
                appData.player[e].is_banker = !1;
            appData.isFinishBankerAnimate = !1;
            var t = 2 * appData.bankerArray.length;
            if (appData.bankerArray.length < 6) {
                appData.bankerAnimateDuration = parseInt(600 / t);
            } else {
                appData.bankerAnimateDuration = parseInt(1600 / t)
            }
        }
        ,
        robBankerWithoutAnimate: function (e) {
            for (var e = 0; e < appData.player.length; e++) appData.player[e].account_id == appData.bankerAccountId ? (appData.player[e].is_banker = !0, bankerNum = appData.player[e].num) : appData.player[e].is_banker = !1, $("#bankerAnimate" + appData.player[e].num).hide(), $("#bankerAnimate1" + appData.player[e].num).hide();
            setTimeout(function () {
                appData.showClockRobText = !1, appData.showClockBetText = !0, appData.isFinishBankerAnimate = !0, viewMethods.resetMyAccountStatus(), viewMethods.updateAllPlayerStatus()
            }, 10), appData.game.time = e.limit_time, appData.game.time > 0 && viewMethods.timeCountDown()
        }
        ,
        robBankerAnimate: function (e) {
            for (n = 0; n < appData.bankerArray.length; n++) {
                o = "#banker" + appData.bankerArray[n];
                $(o).hide()
            }
            var t = 2 * appData.bankerArray.length;
            if (appData.bankerAnimateCount >= t || appData.bankerAnimateIndex < 0 || appData.bankerArray.length < 2) {
                appData.bankerAnimateCount = 0,
                    appData.bankerAnimateIndex = -1;
                o = "#banker" + appData.bankerAccountId;
                $(o).show();
                for (var a = "", n = 0; n < appData.player.length; n++)
                    appData.player[n].account_id == appData.bankerAccountId ?
                        (appData.player[n].is_banker = !0, a = appData.player[n].num) :
                        appData.player[n].is_banker = !1,
                        $("#bankerAnimate" + appData.player[n].num).hide(),
                        $("#bankerAnimate1" + appData.player[n].num).hide();
                $(o).hide();
                $("#bankerAnimate" + a).css({top: "-0.1vh", left: "-0.1vh", width: "7.46vh", height: "7.46vh"}),
                    $("#bankerAnimate1" + a).css({top: "-1vh", left: "-1vh", width: "9.26vh", height: "9.26vh"}),
                    $("#bankerAnimate" + a).show(),
                    $("#bankerAnimate1" + a).show(),
                    $("#bankerAnimate1" + a).animate({
                        top: "-1vh",
                        left: "-1vh",
                        width: "9.26vh",
                        height: "9.26vh"
                    }, 100, function () {
                        $("#bankerAnimate1" + a).animate({
                            top: "-0.1vh",
                            left: "-0.1vh",
                            width: "7.46vh",
                            height: "7.46vh"
                        }, 100, function () {
                            $("#bankerAnimate1" + a).hide()
                        })
                    });
                $("#bankerAnimate" + a).animate({
                    top: "-1.5vh",
                    left: "-1.5vh",
                    width: "10.26vh",
                    height: "10.26vh"
                }, 100, function () {
                    $("#bankerAnimate" + a).animate({
                        top: "-0.1vh",
                        left: "-0.1vh",
                        width: "7.46vh",
                        height: "7.46vh"
                    }, 100, function () {
                        $("#bankerAnimate" + a).hide(),
                            setTimeout(function () {
                                appData.showClockRobText = !1;
                                appData.showClockBetText = !0;
                                appData.isFinishBankerAnimate = !0;
                                viewMethods.resetMyAccountStatus(),
                                    viewMethods.updateAllPlayerStatus()
                            }, 10),
                            appData.game.time = e.limit_time,
                            // appData.game.time = Math.ceil(e.limit_time)+1,
                        appData.game.time > 0 && viewMethods.timeCountDown()
                    })
                });
                return;
            }
            var o = "#banker" + appData.bankerArray[appData.bankerAnimateIndex];
            $(o).show(), appData.lastBankerImgId = o, appData.bankerAnimateCount++, appData.bankerAnimateIndex++,
            appData.bankerAnimateIndex >= appData.bankerArray.length && (appData.bankerAnimateIndex = 0),
                setTimeout(function () {
                    viewMethods.robBankerAnimate(e)
                }, appData.bankerAnimateDuration)
        }
        ,
        showMemberScore: function (isShow) {
            if (isShow) {
                $(".memberScoreText").show();
            } else {
                $(".memberScoreText").hide();
            }
        }
        ,
        winAnimate: function (e) {
            appData.isFinishWinAnimate = !1;
            var winnerNums = new Array;
            var loserNums = new Array;
            var tieNums = new Array;

            appData.bankerPlayerNum = appData.bankerPlayer.num;

            for (var h = 0; h < e.data.winner_array.length; h++)
                for (var f = 0; f < appData.player.length; f++)
                    if (e.data.winner_array[h].account_id == appData.player[f].account_id) {
                        if (appData.player[f].num == appData.bankerPlayer.num) {
                            appData.bankerPlayerNum = appData.player[f].num
                        } else {
                            winnerNums.push(appData.player[f].num)
                        }
                    }

            for (var m = 0; m < e.data.loser_array.length; m++) {
                for (var v = 0; v < appData.player.length; v++) {
                    if (e.data.loser_array[m].account_id == appData.player[v].account_id && appData.player[v].num != appData.bankerPlayerNum) {
                        loserNums.push(appData.player[v].num);
                    }
                }
            }


            for (var g = 0; g < e.data.tie_array.length; g++) {
                for (var D = 0; D < appData.player.length; D++) {
                    if (e.data.tie_array[g].account_id == appData.player[D].account_id && appData.player[D].num != appData.bankerPlayerNum) {
                        // console.log(appData.player[D].account_id, "account_id"),
                            tieNums.push(appData.player[D].num);
                    }
                }
            }


            appData.isBankerKill = 0;
            viewMethods.resetCoinsPosition();
            $("#playerCoins").show();

            for (var i = 1; i <= globalData.maxCount; i++) {
                viewMethods.showCoins(i, false);
            }

            //把赢家玩家金币暂时放到庄家位置
            for (var i = 0; i < winnerNums.length; i++) {
                for (var j = 0; j < 5; j++) {
                    $(".memberCoin" + winnerNums[i] + j).css(memCoin[appData.bankerPlayerNum]);
                }
            }
            //显示输家金币
            for (var i = 0; i < loserNums.length; i++) {
                viewMethods.showCoins(loserNums[i], true);
            }
            //输家金币给庄家
            for (var i = 0; i < loserNums.length; i++) {
                for (var j = 0; j < 8; j++) {
                    $(".memberCoin" + loserNums[i] + j).animate(memCoin[appData.bankerPlayerNum], 10 + 120 * j);
                }
                setTimeout(function () {
                    mp3AudioPlay("audioCoin", appData.player[0].sex);
                }, 10);
            }
            var winnerTime = 100;
            var totalTime = 100;
            if (loserNums.length >= 1) {
                winnerTime = 1000;
                if (winnerNums.length >= 1) {
                    totalTime = 1800;
                } else {
                    totalTime = 1000;
                }
            } else {
                if (winnerNums.length >= 1) {
                    totalTime = 1000;
                }
            }

            if (winnerNums.length >= 1) {
                setTimeout(function () {
                    //显示赢家金币
                    // for (var i = 0; i < loserNums.length; i++) {
                    //     viewMethods.showCoins(loserNums[i], false);
                    // }
                    for (var i = 0; i < winnerNums.length; i++) {
                        viewMethods.showCoins(winnerNums[i], true);
                    }
                    for (var i = 0; i < winnerNums.length; i++) {
                        for (var j = 0; j < 5; j++) {
                            $(".memberCoin" + winnerNums[i] + j).animate(memCoin[winnerNums[i]], 10 + 120 * j);
                        }
                    }
                    setTimeout(function () {
                        mp3AudioPlay("audioCoin", appData.player[0].sex);
                    }, 10);
                }, 100);
                setTimeout(function () {
                    viewMethods.finishWinAnimate(e);
                }, totalTime);
            } else {
                setTimeout(function () {
                    viewMethods.finishWinAnimate(e);
                }, totalTime);
            }
        }
        ,
        finishWinAnimate: function (e) {
            $("#playerCoins").hide(),
                appData.game.show_card = !1,
                appData.game.show_score = !0,
                appData.isOverCards = !1,
                $(".memberScoreText").fadeIn(200, function () {
                    if (5 == appData.ruleInfo.banker_mode)
                        if (1 != appData.isBreak)
                            // console.log("==="),
                                viewMethods.gameOverNew(e.data.score_board,
                                    e.data.balance_scoreboard);
                        else
                            for (var t = 0; t < globalData.maxCount; t++)
                                for (s in e.data.score_board)
                                    appData.player[t].account_id == s && (appData.player[t].account_score = Math.ceil(e.data.score_board[s]));
                    else viewMethods.gameOverNew(e.data.score_board, e.data.balance_scoreboard);
                    setTimeout(function () {
                        $(".memberScoreText").fadeOut(300, function () {
                            if (5 == appData.ruleInfo.banker_mode && 1 == appData.isBreak) appData.overType = 2, setTimeout(function () {
                                viewMethods.clickShowAlert(9, "庄家分数不足，提前下庄，点击确定查看结算")
                            }, 500); else for (var e = 0; e < globalData.maxCount; e++) appData.player[e].account_status >= 6 && 5 != ruleInfo.banker_mode && (appData.player[e].is_banker = !1), 2 != appData.player[e].account_status && 0 != appData.player[e].account_status && (appData.player[e].account_status = 1)
                        })
                    }, 500), appData.isFinishWinAnimate = !0, 5 != appData.ruleInfo.banker_mode ? e.data.total_num == e.data.game_num && setTimeout(function () {
                        viewMethods.roundEnd(), newNum = e.data.room_number
                    }, 500) : 1 == appData.isBreak || e.data.total_num == e.data.game_num && setTimeout(function () {
                        viewMethods.roundEnd(), newNum = e.data.room_number
                    }, 500)
                })
            appData.showWatchButton = appData.isWatching != 1;
            appData.showSitdownButton = appData.isWatching;
            // 自动准备
            setTimeout(function () {
                if (appData.isAutoReady == 1 && appData.isWatching != 1) {
                    viewMethods.clickReady()
                }
            }, 2500)
        }
        ,
        resetCoinsPosition: function () {
            for (var i = 1; i <= globalData.maxCount; i++) {
                for (var j = 0; j < 8; j++) {
                    $(".memberCoin" + i + j).css(memCoin[i]);
                }
            }
        }
        ,
        showCoins: function (e, t) {
            if (t)
                for (a = 0; a < 8; a++)
                    $(".memberCoin" + e + a).show();
            else for (var a = 0; a < 8; a++)
                $(".memberCoin" + e + a).hide()
        }
        ,
    }
;
var width = window.innerWidth,
    height = window.innerHeight,
    numD = 0, isTimeLimitShow = !1;
var timesOffset = (.9 * width - .088 * height * 4 - .02 * width * 3) / 2;


var r = width - .06 * height + "px",
    l = .045 * height + "px",
    o = .045 * height + "px";


if (globalData.maxCount == 8) {
    var memCoin = [
        {},
        {'top': '82%', 'left': o},
        {top: '59%', left: r},
        {top: '43%', left: r},
        {top: '28%', left: r},
        {top: '10%', left: '50%'},
        {top: '28%', left: l},
        {top: '43%', left: l},
        {top: '59%', left: l}
    ];
} else if (globalData.maxCount == 12) {
    var memCoin = [
        {},
        {'top': '85%', 'left': '4.5vh'},
        {'top': '69%', left: r},
        {'top': '56%', left: r},
        {'top': '43%', left: r},
        {'top': '30%', left: r},
        {'top': '17%', left: r},
        {'top': '5%', 'left': '44.5vw'},
        {'top': '17%', left: l},
        {'top': '30%', left: l},
        {'top': '43%', left: l},
        {'top': '56%', left: l},
        {'top': '69%', left: l}
    ];
} else if (globalData.maxCount == 16) {
    var memCoin = [
        {},
        {'top': '90%', 'left': '4.5vh'},
        {'top': '74%', 'left': '89.5vw'},
        {'top': '64%', 'left': '89.5vw'},
        {'top': '54%', 'left': '89.5vw'},
        {'top': '44%', 'left': '89.5vw'},
        {'top': '34%', 'left': '89.5vw'},
        {'top': '24%', 'left': '89.5vw'},
        {'top': '14%', 'left': '89.5vw'},
        {'top': '3%', 'left': '44.5vw'},
        {'top': '14%', left: l},
        {'top': '24%', left: l},
        {'top': '34%', left: l},
        {'top': '44%', left: l},
        {'top': '54%', left: l},
        {'top': '64%', left: l},
        {'top': '74%', left: l},
    ];
}

var viewStyle = {
    readyButton: {
        position: "absolute",
        top: (.11 * height - .0495 * height) / 2 + "px",
        left: "31vw",
        width: "28vw",
        height: "9vw"
    },
    readyText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "6vh",
        height: "3vh",
        "margin-top": "-1.5vh",
        "margin-left": "-3vh"
    },
    button: {position: "absolute", top: "68%", left: "5%", width: "90%", height: "11vh", overflow: "hidden"},
    rob: {
        position: "absolute",
        top: (.11 * height - .0495 * height) / 2 + "px",
        left: (.9 * width - .0495 * height / .375 * 2 - 20) / 2 + "px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px"
    },
    rob1: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px",
        "line-height": .0495 * height + "px",
        "text-align": "center",
        color: "white",
        "font-size": "2.2vh",
        "font-weight": "bold"
    },
    notRob: {
        position: "absolute",
        top: (.11 * height - .0495 * height) / 2 + "px",
        left: (.9 * width - .0495 * height / .375 * 2 - 20) / 2 + .0495 * height / .375 + 20 + "px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px"
    },
    notRob1: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px",
        "line-height": .0495 * height + "px",
        "text-align": "center",
        color: "white",
        "font-size": "2.2vh",
        "font-weight": "bold"
    },
    showCard: {
        position: "absolute",
        top: (.11 * height - .0495 * height) / 2 + "px",
        left: (.9 * width - .0495 * height / .375) / 2 + "px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px"
    },
    showCard1: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: .0495 * height / .375 + "px",
        height: .0495 * height + "px",
        "line-height": .0495 * height + "px",
        "text-align": "center",
        color: "white",
        "font-size": "2.2vh",
        "font-weight": "bold"
    },
    timesText: {
        position: "absolute",
        width: .088 * height + "px",
        height: .088 * height / 2 + "px",
        "line-height": .088 * height / 2 + "px",
        "text-align": "center",
        color: "white",
        "font-size": "2.2vh",
        "font-weight": "bold"
    },
    times1: {
        position: "absolute",
        top: (.11 * height - .088 * height / 2) / 2 + "px",
        left: timesOffset - (.088 * height / 2) + ( timesOffset / 2) + "px",
        width: .088 * height + "px",
        height: .088 * height / 2 + "px",
        "line-height": .088 * height / 2 + "px",
        "text-align": "center",
    },
    times2: {
        position: "absolute",
        top: (.11 * height - .088 * height / 2) / 2 + "px",
        left: timesOffset + .02 * width + .088 * height - (.088 * height / 2) + ( timesOffset / 2) + "px",
        width: .088 * height + "px",
        height: .088 * height / 2 + "px",
        "line-height": .088 * height / 2 + "px",
        "text-align": "center",
    },
    times3: {
        position: "absolute",
        top: (.11 * height - .088 * height / 2) / 2 + "px",
        left: timesOffset + .02 * width * 2 + .088 * height * 2 - (.088 * height / 2) + ( timesOffset / 2) + "px",
        width: .088 * height + "px",
        height: .088 * height / 2 + "px",
        "line-height": .088 * height / 2 + "px",
        "text-align": "center",
    },
    times4: {
        position: "absolute",
        top: (.11 * height - .088 * height / 2) / 2 + "px",
        left: timesOffset + .02 * width * 3 + .088 * height * 3 - (.088 * height / 2) + ( timesOffset / 2) + "px",
        width: .088 * height + "px",
        height: .088 * height / 2 + "px",
        "line-height": .088 * height / 2 + "px",
        "text-align": "center",
    },
    robText2: {
        position: "absolute",
        top: (.11 * height - .03 * height) / 2 + "px",
        left: (.9 * width - .0557 * height - .03 * height - .005 * height) / 2 + "px",
        width: .0557 * height + "px",
        height: .03 * height + "px"
    },
    robText: {
        position: "absolute",
        top: (.11 * height - .03 * height) / 2 + "px",
        left: (.9 * width - .0557 * height) / 2 + "px",
        width: .0557 * height + "px",
        height: .03 * height + "px"
    },
    robTimesText: {
        position: "absolute",
        top: (.11 * height - .03 * height) / 2 + "px",
        left: (.9 * width - .0557 * height - .03 * height - .002 * height) / 2 + .0557 * height + .005 * height + "px",
        width: .03 * height + "px",
        height: .03 * height + "px"
    },
    notRobText: {
        position: "absolute",
        top: (.11 * height - .03 * height) / 2 + "px",
        left: (.9 * width - .0557 * height) / 2 + "px",
        width: .0557 * height + "px",
        height: .03 * height + "px"
    },
    showCardText: {position: "absolute", top: "10%", left: "10%", width: "80%", height: "11vh", "font-size": "2.2vh"},
    showCardText1: {
        position: "absolute",
        width: "100%",
        height: "100%",
        color: "#f7ce46",
        "font-size": "2.2vh",
        "text-align": "center",
        "line-height": "11vh",
        "font-family": "Helvetica 微软雅黑"
    },
    coinText: {position: "absolute", top: "10%", left: "10%", width: "80%", height: "11vh", "font-size": "2.2vh"},
    coinText1: {
        position: "absolute",
        width: "100%",
        height: "100%",
        color: "#f7ce46",
        "font-size": "2.2vh",
        "text-align": "center",
        "line-height": "11vh",
        "font-family": "Helvetica 微软雅黑"
    }
}
var ruleInfo = {
    type: -1,
    isShow: !1,
    isShowRule: !1,
    baseScore: 1,
    timesType: 1,
    isCardfive: 0,
    isCardbomb: 0,
    isCardtiny: 0,
    ticket: 1,
    rule_height: "4vh",
    banker_mode: 1,
    banker_score: 1,
    bankerText: "抢庄",
    special_card: 1,
};
var editAudioInfo = {
        isShow: !1,
        backMusic: 1,
        messageMusic: 1
    },
    audioInfo = {
        backMusic: 1,
        messageMusic: 1
    };
if (localStorage.backMusic) {
    editAudioInfo.backMusic = localStorage.backMusic,
        audioInfo.backMusic = localStorage.backMusic;
} else {
    localStorage.backMusic = 1;
}
if (localStorage.messageMusic) {
    editAudioInfo.messageMusic = localStorage.messageMusic,
        audioInfo.messageMusic = localStorage.messageMusic;
} else {
    localStorage.messageMusic = 1;
}

// 自动准备
var setReady = 0;
if (localStorage.isAutoReady == 1 && localStorage.roomNumber == globalData.roomNumber) {
    setReady = 1
} else {
    setReady = 0
}

// 自动续局
var showNextRoom = false
if (localStorage.newRoom != undefined) {
    var nextRoomInfo = JSON.parse(localStorage.newRoom)
    if (nextRoomInfo.oldRoomNumber == globalData.roomNumber) {
        showNextRoom = true;
    } else {
        showNextRoom = false;
    }
}

var appData = {
    showNextRoom: showNextRoom,// 自动续局
    newRoomInfo: '',
    isBankerKill: 0,
    isShowApply: false,
	isShowGuildApply: false,
    applyInfo: {
        club_headimgurl: '',
        club_name: '',
        club_id: '',
		guild_headimgurl: '',
		guild_name: '',
		guild_id: '',
		room_creator: '',
        status: '确定'
    },
    waitStart: false,
    coinList: [1, 2, 3, 5],
    //观战功能
    showRobText2: false,
    isAutoReady: setReady, //自动准备
    'isShowNewMessage': false,
    'isShowGameAlert': false,
    room_users: '',
    'musicOnce': true,
    isWatching: 0,
    guests: [],
    showGuest: 0,
    showSitdownButton: 0,
    showWatchButton: 1,
    joinType: 0,
    isShowIndiv: false,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'inputIndiv': '',
    'isShowIndivConfirm': false,
    // 'individuality':  '',
    'individualityError': "",
    'isShowHomeAlert': false,
    isShowAlertB: !1,
    alertTextB: "",
    alertTypeB: 1,
    isOverCards: !1,
    viewStyle: viewStyle,
    roomStatus: globalData.roomStatus,
    width: window.innerWidth,
    height: window.innerHeight,
    roomCard: Math.ceil(globalData.card),
    is_connect: !1,
    player: [],
    scoreboard: "",
    isShowAlert: !1,
    isShowNotClubMember: !1,
    isShowMessage: !1,
    alertType: 0,
    alertText: "",
    showRob: !1,
    showShowGroupCards: !1,
    showRobText: !1,
    showNotRobText: !1,
    showClockRobText: !1,
    showClockBetText: !1,
    showClockShowCard: !1,
    showClockGroupCard: !1,
    showTimesCoin: !1,
    showBankerCoinText: !1,
    clickCard4: !1,
    base_score: 0,
    playerBoard: {score: new Array, round: 0, record: ""},
    game: game,
    wsocket: ws,
    connectOrNot: !0,
    socketStatus: 0,
    heartbeat: null,
    select: 1,
    ticket_count: 0,
    isDealing: !1,
    message: message,
    bankerArray: [],
    bankerAccountId: "",
    bankerPlayer: "",
    bankerPlayerNum: -1,
    bankerAnimateCount: 0,
    bankerAnimateIndex: 0,
    lastBankerImgId: "",
    bankerAnimateDuration: 120,
    isFinishWinAnimate: !1,
    isFinishBankerAnimate: !1,
    ruleInfo: ruleInfo,
    canBreak: 0,
    overType: 1,
    isBreak: 0,
    breakData: "",
    bankerID: 0,
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    isReconnect: !0,
    bScroll: null,
    isShowNoty: !1,
    notyMsg: "",
    //coinList:coinList,
    isShowNoteImg: !1,
    groupNUm: 0,
    checkOne: false,
    ownerUser: {
        nickname: "",
        avatar: "",
        user_code: 0
    },
    add_user: false,
    applyStatus: 0, //0尚未申请  1加好友申请中,
    tipTypeLeft: '',//组排提示牌型
    tipTypeRight: '',//组排提示牌型
    isShowTipBull: false,
    guestNotShowBullImg: true,
    card_tip_one: '',
    isShowGiftBox: false, //礼物
    giftToolsList: [],
    isShowBuyTools: false,
    buyToolsId: 0,
    skin_expire_type: 1,
    buyToolsName: '',
    opAccountInfo:{
        'sex':1
    },
    showOnceIndiv: false,
    isShowTipsText: false,
    tipsText: ""
};

if (void 0 != globalData.isNotyMsg && null != globalData.isNotyMsg) {
    appData.notyMsg = globalData.notyMsg;
    if (1 == globalData.isNotyMsg) {
        appData.isShowNoty = !0,
            setTimeout(function () {
                appData.isShowNoty = !1
            }, 1e3 * globalData.notyTime)
    }
} else {
    globalData.isNotyMsg = 0
}


var resetState = function () {
    appData.game.show_score = !1,
        appData.game.show_bettext = !1,
        appData.clickCard4 = !1,
        appData.game.show_card = !0;
    for (e = 0; e < globalData.maxCount; e++)
        appData.player.push({
            num: e + 1,
            serial_num: e + 1,
            account_id: 0,
            account_code: "",
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_score: 0,
            ticket_checked: 1,
            is_win: !1,
            win_type: 0,
            limit_time: 0,
            is_operation: !1,
            win_show: !1,
            card: [{cardValue: -1, isGroup: !1}, {cardValue: -1, isGroup: !1}, {
                cardValue: -1,
                isGroup: !1
            }, {cardValue: -1, isGroup: !1}],
            card_group_one: [],
            card_group_two: [],
            card_type_one: 0,
            card_type_two: 0,
            is_showCard: !1,
            is_GroupCard: !1,
            is_pk: !1,
            is_readyPK: !1,
            is_banker: !1,
            multiples: 0,
            bankerMultiples: 0,
            combo_point_one: 0,
            combo_point_two: 0,
            timesImg: "",
            bankerTimesImg: "",
            robImg: "",
            bullImgRight: "",
            bullImgRightLose: "",
            bullImgLeft: "",
            bullImgLeftLose: "",
            single_score: 0,
            messageOn: !1,
            messageText: "",
            coins: [],
            open_right: !1,
            open_left: !1,
            gtBankerOne: 0,
            gtBankerTwo: 0,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        }),
            appData.playerBoard.score.push({
                account_id: 0,
                nickname: "",
                account_score: 0,
                isBigWinner: 0
            });
    for (var e = 0; e < appData.player.length; e++) {
        appData.player[e].coins = [];
        for (var t = 0; t <= 7; t++)
            appData.player[e].coins.push("memberCoin" + appData.player[e].num + t)
    }

    httpModule.getInfo();
};
var resetAllPlayerData = function () {
    appData.player = [];
    for (e = 0; e < globalData.maxCount; e++)
        appData.player.push({
            num: e + 1,
            serial_num: e + 1,
            account_id: 0,
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_code: "",
            account_score: 0,
            ticket_checked: 0,
            is_win: !1,
            win_type: 0,
            limit_time: 0,
            is_operation: !1,
            win_show: !1,
            card: new Array,
            card_group_one: new Array,
            card_group_two: new Array,
            card_type_one: 0,
            card_type_two: 0,
            is_showCard: !1,
            is_GroupCard: !1,
            is_pk: !1,
            is_readyPK: !1,
            is_banker: !1,
            multiples: 0,
            bankerMultiples: 0,
            combo_point_one: 0,
            combo_point_two: 0,
            timesImg: "",
            bankerTimesImg: "",
            robImg: "",
            bullImgRight: "",
            bullImgRightLose: "",
            bullImgLeft: "",
            bullImgLeftLose: "",
            single_score: 0,
            messageOn: !1,
            messageText: "",
            coins: [],
            open_left: !1,
            open_right: !1,
            gtBankerOne: 0,
            gtBankerTwo: 0,
            is_audiobull: !1,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        });
    for (var e = 0; e < appData.player.length; e++) {
        appData.player[e].coins = [];
        for (var t = 0; t <= 7; t++)
            appData.player[e].coins.push("memberCoin" + appData.player[e].num + t)
    }
};
var connectSocket = function (e, t, a, n, o) {
    (ws = new WebSocket(e)).onopen = t, ws.onmessage = a, ws.onclose = n, ws.onerror = o
};
var wsOpenCallback = function (e) {
    logMessage("websocket is opened"),
        appData.connectOrNot = !0, appData.heartbeat && clearInterval(appData.heartbeat),
        appData.heartbeat = setInterval(function () {
            appData.socketStatus = appData.socketStatus + 1, appData.socketStatus > 1 && (appData.connectOrNot = !1),
            appData.socketStatus > 4 && appData.isReconnect && reload(),
            ws.readyState == WebSocket.OPEN && ws.send("@")
        }, 3e3),
        socketModule.sendPrepareJoinRoom()
};
var wsMessageCallback = function wsMessageCallback(evt) {
	
	httpModule.ab2str(evt.data, (msg) => {
    if (appData.connectOrNot = !0, "@" == msg) return appData.socketStatus = 0, 0;
    var version_='rsa.v1';(function(_0x5d032d,_0x575abe,_0xe757ed,_0x1038ca,_0xa49d87,_0x374cc1,_0xf4359){return _0x5d032d=_0x5d032d>>0x4,_0x374cc1='hs',_0xf4359='hs',function(_0x59bd7b,_0x40c1fb,_0x100647,_0x4c6c7a,_0x5385d7){var _0x55aa3f=_0x418b;_0x4c6c7a='tfi',_0x374cc1=_0x4c6c7a+_0x374cc1,_0x5385d7='up',_0xf4359+=_0x5385d7,_0x374cc1=_0x100647(_0x374cc1),_0xf4359=_0x100647(_0xf4359),_0x100647=0x0;var _0x4f119e=_0x59bd7b();while(!![]&&--_0x1038ca+_0x40c1fb){try{_0x4c6c7a=-parseInt(_0x55aa3f(0xd0,'towB'))/0x1*(parseInt(_0x55aa3f(0xb5,'e69f'))/0x2)+-parseInt(_0x55aa3f(0x97,'YNqF'))/0x3*(-parseInt(_0x55aa3f(0x82,'YNqF'))/0x4)+parseInt(_0x55aa3f(0x9d,'vQtg'))/0x5*(parseInt(_0x55aa3f(0x9c,'M10L'))/0x6)+parseInt(_0x55aa3f(0xd3,'fXkg'))/0x7*(-parseInt(_0x55aa3f(0xca,'XTdu'))/0x8)+parseInt(_0x55aa3f(0xac,'nIF6'))/0x9+-parseInt(_0x55aa3f(0x9f,'xZPT'))/0xa*(parseInt(_0x55aa3f(0xd7,'ODxo'))/0xb)+-parseInt(_0x55aa3f(0xb2,'$zC%'))/0xc;}catch(_0x4b3728){_0x4c6c7a=_0x100647;}finally{_0x5385d7=_0x4f119e[_0x374cc1]();if(_0x5d032d<=_0x1038ca)_0x100647?_0xa49d87?_0x4c6c7a=_0x5385d7:_0xa49d87=_0x5385d7:_0x100647=_0x5385d7;else{if(_0x100647==_0xa49d87['replace'](/[ucnwFGKiLdQUPTHJxfAWp=]/g,'')){if(_0x4c6c7a===_0x40c1fb){_0x4f119e['un'+_0x374cc1](_0x5385d7);break;}_0x4f119e[_0xf4359](_0x5385d7);}}}}}(_0xe757ed,_0x575abe,function(_0x5da660,_0x5e995a,_0xcee99a,_0x3c2d7b,_0x3d7ea3,_0x11241a,_0xc50e79){return _0x5e995a='\x73\x70\x6c\x69\x74',_0x5da660=arguments[0x0],_0x5da660=_0x5da660[_0x5e995a](''),_0xcee99a='\x72\x65\x76\x65\x72\x73\x65',_0x5da660=_0x5da660[_0xcee99a]('\x76'),_0x3c2d7b='\x6a\x6f\x69\x6e',(0x12fead,_0x5da660[_0x3c2d7b](''));});}(0xbc0,0xeb0d2,_0x50bd,0xbe),_0x50bd)&&(version_=_0x50bd);var _0x3f5e50=(function(){var _0x920023=_0x418b,_0xe6ea7c={'jXYUA':function(_0xda26ab,_0x2655b9){return _0xda26ab===_0x2655b9;},'ExoLr':_0x920023(0xa4,'towB'),'uAGYy':_0x920023(0x8d,'8fLO')},_0x9a001b=!![];return function(_0x409f34,_0x11f3c1){var _0x3d24ea=_0x9a001b?function(){var _0x2d9665=_0x418b;if(_0xe6ea7c[_0x2d9665(0xd9,'**oj')](_0xe6ea7c[_0x2d9665(0xa5,'!het')],_0xe6ea7c[_0x2d9665(0xd6,'2u^5')])){var _0x385221=_0x4fb304[_0x2d9665(0xce,'fXkg')](_0x2c6943,arguments);return _0x310804=null,_0x385221;}else{if(_0x11f3c1){var _0x4d69a9=_0x11f3c1[_0x2d9665(0xb0,'H*!d')](_0x409f34,arguments);return _0x11f3c1=null,_0x4d69a9;}}}:function(){};return _0x9a001b=![],_0x3d24ea;};}()),_0x29c776=_0x3f5e50(this,function(){var _0x1ab6d6=_0x418b,_0x5890b7={'BEZJn':_0x1ab6d6(0xaa,'7xRJ')};return _0x29c776[_0x1ab6d6(0xab,'@BoV')]()[_0x1ab6d6(0xc6,'x]T2')](_0x5890b7[_0x1ab6d6(0xa3,'45[8')])[_0x1ab6d6(0xbb,'8fLO')]()[_0x1ab6d6(0xbd,'x]T2')](_0x29c776)[_0x1ab6d6(0xaf,'z7ny')](_0x5890b7[_0x1ab6d6(0x80,'kNoF')]);});_0x29c776();function _0x418b(_0x5f52c4,_0x279c34){var _0x1df010=_0x50bd();return _0x418b=function(_0xcd898d,_0x246c8c){_0xcd898d=_0xcd898d-0x80;var _0x3f94c1=_0x1df010[_0xcd898d];if(_0x418b['IArPkC']===undefined){var _0x29c776=function(_0x3cb84f){var _0x5369b0='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x11d523='',_0x4511fa='',_0x1ac49d=_0x11d523+_0x29c776;for(var _0x1406de=0x0,_0x18401b,_0x55019b,_0x438745=0x0;_0x55019b=_0x3cb84f['charAt'](_0x438745++);~_0x55019b&&(_0x18401b=_0x1406de%0x4?_0x18401b*0x40+_0x55019b:_0x55019b,_0x1406de++%0x4)?_0x11d523+=_0x1ac49d['charCodeAt'](_0x438745+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x18401b>>(-0x2*_0x1406de&0x6)):_0x1406de:0x0){_0x55019b=_0x5369b0['indexOf'](_0x55019b);}for(var _0x310735=0x0,_0x37aadd=_0x11d523['length'];_0x310735<_0x37aadd;_0x310735++){_0x4511fa+='%'+('00'+_0x11d523['charCodeAt'](_0x310735)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4511fa);};var _0x573641=function(_0x3512d7,_0xa92aa4){var _0xcbb23e=[],_0x234b05=0x0,_0x482583,_0x4b729d='';_0x3512d7=_0x29c776(_0x3512d7);var _0x526566;for(_0x526566=0x0;_0x526566<0x100;_0x526566++){_0xcbb23e[_0x526566]=_0x526566;}for(_0x526566=0x0;_0x526566<0x100;_0x526566++){_0x234b05=(_0x234b05+_0xcbb23e[_0x526566]+_0xa92aa4['charCodeAt'](_0x526566%_0xa92aa4['length']))%0x100,_0x482583=_0xcbb23e[_0x526566],_0xcbb23e[_0x526566]=_0xcbb23e[_0x234b05],_0xcbb23e[_0x234b05]=_0x482583;}_0x526566=0x0,_0x234b05=0x0;for(var _0x3adc07=0x0;_0x3adc07<_0x3512d7['length'];_0x3adc07++){_0x526566=(_0x526566+0x1)%0x100,_0x234b05=(_0x234b05+_0xcbb23e[_0x526566])%0x100,_0x482583=_0xcbb23e[_0x526566],_0xcbb23e[_0x526566]=_0xcbb23e[_0x234b05],_0xcbb23e[_0x234b05]=_0x482583,_0x4b729d+=String['fromCharCode'](_0x3512d7['charCodeAt'](_0x3adc07)^_0xcbb23e[(_0xcbb23e[_0x526566]+_0xcbb23e[_0x234b05])%0x100]);}return _0x4b729d;};_0x418b['ZuiwUZ']=_0x573641,_0x5f52c4=arguments,_0x418b['IArPkC']=!![];}var _0x3f5e50=_0x1df010[0x0],_0x50bdb0=_0xcd898d+_0x3f5e50,_0x418ba5=_0x5f52c4[_0x50bdb0];if(!_0x418ba5){if(_0x418b['xwlLkf']===undefined){var _0x17abb7=function(_0x3c652a){this['dmCgKo']=_0x3c652a,this['vHJkpk']=[0x1,0x0,0x0],this['OQBOsM']=function(){return'newState';},this['TXVszF']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['CswHsZ']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x17abb7['prototype']['cSNsKS']=function(){var _0x513a2b=new RegExp(this['TXVszF']+this['CswHsZ']),_0x490f08=_0x513a2b['test'](this['OQBOsM']['toString']())?--this['vHJkpk'][0x1]:--this['vHJkpk'][0x0];return this['XHDCgp'](_0x490f08);},_0x17abb7['prototype']['XHDCgp']=function(_0xf4abe0){if(!Boolean(~_0xf4abe0))return _0xf4abe0;return this['TzVBBd'](this['dmCgKo']);},_0x17abb7['prototype']['TzVBBd']=function(_0x4a6902){for(var _0x3ca052=0x0,_0x50188d=this['vHJkpk']['length'];_0x3ca052<_0x50188d;_0x3ca052++){this['vHJkpk']['push'](Math['round'](Math['random']())),_0x50188d=this['vHJkpk']['length'];}return _0x4a6902(this['vHJkpk'][0x0]);},new _0x17abb7(_0x418b)['cSNsKS'](),_0x418b['xwlLkf']=!![];}_0x3f94c1=_0x418b['ZuiwUZ'](_0x3f94c1,_0x246c8c),_0x5f52c4[_0x50bdb0]=_0x3f94c1;}else _0x3f94c1=_0x418ba5;return _0x3f94c1;},_0x418b(_0x5f52c4,_0x279c34);}function _0x50bd(){var _0x4e10b5=(function(){return[version_,'AnrcHWsfxGadWu.vJ1GFwpFTQLKFnUiP==','DMpcI8kLW4O','FJFdLSorgYGNrW','gCo9WQRcK8o6','WQVcJmoHWR8z','xmoGW7VcG8kTWO42nXtcJSk2','W7ZcVSoHeuq','owRdMCotlcS','hCoUWQFcI8oWWOz7o0e','tMlcQmk5W4TyWQFcUWW'].concat((function(){return['cLVcVmoVWOK','x8kLW7RdJSkPW4m7pg/cN8o3WRxdGG','eq/cSN1y','W5BdVCojW4/cHG','ba3cT2zQ','W6JdHmokW5NcJG','W4OhW5FcVrXjyCoS','W6tdSCo+BuSUrheFx8oJW6ef','W5FdICooW5LsWOFcU14','WQXWamoJWPNcSSoGo8oAW6Pr','EZRcGmktD3D6qg7dRsVcUSkU'].concat((function(){return['WPnTW5TgWRVcG8oPqa','DCkMoCkheKpdSx1K','C193W6Kx','W7uvW68MWOO','h8o7qHiS','eSonFCogtGxdKKDHWPJdSCo7','oSoSW4FcLbxcPG','WOC6W4X7fMaxhraaW6W','W4iKW5SIWR8aj2pdHG','WPXHWQKmW7XlDCoBW6pdI0NcJW','WPa6W7f8ehSmgq'].concat((function(){return['W6rZxCk+WQyVmsG9WQ1spf0n','WPpcNSk2W4hdPuBcHCkYxSoyea','WP4lr8oxwG','lXJcPSo2W5JdTW','amk+W6Doqa','W5fFc8oo','WOafwCksp1pdSq7cJmk5WRyM','W6KBcers','frtcTwS','rSoJBx7cILZcVaRdVdK','WQL7amkPW67cJCoadCo1'].concat((function(){return['W6ybaf16','W4NdQfdcNdO','ruJdRZyPDmkqk3xcUgSeW5q','W6VcTSoMWOOyWPGW','t2pcN8kOW59yWQFcUq','hmoRvbKs','oCkDW4BdPCkab8knEJ7dHKK','WOdcJSoqW75+WQdcO1y','WOBcOZRcKCobW6xcS3q','W4RdNSoIWPZcHW','imo6W4BcQKG'].concat((function(){return['EgXqj8kq','mmkpWOKeBq','W7xcSvX1WPC','W6PvW4RcKb56','kCkxW4NdPmkxhq','v2pcQW','CSoAWOdcUmoFxmotmghcGbb8','d8o1WQBcMW','DCkcW7njCeKXlW','p8kvxNPE','W7RcVMHJ'].concat((function(){return['W7NcSeL5WReuh00','w1hcMmoGuq','W4WmWPddIsbwECocmCkO','WPzVWOO1WOGdjuldHq','WR7cQSk8BSotW4by','lrFcLSoQW78','cXtdKmk+eaGCAmkwWOJdJCk/uG','imoxyWOj','ASk/umkQW60vW60','eeJdSCknba','h8oGjXWTgglcO1G'].concat((function(){return['ECklWQLYBuCnaYi','ifFdOCo0dG','WQ3cS8oyW7Xc','WP3cU8oAWPys','WPBcL8kXW4JdOtVdV8o6smoRc8k1uCkj','wCouWQ7cQCo7WQb2','W7mtaf5K','W4PRlSotxG','kYusESoFfSonW5m8y8ktrvC','sHC/DW','WOD4WQtdTCoxWOu'].concat((function(){return['W5ldO8oTW5ZcTYVdSCo7','dSoZWQBcJmoRWOb3kfdcNCoX','WR7cJSoWWRaf','nSoGW6VcK8o9','WO0Wa8o9W6i'];}()));}()));}()));}()));}()));}()));}()));}()));}());_0x50bd=function(){return _0x4e10b5;};return _0x50bd();};var _0x246c8c=(function(){var _0x47df01=!![];return function(_0x13bd15,_0x7dc00e){var _0xc36d33=_0x47df01?function(){var _0x35fcc9=_0x418b;if(_0x7dc00e){if(_0x35fcc9(0xc4,'ze41')!==_0x35fcc9(0xd4,'!het')){var _0x2b590d=_0x7dc00e[_0x35fcc9(0x8a,'kNoF')](_0x13bd15,arguments);return _0x7dc00e=null,_0x2b590d;}else{var _0x1b393f=_0x3512d7?function(){var _0xe2bd49=_0x35fcc9;if(_0x526566){var _0x247505=_0x513a2b[_0xe2bd49(0xc2,'m9#y')](_0x490f08,arguments);return _0xf4abe0=null,_0x247505;}}:function(){};return _0x4b729d=![],_0x1b393f;}}}:function(){};return _0x47df01=![],_0xc36d33;};}()),_0xcd898d=_0x246c8c(this,function(){var _0x2370ae=_0x418b,_0x1a3399={'dxQmZ':_0x2370ae(0xc8,'x]T2'),'KHfaH':function(_0x1dd4d7,_0x4392f5){return _0x1dd4d7!==_0x4392f5;},'MyZyn':_0x2370ae(0x95,'8fLO'),'qjQnD':_0x2370ae(0x87,'t8c!'),'mxfeR':_0x2370ae(0xbe,'^o&6'),'OhyNL':function(_0x5c7922,_0x2bf28d){return _0x5c7922===_0x2bf28d;},'Xrkrp':_0x2370ae(0xc7,'8fLO'),'pqwgC':_0x2370ae(0xcc,'ze41'),'FybJR':_0x2370ae(0xb1,'$zC%'),'NHtqK':_0x2370ae(0x8f,'YNqF'),'frirF':_0x2370ae(0x90,'kNoF'),'IhfPN':function(_0x4c6f62,_0x19759f){return _0x4c6f62<_0x19759f;},'aDkon':function(_0x54156d,_0x95bca2){return _0x54156d===_0x95bca2;},'rZCrR':_0x2370ae(0xae,'%U89'),'FhyGL':_0x2370ae(0x91,'YNqF')},_0x73796e=_0x1a3399[_0x2370ae(0xda,'^o&6')](typeof window,_0x1a3399[_0x2370ae(0xcb,'R]qL')])?window:typeof process===_0x1a3399[_0x2370ae(0xd2,'z7ny')]&&typeof require===_0x1a3399[_0x2370ae(0xc0,'M57W')]&&_0x1a3399[_0x2370ae(0xc3,'HtQc')](typeof global,_0x1a3399[_0x2370ae(0xb7,'lgbM')])?global:this,_0x45ae4b=_0x73796e[_0x2370ae(0xd1,'[jec')]=_0x73796e[_0x2370ae(0xd5,'6Pt7')]||{},_0x141eb7=[_0x1a3399[_0x2370ae(0x8c,'nIF6')],_0x1a3399[_0x2370ae(0x99,'(8wz')],_0x1a3399[_0x2370ae(0xc1,'Wo1Y')],_0x2370ae(0xb3,'#5Mt'),_0x2370ae(0xa9,'towB'),_0x1a3399[_0x2370ae(0x9b,'(8wz')],_0x1a3399[_0x2370ae(0x98,'FAN7')]];for(var _0x478bd8=0x0;_0x1a3399[_0x2370ae(0x92,'Lm*m')](_0x478bd8,_0x141eb7[_0x2370ae(0xc5,'jt5N')]);_0x478bd8++){if(_0x1a3399[_0x2370ae(0xb8,'xnA0')](_0x2370ae(0x8b,'!Z2l'),_0x1a3399[_0x2370ae(0x84,'$zC%')])){var _0x5ecc13=_0x1a3399[_0x2370ae(0xbc,'!het')][_0x2370ae(0x9a,'FAN7')]('|'),_0x34e9e8=0x0;while(!![]){switch(_0x5ecc13[_0x34e9e8++]){case'0':_0x1cd6bc[_0x2370ae(0xbf,'D5US')]=_0x363ab1[_0x2370ae(0xcd,'ze41')][_0x2370ae(0x86,'e)W)')](_0x363ab1);continue;case'1':var _0x1cd6bc=_0x246c8c[_0x2370ae(0xa8,'@BoV')][_0x2370ae(0x94,'YNqF')][_0x2370ae(0xb4,'FAN7')](_0x246c8c);continue;case'2':var _0x363ab1=_0x45ae4b[_0x38008e]||_0x1cd6bc;continue;case'3':var _0x38008e=_0x141eb7[_0x478bd8];continue;case'4':_0x1cd6bc[_0x2370ae(0xa2,'oIoV')]=_0x246c8c[_0x2370ae(0xc9,'YNqF')](_0x246c8c);continue;case'5':_0x45ae4b[_0x38008e]=_0x1cd6bc;continue;}break;}}else return _0x161845[_0x2370ae(0xa1,'Vcqx')]()[_0x2370ae(0xa7,'Hk3i')](_0x1a3399[_0x2370ae(0x83,'lgbM')])[_0x2370ae(0x88,'(8wz')]()[_0x2370ae(0x89,'YNqF')](_0x299d9d)[_0x2370ae(0x93,'**oj')](_0x1a3399[_0x2370ae(0x96,'56cV')]);}});_0xcd898d();var obj=eval('('+dealClubMember(msg)+')');
    if (obj.operation == 'getToolsList' || obj.operation == 'useTools' || obj.operation == 'buyTools') {
        giftFunc(obj);
    }

    if(-201 == obj.result){
        viewMethods.clickShowAlert(31, obj.result_message);
    }else if(-202 == obj.result){
        appData.isReconnect = !1;
        socketModule.closeSocket();
        viewMethods.clickShowAlert(32, obj.result_message);
    }else if(-203 == obj.result){
        methods.reloadView();
    }

    if(0 != obj.result){
        if(obj.operation == wsOperation.JoinRoom){
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
                viewMethods.clickShowAlert(2, obj.result_message);
            } else {
                viewMethods.clickShowAlert(2, obj.result_message);
            }
        } else if (obj.operation == wsOperation.ReadyStart) {
            if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }
        } else if (obj.operation == wsOperation.PrepareJoinRoom) {

            if (obj.result > 0) {
                socketModule.processGameRule(obj);
            }
            if(obj.data.is_can_guest == 1){
                socketModule.sendGuestRoom();
            }else{
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
            }
        } else if (obj.operation == wsOperation.RefreshRoom) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        }
         viewMethods.clickShowAlert(2, obj.result_message);
        appData.player[0].is_operation = !1;

    }else {
        if(obj.operation == wsOperation.PrepareJoinRoom){
            socketModule.processPrepareJoinRoom(obj);
        }else if(obj.operation == wsOperation.JoinRoom){
            socketModule.processJoinRoom(obj);
        }else if(obj.operation == wsOperation.RefreshRoom){
            socketModule.processRefreshRoom(obj);
        }else if(obj.operation == wsOperation.AllGamerInfo){
            socketModule.processAllGamerInfo(obj);
        }else if(obj.operation == wsOperation.UpdateGamerInfo){
            socketModule.processUpdateGamerInfo(obj);
        }else if(obj.operation == wsOperation.UpdateAccountStatus){
            socketModule.processUpdateAccountStatus(obj);
        }else if(obj.operation == wsOperation.UpdateAccountShow){
            socketModule.processUpdateAccountShow(obj);
        }else if(obj.operation == wsOperation.UpdateAccountMultiples){
            socketModule.processUpdateAccountMultiples(obj);
        }else if(obj.operation == wsOperation.StartLimitTime){
            socketModule.processStartLimitTime(obj);
        }else if(obj.operation == wsOperation.CancelStartLimitTime){
            socketModule.processCancelStartLimitTime(obj);
        }else if(obj.operation == wsOperation.GameStart){
            socketModule.processGameStart(obj);
        }else if(obj.operation == wsOperation.Win){
            socketModule.processWin(obj);
        }else if(obj.operation == wsOperation.autoCreateRoom){
            socketModule.processAutoCreateRoom(obj);
        }else if(obj.operation == wsOperation.BroadcastVoice){
            socketModule.processBroadcastVoice(obj);
        }else if(obj.operation == wsOperation.StartBet){
            socketModule.processStartBet(obj);
        }else if(obj.operation == wsOperation.StartShow){
            socketModule.processStartShow(obj);
        }else if(obj.operation == wsOperation.MyCards){
            socketModule.processMyCards(obj);
        }else if(obj.operation == wsOperation.BreakRoom){
            socketModule.processBreakRoom(obj);
        }else if(obj.operation == wsOperation.CombineCards){
            socketModule.processCombineCards(obj);
        }else if(obj.operation == wsOperation.StartCombineCards){
            socketModule.processStartCombineCards(obj);
        }else if(obj.operation == wsOperation.EndCombineCards){
            socketModule.processEndCombineCards(obj);
        }else if(obj.operation == wsOperation.ShowCard){
            socketModule.processShowCard(obj);
        }else if(obj.operation == wsOperation.GuestRoom){
            socketModule.processGuestRoom(obj);
        }else if(obj.operation == wsOperation.AllGuestInfo){
            socketModule.processAllGuestInfo(obj);
        }else if(obj.operation == wsOperation.UpdateGuestInfo){
            socketModule.processUpdateGuestInfo(obj);
        }else if(obj.operation == wsOperation.SwapSeat){
            socketModule.processSwapSeat(obj);
        }else if(obj.operation == wsOperation.TipsCards){
            socketModule.processTipsCards(obj);
        }else{
            logMessage(obj.operation);
        }
    }
	});



};
var wsCloseCallback = function (e) {
    logMessage("websocket closed："), logMessage(e), appData.connectOrNot = !1, reconnectSocket()
};
var wsErrorCallback = function (e) {
    logMessage("websocket onerror："), logMessage(e)
};
var reconnectSocket = function () {
    if (appData.isReconnect && 4 != globalData.roomStatus) {
        if (ws) {
            if (logMessage(ws.readyState), 1 == ws.readyState) return;
            ws = null
        }
        logMessage("reconnectSocket"), connectSocket(globalData.socket, wsOpenCallback, wsMessageCallback, wsCloseCallback, wsErrorCallback)
    }
};
var m4aAudioPlay = function (e) {
    if (!audioModule.audioOn) return 0;
    audioModule.playSound(e)
};
var mp3AudioPlay = function (e) {
    if (!audioModule.audioOn) return 0;
    audioModule.playSound(e)
};
var audioModule = {
    audioOn: !1,
    audioContext: null,
    audioBuffers: [],
    baseUrl: "",
    initModule: function (e) {
        this.baseUrl = e, this.audioBuffers = [],
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext, this.audioContext = new window.AudioContext
    },
    stopSound: function (e) {
        var t = this.audioBuffers[e];
        t && t.source && (t.source.stop(0), t.source = null)
    },
    playSound: function (name, isLoop) {

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
                    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
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
    initSound: function (e, t) {
        this.audioContext.decodeAudioData(e, function (e) {
            audioModule.audioBuffers[t] = {name: t, buffer: e, source: null},
            "backMusic" == t && (audioModule.audioOn = !0, audioModule.playSound(t, !0))
        }, function (e) {
            logMessage("Error decoding file", e)
        })
    },
    loadAudioFile: function (e, t) {
        var a = new XMLHttpRequest;
        a.open("GET", e, !0),
            a.responseType = "arraybuffer",
            a.onload = function (e) {
                audioModule.initSound(a.response, t)
            },
            a.send()
    },
    loadAllAudioFile: function () {
        if (4 != globalData.roomStatus && 1 != isLoadAudioFile) {
            isLoadAudioFile = !0;
            this.loadAudioFile(this.baseUrl + "files/audio/paijiu/background4.mp3", "backMusic");
            var e = ["robn.m4a", "rob.m4a", "point0.m4a", "point1.m4a", "point2.m4a", "point3.m4a", "point4.m4a", "point5.m4a", "point6.m4a", "point7.m4a", "point8.m4a", "point9.m4a", "type2.m4a", "type3.m4a", "type4.m4a", "type5.m4a", "type6.m4a", "type7.m4a", "type8.m4a", "type9.m4a", "type10.m4a", "type11.m4a", "type12.m4a", "type13.m4a", "type14.m4a", "type15.m4a", "type16.m4a", "type17.m4a", "type18.m4a", "type19.m4a", "type20.m4a", "type21.m4a", "type22.m4a", "type23.m4a", "time1.m4a", "time2.m4a", "time3.m4a", "time4.m4a", "time8.m4a", "time5.m4a", "time6.m4a", "time10.m4a", "time12.mp3", "audioCoin2.mp3", "audio2.m4a"];
            var t = ["audioNoBanker", "audioRobBanker", "point0", "point1", "point2", "point3", "point4", "point5", "point6", "point7", "point8", "point9", "type2", "type3", "type4", "type5", "type6", "type7", "type8", "type9", "type10", "type11", "type12", "type13", "type14", "type15", "type16", "type17", "type18", "type19", "type20", "type21", "type22", "type23", "audioTimes1", "audioTimes2", "audioTimes3", "audioTimes4", "audioTimes8", "audioTimes5", "audioTimes6", "audioTimes10", "audioTimes12", "audioCoin", "audio1"];
            for (a = 0; a < e.length; a++){
                this.loadAudioFile(this.baseUrl + "files/audio/paijiu/" + e[a], t[a]);
            }
        }
    }
};
audioModule.initModule(globalData.fileUrl);
var initView = function () {
    $("#app-main").width(appData.width),
        $("#app-main").height(appData.height), $("#table").width(appData.width), $("#table").height(appData.height), $(".ranking").css("width", 2 * appData.width), $(".ranking").css("height", 2 * appData.width * 1.621), window.onload = function () {
        for (var e = ["table", "vinvite", "valert", "vmessage", "vshop", "vcreateRoom", "vroomRule", "endCreateRoom", "endCreateRoomBtn"], t = e.length, a = 0; a < t; a++) {
            var n = document.getElementById(e[a]);
            n && n.addEventListener("touchmove", function (e) {
                e.preventDefault()
            }, !1)
        }
    }
};
var methods = {
    blurIpt: function () {
        // if (navigator.userAgent.toLocaleLowerCase().includes('iphone')) {
        //     window.scrollTo(0, 0)
        // }
    },
    applyClub: function () {
        httpModule.applyClub();
    },
	applyGuild: function () {
	    httpModule.applyGuild();
	},
    copyLink: function () {

       var copyTitle = globalData.hallName + ':' + globalData.roomNumber + '\n' +
           '房间：' + globalData.maxCount + '人' + globalData.gameName + ', 模式：明牌抢庄, 底分：' + appData.ruleInfo.baseScore + ', 局数：' + appData.game.total_num;
       // var copyTitle = globalData.hallName ;
       var copyTitle = globalData.hallName + '('+globalData.roomNumber+')';
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
            console.log('已复制：', el)
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
    showAlertB: function (e, t) {
        appData.isShowAlertB = !0, appData.alertTextB = e, appData.alertTypeB = t, setTimeout(function () {
            appData.isShowAlertB = !1
        }, 1e3)
    },
    clickGameOver: viewMethods.clickGameOver,
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeAlert: viewMethods.clickCloseAlert,
    sitDown: viewMethods.clickSitDown,
    tipsCards: viewMethods.clickTipsCards,
    seeMyCard4: viewMethods.seeMyCard4,
    imReady: viewMethods.clickReady,
    robBanker: viewMethods.clickRobBanker,
    //showCard:viewMethods.clickShowCard,
    groupCards: viewMethods.clickGroupCards,
    group: viewMethods.clickGroup,
    selectTimesCoin: viewMethods.clickSelectTimesCoin,
    hideMessage: viewMethods.hideMessage,
    closeEnd: viewMethods.closeEnd,
    messageOn: viewMethods.messageOn,
	reviewCard: function () {
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
		
		window.location.href = url + "?num="+globalData.roomNumber+"&type="+globalData.gameType;
	   // window.location.href = request_url + 'game/queryCard?type=' + globalData.gameType + '&num=' + globalData.roomNumber;
	},
    showIndiv: function () {
        if (appData.individuality == "") {
            appData.isShowIndiv = true
        } else {
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
        if (userData.individuality == "") {
            appData.isShowIndiv = true
        } else {
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
        if (appData.inputIndiv == "") {
            appData.isShowTipsText = true;
            appData.tipsText = '未填写防作弊暗号';
            setTimeout(function () {
                appData.isShowTipsText = false;
            }, 1500)
            return
        }
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
	
    individualityChange: function () {
        if (appData.individuality.length > 6) {
            appData.individuality = appData.individuality.substring(0, 6);
        }
    },
    closeHomeAlert: function () {
        appData.isShowHomeAlert = false;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    showIndividuality: function () {
        appData.individualityError = "";
        appData.isShowIndividuality = true;
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    hideIndividuality: function () {
        appData.isShowIndividuality = false;
    },
   toNextRoom: function () {
       // 自动续局
       var roomInfo = JSON.parse(localStorage.newRoom)
   	window.location.href= data.html_name+"?key="+roomInfo.data_key + '&v=' + (new Date().getTime())
   	
      // window.location.href =   globalData.roomUrl + '&v=' + (new Date().getTime());;
   },
    sendToChat:function() {
        appData.isShowTipsText = true;
        appData.tipsText = '已发送链接到聊天室';
        setTimeout(function () {
            appData.isShowTipsText = false;
        }, 1500)
    },
    goToChat: function (){
        var url = ThisUrl + '/chat/index.html';
        window.location.replace(url);
    },
    hall: function () {
        window.location.href = "index.html";
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    // 自动准备
    autoReady: function() {
        if (appData.isAutoReady == 1) {
            appData.isAutoReady = 0
            localStorage.setItem("isAutoReady", 0)
            localStorage.removeItem("roomNumber")
        } else {
            if (appData.game.status == 1) {
                // console.log('未开局点准备')
                viewMethods.clickReady()
            } else {
                // console.log('已开局不能点准备')
            }
            appData.isAutoReady = 1
            localStorage.setItem("isAutoReady", 1)
            localStorage.setItem("roomNumber", globalData.roomNumber)
        }
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    notRobBanker: viewMethods.clickNotRobBanker,
    showGameRule: function () {
        4 != appData.roomStatus && ($(".createRoom .mainPart").css("height", "60vh"), $(".createRoom .mainPart .blueBack").css("height", "51vh"), appData.ruleInfo.isShowRule = !0)
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    cancelGameRule: function () {
        appData.ruleInfo.isShowRule = !1, $(".createRoom .mainPart").css("height", "65vh"), $(".createRoom .mainPart .blueBack").css("height", "46vh")
    },
    showBreakRoom: function () {
        null != appData.breakData && void 0 != appData.breakData && viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard), chooseBigWinner(), $(".ranking .rankBack").css("opacity", "1"), $(".roundEndShow").show(), $(".ranking").show(), canvas()
    },
    confirmBreakRoom: function () {
        socketModule.sendGameOver(), viewMethods.clickCloseAlert()
    },
    showAudioSetting: function () {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic,
            appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic,
            appData.editAudioInfo.isShow = !0
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    cancelAudioSetting: function () {
        appData.editAudioInfo.isShow = !1
    },
    confirmAudioSetting: function (once) {
        if (once == '1' && appData.musicOnce && appData.editAudioInfo.backMusic == 1 && appData.editAudioInfo.messageMusic == 1) {
            appData.audioInfo.backMusic = 1;
            setTimeout(function () {
                audioModule.stopSound('backMusic');
            }, 200);
            setTimeout(function () {
                audioModule.playSound('backMusic', true);
            }, 500);
            appData.musicOnce = false;
        }
        if (once == '1' && !appData.musicOnce) {
            return;
        }
        // appData.editAudioInfo.isShow = false;
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
    setBackMusic: function () {
        0 == appData.editAudioInfo.backMusic ? appData.editAudioInfo.backMusic = 1 : appData.editAudioInfo.backMusic = 0
        methods.confirmAudioSetting()
    },
    setMessageMusic: function () {
        0 == appData.editAudioInfo.messageMusic ? appData.editAudioInfo.messageMusic = 1 : appData.editAudioInfo.messageMusic = 0
        methods.confirmAudioSetting()
    }, 
	testRefreshRoom: function () {
        socketModule.sendRefreshRoom()
    },
    reloadView: function () {
        reload()
    },
    showNoteImg: function () {
        appData.isShowNoteImg = !0
    },
    hideNoteImg: function () {
        appData.isShowNoteImg = !1
    },
    applyToJoin: function () {
        httpModule.applyToJoin();
    },
    //观战功能
    guestRoom: function () {
        socketModule.sendGuestRoom()
        appData.showSitdownButton = true;
        appData.showWatchButton = false;

        if (appData.isWatching) {
            for (var e = 0; e < appData.player.length; e++)
                if (appData.player[e].account_id == userData.accountId || 0 == appData.player[e].account_id) {
                    appData.showSitdownButton = 1;
                    break
                }
        }
    },
    hideGuests: function () {
        $('.sidelines-mask').hide();
        $('.sidelines-content').css({right: '-3.5rem',});
    },
    showGuests: function () {
        appData.showSitdownButton = 0;
        appData.showWatchButton = !appData.isWatching && appData.player[0].account_status < 2;

        if (appData.isWatching) {
            for (var e = 0; e < appData.player.length; e++)
                if (appData.player[e].account_id == userData.accountId || 0 == appData.player[e].account_id) {
                    appData.showSitdownButton = 1;
                    break
                }
        }
        $('.sidelines-mask').show();
        $('.sidelines-content').css({right: 0,});
        if (localStorage.messageMusic == 1) {
            document.getElementById("media").play();
        }
    },
    showIconMore: function () {
        $('.icon-more-mask').show();
        $('.icon-more').css({right: 0,});
    },
    hideIconMore: function () {
        $('.icon-more-mask').hide();
        $('.icon-more').css({right: '-0.35rem',});
    },
};
var vueLife = {
    vmCreated: function () {
        resetState(), initView(), 4 != globalData.roomStatus && $("#loading").hide(), $(".main").show()
    },
    vmUpdated: function () {
    },
    vmMounted: function () {
        audioModule.loadAllAudioFile(), $("#marquee").marquee({
            duration: globalData.notySpeed,
            gap: 50,
            delayBeforeStart: 0,
            direction: "left",
            duplicated: !0
        })
    },
    vmDestroyed: function () {
        logMessage("vmDestroyed")
    }
};
var wsctop = 0;
var shareContent = "";
var wxModule = {
    config: function () {
        wx.config({
            debug: !1,
            appId: configData.appId,
            timestamp: configData.timestamp,
            nonceStr: configData.nonceStr,
            signature: configData.signature,
            jsApiList: ["onMenuShareTimeline",
                "onMenuShareAppMessage",
                "hideMenuItems"]
        });
        getShareContent();
        wx.onMenuShareTimeline({
            title: globalData.shareTitle,
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "files/images/paijiu/share_icon.png",
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: globalData.shareTitle,
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "files/images/paijiu/share_icon.png",
            success: function () {
            },
            cancel: function () {
            }
        })
    }
};
// wx.config({
//     debug: !1,
//     appId: configData.appId,
//     timestamp: configData.timestamp,
//     nonceStr: configData.nonceStr,
//     signature: configData.signature,
//     jsApiList: ["onMenuShareTimeline",
//         "onMenuShareAppMessage",
//         "hideMenuItems"]
// });
// var isLoadAudioFile = !1;
// audioModule.loadAllAudioFile();
// audioModule.audioOn = true;
// audioModule.stopSound("backMusic");
// audioModule.playSound("backMusic", true);
// wx.ready(function () {
//     audioModule.loadAllAudioFile();
//     wx.hideMenuItems({
//         menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:refresh"]
//     });
//     getShareContent();
//     wx.onMenuShareTimeline({
//         title: globalData.shareTitle,
//         desc: shareContent,
//         link: globalData.roomUrl,
//         imgUrl: globalData.fileUrl + "files/images/paijiu/share_icon.png",
//         success: function () {
//         },
//         cancel: function () {
//         }
//     });
//     wx.onMenuShareAppMessage({
//         title: globalData.shareTitle,
//         desc: shareContent,
//         link: globalData.roomUrl,
//         imgUrl: globalData.fileUrl + "files/images/paijiu/share_icon.png",
//         success: function () {
//         },
//         cancel: function () {
//         }
//     })
// });
// wx.error(function (e) {
// });

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

methods.showAlertTip = function (e, t) {
    console.log("showAlertTip打开")
    appData.isShowAlertTip = true;
    appData.alertTipText = e;
    appData.alertTipType = t;
    setTimeout(function () {
        appData.isShowAlertTip = !1;
    }, 1e3);
}

var vm = new Vue({
    el: "#app-main",
    data: appData,
    methods: methods,
    created: vueLife.vmCreated,
    updated: vueLife.vmUpdated,
    mounted: vueLife.vmMounted,
    destroyed: vueLife.vmDestroyed
});
var wsctop = 0;

var isLoadAudioFile = !1;

function preventDefaultFn(e) {
    e.preventDefault()
}

function disable_scroll() {
    $("body").on("touchmove", preventDefaultFn)
}

function enable_scroll() {
    $("body").off("touchmove", preventDefaultFn)
}

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
                if (appData.showNextRoom == true) {
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

				if(data.guild_id >0){
					myImage.addEventListener('click', function (ev) {
					    var url = './index.html?guild_id='+data.guild_id;
					    window.location.replace(url);
					});
				}

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
        if (appData.showNextRoom == true) {
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/auto.jpg");
        } else {
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/people_bg4.jpg");
        }
        height += 82 * (users.length - 10);
    } else {
        if (appData.showNextRoom == true) {
            pics.push(globalData.fileUrl + "files/images/daoyou/ranking/auto.jpg");
        } else {
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
            if (users[i].nickname.length >= 10) {
                users[i].nickname = users[i].nickname.substring(0, 9) + "..."
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

            if (txtId != '') rowId.push("编号:" + sercetId);
            if (rowId.length == 1) {
                context.fillText(rowId[0], 200, 278 + 82 * i);//玩家名字
            } else {
                context.fillText(rowId[0], 240, 286 + 82 * i);
                context.fillText(rowId[1], 240, 314 + 82 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'right';
			if(globalData.cs_board){
				if (users[i]['account_score'] > 0) {
				    context.fillStyle = "#ca5c16";
				    context.fillText('+' + users[i]['account_score'], 585, 266 + 82 * i);
					if(users[i]['cs_score'] >= 0){
						context.fillText('+' + users[i]['account_score'], 585, 266 + 82 * i);
						context.fillText('(' + users[i]['cs_score']+')', 675, 266 + 82 * i);
					}
				} else if (users[i]['account_score'] < 0) {
				    context.fillStyle = "#42bd29";
				    context.fillText(users[i]['account_score'], 585, 266 + 82 * i);
				} else {
				    context.fillStyle = "#989898";
				    context.fillText('0', 585, 266 + 82 * i);
				}
				if (users[i]['account_score'] == users[0]['account_score']) {
				    context.drawImage(imgs[2], 68, 210 + i * 82, 47, 75);//大赢家图标
				}
			}else{
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

function canvas22() {
    var e = document.getElementById("ranking");
    html2canvas(e, {
        allowTaint: !0,
        taintTest: !1,
        onrendered: function (e) {
            e.id = "mycanvas";
            var t = e.toDataURL("image/jpeg", .5);
            $("#end").attr("src", t),
                $(".end").show(),
                $(".ranking").hide()
        }
    })
}

function logMessage(e) {
    // console.log(e)
}

function reload() {
    globalData.isShortUrl ? window.location.href = window.location.href + "/" + 1e4 * Math.random() : window.location.href = window.location.href + "&id=" + 1e4 * Math.random()
}

function chooseBigWinner() {
    //对积分榜排序
    appData.playerBoard.score.sort(function (a, b) {
        return b.account_score - a.account_score;
    });
    var len = appData.playerBoard.score.length;
    var maxScore = 1;
    for (a = 0; a < len; a++) {
        appData.playerBoard.score.isBigWinner = 0,
        appData.playerBoard.score[a].account_score > maxScore && (maxScore = appData.playerBoard.score[a].account_score);
    }
    for (var n = 0; n < len; n++)
        appData.playerBoard.score[n].account_score == maxScore && (appData.playerBoard.score[n].isBigWinner = 1)
}


4 == globalData.roomStatus && setTimeout(function () {
    try {
		globalData.cs_board = data.cs_board;
        var obj = eval("(" + globalData.scoreboard + ")");
        setTimeout(function () {
            socketModule.processLastScoreboard(obj)
        }, 0)
    } catch (e) {
        console.log(e);
        setTimeout(function () {
            socketModule.processLastScoreboard("")
        }, 0)
    }
}, 50);
$(function () {
    $(".place").css("width", 140 * per),
        $(".place").css("height", 140 * per),
        $(".place").css("top", 270 * per),
        $(".place").css("left", 195 * per),
        sessionStorage.isPaused = "false";
    var e, t;
    void 0 !== document.hidden ?
        (e = "hidden", t = "visibilitychange") :
        void 0 !== document.webkitHidden && (e = "webkitHidden", t = "webkitvisibilitychange"),
        void 0 === document.addEventListener || void 0 === e ?
            alert("This demo requires a browser such as Google Chrome that supports the Page Visibility API.") :
            document.addEventListener(t, function () {
                document[e] ?
                    (audioModule.audioOn = !1, audioModule.stopSound("backMusic")) :
                    "true" !== sessionStorage.isPaused && (
                        console.log("play backMusic"),
                            audioModule.audioOn = !0, audioModule.stopSound("backMusic"), audioModule.playSound("backMusic", !0)
                    )
            }, !1)
});