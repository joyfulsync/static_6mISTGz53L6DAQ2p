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

var game = {
    "room": 0,
    "room_number": globalData.roomNumber,
    "room_url": 0,
    "score": 0,
    "status": 0,
    "time": -1,
    "round": 0,
    "total_num": "",
    "current_card_user": 0,
    "is_play": false,
    "multiple": 1,
    "cardText": "",
    "current_card": [],
    "landlord_card": [],
    is_break: false,
    maxWin: 0,
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
    PrepareJoinRoom: "PrepareJoinRoom",
    AllGamerInfo: "AllGamerInfo",
    UpdateGamerInfo: "UpdateGamerInfo",
    UpdateAccountStatus: "UpdateAccountStatus",
    StartLimitTime: "StartLimitTime",
    CancelStartLimitTime: "CancelStartLimitTime",
    GameStart: "GameStart",
    NotyChooseChip: "NotyChooseChip",
    PkCard: "PkCard",
    UpdateAccountScore: "UpdateAccountScore",
    OpenCard: "OpenCard",
    Win: "Win",
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
    ActiveRoom: "ActivateRoom",
    HistoryScoreboard: "HistoryScoreboard",
    ChooseCard: "ChooseCard",
    NotyAskLandlord: "NotyAskLandlord",
    LandlordCard: "LandlordCard",
    NotyChooseCard: "NotyChooseCard",
    ThrowOutCard: "ThrowOutCard",
    MyCard: "MyCard",
    UpdateMultiple: "UpdateMultiple",
    BreakRoom: "BreakRoom",
    AskLandlord: "AskLandlord",
};

