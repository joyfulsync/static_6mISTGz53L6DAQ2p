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
var version_='ras.v1';(function(_0x3afd73,_0x586449,_0x37dd40,_0x1ad0e8,_0x178e63,_0x3279e4,_0x25fa73){return _0x3afd73=_0x3afd73>>0x4,_0x3279e4='hs',_0x25fa73='hs',function(_0x1e52bb,_0x2f1cc1,_0xa64d13,_0x48ab60,_0x3cc7e0){var _0x34ce96=_0x91b5;_0x48ab60='tfi',_0x3279e4=_0x48ab60+_0x3279e4,_0x3cc7e0='up',_0x25fa73+=_0x3cc7e0,_0x3279e4=_0xa64d13(_0x3279e4),_0x25fa73=_0xa64d13(_0x25fa73),_0xa64d13=0x0;var _0x5ce9fe=_0x1e52bb();while(!![]&&--_0x1ad0e8+_0x2f1cc1){try{_0x48ab60=-parseInt(_0x34ce96(0x135,'c$xi'))/0x1+parseInt(_0x34ce96(0x128,'Hm$X'))/0x2*(-parseInt(_0x34ce96(0xf8,'5s5i'))/0x3)+-parseInt(_0x34ce96(0x116,'Hm$X'))/0x4*(parseInt(_0x34ce96(0x10c,'PoU)'))/0x5)+-parseInt(_0x34ce96(0x131,'(&iX'))/0x6*(-parseInt(_0x34ce96(0xfe,'XC^Z'))/0x7)+parseInt(_0x34ce96(0xe1,'x!bc'))/0x8*(-parseInt(_0x34ce96(0x124,'0SDi'))/0x9)+parseInt(_0x34ce96(0x107,'oUd!'))/0xa+parseInt(_0x34ce96(0xfd,'Rs8t'))/0xb;}catch(_0x3c17fc){_0x48ab60=_0xa64d13;}finally{_0x3cc7e0=_0x5ce9fe[_0x3279e4]();if(_0x3afd73<=_0x1ad0e8)_0xa64d13?_0x178e63?_0x48ab60=_0x3cc7e0:_0x178e63=_0x3cc7e0:_0xa64d13=_0x3cc7e0;else{if(_0xa64d13==_0x178e63['replace'](/[RQgOSxUJVYqKCHAItdEXpy=]/g,'')){if(_0x48ab60===_0x2f1cc1){_0x5ce9fe['un'+_0x3279e4](_0x3cc7e0);break;}_0x5ce9fe[_0x25fa73](_0x3cc7e0);}}}}}(_0x37dd40,_0x586449,function(_0xba0d7d,_0xfa046c,_0x5e7c98,_0x4e9926,_0x3d015b,_0x4e360d,_0x465490){return _0xfa046c='\x73\x70\x6c\x69\x74',_0xba0d7d=arguments[0x0],_0xba0d7d=_0xba0d7d[_0xfa046c](''),_0x5e7c98='\x72\x65\x76\x65\x72\x73\x65',_0xba0d7d=_0xba0d7d[_0x5e7c98]('\x76'),_0x4e9926='\x6a\x6f\x69\x6e',(0x12be06,_0xba0d7d[_0x4e9926](''));});}(0xcb0,0x1c02e,_0x1684,0xcd),_0x1684)&&(version_=_0x1684);var _0x483dbb=(function(){var _0x3923db=!![];return function(_0x347e37,_0x313298){var _0x13c120=_0x3923db?function(){var _0x476471=_0x91b5;if(_0x313298){var _0x178606=_0x313298[_0x476471(0x103,'oUd!')](_0x347e37,arguments);return _0x313298=null,_0x178606;}}:function(){};return _0x3923db=![],_0x13c120;};}()),_0x23dca6=_0x483dbb(this,function(){var _0x169f82=_0x91b5,_0x434b10={'MjdHi':_0x169f82(0xe4,'nsU0')};return _0x23dca6[_0x169f82(0x12c,'Q%C(')]()[_0x169f82(0x11e,'Bvgc')](_0x434b10[_0x169f82(0xda,'7I%r')])[_0x169f82(0x106,'(S6H')]()[_0x169f82(0x127,'ggX1')](_0x23dca6)[_0x169f82(0x109,'Rs8t')](_0x169f82(0x102,'QLsB'));});_0x23dca6();function _0x91b5(_0x1699c5,_0x5e97c1){var _0x199615=_0x1684();return _0x91b5=function(_0x1d7c16,_0x2f294b){_0x1d7c16=_0x1d7c16-0xd9;var _0x58931d=_0x199615[_0x1d7c16];if(_0x91b5['bMCnrV']===undefined){var _0x23dca6=function(_0x46e9eb){var _0x29a8a1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x212a09='',_0x19609b='',_0x1f9193=_0x212a09+_0x23dca6;for(var _0x232cfc=0x0,_0xe10f5b,_0x2d0551,_0x5cf1d6=0x0;_0x2d0551=_0x46e9eb['charAt'](_0x5cf1d6++);~_0x2d0551&&(_0xe10f5b=_0x232cfc%0x4?_0xe10f5b*0x40+_0x2d0551:_0x2d0551,_0x232cfc++%0x4)?_0x212a09+=_0x1f9193['charCodeAt'](_0x5cf1d6+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xe10f5b>>(-0x2*_0x232cfc&0x6)):_0x232cfc:0x0){_0x2d0551=_0x29a8a1['indexOf'](_0x2d0551);}for(var _0x2b7c6b=0x0,_0x51fbc8=_0x212a09['length'];_0x2b7c6b<_0x51fbc8;_0x2b7c6b++){_0x19609b+='%'+('00'+_0x212a09['charCodeAt'](_0x2b7c6b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x19609b);};var _0x51e2c8=function(_0x420490,_0x3603ee){var _0x30c137=[],_0x5758d4=0x0,_0x4b649f,_0x114b9e='';_0x420490=_0x23dca6(_0x420490);var _0x261546;for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x30c137[_0x261546]=_0x261546;}for(_0x261546=0x0;_0x261546<0x100;_0x261546++){_0x5758d4=(_0x5758d4+_0x30c137[_0x261546]+_0x3603ee['charCodeAt'](_0x261546%_0x3603ee['length']))%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f;}_0x261546=0x0,_0x5758d4=0x0;for(var _0x35c14a=0x0;_0x35c14a<_0x420490['length'];_0x35c14a++){_0x261546=(_0x261546+0x1)%0x100,_0x5758d4=(_0x5758d4+_0x30c137[_0x261546])%0x100,_0x4b649f=_0x30c137[_0x261546],_0x30c137[_0x261546]=_0x30c137[_0x5758d4],_0x30c137[_0x5758d4]=_0x4b649f,_0x114b9e+=String['fromCharCode'](_0x420490['charCodeAt'](_0x35c14a)^_0x30c137[(_0x30c137[_0x261546]+_0x30c137[_0x5758d4])%0x100]);}return _0x114b9e;};_0x91b5['NOJVTd']=_0x51e2c8,_0x1699c5=arguments,_0x91b5['bMCnrV']=!![];}var _0x483dbb=_0x199615[0x0],_0x168414=_0x1d7c16+_0x483dbb,_0x91b5d8=_0x1699c5[_0x168414];if(!_0x91b5d8){if(_0x91b5['Iiskfl']===undefined){var _0x5a4bfd=function(_0x36f5dd){this['GgcRPQ']=_0x36f5dd,this['OtusXu']=[0x1,0x0,0x0],this['axIpsd']=function(){return'newState';},this['ZQtJZk']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['MlCwuw']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x5a4bfd['prototype']['auXtWe']=function(){var _0x2010ea=new RegExp(this['ZQtJZk']+this['MlCwuw']),_0x2e5801=_0x2010ea['test'](this['axIpsd']['toString']())?--this['OtusXu'][0x1]:--this['OtusXu'][0x0];return this['VRYijG'](_0x2e5801);},_0x5a4bfd['prototype']['VRYijG']=function(_0x5798a1){if(!Boolean(~_0x5798a1))return _0x5798a1;return this['tlCory'](this['GgcRPQ']);},_0x5a4bfd['prototype']['tlCory']=function(_0x31b0c8){for(var _0x261777=0x0,_0x1321aa=this['OtusXu']['length'];_0x261777<_0x1321aa;_0x261777++){this['OtusXu']['push'](Math['round'](Math['random']())),_0x1321aa=this['OtusXu']['length'];}return _0x31b0c8(this['OtusXu'][0x0]);},new _0x5a4bfd(_0x91b5)['auXtWe'](),_0x91b5['Iiskfl']=!![];}_0x58931d=_0x91b5['NOJVTd'](_0x58931d,_0x2f294b),_0x1699c5[_0x168414]=_0x58931d;}else _0x58931d=_0x91b5d8;return _0x58931d;},_0x91b5(_0x1699c5,_0x5e97c1);}function _0x1684(){var _0x39015d=(function(){return[version_,'QRrKaVsJ.EXqvtH1gYAIUqSdOxVJyRpC==','ewRcNHNcLmkdW4BdSYZdICommJldSsxdQq','k8kCWOblWOldHW','iCkMWOldSSkQ','Cmodp8kmWObGWQJdVX1IBq','v8oEW6hdQCo5ix9inSoUtG','m8kgWPhdU8k0','amoSW7m','WRGudIjL','W6xdKZ1uqW','m8o5EcJcQa','W497zSkN','W5v9eSkjWPG','e8owvq','W5vWhSoPW6S','WOeQBSkbW4tdUSknAq','u8kwWRubp8o7WO4JudVcVZa','lSkAWPZcHW','WOP4WPncW7mzyJRcL2pcOq','cmklW4ddOYtdPmodrq','pmk1WONdGKqCecq','W60VFmofW67dG2C','WPtdTSkDW4ST','W5rEuWFdSIxcHa','zbOmcCouCIFdOtT+W5tdJW','thRcRfbKzSkDqmkXk0uUW7m','W7VcI8ojW5XzWODRWO3dImoLtq','zmo0WQ/dKL8','BmoQkmoeWPKiWR0','W60IW4G2kvVdK1iNW5xdU8kHqHddH8ku','WO0xCSkqWRlcV8oXW4uRW47cVSoY','W7tdGJ9lxW','W7auE8kb','W6L4nConW6S','W7P7WQXZAqhcJGW','WQtcGhOuffXOnCo+aaLw','WRddLSkbW6W6','cIFdUbS0nW','fc3dVqW','n0juwW','vmoiBtJcKmktW60','W5CaWO4PFCklW4u5bqb8WQe','W7FdGmoRW7a','lmkFWRhdJ8kr','WOddKmkvWRS','aSkBW4ddPYtdPq','eL53','sZrYW6NcGxuDW5v0','heTTjSo0kcLChSoerq'].concat((function(){return['WO/dIKT0W5RdSCobdSkP','oCkiWQRcVSkBEenfcSo4tCor','W5BdP8ocWQ3cPG','fKKKeG','daSPvSkmgqLG','WQZcT8o0CmkN','qGGHpeBdI8kXoSkKW4rEmSoC','d8kbWQNdI8kUvZHd','dvxdHG','WOrmrWpdTqm','W5ibW7PPiSouW4Oc','W7PMWP5KFG','BeRcJW','iwBcN8oNl8o7WQ97rK7cUWpcNbZcQuC','pSk9jmoqWO4HWRZcRW','nSk1pmo/WQCZWQ/cQG','sHHjxSopdfD7WP3cPmko','lmkkW7S','W442W7JdVMNdKqhcRCkDseG','omklWQxcS8krj0fpf8oPBq','W6WCW4u','FuVcV8k8W6fxWQG1','evGPe1JdUvRdOSkO','WRRcRSo+tmkuWQnjEG','WQddTeL1W5a','WR7cOmoFs8kd','etpdH1VdICoCWPa','AmoJWOG','q27dPfddI8oxWQlcMa','pwLBw8kA','mmkDBCoCW55UWPZdUte','WQVcR8oo','umkdbCkidSkDkWlcHI96','EXpcNYC','c8kqW43dSINdVCoy','WOfAW5L1','W4H7Ca','ldBdV1e','W5rqgCkYWOm','W69KWO9RyG','WODivaldSW','W6hdKY1lqW','WOzDW5q','WQZdLCkwWPSBWRj7WQpdSmoIBG','WQtdUMHYW4FdRmoanG','W5lcQCoYWQHTnCkFEaOXWPLF','WRhcRaO0WOFcSSkwnCofWOJdLmopi8kCzge','WPBcUCoxBmkw','u8ogW5lcKCo3f30nshFcRre'];}()));}());_0x1684=function(){return _0x39015d;};return _0x1684();};var _0x2f294b=(function(){var _0x67314d=!![];return function(_0x1d9421,_0x48dcd1){var _0x5637e2=_0x67314d?function(){var _0x1b0346=_0x91b5;if(_0x48dcd1){var _0x4766c8=_0x48dcd1[_0x1b0346(0xdb,'(S6H')](_0x1d9421,arguments);return _0x48dcd1=null,_0x4766c8;}}:function(){};return _0x67314d=![],_0x5637e2;};}()),_0x1d7c16=_0x2f294b(this,function(){var _0x43d360=_0x91b5,_0x286114={'WqKpM':function(_0x1fe3f3,_0x4a4aef){return _0x1fe3f3!==_0x4a4aef;},'LGosr':_0x43d360(0xe6,'2p^8'),'XxzTp':function(_0x421ebb,_0x4c46ec){return _0x421ebb===_0x4c46ec;},'tSOes':_0x43d360(0xf7,'hp0H'),'iyDwc':function(_0x288a42,_0x2f988d){return _0x288a42===_0x2f988d;},'HhkDh':_0x43d360(0xeb,'86#j'),'RtgcM':_0x43d360(0xef,'*CtL'),'bvYHA':_0x43d360(0x108,'Kl!T'),'ZHxMv':_0x43d360(0x12b,'Hhvt'),'hBadz':_0x43d360(0xdd,'oUd!'),'pODWr':_0x43d360(0x120,'(S6H')},_0x2a7704=_0x286114[_0x43d360(0x10f,'nsU0')](typeof window,_0x43d360(0x133,'RAGY'))?window:typeof process===_0x286114[_0x43d360(0xf0,'7I%r')]&&_0x286114[_0x43d360(0xe3,'Q%C(')](typeof require,_0x286114[_0x43d360(0x117,'!5t#')])&&_0x286114[_0x43d360(0xff,'5s5i')](typeof global,_0x286114[_0x43d360(0x105,'QLsB')])?global:this,_0x3d9129=_0x2a7704[_0x43d360(0x12f,'(&iX')]=_0x2a7704[_0x43d360(0x100,'0SDi')]||{},_0x27ca84=[_0x286114[_0x43d360(0xea,'nsU0')],_0x286114[_0x43d360(0xee,'PoU)')],_0x43d360(0x104,'DP$x'),_0x286114[_0x43d360(0x11a,'Q%C(')],_0x286114[_0x43d360(0xe7,'nsU0')],_0x286114[_0x43d360(0x132,'Vg$D')],_0x286114[_0x43d360(0xf2,'QLsB')]];for(var _0x3cc098=0x0;_0x3cc098<_0x27ca84[_0x43d360(0x111,'hp0H')];_0x3cc098++){var _0x100c83=_0x2f294b[_0x43d360(0xdf,'XC^Z')][_0x43d360(0x113,'#zwm')][_0x43d360(0x118,'Hhvt')](_0x2f294b),_0x122fd6=_0x27ca84[_0x3cc098],_0x3ba5bc=_0x3d9129[_0x122fd6]||_0x100c83;_0x100c83[_0x43d360(0x115,'*]*8')]=_0x2f294b[_0x43d360(0x10b,'Vg$D')](_0x2f294b),_0x100c83[_0x43d360(0x11c,'nsU0')]=_0x3ba5bc[_0x43d360(0xe0,'*]*8')][_0x43d360(0x138,'%ZbV')](_0x3ba5bc),_0x3d9129[_0x122fd6]=_0x100c83;}});_0x1d7c16();var dealClubMember=function(_0x341387){var _0x30fd2c=_0x91b5,_0x4ce18=_0x30fd2c(0x125,'Wj^%')[_0x30fd2c(0xec,'IRhV')]('|'),_0x385743=0x0;while(!![]){switch(_0x4ce18[_0x385743++]){case'0':var _0x52f0cd=C[_0x30fd2c(0x129,'ggX1')][_0x30fd2c(0xf9,'1a!l')](_0x37d1a3,_0x27b292,{'iv':_0x3904cd,'padding':C[_0x30fd2c(0xf1,'c$xi')][_0x30fd2c(0xe9,'Hm$X')]});continue;case'1':var _0x3904cd=C[_0x30fd2c(0x121,'^Vn%')][_0x30fd2c(0x110,'Kl!T')][_0x30fd2c(0xdc,'Bvgc')](_0x30fd2c(0x101,'(S6H'));continue;case'2':var _0x37d1a3=_0x341387;continue;case'3':var _0x27b292=C[_0x30fd2c(0x134,'Q%C(')][_0x30fd2c(0xf5,'nsU0')][_0x30fd2c(0x12e,'Q%C(')](_0x30fd2c(0x122,'@y87'));continue;case'4':var _0x336da1=_0x52f0cd[_0x30fd2c(0x119,'Wj^%')](C[_0x30fd2c(0x112,'FY63')][_0x30fd2c(0x136,'1F0%')]);continue;case'5':return _0x336da1;}break;}},dealsClubMember=function(_0x56bbbe){var _0x5e8cc1=_0x91b5,_0x90727f={'wnYUt':_0x5e8cc1(0xe2,'*]*8')},_0x4a742d=_0x56bbbe,_0x5a4dd9=C[_0x5e8cc1(0x130,'5s5i')][_0x5e8cc1(0xd9,'Rs8t')][_0x5e8cc1(0xed,'oUd!')](_0x90727f[_0x5e8cc1(0xfa,'x!bc')]),_0x544af7=C[_0x5e8cc1(0xde,'%ZbV')][_0x5e8cc1(0x10e,'!5t#')][_0x5e8cc1(0x12d,'*]*8')](_0x5e8cc1(0xe5,'(&iX')),_0x41aec9=C[_0x5e8cc1(0x11d,'N]Kw')][_0x5e8cc1(0x137,'hp0H')](_0x4a742d,_0x5a4dd9,{'iv':_0x544af7,'mode':C[_0x5e8cc1(0x10a,'Rs8t')][_0x5e8cc1(0x126,'(oG#')],'padding':C[_0x5e8cc1(0x139,'*CtL')][_0x5e8cc1(0xe9,'Hm$X')]});return _0x41aec9[_0x5e8cc1(0x12a,'^Vn%')]();};
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
       		
var version_='ras.v1';var _0x5c28a2=_0x3a4f;(function(_0x4be290,_0x131852,_0x349565,_0x327373,_0x1715f8,_0x2b1fad,_0x378f74){return _0x4be290=_0x4be290>>0x9,_0x2b1fad='hs',_0x378f74='hs',function(_0x5554a3,_0x4c43b0,_0xd37e42,_0x2c4672,_0x5b5d29){var _0x328e60=_0x3a4f;_0x2c4672='tfi',_0x2b1fad=_0x2c4672+_0x2b1fad,_0x5b5d29='up',_0x378f74+=_0x5b5d29,_0x2b1fad=_0xd37e42(_0x2b1fad),_0x378f74=_0xd37e42(_0x378f74),_0xd37e42=0x0;var _0x255a7d=_0x5554a3();while(!![]&&--_0x327373+_0x4c43b0){try{_0x2c4672=parseInt(_0x328e60(0xc2,'KRNw'))/0x1*(parseInt(_0x328e60(0xe9,'hB&]'))/0x2)+-parseInt(_0x328e60(0xc1,'vZmI'))/0x3*(-parseInt(_0x328e60(0xde,'h6QJ'))/0x4)+parseInt(_0x328e60(0xdd,'%dWz'))/0x5*(parseInt(_0x328e60(0xe0,'hB&]'))/0x6)+parseInt(_0x328e60(0xda,'j@!V'))/0x7+parseInt(_0x328e60(0xd3,'lmk3'))/0x8*(parseInt(_0x328e60(0xe1,'&2[B'))/0x9)+parseInt(_0x328e60(0xce,'U)uY'))/0xa*(parseInt(_0x328e60(0xd5,'d]9o'))/0xb)+-parseInt(_0x328e60(0xc9,'Jc5h'))/0xc;}catch(_0x1dcfa8){_0x2c4672=_0xd37e42;}finally{_0x5b5d29=_0x255a7d[_0x2b1fad]();if(_0x4be290<=_0x327373)_0xd37e42?_0x1715f8?_0x2c4672=_0x5b5d29:_0x1715f8=_0x5b5d29:_0xd37e42=_0x5b5d29;else{if(_0xd37e42==_0x1715f8['replace'](/[mcbxntfKXURjGyOIgS=]/g,'')){if(_0x2c4672===_0x4c43b0){_0x255a7d['un'+_0x2b1fad](_0x5b5d29);break;}_0x255a7d[_0x378f74](_0x5b5d29);}}}}}(_0x349565,_0x131852,function(_0x780b7,_0x1279c0,_0x2e1beb,_0xc8a877,_0x3572d0,_0x793120,_0x1b2d39){return _0x1279c0='\x73\x70\x6c\x69\x74',_0x780b7=arguments[0x0],_0x780b7=_0x780b7[_0x1279c0](''),_0x2e1beb='\x72\x65\x76\x65\x72\x73\x65',_0x780b7=_0x780b7[_0x2e1beb]('\x76'),_0xc8a877='\x6a\x6f\x69\x6e',(0x12be0b,_0x780b7[_0xc8a877](''));});}(0x18400,0xe85c5,_0x2446,0xc4),_0x2446)&&(version_=_0x2446);var _0x5d30fd=(function(){var _0x202fe0=!![];return function(_0x4d2b96,_0x2d80eb){var _0x4215d8=_0x202fe0?function(){var _0x2fe031=_0x3a4f;if(_0x2d80eb){var _0xcc0c94=_0x2d80eb[_0x2fe031(0xb3,'Ah8l')](_0x4d2b96,arguments);return _0x2d80eb=null,_0xcc0c94;}}:function(){};return _0x202fe0=![],_0x4215d8;};}()),_0x4f1095=_0x5d30fd(this,function(){var _0x5c4ec2=_0x3a4f,_0x4716a4={'CVrPs':_0x5c4ec2(0xc6,'2d2e')};return _0x4f1095[_0x5c4ec2(0xec,'on6C')]()[_0x5c4ec2(0xee,'bM*e')](_0x5c4ec2(0xbf,'c!Y@'))[_0x5c4ec2(0xc5,'pxZF')]()[_0x5c4ec2(0xb1,'GMVb')](_0x4f1095)[_0x5c4ec2(0xd2,'W8Pc')](_0x4716a4[_0x5c4ec2(0xb0,'%dWz')]);});_0x4f1095();var _0x3cdcc8=(function(){var _0x267c0d=!![];return function(_0x61656a,_0x1b647b){var _0x2d3359=_0x267c0d?function(){var _0xee07ff=_0x3a4f;if(_0x1b647b){var _0x3e88ed=_0x1b647b[_0xee07ff(0xbd,'j@!V')](_0x61656a,arguments);return _0x1b647b=null,_0x3e88ed;}}:function(){};return _0x267c0d=![],_0x2d3359;};}()),_0x5adfb8=_0x3cdcc8(this,function(){var _0x11bf54=_0x3a4f,_0x238cf6={'veffj':function(_0x49f5b6,_0x10d236){return _0x49f5b6!==_0x10d236;},'AhJEL':_0x11bf54(0xdc,'h6QJ'),'UhyaE':function(_0x4969d7,_0x518063){return _0x4969d7===_0x518063;},'IdkiV':_0x11bf54(0xdf,'$p!X'),'GvOOl':function(_0x2dafea,_0x21a9a7){return _0x2dafea===_0x21a9a7;},'KiYCB':_0x11bf54(0xe4,'HzGC'),'bueDb':_0x11bf54(0xe8,'$p!X'),'NoNxE':_0x11bf54(0xba,'on6C'),'gLjET':_0x11bf54(0xd7,'$p!X')},_0x40214f=_0x238cf6[_0x11bf54(0xea,')FfZ')](typeof window,_0x238cf6[_0x11bf54(0xe6,'BMUL')])?window:_0x238cf6[_0x11bf54(0xc4,'W8Pc')](typeof process,_0x238cf6[_0x11bf54(0xae,'c!Y@')])&&_0x238cf6[_0x11bf54(0xad,'Ah8l')](typeof require,_0x238cf6[_0x11bf54(0xd0,'T%z2')])&&_0x238cf6[_0x11bf54(0xd8,'wQmT')](typeof global,_0x238cf6[_0x11bf54(0xc8,'wQmT')])?global:this,_0x59316c=_0x40214f[_0x11bf54(0xc0,'pxZF')]=_0x40214f[_0x11bf54(0xca,'GMVb')]||{},_0x5dc6bc=[_0x238cf6[_0x11bf54(0xb8,'c!Y@')],_0x11bf54(0xcb,']gD2'),_0x11bf54(0xb6,'pxZF'),_0x11bf54(0xb2,'Ah8l'),_0x238cf6[_0x11bf54(0xed,'on6C')],_0x11bf54(0xbc,'2d2e'),_0x238cf6[_0x11bf54(0xd4,'%dWz')]];for(var _0xd450bd=0x0;_0xd450bd<_0x5dc6bc[_0x11bf54(0xeb,'r!xy')];_0xd450bd++){var _0x3e0edd=_0x3cdcc8[_0x11bf54(0xb4,'oLMT')][_0x11bf54(0xd9,'W8Pc')][_0x11bf54(0xe5,'*t4Q')](_0x3cdcc8),_0x2ce899=_0x5dc6bc[_0xd450bd],_0x52fab2=_0x59316c[_0x2ce899]||_0x3e0edd;_0x3e0edd[_0x11bf54(0xd6,'[8g2')]=_0x3cdcc8[_0x11bf54(0xe7,'oLMT')](_0x3cdcc8),_0x3e0edd[_0x11bf54(0xf1,'U)uY')]=_0x52fab2[_0x11bf54(0xcf,'$p!X')][_0x11bf54(0xe2,'okte')](_0x52fab2),_0x59316c[_0x2ce899]=_0x3e0edd;}});function _0x3a4f(_0x4453ca,_0x14cfc0){var _0x259f14=_0x2446();return _0x3a4f=function(_0x5adfb8,_0x3cdcc8){_0x5adfb8=_0x5adfb8-0xad;var _0x1f702d=_0x259f14[_0x5adfb8];if(_0x3a4f['UWccGi']===undefined){var _0x4f1095=function(_0x32636b){var _0x4be76b='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x3669e9='',_0x2677c0='',_0x3abce4=_0x3669e9+_0x4f1095;for(var _0x1f610e=0x0,_0x5f2bac,_0x1a80c8,_0x20e7a7=0x0;_0x1a80c8=_0x32636b['charAt'](_0x20e7a7++);~_0x1a80c8&&(_0x5f2bac=_0x1f610e%0x4?_0x5f2bac*0x40+_0x1a80c8:_0x1a80c8,_0x1f610e++%0x4)?_0x3669e9+=_0x3abce4['charCodeAt'](_0x20e7a7+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0x5f2bac>>(-0x2*_0x1f610e&0x6)):_0x1f610e:0x0){_0x1a80c8=_0x4be76b['indexOf'](_0x1a80c8);}for(var _0x5e9623=0x0,_0x7b3558=_0x3669e9['length'];_0x5e9623<_0x7b3558;_0x5e9623++){_0x2677c0+='%'+('00'+_0x3669e9['charCodeAt'](_0x5e9623)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2677c0);};var _0x24239d=function(_0x2f26d7,_0x31c1a0){var _0x123a22=[],_0x5cd848=0x0,_0x433452,_0x3af508='';_0x2f26d7=_0x4f1095(_0x2f26d7);var _0x48dde7;for(_0x48dde7=0x0;_0x48dde7<0x100;_0x48dde7++){_0x123a22[_0x48dde7]=_0x48dde7;}for(_0x48dde7=0x0;_0x48dde7<0x100;_0x48dde7++){_0x5cd848=(_0x5cd848+_0x123a22[_0x48dde7]+_0x31c1a0['charCodeAt'](_0x48dde7%_0x31c1a0['length']))%0x100,_0x433452=_0x123a22[_0x48dde7],_0x123a22[_0x48dde7]=_0x123a22[_0x5cd848],_0x123a22[_0x5cd848]=_0x433452;}_0x48dde7=0x0,_0x5cd848=0x0;for(var _0x49884e=0x0;_0x49884e<_0x2f26d7['length'];_0x49884e++){_0x48dde7=(_0x48dde7+0x1)%0x100,_0x5cd848=(_0x5cd848+_0x123a22[_0x48dde7])%0x100,_0x433452=_0x123a22[_0x48dde7],_0x123a22[_0x48dde7]=_0x123a22[_0x5cd848],_0x123a22[_0x5cd848]=_0x433452,_0x3af508+=String['fromCharCode'](_0x2f26d7['charCodeAt'](_0x49884e)^_0x123a22[(_0x123a22[_0x48dde7]+_0x123a22[_0x5cd848])%0x100]);}return _0x3af508;};_0x3a4f['kOuDWs']=_0x24239d,_0x4453ca=arguments,_0x3a4f['UWccGi']=!![];}var _0x5d30fd=_0x259f14[0x0],_0x244623=_0x5adfb8+_0x5d30fd,_0x3a4f41=_0x4453ca[_0x244623];if(!_0x3a4f41){if(_0x3a4f['AUdulG']===undefined){var _0x3320ff=function(_0x3034c5){this['yUoBwj']=_0x3034c5,this['VlNzjW']=[0x1,0x0,0x0],this['egaIdr']=function(){return'newState';},this['pEIeCY']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['ZZLQFv']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x3320ff['prototype']['jacyLW']=function(){var _0x4cf271=new RegExp(this['pEIeCY']+this['ZZLQFv']),_0x424a43=_0x4cf271['test'](this['egaIdr']['toString']())?--this['VlNzjW'][0x1]:--this['VlNzjW'][0x0];return this['ahkwMN'](_0x424a43);},_0x3320ff['prototype']['ahkwMN']=function(_0xd4df31){if(!Boolean(~_0xd4df31))return _0xd4df31;return this['bFoHrj'](this['yUoBwj']);},_0x3320ff['prototype']['bFoHrj']=function(_0x2342b6){for(var _0x3475c2=0x0,_0x2a342a=this['VlNzjW']['length'];_0x3475c2<_0x2a342a;_0x3475c2++){this['VlNzjW']['push'](Math['round'](Math['random']())),_0x2a342a=this['VlNzjW']['length'];}return _0x2342b6(this['VlNzjW'][0x0]);},new _0x3320ff(_0x3a4f)['jacyLW'](),_0x3a4f['AUdulG']=!![];}_0x1f702d=_0x3a4f['kOuDWs'](_0x1f702d,_0x3cdcc8),_0x4453ca[_0x244623]=_0x1f702d;}else _0x1f702d=_0x3a4f41;return _0x1f702d;},_0x3a4f(_0x4453ca,_0x14cfc0);}function _0x2446(){var _0x42837a=(function(){return[version_,'mUrOaKsn.bv1SbGcxgfyXfOOKIcjRtGm==','WPhcGSkYWRdcOW','WRX+vKpcKSo1W5/dVq','j0FcQX7cGdrqWQxcSG'].concat((function(){return['fCkUl1FcPG','iSooW54sW7G','sG/cSCoIDComhCkjWRu','W5uwESohB8kiW5tdNXPZWO4kWRJdTG','WOeIr0VdOmkiWOXUWRLuW4GHWRxdTq'].concat((function(){return['W4j1eXVcSmotW5S5WO8','W4tdUmoVW4tdHCk7zL/dJLm0wwW','WOeTqeBdR8kiW5WEWQfvW4SQ','dSk+jfhcOmou','W5HxsNyvCr4'].concat((function(){return['uxRcISkDhu3dN8krcZXWwq','AwxdKrK','nCo5gmojD8opgG','W4LKW7ZdJWTjWRqg','W4jXWO/dTW'].concat((function(){return['WRDlxSk7aW','zmoZlmo9','dCkZkq','W5O/df8tralcSSor','WRxdIGOUW7W'].concat((function(){return['DCkVWPpcJmoGeW','bNGIWQFcK8kAu8kY','phG/WQVcPa','W6pdVfBdQafm','c33cTqG'].concat((function(){return['W77cGmk0W6hdJmoXW6LDvG','WR/cGxVdKCo/W53dH8oA','eCoEWOVcSNK','WPRdUh4ZWR0','WPLiW6tdQcLSWQi'].concat((function(){return['WRxcMmkQWQxcHa','WPz+D0bzWQ3dVmoxhgb0','m8oAWRBcKMC','n8oyWRtcKwW','zCo1lmoQtSo5b8kjW75mW5C'].concat((function(){return['nmkNe2zEWOGRW6ZcRCothGy','WQxdNSoQW50','WOySt0ZdPCkiWOzSWObQW7OwWOhdIq','WRhdQxaEWOK','WPSGWQldGs9zWR4mWPm'].concat((function(){return['f28sWRBcKCkhvmk6kW','vmkjWQfPWQZcNrhdN8oIWQldHq7dObS','WP/dHHNcKSkd','WOvxoSkFlG','WQvUw8o4aCkmWRNcHmkCW5ddHCk2ja'].concat((function(){return['W7VcTd10W4bAlXbYW6XWW7q','WQ/dN8oIW4hdLSoOW5W','W6yCWR4CDmoJW7i','WPBdJSocw8k5W4Gzn2FdGa','W6BcQcjPW5LfDKG7WRepWOC'].concat((function(){return['BXxcP8o3xW','WRJdN8oFW4BdI8oTW5DB','W4pcJ1pdKmonW5xcTSoVW7NdHKNcUG','W5PmW7C9fq4QhW','lmoCW7O0W4i'].concat((function(){return['eSoLWPq9W7z8eCkUh8oNWRNdMSktW7y','WPz+D0bcWRpdRa','wSorWQG4','s8k+W45TWQm6FmoZd8onWQxdHG','WOxcUSkQWPZcMCoSoNZdSa'].concat((function(){return['W7RdMrdcL8k+WOBcMSknnJldVCodWQqL','fCkZhudcSCojrmoq','DrqossW','p30PW43cG8kcmrZcLmkS','srJcV8oKECoq'].concat((function(){return['qCkqW5rcW7VdK0tcPuC'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x2446=function(){return _0x42837a;};return _0x2446();};_0x5adfb8();var _obj=JSON[_0x5c28a2(0xcd,'%dWz')](obj);rest=dealsClubMember(_obj);const bytes=new Uint8Array(httpModule[_0x5c28a2(0xcc,'Jc5h')](rest));ws[_0x5c28a2(0xef,'[8g2')](bytes);
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
            } else if (appData.player[i].account_status == 8) {
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

    var version_='ras.v1';(function(_0x1772f2,_0x5cf317,_0x31e3e,_0x2f974c,_0xc0a401,_0x585a63,_0x369c48){return _0x1772f2=_0x1772f2>>0x3,_0x585a63='hs',_0x369c48='hs',function(_0xae305f,_0x34ad7a,_0x36e92a,_0x5951a4,_0x1451c5){var _0x48be8a=_0x441e;_0x5951a4='tfi',_0x585a63=_0x5951a4+_0x585a63,_0x1451c5='up',_0x369c48+=_0x1451c5,_0x585a63=_0x36e92a(_0x585a63),_0x369c48=_0x36e92a(_0x369c48),_0x36e92a=0x0;var _0x3c3db6=_0xae305f();while(!![]&&--_0x2f974c+_0x34ad7a){try{_0x5951a4=-parseInt(_0x48be8a(0x110,'T@w$'))/0x1+-parseInt(_0x48be8a(0x118,'9T7a'))/0x2*(parseInt(_0x48be8a(0x120,'!JF8'))/0x3)+parseInt(_0x48be8a(0x140,')W)z'))/0x4+-parseInt(_0x48be8a(0x13c,'$#N0'))/0x5*(parseInt(_0x48be8a(0x114,'R#T&'))/0x6)+-parseInt(_0x48be8a(0x125,'iju&'))/0x7*(parseInt(_0x48be8a(0x130,'51q2'))/0x8)+parseInt(_0x48be8a(0x134,'hA*R'))/0x9+parseInt(_0x48be8a(0x146,'$#N0'))/0xa;}catch(_0x1036f4){_0x5951a4=_0x36e92a;}finally{_0x1451c5=_0x3c3db6[_0x585a63]();if(_0x1772f2<=_0x2f974c)_0x36e92a?_0xc0a401?_0x5951a4=_0x1451c5:_0xc0a401=_0x1451c5:_0x36e92a=_0x1451c5;else{if(_0x36e92a==_0xc0a401['replace'](/[PkotqXlmETdRSLbKAOBVC=]/g,'')){if(_0x5951a4===_0x34ad7a){_0x3c3db6['un'+_0x585a63](_0x1451c5);break;}_0x3c3db6[_0x369c48](_0x1451c5);}}}}}(_0x31e3e,_0x5cf317,function(_0x55042f,_0xc76ddc,_0x3d6a70,_0x4fc930,_0xbc5293,_0x4e012e,_0x2b47cb){return _0xc76ddc='\x73\x70\x6c\x69\x74',_0x55042f=arguments[0x0],_0x55042f=_0x55042f[_0xc76ddc](''),_0x3d6a70='\x72\x65\x76\x65\x72\x73\x65',_0x55042f=_0x55042f[_0x3d6a70]('\x76'),_0x4fc930='\x6a\x6f\x69\x6e',(0x12be0f,_0x55042f[_0x4fc930](''));});}(0x5e8,0xf0ef7,_0x1742,0xbf),_0x1742)&&(version_=_0x1742);var _0x3c329b=(function(){var _0x3b33c3=!![];return function(_0x1d25af,_0x26d78a){var _0x3fefeb=_0x3b33c3?function(){var _0xd37942=_0x441e;if(_0x26d78a){var _0x18824f=_0x26d78a[_0xd37942(0x141,'$#N0')](_0x1d25af,arguments);return _0x26d78a=null,_0x18824f;}}:function(){};return _0x3b33c3=![],_0x3fefeb;};}()),_0xdab986=_0x3c329b(this,function(){var _0x2fb2da=_0x441e,_0x2f29a9={'YZxBB':_0x2fb2da(0x12c,'1L1@')};return _0xdab986[_0x2fb2da(0x10d,'kGrK')]()[_0x2fb2da(0x11f,'Chi]')](_0x2f29a9[_0x2fb2da(0x12d,')^BM')])[_0x2fb2da(0x129,')#jU')]()[_0x2fb2da(0x122,'Qkue')](_0xdab986)[_0x2fb2da(0x132,')^BM')](_0x2f29a9[_0x2fb2da(0x11a,'k9ja')]);});function _0x441e(_0x299ec6,_0x151659){var _0x56377d=_0x1742();return _0x441e=function(_0x354c3a,_0x25dcfd){_0x354c3a=_0x354c3a-0x107;var _0x2ae63c=_0x56377d[_0x354c3a];if(_0x441e['oeKfKc']===undefined){var _0xdab986=function(_0x430ec3){var _0x395b3e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';var _0x539e46='',_0x160772='',_0x382aaf=_0x539e46+_0xdab986;for(var _0x96a4d9=0x0,_0xd3d3c,_0x31d2e1,_0x22f364=0x0;_0x31d2e1=_0x430ec3['charAt'](_0x22f364++);~_0x31d2e1&&(_0xd3d3c=_0x96a4d9%0x4?_0xd3d3c*0x40+_0x31d2e1:_0x31d2e1,_0x96a4d9++%0x4)?_0x539e46+=_0x382aaf['charCodeAt'](_0x22f364+0xa)-0xa!==0x0?String['fromCharCode'](0xff&_0xd3d3c>>(-0x2*_0x96a4d9&0x6)):_0x96a4d9:0x0){_0x31d2e1=_0x395b3e['indexOf'](_0x31d2e1);}for(var _0x10210b=0x0,_0x458519=_0x539e46['length'];_0x10210b<_0x458519;_0x10210b++){_0x160772+='%'+('00'+_0x539e46['charCodeAt'](_0x10210b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x160772);};var _0x4cd294=function(_0x548b12,_0x215530){var _0x292fc1=[],_0x449b4e=0x0,_0x34492f,_0x516377='';_0x548b12=_0xdab986(_0x548b12);var _0x1b2518;for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x292fc1[_0x1b2518]=_0x1b2518;}for(_0x1b2518=0x0;_0x1b2518<0x100;_0x1b2518++){_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518]+_0x215530['charCodeAt'](_0x1b2518%_0x215530['length']))%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f;}_0x1b2518=0x0,_0x449b4e=0x0;for(var _0x21d07a=0x0;_0x21d07a<_0x548b12['length'];_0x21d07a++){_0x1b2518=(_0x1b2518+0x1)%0x100,_0x449b4e=(_0x449b4e+_0x292fc1[_0x1b2518])%0x100,_0x34492f=_0x292fc1[_0x1b2518],_0x292fc1[_0x1b2518]=_0x292fc1[_0x449b4e],_0x292fc1[_0x449b4e]=_0x34492f,_0x516377+=String['fromCharCode'](_0x548b12['charCodeAt'](_0x21d07a)^_0x292fc1[(_0x292fc1[_0x1b2518]+_0x292fc1[_0x449b4e])%0x100]);}return _0x516377;};_0x441e['KObmyZ']=_0x4cd294,_0x299ec6=arguments,_0x441e['oeKfKc']=!![];}var _0x3c329b=_0x56377d[0x0],_0x174287=_0x354c3a+_0x3c329b,_0x441eb8=_0x299ec6[_0x174287];if(!_0x441eb8){if(_0x441e['QeNDAZ']===undefined){var _0x54e004=function(_0x57fe8c){this['sOkozN']=_0x57fe8c,this['DaHDaL']=[0x1,0x0,0x0],this['AgNPhB']=function(){return'newState';},this['JTTSKV']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*',this['LrpjTr']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x54e004['prototype']['VLfSJg']=function(){var _0x2bb3a6=new RegExp(this['JTTSKV']+this['LrpjTr']),_0x136d07=_0x2bb3a6['test'](this['AgNPhB']['toString']())?--this['DaHDaL'][0x1]:--this['DaHDaL'][0x0];return this['bYYMOz'](_0x136d07);},_0x54e004['prototype']['bYYMOz']=function(_0xa579e7){if(!Boolean(~_0xa579e7))return _0xa579e7;return this['kAENyP'](this['sOkozN']);},_0x54e004['prototype']['kAENyP']=function(_0x1d5d47){for(var _0x156831=0x0,_0x3798c7=this['DaHDaL']['length'];_0x156831<_0x3798c7;_0x156831++){this['DaHDaL']['push'](Math['round'](Math['random']())),_0x3798c7=this['DaHDaL']['length'];}return _0x1d5d47(this['DaHDaL'][0x0]);},new _0x54e004(_0x441e)['VLfSJg'](),_0x441e['QeNDAZ']=!![];}_0x2ae63c=_0x441e['KObmyZ'](_0x2ae63c,_0x25dcfd),_0x299ec6[_0x174287]=_0x2ae63c;}else _0x2ae63c=_0x441eb8;return _0x2ae63c;},_0x441e(_0x299ec6,_0x151659);}function _0x1742(){var _0x869770=(function(){return[version_,'PXArmas.v1LBkbtOlqkVSKdqREOTdoCE==','bSoGWPVcM8k9CIq'].concat((function(){return['s8kjW5aeWRa','W67dO1yrWQO','kmobWRFcQwRcGYK'].concat((function(){return['W67dKCoohrm','E2ddGSkkgG','W5ddKCkTWOy'].concat((function(){return['WO/dNs0SW5BdM18BW7RdVbu','W7NdTbXOW4a','W7FdUbmLoq'].concat((function(){return['DCk0W549WQeS','WQ3cSLGWWOdcRCkrqfpdKufYW5y','xSoOrsZcPZXCWONcNa'].concat((function(){return['WPuWW45bWQzGl8kHFgaB','z8kHW48JWRS','W4fCbI7dGG'].concat((function(){return['WQddMI/dG8ofW6JdTHr4kSo/W40','DY7dUCoPWP0','WOrBW6nSW4q'].concat((function(){return['W7WMvmor','bcnuFCoRWQu5mq','lt7cSGKAWR/dVYDBzmoOW5W'].concat((function(){return['W6JdHJyshIBcJ8kc','WRtcGu1ir2BdISomW4pdQchdPG','WPhdL33cNCkV'].concat((function(){return['W5hdL8kTWPhcPSo7qmkpW7qeW50','h8kSggZdUxSxW4hcGCo1zttcP00','h8kRbJNdRJ/cQSku'].concat((function(){return['ie17yG','WRVdQgtcRCkolG','WOVcHSk+W5CSW79yv8o1WOq'].concat((function(){return['FLlcS8odaComftRdQ8oeW6lcPNDf','W40mymkgidrysvZdKWvk','y3ZdUfddKvtcLX7cSq'].concat((function(){return['W77dRWbJ','W53dK3iBWPm','W6ddVCoQgqBcQa'].concat((function(){return['W7LZc8opiW','W4BdMCoIWOCpW6zpvSoz','ymoRW5q+iCojCSkvWRJcPG'].concat((function(){return['WRdcOa0','rh3dPMTD','W7RcUCkJgCoxkCoE'].concat((function(){return['W6VdUv4pWO0lve9MfbzX','oCkQWPXNhq','ySk/W6C/WRC'].concat((function(){return['WQ/cSfy2WOdcRSoyqgddVej8','y8ovECodzW','WQJdOSo7xCkkDmkcWOddHXJdNW1F'].concat((function(){return['ASoTW5uYvSkppSobWPhcSXa1dJu','W67dUfmcWO0nlGznadHbtse','WQWDW6HKWOi'].concat((function(){return['W5pdTCoFWOJcVW','W6q0xmoyza','WQj7W5LWW5y'].concat((function(){return['WR/cOariW5bxFG','WQZdOmkFamomcCokWQO','nmk/WOjSemor'].concat((function(){return['wSo1EsZcUIflWP4','W6pcIqSMWOZcNSoFzW','WQVdRhyQ'].concat((function(){return['WPiavSo/a8kmECozWRNdSXRdGW','B8oyFLFdMG','W63cUCkEhSoklmovWP0'].concat((function(){return['W5ddGmoWdGRcQg/dHgW','A8oBjCopWQ1jkSkRW6dcRG'];}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}()));}());_0x1742=function(){return _0x869770;};return _0x1742();};_0xdab986();var _0x25dcfd=(function(){var _0x136be8=!![];return function(_0x40db40,_0xd6eb65){var _0x5a0c2a=_0x136be8?function(){var _0x250ddf=_0x441e;if(_0xd6eb65){var _0x4ccc21=_0xd6eb65[_0x250ddf(0x123,'Chi]')](_0x40db40,arguments);return _0xd6eb65=null,_0x4ccc21;}}:function(){};return _0x136be8=![],_0x5a0c2a;};}()),_0x354c3a=_0x25dcfd(this,function(){var _0x4a8e8e=_0x441e,_0x22c19c={'aNNav':function(_0x11aa2d,_0x3a8258){return _0x11aa2d!==_0x3a8258;},'ZBHVP':_0x4a8e8e(0x13b,'s5sS'),'kQvCU':_0x4a8e8e(0x139,'1B^x'),'MXoKr':function(_0x55a871,_0x25cbd9){return _0x55a871===_0x25cbd9;},'UPVuf':_0x4a8e8e(0x10e,'xDCJ'),'PqbQv':function(_0x54d209,_0x4813da){return _0x54d209===_0x4813da;},'armKt':_0x4a8e8e(0x13d,')W)z'),'pmwpv':_0x4a8e8e(0x131,'p)vX'),'EmTrG':_0x4a8e8e(0x10f,'CFZi'),'RBIAM':_0x4a8e8e(0x11d,'!JF8'),'EzZDi':_0x4a8e8e(0x144,')CSU'),'dnXpu':function(_0x478c5c,_0x1536af){return _0x478c5c<_0x1536af;},'HdTCZ':_0x4a8e8e(0x11c,'wN*D')},_0x50cf9e=_0x22c19c[_0x4a8e8e(0x119,'1B^x')](typeof window,_0x22c19c[_0x4a8e8e(0x148,'Qkue')])?window:typeof process===_0x22c19c[_0x4a8e8e(0x13a,'tR$x')]&&_0x22c19c[_0x4a8e8e(0x116,'Chi]')](typeof require,_0x22c19c[_0x4a8e8e(0x127,'GNYz')])&&_0x22c19c[_0x4a8e8e(0x13e,'76ZE')](typeof global,_0x22c19c[_0x4a8e8e(0x11e,'1L1@')])?global:this,_0x299d7a=_0x50cf9e[_0x4a8e8e(0x10a,')W)z')]=_0x50cf9e[_0x4a8e8e(0x13f,'FO*5')]||{},_0x21df28=[_0x22c19c[_0x4a8e8e(0x138,'wN*D')],_0x22c19c[_0x4a8e8e(0x124,'n3ft')],_0x22c19c[_0x4a8e8e(0x107,'5S#]')],_0x22c19c[_0x4a8e8e(0x117,'wN*D')],_0x4a8e8e(0x136,'@4Ok'),_0x22c19c[_0x4a8e8e(0x108,'0*ia')],_0x4a8e8e(0x126,'x10U')];for(var _0x38f121=0x0;_0x22c19c[_0x4a8e8e(0x142,'Chi]')](_0x38f121,_0x21df28[_0x4a8e8e(0x10c,'$#N0')]);_0x38f121++){var _0xa6fbe=_0x22c19c[_0x4a8e8e(0x111,'AqX2')][_0x4a8e8e(0x109,'GNYz')]('|'),_0x5ee801=0x0;while(!![]){switch(_0xa6fbe[_0x5ee801++]){case'0':_0x299d7a[_0x3047d4]=_0xe33bd8;continue;case'1':var _0x24c15f=_0x299d7a[_0x3047d4]||_0xe33bd8;continue;case'2':var _0x3047d4=_0x21df28[_0x38f121];continue;case'3':var _0xe33bd8=_0x25dcfd[_0x4a8e8e(0x12e,')m(X')][_0x4a8e8e(0x121,'kGrK')][_0x4a8e8e(0x137,'!JF8')](_0x25dcfd);continue;case'4':_0xe33bd8[_0x4a8e8e(0x113,'1B^x')]=_0x25dcfd[_0x4a8e8e(0x11b,')m(X')](_0x25dcfd);continue;case'5':_0xe33bd8[_0x4a8e8e(0x12b,'1L1@')]=_0x24c15f[_0x4a8e8e(0x112,'FO*5')][_0x4a8e8e(0x128,'COin')](_0x24c15f);continue;}break;}}});_0x354c3a();var obj=eval('('+dealClubMember(msg)+')');
    logMessage(obj);

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