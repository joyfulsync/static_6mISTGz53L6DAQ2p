var codesrc = '';

 // $(".auto-ready13").after('<img src="http://res.hongloushangcheng.com/allbucket/xindasheng/xincommon/files/images/common/btn_qrcode.png" onclick="makeQrCode()" style="position: fixed;right: 2.5rem;width: 0.3rem;z-index: 0;bottom: 1.3vh;" />');

 $("#copy_btn").after('<div id="qrcode" style="display: none;position: fixed; top: 0;left: 0;width: 100%;height: 100%;z-index: 111"><div style="background: rgba(0,0,0,0.5);position: fixed;top: 0;left: 0;width: 100%;height: 100%;" onclick="hideQrCode()"></div><div style="position: relative;width: 64vw;height: 80vw;left: 50%;top: 50%;transform: translate(-50%, -50%);border: .0096rem solid #919191;-webkit-border-radius: .096rem;-moz-border-radius: .096rem;border-radius: .096rem;transition: display 1s;background-color: rgba(255,255,255,.2);"><div><span style="position:absolute;top: 0.1rem;left: 50%;transform: translateX(-50%); width: 70vw;text-align: center; color: #fff;font-size: 18px;">二维码</span><div id="divOne"></div><img id="imgOne" style="width: 50vw; height:50vw; box-sizing: border-box;position: absolute;overflow: scroll;background: #fff;border-radius: 4px;left: 50%;top: 48%;transform: translate(-50%,-50%);" /><span style="position:absolute;bottom: 0.25rem;left: 50%;transform: translateX(-50%); width: 70vw;text-align: center; color: #fff;font-size: 16px;">长按二维码发送</span></div></div></div>');

 $.getScript("http://res.hongloushangcheng.com/allbucket/xindasheng/xincommon/files/js/jquery.qrcode.min.js");

document.getElementById("copy_btn").addEventListener('click', function(){
    let str = '房间:(' + globalData.roomNumber  +')'
    makeQrCode()
}, false);

function makeQrCode() {
    var _0x49fd2b = window.location.href;
    // console.log("baseUrl",globalData.baseUrl)
    var _0x567b3d = $('#divOne')['qrcode'](utf16to8(_0x49fd2b))['hide']();
    var _0x5e8901 = _0x567b3d['find']('canvas')['get'](0x0);
    codesrc = _0x5e8901['toDataURL']('image/jpg');
    $('#imgOne')['attr']('src', _0x5e8901['toDataURL']('image/jpg'));
    showQrcode();
}

function showQrcode() {
    var _0x41bdb9 = document['getElementById']('qrcode');
    _0x41bdb9['style']['display'] = 'block';
    canvasQr();
}

function hideQrCode() {
    var _0x1b8a45 = document['getElementById']('qrcode');
    _0x1b8a45['style']['display'] = 'none';
}

function canvasQr() {
    liuliuCreateRankingQr(function(_0x991662) {
        var _0x13a1f9 = document['createElement']('img');
        _0x13a1f9['src'] = _0x991662;
        _0x13a1f9['onload'] = function() {
            setTimeout(function() {
                getRankingSixQr();
            }, 0xc8);
        };
    });
};

