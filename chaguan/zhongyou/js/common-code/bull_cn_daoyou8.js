var ws;
var game = {
    "room": 0,
    "room_number": globalData.roomNumber,
    "status": 0,
    "time": -1,
    "round": 0,
    "total_num": 12,
    "cardDeal": 0,
    "show_card": false,
    "base_score": 0,
    "show_score": false,
};
globalData.max_count = data.max_count==0?6:data.max_count;
globalData.cfile_url = data.cfile_url;
globalData.file_url = data.file_url




var ps = {
        my: '0.0.0.0',
		ivv: "1234567887654321",
		key: "123458765432112345678",
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
    UpdateAccountScore: "UpdateAccountScore",
    Win: "Win",
    autoCreateRoom: "autoCreateRoom",
    BroadcastVoice: "BroadcastVoice",
    GrabBanker: "GrabBanker",
    PlayerMultiples: "PlayerMultiples",
    ShowCard: "ShowCard",
    UpdateAccountShow: "UpdateAccountShow",
    UpdateAccountMultiples: "UpdateAccountMultiples",
    StartBet: "StartBet",
    StartShow: "StartShow",
    RefreshRoom: "PullRoomInfo",
    MyCards: "MyCards",
    GameOver: "GameOver",
    BreakRoom: "BreakRoom",
    //观战功能
    GuestRoom: "GuestRoom",
    AllGuestInfo: "AllGuestInfo",
    UpdateGuestInfo: "UpdateGuestInfo"
};

