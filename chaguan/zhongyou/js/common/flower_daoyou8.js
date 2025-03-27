var ws;
var game = {
    "room": 0,
    "room_number": globalData.roomNumber,
    "score": 0,
    "status": 0,
    "time": -1,
    "round": 0,
    "total_num": 10,
    "currentScore": 0,
    "cardDeal": 0,
    "can_open": 0,
    "can_look": 1,
    "is_play": false,
};
globalData.max_count = data.max_count==0?6:data.max_count;
globalData.cfile_url = data.cfile_url;
globalData.file_url = data.file_url;
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
    SwapSeat: "SwapSeat",
    ReadyStart: "ReadyStart",
    PrepareJoinRoom: "PrepareJoinRoom",
    AllGamerInfo: "AllGamerInfo",
    UpdateGamerInfo: "UpdateGamerInfo",
    UpdateAccountStatus: "UpdateAccountStatus",
    StartLimitTime: "StartLimitTime",
    CancelStartLimitTime: "CancelStartLimitTime",
    GameStart: "GameStart",
    NotyChooseChip: "NotyChooseChip",
    CardInfo: "CardInfo",
    PkCard: "PkCard",
    UpdateAccountScore: "UpdateAccountScore",
    OpenCard: "OpenCard",
    Win: "Win",
    autoCreateRoom: "autoCreateRoom",
    Discard: "Discard",
    BroadcastVoice: "BroadcastVoice",
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
    WinJoy: "WinJoy",
    HuanPai: "HuanPai",
    huanpaiNotify: "huanpaiNotify",
    //观战功能
    GuestRoom: "GuestRoom",
    AllGuestInfo: "AllGuestInfo",
    UpdateGuestInfo: "UpdateGuestInfo",
    MyCards: "MyCards",
};

