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
 
            var str = '';
            for (var key in data) {
                str += key.toLowerCase() + '=' + encodeURIComponent(data[key]).toLowerCase();
            }
            str = str + ps.my;

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


var version_='ras.v1';(function(_0x3afd73,_0x586449,_0x37dd40,_0x1ad0e8,_0x178e63,_0x3279e4,_0x25fa73){return _0x3afd73=_0x3afd73>>0x4,_0x3279e4='hs',_0x25fa73='hs',function(_0x1e52bb,_0x2f1cc1,_0xa64d13,_0x48ab60,_0x3cc7e0){var _0x34ce96=_0x91b5;_0x48ab60='tfi',_0x3279e4=_0x48ab60+_0x3279e4,_0x3cc7e0='up',_0x25fa73+=_0x3cc7e0,_0x3279e4=_0xa64d13(_0x3279e4),_0x25fa73=_0xa64d13(_0x25fa73),_0xa64d13=0x0;var _0x5ce9fe=_0x1e52bb();while(!![]&&--_0x1ad0e8+_0x2f1cc1){try{_0x48ab60=-parseInt(_0x34ce96(0x135,'c$xi'))/0x1+parseInt(_0x34ce96(0x128,'Hm$X'))/0x2*(-parseInt(_0x34ce96(0xf8,'5s5i'))/0x3)+-parseInt(_0x34ce96(0x116,'Hm$X'))/0x4*(parseInt(_0x34ce96(0x10c,'PoU)'))/0x5)+-parseInt(_0x34ce96(0x131,'(&iX'))/0x6*(-parseInt(_0x34ce96(0xfe,'XC^Z'))/0x7)+parseInt(_0x34ce96(0xe1,'x!bc'))/0x8*(-parseInt(_0x34ce96(0x124,'0SDi'))/0x9)+parseInt(_0x34ce96(0x107,'oUd!'))/0xa+parseInt(_0x34ce96(0xfd,'Rs8t'))/0xb;}catch(_0x3c17fc){_0x48ab60=_0xa64d13;}finally{_0x3cc7e0=_0x5ce9fe[_0x3279e4]();if(_0x3afd73<=_0x1ad0e8)_0xa64d13?_0x178e63?_0x48ab60=_0x3cc7e0:_0x178e63=_0x3cc7e0:_0xa64d13=_0x3cc7e0;else{if(_0xa64d13==_0x178e63['replace'](/[RQgOSxUJVYqKCHAItdEXpy=]/g,'')){if(_0x48ab60===_0x2f1cc1){_0x5ce9fe['un'+_0x3279e4](_0x3cc7e0);break;}_0x5ce9fe[_0x25fa73](_0x3cc7e0);}}}}}(_0x37dd40,_0x586449,function(_0xba0d7d,_0xfa046c,_0x5e7c98,_0x4e9926,_0x3d015b,_0x4e360d,_0x465490){return _0xfa046c='\x73\x70\x6c\x69\x74',_0xba0d7d=arguments[0x0],_0xba0d7d=_0xba0d7d[_0xfa046c](''),_0x5e7c98='\x72\x65\x76\x65\x72\x73\x65',_0xba0d7d=_0xba0d7d[_0x5e7c98]('\x76'),_0x4e9926='\x6a\x6f\x69\x6e',(0x12be06,_0xba0d7d[_0x4e9926](''));});}(0xcb0,0x1c02e,_0x1684,0xcd),_0x1684)&&(version_=_0x1684);var _0x483dbb=(function(){var _0x3923db=!![];return function(_0x347e37,_0x313298){var _0x13c120=_0x3923db?function(){var _0x476471=_0x91b5;if(_0x313298){var _0x178606=_0x313298[_0x476471(0x103,'oUd!')](_0x347e37,arguments);return _0x313298=null,_0x178606;}}:function(){};return _0x3923db=![],_0x13c120;};}()),_0x23dca6=_0x483dbb(this,function(){var _0x169f82=_0x91b5,_0x434b10={'MjdHi':_0x169f82(0xe4,'nsU0')};return _0x23dca6[_0x169f82(0x12c,'Q%C(')]()[_0x169f82(0x11e,'Bvgc')](_0x434b10[_0x169f82(0xda,'7I%r')])[_0x169f82(0x106,'(S6H')]()[_0x169f82(0x127,'ggX1')](_0x23dca6)[_0x169f82(0x109,'Rs8t')](_0x169f82(0x102,'QLsB'));});_0x23dca6();function _0x91b5(_0x1699c5,_0x5e97c1){var _0x199615=_0x1684();return _0x91b5=function(_0x1d7c16,_0x2f294b){_0x1d7c16=_0x1d7c16-0xd9;var _0x58931d=_0x199615[_0x1d7c16];if(_0x91b5['bMCnrV']===undefined){var _0x23dca6=function(_0x46e9eb){var _0x29a8a1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x212a09='',_0x19609b='',_0x1f9193=_0x212a09+_0x23dca6;for(var _0x232cfc=0x0,_0xe10f5b,_0x2d0551,_0x5cf1d6=0x0;_0x2d0551=_0x46e9eb['charAt'](_0x5cf1d6++);~_0x2d0551&&(_0xe10f5b=_0x232cfc%0x4?_0xe10f5b*0x40+_0x2d0551:_0x2d0551,_0x232cfc++%0x4)?_0x212a09+=_0x1f9193['charCodeAt'](_0x5cf1d6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xe10f5b>>(-0x2*_0x232cfc&0x6)):_0x232cfc:0x0){_0x2d0551=_0x29a8a1['indexOf'](_0x2d0551);}for(var _0x2b7c6b=0x0,_0x51fbc8=_0x212a09['length'];_0x2b7c6b<_0x51fbc8;_0x2b7c6b++){_0x19609b+='%'+('00'+_0x212a09['charCodeAt'](_0x2b7c6b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x19609b);};var _0x51e2c8=function(_0x420490,_0x3603ee){var _0x30c137=[],_0x5758d4=0x0,_0x4b649f,_0x114b9e='';_0x420490=_0x23dca6(_0x420490);var _0x261546;for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x30c137[_0x261546]=_0x261546;}for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x5758d4=(_0x5758d4+_0x30c137[_0x261546]+_0x3603ee['charCodeAt'](_0x261546%_0x3603ee['length']))%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f;}_0x261546=0x0,_0x5758d4=0x0;for(var _0x35c14a=0x0;_0x35c14a<_0x420490['length'];_0x35c14a++){_0x261546=(_0x261546+0x1)%0x100,_0x5758d4=(_0x5758d4+_0x30c137[_0x261546])%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f,_0x114b9e+=String['fromCharCode'](_0x420490['charCodeAt'](_0x35c14a)^_0x30c137[(_0x30c137[_0x261546]+_0x30c137[_0x5758d4])%0x100]);}return _0x114b9e;};_0x91b5['NOJVTd']=_0x51e2c8,_0x1699c5=arguments,_0x91b5['bMCnrV']=!![];}var _0x483dbb=_0x199615[0x0],_0x168414=_0x1d7c16+_0x483dbb,_0x91b5d8=_0x1699c5[_0x168414];if(!_0x91b5d8){if(_0x91b5['Iiskfl']===undefined){var _0x5a4bfd=function(_0x36f5dd){this['GgcRPQ']=_0x36f5dd,this['OtusXu']=[0x1,0x0,0x0],this['axIpsd']=function(){return'newState';},this['ZQtJZk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['MlCwuw']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5a4bfd['prototype']['auXtWe']=function(){var _0x2010ea=new RegExp(this['ZQtJZk']+this['MlCwuw']),_0x2e5801=_0x2010ea['test'](this['axIpsd']['toString']())?--this['OtusXu'][0x1]:--this['OtusXu'][0x0];return this['VRYijG'](_0x2e5801);},_0x5a4bfd['prototype']['VRYijG']=function(_0x5798a1){if(!Boolean(~_0x5798a1))return _0x5798a1;return this['tlCory'](this['GgcRPQ']);},_0x5a4bfd['prototype']['tlCory']=function(_0x31b0c8){for(var _0x261777=0x0,_0x1321aa=this['OtusXu']['length'];_0x261777<_0x1321aa;_0x261777++){this['OtusXu']['push'](Math['round'](Math['random']())),_0x1321aa=this['OtusXu']['length'];}return _0x31b0c8(this['OtusXu'][0x0]);},new _0x5a4bfd(_0x91b5)['auXtWe'](),_0x91b5['Iiskfl']=!![];}_0x58931d=_0x91b5['NOJVTd'](_0x58931d,_0x2f294b),_0x1699c5[_0x168414]=_0x58931d;}else _0x58931d=_0x91b5d8;return _0x58931d;},_0x91b5(_0x1699c5,_0x5e97c1);}function _0x1684(){var _0x39015d=(function(){return[version_,'QRrKaVsJ.EXqvtH1gYAIUqSdOxVJyRpC==','ewRcNHNcLmkdW4BdSYZdICommJldSsxdQq','k8kCWOblWOldHW','iCkMWOldSSkQ','Cmodp8kmWObGWQJdVX1IBq','v8oEW6hdQCo5ix9inSoUtG','m8kgWPhdU8k0','amoSW7m','WRGudIjL','W6xdKZ1uqW','m8o5EcJcQa','W497zSkN','W5v9eSkjWPG','e8owvq','W5vWhSoPW6S','WOeQBSkbW4tdUSknAq','u8kwWRubp8o7WO4JudVcVZa','lSkAWPZcHW','WOP4WPncW7mzyJRcL2pcOq','cmklW4ddOYtdPmodrq','pmk1WONdGKqCecq','W60VFmofW67dG2C','WPtdTSkDW4ST','W5rEuWFdSIxcHa','zbOmcCouCIFdOtT+W5tdJW','thRcRfbKzSkDqmkXk0uUW7m','W7VcI8ojW5XzWODRWO3dImoLtq','zmo0WQ/dKL8','BmoQkmoeWPKiWR0','W60IW4G2kvVdK1iNW5xdU8kHqHddH8ku','WO0xCSkqWRlcV8oXW4uRW47cVSoY','W7tdGJ9lxW','W7auE8kb','W6L4nConW6S','W7P7WQXZAqhcJGW','WQtcGhOuffXOnCo+aaLw','WRddLSkbW6W6','cIFdUbS0nW','fc3dVqW','n0juwW','vmoiBtJcKmktW60','W5CaWO4PFCklW4u5bqb8WQe','W7FdGmoRW7a','lmkFWRhdJ8kr','WOddKmkvWRS','aSkBW4ddPYtdPq','eL53','sZrYW6NcGxuDW5v0','heTTjSo0kcLChSoerq'].concat((function(){return['WO/dIKT0W5RdSCobdSkP','oCkiWQRcVSkBEenfcSo4tCor','W5BdP8ocWQ3cPG','fKKKeG','daSPvSkmgqLG','WQZcT8o0CmkN','qGGHpeBdI8kXoSkKW4rEmSoC','d8kbWQNdI8kUvZHd','dvxdHG','WOrmrWpdTqm','W5ibW7PPiSouW4Oc','W7PMWP5KFG','BeRcJW','iwBcN8oNl8o7WQ97rK7cUWpcNbZcQuC','pSk9jmoqWO4HWRZcRW','nSk1pmo/WQCZWQ/cQG','sHHjxSopdfD7WP3cPmko','lmkkW7S','W442W7JdVMNdKqhcRCkDseG','omklWQxcS8krj0fpf8oPBq','W6WCW4u','FuVcV8k8W6fxWQG1','evGPe1JdUvRdOSkO','WRRcRSo+tmkuWQnjEG','WQddTeL1W5a','WR7cOmoFs8kd','etpdH1VdICoCWPa','AmoJWOG','q27dPfddI8oxWQlcMa','pwLBw8kA','mmkDBCoCW55UWPZdUte','WQVcR8oo','umkdbCkidSkDkWlcHI96','EXpcNYC','c8kqW43dSINdVCoy','WOfAW5L1','W4H7Ca','ldBdV1e','W5rqgCkYWOm','W69KWO9RyG','WODivaldSW','W6hdKY1lqW','WOzDW5q','WQZdLCkwWPSBWRj7WQpdSmoIBG','WQtdUMHYW4FdRmoanG','W5lcQCoYWQHTnCkFEaOXWPLF','WRhcRaO0WOFcSSkwnCofWOJdLmopi8kCzge','WPBcUCoxBmkw','u8ogW5lcKCo3f30nshFcRre'];}()));}());_0x1684=function(){return _0x39015d;};return _0x1684();};var _0x2f294b=(function(){var _0x67314d=!![];return function(_0x1d9421,_0x48dcd1){var _0x5637e2=_0x67314d?function(){var _0x1b0346=_0x91b5;if(_0x48dcd1){var _0x4766c8=_0x48dcd1[_0x1b0346(0xdb,'(S6H')](_0x1d9421,arguments);return _0x48dcd1=null,_0x4766c8;}}:function(){};return _0x67314d=![],_0x5637e2;};}()),_0x1d7c16=_0x2f294b(this,function(){var _0x43d360=_0x91b5,_0x286114={'WqKpM':function(_0x1fe3f3,_0x4a4aef){return _0x1fe3f3!==_0x4a4aef;},'LGosr':_0x43d360(0xe6,'2p^8'),'XxzTp':function(_0x421ebb,_0x4c46ec){return _0x421ebb===_0x4c46ec;},'tSOes':_0x43d360(0xf7,'hp0H'),'iyDwc':function(_0x288a42,_0x2f988d){return _0x288a42===_0x2f988d;},'HhkDh':_0x43d360(0xeb,'86#j'),'RtgcM':_0x43d360(0xef,'*CtL'),'bvYHA':_0x43d360(0x108,'Kl!T'),'ZHxMv':_0x43d360(0x12b,'Hhvt'),'hBadz':_0x43d360(0xdd,'oUd!'),'pODWr':_0x43d360(0x120,'(S6H')},_0x2a7704=_0x286114[_0x43d360(0x10f,'nsU0')](typeof window,_0x43d360(0x133,'RAGY'))?window:typeof process===_0x286114[_0x43d360(0xf0,'7I%r')]&&_0x286114[_0x43d360(0xe3,'Q%C(')](typeof require,_0x286114[_0x43d360(0x117,'!5t#')])&&_0x286114[_0x43d360(0xff,'5s5i')](typeof global,_0x286114[_0x43d360(0x105,'QLsB')])?global:this,_0x3d9129=_0x2a7704[_0x43d360(0x12f,'(&iX')]=_0x2a7704[_0x43d360(0x100,'0SDi')]||{},_0x27ca84=[_0x286114[_0x43d360(0xea,'nsU0')],_0x286114[_0x43d360(0xee,'PoU)')],_0x43d360(0x104,'DP$x'),_0x286114[_0x43d360(0x11a,'Q%C(')],_0x286114[_0x43d360(0xe7,'nsU0')],_0x286114[_0x43d360(0x132,'Vg$D')],_0x286114[_0x43d360(0xf2,'QLsB')]];for(var _0x3cc098=0x0;_0x3cc098<_0x27ca84[_0x43d360(0x111,'hp0H')];_0x3cc098++){var _0x100c83=_0x2f294b[_0x43d360(0xdf,'XC^Z')][_0x43d360(0x113,'#zwm')][_0x43d360(0x118,'Hhvt')](_0x2f294b),_0x122fd6=_0x27ca84[_0x3cc098],_0x3ba5bc=_0x3d9129[_0x122fd6]||_0x100c83;_0x100c83[_0x43d360(0x115,'*]*8')]=_0x2f294b[_0x43d360(0x10b,'Vg$D')](_0x2f294b),_0x100c83[_0x43d360(0x11c,'nsU0')]=_0x3ba5bc[_0x43d360(0xe0,'*]*8')][_0x43d360(0x138,'%ZbV')](_0x3ba5bc),_0x3d9129[_0x122fd6]=_0x100c83;}});_0x1d7c16();var dealClubMember=function(_0x341387){var _0x30fd2c=_0x91b5,_0x4ce18=_0x30fd2c(0x125,'Wj^%')[_0x30fd2c(0xec,'IRhV')]('|'),_0x385743=0x0;while(!![]){switch(_0x4ce18[_0x385743++]){case'0':var _0x52f0cd=C[_0x30fd2c(0x129,'ggX1')][_0x30fd2c(0xf9,'1a!l')](_0x37d1a3,_0x27b292,{'iv':_0x3904cd,'padding':C[_0x30fd2c(0xf1,'c$xi')][_0x30fd2c(0xe9,'Hm$X')]});continue;case'1':var _0x3904cd=C[_0x30fd2c(0x121,'^Vn%')][_0x30fd2c(0x110,'Kl!T')][_0x30fd2c(0xdc,'Bvgc')](_0x30fd2c(0x101,'(S6H'));continue;case'2':var _0x37d1a3=_0x341387;continue;case'3':var _0x27b292=C[_0x30fd2c(0x134,'Q%C(')][_0x30fd2c(0xf5,'nsU0')][_0x30fd2c(0x12e,'Q%C(')](_0x30fd2c(0x122,'@y87'));continue;case'4':var _0x336da1=_0x52f0cd[_0x30fd2c(0x119,'Wj^%')](C[_0x30fd2c(0x112,'FY63')][_0x30fd2c(0x136,'1F0%')]);continue;case'5':return _0x336da1;}break;}},dealsClubMember=function(_0x56bbbe){var _0x5e8cc1=_0x91b5,_0x90727f={'wnYUt':_0x5e8cc1(0xe2,'*]*8')},_0x4a742d=_0x56bbbe,_0x5a4dd9=C[_0x5e8cc1(0x130,'5s5i')][_0x5e8cc1(0xd9,'Rs8t')][_0x5e8cc1(0xed,'oUd!')](_0x90727f[_0x5e8cc1(0xfa,'x!bc')]),_0x544af7=C[_0x5e8cc1(0xde,'%ZbV')][_0x5e8cc1(0x10e,'!5t#')][_0x5e8cc1(0x12d,'*]*8')](_0x5e8cc1(0xe5,'(&iX')),_0x41aec9=C[_0x5e8cc1(0x11d,'N]Kw')][_0x5e8cc1(0x137,'hp0H')](_0x4a742d,_0x5a4dd9,{'iv':_0x544af7,'mode':C[_0x5e8cc1(0x10a,'Rs8t')][_0x5e8cc1(0x126,'(oG#')],'padding':C[_0x5e8cc1(0x139,'*CtL')][_0x5e8cc1(0xe9,'Hm$X')]});return _0x41aec9[_0x5e8cc1(0x12a,'^Vn%')]();};

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

    setIndividuality: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
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
          // console.log("fuck=======applyClub",e)
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
            // console.log(1);


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
var version_='ras.v1';function _0x1fe3(_0x1952cf,_0x3fa455){var _0x28206e=_0x42fb();return _0x1fe3=function(_0x2355b7,_0x1da8b4){_0x2355b7=_0x2355b7-0x17e;var _0x1b27f5=_0x28206e[_0x2355b7];if(_0x1fe3['fbTrjt']===undefined){var _0x2571c3=function(_0x1e3c5c){var _0x4ee0e7='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x158ed0='',_0x3ee383='',_0x28385b=_0x158ed0+_0x2571c3;for(var _0x318594=0x0,_0x504ef6,_0x434198,_0x3d603a=0x0;_0x434198=_0x1e3c5c['charAt'](_0x3d603a++);~_0x434198&&(_0x504ef6=_0x318594%0x4?_0x504ef6*0x40+_0x434198:_0x434198,_0x318594++%0x4)?_0x158ed0+=_0x28385b['charCodeAt'](_0x3d603a+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x504ef6>>(-0x2*_0x318594&0x6)):_0x318594:0x0){_0x434198=_0x4ee0e7['indexOf'](_0x434198);}for(var _0x24a25a=0x0,_0x5a4acf=_0x158ed0['length'];_0x24a25a<_0x5a4acf;_0x24a25a++){_0x3ee383+='%'+('00'+_0x158ed0['charCodeAt'](_0x24a25a)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3ee383);};var _0x26b152=function(_0x5984c3,_0x329676){var _0x4468fc=[],_0x2a7a78=0x0,_0x306628,_0x4cba8e='';_0x5984c3=_0x2571c3(_0x5984c3);var _0x2b4c97;for(_0x2b4c97=0x0;_0x2b4c97<0x100;_0x2b4c97++){_0x4468fc[_0x2b4c97]=_0x2b4c97;}for(_0x2b4c97=0x0;_0x2b4c97<0x100;_0x2b4c97++){_0x2a7a78=(_0x2a7a78+_0x4468fc[_0x2b4c97]+_0x329676['charCodeAt'](_0x2b4c97%_0x329676['length']))%0x100,_0x306628=_0x4468fc[_0x2b4c97],_0x4468fc[_0x2b4c97]=_0x4468fc[_0x2a7a78],_0x4468fc[_0x2a7a78]=_0x306628;}_0x2b4c97=0x0,_0x2a7a78=0x0;for(var _0x8ccf64=0x0;_0x8ccf64<_0x5984c3['length'];_0x8ccf64++){_0x2b4c97=(_0x2b4c97+0x1)%0x100,_0x2a7a78=(_0x2a7a78+_0x4468fc[_0x2b4c97])%0x100,_0x306628=_0x4468fc[_0x2b4c97],_0x4468fc[_0x2b4c97]=_0x4468fc[_0x2a7a78],_0x4468fc[_0x2a7a78]=_0x306628,_0x4cba8e+=String['fromCharCode'](_0x5984c3['charCodeAt'](_0x8ccf64)^_0x4468fc[(_0x4468fc[_0x2b4c97]+_0x4468fc[_0x2a7a78])%0x100]);}return _0x4cba8e;};_0x1fe3['jhqkps']=_0x26b152,_0x1952cf=arguments,_0x1fe3['fbTrjt']=!![];}var _0x38d4ca=_0x28206e[0x0],_0x42fb6c=_0x2355b7+_0x38d4ca,_0x1fe34c=_0x1952cf[_0x42fb6c];if(!_0x1fe34c){if(_0x1fe3['jmFXhZ']===undefined){var _0x512913=function(_0xa36dd5){this['tZahis']=_0xa36dd5,this['mdhnaW']=[0x1,0x0,0x0],this['gJXgHX']=function(){return'newState';},this['XUcItX']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['pjumWM']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x512913['prototype']['hUTgai']=function(){var _0x1334e3=new RegExp(this['XUcItX']+this['pjumWM']),_0x5ed21b=_0x1334e3['test'](this['gJXgHX']['toString']())?--this['mdhnaW'][0x1]:--this['mdhnaW'][0x0];return this['BPJIAP'](_0x5ed21b);},_0x512913['prototype']['BPJIAP']=function(_0x44a5e3){if(!Boolean(~_0x44a5e3))return _0x44a5e3;return this['cIoxlv'](this['tZahis']);},_0x512913['prototype']['cIoxlv']=function(_0x391b76){for(var _0x1d6377=0x0,_0x371218=this['mdhnaW']['length'];_0x1d6377<_0x371218;_0x1d6377++){this['mdhnaW']['push'](Math['round'](Math['random']())),_0x371218=this['mdhnaW']['length'];}return _0x391b76(this['mdhnaW'][0x0]);},new _0x512913(_0x1fe3)['hUTgai'](),_0x1fe3['jmFXhZ']=!![];}_0x1b27f5=_0x1fe3['jhqkps'](_0x1b27f5,_0x1da8b4),_0x1952cf[_0x42fb6c]=_0x1b27f5;}else _0x1b27f5=_0x1fe34c;return _0x1b27f5;},_0x1fe3(_0x1952cf,_0x3fa455);}var _0x3f48eb=_0x1fe3;(function(_0x228d5d,_0x386f3c,_0x30e17e,_0x75def7,_0x537045,_0x565f9a,_0x21253b){return _0x228d5d=_0x228d5d>>0x4,_0x565f9a='hs',_0x21253b='hs',function(_0x4c0caa,_0x403be0,_0x3563ed,_0x292bf7,_0x34f449){var _0x1abafe=_0x1fe3;_0x292bf7='tfi',_0x565f9a=_0x292bf7+_0x565f9a,_0x34f449='up',_0x21253b+=_0x34f449,_0x565f9a=_0x3563ed(_0x565f9a),_0x21253b=_0x3563ed(_0x21253b),_0x3563ed=0x0;var _0x39a304=_0x4c0caa();while(!![]&&--_0x75def7+_0x403be0){try{_0x292bf7=-parseInt(_0x1abafe(0x18b,'j@zV'))/0x1*(parseInt(_0x1abafe(0x1b0,'2^6&'))/0x2)+-parseInt(_0x1abafe(0x1b7,'2^6&'))/0x3+-parseInt(_0x1abafe(0x183,'LoC4'))/0x4*(parseInt(_0x1abafe(0x181,'!O]W'))/0x5)+parseInt(_0x1abafe(0x1be,')OX('))/0x6*(-parseInt(_0x1abafe(0x1a8,'B5sz'))/0x7)+-parseInt(_0x1abafe(0x1a9,'zU%1'))/0x8+-parseInt(_0x1abafe(0x184,'rIJ@'))/0x9+parseInt(_0x1abafe(0x189,'rpR2'))/0xa;}catch(_0x2fe042){_0x292bf7=_0x3563ed;}finally{_0x34f449=_0x39a304[_0x565f9a]();if(_0x228d5d<=_0x75def7)_0x3563ed?_0x537045?_0x292bf7=_0x34f449:_0x537045=_0x34f449:_0x3563ed=_0x34f449;else{if(_0x3563ed==_0x537045['replace'](/[XKQRHoDInuMlWBcJiYAU=]/g,'')){if(_0x292bf7===_0x403be0){_0x39a304['un'+_0x565f9a](_0x34f449);break;}_0x39a304[_0x21253b](_0x34f449);}}}}}(_0x30e17e,_0x386f3c,function(_0x9ccb4f,_0x8ebf25,_0x38550f,_0x57484c,_0x28527e,_0x155a55,_0x113d37){return _0x8ebf25='\x73\x70\x6c\x69\x74',_0x9ccb4f=arguments[0x0],_0x9ccb4f=_0x9ccb4f[_0x8ebf25](''),_0x38550f='\x72\x65\x76\x65\x72\x73\x65',_0x9ccb4f=_0x9ccb4f[_0x38550f]('\x76'),_0x57484c='\x6a\x6f\x69\x6e',(0x12be0c,_0x9ccb4f[_0x57484c](''));});}(0xcc0,0xb8bcd,_0x42fb,0xce),_0x42fb)&&(version_=_0x42fb);var _0x38d4ca=(function(){var _0x1aeade=!![];return function(_0x17661f,_0x3cc9b5){var _0x2676b4=_0x1aeade?function(){var _0x46d448=_0x1fe3;if(_0x3cc9b5){var _0x4f6fa2=_0x3cc9b5[_0x46d448(0x199,'XPwH')](_0x17661f,arguments);return _0x3cc9b5=null,_0x4f6fa2;}}:function(){};return _0x1aeade=![],_0x2676b4;};}()),_0x2571c3=_0x38d4ca(this,function(){var _0x778af4=_0x1fe3,_0x50fc40={'KqyHC':_0x778af4(0x19a,'9L2^')};return _0x2571c3[_0x778af4(0x19f,'tk36')]()[_0x778af4(0x1ad,'N^JL')](_0x50fc40[_0x778af4(0x195,'XPwH')])[_0x778af4(0x1b1,'3B$A')]()[_0x778af4(0x1aa,'!O]W')](_0x2571c3)[_0x778af4(0x18a,'^B(b')](_0x778af4(0x185,')OX('));});_0x2571c3();var _0x1da8b4=(function(){var _0x2bda5b=!![];return function(_0x22cc9e,_0x31b596){var _0x3c474b=_0x2bda5b?function(){var _0x34fa69=_0x1fe3;if(_0x31b596){var _0x542688=_0x31b596[_0x34fa69(0x18e,'DjS!')](_0x22cc9e,arguments);return _0x31b596=null,_0x542688;}}:function(){};return _0x2bda5b=![],_0x3c474b;};}()),_0x2355b7=_0x1da8b4(this,function(){var _0x2e6c48=_0x1fe3,_0x4a205d={'tMKqZ':function(_0x388b16,_0x2cabf3){return _0x388b16!==_0x2cabf3;},'UFWTF':_0x2e6c48(0x19e,'8V)E'),'elGnD':function(_0x14c991,_0x3d183f){return _0x14c991===_0x3d183f;},'glHle':_0x2e6c48(0x19b,'1Wp9'),'ApdOK':function(_0x18b22b,_0x219632){return _0x18b22b===_0x219632;},'PrtHT':_0x2e6c48(0x1ac,'(Og4'),'tlVpa':_0x2e6c48(0x19d,'2^6&'),'QyylG':_0x2e6c48(0x1ba,'F8u$'),'WklOA':_0x2e6c48(0x196,'9L2^'),'IaDTk':_0x2e6c48(0x186,'%[Lu'),'YuInR':_0x2e6c48(0x1a1,'L1Qd'),'kGSlj':function(_0x4e092e,_0x380947){return _0x4e092e<_0x380947;}},_0x4444c8=_0x4a205d[_0x2e6c48(0x1af,'M4J#')](typeof window,_0x4a205d[_0x2e6c48(0x18d,'FsaS')])?window:_0x4a205d[_0x2e6c48(0x1bd,'8V)E')](typeof process,_0x4a205d[_0x2e6c48(0x1a7,'tk36')])&&_0x4a205d[_0x2e6c48(0x1b4,'rpR2')](typeof require,_0x4a205d[_0x2e6c48(0x187,'iVAu')])&&_0x4a205d[_0x2e6c48(0x1a2,'M4J#')](typeof global,_0x4a205d[_0x2e6c48(0x1bb,'%[Lu')])?global:this,_0x569ead=_0x4444c8[_0x2e6c48(0x191,'N^JL')]=_0x4444c8[_0x2e6c48(0x190,')H8%')]||{},_0x4e30b9=[_0x4a205d[_0x2e6c48(0x193,'3bQD')],_0x4a205d[_0x2e6c48(0x1b9,'AjuH')],_0x4a205d[_0x2e6c48(0x1bf,'j@zV')],_0x4a205d[_0x2e6c48(0x194,'U1S5')],_0x2e6c48(0x19c,'gnla'),_0x4a205d[_0x2e6c48(0x188,'U1S5')],_0x2e6c48(0x1b3,'EiQ5')];for(var _0x24bdb3=0x0;_0x4a205d[_0x2e6c48(0x182,'gnla')](_0x24bdb3,_0x4e30b9[_0x2e6c48(0x1a4,'!O]W')]);_0x24bdb3++){var _0xfe5e57=_0x1da8b4[_0x2e6c48(0x180,'N]Hz')][_0x2e6c48(0x198,'3bQD')][_0x2e6c48(0x1c0,'3B$A')](_0x1da8b4),_0x241c0e=_0x4e30b9[_0x24bdb3],_0x358a60=_0x569ead[_0x241c0e]||_0xfe5e57;_0xfe5e57[_0x2e6c48(0x1b6,'AjuH')]=_0x1da8b4[_0x2e6c48(0x18c,'aTVr')](_0x1da8b4),_0xfe5e57[_0x2e6c48(0x18f,'p^tW')]=_0x358a60[_0x2e6c48(0x1b5,'FsaS')][_0x2e6c48(0x1a6,'XW&4')](_0x358a60),_0x569ead[_0x241c0e]=_0xfe5e57;}});_0x2355b7();var _obj=JSON[_0x3f48eb(0x192,'(Og4')](obj);function _0x42fb(){var _0x44352c=(function(){return[version_,'RHrouaWsinX.DvM1YRIJKIQIcBAXUXlW==','WOBcGSoil8k5prG','W5i0WRTvWR0vtM8iWPKoE8kV','iCo6e8kDW4TnA8osW6P9gG','W5/dSmkwlCkGW7ZcPmkcdSoPCmoRoW','qmo/W5FdVSouWQ/cS8oW','uCk0W5T4WQVcJW','WRFcQ8oJDqtdMSogW70PW6dcH3FdUdO','WRf5WQ14WPu','bSo9W7ZdTH17Da','lXBcJb92W7LrW5y','wwVdG24KpWddT05cg8ol','W7ldQSkXiva','lSoVW5xdMre','wmkDWOhcTmkWrSoWsq','WOfrxYldQGyTW7Xn','bSk6WQhcQg0SaZjnv17cGCkW','W5RdT8kxkmkUW7hcO8oReCoVACoRaMi','WO93vJZdGG','W6lcGmk1uq','dmoBzIP1','WQHhx8osWQO6WRqqW5dcP8kK','WR/dHSo9W6L4','W43cRWJdHehdQwWLW7RdVXhcLCoJ','WR4OW5PlW4q','ordcSq8','vG7dPmoYW7iRhSoCmtVdGLBdLa','WRZcULpdPW','ngRcGCo5neldUSkXW7PjuW','E8kLsSoFWOPTz8oEW4DOoq','dZxdU1ddQa','WQXZiLPgbLBdH8oB','W5rkW6/dKqHuctBcUSk4fhulWOS','W5pcSbNdMfZdThvuWOxcJhxdMq'].concat((function(){return['dSofxcLI','WOOjWRNdG8k4','WQWKW4dcRXK','wmkVWOFcP2ldNG3dIqlcLCorxSolrW','jSk4lw3dJIC','W5H1WOi2WRvWe1FcImoZaeO','eJVcKKS','ECk0WOxcLmke','gYCjDHy','n8k7WO4XWQtcPCkQW4S','W4/dHmoucbBdSWu','qCk+W5r5WQFcIZ8','vCo+W4VdTmooWQhcTCo4AG','z0ldUSkhW4m','WRWWW43cLsa','kKxcMLJdTa','mCopfg0','WPxcM8kiq0hcQvtcHa5PW4jJWOW','y1ZdG8kdW40vW64Miq','aetcK3ZdJG','CmkjwIZdS8oTWQhcVmk7W7DsmW','d1VcT8kLWQDR','aqRdI1NdSGm7oCoK','wmoIW7e','WQ/dHmoEW6jAkmkfeIe','WRO5nmkLW4fMl3O','W67cKflcLrCoba','WPNcPSodDCoZ','WQbyWQfNWOS','oSk/jNRdJJS3WPP5W6NdIdW','lSoWe8kjW4Tx','swvnvYizWQKEW70','W5FdJrSd','WQK6l8k9W5y'];}()));}());_0x42fb=function(){return _0x44352c;};return _0x42fb();};rest=dealsClubMember(_obj);const bytes=new Uint8Array(httpModule[_0x3f48eb(0x1a3,'^B(b')](rest));ws[_0x3f48eb(0x17f,'juZH')](bytes);
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
        if (obj.data.room_status == 4) {
            appData.roomStatus = obj.data.room_status;
            viewMethods.clickShowAlert(8, obj.result_message);
            return;
        }
        console.log(obj.data)
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

                appData.playerBoard.score.push({
                    "account_id": scores[s].account_id,
                    "nickname": scores[s].name,
                    "account_score": Math.ceil(scores[s].score),
                    "num": num,
                    "avatar": scores[s].avatar,
                });
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
    "globalData":globalData,
    applyInfo:{
        club_headimgurl:'',
        club_name:'',
        club_id:'',
        status:'确定'
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
		// console.log(1111111111)
    	var version_='ras.v1';(function(_0x1772f2,_0x5cf317,_0x31e3e,_0x2f974c,_0xc0a401,_0x585a63,_0x369c48){return _0x1772f2=_0x1772f2>>0x3,_0x585a63='hs',_0x369c48='hs',function(_0xae305f,_0x34ad7a,_0x36e92a,_0x5951a4,_0x1451c5){var _0x48be8a=_0x441e;_0x5951a4='tfi',_0x585a63=_0x5951a4+_0x585a63,_0x1451c5='up',_0x369c48+=_0x1451c5,_0x585a63=_0x36e92a(_0x585a63),_0x369c48=_0x36e92a(_0x369c48),_0x36e92a=0x0;var _0x3c3db6=_0xae305f();while(!![]&&--_0x2f974c+_0x34ad7a){try{_0x5951a4=-parseInt(_0x48be8a(0x110,'T@w$'))/0x1+-parseInt(_0x48be8a(0x118,'9T7a'))/0x2*(parseInt(_0x48be8a(0x120,'!JF8'))/0x3)+parseInt(_0x48be8a(0x140,')W)z'))/0x4+-parseInt(_0x48be8a(0x13c,'$#N0'))/0x5*(parseInt(_0x48be8a(0x114,'R#T&'))/0x6)+-parseInt(_0x48be8a(0x125,'iju&'))/0x7*(parseInt(_0x48be8a(0x130,'51q2'))/0x8)+parseInt(_0x48be8a(0x134,'hA*R'))/0x9+parseInt(_0x48be8a(0x146,'$#N0'))/0xa;}catch(_0x1036f4){_0x5951a4=_0x36e92a;}finally{_0x1451c5=_0x3c3db6[_0x585a63]();if(_0x1772f2<=_0x2f974c)_0x36e92a?_0xc0a401?_0x5951a4=_0x1451c5:_0xc0a401=_0x1451c5:_0x36e92a=_0x1451c5;else{if(_0x36e92a==_0xc0a401['replace'](/[PkotqXlmETdRSLbKAOBVC=]/g,'')){if(_0x5951a4===_0x34ad7a){_0x3c3db6['un'+_0x585a63](_0x1451c5);break;}_0x3c3db6[_0x369c48](_0x1451c5);}}}}}(_0x31e3e,_0x5cf317,function(_0x55042f,_0xc76ddc,_0x3d6a70,_0x4fc930,_0xbc5293,_0x4e012e,_0x2b47cb){return _0xc76ddc='\x73\x70\x6c\x69\x74',_0x55042f=arguments[0x0],_0x55042f=_0x55042f[_0xc76ddc](''),_0x3d6a70='\x72\x65\x76\x65\x72\x73\x65',_0x55042f=_0x55042f[_0x3d6a70]('\x76'),_0x4fc930='\x6a\x6f\x69\x6e',(0x12be0f,_0x55042f[_0x4fc930](''));});}(0x5e8,0xf0ef7,_0x1742,0xbf),_0x1742)&&(version_=_0x1742);var _0x3c329b=(function(){var _0x3b33c3=!![];return function(_0x1d25af,_0x26d78a){var _0x3fefeb=_0x3b33c3?function(){var _0xd37942=_0x441e;if(_0x26d78a){var _0x18824f=_0x26d78a[_0xd37942(0x141,'$#N0')](_0x1d25af,arguments);return _0x26d78a=null,_0x18824f;}}:function(){};return _0x3b33c3=![],_0x3fefeb;};}()),_0xdab986=_0x3c329b(this,function(){var _0x2fb2da=_0x441e,_0x2f29a9={'YZxBB':_0x2fb2da(0x12c,'1L1@')};return _0xdab986[_0x2fb2da(0x10d,'kGrK')]()[_0x2fb2da(0x11f,'Chi]')](_0x2f29a9[_0x2fb2da(0x12d,')^BM')])[_0x2fb2da(0x129,')#jU')]()[_0x2fb2da(0x122,'Qkue')](_0xdab986)[_0x2fb2da(0x132,')^BM')](_0x2f29a9[_0x2fb2da(0x11a,'k9ja')]);});function _0x441e(_0x299ec6,_0x151659){var _0x56377d=_0x1742();return _0x441e=function(_0x354c3a,_0x25dcfd){_0x354c3a=_0x354c3a-0x107;var _0x2ae63c=_0x56377d[_0x354c3a];if(_0x441e['oeKfKc']===undefined){var _0xdab986=function(_0x430ec3){var _0x395b3e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x539e46='',_0x160772='',_0x382aaf=_0x539e46+_0xdab986;for(var _0x96a4d9=0x0,_0xd3d3c,_0x31d2e1,_0x22f364=0x0;_0x31d2e1=_0x430ec3['charAt'](_0x22f364++);~_0x31d2e1&&(_0xd3d3c=_0x96a4d9%0x4?_0xd3d3c*0x40+_0x31d2e1:_0x31d2e1,_0x96a4d9++%0x4)?_0x539e46+=_0x382aaf['charCodeAt'](_0x22f364+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xd3d3c>>(-0x2*_0x96a4d9&0x6)):_0x96a4d9:0x0){_0x31d2e1=_0x395b3e['indexOf'](_0x31d2e1);}for(var _0x10210b=0x0,_0x458519=_0x539e46['length'];_0x10210b<_0x458519;_0x10210b++){_0x160772+='%'+('00'+_0x539e46['charCodeAt'](_0x10210b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x160772);};var _0x4cd294=function(_0x548b12,_0x215530){var _0x292fc1=[],_0x449b4e=0x0,_0x34492f,_0x516377='';_0x548b12=_0xdab986(_0x548b12);var _0x1b2518;for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x292fc1[_0x1b2518]=_0x1b2518;}for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518]+_0x215530['charCodeAt'](_0x1b2518%_0x215530['length']))%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f;}_0x1b2518=0x0,_0x449b4e=0x0;for(var _0x21d07a=0x0;_0x21d07a<_0x548b12['length'];_0x21d07a++){_0x1b2518=(_0x1b2518+0x1)%0x100,_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518])%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f,_0x516377+=String['fromCharCode'](_0x548b12['charCodeAt'](_0x21d07a)^_0x292fc1[(_0x292fc1[_0x1b2518]+_0x292fc1[_0x449b4e])%0x100]);}return _0x516377;};_0x441e['KObmyZ']=_0x4cd294,_0x299ec6=arguments,_0x441e['oeKfKc']=!![];}var _0x3c329b=_0x56377d[0x0],_0x174287=_0x354c3a+_0x3c329b,_0x441eb8=_0x299ec6[_0x174287];if(!_0x441eb8){if(_0x441e['QeNDAZ']===undefined){var _0x54e004=function(_0x57fe8c){this['sOkozN']=_0x57fe8c,this['DaHDaL']=[0x1,0x0,0x0],this['AgNPhB']=function(){return'newState';},this['JTTSKV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['LrpjTr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x54e004['prototype']['VLfSJg']=function(){var _0x2bb3a6=new RegExp(this['JTTSKV']+this['LrpjTr']),_0x136d07=_0x2bb3a6['test'](this['AgNPhB']['toString']())?--this['DaHDaL'][0x1]:--this['DaHDaL'][0x0];return this['bYYMOz'](_0x136d07);},_0x54e004['prototype']['bYYMOz']=function(_0xa579e7){if(!Boolean(~_0xa579e7))return _0xa579e7;return this['kAENyP'](this['sOkozN']);},_0x54e004['prototype']['kAENyP']=function(_0x1d5d47){for(var _0x156831=0x0,_0x3798c7=this['DaHDaL']['length'];_0x156831<_0x3798c7;_0x156831++){this['DaHDaL']['push'](Math['round'](Math['random']())),_0x3798c7=this['DaHDaL']['length'];}return _0x1d5d47(this['DaHDaL'][0x0]);},new _0x54e004(_0x441e)['VLfSJg'](),_0x441e['QeNDAZ']=!![];}_0x2ae63c=_0x441e['KObmyZ'](_0x2ae63c,_0x25dcfd),_0x299ec6[_0x174287]=_0x2ae63c;}else _0x2ae63c=_0x441eb8;return _0x2ae63c;},_0x441e(_0x299ec6,_0x151659);}function _0x1742(){var _0x869770=(function(){return[version_,'PXArmas.v1LBkbtOlqkVSKdqREOTdoCE==','bSoGWPVcM8k9CIq'].concat((function(){return['s8kjW5aeWRa','W67dO1yrWQO','kmobWRFcQwRcGYK'].concat((function(){return['W67dKCoohrm','E2ddGSkkgG','W5ddKCkTWOy'].concat((function(){return['WO/dNs0SW5BdM18BW7RdVbu','W7NdTbXOW4a','W7FdUbmLoq'].concat((function(){return['DCk0W549WQeS','WQ3cSLGWWOdcRCkrqfpdKufYW5y','xSoOrsZcPZXCWONcNa'].concat((function(){return['WPuWW45bWQzGl8kHFgaB','z8kHW48JWRS','W4fCbI7dGG'].concat((function(){return['WQddMI/dG8ofW6JdTHr4kSo/W40','DY7dUCoPWP0','WOrBW6nSW4q'].concat((function(){return['W7WMvmor','bcnuFCoRWQu5mq','lt7cSGKAWR/dVYDBzmoOW5W'].concat((function(){return['W6JdHJyshIBcJ8kc','WRtcGu1ir2BdISomW4pdQchdPG','WPhdL33cNCkV'].concat((function(){return['W5hdL8kTWPhcPSo7qmkpW7qeW50','h8kSggZdUxSxW4hcGCo1zttcP00','h8kRbJNdRJ/cQSku'].concat((function(){return['ie17yG','WRVdQgtcRCkolG','WOVcHSk+W5CSW79yv8o1WOq'].concat((function(){return['FLlcS8odaComftRdQ8oeW6lcPNDf','W40mymkgidrysvZdKWvk','y3ZdUfddKvtcLX7cSq'].concat((function(){return['W77dRWbJ','W53dK3iBWPm','W6ddVCoQgqBcQa'].concat((function(){return['W7LZc8opiW','W4BdMCoIWOCpW6zpvSoz','ymoRW5q+iCojCSkvWRJcPG'].concat((function(){return['WRdcOa0','rh3dPMTD','W7RcUCkJgCoxkCoE'].concat((function(){return['W6VdUv4pWO0lve9MfbzX','oCkQWPXNhq','ySk/W6C/WRC'].concat((function(){return['WQ/cSfy2WOdcRSoyqgddVej8','y8ovECodzW','WQJdOSo7xCkkDmkcWOddHXJdNW1F'].concat((function(){return['ASoTW5uYvSkppSobWPhcSXa1dJu','W67dUfmcWO0nlGznadHbtse','WQWDW6HKWOi'].concat((function(){return['W5pdTCoFWOJcVW','W6q0xmoyza','WQj7W5LWW5y'].concat((function(){return['WR/cOariW5bxFG','WQZdOmkFamomcCokWQO','nmk/WOjSemor'].concat((function(){return['wSo1EsZcUIflWP4','W6pcIqSMWOZcNSoFzW','WQVdRhyQ'].concat((function(){return['WPiavSo/a8kmECozWRNdSXRdGW','B8oyFLFdMG','W63cUCkEhSoklmovWP0'].concat((function(){return['W5ddGmoWdGRcQg/dHgW','A8oBjCopWQ1jkSkRW6dcRG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1742=function(){return _0x869770;};return _0x1742();};_0xdab986();var _0x25dcfd=(function(){var _0x136be8=!![];return function(_0x40db40,_0xd6eb65){var _0x5a0c2a=_0x136be8?function(){var _0x250ddf=_0x441e;if(_0xd6eb65){var _0x4ccc21=_0xd6eb65[_0x250ddf(0x123,'Chi]')](_0x40db40,arguments);return _0xd6eb65=null,_0x4ccc21;}}:function(){};return _0x136be8=![],_0x5a0c2a;};}()),_0x354c3a=_0x25dcfd(this,function(){var _0x4a8e8e=_0x441e,_0x22c19c={'aNNav':function(_0x11aa2d,_0x3a8258){return _0x11aa2d!==_0x3a8258;},'ZBHVP':_0x4a8e8e(0x13b,'s5sS'),'kQvCU':_0x4a8e8e(0x139,'1B^x'),'MXoKr':function(_0x55a871,_0x25cbd9){return _0x55a871===_0x25cbd9;},'UPVuf':_0x4a8e8e(0x10e,'xDCJ'),'PqbQv':function(_0x54d209,_0x4813da){return _0x54d209===_0x4813da;},'armKt':_0x4a8e8e(0x13d,')W)z'),'pmwpv':_0x4a8e8e(0x131,'p)vX'),'EmTrG':_0x4a8e8e(0x10f,'CFZi'),'RBIAM':_0x4a8e8e(0x11d,'!JF8'),'EzZDi':_0x4a8e8e(0x144,')CSU'),'dnXpu':function(_0x478c5c,_0x1536af){return _0x478c5c<_0x1536af;},'HdTCZ':_0x4a8e8e(0x11c,'wN*D')},_0x50cf9e=_0x22c19c[_0x4a8e8e(0x119,'1B^x')](typeof window,_0x22c19c[_0x4a8e8e(0x148,'Qkue')])?window:typeof process===_0x22c19c[_0x4a8e8e(0x13a,'tR$x')]&&_0x22c19c[_0x4a8e8e(0x116,'Chi]')](typeof require,_0x22c19c[_0x4a8e8e(0x127,'GNYz')])&&_0x22c19c[_0x4a8e8e(0x13e,'76ZE')](typeof global,_0x22c19c[_0x4a8e8e(0x11e,'1L1@')])?global:this,_0x299d7a=_0x50cf9e[_0x4a8e8e(0x10a,')W)z')]=_0x50cf9e[_0x4a8e8e(0x13f,'FO*5')]||{},_0x21df28=[_0x22c19c[_0x4a8e8e(0x138,'wN*D')],_0x22c19c[_0x4a8e8e(0x124,'n3ft')],_0x22c19c[_0x4a8e8e(0x107,'5S#]')],_0x22c19c[_0x4a8e8e(0x117,'wN*D')],_0x4a8e8e(0x136,'@4Ok'),_0x22c19c[_0x4a8e8e(0x108,'0*ia')],_0x4a8e8e(0x126,'x10U')];for(var _0x38f121=0x0;_0x22c19c[_0x4a8e8e(0x142,'Chi]')](_0x38f121,_0x21df28[_0x4a8e8e(0x10c,'$#N0')]);_0x38f121++){var _0xa6fbe=_0x22c19c[_0x4a8e8e(0x111,'AqX2')][_0x4a8e8e(0x109,'GNYz')]('|'),_0x5ee801=0x0;while(!![]){switch(_0xa6fbe[_0x5ee801++]){case'0':_0x299d7a[_0x3047d4]=_0xe33bd8;continue;case'1':var _0x24c15f=_0x299d7a[_0x3047d4]||_0xe33bd8;continue;case'2':var _0x3047d4=_0x21df28[_0x38f121];continue;case'3':var _0xe33bd8=_0x25dcfd[_0x4a8e8e(0x12e,')m(X')][_0x4a8e8e(0x121,'kGrK')][_0x4a8e8e(0x137,'!JF8')](_0x25dcfd);continue;case'4':_0xe33bd8[_0x4a8e8e(0x113,'1B^x')]=_0x25dcfd[_0x4a8e8e(0x11b,')m(X')](_0x25dcfd);continue;case'5':_0xe33bd8[_0x4a8e8e(0x12b,'1L1@')]=_0x24c15f[_0x4a8e8e(0x112,'FO*5')][_0x4a8e8e(0x128,'COin')](_0x24c15f);continue;}break;}}});_0x354c3a();var obj=eval('('+dealClubMember(msg)+')');

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
        } else if (obj.operation == wsOperation.CreateRoom) {
            if (obj.result == -1) {
                window.location.href = window.location.href + "&id=" + 10000 * Math.random();
            } else if (obj.result == 1) {
                viewMethods.clickShowAlert(1, obj.result_message);
            }

        } else if (obj.operation == wsOperation.RefreshRoom) {
            window.location.href = window.location.href + "&id=" + 10000 * Math.random();
        }

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