function getRankingSixQr() {
    var _0x320c7a = {
        'gameId': 0x4
    };
    if (document['getElementsByClassName']('ranking-img')[0x0] && document['getElementsByClassName']('search-number-box')[0x0]) {
        var _0x38bc88 = document['getElementsByClassName']('search-number-box')[0x0];
        var _0x18eae2 = document['getElementsByClassName']('ranking-img')[0x0];
        var _0x3f05e5 = document['getElementsByClassName']('search-number-box-btn')[0x0];
        var _0x9c5455 = _0x23d68e(_0x18eae2)['width'];
        var _0x292a58 = _0x23d68e(_0x18eae2)['height'];
        var _0x234efd = _0x18eae2['offsetWidth'];
        var _0x248a11 = _0x18eae2['offsetHeight'];
        var _0x287def = parseInt(_0x9c5455) / parseInt(_0x292a58) / (parseInt(_0x234efd) / parseInt(_0x248a11));
        alert(_0x320c7a['gameId']);
        if (parseInt(_0x320c7a['gameId']) === 0x3) {
            _0x9b95c3(0xec, 0x4a, 0x1c0, 0x8c);
        } else if (parseInt(_0x320c7a['gameId']) === 0x7) {
            _0x9b95c3(0xec, 0x4a, 0x1b9, 0x96);
        } else if (parseInt(_0x320c7a['gameId']) === 0xe || parseInt(_0x320c7a['gameId']) === 0xf || parseInt(_0x320c7a['gameId']) === 0x10 || parseInt(_0x320c7a['gameId']) === 0x11 || parseInt(_0x320c7a['gameId']) === 0x12 || parseInt(_0x320c7a['gameId']) === 0x13 || parseInt(_0x320c7a['gameId']) === 0x14 || parseInt(_0x320c7a['gameId']) === 0x16 || parseInt(_0x320c7a['gameId']) === 0x17 || parseInt(_0x320c7a['gameId']) === 0x18 || parseInt(_0x320c7a['gameId']) === 0x19) {
            _0x9b95c3(0xd9, 0x49, 0x190, 0xa7);
        } else {
            _0x9b95c3(0xec, 0x4a, 0x1a3, 0x7d);
        }

        function _0x9b95c3(_0x35d478, _0x10482c, _0x4f83d8, _0x3ce2ef) {
            if (_0x287def > 0x1) {
                var _0x59b3a1 = _0x234efd;
                var _0x2d09e2 = _0x292a58 / _0x9c5455 * _0x234efd;
                _0x38bc88['style']['top'] = (_0x248a11 - _0x292a58 / _0x9c5455 * _0x234efd) / 0x2 + 'px';
                _0x38bc88['style']['left'] = '0px';
            } else if (_0x287def < 0x1) {
                var _0x59b3a1 = _0x9c5455 / _0x292a58 * _0x248a11;
                var _0x2d09e2 = _0x248a11;
                _0x38bc88['style']['top'] = '0px';
                _0x38bc88['style']['left'] = (_0x234efd - _0x9c5455 / _0x292a58 * _0x248a11) / 0x2 + 'px';
            } else {
                var _0x59b3a1 = _0x234efd;
                var _0x2d09e2 = _0x248a11;
                _0x38bc88['style']['top'] = '0px';
                _0x38bc88['style']['left'] = '0px';
            }
        }

        function _0x23d68e(_0x56d33d) {
            var _0x3d9bcb = {};
            if (window['naturalWidth'] && window['naturalHeight']) {
                _0x3d9bcb['width'] = _0x56d33d['naturalWidth'];
                _0x3d9bcb['height'] = _0x56d33d['naturalHeight'];
            } else {
                var _0x2da8a9 = new Image();
                _0x2da8a9['src'] = _0x56d33d['src'];
                _0x3d9bcb['width'] = _0x2da8a9['width'];
                _0x3d9bcb['height'] = _0x2da8a9['height'];
            }
            return _0x3d9bcb;
        }
    }
};

function loadimgQr(_0x2bc209, _0x189222, _0x214f88) {
    if (typeof _0x2bc209 == 'string') var _0x2bc209 = [_0x2bc209];
    var _0x4356c9 = [];
    var _0x2d77ca = 0x0;
    var _0x21530b = _0x2bc209[0x0];
    var _0x2433b7 = _0x21530b;
    var _0x5e0ae6 = new Image();
    _0x5e0ae6['src'] = _0x2433b7;
    _0x5e0ae6['onload'] = function() {
        _0x4356c9[0x0] = this;
        _0x2d77ca++;
        if (_0x2d77ca == _0x2bc209['length'] && typeof _0x189222 == 'function') {
            _0x189222(_0x4356c9);
        }
        if (name) {
            var _0x5ecaef = document['createElement']('canvas');
            _0x5ecaef['width'] = this['width'];
            _0x5ecaef['height'] = this['height'];
            _0x5ecaef['getContext']('2d')['drawImage'](this, 0x0, 0x0, this['width'], this['height']);
        }
    };
    _0x5e0ae6['onerror'] = function() {};
    return !![];
}