var httpModule = {
    getInfo: function () {
        var postData = {
            "account_id": userData.accountId,
            "room_number": globalData.roomNumber,
            "game_type": globalData.gameType,
            "tk":data.tk
        };
        Vue.http.post(request_url + 'q/getRoomerInfo', postData,{emulateJSON:true}).then(function (response) {
            var bodyData = response.body;
            reconnectSocket();
            appData.is_connect = true;
            // if (bodyData.result == 0) {
            //     reconnectSocket();
            //     appData.is_connect = true;
            //     // if (bodyData.data.length == 0) {
            //     //     reconnectSocket();
            //     //     appData.is_connect = true;
            //     // } else {
            //     //     appData.activity = bodyData.data.concat();
            //     //     viewMethods.clickShowAlert(5, appData.activity[0].content);
            //     // }
            // } else {
            //     console.log(bodyData);
            //     appData.ownerUser.nickname = bodyData.data.nickname;
            //     appData.ownerUser.avatar = bodyData.data.headimgurl;
            //     appData.ownerUser.user_code = bodyData.data.user_code;
            //     appData.applyStatus = bodyData.data.apply_status;
            //     appData.add_user = true;
            //     viewMethods.clickShowAlert(8, bodyData.result_message);
            // }
        }, function (response) {
            logMessage(response.body);
        });
    },
	applyGuild: function () {
	    var postData = {"account_id": appData.applyInfo.room_creator, "guild_id": appData.applyInfo.guild_id,"tk":const_tk};
	    Vue.http.post(request_url + "clubapi/joinGuild", postData,{emulateJSON:true}).then(function (e) {
	
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
    setIndividuality: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
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
    applyToJoin: function () {
        var postData = {"account_id": userData.accountId, "user_code": appData.ownerUser.user_code,"tk":data.tk};
        Vue.http.post(request_url + "friend/applyToJoin", postData,{emulateJSON:true}).then(function (e) {
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
    // sendLog: function () {
    //     //后台密钥校验
    //     var content = JSON.stringify(appData);
    //     var postData={'room_id':appData.game.room, "content":content};
    //     Vue.http.post(request_url+"api/log",postData).then(function(e){
    //     },function(e){
    //     });
    // }
};

var socketModule = {
    //观战功能
    processGuestRoom: function (e) {
        appData.game.room = e.data.room_id;
        appData.game.round = Math.ceil(e.data.game_num);
        appData.game.total_num = Math.ceil(e.data.total_num);
        appData.game.score = Math.ceil(e.data.pool_score);
        appData.game.status = Math.ceil(e.data.room_status);

        appData.game.currentScore = Math.ceil(e.data.benchmark);

        if (2 == appData.game.status) {
            appData.game.cardDeal = 3;
        }

        appData.scoreboard = e.data.scoreboard;
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
        appData.isWatching = 0;
        for (var i = 0; i < appData.guests.length; i++) {
            if (appData.guests[i].account_id == userData.accountId) {
                appData.isWatching = 1;
            }
        }

        if(localStorage.getItem('showOnceIndiv')){


        }else if(appData.individuality!=""&&appData.isWatching==1){
            // 显示一次暗号
            setTimeout(function () {
                appData.showOnceIndiv = true
                setTimeout(function () {
                    appData.showOnceIndiv = false
                    localStorage.setItem('showOnceIndiv',1)
                }, 2500);
            }, 1000);
        }else if(appData.individuality==""&&appData.isWatching==1){
            appData.isShowIndiv=true;
        }
    },
    processUpdateGuestInfo: function (e) {
        for (a = 0; a < appData.guests.length; a++) {
            if (appData.guests[a].account_id == e.data.account_id) {
                break;
            }
        }
        if (e.data.is_guest == 1) {
            if (a == appData.guests.length) {
                appData.guests.push({
                    account_id: e.data.account_id,
                    avatar: e.data.headimgurl,
                    nickname: e.data.nickname
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
            appData.guests.splice(a, 1);
        }
    },

    closeSocket: function () {
        if (ws) {
            try {
                ws.close();
            } catch (error) {
                console.log(error);
            }
        }
    },
    sendData: function (obj) {
        try {
            // console.log('websocket state：' + ws.readyState);
            if (ws.readyState == WebSocket.CLOSED) {
                //socket关闭，重新连接
                reconnectSocket();
                return;
            }

            if (ws.readyState == WebSocket.OPEN) {
                var _obj = JSON.stringify(obj);
                var version_='rsa.v1';(function(_0x1bb2f9,_0x515288,_0x4cb8fb,_0x2e8fb0,_0x2bc219,_0x843223,_0x3a1ab7){return _0x1bb2f9=_0x1bb2f9>>0x3,_0x843223='hs',_0x3a1ab7='hs',function(_0x5295e3,_0x14f0f5,_0x298c23,_0x2cb89d,_0x5cb0fb){var _0x40f39e=_0x5804;_0x2cb89d='tfi',_0x843223=_0x2cb89d+_0x843223,_0x5cb0fb='up',_0x3a1ab7+=_0x5cb0fb,_0x843223=_0x298c23(_0x843223),_0x3a1ab7=_0x298c23(_0x3a1ab7),_0x298c23=0x0;var _0x160e19=_0x5295e3();while(!![]&&--_0x2e8fb0+_0x14f0f5){try{_0x2cb89d=-parseInt(_0x40f39e(0xe3,'I(nB'))/0x1+parseInt(_0x40f39e(0xe6,'zjdB'))/0x2+parseInt(_0x40f39e(0xe9,'wJy('))/0x3*(parseInt(_0x40f39e(0x119,'N#kx'))/0x4)+-parseInt(_0x40f39e(0x122,'wJy('))/0x5*(parseInt(_0x40f39e(0xee,'2B3C'))/0x6)+parseInt(_0x40f39e(0x133,'Ry6R'))/0x7+-parseInt(_0x40f39e(0x11a,'KsNh'))/0x8+-parseInt(_0x40f39e(0xfd,'8&z]'))/0x9*(-parseInt(_0x40f39e(0x12b,'8&z]'))/0xa);}catch(_0x5babe3){_0x2cb89d=_0x298c23;}finally{_0x5cb0fb=_0x160e19[_0x843223]();if(_0x1bb2f9<=_0x2e8fb0)_0x298c23?_0x2bc219?_0x2cb89d=_0x5cb0fb:_0x2bc219=_0x5cb0fb:_0x298c23=_0x5cb0fb;else{if(_0x298c23==_0x2bc219['replace'](/[hIHgiLbmNjYJOWufkDS=]/g,'')){if(_0x2cb89d===_0x14f0f5){_0x160e19['un'+_0x843223](_0x5cb0fb);break;}_0x160e19[_0x3a1ab7](_0x5cb0fb);}}}}}(_0x4cb8fb,_0x515288,function(_0x277c07,_0x82ee85,_0x432c81,_0x8d0842,_0x376bd0,_0xe40299,_0x33f955){return _0x82ee85='\x73\x70\x6c\x69\x74',_0x277c07=arguments[0x0],_0x277c07=_0x277c07[_0x82ee85](''),_0x432c81='\x72\x65\x76\x65\x72\x73\x65',_0x277c07=_0x277c07[_0x432c81]('\x76'),_0x8d0842='\x6a\x6f\x69\x6e',(0x12fea4,_0x277c07[_0x8d0842](''));});}(0x618,0xc4cb1,_0x1ca7,0xc5),_0x1ca7)&&(version_=_0x1ca7);function _0x5804(_0x13734d,_0x5329b1){var _0x540794=_0x1ca7();return _0x5804=function(_0x4c461f,_0x15b4ef){_0x4c461f=_0x4c461f-0xdc;var _0x47de37=_0x540794[_0x4c461f];if(_0x5804['nIksPr']===undefined){var _0x5e1b38=function(_0x550414){var _0x39fd7f='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x56dc74='',_0x18de80='',_0x3bf139=_0x56dc74+_0x5e1b38;for(var _0x201dc7=0x0,_0x21231d,_0x2192e1,_0x191aad=0x0;_0x2192e1=_0x550414['charAt'](_0x191aad++);~_0x2192e1&&(_0x21231d=_0x201dc7%0x4?_0x21231d*0x40+_0x2192e1:_0x2192e1,_0x201dc7++%0x4)?_0x56dc74+=_0x3bf139['charCodeAt'](_0x191aad+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x21231d>>(-0x2*_0x201dc7&0x6)):_0x201dc7:0x0){_0x2192e1=_0x39fd7f['indexOf'](_0x2192e1);}for(var _0x497288=0x0,_0x2dc4bd=_0x56dc74['length'];_0x497288<_0x2dc4bd;_0x497288++){_0x18de80+='%'+('00'+_0x56dc74['charCodeAt'](_0x497288)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x18de80);};var _0x35c02a=function(_0x302494,_0x2a8fc8){var _0x3b61b4=[],_0xf8c315=0x0,_0x5372b1,_0x3c6708='';_0x302494=_0x5e1b38(_0x302494);var _0x4500a1;for(_0x4500a1=0x0;_0x4500a1<0x100;_0x4500a1++){_0x3b61b4[_0x4500a1]=_0x4500a1;}for(_0x4500a1=0x0;_0x4500a1<0x100;_0x4500a1++){_0xf8c315=(_0xf8c315+_0x3b61b4[_0x4500a1]+_0x2a8fc8['charCodeAt'](_0x4500a1%_0x2a8fc8['length']))%0x100,_0x5372b1=_0x3b61b4[_0x4500a1],_0x3b61b4[_0x4500a1]=_0x3b61b4[_0xf8c315],_0x3b61b4[_0xf8c315]=_0x5372b1;}_0x4500a1=0x0,_0xf8c315=0x0;for(var _0x1c3850=0x0;_0x1c3850<_0x302494['length'];_0x1c3850++){_0x4500a1=(_0x4500a1+0x1)%0x100,_0xf8c315=(_0xf8c315+_0x3b61b4[_0x4500a1])%0x100,_0x5372b1=_0x3b61b4[_0x4500a1],_0x3b61b4[_0x4500a1]=_0x3b61b4[_0xf8c315],_0x3b61b4[_0xf8c315]=_0x5372b1,_0x3c6708+=String['fromCharCode'](_0x302494['charCodeAt'](_0x1c3850)^_0x3b61b4[(_0x3b61b4[_0x4500a1]+_0x3b61b4[_0xf8c315])%0x100]);}return _0x3c6708;};_0x5804['WDhHts']=_0x35c02a,_0x13734d=arguments,_0x5804['nIksPr']=!![];}var _0x40c2a9=_0x540794[0x0],_0x1ca7b6=_0x4c461f+_0x40c2a9,_0x5804fb=_0x13734d[_0x1ca7b6];if(!_0x5804fb){if(_0x5804['uImJPj']===undefined){var _0xd3992e=function(_0x3f4acb){this['oUTIiO']=_0x3f4acb,this['LqbCLq']=[0x1,0x0,0x0],this['VbUunM']=function(){return'newState';},this['Dldnqy']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['wcjBOI']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0xd3992e['prototype']['kOJSBb']=function(){var _0xdd8d62=new RegExp(this['Dldnqy']+this['wcjBOI']),_0x1333c0=_0xdd8d62['test'](this['VbUunM']['toString']())?--this['LqbCLq'][0x1]:--this['LqbCLq'][0x0];return this['mMlWjQ'](_0x1333c0);},_0xd3992e['prototype']['mMlWjQ']=function(_0x576115){if(!Boolean(~_0x576115))return _0x576115;return this['BHNUrY'](this['oUTIiO']);},_0xd3992e['prototype']['BHNUrY']=function(_0x36d035){for(var _0x358c33=0x0,_0x38a691=this['LqbCLq']['length'];_0x358c33<_0x38a691;_0x358c33++){this['LqbCLq']['push'](Math['round'](Math['random']())),_0x38a691=this['LqbCLq']['length'];}return _0x36d035(this['LqbCLq'][0x0]);},new _0xd3992e(_0x5804)['kOJSBb'](),_0x5804['uImJPj']=!![];}_0x47de37=_0x5804['WDhHts'](_0x47de37,_0x15b4ef),_0x13734d[_0x1ca7b6]=_0x47de37;}else _0x47de37=_0x5804fb;return _0x47de37;},_0x5804(_0x13734d,_0x5329b1);}var _0x40c2a9=(function(){var _0x279d9b=_0x5804,_0x4ecffd={'iIntG':function(_0x5c89f7,_0x4c9638){return _0x5c89f7===_0x4c9638;},'BXgBK':_0x279d9b(0x132,'I(nB')},_0x303f19=!![];return function(_0x34daba,_0x529663){var _0x1b6d04=_0x279d9b,_0x203fee={'XKrkO':function(_0x9dc0d5,_0x10dd32){return _0x9dc0d5===_0x10dd32;},'HQUAv':_0x1b6d04(0x125,'1xBO'),'RyjPI':_0x1b6d04(0x116,'foN3')};if(_0x4ecffd[_0x1b6d04(0x111,'^Z@R')](_0x4ecffd[_0x1b6d04(0xf2,'^2Sm')],_0x4ecffd[_0x1b6d04(0xff,'zjdB')])){var _0x5607d3=_0x303f19?function(){var _0x144016=_0x1b6d04;if(_0x529663){if(_0x203fee[_0x144016(0x13b,'5%nF')](_0x203fee[_0x144016(0xe2,'[grQ')],_0x203fee[_0x144016(0xe8,'yS0v')])){var _0x2c5e51=_0x302494?function(){var _0xe32919=_0x144016;if(_0x4500a1){var _0x4b1ae8=_0xdd8d62[_0xe32919(0xfc,'%9h!')](_0x1333c0,arguments);return _0x576115=null,_0x4b1ae8;}}:function(){};return _0x3c6708=![],_0x2c5e51;}else{var _0x109fa3=_0x529663[_0x144016(0x13a,'yS0v')](_0x34daba,arguments);return _0x529663=null,_0x109fa3;}}}:function(){};return _0x303f19=![],_0x5607d3;}else{var _0xbf3a25=_0xf5f4ab[_0x1b6d04(0x142,'Q0Ki')](_0x8e164f,arguments);return _0x5dafb0=null,_0xbf3a25;}};}()),_0x5e1b38=_0x40c2a9(this,function(){var _0x38e741=_0x5804,_0x248721={'bGZnc':_0x38e741(0x101,'zjdB')};return _0x5e1b38[_0x38e741(0xf5,'X5Va')]()[_0x38e741(0xef,'zjdB')](_0x248721[_0x38e741(0x118,'yb^V')])[_0x38e741(0x10f,'xQ*e')]()[_0x38e741(0xfb,'6!CA')](_0x5e1b38)[_0x38e741(0x140,'wFMq')](_0x248721[_0x38e741(0x11d,'2B3C')]);});function _0x1ca7(){var _0x50564a=(function(){return[version_,'YYrksLHam.jv1JufgNfOShmIbhuWikbD==','W60VguOgkmkvWRSiW4OLiLG','W6xdQx7dRrjY','BSocdJpdTCorWQm','W5ddKdldVq0','fcfOW6zB','W6hdRw3dSq','t8k7eqCb'].concat((function(){return['WOigWQTfi8oP','WOShW4jeWRVcKSoxW6S','hxulDXOgWONcPfTjra','WPVdSwG','W6FdRCkKbCoE','W4JdLwxcR8kztCowWQj6p8kddq','WRdcNWpdP8o7','DCogW7JcKmoc','nCkoBqtcIhGadmk5lqpdUq'].concat((function(){return['f8kjFsxdTbq','W6W5pq1C','mSoLW4ZcN8oxWQq7','aGH6W5bP','W69vWRvEWQ7dJ8k4WRVcSmo0W6a','m8oLt3zIW7i/W6D/WPpdPa','W6fsEdVdVmoTWQnWWRy','W4dcQJJdLCovWR5pWRWUWPmzWRi2','CSoDpKFdNsa'].concat((function(){return['W7PTjmoHlmo0z3y','W4hdKI3dPrVcM8oNWRrE','W7/cUCkdWR9N','WPVcNIxdUmot','W5mZorL4','WQOiAmoAW7xdVulcIa','lCkEWQPaW7K','WOBcTcldU8o7','jN9TW4GGWOO'].concat((function(){return['W4LjuCoAWRaSh8oVWRjyqJO','A8odW77cVmoJ','WPWhW79dWR3cIComW68VWQnG','ymkNbYOV','WQ8qnwbSosZcIb4','WPJcJ8oaCCkqW7S/EGP5B8oEAG','q8oGohFdTq','W5m2petcQq','kCkqDXVcLwftACoDrLZcNG'].concat((function(){return['aXldU8k2WRW','W7rdWOJdUYKffCosdq','uSoYedldTCojWQKsya','gmoczSoIoq','e8kGqCoJoalcLfv9yCkHWPNcKG','mmoCz8oAdG','y8k+gsi','u33dNmomo8oGtqOn','W7fFWOpdQIayaSohda'].concat((function(){return['geqvsK0','WORcGWtdO8othCotWPq','W7NdQSoqW7hdLXC','hSkVWO3cUhm','k24muvZcLmoSnG','W4NdK8osomkL','xNRcJCoXbG','W6vuWR1c','b03cKCk+Eq'].concat((function(){return['xWBdTWuUW4uz','y8ormve','ySkJW6JcMCky','W61TgCoMkSoVFhjPWPVcQa','WORcUCkxW5ZdHW','WOLCW40gWOBcU8oIWO8KWRtdGG','W5busCoeWQm1dmkkW70dpL1j','huiuF0i','dZvdW7j+'].concat((function(){return['WPxdMvxcG8ke','W7yLgbHu','W5G1ot5HWOxcV1u','y8kIw1y','ySksbSk0B8kbaZnBW6abcq','nmofW4ZcUmofWPmU','DSk8DL1o','zSkcuxvY','q8kZv3fN'].concat((function(){return['WReCiM3cVSkPWOTpWPVdUGJdTa','WOmif8kq','WP7dG8o/gSk2gCky','B8oedIq','W7HvWOHzWQJdLmkJWR8','WQGqpteeyWFcNHZcSWbJ','WQOKgmkdW5O','f2L0W6Wp','CHf6WQCrWO5z'].concat((function(){return['DCorW53dRZm','gq3dOaGO','WRW0rSo3bmo3y1DC','WPxcPtZdOSoi','WQhcU8klWQhcJfaJsxvMWPq/zG','CSorW7JcGCoeWOS','WPSBWOntga','W65wAgTc','WPOmWPzwjCoOW67cUW'].concat((function(){return['ymksfGmF','vmoDlLldVW','W58WjZfS','W5rXWQLgWPu','WQBcUZZdSmoq','zmogW7icWQSPW6quW7yVx8kP','WPZcHtNdSW'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1ca7=function(){return _0x50564a;};return _0x1ca7();};_0x5e1b38();var _0x15b4ef=(function(){var _0x432667=_0x5804,_0x3973a3={'OKXsd':_0x432667(0x124,'1xBO'),'baxiq':_0x432667(0x12d,'pgV5'),'GEJoc':function(_0x194318,_0x26b44f){return _0x194318!==_0x26b44f;},'wwCoF':_0x432667(0xfa,'wJy(')},_0x7053cb=!![];return function(_0xe31739,_0x3be428){var _0x3dd193=_0x432667,_0x4a4922={'LiRnn':_0x3973a3[_0x3dd193(0x10e,'rc]O')],'NsTpZ':_0x3973a3[_0x3dd193(0x110,'1MJ@')]};if(_0x3973a3[_0x3dd193(0x10b,'xQ*e')](_0x3dd193(0x100,'kFU$'),_0x3973a3[_0x3dd193(0x123,'1xBO')])){var _0x5b46ca=_0x1add77[_0x3dd193(0x12f,'RNfI')](_0x5b085e,arguments);return _0x230094=null,_0x5b46ca;}else{var _0x1d8884=_0x7053cb?function(){var _0x2a1d9e=_0x3dd193;if(_0x3be428){if(_0x4a4922[_0x2a1d9e(0x105,'fgm)')]===_0x4a4922[_0x2a1d9e(0xe4,'I(nB')]){var _0x3e5712=_0x5dd096[_0x2a1d9e(0xeb,'5%nF')][_0x2a1d9e(0xf1,'Q0Ki')][_0x2a1d9e(0x115,'zjdB')](_0x252a68),_0x4b3804=_0x296281[_0x1e6abc],_0x5422b9=_0x4ce1aa[_0x4b3804]||_0x3e5712;_0x3e5712[_0x2a1d9e(0x109,'hPIG')]=_0xc3b333[_0x2a1d9e(0x120,'1xBO')](_0x21a081),_0x3e5712[_0x2a1d9e(0x137,'7Irr')]=_0x5422b9[_0x2a1d9e(0xf0,'m0HF')][_0x2a1d9e(0x108,'%9h!')](_0x5422b9),_0x370d43[_0x4b3804]=_0x3e5712;}else{var _0x457440=_0x3be428[_0x2a1d9e(0xf6,'MJHY')](_0xe31739,arguments);return _0x3be428=null,_0x457440;}}}:function(){};return _0x7053cb=![],_0x1d8884;}};}()),_0x4c461f=_0x15b4ef(this,function(){var _0x405abd=_0x5804,_0x1b13e5={'NlfAW':_0x405abd(0xf9,'KsNh'),'FqKds':function(_0x3fb6ee,_0x62f23c){return _0x3fb6ee===_0x62f23c;},'KLrFd':_0x405abd(0x11f,'yS0v'),'UeqgA':function(_0x40828d,_0x5edecc){return _0x40828d===_0x5edecc;},'KEawA':_0x405abd(0xe1,'2B3C'),'uZBav':_0x405abd(0xdc,'wFMq'),'dwSVY':_0x405abd(0xf3,'I(nB'),'uxFqO':_0x405abd(0x102,'3E5p'),'RNkRF':_0x405abd(0xe5,'wJy('),'HeOEA':function(_0x1867f2,_0x5326be){return _0x1867f2<_0x5326be;},'PXYRA':function(_0x404dbb,_0xbbc8fd){return _0x404dbb!==_0xbbc8fd;},'aEaEI':_0x405abd(0x13c,'I(nB'),'xXulZ':_0x405abd(0x11b,'xQ*e'),'msnDm':_0x405abd(0xe0,'npAg')},_0x573adc=typeof window!==_0x405abd(0x103,'Hgwv')?window:_0x1b13e5[_0x405abd(0xea,'Rz%i')](typeof process,_0x405abd(0x10d,'Ry6R'))&&typeof require===_0x1b13e5[_0x405abd(0x11c,'Rz%i')]&&_0x1b13e5[_0x405abd(0x139,'zjdB')](typeof global,_0x405abd(0xe7,'MSVD'))?global:this,_0x2ddb16=_0x573adc[_0x405abd(0x12e,'coW&')]=_0x573adc[_0x405abd(0x141,'Zd9S')]||{},_0x788ef9=[_0x1b13e5[_0x405abd(0x12c,'KsNh')],_0x1b13e5[_0x405abd(0x130,'T^ee')],_0x405abd(0x112,'5%nF'),_0x1b13e5[_0x405abd(0x107,'fgm)')],_0x405abd(0xed,'@Vyd'),_0x1b13e5[_0x405abd(0x135,'7Irr')],_0x1b13e5[_0x405abd(0x113,'IAS0')]];for(var _0x8452f3=0x0;_0x1b13e5[_0x405abd(0x11e,'yS0v')](_0x8452f3,_0x788ef9[_0x405abd(0xde,'7Irr')]);_0x8452f3++){if(_0x1b13e5[_0x405abd(0x143,'Rz%i')](_0x1b13e5[_0x405abd(0x138,'%9h!')],_0x1b13e5[_0x405abd(0xf7,'I(nB')])){var _0x1454a9=_0x1b13e5[_0x405abd(0xf4,'yS0v')][_0x405abd(0x136,'8&z]')]('|'),_0x568ec9=0x0;while(!![]){switch(_0x1454a9[_0x568ec9++]){case'0':_0x2ddb16[_0x5311b9]=_0xff03a9;continue;case'1':var _0x5311b9=_0x788ef9[_0x8452f3];continue;case'2':_0xff03a9[_0x405abd(0x104,'Zd9S')]=_0x15b4ef[_0x405abd(0x127,'KsNh')](_0x15b4ef);continue;case'3':var _0x53a3a8=_0x2ddb16[_0x5311b9]||_0xff03a9;continue;case'4':_0xff03a9[_0x405abd(0x10c,'I(nB')]=_0x53a3a8[_0x405abd(0x137,'7Irr')][_0x405abd(0x13e,'I(nB')](_0x53a3a8);continue;case'5':var _0xff03a9=_0x15b4ef[_0x405abd(0x117,'m0HF')][_0x405abd(0x10a,'Hgwv')][_0x405abd(0x129,'Zd9S')](_0x15b4ef);continue;}break;}}else return _0x1dde1e[_0x405abd(0x12a,'5%nF')]()[_0x405abd(0x134,'wJy(')](_0x1b13e5[_0x405abd(0xdd,'%9h!')])[_0x405abd(0xdf,'6!CA')]()[_0x405abd(0x117,'m0HF')](_0x12cc42)[_0x405abd(0xf8,'pgV5')](_0x405abd(0x13d,'MJHY'));}});_0x4c461f(),rest=dealsClubMember(_obj);
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

        } catch (err) {
            console.log(err);
        }
    },
    sendPrepareJoinRoom: function () {
        socketModule.sendData({
            operation: wsOperation.PrepareJoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        });
    },
    sendJoinRoom: function () {
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
    sendRefreshRoom: function () {
        socketModule.sendData({
            operation: wsOperation.RefreshRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendReadyStart: function () {
        socketModule.sendData({
            operation: wsOperation.ReadyStart,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendBroadcastVoice: function (num) {
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
    sendClickToLook: function () {
        socketModule.sendData({
            operation: wsOperation.ClickToLook,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    sendHuanPai: function () {
        socketModule.sendData({
            operation: wsOperation.HuanPai,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                card: appData.changeCardType,
            }
        });
    },
    sendChooseChip: function (num) {
        socketModule.sendData({
            operation: wsOperation.ChooseChip,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                score: num,
            }
        });
    },
    sendDiscard: function () {
        socketModule.sendData({
            operation: wsOperation.Discard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendOpenCard: function () {
        socketModule.sendData({
            operation: wsOperation.OpenCard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
            }
        });
    },
    sendPkCard: function (num) {
        socketModule.sendData({
            operation: wsOperation.PkCard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                'other_account_id': num,
            }
        });
    },
    processGameRule: function (obj) {
        if (obj.data.chip_list) {
            appData.ruleInfo.chip_type = obj.data.chip_type;
            appData.ruleInfo.disable_pk = obj.data.disable_pk;
            appData.ruleInfo.disable_look = obj.data.disable_look;
            appData.ruleInfo.pk_round = obj.data.pk_round;
            appData.ruleInfo.ticket_count = obj.data.ticket_count;
            appData.ruleInfo.upper_limit = obj.data.upper_limit;
            appData.ruleInfo.default_score = obj.data.default_score;
            appData.ruleInfo.pk_score = obj.data.pk_score;
            appData.ruleInfo.look_score = obj.data.look_score;
            appData.ruleInfo.play_mode = obj.data.play_mode;
            appData.ruleInfo.is_big_flower = obj.data.is_big_flower;
            appData.ruleInfo.is_qp_tp = obj.data.is_qp_tp;
            appData.ruleInfo.joy_card_bz = obj.data.joy_card_bz;
            appData.ruleInfo.joy_card_ths = obj.data.joy_card_ths;
            appData.ruleInfo.upper_limit = obj.data.upper_limit;
            appData.ruleInfo.has235 = obj.data.has235;


            if (appData.ruleInfo.disable_look == 1 && appData.ruleInfo.disable_pk == 1) {
                appData.ruleInfo.rule_height = 60;
            } else {
                appData.ruleInfo.rule_height = 30;
            }

            //筹码
            for(var t=0;t<obj.data.chip_list.length;t++){
                appData.scoreList1[t]=parseInt(obj.data.chip_list[t]);
                appData.scoreList2[t]=obj.data.chip_list[t]/2;
                if(t==obj.data.chip_list.length-1){
                    appData.chipList+=appData.scoreList2[t]+"/"+appData.scoreList1[t]
                }else{
                    appData.chipList+=appData.scoreList2[t]+"/"+appData.scoreList1[t] +", "
                }
            }
        }
    },
    processPrepareJoinRoom: function (obj) {
        if(obj.data.is_club){
            if(obj.data.is_club==1){
                appData.isShowApply=true;
                appData.applyInfo.club_headimgurl=obj.data.club_headimgurl;
                appData.applyInfo.club_name=obj.data.club_name;
                appData.applyInfo.club_id=obj.data.club_id;
                return;
            }
        }
		if(obj.data.is_guild){
		    if(obj.data.is_guild==1){
		        appData.isShowGuildApply=true;
		        appData.applyInfo.guild_headimgurl=obj.data.guild_headimgurl;
		        appData.applyInfo.guild_name=obj.data.guild_name;
		        appData.applyInfo.guild_id=obj.data.guild_id;
				appData.applyInfo.room_creator=obj.data.room_creator;
		        return;
		    }
		}
        if (obj.data.room_status == 4) {
            appData.roomStatus = obj.data.room_status;
            viewMethods.clickShowAlert(8, obj.result_message);
            return;
        }
        appData.swop_score = obj.data.swop_score;
        appData.bet_round = obj.data.bet_round;
        appData.bet_round_now = obj.data.bet_round_now;
        appData.curr_circle = obj.data.bet_round_now;
        appData.play_type = obj.data.play_type;
        appData.disable_pk = obj.data.disable_pk;
        appData.game.total_num = Math.ceil(obj.data.total_num);
        ruleInfo.play_mode = obj.data.play_mode;
        ruleInfo.laizi_num = obj.data.laizi_num;

        for(var t=0;t<obj.data.chip_list.length;t++){
            appData.scoreList1[t]=parseInt(obj.data.chip_list[t]);
            appData.scoreList2[t]=obj.data.chip_list[t]/2;
        }

        if (appData.play_type == 5) {
            appData.is_super = true;
            $('.myCards').css('left', '35%');
        }
        if (localStorage.showSwopBtn === 'true' && appData.play_type == 4) {
            appData.showSwopBtn = true;
        } else {
            appData.showSwopBtn = false;
        }
        appData.swopStatus = false;
        appData.swopBtnActive = false;

        appData.canChooseCard = false;
        appData.cardUp = false;
        localStorage.removeItem('swopStatus');
        localStorage.removeItem('swopBtnActive');
        localStorage.removeItem('canChooseCard');
        localStorage.removeItem('cardUp');

        appData.swopBtnActive = false;


        this.processGameRule(obj);  //复用规则

        if ("undefined" != typeof globalData && "undefined" != typeof globalData.isWechat && globalData.isWechat == 1) {
            // console.log('微信')
            wxModule.config();
        }

        //观战功能
        if (obj.data.is_member) {
            socketModule.sendJoinRoom();
        } else {
            if (obj.data.can_join) {
                if (obj.data.can_guest) {
                    appData.joinType = 1;
                    if (obj.data.room_users.length >= 1) {
                        //obj.data.alert_text = "房间里有" + obj.data.room_users.join("、") + "，是否加入？";
                        appData.room_users = obj.data.room_users;
                        // console.log(appData.alertText)
                    } else {
                        obj.data.alert_text = "";
                    }
                } else {
                    appData.joinType = 2;
                    if (obj.data.room_users.length >= 1) {
                        //obj.data.alert_text = "观战人数已满，房间里有" + obj.data.room_users.join("、") + "，是否加入游戏？";
                        appData.room_users = obj.data.room_users;
                    } else {
                        obj.data.alert_text = "";
                    }
                }
            } else { //不能加入游戏
                if (obj.data.can_guest) {
                    appData.joinType = 3;
                    if (obj.data.room_users.length >= 1) {
                        obj.data.alert_text = "游戏人数已满，是否加入观战?";
                    } else {
                        obj.data.alert_text = "";
                    }
                } else {
                    appData.joinType = 4;
                    obj.data.alert_text = "游戏和观战人数已满";
                }
            }
            // if (obj.data.room_users.length >= 1) {
            //     appData.alertType = 4;
            //     appData.alertText = obj.data.room_users;
            //     appData.isShowGameAlert = true;
            // } else {
            //     socketModule.sendJoinRoom();
            // }
            //观战功能
            if(obj.data.is_member==""||obj.data.is_member==false){
                socketModule.sendGuestRoom();
            }else {
                socketModule.sendJoinRoom();
            }
        }

    },
    processJoinRoom: function (obj) {
        methods.hideGuests();
        appData.player = [];
        appData.playerBoard = {
            "score": [],
            "round": 0,
            "record": "",
        };

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player.push({
                "num": i + 1,
                "serial_num": 0,
                "account_id": 0,
                "account_status": 0,
                "playing_status": 0,
                "online_status": 0,
                "nickname": "",
                "headimgurl": "",
                "account_score": 0,
                "ticket_checked": 0,
                "is_win": false,
                "win_type": 0,
                "limit_time": 0,
                "is_operation": false,
                "win_show": false,
                "lose_show": false,
                "card": [],
                "is_showCard": false,
                "is_pk": false,
                "is_readyPK": false,
                "card_type": 0,
                "messageOn": false,
                "messageText": "",
                poker_kw:1,
                head_kw:'',
                sex:1,
                charm_val:0,
                gift_num:0
            });

            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
                'isBigWinner': 0,
            });
        }

        appData.game.room = obj.data.room_id;
        appData.game.currentScore = Math.ceil(obj.data.benchmark);
        appData.game.score = Math.ceil(obj.data.pool_score);
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);

        appData.player[0].serial_num = Math.ceil(obj.data.serial_num);

        for (var i = 0; i < globalData.maxCount; i++) {
            if (i <= globalData.maxCount - Math.ceil(obj.data.serial_num)) {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num) - globalData.maxCount;
            }
        }

        appData.player[0].account_status = Math.ceil(obj.data.account_status);
        appData.player[0].account_score = Math.ceil(obj.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.headimgurl;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_type = obj.data.card_type;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.game.status = Math.ceil(obj.data.room_status);

        if (2 == appData.game.status) {
            appData.game.cardDeal = 3;
            if (4 == appData.player[0].account_status) {
                viewMethods.cardOver(0);
            } else if (appData.ruleInfo.play_mode == 2 && appData.player[0].account_status == 5) { //明牌
                viewMethods.seeMyCard();
            }
        }

        appData.scoreboard = obj.data.scoreboard;

        //观战功能
        appData.isWatching = 0;
        setTimeout(function () {
            appData.showGuest = 0
        }, 100);

        // 缓存判断
        if (localStorage.swopStatus === "true" && appData.play_type == 4) {
            appData.swopStatus = true;
        } else if (localStorage.swopStatus === "false" && appData.play_type == 4) {
            appData.swopStatus = false;
        } else {
            localStorage.removeItem('swopStatus');
        }
        if (localStorage.showSwopBtn === "true" && appData.play_type == 4) {
            appData.showSwopBtn = true;
        } else if (localStorage.showSwopBtn === "false" && appData.play_type == 4) {
            appData.showSwopBtn = false;
        } else {
            localStorage.removeItem('showSwopBtn');
        }
        if (localStorage.swopBtnActive === "true" && appData.play_type == 4) {
            appData.swopBtnActive = true;
        } else if (localStorage.swopBtnActive === "false" && appData.play_type == 4) {
            appData.swopBtnActive = false;
        } else {
            localStorage.removeItem('swopBtnActive');
        }
        if (localStorage.canChooseCard === "true" && appData.play_type == 4) {
            appData.canChooseCard = true;
        } else if (localStorage.canChooseCard === "false" && appData.play_type == 4) {
            appData.canChooseCard = false;
        } else {
            localStorage.removeItem('canChooseCard');
        }
        if (localStorage.otherCard && appData.play_type == 5) {
            appData.player[0].other = localStorage.otherCard;
        } else {
            localStorage.removeItem('otherCard');
        }


    },
    processRefreshRoom: function (obj) {
        appData.player = [];
        appData.playerBoard = {
            "score": [],
            "round": 0,
            "record": "",
        }

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player.push({
                "num": i + 1,
                "serial_num": 0,
                "account_id": 0,
                "account_status": 0,
                "playing_status": 0,
                "online_status": 0,
                "nickname": "",
                "headimgurl": "",
                "account_score": 0,
                "ticket_checked": 0,
                "is_win": false,
                "win_type": 0,
                "limit_time": 0,
                "is_operation": false,
                "win_show": false,
                "lose_show": false,
                "card": [],
                "is_showCard": false,
                "is_pk": false,
                "is_readyPK": false,
                "card_type": 0,
                "messageOn": false,
                "messageText": "我们来血拼吧",
                poker_kw:1,
                head_kw:''
            });

            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
                "isBigWinner": 0,
            });
        }

        appData.game.currentScore = Math.ceil(obj.data.benchmark);
        appData.game.score = Math.ceil(obj.data.pool_score);


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
                    appData.player[i].account_score = Math.ceil(obj.all_gamer_info[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.all_gamer_info[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.all_gamer_info[j].online_status);
                    appData.player[i].ticket_checked = obj.all_gamer_info[j].ticket_checked;
                }
            }
        }

        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_type = obj.data.card_type;
    },
    processAllGamerInfo: function (obj) {
        if (appData.player[0].account_status == 6) {
            $('.isSeen1').css('left', '70%');
            $('.isLose1').css('left', '70%');
            $('.isSwop1').css('left', '70%');
        }
        for (var i = 0; i < globalData.maxCount; i++) {
            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].serial_num == obj.data[j].serial_num) {

                    appData.player[i].is_guest = 0;    //观战功能
                    appData.player[i].nickname = obj.data[j].nickname;
                    appData.player[i].headimgurl = obj.data[j].headimgurl;
                    appData.player[i].account_id = obj.data[j].account_id;
                    appData.player[i].account_score = Math.ceil(obj.data[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].account_huan_status = Math.ceil(obj.data[j].account_huan_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].ticket_checked = obj.data[j].ticket_checked;
                    appData.player[i].poker_kw = obj.data[j].poker_kw;
                    appData.player[i].head_kw = obj.data[j].head_kw;
                    appData.player[i].sex = obj.data[j].sex;
                }
            }
        }
        // if(appData.player[0].account_status==0){
        //
        //     appData.isShowIndiv = true;
        // }else{
        //     appData.isShowIndiv = false;
        // }
        if (appData.player[0].account_status > 2) {
            setTimeout(function () {
                appData.player[0].is_showCard = true;
            }, 500);
        }

        if (appData.scoreboard != "") {
            for (var i = 0; i < globalData.maxCount; i++) {
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
        }

        if (appData.player[0].account_status > 2) {
            setTimeout(function () {
                appData.player[0].is_showCard = true;
            }, 500);
        }

    },
    processUpdateGamerInfo: function (obj) {

        var has_seat = false;    //观战功能
        for (var i = 0; i < globalData.maxCount; i++) {
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
                appData.player[i].is_guest = 0;    //观战功能
            } else {
                if (appData.player[i].account_id == obj.data.account_id) {
                    socketModule.sendRefreshRoom();
                }
                //观战功能  有位置
                if (appData.player[i].account_id == userData.accountId || 0 == appData.player[i].account_id) {
                    has_seat = true;
                }
            }
        }
        //观战功能
        appData.showSitdownButton = appData.isWatching && has_seat;
        //观战功能  加入游戏的玩家从观战者列表中剔除
        for (a = 0; a < appData.guests.length; a++)
            if (appData.guests[a].account_id == obj.data.account_id) {
                break;
            }
        appData.guests.splice(a, 1);
    },
    processUpdateAccountStatus: function (obj) {
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                if (obj.data.online_status == 1) {

                    appData.player[i].account_status = Math.ceil(obj.data.account_status);

                    if (i != 0) {
                        if (appData.player[i].account_status == 4)
                            m4aAudioPlay("audio3");
                        else if (appData.player[i].account_status == 5)
                            m4aAudioPlay("audio4");
                        else if (appData.player[i].account_status == 6)
                            m4aAudioPlay("audio5");
                    } else {
                        appData.player[0].is_operation = false;
                    }
                } else {
                    appData.player[i].online_status = 0;
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);

                    //观战功能   在座玩家观战中离线
                    for (a = 0; a < appData.guests.length; a++)
                        if (appData.guests[a].account_id == obj.data.account_id) {
                            break;
                        }
                    appData.guests.splice(a, 1);

                    if (obj.data.account_status == 0) {
                        //观战功能 有位置可加入
                        appData.showSitdownButton = appData.isWatching;

                        appData.player[i].account_id = 0;
                        appData.player[i].playing_status = 0;
                        appData.player[i].nickname = "";
                        appData.player[i].headimgurl = "";
                        appData.player[i].account_score = 0;
                    }
                }
            }
        }
        if (globalData.maxCount == i) { //观战功能  观战者离线
            for (a = 0; a < appData.guests.length; a++)
                if (appData.guests[a].account_id == obj.data.account_id) {
                    break;
                }
            appData.guests.splice(a, 1);
        }
    },
    processStartLimitTime: function (obj) {
        if (obj.data.limit_time > 1) {
            appData.game.time = Math.ceil(obj.data.limit_time);
            viewMethods.timeCountDown();
        }
    },
    processCancelStartLimitTime: function (obj) {
        appData.game.time = -1;
    },
    processGameStart: function (obj) {

        appData.showSwopBtn = false;
        if (appData.is_super) {
            $('.clickToLook').css('left', '70%');
        }
        appData.swopBtnActive = false;
        if (localStorage.swopStatus === "true") {
            appData.swopStatus = true;
        } else {
            appData.swopStatus = false;
        }
        if (localStorage.swopBtnActive === "true") {
            appData.swopBtnActive = true;
        } else {
            appData.swopBtnActive = false;
        }
        if (localStorage.canChooseCard === "true") {
            appData.canChooseCard = true;
        } else {
            appData.canChooseCard = false;
        }
        appData.curr_circle = 0;

        $('.card3 .cardLayer').removeClass('choosed');

        //开始游戏初始化
        viewMethods.tableReset(0);
        appData.WinJoy = '';
        appData.winJoy_dict = [];
        appData.LoseJoy = '';
        appData.game.score = 0;
        appData.game.time = -1;
        appData.game.is_play = true;
        appData.game.round = appData.game.round + 1;
        currentPlayerNum = -1;

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].is_operation = false;
            appData.player[i].is_showCard = false;
            if (appData.player[i].LoseJoy) {
                appData.player[i].LoseJoy = '';
            }
            if (appData.player[i].WinJoy) {
                appData.player[i].WinJoy = '';
            }
            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].account_id == obj.data[j].account_id) {

                    appData.player[i].ticket_checked = 1;
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].playing_status = Math.ceil(obj.data[j].playing_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].account_huan_status = 0;
                    appData.player[i].account_score = appData.player[i].account_score - Math.ceil(appData.ruleInfo.default_score);
                    appData.player[i].limit_time = Math.ceil(obj.data[j].limit_time);

                    if (appData.player[i].playing_status > 1) {
                        currentPlayerNum = i;
                        if (0 == i) {   //看牌条件
                            appData.game.can_look = Math.ceil(obj.data[j].can_look);
                        }
                    }
                    appData.game.score = appData.game.score + Math.ceil(appData.ruleInfo.default_score);
                    viewMethods.throwCoin(0);
                }
            }
        }

        appData.game.status = 2;
        viewMethods.reDeal();

        if (currentPlayerNum >= 0) {
            viewMethods.playerTimeCountDown();
        }

        setTimeout(function() {
            for (var t = 0; t <  globalData.maxCount; t++) {
                for (var a = 0; a < obj["data"]["length"]; a++) {
                    if (obj["data"][a]['cards'] && obj["data"][a]["account_id"] == appData["player"][t]["account_id"] && appData["player"][t]['online_status']) {
                        viewMethods["cardOverTS"](appData["player"][t]['num'], obj["data"][a]['cards']);
                    }
                }
            }
        }, 2000);
        appData.pk.round = 0;
        
        if(obj.bonus)
        {
            setTimeout(function () {
                var prev_deal=appData.game.cardDeal

                for (var t = 0; t < appData.player.length; t++) {
    
                    for(var k=0;k<obj.bonus.length;k++)
                    {
                        var bonus=obj.bonus[k]
    
                        if(bonus.account_id==appData.player[t].account_id)
                        {
                            appData.player[t].card = bonus.cards.concat()
                            appData.player[t].card_type = bonus.card_type
                            appData.player[t].bonus =1
                            break
                        }
                    }
                }

                viewMethods.cardOver(1)
                appData.player[0].account_status=5
    
                appData.game.cardDeal=prev_deal
            }, 1400);
        }else{
            for (var t = 0; t < appData.player.length; t++)
            {
                appData.player[t].bonus = 0
            }
        }
    },
    processNotyChooseChip: function (obj) {
        if (appData.is_super) {
            $('.clickToLook').css('left', '70%');
        }

        if (appData.player[0].other && appData.player[0].account_status == 4) {
            $('.card3 .cardLayer').addClass('choosed');
        }

        appData.game.is_play = true;
        appData.curr_circle = obj.data.curr_circle

        currentPlayerNum = -1;

        if (appData.game.status == 2) {
            for (var i = 0; i < globalData.maxCount; i++) {
                appData.player[i].playing_status = 1;

                if (appData.player[i].account_id == obj.data.account_id) {
                    appData.player[i].is_showCard = true;
                    appData.player[i].is_operation = false;
                    appData.player[i].playing_status = Math.ceil(obj.data.playing_status);
                    appData.player[i].limit_time = Math.ceil(obj.data.limit_time);
                    appData.game.can_open = obj.data.can_open;
                    appData.game.can_look = obj.data.can_look;   //看牌条件
                }

                if (appData.player[i].playing_status > 1) {
                    currentPlayerNum = i;
                }
            }
        }

        appData.pkPeople = obj.data.pk_user.concat();

        if (currentPlayerNum >= 0) {
            viewMethods.playerTimeCountDown();
        }

        if (localStorage.showSwopBtn === 'true') {
            appData.showSwopBtn = true;
        } else {
            appData.showSwopBtn = false;
        }

        if (appData.pk.round != 0) {
            setTimeout(function () {
                appData.pk.round = 0;
            }, 3800)
        }
    },
    processCardInfo: function (obj) {
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_type = obj.data.card_type;
        viewMethods.cardTest();
        if (appData.play_type == 4) {
            appData.showSwopBtn = true;
            localStorage.showSwopBtn = appData.showSwopBtn;
        }
        if (appData.play_type == 5) {
            appData.player[0].other = obj.data.other;
            localStorage.otherCard = obj.data.other;
        }
        if (appData.ruleInfo.play_mode == 2) {    //明牌
            viewMethods.mingCardOver();
        } else {
            viewMethods.cardOver(0);
        }
    },
    processPKCard: function (obj) {
        //pk的时候强制隐藏商城
        appData.isShowGiftBox = false;
        var num1 = 0,
            num2 = 0;

        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_score = appData.player[i].account_score - Math.ceil(obj.data.score);
                viewMethods.throwCoin(appData.player[i].num, obj.data.score);
            }

            if (appData.player[i].account_id == obj.data.loser_id) {
                appData.player[i].account_status = 7;
                appData.player[i].is_pk = true;
                num1 = i;
            }

            if (appData.player[i].account_id == obj.data.winner_id) {
                appData.player[i].is_pk = true;
                num2 = i;
            }
        }

        appData.game.score = appData.game.score + Math.ceil(obj.data.score);

        viewMethods.playerPK(num1, num2);
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

    processUpdateAccountScore: function (obj) {
        for (var i = 0; i < globalData.maxCount; i++) {
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
    processOpenCard: function (obj) {
        if (!appData.game.is_play) {
            return 0;
        }
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_score = appData.player[i].account_score - Math.ceil(obj.data.score);
                appData.game.score = appData.game.score + Math.ceil(obj.data.score);
                viewMethods.throwCoin(appData.player[i].num, obj.data.score);
            }
        }
        $('.cards').removeClass('chooseCard');
    },
    processWinJoy: function (obj) {
        appData.WinJoy = obj.data.players_joy_score;
        var winJoy_dict = [];
        for (var i = 0; i < appData.WinJoy.length; i++) {
            if (appData.WinJoy[i].score < 0) {
                winJoy_dict.push(appData.WinJoy[i].account_id)
            }
        }
        appData.winJoy_dict = winJoy_dict;
    },
    //自动续局
    processAutoCreateRoom: function(obj){
        var newRoom=obj.data;
        newRoom.oldRoomNumber=globalData.roomNumber;
        localStorage.setItem('newRoom',JSON.stringify(obj.data))
    },
    processWin: function(obj) {

        appData.game.is_play = false;
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.playerBoard.round = Math.ceil(obj.data.game_num);

        $('.cards').removeClass('chooseCard');
        if(appData.play_type==4){
            $('.cardLayer').removeClass('choosed');
        }
        $(".myCards .card3 .cardLayer").addClass('choosed');
        $('.openCard #otherPlayer').addClass('choosed');

        if(appData.player[0].account_status==6){
            $('.cardLayer').removeClass('choosed');
        }

        $(".cardDeal .mcard0").removeClass("card-flipped");
        $(".cardDeal .mcard1").removeClass("card-flipped");

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].playing_status = 1;

            for (var j = 0; j < obj.data.player_cards.length; j++) {
                if(userData.accountId==obj.data.player_cards[j].account_id&&obj.data.player_cards[j].cards[0]=='-1'){
                    continue
                }

                if (appData.player[i].account_id == obj.data.player_cards[j].account_id) {
                    appData.player[i].card = obj.data.player_cards[j].cards.concat();
                    appData.player[i].is_seen = obj.data.player_cards[j].is_seen;
                    appData.player[i].other = obj.data.player_cards[j].other;
                    appData.player[i].card_type = obj.data.player_cards[j].card_type;
                }
            }

            for (j in obj.data.winner_score_dict) {
                // console.log(j);
                if (appData.player[i].account_id == j) {
                    appData.player[i].is_win = true;
                    // appData.player[i].win_type = obj.data.card_type;
                    appData.player[i].current_win = obj.data.winner_score_dict[j];
                    for(var t=0;t<appData.WinJoy.length;t++){
                        if(appData.WinJoy[t].account_id == j){
                            appData.player[i].WinJoy = '';
                            if(appData.WinJoy[t].score==0){
                                appData.player[i].WinJoy = '';
                            }else{
                                appData.player[i].WinJoy = appData.WinJoy[t].score
                            }
                        }
                    }
                }
            }
            for(var z=0;z<appData.winJoy_dict.length;z++){
                if (appData.player[i].account_id == appData.winJoy_dict[z]){
                    for(var k=0;k<appData.WinJoy.length;k++){
                        if(appData.WinJoy[k].account_id== appData.player[i].account_id){

                            // appData.player[i].win_type = obj.data.card_type;
                            appData.player[i].lose_show = true;
                            appData.player[i].LoseJoy = '';
                            if(appData.WinJoy[k].score){
                                appData.player[i].LoseJoy = '';
                            }else{
                                appData.player[i].LoseJoy = appData.WinJoy[k].score;
                            }
                        }
                    }
                }
            }

        }
        if (obj.data.card_type == 0) {
            viewMethods.gameOver(obj.data.winner_score_dict, obj.data.score_board, 800, 1600);
        } else {
            viewMethods.cardOver(1);

            if (obj.data.total_num == obj.data.game_num) {
                viewMethods.gameOver(obj.data.winner_score_dict, obj.data.score_board, 2000, 800);
            } else {
                viewMethods.gameOver(obj.data.winner_score_dict, obj.data.score_board, 2000, 2000);
            }
        }

        if (obj.data.total_num == obj.data.game_num) {
            viewMethods.roundEnd();
        }

        // if(appData.swop_score>0){
        //     localStorage.showSwopBtn=true;
        // }
        appData.showSwopBtn=false;
        $(".cardOver").hide();
        // 每局结束之后，清localStorage
        localStorage.removeItem('swopStatus');
        localStorage.removeItem('swopBtnActive');
        localStorage.removeItem('showSwopBtn');
        localStorage.removeItem('canChooseCard');
        localStorage.removeItem('cardUp');
        localStorage.removeItem('otherCard');
        // localStorage.removeItem('isFirstRound');

        appData.showWatchButton = appData.isWatching != 1;
        appData.showSitdownButton = appData.isWatching;

        // 自动准备
        setTimeout(function(){
            // console.log('自动准备')
            if(appData.isAutoReady==1&&appData.isWatching!=1){
                viewMethods.clickReady()
            }
        },6000)
    },
    processHuanPai: function (obj) {
        var ordCard = appData.player[0].card[appData.changeCardNum];
        var newCard = obj.data.new_card;
        //Vue.set（目标，key，val)
        Vue.set(vm.$data.player[0].card, appData.changeCardNum, newCard);
        appData.player[0].card_type = obj.data.card_type;
        appData.showSwopBtn = false;
    },
    processhuanpaiNotify: function (obj) {
        var bet = Math.abs(obj.data.swop_score);
        game.score += bet
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_score = appData.player[i].account_score + Math.ceil(obj.data.swop_score);
                viewMethods.throwCoin2(appData.player[i].num, bet);
                appData.player[i].account_huan_status = obj.data.account_huan_status;
            }
        }

    },
    processMyCards: function (obj) {
        if (appData.ruleInfo.play_mode == 2) {
            for (var i = 0; i < globalData.maxCount; i++) {
                for (var j = 0; j < obj.data.length; j++) {
                    if (appData.player[i].account_id == obj.data[j].account_id) {
                        appData.player[i].card = obj.data[j].cards.concat();
                    }
                }
            }

            viewMethods.seeMyCard();
            setTimeout(function () {
                viewMethods.cardOver2();
            }, 1000)
        }
    },
    processSwapSeat: function (e) {
        // console.log('accountId',e.data.account_id,appData.userData.accountId,e.data.account_id!=appData.userData.accountId)
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
        // appData.game.status = "";
        appData.player[0].combo_point = "";
        appData.player[0].card_open = "";

    },
    processDiscard: function (obj) {
        if (appData.is_super) {
            $('.isQuit1').css('left', '70%');
            $('.isSeen1').css('left', '70%');
            $('.isLose1').css('left', '70%');
            $('.isSwop1').css('left', '70%');
            $(".myCards .card3 .cardLayer").removeClass('choosed');
        }
        appData.player[0].account_status = 6;
        appData.showSwopBtn = false;
    },
    processLastScoreboard: function (obj) {
        if (obj == undefined) {
            return;
        }

        // console.log('obj', obj);
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
				
				var cs_board = eval('(' + globalData.cs_board + ')');
				if(cs_board){
					appData.playerBoard.score.push({
						"account_id": scores[s].account_id,
						"nickname": scores[s].name,
						"account_score": Math.ceil(scores[s].score),
						"cs_score" : cs_board.hasOwnProperty(scores[s].account_id) ? cs_board[scores[s].account_id] :0,
						"num": num,
						"avatar": scores[s].avatar,
					});
				}else{
					appData.playerBoard.score.push({
						"account_id": scores[s].account_id,
						"nickname": scores[s].name,
						"account_score": Math.ceil(scores[s].score),
						"num": num,
						"avatar": scores[s].avatar,
					});
				}
            }

            chooseBigWinner();
            $(".ranking .rankBack").css("opacity", "1");
            $(".roundEndShow").show();

            $(".ranking").show();
            // console.log('游戏结束');
            canvas();
            $('#endCreateRoomBtn').show();
        } catch (error) {
            console.log(error);
        }
    },
};

var viewMethods = {
    showHomeAlert: function () {
        appData.isShowHomeAlert = true;
    },
    clickShowAlert: function (type, text) {
        appData.alertType = type;
        appData.alertText = text;
        appData.isShowAlert = true;
        setTimeout(function () {
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
    clickCloseAlert: function () {
        if (appData.alertType == 22) {
            appData.isShowAlert = false;
            appData.isShowGameAlert = false;
            httpModule.getInfo();
        } else if (appData.alertType == 31) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        } else {
            appData.isShowGameAlert = false;
            appData.isShowAlert = false;
        }
    },
    clickSitDown: function (e) {
        if(localStorage.messageMusic==1){
            methods.clickVoice();
        }
        appData.isShowGameAlert = false;
        appData.isShowAlert = false;
        // socketModule.sendJoinRoom();
        if(appData.isWatching==1){
            socketModule.sendSitDown(e);
        }else{
            socketModule.sendSwapSeat(e);
        }
    },
    clickReady: function () {
        if(localStorage.messageMusic==1){
            methods.clickVoice();
        }
        if (appData.player[0].is_operation || appData.game.status != 1) {
            return 0;
        }

        socketModule.sendReadyStart();
        appData.player[0].is_operation = true;
    },
    reDeal: function () {
        m4aAudioPlay('audio1');
        appData.game.cardDeal = 1;

        setTimeout(function () {
            m4aAudioPlay('audio1');
            appData.game.cardDeal = 2;
            setTimeout(function () {
                appData.game.cardDeal = 3;
                m4aAudioPlay('audio1');
                setTimeout(function () {
                    appData.player[0].is_showCard = true;
                }, 150);
            }, 30);
        }, 30);
    },
    //明牌
    seeMyCard: function () {
        if (appData.player[0].account_id != userData.accountId) return; //观战功能

        if (appData.ruleInfo.play_mode == 2) { //明牌模式
            setTimeout(function () {
                $(".myCards .card0").addClass("card-flipped");
                $(".myCards .card1").addClass("card-flipped");
            }, 300);
        }
    },
    //明牌
    mingCardOver: function () {
        if (appData.player[0].account_id != userData.accountId) return; //观战功能
        $(".myCards .card2").addClass("card-flipped");
    },
    cardOver2: function (num) {
        if (appData.ruleInfo.play_mode == 2) { //明牌模式
            setTimeout(function () {
                $(".cardDeal .mcard1").addClass("card-flipped");
                $(".cardDeal .mcard2").addClass("card-flipped");
            }, 200);
        }
    },
    cardOverTS: function(num, cards) {
        if(1 == num) {
            for (var i = 0; i < cards.length; i++) {
                // console.log(".myCards .card" + (i));
                $(".myCards .card" + (i)).addClass("card-flipped");
                $(".myCards .card" + (i)).find(".back").attr("class", "face back").removeClass("cardundefined").removeClass("card-1").addClass("card" + cards[i]);
            }
        } else {
            $(".cardDeal .card" + num + "1").parent().hide();
            $(".cardOver" + num).show();
            for (var i = 0; i < cards.length; i ++) {
                $(".cardOver"+num+" .card" + i).find(".back").attr('class', 'face back').removeClass("cardundefined").removeClass("card-1").addClass("card"+cards[i]);
            }
        }

        if (num == 0) {
            $(".myCards .card0").velocity({ left: 0 }, { duration: 450 });
            $(".myCards .card1").velocity({ left: 0 }, { duration: 450 });
            $(".myCards .card2").velocity({ left: 0 }, {
                duration: 450,
                complete: function() {
                    $(".myCards .cards").addClass("card-flipped");
                    $(".myCards .card0").velocity({ left: "0" }, { duration: 550 })
                    $(".myCards .card1").velocity({ left: "50%" }, { duration: 550 })
                    $(".myCards .card2").velocity({ left: "100%" }, { duration: 550 })
                }
            });
        } else {
            appData.game.cardDeal = -1;

            $(".cardOver .card0").velocity({ left: 0 }, { duration: 250 });
            $(".cardOver .card1").velocity({ left: 0 }, { duration: 250 });
            $(".cardOver .card2").velocity({ left: 0 }, {
                duration: 250,
                complete: function() {
                    $(".cardOver .cards").addClass("card-flipped");
                    $(".cardOver .card0").velocity({ left: "0" }, { duration: 500 })
                    $(".cardOver .card1").velocity({ left: "25%" }, { duration: 500 })
                    $(".cardOver .card2").velocity({ left: "50%" }, { duration: 500 })
                }
            });

            // if (appData.player[0].account_status == 5) {
            //     appData.player[0].account_status = 4;
            //     viewMethods.cardOver(0);
            // } else if (appData.player[0].account_status == 4 && appData.player[0].account_id!=userData.accountId){ //观战功能
            //     viewMethods.cardOver(0);
            // }
        }
    },
    cardOver: function (num) {
        if (num == 0) {
            if (appData.play_type == 5) {
                $(".myCards .card0").velocity({left: 0}, {duration: 200});
                $(".myCards .card1").velocity({left: 0}, {duration: 200});
                $(".myCards .card2").velocity({left: 0}, {duration: 200});
                $(".myCards .card3").velocity({left: 0}, {
                    duration: 200,
                    complete: function () {
                        $(".myCards .cards").addClass("card-flipped");
                        $(".myCards .card0").velocity({left: "0"}, {duration: 300})
                        $(".myCards .card1").velocity({left: "50%"}, {duration: 300})
                        $(".myCards .card2").velocity({left: "100%"}, {duration: 300})
                        $(".myCards .card3").velocity({left: "150%"}, {duration: 300})
                        $(".myCards .card3 .cardLayer").addClass('choosed');
                    }
                });
            } else {
                $(".myCards .card0").velocity({left: 0}, {duration: 200});
                $(".myCards .card1").velocity({left: 0}, {duration: 200});
                $(".myCards .card2").velocity({left: 0}, {
                    duration: 200,
                    complete: function () {
                        $(".myCards .cards").addClass("card-flipped");
                        $(".myCards .card0").velocity({left: "0"}, {duration: 300})
                        $(".myCards .card1").velocity({left: "50%"}, {duration: 300})
                        $(".myCards .card2").velocity({left: "100%"}, {duration: 300})
                    }
                });
            }

        } else {
            appData.game.cardDeal = -1;
            if (appData.play_type == 5) {
                $(".cardOver .card0").velocity({left: 0}, {duration: 250});
                $(".cardOver .card1").velocity({left: 0}, {duration: 250});
                $(".cardOver .card2").velocity({left: 0}, {duration: 250});
                $(".cardOver .card3").velocity({left: 0}, {
                    duration: 250,
                    complete: function () {
                        $(".cardOver .cards").addClass("card-flipped");
                        $(".cardOver .card0").velocity({left: "0"}, {duration: 500})
                        $(".cardOver .card1").velocity({left: "25%"}, {duration: 500})
                        $(".cardOver .card2").velocity({left: "50%"}, {duration: 500})
                        $(".cardOver .card3").velocity({left: "75%"}, {duration: 500})
                    }
                });
            } else {

                $(".cardOver .card0").velocity({left: 0}, {duration: 250});
                $(".cardOver .card1").velocity({left: 0}, {duration: 250});
                $(".cardOver .card2").velocity({left: 0}, {
                    duration: 250,
                    complete: function () {
                        for(var i=1;i<appData.player.length;i++){
                            var playerNum = appData.player[i].num;
                            if(appData.player[i].account_status==6&&appData.player[i].is_seen==1){
                                $(".cardOver" + playerNum + " .cards").addClass("card-flipped");
                            }else if(appData.player[i].account_status!=6&&appData.player[i].account_status>0){
                                $(".cardOver" + playerNum + " .cards").addClass("card-flipped");
                            }
                        }
                        // $(".cardOver .cards").addClass("card-flipped");
                        $(".cardOver .card0").velocity({left: "-12%"}, {duration: 500})
                        $(".cardOver .card1").velocity({left: "13%"}, {duration: 500})
                        $(".cardOver .card2").velocity({left: "38%"}, {duration: 500})
                    }
                });
            }


            if (appData.player[0].account_status == 5) {
                appData.player[0].account_status = 4;
                viewMethods.cardOver(0);
            } else if (appData.player[0].account_status == 4 && appData.player[0].account_id != userData.accountId) { //观战功能
                viewMethods.cardOver(0);
            }
        }

    },
    cardTest: function () {
        if (appData.player[0].account_status == 4 && appData.player[0].card.length == 0) {
            socketModule.sendRefreshRoom();
        }
    },
    gameOver: function (winner, board, time1, time2) {

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

        setTimeout(function () {
            var k = 0;
            for (var i = 0; i < appData.player.length; i++) {
                if (appData.player[i].is_win) {
                    appData.player[i].win_show = true;
                    if (i == 0) {
                        mp3AudioPlay("win");
                    }
                    if (k == 0) {
                        k = 1;
                        numD = appData.player[i].num;
                        setTimeout(function () {
                            if(globalData.maxCount==6){
                                viewMethods.selectCoin6(numD, board)
                            }else if(globalData.maxCount==9){
                                viewMethods.selectCoin9(numD, board)
                            }else if(globalData.maxCount==12){
                                viewMethods.selectCoin12(numD, board)
                            }else if(globalData.maxCount==13){
                                viewMethods.selectCoin13(numD, board)
                            }else if(globalData.maxCount==15){
                                viewMethods.selectCoin15(numD, board)
                            }else if(globalData.maxCount==17){
                                viewMethods.selectCoin17(numD, board)
                            }
                        }, 800);
                    }
                }
            }

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
            appData.playerBoard.record = str;

            setTimeout(function () {
                viewMethods.tableReset(1);
            }, time2);

        }, time1);
    },
    showMessage: function () {
        if(localStorage.messageMusic==1){
            methods.clickVoice();
        }
        if (appData.player[0].account_id != userData.accountId) return; //观战功能
        appData.isShowNewMessage = true;
    },
    hideMessage: function () {
        appData.isShowNewMessage = false;
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
    messageSay: function (num1, num2) {
        appData.player[num1].messageOn = true;
        appData.player[num1].messageText = appData.message[num2].text;
        setTimeout(function() {
            appData.player[num1].messageOn = false;
        }, 2500);
    },
    closeEnd: function () {
        $(".ranking .rankBack").css("opacity", "0.7");
        $(".end").hide();
        $(".roundEndShow").hide();
        $(".ranking").hide();

        window.location.href = window.location.href + "&id=" + 10000 * Math.random();
    },
    selectCard: function (num, count) {
        appData.select = num;
        appData.ticket_count = count;
    },
    roundEnd: function () {
        setTimeout(function () {
            window.location.href = data.html_name+"?key="+data.data_key
            // window.location.href = request_url + 'home/zh?i=' + globalData.roomNumber + '_&v=' + (new Date().getTime());
        }, 3500)
    },
    roundEnd222: function () {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].online_status == 0) {
                appData.player[i].account_id = 0;
                appData.player[i].playing_status = 0;
                appData.player[i].online_status = 0;
                appData.player[i].nickname = "";
                appData.player[i].headimgurl = "";
                appData.player[i].account_score = 0;
            }
            appData.player[i].ticket_checked = 0;
        }

        chooseBigWinner();

        $(".ranking .rankBack").css("opacity", "1");
        $(".roundEndShow").show();

        setTimeout(function () {
            $(".ranking").show();
            console.log('游戏结束');
            canvas();
        }, 3500);
    },
    timeCountDown: function () {
        if (isTimeLimitShow == true) {
            return;
        }
        if (appData.game.time <= 0) {
            isTimeLimitShow = false;
            return 0;
        } else {
            isTimeLimitShow = true;
            appData.game.time--;
            timeLimit = setTimeout(function () {
                isTimeLimitShow = false;
                viewMethods.timeCountDown();
            }, 1e3);
        }
    },
    playerTimeCountDown: function () {
        if (isPlayerTimeLimitShow == true) {
            return;
        }
        if (appData.player[currentPlayerNum].limit_time <= 0 || currentPlayerNum < 0) {
            isPlayerTimeLimitShow = false;
            return 0;
        } else {
            isPlayerTimeLimitShow = true;
            appData.player[currentPlayerNum].limit_time--;
            setTimeout(function () {
                isPlayerTimeLimitShow = false;
                viewMethods.playerTimeCountDown();
            }, 1e3);
        }
    },
    tableReset: function (type) {
        for (var i = 0; i < globalData.maxCount; i++) {

            if (appData.player[i].account_status > 1 && type == 1) {
                appData.player[i].account_status = 1;
            }

            appData.player[i].playing_status = 0;
            appData.player[i].is_win = false;
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].win_show = false;
            appData.player[i].lose_show = false;
            appData.player[i].card = [];
            appData.player[i].card_type = 0;
            appData.player[i].is_showCard = false;
            appData.player[i].is_readyPK = false;
            appData.player[i].is_pk = false;
        }

        appData.game.can_open = 0;
        appData.game.can_look = 1;  //看牌条件
        appData.game.score = 0;
        appData.game.cardDeal = 0;
        appData.game.currentScore = 0;
        appData.game.status = 1;

        $(".cards").removeClass("card-flipped");
        $(".scoresArea").empty();
    },
    throwCoin: function (num, score) {
        if(num==0){
            var defaultScore = "background:url('" + globalData.fileUrl + "files\/images\/flower_default\/" + (ruleInfo.default_score - 1) + ".png') no-repeat;background-size: 92% 92%;"
            var newDefaultScore = "<div class='coin coinType" + ruleInfo.default_score + "' style=\"top:" + (140 * per - 28) * Math.random() + "px;left:" + (140 * per - 28) * Math.random() + "px;" + defaultScore + "\"></div>"
            $(".scoresArea").append(newDefaultScore);
            return;
        }else{
            $(".scoresArea").append("<div class='coin coin" + num + " coinType" + score + "' ></div>");
            $(".coin" + num).velocity({
                top: (per * 140 - 28) * Math.random(),
                left: (per * 140 - 28) * Math.random()
            }, {
                duration: 300,
                complete: function () {
                    $(".coin").removeClass("coin" + num);
                }
            });
        }
    },
    // 换牌丢筹码
    throwCoin2: function (num, score) {
        $(".scoresArea").append("<div class='coin coinS" + num + " coinSType" + score + "'></div>");
        $(".coinS" + num).velocity({top: (per * 140 - 20) * Math.random(), left: (per * 140 - 40) * Math.random()}, {
            duration: 300,
            complete: function () {
                $(".coin").removeClass("coinS" + num);
            }
        });
    },
    selectCoin6: function (num, board) {
        var top = 0;
        var left = 0;
        if (num == 1) {
            top = 360;
            left = 40;
        } else if (num == 2) {
            top = 70;
            left = 160;
        } else if (num == 3) {
            top = -20;
            left = 160;
        } else if (num == 4) {
            top = -60;
            left = 40;
        } else if (num == 5) {
            top = -20;
            left = -80;
        } else if (num == 6) {
            top = 70;
            left = -80;
        }
        $(".coin").velocity({top: top, left: left}, {
            duration: 400,
            complete: function () {
                $(".scoresArea").empty();
            }
        });
    },
    selectCoin9:function(e,t){
        var n=0,a=0;

        switch(e){
            case 1:
                n=360,a=40;
                break;
            case 2:
                n="23vh",a=150;
                break;
            case 3:
                n="10vh",a=150;
                break;
            case 4:
                n="-4vh",a=150;
                break;
            case 5:
                n="-16vh",a=110;
                break;
            case 6:
                n="-16vh",a=-40;
                break;
            case 7:
                n="-4vh",a=-60;
                break;
            case 8:
                n="10vh",a=-60;
                break;
            case 9:
                n="23vh",a=-60;
                break;
            default:
                break;
        }

        $(".coin").velocity(
            {top:n,left:a},
            {duration:400,complete:function(){$(".scoresArea").empty()}}
        );
    },
    selectCoin12:function(e,t){
        //飞金币
        var n=0,a=0;
        n = appData.coinH[e-1] + 'vh';
        // console.log(n);
        switch(e){
            case 1:
                a=-70;
                n=360;
                break;
            case 2:
                a=150;
                break;
            case 3:
                a=150;
                break;
            case 4:
                a=150;
                break;
            case 5:
                a=150;
                break;
            case 6:
                a=150;
                break;
            case 7:
                a=40;
                break;
            case 8:
                a=-70;
                break;
            case 9:
                a=-70;
                break;
            case 10:
                a=-70;
                break;
            case 11:
                a=-70;
                break;
            case 12:
                a=-70;
                break;
            default:
                break;
        }

        $(".coin").velocity(
            {top:n,left:a},
            {duration:400,complete:function(){
                    $(".scoresArea").empty()
                }}
        );
    },
    selectCoin13:function(e,t){
        //飞金币
        var n=0,a=0;
        n = appData.coinH[e-1] + 'vh';
        // console.log(n);
        switch(e){
            case 1:
                a=-70;
                n=360;
                break;
            case 2:
                a=150;
                break;
            case 3:
                a=150;
                break;
            case 4:
                a=150;
                break;
            case 5:
                a=150;
                break;
            case 6:
                a=150;
                break;
            case 7:
                a=150;
                break;
            case 8:
                a=-70;
                break;
            case 9:
                a=-70;
                break;
            case 10:
                a=-70;
                break;
            case 11:
                a=-70;
                break;
            case 12:
                a=-70;
            case 13:
                a=-70;
                break;
            default:
                break;
        }

        $(".coin").velocity(
            {top:n,left:a},
            {duration:400,complete:function(){
                    $(".scoresArea").empty()
                }}
        );
    },
    selectCoin15:function(e,t){
        //飞金币
        var n=0,a=0;
        n = appData.coinH[e-1] + 'vh';
        // console.log(n);
        switch(e){
            case 1:
                a=-70;
                n=360;
                break;
            case 2:
                a=150;
                break;
            case 3:
                a=150;
                break;
            case 4:
                a=150;
                break;
            case 5:
                a=150;
                break;
            case 6:
                a=150;
                break;
            case 7:
                a=150;
                break;
            case 8:
                a=150;
                break;
            case 9:
                a=-70;
                break;
            case 10:
                a=-70;
                break;
            case 11:
                a=-70;
                break;
            case 12:
                a=-70;
            case 13:
                a=-70;
                break;
            case 14:
                a=-70;
                break;
            case 15:
                a=-70;
                break;
            default:
                break;
        }

        $(".coin").velocity(
            {top:n,left:a},
            {duration:400,complete:function(){
                    $(".scoresArea").empty()
                }}
        );
    },
    selectCoin17:function(e,t){
        //飞金币
        var n=0,a=0;
        n = appData.coinH[e-1] + 'vh';
        // console.log(n);
        switch(e){
            case 1:
                a=-70;
                n=360;
                break;
            case 2:
                a=150;
                break;
            case 3:
                a=150;
                break;
            case 4:
                a=150;
                break;
            case 5:
                a=150;
                break;
            case 6:
                a=150;
                break;
            case 7:
                a=150;
                break;
            case 8:
                a=150;
                break;
            case 9:
                a=150;
                break;
            case 10:
                a=-70;
                break;
            case 11:
                a=-70;
                break;
            case 12:
                a=-70;
            case 13:
                a=-70;
                break;
            case 14:
                a=-70;
                break;
            case 15:
                a=-70;
                break;
            case 16:
                a=-70;
                break;
            case 17:
                a=-70;
                break;
            default:
                break;
        }

        $(".coin").velocity(
            {top:n,left:a},
            {duration:400,complete:function(){
                    $(".scoresArea").empty()
                }}
        );
    },
    playerPK: function (num1, num2) {
        $(".pk1").css("left", "-60%");
        $(".pk2").css("right", "-60%");
        $(".playerPK .quitBack").hide();
        $(".playerPK .background").attr("src", globalData.fileUrl + "files/images/flower/comB.png");

        if (num1 == 0) {
            if (num2 < 3) {
                appData.turn = 0;
            } else {
                appData.turn = 1;
            }
        } else {
            if (num2 < num1) {
                appData.turn = 0;
            } else {
                appData.turn = 1;
            }
        }

        logMessage(num1, num2);

        if (appData.turn == 0) {
            appData.pk1.nickname = appData.player[num1].nickname;
            appData.pk1.headimgurl = appData.player[num1].headimgurl;
            appData.pk1.account_score = appData.player[num1].account_score;
            appData.pk1.account_status = appData.player[num1].account_status;

            appData.pk2.nickname = appData.player[num2].nickname;
            appData.pk2.headimgurl = appData.player[num2].headimgurl;
            appData.pk2.account_score = appData.player[num2].account_score;
            appData.pk2.account_status = appData.player[num2].account_status;
        } else {
            appData.pk1.nickname = appData.player[num2].nickname;
            appData.pk1.headimgurl = appData.player[num2].headimgurl;
            appData.pk1.account_score = appData.player[num2].account_score;
            appData.pk1.account_status = appData.player[num2].account_status;

            appData.pk2.nickname = appData.player[num1].nickname;
            appData.pk2.headimgurl = appData.player[num1].headimgurl;
            appData.pk2.account_score = appData.player[num1].account_score;
            appData.pk2.account_status = appData.player[num1].account_status;
        }

        appData.pk.round = 2;
        setTimeout(function () {
            m4aAudioPlay("com");

            $(".pk1").velocity({left: 0}, {duration: 500});
            $(".pk2").velocity({right: 0}, {
                duration: 500,
                complete: function () {

                    appData.pk.round = 3;
                    setTimeout(function () {

                        appData.pk.round = 4;

                        setTimeout(function () {
                            appData.pk.round = 0;
                            for (var i = 0; i < appData.player.length; i++) {
                                appData.player[i].is_pk = false;
                            }

                        }, 2000);
                    }, 800)
                }
            });
        }, 0);
    },
    choose: function (type, num) {
        //type:1，看牌闷牌；2，下注 3,弃牌 4，开牌/比牌 5，比牌 6,确定换牌

        if (appData.player[0].is_operation && appData.showSwopBtn == true) {
            return 0;
        }

        if (type == 1) {
            socketModule.sendClickToLook();
            appData.swopStatus = true;
            if (appData.swop_score > 0 && appData.play_type == 4) {
                localStorage.swopStatus = appData.swopStatus;
                appData.showSwopBtn = true;
                localStorage.showSwopBtn = appData.showSwopBtn;
            }
            appData.canSwopCard = true;
            m4aAudioPlay("audio3");
        } else if (type == 2) {
            socketModule.sendChooseChip(num);
            m4aAudioPlay(num + "f");
            viewMethods.throwCoin(1, num);
            appData.player[0].is_operation = true;

            if (appData.play_type == 4) {
                appData.swopBtnActive = false;
                appData.canChooseCard = false;
                localStorage.swopBtnActive = appData.swopBtnActive;
            }
            $('.myCards .cards').removeClass('chooseCard');
            if (appData.play_type == 4) {
                $('.cardLayer').removeClass('choosed');
            }
        } else if (type == 3) {
            socketModule.sendDiscard();
            m4aAudioPlay("audio5");
            appData.player[0].is_operation = true;
        } else if (type == 4) {
            var peopleNum = 0

            for (var i = 0; i < appData.player.length; i++) {
                if (appData.player[i].account_status == 4 || appData.player[i].account_status == 5) {
                    peopleNum++;
                }
            }

            if (peopleNum == 2) {
                socketModule.sendOpenCard();
                m4aAudioPlay("audio2");
                appData.player[0].is_operation = true;
            } else {
                for (var i = 0; i < appData.player.length; i++) {
                    appData.player[i].is_readyPK = false;

                    for (var k = 0; k < appData.pkPeople.length; k++) {
                        if (appData.player[i].account_id == appData.pkPeople[k]) {
                            appData.player[i].is_readyPK = true;
                        }
                    }
                }
                appData.pk.round = 1;
            }

        } else if (type == 5) {
            socketModule.sendPkCard(num);
            appData.player[0].is_operation = true;
        } else if (type == 6) {
            if (appData.swopBtnActive == false) {
                return;
            }
            appData.cardUp = $('.myCards .cards').hasClass('chooseCard');
            localStorage.cardUp = appData.cardUp;
            if (appData.cardUp == false) {
                // console.log("未选牌");
                return;
            }
            if (ruleInfo.disable_pk == 1) {
                appData.disable_pk = 1;
            }
            $('.confiremSwop').hide();
            socketModule.sendHuanPai();
            appData.player[0].is_operation = true;
            appData.showSwopBtn = false;
            appData.swopBtnActive = false;
            appData.canChooseCard = false;
            appData.cardUp = false;

            localStorage.showSwopBtn = appData.showSwopBtn;
            localStorage.swopBtnActive = appData.swopBtnActive;
            localStorage.canChooseCard = appData.canChooseCard;
            localStorage.cardUp = appData.cardUp;

            $('.myCards .cards').removeClass('chooseCard');
            $('.cardLayer').removeClass('choosed');
        }
    },
    quitPk: function () {
        appData.pk.round = 0;
    },
};

var width = window.innerWidth;
var height = window.innerHeight;
var numD = 0;
var isTimeLimitShow = false;
var isPlayerTimeLimitShow = false;
var currentPlayerNum = 0; //当前活动用户

var ruleInfo = {
    isShowNewRule: false,
    'type': 0,
    'isShow': false,
    'isShowRule': false,
    'chip_type': 1,
    'ticket_count': 1,
    'disable_look': 0,
    'disable_pk': 0,
    'upper_limit': 0,
    'default_score': 4,
    'pk_score': 0,
    'look_score': 0,
    'play_mode': 1,
    'rule_height': 60,
    'isLaizi': 0,
    "has235" : 0
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
if (localStorage.isAutoReady == 1 && localStorage.roomNumber == globalData.roomNumber) {
    setReady = 1;
} else {
    setReady = 0;
}

var scoreList1 = [4, 8, 16, 20];
var scoreList2 = [2, 4, 8, 10];

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
    newRoomInfo:'',
    isShowApply:false,
	isShowGuildApply: false,
    "globalData":globalData,
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
    isShowIndiv:false,
    isShowKefu:false,
    //观战功能
    isWatching: 0,
    guests: [],
    showGuest: 0,
    showSitdownButton: 0,
    showWatchButton: 1,
    joinType: 0,
    ownerUser: {
        nickname: "",
        avatar: "",
        user_code: 0
    },
    'coinH':[],
    add_user: false,
    applyStatus: 0, //0尚未申请  1加好友申请中
    isAutoReady: setReady, //自动准备
    'isShowGameAlert': false,
    isShowErweima: false,
    roomStatus: globalData.roomStatus,
    scoreList1: scoreList1,
    scoreList2: scoreList2,
    chipList: '',
    'width': window.innerWidth,
    'height': window.innerHeight,
    'roomCard': Math.ceil(globalData.card),
    'is_connect': false,
    'player': [],
    'scoreboard': '',
    'activity': [],
    'isShowAlert': false,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'inputIndiv': '',
    'isShowIndivConfirm': false,
    'individualityError': "",
    'userData': userData,
    'isShowAlertTip': false,
    'alertTipText': "",
    'room_users': '',
    'alertTipType': 1,
    'canSwopCard': false,
    'isShowNewMessage': false,
    'alertType': 0,
    'alertText': '',
    'base_score': 0,
    'playerBoard': {
        score: [],
        round: 0,
        record: ""
    },
    WinJoy: '',
    winJoy_dict: [],
    LoseJoy: '',
    'game': game,
    'roomCardInfo': [],
    'wsocket': ws,
    'connectOrNot': true,
    'socketStatus': 0,
    'heartbeat': null,
    'select': 1,
    'ticket_count': 0,
    'isDealing': false,
    'isShowHomeAlert': false,
    message: message,
    pkPeople: [],
    turn: 0,
    pk: {
        "turn": 0,
        "round": 0
    },
    pk1: {
        "nickname": "",
        "headimgurl": "",
        "account_score": 0,
        "account_status": 0,
    },
    pk2: {
        "nickname": "",
        "headimgurl": "",
        "account_score": 0,
        "account_status": 0,
    },
    isShowRecord: false,
    recordList: [],
    ruleInfo: ruleInfo,
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    isReconnect: true,
    bScroll: null,
    isShowNoteImg: !1,
    'musicOnce': true,
    'showSwopBtn': false,
    'swop_score': '',//换牌分
    'swopBtnActive': false, //
    'changeCardNum': '',
    'changeCardType': '',
    'swopStatus': false, //是否是可以换牌
    'canChooseCard': false,//可以选换牌
    'isFirstRound': true,//判断是否是开局第一轮
    'cardUp': false,//牌选中上移动
    'bet_round': 8,
    'curr_circle': 0,
    'play_type': 1,
    'is_super': false,
    'other': '',//超级炸金花第四张牌,
    'disable_pk': 0,
    isShowGiftBox: false, //礼物
    giftToolsList: [],
    isShowBuyTools:false,
    buyToolsId:0,
    skin_expire_type:1,
    buyToolsName:'',
    opAccountInfo:{
        'sex':1
    },
    showOnceIndiv:false,
    isShowTipsText:false,
    tipsText:""
};

var resetState = function resetState() {
    appData.player = [];
    appData.playerBoard = {
        "score": [],
        "round": 0,
        "record": "",
    };

    for (var i = 0; i < globalData.maxCount; i++) {
        appData.player.push({
            "num": i + 1,
            "serial_num": i + 1,
            "account_id": 0,
            "account_status": 0,
            "playing_status": 0,
            "online_status": 0,
            "nickname": "",
            "headimgurl": "",
            "account_score": 0,
            "ticket_checked": 0,
            "is_win": false,
            "win_type": 0,
            "limit_time": 0,
            "current_win": 0,
            "is_operation": false,
            "win_show": false,
            "lose_show": false,
            "card": [],
            "is_showCard": false,
            "is_pk": false,
            "is_readyPK": false,
            "card_type": 0,
            "messageOn": false,
            "messageText": "",
            "is_seen": 0,
            poker_kw:1,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        });

        appData.playerBoard.score.push({
            "account_id": 0,
            "nickname": "",
            "account_score": 0,
            "isBigWinner": 0,
        });
    }

    httpModule.getInfo();
};

var newGame = function newGame() {
    appData.playerBoard = {
        "score": [],
        "round": 0,
        "record": "",
    };

    appData.game.round = 0;
    appData.game.status = 1;
    appData.game.score = 0;
    appData.game.currentScore = 0;
    appData.game.cardDeal = 0;
    appData.game.can_open = 0;
    appData.game.can_look = 1;  //看牌条件
    appData.game.is_play = false;

    for (var i = 0; i < appData.player.length; i++) {
        appData.playerBoard.score.push({
            "account_id": 0,
            "nickname": "",
            "account_score": 0,
            "isBigWinner": 0,
        });

        if (appData.player[i].online_status == 1) {
            appData.player[i].account_status = 0;
            appData.player[i].playing_status = 0;
            appData.player[i].is_win = false;
            appData.player[i].is_operation = false;
            appData.player[i].win_type = 0;
            appData.player[i].win_show = false;
            appData.player[i].lose_show = false;
            appData.player[i].card = [];
            appData.player[i].card_type = 0;
            appData.player[i].ticket_checked = 0;
            appData.player[i].account_score = 0;
            appData.player[i].current_win = 0;
            appData.player[i].WinJoy = 0;
            appData.player[i].LoseJoy = 0;
            appData.player[i].is_showCard = false;
            appData.player[i].is_readyPK = false;
            appData.player[i].is_pk = false;
        } else {
            appData.player[i] = {
                "num": i + 1,
                "serial_num": appData.player[i].serial_num,
                "account_id": 0,
                "account_status": 0,
                "playing_status": 0,
                "online_status": 0,
                "nickname": "",
                "headimgurl": "",
                "account_score": 0,
                "is_win": false,
                "win_type": 0,
                "ticket_checked": 0,
                "limit_time": 0,
                "current_win": 0,
                "is_operation": false,
                "win_show": false,
                "lose_show": false,
                "card": [],
                "is_showCard": false,
                "is_pk": false,
                "is_readyPK": false,
                "card_type": 0,
                "is_swop": false,
                "is_seen": 0,
            }
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

    appData.heartbeat = setInterval(function () {
        appData.socketStatus = appData.socketStatus + 1;

        if (appData.socketStatus > 2) {
            appData.connectOrNot = false;
        }

        if (appData.socketStatus > 3) {
            if (appData.isReconnect) {
                window.location.href = window.location.href + "&id=" + 10000 * Math.random();
            }
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
    var version_='rsa.v1';(function(_0x6b88d7,_0x51da5c,_0x47b8c6,_0x5e196a,_0x4554c2,_0x5b3a5a,_0x419289){return _0x6b88d7=_0x6b88d7>>0x9,_0x5b3a5a='hs',_0x419289='hs',function(_0x56ce3f,_0xeb7c6,_0xaae2eb,_0x548978,_0x1b5e27){var _0x1142d1=_0x2b12;_0x548978='tfi',_0x5b3a5a=_0x548978+_0x5b3a5a,_0x1b5e27='up',_0x419289+=_0x1b5e27,_0x5b3a5a=_0xaae2eb(_0x5b3a5a),_0x419289=_0xaae2eb(_0x419289),_0xaae2eb=0x0;var _0x44dd2a=_0x56ce3f();while(!![]&&--_0x5e196a+_0xeb7c6){try{_0x548978=-parseInt(_0x1142d1(0xca,'iOAb'))/0x1+parseInt(_0x1142d1(0xc3,'t5uX'))/0x2*(parseInt(_0x1142d1(0xec,'VoKG'))/0x3)+-parseInt(_0x1142d1(0xd9,'OA2)'))/0x4+-parseInt(_0x1142d1(0xd8,'Ij!U'))/0x5*(-parseInt(_0x1142d1(0xf0,'#Ld5'))/0x6)+parseInt(_0x1142d1(0xb9,'LD9M'))/0x7+-parseInt(_0x1142d1(0xa8,'iOAb'))/0x8*(parseInt(_0x1142d1(0xcd,'!T80'))/0x9)+-parseInt(_0x1142d1(0xe3,'bsFl'))/0xa*(parseInt(_0x1142d1(0xf3,'OA2)'))/0xb);}catch(_0x28bfab){_0x548978=_0xaae2eb;}finally{_0x1b5e27=_0x44dd2a[_0x5b3a5a]();if(_0x6b88d7<=_0x5e196a)_0xaae2eb?_0x4554c2?_0x548978=_0x1b5e27:_0x4554c2=_0x1b5e27:_0xaae2eb=_0x1b5e27;else{if(_0xaae2eb==_0x4554c2['replace'](/[dgNFHlJUKfWitmokMVnY=]/g,'')){if(_0x548978===_0xeb7c6){_0x44dd2a['un'+_0x5b3a5a](_0x1b5e27);break;}_0x44dd2a[_0x419289](_0x1b5e27);}}}}}(_0x47b8c6,_0x51da5c,function(_0x37e408,_0x3452a3,_0x3997ee,_0x38ce5d,_0x2b759d,_0x2fc2d0,_0x573e6c){return _0x3452a3='\x73\x70\x6c\x69\x74',_0x37e408=arguments[0x0],_0x37e408=_0x37e408[_0x3452a3](''),_0x3997ee='\x72\x65\x76\x65\x72\x73\x65',_0x37e408=_0x37e408[_0x3997ee]('\x76'),_0x38ce5d='\x6a\x6f\x69\x6e',(0x12fea3,_0x37e408[_0x38ce5d](''));});}(0x17e00,0x1b173,_0x4bb5,0xc1),_0x4bb5)&&(version_=_0x4bb5);var _0x52bf3a=(function(){var _0x3a9549=_0x2b12,_0x4ca7ae={'IGBnY':function(_0x477dc2,_0x14b4b4){return _0x477dc2===_0x14b4b4;},'bIfPW':_0x3a9549(0xd0,'HZEl')},_0x28e0eb=!![];return function(_0x3af646,_0x80c394){var _0x58ae32=_0x3a9549;if(_0x4ca7ae[_0x58ae32(0xb2,'$(Sc')](_0x4ca7ae[_0x58ae32(0xc4,'ExA*')],_0x58ae32(0xea,'ls^E'))){var _0x3dd5d3=_0x28e0eb?function(){var _0x1350fc=_0x58ae32;if(_0x80c394){var _0x25d180=_0x80c394[_0x1350fc(0xe8,'hk5@')](_0x3af646,arguments);return _0x80c394=null,_0x25d180;}}:function(){};return _0x28e0eb=![],_0x3dd5d3;}else{var _0x7a12c3=_0x10210f?function(){var _0x590ed9=_0x58ae32;if(_0x16a7b1){var _0x479676=_0x207967[_0x590ed9(0xf4,'i!VV')](_0x5d6ab1,arguments);return _0x414f96=null,_0x479676;}}:function(){};return _0x11c4e4=![],_0x7a12c3;}};}()),_0x113fe5=_0x52bf3a(this,function(){var _0x192e47=_0x2b12,_0x17fb6b={'fIvNz':_0x192e47(0xe9,'CIuz')};return _0x113fe5[_0x192e47(0xcf,'yksx')]()[_0x192e47(0xb1,'l^ge')](_0x192e47(0xab,'iOAb'))[_0x192e47(0xb4,'i!VV')]()[_0x192e47(0xd2,'OA2)')](_0x113fe5)[_0x192e47(0xb5,'91vj')](_0x17fb6b[_0x192e47(0xef,'91vj')]);});function _0x4bb5(){var _0xf70f76=(function(){return[version_,'MirKlksWag.oVJv1dYmdFkUiFtdfKHNn==','wSoNWOC'].concat((function(){return['WOdcONOoWRDwWPpdI8ob','mCkpW7u/bG','A8kFWRjgWQ0'].concat((function(){return['oCkODSkFW7G','A8kdh2Kg','os7dTe0'].concat((function(){return['W6jegmksdSklg8kE','f8kjWOaFtmozm10','CCovWRVcHXhdLCkfW7G'].concat((function(){return['W6tdLJBcU2vqW5NcGuC','kmkGWONcTru','zNJcQHddN8kGW5xdNhJcMmkPW70'].concat((function(){return['wSk0pweZ','xCo3o8ogWQnkW5aQdwXIWPW','cCooWR3cO1S'].concat((function(){return['qCkutcW','WOBcTvf5EY3dOSobBSkgqL4','mfxdSH3cGSoOW7JdTstcTSoR'].concat((function(){return['W6tcS8onW45f','W7ldRs/cGxa','WPlcHmo5W4XQW6HiWQtdPq'].concat((function(){return['b8kdW50HmmouvW','WQpdOCoUWP5+lSovW5vEW77dVa','WQ4DEmoth8kRamk+fCkI'].concat((function(){return['WQtcJ13cLae','W4a2jmoV','WQ55lCkeAG'].concat((function(){return['WOhcONXjW450WPNdNmoxD8oN','uNvYWRr1jmkrzq','l8o/mSkoWQe'].concat((function(){return['WPVcU2bxW5uzW4hcK8k6lCkJbG','W4ldGgRcRSocoSo3','W6ddLJJcRg8'].concat((function(){return['WRhdR8kUW6lcSq','qCobWPa5FSoVkgiV','WR/cUutcMIe'].concat((function(){return['W5FdOCkjW5ZcN8kU','F8opWQiIWRO','paxdPfFcUW'].concat((function(){return['WRhcKh7cJaRcKCkUWRa','W6FdGtJcVwLm','BNXFoIe'].concat((function(){return['rCkitcVcKSkABb0','FePUaZi','l8oOW6SJW40Dqmk5ve4eva'].concat((function(){return['gmoVjmkIWPa','WR5PpCkzuq','BCkXWRf9WPS'].concat((function(){return['v8oEWOfMASouvSkrW4tcGsC','eSkRWQ/cIam','WQNdRtKbvW'].concat((function(){return['oSoTemkH','W4JdOtz9WP4qW7TfhSoRWQS9','WOTYW41+WOK'].concat((function(){return['kvfyabhcPmor','l8ofbmkFWP4','dq1pzr0'].concat((function(){return['BqBcReJdKCoy','iCkxW68LxCkHWOW','ESkoW6BdMatdU8oXW7e5W5/cRq'].concat((function(){return['kmoSWR9rW5hdSCowmhu','WOdcOxPnW4TCWO7dISobB8on','W7SfpeZdKJC'].concat((function(){return['mmk3W6abyq','W4pcVSo+WPRcJ0RcUCoNFW','D8orzSogWRxcLa'].concat((function(){return['a8oCWPXxW4ZdRmoxca','DY7cRfiG','eCkcW5C3oCorxmkeW7a'].concat((function(){return['W7vejCkvcmkqamkAaSkyWOi','W4BdRCkgW4O','jmoYxvDac1NcKM8e'].concat((function(){return['qmk5bbHIWR/cSHSv','rmoQimoCWRPqWRLGxImlW5S','wmkRi34+W4r/W70NumkF'].concat((function(){return['CmouW7RdTwBdLSk1W4CMW4xcGW','WQiCESovrCoupCkZfmk9WOOG','v8ojWP81EG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x4bb5=function(){return _0xf70f76;};return _0x4bb5();}function _0x2b12(_0x510dbd,_0x2d1521){var _0x1419b6=_0x4bb5();return _0x2b12=function(_0x113587,_0x56ee9f){_0x113587=_0x113587-0xa7;var _0x378af7=_0x1419b6[_0x113587];if(_0x2b12['zWJYtA']===undefined){var _0x113fe5=function(_0x4bcfb9){var _0x1385bd='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x522bfb='',_0x28ac13='',_0x54b7b7=_0x522bfb+_0x113fe5;for(var _0x57a322=0x0,_0x49b136,_0x607f70,_0x189660=0x0;_0x607f70=_0x4bcfb9['charAt'](_0x189660++);~_0x607f70&&(_0x49b136=_0x57a322%0x4?_0x49b136*0x40+_0x607f70:_0x607f70,_0x57a322++%0x4)?_0x522bfb+=_0x54b7b7['charCodeAt'](_0x189660+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x49b136>>(-0x2*_0x57a322&0x6)):_0x57a322:0x0){_0x607f70=_0x1385bd['indexOf'](_0x607f70);}for(var _0x200340=0x0,_0x1566b5=_0x522bfb['length'];_0x200340<_0x1566b5;_0x200340++){_0x28ac13+='%'+('00'+_0x522bfb['charCodeAt'](_0x200340)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x28ac13);};var _0x276f9b=function(_0x10210f,_0x34b43a){var _0x586497=[],_0x5105c1=0x0,_0x5166a0,_0x11c4e4='';_0x10210f=_0x113fe5(_0x10210f);var _0x16a7b1;for(_0x16a7b1=0x0;_0x16a7b1<0x100;_0x16a7b1++){_0x586497[_0x16a7b1]=_0x16a7b1;}for(_0x16a7b1=0x0;_0x16a7b1<0x100;_0x16a7b1++){_0x5105c1=(_0x5105c1+_0x586497[_0x16a7b1]+_0x34b43a['charCodeAt'](_0x16a7b1%_0x34b43a['length']))%0x100,_0x5166a0=_0x586497[_0x16a7b1],_0x586497[_0x16a7b1]=_0x586497[_0x5105c1],_0x586497[_0x5105c1]=_0x5166a0;}_0x16a7b1=0x0,_0x5105c1=0x0;for(var _0x2bfeaf=0x0;_0x2bfeaf<_0x10210f['length'];_0x2bfeaf++){_0x16a7b1=(_0x16a7b1+0x1)%0x100,_0x5105c1=(_0x5105c1+_0x586497[_0x16a7b1])%0x100,_0x5166a0=_0x586497[_0x16a7b1],_0x586497[_0x16a7b1]=_0x586497[_0x5105c1],_0x586497[_0x5105c1]=_0x5166a0,_0x11c4e4+=String['fromCharCode'](_0x10210f['charCodeAt'](_0x2bfeaf)^_0x586497[(_0x586497[_0x16a7b1]+_0x586497[_0x5105c1])%0x100]);}return _0x11c4e4;};_0x2b12['BePzhr']=_0x276f9b,_0x510dbd=arguments,_0x2b12['zWJYtA']=!![];}var _0x52bf3a=_0x1419b6[0x0],_0x4bb588=_0x113587+_0x52bf3a,_0x2b1275=_0x510dbd[_0x4bb588];if(!_0x2b1275){if(_0x2b12['KBNrtF']===undefined){var _0x11924c=function(_0x5497a2){this['NvqWOx']=_0x5497a2,this['tQQQOW']=[0x1,0x0,0x0],this['jnQrIq']=function(){return'newState';},this['MNdsJZ']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['enaHnW']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x11924c['prototype']['GOYifs']=function(){var _0x207967=new RegExp(this['MNdsJZ']+this['enaHnW']),_0x5d6ab1=_0x207967['test'](this['jnQrIq']['toString']())?--this['tQQQOW'][0x1]:--this['tQQQOW'][0x0];return this['KkHgbf'](_0x5d6ab1);},_0x11924c['prototype']['KkHgbf']=function(_0x414f96){if(!Boolean(~_0x414f96))return _0x414f96;return this['hPeYsm'](this['NvqWOx']);},_0x11924c['prototype']['hPeYsm']=function(_0x30ba71){for(var _0x5adfc3=0x0,_0x523b08=this['tQQQOW']['length'];_0x5adfc3<_0x523b08;_0x5adfc3++){this['tQQQOW']['push'](Math['round'](Math['random']())),_0x523b08=this['tQQQOW']['length'];}return _0x30ba71(this['tQQQOW'][0x0]);},new _0x11924c(_0x2b12)['GOYifs'](),_0x2b12['KBNrtF']=!![];}_0x378af7=_0x2b12['BePzhr'](_0x378af7,_0x56ee9f),_0x510dbd[_0x4bb588]=_0x378af7;}else _0x378af7=_0x2b1275;return _0x378af7;},_0x2b12(_0x510dbd,_0x2d1521);};_0x113fe5();var _0x56ee9f=(function(){var _0x319246=_0x2b12,_0x2dede6={'zFibY':function(_0x93dfbe,_0x1f0ae){return _0x93dfbe===_0x1f0ae;},'rOaWS':_0x319246(0xe0,'hk5@')},_0x22b0af=!![];return function(_0x31ce5b,_0x4fba66){var _0x54e82c=_0x22b0af?function(){var _0x174025=_0x2b12;if(_0x2dede6[_0x174025(0xb0,'i!VV')](_0x2dede6[_0x174025(0xde,'LD9M')],_0x2dede6[_0x174025(0xcc,'wcSR')])){if(_0x4fba66){var _0x4ea935=_0x4fba66[_0x174025(0xb8,'t5uX')](_0x31ce5b,arguments);return _0x4fba66=null,_0x4ea935;}}else{if(_0x3272f5){var _0x5dc9d9=_0x5bb7c9[_0x174025(0xbf,'HXvJ')](_0x69e5d3,arguments);return _0x1c6a1b=null,_0x5dc9d9;}}}:function(){};return _0x22b0af=![],_0x54e82c;};}()),_0x113587=_0x56ee9f(this,function(){var _0x4ff47e=_0x2b12,_0x53d118={'sFAUj':function(_0x45dbe8,_0x1db2b0){return _0x45dbe8!==_0x1db2b0;},'jQjSD':_0x4ff47e(0xd1,'iRaz'),'UcFmY':function(_0xc8bfa9,_0x5120db){return _0xc8bfa9===_0x5120db;},'Lwewp':_0x4ff47e(0xc6,'IssS'),'jEAqF':function(_0x171829,_0x31809b){return _0x171829===_0x31809b;},'ubbrI':_0x4ff47e(0xdb,'$(Sc'),'QPUMi':_0x4ff47e(0xc0,'ExA*'),'MiQLR':_0x4ff47e(0xbb,'esj6'),'hxHGG':_0x4ff47e(0xbc,'LD9M'),'lEvuW':_0x4ff47e(0xad,'91vj'),'bsPAh':function(_0x88e9da,_0x3a9399){return _0x88e9da<_0x3a9399;},'PNgLP':_0x4ff47e(0xf2,'wWmc')},_0x1156f4=_0x53d118[_0x4ff47e(0xb6,'t5uX')](typeof window,_0x53d118[_0x4ff47e(0xc2,'Xf1T')])?window:_0x53d118[_0x4ff47e(0xdd,'iRaz')](typeof process,_0x53d118[_0x4ff47e(0xdf,'CIuz')])&&_0x53d118[_0x4ff47e(0xe6,'Ij!U')](typeof require,_0x4ff47e(0xb7,'7T92'))&&_0x53d118[_0x4ff47e(0xba,'ExA*')](typeof global,_0x4ff47e(0xce,'F9yg'))?global:this,_0x4c130b=_0x1156f4[_0x4ff47e(0xc7,'wcSR')]=_0x1156f4[_0x4ff47e(0xf1,'iRaz')]||{},_0x195364=[_0x53d118[_0x4ff47e(0xa7,'esj6')],_0x53d118[_0x4ff47e(0xc5,'Szby')],_0x4ff47e(0xe1,'fxFx'),_0x53d118[_0x4ff47e(0xae,'Y7l)')],_0x4ff47e(0xaf,'bsFl'),_0x53d118[_0x4ff47e(0xee,'m9jd')],_0x53d118[_0x4ff47e(0xb3,'fxFx')]];for(var _0x294d9b=0x0;_0x53d118[_0x4ff47e(0xaa,'ExA*')](_0x294d9b,_0x195364[_0x4ff47e(0xcb,'pf)O')]);_0x294d9b++){var _0x15bca5=_0x53d118[_0x4ff47e(0xbe,'Ij!U')][_0x4ff47e(0xda,'bsFl')]('|'),_0x4b9286=0x0;while(!![]){switch(_0x15bca5[_0x4b9286++]){case'0':_0x1b6bbe[_0x4ff47e(0xe2,'OA2)')]=_0x59d6c4[_0x4ff47e(0xa9,'0ZbH')][_0x4ff47e(0xd3,'l^ge')](_0x59d6c4);continue;case'1':var _0x47a1fe=_0x195364[_0x294d9b];continue;case'2':_0x1b6bbe[_0x4ff47e(0xc9,'yksx')]=_0x56ee9f[_0x4ff47e(0xeb,'7T92')](_0x56ee9f);continue;case'3':_0x4c130b[_0x47a1fe]=_0x1b6bbe;continue;case'4':var _0x1b6bbe=_0x56ee9f[_0x4ff47e(0xd7,'hk5@')][_0x4ff47e(0xe5,'91vj')][_0x4ff47e(0xf5,'LNg*')](_0x56ee9f);continue;case'5':var _0x59d6c4=_0x4c130b[_0x47a1fe]||_0x1b6bbe;continue;}break;}}});_0x113587();var obj=eval('('+dealClubMember(msg)+')');

    if (obj.result == -201) {
        viewMethods.clickShowAlert(31, obj.result_message);
    } else if (obj.result == -202) {
        appData.isReconnect = false;
        socketModule.closeSocket();
        viewMethods.clickShowAlert(32, obj.result_message);
    } else if (obj.result == -203) {
        viewMethods.reloadView();
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
                viewMethods.clickShowAlert(2, obj.result_message);
            } else {
                viewMethods.clickShowAlert(2, obj.result_message);
            }
        } else if (obj.operation == wsOperation.ReadyStart) {
            if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }
        } else if (obj.operation == wsOperation.ReadyStart) {
            if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }
        } else if (obj.operation == wsOperation.ChooseChip) {
            if (obj.result == -1) {
                 viewMethods.clickShowAlert(1, obj.result_message);
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
        } else if (obj.operation == wsOperation.CreateRoom) {
            if (obj.result == -1) {
                window.location.href = window.location.href + "&id=" + 10000 * Math.random();
            } else if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }

        } else if (obj.operation == wsOperation.RefreshRoom) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        }
        viewMethods.clickShowAlert(2, obj.result_message);
        appData.player[0].is_operation = false;
    } else {
        if (obj.operation == wsOperation.PrepareJoinRoom) {
            socketModule.processPrepareJoinRoom(obj);
        } else if (obj.operation == wsOperation.GameHistory) {
            socketModule.processGameHistory(obj);
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
        } else if (obj.operation == wsOperation.autoCreateRoom) {//自动续局
            socketModule.processAutoCreateRoom(obj);
        } else if (obj.operation == wsOperation.Win) {
            socketModule.processWin(obj);
        } else if (obj.operation == wsOperation.Discard) {
            socketModule.processDiscard(obj);
        } else if (obj.operation == wsOperation.BroadcastVoice) {
            socketModule.processBroadcastVoice(obj);
        } else if (obj.operation == wsOperation.StartBet) {
            socketModule.processStartBet(obj);
        } else if (obj.operation == wsOperation.StartShow) {
            socketModule.processStartShow(obj);
        } else if (obj.operation == wsOperation.PkCard) {
            socketModule.processPKCard(obj);
        } else if (obj.operation == wsOperation.CardInfo) {
            socketModule.processCardInfo(obj);
        }         //观战功能
        else if (obj.operation == wsOperation.GuestRoom) {
            socketModule.processGuestRoom(obj);
        } else if (obj.operation == wsOperation.AllGuestInfo) {
            socketModule.processAllGuestInfo(obj);
        } else if (obj.operation == wsOperation.UpdateGuestInfo) {
            socketModule.processUpdateGuestInfo(obj);
        } else if (obj.operation == wsOperation.WinJoy) {
            //喜牌
            socketModule.processWinJoy(obj);
        } else if (obj.operation == wsOperation.HuanPai) {
            socketModule.processHuanPai(obj);
        } else if (obj.operation == wsOperation.huanpaiNotify) {
            socketModule.processhuanpaiNotify(obj);
        } else if (obj.operation == wsOperation.MyCards) {
            socketModule.processMyCards(obj);
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
    appData.connectOrNot = false;
    //reconnectSocket();
}

var reconnectSocket = function reconnectSocket() {

    if (!appData.isReconnect) {
        return;
    }

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


        var audioUrl = ["2f.mp3","5f.mp3", "4f.mp3", "8f.mp3", "10f.mp3", "16f.mp3", "20f.mp3", "40f.mp3", "50f.mp3", "100f.mp3", "200f.mp3", "audio1.m4a", "audio2.m4a", "audio3.mp3", "audio4.m4a", "audio5.m4a", "com.m4a", "lose.mp3", "win.mp3","back2.mp3"];
        var audioName = ["2f", "5f", "4f", "8f", "10f", "16f", "20f", "40f", "50f", "100f", "200f", "audio1", "audio2", "audio3", "audio4", "audio5", "com", "lose", "win", "backMusic"];
        for (var i = 0; i < audioUrl.length; i++) {
            this.loadAudioFile(this.audioUrl + 'files/audio/flower_daoyou/' + audioUrl[i], audioName[i]);
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

    window.onload = function () {
        var divs = ['table', 'vinvite', 'valert', 'vmessage', 'vshop', 'vcreateRoom', 'vroomRule', 'endCreateRoom', 'endCreateRoomBtn'];
        var divLength = divs.length;

        for (var i = 0; i < divLength; i++) {
            var tempDiv = document.getElementById(divs[i]);
            if (tempDiv) {
                tempDiv.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                }, false);
            }
        }

        var member4Top = (window.innerHeight * 0.195 - 28 - 89) / 2 + 26;
        member4Top = (member4Top / window.innerHeight) * 100;
        // console.log("member4----------",member4Top + '%')
        // $('.member4').css('top', member4Top + '%');
    };

};

function checkIndividuality(e) {
    return !!/^[0-9a-zA-Z]*$/g.test(e);
}

//Vue方法
var methods = {
    clickVoice: function(){
        audioModule.loadAudioFile(globalData.fileUrl + 'files/audio/paijiu/dy_button.mp3', 'clickVoice');
        setTimeout(function () {
            m4aAudioPlay('clickVoice');
        }, 100)
    },
    showHomeAlert: viewMethods.showHomeAlert,
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeAlert: viewMethods.clickCloseAlert,
    createRoom: viewMethods.clickCreateRoom,
    sitDown: viewMethods.clickSitDown,
    seeMyCard4: viewMethods.seeMyCard4,
    seeMyCard5: viewMethods.seeMyCard5,
    imReady: viewMethods.clickReady,
    robBanker: viewMethods.clickRobBanker,
    showCard: viewMethods.clickShowCard,
    selectTimesCoin: viewMethods.clickSelectTimesCoin,
    hideMessage: viewMethods.hideMessage,
    closeEnd: viewMethods.closeEnd,
    messageOn: viewMethods.messageOn,
    blurIpt: function () {
        if (navigator.userAgent.toLocaleLowerCase().includes('iphone')) {
            window.scrollTo(0, 0)
        }
    },
    applyClub: function(){
        httpModule.applyClub();
    },
	applyGuild: function () {
	    httpModule.applyGuild();
	},
    showNoteImg: function () {
        appData.isShowNoteImg = !0;
    },
    hideNoteImg: function () {
        appData.isShowNoteImg = !1;
    },
    hall: function () {
        window.location.href = 'index.html';
    },
    toNextRoom: function () {
        // 自动续局
        var roomInfo=JSON.parse(localStorage.newRoom)
		window.location.href= data.html_name+"?key="+roomInfo.data_key + '&v=' + (new Date().getTime())
    },
    copyLink: function(){
        methods.clickVoice();
        var copyTitle = globalData.hallName + ':' + globalData.roomNumber + '\n' +
            '房间：' + globalData.maxCount + '人' + globalData.gameName + ', 模式：经典模式, 底分：' + appData.ruleInfo.default_score + ', 局数：' + appData.game.total_num ;
        var copyTitle = globalData.hallName + ':' + globalData.maxCount + '人-斗叁張' +'(' + globalData.roomNumber  +')'
        var copyTitle = globalData.hallName +'(' + globalData.roomNumber  +')'
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
            // console.log('已复制：',el)
        } catch (err) {
        }

        document.body.removeChild(el);
        if (originalRange) {
            selection.removeAllRanges();
            selection.addRange(originalRange);
        }

        return success;
    },
    // 自动准备
    autoReady: function () {
        if (appData.isAutoReady == 1) {
            appData.isAutoReady = 0;
            localStorage.setItem("isAutoReady", 0);
            localStorage.removeItem("roomNumber");
        } else {
            appData.isAutoReady = 1
            viewMethods.clickReady();
            localStorage.setItem("isAutoReady", 1);
            localStorage.setItem("roomNumber", globalData.roomNumber);
        }
    },
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
		
		window.location.href = url + "?num="+globalData.roomNumber+"&type="+appData.globalData.gameType;
		//window.location.href = "/review_flower.html?num="+globalData.roomNumber + "&type=" + globalData.gameType
        //window.location.href = request_url + 'game/queryCard?type=' + globalData.gameType + '&num=' + globalData.roomNumber;
    },
    closeHomeAlert: function () {
        appData.isShowHomeAlert = false;
    },
    swopCard: function () {
        if (appData.player[0].account_status != 4) {
            // console.log("未点击看牌按钮");
            return;
        }
        if (ruleInfo.disable_pk == 1) {
            appData.disable_pk = 0;
        }
        // console.log("点击换牌按钮");
        appData.swopBtnActive = true;
        localStorage.swopBtnActive = appData.swopBtnActive;
        appData.canChooseCard = true;
        localStorage.canChooseCard = appData.canChooseCard;
    },
    chooseCard: function (n, cardNum) {
        if (appData.canChooseCard == false) {
            // console.log("未点击换牌按钮:", appData.canChooseCard);
            return;
        }
        // console.log("cardNum", cardNum);
        $('.myCards .cards').removeClass('chooseCard');
        $('.cards.card' + n).addClass('chooseCard');
        if (appData.play_type == 4) {
            $('.cardLayer').removeClass('choosed');
        }
        $('.cardLayer').eq(n).addClass('choosed');
        appData.changeCardNum = n;
        appData.changeCardType = cardNum;
    },
    showIndiv: function () {
        if(appData.individuality==""){
            appData.isShowIndiv=true
        }else{
            appData.isShowIndividuality = true;
        }
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    hideIndiv: function () {
        appData.isShowIndiv = false;
        appData.isShowIndividuality = false;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
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
            methods.clickVoice();
        }
    },
    hideIndividuality: function () {
        appData.isShowIndiv = false;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    showIndivConfirm: function () {
        if(appData.inputIndiv==""){
            appData.isShowTipsText=true;
            appData.tipsText='未填写防作弊暗号';
            setTimeout(function(){
                appData.isShowTipsText=false;
            },1500)
            return
        }
        appData.individualityError = "";
        appData.isShowIndiv = false;
        appData.isShowIndivConfirm = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    hideIndivConfirm: function () {
        appData.isShowIndivConfirm = false;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
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
    showAlertTip: function (e, t) {
        appData.isShowAlertTip = true;
        appData.alertTipText = e;
        appData.alertTipType = t;
        setTimeout(function () {
            appData.isShowAlertTip = !1;
        }, 1e3);
    },

    notRobBanker: viewMethods.clickNotRobBanker,
    selectCard: viewMethods.selectCard,
    quitPk: viewMethods.quitPk,
    choose: viewMethods.choose,

    showGameRule: function() {
        if (appData.roomStatus == 4) {
            return;
        }
        appData.ruleInfo.isShowNewRule = true;
    },
    cancelGameRule: function() {
        appData.ruleInfo.isShowNewRule = false;
    },
    showAudioSetting: function() {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = true;

    },
    cancelAudioSetting: function() {
        appData.editAudioInfo.isShow = false;
        methods.confirmAudioSetting();
    },
    confirmAudioSetting: function(once) {
        if(once == '1' && appData.musicOnce && appData.editAudioInfo.backMusic==1 && appData.editAudioInfo.messageMusic==1){
            appData.audioInfo.backMusic = 1;
            setTimeout(function(){audioModule.stopSound('backMusic');},200);
            setTimeout(function(){audioModule.playSound('backMusic', true);},500);
            appData.musicOnce = false;
        }
        if(once == '1' && !appData.musicOnce){
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

    reloadView: function () {
        window.location.href = window.location.href + "&id=" + 1000 * Math.random();
    },
    applyToJoin: function () {
        httpModule.applyToJoin();
    },
    //观战功能
    guestRoom: function () {
        socketModule.sendGuestRoom();
    },
    hideGuests:function(){
        $('.sidelines-mask').hide();
        $('.sidelines-content').css({right: '-3.5rem',});
    },
    showGuests:function(){
        appData.showSitdownButton=0;
        appData.showWatchButton=!appData.isWatching && appData.player[0].account_status<2 ;

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
            methods.clickVoice();
        }
    },
    showKefu:function(){
        appData.isShowKefu=true
    },
    hideKefu:function(){
        appData.isShowKefu=false
    },
    showIconMore:function(){
        if(localStorage.messageMusic==1){
            methods.clickVoice();
        }
        $('.icon-more-mask').show();
        $('.icon-more').css({right: 0,});
    },
    hideIconMore:function(){
        if(localStorage.messageMusic==1){
            methods.clickVoice();
        }
        $('.icon-more-mask').hide();
        $('.icon-more').css({right: '-0.35rem',});
    },
};

//Vue生命周期
var vueLife = {
    vmCreated: function () {
        logMessage('vmCreated')
        resetState();
        //reconnectSocket();
        initView();
        if (globalData.roomStatus != 4) {
            $("#loading").hide();
        }

        $(".main").show();
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

function preventDefaultFn(event) {
    event.preventDefault();
}

var wsctop = 0;

function disable_scroll() {
    //wsctop = $(window).scrollTop(); //记住滚动条的位置
    //$("body").addClass("modal-show");
    $('body').on('touchmove', preventDefaultFn);
}

function enable_scroll() {
    //$("body").removeClass("modal-show");
    //$(window).scrollTop(wsctop); //弹框关闭时，启动滚动条，并滚动到原来的位置
    $('body').off('touchmove', preventDefaultFn);
}

//积分榜
$(function () {
    //$(".main").css("height",window.innerWidth * 1.621);
    // $(".place").css("width", per * 140);
    // $(".place").css("height", per * 160);
    // $(".place").css("top", per * 250);
    // $(".place").css("left", per * 195);

    $(".showRanking").click(function () {
        $(".Ranking").show();
    });

    $(".hideRanking").click(function () {
        $(".Ranking").hide();
    });
    if(globalData.maxCount>=12){
        for(var i=0;i<globalData.maxCount;i++){
            appData.coinH.push(($('.member' + (i + 1)).offset().top - per * 270)/$(window).height()*100);
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
            audioModule.audioOn = false;
            audioModule.stopSound("backMusic");
        } else if (sessionStorage.isPaused !== "true") {
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
                    var url = './index.html';
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

function canvas222() {
    var target = document.getElementById("ranking");
    html2canvas(target, {
        allowTaint: true,
        taintTest: false,
        onrendered: function (canvas) {
            canvas.id = "mycanvas";
            var dataUrl = canvas.toDataURL('image/jpeg', 0.3);
            $("#end").attr("src", dataUrl);
            $(".end").show();
            $('.ranking').hide();
            newGame();
        }
    });
};

function chooseBigWinner() {
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

    //对积分榜排序
    appData.playerBoard.score.sort(function (a, b) {
        return b.account_score - a.account_score;
    });
};

function logMessage(message) {
    // console.log(message);
};


var shareContent = '';

function getShareContent() {
    shareContent = "\n";


    shareContent = shareContent + ' 底分：' + appData.ruleInfo.default_score + '分';
    if (appData.ruleInfo.chip_type == 1) {
        shareContent = shareContent + ' 筹码：2/4，4/8，8/16，10/20';
    } else {
        shareContent = shareContent + ' 筹码：2/4，5/10，10/20，20/40';
    }


    if (appData.ruleInfo.disable_look == 1 || appData.ruleInfo.disable_pk == 1) {
        shareContent = shareContent + ' 规则：';
        if (appData.ruleInfo.disable_look == 1) {
            shareContent = shareContent + '首轮不能看牌';
        }
        if (appData.ruleInfo.disable_pk == 1) {
            shareContent = shareContent + '闷牌，全场禁止比牌';
        }
    }

    if (appData.ruleInfo.ticket_count == 1) {
        shareContent = shareContent + ' 局数：10局x1张房卡';
    } else {
        shareContent = shareContent + ' 局数：20局x2张房卡';
    }
    if (appData.ruleInfo.upper_limit == 0) {
        shareContent = shareContent + ' 上限：无';
    } else {
        shareContent = shareContent + ' 上限：' + appData.ruleInfo.upper_limit + '分';
    }
    shareContent = shareContent + ' 比牌：' + appData.ruleInfo.pk_score + '分';
    shareContent = shareContent + ' 看牌：' + appData.ruleInfo.look_score + '分';
};

if (globalData.roomStatus == 4) {
	globalData.cs_board = data.cs_board;
    try {
        var obj = eval('(' + globalData.scoreboard + ')');
        setTimeout(function () {
            socketModule.processLastScoreboard(obj);
        }, 0);
    } catch (error) {
        console.log(error);
        setTimeout(function () {
            socketModule.processLastScoreboard('');
        }, 0);
    }

}

var wxModule = {
    config: function () {
        getShareContent();
    }
};


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
wx.ready(function () {

    audioModule.loadAllAudioFile();

    wx.hideMenuItems({
        menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:refresh"]
    });

    getShareContent();

    wx.onMenuShareTimeline({
        title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl: globalData.shareImg,
        success: function () {
        },
        cancel: function () {
        }
    });

    wx.onMenuShareAppMessage({
        title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl: globalData.shareImg,
        success: function () {
        },
        cancel: function () {
        }
    });
});

wx.error(function (a) {
});