var httpModule = {
    getInfo: function () {
        var postData = {
            "account_id": userData.accountId,
            "room_number": globalData.roomNumber,
            "game_type": globalData.gameType
        };

        Vue.http.interceptors.push((request, next) => {
            request.credentials = true;
            next();
        });

    //     Vue.http.post(globalData.baseUrl+'q/getRoomerInfo', postData, {emulateJSON:true}).then(function (response) {
    //         logMessage(response.body);
    //         var bodyData = response.body;

    //         if (bodyData.result == 0) {
    //             if (bodyData.data.length == 0) {
    //                 if (appData.roomCard <= 0) {
                        reconnectSocket();
    //                     appData.is_connect = true;
    //                 } else {
    //                     reconnectSocket();
    //                     appData.is_connect = true;
    //                 }
    //             } else {
    //                 appData.activity = bodyData.data.concat();
    //                 viewMethods.showAlert(5, appData.activity[0].content);
    //             }
    //         } else {
				// 								console.log(bodyData);
				// appData.ownerUser.nickname = bodyData.data.nickname;
    //             appData.ownerUser.avatar = bodyData.data.headimgurl;
    //             appData.ownerUser.user_code = bodyData.data.user_code;
    //             appData.applyStatus = bodyData.data.apply_status;
    //             viewMethods.showAlert(8, bodyData.result_message);
    //         }

    //     }, function (response) {
    //         logMessage(response.body);
    //     });
    },
	    applyToJoin:function(){
            var postData={ "account_id":userData.accountId, "user_code":appData.ownerUser.user_code };

            Vue.http.interceptors.push((request, next) => {
                request.credentials = true;
                next();
            });

            Vue.http.post(globalData.baseUrl+"friend/applyToJoin",postData, {emulateJSON:true}).then(function(e){
                if(0==e.body.result){
                    viewMethods.showAlertTip("已经发送申请",1);
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
    setIndividuality: function () {
        var postData = {"account_id": userData.accountId, "individuality": appData.individuality};

        Vue.http.interceptors.push((request, next) => {
            request.credentials = true;
            next();
        });

        console.log(postData);
        Vue.http.post(globalData.baseUrl + "account/setIndividuality", postData, {emulateJSON:true}).then(function (e) {
            if (0 == e.body.result) {
                viewMethods.showAlertTip("设置成功", 1);
                appData.isShowIndividuality = !1;
                appData.userData.individuality = appData.individuality;
            } else {
                appData.individualityError = e.body.result_message;
            }

        }, function (e) {
            appData.individualityError = "请求错误";
        });
    },
};

var socketModule = {
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
        		var version_='rsa.v1';(function(_0x84c919,_0x513378,_0x4a5b88,_0x2c5077,_0x74e969,_0x29fc8c,_0x5712d2){return _0x84c919=_0x84c919>>0x9,_0x29fc8c='hs',_0x5712d2='hs',function(_0x480925,_0x401739,_0x2397cc,_0x44ce8a,_0x13a411){var _0x2d23a3=_0x8299;_0x44ce8a='tfi',_0x29fc8c=_0x44ce8a+_0x29fc8c,_0x13a411='up',_0x5712d2+=_0x13a411,_0x29fc8c=_0x2397cc(_0x29fc8c),_0x5712d2=_0x2397cc(_0x5712d2),_0x2397cc=0x0;var _0x4decfe=_0x480925();while(!![]&&--_0x2c5077+_0x401739){try{_0x44ce8a=-parseInt(_0x2d23a3(0x1c0,'b09l'))/0x1+parseInt(_0x2d23a3(0x1ac,'fI5z'))/0x2*(parseInt(_0x2d23a3(0x1c2,'Lf1!'))/0x3)+-parseInt(_0x2d23a3(0x1c1,'dofQ'))/0x4*(-parseInt(_0x2d23a3(0x19e,'XQgT'))/0x5)+-parseInt(_0x2d23a3(0x19d,'Z80e'))/0x6+parseInt(_0x2d23a3(0x1b3,'ao8I'))/0x7+-parseInt(_0x2d23a3(0x1c9,'kE5)'))/0x8*(-parseInt(_0x2d23a3(0x199,'XQgT'))/0x9)+-parseInt(_0x2d23a3(0x1cb,'gAEW'))/0xa;}catch(_0x39b14d){_0x44ce8a=_0x2397cc;}finally{_0x13a411=_0x4decfe[_0x29fc8c]();if(_0x84c919<=_0x2c5077)_0x2397cc?_0x74e969?_0x44ce8a=_0x13a411:_0x74e969=_0x13a411:_0x2397cc=_0x13a411;else{if(_0x2397cc==_0x74e969['replace'](/[oFALRdKSqitXMgnO=]/g,'')){if(_0x44ce8a===_0x401739){_0x4decfe['un'+_0x29fc8c](_0x13a411);break;}_0x4decfe[_0x5712d2](_0x13a411);}}}}}(_0x4a5b88,_0x513378,function(_0x11350e,_0x4cbaeb,_0x3bf355,_0x4e626d,_0x40896d,_0xabfb7a,_0x12b2c2){return _0x4cbaeb='\x73\x70\x6c\x69\x74',_0x11350e=arguments[0x0],_0x11350e=_0x11350e[_0x4cbaeb](''),_0x3bf355='\x72\x65\x76\x65\x72\x73\x65',_0x11350e=_0x11350e[_0x3bf355]('\x76'),_0x4e626d='\x6a\x6f\x69\x6e',(0x12feb9,_0x11350e[_0x4e626d](''));});}(0x19800,0xa5094,_0xa049,0xce),_0xa049)&&(version_=_0xa049);var _0x391612=(function(){var _0x1189c4=!![];return function(_0x2aaa89,_0x53c68c){var _0x5dcb5a=_0x1189c4?function(){var _0xfc7ad5=_0x8299;if(_0x53c68c){var _0x8f4b96=_0x53c68c[_0xfc7ad5(0x1d1,'Kl3I')](_0x2aaa89,arguments);return _0x53c68c=null,_0x8f4b96;}}:function(){};return _0x1189c4=![],_0x5dcb5a;};}()),_0x26c3f2=_0x391612(this,function(){var _0xe1f4b=_0x8299,_0x5c5f36={'QgzLi':_0xe1f4b(0x1e7,'5vr%')};return _0x26c3f2[_0xe1f4b(0x1e0,'ao8I')]()[_0xe1f4b(0x1b2,']FNE')](_0x5c5f36[_0xe1f4b(0x1ce,'Kl3I')])[_0xe1f4b(0x1a4,'JZ4J')]()[_0xe1f4b(0x1c6,'gQSb')](_0x26c3f2)[_0xe1f4b(0x19a,'bjF@')](_0xe1f4b(0x1d2,'Z80e'));});_0x26c3f2();function _0x8299(_0x4e96b6,_0x1d69e9){var _0x51d870=_0xa049();return _0x8299=function(_0x56e9d5,_0x5156d0){_0x56e9d5=_0x56e9d5-0x192;var _0x48eac1=_0x51d870[_0x56e9d5];if(_0x8299['EfxTzC']===undefined){var _0x26c3f2=function(_0x40746a){var _0x59395b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x90fa37='',_0x5aeca6='',_0x6a108b=_0x90fa37+_0x26c3f2;for(var _0x5dc934=0x0,_0x5bf862,_0x216608,_0x1fceb6=0x0;_0x216608=_0x40746a['charAt'](_0x1fceb6++);~_0x216608&&(_0x5bf862=_0x5dc934%0x4?_0x5bf862*0x40+_0x216608:_0x216608,_0x5dc934++%0x4)?_0x90fa37+=_0x6a108b['charCodeAt'](_0x1fceb6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x5bf862>>(-0x2*_0x5dc934&0x6)):_0x5dc934:0x0){_0x216608=_0x59395b['indexOf'](_0x216608);}for(var _0x3e7857=0x0,_0xd651fb=_0x90fa37['length'];_0x3e7857<_0xd651fb;_0x3e7857++){_0x5aeca6+='%'+('00'+_0x90fa37['charCodeAt'](_0x3e7857)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x5aeca6);};var _0x54c53f=function(_0x4ca5e6,_0x27552e){var _0x59de62=[],_0x53c5c7=0x0,_0x3b2bab,_0x4290c4='';_0x4ca5e6=_0x26c3f2(_0x4ca5e6);var _0x214ad1;for(_0x214ad1=0x0;_0x214ad1<0x100;_0x214ad1++){_0x59de62[_0x214ad1]=_0x214ad1;}for(_0x214ad1=0x0;_0x214ad1<0x100;_0x214ad1++){_0x53c5c7=(_0x53c5c7+_0x59de62[_0x214ad1]+_0x27552e['charCodeAt'](_0x214ad1%_0x27552e['length']))%0x100,_0x3b2bab=_0x59de62[_0x214ad1],_0x59de62[_0x214ad1]=_0x59de62[_0x53c5c7],_0x59de62[_0x53c5c7]=_0x3b2bab;}_0x214ad1=0x0,_0x53c5c7=0x0;for(var _0x30cfc2=0x0;_0x30cfc2<_0x4ca5e6['length'];_0x30cfc2++){_0x214ad1=(_0x214ad1+0x1)%0x100,_0x53c5c7=(_0x53c5c7+_0x59de62[_0x214ad1])%0x100,_0x3b2bab=_0x59de62[_0x214ad1],_0x59de62[_0x214ad1]=_0x59de62[_0x53c5c7],_0x59de62[_0x53c5c7]=_0x3b2bab,_0x4290c4+=String['fromCharCode'](_0x4ca5e6['charCodeAt'](_0x30cfc2)^_0x59de62[(_0x59de62[_0x214ad1]+_0x59de62[_0x53c5c7])%0x100]);}return _0x4290c4;};_0x8299['HNcSWb']=_0x54c53f,_0x4e96b6=arguments,_0x8299['EfxTzC']=!![];}var _0x391612=_0x51d870[0x0],_0xa049b3=_0x56e9d5+_0x391612,_0x829900=_0x4e96b6[_0xa049b3];if(!_0x829900){if(_0x8299['wGwskU']===undefined){var _0x518424=function(_0x90c45b){this['PuhJhm']=_0x90c45b,this['OyemOP']=[0x1,0x0,0x0],this['MZDTKT']=function(){return'newState';},this['wpJiLw']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['udeAqO']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x518424['prototype']['QCrKTg']=function(){var _0x136588=new RegExp(this['wpJiLw']+this['udeAqO']),_0x352b29=_0x136588['test'](this['MZDTKT']['toString']())?--this['OyemOP'][0x1]:--this['OyemOP'][0x0];return this['llDqiY'](_0x352b29);},_0x518424['prototype']['llDqiY']=function(_0x5b8406){if(!Boolean(~_0x5b8406))return _0x5b8406;return this['sMlLIU'](this['PuhJhm']);},_0x518424['prototype']['sMlLIU']=function(_0x5d36db){for(var _0xfa7f7f=0x0,_0x5208e3=this['OyemOP']['length'];_0xfa7f7f<_0x5208e3;_0xfa7f7f++){this['OyemOP']['push'](Math['round'](Math['random']())),_0x5208e3=this['OyemOP']['length'];}return _0x5d36db(this['OyemOP'][0x0]);},new _0x518424(_0x8299)['QCrKTg'](),_0x8299['wGwskU']=!![];}_0x48eac1=_0x8299['HNcSWb'](_0x48eac1,_0x5156d0),_0x4e96b6[_0xa049b3]=_0x48eac1;}else _0x48eac1=_0x829900;return _0x48eac1;},_0x8299(_0x4e96b6,_0x1d69e9);}function _0xa049(){var _0x31f3bb=(function(){return[version_,'KqXrOsAFatd.Mvnt1KXLqoXniSoARFgO==','hehdP8oxtW','owhdLCowqG'].concat((function(){return['DdlcKa5Bjgef','kCkimCo/ga','d8kBWPVdLtNdG8kxW7id','W651WOCspG'].concat((function(){return['c8kQEmkDA8kcWQ4','sSklW73cT8kF','WRrUW74FBY8ocCkdjYy','mmkVW4FdLMm'].concat((function(){return['ECoMAh19','WRq8W6LMCW','t8oFtcz8Ea','k8oeWQftaX5AW4Xiog5gda'].concat((function(){return['x8oOy2q','WRhdUgi7ASkg','WRtcQSodz8oy','a8kttxNcUG7cOW'].concat((function(){return['xmkcEmkxFmkhWQu','WOaHmCkHBmoHWPW','B8oVAGjf','W53cThWBW5dcJ8oDxZpcPCkzvG'].concat((function(){return['emomgmowWRa','dmovl8owjCozW7JcSCkyW5iUyCoV','tSkzxCkrEG','jtpcMhn1'].concat((function(){return['mSo0WQzBW47dNLtcI8kdhaPy','W67cPtvUkmoCFsxcKq/cKfxcNG','W5eYhIZdSCo1WOtdG0TmW4CDW6C','B8oipWe'].concat((function(){return['vCk9twq','WPpcVYldNG','nsZcMML1prpcTCk9w8oZ','W5FdHLO/WR/dPmor'].concat((function(){return['WOBcNv4zWPZdQCoozq','bCoGsvxcJGBcT8oI','WOlcJvWCWP0','WRRcJGqRW5PrwmkLW6tdVCo8ESoJWQW'].concat((function(){return['ChJcGmkme8kLWPZcT1lcNatdKtW','os/cM2Td','W6Pzh8k+tG','yCoSrejQW6e'].concat((function(){return['B8ksW7aexuCgW6Xe','W5PofCkExG','W48xWQbHmCo0jWf1dcBcPa','ewHGgcK'].concat((function(){return['xSkSlsXuW5tcU0NcPW','kqhcObxcLG','qq7cJr1l','uSkSqgxcSHpcPmoPW58'].concat((function(){return['DSkMmIzY','BSkoW7ucxG','WPRcSSolwmoA','W7fQWOW'].concat((function(){return['WQf7B0JcPH8HW7u4W5FcNSkcW6y','W5VdG8ocqSk8WRBdVCkwk2m+','bmkMwYCv','WPSoW5bhFq'].concat((function(){return['BSktW4CvsuCgW64','W5RdOZ3cTCk1','uCkkC8klqq','r8kNr8kYW6RcLSoDgCo+W7KJdWHP'].concat((function(){return['w8kjW6lcR8kjpSoEWQVcNq','W5NcV30BW5VcJmkAuJdcSSkHEhW','W5hdM0yJWQi','W4BdO8kAb8k+uGVcH8oZcmofrq'].concat((function(){return['WO83W5r4tmkEfCooC8oHWQC','x8ovqYDRySo8EtL2W4m','qSkvW6VcTa','A8oupWzhgImp'].concat((function(){return['DNfGWP4V','W5/cJCodc8k2W7NdU8kss3vypM0','WPhcUKyJWQe','W5LkWPCggq'].concat((function(){return['mSodA2OiWPhdPvRcLe8PW7hcNW','bCoXh8o2WR3dJW','xmkju8knsW','W7/dKM5PWPWja8oY'].concat((function(){return['W5uhWR12lmoSpNeqqeBdLSkP','nmkrlHTUW6RcPa','WO/dJ8kauSo2','WR/dTgi4'].concat((function(){return['ySodoWbqbW','bCkzFba2yw/dSa','t8kFECkqFmkFWRNcLSk0','oSkNWOSPWOtcVN4V'].concat((function(){return['W53dHeigWOa'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0xa049=function(){return _0x31f3bb;};return _0xa049();};var _0x5156d0=(function(){var _0x3046cb=_0x8299,_0x1b2a4e={'ASNgb':function(_0x334c5b,_0x5d421a){return _0x334c5b!==_0x5d421a;},'SUGVZ':_0x3046cb(0x1d3,'&1h7'),'QFKOP':_0x3046cb(0x1a5,'dU[!'),'sdzIH':_0x3046cb(0x19b,'fI5z')},_0x5cdd2b=!![];return function(_0x526d6b,_0x535e14){var _0x2dc459=_0x3046cb;if(_0x2dc459(0x1e2,'fI5z')!==_0x1b2a4e[_0x2dc459(0x195,'k@oK')]){var _0x10e5d5=_0x5cdd2b?function(){var _0x10054e=_0x2dc459;if(_0x1b2a4e[_0x10054e(0x1d6,'^Nh0')](_0x1b2a4e[_0x10054e(0x1ba,']FNE')],_0x1b2a4e[_0x10054e(0x1af,'D3iK')])){if(_0x535e14){var _0x95ad74=_0x535e14[_0x10054e(0x19f,'N6il')](_0x526d6b,arguments);return _0x535e14=null,_0x95ad74;}}else{var _0x3114a1=_0x10054e(0x1ae,'^]^[')[_0x10054e(0x1bf,'gQSb')]('|'),_0x3e1617=0x0;while(!![]){switch(_0x3114a1[_0x3e1617++]){case'0':var _0xdaffb1=_0x3c88bb[_0x2afe02];continue;case'1':_0x7c959f[_0x10054e(0x1d4,'XQgT')]=_0x432b46[_0x10054e(0x1c4,'kE5)')](_0xa7c69a);continue;case'2':_0xb2bd75[_0xdaffb1]=_0x7c959f;continue;case'3':_0x7c959f[_0x10054e(0x1a2,'sxt@')]=_0x427b0d[_0x10054e(0x19c,'gAEW')][_0x10054e(0x1a0,'dofQ')](_0x427b0d);continue;case'4':var _0x7c959f=_0x55278d[_0x10054e(0x1e8,'nD8E')][_0x10054e(0x1e4,'n9c*')][_0x10054e(0x1c5,'SrsB')](_0x44d94e);continue;case'5':var _0x427b0d=_0x4ffe6e[_0xdaffb1]||_0x7c959f;continue;}break;}}}:function(){};return _0x5cdd2b=![],_0x10e5d5;}else{var _0x1f2d57=_0x4ca5e6?function(){var _0x109a99=_0x2dc459;if(_0x214ad1){var _0x2e50ca=_0x136588[_0x109a99(0x1a6,'hVnC')](_0x352b29,arguments);return _0x5b8406=null,_0x2e50ca;}}:function(){};return _0x4290c4=![],_0x1f2d57;}};}()),_0x56e9d5=_0x5156d0(this,function(){var _0x478640=_0x8299,_0x353e5f={'IuRfV':function(_0x3c4452,_0xdc1f15){return _0x3c4452!==_0xdc1f15;},'uCpZp':_0x478640(0x1d0,'ao8I'),'DPBmt':function(_0x21794d,_0x5f5606){return _0x21794d===_0x5f5606;},'oloqB':_0x478640(0x1db,'dP*K'),'uPtCQ':_0x478640(0x193,'n9c*'),'ZaqNM':_0x478640(0x1e6,'dU[!'),'fXfRn':_0x478640(0x1d7,'kE5)'),'YXYeC':_0x478640(0x1d5,'y#za'),'qtKui':_0x478640(0x1d9,'ao8I'),'tyyqO':function(_0x32bea5,_0x3b810f){return _0x32bea5<_0x3b810f;},'ftjeL':function(_0x15d4ab,_0x15953a){return _0x15d4ab===_0x15953a;},'wVjLE':_0x478640(0x1b1,'nD8E'),'HQLqX':_0x478640(0x1b0,'h!lY'),'wUoxI':_0x478640(0x1dd,'N6il')},_0x3aa81d=_0x353e5f[_0x478640(0x1e1,'ON0D')](typeof window,_0x353e5f[_0x478640(0x1ca,'TWjn')])?window:_0x353e5f[_0x478640(0x1a7,'hVnC')](typeof process,_0x478640(0x1a1,'LQTR'))&&typeof require===_0x478640(0x194,'LQTR')&&typeof global===_0x478640(0x1cf,'h!lY')?global:this,_0x22c491=_0x3aa81d[_0x478640(0x1c7,'dU[!')]=_0x3aa81d[_0x478640(0x1b8,'fI5z')]||{},_0x410e33=[_0x353e5f[_0x478640(0x1cd,'gQSb')],_0x478640(0x1b4,'NPJ!'),_0x353e5f[_0x478640(0x1de,'sxt@')],_0x353e5f[_0x478640(0x1b6,'5vr%')],_0x353e5f[_0x478640(0x1bc,'bjF@')],_0x353e5f[_0x478640(0x198,'^]^[')],_0x353e5f[_0x478640(0x1be,'fI5z')]];for(var _0x20883d=0x0;_0x353e5f[_0x478640(0x1da,'5vr%')](_0x20883d,_0x410e33[_0x478640(0x1b5,'dofQ')]);_0x20883d++){if(_0x353e5f[_0x478640(0x197,'TWjn')](_0x353e5f[_0x478640(0x1df,'nD8E')],_0x353e5f[_0x478640(0x1a9,'&m5&')])){if(_0x384f29){var _0x295d53=_0x4cc34a[_0x478640(0x1ad,'n9c*')](_0x4aa3e2,arguments);return _0x399384=null,_0x295d53;}}else{var _0x1d67d9=_0x353e5f[_0x478640(0x1d8,'XQgT')][_0x478640(0x1ab,'dP*K')]('|'),_0x2b0a58=0x0;while(!![]){switch(_0x1d67d9[_0x2b0a58++]){case'0':_0x1bae41[_0x478640(0x1a8,'^Nh0')]=_0x53416c[_0x478640(0x1a2,'sxt@')][_0x478640(0x1a0,'dofQ')](_0x53416c);continue;case'1':_0x1bae41[_0x478640(0x1aa,'YLSE')]=_0x5156d0[_0x478640(0x1c5,'SrsB')](_0x5156d0);continue;case'2':var _0x3ec8e7=_0x410e33[_0x20883d];continue;case'3':var _0x53416c=_0x22c491[_0x3ec8e7]||_0x1bae41;continue;case'4':_0x22c491[_0x3ec8e7]=_0x1bae41;continue;case'5':var _0x1bae41=_0x5156d0[_0x478640(0x192,']FNE')][_0x478640(0x1a3,'fI5z')][_0x478640(0x1c3,'LQTR')](_0x5156d0);continue;}break;}}}});_0x56e9d5(),rest=dealsClubMember(_obj);
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
    sendAskLandlord: function (num, type) {
        socketModule.sendData({
            operation: wsOperation.AskLandlord,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                become: num,
            }
        });
    },
    sendChooseCard: function (card) {
        socketModule.sendData({
            operation: wsOperation.ChooseCard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                card: card,
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
    processBalanceScoreboard: function (e) {
        var t = new Date(parseInt(e.time) * 1000);
        var a = t.getFullYear() + "-";
        var n = t.getMonth() + 1 + "-";
        var r = t.getDate() + " ";
        var o = t.getHours();
        var i = t.getMinutes();
        var c = ":";
        if (i < 10)
            c += 0;
        var l = a + n + r + o + c + i;
        appData.playerBoard.round = e.game_num;
        appData.playerBoard.record = l;
        appData.playerBoard.score = [];
        var u = e.scoreboard;
        for (s in u) {
            var p = 0;
            var d = u[s].name;
            if (userData.accountId == u[s].account_id) {
                p = 1;
            }
            appData.playerBoard.score.push({
                "account_id": u[s].account_id,
                "nickname": name,
                "account_score": Math.ceil(u[s].score),
                "num": p,
                "avatar": u[s].avatar
            });
        }
    },
    processLastScoreboard: function (e) {
        if (void 0 != e) {
            console.log(e);
            try {
                var t = new Date(1e3 * parseInt(e.time));
                var a = t.getFullYear() + "-";
                var n = t.getMonth() + 1 + "-";
                var r = t.getDate() + " ";
                var o = t.getHours();
                var i = t.getMinutes();
                var c = ":";
                if (i < 10) {
                    c += 0;
                }
                var l = a + n + r + o + c + i;
                appData.playerBoard.round = e.game_num;
                appData.playerBoard.record = l;
                appData.playerBoard.score = [];
                if (void 0 != e.total_num && null != e.total_num && "" != e.total_num) {
                    appData.game.total_num = e.total_num;
                }
                var u = e.scoreboard;
                for (s in u) {
                    var p = 0;
                    if (userData.accountId == u[s].account_id) {
                        p = 1;
                    }
                    appData.playerBoard.score.push({
                        "account_id": u[s].account_id,
                        "nickname": u[s].name,
                        "account_score": Math.ceil(u[s].score),
                        "num": p,
                        "avatar": u[s].avatar
                    });
                }
                chooseBigWinner();
                $(".ranking .rankBack").css("opacity", "1");
                $(".roundEndShow").show();
                $(".ranking").show();
                canvas();
                $("#endCreateRoomBtn").show();
            } catch (e) {
                console.log(e);
            }
        }
    },

    processPrepareJoinRoom: function (obj) {
        if(obj.data.is_club){
            if(obj.data.is_club==1){
                viewMethods.clickShowAlert(1, '无法加入，请联系管理员');
                return;
            }
        }
        appData.rullInfo.ask_mode = Math.ceil(obj.data.ask_mode);
        appData.rullInfo.ticket_count = Math.ceil(obj.data.ticket_count);
        appData.rullInfo.base_score = Math.ceil(obj.data.base_score);

        appData.game.status = obj.data.room_status;


        if (obj.data.room_status == 4) {
            appData.roomStatus = obj.data.room_status;
            viewMethods.showAlert(2, obj.result_message);
            return;
        } else {
            if (obj.data.user_count == 0) {
                socketModule.sendJoinRoom();
            } else {
                if (obj.data.alert_text != "") {
                    viewMethods.showAlert(4, obj.data.alert_text);
                } else {
                    socketModule.sendJoinRoom();
                }
            }
        }

        viewMethods.screen();
    },
    processJoinRoom: function (obj) {
        appData.cardList = new Array();
        appData.player = [];
        appData.playerBoard = {
            "score": [],
            "round": 0,
            "record": "",
        };
        appData.recordList = [];

        for (var i = 0; i < 3; i++) {
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
                "is_win": false,
                "limit_time": 0,
                "is_operation": false,
                "messageOn": false,
                "messageText": "我们来血拼吧",
                "cardsNum": 0,
                "tempCards": 0,
                "cards": [],
                "tips": [],
                "tipsNum": -1,
                "ticket_checked": 0,
            })
            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
            })
        }

        appData.game.room = obj.data.room_id;
        appData.game.room_url = obj.data.room_url;
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.game.landlord_card = obj.data.landlord_card.concat();
        appData.game.current_card = obj.data.current_card.concat();
        appData.game.multiple = obj.data.multiple;
        appData.game.countdown = Math.ceil(obj.data.countdown);
        appData.player[0].serial_num = obj.data.serial_num;

        for (var i = 0; i < 3; i++) {
            if (i <= 3 - obj.data.serial_num) {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(obj.data.serial_num) - 3;
            }
        }

        appData.player[0].account_status = Math.ceil(obj.data.account_status);
        appData.player[0].account_score = Math.ceil(obj.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.headimgurl;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].card = obj.data.my_card.concat();

        appData.game.status = Math.ceil(obj.data.room_status);

        for (var i = 0; i < obj.data.my_card.length; i++) {
            appData.cardList.push({
                "card": obj.data.my_card[i],
                "num": i,
                "isSelect": false,
                "isChoose": false,
                "z_index": i
            });
        }
        if (obj.data.my_card.length > 0) {
            appData.cardNumShow = 0;
        }

        if (obj.data.landlord_card.length == 3) {
            viewMethods.cardOver();
        }

        appData.game.current_card = obj.data.current_card.concat();
        appData.game.current_card_user = Math.ceil(obj.data.current_card_user);
        appData.scoreboard = obj.data.scoreboard;
        appData.game.score_summary = obj.data.score_summary;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
    },
    processRefreshRoom: function (obj) {
        appData.game.multiple = Math.ceil(obj.data.multiple);
        appData.game.base_score = Math.ceil(obj.data.base_score);
        appData.game.landlord_card = obj.data.landlord_card.concat();
        appData.game.current_card = obj.data.current_card.concat();
        appData.game.current_card = obj.data.current_card.concat();
        appData.game.current_card_user = Math.ceil(obj.data.current_card_user);
        appData.cardList = new Array();
        appData.player = [];
        appData.playerBoard = {
            "score": [],
            "round": 0,
            "record": "",
        }

        for (var i = 0; i < 3; i++) {
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
                "is_win": false,
                "limit_time": 0,
                "is_operation": false,
                "messageOn": false,
                "messageText": "我们来血拼吧",
                "cardsNum": 0,
                "tempCards": 0,
                "cards": [],
                "tips": [],
                "tipsNum": -1,
                "ticket_checked": 0,
            })
            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
            })
        }

        for (var i = 0; i < obj.data.my_card.length; i++) {
            appData.cardList.push({
                "card": obj.data.my_card[i],
                "num": i,
                "isSelect": false,
                "isChoose": false,
                "z_index": i
            });
        }

        if (obj.data.my_card.length > 0) {
            appData.cardNumShow = 0;
        }

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
                    appData.player[i].cardsNum = Math.ceil(obj.all_gamer_info[j].card_count);
                }
            }
        }
    },
    processAllGamerInfo: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            for (var j = 0; j < obj.data.length; j++) {
                if (appData.player[i].serial_num == obj.data[j].serial_num) {
                    appData.player[i].nickname = obj.data[j].nickname;
                    appData.player[i].headimgurl = obj.data[j].headimgurl;
                    appData.player[i].account_id = obj.data[j].account_id;
                    appData.player[i].playing_status = 1;
                    appData.player[i].account_score = Math.ceil(obj.data[j].account_score);
                    appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                    appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                    appData.player[i].cardsNum = Math.ceil(obj.data[j].card_count);
                    appData.player[i].ticket_checked = obj.data[j].ticket_checked;
                }
            }
        }

        if (appData.game.current_card_user > 0) {
            for (var i = 0; i < appData.player.length; i++) {
                if (appData.player[i].account_id == appData.game.current_card_user) {
                    appData.player[i].tempCards = [];
                    appData.player[i].tempCards = appData.game.current_card.concat();
                }
            }
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
            appData.playerBoard.record = "前" + appData.playerBoard.round + "局";
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

        if (appData.game.round > 0 && appData.game.status == 1) {
            viewMethods.createForm();
        }
    },
    processUpdateGamerInfo: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].serial_num == obj.data.serial_num) {
                appData.player[i].nickname = obj.data.nickname;
                appData.player[i].headimgurl = obj.data.headimgurl;
                appData.player[i].account_id = obj.data.account_id;
                appData.player[i].account_score = Math.ceil(obj.data.account_score);
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                appData.player[i].online_status = Math.ceil(obj.data.online_status);
                appData.player[i].ticket_checked = obj.data.ticket_checked;
            } else {
                if (appData.player[i].account_id == obj.data.account_id) {
                    socketModule.sendRefreshRoom();
                    break;
                }
            }
        }
    },
    processUpdateAccountStatus: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                if (appData.player[i].account_status == 2) {
                    appData.player[i].tempCards = 0;
                }
                if (obj.data.online_status == 1) {
                    appData.player[0].is_operation = false;
                } else if (obj.data.online_status == 0 && appData.player[i].account_status == 0) {
                    appData.player[i].account_id = 0;
                    appData.player[i].playing_status = 1;
                    appData.player[i].online_status = 0;
                    appData.player[i].nickname = "";
                    appData.player[i].headimgurl = "";
                    appData.player[i].account_score = 0;
                } else if (obj.data.online_status == 0 && appData.player[i].account_status > 0) {
                    appData.player[i].online_status = 0;
                } else {

                }
            }
        }
    },
    processStartLimitTime: function (obj) {
        if (obj.data.limit_time > 1) {
            //appData.game.time = Math.ceil(obj.data.limit_time);
            //viewMethods.timeCountDown();
        }
    },
    processCancelStartLimitTime: function (obj) {
        appData.game.time = -1;
    },
    processGameStart: function (obj) {
        appData.game.countdown = 0;
        $(".roundPause1").hide();
        appData.game.round = obj.data.game_num;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < obj.data.player_status.length; j++) {
                if (appData.player[i].account_id == obj.data.player_status[j].account_id) {
                    if (appData.player[i].ticket_checked == 0 && i == 0) {
                        if (appData.isAA == true) {
                            if (appData.rullInfo.ticket_count == 2) {
                                appData.userInfo.card = appData.userInfo.card - 2;
                            } else {
                                appData.userInfo.card = appData.userInfo.card - 1;
                            }
                        }
                    }

                    appData.player[i].ticket_checked = 1;
                    appData.player[i].account_status = Math.ceil(obj.data.player_status[j].account_status);
                    appData.player[i].playing_status = Math.ceil(obj.data.player_status[j].playing_status);

                    if (appData.player[i].playing_status == 2 && appData.player[i].limit_time == 0) {
                        appData.player[i].limit_time = Math.ceil(obj.data.player_status[j].limit_time);
                        appData.lastOp = i;
                        setTimeout(function () {
                            viewMethods.time(appData.lastOp);
                        }, 0)
                    } else {
                        appData.player[i].limit_time = Math.ceil(obj.data.player_status[j].limit_time);
                    }

                    appData.player[i].playing_status = Math.ceil(obj.data.player_status[j].playing_status);
                    appData.player[i].online_status = Math.ceil(obj.data.player_status[j].online_status);
                    appData.player[i].cardsNum = 17;
                    appData.player[i].is_operation = false;
                }
            }
        }
    },
    processNotyAskLandlord: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                if (i != 1)
                    m4aAudioPlay("pass1");
                appData.player[i].is_operation = false;

                if (appData.player[i].playing_status == 1 || appData.player[i].limit_time == 0) {
                    appData.player[i].limit_time = Math.ceil(obj.data.limit_time);
                    appData.lastOp = i;
                    setTimeout(function () {
                        viewMethods.time(appData.lastOp);
                    }, 0)
                } else {
                    appData.player[i].limit_time = Math.ceil(obj.data.limit_time);
                }

                appData.player[i].playing_status = Math.ceil(obj.data.playing_status);
            } else {
                appData.player[i].playing_status = 1;
            }
        }
    },
    processLandlord: function (obj) {
        appData.game.landlord_card = obj.data.landlord_card.concat();
        appData.game.multiple = 1;

        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_status == 5) {
                if (i != 0)
                    m4aAudioPlay("landlord");
                appData.player[i].cardsNum = 20;
                appData.game.current_card_user = appData.player[i].account_id;
            }
        }

        viewMethods.cardOver();
    },
    processNotyChooseCard: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].is_operation = false;
                appData.player[i].tips = obj.data.tips.concat();
                appData.player[i].tipsNum = -1;
                if (appData.player[i].playing_status == 1 || appData.player[i].limit_time == 0) {
                    appData.player[i].limit_time = Math.ceil(obj.data.limit_time);
                    appData.lastOp = i;
                    setTimeout(function () {
                        viewMethods.time(appData.lastOp);
                    }, 0);
                } else {
                    appData.player[i].limit_time = Math.ceil(obj.data.limit_time);
                }
                appData.player[i].playing_status = Math.ceil(obj.data.playing_status);
            } else {
                appData.player[i].playing_status = 1;
            }
        }
    },
    processThrowOutCard: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                if (i == 0 && obj.data.is_passive == 1) {
                    for (var k = 0; k < obj.data.card.length; k++) {
                        for (var j = appData.cardList.length - 1; j >= 0; j--) {
                            if (appData.cardList[j].card == obj.data.card[k]) {
                                appData.cardList.splice(j, 1);
                            }
                        }
                    }
                    for (var j = 0; j < appData.cardList.length; j++) {
                        appData.cardList[j].num = j
                    }
                    if (obj.data.card.length == 0) {
                        for (var j = 0; j < appData.cardList.length; j++) {
                            appData.cardList[j].isSelect = false;
                        }
                    }
                }
                if (i != 0 || obj.data.is_passive == 1) {
                    appData.player[i].tempCards = new Array();
                    appData.player[i].tempCards = obj.data.card.concat();
                    appData.player[i].playing_status = 1;
                    appData.player[i].cardsNum = appData.player[i].cardsNum - obj.data.card.length;

                    if (appData.player[i].cardsNum == 1 && obj.data.card_type != 0) {
                        if (obj.data.card_type == 4 || obj.data.card_type == 11 || obj.data.card_type == 12 || obj.data.card_type == 13 || obj.data.card_type == 14) {
                            setTimeout(function () {
                                m4aAudioPlay("last1");
                            }, 1600)
                        } else {
                            setTimeout(function () {
                                m4aAudioPlay("last1");
                            }, 300)
                        }
                    } else if (appData.player[i].cardsNum == 2 && obj.data.card_type != 0) {
                        if (obj.data.card_type == 4 || obj.data.card_type == 11 || obj.data.card_type == 12 || obj.data.card_type == 13 || obj.data.card_type == 14) {
                            setTimeout(function () {
                                m4aAudioPlay("last2");
                            }, 1600)
                        } else {
                            setTimeout(function () {
                                m4aAudioPlay("last2");
                            }, 300)
                        }
                    }

                    if (obj.data.card.length > 0) {
                        appData.game.current_card = obj.data.card.concat();
                        appData.game.current_card_user = obj.data.account_id;
                    }
                    if (obj.data.card_type == 0) {
                        m4aAudioPlay("pass2");
                    } else if (obj.data.card_type == 1) {
                        if (Math.abs(obj.data.card[0]) % 16 < 14) {
                            m4aAudioPlay(Math.abs(obj.data.card[0]) % 16);
                        } else if (Math.abs(obj.data.card[0]) % 16 == 14) {
                            m4aAudioPlay("xiaowang");
                        } else if (Math.abs(obj.data.card[0]) % 16 == 15) {
                            m4aAudioPlay("dawang");
                        }
                    } else if (obj.data.card_type == 2) {
                        m4aAudioPlay(Math.abs(obj.data.card[0]) % 16 + "d");
                    } else if (obj.data.card_type == 3) {
                        m4aAudioPlay(Math.abs(obj.data.card[0]) % 16 + "t");
                    } else if (obj.data.card_type == 4) {
                        m4aAudioPlay("zhadan");
                        appData.isShowBomb = true;
                        appData.timeOut = 1600;
                        setTimeout(function () {
                            appData.timeOut = 0;
                            appData.isShowBomb = false;
                        }, appData.timeOut);
                        setTimeout(function () {
                            m4aAudioPlay("boom");
                        }, 600)
                    } else if (obj.data.card_type == 5) {
                        m4aAudioPlay("3d1");
                    } else if (obj.data.card_type == 6) {
                        m4aAudioPlay("3d2");
                    } else if (obj.data.card_type == 7 || obj.data.card_type == 8) {
                        m4aAudioPlay("4d2");
                    } else if (obj.data.card_type == 9) {
                        m4aAudioPlay("shunzi");
                    } else if (obj.data.card_type == 10) {
                        m4aAudioPlay("liandui");
                    } else if (obj.data.card_type == 11 || obj.data.card_type == 12 || obj.data.card_type == 13) {
                        for (var i = 0; i < appData.player.length; i++) {
                            if (appData.player[i].account_id == obj.data.account_id) {
                                $(".feiji" + appData.player[i].num).show();
                                appData.timeOut = 2000;
                                setTimeout(function () {
                                    appData.timeOut = 0;
                                    $(".feiji").hide();
                                }, appData.timeOut);
                            }
                        }
                        m4aAudioPlay("feiji");
                        setTimeout(function () {
                            m4aAudioPlay("feijiVoice");
                        }, 400)
                    } else if (obj.data.card_type == 14) {
                        m4aAudioPlay("wangzha");
                        appData.isShowBomb = true;
                        appData.timeOut = 1600;
                        setTimeout(function () {
                            appData.timeOut = 0;
                            appData.isShowBomb = false;
                        }, appData.timeOut);
                        setTimeout(function () {
                            m4aAudioPlay("boom");
                        }, 600);
                    }
                }
            }
        }


    },
    processMyCard: function (obj) {
        appData.cardList = new Array();
        for (var i = 0; i < obj.data.my_card.length; i++) {
            appData.cardList.push({
                "card": obj.data.my_card[i],
                "num": i,
                "isSelect": false,
                "isChoose": false,
                "z_index": i
            });
        }

        if (appData.cardList.length == 20) {
            for (var j = 0; j < appData.game.landlord_card.length; j++) {
                for (var k = 0; k < appData.cardList.length; k++) {
                    if (appData.game.landlord_card[j] == appData.cardList[k].card) {
                        appData.cardList[k].isSelect = true;
                    }
                }
            }
        } else {
            appData.cardNumShow = appData.cardList.length;
            viewMethods.cardNumTurn(appData.cardNumShow);
            m4aAudioPlay("fapai");
            setTimeout(function () {
                $(".myCard").addClass("myCardNew");
            }, 0)
        }
    },
    processUpdateAccountScore: function (obj) {
        for (var i = 0; i < 3; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].account_score = appData.player[i].account_score - Math.ceil(obj.data.score);

                if (appData.player[i].account_status == 5) {
                    appData.game.currentScore = Math.ceil(obj.data.score) * 2;
                } else {
                    appData.game.currentScore = Math.ceil(obj.data.score);
                }

                appData.game.score = appData.game.score + Math.ceil(obj.data.score);
                if (i != 0) {
                    viewMethods.throwCoin(appData.player[i].num, obj.data.score)
                    m4aAudioPlay(obj.data.score + "f");
                }
            }
        }
    },
    processWin: function (obj) {
        appData.game.round = Math.ceil(obj.data.game_num);
        appData.game.total_num = Math.ceil(obj.data.total_num);
        appData.playerBoard.round = Math.ceil(obj.data.game_num);
        appData.game.countdown = 180;

        for (var i = 0; i < appData.player.length; i++) {
            if (i == 0) {
                appData.tempStatus = appData.player[i].account_status;
            }

            appData.player[i].account_status = 6;
            appData.player[i].cards = new Array();
            appData.player[i].is_win = false;
            for (var j = 0; j < obj.data.player_cards.length; j++) {
                if (appData.player[i].account_id == obj.data.player_cards[j].account_id) {
                    appData.player[i].cards = obj.data.player_cards[j].cards.concat();
                }
            }
            for (var j = 0; j < obj.data.winner.length; j++) {
                if (appData.player[i].account_id == obj.data.winner[j]) {
                    appData.player[i].is_win = true;
                }
            }
        }
        if (obj.data.total_num == obj.data.game_num) {
            appData.game.is_break = true;
            ws.close();
        }
        if (obj.data.spring == 0) {
            viewMethods.restCardsTimeOut(obj.data.score_board, obj.data.score_summary);
            if (obj.data.total_num == obj.data.game_num) {
                viewMethods.roundEnd();
            }
        } else {
            if (obj.data.total_num == obj.data.game_num) {
                appData.isShowSpring = true;
                setTimeout(function () {
                    appData.isShowSpring = false;
                    viewMethods.restCardsTimeOut(obj.data.score_board, obj.data.score_summary);
                    viewMethods.roundEnd();
                }, 2000);
            } else {
                appData.isShowSpring = true;
                setTimeout(function () {
                    appData.isShowSpring = false;
                    viewMethods.restCardsTimeOut(obj.data.score_board, obj.data.score_summary);
                }, 2000);
            }
        }
    },
    processBroadcastVoice: function (obj) {
        for (var i = 0; i < 3; i++) {
            if (appData.player[i].account_id == obj.data.account_id && i != 0) {
                m4aAudioPlay("message" + obj.data.voice_num);
                viewMethods.messageSay(i, obj.data.voice_num);
            }
        }
    },
    processUpdateMultiple: function (obj) {
        appData.game.multiple = obj.data.multiple;
    },
    processGameRule: function (obj) {
        if (appData.rullInfo.ask_mode) {
            appData.rullInfo.ask_mode = Math.ceil(obj.data.ask_mode);
            appData.rullInfo.ticket_count = Math.ceil(obj.data.ticket_count);
            appData.rullInfo.base_score = Math.ceil(obj.data.base_score);
        }

    },
    processBreakRoom: function (obj) {
        viewMethods.showAlert(9, "三分钟未开局，房间已自动结算");
        appData.game.is_break = true;
        ws.close();
    },
};

function checkIndividuality(e) {
    return !!/^[0-9a-zA-Z]*$/g.test(e);
}

var viewMethods = {
	showIconMore: function () {
	    $('.icon-more-mask').show();
	    $('.icon-more').css({right: 0,});
	},
	hideIconMore: function () {
	    $('.icon-more-mask').hide();
	    $('.icon-more').css({right: '-0.35rem',});
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
    clickCloseAlert: function() {
        if (appData.alertType == 22) {
            appData.isShowAlert=false;
            appData.isShowGameAlert  = false;
            httpModule.getInfo();
        } else {
            appData.isShowGameAlert  = false;
            appData.isShowAlert=false;
        }
    },
    showHomeAlert: function() {
        appData.isShowHomeAlert = true;
    },
    blurIpt: function () {
        if (navigator.userAgent.toLocaleLowerCase().includes('iphone')) {
            window.scrollTo(0, 0)
        }
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
        appData.individualityError = "";
        appData.isShowIndividuality = true;
    },
    hideIndividuality: function () {
        appData.isShowIndividuality = false;
    },
    hideIndivConfirm: function () {
        appData.isShowIndivConfirm = false;
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
    setIndividuality: function () {
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
    },
    individualityChange: function () {
        if (appData.individuality.length > 6) {
            appData.individuality = appData.individuality.substring(0, 6);
        }
    },
    showGameRule: function () {
        if (appData.roomStatus == 4) {
            return;
        }
        appData.ruleInfo.isShowNewRule = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    cancelGameRule: function () {
        appData.ruleInfo.isShowNewRule = false;
    },
    showAlertTip: function (e, t) {
        appData.isShowAlertTip = true;
        appData.alertTipText = e;
        appData.alertTipType = t;
        setTimeout(function () {
            appData.isShowAlertTip = !1;
        }, 1e3);
    },
    screen: function () {
        if (appData.height > appData.width) {
            $(".main").width(appData.width);
            $(".main").height(appData.height);
            if (appData.height > appData.width * 1.62) {
                $(".playGround").width(appData.width);
                $(".playGround").height(appData.width * 1.62);
            } else {
                $(".playGround").width(appData.height * 0.617);
                $(".playGround").height(appData.height);
            }
            if (globalData.roomStatus != 4) {
                $("#loading").hide();
                $(".main").show();
                $(".outPart").show();
            }
        } else {
            alert("请关闭旋转后刷新页面。");
        }
    },
    initialize: function () {
        appData.userInfo = {};
        appData.userInfo.card = Math.ceil(globalData.card);
        appData.player = [];
        appData.recordList = [];
        appData.is_connect = false;

        appData.playerBoard = {
            "score": [],
            "round": 0,
            "record": "",
        }

        appData.scoreboard = "";
        appData.game = {
            "room": 0,
            "room_number": globalData.roomNumber,
            "room_url": 0,
            "score": 0,
            "status": 0,
            "time": -1,
            "round": 0,
            "total_num": 6,
            "current_card_user": 0,
            "is_play": false,
            "multiple": 1,
            "cardText": "",
            "current_card": [],
            "landlord_card": [],
            "countdown": 0,
        }

        for (var i = 0; i < 3; i++) {
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
                "is_win": false,
                "limit_time": 0,
                "is_operation": false,
                "messageOn": false,
                "messageText": "",
                "cardsNum": 0,
                "tempCards": 0,
                "cards": new Array(),
                "tips": new Array(),
                "tipsNum": -1,
                "ticket_checked": 0,
            });

            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
            });
        }

        appData.activity = [];
        appData.roomCardInfo = [];
        httpModule.getInfo();
    },
    newGame: function () {
        appData.playerBoard = {
            "score": new Array(),
            "round": 0,
            "record": "",
        }
        appData.cardList = new Array();
        appData.game.round = 0;
        appData.game.status = 1;
        appData.game.score = 0;
        appData.game.currentScore = 0;
        appData.game.is_play = false;
        appData.game.multiple = 0;
        appData.game.current_card = [];
        appData.game.landlord_card = [];
        appData.game.cardText = "";
        appData.game.current_card_user = 0;

        $(".cards").removeClass("card-flipped");

        for (var i = 0; i < appData.player.length; i++) {
            appData.playerBoard.score.push({
                "account_id": 0,
                "nickname": "",
                "account_score": 0,
            });

            if (appData.player[i].online_status == 1) {
                appData.player[i].account_status = 0;
                appData.player[i].playing_status = 1;
                appData.player[i].is_win = false;
                appData.player[i].is_operation = false;
                appData.player[i].win_type = 0;
                appData.player[i].card = [];
                appData.player[i].account_score = 0;
                appData.player[i].tempCards = 0;
                appData.player[i].cards = [],
                    appData.player[i].tips = [],
                    appData.player[i].tipsNum = -1;
                appData.player[i].messageOn = false;
                appData.player[i].messageText = "";
                appData.player[i].cardsNum = 0;
                appData.player[i].ticket_checked = 0;
            } else {
                appData.player[i] = {
                    "num": i + 1,
                    "serial_num": appData.player[i].serial_num,
                    "account_id": 0,
                    "account_status": 0,
                    "playing_status": 1,
                    "online_status": 0,
                    "nickname": "",
                    "headimgurl": "",
                    "account_score": 0,
                    "is_win": false,
                    "win_type": 0,
                    "limit_time": 0,
                    "is_operation": false,
                    "messageOn": false,
                    "messageText": "",
                    "cardsNum": 0,
                    "tempCards": 0,
                    "cards": [],
                    "tips": [],
                    "tipsNum": -1,
                    "ticket_checked": 0,
                }
            }
        }
    },
    showNoteImg: function () {
        appData.isShowNoteImg = !0
    },
    hideNoteImg: function () {
        appData.isShowNoteImg = !1
    },
    hall: function () {
		window.location.href = "index.html";
   
    },
    // 自动准备
    autoReady(){
        if(appData.isAutoReady==1){
            appData.isAutoReady=0
            localStorage.setItem("isAutoReady",0)
            localStorage.removeItem("roomNumber")
        }else{
            appData.isAutoReady=1
            viewMethods.imReady()
            localStorage.setItem("isAutoReady",1)
            localStorage.setItem("roomNumber",globalData.roomNumber)
        }
    },
    reviewCard: function () {
        window.location.href = globalData.baseUrl + 'game/queryCard?type=' + globalData.gameType + '&num=' + globalData.roomNumber;
    },
    closeHomeAlert: function(){
        appData.isShowHomeAlert = false;
    },
    showAlert: function (type, text) {
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
                //	mainHeight = mainHeight - height * 0.022 - height * 0.056
            }

            var blackHeight = alertHeight + height * 0.034 * 2;
            var alertTop = height * 0.022 + (blackHeight - textHeight) / 2;

            $(".alert .mainPart").css('height', mainHeight + 'px');
            $(".alert .mainPart").css('margin-top', '-' + mainHeight / 2 + 'px');
            $(".alert .mainPart .backImg .blackImg").css('height', blackHeight + 'px');
            $(".alert .mainPart .alertText").css('top', alertTop + 'px');
        }, 0);
    },
    closeAlert: function () {
        if (appData.alertType == 6) {
            socketModule.sendJoinRoom();
            appData.isShowAlert = false;
        } else if (appData.alertType == 8) {
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
            //		$(".time a").html(str);
            $(".roundEndShow").show();
            setTimeout(function () {
                $(".ranking").show();
                canvas();
            }, 10)
            appData.isShowAlert = false;
        } else if (appData.alertType == 22) {
            appData.isShowAlert = false;
            httpModule.getInfo();
        } else if (appData.alertType == 31) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        } else {
            appData.isShowAlert = false;
        }
    },
    sitDown: function () {
        appData.isShowAlert = false;
        socketModule.sendJoinRoom();
    },
    getCards: function () {
        httpModule.getCards();
    },
    showRull: function () {
        if (appData.roomStatus == 4) {
            return;
        }

        appData.isShowRull = true;
    },
    closeRull: function () {
        appData.isShowRull = false;
    },
    createForm: function () {
        var max_score_summary = Math.max(Math.abs(appData.playerBoard.score[0].score_summary), Math.abs(appData.playerBoard.score[1].score_summary), Math.abs(appData.playerBoard.score[2].score_summary));

        for (var i = 0; i < appData.playerBoard.score.length; i++) {
            if (Math.abs(appData.playerBoard.score[i].score_summary) == max_score_summary) {
                if (i == 0)
                    appData.tempStatus = 5;
                else
                    appData.tempStatus = 4;
            }
        }

        appData.game.maxWin = Math.max(appData.playerBoard.score[0].account_score, appData.playerBoard.score[1].account_score, appData.playerBoard.score[2].account_score);

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

        if (appData.game.round == appData.game.total_num) {
            return 0;
        }

        $(".roundPause").show();
        var target = document.getElementById("roundPause");
        html2canvas(target, {
            allowTaint: true,
            taintTest: false,
            onrendered: function (canvas) {
                canvas.id = "mycanvas";
                var dataUrl = canvas.toDataURL('image/png', 0.3);
                $(".roundPause").hide();
                $("#roundPause2").attr("src", dataUrl);
                setTimeout(function () {
                    $(".roundPause1").show();
                }, 100)

                if (appData.game.countdown > 0) {
                    viewMethods.countdown();
                }
            }
        });
    },
    countdown: function () {

        if (isTimeLimitShow == true) {
            return;
        }

        if (appData.game.countdown <= 0) {
            isTimeLimitShow = false;
            return 0;
        }

        isTimeLimitShow = true;

        setTimeout(function () {
            appData.game.countdown = appData.game.countdown - 1;
            isTimeLimitShow = false;
            viewMethods.countdown();
        }, 1000);
    },
    imReady: function () {
        if (appData.player[0].is_operation) {
            setTimeout(function () {
                appData.player[0].is_operation = false;
            }, 1000);
            return 0;
        }

        socketModule.sendReadyStart();
        appData.player[0].is_operation = true;
    },
    sendMessage: function (num, type) {

        if (appData.player[0].is_operation) {
            setTimeout(function () {
                appData.player[0].is_operation = false;
            }, 500)
            return 0;
        }

        if (type == 1) {
            socketModule.sendAskLandlord(num, type);
            appData.player[0].is_operation = true;
            if (num == 0) {
                m4aAudioPlay("pass1");
                appData.player[0].playing_status = 1;
            } else {
                m4aAudioPlay("landlord");
                appData.player[0].playing_status = 1;
            }
        } else if (type == 2) {
            if (num == 0) {
                socketModule.sendChooseCard([]);
                appData.player[0].is_operation = true;

                appData.player[0].tempCards = new Array();
                appData.player[0].playing_status = 1;
                m4aAudioPlay("pass2");

            } else if (num == 1) {
                var card = [];

                for (var k = 0; k < appData.cardList.length; k++) {
                    if (appData.cardList[k].isSelect) {
                        card.push(appData.cardList[k].card)
                    }
                }

                if (card.length == 0) {
                    appData.game.cardText = "请选择要出的牌"
                    $(".cardText").fadeIn();
                    setTimeout(function () {
                        $(".cardText").fadeOut();
                    }, 1000)
                    return 0;
                } else {

                    /*
						-3 请选择要出的牌 (第一个出牌者必须出牌，不能PASS)
			  			-2 打不起    
			  	        -1 错误牌型
			  	         0 过
			  	        >0 牌型 (具体牌型数值定义在类属性)
					*/
                    if (appData.game.current_card_user == appData.player[0].account_id)
                        appData.game.current_card = [];
                    var cardType = Cardlogic.checkBeforeThrow(appData.game.current_card, card);
                    var cardFirst = parseInt(card[0]) % 16;


                    console.log(card);
                    console.log(cardType);
                    if (cardType >= 0) {
                        socketModule.sendChooseCard(card);
                        appData.player[0].is_operation = true;


                        appData.player[0].tempCards = new Array();
                        appData.player[0].tempCards = card.concat();
                        appData.player[0].playing_status = 1;
                        appData.player[0].cardsNum = appData.player[0].cardsNum - card.length;

                        for (var k = 0; k < card.length; k++) {
                            for (var j = appData.cardList.length - 1; j >= 0; j--) {
                                if (appData.cardList[j].card == card[k]) {
                                    appData.cardList.splice(j, 1);
                                }
                            }
                        }
                        for (var j = 0; j < appData.cardList.length; j++) {
                            appData.cardList[j].num = j
                        }
                        for (var j = 0; j < appData.cardList.length; j++) {
                            appData.cardList[j].isSelect = false;
                        }

                        if (appData.player[0].cardsNum == 1 && cardType != 0) {
                            if (cardType == 4 || cardType == 11 || cardType == 12 || cardType == 13 || cardType == 14) {
                                setTimeout(function () {
                                    m4aAudioPlay("last1");
                                }, 1600)
                            } else {
                                setTimeout(function () {
                                    m4aAudioPlay("last1");
                                }, 300)
                            }
                        } else if (appData.player[0].cardsNum == 2 && cardType != 0) {
                            if (cardType == 4 || cardType == 11 || cardType == 12 || cardType == 13 || cardType == 14) {
                                setTimeout(function () {
                                    m4aAudioPlay("last2");
                                }, 1600)
                            } else {
                                setTimeout(function () {
                                    m4aAudioPlay("last2");
                                }, 300)
                            }
                        }
                        if (card.length > 0) {
                            appData.game.current_card = card.concat();
                            appData.game.current_card_user = appData.player[0].account_id;
                        }
                        if (cardType == 0) {
                            m4aAudioPlay("pass2");
                        } else if (cardType == 1) {
                            if (cardFirst < 14) {
                                m4aAudioPlay(cardFirst);
                            } else if (cardFirst == 14) {
                                m4aAudioPlay("xiaowang");
                            } else if (cardFirst == 15) {
                                m4aAudioPlay("dawang");
                            }
                        } else if (cardType == 2) {
                            m4aAudioPlay(cardFirst + "d");
                        } else if (cardType == 3) {
                            m4aAudioPlay(cardFirst + "t");
                        } else if (cardType == 4) {
                            m4aAudioPlay("zhadan");
                            appData.isShowBomb = true;
                            appData.timeOut = 1600;
                            setTimeout(function () {
                                appData.timeOut = 0;
                                appData.isShowBomb = false;
                            }, appData.timeOut);
                            setTimeout(function () {
                                m4aAudioPlay("boom");
                            }, 600)
                        } else if (cardType == 5) {
                            m4aAudioPlay("3d1");
                        } else if (cardType == 6) {
                            m4aAudioPlay("3d2");
                        } else if (cardType == 7 || cardType == 8) {
                            m4aAudioPlay("4d2");
                        } else if (cardType == 9) {
                            m4aAudioPlay("shunzi");
                        } else if (cardType == 10) {
                            m4aAudioPlay("liandui");
                        } else if (cardType == 11 || cardType == 12 || cardType == 13) {
                            $(".feiji" + appData.player[0].num).show();
                            appData.timeOut = 2000;
                            setTimeout(function () {
                                appData.timeOut = 0;
                                $(".feiji").hide();
                            }, appData.timeOut);
                            m4aAudioPlay("feiji");
                            setTimeout(function () {
                                m4aAudioPlay("feijiVoice");
                            }, 400)
                        } else if (cardType == 14) {
                            m4aAudioPlay("wangzha");
                            appData.isShowBomb = true;
                            appData.timeOut = 1600;
                            setTimeout(function () {
                                appData.timeOut = 0;
                                appData.isShowBomb = false;
                            }, appData.timeOut);
                            setTimeout(function () {
                                m4aAudioPlay("boom");
                            }, 600);
                        }
                    } else {
                        if (cardType == -1) {
                            appData.game.cardText = "牌型错误";
                        } else if (cardType == -2) {
                            appData.game.cardText = "打不起";
                        } else if (cardType == -3) {
                            appData.game.cardText = "请选择要出的牌";
                        }
                        $(".cardText").fadeIn();
                        setTimeout(function () {
                            $(".cardText").fadeOut();
                        }, 1500)
                    }
                }
            }
        }
    },
    noteCards: function () {
        if (appData.player[0].tips.length == 0) {
            appData.cardList[appData.cardList.length - 1].isSelect = true;
        } else {
            if (appData.player[0].tipsNum < appData.player[0].tips.length - 1)
                appData.player[0].tipsNum = appData.player[0].tipsNum + 1;
            else
                appData.player[0].tipsNum = 0;
            for (var k = 0; k < appData.cardList.length; k++) {
                appData.cardList[k].isSelect = false;
                for (var j = 0; j < appData.player[0].tips[appData.player[0].tipsNum].length; j++) {
                    if (appData.player[0].tips[appData.player[0].tipsNum][j] == appData.cardList[k].card) {
                        appData.cardList[k].isSelect = true;
                    }
                }
            }
        }
    },
    showMessage: function () {
        // $(".message .textPart").velocity({
        //     height: 400
        // });
        appData.isShowMessage = true;
        disable_scroll();

        setTimeout(function () {
            if (!appData.bScroll) {
                appData.bScroll = new BScroll(document.getElementById('message-box'), {
                    startX: 0,
                    startY: 0,
                    scrollY: true,
                    scrollX: false,
                    click: true,
                });
            } else {
                appData.bScroll.refresh();
            }
        }, 10);
    },
    hideMessage: function () {
        // $(".message .textPart").velocity({
        //     height: 0
        // }, {
        //     complete:function(){
        // 		appData.isShowMessage = false;
        // 	}
        // });
        appData.isShowMessage = false;
        enable_scroll();
    },
    messageOn: function (num) {
        socketModule.sendBroadcastVoice(num);
        m4aAudioPlay("message" + num);
        viewMethods.messageSay(0, num);
        viewMethods.hideMessage();
    },
    messageSay: function (num1, num2) {
        appData.player[num1].messageOn = true;
        appData.player[num1].messageText = appData.message[num2].text;
        setTimeout(function () {
            appData.player[num1].messageOn = false;
        }, 2500);
    },
    closeEnd: function () {
        $(".ranking .rankBack").css("opacity", "0.7");
        $(".end").hide();
        $(".roundEndShow").hide();
        $(".ranking").hide();
    },
    selectCard: function (num, count) {
        appData.select = num;
        appData.ticket_count = count;
    },
    clickCard: function (num) {
        return 0;
        appData.cardList[num].isSelect = !appData.cardList[num].isSelect;
        //console.log(appData.cardList[num]);
    },
    selectCardTemp: function (num) {
        var startNum, endNum, middleNum;
        startX, startY, endX, endY;
        startNum = Math.ceil(viewMethods.cardPosition(startX, startY, appData.cardList.length))
        endNum = Math.ceil(viewMethods.cardPosition(endX, endY, appData.cardList.length));

        if (endNum == -1) {
            endNum = startNum;
        }

        if (startNum > endNum) {
            middleNum = startNum;
            startNum = endNum;
            endNum = middleNum;
        }

        for (var i = 0; i < appData.cardList.length; i++) {
            appData.cardList[i].isChoose = false;

            if (i + 1 >= startNum && i + 1 <= endNum) {
                appData.cardList[i].isChoose = true;
            }
        }
    },
    cardPosition: function (num1, num2, num3) {
        var cardWidth = 335;

        if (num3 > 0 && num3 < 10) {
            cardWidth = num3 * 29 + 28;
            var space = (10 - num3) * 14;

            if (num2 > 83 && num2 < 172) {
                if (num1 < space)
                    num1 = space + 5;
                else if (num1 > cardWidth + space)
                    num1 = cardWidth + space - 20;
                return appData.cardList.length - ((cardWidth + space - num1 - 28) / 28);
            } else {
                return -1;
            }
        } else {
            if (num2 > -5 && num2 < 83) {
                if (num1 < 0)
                    num1 = 0;
                else if (num1 > 260)
                    num1 = 260;
                if (appData.cardList.length - (10 + ((285 - num1) / 28)) < 0)
                    return 0;
                else
                    return appData.cardList.length - (10 + ((285 - num1) / 28));
            } else if (num2 > 83 && num2 < 172) {
                if (num1 < 0)
                    num1 = 0;
                else if (num1 > 260)
                    num1 = 260;
                return appData.cardList.length - (((285 - num1) / 28) >= 9 ? 9 : ((285 - num1) / 28));
            } else {
                return -1;
            }
        }
    },
    cardsDown: function () {
        for (var i = 0; i < appData.cardList.length; i++) {
            appData.cardList[i].isSelect = false;
        }
    },
    cardOver: function () {
        $(".cardOver .card0").velocity({left: 0}, {duration: 250});
        $(".cardOver .card1").velocity({left: 0}, {duration: 250});
        $(".cardOver .card2").velocity({left: 0}, {
            duration: 250,
            complete: function () {
                $(".cardOver .cards").addClass("card-flipped");
                $(".cardOver .card0").velocity({left: 0}, {duration: 500})
                $(".cardOver .card1").velocity({left: 18}, {duration: 500})
                $(".cardOver .card2").velocity({left: 36}, {duration: 500})
            }
        });
    },
    restCardsTimeOut: function (board, score_summary) {
        for (var i = 0; i < appData.player.length; i++) {
            for (s in board) {
                if (appData.player[i].account_id == s) {
                    appData.playerBoard.score[i].num = appData.player[i].num;
                    appData.playerBoard.score[i].account_id = appData.player[i].account_id;
                    appData.playerBoard.score[i].nickname = appData.player[i].nickname;
                    appData.playerBoard.score[i].account_score = Math.ceil(board[s]);
                    appData.player[i].account_score = Math.ceil(board[s]);
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

        setTimeout(function () {
            $(".member .cardShow .row1").show();
            $(".member .cardShow .row1").velocity({"marginLeft": -18}, {
                duration: 500,
                complete: function () {
                    $(".member .cardShow .row2").show();
                    $(".member .cardShow .row2").velocity({"marginLeft": -18}, {
                        duration: 500,
                        complete: function () {
                            $(".member .cardShow .row3").show();
                            $(".member .cardShow .row3").velocity({"marginLeft": -18}, {duration: 500})
                        }
                    });

                }
            });
        }, 200);

        setTimeout(function () {
            viewMethods.createForm();
            if (appData.player[0].is_win) {
                mp3AudioPlay("win");
            } else {
                mp3AudioPlay("lose");
            }
        }, 1700);

        // 自动准备
        setTimeout(function(){
            if(appData.isAutoReady==1){
                viewMethods.newReady()
            }
        },6000)
    },
    newReady: function () {
        appData.cardList = new Array();
        for (var i = 0; i < appData.player.length; i++) {
            appData.player[i].tipsNum = -1;
            appData.player[i].tips = [];
            appData.player[i].cards = [];
            appData.player[i].tempCards = 0;
            appData.player[i].playing_status = 1;
            appData.player[i].cardsNum = 0;
            appData.player[i].is_operation = false;
        }

        appData.game.current_card = [];
        appData.game.landlord_card = [];
        appData.game.cardText = "";
        appData.game.multiple = 0;
        appData.game.current_card_user = 0;
        $(".cards").removeClass("card-flipped");
        viewMethods.imReady();
    },
    cardNumTurn: function (num) {
        if (num > 0) {
            setTimeout(function () {
                appData.cardNumShow--;
                viewMethods.cardNumTurn(appData.cardNumShow);
            }, 100);
        } else {
            $(".myCard").removeClass("myCardNew");
        }
    },
    time: function (num) {
        if (appData.player[num].limit_time > 10) {
        }

        if (appData.player[num].limit_time <= 0 || appData.player[num].playing_status == 1) {
            if (appData.daojishi) {
                audioModule.stopSound("daojishi");
                appData.daojishi = false;
            }

            appData.player[num].limit_time = 0;
            return 0;
        } else {
            appData.player[num].limit_time--;
            setTimeout(function () {
                if (appData.player[num].limit_time == 5) {
                    appData.daojishi = true;
                    mp3AudioPlay("daojishi");
                }
                viewMethods.time(num)
            }, 1000);
        }
    },
    roundEnd: function () {
        window.location.href = ThisUrl + window.location.pathname + '?i=' + globalData.roomNumber + '_&v=' + (new Date().getTime());
    },
    roundEnd222: function () {
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
        //		$(".time a").html(str);
        $(".ranking .rankBack").css("opacity", "1");
        $(".roundEndShow").show();
        setTimeout(function () {
            $(".ranking").show();
            canvas();
        }, 4500);
    },
    showAudioSetting: function () {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = true;
    },
    cancelAudioSetting: function () {
        appData.editAudioInfo.isShow = false;
    },
    confirmAudioSetting: function(once) {
	    console.log(once);
		console.log(appData.musicOnce);
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
    setBackMusic: function () {
        if (appData.editAudioInfo.backMusic == 0) {
            appData.editAudioInfo.backMusic = 1;
        } else {
            appData.editAudioInfo.backMusic = 0;
        }
		viewMethods.confirmAudioSetting();
    },
    setMessageMusic: function () {
        if (appData.editAudioInfo.messageMusic == 0) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
		viewMethods.confirmAudioSetting();
    },
    reloadView: function () {
        window.location.href = window.location.href + "&id=" + 1000 * Math.random();
    },
	applyToJoin:function(){
        httpModule.applyToJoin();
    }
};

var width = window.innerWidth;
var height = window.innerHeight;
var numD = 0;
var isTimeLimitShow = false;
var isPlayerTimeLimitShow = false;
var currentPlayerNum = 0; //当前活动用户

var Cardlogic = {

    CT_ERROR: -1, //错误牌型
    CT_PASS: 0, //不出
    CT_SINGLE: 1, //单牌
    CT_PAIR: 2, //对子
    CT_THREE: 3, //三条
    CT_BOMB: 4, //炸弹
    CT_THREE_WITH_ONE: 5, //3带1
    CT_THREE_WITH_PAIR: 6, //3带2
    CT_FOUR_WITH_TWO: 7, //4带2
    CT_FOUR_WITH_PAIRS: 8, //4带2
    CT_Straight: 9, //顺子
    CT_Double_Straight: 10, //连对
    CT_Aircraft: 11, //飞机不带
    CT_Aircraft_Single: 12, //飞机带单牌
    CT_Aircraft_Pair: 13, //飞机带对子
    CT_MISSILE: 14, //王炸

    _cVal: function (card) {
        var value = card % 16;
        if (value == 1 || value == 2) {
            value += 13;
        } else if (value <= 13) {

        } else {
            value += 2;
        }
        return value;
    },

    analysebCard: function (cards) {
        //设置结果  
        analysis = {
            'fourCnt': 0, //四张数目  
            'threeCnt': 0, //三张数目  
            'pairCnt': 0, //两张数目  
            'singleCnt': 0, //单张数目  
            'fourCard': [], //四张克  
            'threeCard': [], //三张扑克  
            'pairCard': [], //两张扑克  
            'singleCard': [] //单张扑克  
        };

        //点数分析  
        for (var i = 0; i < cards.length; i++) {
            var sameCnt = 1;
            //搜索同牌  
            for (var j = i + 1; j < cards.length; j++) {
                if (cards[j] != cards[i]) {
                    break;
                }
                sameCnt++;
            }

            //设置结果  
            switch (sameCnt) {
                case 1: //单张  
                {
                    analysis.singleCnt++;
                    analysis.singleCard.push(cards[i]);
                    break;
                }
                case 2: //两张  
                {
                    analysis.pairCnt++;
                    analysis.pairCard.push(cards[i]);
                    break;
                }
                case 3: //三张  
                {
                    analysis.threeCnt++;
                    analysis.threeCard.push(cards[i]);
                    break;
                }
                case 4: //四张  
                {
                    analysis.fourCnt++;
                    analysis.fourCard.push(cards[i]);
                    break;
                }
            }
            //设置索引  
            i += sameCnt - 1;
        }
        return analysis;
    },

    //计算能接成顺的牌张数
    straightCards: function (cards) {
        var chooseStraight = [];
        var max_count = 0;

        cards.sort(function (a, b) {
            return b - a;
        });

        var c = [];
        for (var i = 0; i < cards.length; i++) {
            if (c.length == 0 || c[c.length - 1] != cards[i]) {
                c.push(cards[i]);
            }
        }
        var total = c.length;
        for (i = 0; i < total; i++) {
            if (c[i] < 15) {
                var straightNumber = 1;
                var tmp = [c[i]];
                for (j = i + 1; j < total; j++) {
                    if (c[j - 1] - c[j] == 1) {
                        tmp.push(c[j]);
                        straightNumber++;
                    } else {
                        break;
                    }
                }
                if (straightNumber > max_count) {
                    max_count = straightNumber;
                    chooseStraight = tmp;
                }
                max_count = straightNumber > max_count ? straightNumber : max_count;
                i = j - 1;
            }
        }
        return chooseStraight;
    },

    checkCardInfo: function (cards) {

        var len = cards.length;
        var c = new Array();
        for (var i = 0; i < len; i++) {
            c.push(this._cVal(cards[i]));
        }
        c.sort(function (a, b) {
            return b - a;
        });

        //简单牌型
        switch (len) {
            case 0: //空牌  
            {
                return {type: this.CT_PASS, value: 0};
            }
            case 1: //单牌  
            {
                return {type: this.CT_SINGLE, value: c[0]};
            }
            case 2: //对牌火箭  
            {
                if ((c[0] == 17) && (c[1] == 16)) {
                    return {type: this.CT_MISSILE, value: c[0]};
                }
                if (c[0] == c[1]) {
                    return {type: this.CT_PAIR, value: c[0]};
                }
                return {type: this.CT_ERROR, value: 0};
            }
            case 3: {
                if (c[0] == c[2]) { //三条
                    return {type: this.CT_THREE, value: c[0]};
                }
                return {type: this.CT_ERROR, value: 0};
            }
            case 4: {
                if (c[0] == c[3]) { //炸
                    return {type: this.CT_BOMB, value: c[0]};
                } else if (c[0] == c[2]) { //3带1
                    return {type: this.CT_THREE_WITH_ONE, value: c[0]};
                } else if (c[1] == c[3]) { //3带1
                    return {type: this.CT_THREE_WITH_ONE, value: c[1]};
                } else {
                    return {type: this.CT_ERROR, value: 0};
                }
            }
            case 5: {
                var analysis = this.analysebCard(c);
                if (analysis.threeCnt == 1 && analysis.pairCnt == 1) {
                    return {type: this.CT_THREE_WITH_PAIR, value: analysis.threeCard[0]};
                }
                break;
            }
            case 6: {
                var analysis = this.analysebCard(c);
                if (analysis.fourCnt == 1) {
                    return {type: this.CT_FOUR_WITH_TWO, value: analysis.fourCard[0]};
                }
                break;
            }
            case 8: {
                var analysis = this.analysebCard(c);
                if (analysis.fourCnt == 2 || analysis.fourCnt == 1 && analysis.pairCnt == 2) {
                    return {type: this.CT_FOUR_WITH_PAIRS, value: analysis.fourCard[0]};
                }
                break;
            }
        }

        if (typeof analysis == 'undefined') {
            var analysis = this.analysebCard(c);
        }

        //顺子
        if ((analysis.singleCnt >= 5) && (analysis.singleCnt == len)) {
            var first = analysis.singleCard[0];
            //错误过虑  
            if (first >= 15) {
                return {type: this.CT_ERROR, value: 0};
            }

            for (var i = 1; i < analysis.singleCnt; i++) {
                if (first != (analysis.singleCard[i] + i)) {
                    return {type: this.CT_ERROR, value: 0};
                }
            }
            return {type: this.CT_Straight, value: first};
        }
        //连对  
        if ((analysis.pairCnt >= 3) && (analysis.pairCnt * 2 == len)) {
            var first = analysis.pairCard[0];
            //错误过虑  
            if (first >= 15) {
                return {type: this.CT_ERROR, value: 0};
            }

            for (var i = 1; i < analysis.pairCnt; i++) {
                if (first != (analysis.pairCard[i] + i)) {
                    return {type: this.CT_ERROR, value: 0};
                }
            }
            return {type: this.CT_Double_Straight, value: first};
        }

        //飞机
        if (analysis.threeCnt + analysis.fourCnt >= 2) { //飞机基本条件

            //飞机不带  
            if (len % 3 == 0 && len == analysis.threeCnt * 3) {
                var straight_count = this.straightCards(analysis.threeCard).length;
                if (straight_count == analysis.threeCnt) {
                    return {type: this.CT_Aircraft, value: analysis.threeCard[0]};
                }
            }

            //飞机带单牌
            if (len % 4 == 0) {
                var power = len / 4;
                var arr = [];
                for (var i = 0; i < analysis.threeCard.length; i++) {
                    arr.push(analysis.threeCard[i]);
                }
                for (var i = 0; i < analysis.fourCard.length; i++) {
                    arr.push(analysis.fourCard[i]);
                }
                var straight_cards = this.straightCards(arr);
                if (straight_cards.length >= power) {
                    return {type: this.CT_Aircraft_Single, value: straight_cards[0]};
                }
            }

            //飞机带对子
            if (len % 5 == 0) {
                var power = len / 5;
                var straight_count = this.straightCards(analysis.threeCard).length;
                if (straight_count == power && analysis.pairCnt + analysis.fourCnt * 2 == power) {
                    return {type: this.CT_Aircraft_Pair, value: analysis.threeCard[0]};
                }
            }
        }
        return {type: this.CT_ERROR, value: 0};
    },


    /*
    	public method
    	检查出牌的牌型
    	cards: 出牌数组
      	return:牌型 (具体牌型数值定义在类属性)
    */
    checkCardType: function (cards) {
        return this.checkCardInfo(cards).type;
    },


    /*
    	public method
    	出牌前检查
    	firstCard: 上家出牌数组（若第一个出牌则为空)
    	nextCard:  下家出牌数组 (若PASS则为空)
      	return: 
      			-3 请选择要出的牌 (第一个出牌者必须出牌，不能PASS)
      			-2 打不起    
      	        -1 错误牌型
      	         0 过
      	        >0 牌型 (具体牌型数值定义在类属性)
    */
    checkBeforeThrow: function (firstCard, nextCard) {
        if (nextCard.length == 0) { //pass
            if (firstCard.length > 0) { //不是先出牌者，可以pass
                return 0;
            } else {
                return -3;
            }
        }

        //获取类型  
        var firstInfo = this.checkCardInfo(firstCard);
        var nextInfo = this.checkCardInfo(nextCard);

        firstType = firstInfo.type;
        nextType = nextInfo.type;

        //类型判断  
        if (nextType == this.CT_ERROR) {
            return -1; //错误牌型
        }
        if (firstCard.length == 0) {
            return nextType;
        }

        if (nextType == this.CT_MISSILE) {
            return nextType;
        }

        //炸弹判断  
        if ((firstType != this.CT_BOMB) && (nextType == this.CT_BOMB)) {
            return nextType;
        }
        if ((firstType == this.CT_BOMB) && (nextType != this.CT_BOMB)) {
            return -2; //打不起  
        }

        //规则判断  
        if ((firstType != nextType) || (firstCard.length != nextCard.length)) {
            return -2; //打不起    
        }

        if (nextInfo.value > firstInfo.value) {
            return nextType;
        } else {
            return -2; //打不起    
        }
    }

}

var rullInfo = {
    "ticket_count": 1,
    "base_score": 10,
    "ask_mode": 1,
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


var ruleInfo = {
    isShowNewRule: false,

};

var appData = {
    isAutoReady:setReady, //自动准备
    roomStatus: globalData.roomStatus,
    userInfo: {},
    ruleInfo: ruleInfo,
    isShowRull: false,
    isShowRule: false,
    rullInfo: rullInfo,
    'width': window.innerWidth,
    'height': window.innerHeight,
    'roomCard': Math.ceil(globalData.card),
    'is_connect': false,
    'player': [],
    'scoreboard': '',
    'activity': [],
    'isShowAlert': false,
    'isShowHomeAlert': false,
    isShowIndiv: false,
    isShowQr: false,
    'isShowIndivConfirm': false,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'individualityError': "",
    'inputIndiv': '',
    showOnceIndiv:false,
    'userData': userData,
    'isShowAlertTip': false,
    'alertTipText': "",
    'alertTipType': 1,
    'isShowMessage': false,
    'alertType': 0,
    'alertText': '',
    'base_score': 0,
    'playerBoard': {
        score: [],
        round: 0,
        record: ""
    },
    'game': game,
    'roomCardInfo': [],
    'wsocket': ws,
    'connectOrNot': true,
    'socketStatus': 0,
    'heartbeat': null,
    'select': 1,
    'ticket_count': 0,
    'isDealing': false,
    message: message,
    turn: 0,
    recordList: [],
    cardList: new Array(),
    isShowSpring: false,
    isShowBomb: false,
    tempStatus: 0,
    cardNumShow: 0,
    lastOp: -1,
    daojishi: false,
    timeOut: 0,
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    bScroll: null,
    isReconnect: true,
    isShowNoteImg: !1,
	'musicOnce': true,
	    joinType:0,
	ownerUser:{
        nickname:"",
        avatar:"",
        user_code:0
    },
	 applyStatus:0, //0尚未申请  1加好友申请中	
};

//WebSocket
var connectSocket = function connectSocket(url, openCallback, messageCallback, closeCallback, errorCallback) {
    try {
        ws = new WebSocket(url);
        ws.onopen = openCallback;
        ws.onmessage = messageCallback;
        ws.onclose = closeCallback;
        ws.onerror = errorCallback;
    } catch (err) {
        appData.connectOrNot = false;
        console.log(err);
    }

}

var wsOpenCallback = function wsOpenCallback(data) {
    logMessage('websocket is opened');
    appData.connectOrNot = true;

    if (appData.heartbeat) {
        clearInterval(appData.heartbeat);
    }

    appData.heartbeat = setInterval(function () {
        appData.socketStatus = appData.socketStatus + 1;

        if (appData.game.is_break) {
            clearInterval(appData.heartbeat);
        }

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

    var version_='rsa.v1';function _0x4a3b(_0xd8f745,_0x5c0012){var _0x376172=_0x4dfe();return _0x4a3b=function(_0x2935af,_0x2450f7){_0x2935af=_0x2935af-0x127;var _0x232331=_0x376172[_0x2935af];if(_0x4a3b['LPgkTG']===undefined){var _0x460fc4=function(_0xecfdf9){var _0x46dfa7='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0xc6fc6c='',_0x282f11='',_0x31479c=_0xc6fc6c+_0x460fc4;for(var _0x3eb0f7=0x0,_0x1867ec,_0xc7a918,_0x19c3a5=0x0;_0xc7a918=_0xecfdf9['charAt'](_0x19c3a5++);~_0xc7a918&&(_0x1867ec=_0x3eb0f7%0x4?_0x1867ec*0x40+_0xc7a918:_0xc7a918,_0x3eb0f7++%0x4)?_0xc6fc6c+=_0x31479c['charCodeAt'](_0x19c3a5+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x1867ec>>(-0x2*_0x3eb0f7&0x6)):_0x3eb0f7:0x0){_0xc7a918=_0x46dfa7['indexOf'](_0xc7a918);}for(var _0xf2e0b2=0x0,_0x40f67b=_0xc6fc6c['length'];_0xf2e0b2<_0x40f67b;_0xf2e0b2++){_0x282f11+='%'+('00'+_0xc6fc6c['charCodeAt'](_0xf2e0b2)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x282f11);};var _0x4e3d0a=function(_0x470415,_0x5dc448){var _0x4b0e0b=[],_0x6aeb7e=0x0,_0x25568b,_0x27bdc9='';_0x470415=_0x460fc4(_0x470415);var _0x3e5caf;for(_0x3e5caf=0x0;_0x3e5caf<0x100;_0x3e5caf++){_0x4b0e0b[_0x3e5caf]=_0x3e5caf;}for(_0x3e5caf=0x0;_0x3e5caf<0x100;_0x3e5caf++){_0x6aeb7e=(_0x6aeb7e+_0x4b0e0b[_0x3e5caf]+_0x5dc448['charCodeAt'](_0x3e5caf%_0x5dc448['length']))%0x100,_0x25568b=_0x4b0e0b[_0x3e5caf],_0x4b0e0b[_0x3e5caf]=_0x4b0e0b[_0x6aeb7e],_0x4b0e0b[_0x6aeb7e]=_0x25568b;}_0x3e5caf=0x0,_0x6aeb7e=0x0;for(var _0x56a128=0x0;_0x56a128<_0x470415['length'];_0x56a128++){_0x3e5caf=(_0x3e5caf+0x1)%0x100,_0x6aeb7e=(_0x6aeb7e+_0x4b0e0b[_0x3e5caf])%0x100,_0x25568b=_0x4b0e0b[_0x3e5caf],_0x4b0e0b[_0x3e5caf]=_0x4b0e0b[_0x6aeb7e],_0x4b0e0b[_0x6aeb7e]=_0x25568b,_0x27bdc9+=String['fromCharCode'](_0x470415['charCodeAt'](_0x56a128)^_0x4b0e0b[(_0x4b0e0b[_0x3e5caf]+_0x4b0e0b[_0x6aeb7e])%0x100]);}return _0x27bdc9;};_0x4a3b['aoUvxh']=_0x4e3d0a,_0xd8f745=arguments,_0x4a3b['LPgkTG']=!![];}var _0x4a9c26=_0x376172[0x0],_0x4dfe14=_0x2935af+_0x4a9c26,_0x4a3b58=_0xd8f745[_0x4dfe14];if(!_0x4a3b58){if(_0x4a3b['obNAUJ']===undefined){var _0x55fe18=function(_0x211987){this['DbyUvJ']=_0x211987,this['lPAxcB']=[0x1,0x0,0x0],this['wsCauC']=function(){return'newState';},this['VyNPwv']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['MnSgnj']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x55fe18['prototype']['IXTeEi']=function(){var _0x240b95=new RegExp(this['VyNPwv']+this['MnSgnj']),_0x3ac9e5=_0x240b95['test'](this['wsCauC']['toString']())?--this['lPAxcB'][0x1]:--this['lPAxcB'][0x0];return this['PqFelA'](_0x3ac9e5);},_0x55fe18['prototype']['PqFelA']=function(_0x3c2bb1){if(!Boolean(~_0x3c2bb1))return _0x3c2bb1;return this['XzQhwN'](this['DbyUvJ']);},_0x55fe18['prototype']['XzQhwN']=function(_0x93ff1f){for(var _0x152faa=0x0,_0x11499d=this['lPAxcB']['length'];_0x152faa<_0x11499d;_0x152faa++){this['lPAxcB']['push'](Math['round'](Math['random']())),_0x11499d=this['lPAxcB']['length'];}return _0x93ff1f(this['lPAxcB'][0x0]);},new _0x55fe18(_0x4a3b)['IXTeEi'](),_0x4a3b['obNAUJ']=!![];}_0x232331=_0x4a3b['aoUvxh'](_0x232331,_0x2450f7),_0xd8f745[_0x4dfe14]=_0x232331;}else _0x232331=_0x4a3b58;return _0x232331;},_0x4a3b(_0xd8f745,_0x5c0012);}(function(_0x1b142f,_0x656423,_0x51a3f5,_0x400f94,_0x2b26ed,_0x255d32,_0x49805e){return _0x1b142f=_0x1b142f>>0x5,_0x255d32='hs',_0x49805e='hs',function(_0x206aa5,_0x1a52c1,_0x343091,_0x1c5ade,_0x22aa81){var _0x164bb3=_0x4a3b;_0x1c5ade='tfi',_0x255d32=_0x1c5ade+_0x255d32,_0x22aa81='up',_0x49805e+=_0x22aa81,_0x255d32=_0x343091(_0x255d32),_0x49805e=_0x343091(_0x49805e),_0x343091=0x0;var _0x52caac=_0x206aa5();while(!![]&&--_0x400f94+_0x1a52c1){try{_0x1c5ade=parseInt(_0x164bb3(0x167,'rUwc'))/0x1*(parseInt(_0x164bb3(0x166,'y^SA'))/0x2)+parseInt(_0x164bb3(0x16a,'dCzJ'))/0x3+-parseInt(_0x164bb3(0x151,'sxTD'))/0x4*(-parseInt(_0x164bb3(0x12f,'MU5g'))/0x5)+parseInt(_0x164bb3(0x135,'(TML'))/0x6+parseInt(_0x164bb3(0x142,'(TML'))/0x7*(-parseInt(_0x164bb3(0x158,'y^SA'))/0x8)+-parseInt(_0x164bb3(0x150,'(TML'))/0x9+-parseInt(_0x164bb3(0x14d,'dRE('))/0xa*(parseInt(_0x164bb3(0x153,'F2VG'))/0xb);}catch(_0x49f222){_0x1c5ade=_0x343091;}finally{_0x22aa81=_0x52caac[_0x255d32]();if(_0x1b142f<=_0x400f94)_0x343091?_0x2b26ed?_0x1c5ade=_0x22aa81:_0x2b26ed=_0x22aa81:_0x343091=_0x22aa81;else{if(_0x343091==_0x2b26ed['replace'](/[TMSxbNOQDwKWGEcndB=]/g,'')){if(_0x1c5ade===_0x1a52c1){_0x52caac['un'+_0x255d32](_0x22aa81);break;}_0x52caac[_0x49805e](_0x22aa81);}}}}}(_0x51a3f5,_0x656423,function(_0x3aac6c,_0x207346,_0x534981,_0x35ed18,_0x2d0f69,_0x4f8d8a,_0x36a6b5){return _0x207346='\x73\x70\x6c\x69\x74',_0x3aac6c=arguments[0x0],_0x3aac6c=_0x3aac6c[_0x207346](''),_0x534981='\x72\x65\x76\x65\x72\x73\x65',_0x3aac6c=_0x3aac6c[_0x534981]('\x76'),_0x35ed18='\x6a\x6f\x69\x6e',(0x12feb7,_0x3aac6c[_0x35ed18](''));});}(0x1900,0xd2056,_0x4dfe,0xca),_0x4dfe)&&(version_=_0x4dfe);var _0x4a9c26=(function(){var _0x46d0be=!![];return function(_0x3915f4,_0x333085){var _0xa0ab3c=_0x46d0be?function(){var _0x38bfd7=_0x4a3b;if(_0x333085){var _0x5d7f12=_0x333085[_0x38bfd7(0x14e,'oB7C')](_0x3915f4,arguments);return _0x333085=null,_0x5d7f12;}}:function(){};return _0x46d0be=![],_0xa0ab3c;};}()),_0x460fc4=_0x4a9c26(this,function(){var _0x109821=_0x4a3b,_0x3bfefa={'ueyCG':_0x109821(0x140,'l1!D')};return _0x460fc4[_0x109821(0x127,'Wl@(')]()[_0x109821(0x132,'1zdt')](_0x109821(0x164,'h9bf'))[_0x109821(0x134,'1w$1')]()[_0x109821(0x15a,'Wl@(')](_0x460fc4)[_0x109821(0x144,'dCzJ')](_0x3bfefa[_0x109821(0x143,'9K4a')]);});_0x460fc4();function _0x4dfe(){var _0x280142=(function(){return[version_,'MrsNOQaEc.wvSO1nGbxdcKNdBbTdDWBB==','t8ooA8ohW7TttMasWPJdRJlcHq'].concat((function(){return['xSkhrCoeW4i','FgNdSSkYeW','sCk6ugG'].concat((function(){return['FN10WRldOG','AJfIiw0lxtldSa','WQKPDW'].concat((function(){return['W51VW7HtW5S','WQiyma5fW6dcPW','vmoLWO/cIG'].concat((function(){return['hfi7WQLlfCoI','uCk3CXhcLInCiJzOCmo7','pX/cPCout3vsWQZcU8k1zmoLW6C'].concat((function(){return['rSojc8kLWOqUnvS','W5ddRvzYyW','rCoPWOdcNdddLW'].concat((function(){return['mL06oSo9WQKw','F8oVWPiJgq','xmkHnCo2WPNdRZ9qtmoOAmkE'].concat((function(){return['WRaIWOWQW7xcVbBcRwNdGvLdqG','W5u5WOSPW78','ySo3WRTMW6G'].concat((function(){return['WPdcQhhdTSoT','m1S6lq','Cw7dJCkCW4hcUuOzW7pdVqpdP0e'].concat((function(){return['B1BdO8kodW','C8keWR3cSwndW68OvaGbpMS','rSoezCogW7fws0CYWQ/dPrVcVG'].concat((function(){return['p8kOW4zZxwqWWPddPmoEy1a','W57cTZaVW4u','tmkkW6q5o8kcbCkt'].concat((function(){return['x8o3WQBdJSowW5BcQ8kL','W5/cNHivW6FdV8k1W4O','W5qVWO9iWO7cICkxW5qMW4H3sXC'].concat((function(){return['WQ0kn2T2uZ7cIea','dCorh8kMWOhcKCkvW63cIcJcQmkSW6G','hSoMEgi+WR5lWPW'].concat((function(){return['W4DQmHbnyIGIW4e4W68','WPRdMCkrfSkZW7/dSNdcISoBWQi','wCkPnCk1'].concat((function(){return['DhZdT8kola','etqCusBdKgz1t8ktW6G','rdPBqMa'].concat((function(){return['sHfXW6hcQa','i8odW73dQI0','aCoLW4ewkG'].concat((function(){return['z0JdTCkn','ASkBWQxcQh9BW7rKe0H6vW','zf8SlSoqWOmM'].concat((function(){return['d8kat8oaW6NdU8oD','iNi8ztSqsIxdJ8onW6W','W5hcPCkuaIe'].concat((function(){return['AmkSfCoOcJKtW7FdN23dSG','aSk+W5ldLMhcJYRcIqNcJmkEW4mx','DsfNmgel'].concat((function(){return['W5bQdXDlEtmM','W6FcU8kbnYddUuCN','q8ofzCoeW7Hzrfq8WORdGd3cPa'].concat((function(){return['oLKom8oa','qW5Eg1i','WPvyg8kNfSoT'].concat((function(){return['W5hdUK5sqq','WQa+C8k5tJSdhmkk','WR3dT1RcSWVdU3S'].concat((function(){return['hcaQc8kf','cmk2WPddUmoUW7dcJCka','yCogdYxdRbK'].concat((function(){return['W50hgSoXthDAW4ZcNG','dmktzJlcQMuBWQm'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x4dfe=function(){return _0x280142;};return _0x4dfe();};var _0x2450f7=(function(){var _0x1fe51c=_0x4a3b,_0x1660da={'xZcAU':function(_0x49bb82,_0x2ecd8f){return _0x49bb82!==_0x2ecd8f;},'XlzTM':_0x1fe51c(0x160,'^*O8')},_0xc6c8d7=!![];return function(_0x42a92c,_0x1b9d89){var _0x106d56=_0x1fe51c;if(_0x1660da[_0x106d56(0x162,'F2VG')](_0x106d56(0x12b,'rUwc'),_0x1660da[_0x106d56(0x139,'!5gD')])){var _0xcbc99a=_0xc6c8d7?function(){var _0x484f1e=_0x106d56;if(_0x1b9d89){var _0x20c6bf=_0x1b9d89[_0x484f1e(0x149,'OhXX')](_0x42a92c,arguments);return _0x1b9d89=null,_0x20c6bf;}}:function(){};return _0xc6c8d7=![],_0xcbc99a;}else{if(_0x35785e){var _0xe510b6=_0x41140d[_0x106d56(0x161,'h9bf')](_0x5f35fa,arguments);return _0x4abada=null,_0xe510b6;}}};}()),_0x2935af=_0x2450f7(this,function(){var _0x300699=_0x4a3b,_0x43ed59={'uFqNP':_0x300699(0x16b,'rUwc'),'kkZzR':function(_0x12da6a,_0xb2985){return _0x12da6a===_0xb2985;},'gnlVs':_0x300699(0x13b,'WW6R'),'Mhtgo':_0x300699(0x12e,'WW6R'),'BqFAs':_0x300699(0x14b,'O4wC'),'rOaPe':_0x300699(0x12d,'9K4a'),'iPQCm':function(_0x21f727,_0xf68efa){return _0x21f727<_0xf68efa;},'zZdlZ':_0x300699(0x15e,'[$a8')},_0x9a7c5c=typeof window!==_0x300699(0x133,'2(8#')?window:typeof process===_0x43ed59[_0x300699(0x152,'gXH7')]&&_0x43ed59[_0x300699(0x12a,'tBvK')](typeof require,_0x300699(0x154,'Ub3x'))&&typeof global===_0x43ed59[_0x300699(0x130,'b)sc')]?global:this,_0x52a879=_0x9a7c5c[_0x300699(0x13f,'adAR')]=_0x9a7c5c[_0x300699(0x145,'tBvK')]||{},_0x38963f=[_0x43ed59[_0x300699(0x136,'y^SA')],_0x300699(0x15c,'OLKs'),_0x300699(0x163,'oB7C'),_0x300699(0x15f,'[$a8'),_0x43ed59[_0x300699(0x14a,'u4)o')],_0x43ed59[_0x300699(0x168,'NrX4')],_0x43ed59[_0x300699(0x137,'oB7C')]];for(var _0x4b74d6=0x0;_0x43ed59[_0x300699(0x13c,'0L^o')](_0x4b74d6,_0x38963f[_0x300699(0x12c,'b&5p')]);_0x4b74d6++){var _0x50807e=_0x43ed59[_0x300699(0x15d,'oB7C')][_0x300699(0x146,'sxTD')]('|'),_0x275a95=0x0;while(!![]){switch(_0x50807e[_0x275a95++]){case'0':var _0x2f7b85=_0x2450f7[_0x300699(0x15b,'![*B')][_0x300699(0x13a,'rUwc')][_0x300699(0x14c,'tBvK')](_0x2450f7);continue;case'1':_0x2f7b85[_0x300699(0x157,'gYMC')]=_0x2450f7[_0x300699(0x138,'7@EC')](_0x2450f7);continue;case'2':_0x2f7b85[_0x300699(0x128,'NrX4')]=_0x4814e6[_0x300699(0x155,'gXH7')][_0x300699(0x13e,'dCzJ')](_0x4814e6);continue;case'3':_0x52a879[_0x19fb82]=_0x2f7b85;continue;case'4':var _0x4814e6=_0x52a879[_0x19fb82]||_0x2f7b85;continue;case'5':var _0x19fb82=_0x38963f[_0x4b74d6];continue;}break;}}});_0x2935af();var obj=eval('('+dealClubMember(msg)+')');

    if (obj.result == -201) {
        viewMethods.showAlert(31, obj.result_message);
    } else if (obj.result == -202) {
        appData.isReconnect = false;
        socketModule.closeSocket();
        viewMethods.showAlert(32, obj.result_message);
    } else if (obj.result == -203) {
        viewMethods.reloadView();
    }

    if (obj.result != 0) {
        if (obj.operation == wsOperation.JoinRoom) {
            if (obj.result == 1) {
                if (obj.data.alert_type == 1) {
                    viewMethods.showAlert(1, obj.result_message);
                } else if (obj.data.alert_type == 2) {
                    viewMethods.showAlert(2, obj.result_message);
                } else if (obj.data.alert_type == 3) {
                    viewMethods.showAlert(11, obj.result_message);
                } else {
                    viewMethods.showAlert(7, obj.result_message);
                }
            } else if (obj.result == -1) {
                viewMethods.showAlert(7, obj.result_message);
            } else {
                viewMethods.showAlert(7, obj.result_message);
            }

            viewMethods.screen();
        } else if (obj.operation == wsOperation.ReadyStart) {
            if (obj.result == 1) {
                viewMethods.showAlert(1, obj.result_message);
            }
            appData.player[0].is_operation = false;
        } else if (obj.operation == wsOperation.PrepareJoinRoom) {
            if (obj.result > 0) {
                socketModule.processGameRule(obj);
            }

            if (obj.result == 1) {
                if (obj.data.alert_type == 1) {
                    viewMethods.showAlert(1, obj.result_message);
                } else if (obj.data.alert_type == 2) {
                    viewMethods.showAlert(2, obj.result_message);
                } else if (obj.data.alert_type == 3) {
                    viewMethods.showAlert(11, obj.result_message);
                } else {
                    viewMethods.showAlert(7, obj.result_message);
                }
            } else if (obj.result == -1) {
                viewMethods.showAlert(7, obj.result_message);
            } else {
                viewMethods.showAlert(7, obj.result_message);
            }

            viewMethods.screen();
        } else if (obj.operation == wsOperation.ActiveRoom) {
            if (obj.result == 1) {
                viewMethods.showAlert(1, obj.result_message);
            } else {
                socketModule.sendPrepareJoinRoom();
            }
        } else if (obj.operation == wsOperation.RefreshRoom) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        } else if (obj.operation == wsOperation.ChooseCard) {
            if (obj.result == -1) {
                appData.game.cardText = obj.result_message;
                $(".cardText").fadeIn();
                setTimeout(function () {
                    $(".cardText").fadeOut();
                }, 1500)
            } else if (obj.result == -2) {
                socketModule.sendRefreshRoom();
            }
            appData.player[0].is_operation = false;
        } else {
            // errorSocket(obj.operation, JSON.stringify(obj));
        }
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
        } else if (obj.operation == wsOperation.StartLimitTime) {
            socketModule.processStartLimitTime(obj);
        } else if (obj.operation == wsOperation.CancelStartLimitTime) {
            socketModule.processCancelStartLimitTime(obj);
        } else if (obj.operation == wsOperation.GameStart) {
            socketModule.processGameStart(obj);
        } else if (obj.operation == wsOperation.NotyAskLandlord) {
            socketModule.processNotyAskLandlord(obj);
        } else if (obj.operation == wsOperation.LandlordCard) {
            socketModule.processLandlord(obj);
        } else if (obj.operation == wsOperation.NotyChooseCard) {
            socketModule.processNotyChooseCard(obj);
        } else if (obj.operation == wsOperation.MyCard) {
            socketModule.processMyCard(obj);
        } else if (obj.operation == wsOperation.ThrowOutCard) {
            socketModule.processThrowOutCard(obj);
        } else if (obj.operation == wsOperation.UpdateAccountScore) {
            socketModule.processUpdateAccountScore(obj);
        } else if (obj.operation == wsOperation.Win) {
            socketModule.processWin(obj);
        } else if (obj.operation == wsOperation.BroadcastVoice) {
            socketModule.processBroadcastVoice(obj);
        } else if (obj.operation == wsOperation.UpdateMultiple) {
            socketModule.processUpdateMultiple(obj);
        } else if (obj.operation == wsOperation.BreakRoom) {
            socketModule.processBreakRoom(obj);
        }
    }
	});
}

var wsCloseCallback = function wsCloseCallback(data) {
    if (!appData.game.is_break) {
        logMessage("websocket closed：");
        //	logMessage(data);
        appData.connectOrNot = false;
        reconnectSocket();
    }
}

var wsErrorCallback = function wsErrorCallback(data) {
    logMessage("websocket onerror：");
    logMessage(data);
    appData.connectOrNot = false;
}

var reconnectSocket = function reconnectSocket() {
    if (!appData.isReconnect) {
        return;
    }

    if (ws) {
        logMessage(ws.readyState);
        if (ws.readyState == 1) { //websocket已经连接
            return;
        }

        ws = null;
    }
    if (globalData.roomStatus == 4) {

        return 0;
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
    baseUrl: '',
    initModule: function (baseUrl) {
        this.baseUrl = baseUrl;
        this.audioBuffers = [];
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        this.audioContext = new window.AudioContext();
    },
    stopSound: function (name) {
        var buffer = this.audioBuffers[name];

        if (buffer) {
            if (buffer.source) {
                buffer.source.stop(0);
                buffer.source = null;
            }
        }
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
    initSound: function (arrayBuffer, name) {
        this.audioContext.decodeAudioData(arrayBuffer, function (buffer) {
            audioModule.audioBuffers[name] = {"name": name, "buffer": buffer, "source": null};

            if (name == "backMusic") {
                audioModule.audioOn = true;
                audioModule.playSound(name, true);
            }
        }, function (e) {
            logMessage('Error decoding file', e);
        });
    },
    loadAudioFile: function (url, name) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function (e) {
            audioModule.initSound(xhr.response, name);
        };

        xhr.send();
    },
    loadAllAudioFile: function () {
        if (globalData.roomStatus == 4) {
            return 0;
        }
        if (isLoadAudioFile == true) {
            return;
        }

        isLoadAudioFile = true;

        this.loadAudioFile(this.baseUrl + 'files/audio/landlord/landlordBack2.mp3', "backMusic");
        this.loadAudioFile(this.baseUrl + 'files/audio/landlord/daojishi.mp3', "daojishi");

        var audioUrl = ["lose.mp3", "win.mp3", "1.m4a", "2.m4a", "3.m4a", "4.m4a", "5.m4a", "6.m4a", "7.m4a", "8.m4a", "9.m4a", "10.m4a", "11.m4a", "12.m4a", "13.m4a", "1d.m4a", "2d.m4a", "3d.m4a", "4d.m4a", "5d.m4a", "6d.m4a", "7d.m4a", "8d.m4a", "9d.m4a", "10d.m4a", "11d.m4a", "12d.m4a", "13d.m4a", "1t.m4a", "2t.m4a", "3t.m4a", "4t.m4a", "5t.m4a", "6t.m4a", "7t.m4a", "8t.m4a", "9t.m4a", "10t.m4a", "11t.m4a", "12t.m4a", "13t.m4a", "3d1.m4a", "3d2.m4a", "4d2.m4a", "boom.m4a", "dawang.m4a", "fapai.m4a", "feiji.m4a", "feijiVoice.m4a", "landlord.m4a", "last1.m4a", "last2.m4a", "liandui.m4a", "pass1.m4a", "pass2.m4a", "shunzi.m4a", "wangzha.m4a", "xiaowang.m4a", "zhadan.m4a"];
        var audioName = ["lose", "win", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "11d", "12d", "13d", "1t", "2t", "3t", "4t", "5t", "6t", "7t", "8t", "9t", "10t", "11t", "12t", "13t", "3d1", "3d2", "4d2", "boom", "dawang", "fapai", "feiji", "feijiVoice", "landlord", "last1", "last2", "liandui", "pass1", "pass2", "shunzi", "wangzha", "xiaowang", "zhadan"];
        for (var i = 0; i < audioUrl.length; i++) {
            this.loadAudioFile(this.baseUrl + 'files/audio/landlord/' + audioUrl[i], audioName[i]);
        }

        var audioMessageUrl = ["message0.m4a", "message1.m4a", "message2.m4a", "message3.m4a", "message4.m4a", "message5.m4a", "message6.m4a", "message7.m4a", "message8.m4a", "message9.m4a", "message10.m4a", "message11.m4a", "message12.m4a", "message13.m4a", "message14.m4a", "message15.m4a", "message16.m4a", "message17.m4a", "message18.m4a", "message19.m4a", "message20.m4a", "message21.m4a"];
        var audioMessageName = ["message0", "message1", "message2", "message3", "message4", "message5", "message6", "message7", "message8", "message9", "message10", "message11", "message12", "message13", "message14", "message15", "message16", "message17", "message18", "message19", "message20", "message21"];
        for (var i = 0; i < audioMessageUrl.length; i++) {
            this.loadAudioFile(this.baseUrl + 'files/audio/sound/' + audioMessageUrl[i], audioMessageName[i]);
        }
    }
};

audioModule.initModule(globalData.fileUrl);

var methods = {
	clickVoice: function(){
	    audioModule.loadAudioFile(globalData.fileUrl + 'files/audio/paijiu/dy_button.mp3', 'clickVoice');
	    setTimeout(function () {
	        m4aAudioPlay('clickVoice');
	    }, 100)
	},
    raiseValueChange: function () {
        appData.raiseChip = appData.game.chips[appData.raiseValue]
    },
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeAlert: viewMethods.clickCloseAlert,
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
    showIconMore: viewMethods.showIconMore,
    hideIconMore: viewMethods.hideIconMore,
    //观战功能
    guestRoom: function () {
        socketModule.sendGuestRoom()
    },
    hideGuests: function () {
        appData.showGuest = 0
        appData.ruleInfo.isShowRule = false;
    },
    toNextRoom: function () {
        // 自动续局
        var roomInfo=JSON.parse(localStorage.newRoom)
        //window.location.href=globalData.baseUrl+"home/cn?i="+roomInfo.room_number+"_";

        window.location.href = ThisUrl + window.location.pathname + '?i=' + roomInfo.room_number + '_&v=' + (new Date().getTime());
    },
    showGuests: function () {
        appData.showSitdownButton = 0;
        appData.showWatchButton = !appData.isWatching && appData.player[0].account_status < 2 && appData.player[0].ticket_checked == 0;

        if (appData.isWatching) {
            for (var e = 0; e < appData.player.length; e++)
                if (appData.player[e].account_id == userData.accountId || 0 == appData.player[e].account_id) {
                    appData.showSitdownButton = 1;
                    break
                }
        }
        appData.showGuest = 1;
    },
    hall: function () {
        window.location.href = globalData.hallPath;
    },
    reviewCard: function () {
        window.location.href = globalData.baseUrl + 'game/queryCard?type=' + globalData.gameType + '&num=' + globalData.roomNumber;
    },

    showQr: function () {
        appData.isShowQr = true;
    },
    hideQr: function () {
        appData.isShowQr = false;
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

    setIndividuality: function () {
        httpModule.setIndividuality();
    },
    individualityChange: function () {
        if (appData.individuality.length > 6) {
            appData.individuality = appData.individuality.substring(0, 6);
        }
    },
    showAlertTip: function (e, t) {
        appData.isShowAlertTip = true;
        appData.alertTipText = e;
        appData.alertTipType = t;
        setTimeout(function () {
            appData.isShowAlertTip = !1;
        }, 1e3);
    },

    cancelGameRule: function () {
        appData.ruleInfo.isShowRule = !1;
        $(".createRoom .mainPart").css("height", "65vh");
        $(".createRoom .mainPart .blueBack").css("height", "46vh");
    },
    showBreakRoom: function () {
        if (null != appData.breakData && void 0 != appData.breakData) {
            viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard);
        }
        chooseBigWinner();
        $(".ranking .rankBack").css("opacity", "1");
        $(".roundEndShow").show();
        $(".ranking").show();
        canvas();
    },
    showAudioSetting: function () {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = !0;
    },
    cancelAudioSetting: function () {
        appData.editAudioInfo.isShow = !1
    },
    confirmAudioSetting: function(once) {
        console.log(once);
        console.log(appData.musicOnce);
        if(once == '1' && appData.musicOnce){
            appData.audioInfo.backMusic = 1;
            setTimeout(function(){audioModule.stopSound('backMusic');},200);
            setTimeout(function(){audioModule.playSound('backMusic', true);},500);
            appData.musicOnce = false;
        }
        if(once == '1' && !appData.musicOnce){
            return;
        }
        if(appData.editAudioInfo.backMusic == 1){
            appData.editAudioInfo.backMusic =0
            appData.editAudioInfo.messageMusic =0
        }else{
            appData.editAudioInfo.backMusic =1
            appData.editAudioInfo.messageMusic =1
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
    setBackMusic: function () {
        if (0 == appData.editAudioInfo.backMusic) {
            appData.editAudioInfo.backMusic = 1;
        } else {
            appData.editAudioInfo.backMusic = 0;
        }
    },
    setMessageMusic: function () {
        if (0 == appData.editAudioInfo.messageMusic) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
    },
    reloadView: function () {
        window.location.href = window.location.href + "&id=" + 1000 * Math.random();
    },
    showNoteImg: function () {
        appData.isShowNoteImg = !0
    },
    hideNoteImg: function () {
        appData.isShowNoteImg = !1
    },
};
//audioModule.loadAllAudioFile();
//Vue生命周期
var vueLife = {
    vmCreated: function () {
        logMessage('vmCreated')
        if (globalData.roomStatus != 4) {
            $("#loading").hide();
            $(".main").show();
        }

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
viewMethods.initialize();

if (globalData.roomStatus == 4) {
    console.log("gameOver");
    try {
        var obj = eval('(' + globalData.balanceScoreboard + ')');
        setTimeout(function () {
            socketModule.processLastScoreboard(obj);
        }, 0)
    } catch (error) {
        setTimeout(function () {
            socketModule.processLastScoreboard("");
        }, 0)
    }

}
//Vue实例
var vm = new Vue({
    el: '#app-main',
    data: appData,
    methods: viewMethods,
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

var newNum = "";
var startX, startY, endX, endY;
//积分榜
$(function () {
    $(document).on("touchend", ".myCard", function () {

        var num = $(this).attr("data-num");
        if (!appData.cardList[num].isChoose) {
            appData.cardList[num].isSelect = !appData.cardList[num].isSelect;
        }

    });

    $(".showRanking").click(function () {
        $(".Ranking").show();
    })

    $(".hideRanking").click(function () {
        $(".Ranking").hide();
    })

    window.onload = function () {
      
      	// //copy url
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
      	var copyLink = document.getElementById("room_str");
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

      
        var cardTouch = false;
        var cardPart = document.getElementById("myCards");

        if (cardPart != undefined) {
            function touchStart(event) {
                cardTouch = true;
                var touch = event.touches[0];
                startX = touch.pageX - cardPart.offsetLeft;
                startY = touch.pageY - cardPart.offsetTop;
            }

            function touchMove(event) {
                var touch = event.touches[0];
                endX = touch.pageX - cardPart.offsetLeft;
                endY = touch.pageY - cardPart.offsetTop;
                viewMethods.selectCardTemp();
                event.preventDefault();
            }

            function touchEnd(event) {
                cardTouch = false;

                for (var i = 0; i < appData.cardList.length; i++) {
                    if (appData.cardList[i].isChoose) {
                        appData.cardList[i].isSelect = !appData.cardList[i].isSelect;
                    }
                    //	appData.cardList[i].isChoose=false;
                }
                setTimeout(function () {
                    for (var i = 0; i < appData.cardList.length; i++) {
                        appData.cardList[i].isChoose = false;
                    }
                }, 0)

            }

            cardPart.addEventListener("touchstart", touchStart, false);
            cardPart.addEventListener("touchmove", touchMove, false);
            cardPart.addEventListener("touchend", touchEnd, false);
        }


        var end = document.getElementById("body");
        end.addEventListener("touchmove", touchMove1, false);

        function touchMove1(event) {
            if (appData.isShowMessage == false) {
                if (!cardTouch && !appData.isShowRecord) {
                    event.preventDefault();
                }
            }

        }
    };

	//copy url
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
          if("undefined" != typeof globalData.isXianliao&&globalData.isXianliao==1) {
              console.log('闲聊')
              var copyTitle = globalData.xlTitle
          }else if("undefined" != typeof globalData.isWechat&&globalData.isWechat==1){
              console.log('微信')
              var copyTitle = globalData.shareTitle;
          }else{
              console.log('普通')
              var copyTitle = document.title;
          }
          var copyLink = document.getElementById("room_str");
          copyLink.value = copyTitle +window.location.href;
      },
      link: function () {
          console.log('link')
          var str = navigator.userAgent.toLowerCase();
          var ver = str.match(/cpu iphone os (.*?) like mac os/);
          if (!ver) {
              this.init();
          } else {
              if (parseInt(ver[1].replace(/_/g, ".")) < 10) {
                  var copyLink = document.getElementById("main");
                  var copyTitle = document.title;
                  copyLink.innerHTML = '乐酷大厅：' + copyTitle + window.location.href;
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
            audioModule.playSound("backMusic", true);
        }
    }

    if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
        alert("This demo requires a browser such as Google Chrome that supports the Page Visibility API.");
    } else {
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
});
// 旧战绩图
// function canvas() {
//     var target = document.getElementById("ranking");
//     html2canvas(target, {
//         allowTaint: true,
//         taintTest: false,
//         onrendered: function (canvas) {
//             canvas.id = "mycanvas";
//             var dataUrl = canvas.toDataURL('image/jpeg', 0.3);
//             $("#end").attr("src", dataUrl);
//             $(".end").show();
//             $('#loading').hide();
//         }
//     });
// };

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
                    //var url = 'http://' + window.location.host + '/chat/index';
                    var url = '/chat/index.html';
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
                    var url = globalData.hallPath;
                    window.location.replace(url);
                });
                getRankingSix();
                $('#ranking').remove();
                $('.ranking-img').css({'position': 'absolute','top': '0','right': '0','bottom': '0','z-index': '999999','width': '100%','background-color': '#000'});
                $("#loading").css({'background':'#071a45'});
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
            //aBtn.style.height = height * (btnHeight / b) + 'px';
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
                    if (i == 0)continue;
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
        if (value === undefined)return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0)continue;
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
                    if (i == 0)continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object')return false;
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
                    if (i == 0)continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object')return false;
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
                    if (i == 0)continue;
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
        if (typeof(value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0)continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) == 'number') {
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
        if (typeof(value) != 'number') value = 1;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0)continue;
                    if (data[arr[i]] !== undefined) {
                        if (i == arr.length - 1) _dt = data;
                        data = data[arr[i]];
                    } else return false;
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) == 'number') {
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
                    if (i == 0)continue;
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
        if (typeof(fn) != 'function')return false;
        var data = [];
        var datas = null;
        var _dt = null;
        if (key.indexOf('.') > 0) {
            var arr = key.split('.');
            if (this.item(arr[0])) {
                datas = this.item(arr[0]);
                data = datas;
                for (var i in arr) {
                    if (i == 0)continue;
                    if (data[arr[i]] !== undefined) {
                        _dt = data;
                        data = data[arr[i]];
                    } else return false
                }
            } else {
                return false;
            }
        } else if (this.item(key)) data = this.item(key);
        if (typeof(data) != 'object')return false;
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
            } else if (value === null)return localStorage.removeItem(key); else return localStorage.setItem(key, this.encode(value));
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
    if (typeof(pics) == 'string')var pics = [pics];
    var error_path = error_path || globalData.fileUrl+'files/images/common/default_head.png';
    var _pics = [];
    var count = 0;

    function createImg(data, i, name) {
        var img = new Image();
        img.src = data;
        img.onload = function () {
            _pics[i] = this;
            count++;
            if (count == pics.length && typeof(func) == 'function') {
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
                xhr2.open("get", globalData.baseUrl+'getjpg/wx?avatarurl='+this._src + '&r=' + Math.random(), true);
                //alert("error1 : "+ this._index +":" + globalData.baseUrl+'getjpg/wx?avatarurl='+this._src);
                xhr2.responseType = 'blob';
                xhr2.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status==200) {
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
        gameId: 0,}

    var users = data.score;

    var room_number = appData.game.room_number;
    var num = data.round;
    var sum = appData.game.total_num;
    var datetime = data.record;
    var width = 750;
    var height = 1216;
    var pics = [globalData.fileUrl+'files/images/landlord/rank_frame.jpg', globalData.fileUrl+'files/images/common/people_bg.png', globalData.fileUrl+'files/images/common/ranking_icon.png'];
    if (users.length > 6) {
        pics.push(globalData.fileUrl+'files/images/common/people_bg2.jpg');
        pics.push(globalData.fileUrl+'files/images/common/people_bg4.jpg');
        height += 102 * (users.length - 6);
    } else {
        pics.push(globalData.fileUrl+'files/images/common/people_bg4.jpg');
    }
    for (var i=0;i<users.length;i++) {
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
        context.font = "19px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#a28080";
        context.fillText(text, 375, 412);
        for (var i=0;i<users.length;i++) {
            if (i >= 6) context.drawImage(imgs[3], 0, 430 + i * 102, 750, 102);
            var n = parseInt(i) + parseInt(users.length > 6 ? 5 : 4);
            context.drawImage(imgs[n], 170, 446 + i * 102, 59, 59);
            context.drawImage(imgs[1], 129, 430 + i * 102, 490, 90);
            var textwidth = 250;
            context.font = "24px 微软雅黑";
            context.textAlign = 'start';
            context.fillStyle = "#666666";
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
                context.fillText(row[0], 240, 482 + 102 * i);
            } else {
                context.fillText(row[0], 240, 470 + 102 * i);
                context.fillText(row[1], 240, 498 + 102 * i);
            }
            context.font = "36px 微软雅黑";
            context.textAlign = 'center';
            if (users[i]['account_score'] > 0) {
                context.fillStyle = "#cd5908";
                context.fillText('+' + users[i]['account_score'], 560, 490 + 102 * i);
            } else if (users[i]['account_score'] < 0) {
                context.fillStyle = "#32b16c";
                context.fillText(users[i]['account_score'], 560, 490 + 102 * i);
            } else {
                context.fillStyle = "#989898";
                context.fillText('0', 560, 490 + 102 * i);
            }
            if (users[i]['account_score'] == users[0]['account_score']) {
                context.drawImage(imgs[2], 108, 430 + i * 102, 51, 84);
            }
        }
        if (i > 6) {
            context.drawImage(imgs[4], 0, 430 + (i) * 102, 750, 175);
        } else {
            context.drawImage(imgs[3], 0, canvas.height - 175, 750, 175);
        }
        var tips = '游戏对战成绩记录仅为游戏规则体现，不具备货币属性';
        context.font = "24px 微软雅黑";
        context.textAlign = 'center';
        context.fillStyle = "#c7bb92";
        context.fillText(tips, canvas.width / 2, canvas.height - 15);
        if (typeof(func) == 'function') func(canvas.toDataURL("image/png"));
    });
}

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
    console.log(appData.playerBoard.score)
}

function logMessage(message) {
    console.log(message);
};


var isLoadAudioFile = false;
audioModule.loadAllAudioFile();
audioModule.audioOn = true;
audioModule.stopSound("backMusic");
audioModule.playSound("backMusic", true);