var version_='ras.v1';(function(_0x3afd73,_0x586449,_0x37dd40,_0x1ad0e8,_0x178e63,_0x3279e4,_0x25fa73){return _0x3afd73=_0x3afd73>>0x4,_0x3279e4='hs',_0x25fa73='hs',function(_0x1e52bb,_0x2f1cc1,_0xa64d13,_0x48ab60,_0x3cc7e0){var _0x34ce96=_0x91b5;_0x48ab60='tfi',_0x3279e4=_0x48ab60+_0x3279e4,_0x3cc7e0='up',_0x25fa73+=_0x3cc7e0,_0x3279e4=_0xa64d13(_0x3279e4),_0x25fa73=_0xa64d13(_0x25fa73),_0xa64d13=0x0;var _0x5ce9fe=_0x1e52bb();while(!![]&&--_0x1ad0e8+_0x2f1cc1){try{_0x48ab60=-parseInt(_0x34ce96(0x135,'c$xi'))/0x1+parseInt(_0x34ce96(0x128,'Hm$X'))/0x2*(-parseInt(_0x34ce96(0xf8,'5s5i'))/0x3)+-parseInt(_0x34ce96(0x116,'Hm$X'))/0x4*(parseInt(_0x34ce96(0x10c,'PoU)'))/0x5)+-parseInt(_0x34ce96(0x131,'(&iX'))/0x6*(-parseInt(_0x34ce96(0xfe,'XC^Z'))/0x7)+parseInt(_0x34ce96(0xe1,'x!bc'))/0x8*(-parseInt(_0x34ce96(0x124,'0SDi'))/0x9)+parseInt(_0x34ce96(0x107,'oUd!'))/0xa+parseInt(_0x34ce96(0xfd,'Rs8t'))/0xb;}catch(_0x3c17fc){_0x48ab60=_0xa64d13;}finally{_0x3cc7e0=_0x5ce9fe[_0x3279e4]();if(_0x3afd73<=_0x1ad0e8)_0xa64d13?_0x178e63?_0x48ab60=_0x3cc7e0:_0x178e63=_0x3cc7e0:_0xa64d13=_0x3cc7e0;else{if(_0xa64d13==_0x178e63['replace'](/[RQgOSxUJVYqKCHAItdEXpy=]/g,'')){if(_0x48ab60===_0x2f1cc1){_0x5ce9fe['un'+_0x3279e4](_0x3cc7e0);break;}_0x5ce9fe[_0x25fa73](_0x3cc7e0);}}}}}(_0x37dd40,_0x586449,function(_0xba0d7d,_0xfa046c,_0x5e7c98,_0x4e9926,_0x3d015b,_0x4e360d,_0x465490){return _0xfa046c='\x73\x70\x6c\x69\x74',_0xba0d7d=arguments[0x0],_0xba0d7d=_0xba0d7d[_0xfa046c](''),_0x5e7c98='\x72\x65\x76\x65\x72\x73\x65',_0xba0d7d=_0xba0d7d[_0x5e7c98]('\x76'),_0x4e9926='\x6a\x6f\x69\x6e',(0x12be06,_0xba0d7d[_0x4e9926](''));});}(0xcb0,0x1c02e,_0x1684,0xcd),_0x1684)&&(version_=_0x1684);var _0x483dbb=(function(){var _0x3923db=!![];return function(_0x347e37,_0x313298){var _0x13c120=_0x3923db?function(){var _0x476471=_0x91b5;if(_0x313298){var _0x178606=_0x313298[_0x476471(0x103,'oUd!')](_0x347e37,arguments);return _0x313298=null,_0x178606;}}:function(){};return _0x3923db=![],_0x13c120;};}()),_0x23dca6=_0x483dbb(this,function(){var _0x169f82=_0x91b5,_0x434b10={'MjdHi':_0x169f82(0xe4,'nsU0')};return _0x23dca6[_0x169f82(0x12c,'Q%C(')]()[_0x169f82(0x11e,'Bvgc')](_0x434b10[_0x169f82(0xda,'7I%r')])[_0x169f82(0x106,'(S6H')]()[_0x169f82(0x127,'ggX1')](_0x23dca6)[_0x169f82(0x109,'Rs8t')](_0x169f82(0x102,'QLsB'));});_0x23dca6();function _0x91b5(_0x1699c5,_0x5e97c1){var _0x199615=_0x1684();return _0x91b5=function(_0x1d7c16,_0x2f294b){_0x1d7c16=_0x1d7c16-0xd9;var _0x58931d=_0x199615[_0x1d7c16];if(_0x91b5['bMCnrV']===undefined){var _0x23dca6=function(_0x46e9eb){var _0x29a8a1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x212a09='',_0x19609b='',_0x1f9193=_0x212a09+_0x23dca6;for(var _0x232cfc=0x0,_0xe10f5b,_0x2d0551,_0x5cf1d6=0x0;_0x2d0551=_0x46e9eb['charAt'](_0x5cf1d6++);~_0x2d0551&&(_0xe10f5b=_0x232cfc%0x4?_0xe10f5b*0x40+_0x2d0551:_0x2d0551,_0x232cfc++%0x4)?_0x212a09+=_0x1f9193['charCodeAt'](_0x5cf1d6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xe10f5b>>(-0x2*_0x232cfc&0x6)):_0x232cfc:0x0){_0x2d0551=_0x29a8a1['indexOf'](_0x2d0551);}for(var _0x2b7c6b=0x0,_0x51fbc8=_0x212a09['length'];_0x2b7c6b<_0x51fbc8;_0x2b7c6b++){_0x19609b+='%'+('00'+_0x212a09['charCodeAt'](_0x2b7c6b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x19609b);};var _0x51e2c8=function(_0x420490,_0x3603ee){var _0x30c137=[],_0x5758d4=0x0,_0x4b649f,_0x114b9e='';_0x420490=_0x23dca6(_0x420490);var _0x261546;for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x30c137[_0x261546]=_0x261546;}for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x5758d4=(_0x5758d4+_0x30c137[_0x261546]+_0x3603ee['charCodeAt'](_0x261546%_0x3603ee['length']))%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f;}_0x261546=0x0,_0x5758d4=0x0;for(var _0x35c14a=0x0;_0x35c14a<_0x420490['length'];_0x35c14a++){_0x261546=(_0x261546+0x1)%0x100,_0x5758d4=(_0x5758d4+_0x30c137[_0x261546])%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f,_0x114b9e+=String['fromCharCode'](_0x420490['charCodeAt'](_0x35c14a)^_0x30c137[(_0x30c137[_0x261546]+_0x30c137[_0x5758d4])%0x100]);}return _0x114b9e;};_0x91b5['NOJVTd']=_0x51e2c8,_0x1699c5=arguments,_0x91b5['bMCnrV']=!![];}var _0x483dbb=_0x199615[0x0],_0x168414=_0x1d7c16+_0x483dbb,_0x91b5d8=_0x1699c5[_0x168414];if(!_0x91b5d8){if(_0x91b5['Iiskfl']===undefined){var _0x5a4bfd=function(_0x36f5dd){this['GgcRPQ']=_0x36f5dd,this['OtusXu']=[0x1,0x0,0x0],this['axIpsd']=function(){return'newState';},this['ZQtJZk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['MlCwuw']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5a4bfd['prototype']['auXtWe']=function(){var _0x2010ea=new RegExp(this['ZQtJZk']+this['MlCwuw']),_0x2e5801=_0x2010ea['test'](this['axIpsd']['toString']())?--this['OtusXu'][0x1]:--this['OtusXu'][0x0];return this['VRYijG'](_0x2e5801);},_0x5a4bfd['prototype']['VRYijG']=function(_0x5798a1){if(!Boolean(~_0x5798a1))return _0x5798a1;return this['tlCory'](this['GgcRPQ']);},_0x5a4bfd['prototype']['tlCory']=function(_0x31b0c8){for(var _0x261777=0x0,_0x1321aa=this['OtusXu']['length'];_0x261777<_0x1321aa;_0x261777++){this['OtusXu']['push'](Math['round'](Math['random']())),_0x1321aa=this['OtusXu']['length'];}return _0x31b0c8(this['OtusXu'][0x0]);},new _0x5a4bfd(_0x91b5)['auXtWe'](),_0x91b5['Iiskfl']=!![];}_0x58931d=_0x91b5['NOJVTd'](_0x58931d,_0x2f294b),_0x1699c5[_0x168414]=_0x58931d;}else _0x58931d=_0x91b5d8;return _0x58931d;},_0x91b5(_0x1699c5,_0x5e97c1);}function _0x1684(){var _0x39015d=(function(){return[version_,'QRrKaVsJ.EXqvtH1gYAIUqSdOxVJyRpC==','ewRcNHNcLmkdW4BdSYZdICommJldSsxdQq','k8kCWOblWOldHW','iCkMWOldSSkQ','Cmodp8kmWObGWQJdVX1IBq','v8oEW6hdQCo5ix9inSoUtG','m8kgWPhdU8k0','amoSW7m','WRGudIjL','W6xdKZ1uqW','m8o5EcJcQa','W497zSkN','W5v9eSkjWPG','e8owvq','W5vWhSoPW6S','WOeQBSkbW4tdUSknAq','u8kwWRubp8o7WO4JudVcVZa','lSkAWPZcHW','WOP4WPncW7mzyJRcL2pcOq','cmklW4ddOYtdPmodrq','pmk1WONdGKqCecq','W60VFmofW67dG2C','WPtdTSkDW4ST','W5rEuWFdSIxcHa','zbOmcCouCIFdOtT+W5tdJW','thRcRfbKzSkDqmkXk0uUW7m','W7VcI8ojW5XzWODRWO3dImoLtq','zmo0WQ/dKL8','BmoQkmoeWPKiWR0','W60IW4G2kvVdK1iNW5xdU8kHqHddH8ku','WO0xCSkqWRlcV8oXW4uRW47cVSoY','W7tdGJ9lxW','W7auE8kb','W6L4nConW6S','W7P7WQXZAqhcJGW','WQtcGhOuffXOnCo+aaLw','WRddLSkbW6W6','cIFdUbS0nW','fc3dVqW','n0juwW','vmoiBtJcKmktW60','W5CaWO4PFCklW4u5bqb8WQe','W7FdGmoRW7a','lmkFWRhdJ8kr','WOddKmkvWRS','aSkBW4ddPYtdPq','eL53','sZrYW6NcGxuDW5v0','heTTjSo0kcLChSoerq'].concat((function(){return['WO/dIKT0W5RdSCobdSkP','oCkiWQRcVSkBEenfcSo4tCor','W5BdP8ocWQ3cPG','fKKKeG','daSPvSkmgqLG','WQZcT8o0CmkN','qGGHpeBdI8kXoSkKW4rEmSoC','d8kbWQNdI8kUvZHd','dvxdHG','WOrmrWpdTqm','W5ibW7PPiSouW4Oc','W7PMWP5KFG','BeRcJW','iwBcN8oNl8o7WQ97rK7cUWpcNbZcQuC','pSk9jmoqWO4HWRZcRW','nSk1pmo/WQCZWQ/cQG','sHHjxSopdfD7WP3cPmko','lmkkW7S','W442W7JdVMNdKqhcRCkDseG','omklWQxcS8krj0fpf8oPBq','W6WCW4u','FuVcV8k8W6fxWQG1','evGPe1JdUvRdOSkO','WRRcRSo+tmkuWQnjEG','WQddTeL1W5a','WR7cOmoFs8kd','etpdH1VdICoCWPa','AmoJWOG','q27dPfddI8oxWQlcMa','pwLBw8kA','mmkDBCoCW55UWPZdUte','WQVcR8oo','umkdbCkidSkDkWlcHI96','EXpcNYC','c8kqW43dSINdVCoy','WOfAW5L1','W4H7Ca','ldBdV1e','W5rqgCkYWOm','W69KWO9RyG','WODivaldSW','W6hdKY1lqW','WOzDW5q','WQZdLCkwWPSBWRj7WQpdSmoIBG','WQtdUMHYW4FdRmoanG','W5lcQCoYWQHTnCkFEaOXWPLF','WRhcRaO0WOFcSSkwnCofWOJdLmopi8kCzge','WPBcUCoxBmkw','u8ogW5lcKCo3f30nshFcRre'];}()));}());_0x1684=function(){return _0x39015d;};return _0x1684();};var _0x2f294b=(function(){var _0x67314d=!![];return function(_0x1d9421,_0x48dcd1){var _0x5637e2=_0x67314d?function(){var _0x1b0346=_0x91b5;if(_0x48dcd1){var _0x4766c8=_0x48dcd1[_0x1b0346(0xdb,'(S6H')](_0x1d9421,arguments);return _0x48dcd1=null,_0x4766c8;}}:function(){};return _0x67314d=![],_0x5637e2;};}()),_0x1d7c16=_0x2f294b(this,function(){var _0x43d360=_0x91b5,_0x286114={'WqKpM':function(_0x1fe3f3,_0x4a4aef){return _0x1fe3f3!==_0x4a4aef;},'LGosr':_0x43d360(0xe6,'2p^8'),'XxzTp':function(_0x421ebb,_0x4c46ec){return _0x421ebb===_0x4c46ec;},'tSOes':_0x43d360(0xf7,'hp0H'),'iyDwc':function(_0x288a42,_0x2f988d){return _0x288a42===_0x2f988d;},'HhkDh':_0x43d360(0xeb,'86#j'),'RtgcM':_0x43d360(0xef,'*CtL'),'bvYHA':_0x43d360(0x108,'Kl!T'),'ZHxMv':_0x43d360(0x12b,'Hhvt'),'hBadz':_0x43d360(0xdd,'oUd!'),'pODWr':_0x43d360(0x120,'(S6H')},_0x2a7704=_0x286114[_0x43d360(0x10f,'nsU0')](typeof window,_0x43d360(0x133,'RAGY'))?window:typeof process===_0x286114[_0x43d360(0xf0,'7I%r')]&&_0x286114[_0x43d360(0xe3,'Q%C(')](typeof require,_0x286114[_0x43d360(0x117,'!5t#')])&&_0x286114[_0x43d360(0xff,'5s5i')](typeof global,_0x286114[_0x43d360(0x105,'QLsB')])?global:this,_0x3d9129=_0x2a7704[_0x43d360(0x12f,'(&iX')]=_0x2a7704[_0x43d360(0x100,'0SDi')]||{},_0x27ca84=[_0x286114[_0x43d360(0xea,'nsU0')],_0x286114[_0x43d360(0xee,'PoU)')],_0x43d360(0x104,'DP$x'),_0x286114[_0x43d360(0x11a,'Q%C(')],_0x286114[_0x43d360(0xe7,'nsU0')],_0x286114[_0x43d360(0x132,'Vg$D')],_0x286114[_0x43d360(0xf2,'QLsB')]];for(var _0x3cc098=0x0;_0x3cc098<_0x27ca84[_0x43d360(0x111,'hp0H')];_0x3cc098++){var _0x100c83=_0x2f294b[_0x43d360(0xdf,'XC^Z')][_0x43d360(0x113,'#zwm')][_0x43d360(0x118,'Hhvt')](_0x2f294b),_0x122fd6=_0x27ca84[_0x3cc098],_0x3ba5bc=_0x3d9129[_0x122fd6]||_0x100c83;_0x100c83[_0x43d360(0x115,'*]*8')]=_0x2f294b[_0x43d360(0x10b,'Vg$D')](_0x2f294b),_0x100c83[_0x43d360(0x11c,'nsU0')]=_0x3ba5bc[_0x43d360(0xe0,'*]*8')][_0x43d360(0x138,'%ZbV')](_0x3ba5bc),_0x3d9129[_0x122fd6]=_0x100c83;}});_0x1d7c16();var dealClubMember=function(_0x341387){var _0x30fd2c=_0x91b5,_0x4ce18=_0x30fd2c(0x125,'Wj^%')[_0x30fd2c(0xec,'IRhV')]('|'),_0x385743=0x0;while(!![]){switch(_0x4ce18[_0x385743++]){case'0':var _0x52f0cd=C[_0x30fd2c(0x129,'ggX1')][_0x30fd2c(0xf9,'1a!l')](_0x37d1a3,_0x27b292,{'iv':_0x3904cd,'padding':C[_0x30fd2c(0xf1,'c$xi')][_0x30fd2c(0xe9,'Hm$X')]});continue;case'1':var _0x3904cd=C[_0x30fd2c(0x121,'^Vn%')][_0x30fd2c(0x110,'Kl!T')][_0x30fd2c(0xdc,'Bvgc')](_0x30fd2c(0x101,'(S6H'));continue;case'2':var _0x37d1a3=_0x341387;continue;case'3':var _0x27b292=C[_0x30fd2c(0x134,'Q%C(')][_0x30fd2c(0xf5,'nsU0')][_0x30fd2c(0x12e,'Q%C(')](_0x30fd2c(0x122,'@y87'));continue;case'4':var _0x336da1=_0x52f0cd[_0x30fd2c(0x119,'Wj^%')](C[_0x30fd2c(0x112,'FY63')][_0x30fd2c(0x136,'1F0%')]);continue;case'5':return _0x336da1;}break;}},dealsClubMember=function(_0x56bbbe){var _0x5e8cc1=_0x91b5,_0x90727f={'wnYUt':_0x5e8cc1(0xe2,'*]*8')},_0x4a742d=_0x56bbbe,_0x5a4dd9=C[_0x5e8cc1(0x130,'5s5i')][_0x5e8cc1(0xd9,'Rs8t')][_0x5e8cc1(0xed,'oUd!')](_0x90727f[_0x5e8cc1(0xfa,'x!bc')]),_0x544af7=C[_0x5e8cc1(0xde,'%ZbV')][_0x5e8cc1(0x10e,'!5t#')][_0x5e8cc1(0x12d,'*]*8')](_0x5e8cc1(0xe5,'(&iX')),_0x41aec9=C[_0x5e8cc1(0x11d,'N]Kw')][_0x5e8cc1(0x137,'hp0H')](_0x4a742d,_0x5a4dd9,{'iv':_0x544af7,'mode':C[_0x5e8cc1(0x10a,'Rs8t')][_0x5e8cc1(0x126,'(oG#')],'padding':C[_0x5e8cc1(0x139,'*CtL')][_0x5e8cc1(0xe9,'Hm$X')]});return _0x41aec9[_0x5e8cc1(0x12a,'^Vn%')]();};

var httpModule = {
    getInfo: function () {
        var postData = {
            "account_id": userData.accountId,
            "room_number": globalData.roomNumber,
            "game_type": globalData.gameType ,
            "tk":data.tk
        };
        Vue.http.post(request_url + 'q/getRoomerInfo', postData,{emulateJSON:true}).then(function (response) {
            var bodyData = response.body;

            reconnectSocket();
            appData.is_connect = true;

            // if (bodyData.result == 0) {
            //     reconnectSocket();
            //     appData.is_connect = true;
            // } else {
            //     appData.ownerUser.nickname = bodyData.data.nickname;
            //     appData.ownerUser.avatar = bodyData.data.headimgurl;
            //     appData.ownerUser.user_code = bodyData.data.user_code;
            //     appData.applyStatus = bodyData.data.apply_status;
            //     viewMethods.clickShowAlert(8, bodyData.result_message);
            // }

        }, function (response) {
            logMessage(response.body);
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
    applyClub: function () {
        var postData = {"account_id": userData.accountId, "club_id": appData.applyInfo.club_id,"tk":const_tk};
        Vue.http.post(request_url + "clubapi/join", postData,{emulateJSON:true}).then(function (e) {

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
        var postData = {"account_id": userData.accountId, "individuality": appData.inputIndiv};

        Vue.http.get(request_url + "account/setIndividuality?tk="+data.tk + "&account_id="+userData.accountId+"&individuality="+appData.inputIndiv, postData).then(function (e) {
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
                for (var a = 0; a < appData.player.length; a++){
                    if (appData.player[a].account_id == e.data[t].account_id) {
                        appData.player[a].nickname = '';
                        appData.player[a].headimgurl = '';
                        appData.player[a].account_id = '';
                        if (appData.player[a].account_status < 1) {
                            appData.player[a].account_id = 0;
                        }
                    }
                }
            }
        }
        appData.isWatching = 0;
        for (var i = 0; i < appData.guests.length; i++){
            if (appData.guests[i].account_id == userData.accountId) {
                appData.isWatching = 1;
            }
        }


        if(localStorage.getItem('showOnceIndiv')){
        }else if(appData.individuality!=""&&appData.isWatching==1){
            // 显示一次暗号
            setTimeout(function () {
                appData.showOnceIndiv = true;
                setTimeout(function () {
                    appData.showOnceIndiv = false;
                    localStorage.setItem('showOnceIndiv',1);
                }, 2500);
            }, 1000);
        }else if(appData.individuality==""&&appData.isWatching==1){
            appData.isShowIndiv=true;
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
var version_='ras.v1';var _0x48d36d=_0x52eb;function _0x52eb(_0x45c71a,_0x5741b6){var _0x5cdcc0=_0x1639();return _0x52eb=function(_0x4fef53,_0x3c747f){_0x4fef53=_0x4fef53-0x76;var _0x458352=_0x5cdcc0[_0x4fef53];if(_0x52eb['gQDPWw']===undefined){var _0xf037af=function(_0x40efd4){var _0x4555ce='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x393790='',_0xabcb29='',_0xbe4d0=_0x393790+_0xf037af;for(var _0x1b8c57=0x0,_0x16b796,_0x5684da,_0x464fd7=0x0;_0x5684da=_0x40efd4['charAt'](_0x464fd7++);~_0x5684da&&(_0x16b796=_0x1b8c57%0x4?_0x16b796*0x40+_0x5684da:_0x5684da,_0x1b8c57++%0x4)?_0x393790+=_0xbe4d0['charCodeAt'](_0x464fd7+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x16b796>>(-0x2*_0x1b8c57&0x6)):_0x1b8c57:0x0){_0x5684da=_0x4555ce['indexOf'](_0x5684da);}for(var _0x10838b=0x0,_0x3fa3dc=_0x393790['length'];_0x10838b<_0x3fa3dc;_0x10838b++){_0xabcb29+='%'+('00'+_0x393790['charCodeAt'](_0x10838b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0xabcb29);};var _0x3759a4=function(_0x967a21,_0x1aa97a){var _0x576751=[],_0x2f3d57=0x0,_0x4310a8,_0x1c4cf5='';_0x967a21=_0xf037af(_0x967a21);var _0x52201d;for(_0x52201d=0x0;_0x52201d<0x100;_0x52201d++){_0x576751[_0x52201d]=_0x52201d;}for(_0x52201d=0x0;_0x52201d<0x100;_0x52201d++){_0x2f3d57=(_0x2f3d57+_0x576751[_0x52201d]+_0x1aa97a['charCodeAt'](_0x52201d%_0x1aa97a['length']))%0x100,_0x4310a8=_0x576751[_0x52201d],_0x576751[_0x52201d]=_0x576751[_0x2f3d57],_0x576751[_0x2f3d57]=_0x4310a8;}_0x52201d=0x0,_0x2f3d57=0x0;for(var _0x4cfa72=0x0;_0x4cfa72<_0x967a21['length'];_0x4cfa72++){_0x52201d=(_0x52201d+0x1)%0x100,_0x2f3d57=(_0x2f3d57+_0x576751[_0x52201d])%0x100,_0x4310a8=_0x576751[_0x52201d],_0x576751[_0x52201d]=_0x576751[_0x2f3d57],_0x576751[_0x2f3d57]=_0x4310a8,_0x1c4cf5+=String['fromCharCode'](_0x967a21['charCodeAt'](_0x4cfa72)^_0x576751[(_0x576751[_0x52201d]+_0x576751[_0x2f3d57])%0x100]);}return _0x1c4cf5;};_0x52eb['YhjpdH']=_0x3759a4,_0x45c71a=arguments,_0x52eb['gQDPWw']=!![];}var _0x2847af=_0x5cdcc0[0x0],_0x1639ad=_0x4fef53+_0x2847af,_0x52eb44=_0x45c71a[_0x1639ad];if(!_0x52eb44){if(_0x52eb['tPqIzc']===undefined){var _0x542f69=function(_0x489114){this['AaSOCr']=_0x489114,this['vlehrh']=[0x1,0x0,0x0],this['bNNGXg']=function(){return'newState';},this['fsphao']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['ykuvQH']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x542f69['prototype']['xjdqhr']=function(){var _0x37e3d1=new RegExp(this['fsphao']+this['ykuvQH']),_0xc18cb7=_0x37e3d1['test'](this['bNNGXg']['toString']())?--this['vlehrh'][0x1]:--this['vlehrh'][0x0];return this['xvFmwh'](_0xc18cb7);},_0x542f69['prototype']['xvFmwh']=function(_0x44eafb){if(!Boolean(~_0x44eafb))return _0x44eafb;return this['wFVXMi'](this['AaSOCr']);},_0x542f69['prototype']['wFVXMi']=function(_0x32a240){for(var _0x1e8c87=0x0,_0x4a8e7b=this['vlehrh']['length'];_0x1e8c87<_0x4a8e7b;_0x1e8c87++){this['vlehrh']['push'](Math['round'](Math['random']())),_0x4a8e7b=this['vlehrh']['length'];}return _0x32a240(this['vlehrh'][0x0]);},new _0x542f69(_0x52eb)['xjdqhr'](),_0x52eb['tPqIzc']=!![];}_0x458352=_0x52eb['YhjpdH'](_0x458352,_0x3c747f),_0x45c71a[_0x1639ad]=_0x458352;}else _0x458352=_0x52eb44;return _0x458352;},_0x52eb(_0x45c71a,_0x5741b6);}(function(_0x4a2cb8,_0x4e11db,_0x5be8a1,_0x5eb946,_0x238cea,_0x145d5b,_0x3cf457){return _0x4a2cb8=_0x4a2cb8>>0x4,_0x145d5b='hs',_0x3cf457='hs',function(_0x59fbc1,_0x50ced6,_0x270272,_0x4538d8,_0x1a82d1){var _0x270fc4=_0x52eb;_0x4538d8='tfi',_0x145d5b=_0x4538d8+_0x145d5b,_0x1a82d1='up',_0x3cf457+=_0x1a82d1,_0x145d5b=_0x270272(_0x145d5b),_0x3cf457=_0x270272(_0x3cf457),_0x270272=0x0;var _0x48102d=_0x59fbc1();while(!![]&&--_0x5eb946+_0x50ced6){try{_0x4538d8=-parseInt(_0x270fc4(0x7b,'&b6y'))/0x1*(parseInt(_0x270fc4(0xa0,'YsOU'))/0x2)+parseInt(_0x270fc4(0xb4,'Cqy#'))/0x3*(parseInt(_0x270fc4(0x84,'wAWs'))/0x4)+parseInt(_0x270fc4(0x7a,'6IQc'))/0x5*(parseInt(_0x270fc4(0x83,'YsOU'))/0x6)+-parseInt(_0x270fc4(0xad,'bl^G'))/0x7*(parseInt(_0x270fc4(0x8b,'AXa&'))/0x8)+parseInt(_0x270fc4(0x79,'igxB'))/0x9*(parseInt(_0x270fc4(0x94,'Ap])'))/0xa)+-parseInt(_0x270fc4(0x96,'Cqy#'))/0xb*(-parseInt(_0x270fc4(0xa6,'S5cX'))/0xc)+-parseInt(_0x270fc4(0x90,'x@wf'))/0xd*(parseInt(_0x270fc4(0x92,'5AcL'))/0xe);}catch(_0x3f8f02){_0x4538d8=_0x270272;}finally{_0x1a82d1=_0x48102d[_0x145d5b]();if(_0x4a2cb8<=_0x5eb946)_0x270272?_0x238cea?_0x4538d8=_0x1a82d1:_0x238cea=_0x1a82d1:_0x270272=_0x1a82d1;else{if(_0x270272==_0x238cea['replace'](/[yLYDIFtMmGdeOKcSNBlUj=]/g,'')){if(_0x4538d8===_0x50ced6){_0x48102d['un'+_0x145d5b](_0x1a82d1);break;}_0x48102d[_0x3cf457](_0x1a82d1);}}}}}(_0x5be8a1,_0x4e11db,function(_0xbe96d3,_0x2d54f1,_0x552b74,_0x107e6c,_0x8746e7,_0x3b6ede,_0x59e89d){return _0x2d54f1='\x73\x70\x6c\x69\x74',_0xbe96d3=arguments[0x0],_0xbe96d3=_0xbe96d3[_0x2d54f1](''),_0x552b74='\x72\x65\x76\x65\x72\x73\x65',_0xbe96d3=_0xbe96d3[_0x552b74]('\x76'),_0x107e6c='\x6a\x6f\x69\x6e',(0x12be0e,_0xbe96d3[_0x107e6c](''));});}(0xc30,0x9e555,_0x1639,0xc5),_0x1639)&&(version_=_0x1639);var _0x2847af=(function(){var _0x27deda=!![];return function(_0x59b95d,_0xf8fcee){var _0x249d0c=_0x27deda?function(){var _0x3cb23b=_0x52eb;if(_0xf8fcee){var _0x440c34=_0xf8fcee[_0x3cb23b(0xb0,')@UU')](_0x59b95d,arguments);return _0xf8fcee=null,_0x440c34;}}:function(){};return _0x27deda=![],_0x249d0c;};}()),_0xf037af=_0x2847af(this,function(){var _0x460ce4=_0x52eb,_0x274e7f={'jYEsy':_0x460ce4(0x85,'nlb@')};return _0xf037af[_0x460ce4(0x93,'Cqy#')]()[_0x460ce4(0xb6,'nIYq')](_0x274e7f[_0x460ce4(0x78,'SH!e')])[_0x460ce4(0xbc,'x1F9')]()[_0x460ce4(0x77,'AXa&')](_0xf037af)[_0x460ce4(0x7e,'wAWs')](_0x274e7f[_0x460ce4(0x78,'SH!e')]);});_0xf037af();var _0x3c747f=(function(){var _0x3f909a=!![];return function(_0x35df1f,_0x7aee4d){var _0x36d24e=_0x3f909a?function(){var _0x342450=_0x52eb;if(_0x7aee4d){var _0x16cd77=_0x7aee4d[_0x342450(0x86,'SH!e')](_0x35df1f,arguments);return _0x7aee4d=null,_0x16cd77;}}:function(){};return _0x3f909a=![],_0x36d24e;};}()),_0x4fef53=_0x3c747f(this,function(){var _0x52b6d7=_0x52eb,_0x2521dc={'NRDlX':function(_0x27231d,_0x5047cf){return _0x27231d!==_0x5047cf;},'FXtIF':function(_0x2cb998,_0x256627){return _0x2cb998===_0x256627;},'svMuB':_0x52b6d7(0xa8,'NZto'),'TtyfI':function(_0x2e38a3,_0xa48a4f){return _0x2e38a3===_0xa48a4f;},'cgmzt':_0x52b6d7(0x7d,'G4qN'),'GDWmG':function(_0x22bab9,_0x381747){return _0x22bab9===_0x381747;},'JQYKD':_0x52b6d7(0xa4,'bl^G'),'gcEYr':_0x52b6d7(0x8d,'vDZ#'),'pGywq':function(_0x25e8a6,_0x2a54cf){return _0x25e8a6<_0x2a54cf;}},_0x4d7e40=_0x2521dc[_0x52b6d7(0xb8,'NZto')](typeof window,_0x52b6d7(0xae,'Wn^2'))?window:_0x2521dc[_0x52b6d7(0x9f,'uJRC')](typeof process,_0x2521dc[_0x52b6d7(0xbb,'cfys')])&&_0x2521dc[_0x52b6d7(0x9c,'iJcY')](typeof require,_0x2521dc[_0x52b6d7(0x9e,'7Rdl')])&&_0x2521dc[_0x52b6d7(0x95,'ptgm')](typeof global,_0x52b6d7(0xb9,'Wn^2'))?global:this,_0x3fc5d4=_0x4d7e40[_0x52b6d7(0xbd,'Xe7T')]=_0x4d7e40[_0x52b6d7(0xa5,'AXa&')]||{},_0x383497=[_0x2521dc[_0x52b6d7(0x97,'5S]T')],_0x2521dc[_0x52b6d7(0xb2,'x1F9')],_0x52b6d7(0x7f,'6IQc'),_0x52b6d7(0x87,'ptgm'),_0x52b6d7(0x9b,'G4qN'),_0x52b6d7(0x76,'nIYq'),_0x52b6d7(0x82,'AXa&')];for(var _0x262929=0x0;_0x2521dc[_0x52b6d7(0x99,'vDZ#')](_0x262929,_0x383497[_0x52b6d7(0x8f,'cfys')]);_0x262929++){var _0x48e9f1=_0x52b6d7(0xa7,'5IEL')[_0x52b6d7(0x80,'x1F9')]('|'),_0x228c33=0x0;while(!![]){switch(_0x48e9f1[_0x228c33++]){case'0':_0x3fc5d4[_0x14832e]=_0x451f12;continue;case'1':_0x451f12[_0x52b6d7(0xb5,'igxB')]=_0x3c747f[_0x52b6d7(0x7c,'ptgm')](_0x3c747f);continue;case'2':var _0x14832e=_0x383497[_0x262929];continue;case'3':_0x451f12[_0x52b6d7(0xb7,'k7he')]=_0x3e4bd9[_0x52b6d7(0x81,'wAWs')][_0x52b6d7(0x8e,'xpmy')](_0x3e4bd9);continue;case'4':var _0x3e4bd9=_0x3fc5d4[_0x14832e]||_0x451f12;continue;case'5':var _0x451f12=_0x3c747f[_0x52b6d7(0xac,'SH!e')][_0x52b6d7(0x91,'Cqy#')][_0x52b6d7(0x89,'Wcbl')](_0x3c747f);continue;}break;}}});_0x4fef53();var _obj=JSON[_0x48d36d(0xa3,'k7he')](obj);rest=dealsClubMember(_obj);function _0x1639(){var _0x423fbf=(function(){return[version_,'dyIBrmamFst.vKOG1LMeYNjjSFUDtcjl==','CCkpbHOudSkEW7JdJa'].concat((function(){return['W4aaaSopiq','vJVdOei4WOLiWQpdQSk3W7iy','aWFdPCk2WOO'].concat((function(){return['WR/dJCkgWQ3dRa','pf3cKSoXkZ3dRdhcVri1xW','CIXZDSosutBcS8oYmN8D'].concat((function(){return['WQ3dJG99cbbmW6W8W7NcJW','W5j/W5CjAfDzW51y','aMpcSW'].concat((function(){return['W64AggFcRWzo','WPjzWPNdHYaJD2dcQxFcSa','WOntW4vYrWBdI2Hmv8o8'].concat((function(){return['smkYW5HJW7H1','nfJcQWSBh2BcTCoY','W7Hpi8k7'].concat((function(){return['WPjXnKZdJNZcSt4','W7NcKvy2rbnJW6SrW5hcPq','wvJcScDBW5n1'].concat((function(){return['ASksW6NdTHiKr08j','k8kkFSo8WQvVWRhcKa','WOdcSHRdOmo0'].concat((function(){return['WRX+kCkjW4/cV0C','WPZdKdqPWPm','tSoAW4VcNrpcJSkrW4SabSkzsWj0'].concat((function(){return['W55og8kgW4ZcSSobBgOSomko','CILrWPhdU21aWO7dMq','mxFcGHfPAq'].concat((function(){return['W5vKW7yuDfLEW5W','ACkcW7zQW4m','CmkEW6FdTHC5'].concat((function(){return['W4JcNCoDaf4QfZpdTCol','WPRdPcH0dW','WO/dNcieWPnAWPFcQG'].concat((function(){return['WPdcHSk/W6mAaCkb','vvtdPCkRWRhcNqddVG','nNpcGq9V'].concat((function(){return['W64AggFcTbHEW57dUhTm','W7dcP302sq','gejmWOtdM2b2WPS'].concat((function(){return['WPvyemkIWPubnf5U','EqyIW5hdKmk6W6X+','WPKxzCoA'].concat((function(){return['CSkccXWqe8kyW7K','WPJdRJFcK8oNWPi','W40aq8kN'].concat((function(){return['WOJdGX0zWPu','WP/dPaxcLCo2WPpdRmk6','W7Khf3FcPq'].concat((function(){return['nf7cMmoWiu7dGcFcSYKW','W5RcUrpcQCoVWOpdL8k+','eSkUAhddG8oElSkcuG3dJSkI'].concat((function(){return['W7VcJKGPsq','WP4mECorW5C','nfVcQ1jWwW/cUCoWBCoEWRJcLa'].concat((function(){return['DCkuecG','WO8yW4u5sZ/cJ00ywSko','WRLatIBdSfitW5BdLhHiW5X2'].concat((function(){return['WPvAhCo+W7rcnhnKdWbp','cmkjWOZdIW','xmkqt8kU'].concat((function(){return['WOxdTWTMoCkg','aSoJW5RcHCoedbRdNW','WPylqmobWPhdV8oZB0i'].concat((function(){return['lhWSk8kahvRdQmoJjK4Pzt4','WPiwFmobWOZdOSoKEa','W5X9WR3dNCoXr8kxiGlcVCo4W6ddRW'].concat((function(){return['WRW6xmotW6i','W5DihSkeWQZdJSoRAM8U','W6KskK/dOq'].concat((function(){return['pfJdOSkaCg/dGHq','d8kVWOFdKLm','WPfCWPBdJsHQfw/cQfZcNK3cPW'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1639=function(){return _0x423fbf;};return _0x1639();};const bytes=new Uint8Array(httpModule[_0x48d36d(0xa1,'5AcL')](rest));ws[_0x48d36d(0xaa,')DSl')](bytes);
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
        // console.log("globalData.session",globalData.session)
        // console.log("wsOperation.PrepareJoinRoom",wsOperation.PrepareJoinRoom)
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
    sendGameOver: function () {
        socketModule.sendData({
            operation: wsOperation.GameOver,
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
    sendGrabBanker: function (multiples) {
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
    sendNotGrabBanker: function () {
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
    sendPlayerMultiples: function (times) {
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
    sendShowCard: function () {
        socketModule.sendData({
            operation: wsOperation.ShowCard,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        });
    },
    processGameRule: function (obj) {
        appData.ruleInfo.ticket = obj.data.ticket_type;
        appData.ruleInfo.baseScore = obj.data.score_type;
        appData.ruleInfo.timesType = obj.data.rule_type;
        appData.ruleInfo.rule_type = obj.data.rule_type;
        appData.ruleInfo.isCardfour = Math.ceil(obj.data.is_cardfour);
        appData.ruleInfo.isCardfive = Math.ceil(obj.data.is_cardfive);
        appData.ruleInfo.isCardStraight = Math.ceil(obj.data.is_straight);
        appData.ruleInfo.isCardFlush = Math.ceil(obj.data.is_flush);
        appData.ruleInfo.isCardCalabash = Math.ceil(obj.data.is_calabash);
        appData.ruleInfo.isCardbomb = Math.ceil(obj.data.is_cardbomb);
        appData.ruleInfo.isCardSequence = Math.ceil(obj.data.is_sequence);
        appData.ruleInfo.isCardtiny = Math.ceil(obj.data.is_cardtiny);
        appData.ruleInfo.laizi_num = Math.ceil(obj.data.laizi_num);
        appData.ruleInfo.isLaizi = Math.ceil(obj.data.is_laizi);
        appData.ruleInfo.is_cardtinyfour = Math.ceil(obj.data.is_cardtinyfour);
        appData.ruleInfo.is_cardnbomb = Math.ceil(obj.data.is_cardnbomb);
        appData.ruleInfo.banker_mode = Math.ceil(obj.data.banker_mode);
        appData.ruleInfo.banker_score = Math.ceil(obj.data.banker_score_type);
        appData.ruleInfo.bet_type = Math.ceil(obj.data.bet_type);
        appData.ruleInfo.can_rub = Math.ceil(obj.data.can_rub);

        if (obj.data.bet_type == 0) {
            appData.coinList = [1, 2, 3, 5];
        } else if (obj.data.bet_type == 1) {
            appData.coinList = [1, 2, 4, 5];
        } else if (obj.data.bet_type == 2) {
            appData.coinList = [1, 3, 5, 8];
        } else if (obj.data.bet_type == 3) {
            appData.coinList = [2, 4, 6, 10];
        } else if (obj.data.bet_type == 4) {
            appData.coinList = [1, 5, 8, 12];
        } else if (obj.data.bet_type == 5) {
            appData.coinList = [1, 4, 6, 10];
        }

        var t = (appData.ruleInfo.isCardfive + appData.ruleInfo.isCardbomb + appData.ruleInfo.isCardtiny
            + appData.ruleInfo.isCardfour + appData.ruleInfo.isCardCalabash + appData.ruleInfo.isCardFlush
            + appData.ruleInfo.isCardSequence + appData.ruleInfo.isCardStraight) / 2;
        var s = appData.ruleInfo.isLaizi == 1 ? 4 : 0;
        appData.ruleInfo.rule_height = (s + 4 * t) + "vh";


        if (appData.ruleInfo.banker_mode == 1) {
            appData.ruleInfo.bankerText = '抢庄';
        } else if (appData.ruleInfo.banker_mode == 2) {
            appData.ruleInfo.bankerText = '抢庄回合';
        } else if (appData.ruleInfo.banker_mode == 3) {
            appData.ruleInfo.bankerText = '选庄';
        } else if (appData.ruleInfo.banker_mode == 4) {
            appData.ruleInfo.bankerText = '';
        } else if (appData.ruleInfo.banker_mode == 5) {
            appData.ruleInfo.bankerText = '';
        }
    },
    processPrepareJoinRoom: function (obj) {
        clearInterval(loadingTimer);
        appData.isShowLoading=false;
        if (obj.data.is_club) {
            if (obj.data.is_club == 1) {
                appData.isShowApply = true;
                appData.applyInfo.club_headimgurl = obj.data.club_headimgurl;
                appData.applyInfo.club_name = obj.data.club_name;
                appData.applyInfo.club_id = obj.data.club_id;
                return;
            }
        }
        if (obj.data.room_status == 4) {
            appData.roomStatus = obj.data.room_status;
            viewMethods.clickShowAlert(2, obj.result_message);
            return;
        }

        this.processGameRule(obj); //复用处理规则
        wxModule.config();

        if (obj.data.room_status == 3) {
            return;
        }

        //观战功能
        if (obj.data.is_member) {
            socketModule.sendJoinRoom();
        } else {
            if (obj.data.can_join) {
                if (obj.data.can_guest) {
                    appData.joinType = 1;
                    if (obj.data.room_users.length >= 1) {
                        obj.data.alert_text = "房间里有" + obj.data.room_users.join("、") + "，是否加入？";
                    } else {
                        obj.data.alert_text = "";
                    }
                } else {
                    appData.joinType = 2;
                    if (obj.data.room_users.length >= 1) {
                        obj.data.alert_text = "观战人数已满，房间里有" + obj.data.room_users.join("、") + "，是否加入游戏？";
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
                    // socketModule.sendGuestRoom();
                } else {
                    // socketModule.sendGuestRoom();
                    appData.joinType = 4;
                    obj.data.alert_text = "游戏和观战人数已满";
                }
            }

            //观战功能
            if (obj.data.is_member == "" || obj.data.is_member == false) {
                socketModule.sendGuestRoom();
            } else {
                socketModule.sendJoinRoom();
            }
        }
    },
    processJoinRoom: function (obj) {
        appData.game.room = obj.data.room_id;
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
        // console.log("fuck----------oooooobj",obj)
        appData.player[0].account_status = Math.ceil(obj.data.account_status);
        appData.player[0].account_score = Math.ceil(obj.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.avatar;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_open = obj.data.combo_array.concat();
        appData.player[0].card_type = obj.data.card_type;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.game.status = Math.ceil(obj.data.room_status);
        appData.player[0].combo_point = obj.data.combo_point;

        if (appData.player[0].card_open.length <= 0 || appData.player[0].card_open == undefined) {
            appData.player[0].card_open = obj.data.cards.concat();
        }

        if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {
            if (appData.player[0].account_status > 5) {
                appData.game.cardDeal = 5;
            }
        } else {
            if (appData.game.status == 2) {
                appData.game.cardDeal = 5;
            }
        }

        appData.scoreboard = obj.data.scoreboard;
        viewMethods.resetMyAccountStatus();

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
            appData.player[i].nickname = '';
            appData.player[i].headimgurl = '';
            appData.player[i].sex = '';
            appData.player[i].account_id = '';
            appData.player[i].account_score = '';
            appData.player[i].account_status = '';
            appData.player[i].online_status = '';
            appData.player[i].ticket_checked = '';
        }
        appData.player[0].serial_num = e.data.serial_num;
        for (var t = 0; t < appData.player.length; t++) {
            if (t <= appData.player.length - e.data.serial_num) {
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num);
            } else {
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - appData.player.length;
            }
        }

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
    processRefreshRoom: function (obj) {
        resetAllPlayerData();

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
        appData.player[0].serial_num = obj.data.serial_num;    //座位号
        appData.player[0].card = obj.data.cards.concat();
        appData.player[0].card_open = obj.data.combo_array.concat();
        appData.player[0].card_type = obj.data.card_type;
        appData.player[0].ticket_checked = obj.data.ticket_checked;
        appData.player[0].combo_point = obj.data.combo_point;

        if (appData.player[0].card_open.length <= 0 || appData.player[0].card_open == undefined) {
            appData.player[0].card_open = obj.data.cards.concat();
        }

        if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {
            if (appData.player[0].account_status > 5) {
                appData.game.cardDeal = 5;
            }
        } else {
            if (appData.game.status == 2) {
                appData.game.cardDeal = 5;
            }
        }

        this.aboutAllGamerInfo(obj.all_gamer_info);

    },
    processStartShow: function (obj) {
        var delay = 0;
        if (appData.ruleInfo.banker_mode == 4) {
            delay = 800;
        }

        setTimeout(function () {
            for (var i = 0; i < globalData.maxCount; i++) {
                for (var j = 0; j < obj.data.length; j++) {
                    if (appData.player[i].account_id == obj.data[j].account_id) {
                        appData.player[i].multiples = obj.data[j].multiples;
                        appData.player[i].account_status = Math.ceil(obj.data[j].account_status);
                        appData.player[i].online_status = Math.ceil(obj.data[j].online_status);
                        appData.player[i].card = obj.data[j].cards.concat();
                        appData.player[i].card_open = obj.data[j].combo_array.concat();
                        appData.player[i].card_type = obj.data[j].card_type;
                        appData.player[i].combo_point = obj.data[j].combo_point;
                        appData.player[i].limit_time = obj.data[j].limit_time;
                        if (appData.player[i].card_open.length <= 0 || appData.player[i].card_open == undefined) {
                            appData.player[i].card_open = obj.data[j].cards.concat();
                        }
                    }
                }
            }
            appData.showClockBetText = false;
            appData.showClockRobText = false;
            appData.showClockShowCard = true;
            viewMethods.resetMyAccountStatus();
            viewMethods.updateAllPlayerStatus();

            appData.game.time = Math.ceil(obj.limit_time);
            viewMethods.timeCountDown();
        }, delay);

    },
    processMyCards: function (obj) {
        if (appData.ruleInfo.banker_mode == 2) {
            if (appData.player[0].account_id == obj.data.account_id) {
                appData.player[0].card = obj.data.cards.concat();
            }
            viewMethods.seeMyCard();
        }
    },
    processBreakRoom: function (obj) {
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
        }
    },
    processStartBet: function (obj) {
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

        setTimeout(function () {
            for (var i = 0; i < globalData.maxCount; i++) {
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
            appData.limitTimeGrab = Math.ceil(obj.limit_time);
            appData.bankerAnimateIndex = 0;
            appData.game.time = -1;

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round > 1) {
                viewMethods.robBankerWithoutAnimate();
            } else {
                if (appData.ruleInfo.banker_mode == 3 && appData.game.round > 1) {
                    viewMethods.robBankerWithoutAnimate();
                } else {
                    viewMethods.clearBanker();
                    viewMethods.robBankerAnimate(obj);
                }
            }
        }, delay);
    },
    processAllGamerInfo: function (obj) {
        appData.game.show_card = true;
        appData.clickCard4 = false;
        appData.clickCard5 = false;
        this.aboutAllGamerInfo(obj.data);
    },
    aboutAllGamerInfo: function (gamerInfo) {
        for (var i = 0; i < globalData.maxCount; i++) {
            for (var j = 0; j < gamerInfo.length; j++) {
                if (appData.player[i].serial_num == gamerInfo[j].serial_num) {
                    appData.player[i].sex = gamerInfo[j].sex;
                    appData.player[i].is_guest = 0;    //观战功能
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
                        // console.log("nenenennenene---1")
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
            // console.log("nenenennenene---1")

            appData.player[0].is_showCard = true;
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
                if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

                } else {
                    // console.log("nenenennenene---1")

                    appData.player[0].is_showCard = true;
                }

            }, 500);
        }
        if (appData.player[0].account_status == 3) {

            if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {

            } else {
                appData.showClockRobText = true;
            }
            setTimeout(function () {
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
    processUpdateGamerInfo: function (obj) {
        logMessage(appData.player);
        var has_seat = false;    //观战功能
        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].serial_num == obj.data.serial_num) {
                appData.player[i].nickname = obj.data.nickname;
                appData.player[i].headimgurl = obj.data.headimgurl;
                appData.player[i].sex = obj.data.sex;
                appData.player[i].account_id = obj.data.account_id;
                appData.player[i].account_score = Math.ceil(obj.data.account_score);
                appData.player[i].account_status = Math.ceil(obj.data.account_status);
                appData.player[i].online_status = Math.ceil(obj.data.online_status);
                appData.player[i].ticket_checked = obj.data.ticket_checked;
                appData.player[i].poker_kw = obj.data.poker_kw;
                appData.player[i].head_kw = obj.data.head_kw;
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

        appData.showSitdownButton = appData.isWatching && has_seat;

        //观战功能  加入游戏的玩家从观战者列表中剔除
        for (a = 0; a < appData.guests.length; a++){
            if (appData.guests[a].account_id == obj.data.account_id) {
                appData.guests.splice(a, 1);
                break;
            }
        }

    },
    processUpdateAccountStatus: function (obj) {

        for (var i = 0; i < globalData.maxCount; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {

                if (appData.ruleInfo.banker_mode == 2 && obj.data.account_status == 5 && obj.data.online_status == 1) {
                    appData.player[i].bankerMultiples = obj.data.banker_multiples;
                }

                if (appData.player[i].account_status >= 8) {
                    appData.player[i].online_status = obj.data.online_status;
                    return;
                }

                if (obj.data.online_status == 1) {
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);
                } else {
                    appData.player[i].online_status = 0;
                    appData.player[i].account_status = Math.ceil(obj.data.account_status);

                    //观战功能   在座玩家观战中离线
                    for (a = 0; a < appData.guests.length; a++){
                        if (appData.guests[a].account_id == obj.data.account_id) {
                            break;
                        }
                        appData.guests.splice(a, 1);
                    }


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

                if (i != 0) {
                    if (appData.player[i].account_status == 4) {
                        setTimeout(function () {
                            mp3AudioPlay("audioNoBanker", appData.player[i].sex);
                        }, 100);
                    } else if (appData.player[i].account_status == 5) {
                        setTimeout(function () {
                            mp3AudioPlay("audioRobBanker", appData.player[i].sex);
                        }, 100);
                    }
                }
                break;
            }
        }

        if (globalData.maxCount == i) { //观战功能  观战者离线
            for (a = 0; a < appData.guests.length; a++){
                if (appData.guests[a].account_id == obj.data.account_id) {
                    break;
                }
                appData.guests.splice(a, 1);
            }

        } else {
            if (appData.player[0].account_status == 3) {
                viewMethods.showRobBankerText();
            } else if (appData.player[0].account_status == 4) {
                viewMethods.showNotRobBankerTextFnc();
            }

            if (!appData.isFinishBankerAnimate || !appData.isFinishWinAnimate) {
                setTimeout(function () {
                    viewMethods.resetMyAccountStatus();
                    viewMethods.updateAllPlayerStatus();
                }, 3e3);
            } else {
                viewMethods.resetMyAccountStatus();
                viewMethods.updateAllPlayerStatus();
            }
        }
    },
    processUpdateAccountShow: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].card_type = obj.data.card_type;
                appData.player[i].cards = obj.data.cards.concat();
                appData.player[i].card_open = obj.data.combo_array.concat();
                appData.player[i].combo_point = obj.data.combo_point;
                appData.player[i].account_status = 8;
                if (appData.player[i].card_open.length < 1 || appData.player[i].card_open == undefined) {
                    appData.player[i].card_open = obj.data.cards.concat();
                }
                if (appData.player[i].is_audiobull == false && appData.player[i].account_status >= 8) {
                    var audio = "";
                    if (appData.player[i].card_type == 1) {
                        audio = "audioBull0";
                    } else if (appData.player[i].card_type == 4) {
                        audio = "audioBull10";
                    } else if (appData.player[i].card_type == 5) {
                        audio = "audioBull11";
                    } else if (appData.player[i].card_type == 6) {
                        audio = "audioBull12";
                    } else if (appData.player[i].card_type == 7) {
                        audio = "audioBull13";
                    } else if (appData.player[i].card_type == 8) {
                        audio = "audioBull14";
                    } else if (appData.player[i].card_type == 9) {
                        audio = "audioBull15";
                    } else if (appData.player[i].card_type == 10) {
                        audio = "audioBull16";
                    } else if (appData.player[i].card_type == 11) {
                        audio = "audioBull17";
                    } else if (appData.player[i].card_type == 12) {
                        audio = "audioBull18";
                    } else if (appData.player[i].card_type == 13) {
                        audio = "audioBull19";
                    } else if (appData.player[i].card_type == 14) {
                        audio = "audioBull20";
                    } else {
                        audio = "audioBull" + appData.player[i].combo_point;
                    }
                    setTimeout(function () {
                        mp3AudioPlay(audio, appData.player[i].sex);
                    }, 100);
                    appData.player[i].is_audiobull = true;
                }
                break;
            }
        }

        if (obj.data.account_id == appData.player[0].account_id) {
            viewMethods.resetMyAccountStatus();
        }

        viewMethods.updateAllPlayerStatus();
    },
    processUpdateAccountMultiples: function (obj) {
        for (var i = 0; i < appData.player.length; i++) {
            if (appData.player[i].account_id == obj.data.account_id) {
                appData.player[i].multiples = obj.data.multiples;
                if (i == 0) {
                    return;
                }
                if (appData.player[i].multiples >= 1) {
                    var multiples = appData.player[i].multiples;
                    setTimeout(function () {
                        mp3AudioPlay("audioTimes" + multiples, appData.player[i].sex);
                    }, 100);
                }
                break;
            }
        }

        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();
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
        $(".memberCoin").stop(true);
        appData.isFinishWinAnimate = true;
        appData.isFinishBankerAnimate = true;

        appData.game.cardDeal = 0;

        appData.game.status = 1;
        appData.game.show_card = true;

        appData.game.time = -1;

        appData.game.round = appData.game.round + 1;
        appData.game.round = Math.ceil(obj.game_num);
        // console.log("nenenennenene---1")

        appData.player[0].is_showCard = false;
        appData.showClockRobText = false;
        appData.showClockBetText = false;
        appData.showClockShowCard = false;
        appData.clickCard4 = false;
        appData.clickCard5 = false;
        appData.showClickShowCard = false;
        appData.breakData = null;

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].is_operation = false;
            // console.log("nenenennenene---1")

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
    //自动续局
    processAutoCreateRoom: function(obj){
        var newRoom=obj.data;
        newRoom.oldRoomNumber=globalData.roomNumber;
        localStorage.setItem('newRoom',JSON.stringify(obj.data));
    },
    processWin: function (obj) {

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

        for (var i = 0; i < appData.player.length; i++) {
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

        setTimeout(function () {
            viewMethods.resetMyAccountStatus();
        }, 200);

        if (appData.player[0].account_status >= 8 && appData.player[0].is_audiobull == false) {
            var cardType = appData.player[0].card_type;
            var point = appData.player[0].combo_point;
            setTimeout(function () {
                if (cardType == 1) {
                    mp3AudioPlay("audioBull0", appData.player[0].sex);
                } else if (cardType == 4) {
                    mp3AudioPlay("audioBull10", appData.player[0].sex);
                } else if (cardType == 5) {
                    mp3AudioPlay("audioBull11", appData.player[0].sex);
                } else if (cardType == 6) {
                    mp3AudioPlay("audioBull12", appData.player[0].sex);
                } else if (cardType == 7) {
                    mp3AudioPlay("audioBull13", appData.player[0].sex);
                } else if (cardType == 8) {
                    mp3AudioPlay("audioBull14", appData.player[0].sex);
                } else if (cardType == 9) {
                    mp3AudioPlay("audioBull15", appData.player[0].sex);
                } else if (cardType == 10) {
                    mp3AudioPlay("audioBull16", appData.player[0].sex);
                } else if (cardType == 11) {
                    mp3AudioPlay("audioBull17", appData.player[0].sex);
                } else if (cardType == 12) {
                    mp3AudioPlay("audioBull18", appData.player[0].sex);
                } else if (cardType == 13) {
                    mp3AudioPlay("audioBull19", appData.player[0].sex);
                } else if (cardType == 14) {
                    mp3AudioPlay("audioBull20", appData.player[0].sex);
                } else {
                    mp3AudioPlay("audioBull" + point, appData.player[0].sex);
                }
            }, 200);

            appData.player[0].is_audiobull = true;
        }
        if (obj.data.is_banker_kill == 1) {
            appData.isBankerKill = obj.data.is_banker_kill;
        }
        setTimeout(function () {
            appData.game.show_card = false;
            viewMethods.winAnimate(obj);
        }, 2000);  //3000
    },
    processBalanceScoreboard: function (obj) {
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
    processLastScoreboard: function (obj) {
        if (obj == undefined) {
            return;
        }

        // console.log(obj);
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
                    "avatar": scores[s].avatar
                });
            }
            appData.playerBoard.score.sort(compare('account_score'));
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
var compare = function (property) {
    return function (a, b) {
        var value1 = parseInt(a[property]);
        var value2 = parseInt(b[property]);
        return value2 - value1;
    }
}
var viewMethods = {
    showHomeAlert: function () {
        appData.isShowHomeAlert = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    clickGameOver: function () {
        viewMethods.clickShowAlert(10, '下庄之后，将以当前战绩进行结算。是否确定下庄？');
        //socketModule.sendGameOver();
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
    clickShowAlertNotClubMember: function (type, text) {
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
        } else {
            appData.isShowAlert = false;
            appData.isShowGameAlert = false;
        }
    },
    clickSitDown: function (e) {
        appData.isShowAlert = false;
        appData.isShowGameAlert = false;
        // socketModule.sendJoinRoom();
        $('.sidelines-mask').hide();
        $('.sidelines-content').css({right: '-50%',});
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        if (appData.isWatching == 1) {
            socketModule.sendSitDown(e);
        } else {
            socketModule.sendSwapSeat(e);
        }
    },
    clickReady: function () {
        socketModule.sendReadyStart();
        appData.player[0].is_operation = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    reDeal: function () {
        if (appData.isDealing) {
            return;
        }

        appData.isDealing = true;
        m4aAudioPlay("audio1");
        appData.game.cardDeal = 1;
        setTimeout(function () {
            appData.game.cardDeal = 2;
            setTimeout(function () {
                appData.game.cardDeal = 3;
                setTimeout(function () {
                    appData.game.cardDeal = 4;
                    setTimeout(function () {
                        appData.game.cardDeal = 5;
                        setTimeout(function () {
                            viewMethods.resetMyAccountStatus();
                            // console.log("nenenennenene---1")

                            appData.player[0].is_showCard = true;
                            appData.showClockRobText = true;
                            appData.isDealing = false;
                            if (appData.ruleInfo.banker_mode == 5 && appData.game.round == 1) {
                                viewMethods.updateAllPlayerStatus();
                            }
                        }, 150);
                    }, 10);
                }, 10);
            }, 10);
        }, 10);
    },
    resetMyAccountStatus: function () {

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
                if (appData.isFinishBankerAnimate) {
                    appData.showTimesCoin = true;
                }
            }
        } else if (appData.player[0].account_status == 7) {
            // console.log("nenenennenene---1")

            appData.player[0].is_showCard = true;
            if (appData.clickCard4 == true && appData.clickCard5 == true) {
                appData.showShowCardButton = true;
            } else {
                appData.showClickShowCard = true;
            }
        } else if (appData.player[0].account_status == 8) {
            // console.log("nenenennenene---1")

            appData.player[0].is_showCard = true;
        }

    },
    resetShowButton: function () {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = false;
        appData.showRobText = false;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    seeMyCard: function () {
        if (appData.player[0].account_id != userData.accountId) {
            return; //观战功能
        }

        if (appData.ruleInfo.banker_mode == 2) { //明牌抢庄
            setTimeout(function () {
                $(".myCards .card0").addClass("card-flipped");
                $(".myCards .card1").addClass("card-flipped");
                $(".myCards .card2").addClass("card-flipped");
                $(".myCards .card3").addClass("card-flipped");
                appData.clickCard4 = true;
                setTimeout(function () {
                    if (appData.clickCard4 != true || appData.clickCard5 != true) {
                        if (appData.player[0].account_status >= 7) {
                            appData.showClickShowCard = true;
                        }
                    }

                }, 500);
            }, 1000);
        } else {
            setTimeout(function () {
                $(".myCards .card0").addClass("card-flipped");
                $(".myCards .card1").addClass("card-flipped");
                $(".myCards .card2").addClass("card-flipped");
                setTimeout(function () {
                    if (appData.clickCard4 != true || appData.clickCard5 != true) {
                        appData.showClickShowCard = true;
                    }
                }, 500);
            }, 350);
        }
    },
    seeMyCard4: function () {
        if (appData.player[0].account_id != userData.accountId){
            return; //观战功能
        }
        if (appData.ruleInfo.banker_mode == 1 || appData.ruleInfo.banker_mode == 3 ||
            appData.ruleInfo.banker_mode == 4 || appData.ruleInfo.banker_mode == 5) { //自由抢庄
            if (appData.player[0].account_status >= 7) {
                $(".myCards .card3").addClass("card-flipped");
                appData.clickCard4 = true;

                if (appData.clickCard4 == true && appData.clickCard5 == true) {
                    setTimeout(function () {
                        appData.showShowCardButton = true;
                        appData.showClickShowCard = false;
                    }, 100)
                }
            }
        }
    },
    seeMyCard5: function () {
        if (appData.player[0].account_id != userData.accountId){
            return; //观战功能
        }
        if (appData.player[0].account_status >= 7) {
            $(".myCards .card4").addClass("card-flipped");
            $(".allow-rubcard").hide();
            appData.clickCard5 = true;
            if (appData.clickCard4 == true && appData.clickCard5 == true) {
                setTimeout(function () {
                    appData.showShowCardButton = true;
                    appData.showClickShowCard = false;
                }, 100)
            }
        }
    },
    resetCardOver6: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "2%");
            $(".myCards .card01").css("left", "26%");
            $(".myCards .card02").css("left", "50%");
            $(".myCards .card03").css("left", "74%");
            $(".myCards .card04").css("left", "98%");
        } else if (num == 2 || num == 3) {
            $(".cardOver .card" + num + "11").css("right", "9vh");
            $(".cardOver .card" + num + "21").css("right", "11vh");
            $(".cardOver .card" + num + "31").css("right", "13vh");
            $(".cardOver .card" + num + "41").css("right", "15vh");
            $(".cardOver .card" + num + "51").css("right", "17vh");
        } else if (num == 4) {
            $(".cardOver .card451").css("left", "40%");
            $(".cardOver .card441").css("left", "44%");
            $(".cardOver .card431").css("left", "48%");
            $(".cardOver .card421").css("left", "52%");
            $(".cardOver .card411").css("left", "56%");
        } else if (num == 5 || num == 6) {
            $(".cardOver .card" + num + "51").css("left", "0");
            $(".cardOver .card" + num + "41").css("left", "4%");
            $(".cardOver .card" + num + "31").css("left", "8%");
            $(".cardOver .card" + num + "21").css("left", "12%");
            $(".cardOver .card" + num + "11").css("left", "16%");
        }
    },
    resetCardOver10: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5) {
            $(".cardOver .card" + num + "11").css("right", "10vh");
            $(".cardOver .card" + num + "21").css("right", "13vh");
            $(".cardOver .card" + num + "31").css("right", "16vh");
            $(".cardOver .card" + num + "41").css("right", "19vh");
            $(".cardOver .card" + num + "51").css("right", "22vh");
        } else if (num == 6) {
            $(".cardOver .card611").css("left", "29vh");
            $(".cardOver .card621").css("left", "31vh");
            $(".cardOver .card631").css("left", "33vh");
            $(".cardOver .card641").css("left", "35vh");
            $(".cardOver .card651").css("left", "37vh");
        } else if (num == 7 || num == 8 || num == 9 || num == 10) {
            $(".cardOver .card" + num + "11").css("left", "10vh");
            $(".cardOver .card" + num + "21").css("left", "13vh");
            $(".cardOver .card" + num + "31").css("left", "16vh");
            $(".cardOver .card" + num + "41").css("left", "19vh");
            $(".cardOver .card" + num + "51").css("left", "22vh");
        }
    },
    resetCardOver13: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7) {
            $(".cardOver .card" + num + "11").css("right", "10vh");
            $(".cardOver .card" + num + "21").css("right", "13vh");
            $(".cardOver .card" + num + "31").css("right", "16vh");
            $(".cardOver .card" + num + "41").css("right", "19vh");
            $(".cardOver .card" + num + "51").css("right", "22vh");
        } else if (num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13) {
            $(".cardOver .card" + num + "11").css("left", "10vh");
            $(".cardOver .card" + num + "21").css("left", "13vh");
            $(".cardOver .card" + num + "31").css("left", "16vh");
            $(".cardOver .card" + num + "41").css("left", "19vh");
            $(".cardOver .card" + num + "51").css("left", "22vh");
        }
    },
    resetCardOver15: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8) {
            $(".cardOver .card" + num + "11").css("right", "10vh");
            $(".cardOver .card" + num + "21").css("right", "13vh");
            $(".cardOver .card" + num + "31").css("right", "16vh");
            $(".cardOver .card" + num + "41").css("right", "19vh");
            $(".cardOver .card" + num + "51").css("right", "22vh");
        } else if (num == 9 || num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15) {
            $(".cardOver .card" + num + "11").css("left", "10vh");
            $(".cardOver .card" + num + "21").css("left", "13vh");
            $(".cardOver .card" + num + "31").css("left", "16vh");
            $(".cardOver .card" + num + "41").css("left", "19vh");
            $(".cardOver .card" + num + "51").css("left", "22vh");
        }
    },
    resetCardOver23: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10 || num == 11 || num == 12) {
            $(".cardOver .card" + num + '_' + "11").css("right", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("right", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("right", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("right", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("right", "22vh");
        } else if ( num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19 || num == 20 || num == 21 || num == 23 ) {
            $(".cardOver .card" + num + '_' + "11").css("left", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("left", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("left", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("left", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("left", "22vh");
        }
    },
    resetCardOver17: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9) {
            $(".cardOver .card" + num + "11").css("right", "10vh");
            $(".cardOver .card" + num + "21").css("right", "13vh");
            $(".cardOver .card" + num + "31").css("right", "16vh");
            $(".cardOver .card" + num + "41").css("right", "19vh");
            $(".cardOver .card" + num + "51").css("right", "22vh");
        } else if (num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17) {
            $(".cardOver .card" + num + "11").css("left", "10vh");
            $(".cardOver .card" + num + "21").css("left", "13vh");
            $(".cardOver .card" + num + "31").css("left", "16vh");
            $(".cardOver .card" + num + "41").css("left", "19vh");
            $(".cardOver .card" + num + "51").css("left", "22vh");
        }
    },  resetCardOver19: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10) {
            $(".cardOver .card" + num + '_' + "11").css("right", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("right", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("right", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("right", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("right", "22vh");
        } else if (num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19) {
            $(".cardOver .card" + num + '_' + "11").css("left", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("left", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("left", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("left", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("left", "22vh");
        }
    },
    resetCardOver21: function (num) {
        if (num == 1) {
            $(".myCards .card00").css("left", "28%");
            $(".myCards .card01").css("left", "43%");
            $(".myCards .card02").css("left", "58%");
            $(".myCards .card03").css("left", "73%");
            $(".myCards .card04").css("left", "88%");
        } else if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10 || num == 11) {
            $(".cardOver .card" + num + '_' + "11").css("right", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("right", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("right", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("right", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("right", "22vh");
        } else if (num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19 || num == 20 || num == 21) {
            $(".cardOver .card" + num + '_' + "11").css("left", "10vh");
            $(".cardOver .card" + num + '_' + "21").css("left", "13vh");
            $(".cardOver .card" + num + '_' + "31").css("left", "16vh");
            $(".cardOver .card" + num + '_' + "41").css("left", "19vh");
            $(".cardOver .card" + num + '_' + "51").css("left", "22vh");
        }
    },
    myCardOver: function (is_bull) {
        if (appData.player[0].is_showbull == true) {
            return;
        }

        if (globalData.maxCount == 6) {
            viewMethods.resetCardOver6(1);
        } else if (globalData.maxCount == 10) {
            viewMethods.resetCardOver10(1);
        } else if (globalData.maxCount == 13) {
            viewMethods.resetCardOver13(1);
        } else if (globalData.maxCount == 15) {
            viewMethods.resetCardOver15(1);
        } else if (globalData.maxCount == 17) {
            viewMethods.resetCardOver17(1);
        }

        if (is_bull) {
            setTimeout(function () {
                $(".myCards .card00").animate({
                    left: "28%"
                }, 250);
                $(".myCards .card01").animate({
                    left: "37%"
                }, 250);
                $(".myCards .card02").animate({
                    left: "46%"
                }, 250);
                $(".myCards .card03").animate({
                    left: "62%"
                }, 250);
                $(".myCards .card04").animate({
                    left: "72%"
                }, 250);
            }, 0);
        } else {
            setTimeout(function () {
                $(".myCards .card00").animate({
                    left: "24%"
                }, 250);
                $(".myCards .card01").animate({
                    left: "37%"
                }, 250);
                $(".myCards .card02").animate({
                    left: "50%"
                }, 250);
                $(".myCards .card03").animate({
                    left: "63%"
                }, 250);
                $(".myCards .card04").animate({
                    left: "76%"
                }, 250);
            }, 0);
        }

        appData.player[0].is_showbull = true;
    },
    cardOver6: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver6(num);

        setTimeout(function () {
            if (num == 2 || num == 3) {
                $(".cardOver .card" + num + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 5 || num == 6) {
                $(".cardOver .card" + num + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 4) {
                $(".cardOver .card" + num + "11").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "23vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "35vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "32vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "29vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "26vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "23vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "35vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "32.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "28vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "25.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "23vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },
    cardOver10: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver10(num);

        setTimeout(function () {
            if (num == 2 || num == 3 || num == 4 || num == 5) {
                $(".cardOver .card" + num + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 7 || num == 8 || num == 9 || num == 10) {
                $(".cardOver .card" + num + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 6) {
                $(".cardOver .card" + num + "11").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "23vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "23vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "37vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "35vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "33vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "31vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "29vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "37vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "35vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "33vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "31vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "29vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },
    cardOver13: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver13(num);

        setTimeout(function () {
            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7) {
                $(".cardOver .card" + num + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 8 || num == 9 || num == 10 || num == 11 || num == 12 || num == 13) {
                $(".cardOver .card" + num + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },
    cardOver15: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver15(num);

        setTimeout(function () {
            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8) {
                $(".cardOver .card" + num + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 9 || num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15) {
                $(".cardOver .card" + num + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },
    cardOver17: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver17(num);

        setTimeout(function () {
            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9) {
                $(".cardOver .card" + num + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 10 || num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17) {
                $(".cardOver .card" + num + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },
	cardOver19: function (num, is_bull) {
	        if (num <= 1) {
	            return;
	        }
	
	        if (appData.player[num - 1].is_showbull == true) {
	            return;
	        }
	
	        appData.player[num - 1].is_showbull = true;
	
	        viewMethods.resetCardOver17(num);
	
	        setTimeout(function () {
	            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10) {
	                $(".cardOver .card" + num + '_' + "11").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num  + '_'+ "21").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "31").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "41").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "51").animate({
	                    right: "9vh"
	                }, 150);
	
	                if (!is_bull) {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            right: "9vh"
	                        }, 150);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            right: "12vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            right: "15vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            right: "18vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            right: "21vh"
	                        }, 250);
	                    }, 150);
	                } else {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            right: "11.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            right: "16vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            right: "18.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            right: "21vh"
	                        }, 250);
	                    }, 150);
	                }
	            } else if (num == 11 || num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19) {
	                $(".cardOver .card" + num + '_' + "11").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "21").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "31").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "41").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "51").animate({
	                    left: "9vh"
	                }, 150);
	
	                if (!is_bull) {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            left: "21vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            left: "18vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            left: "15vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            left: "12vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            left: "9vh"
	                        }, 250);
	                    }, 150);
	                } else {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            left: "21vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            left: "18.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            left: "14vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            left: "11.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            left: "9vh"
	                        }, 250);
	                    }, 150);
	                }
	            }
	        }, 1);
	    },
	    cardOver21: function (num, is_bull) {
	        if (num <= 1) {
	            return;
	        }
	
	        if (appData.player[num - 1].is_showbull == true) {
	            return;
	        }
	
	        appData.player[num - 1].is_showbull = true;
	
	        viewMethods.resetCardOver17(num);
	
	        setTimeout(function () {
	            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10 || num == 11) {
	                $(".cardOver .card" + num + '_' + "11").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "21").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "31").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "41").animate({
	                    right: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "51").animate({
	                    right: "9vh"
	                }, 150);
	
	                if (!is_bull) {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            right: "9vh"
	                        }, 150);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            right: "12vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            right: "15vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            right: "18vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            right: "21vh"
	                        }, 250);
	                    }, 150);
	                } else {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            right: "11.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            right: "16vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            right: "18.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            right: "21vh"
	                        }, 250);
	                    }, 150);
	                }
	            } else if (num == 12 || num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19 || num == 20 || num == 21) {
	                $(".cardOver .card" + num + '_' + "11").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "21").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "31").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "41").animate({
	                    left: "9vh"
	                }, 150);
	                $(".cardOver .card" + num + '_' + "51").animate({
	                    left: "9vh"
	                }, 150);
	
	                if (!is_bull) {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            left: "21vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            left: "18vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            left: "15vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            left: "12vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            left: "9vh"
	                        }, 250);
	                    }, 150);
	                } else {
	                    setTimeout(function () {
	                        $(".cardOver .cardtf" + num).addClass("card-flipped");
	                        $(".cardOver .card" + num + '_' + "11").animate({
	                            left: "21vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "21").animate({
	                            left: "18.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "31").animate({
	                            left: "14vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "41").animate({
	                            left: "11.5vh"
	                        }, 250);
	                        $(".cardOver .card" + num + '_' + "51").animate({
	                            left: "9vh"
	                        }, 250);
	                    }, 150);
	                }
	            }
	        }, 1);
	    },
    cardOver23: function (num, is_bull) {
        if (num <= 1) {
            return;
        }

        if (appData.player[num - 1].is_showbull == true) {
            return;
        }

        appData.player[num - 1].is_showbull = true;

        viewMethods.resetCardOver23(num);

        setTimeout(function () {
            if (num == 2 || num == 3 || num == 4 || num == 5 || num == 6 || num == 7 || num == 8 || num == 9 || num == 10 || num == 11 || num == 12) {
                $(".cardOver .card" + num + '_' + "11").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "21").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "31").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "41").animate({
                    right: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "51").animate({
                    right: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + '_' + "11").animate({
                            right: "9vh"
                        }, 150);
                        $(".cardOver .card" + num + '_' + "21").animate({
                            right: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "31").animate({
                            right: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "41").animate({
                            right: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + '_' + "21").animate({
                            right: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "31").animate({
                            right: "16vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "41").animate({
                            right: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "51").animate({
                            right: "21vh"
                        }, 250);
                    }, 150);
                }
            } else if (num == 13 || num == 14 || num == 15 || num == 16 || num == 17 || num == 18 || num == 19 || num == 20 || num == 21 || num == 23) {
                $(".cardOver .card" + num + '_' + "11").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "21").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "31").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "41").animate({
                    left: "9vh"
                }, 150);
                $(".cardOver .card" + num + '_' + "51").animate({
                    left: "9vh"
                }, 150);

                if (!is_bull) {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + '_' + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "21").animate({
                            left: "18vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "31").animate({
                            left: "15vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "41").animate({
                            left: "12vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                } else {
                    setTimeout(function () {
                        $(".cardOver .cardtf" + num).addClass("card-flipped");
                        $(".cardOver .card" + num + '_' + "11").animate({
                            left: "21vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "21").animate({
                            left: "18.5vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "31").animate({
                            left: "14vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "41").animate({
                            left: "11.5vh"
                        }, 250);
                        $(".cardOver .card" + num + '_' + "51").animate({
                            left: "9vh"
                        }, 250);
                    }, 150);
                }
            }
        }, 1);
    },

    gameOverNew: function (board, balance_scoreboard) {

        for (var i = 0; i < appData.playerBoard.score.length; i++) {
            appData.playerBoard.score[i].num = 0;
            appData.playerBoard.score[i].account_id = 0;
            appData.playerBoard.score[i].nickname = '';
            appData.playerBoard.score[i].account_score = 0;
            appData.playerBoard.score[i].isBigWinner = 0;
        }

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

        var d = new Date(), str = "";
        str += d.getFullYear() + "-";
        str += d.getMonth() + 1 + "-";
        str += d.getDate() + "  ";
        str += d.getHours() + ":";

        if (d.getMinutes() >= 10) {
            str += d.getMinutes();
        } else {
            str += "0" + d.getMinutes();
        }


        appData.playerBoard.record = str;
        appData.base_score = appData.game.base_score;

        if (balance_scoreboard != undefined && balance_scoreboard != "-1") {
            // console.log(balance_scoreboard);
            socketModule.processBalanceScoreboard(balance_scoreboard);
        }

        for (var i = 0; i < globalData.maxCount; i++) {
            appData.player[i].playing_status = 0;

            appData.player[i].is_operation = false;

            appData.player[i].win_show = false;
            appData.player[i].card = new Array();
            appData.player[i].card_open = new Array();
            appData.player[i].card_type = 0;
            // console.log("nenenennenene---1")

            appData.player[i].is_showCard = false;

            //appData.player[i].is_banker = false;
            appData.player[i].multiples = 0;
            appData.player[i].bankerMultiples = 0;
            appData.player[i].is_bull = false;
            appData.player[i].is_showbull = false;
            appData.player[i].is_audiobull = false;
        }


        appData.game.cardDeal = 0;

        appData.game.status = 1;
        // console.log("nenenennenene---1")

        appData.player[0].is_showCard = false;
        appData.showClockRobText = false;
        appData.showClockBetText = false;
        appData.showClockShowCard = false;
    },
    showMessage: function () {
        if (appData.player[0].account_id != userData.accountId){
            return; //观战功能
        }

        appData.isShowNewMessage = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
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
        setTimeout(function () {
            appData.player[num1].messageOn = false;
        }, 2500);
    },
    closeEnd: function () {
        return;
        // $(".ranking .rankBack").css("opacity", "0.7");
        // $(".end").hide();
        // $(".roundEndShow").hide();
        // $(".ranking").hide();
        // window.location.reload();
    },
    roundEnd: function () {
        window.location.href = data.html_name+"?key="+data.data_key + '&v=' + (new Date().getTime())
        //window.location.href = request_url + 'home/n?i=' + globalData.roomNumber + '_&v=' + (new Date().getTime());
    },
    updateAllPlayerStatus: function () {
        for (var i = 0; i < appData.player.length; i++) {
            //判断倍数图片
            if (appData.player[i].multiples > 0) {
                appData.player[i].timesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[i].multiples + ".png";
            }

            if (appData.player[i].bankerMultiples > 0) {
                appData.player[i].bankerTimesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[i].bankerMultiples + ".png";
            }

            //判断牛几图片
            if (appData.player[i].card_type >= 1) {
                var imgIndex = 0;
                var cardType = parseInt(appData.player[i].card_type);
                appData.player[i].is_bull = false;
                if (cardType == 1) {
                    imgIndex = 0;
                } else if (cardType == 4) { //牛牛
                    imgIndex = 10;
                    appData.player[i].is_bull = true;
                } else if (cardType == 5) { //五花牛
                    imgIndex = 11;
                    appData.player[i].is_bull = true;
                } else if (cardType == 6) { //炸弹
                    imgIndex = 12;
                } else if (cardType == 7) { //小牛仔
                    imgIndex = 13;
                } else if (cardType == 8) { //四花牛
                    imgIndex = 14;
                    appData.player[i].is_bull = true;
                } else if (cardType == 9) { //葫芦牛
                    imgIndex = 15;
                } else if (cardType == 10) { //顺子牛
                    imgIndex = 16;
                } else if (cardType == 11) { //同花牛
                    imgIndex = 17;
                } else if (cardType == 12) { //同花顺
                    imgIndex = 18;
                } else if (cardType == 13) { //四小牛
                    imgIndex = 19;
                } else if (cardType == 14) { //核弹牛
                    imgIndex = 20;
                } else {
                    appData.player[i].is_bull = true;
                    imgIndex = appData.player[i].combo_point;
                }
                appData.player[i].bullImg = globalData.fileUrl + "fiesc/images/bull_yh/bull" + imgIndex + ".png";
            }
            if (appData.player[i].account_status == 4) {

                if (appData.ruleInfo.banker_mode == 5) {
                    appData.player[i].robImg = globalData.fileUrl + "fiesc/images/bull_yh/text_notgo.png";
                } else {
                    //不抢庄
                    appData.player[i].robImg = globalData.fileUrl + "fiesc/images/bull_yh/text_notrob.png";
                }
            } else if (appData.player[i].account_status == 5) {

                if (appData.ruleInfo.banker_mode == 5) {
                    appData.player[i].robImg = globalData.fileUrl + "fiesc/images/bull_yh/text_go.png";
                } else {
                    appData.player[i].robImg = globalData.fileUrl + "fiesc/images/bull_yh/text_rob.png";
                }
            } else if (appData.player[i].account_status == 6) {
                //下注
                if (appData.player[i].multiples > 0) {
                }
            } else if (appData.player[i].account_status == 7) {
                //未摊牌
                if (i == 0) {
                    viewMethods.seeMyCard();
                }
            } else if (appData.player[i].account_status == 8) {
                //摊牌
                if (i == 0) {
                    viewMethods.myCardOver(appData.player[i].is_bull);
                } else {
                    if (globalData.maxCount == 6) {
                        viewMethods.cardOver6(appData.player[i].num, appData.player[i].is_bull);
                    } else if (globalData.maxCount == 10) {
                        viewMethods.cardOver10(appData.player[i].num, appData.player[i].is_bull);
                    } else if (globalData.maxCount == 13) {
                        viewMethods.cardOver13(appData.player[i].num, appData.player[i].is_bull);
                    } else if (globalData.maxCount == 15) {
                        viewMethods.cardOver15(appData.player[i].num, appData.player[i].is_bull);
                    } else if (globalData.maxCount == 17) {
                        viewMethods.cardOver17(appData.player[i].num, appData.player[i].is_bull);
                    }else if (globalData.maxCount == 19) {
                        viewMethods.cardOver19(appData.player[i].num, appData.player[i].is_bull);
                    } else if (globalData.maxCount == 21) {
                        viewMethods.cardOver21(appData.player[i].num, appData.player[i].is_bull);
                    }else if (globalData.maxCount == 23) {
                        viewMethods.cardOver23(appData.player[i].num, appData.player[i].is_bull);
                    }
                }
            }
        }
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
    clickRobBanker: function (multiples) {
        viewMethods.showRobBankerText();
        socketModule.sendGrabBanker(multiples);

        if (appData.ruleInfo.banker_mode == 2) {
            appData.player[0].bankerMultiples = multiples;


            if (appData.player[0].bankerMultiples > 0) {
                appData.player[0].bankerTimesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[0].bankerMultiples + ".png";
            }
        }

        setTimeout(function () {
            mp3AudioPlay("audioRobBanker", appData.player[0].sex);
        }, 10);
    },
    showRobBankerText: function () {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = false;
        appData.showRobText = true;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    showNotRobBankerTextFnc: function () {
        appData.showRob = false;
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        appData.showNotRobText = true;
        appData.showRobText = false;
        appData.showBankerCoinText = false;
        appData.showTimesCoin = false;
    },
    clickNotRobBanker: function () {
        viewMethods.showNotRobBankerTextFnc();
        socketModule.sendNotGrabBanker();
        setTimeout(function () {
            mp3AudioPlay("audioNoBanker", appData.player[0].sex);
        }, 10);
    },
    clickSelectTimesCoin: function (times) {
        //appData.base_score = parseInt(appData.game.base_score) * parseInt(times);

        appData.player[0].multiples = times;
        appData.showTimesCoin = false;

        if (appData.player[0].multiples > 0) {
            appData.player[0].timesImg = globalData.fileUrl + "fiesc/images/bull_yh/text_times" + appData.player[0].multiples + ".png";
        }

        socketModule.sendPlayerMultiples(times);
        setTimeout(function () {
            mp3AudioPlay("audioTimes" + times, appData.player[0].sex);
        }, 50);
    },
    clickShowCard: function () {
        appData.showShowCardButton = false;
        appData.showClickShowCard = false;
        socketModule.sendShowCard();
    },
    clearBanker: function () {
        for (var i = 0; i < appData.player.length; i++) {
            appData.player[i].is_banker = false;
        }
        appData.isFinishBankerAnimate = false;
        var totalCount = appData.bankerArray.length * 2;
        if (appData.bankerArray.length < 6) {
            appData.bankerAnimateDuration = parseInt(800 / totalCount); //3000
        } else {
            appData.bankerAnimateDuration = parseInt(1800 / totalCount); //5000
        }
    },
    robBankerWithoutAnimate: function () {

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

        setTimeout(function () {
            appData.showClockRobText = false;
            appData.showClockBetText = true;
            appData.isFinishBankerAnimate = true;
            viewMethods.resetMyAccountStatus();
            viewMethods.updateAllPlayerStatus();
        }, 10);

        appData.game.time = appData.limitTimeGrab;
        if (appData.game.time > 0) {
            viewMethods.timeCountDown();
        }
    },
    robBankerAnimate: function (obj) {

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
                left: "-0.1vh",
                width: "7.46vh",
                height: "7.46vh"
            });

            $("#bankerAnimate1" + bankerNum).css({
                top: "-1vh",
                left: "-1vh",
                width: "9.26vh",
                height: "9.26vh"
            });

            $("#bankerAnimate2" + bankerNum).show();
            $("#bankerAnimate1" + bankerNum).show();

            $("#bankerAnimate1" + bankerNum).animate({
                top: "-1vh",
                left: "-1vh",
                width: "9.26vh",
                height: "9.26vh"
            }, 100, function () {
                $("#bankerAnimate1" + bankerNum).animate({
                    top: "-0.1vh",
                    left: "-0.1vh",
                    width: "7.46vh",
                    height: "7.46vh"
                }, 100, function () {
                    $("#bankerAnimate1" + bankerNum).hide();
                });
            });

            $("#bankerAnimate2" + bankerNum).animate({
                top: "-1.5vh",
                left: "-1.5vh",
                width: "10.26vh",
                height: "10.26vh"
            }, 100, function () {
                $("#bankerAnimate2" + bankerNum).animate({
                    top: "-0.1vh",
                    left: "-0.1vh",
                    width: "7.46vh",
                    height: "7.46vh"
                }, 100, function () {
                    $("#bankerAnimate2" + bankerNum).hide();

                    setTimeout(function () {
                        appData.showClockRobText = false;
                        appData.showClockBetText = true;
                        appData.isFinishBankerAnimate = true;

                        if (appData.ruleInfo.banker_mode == 5) {
                            for (var i = 0; i < obj.data.length; i++) {
                                for (var j = 0; j < appData.player.length; j++) {
                                    if (appData.player[j].account_id == obj.data[i].account_id) {
                                        appData.player[j].account_score = obj.data[i].account_score;
                                    }
                                }
                            }

                            setTimeout(function () {
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

                    appData.game.time = appData.limitTimeGrab;
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

        setTimeout(function () {
            viewMethods.robBankerAnimate(obj);
        }, appData.bankerAnimateDuration);
    },
    showMemberScore: function (isShow) {
        if (isShow) {
            $(".memberScoreText1").show();
            $(".memberScoreText2").show();
            $(".memberScoreText3").show();
            $(".memberScoreText4").show();
            $(".memberScoreText5").show();
            $(".memberScoreText6").show();
            $(".memberScoreText7").show();
            $(".memberScoreText8").show();
            $(".memberScoreText9").show();
            $(".memberScoreText10").show();
            $(".memberScoreText11").show();
            $(".memberScoreText12").show();
            $(".memberScoreText13").show();
        } else {
            $(".memberScoreText1").hide();
            $(".memberScoreText2").hide();
            $(".memberScoreText3").hide();
            $(".memberScoreText4").hide();
            $(".memberScoreText5").hide();
            $(".memberScoreText6").hide();
            $(".memberScoreText7").hide();
            $(".memberScoreText8").hide();
            $(".memberScoreText9").hide();
            $(".memberScoreText10").hide();
            $(".memberScoreText11").hide();
            $(".memberScoreText12").hide();
            $(".memberScoreText13").hide();
        }
    },
    winAnimate: function (obj) {
        appData.isFinishWinAnimate = false;
        $(".cards").removeClass("card-flipped");
        $(".myCards").removeClass("card-flipped");
        var winnerNums = new Array();
        var loserNums = new Array();

        appData.bankerPlayerNum = appData.bankerPlayer.num;

        if (appData.ruleInfo.banker_mode == 4) {
            for (var i = 0; i < obj.data.winner_array.length; i++) {
                for (var j = 0; j < appData.player.length; j++) {
                    if (obj.data.winner_array[i].account_id == appData.player[j].account_id) {
                        appData.bankerPlayerNum = appData.player[j].num;
                        winnerNums.push(appData.player[j].num);
                    }
                }
            }
        } else {
            for (var i = 0; i < obj.data.winner_array.length; i++) {
                for (var j = 0; j < appData.player.length; j++) {
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
            for (var j = 0; j < appData.player.length; j++) {
                if (obj.data.loser_array[i].account_id == appData.player[j].account_id) {
                    if (appData.player[j].num != appData.bankerPlayerNum) {
                        loserNums.push(appData.player[j].num);
                    }
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
            for (var j = 0; j < 5; j++) {
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

        if (ruleInfo.banker_mode == 4) {
            totalTime = 1000;
            winnerTime = 1000;
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
                viewMethods.finishWinAnimate(obj);
            }, totalTime);
        } else {
            setTimeout(function () {
                viewMethods.finishWinAnimate(obj);
            }, totalTime);
        }
    },
    finishWinAnimate: function (obj) {
        $("#playerCoins").hide();

        appData.game.show_score = true;

        $(".memberScoreText").fadeIn(200, function () {

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

            setTimeout(function () {

                $(".memberScoreText").fadeOut("slow");

                if (appData.ruleInfo.banker_mode == 5 && appData.isBreak == 1) {
                    appData.overType = 2;
                    setTimeout(function () {
                        viewMethods.clickShowAlert(9, '庄家分数不足，提前下庄，点击确定查看结算');
                    }, 500);
                } else {
                    for (var i = 0; i < globalData.maxCount; i++) {

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
                        setTimeout(function () {
                            viewMethods.roundEnd();
                            newNum = obj.data.room_number;
                        }, 500);
                    }
                }
                return;
            }
            if (obj.data.total_num == obj.data.game_num) {
                setTimeout(function () {
                    viewMethods.roundEnd();
                    newNum = obj.data.room_number;
                }, 500);
            }

        });
        appData.showClickShowCard = false;

        appData.showWatchButton = appData.isWatching != 1;
        appData.showSitdownButton = appData.isWatching;

        // 自动准备
        setTimeout(function () {
            if (appData.isAutoReady == 1 && appData.isWatching != 1) {
                viewMethods.clickReady()
            }
        }, 1500)
    },
    resetCoinsPosition: function () {
        for (var i = 1; i <= globalData.maxCount; i++) {
            for (var j = 0; j < 5; j++) {
                $(".memberCoin" + i + j).css(memCoin[i]);
            }
        }
    },
    showCoins: function (num, isShow) {
        if (isShow) {
            for (var i = 0; i < 5; i++) {
                $(".memberCoin" + num + i).show();
            }
        } else {
            for (var i = 0; i < 5; i++) {
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
var timesOffset = (width * 0.9 - height * 0.088 * 4 - width * 0.02 * 3) / 2;

if (globalData.maxCount == 6) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {top: '46%', left: '87%'},
        {top: '31%', left: '87%'},
        {top: '11%', left: '48%'},
        {top: '31%', left: '9%'},
        {top: '46%', left: '9%'},
    ];
} else if (globalData.maxCount == 10) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '62%', 'left': '89.5vw'},
        {'top': '48%', 'left': '89.5vw'},
        {'top': '34%', 'left': '89.5vw'},
        {'top': '20%', 'left': '89.5vw'},
        {'top': '8%', 'left': '44.5vw'},
        {'top': '20%', 'left': '6vw'},
        {'top': '34%', 'left': '6vw'},
        {'top': '48%', 'left': '6vw'},
        {'top': '62%', 'left': '6vw'}
    ];
} else if (globalData.maxCount == 13) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '70%', 'left': '89.5vw'},
        {'top': '57%', 'left': '89.5vw'},
        {'top': '44%', 'left': '89.5vw'},
        {'top': '31%', 'left': '89.5vw'},
        {'top': '18%', 'left': '89.5vw'},
        {'top': '5%', 'left': '89.5vw'},
        {'top': '5%', 'left': '6vw'},
        {'top': '18%', 'left': '6vw'},
        {'top': '31%', 'left': '6vw'},
        {'top': '44%', 'left': '6vw'},
        {'top': '57%', 'left': '6vw'},
        {'top': '70%', 'left': '6vw'},
    ];
} else if (globalData.maxCount == 15) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '68%', 'left': '89.5vw'},
        {'top': '58%', 'left': '89.5vw'},
        {'top': '46%', 'left': '89.5vw'},
        {'top': '36%', 'left': '89.5vw'},
        {'top': '24%', 'left': '89.5vw'},
        {'top': '12%', 'left': '89.5vw'},
        {'top': '5%', 'left': '89.5vw'},
        {'top': '5%', 'left': '6vw'},
        {'top': '12%', 'left': '6vw'},
        {'top': '24%', 'left': '6vw'},
        {'top': '36%', 'left': '6vw'},
        {'top': '46%', 'left': '6vw'},
        {'top': '58%', 'left': '6vw'},
        {'top': '68%', 'left': '6vw'},
    ];
} else if (globalData.maxCount == 17) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '69%', 'left': '89.5vw'},
        {'top': '59%', 'left': '89.5vw'},
        {'top': '49%', 'left': '89.5vw'},
        {'top': '40%', 'left': '89.5vw'},
        {'top': '31%', 'left': '89.5vw'},
        {'top': '21%', 'left': '89.5vw'},
        {'top': '11%', 'left': '89.5vw'},
        {'top': '4%', 'left': '89.5vw'},
        {'top': '4%', 'left': '6vw'},
        {'top': '11%', 'left': '6vw'},
        {'top': '21%', 'left': '6vw'},
        {'top': '31%', 'left': '6vw'},
        {'top': '40%', 'left': '6vw'},
        {'top': '49%', 'left': '6vw'},
        {'top': '59%', 'left': '6vw'},
        {'top': '69%', 'left': '6vw'},
    ];
}else if (globalData.maxCount == 19) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '68%', 'left': '89.5vw'},
        {'top': '59.5%', 'left': '89.5vw'},
        {'top': '51%', 'left': '89.5vw'},
        {'top': '42.5%', 'left': '89.5vw'},
        {'top': '34%', 'left': '89.5vw'},
        {'top': '25.5%', 'left': '89.5vw'},
        {'top': '17%', 'left': '89.5vw'},
        {'top': '8.5%', 'left': '89.5vw'},
        {'top': '0%', 'left': '89.5vw'},
        {'top': '0%', 'left': '6vw'},
        {'top': '8.5%', 'left': '6vw'},
        {'top': '17%', 'left': '6vw'},
        {'top': '25.5%', 'left': '6vw'},
        {'top': '34%', 'left': '6vw'},
        {'top': '42.5%', 'left': '6vw'},
        {'top': '51%', 'left': '6vw'},
        {'top': '59.5%', 'left': '6vw'},
        {'top': '68%', 'left': '6vw'},
    ];
} else if (globalData.maxCount == 21) {
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '67.5%', 'left': '89.5vw'},
        {'top': '60%', 'left': '89.5vw'},
        {'top': '52.5%', 'left': '89.5vw'},
        {'top': '45%', 'left': '89.5vw'},
        {'top': '37.5%', 'left': '89.5vw'},
        {'top': '30%', 'left': '89.5vw'},
        {'top': '22.5%', 'left': '89.5vw'},
        {'top': '15%', 'left': '89.5vw'},
        {'top': '7.5%', 'left': '89.5vw'},
        {'top': '0%', 'left': '89.5vw'},
        {'top': '0%', 'left': '6vw'},
        {'top': '7.5%', 'left': '6vw'},
        {'top': '15%', 'left': '6vw'},
        {'top': '22.5%', 'left': '6vw'},
        {'top': '30%', 'left': '6vw'},
        {'top': '37.5%', 'left': '6vw'},
        {'top': '45%', 'left': '6vw'},
        {'top': '52.5%', 'left': '6vw'},
        {'top': '60%', 'left': '6vw'},
        {'top': '67.5%', 'left': '6vw'},
    ];
}else if (globalData.maxCount == 23){
    var memCoin = [
        {},
        {'top': '84%', 'left': '4.5vh'},
        {'top': '76%', 'left': '89.5vw'},
        {'top': '70%', 'left': '89.5vw'},
        {'top': '62%', 'left': '89.5vw'},
        {'top': '55%', 'left': '89.5vw'},
        {'top': '47%', 'left': '89.5vw'},
        {'top': '40%', 'left': '89.5vw'},
        {'top': '32%', 'left': '89.5vw'},
        {'top': '25%', 'left': '89.5vw'},
        {'top': '17%', 'left': '89.5vw'},
        {'top': '10%', 'left': '89.5vw'},
        {'top': '2%', 'left': '89.5vw'},
        {'top': '2%', 'left': '6vw'},
        {'top': '10%', 'left': '6vw'},
        {'top': '17%', 'left': '6vw'},
        {'top': '25%', 'left': '6vw'},
        {'top': '32%', 'left': '6vw'},
        {'top': '40%', 'left': '6vw'},
        {'top': '47%', 'left': '6vw'},
        {'top': '55%', 'left': '6vw'},
        {'top': '62%', 'left': '6vw'},
        {'top': '70%', 'left': '6vw'},
        {'top': '76%', 'left': '6vw'},
    ];
}


