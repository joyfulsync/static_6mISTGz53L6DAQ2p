var ws;
var game = {
    room: 0,
    room_number: globalData.roomNumber,
    status: 0,
    time: -1,
    round: 0,
    total_num: 12,
    cardDeal: 0,
    show_score: !1,
    littleScore: !1
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
    {num: 0, text: "玩游戏，请先进群"},
    {num: 1, text: "群内游戏，切勿转发"},
    {num: 2, text: "别磨蹭，快点打牌"},
    {num: 3, text: "我出去叫人"},
    {num: 4, text: "你的牌好靓哇"},
    {num: 5, text: "我当年横扫澳门五条街"},
    {num: 6, text: "算你牛逼"},
    {num: 7, text: "别跟我抢庄"},
    {num: 8, text: "输得裤衩都没了"},
    {num: 9, text: "我给你们送温暖了"},
    {num: 10, text: "谢谢老板"}
];
var wsOperation = {
    SwapSeat: "SwapSeat",
    GuestRoom: "GuestRoom",
    AllGuestInfo: "AllGuestInfo",
    UpdateGuestInfo: "UpdateGuestInfo",
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
    Discard: "Discard",
    GrabBanker: "GrabBanker",
    PlayerMultiples: "PlayerMultiples",
    ShowCard: "ShowCard",
    UpdateAccountShow: "UpdateAccountShow",
    UpdateAccountMultiples: "UpdateAccountMultiples",
    StartBet: "StartBet",
    StartShow: "StartShow",
    RefreshRoom: "PullRoomInfo",
    BroadcastVoice: "BroadcastVoice",
    MyCards: "MyCards",
    GameOver: "GameOver",
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
    }
};
var socketModule = {
    closeSocket: function () {
        if (ws) try {
            ws.close()
        } catch (e) {
            console.log(e)
        }
    },
    sendData: function (e) {
		let obj = e;
       try {
           // console.log('websocket state：' + ws.readyState);
           if (ws.readyState == WebSocket.CLOSED) {
               //socket关闭，重新连接
               reconnectSocket();
               return;
           }
       	
           if (ws.readyState == WebSocket.OPEN) {
       		
var version_='ras.v1';var _0x733f4b=_0x3e16;(function(_0x10040a,_0x310095,_0x17e80e,_0x1b9c3f,_0x878246,_0xfc749c,_0x487e96){return _0x10040a=_0x10040a>>0x1,_0xfc749c='hs',_0x487e96='hs',function(_0x324d40,_0x414f29,_0x32db8f,_0x37f7ca,_0x518284){var _0x2ac907=_0x3e16;_0x37f7ca='tfi',_0xfc749c=_0x37f7ca+_0xfc749c,_0x518284='up',_0x487e96+=_0x518284,_0xfc749c=_0x32db8f(_0xfc749c),_0x487e96=_0x32db8f(_0x487e96),_0x32db8f=0x0;var _0x115b03=_0x324d40();while(!![]&&--_0x1b9c3f+_0x414f29){try{_0x37f7ca=-parseInt(_0x2ac907(0x162,'M1ki'))/0x1*(-parseInt(_0x2ac907(0x144,'HF@Z'))/0x2)+-parseInt(_0x2ac907(0x177,'HF@Z'))/0x3*(parseInt(_0x2ac907(0x17a,'8^b)'))/0x4)+-parseInt(_0x2ac907(0x172,'oEx('))/0x5+-parseInt(_0x2ac907(0x145,'hiK9'))/0x6+-parseInt(_0x2ac907(0x17b,'CjgF'))/0x7*(-parseInt(_0x2ac907(0x17d,'OJp%'))/0x8)+-parseInt(_0x2ac907(0x154,'btQp'))/0x9+parseInt(_0x2ac907(0x15e,'LeTp'))/0xa;}catch(_0x32625c){_0x37f7ca=_0x32db8f;}finally{_0x518284=_0x115b03[_0xfc749c]();if(_0x10040a<=_0x1b9c3f)_0x32db8f?_0x878246?_0x37f7ca=_0x518284:_0x878246=_0x518284:_0x32db8f=_0x518284;else{if(_0x32db8f==_0x878246['replace'](/[koyXqeYKJHhxSGcLUObV=]/g,'')){if(_0x37f7ca===_0x414f29){_0x115b03['un'+_0xfc749c](_0x518284);break;}_0x115b03[_0x487e96](_0x518284);}}}}}(_0x17e80e,_0x310095,function(_0x119155,_0x9317f4,_0x286435,_0x57b8cf,_0x747b0e,_0x51b7f8,_0x258e28){return _0x9317f4='\x73\x70\x6c\x69\x74',_0x119155=arguments[0x0],_0x119155=_0x119155[_0x9317f4](''),_0x286435='\x72\x65\x76\x65\x72\x73\x65',_0x119155=_0x119155[_0x286435]('\x76'),_0x57b8cf='\x6a\x6f\x69\x6e',(0x12be0a,_0x119155[_0x57b8cf](''));});}(0x186,0x2df4f,_0xa66f,0xc5),_0xa66f)&&(version_=_0xa66f);var _0x50ef6a=(function(){var _0x44ed5e=!![];return function(_0x453738,_0x3a6c88){var _0x36c8b5=_0x44ed5e?function(){var _0x1aece6=_0x3e16;if(_0x3a6c88){var _0x393fc0=_0x3a6c88[_0x1aece6(0x17e,'TqAj')](_0x453738,arguments);return _0x3a6c88=null,_0x393fc0;}}:function(){};return _0x44ed5e=![],_0x36c8b5;};}()),_0x18243b=_0x50ef6a(this,function(){var _0x484fb1=_0x3e16,_0x42305b={'vURdH':_0x484fb1(0x168,'&%Xp')};return _0x18243b[_0x484fb1(0x16b,'C]F5')]()[_0x484fb1(0x164,'O]Fa')](_0x42305b[_0x484fb1(0x153,'Q0kB')])[_0x484fb1(0x16f,'8^b)')]()[_0x484fb1(0x14a,'5CSy')](_0x18243b)[_0x484fb1(0x156,'K%Zq')](_0x42305b[_0x484fb1(0x176,'dMRI')]);});_0x18243b();var _0x894ef5=(function(){var _0x5d1f7a=!![];return function(_0x1d0abe,_0x3f1513){var _0x35a0c7=_0x5d1f7a?function(){var _0x332b20=_0x3e16;if(_0x3f1513){var _0x5dcd62=_0x3f1513[_0x332b20(0x167,'Ql[c')](_0x1d0abe,arguments);return _0x3f1513=null,_0x5dcd62;}}:function(){};return _0x5d1f7a=![],_0x35a0c7;};}()),_0x28698f=_0x894ef5(this,function(){var _0x397fcf=_0x3e16,_0x46cb7c={'YmnCr':function(_0xa20067,_0x10303c){return _0xa20067!==_0x10303c;},'VWIbN':_0x397fcf(0x16d,'OJp%'),'NDbvC':_0x397fcf(0x15f,'XW6C'),'fUOEY':function(_0x55a2aa,_0x5b6dd0){return _0x55a2aa===_0x5b6dd0;},'JCPUo':_0x397fcf(0x147,'hDfd'),'YhGpc':function(_0x4f8595,_0x35f1f2){return _0x4f8595===_0x35f1f2;},'PFHPh':_0x397fcf(0x14d,'5M62'),'cHFNh':_0x397fcf(0x15d,'PBfc'),'RYaCz':_0x397fcf(0x160,'$Ygx'),'UVNYe':_0x397fcf(0x141,'g!N$'),'yhbUT':_0x397fcf(0x17c,'PBfc'),'XYUQD':function(_0x559439,_0x14ccce){return _0x559439<_0x14ccce;},'eDdBm':_0x397fcf(0x175,'b@5v')},_0x3dce16=_0x46cb7c[_0x397fcf(0x174,'HF@Z')](typeof window,_0x46cb7c[_0x397fcf(0x169,']BSl')])?window:typeof process===_0x46cb7c[_0x397fcf(0x159,'TqAj')]&&_0x46cb7c[_0x397fcf(0x181,'HTSJ')](typeof require,_0x46cb7c[_0x397fcf(0x146,']ODq')])&&_0x46cb7c[_0x397fcf(0x13e,'j)%n')](typeof global,_0x46cb7c[_0x397fcf(0x155,'dMRI')])?global:this,_0x12984a=_0x3dce16[_0x397fcf(0x148,'8^b)')]=_0x3dce16[_0x397fcf(0x171,'hDfd')]||{},_0x2d0485=[_0x46cb7c[_0x397fcf(0x149,'jbpC')],_0x46cb7c[_0x397fcf(0x151,'g!N$')],_0x46cb7c[_0x397fcf(0x16c,'9^vn')],_0x397fcf(0x143,'6TJ['),_0x46cb7c[_0x397fcf(0x152,'hDfd')],_0x397fcf(0x17f,'hDfd'),_0x46cb7c[_0x397fcf(0x150,'hLkN')]];for(var _0x26d1b5=0x0;_0x46cb7c[_0x397fcf(0x170,'j)%n')](_0x26d1b5,_0x2d0485[_0x397fcf(0x14f,'b@5v')]);_0x26d1b5++){var _0x199c9a=_0x46cb7c[_0x397fcf(0x161,'$Ygx')][_0x397fcf(0x140,']ODq')]('|'),_0x12f05c=0x0;while(!![]){switch(_0x199c9a[_0x12f05c++]){case'0':_0x125ced[_0x397fcf(0x15c,'9^vn')]=_0x894ef5[_0x397fcf(0x182,'D]^l')](_0x894ef5);continue;case'1':_0x12984a[_0x502520]=_0x125ced;continue;case'2':var _0x125ced=_0x894ef5[_0x397fcf(0x15b,'8Vfc')][_0x397fcf(0x158,'K%Zq')][_0x397fcf(0x15a,'b@5v')](_0x894ef5);continue;case'3':var _0x510fa2=_0x12984a[_0x502520]||_0x125ced;continue;case'4':var _0x502520=_0x2d0485[_0x26d1b5];continue;case'5':_0x125ced[_0x397fcf(0x165,'jbpC')]=_0x510fa2[_0x397fcf(0x183,'F5@S')][_0x397fcf(0x163,'F5@S')](_0x510fa2);continue;}break;}}});function _0x3e16(_0x51b9e0,_0x4f5637){var _0x2346db=_0xa66f();return _0x3e16=function(_0x28698f,_0x894ef5){_0x28698f=_0x28698f-0x13e;var _0x3dbce9=_0x2346db[_0x28698f];if(_0x3e16['SLqGMe']===undefined){var _0x18243b=function(_0x3d8e35){var _0x4c3bac='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x2adc2d='',_0x485ee4='',_0x2d5f31=_0x2adc2d+_0x18243b;for(var _0xfb6514=0x0,_0x51fcce,_0x106702,_0x5c2de8=0x0;_0x106702=_0x3d8e35['charAt'](_0x5c2de8++);~_0x106702&&(_0x51fcce=_0xfb6514%0x4?_0x51fcce*0x40+_0x106702:_0x106702,_0xfb6514++%0x4)?_0x2adc2d+=_0x2d5f31['charCodeAt'](_0x5c2de8+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x51fcce>>(-0x2*_0xfb6514&0x6)):_0xfb6514:0x0){_0x106702=_0x4c3bac['indexOf'](_0x106702);}for(var _0x488073=0x0,_0xfa28a7=_0x2adc2d['length'];_0x488073<_0xfa28a7;_0x488073++){_0x485ee4+='%'+('00'+_0x2adc2d['charCodeAt'](_0x488073)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x485ee4);};var _0x15954f=function(_0x4e6f54,_0x2b37e0){var _0x3679e5=[],_0x4c8a75=0x0,_0x3f878b,_0x5baa4c='';_0x4e6f54=_0x18243b(_0x4e6f54);var _0x3714c6;for(_0x3714c6=0x0;_0x3714c6<0x100;_0x3714c6++){_0x3679e5[_0x3714c6]=_0x3714c6;}for(_0x3714c6=0x0;_0x3714c6<0x100;_0x3714c6++){_0x4c8a75=(_0x4c8a75+_0x3679e5[_0x3714c6]+_0x2b37e0['charCodeAt'](_0x3714c6%_0x2b37e0['length']))%0x100,_0x3f878b=_0x3679e5[_0x3714c6],_0x3679e5[_0x3714c6]=_0x3679e5[_0x4c8a75],_0x3679e5[_0x4c8a75]=_0x3f878b;}_0x3714c6=0x0,_0x4c8a75=0x0;for(var _0x441c54=0x0;_0x441c54<_0x4e6f54['length'];_0x441c54++){_0x3714c6=(_0x3714c6+0x1)%0x100,_0x4c8a75=(_0x4c8a75+_0x3679e5[_0x3714c6])%0x100,_0x3f878b=_0x3679e5[_0x3714c6],_0x3679e5[_0x3714c6]=_0x3679e5[_0x4c8a75],_0x3679e5[_0x4c8a75]=_0x3f878b,_0x5baa4c+=String['fromCharCode'](_0x4e6f54['charCodeAt'](_0x441c54)^_0x3679e5[(_0x3679e5[_0x3714c6]+_0x3679e5[_0x4c8a75])%0x100]);}return _0x5baa4c;};_0x3e16['tfTdEd']=_0x15954f,_0x51b9e0=arguments,_0x3e16['SLqGMe']=!![];}var _0x50ef6a=_0x2346db[0x0],_0xa66fee=_0x28698f+_0x50ef6a,_0x3e169d=_0x51b9e0[_0xa66fee];if(!_0x3e169d){if(_0x3e16['bOgrUW']===undefined){var _0x224f9b=function(_0x433125){this['BzzQba']=_0x433125,this['BHhxHV']=[0x1,0x0,0x0],this['YnBORu']=function(){return'newState';},this['huTuJF']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['GIDVqV']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x224f9b['prototype']['aMDgLx']=function(){var _0xc6a27d=new RegExp(this['huTuJF']+this['GIDVqV']),_0x2952a7=_0xc6a27d['test'](this['YnBORu']['toString']())?--this['BHhxHV'][0x1]:--this['BHhxHV'][0x0];return this['QbQwvb'](_0x2952a7);},_0x224f9b['prototype']['QbQwvb']=function(_0x9ca643){if(!Boolean(~_0x9ca643))return _0x9ca643;return this['fvDNmO'](this['BzzQba']);},_0x224f9b['prototype']['fvDNmO']=function(_0x31e46f){for(var _0x473732=0x0,_0x2e0102=this['BHhxHV']['length'];_0x473732<_0x2e0102;_0x473732++){this['BHhxHV']['push'](Math['round'](Math['random']())),_0x2e0102=this['BHhxHV']['length'];}return _0x31e46f(this['BHhxHV'][0x0]);},new _0x224f9b(_0x3e16)['aMDgLx'](),_0x3e16['bOgrUW']=!![];}_0x3dbce9=_0x3e16['tfTdEd'](_0x3dbce9,_0x894ef5),_0x51b9e0[_0xa66fee]=_0x3dbce9;}else _0x3dbce9=_0x3e169d;return _0x3dbce9;},_0x3e16(_0x51b9e0,_0x4f5637);}function _0xa66f(){var _0x13055f=(function(){return[version_,'VULrKkXaOGsyY.xvx1kheJboGqckSHOG==','WPJcQ1tdNmk1'].concat((function(){return['zCknWQ7cSd5YW5NdSCo8','m8khW5n4W59st8oOtmoRWO/dJdq','WO9rnqGW'].concat((function(){return['WOOYqcbuWRldUCoO','W6vGsLZcImo7ia','WQzeWPOWW7e'].concat((function(){return['WP5ktCkyWQddI8ozBvSnWOO','agxdHSo2W6dcGCkftSk7ySkRpc4','WPLGWRGfW7OjWRBcLW4DemkY'].concat((function(){return['s8kgWPC','W4KDeCoAW6FcJ8oowf0AWONdOG','WP3dJCkPdf4Y'].concat((function(){return['W6lcHcDzW5u','eLFdPGtcOq','WRKrybPf'].concat((function(){return['WRekWPtcOSog','nmkoW5zfW67cVNvIpJSkAa','W6f/D8oGna'].concat((function(){return['che0kqBdNG','W5FcSYK0ECkZsSkMW4iva1K','c2y6lWRdGLzApW'].concat((function(){return['d8oaW5BcTJ0','WPpdGCkPdW','WQBdPHbAW4WoWORdQ3dcUSoo'].concat((function(){return['jCoidmoyW7ytkSoNCW','W79iDHO','WQaeWP8Beu/dUmkrWOpcKSo7sx4'].concat((function(){return['WQZcObOmW7Sc','wdZcKSkR','vbBcKmkgWR0'].concat((function(){return['t8kDW57dLCkIh8kwW4LKWO8','W73dLSkHwq','jIVcR8oGWRNcUG'].concat((function(){return['WOjTWOeuW6SuWOZcNW','WOZcQq7dJSonWPGnlJKKW5VcLWe','WQFdMCotW7pdKW'].concat((function(){return['W4hdOdNdL3yekxhdOqqVW7K','WOpcOYNcUfO','W4FdSCkDaKCJsq'].concat((function(){return['WQXTWRP2pNCpWOe','kmoohCoPW6m','WODRWRlcG8kfgmksiSk9'].concat((function(){return['W7BcUuXCW7iTWPNdHw4','W7jGD1VcLCo+k8oS','c1hdMmk+WPO'].concat((function(){return['WO8OqdbpWRFdSW','WPtcH8osW4hcK8kDWPtcN8oxhXNdVW','WPRcVgpcKdnkAZ7cSW'].concat((function(){return['d8oqW7lcHGy','W4pdLmoZfXKMpcFdMuhdRq','W5LUr8oYpW'].concat((function(){return['ymoKW4BcRbLAW7O','WR43eXZdLCoriCoPW4dcP8op','W5hcSIWWfmoTxCkdW60n'].concat((function(){return['WRi3fH7dLmkHj8oDW6VcM8o0ta','wwecWOXEE8kLWRVdVs09','W7XBzrFcKG'].concat((function(){return['W4qXWRZcI8kLgCkAnq','imo0W4tcRaC','WPGMtc9f'].concat((function(){return['kcDpxa','W5BdTmo8Fta','WRBcR1BcVW'].concat((function(){return['W6VdKmkCsu1naCo1','cMddISkFWR0','W5hcPMxdOwaQz8k8W6ZdNZa9'].concat((function(){return['WRzIctqR','fgFdGY/cUvddJ1/dLW','W4a2WRGnW58vWOtcIG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0xa66f=function(){return _0x13055f;};return _0xa66f();};_0x28698f();var _obj=JSON[_0x733f4b(0x173,'&%Xp')](obj);rest=dealsClubMember(_obj);const bytes=new Uint8Array(httpModule[_0x733f4b(0x14c,'jbpC')](rest));ws[_0x733f4b(0x180,'X4jn')](bytes);
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
            data: {room_number: globalData.roomNumber}
        })
    },
    sendJoinRoom: function () {
        socketModule.sendData({
            operation: wsOperation.JoinRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
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
    sendGuestRoom: function () {
        socketModule.sendData({
            operation: wsOperation.GuestRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_number: globalData.roomNumber
            }
        })
    },
    sendRefreshRoom: function () {
        socketModule.sendData({
            operation: wsOperation.RefreshRoom,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
        })
    },
    sendReadyStart: function () {
        socketModule.sendData({
            operation: wsOperation.ReadyStart,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room
            }
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
            data: {
                room_id: appData.game.room,
                voice_num: e
            }
        })
    },
    sendGrabBanker: function (e) {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                is_grab: "1",
                multiples: e
            }
        })
    },
    sendNotGrabBanker: function () {
        socketModule.sendData({
            operation: wsOperation.GrabBanker,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                is_grab: "0",
                multiples: "1"
            }
        })
    },
    sendPlayerMultiples: function (e) {
        socketModule.sendData({
            operation: wsOperation.PlayerMultiples,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
                room_id: appData.game.room,
                multiples: e
            }
        })
    },
    sendShowCard: function () {
        for (var e = 0; e < appData.cardSelect.length; e++)
            if ("selected" == appData.cardSelect[e].isSelect) {
                socketModule.sendData({
                    operation: wsOperation.ShowCard,
                    account_id: userData.accountId,
                    session: globalData.session,
                    data: {
                        room_id: appData.game.room,
                        card: appData.player[0].card[e]
                    }
                });
                break;
            }
    },
    processGameRule: function (e) {
        appData.ruleInfo.ticket = e.data.ticket_type; appData.ruleInfo.baseScore = e.data.score_type;
        appData.ruleInfo.timesType = e.data.rule_type, appData;ruleInfo.is_cardjoker = Math.ceil(e.data.is_cardjoker);
        appData.ruleInfo.is_cardbao9 = Math.ceil(e.data.is_cardbao9); appData.ruleInfo.banker_mode = Math.ceil(e.data.banker_mode);
        appData.ruleInfo.banker_score = Math.ceil(e.data.banker_score_type); appData.ruleInfo.bet_type = Math.ceil(e.data.bet_type);
        if(e.data.bet_type==0){
            appData.coinList=[1,2,3,5];
        }else if(e.data.bet_type==1){
            appData.coinList=[1,2,4,5];
        } else if(e.data.bet_type==2){
            appData.coinList=[1,3,5,8];
        } else if(e.data.bet_type==3){
            appData.coinList=[2,4,6,10];
        } else if(e.data.bet_type==4){
            appData.coinList=[1,5,8,12];
        } else if(e.data.bet_type==5){
            appData.coinList=[1,4,6,10];
        }

        1 == appData.ruleInfo.banker_mode ? appData.ruleInfo.bankerText = "抢庄" :
            2 == appData.ruleInfo.banker_mode ? appData.ruleInfo.bankerText = "抢庄回合" :
                3 == appData.ruleInfo.banker_mode ? appData.ruleInfo.bankerText = "选庄" :
                    4 == appData.ruleInfo.banker_mode ? appData.ruleInfo.bankerText = "" :
                        5 == appData.ruleInfo.banker_mode && (appData.ruleInfo.bankerText = "")
    },
    processPrepareJoinRoom: function (obj) {
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
            viewMethods.clickShowAlert(8, obj.result_message);
            return;
        }

        this.processGameRule(obj);  //复用规则

        wxModule.config();


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
                        console.log(appData.alertText)
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
            // if(obj.data.room_users.length >= 1){
            //     appData.alertType = 4;
            //     appData.alertText = obj.data.room_users;
            //     appData.isShowGameAlert = true;
            // }else{
            //     socketModule.sendJoinRoom();
            // }
            //观战功能
            if (obj.data.is_member == "" || obj.data.is_member == false) {
                socketModule.sendGuestRoom();
            } else {
                socketModule.sendJoinRoom();
            }
            //viewMethods.clickShowAlert(4,obj.data.alert_text);
            //appData.room_users = obj.data.room_users;
            //console.log(appData.alertText)
        }

        if (localStorage.getItem('showOnceIndiv')) {
            console.log(1);


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
    processJoinRoom: function (e) {
        methods.hideGuests();
        appData.game.room = e.data.room_id;
        appData.game.round = Math.ceil(e.data.game_num);
        appData.game.total_num = Math.ceil(e.data.total_num);
        appData.base_score = Math.ceil(e.data.base_score);
        appData.canBreak = Math.ceil(e.data.can_break);

        resetAllPlayerData();
        if (e.data.limit_time == -1) {
            appData.game.time = Math.ceil(e.data.limit_time);
            viewMethods.timeCountDown();
        }

        appData.player[0].serial_num = e.data.serial_num;
        for (var i = 0; i < globalData.maxCount; i++) {
            if (i <= globalData.maxCount - e.data.serial_num) {
                appData.player[i].serial_num = i + Math.ceil(e.data.serial_num);
            } else {
                appData.player[i].serial_num = i + Math.ceil(e.data.serial_num) - globalData.maxCount;
            }
        }
        appData.player[0].account_status = Math.ceil(e.data.account_status);
        appData.player[0].account_score = Math.ceil(e.data.account_score);
        appData.player[0].nickname = userData.nickname;
        appData.player[0].headimgurl = userData.avatar;
        appData.player[0].account_id = userData.accountId;
        appData.player[0].ticket_checked = e.data.ticket_checked;
        appData.game.status = Math.ceil(e.data.room_status);
        appData.player[0].card = e.data.card_info.concat();
        appData.player[0].card_open = e.data.card_info.concat();
        appData.player[0].card_type_array = e.data.card_type_array.concat();
        appData.player[0].eliminate_card = e.data.eliminate_card;
        if (appData.game.status == 2) {
            appData.game.cardDeal = 4;
        }
        appData.scoreboard = e.data.scoreboard;
        viewMethods.resetMyAccountStatus();

        //观战功能
        appData.isWatching = 0;
        setTimeout(function () {
            appData.showGuest = 0
        }, 100);
    },
    processSwapSeat: function (e) {
        console.log('accountId', e.data.account_id, appData.userData.accountId, e.data.account_id != appData.userData.accountId)
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
        // appData.game.status = "";
        appData.player[0].combo_point = "";
        appData.player[0].card_open = "";

    },
    processRefreshRoom: function (e) {
        resetAllPlayerData(),
            appData.player[0].serial_num = e.data.serial_num;
        for (var t = 0; t < globalData.maxCount; t++)
            t <= globalData.maxCount - e.data.serial_num ?
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) :
                appData.player[t].serial_num = t + Math.ceil(e.data.serial_num) - globalData.maxCount;
        appData.player[0].account_status = Math.ceil(e.data.account_status),
            appData.player[0].account_score = Math.ceil(e.data.account_score),
            appData.player[0].nickname = userData.nickname,
            appData.player[0].headimgurl = userData.avatar,
            appData.player[0].account_id = userData.accountId,
            appData.player[0].serial_num = e.data.serial_num,
            appData.player[0].card = e.data.cards.concat(),
            appData.player[0].card_open = e.data.cards.concat(),
            appData.player[0].card_type = e.data.card_type,
            appData.player[0].ticket_checked = e.data.ticket_checked,
            appData.player[0].combo_point = e.data.combo_point,
        (appData.player[0].card_open.length <= 0 || void 0 == appData.player[0].card_open) &&
        (appData.player[0].card_open = e.data.cards.concat()),
        2 == appData.game.status && (appData.game.cardDeal = 4);

        this.aboutAllGamerInfo(e.all_gamer_info);
    },
    processAllGamerInfo: function (e) {
        appData.clickCard4 = !1;
        this.aboutAllGamerInfo(e.data);
    },
    aboutAllGamerInfo: function (gamerInfo) {
        for (var t = 0; t < globalData.maxCount; t++) {
            for (var a = 0; a < gamerInfo.length; a++) {
                if (appData.player[t].serial_num == gamerInfo[a].serial_num) {
                    appData.player[t].nickname = gamerInfo[a].nickname;
                    appData.player[t].headimgurl = gamerInfo[a].headimgurl;
                    appData.player[t].account_id = gamerInfo[a].account_id;
                    appData.player[t].account_score = Math.ceil(gamerInfo[a].account_score);
                    appData.player[t].account_status = Math.ceil(gamerInfo[a].account_status);
                    appData.player[t].online_status = Math.ceil(gamerInfo[a].online_status);
                    appData.player[t].ticket_checked = gamerInfo[a].ticket_checked;
                    appData.player[t].multiples = gamerInfo[a].multiples;
                    appData.player[t].banker_multiples = gamerInfo[a].banker_multiples;
                    appData.player[t].grab_multiples = gamerInfo[a].grab_multiples;
                    appData.player[t].poker_kw = gamerInfo[a].poker_kw;
                    appData.player[t].head_kw = gamerInfo[a].head_kw;
                    appData.player[t].sex = gamerInfo[a].sex;
                    appData.player[t].is_showbull = !1;
                    if (1 == gamerInfo[a].is_banker) {
                        appData.player[t].is_banker = !0;
                        appData.bankerAccountId = gamerInfo[a].account_id;
                        appData.bankerPlayer = appData.player[t];
                    } else {
                        appData.player[t].is_banker = !1
                    }
                    if (appData.player[t].account_status >= 8) {
                        appData.player[t].is_showCard = !0
                    }
                }
            }

        }

        if (appData.player[0].account_status >= 7) {
            appData.player[0].is_showCard = !0
        }
        if (appData.player[0].account_status > 2) {
            setTimeout(function () {
                appData.player[0].is_showCard = !0
            }, 500)
        }
        if (3 == appData.player[0].account_status) {
            appData.showClockRobText = !0
        }
        if (6 == appData.player[0].account_status) {
            appData.showClockBetText = !0;
            if (1 == appData.player[0].is_banker) {
                appData.showRobText = !1;
                appData.showNotRobBankerText = !1;
                appData.showShowCardButton = !1;
                appData.showClickShowCard = !1;
                appData.showBankerCoinText = !0;
                appData.showTimesCoin = !1;
            } else {
                appData.showRobText = !1;
                appData.showNotRobBankerText = !1;
                appData.showShowCardButton = !1;
                appData.showClickShowCard = !1;
                appData.showBankerCoinText = !1;
                appData.showTimesCoin = !0;
            }

        }

        if (6 == appData.player[0].account_status) {
            appData.isFinishBankerAnimate = !0
        }
        viewMethods.resetMyAccountStatus();
        viewMethods.updateAllPlayerStatus();
        if (appData.player[0].account_status > 2 && appData.player[0].account_status < 7 && 2 == appData.ruleInfo.banker_mode) {
            viewMethods.seeMyCard();
        }

        if ("" != appData.scoreboard) {
            for (var t = 0; t < globalData.maxCount; t++){
                for (s in appData.scoreboard){
                    if (appData.player[t].account_id == s) {
                        appData.playerBoard.score[t].num = appData.player[t].num,
                            appData.playerBoard.score[t].account_id = appData.player[t].account_id,
                            appData.playerBoard.score[t].nickname = appData.player[t].nickname,
                            appData.playerBoard.score[t].account_score = Math.ceil(appData.scoreboard[s])
                    }
                }
            }

            if(appData.playerBoard.round = (2 == appData.game.status)){
                appData.game.round - 1
            }else{
                appData.game.round
            }

        }
    },
    processStartShow: function (e) {
        var t = 0;
        4 == appData.ruleInfo.banker_mode && (t = 1200),
            setTimeout(function () {
                for (var t = 0; t < globalData.maxCount; t++)
                    for (var a = 0; a < e.data.length; a++)
                        if (appData.player[t].account_id == e.data[a].account_id) {
                            appData.player[t].multiples = e.data[a].multiples,
                                appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                                appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                                appData.player[t].limit_time = e.data[a].limit_time
                        }
                appData.showClockBetText = !1,
                    appData.showClockRobText = !1,
                    appData.showClockShowCard = !0,
                    viewMethods.resetMyAccountStatus(),
                    viewMethods.updateAllPlayerStatus(),
                    appData.game.time = Math.ceil(e.limit_time),
                    viewMethods.timeCountDown()
            }, t)
    },
    processMyCards: function (e) {
        console.log('process my card:');
        console.log(e);
        if (2 != appData.ruleInfo.banker_mode) {
            return;
        }
        if (void 0 === e.data.card_type_array) {
            if (appData.player[0].account_id == e.data.account_id) {
                appData.player[0].card = e.data.cards.concat();
            }
            $(".myCards .cards").removeClass("card-flipped");
            viewMethods.seeMyCard();
        } else {
            if (appData.player[0].account_id == e.data.account_id) {
                appData.player[0].card = e.data.cards.concat();
                appData.player[0].card_type_array = e.data.card_type_array.concat();
            }
        }
    },

    processStartBet: function (e) {
        var t = 0;
        if(3 == appData.ruleInfo.banker_mode){
            t = 1200
        }
        if(5 == appData.ruleInfo.banker_mode && appData.game.round > 1){
            t = 900
        }
        if(1 == appData.game.round && appData.ruleInfo.banker_mode){

        }
        setTimeout(function () {
            for (var t = 0; t < globalData.maxCount; t++){
                for (var a = 0; a < e.data.length; a++){
                    appData.player[t].account_id == e.data[a].account_id &&
                    (appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                            appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                            appData.player[t].limit_time = Math.ceil(e.data[a].limit_time),
                            appData.player[t].multiples = 0,
                            1 == e.data[a].is_banker ?
                                (appData.player[t].is_banker = !0,
                                        appData.player[t].banker_multiples = appData.player[t].grab_multiples,
                                        appData.bankerAccountId = e.data[a].account_id,
                                        appData.bankerPlayer = appData.player[t]
                                ) :
                                appData.player[t].is_banker = !1
                    );
                }

            }

            appData.bankerArray = e.grab_array.concat(),
                appData.showClockBetText = !1,
                appData.showClockRobText = !1,
                appData.showClockShowCard = !1,
                appData.game.time = Math.ceil(e.limit_time),
                appData.bankerAnimateIndex = 0,
                appData.game.time = -1,
                5 == appData.ruleInfo.banker_mode && appData.game.round > 1 ? viewMethods.robBankerWithoutAnimate() :
                    3 == appData.ruleInfo.banker_mode && appData.game.round > 1 ? viewMethods.robBankerWithoutAnimate() :
                        4 != appData.ruleInfo.banker_mode ? (viewMethods.clearBanker(), viewMethods.robBankerAnimate(e)) :
                            (appData.game.time = Math.ceil(e.limit_time), appData.game.time > 0 && viewMethods.timeCountDown())
        }, t)
    },

    processUpdateGamerInfo: function (e) {
        var has_seat = false;    //观战功能
        for (var t = 0; t < globalData.maxCount; t++)
            if (appData.player[t].serial_num == e.data.serial_num) {
                appData.player[t].nickname = e.data.nickname,
                    appData.player[t].headimgurl = e.data.headimgurl,
                    appData.player[t].account_id = e.data.account_id,
                    appData.player[t].account_score = Math.ceil(e.data.account_score),
                    appData.player[t].banker_multiples = Math.ceil(e.data.banker_multiples),
                    appData.player[t].grab_multiples = Math.ceil(e.data.grab_multiples),
                    appData.player[t].multiples = Math.ceil(e.data.multiples),
                1 != e.data.account_status && (appData.player[t].account_status = Math.ceil(e.data.account_status)),
                    appData.player[t].online_status = Math.ceil(e.data.online_status),
                    appData.player[t].ticket_checked = e.data.ticket_checked,
                    appData.player[t].poker_kw = e.data.poker_kw,
                    appData.player[t].head_kw = e.data.head_kw,
                    appData.player[t].sex = e.data.sex,
                    appData.player[t].is_guest = 0;    //观战功能
            } else {
                if (appData.player[t].account_id == e.data.account_id) {
                    socketModule.sendRefreshRoom();
                }
                //观战功能  有位置
                if (appData.player[t].account_id == userData.accountId || 0 == appData.player[t].account_id) {
                    has_seat = true;
                }
            }

        appData.showSitdownButton = appData.isWatching && has_seat;
        //观战功能  加入游戏的玩家从观战者列表中剔除
        for (a = 0; a < appData.guests.length; a++)
            if (appData.guests[a].account_id == e.data.account_id) {
                break;
            }
        appData.guests.splice(a, 1);
    },
    processUpdateAccountStatus: function (e) {
        for (var a = 0; a < globalData.maxCount; a++) {
            if (appData.player[a].account_id == e.data.account_id) {
                //if(1!=e.data.account_status){
                appData.player[a].account_status = e.data.account_status;
                //}
                if (2 == appData.ruleInfo.banker_mode && (5 == e.data.account_status || 4 == e.data.account_status)) {
                    appData.player[a].grab_multiples = e.data.banker_multiples
                }
                if (appData.player[a].account_status >= 8) {
                    appData.player[a].online_status = e.data.online_status;
                    return;
                }
                if (1 == e.data.online_status) {

                } else {
                    appData.player[a].online_status = 0;

                    //观战功能   在座玩家观战中离线
                    for (a = 0; a < appData.guests.length; a++)
                        if (appData.guests[a].account_id == e.data.account_id) {
                            break;
                        }
                    appData.guests.splice(a, 1);

                    if (0 == e.data.account_status) {
                        //观战功能 有位置可加入
                        appData.showSitdownButton = appData.isWatching;
                        for (var k = 0; k < appData.player.length; k++) {
                            if (appData.player[k].account_id == e.data.account_id) {
                                appData.player[k].account_id = 0,
                                    appData.player[k].playing_status = 0,
                                    appData.player[k].nickname = "",
                                    appData.player[k].headimgurl = "",
                                    appData.player[k].account_score = 0
                                break;
                            }
                        }
                    }
                }

                if (0 != a) {
                    if (4 == appData.player[a].account_status) {
                        setTimeout(function () {
                            mp3AudioPlay("audioNoBanker")
                        }, 100);
                    } else if (5 == appData.player[a].account_status) {
                        setTimeout(function () {
                            mp3AudioPlay("audioRobBanker")
                        }, 100);
                    }
                }
                break
            }
        }
        if (globalData.maxCount == a) { //观战功能  观战者离线
            for (a = 0; a < appData.guests.length; a++)
                if (appData.guests[a].account_id == e.data.account_id) {
                    break;
                }
            appData.guests.splice(a, 1);
        } else {
            if (appData.isFinishBankerAnimate && appData.isFinishWinAnimate) {
                viewMethods.resetMyAccountStatus(),
                    viewMethods.updateAllPlayerStatus()
            } else {
                setTimeout(function () {
                    viewMethods.resetMyAccountStatus(),
                        viewMethods.updateAllPlayerStatus()
                }, 3e3)
            }
        }
    },
    processUpdateAccountShow: function (e) {
        for (var t = 0; t < appData.player.length; t++)
            if (appData.player[t].account_id == e.data.account_id) {
                appData.player[t].account_status = 8;
                if (0 == appData.player[t].is_audiobull && appData.player[t].account_status >= 8 && 0 == t) {
                    var a = "";
                    a = parseInt(appData.player[t].card_type) > 4 ?
                        "special" + appData.player[t].card_type :
                        "sangong" + appData.player[t].combo_point,
                        setTimeout(function () {
                            mp3AudioPlay(a)
                        }, 100),
                        appData.player[t].is_audiobull = !0
                }
                break
            }
    },
    processUpdateAccountMultiples: function (e) {
        for (var t = 0; t < appData.player.length; t++)
            if (appData.player[t].account_id == e.data.account_id) {
                appData.player[t].multiples = e.data.multiples;
                if (0 == t)
                    return;
                if (appData.player[t].multiples >= 1) {
                    var a = appData.player[t].multiples;
                    setTimeout(function () {
                        mp3AudioPlay("audioTimes" + a)
                    }, 100)
                }
                break;
            }
        viewMethods.resetMyAccountStatus(),
            viewMethods.updateAllPlayerStatus()
    },
    processStartLimitTime: function (e) {
        e.data.limit_time > 1 && (appData.game.time = Math.ceil(e.data.limit_time), viewMethods.timeCountDown())
    },
    processCancelStartLimitTime: function (e) {
        appData.game.time = -1
    },
    processGameStart: function (e) {
        $(".memberCoin").stop(!0),
            appData.cardSelect = [{isSelect: "unselected"}, {isSelect: "unselected"}, {isSelect: "unselected"}, {isSelect: "unselected"}],
            appData.isCardSelect = !1,
            appData.isFinishWinAnimate = !0,
            appData.isFinishBankerAnimate = !0,
            appData.game.cardDeal = 0,
            appData.game.status = 2,
            appData.game.time = -1,
            appData.game.round = appData.game.round + 1,
            appData.game.round = Math.ceil(e.game_num),
            appData.game.show_score = !1,
            appData.game.littleScore = !1,
            appData.player[0].is_showCard = !1,
            appData.showClockRobText = !1,
            appData.showClockBetText = !1,
            appData.showClockShowCard = !1,
            appData.clickCard4 = !1,
            appData.showClickShowCard = !1,
            appData.control.isShowRob = !0,
            appData.breakData = null;
        for (var t = 0; t < globalData.maxCount; t++) {
            appData.player[t].is_operation = !1,
                appData.player[t].is_showCard = !1,
                appData.player[t].is_showbull = !1,
                appData.player[t].eliminate_card = "",
                appData.player[t].bullImg = "",
                appData.player[t].bullImg1 = "",
                appData.player[t].is_banker = !1,
                appData.player[t].bullImg = "",
            0 == appData.player[t].online_status && (appData.player[t].account_status = 1);
            for (var a = 0; a < e.data.length; a++)
                if (appData.player[t].account_id == e.data[a].account_id) {
                    appData.player[t].ticket_checked = 1,
                        appData.player[t].account_status = Math.ceil(e.data[a].account_status),
                        appData.player[t].playing_status = Math.ceil(e.data[a].playing_status),
                        appData.player[t].online_status = Math.ceil(e.data[a].online_status),
                        appData.player[t].account_score = appData.player[t].account_score,
                        appData.player[t].limit_time = Math.ceil(e.data[a].limit_time);
                }
        }
        appData.game.time = Math.ceil(e.limit_time),
            viewMethods.timeCountDown(),
            viewMethods.reDeal()
    },
    processBroadcastVoice: function (e) {
        for (var t = 0; t < globalData.maxCount; t++)
            appData.player[t].account_id == e.data.account_id && 0 != t && (m4aAudioPlay("message" + e.data.voice_num), viewMethods.messageSay(t, e.data.voice_num))
    },
    //自动续局
    processAutoCreateRoom: function (obj) {
        var newRoom = obj.data;
        newRoom.oldRoomNumber = globalData.roomNumber;
        localStorage.setItem('newRoom', JSON.stringify(obj.data))
    },
    processWin: function (e) {
        console.log(e);
        appData.game.round = Math.ceil(e.data.game_num),
            appData.game.total_num = Math.ceil(e.data.total_num),
            appData.playerBoard.round = Math.ceil(e.data.game_num),
            appData.game.show_score = !1,
            appData.showClockShowCard = !1,
            appData.showShowCardButton = !1,
            appData.showClickShowCard = !1,
            appData.showClockBetText = !1,
            appData.showClockRobText = !1,
            viewMethods.showMemberScore(!1);
        for (var t = 0; t < appData.player.length; t++) {
            appData.player[t].account_status >= 7 && (appData.player[t].account_status = 9);

            for (var a = 0; a < e.data.player_cards.length; a++)
                if (appData.player[t].account_id == e.data.player_cards[a].account_id) {
                    appData.player[t].card = e.data.player_cards[a].cards.concat(),
                        appData.player[t].card_open = e.data.player_cards[a].cards.concat(),
                        appData.player[t].card_type = e.data.player_cards[a].card_type,
                        appData.player[t].card_type_flower = e.data.player_cards[a].card_type_flower,
                        appData.player[t].combo_point = e.data.player_cards[a].combo_point,
                        appData.player[t].eliminate_card = e.data.player_cards[a].eliminate_card
                }
            for (var a = 0; a < e.data.loser_array.length; a++)
                if (appData.player[t].account_id == e.data.loser_array[a].account_id) {
                    appData.player[t].single_score = parseInt(e.data.loser_array[a].score),
                        appData.player[t].sg_score = parseInt(e.data.loser_array[a].sg_score),
                        appData.player[t].f_score = parseInt(e.data.loser_array[a].f_score);
                    break
                }
            for (var n = 0; n < e.data.winner_array.length; n++)
                if (appData.player[t].account_id == e.data.winner_array[n].account_id) {
                    appData.player[t].single_score = parseInt(e.data.winner_array[n].score),
                        appData.player[t].sg_score = parseInt(e.data.winner_array[n].sg_score),
                        appData.player[t].f_score = parseInt(e.data.winner_array[n].f_score);
                    break
                }
        }
        appData.game.time = -1,
            viewMethods.updateAllPlayerStatus(),
            appData.game.littleScore = !0,
            setTimeout(function () {
                viewMethods.resetMyAccountStatus()
            }, 200);
        if (appData.player[0].account_status >= 8 && 0 == appData.player[0].is_audiobull) {
            var o = appData.player[0].card_type, i = appData.player[0].combo_point;
            setTimeout(function () {
                mp3AudioPlay(1 == o ? "audioBull0" : 4 == o ? "audioBull10" : 5 == o ? "audioBull11" : 6 == o ? "audioBull12" : 7 == o ? "audioBull13" : "audioBull" + i)
            }, 200),
                appData.player[0].is_audiobull = !0
        }
        setTimeout(function () {
            viewMethods.winAnimate(e)
        }, 2000)
    },
    processBalanceScoreboard: function (e) {
        var t = new Date(1e3 * parseInt(e.time)), a = t.getFullYear() + "-", n = t.getMonth() + 1 + "-",
            o = t.getDate() + " ", i = t.getHours(), r = t.getMinutes(), c = ":";
        r < 10 && (c += 0);
        var l = a + n + o + i + c + r;
        appData.playerBoard.round = e.game_num, appData.playerBoard.record = l, appData.playerBoard.score = [];
        var p = e.scoreboard;
        for (s in p) {
            var u = 0, d = p[s].name;
            userData.accountId == p[s].account_id && (u = 1),
                appData.playerBoard.score.push({
                    "account_id": p[s].account_id,
                    "nickname": name,
                    "account_score": Math.ceil(p[s].score),
                    "num": u,
                    "avatar": p[s].avatar
                });
        }
    },
    processLastScoreboard: function (e) {
        if (void 0 != e) {
            console.log(e);
            try {
                var t = new Date(1e3 * parseInt(e.time)), a = t.getFullYear() + "-", n = t.getMonth() + 1 + "-",
                    o = t.getDate() + " ", i = t.getHours(), r = t.getMinutes(), c = ":";
                r < 10 && (c += 0);
                var l = a + n + o + i + c + r;
                appData.playerBoard.round = e.game_num,
                    appData.playerBoard.record = l,
                    appData.playerBoard.score = [],
                void 0 != e.total_num && null != e.total_num && "" != e.total_num && (appData.game.total_num = e.total_num);
                var p = e.scoreboard;
                for (s in p) {
                    var num = 0;
                    userData.accountId == p[s].account_id && (num = 1),
                        appData.playerBoard.score.push({
                            "account_id": p[s].account_id,
                            "nickname": p[s].name,
                            "account_score": Math.ceil(p[s].score),
                            "num": num,
                            "avatar": p[s].avatar
                        });
                }
                chooseBigWinner(),
                    $(".ranking .rankBack").css("opacity", "1"),
                    $(".roundEndShow").show(),
                    $(".ranking").show(),
                    canvas(),
                    $("#endCreateRoomBtn").show()
            } catch (e) {
                console.log(e)
            }
        }
    },

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
        appData.isShowAlert = !1;
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
                appData.showSitdownButton = appData.isWatching;
                appData.showWatchButton = !appData.isWatching;
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
    }
};
var viewMethods = {
    showHomeAlert: function () {
        appData.isShowHomeAlert = true;
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
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
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        appData.alertType = e, appData.alertText = t, appData.isShowAlert = !0, setTimeout(function () {
            var t = $(".alert .alertText").height(), a = t;
            t < .15 * height && (t = .15 * height), t > .8 * height && (t = .8 * height);
            var n = t + .056 * height * 2 + .022 * height + .056 * height;
            8 == e && (n = n - .022 * height - .056 * height);
            var o = t + .034 * height * 2, i = .022 * height + (o - a) / 2;
            $(".alert .mainPart").css("height", n + "px"), $(".alert .mainPart").css("margin-top", "-" + n / 2 + "px"), $(".alert .mainPart .backImg .blackImg").css("height", o + "px"), $(".alert .mainPart .alertText").css("top", i + "px")
        }, 0)
    },
    clickCloseAlert: function () {
        if (22 == appData.alertType) {
            appData.isShowAlert = !1;
            httpModule.getInfo();
        } else {
            appData.isShowAlert = !1;
        }
    },
    clickSitDown: function (e) {
        appData.isShowGameAlert = !1;
        appData.isShowAlert = !1
        if (appData.isWatching == 1) {
            socketModule.sendSitDown(e);
        } else {
            socketModule.sendSwapSeat(e);
        }
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    // 换座
    clickSwapSeat: function (e) {
        socketModule.sendSwapSeat(e);
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
    },
    clickReady: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        if(appData.game.status>1){
            return
        }
        socketModule.sendReadyStart(), appData.player[0].is_operation = !0
    },
    reDeal: function () {
        if (appData.isDealing) {
            return;
        }
        appData.isDealing = !0,
            m4aAudioPlay("audio1"),
            appData.game.cardDeal = 1,
            setTimeout(function () {
                appData.game.cardDeal = 2,
                    setTimeout(function () {
                        appData.game.cardDeal = 3,
                            setTimeout(function () {
                                appData.game.cardDeal = 4,
                                    setTimeout(function () {
                                        viewMethods.resetMyAccountStatus(),
                                            appData.player[0].is_showCard = !0,
                                            appData.showClockRobText = !0,
                                            appData.isDealing = !1
                                    }, 150)
                            }, 30)
                    }, 30)
            }, 30)
    },
    resetMyAccountStatus: function () {
        if (6 == appData.player[0].account_status && !appData.isFinishBankerAnimate) {
            return;
        }
        viewMethods.resetShowButton();

        if (4 == appData.player[0].account_status) {
            appData.showNotRobText = !0;
        } else if (5 == appData.player[0].account_status) {
            appData.showRobText = !0;
        } else if (6 == appData.player[0].account_status) {
            if (1 == appData.player[0].is_banker) {
                appData.showBankerCoinText = !0;
            } else {
                if (appData.isFinishBankerAnimate || 4 == appData.ruleInfo.banker_mode) {
                    appData.showTimesCoin = !0;
                }
            }
        } else if (7 == appData.player[0].account_status) {
            appData.player[0].is_showCard = !0;
            if (1 == appData.clickCard4) {
                appData.showShowCardButton = !0;
            } else {
                appData.showClickShowCard = !0;
            }
        } else if (8 == appData.player[0].account_status) {
            appData.player[0].is_showCard = !0;
        }

        if ("" != appData.player[0].eliminate_card) {
            appData.isCardSelect = !0;
            for (var e = 0; e < appData.player[0].card.length; e++)
                if (appData.player[0].card[e] == appData.player[0].eliminate_card) {
                    appData.cardSelect[e].isSelect = "selected";
                }
        }
        if (appData.isCardSelect && appData.player[0].account_id == appData.userData.accountId)
            for (var e = 0; e < appData.cardSelect.length; e++)
                if ("selected" == appData.cardSelect[e].isSelect) {
                    var t = 20,
                        a = parseInt(appData.player[0].card_type_array[e].card_type);
                    t =
                        1 == a ? 0 :
                            4 == a ? 0 :
                                5 == a ? 11 :
                                    6 == a ? 12 :
                                        7 == a ? 13 :
                                            8 == a ? 14 :
                                                9 == a ? 15 :
                                                    10 == a ? 16 :
                                                        11 == a ? 17 :
                                                            appData.player[0].card_type_array[e].combo_point,
                        appData.player[0].bullImg = globalData.fileUrl + "files/images/jia31/point" + t + ".png",
                        appData.player[0].bullImg1 = globalData.fileUrl + "files/images/jia31/type" + parseInt(appData.player[0].card_type_array[e].card_type_flower) + ".png"
                }
    },
    updateAllPlayerStatus: function () {
        for (var e = 0; e < appData.player.length; e++)
            if (appData.isCardSelect, 4 == appData.player[e].account_status)
                appData.player[e].robImg = globalData.fileUrl + "files/images/bull/text_notrob.png";
            else if (5 == appData.player[e].account_status)
                appData.player[e].robImg = globalData.fileUrl + "files/images/bull/text_rob.png";
            else if (6 == appData.player[e].account_status) appData.player[e].multiples;
            else if (7 == appData.player[e].account_status)
                0 == e && viewMethods.seeMyCard();
            else if (8 == appData.player[e].account_status)
                0 == e && viewMethods.myCardOver();
            else if (9 == appData.player[e].account_status)
                if (0 == e) {
                    $(".myCards .card0").addClass("card-flipped"),
                        $(".myCards .card1").addClass("card-flipped"),
                        $(".myCards .card2").addClass("card-flipped"),
                        $(".myCards .card3").addClass("card-flipped");
                    for (var t = 0; t < appData.cardSelect.length; t++) {
                        appData.cardSelect[t].isSelect = "unselected";
                        if (appData.player[0].card[t] == appData.player[0].eliminate_card) {
                            appData.cardSelect[t].isSelect = "selected";
                            appData.isCardSelect = !0;
                        }
                    }
                    viewMethods.showCardType(1);
                    if (0 == appData.player[e].is_audiobull && appData.player[0].account_id == appData.userData.accountId) {
                        var a = "";
                        a = parseInt(appData.player[e].card_type) > 4 ?
                            "special" + appData.player[e].card_type :
                            "sangong" + appData.player[e].combo_point,
                            setTimeout(function () {
                                mp3AudioPlay(a)
                            }, 100),
                            appData.player[e].is_audiobull = !0
                    }
                } else {
                    if (globalData.maxCount == 9) {
                        viewMethods.cardOver9(appData.player[e].num)
                    } else if (globalData.maxCount == 13) {
                        viewMethods.cardOver13(appData.player[e].num)
                    }
                }
    },
    resetShowButton: function () {
        appData.showTimesCoin = !1,
            appData.showShowCardButton = !1,
            appData.showClickShowCard = !1,
            appData.showNotRobText = !1,
            appData.showRobText = !1,
            appData.showBankerCoinText = !1
    },
    seeMyCard: function () {
        if (appData.player[0].account_id != userData.accountId) { //观战功能
            return;
        }
        setTimeout(function () {
            $(".myCards .card0").addClass("card-flipped"),
                $(".myCards .card1").addClass("card-flipped"),
                $(".myCards .card2").addClass("card-flipped"),
                setTimeout(function () {
                    1 != appData.clickCard4 && 7 == appData.player[0].account_status && (appData.showClickShowCard = !0)
                }, 500)
        }, 500);

    },
    clickMyCard: function (e) {
        if (appData.player[0].account_id != userData.accountId || 7 != appData.player[0].account_status) {
            return;
        }
        $(".myCards .card3").hasClass("card-flipped") && (appData.clickCard4 = !0);
        if (appData.clickCard4 || 3 != e) {
            if (appData.clickCard4) {
                appData.player[0].card_type = appData.player[0].card_type_array[e].card_type,
                    appData.player[0].card_type_flower = appData.player[0].card_type_array[e].card_type_flower,
                    appData.player[0].combo_point = appData.player[0].card_type_array[e].combo_point;
                for (var t = 0; t < appData.cardSelect.length; t++) {
                    appData.cardSelect[t].isSelect = "unselected";
                    if (t == e) {
                        appData.cardSelect[t].isSelect = "selected";
                        appData.isCardSelect = !0;
                    }
                }

                viewMethods.resetMyAccountStatus()
            }
        } else {
            $(".myCards .card3").addClass("card-flipped");
            appData.clickCard4 = !0;  //已经翻开第四张牌
            setTimeout(function () {
                appData.showShowCardButton = !0,
                    appData.showClickShowCard = !1
            }, 100)
        }
    },
    resetCardOver: function (num) {
        if (globalData.maxCount == 9) {
            1 == num ?
                ($(".myCards .card00").css("left", "29%"), $(".myCards .card01").css("left", "44%"), $(".myCards .card02").css("left", "59%"), $(".myCards .card03").css("left", "74%")) :
                2 == num ?
                    ($(".cardOver .card211").css("right", "10.5vh"), $(".cardOver .card221").css("right", "12.5vh"), $(".cardOver .card231").css("right", "14.5vh"), $(".cardOver .card241").css("right", "16.5vh")) :
                    3 == num ?
                        ($(".cardOver .card311").css("right", "10.5vh"), $(".cardOver .card321").css("right", "12.5vh"), $(".cardOver .card331").css("right", "14.5vh"), $(".cardOver .card341").css("right", "16.5vh")) :
                        4 == num ?
                            ($(".cardOver .card411").css("right", "10.5vh"), $(".cardOver .card421").css("right", "12.5vh"), $(".cardOver .card431").css("right", "14.5vh"), $(".cardOver .card441").css("right", "16.5vh")) :
                            5 == num ?
                                ($(".cardOver .card511").css("right", "14.63vh"), $(".cardOver .card521").css("right", "16.63vh"), $(".cardOver .card531").css("right", "18.63vh"), $(".cardOver .card541").css("right", "20.63vh")) :
                                6 == num ?
                                    ($(".cardOver .card611").css("left", "14.63vh"), $(".cardOver .card621").css("left", "16.63vh"), $(".cardOver .card631").css("left", "18.63vh"), $(".cardOver .card641").css("left", "20.63vh")) :
                                    7 == num ?
                                        ($(".cardOver .card711").css("left", "10.5vh"), $(".cardOver .card721").css("left", "12.5vh"), $(".cardOver .card731").css("left", "14.5vh"), $(".cardOver .card741").css("left", "16.5vh")) :
                                        8 == num ?
                                            ($(".cardOver .card811").css("left", "10.5vh"), $(".cardOver .card821").css("left", "12.5vh"), $(".cardOver .card831").css("left", "14.5vh"), $(".cardOver .card841").css("left", "16.5vh")) :
                                            9 == num &&
                                            ($(".cardOver .card911").css("left", "10.5vh"), $(".cardOver .card921").css("left", "12.5vh"), $(".cardOver .card931").css("left", "14.5vh"), $(".cardOver .card941").css("left", "16.5vh"))
        } else if (globalData.maxCount == 13) {
            if (num == 1) {
                $(".myCards .card00").css("left", "29%");
                $(".myCards .card01").css("left", "44%");
                $(".myCards .card02").css("left", "59%");
                $(".myCards .card03").css("left", "74%");
            } else if (num > 1 && num <= 7) {
                $(".cardOver .card" + num + "11").css("right", "10.5vh");
                $(".cardOver .card" + num + "21").css("right", "12.5vh");
                $(".cardOver .card" + num + "31").css("right", "14.5vh");
                $(".cardOver .card" + num + "41").css("right", "16.5vh");
            } else if (num >= 8) {
                $(".cardOver .card" + num + "11").css("left", "10.5vh");
                $(".cardOver .card" + num + "21").css("left", "12.5vh");
                $(".cardOver .card" + num + "31").css("left", "14.5vh");
                $(".cardOver .card" + num + "41").css("left", "16.5vh");
            }
        }
    },
    myCardOver: function () {
        setTimeout(function () {
            $(".myCards .card0").addClass("card-flipped"),
                $(".myCards .card1").addClass("card-flipped"),
                $(".myCards .card2").addClass("card-flipped"),
                $(".myCards .card3").addClass("card-flipped")
        }, 250)
    },
    cardOver9: function (e) {
        if (e <= 1) {
            return;
        }
        if (1 != appData.player[e - 1].is_showbull) {
            appData.player[e - 1].is_showbull = !0,
                viewMethods.resetCardOver(e),
                setTimeout(function () {
                    if (2 == e || 3 == e || 4 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({right: "10.5vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e);
                            $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({right: "10.5vh"}, 150);
                            $(".cardOver .card" + e + "21").animate({right: "13.5vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({right: "16.5vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({right: "19.5vh"}, 250)
                        }, 150)
                    } else if (7 == e || 8 == e || 9 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({left: "10.5vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e), $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({left: "19.5vh"}, 250);
                            $(".cardOver .card" + e + "21").animate({left: "16.5vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({left: "13.5vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({left: "10.5vh"}, 250)
                        }, 150)
                    } else if (5 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({right: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({right: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({right: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({right: "14.63vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e), $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({right: "14.63vh"}, 250);
                            $(".cardOver .card" + e + "21").animate({right: "17.63vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({right: "20.63vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({right: "23.63vh"}, 250)
                        }, 150)
                    } else if (6 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({left: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({left: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({left: "14.63vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({left: "14.63vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e), $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({left: "23.63vh"}, 250);
                            $(".cardOver .card" + e + "21").animate({left: "20.63vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({left: "17.63vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({left: "14.63vh"}, 250)
                        }, 150)
                    }
                }, 1)
        }
    },
    cardOver13: function (e) {
        if (e <= 1) {
            return;
        }
        if (1 != appData.player[e - 1].is_showbull) {
            appData.player[e - 1].is_showbull = !0,
                viewMethods.resetCardOver(e),
                setTimeout(function () {
                    if (2 == e || 3 == e || 4 == e || 5 == e || 6 == e || 7 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({right: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({right: "10.5vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e);
                            $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({right: "10.5vh"}, 150);
                            $(".cardOver .card" + e + "21").animate({right: "13.5vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({right: "16.5vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({right: "19.5vh"}, 250)
                        }, 150)
                    } else if (8 == e || 9 == e || 10 == e || 11 == e || 12 == e || 13 == e) {
                        $(".cardOver .cardtf" + e + "11").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "21").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "31").animate({left: "10.5vh"}, 150);
                        $(".cardOver .cardtf" + e + "41").animate({left: "10.5vh"}, 150);
                        setTimeout(function () {
                            viewMethods.showCardType(e), $(".cardOver .cardtf" + e).addClass("card-flipped");
                            $(".cardOver .card" + e + "11").animate({left: "19.5vh"}, 250);
                            $(".cardOver .card" + e + "21").animate({left: "16.5vh"}, 250);
                            $(".cardOver .card" + e + "31").animate({left: "13.5vh"}, 250);
                            $(".cardOver .card" + e + "41").animate({left: "10.5vh"}, 250)
                        }, 150)
                    }
                }, 1)
        }
    },
    showCardType: function (e) {
        var t = 20, a = parseInt(appData.player[e - 1].card_type);
        t =
            1 == a ? 0 :
                4 == a ? 0 :
                    5 == a ? 11 :
                        6 == a ? 12 :
                            7 == a ? 13 :
                                8 == a ? 14 :
                                    9 == a ? 15 :
                                        10 == a ? 16 :
                                            11 == a ? 17 :
                                                appData.player[e - 1].combo_point,
            appData.player[e - 1].bullImg = globalData.fileUrl + "files/images/jia31/point" + t + ".png",
            appData.player[e - 1].bullImg1 = globalData.fileUrl + "files/images/jia31/type" + parseInt(appData.player[e - 1].card_type_flower) + ".png"
    },
    gameOverNew: function (e, t) {
        for (var a = 0; a < appData.playerBoard.score.length; a++)
            appData.playerBoard.score[a].num = 0,
                appData.playerBoard.score[a].account_id = 0,
                appData.playerBoard.score[a].nickname = "",
                appData.playerBoard.score[a].account_score = 0,
                appData.playerBoard.score[a].isBigWinner = 0;
        for (var a = 0; a < globalData.maxCount; a++)
            for (s in e)
                if (appData.player[a].account_id == s) {
                    appData.player[a].account_score = Math.ceil(e[s]),
                        appData.playerBoard.score[a].num = appData.player[a].num,
                        appData.playerBoard.score[a].account_id = appData.player[a].account_id,
                        appData.playerBoard.score[a].nickname = appData.player[a].nickname,
                        appData.playerBoard.score[a].account_score = appData.player[a].account_score
                }
        var n = new Date, o = "";
        o += n.getFullYear() + "-", o += n.getMonth() + 1 + "-", o += n.getDate() + "  ", o += n.getHours() + ":",
            n.getMinutes() >= 10 ? o += n.getMinutes() : o += "0" + n.getMinutes(),
            appData.playerBoard.record = o,

        void 0 != t && "-1" != t && (socketModule.processBalanceScoreboard(t));
        for (var a = 0; a < globalData.maxCount; a++)
            appData.player[a].playing_status = 0,
                appData.player[a].is_win = !1,
                appData.player[a].is_operation = !1,
                appData.player[a].win_type = 0,
                appData.player[a].win_show = !1,
                appData.player[a].card = new Array,
                appData.player[a].card_open = new Array,
                appData.player[a].card_type = 0,
                appData.player[a].is_showCard = !1,
                appData.player[a].is_readyPK = !1,
                appData.player[a].is_pk = !1,
                appData.player[a].multiples = 0,
                appData.player[a].banker_multiples = 0,
                appData.player[a].grab_multiples = 0,
                appData.player[a].is_bull = !1,
                appData.player[a].is_showbull = !1,
                appData.player[a].is_audiobull = !1,
                appData.player[a].card_type_array = new Array,
                appData.player[a].eliminate_card = "";
        appData.game.cardDeal = 0,
            appData.game.status = 1,
            appData.player[0].is_showCard = !1,
            appData.showClockRobText = !1,
            appData.showClockBetText = !1,
            appData.showClockShowCard = !1,
            appData.cardSelect = [{isSelect: "unselected"}, {isSelect: "unselected"}, {isSelect: "unselected"}, {isSelect: "unselected"}],
            appData.isCardSelect = !1
    },
    showMessage: function () {
        if (appData.player[0].account_id != userData.accountId) return; //观战功能
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        appData.isShowNewMessage = !0;
        enable_scroll();
    },
    hideMessage: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        appData.isShowNewMessage = !1;
        enable_scroll();
    },
    messageOn: function (e) {
        socketModule.sendBroadcastVoice(e),
            m4aAudioPlay("message" + e),
            viewMethods.messageSay(0, e),
            viewMethods.hideMessage()
    },
    messageSay: function (e, t) {
        appData.player[e].messageOn = !0,
            appData.player[e].messageText = appData.message[t].text, setTimeout(function () {
            appData.player[e].messageOn = !1
        }, 2500)
    },
    closeEnd: function () {
    },
    roundEnd: function () {
        // window.location.href = request_url + 'home/j31?i=' + globalData.roomNumber + '_&v=' + (new Date().getTime());
        window.location.href = data.html_name+"?key="+data.data_key

        chooseBigWinner(), $(".ranking .rankBack").css("opacity", "1"), $(".roundEndShow").show(), setTimeout(function () {
            $(".ranking").show(), canvas()
        }, 2500)
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
    clickRobBanker: function (e) {
        viewMethods.showRobBankerText(), socketModule.sendGrabBanker(e), 2 == appData.ruleInfo.banker_mode && (appData.player[0].banker_multiples = e,
            appData.control.isShowRob = !1), setTimeout(function () {
            mp3AudioPlay("audioRobBanker")
        }, 10)
    },
    showRobBankerText: function () {
        appData.showTimesCoin = !1, appData.showShowCardButton = !1, appData.showClickShowCard = !1, appData.showNotRobText = !1, appData.showRobText = !0, appData.showBankerCoinText = !1
    },
    showNotRobBankerTextFnc: function () {
        appData.showTimesCoin = !1, appData.showShowCardButton = !1, appData.showClickShowCard = !1, appData.showNotRobText = !0, appData.showRobText = !1, appData.showBankerCoinText = !1
    },
    clickNotRobBanker: function () {
        viewMethods.showNotRobBankerTextFnc(), socketModule.sendNotGrabBanker(), setTimeout(function () {
            mp3AudioPlay("audioNoBanker")
        }, 10)
    },
    clickSelectTimesCoin: function (e) {
        appData.player[0].multiples = e, appData.showTimesCoin = !1, socketModule.sendPlayerMultiples(e), setTimeout(function () {
            mp3AudioPlay("audioTimes" + e)
        }, 50)
    },
    clickShowCard: function () {
        appData.showShowCardButton = !1, appData.showClickShowCard = !1, socketModule.sendShowCard()
    },
    clearBanker: function () {
        for (var e = 0; e < appData.player.length; e++)
            appData.player[e].is_banker = !1;
        appData.isFinishBankerAnimate = !1;
        var t = 2 * appData.bankerArray.length;
        if (appData.bankerArray.length < 6) {
            appData.bankerAnimateDuration = parseInt(800 / t);
        } else {
            appData.bankerAnimateDuration = parseInt(1800 / t);
        }
    },
    robBankerWithoutAnimate: function () {
        for (var e = 0; e < appData.player.length; e++)
            appData.player[e].account_id == appData.bankerAccountId ?
                (appData.player[e].is_banker = !0, bankerNum = appData.player[e].num) :
                appData.player[e].is_banker = !1,
                $("#bankerAnimate" + appData.player[e].num).hide(),
                $("#bankerAnimate1" + appData.player[e].num).hide();
        setTimeout(function () {
            appData.showClockRobText = !1,
                appData.showClockBetText = !0,
                appData.isFinishBankerAnimate = !0,
                viewMethods.resetMyAccountStatus(),
                viewMethods.updateAllPlayerStatus()
        }, 10),
            appData.game.time = 11,
        appData.game.time > 0 && viewMethods.timeCountDown()
    },
    robBankerAnimate: function (e) {
        for (var t = 0; t < appData.bankerArray.length; t++) {
            var a = "#banker" + appData.bankerArray[t];
            $(a).hide()
        }
        var n = 2 * appData.bankerArray.length;
        if (appData.bankerAnimateCount >= n || appData.bankerAnimateIndex < 0 || appData.bankerArray.length < 2) {
            appData.bankerAnimateCount = 0, appData.bankerAnimateIndex = -1;
            var a = "#banker" + appData.bankerAccountId;
            $(a).show();
            for (var o = "", t = 0; t < appData.player.length; t++)
                appData.player[t].account_id == appData.bankerAccountId ?
                    (appData.player[t].is_banker = !0, o = appData.player[t].num) :
                    appData.player[t].is_banker = !1,
                    $("#bankerAnimate" + appData.player[t].num).hide(),
                    $("#bankerAnimate1" + appData.player[t].num).hide();
            return $(a).hide(), $("#bankerAnimate" + o).css({
                top: "-0.1vh",
                left: "-0.1vh",
                width: "7.46vh",
                height: "7.46vh"
            }),
                $("#bankerAnimate1" + o).css({top: "-1vh", left: "-1vh", width: "9.26vh", height: "9.26vh"}),
                $("#bankerAnimate" + o).show(), $("#bankerAnimate1" + o).show(),
                $("#bankerAnimate1" + o).animate({
                    top: "-1vh",
                    left: "-1vh",
                    width: "9.26vh",
                    height: "9.26vh"
                }, 100, function () {
                    $("#bankerAnimate1" + o).animate({
                        top: "-0.1vh",
                        left: "-0.1vh",
                        width: "7.46vh",
                        height: "7.46vh"
                    }, 100, function () {
                        $("#bankerAnimate1" + o).hide()
                    })
                }),
                void $("#bankerAnimate" + o).animate({
                    top: "-1.5vh",
                    left: "-1.5vh",
                    width: "10.26vh",
                    height: "10.26vh"
                }, 100, function () {
                    $("#bankerAnimate" + o).animate({
                        top: "-0.1vh",
                        left: "-0.1vh",
                        width: "7.46vh",
                        height: "7.46vh"
                    }, 100, function () {
                        $("#bankerAnimate" + o).hide(),
                            setTimeout(function () {
                                appData.showClockRobText = !1,
                                    appData.showClockBetText = !0,
                                    appData.isFinishBankerAnimate = !0;
                                viewMethods.resetMyAccountStatus();
                                viewMethods.updateAllPlayerStatus();
                            }, 10);
                        appData.game.time = 10; //11
                        appData.game.time > 0 && viewMethods.timeCountDown()
                    })
                })
        }
        var i = appData.bankerArray[appData.bankerAnimateIndex],
            a = "#banker" + i;
        $(a).show(),
            appData.lastBankerImgId = a,
            appData.bankerAnimateCount++,
            appData.bankerAnimateIndex++,
        appData.bankerAnimateIndex >= appData.bankerArray.length && (appData.bankerAnimateIndex = 0),
            setTimeout(function () {
                viewMethods.robBankerAnimate(e)
            }, appData.bankerAnimateDuration)
    },
    showMemberScore: function (e) {
        e ? ($(".memberScoreText1").show(), $(".memberScoreText2").show(), $(".memberScoreText3").show(), $(".memberScoreText4").show(), $(".memberScoreText5").show(), $(".memberScoreText6").show(), $(".memberScoreText7").show(), $(".memberScoreText8").show(), $(".memberScoreText9").show()) : ($(".memberScoreText1").hide(), $(".memberScoreText2").hide(), $(".memberScoreText3").hide(), $(".memberScoreText4").hide(), $(".memberScoreText5").hide(), $(".memberScoreText6").hide(), $(".memberScoreText7").hide(), $(".memberScoreText8").hide(), $(".memberScoreText9").hide())
    },
    winAnimate: function (obj) {
        appData.isFinishWinAnimate = false;
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
    finishWinAnimate: function (e) {
        $("#playerCoins").hide(),
            appData.game.show_score = !0,
            appData.game.littleScore = !1,
            $(".myCards .cards").removeClass("card-flipped"),
            $(".memberScoreText").fadeIn(200, function () {
                viewMethods.gameOverNew(e.data.score_board, e.data.balance_scoreboard);

                setTimeout(function () {
                    $(".memberScoreText").fadeOut("slow");

                    for (var e = 0; e < globalData.maxCount; e++) {
                        if (appData.player[e].account_status >= 6) {
                            appData.player[e].is_banker = !1,
                            appData.player[e].account_status > 2 && (appData.player[e].account_status = 1)
                        }
                        appData.game.status = 1
                    }
                }, 500);
                appData.isFinishWinAnimate = !0;
                e.data.total_num == e.data.game_num && setTimeout(function () {
                    viewMethods.roundEnd(),
                        newNum = e.data.room_number
                }, 500)
            })
        appData.showWatchButton = appData.isWatching != 1;
        appData.showSitdownButton = appData.isWatching;
        // 自动准备
        setTimeout(function () {
            console.log('自动准备')
            if (appData.isAutoReady == 1 && appData.isWatching != 1) {
                viewMethods.clickReady()
            }
        }, 2500)
    },
    resetCoinsPosition: function () {
        for (var e = 1; e < globalData.maxCount; e++)
            for (var t = 0; t < 8; t++)
                $(".memberCoin" + e + t).css(memCoin[e]);
    },
    showCoins: function (e, t) {
        if (0 != appData.player[0].account_status && 1 != appData.player[0].account_status && 2 != appData.player[0].account_status || 4 != appData.ruleInfo.banker_mode || (t = !1), t) for (var a = 0; a < 8; a++) $(".memberCoin" + e + a).show(); else for (var a = 0; a < 8; a++) $(".memberCoin" + e + a).hide()
    },
};

var width = window.innerWidth, height = window.innerHeight, numD = 0, isTimeLimitShow = !1, isBankerWin = !1,
    timesOffset = (.9 * width - .088 * height * 4 - .02 * width * 3) / 2;
var coinLeft1 = .045 * height + "px",
    coinLeft2 = width - .06 * height + "px",
    coinLeft3 = width - .06 * height + "px",
    coinLeft4 = width - .06 * height + "px",
    coinLeft5 = width - .18 * height + "px",
    coinLeft6 = .15 * height + "px",
    coinLeft7 = .045 * height + "px",
    coinLeft8 = .045 * height + "px",
    coinLeft9 = .045 * height + "px";

if (globalData.maxCount == 9) {
    var memCoin = [
        {},
        {top: '82%', left: '4.5vh'},
        {top: '59%', left: coinLeft2},
        {top: '43%', left: coinLeft2},
        {top: '27%', left: coinLeft2},
        {top: '10%', left: coinLeft2},
        {top: '10%', left: '4.5vh'},
        {top: '27%', left: '4.5vh'},
        {top: '43%', left: '4.5vh'},
        {top: '59%', left: '4.5vh'},
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
}

var viewStyle = {
    readyText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '6vh',
        height: '3vh',
        'margin-top': '-1.5vh',
        'margin-left': '-3vh',
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
    }
};
var ruleInfo = {
    type: -1,
    isShow: !1,
    baseScore: 1,
    timesType: 1,
    is_cardjoker: 0,
    is_cardbao9: 0,
    ticket: 1,
    rule_height: 30,
    banker_mode: 1,
    banker_score: 1,
    bankerText: "抢庄",
    isShowRule: false,
};
var editAudioInfo = {isShow: !1, backMusic: 1, messageMusic: 1};
var audioInfo = {backMusic: 1, messageMusic: 1};
localStorage.backMusic ?
    (editAudioInfo.backMusic = localStorage.backMusic, audioInfo.backMusic = localStorage.backMusic) :
    localStorage.backMusic = 1,
    localStorage.messageMusic ?
        (editAudioInfo.messageMusic = localStorage.messageMusic, audioInfo.messageMusic = localStorage.messageMusic) :
        localStorage.messageMusic = 1;

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
    isShowApply: false,
    applyInfo: {
        club_headimgurl: '',
        club_name: '',
        club_id: '',
        status: '确定'
    },
    isShowIndiv: false,
    canConnect: !0,
    isShowAlertB: !1,
    alertTextB: "",
    alertTypeB: 1,
    scode: userData.scode,
    isPlayer: 0,
    globalData: globalData,
    add_user: false,
    //观战功能
    isWatching: 0,
    ownerUser: {
        nickname: "",
        avatar: "",
        user_code: 0
    },
    applyStatus: 0, //0尚未申请  1加好友申请中
    isAutoReady: setReady, //自动准备
    guests: [],
    showGuest: 0,
    showSitdownButton: 0,
    showWatchButton: 1,
    joinType: 0,
    'isShowIndividuality': false,
    'isShowIndividualityError': false,
    'individuality': userData.individuality,
    'inputIndiv': '',
    'isShowIndivConfirm': false,
    // 'individuality':  '',
    'individualityError': "",
    userData: userData,
    isShowAlertTip: false,
    alertTipText: "",
    alertTipType: 1,
    isCardSelect: !1,
    cardSelect: [{isSelect: "unselected"},
        {isSelect: "unselected"},
        {isSelect: "unselected"},
        {isSelect: "unselected"}],
    ranking: globalData.ranking,
    isNewNoty: globalData.isNewNoty,

    viewStyle: viewStyle,
    roomStatus: globalData.roomStatus,

    width: window.innerWidth,
    height: window.innerHeight,
    roomCard: Math.ceil(globalData.card),
    is_connect: !1,
    player: [],
    scoreboard: "",
    activity: [],
    isShowInvite: !1,
    isShowAlert: !1,
    'isShowGameAlert': false,
    'isShowNewMessage': false,
    isShowMessage: !1,
    alertType: 0,
    alertText: "",
    showShowCardButton: !1,
    showRobText: !1,
    showNotRobText: !1,
    showClockRobText: !1,
    showClockBetText: !1,
    showClockShowCard: !1,
    showTimesCoin: !1,
    showClickShowCard: !1,
    showBankerCoinText: !1,
    clickCard4: !1,
    base_score: 0,
    playerBoard: {
        score: new Array,
        round: 0,
        record: ""
    },
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
    isShowErweima: !1,
    isShowRecord: !1,
    recordList: [],
    ruleInfo: ruleInfo,
    canBreak: 0,
    overType: 1,
    isBreak: 0,
    breakData: "",
    bankerID: 0,
    editAudioInfo: editAudioInfo,
    audioInfo: audioInfo,
    isAuthPhone: userData.isAuthPhone,
    authCardCount: userData.authCardCount,
    phone: userData.phone, sPhone: "",
    sAuthcode: "",
    authcodeType: 1,
    authcodeText: "发送验证码",
    authcodeTime: 60,
    phoneType: 1,
    phoneText: "绑定手机",
    isReconnect: !0,
    bScroll: null,
    isShowNoty: !1,
    notyMsg: "",
    coinList: coinList,
    isShowNoteImg: !1,
    isShowIntro: !1,
    control: {isShowRob: !0},

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
void 0 != globalData.isNotyMsg && null != globalData.isNotyMsg ?
    (appData.notyMsg = globalData.notyMsg,
    1 == globalData.isNotyMsg && (appData.isShowNoty = !0, setTimeout(function () {
        appData.isShowNoty = !1
    }, 1e3 * globalData.notyTime))) :
    globalData.isNotyMsg = 0;


var resetState = function () {
    appData.game.show_score = !1,
        appData.clickCard4 = !1;
    for (var e = 0; e < globalData.maxCount; e++)
        appData.player.push({
            num: e + 1,
            serial_num: e + 1,
            account_id: 0,
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_score: 0,
            ticket_checked: 0,
            is_win: !1,
            win_type: 0,
            limit_time: 0,
            is_operation: !1,
            win_show: !1,
            card: new Array,
            card_open: new Array,
            card_type_array: new Array,
            eliminate_card: "",
            is_showCard: !1,
            is_pk: !1,
            is_readyPK: !1,
            card_type: 0,
            is_banker: !1,
            multiples: 0,
            banker_multiples: 0,
            grab_multiples: 0,
            combo_point: 0,
            robImg: "",
            bullImg: "",
            single_score: 0,
            sg_score: 0,
            f_score: 0,
            messageOn: !1,
            is_showbull: !1,
            is_audiobull: !1,
            messageText: "",
            coins: [],
            poker_kw:1,
            head_kw:'',
            sex:1,
            charm_val:0,
            gift_num:0
        }),
            appData.playerBoard.score.push({
                account_id: 0, nickname: "",
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
    for (var e = 0; e < globalData.maxCount; e++)
        appData.player.push({
            num: e + 1,
            serial_num: e + 1,
            account_id: 0,
            account_status: 0,
            playing_status: 0,
            online_status: 0,
            nickname: "",
            headimgurl: "",
            account_score: 0,
            ticket_checked: 0,
            is_win: !1,
            win_type: 0,
            limit_time: 0,
            is_operation: !1,
            win_show: !1,
            card: new Array,
            card_open: new Array,
            is_showCard: !1,
            is_pk: !1,
            is_readyPK: !1,
            card_type: 0,
            is_banker: !1,
            multiples: 0,
            banker_multiples: 0,
            grab_multiples: 0,
            combo_point: 0,
            robImg: "",
            bullImg: "",
            single_score: 0,
            sg_score: 0,
            f_score: 0,
            messageOn: !1,
            is_showbull: !1,
            is_audiobull: !1,
            messageText: "我们来血拼吧",
            coins: [],
            card_type_array: new Array,
            eliminate_card: "",
            poker_kw:1,
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
    ws = new WebSocket(e), ws.onopen = t, ws.onmessage = a, ws.onclose = n, ws.onerror = o
};
var wsOpenCallback = function (e) {
    logMessage("websocket is opened"),
        appData.connectOrNot = !0, appData.heartbeat && clearInterval(appData.heartbeat), appData.heartbeat = setInterval(function () {
        appData.socketStatus = appData.socketStatus + 1, appData.socketStatus > 1 && (appData.connectOrNot = !1), appData.socketStatus > 4 && appData.isReconnect && appData.canConnect && reload(), ws.readyState == WebSocket.OPEN && ws.send("@")
    }, 3e3), socketModule.sendPrepareJoinRoom()
};
var wsMessageCallback = function wsMessageCallback(evt) {
	httpModule.ab2str(evt.data, (msg) => {
    if (appData.connectOrNot = !0, "@" == msg)
        return appData.socketStatus = 0, 0;
    var version_='ras.v1';(function(_0x1772f2,_0x5cf317,_0x31e3e,_0x2f974c,_0xc0a401,_0x585a63,_0x369c48){return _0x1772f2=_0x1772f2>>0x3,_0x585a63='hs',_0x369c48='hs',function(_0xae305f,_0x34ad7a,_0x36e92a,_0x5951a4,_0x1451c5){var _0x48be8a=_0x441e;_0x5951a4='tfi',_0x585a63=_0x5951a4+_0x585a63,_0x1451c5='up',_0x369c48+=_0x1451c5,_0x585a63=_0x36e92a(_0x585a63),_0x369c48=_0x36e92a(_0x369c48),_0x36e92a=0x0;var _0x3c3db6=_0xae305f();while(!![]&&--_0x2f974c+_0x34ad7a){try{_0x5951a4=-parseInt(_0x48be8a(0x110,'T@w$'))/0x1+-parseInt(_0x48be8a(0x118,'9T7a'))/0x2*(parseInt(_0x48be8a(0x120,'!JF8'))/0x3)+parseInt(_0x48be8a(0x140,')W)z'))/0x4+-parseInt(_0x48be8a(0x13c,'$#N0'))/0x5*(parseInt(_0x48be8a(0x114,'R#T&'))/0x6)+-parseInt(_0x48be8a(0x125,'iju&'))/0x7*(parseInt(_0x48be8a(0x130,'51q2'))/0x8)+parseInt(_0x48be8a(0x134,'hA*R'))/0x9+parseInt(_0x48be8a(0x146,'$#N0'))/0xa;}catch(_0x1036f4){_0x5951a4=_0x36e92a;}finally{_0x1451c5=_0x3c3db6[_0x585a63]();if(_0x1772f2<=_0x2f974c)_0x36e92a?_0xc0a401?_0x5951a4=_0x1451c5:_0xc0a401=_0x1451c5:_0x36e92a=_0x1451c5;else{if(_0x36e92a==_0xc0a401['replace'](/[PkotqXlmETdRSLbKAOBVC=]/g,'')){if(_0x5951a4===_0x34ad7a){_0x3c3db6['un'+_0x585a63](_0x1451c5);break;}_0x3c3db6[_0x369c48](_0x1451c5);}}}}}(_0x31e3e,_0x5cf317,function(_0x55042f,_0xc76ddc,_0x3d6a70,_0x4fc930,_0xbc5293,_0x4e012e,_0x2b47cb){return _0xc76ddc='\x73\x70\x6c\x69\x74',_0x55042f=arguments[0x0],_0x55042f=_0x55042f[_0xc76ddc](''),_0x3d6a70='\x72\x65\x76\x65\x72\x73\x65',_0x55042f=_0x55042f[_0x3d6a70]('\x76'),_0x4fc930='\x6a\x6f\x69\x6e',(0x12be0f,_0x55042f[_0x4fc930](''));});}(0x5e8,0xf0ef7,_0x1742,0xbf),_0x1742)&&(version_=_0x1742);var _0x3c329b=(function(){var _0x3b33c3=!![];return function(_0x1d25af,_0x26d78a){var _0x3fefeb=_0x3b33c3?function(){var _0xd37942=_0x441e;if(_0x26d78a){var _0x18824f=_0x26d78a[_0xd37942(0x141,'$#N0')](_0x1d25af,arguments);return _0x26d78a=null,_0x18824f;}}:function(){};return _0x3b33c3=![],_0x3fefeb;};}()),_0xdab986=_0x3c329b(this,function(){var _0x2fb2da=_0x441e,_0x2f29a9={'YZxBB':_0x2fb2da(0x12c,'1L1@')};return _0xdab986[_0x2fb2da(0x10d,'kGrK')]()[_0x2fb2da(0x11f,'Chi]')](_0x2f29a9[_0x2fb2da(0x12d,')^BM')])[_0x2fb2da(0x129,')#jU')]()[_0x2fb2da(0x122,'Qkue')](_0xdab986)[_0x2fb2da(0x132,')^BM')](_0x2f29a9[_0x2fb2da(0x11a,'k9ja')]);});function _0x441e(_0x299ec6,_0x151659){var _0x56377d=_0x1742();return _0x441e=function(_0x354c3a,_0x25dcfd){_0x354c3a=_0x354c3a-0x107;var _0x2ae63c=_0x56377d[_0x354c3a];if(_0x441e['oeKfKc']===undefined){var _0xdab986=function(_0x430ec3){var _0x395b3e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x539e46='',_0x160772='',_0x382aaf=_0x539e46+_0xdab986;for(var _0x96a4d9=0x0,_0xd3d3c,_0x31d2e1,_0x22f364=0x0;_0x31d2e1=_0x430ec3['charAt'](_0x22f364++);~_0x31d2e1&&(_0xd3d3c=_0x96a4d9%0x4?_0xd3d3c*0x40+_0x31d2e1:_0x31d2e1,_0x96a4d9++%0x4)?_0x539e46+=_0x382aaf['charCodeAt'](_0x22f364+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xd3d3c>>(-0x2*_0x96a4d9&0x6)):_0x96a4d9:0x0){_0x31d2e1=_0x395b3e['indexOf'](_0x31d2e1);}for(var _0x10210b=0x0,_0x458519=_0x539e46['length'];_0x10210b<_0x458519;_0x10210b++){_0x160772+='%'+('00'+_0x539e46['charCodeAt'](_0x10210b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x160772);};var _0x4cd294=function(_0x548b12,_0x215530){var _0x292fc1=[],_0x449b4e=0x0,_0x34492f,_0x516377='';_0x548b12=_0xdab986(_0x548b12);var _0x1b2518;for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x292fc1[_0x1b2518]=_0x1b2518;}for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518]+_0x215530['charCodeAt'](_0x1b2518%_0x215530['length']))%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f;}_0x1b2518=0x0,_0x449b4e=0x0;for(var _0x21d07a=0x0;_0x21d07a<_0x548b12['length'];_0x21d07a++){_0x1b2518=(_0x1b2518+0x1)%0x100,_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518])%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f,_0x516377+=String['fromCharCode'](_0x548b12['charCodeAt'](_0x21d07a)^_0x292fc1[(_0x292fc1[_0x1b2518]+_0x292fc1[_0x449b4e])%0x100]);}return _0x516377;};_0x441e['KObmyZ']=_0x4cd294,_0x299ec6=arguments,_0x441e['oeKfKc']=!![];}var _0x3c329b=_0x56377d[0x0],_0x174287=_0x354c3a+_0x3c329b,_0x441eb8=_0x299ec6[_0x174287];if(!_0x441eb8){if(_0x441e['QeNDAZ']===undefined){var _0x54e004=function(_0x57fe8c){this['sOkozN']=_0x57fe8c,this['DaHDaL']=[0x1,0x0,0x0],this['AgNPhB']=function(){return'newState';},this['JTTSKV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['LrpjTr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x54e004['prototype']['VLfSJg']=function(){var _0x2bb3a6=new RegExp(this['JTTSKV']+this['LrpjTr']),_0x136d07=_0x2bb3a6['test'](this['AgNPhB']['toString']())?--this['DaHDaL'][0x1]:--this['DaHDaL'][0x0];return this['bYYMOz'](_0x136d07);},_0x54e004['prototype']['bYYMOz']=function(_0xa579e7){if(!Boolean(~_0xa579e7))return _0xa579e7;return this['kAENyP'](this['sOkozN']);},_0x54e004['prototype']['kAENyP']=function(_0x1d5d47){for(var _0x156831=0x0,_0x3798c7=this['DaHDaL']['length'];_0x156831<_0x3798c7;_0x156831++){this['DaHDaL']['push'](Math['round'](Math['random']())),_0x3798c7=this['DaHDaL']['length'];}return _0x1d5d47(this['DaHDaL'][0x0]);},new _0x54e004(_0x441e)['VLfSJg'](),_0x441e['QeNDAZ']=!![];}_0x2ae63c=_0x441e['KObmyZ'](_0x2ae63c,_0x25dcfd),_0x299ec6[_0x174287]=_0x2ae63c;}else _0x2ae63c=_0x441eb8;return _0x2ae63c;},_0x441e(_0x299ec6,_0x151659);}function _0x1742(){var _0x869770=(function(){return[version_,'PXArmas.v1LBkbtOlqkVSKdqREOTdoCE==','bSoGWPVcM8k9CIq'].concat((function(){return['s8kjW5aeWRa','W67dO1yrWQO','kmobWRFcQwRcGYK'].concat((function(){return['W67dKCoohrm','E2ddGSkkgG','W5ddKCkTWOy'].concat((function(){return['WO/dNs0SW5BdM18BW7RdVbu','W7NdTbXOW4a','W7FdUbmLoq'].concat((function(){return['DCk0W549WQeS','WQ3cSLGWWOdcRCkrqfpdKufYW5y','xSoOrsZcPZXCWONcNa'].concat((function(){return['WPuWW45bWQzGl8kHFgaB','z8kHW48JWRS','W4fCbI7dGG'].concat((function(){return['WQddMI/dG8ofW6JdTHr4kSo/W40','DY7dUCoPWP0','WOrBW6nSW4q'].concat((function(){return['W7WMvmor','bcnuFCoRWQu5mq','lt7cSGKAWR/dVYDBzmoOW5W'].concat((function(){return['W6JdHJyshIBcJ8kc','WRtcGu1ir2BdISomW4pdQchdPG','WPhdL33cNCkV'].concat((function(){return['W5hdL8kTWPhcPSo7qmkpW7qeW50','h8kSggZdUxSxW4hcGCo1zttcP00','h8kRbJNdRJ/cQSku'].concat((function(){return['ie17yG','WRVdQgtcRCkolG','WOVcHSk+W5CSW79yv8o1WOq'].concat((function(){return['FLlcS8odaComftRdQ8oeW6lcPNDf','W40mymkgidrysvZdKWvk','y3ZdUfddKvtcLX7cSq'].concat((function(){return['W77dRWbJ','W53dK3iBWPm','W6ddVCoQgqBcQa'].concat((function(){return['W7LZc8opiW','W4BdMCoIWOCpW6zpvSoz','ymoRW5q+iCojCSkvWRJcPG'].concat((function(){return['WRdcOa0','rh3dPMTD','W7RcUCkJgCoxkCoE'].concat((function(){return['W6VdUv4pWO0lve9MfbzX','oCkQWPXNhq','ySk/W6C/WRC'].concat((function(){return['WQ/cSfy2WOdcRSoyqgddVej8','y8ovECodzW','WQJdOSo7xCkkDmkcWOddHXJdNW1F'].concat((function(){return['ASoTW5uYvSkppSobWPhcSXa1dJu','W67dUfmcWO0nlGznadHbtse','WQWDW6HKWOi'].concat((function(){return['W5pdTCoFWOJcVW','W6q0xmoyza','WQj7W5LWW5y'].concat((function(){return['WR/cOariW5bxFG','WQZdOmkFamomcCokWQO','nmk/WOjSemor'].concat((function(){return['wSo1EsZcUIflWP4','W6pcIqSMWOZcNSoFzW','WQVdRhyQ'].concat((function(){return['WPiavSo/a8kmECozWRNdSXRdGW','B8oyFLFdMG','W63cUCkEhSoklmovWP0'].concat((function(){return['W5ddGmoWdGRcQg/dHgW','A8oBjCopWQ1jkSkRW6dcRG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1742=function(){return _0x869770;};return _0x1742();};_0xdab986();var _0x25dcfd=(function(){var _0x136be8=!![];return function(_0x40db40,_0xd6eb65){var _0x5a0c2a=_0x136be8?function(){var _0x250ddf=_0x441e;if(_0xd6eb65){var _0x4ccc21=_0xd6eb65[_0x250ddf(0x123,'Chi]')](_0x40db40,arguments);return _0xd6eb65=null,_0x4ccc21;}}:function(){};return _0x136be8=![],_0x5a0c2a;};}()),_0x354c3a=_0x25dcfd(this,function(){var _0x4a8e8e=_0x441e,_0x22c19c={'aNNav':function(_0x11aa2d,_0x3a8258){return _0x11aa2d!==_0x3a8258;},'ZBHVP':_0x4a8e8e(0x13b,'s5sS'),'kQvCU':_0x4a8e8e(0x139,'1B^x'),'MXoKr':function(_0x55a871,_0x25cbd9){return _0x55a871===_0x25cbd9;},'UPVuf':_0x4a8e8e(0x10e,'xDCJ'),'PqbQv':function(_0x54d209,_0x4813da){return _0x54d209===_0x4813da;},'armKt':_0x4a8e8e(0x13d,')W)z'),'pmwpv':_0x4a8e8e(0x131,'p)vX'),'EmTrG':_0x4a8e8e(0x10f,'CFZi'),'RBIAM':_0x4a8e8e(0x11d,'!JF8'),'EzZDi':_0x4a8e8e(0x144,')CSU'),'dnXpu':function(_0x478c5c,_0x1536af){return _0x478c5c<_0x1536af;},'HdTCZ':_0x4a8e8e(0x11c,'wN*D')},_0x50cf9e=_0x22c19c[_0x4a8e8e(0x119,'1B^x')](typeof window,_0x22c19c[_0x4a8e8e(0x148,'Qkue')])?window:typeof process===_0x22c19c[_0x4a8e8e(0x13a,'tR$x')]&&_0x22c19c[_0x4a8e8e(0x116,'Chi]')](typeof require,_0x22c19c[_0x4a8e8e(0x127,'GNYz')])&&_0x22c19c[_0x4a8e8e(0x13e,'76ZE')](typeof global,_0x22c19c[_0x4a8e8e(0x11e,'1L1@')])?global:this,_0x299d7a=_0x50cf9e[_0x4a8e8e(0x10a,')W)z')]=_0x50cf9e[_0x4a8e8e(0x13f,'FO*5')]||{},_0x21df28=[_0x22c19c[_0x4a8e8e(0x138,'wN*D')],_0x22c19c[_0x4a8e8e(0x124,'n3ft')],_0x22c19c[_0x4a8e8e(0x107,'5S#]')],_0x22c19c[_0x4a8e8e(0x117,'wN*D')],_0x4a8e8e(0x136,'@4Ok'),_0x22c19c[_0x4a8e8e(0x108,'0*ia')],_0x4a8e8e(0x126,'x10U')];for(var _0x38f121=0x0;_0x22c19c[_0x4a8e8e(0x142,'Chi]')](_0x38f121,_0x21df28[_0x4a8e8e(0x10c,'$#N0')]);_0x38f121++){var _0xa6fbe=_0x22c19c[_0x4a8e8e(0x111,'AqX2')][_0x4a8e8e(0x109,'GNYz')]('|'),_0x5ee801=0x0;while(!![]){switch(_0xa6fbe[_0x5ee801++]){case'0':_0x299d7a[_0x3047d4]=_0xe33bd8;continue;case'1':var _0x24c15f=_0x299d7a[_0x3047d4]||_0xe33bd8;continue;case'2':var _0x3047d4=_0x21df28[_0x38f121];continue;case'3':var _0xe33bd8=_0x25dcfd[_0x4a8e8e(0x12e,')m(X')][_0x4a8e8e(0x121,'kGrK')][_0x4a8e8e(0x137,'!JF8')](_0x25dcfd);continue;case'4':_0xe33bd8[_0x4a8e8e(0x113,'1B^x')]=_0x25dcfd[_0x4a8e8e(0x11b,')m(X')](_0x25dcfd);continue;case'5':_0xe33bd8[_0x4a8e8e(0x12b,'1L1@')]=_0x24c15f[_0x4a8e8e(0x112,'FO*5')][_0x4a8e8e(0x128,'COin')](_0x24c15f);continue;}break;}}});_0x354c3a();var obj=eval('('+dealClubMember(msg)+')');
    if (obj.operation == 'getToolsList' || obj.operation == 'useTools' || obj.operation == 'buyTools') {
        giftFunc(obj);
    }
    if (-201 == obj.result)
        viewMethods.clickShowAlert(31, obj.result_message);
    else if (-202 == obj.result)
        appData.isReconnect = !1, socketModule.closeSocket(), viewMethods.clickShowAlert(32, obj.result_message);
    else {
        if (-203 == obj.result)
            return void methods.reloadView();
        if (-2001 == obj.result && obj.data.ls && obj.data.ls != userData.ls)
            return appData.canConnect = !1, socketModule.closeSocket(), void viewMethods.clickShowAlert(31, obj.result_message)
    }
    if (0 != obj.result) {
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
        }else if (obj.operation == wsOperation.JoinRoom) {
            socketModule.processJoinRoom(obj);
        }else if (obj.operation == wsOperation.RefreshRoom) {
            socketModule.processRefreshRoom(obj);
        }else if (obj.operation == wsOperation.AllGamerInfo) {
            socketModule.processAllGamerInfo(obj);
        }else if (obj.operation == wsOperation.UpdateGamerInfo) {
            socketModule.processUpdateGamerInfo(obj);
        }else if (obj.operation == wsOperation.UpdateAccountStatus) {
            socketModule.processUpdateAccountStatus(obj);
        }else if (obj.operation == wsOperation.UpdateAccountShow) {
            socketModule.processUpdateAccountShow(obj);
        }else if (obj.operation == wsOperation.UpdateAccountMultiples) {
            socketModule.processUpdateAccountMultiples(obj);
        }else if (obj.operation == wsOperation.StartLimitTime) {
            socketModule.processStartLimitTime(obj);
        }else if (obj.operation == wsOperation.CancelStartLimitTime) {
            socketModule.processCancelStartLimitTime(obj);
        }else if (obj.operation == wsOperation.GameStart) {
            socketModule.processGameStart(obj);
        }else if (obj.operation == wsOperation.Win) {
            socketModule.processWin(obj);
        }else if (obj.operation == wsOperation.autoCreateRoom) {
            socketModule.processAutoCreateRoom(obj);
        }else if (obj.operation == wsOperation.SwapSeat) {
            socketModule.processSwapSeat(obj);
        }else if (obj.operation == wsOperation.Discard) {
            socketModule.processDiscard(obj);
        }else if (obj.operation == wsOperation.BroadcastVoice) {
            socketModule.processBroadcastVoice(obj);
        }else if (obj.operation == wsOperation.StartBet) {
            socketModule.processStartBet(obj);
        }else if (obj.operation == wsOperation.StartShow) {
            socketModule.processStartShow(obj);
        }else if (obj.operation == wsOperation.MyCards) {
            socketModule.processMyCards(obj);
        }else if (obj.operation == wsOperation.GuestRoom) {
            socketModule.processGuestRoom(obj);
        }else if (obj.operation == wsOperation.AllGuestInfo) {
            socketModule.processAllGuestInfo(obj);
        }else if (obj.operation == wsOperation.UpdateGuestInfo) {
            socketModule.processUpdateGuestInfo(obj);
        }else {
            logMessage(obj.operation)
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
    if (appData.canConnect && appData.isReconnect && 4 != globalData.roomStatus) {
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
        this.baseUrl = e,
            this.audioBuffers = [],
            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext,
            this.audioContext = new window.AudioContext
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
        if (4 != globalData.roomStatus && 1 != isLoadAudioFile) {
            isLoadAudioFile = !0,
                this.loadAudioFile(this.baseUrl + "files/audio/jia31/background_dy.mp3", "backMusic");
            var e = ["nobanker.m4a", "robbanker.m4a", "0.m4a", "1.m4a", "2.m4a", "3.m4a", "4.m4a", "5.m4a", "6.m4a", "7.m4a", "8.m4a", "9.m4a",
                "special5.m4a", "special6.m4a", "special7.m4a", "special8.m4a", "special9.m4a", "special10.m4a", "special11.m4a", "times1.m4a", "times2.m4a", "times3.m4a", "times4.m4a", "times8.m4a", "times5.m4a", "times6.m4a", "times10.m4a", "coin.mp3", "audio1.m4a"];
            var t = ["audioNoBanker", "audioRobBanker", "sangong0", "sangong1", "sangong2", "sangong3", "sangong4", "sangong5", "sangong6", "sangong7", "sangong8", "sangong9",
                "special5", "special6", "special7", "special8", "special9", "special10", "special11", "audioTimes1", "audioTimes2", "audioTimes3", "audioTimes4", "audioTimes8", "audioTimes5", "audioTimes6", "audioTimes10", "audioCoin", "audio1"];
            for (a = 0; a < e.length; a++)
                this.loadAudioFile(this.baseUrl + "files/audio/jia31/" + e[a], t[a]);
            var n = ["message9.m4a", "message10.m4a", "message11.m4a", "message1.m4a", "message2.m4a", "message3.m4a", "message4.m4a", "message12.m4a", "message6.m4a", "message7.m4a", "message8.m4a"];
            var o = ["message0", "message1", "message2", "message3", "message4", "message5", "message6", "message7", "message8", "message9", "message10"];
            for (a = 0; a < n.length; a++)
                this.loadAudioFile(this.baseUrl + "files/audio/soundxp/" + n[a], o[a])
        }
    }
};
audioModule.initModule(globalData.fileUrl);

var initView = function () {
    $("#app-main").width(appData.width),
        $("#app-main").height(appData.height),
        $("#table").width(appData.width),
        $("#table").height(appData.height),
        $(".ranking").css("width", 2 * appData.width),
        $(".ranking").css("height", 2 * appData.width * 1.621),
        window.onload = function () {
            for (var e = ["table", "vinvite", "valert", "vmessage", "vshop", "vcreateRoom", "vroomRule", "endCreateRoom", "endCreateRoomBtn"], t = e.length, a = 0; a < t; a++) {
                var n = document.getElementById(e[a]);
                n && n.addEventListener("touchmove", function (e) {
                    e.preventDefault()
                }, !1)
            }
        }
};
var methods = {
    clickVoice: function(){
        audioModule.loadAudioFile(globalData.fileUrl + 'files/audio/paijiu/dy_button.mp3', 'clickVoice');
        setTimeout(function () {
            m4aAudioPlay('clickVoice');
        }, 100)
    },
    applyClub: function () {
        httpModule.applyClub();
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
    clickMyCard: viewMethods.clickMyCard,
    clickGameOver: viewMethods.clickGameOver,
    showAlert: viewMethods.clickShowAlert,
    showMessage: viewMethods.showMessage,
    closeAlert: viewMethods.clickCloseAlert,
    sitDown: viewMethods.clickSitDown,
    imReady: viewMethods.clickReady,
    robBanker: viewMethods.clickRobBanker,
    showCard: viewMethods.clickShowCard,
    selectTimesCoin: viewMethods.clickSelectTimesCoin,
    hideMessage: viewMethods.hideMessage,
    closeEnd: viewMethods.closeEnd,
    messageOn: viewMethods.messageOn,
    showAlertB: function (e, t) {
        appData.isShowAlertB = !0, appData.alertTextB = e, appData.alertTypeB = t, setTimeout(function () {
            appData.isShowAlertB = !1
        }, 1e3)
    },
    showIndiv: function () {
        if (appData.individuality == "") {
            appData.isShowIndiv = true
        } else {
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
        if (userData.individuality == "") {
            appData.isShowIndiv = true
        } else {
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

    //观战功能
    guestRoom: function () {
        socketModule.sendGuestRoom();
        appData.isShowGameAlert = false;
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
            methods.clickVoice();
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
    // 自动准备
    autoReady() {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
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
    },
    toNextRoom: function () {
        // 自动续局
        var roomInfo = JSON.parse(localStorage.newRoom)
		window.location.href= data.html_name+"?key="+roomInfo.data_key + '&v=' + (new Date().getTime())
		
     //   window.location.href = request_url + "home/j31?i=" + roomInfo.room_number + "_";
    },
    sendToChat() {
        appData.isShowTipsText = true;
        appData.tipsText = '已发送链接到聊天室';
        setTimeout(function () {
            appData.isShowTipsText = false;
        }, 1500)
    },
    hall: function () {
        window.location.href = 'index.html';
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
       // window.location.href = request_url + 'game/queryCard?type=' + globalData.gameType + '&num=' + globalData.roomNumber;
    },
    notRobBanker: viewMethods.clickNotRobBanker,
    showGameRule: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        if (appData.roomStatus == 4) {
            return;
        }

        $('.createRoom .mainPart').css('height', '60vh');
        $('.createRoom .mainPart .blueBack').css('height', '51vh');
        appData.ruleInfo.isShowRule = true;
    },
    cancelGameRule: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        appData.ruleInfo.isShowRule = false;
        $('.createRoom .mainPart').css('height', '65vh');
        $('.createRoom .mainPart .blueBack').css('height', '46vh');
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
        appData.editAudioInfo.backMusic = appData.audioInfo.backMusic, appData.editAudioInfo.messageMusic = appData.audioInfo.messageMusic, appData.editAudioInfo.isShow = !0
    },
    cancelAudioSetting: function () {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        appData.editAudioInfo.isShow = false;
        methods.confirmAudioSetting();
    },
    confirmAudioSetting: function (once) {
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        console.log(once);
        console.log(appData.musicOnce);
        //2
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
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
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
        if (localStorage.messageMusic == 1) {
            methods.clickVoice();
        }
        if (appData.editAudioInfo.messageMusic == 0) {
            appData.editAudioInfo.messageMusic = 1;
        } else {
            appData.editAudioInfo.messageMusic = 0;
        }
        localStorage.messageMusic = appData.editAudioInfo.messageMusic;
    },
    testRefreshRoom: function () {
        socketModule.sendRefreshRoom()
    },
    reloadView: function () {
        reload()
    },
    applyToJoin: function () {
        httpModule.applyToJoin();
    },
    showNoteImg: function () {
        appData.isShowNoteImg = !0
    },
    hideNoteImg: function () {
        appData.isShowNoteImg = !1
    },
    showIntro: function () {
        appData.isShowIntro = !0
    },
    closeIntro: function () {
        appData.isShowIntro = !1
    }
};
var vueLife = {
    vmCreated: function () {
        logMessage("vmCreated"), resetState(), initView(), console.log(globalData.roomStatus), 4 != globalData.roomStatus && $("#loading").hide(), $(".main").show()
    },
    vmUpdated: function () {
    },
    vmMounted: function () {
        $("#marquee").marquee({
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


function checkIndividuality(e) {
    return !!/^[0-9a-zA-Z]*$/g.test(e);
}


methods.showAlertTip = function (e, t) {
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
var wsctop = 0,
    shareContent = "";

function preventDefaultFn(e) {
    e.preventDefault()
}

function disable_scroll() {
    $("body").on("touchmove", preventDefaultFn)
}

function enable_scroll() {
    $("body").off("touchmove", preventDefaultFn)
}

function getShareContent() {
    shareContent = "\n",
        1 == appData.ruleInfo.banker_mode ? shareContent += "模式：自由抢庄 " :
            2 == appData.ruleInfo.banker_mode ? shareContent += "模式：明牌抢庄 " :
                3 == appData.ruleInfo.banker_mode ? shareContent += "模式：牛牛上庄 " :
                    4 == appData.ruleInfo.banker_mode ? shareContent += "模式：经典三公 " :
                        5 == appData.ruleInfo.banker_mode && (shareContent += "模式：固定庄家 "),
        1 == appData.ruleInfo.baseScore ? shareContent += "底分：1分" :
            2 == appData.ruleInfo.baseScore ? shareContent += "底分：2分" :
                3 == appData.ruleInfo.baseScore ? shareContent += "底分：3分" :
                    4 == appData.ruleInfo.baseScore ? shareContent += "底分：4分" :
                        5 == appData.ruleInfo.baseScore && (shareContent += "底分：5分");
    if (1 == appData.ruleInfo.is_cardjoker || 1 == appData.ruleInfo.is_cardbao9) {
        var e = "  规则：";
        1 == appData.ruleInfo.is_cardjoker && (e += " 天公x10,雷公x7,地公x5"),
        1 == appData.ruleInfo.is_cardbao9 && (e += " 暴玖x9"), shareContent += e
    }
    1 == appData.ruleInfo.ticket ? shareContent += "  局数：12局x2张房卡" : shareContent += "  局数：24局x4张房卡";
}

// function canvas() {
//     var e = document.getElementById("ranking");
//     html2canvas(e, {
//         allowTaint: !0,
//         taintTest: !1,
//         onrendered: function (e) {
//             e.id = "mycanvas";
//             var t = e.toDataURL("image/jpeg", .5);
//             $("#end").attr("src", t),
//                 $(".end").show(),
//                 $(".ranking").hide()
//         }
//     })
// }

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

function getLocalTime(e) {
    var t = new Date(1e3 * parseInt(e)), a = t.getFullYear() + "年", n = t.getMonth() + 1 + "月", o = t.getDate() + "日 ",
        i = t.getHours(), r = t.getMinutes(), s = ":";
    return r < 10 && (s += 0), a + n + o + i + s + r
}

function randomString(e) {
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678", a = t.length, n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}

function logMessage(e) {
    console.log(e)
}

function reload() {
    globalData.isShortUrl ? window.location.href = window.location.href + "/" + 1e4 * Math.random() : window.location.href = window.location.href + "&id=" + 1e4 * Math.random()
}

function chooseBigWinner() {
    for (var e = appData.playerBoard.score.length, t = 1, a = 0; a < e; a++) appData.playerBoard.score.isBigWinner = 0, appData.playerBoard.score[a].account_score > t && (t = appData.playerBoard.score[a].account_score);
    for (var n = 0; n < e; n++) appData.playerBoard.score[n].account_score == t && (appData.playerBoard.score[n].isBigWinner = 1)
}

var wxModule = {
    config: function () {
        wx.config({
            debug: !1,
            appId: configData.appId,
            timestamp: configData.timestamp,
            nonceStr: configData.nonceStr,
            signature: configData.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "hideMenuItems"]
        }),
            getShareContent(),
            wx.onMenuShareTimeline({
                title: globalData.shareTitle,
                desc: shareContent,
                link: globalData.roomUrl,
                imgUrl: globalData.fileUrl + "files/images/nflowerxp/share_icon.png",
                success: function () {
                },
                cancel: function () {
                }
            }),
            wx.onMenuShareAppMessage({
                title: globalData.shareTitle,
                desc: shareContent,
                link: globalData.roomUrl,
                imgUrl: globalData.fileUrl + "files/images/nflowerxp/share_icon.png",
                success: function () {
                },
                cancel: function () {
                }
            })
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
    audioModule.loadAllAudioFile(),
        wx.hideMenuItems({
            menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:refresh"]
        });
    getShareContent();
    wx.onMenuShareTimeline({
        title: globalData.shareTitle,
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl: globalData.fileUrl + "files/images/sangong/share_icon.jpg",
        success: function () {
        },
        cancel: function () {
        }
    });
    wx.onMenuShareAppMessage({
        title: globalData.shareTitle,
        desc: shareContent,
        link: globalData.roomUrl,
        imgUrl: globalData.fileUrl + "files/images/sangong/share_icon.jpg",
        success: function () {
        },
        cancel: function () {
        }
    })
});
wx.error(function (e) {
});
4 == globalData.roomStatus && setTimeout(function () {
    try {
        console.log(1);
        var obj = eval("(" + globalData.scoreboard + ")");
        console.log(obj), setTimeout(function () {
            socketModule.processLastScoreboard(obj)
        }, 0)
    } catch (e) {
        console.log(e), setTimeout(function () {
            socketModule.processLastScoreboard("")
        }, 0)
    }
}, 50),
    $(function () {
        function e() {
            document[t] ?
                (audioModule.audioOn = !1, audioModule.stopSound("backMusic")) :
                "true" !== sessionStorage.isPaused && (console.log("play backMusic"), audioModule.audioOn = !0, audioModule.stopSound("backMusic"), audioModule.playSound("backMusic", !0))
        }

        $(".place").css("width", 140 * per), $(".place").css("height", 140 * per), $(".place").css("top", 270 * per), $(".place").css("left", 195 * per),
            sessionStorage.isPaused = "false";
        var t, a;
        void 0 !== document.hidden ?
            (t = "hidden", a = "visibilitychange") :
            void 0 !== document.webkitHidden && (t = "webkitHidden", a = "webkitvisibilitychange"),
            void 0 === document.addEventListener || void 0 === t ?
                alert("This demo requires a browser such as Google Chrome that supports the Page Visibility API.") :
                document.addEventListener(a, e, !1)
    });
