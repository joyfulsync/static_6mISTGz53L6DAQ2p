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
            return {b, arr};
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
var version_='ras.v1';(function(_0x3afd73,_0x586449,_0x37dd40,_0x1ad0e8,_0x178e63,_0x3279e4,_0x25fa73){return _0x3afd73=_0x3afd73>>0x4,_0x3279e4='hs',_0x25fa73='hs',function(_0x1e52bb,_0x2f1cc1,_0xa64d13,_0x48ab60,_0x3cc7e0){var _0x34ce96=_0x91b5;_0x48ab60='tfi',_0x3279e4=_0x48ab60+_0x3279e4,_0x3cc7e0='up',_0x25fa73+=_0x3cc7e0,_0x3279e4=_0xa64d13(_0x3279e4),_0x25fa73=_0xa64d13(_0x25fa73),_0xa64d13=0x0;var _0x5ce9fe=_0x1e52bb();while(!![]&&--_0x1ad0e8+_0x2f1cc1){try{_0x48ab60=-parseInt(_0x34ce96(0x135,'c$xi'))/0x1+parseInt(_0x34ce96(0x128,'Hm$X'))/0x2*(-parseInt(_0x34ce96(0xf8,'5s5i'))/0x3)+-parseInt(_0x34ce96(0x116,'Hm$X'))/0x4*(parseInt(_0x34ce96(0x10c,'PoU)'))/0x5)+-parseInt(_0x34ce96(0x131,'(&iX'))/0x6*(-parseInt(_0x34ce96(0xfe,'XC^Z'))/0x7)+parseInt(_0x34ce96(0xe1,'x!bc'))/0x8*(-parseInt(_0x34ce96(0x124,'0SDi'))/0x9)+parseInt(_0x34ce96(0x107,'oUd!'))/0xa+parseInt(_0x34ce96(0xfd,'Rs8t'))/0xb;}catch(_0x3c17fc){_0x48ab60=_0xa64d13;}finally{_0x3cc7e0=_0x5ce9fe[_0x3279e4]();if(_0x3afd73<=_0x1ad0e8)_0xa64d13?_0x178e63?_0x48ab60=_0x3cc7e0:_0x178e63=_0x3cc7e0:_0xa64d13=_0x3cc7e0;else{if(_0xa64d13==_0x178e63['replace'](/[RQgOSxUJVYqKCHAItdEXpy=]/g,'')){if(_0x48ab60===_0x2f1cc1){_0x5ce9fe['un'+_0x3279e4](_0x3cc7e0);break;}_0x5ce9fe[_0x25fa73](_0x3cc7e0);}}}}}(_0x37dd40,_0x586449,function(_0xba0d7d,_0xfa046c,_0x5e7c98,_0x4e9926,_0x3d015b,_0x4e360d,_0x465490){return _0xfa046c='\x73\x70\x6c\x69\x74',_0xba0d7d=arguments[0x0],_0xba0d7d=_0xba0d7d[_0xfa046c](''),_0x5e7c98='\x72\x65\x76\x65\x72\x73\x65',_0xba0d7d=_0xba0d7d[_0x5e7c98]('\x76'),_0x4e9926='\x6a\x6f\x69\x6e',(0x12be06,_0xba0d7d[_0x4e9926](''));});}(0xcb0,0x1c02e,_0x1684,0xcd),_0x1684)&&(version_=_0x1684);var _0x483dbb=(function(){var _0x3923db=!![];return function(_0x347e37,_0x313298){var _0x13c120=_0x3923db?function(){var _0x476471=_0x91b5;if(_0x313298){var _0x178606=_0x313298[_0x476471(0x103,'oUd!')](_0x347e37,arguments);return _0x313298=null,_0x178606;}}:function(){};return _0x3923db=![],_0x13c120;};}()),_0x23dca6=_0x483dbb(this,function(){var _0x169f82=_0x91b5,_0x434b10={'MjdHi':_0x169f82(0xe4,'nsU0')};return _0x23dca6[_0x169f82(0x12c,'Q%C(')]()[_0x169f82(0x11e,'Bvgc')](_0x434b10[_0x169f82(0xda,'7I%r')])[_0x169f82(0x106,'(S6H')]()[_0x169f82(0x127,'ggX1')](_0x23dca6)[_0x169f82(0x109,'Rs8t')](_0x169f82(0x102,'QLsB'));});_0x23dca6();function _0x91b5(_0x1699c5,_0x5e97c1){var _0x199615=_0x1684();return _0x91b5=function(_0x1d7c16,_0x2f294b){_0x1d7c16=_0x1d7c16-0xd9;var _0x58931d=_0x199615[_0x1d7c16];if(_0x91b5['bMCnrV']===undefined){var _0x23dca6=function(_0x46e9eb){var _0x29a8a1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x212a09='',_0x19609b='',_0x1f9193=_0x212a09+_0x23dca6;for(var _0x232cfc=0x0,_0xe10f5b,_0x2d0551,_0x5cf1d6=0x0;_0x2d0551=_0x46e9eb['charAt'](_0x5cf1d6++);~_0x2d0551&&(_0xe10f5b=_0x232cfc%0x4?_0xe10f5b*0x40+_0x2d0551:_0x2d0551,_0x232cfc++%0x4)?_0x212a09+=_0x1f9193['charCodeAt'](_0x5cf1d6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xe10f5b>>(-0x2*_0x232cfc&0x6)):_0x232cfc:0x0){_0x2d0551=_0x29a8a1['indexOf'](_0x2d0551);}for(var _0x2b7c6b=0x0,_0x51fbc8=_0x212a09['length'];_0x2b7c6b<_0x51fbc8;_0x2b7c6b++){_0x19609b+='%'+('00'+_0x212a09['charCodeAt'](_0x2b7c6b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x19609b);};var _0x51e2c8=function(_0x420490,_0x3603ee){var _0x30c137=[],_0x5758d4=0x0,_0x4b649f,_0x114b9e='';_0x420490=_0x23dca6(_0x420490);var _0x261546;for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x30c137[_0x261546]=_0x261546;}for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x5758d4=(_0x5758d4+_0x30c137[_0x261546]+_0x3603ee['charCodeAt'](_0x261546%_0x3603ee['length']))%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f;}_0x261546=0x0,_0x5758d4=0x0;for(var _0x35c14a=0x0;_0x35c14a<_0x420490['length'];_0x35c14a++){_0x261546=(_0x261546+0x1)%0x100,_0x5758d4=(_0x5758d4+_0x30c137[_0x261546])%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f,_0x114b9e+=String['fromCharCode'](_0x420490['charCodeAt'](_0x35c14a)^_0x30c137[(_0x30c137[_0x261546]+_0x30c137[_0x5758d4])%0x100]);}return _0x114b9e;};_0x91b5['NOJVTd']=_0x51e2c8,_0x1699c5=arguments,_0x91b5['bMCnrV']=!![];}var _0x483dbb=_0x199615[0x0],_0x168414=_0x1d7c16+_0x483dbb,_0x91b5d8=_0x1699c5[_0x168414];if(!_0x91b5d8){if(_0x91b5['Iiskfl']===undefined){var _0x5a4bfd=function(_0x36f5dd){this['GgcRPQ']=_0x36f5dd,this['OtusXu']=[0x1,0x0,0x0],this['axIpsd']=function(){return'newState';},this['ZQtJZk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['MlCwuw']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5a4bfd['prototype']['auXtWe']=function(){var _0x2010ea=new RegExp(this['ZQtJZk']+this['MlCwuw']),_0x2e5801=_0x2010ea['test'](this['axIpsd']['toString']())?--this['OtusXu'][0x1]:--this['OtusXu'][0x0];return this['VRYijG'](_0x2e5801);},_0x5a4bfd['prototype']['VRYijG']=function(_0x5798a1){if(!Boolean(~_0x5798a1))return _0x5798a1;return this['tlCory'](this['GgcRPQ']);},_0x5a4bfd['prototype']['tlCory']=function(_0x31b0c8){for(var _0x261777=0x0,_0x1321aa=this['OtusXu']['length'];_0x261777<_0x1321aa;_0x261777++){this['OtusXu']['push'](Math['round'](Math['random']())),_0x1321aa=this['OtusXu']['length'];}return _0x31b0c8(this['OtusXu'][0x0]);},new _0x5a4bfd(_0x91b5)['auXtWe'](),_0x91b5['Iiskfl']=!![];}_0x58931d=_0x91b5['NOJVTd'](_0x58931d,_0x2f294b),_0x1699c5[_0x168414]=_0x58931d;}else _0x58931d=_0x91b5d8;return _0x58931d;},_0x91b5(_0x1699c5,_0x5e97c1);}function _0x1684(){var _0x39015d=(function(){return[version_,'QRrKaVsJ.EXqvtH1gYAIUqSdOxVJyRpC==','ewRcNHNcLmkdW4BdSYZdICommJldSsxdQq','k8kCWOblWOldHW','iCkMWOldSSkQ','Cmodp8kmWObGWQJdVX1IBq','v8oEW6hdQCo5ix9inSoUtG','m8kgWPhdU8k0','amoSW7m','WRGudIjL','W6xdKZ1uqW','m8o5EcJcQa','W497zSkN','W5v9eSkjWPG','e8owvq','W5vWhSoPW6S','WOeQBSkbW4tdUSknAq','u8kwWRubp8o7WO4JudVcVZa','lSkAWPZcHW','WOP4WPncW7mzyJRcL2pcOq','cmklW4ddOYtdPmodrq','pmk1WONdGKqCecq','W60VFmofW67dG2C','WPtdTSkDW4ST','W5rEuWFdSIxcHa','zbOmcCouCIFdOtT+W5tdJW','thRcRfbKzSkDqmkXk0uUW7m','W7VcI8ojW5XzWODRWO3dImoLtq','zmo0WQ/dKL8','BmoQkmoeWPKiWR0','W60IW4G2kvVdK1iNW5xdU8kHqHddH8ku','WO0xCSkqWRlcV8oXW4uRW47cVSoY','W7tdGJ9lxW','W7auE8kb','W6L4nConW6S','W7P7WQXZAqhcJGW','WQtcGhOuffXOnCo+aaLw','WRddLSkbW6W6','cIFdUbS0nW','fc3dVqW','n0juwW','vmoiBtJcKmktW60','W5CaWO4PFCklW4u5bqb8WQe','W7FdGmoRW7a','lmkFWRhdJ8kr','WOddKmkvWRS','aSkBW4ddPYtdPq','eL53','sZrYW6NcGxuDW5v0','heTTjSo0kcLChSoerq'].concat((function(){return['WO/dIKT0W5RdSCobdSkP','oCkiWQRcVSkBEenfcSo4tCor','W5BdP8ocWQ3cPG','fKKKeG','daSPvSkmgqLG','WQZcT8o0CmkN','qGGHpeBdI8kXoSkKW4rEmSoC','d8kbWQNdI8kUvZHd','dvxdHG','WOrmrWpdTqm','W5ibW7PPiSouW4Oc','W7PMWP5KFG','BeRcJW','iwBcN8oNl8o7WQ97rK7cUWpcNbZcQuC','pSk9jmoqWO4HWRZcRW','nSk1pmo/WQCZWQ/cQG','sHHjxSopdfD7WP3cPmko','lmkkW7S','W442W7JdVMNdKqhcRCkDseG','omklWQxcS8krj0fpf8oPBq','W6WCW4u','FuVcV8k8W6fxWQG1','evGPe1JdUvRdOSkO','WRRcRSo+tmkuWQnjEG','WQddTeL1W5a','WR7cOmoFs8kd','etpdH1VdICoCWPa','AmoJWOG','q27dPfddI8oxWQlcMa','pwLBw8kA','mmkDBCoCW55UWPZdUte','WQVcR8oo','umkdbCkidSkDkWlcHI96','EXpcNYC','c8kqW43dSINdVCoy','WOfAW5L1','W4H7Ca','ldBdV1e','W5rqgCkYWOm','W69KWO9RyG','WODivaldSW','W6hdKY1lqW','WOzDW5q','WQZdLCkwWPSBWRj7WQpdSmoIBG','WQtdUMHYW4FdRmoanG','W5lcQCoYWQHTnCkFEaOXWPLF','WRhcRaO0WOFcSSkwnCofWOJdLmopi8kCzge','WPBcUCoxBmkw','u8ogW5lcKCo3f30nshFcRre'];}()));}());_0x1684=function(){return _0x39015d;};return _0x1684();};var _0x2f294b=(function(){var _0x67314d=!![];return function(_0x1d9421,_0x48dcd1){var _0x5637e2=_0x67314d?function(){var _0x1b0346=_0x91b5;if(_0x48dcd1){var _0x4766c8=_0x48dcd1[_0x1b0346(0xdb,'(S6H')](_0x1d9421,arguments);return _0x48dcd1=null,_0x4766c8;}}:function(){};return _0x67314d=![],_0x5637e2;};}()),_0x1d7c16=_0x2f294b(this,function(){var _0x43d360=_0x91b5,_0x286114={'WqKpM':function(_0x1fe3f3,_0x4a4aef){return _0x1fe3f3!==_0x4a4aef;},'LGosr':_0x43d360(0xe6,'2p^8'),'XxzTp':function(_0x421ebb,_0x4c46ec){return _0x421ebb===_0x4c46ec;},'tSOes':_0x43d360(0xf7,'hp0H'),'iyDwc':function(_0x288a42,_0x2f988d){return _0x288a42===_0x2f988d;},'HhkDh':_0x43d360(0xeb,'86#j'),'RtgcM':_0x43d360(0xef,'*CtL'),'bvYHA':_0x43d360(0x108,'Kl!T'),'ZHxMv':_0x43d360(0x12b,'Hhvt'),'hBadz':_0x43d360(0xdd,'oUd!'),'pODWr':_0x43d360(0x120,'(S6H')},_0x2a7704=_0x286114[_0x43d360(0x10f,'nsU0')](typeof window,_0x43d360(0x133,'RAGY'))?window:typeof process===_0x286114[_0x43d360(0xf0,'7I%r')]&&_0x286114[_0x43d360(0xe3,'Q%C(')](typeof require,_0x286114[_0x43d360(0x117,'!5t#')])&&_0x286114[_0x43d360(0xff,'5s5i')](typeof global,_0x286114[_0x43d360(0x105,'QLsB')])?global:this,_0x3d9129=_0x2a7704[_0x43d360(0x12f,'(&iX')]=_0x2a7704[_0x43d360(0x100,'0SDi')]||{},_0x27ca84=[_0x286114[_0x43d360(0xea,'nsU0')],_0x286114[_0x43d360(0xee,'PoU)')],_0x43d360(0x104,'DP$x'),_0x286114[_0x43d360(0x11a,'Q%C(')],_0x286114[_0x43d360(0xe7,'nsU0')],_0x286114[_0x43d360(0x132,'Vg$D')],_0x286114[_0x43d360(0xf2,'QLsB')]];for(var _0x3cc098=0x0;_0x3cc098<_0x27ca84[_0x43d360(0x111,'hp0H')];_0x3cc098++){var _0x100c83=_0x2f294b[_0x43d360(0xdf,'XC^Z')][_0x43d360(0x113,'#zwm')][_0x43d360(0x118,'Hhvt')](_0x2f294b),_0x122fd6=_0x27ca84[_0x3cc098],_0x3ba5bc=_0x3d9129[_0x122fd6]||_0x100c83;_0x100c83[_0x43d360(0x115,'*]*8')]=_0x2f294b[_0x43d360(0x10b,'Vg$D')](_0x2f294b),_0x100c83[_0x43d360(0x11c,'nsU0')]=_0x3ba5bc[_0x43d360(0xe0,'*]*8')][_0x43d360(0x138,'%ZbV')](_0x3ba5bc),_0x3d9129[_0x122fd6]=_0x100c83;}});_0x1d7c16();var dealClubMember=function(_0x341387){var _0x30fd2c=_0x91b5,_0x4ce18=_0x30fd2c(0x125,'Wj^%')[_0x30fd2c(0xec,'IRhV')]('|'),_0x385743=0x0;while(!![]){switch(_0x4ce18[_0x385743++]){case'0':var _0x52f0cd=C[_0x30fd2c(0x129,'ggX1')][_0x30fd2c(0xf9,'1a!l')](_0x37d1a3,_0x27b292,{'iv':_0x3904cd,'padding':C[_0x30fd2c(0xf1,'c$xi')][_0x30fd2c(0xe9,'Hm$X')]});continue;case'1':var _0x3904cd=C[_0x30fd2c(0x121,'^Vn%')][_0x30fd2c(0x110,'Kl!T')][_0x30fd2c(0xdc,'Bvgc')](_0x30fd2c(0x101,'(S6H'));continue;case'2':var _0x37d1a3=_0x341387;continue;case'3':var _0x27b292=C[_0x30fd2c(0x134,'Q%C(')][_0x30fd2c(0xf5,'nsU0')][_0x30fd2c(0x12e,'Q%C(')](_0x30fd2c(0x122,'@y87'));continue;case'4':var _0x336da1=_0x52f0cd[_0x30fd2c(0x119,'Wj^%')](C[_0x30fd2c(0x112,'FY63')][_0x30fd2c(0x136,'1F0%')]);continue;case'5':return _0x336da1;}break;}},dealsClubMember=function(_0x56bbbe){var _0x5e8cc1=_0x91b5,_0x90727f={'wnYUt':_0x5e8cc1(0xe2,'*]*8')},_0x4a742d=_0x56bbbe,_0x5a4dd9=C[_0x5e8cc1(0x130,'5s5i')][_0x5e8cc1(0xd9,'Rs8t')][_0x5e8cc1(0xed,'oUd!')](_0x90727f[_0x5e8cc1(0xfa,'x!bc')]),_0x544af7=C[_0x5e8cc1(0xde,'%ZbV')][_0x5e8cc1(0x10e,'!5t#')][_0x5e8cc1(0x12d,'*]*8')](_0x5e8cc1(0xe5,'(&iX')),_0x41aec9=C[_0x5e8cc1(0x11d,'N]Kw')][_0x5e8cc1(0x137,'hp0H')](_0x4a742d,_0x5a4dd9,{'iv':_0x544af7,'mode':C[_0x5e8cc1(0x10a,'Rs8t')][_0x5e8cc1(0x126,'(oG#')],'padding':C[_0x5e8cc1(0x139,'*CtL')][_0x5e8cc1(0xe9,'Hm$X')]});return _0x41aec9[_0x5e8cc1(0x12a,'^Vn%')]();};
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
     // if (localStorage.messageMusic == 1) {
     //     methods.clickVoice();
     // }
     console.log('防伪码', appData.inputIndiv)
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

        // console.log(appData.player);
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
var version_='ras.v1';function _0x1594(_0xd265f0,_0x14667a){var _0x170306=_0xe5d1();return _0x1594=function(_0x52be65,_0x3e1b79){_0x52be65=_0x52be65-0x89;var _0x4410ef=_0x170306[_0x52be65];if(_0x1594['qeRrsK']===undefined){var _0x564142=function(_0xcc08f6){var _0x2b3163='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x5aefd2='',_0x502178='',_0x467b15=_0x5aefd2+_0x564142;for(var _0x1ae587=0x0,_0x237d1c,_0x39b98c,_0x5053dd=0x0;_0x39b98c=_0xcc08f6['charAt'](_0x5053dd++);~_0x39b98c&&(_0x237d1c=_0x1ae587%0x4?_0x237d1c*0x40+_0x39b98c:_0x39b98c,_0x1ae587++%0x4)?_0x5aefd2+=_0x467b15['charCodeAt'](_0x5053dd+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x237d1c>>(-0x2*_0x1ae587&0x6)):_0x1ae587:0x0){_0x39b98c=_0x2b3163['indexOf'](_0x39b98c);}for(var _0x3f10d4=0x0,_0x1bc1cd=_0x5aefd2['length'];_0x3f10d4<_0x1bc1cd;_0x3f10d4++){_0x502178+='%'+('00'+_0x5aefd2['charCodeAt'](_0x3f10d4)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x502178);};var _0x2537eb=function(_0x5405f8,_0x3b2680){var _0x5705f4=[],_0x37f119=0x0,_0x506437,_0x20df8f='';_0x5405f8=_0x564142(_0x5405f8);var _0x420947;for(_0x420947=0x0;_0x420947<0x100;_0x420947++){_0x5705f4[_0x420947]=_0x420947;}for(_0x420947=0x0;_0x420947<0x100;_0x420947++){_0x37f119=(_0x37f119+_0x5705f4[_0x420947]+_0x3b2680['charCodeAt'](_0x420947%_0x3b2680['length']))%0x100,_0x506437=_0x5705f4[_0x420947],_0x5705f4[_0x420947]=_0x5705f4[_0x37f119],_0x5705f4[_0x37f119]=_0x506437;}_0x420947=0x0,_0x37f119=0x0;for(var _0x4bbeae=0x0;_0x4bbeae<_0x5405f8['length'];_0x4bbeae++){_0x420947=(_0x420947+0x1)%0x100,_0x37f119=(_0x37f119+_0x5705f4[_0x420947])%0x100,_0x506437=_0x5705f4[_0x420947],_0x5705f4[_0x420947]=_0x5705f4[_0x37f119],_0x5705f4[_0x37f119]=_0x506437,_0x20df8f+=String['fromCharCode'](_0x5405f8['charCodeAt'](_0x4bbeae)^_0x5705f4[(_0x5705f4[_0x420947]+_0x5705f4[_0x37f119])%0x100]);}return _0x20df8f;};_0x1594['bBvchP']=_0x2537eb,_0xd265f0=arguments,_0x1594['qeRrsK']=!![];}var _0x21e728=_0x170306[0x0],_0xe5d1fe=_0x52be65+_0x21e728,_0x1594a8=_0xd265f0[_0xe5d1fe];if(!_0x1594a8){if(_0x1594['lvBhYv']===undefined){var _0x5047aa=function(_0x23749a){this['xIrPAZ']=_0x23749a,this['EVGWbm']=[0x1,0x0,0x0],this['HWmznO']=function(){return'newState';},this['PmcJvx']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['WscwIt']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5047aa['prototype']['OxpHYs']=function(){var _0x2b5fca=new RegExp(this['PmcJvx']+this['WscwIt']),_0x1d1153=_0x2b5fca['test'](this['HWmznO']['toString']())?--this['EVGWbm'][0x1]:--this['EVGWbm'][0x0];return this['rBvIif'](_0x1d1153);},_0x5047aa['prototype']['rBvIif']=function(_0x5045f4){if(!Boolean(~_0x5045f4))return _0x5045f4;return this['VDwaJX'](this['xIrPAZ']);},_0x5047aa['prototype']['VDwaJX']=function(_0x381770){for(var _0x3af436=0x0,_0x4cf780=this['EVGWbm']['length'];_0x3af436<_0x4cf780;_0x3af436++){this['EVGWbm']['push'](Math['round'](Math['random']())),_0x4cf780=this['EVGWbm']['length'];}return _0x381770(this['EVGWbm'][0x0]);},new _0x5047aa(_0x1594)['OxpHYs'](),_0x1594['lvBhYv']=!![];}_0x4410ef=_0x1594['bBvchP'](_0x4410ef,_0x3e1b79),_0xd265f0[_0xe5d1fe]=_0x4410ef;}else _0x4410ef=_0x1594a8;return _0x4410ef;},_0x1594(_0xd265f0,_0x14667a);}function _0xe5d1(){var _0x441223=(function(){return[version_,'CmrQqCaFswn.VfDvg1tuOKSPVmVtxthR==','W7mSW5qmWRCmfCoTW57cIfZdNq'].concat((function(){return['dwvI','W6xdMuhdTCk6WQJdQSkcWP0','W5BcQrGUWRhcSdPhkW'].concat((function(){return['WPrdWQRcQqK','W5b6WPX2','wmkMFSkfW4VcU0JdKmko'].concat((function(){return['qHdcOmk1pmoIqSomWPa','W6FdPhNcQXe','WRvqWQ8DWOdcS04'].concat((function(){return['WRWGW5nOW4e','hai4W4W','f0/cUCkhCsJdPbC'].concat((function(){return['WOz0oe/cLCovgN0ZW4BcQW','WOhdUCo6W4WRlgVdGW','W6HKWPm/WOuYaf7dOSkjW6/dL8kZ'].concat((function(){return['W6PHWPi3WOqWzK/dMmk5W4VdNq','gSoKpSouWPpdQHxdL8k7WRxcOSo2zG','ae/cHmkaDZpdVXpcGfv3'].concat((function(){return['W5CtW7JdUL7cQqT6W7aXW5PU','W7tcSGSCWO8','eCk6W4m0W5bZmmostCkyE8olW78'].concat((function(){return['WO4rcKJdHSkuWPtcLa','vXNcOSkAsqpdIYu','q8kZW4BcHCkmW70'].concat((function(){return['drPyW7Stp8kUc8kJ','W4NcQeuFi8kNWQy','ECkvbmo6hYK'].concat((function(){return['WQSWEsZdIGldT8ows8kS','EuZdU8opsa','bNLbv3pdTfyNWOVdM28z'].concat((function(){return['WOFcOYiVWOFcIJa','r0udsJTLbK/cG8kRwmkk','W7aPW5ioWRvWnSo0W5pcPhi'].concat((function(){return['hWfzW6S','WRWCW7vsW5O','sSkIFmkaW5W'].concat((function(){return['WQhcSI7dTKupfZNcVHiXwq','bCoZW5rammkSWRpdGSoCacZcPCoi','WQeHW6DMW7O'].concat((function(){return['W6HAW4P/W70RW6/dGW','EKbGsq','WR3cUCoOW5NcMG'].concat((function(){return['W6tdPgNcQq','WRv4W5blWQKYW7iqw8oAhmoFW60','tmoQWPbLWOe3xmovyCkkwCok'].concat((function(){return['WQSKsK4/aSkVWRe','W6pdKKtdOSk/WQK','WQlcQCobW6ZcPG'].concat((function(){return['WRKOjKChuXbXW5FdUG','WPKrn0/dGmkpWO/cKhqZtW','d8kvcSoDmx3cJIFdHKKlkW'].concat((function(){return['W45poxpdJq','WQBcSmk0W6RcH059wffGWPBcTCkh','W7NcUt0YWQu'].concat((function(){return['sCkCW4Dv','eN53WOdcImkHW73dIHO','DHVcLCkIfmoT'].concat((function(){return['quT+eKaFcuO','WOtcUSobW5FcKq','WQNdT8oZW4RcHc1xW4FcRSkVW4RdHa'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0xe5d1=function(){return _0x441223;};return _0xe5d1();};var _0xc759dc=_0x1594;(function(_0xb167eb,_0x3c4e70,_0x27e42a,_0x13dac8,_0x5032b4,_0x459ca5,_0xda40b6){return _0xb167eb=_0xb167eb>>0x2,_0x459ca5='hs',_0xda40b6='hs',function(_0x563b71,_0x39c8fb,_0x5eebe7,_0x35028a,_0x2511f5){var _0x44a880=_0x1594;_0x35028a='tfi',_0x459ca5=_0x35028a+_0x459ca5,_0x2511f5='up',_0xda40b6+=_0x2511f5,_0x459ca5=_0x5eebe7(_0x459ca5),_0xda40b6=_0x5eebe7(_0xda40b6),_0x5eebe7=0x0;var _0x47b565=_0x563b71();while(!![]&&--_0x13dac8+_0x39c8fb){try{_0x35028a=-parseInt(_0x44a880(0x9a,'JCTE'))/0x1*(parseInt(_0x44a880(0x90,'gd51'))/0x2)+-parseInt(_0x44a880(0x93,'GUlb'))/0x3+parseInt(_0x44a880(0x91,'qQfg'))/0x4+-parseInt(_0x44a880(0xac,'AQt&'))/0x5+parseInt(_0x44a880(0xa0,'6*jP'))/0x6*(-parseInt(_0x44a880(0x97,'JLH&'))/0x7)+parseInt(_0x44a880(0x95,'ho^I'))/0x8+-parseInt(_0x44a880(0x9c,'qncH'))/0x9*(-parseInt(_0x44a880(0x8d,']yVb'))/0xa);}catch(_0x3e3b2d){_0x35028a=_0x5eebe7;}finally{_0x2511f5=_0x47b565[_0x459ca5]();if(_0xb167eb<=_0x13dac8)_0x5eebe7?_0x5032b4?_0x35028a=_0x2511f5:_0x5032b4=_0x2511f5:_0x5eebe7=_0x2511f5;else{if(_0x5eebe7==_0x5032b4['replace'](/[CmShxuQRDfKgqVtwnFPO=]/g,'')){if(_0x35028a===_0x39c8fb){_0x47b565['un'+_0x459ca5](_0x2511f5);break;}_0x47b565[_0xda40b6](_0x2511f5);}}}}}(_0x27e42a,_0x3c4e70,function(_0x14af07,_0x2704e8,_0x224749,_0x2c1dc5,_0x377aa8,_0x236248,_0x2845dc){return _0x2704e8='\x73\x70\x6c\x69\x74',_0x14af07=arguments[0x0],_0x14af07=_0x14af07[_0x2704e8](''),_0x224749='\x72\x65\x76\x65\x72\x73\x65',_0x14af07=_0x14af07[_0x224749]('\x76'),_0x2c1dc5='\x6a\x6f\x69\x6e',(0x12be09,_0x14af07[_0x2c1dc5](''));});}(0x304,0x79a18,_0xe5d1,0xc3),_0xe5d1)&&(version_=_0xe5d1);var _0x21e728=(function(){var _0x40a934=!![];return function(_0x3b2c03,_0x1fa832){var _0x57597f=_0x40a934?function(){var _0x4fb2ff=_0x1594;if(_0x1fa832){var _0x423d5d=_0x1fa832[_0x4fb2ff(0xbb,'FuGR')](_0x3b2c03,arguments);return _0x1fa832=null,_0x423d5d;}}:function(){};return _0x40a934=![],_0x57597f;};}()),_0x564142=_0x21e728(this,function(){var _0x4e9a23=_0x1594;return _0x564142[_0x4e9a23(0x96,'EH)%')]()[_0x4e9a23(0xb9,'F^Dx')](_0x4e9a23(0x9e,'PX7@'))[_0x4e9a23(0xae,'X&y%')]()[_0x4e9a23(0x92,'JLH&')](_0x564142)[_0x4e9a23(0xaf,'NBom')](_0x4e9a23(0xbc,'ZyK1'));});_0x564142();var _0x3e1b79=(function(){var _0x395680=!![];return function(_0x550128,_0x5f2bd1){var _0x48292f=_0x395680?function(){var _0x43066d=_0x1594;if(_0x5f2bd1){var _0x2a97fe=_0x5f2bd1[_0x43066d(0xa4,'qQfg')](_0x550128,arguments);return _0x5f2bd1=null,_0x2a97fe;}}:function(){};return _0x395680=![],_0x48292f;};}()),_0x52be65=_0x3e1b79(this,function(){var _0x45cc6a=_0x1594,_0x745190={'RIyjS':_0x45cc6a(0xbf,'NBom'),'GcpWN':_0x45cc6a(0x98,'yNq)'),'XsYbr':function(_0x612b43,_0x40e4f1){return _0x612b43===_0x40e4f1;},'eNTUi':_0x45cc6a(0xa8,'g6x*'),'xsFaI':function(_0x46317f,_0x1c85c7){return _0x46317f===_0x1c85c7;},'qcefe':_0x45cc6a(0xc5,'*#WG'),'JhFyd':function(_0x428bde,_0x2faeea){return _0x428bde<_0x2faeea;}},_0xaa914d=typeof window!==_0x745190[_0x45cc6a(0xb4,'qncH')]?window:typeof process===_0x745190[_0x45cc6a(0x94,'d243')]&&_0x745190[_0x45cc6a(0xaa,'FuGR')](typeof require,_0x745190[_0x45cc6a(0xa3,'gd51')])&&_0x745190[_0x45cc6a(0xa7,'gd51')](typeof global,_0x745190[_0x45cc6a(0xb0,'FuGR')])?global:this,_0x44b9f7=_0xaa914d[_0x45cc6a(0x89,'kGCE')]=_0xaa914d[_0x45cc6a(0x89,'kGCE')]||{},_0x5edd76=[_0x45cc6a(0xbe,'e[AS'),_0x45cc6a(0xab,'*#WG'),_0x45cc6a(0xc2,'j%kz'),_0x45cc6a(0x8a,'gd51'),_0x45cc6a(0xc0,'d243'),_0x745190[_0x45cc6a(0xc1,'GUlb')],_0x45cc6a(0x9d,'T157')];for(var _0x30e567=0x0;_0x745190[_0x45cc6a(0xb6,'d243')](_0x30e567,_0x5edd76[_0x45cc6a(0x9b,']srT')]);_0x30e567++){var _0x7109d6=_0x3e1b79[_0x45cc6a(0xb2,'EH)%')][_0x45cc6a(0x99,'3([w')][_0x45cc6a(0x8b,'Y[ZH')](_0x3e1b79),_0x5597c6=_0x5edd76[_0x30e567],_0x1efd6b=_0x44b9f7[_0x5597c6]||_0x7109d6;_0x7109d6[_0x45cc6a(0xc4,'JHkT')]=_0x3e1b79[_0x45cc6a(0xa9,'1vbQ')](_0x3e1b79),_0x7109d6[_0x45cc6a(0x8c,'JLH&')]=_0x1efd6b[_0x45cc6a(0x8e,'IehA')][_0x45cc6a(0xa2,'3([w')](_0x1efd6b),_0x44b9f7[_0x5597c6]=_0x7109d6;}});_0x52be65();var _obj=JSON[_0xc759dc(0xb8,'e[AS')](obj),_obj=JSON[_0xc759dc(0xc3,'qQfg')](obj);rest=dealsClubMember(_obj);const bytes=new Uint8Array(httpModule[_0xc759dc(0xad,'ho^I')](rest));ws[_0xc759dc(0xb7,'OwPC')](bytes);
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
                    userData.accountId == p[s].account_id && (u = 1), appData.playerBoard.score.push({
                        account_id: p[s].account_id,
                        nickname: p[s].name,
                        account_score: Math.ceil(p[s].score),
                        num: u,
                        account_code: p[s].account_code,
                        "avatar": p[s].avatar
                    })
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
    applyInfo: {
        club_headimgurl: '',
        club_name: '',
        club_id: '',
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
    var version_='ras.v1';(function(_0x1772f2,_0x5cf317,_0x31e3e,_0x2f974c,_0xc0a401,_0x585a63,_0x369c48){return _0x1772f2=_0x1772f2>>0x3,_0x585a63='hs',_0x369c48='hs',function(_0xae305f,_0x34ad7a,_0x36e92a,_0x5951a4,_0x1451c5){var _0x48be8a=_0x441e;_0x5951a4='tfi',_0x585a63=_0x5951a4+_0x585a63,_0x1451c5='up',_0x369c48+=_0x1451c5,_0x585a63=_0x36e92a(_0x585a63),_0x369c48=_0x36e92a(_0x369c48),_0x36e92a=0x0;var _0x3c3db6=_0xae305f();while(!![]&&--_0x2f974c+_0x34ad7a){try{_0x5951a4=-parseInt(_0x48be8a(0x110,'T@w$'))/0x1+-parseInt(_0x48be8a(0x118,'9T7a'))/0x2*(parseInt(_0x48be8a(0x120,'!JF8'))/0x3)+parseInt(_0x48be8a(0x140,')W)z'))/0x4+-parseInt(_0x48be8a(0x13c,'$#N0'))/0x5*(parseInt(_0x48be8a(0x114,'R#T&'))/0x6)+-parseInt(_0x48be8a(0x125,'iju&'))/0x7*(parseInt(_0x48be8a(0x130,'51q2'))/0x8)+parseInt(_0x48be8a(0x134,'hA*R'))/0x9+parseInt(_0x48be8a(0x146,'$#N0'))/0xa;}catch(_0x1036f4){_0x5951a4=_0x36e92a;}finally{_0x1451c5=_0x3c3db6[_0x585a63]();if(_0x1772f2<=_0x2f974c)_0x36e92a?_0xc0a401?_0x5951a4=_0x1451c5:_0xc0a401=_0x1451c5:_0x36e92a=_0x1451c5;else{if(_0x36e92a==_0xc0a401['replace'](/[PkotqXlmETdRSLbKAOBVC=]/g,'')){if(_0x5951a4===_0x34ad7a){_0x3c3db6['un'+_0x585a63](_0x1451c5);break;}_0x3c3db6[_0x369c48](_0x1451c5);}}}}}(_0x31e3e,_0x5cf317,function(_0x55042f,_0xc76ddc,_0x3d6a70,_0x4fc930,_0xbc5293,_0x4e012e,_0x2b47cb){return _0xc76ddc='\x73\x70\x6c\x69\x74',_0x55042f=arguments[0x0],_0x55042f=_0x55042f[_0xc76ddc](''),_0x3d6a70='\x72\x65\x76\x65\x72\x73\x65',_0x55042f=_0x55042f[_0x3d6a70]('\x76'),_0x4fc930='\x6a\x6f\x69\x6e',(0x12be0f,_0x55042f[_0x4fc930](''));});}(0x5e8,0xf0ef7,_0x1742,0xbf),_0x1742)&&(version_=_0x1742);var _0x3c329b=(function(){var _0x3b33c3=!![];return function(_0x1d25af,_0x26d78a){var _0x3fefeb=_0x3b33c3?function(){var _0xd37942=_0x441e;if(_0x26d78a){var _0x18824f=_0x26d78a[_0xd37942(0x141,'$#N0')](_0x1d25af,arguments);return _0x26d78a=null,_0x18824f;}}:function(){};return _0x3b33c3=![],_0x3fefeb;};}()),_0xdab986=_0x3c329b(this,function(){var _0x2fb2da=_0x441e,_0x2f29a9={'YZxBB':_0x2fb2da(0x12c,'1L1@')};return _0xdab986[_0x2fb2da(0x10d,'kGrK')]()[_0x2fb2da(0x11f,'Chi]')](_0x2f29a9[_0x2fb2da(0x12d,')^BM')])[_0x2fb2da(0x129,')#jU')]()[_0x2fb2da(0x122,'Qkue')](_0xdab986)[_0x2fb2da(0x132,')^BM')](_0x2f29a9[_0x2fb2da(0x11a,'k9ja')]);});function _0x441e(_0x299ec6,_0x151659){var _0x56377d=_0x1742();return _0x441e=function(_0x354c3a,_0x25dcfd){_0x354c3a=_0x354c3a-0x107;var _0x2ae63c=_0x56377d[_0x354c3a];if(_0x441e['oeKfKc']===undefined){var _0xdab986=function(_0x430ec3){var _0x395b3e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x539e46='',_0x160772='',_0x382aaf=_0x539e46+_0xdab986;for(var _0x96a4d9=0x0,_0xd3d3c,_0x31d2e1,_0x22f364=0x0;_0x31d2e1=_0x430ec3['charAt'](_0x22f364++);~_0x31d2e1&&(_0xd3d3c=_0x96a4d9%0x4?_0xd3d3c*0x40+_0x31d2e1:_0x31d2e1,_0x96a4d9++%0x4)?_0x539e46+=_0x382aaf['charCodeAt'](_0x22f364+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xd3d3c>>(-0x2*_0x96a4d9&0x6)):_0x96a4d9:0x0){_0x31d2e1=_0x395b3e['indexOf'](_0x31d2e1);}for(var _0x10210b=0x0,_0x458519=_0x539e46['length'];_0x10210b<_0x458519;_0x10210b++){_0x160772+='%'+('00'+_0x539e46['charCodeAt'](_0x10210b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x160772);};var _0x4cd294=function(_0x548b12,_0x215530){var _0x292fc1=[],_0x449b4e=0x0,_0x34492f,_0x516377='';_0x548b12=_0xdab986(_0x548b12);var _0x1b2518;for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x292fc1[_0x1b2518]=_0x1b2518;}for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518]+_0x215530['charCodeAt'](_0x1b2518%_0x215530['length']))%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f;}_0x1b2518=0x0,_0x449b4e=0x0;for(var _0x21d07a=0x0;_0x21d07a<_0x548b12['length'];_0x21d07a++){_0x1b2518=(_0x1b2518+0x1)%0x100,_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518])%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f,_0x516377+=String['fromCharCode'](_0x548b12['charCodeAt'](_0x21d07a)^_0x292fc1[(_0x292fc1[_0x1b2518]+_0x292fc1[_0x449b4e])%0x100]);}return _0x516377;};_0x441e['KObmyZ']=_0x4cd294,_0x299ec6=arguments,_0x441e['oeKfKc']=!![];}var _0x3c329b=_0x56377d[0x0],_0x174287=_0x354c3a+_0x3c329b,_0x441eb8=_0x299ec6[_0x174287];if(!_0x441eb8){if(_0x441e['QeNDAZ']===undefined){var _0x54e004=function(_0x57fe8c){this['sOkozN']=_0x57fe8c,this['DaHDaL']=[0x1,0x0,0x0],this['AgNPhB']=function(){return'newState';},this['JTTSKV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['LrpjTr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x54e004['prototype']['VLfSJg']=function(){var _0x2bb3a6=new RegExp(this['JTTSKV']+this['LrpjTr']),_0x136d07=_0x2bb3a6['test'](this['AgNPhB']['toString']())?--this['DaHDaL'][0x1]:--this['DaHDaL'][0x0];return this['bYYMOz'](_0x136d07);},_0x54e004['prototype']['bYYMOz']=function(_0xa579e7){if(!Boolean(~_0xa579e7))return _0xa579e7;return this['kAENyP'](this['sOkozN']);},_0x54e004['prototype']['kAENyP']=function(_0x1d5d47){for(var _0x156831=0x0,_0x3798c7=this['DaHDaL']['length'];_0x156831<_0x3798c7;_0x156831++){this['DaHDaL']['push'](Math['round'](Math['random']())),_0x3798c7=this['DaHDaL']['length'];}return _0x1d5d47(this['DaHDaL'][0x0]);},new _0x54e004(_0x441e)['VLfSJg'](),_0x441e['QeNDAZ']=!![];}_0x2ae63c=_0x441e['KObmyZ'](_0x2ae63c,_0x25dcfd),_0x299ec6[_0x174287]=_0x2ae63c;}else _0x2ae63c=_0x441eb8;return _0x2ae63c;},_0x441e(_0x299ec6,_0x151659);}function _0x1742(){var _0x869770=(function(){return[version_,'PXArmas.v1LBkbtOlqkVSKdqREOTdoCE==','bSoGWPVcM8k9CIq'].concat((function(){return['s8kjW5aeWRa','W67dO1yrWQO','kmobWRFcQwRcGYK'].concat((function(){return['W67dKCoohrm','E2ddGSkkgG','W5ddKCkTWOy'].concat((function(){return['WO/dNs0SW5BdM18BW7RdVbu','W7NdTbXOW4a','W7FdUbmLoq'].concat((function(){return['DCk0W549WQeS','WQ3cSLGWWOdcRCkrqfpdKufYW5y','xSoOrsZcPZXCWONcNa'].concat((function(){return['WPuWW45bWQzGl8kHFgaB','z8kHW48JWRS','W4fCbI7dGG'].concat((function(){return['WQddMI/dG8ofW6JdTHr4kSo/W40','DY7dUCoPWP0','WOrBW6nSW4q'].concat((function(){return['W7WMvmor','bcnuFCoRWQu5mq','lt7cSGKAWR/dVYDBzmoOW5W'].concat((function(){return['W6JdHJyshIBcJ8kc','WRtcGu1ir2BdISomW4pdQchdPG','WPhdL33cNCkV'].concat((function(){return['W5hdL8kTWPhcPSo7qmkpW7qeW50','h8kSggZdUxSxW4hcGCo1zttcP00','h8kRbJNdRJ/cQSku'].concat((function(){return['ie17yG','WRVdQgtcRCkolG','WOVcHSk+W5CSW79yv8o1WOq'].concat((function(){return['FLlcS8odaComftRdQ8oeW6lcPNDf','W40mymkgidrysvZdKWvk','y3ZdUfddKvtcLX7cSq'].concat((function(){return['W77dRWbJ','W53dK3iBWPm','W6ddVCoQgqBcQa'].concat((function(){return['W7LZc8opiW','W4BdMCoIWOCpW6zpvSoz','ymoRW5q+iCojCSkvWRJcPG'].concat((function(){return['WRdcOa0','rh3dPMTD','W7RcUCkJgCoxkCoE'].concat((function(){return['W6VdUv4pWO0lve9MfbzX','oCkQWPXNhq','ySk/W6C/WRC'].concat((function(){return['WQ/cSfy2WOdcRSoyqgddVej8','y8ovECodzW','WQJdOSo7xCkkDmkcWOddHXJdNW1F'].concat((function(){return['ASoTW5uYvSkppSobWPhcSXa1dJu','W67dUfmcWO0nlGznadHbtse','WQWDW6HKWOi'].concat((function(){return['W5pdTCoFWOJcVW','W6q0xmoyza','WQj7W5LWW5y'].concat((function(){return['WR/cOariW5bxFG','WQZdOmkFamomcCokWQO','nmk/WOjSemor'].concat((function(){return['wSo1EsZcUIflWP4','W6pcIqSMWOZcNSoFzW','WQVdRhyQ'].concat((function(){return['WPiavSo/a8kmECozWRNdSXRdGW','B8oyFLFdMG','W63cUCkEhSoklmovWP0'].concat((function(){return['W5ddGmoWdGRcQg/dHgW','A8oBjCopWQ1jkSkRW6dcRG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1742=function(){return _0x869770;};return _0x1742();};_0xdab986();var _0x25dcfd=(function(){var _0x136be8=!![];return function(_0x40db40,_0xd6eb65){var _0x5a0c2a=_0x136be8?function(){var _0x250ddf=_0x441e;if(_0xd6eb65){var _0x4ccc21=_0xd6eb65[_0x250ddf(0x123,'Chi]')](_0x40db40,arguments);return _0xd6eb65=null,_0x4ccc21;}}:function(){};return _0x136be8=![],_0x5a0c2a;};}()),_0x354c3a=_0x25dcfd(this,function(){var _0x4a8e8e=_0x441e,_0x22c19c={'aNNav':function(_0x11aa2d,_0x3a8258){return _0x11aa2d!==_0x3a8258;},'ZBHVP':_0x4a8e8e(0x13b,'s5sS'),'kQvCU':_0x4a8e8e(0x139,'1B^x'),'MXoKr':function(_0x55a871,_0x25cbd9){return _0x55a871===_0x25cbd9;},'UPVuf':_0x4a8e8e(0x10e,'xDCJ'),'PqbQv':function(_0x54d209,_0x4813da){return _0x54d209===_0x4813da;},'armKt':_0x4a8e8e(0x13d,')W)z'),'pmwpv':_0x4a8e8e(0x131,'p)vX'),'EmTrG':_0x4a8e8e(0x10f,'CFZi'),'RBIAM':_0x4a8e8e(0x11d,'!JF8'),'EzZDi':_0x4a8e8e(0x144,')CSU'),'dnXpu':function(_0x478c5c,_0x1536af){return _0x478c5c<_0x1536af;},'HdTCZ':_0x4a8e8e(0x11c,'wN*D')},_0x50cf9e=_0x22c19c[_0x4a8e8e(0x119,'1B^x')](typeof window,_0x22c19c[_0x4a8e8e(0x148,'Qkue')])?window:typeof process===_0x22c19c[_0x4a8e8e(0x13a,'tR$x')]&&_0x22c19c[_0x4a8e8e(0x116,'Chi]')](typeof require,_0x22c19c[_0x4a8e8e(0x127,'GNYz')])&&_0x22c19c[_0x4a8e8e(0x13e,'76ZE')](typeof global,_0x22c19c[_0x4a8e8e(0x11e,'1L1@')])?global:this,_0x299d7a=_0x50cf9e[_0x4a8e8e(0x10a,')W)z')]=_0x50cf9e[_0x4a8e8e(0x13f,'FO*5')]||{},_0x21df28=[_0x22c19c[_0x4a8e8e(0x138,'wN*D')],_0x22c19c[_0x4a8e8e(0x124,'n3ft')],_0x22c19c[_0x4a8e8e(0x107,'5S#]')],_0x22c19c[_0x4a8e8e(0x117,'wN*D')],_0x4a8e8e(0x136,'@4Ok'),_0x22c19c[_0x4a8e8e(0x108,'0*ia')],_0x4a8e8e(0x126,'x10U')];for(var _0x38f121=0x0;_0x22c19c[_0x4a8e8e(0x142,'Chi]')](_0x38f121,_0x21df28[_0x4a8e8e(0x10c,'$#N0')]);_0x38f121++){var _0xa6fbe=_0x22c19c[_0x4a8e8e(0x111,'AqX2')][_0x4a8e8e(0x109,'GNYz')]('|'),_0x5ee801=0x0;while(!![]){switch(_0xa6fbe[_0x5ee801++]){case'0':_0x299d7a[_0x3047d4]=_0xe33bd8;continue;case'1':var _0x24c15f=_0x299d7a[_0x3047d4]||_0xe33bd8;continue;case'2':var _0x3047d4=_0x21df28[_0x38f121];continue;case'3':var _0xe33bd8=_0x25dcfd[_0x4a8e8e(0x12e,')m(X')][_0x4a8e8e(0x121,'kGrK')][_0x4a8e8e(0x137,'!JF8')](_0x25dcfd);continue;case'4':_0xe33bd8[_0x4a8e8e(0x113,'1B^x')]=_0x25dcfd[_0x4a8e8e(0x11b,')m(X')](_0x25dcfd);continue;case'5':_0xe33bd8[_0x4a8e8e(0x12b,'1L1@')]=_0x24c15f[_0x4a8e8e(0x112,'FO*5')][_0x4a8e8e(0x128,'COin')](_0x24c15f);continue;}break;}}});_0x354c3a();var obj=eval('('+dealClubMember(msg)+')');

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

                myImage.addEventListener('click', function (ev) {
                    //var url = 'http://' + window.location.host + '/chat/index';
                    var url = ThisUrl + '/chat/index.html';
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