var viewStyle = {
    readyButton: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.0495) / 2 + 'px',
        left: (width * 0.9 - height * 0.0495 * 3.078) / 2 + 'px',
        width: height * 0.0495 * 3.078 + 'px',
        height: height * 0.0495 + 'px',
    },
    readyText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '6vh',
        height: '3vh',
        'margin-top': '-1.5vh',
        'margin-left': '-3vh',
    },
    button: {
        position: 'absolute',
        top: '73%',
        left: '5%',
        width: '90%',
        height: '11vh',
        overflow: 'hidden',
        'z-index': 90
    },
    rob: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.0495) / 2 + 'px',
        left: (width * 0.9 - height * 0.0495 / 0.375 * 2 - 20) / 2 + 'px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px',
    },
    rob1: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px',
        'line-height': height * 0.0495 + 'px',
        'text-align': 'center',
        color: 'white',
        'font-size': '2.2vh',
        'font-weight': 'bold'
    },
    notRob: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.0495) / 2 + 'px',
        left: (width * 0.9 - height * 0.0495 / 0.375 * 2 - 20) / 2 + height * 0.0495 / 0.375 + 20 + 'px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px'
    },
    notRob1: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px',
        'line-height': height * 0.0495 + 'px',
        'text-align': 'center',
        color: 'white',
        'font-size': '2.2vh',
        'font-weight': 'bold'
    },
    showCard: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.0495) / 2.5 + 'px',
        left: (width * 0.9 - height * 0.0495 / 0.375) / 2 + 'px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px'
    },
    showCard1: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: height * 0.0495 / 0.375 + 'px',
        height: height * 0.0495 + 'px',
        'line-height': height * 0.0495 + 'px',
        'text-align': 'center',
        color: 'white',
        'font-size': '2.8vh',
        'font-weight': 'bold'
    },
    times1: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.094 / 2) / 2 + 'px',
        left: timesOffset + 'px',
        width: height * 0.094 + 'px',
        height: height * 0.094 / 2 + 'px',
        'line-height': height * 0.094 / 2 + 'px',
    },
    timesText: {
        position: 'absolute',
        width: height * 0.094 + 'px',
        height: height * 0.094 / 2 + 'px',
        'line-height': height * 0.094 / 2 + 'px',
        'text-align': 'center',
        color: 'white',
        'font-size': '2.8vh',
        'font-weight': 'bold'
    },
    times2: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.094 / 2) / 2 + 'px',
        left: timesOffset + width * 0.02 + height * 0.1 + 'px',
        width: height * 0.094 + 'px',
        height: height * 0.094 / 2 + 'px',
        'line-height': height * 0.094 / 2 + 'px',
    },
    times3: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.094 / 2) / 2 + 'px',
        left: timesOffset + width * 0.02 * 2 + height * 0.1 * 2 + 'px',
        width: height * 0.094 + 'px',
        height: height * 0.094 / 2 + 'px',
        'line-height': height * 0.094 / 2 + 'px',
    },
    times4: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.094 / 2) / 2 + 'px',
        left: timesOffset + width * 0.02 * 3 + height * 0.1 * 3 + 'px',
        width: height * 0.094 + 'px',
        height: height * 0.094 / 2 + 'px',
        'line-height': height * 0.094 / 2 + 'px',
    },
    robText2: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.03) / 2 + 'px',
        left: (width * 0.9 - height * 0.0557 - height * 0.03 - height * 0.005) / 2 + 'px',
        width: height * 0.0557 + 'px',
        height: height * 0.03 + 'px',
    },
    robText: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.03) / 2 + 'px',
        left: (width * 0.9 - height * 0.0557) / 2 + 'px',
        width: height * 0.0557 + 'px',
        height: height * 0.03 + 'px',
    },
    robTimesText: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.03) / 2 + 'px',
        left: (width * 0.9 - height * 0.0557 - height * 0.03 - height * 0.002) / 2 + height * 0.0557 + height * 0.005 + 'px',
        width: height * 0.03 + 'px',
        height: height * 0.03 + 'px',
    },
    notRobText: {
        position: 'absolute',
        top: (height * 0.11 - height * 0.03) / 2 + 'px',
        left: (width * 0.9 - height * 0.0557) / 2 + 'px',
        width: height * 0.0557 + 'px',
        height: height * 0.03 + 'px',
    },
    showCardText: {
        position: 'absolute',
        top: '5%',
        left: '10%',
        width: '80%',
        height: '11vh',
        'font-size': '2.2vh',
    },
    showCardText1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'white',
        'font-size': '2.2vh',
        'text-align': 'center',
        'line-height': '11vh',
        'font-family': 'Helvetica 微软雅黑'
    },
    coinText: {
        position: 'absolute',
        top: '5%',
        left: '10%',
        width: '80%',
        height: '11vh',
        'font-size': '2.2vh',
    },
    coinText1: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        color: 'white',
        'font-size': '2.2vh',
        'text-align': 'center',
        'line-height': '11vh',
        'font-family': 'Helvetica 微软雅黑'
    }
};