function liuliuCreateRankingQr(_0x5d7470) {
    var _0x58e518 = {
        'width': window['innerWidth'] || document['documentElement']['clientWidth'] || document['body']['clientWidth'],
        'height': window['innerHeight'] || document['documentElement']['clientHeight'] || document['body']['clientHeight'],
        'version': '1.0.0',
        'ws': {},
        'status': 0x0,
        'readed': 0x0,
        'gameId': 0x0
    };
    var _0x4c74aa = codesrc;
    var _0x279482 = new Image();
    _0x279482['src'] = codesrc;
    loadimgQr(_0x4c74aa, function(_0x4b563c) {
        var _0x194f4d = document['createElement']('canvas');
        _0x194f4d['width'] = 0x12c;
        _0x194f4d['height'] = 0x12c;
        var _0x185042 = _0x194f4d['getContext']('2d');
        _0x185042['fillStyle'] = '#fff';
        _0x185042['fillRect'](0x0, 0x0, 0x12c, 0x154);
        var _0xb36c3e = _0x194f4d['getContext']('2d');
        _0xb36c3e['font'] = '24px\x20微软雅黑';
        _0xb36c3e['textAlign'] = 'center';
        _0xb36c3e['fillStyle'] = '#000';
        console.log('globalData',globalData);
        if (globalData.roomNumber) {
           // if (globalData['shareTitle']) {
              //  _0xb36c3e['fillText'](globalData['shareTitle'] + '(' + globalData['roomNumber'] + ')', 0x96, 0x122);
            //} else {
                _0xb36c3e['fillText'](globalData.hallName+'-'+'房号:('+globalData.roomNumber+')', 0x96, 0x122);
          //  }
        } else {
            _0xb36c3e['fillText'](globalData.shareTitle, 0x96, 0x122);
        }
        _0xb36c3e['drawImage'](_0x279482, 0x1e, 0x10, 0xf0, 0xf0);
        if (typeof _0x5d7470 == 'function') _0x5d7470(_0x194f4d['toDataURL']('image/png'));
        $('#imgOne')['attr']('src', _0x194f4d['toDataURL']('image/jpg'));
    });
}

function utf16to8(_0x34d240) {
    var _0xb60ee1, _0x126d40, _0x236f72, _0xcff665;
    _0xb60ee1 = '';
    _0x236f72 = _0x34d240['length'];
    for (_0x126d40 = 0x0; _0x126d40 < _0x236f72; _0x126d40++) {
        _0xcff665 = _0x34d240['charCodeAt'](_0x126d40);
        if (_0xcff665 >= 0x1 && _0xcff665 <= 0x7f) {
            _0xb60ee1 += _0x34d240['charAt'](_0x126d40);
        } else if (_0xcff665 > 0x7ff) {
            _0xb60ee1 += String['fromCharCode'](0xe0 | _0xcff665 >> 0xc & 0xf);
            _0xb60ee1 += String['fromCharCode'](0x80 | _0xcff665 >> 0x6 & 0x3f);
            _0xb60ee1 += String['fromCharCode'](0x80 | _0xcff665 >> 0x0 & 0x3f);
        } else {
            _0xb60ee1 += String['fromCharCode'](0xc0 | _0xcff665 >> 0x6 & 0x1f);
            _0xb60ee1 += String['fromCharCode'](0x80 | _0xcff665 >> 0x0 & 0x3f);
        }
    }
    return _0xb60ee1;
}