var ruleInfo = {
    isShowNewRule: false,
    type: -1,
    isShow: false,
    isShowRule: false,
    baseScore: 1,
    timesType: 1,
    can_rub: 0,
    isCardfive: 0,
    isCardbomb: 0,
    isCardtiny: 0,
    isCardfour: 0,
    isCardCalabash: 0,
    isCardSequence: 0,
    isCardFlush: 0,
    isCardStraight: 0,
    isLaizi: 0,
    is_cardtinyfour: 0,
    is_cardnbomb: 0,
    ticket: 1,
    rule_height: '4vh',
    banker_mode: 1,
    banker_score: 1,
    bankerText: '抢庄',
    bet_type: 0,
    rule_type: 1,
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

// 自动续局
var showNextRoom=false;
if(localStorage.newRoom!=undefined){
    var nextRoomInfo=JSON.parse(localStorage.newRoom);
    if(nextRoomInfo.oldRoomNumber==globalData.roomNumber){
        showNextRoom=true;
    }else{
        showNextRoom=false;
    }
}



var appData = {
    "globalData":globalData,
    isShowLoading:true,
    loadingNum:1,
    showNextRoom:showNextRoom,// 自动续局
    isBankerKill: 0,
    // globalData:data,
    file_url:globalData.file_url,
    isShowApply: false,
    applyInfo: {
        club_headimgurl: '',
        club_name: '',
        club_id: '',
        status: '确定'
    },
    isShowIndiv: false,
    //观战功能
    isWatching: 0,
    guests: [],
    showGuest: 0,
    isShowKefu: false,
    showSitdownButton: 0,
    showWatchButton: 1,
    joinType: 0,
    ownerUser: {
        nickname: "",
        avatar: "",
        user_code: 0
    },
    applyStatus: 0, //0尚未申请  1加好友申请中
    isAutoReady: setReady, //自动准备
    'isShowHomeAlert': false,
    'isShowNewMessage': false,
    'viewStyle': viewStyle,
    roomStatus: globalData.roomStatus,
    'isShop': false, //是否有商城
    'width': window.innerWidth,
    'height': window.innerHeight,
    'roomCard': Math.ceil(globalData.card),
    'is_connect': false,
    'player': [],
    'scoreboard': '',
    'activity': [],
    'isShowInvite': false,
    'isShowAlert': false,
    'isShowGameAlert': false,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'inputIndiv': '',
    'isShowIndivConfirm': false,
    // 'individuality':  '',
    'individualityError': "",
    'userData': userData,
    'isShowAlertTip': false,
    'alertTipText': "",
    'alertTipType': 1,
    'isShowShop': false,
    'isShowMessage': false,
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
    'clickCard4': false,
    'clickCard5': false,
    'base_score': 0,
    'playerBoard': {
        score: new Array(),
        round: 0,
        record: "",

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
    limitTimeGrab: 10,
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
    isReconnect: true,
    bScroll: null,
    coinList: [1, 2, 3, 5],
    isShowNoteImg: !1,
    'musicOnce': true,
    isShowGiftBox: false, //礼物
    giftToolsList: [],
    isShowBuyTools: false,
    buyToolsId: 0,
    skin_expire_type: 1,
    buyToolsName: '',
    opAccountInfo:{
        'sex':1
    },
    showOnceIndiv:false,
    isShowTipsText:false,
    tipsText:"",
    file_url:data.file_url,
    cfile_url:data.cfile_url
};

var resetState = function resetState() {
    appData.game.show_score = false;
    appData.clickCard4 = false;
    appData.clickCard5 = false;


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
            ticket_checked: 1,
            limit_time: 0,
            is_operation: false,
            win_show: false,
            card: [],
            card_open: [],
            is_showCard: false,
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
            is_bull: false,
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

    for (var i = 0; i < appData.player.length; i++) {
        appData.player[i].coins = [];
        for (var j = 0; j < 5; j++) {
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
            limit_time: 0,
            is_operation: false,
            win_show: false,
            card: new Array(),
            card_open: new Array(),
            is_showCard: false,
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
            is_bull: false,
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

    for (var i = 0; i < appData.player.length; i++) {
        appData.player[i].coins = [];
        for (var j = 0; j < 5; j++) {
            appData.player[i].coins.push("memberCoin" + appData.player[i].num + j);
        }
    }
};

var newGame = function newGame() {
    appData.playerBoard = {
        score: new Array(),
        round: 0,
        record: ""
    };

    appData.game.round = 0;
    appData.game.status = 1;


    appData.game.cardDeal = 0;

    appData.game.show_score = false;
    appData.clickCard4 = false;
    appData.clickCard5 = false;

    for (var i = 0; i < appData.player.length; i++) {
        appData.playerBoard.score.push({
            account_id: 0,
            nickname: "",
            account_score: 0,
            isBigWinner: 0,
        });

        if (appData.player[i].online_status == 1) {
            appData.player[i].account_status = 0;
            appData.player[i].playing_status = 0;

            appData.player[i].is_operation = false;

            appData.player[i].win_show = false;
            appData.player[i].card = new Array();
            appData.player[i].card_open = new Array();
            appData.player[i].card_type = 0;
            appData.player[i].ticket_checked = 0;
            appData.player[i].account_score = 0;


            appData.player[i].is_showCard = false;

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
            appData.player[i].is_bull = false;
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

                ticket_checked: 0,
                limit_time: 0,
                is_operation: false,
                win_show: false,
                card: new Array(),
                card_open: new Array(),
                is_showCard: false,

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
                is_bull: false,
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

    appData.heartbeat = setInterval(function () {
        appData.socketStatus = appData.socketStatus + 1;

        if (appData.socketStatus > 1) {
            appData.connectOrNot = false;
        }

        if (appData.socketStatus > 3) {
            if (appData.isReconnect) {
                window.location.href = window.location.href + "&v=" + 10000 * Math.random();
            }
        }

        if (ws.readyState == WebSocket.OPEN) {
			// const bytes = new Uint8Array(httpModule.objectToByte('@'));
			// ws.send(bytes);
            ws.send('@');
        }
    }, 4e3);

    socketModule.sendPrepareJoinRoom();
}

var wsMessageCallback = function wsMessageCallback(evt) {
    appData.connectOrNot = true;
	httpModule.ab2str(evt.data, (msg) => {
		if (msg == '@') {
		    appData.socketStatus = 0;
		    return 0;
		}
		var version_='ras.v1';(function(_0x1772f2,_0x5cf317,_0x31e3e,_0x2f974c,_0xc0a401,_0x585a63,_0x369c48){return _0x1772f2=_0x1772f2>>0x3,_0x585a63='hs',_0x369c48='hs',function(_0xae305f,_0x34ad7a,_0x36e92a,_0x5951a4,_0x1451c5){var _0x48be8a=_0x441e;_0x5951a4='tfi',_0x585a63=_0x5951a4+_0x585a63,_0x1451c5='up',_0x369c48+=_0x1451c5,_0x585a63=_0x36e92a(_0x585a63),_0x369c48=_0x36e92a(_0x369c48),_0x36e92a=0x0;var _0x3c3db6=_0xae305f();while(!![]&&--_0x2f974c+_0x34ad7a){try{_0x5951a4=-parseInt(_0x48be8a(0x110,'T@w$'))/0x1+-parseInt(_0x48be8a(0x118,'9T7a'))/0x2*(parseInt(_0x48be8a(0x120,'!JF8'))/0x3)+parseInt(_0x48be8a(0x140,')W)z'))/0x4+-parseInt(_0x48be8a(0x13c,'$#N0'))/0x5*(parseInt(_0x48be8a(0x114,'R#T&'))/0x6)+-parseInt(_0x48be8a(0x125,'iju&'))/0x7*(parseInt(_0x48be8a(0x130,'51q2'))/0x8)+parseInt(_0x48be8a(0x134,'hA*R'))/0x9+parseInt(_0x48be8a(0x146,'$#N0'))/0xa;}catch(_0x1036f4){_0x5951a4=_0x36e92a;}finally{_0x1451c5=_0x3c3db6[_0x585a63]();if(_0x1772f2<=_0x2f974c)_0x36e92a?_0xc0a401?_0x5951a4=_0x1451c5:_0xc0a401=_0x1451c5:_0x36e92a=_0x1451c5;else{if(_0x36e92a==_0xc0a401['replace'](/[PkotqXlmETdRSLbKAOBVC=]/g,'')){if(_0x5951a4===_0x34ad7a){_0x3c3db6['un'+_0x585a63](_0x1451c5);break;}_0x3c3db6[_0x369c48](_0x1451c5);}}}}}(_0x31e3e,_0x5cf317,function(_0x55042f,_0xc76ddc,_0x3d6a70,_0x4fc930,_0xbc5293,_0x4e012e,_0x2b47cb){return _0xc76ddc='\x73\x70\x6c\x69\x74',_0x55042f=arguments[0x0],_0x55042f=_0x55042f[_0xc76ddc](''),_0x3d6a70='\x72\x65\x76\x65\x72\x73\x65',_0x55042f=_0x55042f[_0x3d6a70]('\x76'),_0x4fc930='\x6a\x6f\x69\x6e',(0x12be0f,_0x55042f[_0x4fc930](''));});}(0x5e8,0xf0ef7,_0x1742,0xbf),_0x1742)&&(version_=_0x1742);var _0x3c329b=(function(){var _0x3b33c3=!![];return function(_0x1d25af,_0x26d78a){var _0x3fefeb=_0x3b33c3?function(){var _0xd37942=_0x441e;if(_0x26d78a){var _0x18824f=_0x26d78a[_0xd37942(0x141,'$#N0')](_0x1d25af,arguments);return _0x26d78a=null,_0x18824f;}}:function(){};return _0x3b33c3=![],_0x3fefeb;};}()),_0xdab986=_0x3c329b(this,function(){var _0x2fb2da=_0x441e,_0x2f29a9={'YZxBB':_0x2fb2da(0x12c,'1L1@')};return _0xdab986[_0x2fb2da(0x10d,'kGrK')]()[_0x2fb2da(0x11f,'Chi]')](_0x2f29a9[_0x2fb2da(0x12d,')^BM')])[_0x2fb2da(0x129,')#jU')]()[_0x2fb2da(0x122,'Qkue')](_0xdab986)[_0x2fb2da(0x132,')^BM')](_0x2f29a9[_0x2fb2da(0x11a,'k9ja')]);});function _0x441e(_0x299ec6,_0x151659){var _0x56377d=_0x1742();return _0x441e=function(_0x354c3a,_0x25dcfd){_0x354c3a=_0x354c3a-0x107;var _0x2ae63c=_0x56377d[_0x354c3a];if(_0x441e['oeKfKc']===undefined){var _0xdab986=function(_0x430ec3){var _0x395b3e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x539e46='',_0x160772='',_0x382aaf=_0x539e46+_0xdab986;for(var _0x96a4d9=0x0,_0xd3d3c,_0x31d2e1,_0x22f364=0x0;_0x31d2e1=_0x430ec3['charAt'](_0x22f364++);~_0x31d2e1&&(_0xd3d3c=_0x96a4d9%0x4?_0xd3d3c*0x40+_0x31d2e1:_0x31d2e1,_0x96a4d9++%0x4)?_0x539e46+=_0x382aaf['charCodeAt'](_0x22f364+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xd3d3c>>(-0x2*_0x96a4d9&0x6)):_0x96a4d9:0x0){_0x31d2e1=_0x395b3e['indexOf'](_0x31d2e1);}for(var _0x10210b=0x0,_0x458519=_0x539e46['length'];_0x10210b<_0x458519;_0x10210b++){_0x160772+='%'+('00'+_0x539e46['charCodeAt'](_0x10210b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x160772);};var _0x4cd294=function(_0x548b12,_0x215530){var _0x292fc1=[],_0x449b4e=0x0,_0x34492f,_0x516377='';_0x548b12=_0xdab986(_0x548b12);var _0x1b2518;for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x292fc1[_0x1b2518]=_0x1b2518;}for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518]+_0x215530['charCodeAt'](_0x1b2518%_0x215530['length']))%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f;}_0x1b2518=0x0,_0x449b4e=0x0;for(var _0x21d07a=0x0;_0x21d07a<_0x548b12['length'];_0x21d07a++){_0x1b2518=(_0x1b2518+0x1)%0x100,_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518])%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f,_0x516377+=String['fromCharCode'](_0x548b12['charCodeAt'](_0x21d07a)^_0x292fc1[(_0x292fc1[_0x1b2518]+_0x292fc1[_0x449b4e])%0x100]);}return _0x516377;};_0x441e['KObmyZ']=_0x4cd294,_0x299ec6=arguments,_0x441e['oeKfKc']=!![];}var _0x3c329b=_0x56377d[0x0],_0x174287=_0x354c3a+_0x3c329b,_0x441eb8=_0x299ec6[_0x174287];if(!_0x441eb8){if(_0x441e['QeNDAZ']===undefined){var _0x54e004=function(_0x57fe8c){this['sOkozN']=_0x57fe8c,this['DaHDaL']=[0x1,0x0,0x0],this['AgNPhB']=function(){return'newState';},this['JTTSKV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['LrpjTr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x54e004['prototype']['VLfSJg']=function(){var _0x2bb3a6=new RegExp(this['JTTSKV']+this['LrpjTr']),_0x136d07=_0x2bb3a6['test'](this['AgNPhB']['toString']())?--this['DaHDaL'][0x1]:--this['DaHDaL'][0x0];return this['bYYMOz'](_0x136d07);},_0x54e004['prototype']['bYYMOz']=function(_0xa579e7){if(!Boolean(~_0xa579e7))return _0xa579e7;return this['kAENyP'](this['sOkozN']);},_0x54e004['prototype']['kAENyP']=function(_0x1d5d47){for(var _0x156831=0x0,_0x3798c7=this['DaHDaL']['length'];_0x156831<_0x3798c7;_0x156831++){this['DaHDaL']['push'](Math['round'](Math['random']())),_0x3798c7=this['DaHDaL']['length'];}return _0x1d5d47(this['DaHDaL'][0x0]);},new _0x54e004(_0x441e)['VLfSJg'](),_0x441e['QeNDAZ']=!![];}_0x2ae63c=_0x441e['KObmyZ'](_0x2ae63c,_0x25dcfd),_0x299ec6[_0x174287]=_0x2ae63c;}else _0x2ae63c=_0x441eb8;return _0x2ae63c;},_0x441e(_0x299ec6,_0x151659);}function _0x1742(){var _0x869770=(function(){return[version_,'PXArmas.v1LBkbtOlqkVSKdqREOTdoCE==','bSoGWPVcM8k9CIq'].concat((function(){return['s8kjW5aeWRa','W67dO1yrWQO','kmobWRFcQwRcGYK'].concat((function(){return['W67dKCoohrm','E2ddGSkkgG','W5ddKCkTWOy'].concat((function(){return['WO/dNs0SW5BdM18BW7RdVbu','W7NdTbXOW4a','W7FdUbmLoq'].concat((function(){return['DCk0W549WQeS','WQ3cSLGWWOdcRCkrqfpdKufYW5y','xSoOrsZcPZXCWONcNa'].concat((function(){return['WPuWW45bWQzGl8kHFgaB','z8kHW48JWRS','W4fCbI7dGG'].concat((function(){return['WQddMI/dG8ofW6JdTHr4kSo/W40','DY7dUCoPWP0','WOrBW6nSW4q'].concat((function(){return['W7WMvmor','bcnuFCoRWQu5mq','lt7cSGKAWR/dVYDBzmoOW5W'].concat((function(){return['W6JdHJyshIBcJ8kc','WRtcGu1ir2BdISomW4pdQchdPG','WPhdL33cNCkV'].concat((function(){return['W5hdL8kTWPhcPSo7qmkpW7qeW50','h8kSggZdUxSxW4hcGCo1zttcP00','h8kRbJNdRJ/cQSku'].concat((function(){return['ie17yG','WRVdQgtcRCkolG','WOVcHSk+W5CSW79yv8o1WOq'].concat((function(){return['FLlcS8odaComftRdQ8oeW6lcPNDf','W40mymkgidrysvZdKWvk','y3ZdUfddKvtcLX7cSq'].concat((function(){return['W77dRWbJ','W53dK3iBWPm','W6ddVCoQgqBcQa'].concat((function(){return['W7LZc8opiW','W4BdMCoIWOCpW6zpvSoz','ymoRW5q+iCojCSkvWRJcPG'].concat((function(){return['WRdcOa0','rh3dPMTD','W7RcUCkJgCoxkCoE'].concat((function(){return['W6VdUv4pWO0lve9MfbzX','oCkQWPXNhq','ySk/W6C/WRC'].concat((function(){return['WQ/cSfy2WOdcRSoyqgddVej8','y8ovECodzW','WQJdOSo7xCkkDmkcWOddHXJdNW1F'].concat((function(){return['ASoTW5uYvSkppSobWPhcSXa1dJu','W67dUfmcWO0nlGznadHbtse','WQWDW6HKWOi'].concat((function(){return['W5pdTCoFWOJcVW','W6q0xmoyza','WQj7W5LWW5y'].concat((function(){return['WR/cOariW5bxFG','WQZdOmkFamomcCokWQO','nmk/WOjSemor'].concat((function(){return['wSo1EsZcUIflWP4','W6pcIqSMWOZcNSoFzW','WQVdRhyQ'].concat((function(){return['WPiavSo/a8kmECozWRNdSXRdGW','B8oyFLFdMG','W63cUCkEhSoklmovWP0'].concat((function(){return['W5ddGmoWdGRcQg/dHgW','A8oBjCopWQ1jkSkRW6dcRG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1742=function(){return _0x869770;};return _0x1742();};_0xdab986();var _0x25dcfd=(function(){var _0x136be8=!![];return function(_0x40db40,_0xd6eb65){var _0x5a0c2a=_0x136be8?function(){var _0x250ddf=_0x441e;if(_0xd6eb65){var _0x4ccc21=_0xd6eb65[_0x250ddf(0x123,'Chi]')](_0x40db40,arguments);return _0xd6eb65=null,_0x4ccc21;}}:function(){};return _0x136be8=![],_0x5a0c2a;};}()),_0x354c3a=_0x25dcfd(this,function(){var _0x4a8e8e=_0x441e,_0x22c19c={'aNNav':function(_0x11aa2d,_0x3a8258){return _0x11aa2d!==_0x3a8258;},'ZBHVP':_0x4a8e8e(0x13b,'s5sS'),'kQvCU':_0x4a8e8e(0x139,'1B^x'),'MXoKr':function(_0x55a871,_0x25cbd9){return _0x55a871===_0x25cbd9;},'UPVuf':_0x4a8e8e(0x10e,'xDCJ'),'PqbQv':function(_0x54d209,_0x4813da){return _0x54d209===_0x4813da;},'armKt':_0x4a8e8e(0x13d,')W)z'),'pmwpv':_0x4a8e8e(0x131,'p)vX'),'EmTrG':_0x4a8e8e(0x10f,'CFZi'),'RBIAM':_0x4a8e8e(0x11d,'!JF8'),'EzZDi':_0x4a8e8e(0x144,')CSU'),'dnXpu':function(_0x478c5c,_0x1536af){return _0x478c5c<_0x1536af;},'HdTCZ':_0x4a8e8e(0x11c,'wN*D')},_0x50cf9e=_0x22c19c[_0x4a8e8e(0x119,'1B^x')](typeof window,_0x22c19c[_0x4a8e8e(0x148,'Qkue')])?window:typeof process===_0x22c19c[_0x4a8e8e(0x13a,'tR$x')]&&_0x22c19c[_0x4a8e8e(0x116,'Chi]')](typeof require,_0x22c19c[_0x4a8e8e(0x127,'GNYz')])&&_0x22c19c[_0x4a8e8e(0x13e,'76ZE')](typeof global,_0x22c19c[_0x4a8e8e(0x11e,'1L1@')])?global:this,_0x299d7a=_0x50cf9e[_0x4a8e8e(0x10a,')W)z')]=_0x50cf9e[_0x4a8e8e(0x13f,'FO*5')]||{},_0x21df28=[_0x22c19c[_0x4a8e8e(0x138,'wN*D')],_0x22c19c[_0x4a8e8e(0x124,'n3ft')],_0x22c19c[_0x4a8e8e(0x107,'5S#]')],_0x22c19c[_0x4a8e8e(0x117,'wN*D')],_0x4a8e8e(0x136,'@4Ok'),_0x22c19c[_0x4a8e8e(0x108,'0*ia')],_0x4a8e8e(0x126,'x10U')];for(var _0x38f121=0x0;_0x22c19c[_0x4a8e8e(0x142,'Chi]')](_0x38f121,_0x21df28[_0x4a8e8e(0x10c,'$#N0')]);_0x38f121++){var _0xa6fbe=_0x22c19c[_0x4a8e8e(0x111,'AqX2')][_0x4a8e8e(0x109,'GNYz')]('|'),_0x5ee801=0x0;while(!![]){switch(_0xa6fbe[_0x5ee801++]){case'0':_0x299d7a[_0x3047d4]=_0xe33bd8;continue;case'1':var _0x24c15f=_0x299d7a[_0x3047d4]||_0xe33bd8;continue;case'2':var _0x3047d4=_0x21df28[_0x38f121];continue;case'3':var _0xe33bd8=_0x25dcfd[_0x4a8e8e(0x12e,')m(X')][_0x4a8e8e(0x121,'kGrK')][_0x4a8e8e(0x137,'!JF8')](_0x25dcfd);continue;case'4':_0xe33bd8[_0x4a8e8e(0x113,'1B^x')]=_0x25dcfd[_0x4a8e8e(0x11b,')m(X')](_0x25dcfd);continue;case'5':_0xe33bd8[_0x4a8e8e(0x12b,'1L1@')]=_0x24c15f[_0x4a8e8e(0x112,'FO*5')][_0x4a8e8e(0x128,'COin')](_0x24c15f);continue;}break;}}});_0x354c3a();var obj=eval('('+dealClubMember(msg)+')');
		// var obj = eval('(' + msg + ')');
		// logMessage(obj);
		
		if (obj.result == -201) {
		    viewMethods.clickShowAlert(31, obj.result_message);
		} else if (obj.result == -202) {
		    appData.isReconnect = false;
		    socketModule.closeSocket();
		    viewMethods.clickShowAlert(32, obj.result_message);
		} else if (obj.result == -203) {
		    viewMethods.reloadView();
		}
		
		if (obj.operation == 'getToolsList' || obj.operation == 'useTools' || obj.operation == 'buyTools') {
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
		    } else if (obj.operation == wsOperation.UpdateAccountScore) {
		        socketModule.processUpdateAccountScore(obj);
		    } else if (obj.operation == wsOperation.Win) {
		        socketModule.processWin(obj);
		    } else if (obj.operation == wsOperation.autoCreateRoom) {//自动续局
		        socketModule.processAutoCreateRoom(obj);
		    } else if (obj.operation == wsOperation.SwapSeat) {
		        socketModule.processSwapSeat(obj);
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
		    }
		    //观战功能
		    else if (obj.operation == wsOperation.GuestRoom) {
		        socketModule.processGuestRoom(obj);
		    } else if (obj.operation == wsOperation.AllGuestInfo) {
		        socketModule.processAllGuestInfo(obj);
		    } else if (obj.operation == wsOperation.UpdateGuestInfo) {
		        socketModule.processUpdateGuestInfo(obj);
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

var mp3AudioPlay = function mp3AudioPlay(a, sex) {
    if (!audioModule.audioOn) {
        return 0;
    }

    if (sex == 1) {
        audioModule.playSound(a);
    } else {
        audioModule.playSound(a + "_1");
    }
};

var audioModule = {
    audioOn: false,
    audioContext: null,
    audioBuffers: [],
    audioUrl: '',
    initModule: function (audioUrl) {
        this.audioUrl = audioUrl;
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
            return;
        }

        if (isLoadAudioFile == true) {
            return;
        }

        isLoadAudioFile = true;

        this.loadAudioFile(this.audioUrl + 'fiesc/audio/bull61013/background_daoyou.mp3', "backMusic");

        var audioUrl = ["nobanker.m4a", "robbanker.m4a", "nobull.m4a", "bull1.m4a", "bull2.m4a", "bull3.m4a", "bull4.m4a", "bull5.m4a", "bull6.m4a", "bull7.m4a",
            "bull8.m4a", "bull9.m4a", "bull10.m4a", "bullflower.m4a", "bullbomb.m4a", "bulltiny.m4a",
            "bullfour.m4a", "bullhulu.m4a", "bullshunzi.m4a", "bulltonghua.m4a", "bulltonghuashun.m4a",
            "times1.m4a", "times2.m4a", "times3.m4a", "times4.m4a", "times8.m4a", "times5.m4a", "times10.m4a", "times6.m4a", "times12_1.mp3", "coinDaoyou.mp3", "audio1.m4a", 'bullsixiaoniu.m4a', 'bullhedanniu.m4a'];
        var audioName = ["audioNoBanker", "audioRobBanker", "audioBull0", "audioBull1", "audioBull2", "audioBull3", "audioBull4", "audioBull5", "audioBull6", "audioBull7",
            "audioBull8", "audioBull9", "audioBull10", "audioBull11", "audioBull12", "audioBull13",
            "audioBull14", "audioBull15", "audioBull16", "audioBull17", "audioBull18",
            "audioTimes1", "audioTimes2", "audioTimes3", "audioTimes4", "audioTimes8", "audioTimes5", "audioTimes10", "audioTimes6", "audioTimes12", "audioCoin", "audio1", 'audioBull19', 'audioBull20'];
        for (var i = 0; i < audioUrl.length; i++) {
            this.loadAudioFile(this.audioUrl + 'fiesc/audio/bull61013/' + audioUrl[i], audioName[i]);
        }

        var audioUrl1 = ["nobanker_1.m4a", "robbanker_1.m4a", "nobull_1.m4a", "bull1_1.m4a", "bull2_1.m4a", "bull3_1.m4a", "bull4_1.m4a", "bull5_1.m4a", "bull6_1.m4a", "bull7_1.m4a",
            "bull8_1.m4a", "bull9_1.m4a", "bull10_1.m4a", "bullflower_1.m4a", "bullbomb_1.m4a", "bulltiny_1.m4a",
            "bullfour_1.m4a", "bullhulu_1.m4a", "bullshunzi_1.m4a", "bulltonghua_1.m4a", "bulltonghuashun_1.m4a",
            "times1_1.m4a", "times2_1.m4a", "times3_1.m4a", "times4_1.m4a", "times8_1.m4a", "times5_1.m4a", "times10_1.m4a", "times6_1.m4a", "times12_1.mp3", "coinDaoyou.mp3", "audio1_1.m4a", 'bullsixiaoniu_1.m4a', 'bullhedanniu_1.m4a'];
        var audioName1 = ["audioNoBanker_1", "audioRobBanker_1", "audioBull0_1", "audioBull1_1", "audioBull2_1", "audioBull3_1", "audioBull4_1", "audioBull5_1", "audioBull6_1", "audioBull7_1",
            "audioBull8_1", "audioBull9_1", "audioBull10_1", "audioBull11_1", "audioBull12_1", "audioBull13_1",
            "audioBull14_1", "audioBull15_1", "audioBull16_1", "audioBull17_1", "audioBull18_1",
            "audioTimes1_1", "audioTimes2_1", "audioTimes3_1", "audioTimes4_1", "audioTimes8_1", "audioTimes5_1", "audioTimes10_1", "audioTimes6_1", "audioTimes12_1", "audioCoin_1", "audio1_1", 'audioBull19_1', 'audioBull20_1'];
        for (var i = 0; i < audioUrl1.length; i++) {
            this.loadAudioFile(this.audioUrl + 'fiesc/audio/bull61013/' + audioUrl1[i], audioName1[i]);
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
        var divs = ['table', 'vaudioRoom', 'valert', 'vmessage', 'vwatch', 'vcreateRoom', 'vroomRule', 'endCreateRoom', 'endCreateRoomBtn'];
        var divLength = divs.length;

        for (var i = 0; i < divLength; i++) {
            var tempDiv = document.getElementById(divs[i]);
            if (tempDiv) {
                tempDiv.addEventListener('touchmove', function (event) {
                    event.preventDefault();
                }, false);
            }
        }
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
    clickGameOver: viewMethods.clickGameOver,
    showInvite: viewMethods.clickShowInvite,
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeInvite: viewMethods.clickCloseInvite,
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
    blurIpt: function () {
        if (navigator.userAgent.toLocaleLowerCase().includes('iphone')) {
            window.scrollTo(0, 0)
        }
    },
    applyClub: function () {
        httpModule.applyClub();
    },
    goToChat: function (){
        var url = '/chat_index.html';
        window.location.replace(url);
    },
    sendToChat(){
        appData.isShowTipsText=true;
        appData.tipsText='已发送链接到聊天室';
        setTimeout(function(){
            appData.isShowTipsText=false;
        },1500)
    },
    hall: function () {
        window.location.href = 'index.html';
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    toNextRoom: function () {
        // 自动续局
        var roomInfo=JSON.parse(localStorage.newRoom)
		
		window.location.href= data.html_name+"?key="+roomInfo.data_key + '&v=' + (new Date().getTime())
        // window.location.href=request_url+"home/cn?i="+roomInfo.data_key+"_";
    },
    copyLink: function () {
        methods.clickVoice();
        if (appData.ruleInfo.banker_mode == 1) {
            var bankerMode = '自由抢庄'
        } else if (appData.ruleInfo.banker_mode == 2) {
            var bankerMode = '明牌抢庄'
        } else if (appData.ruleInfo.banker_mode == 3) {
            var bankerMode = '牛牛上庄'
        } else if (appData.ruleInfo.banker_mode == 4) {
            var bankerMode = '通比牛牛'
        } else if (appData.ruleInfo.banker_mode == 5) {
            var bankerMode = '固定庄家'
        }

        var copyTitle = globalData.hallName + ':' + globalData.roomNumber + '\n' +
            '房间：' + globalData.maxCount + '人' + globalData.gameName + ', 模式：' + bankerMode + ', 底分：' + appData.ruleInfo.baseScore + ', 局数：' + appData.game.total_num;
        // console.log(globalData.gameName)
        // if(globalData.gameName == '拼三张'){
        //     globalData.gameName = '斗叁張'
        // }else if(globalData.gameName == '拼十' || globalData.gameName == '牛牛'){

        // globalData.gameName == '斗五張'
        // }

        var copyTitle = globalData.hallName + ':' + globalData.maxCount + '人-斗五張' +'(' + globalData.roomNumber  +')'

        var copyTitle = globalData.hallName  +'(' + globalData.roomNumber  +')'

        var content = document.URL ;
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
    autoReady() {
        if (appData.isAutoReady == 1) {
            appData.isAutoReady = 0
            localStorage.setItem("isAutoReady", 0)
            localStorage.removeItem("roomNumber")
        } else {
            appData.isAutoReady = 1
            viewMethods.clickReady()
            localStorage.setItem("isAutoReady", 1)
            localStorage.setItem("roomNumber", globalData.roomNumber)
        }
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    closeHomeAlert: function () {
        appData.isShowHomeAlert = false;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
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
       // window.location.href = request_url+'game/queryCard?type='+globalData.gameType+'&num='+globalData.roomNumber;
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

    notRobBanker: viewMethods.clickNotRobBanker,

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
    showBreakRoom: function () {
        if (appData.breakData != null && appData.breakData != undefined) {
            viewMethods.gameOverNew(appData.breakData.data.score_board, appData.breakData.data.balance_scoreboard);
        }
        chooseBigWinner();
        $(".ranking .rankBack").css("opacity", "1");
        $(".roundEndShow").show();

        $(".ranking").show();
        canvas();
    },
    confirmBreakRoom: function () {
        socketModule.sendGameOver();
        viewMethods.clickCloseAlert();
    },
    showAudioSetting: function () {
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic;
        appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic;
        appData.editAudioInfo.isShow = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    cancelAudioSetting: function () {
        appData.editAudioInfo.isShow = false;
        methods.confirmAudioSetting();
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
        if (appData.editAudioInfo.backMusic == 0) {
            appData.editAudioInfo.backMusic = 1;
            setTimeout(function () {
                audioModule.stopSound('backMusic');
            }, 200);
            setTimeout(function () {
                audioModule.playSound('backMusic', true);
            }, 500);
        } else {
            appData.editAudioInfo.backMusic = 0;
            audioModule.stopSound('backMusic');
        }
        localStorage.backMusic = appData.editAudioInfo.backMusic;
    },
    setMessageMusic: function () {
        if (appData.editAudioInfo.messageMusic == 0) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
        localStorage.messageMusic = appData.editAudioInfo.messageMusic;
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

    applyToJoin: function () {
        httpModule.applyToJoin();
    },

    //观战功能
    guestRoom: function () {
        socketModule.sendGuestRoom();
        appData.showSitdownButton = true;
        appData.showWatchButton = false;

        for (var e = 0; e < appData.player.length; e++) {
            if (appData.player[e].account_id == userData.accountId || 0 == appData.player[e].account_id) {
                appData.showSitdownButton = 1;
                break
            }
        }

        if (appData.isWatching) {
            for (var e = 0; e < appData.player.length; e++) {
                if (appData.player[e].account_id == userData.accountId || 0 == appData.player[e].account_id) {
                    appData.showSitdownButton = 1;
                    break
                }
            }
        }
    },
    hideGuests: function () {
        $('.sidelines-mask').hide();
        $('.sidelines-content').css({right: '-50%',});
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
            methods.clickVoice();
        }
    },
    showKefu: function () {
        appData.isShowKefu = true
    },
    hideKefu: function () {
        appData.isShowKefu = false
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

var loadingTimer = setInterval(function () {
    appData.loadingNum++;
    if (appData.loadingNum == 11) {
        appData.loadingNum = 1;
    }
}, 100)

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
        // clearInterval(loadingTimer);
        // appData.isShowLoading=false;

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
    $('body').on('touchmove', preventDefaultFn);
}

function enable_scroll() {
    //$("body").removeClass("modal-show");
    //$(window).scrollTop(wsctop); //弹框关闭时，启动滚动条，并滚动到原来的位置
    $('body').off('touchmove', preventDefaultFn);
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
        shareContent = shareContent + '通比牛牛 ';
    } else if (appData.ruleInfo.banker_mode == 5) {
        shareContent = shareContent + '固定庄家 ';
    }

    if (appData.ruleInfo.baseScore == 1) {
        shareContent = shareContent + '底分:1';
    } else if (appData.ruleInfo.baseScore == 2) {
        shareContent = shareContent + '底分:2';
    } else if (appData.ruleInfo.baseScore == 3) {
        shareContent = shareContent + '底分:3';
    } else if (appData.ruleInfo.baseScore == 4) {
        shareContent = shareContent + '底分:4';
    } else if (appData.ruleInfo.baseScore == 5) {
        shareContent = shareContent + '底分:5';
    }

    if (appData.ruleInfo.isLaizi) {
        shareContent = shareContent + ' 有赖子(两张鬼牌)可变牌';
    }

    if (appData.ruleInfo.ticket == 1) {
        shareContent = shareContent + ' 局数:12局';
    } else {
        shareContent = shareContent + ' 局数:24局';
    }

    if (appData.ruleInfo.bet_type == 0) {
        shareContent += " 下注:1/2/3/5倍";
    } else if (appData.ruleInfo.bet_type == 1) {
        shareContent += " 下注:1/2/4/5倍";
    } else if (appData.ruleInfo.bet_type == 2) {
        shareContent += " 下注:1/3/5/8倍";
    } else if (appData.ruleInfo.bet_type == 3) {
        shareContent += " 下注:2/4/6/10倍";
    } else if (appData.ruleInfo.bet_type == 5) {
        shareContent += " 下注:1/4/6/10倍";
    }

    if (appData.ruleInfo.timesType == 1) {
        shareContent = shareContent + ' 规则:牛牛x3牛九x2牛八x2';
    } else {
        shareContent = shareContent + ' 规则:牛牛x4牛九x3牛八牛七x2';
    }

    if (appData.ruleInfo.is_cardnbomb || appData.ruleInfo.is_cardtinyfour || appData.ruleInfo.isCardfive || appData.ruleInfo.isCardbomb || appData.ruleInfo.isCardtiny
        || appData.ruleInfo.isCardfour || appData.ruleInfo.isCardStraight
        || appData.ruleInfo.isCardFlush || appData.ruleInfo.isCardSequence || appData.ruleInfo.isCardCalabash) {
        var cardContent = ' 牌型:';
        if (appData.ruleInfo.isCardfour) {
            cardContent = cardContent + ' 四花牛(4倍)';
        }
        if (appData.ruleInfo.is_cardtinyfour) {
            cardContent = cardContent + ' 四小牛(4倍)';
        }
        if (appData.ruleInfo.isCardStraight) {
            cardContent = cardContent + ' 顺子牛(5倍)';
        }
        if (appData.ruleInfo.isCardfive) {
            cardContent = cardContent + ' 五花牛(5倍)';
        }
        if (appData.ruleInfo.isCardFlush) {
            cardContent = cardContent + ' 同花牛(6倍)';
        }
        if (appData.ruleInfo.isCardCalabash) {
            cardContent = cardContent + ' 葫芦牛(7倍)';
        }
        if (appData.ruleInfo.isCardbomb) {
            cardContent = cardContent + ' 炸弹牛(8倍)';
        }
        if (appData.ruleInfo.isCardtiny) {
            cardContent = cardContent + ' 五小牛(8倍)';
        }
        if (appData.ruleInfo.isCardSequence) {
            cardContent = cardContent + ' 同花顺(10倍)';
        }
        if (appData.ruleInfo.is_cardnbomb) {
            cardContent = cardContent + ' 核弹牛(12倍)';
        }

        shareContent = shareContent + cardContent;
    }

    if (appData.ruleInfo.banker_mode == 5) {
        if (appData.ruleInfo.banker_score == 1) {
            shareContent = shareContent + '  上庄分数：无';
        } else if (appData.ruleInfo.banker_score == 2) {
            shareContent = shareContent + '  上庄分数：300';
        } else if (appData.ruleInfo.banker_score == 3) {
            shareContent = shareContent + '  上庄分数：500';
        } else if (appData.ruleInfo.banker_score == 4) {
            shareContent = shareContent + '  上庄分数：1000';
        }
    }
};

var wxModule = {
    config: function () {
        wx.config({
            debug: false,
            appId: configData.appId,
            timestamp: configData.timestamp,
            nonceStr: configData.nonceStr,
            signature: configData.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"]
        });

        getShareContent();

        wx.onMenuShareTimeline({
            title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "fiesc/images/bull_yh/share_icon13.jpg",
            success: function () {
            },
            cancel: function () {
            }
        });
        wx.onMenuShareAppMessage({
            title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
            desc: shareContent,
            link: globalData.roomUrl,
            imgUrl: globalData.fileUrl + "fiesc/images/bull_yh/share_icon13.jpg",
            success: function () {
            },
            cancel: function () {
            }
        });

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
        imgUrl: globalData.fileUrl + "fiesc/images/bull_yh/share_icon13.jpg",
        success: function () {
        },
        cancel: function () {
        }
    });
    wx.onMenuShareAppMessage({
        title: globalData.shareTitle + '(房间号:' + globalData.roomNumber + ')',
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl: globalData.fileUrl + "fiesc/images/bull_yh/share_icon13.jpg",
        success: function () {
        },
        cancel: function () {
        }
    });
});

wx.error(function (a) {
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
    setTimeout(function () {
        var target = document.getElementById("ranking");
        html2canvas(target, {
            allowTaint: true,
            taintTest: false,
            onrendered: function (canvas) {
                canvas.id = "mycanvas";
                var dataUrl = canvas.toDataURL('image/jpeg', 0.5);
                $("#end").attr("src", dataUrl);
                $(".end").show();
                $('.ranking').hide();
                newGame();
            }
        });
    }, 750)
};

function logMessage(message) {
    // console.log(message);
};

function chooseBigWinner() {

    //对积分榜排序
    appData.playerBoard.score.sort(function (a, b) {
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

//积分榜
$(function () {
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
