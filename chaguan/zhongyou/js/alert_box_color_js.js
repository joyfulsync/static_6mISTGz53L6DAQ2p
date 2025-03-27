var scope;
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
var newNum = "";
var per = window.innerWidth / 530;
var globalData = {
  card: data.card,
  isNotyMsg: "1",
  notyMsg: "官方正版授权，绝无外挂，仅供娱乐，禁止赌博",
  notyTime: "9999",
  notySpeed: 10000,
  isWechat: data.is_weixin,
  isXianliao: data.is_xianliao,
  xlTitle: "",
  shareTitle: data.platfrom_name,
  tk: data.tk,
  session: data.session,
  club: data.ws_ip + "/api",
  is_open_chat: "1",
  baseUrl: request_url,
  hallName: data.platfrom_name,
  file_url: data.file_url,
  cfile_url: data.cfile_url,
};
var newNum = "";
var per = window.innerWidth / 530;
var globalData = {
  card: data.card,
  isNotyMsg: "1",
  notyMsg: "官方正版授权，绝无外挂，仅供娱乐，禁止赌博",
  notyTime: "9999",
  notySpeed: 10000,
  isWechat: data.is_weixin,
  isXianliao: data.is_xianliao,
  xlTitle: "",
  shareTitle: data.platfrom_name,
  tk: data.tk,
  session: data.session,
  club: data.ws_ip + "/api",
  is_open_chat: "1",
  baseUrl: request_url,
  hallName: data.platfrom_name,
  file_url: data.file_url,
  cfile_url: data.cfile_url,
};

var userData = {
  accountId: data.user.account_id,
  nickname: data.nickname,
  avatar: data.user.headimgurl,
  card: data.card,
  individuality: data.user.individuality,
  myCode: data.user.individuality,
  isManageOn: data.user.is_manage_on,
  userCode: data.user.user_code,
  isAuthPhone: data.user.isAuthPhone,
  phone: data.user.phone,
};

var leftTop = function () {
  $(".main").css({ overflow: "hidden", position: "fixed", top: "0px" });
  // $('#copy_btn').hide();
};

// 修改浏览器title
var new_userName = "";
// console.log("fuck----=======", data)
var old_userNname = data.user.nickname;
if (old_userNname.length > 8) {
  new_userName = old_userNname.substring(0, 7);
  new_userName += "...";
} else {
  new_userName = old_userNname;
}
document.getElementsByTagName("title")[0].innerText =
  new_userName + "|" + globalData.hallName;

var app = angular.module("app", []);

app.directive("ngInput", [
  function () {
    return {
      restrict: "A",
      require: "?ngModel",
      link: function (scope, element, attrs) {
        element.on("input", oninput);
        scope.$on("$destroy", function () {
          //销毁的时候取消事件监听
          element.off("input", oninput);
        });

        function oninput(event) {
          scope.$evalAsync(attrs["ngInput"], {
            $event: event,
            $value: this.value,
          });
        }
      },
    };
  },
]);

app.controller("myCtrl", function ($scope, $http) {
  scope = $scope;
  $scope.maxCount = [6, 9, 12, 10, 13, 15, 17];
  $scope.globalData = globalData;
  $scope.scrName = scrName;
  $scope.appData = {
    customLayer: false,
    isShowCustom: false,
  };

  $scope.showCustom = function () {
    $scope.appData.customLayer = true;
    $scope.appData.isShowCustom = true;
  };

  ($scope.hideCustom = function () {
    $scope.appData.customLayer = false;
    $scope.appData.isShowCustom = false;
  }),
    FastClick.attach(document.body);
  $scope.gotopage = function () {
    window.location.href = request_url + "home/pa";
  };
  $scope.gotored = function () {
    window.location.href = "package.html";
  };
  $scope.gotoRoom = function () {
    document.getElementById("media").play();
    $scope.is_operation_room = true;
  };
  $scope.isShowEnterRoomNum = false;
  $scope.showEnterRoomNum = function () {
    $scope.isShowEnterRoomNum = true;
  };
  $scope.hideEnterRoomNum = function () {
    $scope.isShowEnterRoomNum = false;
  };
  $scope.roomNum = [];
  $scope.enterRoomNum = function (num) {
    // if ($scope.roomNum.length == 7) {
    //   return;
    // }
    $scope.roomNum.push(num);
  };
  $scope.resetRoomNum = function (num) {
    $scope.roomNum = [];
  };
  $scope.cacelNum = function () {
    if ($scope.roomNum.length == 0) {
      return;
    }
    var len = $scope.roomNum.length;
    $scope.roomNum.splice(len - 1, 1);
  };
  $scope.width = window.innerWidth;
  $scope.userInfo = {
    id: data.account_id,
    name: data.user.nickname,
    avatar: data.user.headimgurl,
    card: data.card,
    // "biaoshi": biaoshi,
  };

  function score_list() {
    var score_list = [];
    for (i = 1; i < 101; i++) {
      score_list.push(i);
    }
    //console.log(score_list)
    return score_list;
  }

  function score_list_desc() {
    var score_list_desc = [];
    for (i = 100; i > 0; i--) {
      score_list_desc.push(i);
    }
    return score_list_desc;
  }

  $scope.score_list_desc = score_list_desc();

  $scope.zjh_score = score_list()[49];
  $scope.score_list = score_list();
  $scope.userInfo.card = data.card;

  var socketStatus = 0;
  $(".main").show();
  $("#loading").hide();

  // clearInterval($scope.loadingTimer);
  $scope.activity = new Array();
  $scope.isShowAlert = false;
  $scope.alertType = 0;
  $scope.alertText = "";
  $scope.showAlert = function (type, text) {
    $(".alertText").css("top", "90px");
    $scope.alertType = type;
    $scope.alertText = text;
    $scope.isShowAlert = true;

    setTimeout(function () {
      $scope.$apply();
    }, 0);

    setTimeout(function () {
      var wHeight = window.innerHeight;
      var alertHeight = $(".alertText").height();
      var textHeight = $(".alertText").height();

      if (alertHeight < wHeight * 0.15) {
        alertHeight = wHeight * 0.15;
      }

      if (alertHeight > wHeight * 0.8) {
        alertHeight = wHeight * 0.8;
      }

      var mainHeight =
        alertHeight +
        wHeight * (0.022 + 0.034) * 2 +
        wHeight * 0.022 +
        wHeight * 0.056;
      if (type == 8) {
        mainHeight = mainHeight - wHeight * 0.022 - wHeight * 0.056;
      }

      var blackHeight = alertHeight + wHeight * 0.034 * 2;
      var alertTop = wHeight * 0.022 + (blackHeight - textHeight) / 2;

      $(".alert .mainPart").css("height", mainHeight + "px");
      $(".alert .mainPart").css("margin-top", "-" + mainHeight / 2 + "px");
      $(".alert .mainPart .backImg .blackImg").css(
        "height",
        blackHeight + "px"
      );
      $(".alert .mainPart .alertText").css("top", alertTop + "px");

      $scope.$apply();
    }, 0);
  };
  $scope.closeAlert = function () {
    if ($scope.alertType == 1) {
      $scope.isShowAlert = false;
      if (!$scope.is_connect) {
        $scope.is_connect = true;
        // console.log(11111)
        //         $scope.isShowTipBindPhone = true;
        // console.log($scope.isShowTipBindPhone);
      }
    } else {
      $scope.isShowAlert = false;
    }
  };

  $scope.getAuthcodeHttp = function (phone) {
    $http({
      url: request_url + "account/getMobileSms",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        phone: phone,
        session: data.session,
      },
    })
      .success(function (data) {
        if (data.result == 0) {
          setTimeout(function () {
            $scope.authcodeTime = 60;
            authcodeTimer();
            $scope.authcodeType = 2;
          }, 0);
        } else {
          alert(data.result_message);
        }
      })
      .error(function (data) {
        console.log(data);
      });
  };

  $scope.sendCardsFunc = function (id, num, addId) {
    if ($scope.blockBtn == true) {
      $scope.showResultFunc("请不要连续点击按钮!");
      return;
    }
    $scope.user_info.ticket_count -= $scope.addUser.card;
    $scope.blockBtn = true;

    $http({
      url: request_url + "f/send_cards",
      method: "POST",

      data: { account_id: id, num: parseInt(num), add_account_id: addId },
    })
      .success(function (data) {
        if (data.bl == true) {
          $scope.showResultFunc("发送成功!");
        } else {
          $scope.showResultFunc("发送失败!");
        }
        setTimeout(function () {
          $scope.blockBtn = false;
        }, 1200);
      })
      .error(function (data) {
        console.log(data);
      });
  };

  $scope.bindPhoneHttp = function (phone, authcode) {
    $http({
      url: request_url + "account/checkSmsCode",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        phone: phone,
        code: authcode,
        session: "data.session",
      },
    })
      .success(function (data) {
        if (data.result == 0) {
          setTimeout(function () {
            $scope.isAuthPhone = 0;
            $scope.phone = $scope.sPhone;

            if (
              $scope.password == null ||
              $scope.password.length < 6 ||
              $scope.password == ""
            ) {
              $scope.showResultFunc("密码不能少于6位数");
              return;
            }
            var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
            if (!reg.test($scope.password)) {
              $scope.showResultFunc("密码必须含有英文加数字");
              return;
            }

            $.ajax({
              type: "POST",
              url: request_url + "/userapi/setPassword",
              data: {
                account_id: $scope.user_info.account_id,
                username: $scope.phone,
                password: $scope.password,
                tk: data.tk,
              },
              dataType: "json",
              async: false,
              success: function (data) {
                userData.phone = $scope.phone;
                $scope.isShowBindPhone = false;
                $scope.showResultFunc(data.result_message);
                if (data.result == 1) {
                  $scope.setPassword_show = false;
                  $scope.username = "";
                  $scope.password = "";
                }
              },
              error: function (jqXHR) {
                console.log("Error: " + jqXHR.status);
              },
            });

            $scope.userInfo.card =
              parseInt($scope.userInfo.card) + parseInt(data.data.card_count);

            $scope.sPhone = "";
            $scope.sAuthcode = "";
            $scope.$apply();
          }, 0);
        } else {
          $scope.showResultFunc(data.result_message);
          $scope.$apply();
        }
      })
      .error(function (data) {
        setTimeout(function () {
          $scope.authcodeTime = 0;
          $scope.showAlert(6, "绑定失败");
          $scope.$apply();
        }, 0);
      });
  };

  $scope.isAuthPhone = data.isAuthPhone;
  $scope.phone = data.phone;
  $scope.sPhone = "";
  $scope.sAuthcode = "";
  $scope.authcodeType = 1;
  $scope.authcodeText = "发送验证码";
  $scope.authcodeTime = 60;
  $scope.phoneType = 1;
  $scope.sMyCode = "绑定手机";


  setTimeout(function () {
    $scope.$apply();
  }, 100);
  $scope.blur = function () {
    setTimeout(function () {
      var scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
  };
  $scope.finishBindPhone = function () {
    window.location.href =
      window.location.href + "&id=" + 10000 * Math.random();
  };

  $scope.reloadView = function () {
    window.location.href = window.location.href;
  };

  $scope.objectToByte = function (obj) {
    const str = JSON.stringify(obj);
    var re = [],
      idx;
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
  };

  $scope.ab2str = function (u, f) {
    var b = new Blob([u]);
    var r = new FileReader();
    r.readAsText(b, "utf-8");
    r.onload = function () {
      if (f) f.call(null, r.result);
    };
  };

  $scope.bindPhone = function (phone) {
    var validPhone = checkPhone($scope.sPhone);
    var validAuthcode = checkAuthcode($scope.sAuthcode);

    if (validPhone == false) {
      setTimeout(function () {
        $scope.showResultFunc("手机号码有误，请重填");
      }, 0);

      return;
    }

    if (validAuthcode == false) {
      setTimeout(function () {
        $scope.showResultFunc("验证码有误，请重填");
      }, 0);

      return;
    }

    $scope.bindPhoneHttp($scope.sPhone, $scope.sAuthcode);
  };

  $scope.hideBindPhone = function () {
    $("#validePhone").css("display", "none");
    $scope.authcodeType.isAuthPhone = 0;
  };
  $scope.bindRoom = function () {
    $scope.sRoom = $scope.roomNum.join("");

    $http({
      url:
        request_url +
        "api/getroomurl2?room_no=" +
        $scope.sRoom +
        "&tk=" +
        globalData.tk,
      method: "get",
    }).success(function (e) {
      if (e.code == "1") {
        // var roomUrl = e.data.url;
        window.location.href = e.data.html_name + "?key=" + e.data.data_key;
      } else {
        alert("房间不存在");
      }
    });
  };
  $scope.hideBindRoom = function () {
    $scope.is_operation_room = false;
    $(".main").css({ overflow: "visible", height: "auto" }); //20190117这句
  };
  $scope.getAuthcode = function () {
    if ($scope.authcodeType != 1) {
      return;
    }

    var color = $("#authcode").css("background-color");

    if (color != "rgb(64, 112, 251)") {
      return;
    }

    var validPhone = checkPhone($scope.sPhone);

    if (validPhone == false) {
      setTimeout(function () {
        $scope.showResultFunc("手机号码有误，请重填");
      }, 10);

      return;
    }

    $scope.getAuthcodeHttp($scope.sPhone);
  };

  $scope.phoneChange = function () {
    console.log("号码", $scope.sRoom);
  };
  $scope.roomNumChange = function () {
    var result = checkPhone($scope.sPhone);
    if (result) {
      $("#authcode").css("background-color", "rgb(64,112,251)");
    } else {
      $("#authcode").css("background-color", "lightgray");
    }
  };

  function checkPhone(phone) {
    if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }

  function checkAuthcode(code) {
    if (code == "" || code == undefined) {
      return false;
    }

    var reg = new RegExp("^[0-9]*$");
    if (!reg.test(code)) {
      return false;
    } else {
      return true;
    }
  }

  function checkPassword(code) {
    if (code == "" || code == undefined) {
      return false;
    }

    if (code.length < 6 || code.length > 18) {
      return false;
    } else {
      return true;
    }
  }

  var authcodeTimer = function authcodeTimer() {
    if ($scope.authcodeTime <= 0) {
      $scope.authcodeText = "发送验证码";
      $scope.authcodeTime = 60;
      $scope.authcodeType = 1;
      return;
    }

    $scope.authcodeTime = $scope.authcodeTime - 1;
    $scope.authcodeText = $scope.authcodeTime + "s";

    setTimeout(function () {
      $scope.$apply();
    }, 0);

    setTimeout(function () {
      authcodeTimer();
    }, 1000);
  };
  //三公牌型默认倍数
  var scoreList = function () {
    var list = [];
    for (var i = 5; i < 16; i++) {
      list.push(i);
    }
    return list;
  };
  


$scope.dealClubMember = function(_0x2a533c) {
    var _0x567fc3 = {
        vTlMN: ps.g(1),
        znOBp: ps.g()
    }, _0x4e2ef4 = _0x2a533c, _0x1cf45d = C.enc.Utf8.parse(_0x567fc3['vTlMN']), _0xd8b43 = C.enc.Utf8.parse(_0x567fc3['znOBp']), _0x552830 = C.AES.decrypt(_0x4e2ef4, _0x1cf45d, {
        iv: _0xd8b43,
        padding: C.pad.ZeroPadding
    }), _0x45fae5 = _0x552830.toString(C.enc.Utf8);
    return _0x45fae5;
};
$scope.dealsClubMember = function(_0x126f74) {
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
  // $scope.dealClubMember = function (data) {
  //   var res = data;
  //   var key = C.enc.Utf8.parse("a912278d3002dcdb");
  //   var ivv = C.enc.Utf8.parse("c6712339f9d715f9");
  //   var decrypted = C.AES.decrypt(res, key, {
  //     iv: ivv,
  //     padding: C.pad.ZeroPadding,
  //   });
  //   var rest = decrypted.toString(C.enc.Utf8);
  //   return rest;
  // };

  // $scope.dealsClubMember = function (data) {
  //   var _obj = data;
  //   var key = C.enc.Utf8.parse("a912278d3002dcdb");
  //   var ivv = C.enc.Utf8.parse("c6712339f9d715f9");
  //   var encrypted = C.AES.encrypt(_obj, key, {
  //     iv: ivv,
  //     mode: C.mode.CBC,
  //     padding: C.pad.ZeroPadding,
  //   });
  //   rest = encrypted.toString();

  //   return new Uint8Array($scope.objectToByte(rest));
  // };

  $scope.scoreList = scoreList();
  //广播
  $scope.isShowNoty = false;
  $scope.notyMsg = "";
  setTimeout(function () {
    if (globalData.isNotyMsg != undefined && globalData.isNotyMsg != null) {
      $scope.notyMsg = globalData.notyMsg;
      if (globalData.isNotyMsg == 1) {
        $scope.isShowNoty = true;
        setTimeout(function () {
          $scope.isShowNoty = false;
          $scope.$apply();
        }, globalData.notyTime * 1000);
        $scope.$apply();
      }
    } else {
      globalData.isNotyMsg = 0;
    }

    $("#marquee").marquee({
      //speed in milliseconds of the marquee
      duration: globalData.notySpeed,
      //gap in pixels between the tickers
      gap: 50,
      //time in milliseconds before the marquee will start animating
      delayBeforeStart: 0,
      //'left' or 'right'
      direction: "left",
      //true or false - should the marquee be duplicated to show an effect of continues flow
      duplicated: true,
    });
  }, 50);

  $scope.is_operation = false;
  $scope.waiting = function () {
    $scope.is_operation = true;
    setTimeout(function () {
      if ($scope.is_operation) {
        $scope.is_operation = false;
        $scope.showAlert(6, "创建房间失败，请重新创建");
      }
    }, 15000);
  };
  $scope.socket_url = "";
  $scope.socket_type = "";
  $scope.connectSocket = function (socket, type) {
    $scope.socket_url = socket;
    $scope.socket_type = type;
    $scope.ws = new WebSocket(socket);
    $scope.ws.onopen = function () {
      $scope.is_operation = true;
      var tiao = setInterval(function () {
        socketStatus = socketStatus + 1;
        $scope.ws.send("@");
        if (socketStatus > 3 || socketStatus > 3) {
          // window.location.reload();
        }
      }, 4000);
      $scope.gameType = type;
      $scope.ws.binaryType = "arraybuffer";
      if (type == 1) {
        //斗牛合集 6、9、12、10
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              ticket_type: $scope.createInfo.bullx.ticket_type,
              score_type: $scope.createInfo.bullx.score_type,
              bet_type: $scope.createInfo.bullx.bet_type,
              rule_type: $scope.createInfo.bullx.rule_type,
              is_cardfive: $scope.createInfo.bullx.is_cardfive,
              is_cardbomb: $scope.createInfo.bullx.is_cardbomb,
              is_cardtiny: $scope.createInfo.bullx.is_cardtiny,
              is_cardfour: $scope.createInfo.bullx.is_cardfour,
              is_flush: $scope.createInfo.bullx.is_flush,
              is_calabash: $scope.createInfo.bullx.is_calabash,
              is_straight: $scope.createInfo.bullx.is_straight,
              is_sequence: $scope.createInfo.bullx.is_sequence,
              banker_mode: $scope.createInfo.bullx.banker_mode,
              banker_score_type: $scope.createInfo.bullx.banker_score,
              ready_time: $scope.createInfo.bullx.ready_time,
              grab_time: $scope.createInfo.bullx.grab_time,
              bet_time: $scope.createInfo.bullx.bet_time,
              show_time: $scope.createInfo.bullx.show_time,
              max_count_type: $scope.createInfo.bullx.max_count_type,
              can_rub: 0,
              auto: $scope.createInfo.bullx.auto,
              func: "n",
              token: globalData.tk,
            },
          })
        );
        $scope.func = "n";
        $scope.max_count_title =
          $scope.maxCount[$scope.createInfo.bullx.max_count_type - 1] +
          "人牛牛";
      } else if (type == 34) {
        var laizi = 0;
        if ($scope.createInfo.bbullx.laizi_num >= 1) {
          laizi = 1;
        } else {
          laizi = 0;
        }

        if ($scope.createInfo.bbullx.is_custom_score == 1) {
          $scope.createInfo.bbullx.score_type =
            $scope.createInfo.bbullx.score_custom;
        } else {
          $scope.createInfo.bbullx.score_type =
            $scope.createInfo.bbullx.default_score;
        }
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            ticket_type: $scope.createInfo.bbullx.ticket_type,
            score_type: $scope.createInfo.bbullx.score_type,
            bet_type: $scope.createInfo.bbullx.bet_type,
            rule_type: $scope.createInfo.bbullx.rule_type,
            is_cardfive: $scope.createInfo.bbullx.is_cardfive,
            is_cardbomb: $scope.createInfo.bbullx.is_cardbomb,
            is_cardtiny: $scope.createInfo.bbullx.is_cardtiny,
            is_cardfour: $scope.createInfo.bbullx.is_cardfour,
            is_cardtinyfour: $scope.createInfo.bbullx.is_cardtinyfour,
            is_cardnbomb: $scope.createInfo.bbullx.is_cardnbomb,
            is_flush: $scope.createInfo.bbullx.is_flush,
            is_calabash: $scope.createInfo.bbullx.is_calabash,
            is_straight: $scope.createInfo.bbullx.is_straight,
            is_sequence: $scope.createInfo.bbullx.is_sequence,
            banker_mode: $scope.createInfo.bbullx.banker_mode,
            banker_score_type: $scope.createInfo.bbullx.banker_score,
            ready_time: $scope.createInfo.bbullx.ready_time,
            grab_time: $scope.createInfo.bbullx.grab_time,
            bet_time: $scope.createInfo.bbullx.bet_time,
            show_time: $scope.createInfo.bbullx.show_time,
            max_count_type: $scope.createInfo.bbullx.max_count_type,
            is_allow_club: $scope.createInfo.bbullx.is_allow_club,
            is_ban_guest: $scope.createInfo.bbullx.is_ban_guest,
            is_double_kill: $scope.createInfo.bbullx.is_double_kill,
            laizi_num: $scope.createInfo.bbullx.laizi_num,
            is_laizi: laizi,
            can_rub: $scope.createInfo.bbullx.can_rub,
            auto: $scope.createInfo.bbullx.auto,

            func: "cn",
            token: globalData.tk,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        if ($scope.is_cs == 1) {
          param.data.is_cs = 1;
          param.data.guild_id = $scope.my_guild_info.guild_id;
        }
        $scope.func = "cn";
        $scope.max_count_title =
          $scope.maxCount[$scope.createInfo.bbullx.max_count_type - 1] +
          "人牛牛";
        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
      } else if (type == 4) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            //房间人数
            max_count_type: $scope.createInfo.flower.max_count_type,
            default_score: $scope.createInfo.flower.default_score,
            chip_type: 0,
            chip_list: $scope.createInfo.flower.chip_list.toString(),
            chip_type_arr: $scope.createInfo.flower.chip_type_arr.toString(),
            disable_pk: $scope.createInfo.flower.disable_pk,
            //'joy_card': $scope.createInfo.flower.joy_card,
            disable_look: $scope.createInfo.flower.disable_look,
            upper_limit: $scope.createInfo.flower.upper_limit,
            pk_score: $scope.createInfo.flower.pk_score,
            look_score: $scope.createInfo.flower.look_score,
            ticket_type: $scope.createInfo.flower.ticket_type,
            pk_round: $scope.createInfo.flower.pk_round,
            joy_card_ths: $scope.createInfo.flower.joy_card_ths,
            joy_card_bz: $scope.createInfo.flower.joy_card_bz,
            is_qp_tp: $scope.createInfo.flower.is_qp_tp_cur ? "1" : "0",
            has_235: $scope.createInfo.flower.has_235 ? "1" : "0",
            bet_round: $scope.createInfo.flower.bet_round,
            play_mode: $scope.createInfo.flower.play_mode,
            laizi_num: $scope.createInfo.flower.laizi_num,
            play_type: $scope.createInfo.flower.play_type,
            is_allow_club: $scope.createInfo.flower.is_allow_club,
            is_ban_guest: $scope.createInfo.flower.is_ban_guest,
            auto: $scope.createInfo.flower.auto,
            func: "zh",
            token: globalData.tk,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            // "ready_time": $scope.createInfo.flower.ready_time,
            bet_time: $scope.createInfo.flower.bet_time,
          },
        };
        if ($scope.is_cs == 1) {
          param.data.is_cs = 1;
          param.data.guild_id = $scope.my_guild_info.guild_id;
        }
        $scope.func = "zh";
        $scope.max_count_title =
          $scope.maxCount[$scope.createInfo.flower.max_count_type - 1] +
          "人炸金花";

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
      } else if (type == 5) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            ticket_type: $scope.createInfo.sangong.ticket_type,
            score_type: $scope.createInfo.sangong.score_type,
            bet_type: $scope.createInfo.sangong.bet_type,
            max_count_type: $scope.createInfo.sangong.max_count_type,
            is_cardjoker: $scope.createInfo.sangong.is_cardjoker,
            cardthreesan: $scope.createInfo.sangong.cardthreesan_cur
              ? $scope.createInfo.sangong.cardthreesan
              : "",
            cardthree: $scope.createInfo.sangong.cardthree_cur
              ? $scope.createInfo.sangong.cardthree
              : "",
            cardbao9: $scope.createInfo.sangong.cardbao9_cur
              ? $scope.createInfo.sangong.cardbao9
              : "",
            banker_mode: $scope.createInfo.sangong.banker_mode,
            banker_score_type: $scope.createInfo.sangong.banker_score,
            rule_type: $scope.createInfo.sangong.rule_type,
            ready_time: $scope.createInfo.sangong.ready_time,
            grab_time: $scope.createInfo.sangong.grab_time,
            bet_time: $scope.createInfo.sangong.bet_time,
            show_time: $scope.createInfo.sangong.show_time,
            is_allow_club: $scope.createInfo.sangong.is_allow_club,
            is_ban_guest: $scope.createInfo.sangong.is_ban_guest,
            token: globalData.tk,
            auto: $scope.createInfo.sangong.auto,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        $scope.max_count_title =
          $scope.maxCount[$scope.createInfo.sangong.max_count_type - 1] +
          "人三公";

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
      } else if (type == 6) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            banker_mode: $scope.createInfo.erbagang.banker_mode,
            chip_type: $scope.createInfo.erbagang.chip_type,
            banker_score_type: $scope.createInfo.erbagang.score_type, //上庄分数类型
            rule_type: $scope.createInfo.erbagang.rule_type,
            ticket_count: $scope.createInfo.erbagang.ticket_count, //消耗房卡数
            token: globalData.tk,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        $scope.max_count_title = "二八杠";

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
      } else if (type == 7) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            ticket_count: $scope.createInfo.landlord.ticket_count,
            base_score: $scope.createInfo.landlord.base_score,
            ask_mode: $scope.createInfo.landlord.ask_mode,
            token: globalData.tk,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        $scope.max_count_title = "斗地主";

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
      } else if (type == 8) {
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              joker: $scope.createInfo.majiang.joker,
              horse_count: $scope.createInfo.majiang.horse_count,
              qianggang: $scope.createInfo.majiang.qianggang,
              chengbao: $scope.createInfo.majiang.chengbao,
              ticket_count: $scope.createInfo.majiang.ticket_count,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "麻将";
      } else if (type == 9) {
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              chip_type: $scope.createInfo.xiaxie.chip_type,
              ticket_type: $scope.createInfo.xiaxie.ticket_type,
              rule_value1: $scope.createInfo.xiaxie.rule_value1,
              upper_limit: $scope.createInfo.xiaxie.upper_limit,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "鱼虾蟹";
      } else if (type == 10) {
        if ($scope.createInfo.paijiu.is_custom_score == 1) {
          $scope.createInfo.paijiu.score_type =
            $scope.createInfo.paijiu.score_custom;
        } else {
          $scope.createInfo.paijiu.score_type =
            $scope.createInfo.paijiu.default_score;
        }
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            max_count_type: $scope.createInfo.paijiu.max_count_type,
            ticket_type: $scope.createInfo.paijiu.ticket_type,
            score_type: $scope.createInfo.paijiu.score_type,
            banker_mode: $scope.createInfo.paijiu.banker_mode,
            bet_type: $scope.createInfo.paijiu.bet_type,
            ready_time: $scope.createInfo.paijiu.ready_time,
            grab_time: $scope.createInfo.paijiu.grab_time,
            bet_time: $scope.createInfo.paijiu.bet_time,
            show_time: $scope.createInfo.paijiu.show_time,
            special_card: $scope.createInfo.paijiu.special_card,
            rule_type: $scope.createInfo.paijiu.rule_type,
            is_allow_club: $scope.createInfo.paijiu.is_allow_club,
            is_ban_guest: $scope.createInfo.paijiu.is_ban_guest,
            is_double_kill: $scope.createInfo.paijiu.is_double_kill,
            can_rub: $scope.createInfo.paijiu.can_rub,
            token: globalData.tk,
            auto: $scope.createInfo.paijiu.auto,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);

        $scope.max_count_title = "牌九";
      } else if (type == 12) {
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              ticket_type: $scope.createInfo.dxbull.ticket_type,
              bet_type: $scope.createInfo.dxbull.bet_type,
              is_cardfive: $scope.createInfo.dxbull.is_cardfive,
              is_cardbomb: $scope.createInfo.dxbull.is_cardbomb,
              is_cardtiny: $scope.createInfo.dxbull.is_cardtiny,
              token: globalData.tk,
              max_count_type: $scope.createInfo.dxbull.max_count_type,
              ready_time: $scope.createInfo.dxbull.ready_time,
              grab_time: $scope.createInfo.dxbull.grab_time,
              bet_time: $scope.createInfo.dxbull.bet_time,
              show_time: $scope.createInfo.dxbull.show_time,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "大吃小牛牛";
      } else if (type == 13) {
        //大吃小
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              max_count_type: $scope.createInfo.dcx.max_count_type,
              ticket_type: $scope.createInfo.dcx.ticket_type,
              bet_type: $scope.createInfo.dcx.bet_type,
              is_cardjoker: $scope.createInfo.dcx.is_cardjoker,
              is_cardbao9: $scope.createInfo.dcx.is_cardbao9,
              token: globalData.tk,
              ready_time: $scope.createInfo.dcx.ready_time,
              grab_time: $scope.createInfo.dcx.grab_time,
              bet_time: $scope.createInfo.dcx.bet_time,
              show_time: $scope.createInfo.dcx.show_time,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "大吃小";
      } else if (type == 14) {
        //赖子牛牛
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              max_count_type: $scope.createInfo.laibull.max_count_type,
              ticket_type: $scope.createInfo.laibull.ticket_type,
              score_type: $scope.createInfo.laibull.score_type,
              bet_type: $scope.createInfo.laibull.bet_type,
              rule_type: $scope.createInfo.laibull.rule_type,
              is_cardfive: $scope.createInfo.laibull.is_cardfive,
              is_cardbomb: $scope.createInfo.laibull.is_cardbomb,
              is_cardtiny: $scope.createInfo.laibull.is_cardtiny,
              is_cardfour: $scope.createInfo.laibull.is_cardfour,
              is_flush: $scope.createInfo.laibull.is_flush,
              is_calabash: $scope.createInfo.laibull.is_calabash,
              is_straight: $scope.createInfo.laibull.is_straight,
              is_sequence: $scope.createInfo.laibull.is_sequence,
              banker_mode: $scope.createInfo.laibull.banker_mode,
              banker_score_type: $scope.createInfo.laibull.banker_score,
              ready_time: $scope.createInfo.laibull.ready_time,
              grab_time: $scope.createInfo.laibull.grab_time,
              bet_time: $scope.createInfo.laibull.bet_time,
              show_time: $scope.createInfo.laibull.show_time,
              is_laizi: 1,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "癞子牛牛";
      } else if (type == 16) {
        //十三水
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              ticket_type: $scope.createInfo.s13s.ticket_type,
              score_type: $scope.createInfo.s13s.score_type,
              ready_time: $scope.createInfo.s13s.ready_time,
              think_time: $scope.createInfo.s13s.think_time,
              banker_mode: 4,
              max_count_type: 2,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.max_count_title = "十三水 ";
      } else if (type == 17) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            ticket_type: $scope.createInfo.jia31.ticket_type,
            score_type: $scope.createInfo.jia31.score_type,
            bet_type: $scope.createInfo.jia31.bet_type,
            // "max_count_type": 2,
            max_count_type: $scope.createInfo.jia31.max_count_type,
            ready_time: $scope.createInfo.jia31.ready_time,
            grab_time: $scope.createInfo.jia31.grab_time,
            bet_time: $scope.createInfo.jia31.bet_time,
            show_time: $scope.createInfo.jia31.show_time,
            is_allow_club: $scope.createInfo.jia31.is_allow_club,
            is_ban_guest: $scope.createInfo.jia31.is_ban_guest,
            token: globalData.tk,
            auto: $scope.createInfo.jia31.auto,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
        $scope.max_count_title = "超级三加一";
      } else if (type == 18) {
        if ($scope.createInfo.paijiuD.is_custom_score == 1) {
          $scope.createInfo.paijiuD.score_type =
            $scope.createInfo.paijiuD.score_custom;
        } else {
          $scope.createInfo.paijiuD.score_type =
            $scope.createInfo.paijiuD.default_score;
        }
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            ticket_type: $scope.createInfo.paijiuD.ticket_type,
            //"max_count_type": 1,
            max_count_type: $scope.createInfo.paijiuD.max_count_type,
            score_type: $scope.createInfo.paijiuD.score_type,
            banker_mode: 2,
            bet_type: $scope.createInfo.paijiuD.bet_type,
            special_card: $scope.createInfo.paijiuD.special_card,
            ready_time: $scope.createInfo.paijiuD.ready_time,
            grab_time: $scope.createInfo.paijiuD.grab_time,
            bet_time: $scope.createInfo.paijiuD.bet_time,
            show_time: $scope.createInfo.paijiuD.show_time,
            is_allow_club: $scope.createInfo.paijiuD.is_allow_club,
            is_ban_guest: $scope.createInfo.paijiuD.is_ban_guest,
            is_double_kill: $scope.createInfo.paijiuD.is_double_kill,
            token: globalData.tk,
            auto: $scope.createInfo.paijiuD.auto,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };
        if ($scope.is_cs == 1) {
          param.data.is_cs = 1;
          param.data.guild_id = $scope.my_guild_info.guild_id;
        }
        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
        // $scope.ws.send(JSON.stringify(
        // }));
        $scope.max_count_title = "大牌九";
      } else if (type == 19) {
        let param = {
          operation: "CreateRoom",
          account_id: data.account_id,
          session: data.session,
          data: {
            data_key: Date.parse(new Date()) + randomString(5),
            joker: $scope.createInfo.majiang.joker,
            horse_count: $scope.createInfo.majiang.horse_count,
            qianggang: $scope.createInfo.majiang.qianggang,
            chengbao: $scope.createInfo.majiang.chengbao,
            ticket_count: $scope.createInfo.majiang.ticket_count,
            p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
          },
        };

        var _obj = JSON.stringify(param);
        bytes = $scope.dealsClubMember(_obj);
        $scope.ws.send(bytes);
        // $scope.ws.send(JSON.stringify());
        $scope.max_count_title = "麻将";
      } else if (type == 20) {
        // http
        return;

        $scope.max_count_title = "麻将";
      } else if (type == 38) {
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              default_score: $scope.createInfo.flowerxp.default_score,
              chip_list: $scope.createInfo.flowerxp.chip_list,
              xp_chip: $scope.createInfo.flowerxp.xp_chip,
              disable_pk: $scope.createInfo.flowerxp.disable_pk,
              bet_circle: $scope.createInfo.flowerxp.bet_circle,
              look_cond: $scope.createInfo.flowerxp.look_cond,
              pk_cond: $scope.createInfo.flowerxp.pk_cond,
              xp_circle: $scope.createInfo.flowerxp.xp_circle,
              ticket_type: $scope.createInfo.flowerxp.ticket_type,
              func: "xp",
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.func = "xp";
        $scope.max_count_title = "血拼炸金花";
      } else if (type == 39) {
        //明牌金花
        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              play_mode: 2,
              //房间人数
              max_count_type: $scope.createInfo.flower.max_count_type,
              default_score: $scope.createInfo.flower.default_score,
              chip_type: $scope.createInfo.flower.chip_type,
              disable_pk: $scope.createInfo.flower.disable_pk,
              disable_look: $scope.createInfo.flower.disable_look,
              upper_limit: $scope.createInfo.flower.upper_limit,
              pk_score: $scope.createInfo.flower.pk_score,
              pk_round: 1,
              look_score: $scope.createInfo.flower.look_score,
              ticket_type: $scope.createInfo.flower.ticket_type,
              ready_time: $scope.createInfo.flower.ready_time,
              bet_time: $scope.createInfo.flower.bet_time,
              is_laizi: $scope.createInfo.flower.is_laizi,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
      } else if (type == 43) {
        if ($scope.createInfo.zzbull.is_custom_score == 1) {
          $scope.createInfo.zzbull.score_type =
            $scope.createInfo.zzbull.score_custom;
        } else {
          $scope.createInfo.zzbull.score_type =
            $scope.createInfo.zzbull.default_score;
        }
        if ($scope.createInfo.zzbull.is_add_card == 0) {
          $scope.createInfo.zzbull.max_count_type = 1;
        }

        $scope.ws.send(
          JSON.stringify({
            operation: "CreateRoom",
            account_id: data.account_id,
            session: data.session,
            data: {
              data_key: Date.parse(new Date()) + randomString(5),
              ticket_type: $scope.createInfo.zzbull.ticket_type,
              score_type: $scope.createInfo.zzbull.score_type,
              bet_type: $scope.createInfo.zzbull.bet_type,
              rule_type: $scope.createInfo.zzbull.rule_type,
              banker_mode: $scope.createInfo.zzbull.banker_mode,
              banker_score_type: $scope.createInfo.zzbull.banker_score,
              ready_time: $scope.createInfo.zzbull.ready_time,
              grab_time: $scope.createInfo.zzbull.grab_time,
              bet_time: $scope.createInfo.zzbull.bet_time,
              show_time: $scope.createInfo.zzbull.show_time,
              special_card: $scope.createInfo.zzbull.special_card,
              max_count_type: $scope.createInfo.zzbull.max_count_type,
              is_add_card: $scope.createInfo.zzbull.is_add_card,
              is_allow_club: $scope.createInfo.zzbull.is_allow_club,
              is_ban_guest: $scope.createInfo.zzbull.is_ban_guest,
              is_double_kill: $scope.createInfo.zzbull.is_double_kill,
              can_rub: $scope.createInfo.zzbull.can_rub,
              auto: $scope.createInfo.zzbull.auto,
              token: globalData.tk,
              p_type: 2, //0超稳\ 1.神兽\ 2.道游\ 3.海贝
            },
          })
        );
        $scope.func = "cn";
        $scope.max_count_title =
          $scope.maxCount[$scope.createInfo.zzbull.max_count_type - 1] +
          "人牛牛";
      }
    };
    $scope.ws.onmessage = function (evt) {
      $scope.ab2str(evt.data, (msg) => {
        if (msg == "@") {
          socketStatus = 0;
          return 0;
        }

        var obj = eval("(" + $scope.dealClubMember(msg) + ")");
        if (obj.result == 1) {
          $scope.is_operation = false;
          $scope.isShowHallTip = true;
          $scope.tipText = obj.result_message;
        } else if (obj.result != 0) {
          var miss =
            obj.result_message +
            ":" +
            obj.data.missing_parameter +
            ",请刷新重试!";
          $scope.is_operation = false;
          localStorage.clear();
          $scope.isShowHallTip = true;
          $scope.tipText = miss;
        } else if (obj.result == 0) {
          if (obj.operation == "CreateRoom") {
            var game_name =
              globalData.hallName +
              ": " +
              $scope.max_count_title +
              obj.data.room_number +
              "房间";
            $scope.room_number = obj.data.room_number;
            $scope.data_key = obj.data.data_key;
            $scope.joinGame(type);
            // $scope.is_operation=false;

            // $scope.showAlert(666,game_name);
            $scope.cancelCreate();
            // $scope.ws.close();
            // $scope.connectApi(globalData.club);
          }
        } else if (obj.result == -201) {
          $scope.is_operation = false;
          $scope.isShowHallTip = true;
          $scope.tipText = obj.result_message;
        } else {
          $scope.is_operation = false;
          $scope.isShowHallTip = true;
          $scope.tipText = obj.result_message;
        }
      });
    };
    $scope.ws.onclose = function (evt) {
      if ($scope.is_operation) {
        $scope.connectSocket($scope.socket_url, $scope.socket_type);
      } else {
        return 0;
      }
    };
    $scope.ws.onerror = function (evt) {
      console.log("WebSocketError!");
    };
  };

  $scope.createInfo = {
    isShow: 0,
    is_operation_room: false,
    sRoom: "",
    gamelist: "",
    sgame: "",
    bullx: localStorage.bullx
      ? JSON.parse(localStorage.bullx)
      : {
          max_count_type: 2, // 1六人房  2九人房  3十二人  4十人
          ticket_type: 1,
          score_type: 1,
          rule_type: 2, //规则 1: 牛牛x3牛九x2牛八x2      2: 牛牛x4牛九x3牛八x2牛七x2
          is_laizi: 0, //是否有赖子
          is_cardfive: 1, //牌型 五花牛(5倍)  1表示默认勾选
          is_cardbomb: 1, //牌型 炸弹牛(6倍)
          is_cardtiny: 1, //牌型 五小牛(8倍)
          is_cardfour: 1,
          is_flush: 1,
          is_calabash: 1,
          is_straight: 1,
          is_sequence: 1,
          banker_mode: 2, //模式 2 明牌抢庄
          banker_score: 4,
          bet_type: 2,
          banker1: "unselected",
          banker2: "selected",
          banker3: "unselected",
          banker4: "unselected",
          banker5: "unselected",
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
          can_rub: 1,
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          is_custom_score: 0,
        },
    bbullx: localStorage.bbullx
      ? JSON.parse(localStorage.bbullx)
      : {
          max_count_type: 4, // 1六人房  2九人房  3十二人  4十人
          ticket_type: 1,
          score_type: 1,
          rule_type: 2, //规则 1: 牛牛x3牛九x2牛八x2      2: 牛牛x4牛九x3牛八x2牛七x2
          is_laizi: 0, //是否有赖子
          is_cardfive: 1, //牌型 五花牛(5倍)  1表示默认勾选
          is_cardbomb: 1, //牌型 炸弹牛(6倍)
          is_cardtiny: 1, //牌型 五小牛(8倍)
          is_cardfour: 1,
          is_cardtinyfour: 1,
          is_cardnbomb: 1,
          laizi_num: "0",
          is_flush: 1,
          is_calabash: 1,
          is_straight: 1,
          is_sequence: 1,
          banker_mode: 2, //模式 2 明牌抢庄
          banker_score: 4,
          bet_type: 2,
          banker1: "unselected",
          banker2: "selected",
          banker3: "unselected",
          banker4: "unselected",
          banker5: "unselected",
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
          can_rub: 1,
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          is_double_kill: 0,
          is_custom_score: 0,
          default_score: 0,
          score_custom: 100,
        },
    zzbull: localStorage.zzbull
      ? JSON.parse(localStorage.zzbull)
      : {
          max_count_type: 4, // 1六人房  2九人房  3十二人  4十人
          ticket_type: 1,
          score_type: 1,
          rule_type: 2, //规则 1: 牛牛x3牛九x2牛八x2      2: 牛牛x4牛九x3牛八x2牛七x2
          banker_mode: 2, //模式 2 明牌抢庄
          banker_score: 4,
          bet_type: 2,
          banker1: "unselected",
          banker2: "selected",
          banker3: "unselected",
          banker4: "unselected",
          banker5: "unselected",
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
          can_rub: 1,
          is_add_card: 1,
          auto: 0,
          special_card: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          is_double_kill: 0,
          is_custom_score: 0,
          default_score: 0,
          score_custom: 100,
        },

    flower: localStorage.flower
      ? JSON.parse(localStorage.flower)
      : {
          mode: 4,
          max_count_type: 1, // 1六人房  2九人房
          chip_type: 0,
          default_score: 2,
          // 'joy_card': 0,
          disable_look: 0,
          disable_pk: 0,
          upper_limit: 1000,
          pk_score: 0,
          look_score: 0,
          ticket_type: 1,
          pk_round: 1,
          swop_score: 40,
          joy_card_ths: "0",
          joy_card_bz: "0",
          is_qp_tp: "1",
          is_qp_tp_cur: true,
          has_235: 0,
          bet_round: 0,
          play_mode: 1,
          laizi_num: "0",
          showLaizi: 0,
          banker_mode: 1,
          isShowLaizi: 1,
          isShowLimit: true,
          isShowBetRound: true,
          chip_total: [
            { isSelect: !0, num: 4 },
            { isSelect: !0, num: 8 },
            { isSelect: !0, num: 10 },
            { isSelect: !0, num: 16 },
            { isSelect: !1, num: 20 },
            { isSelect: !1, num: 40 },
            { isSelect: !1, num: 100 },
            { isSelect: !1, num: 200 },
          ],
          chip_type_arr: [0, 1, 2, 3],
          chip_list: [4, 8, 10, 16],
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          ready_time: "6",
          bet_time: "5",
        },
    sangong: localStorage.sangong
      ? JSON.parse(localStorage.sangong)
      : {
          ticket_type: 1,
          score_type: 1,
          rule_type: 1,
          bet_type: 1,
          max_count_type: 1, // 1六人房  2九人房
          is_cardjoker: 1, //天公x10,雷公x7,地公x5  1表示默认勾选
          cardbao9: scoreList()[4], //暴玖x9         1表示默认勾选
          cardthreesan: scoreList()[4], //大三公x9
          cardthree: scoreList()[2], //小三公x7
          banker_mode: 4, //模式 2 明牌抢庄 4经典
          banker_score: 4,
          banker1: "unselected",
          banker2: "unselected",
          banker4: "selected",
          cardthreesan_cur: false,
          cardthree_cur: false,
          cardbao9_cur: false,
          not_cur: "",
          ready_time: "6",
          grab_time: "6",
          bet_time: "5",
          show_time: "6",
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
        },
    erbagang: localStorage.erbagang
      ? JSON.parse(localStorage.erbagang)
      : {
          banker_mode: 1, //模式 1 自由抢庄
          score_type: 1, //上庄分数类型
          chip_type: 1, //筹码组选项
          rule_type: 2, //规则
          ticket_count: 1,
          banker1: "selected",
          banker2: "unselected",
          auto: 0,
        },
    landlord: localStorage.landlord
      ? JSON.parse(localStorage.landlord)
      : {
          ticket_count: 1,
          base_score: 1,
          ask_mode: 1,
          auto: 0,
        },
    //麻将
    majiang: localStorage.majiang
      ? JSON.parse(localStorage.majiang)
      : {
          joker: 0,
          horse_count: 0,
          qianggang: 0,
          ticket_count: 1,
          chengbao: 0,
          auto: 0,
        },
    //红中麻将
    gdmajiang: localStorage.gdmajiang
      ? JSON.parse(localStorage.gdmajiang)
      : {
          joker: 0,
          horse_count: 0,
          qianggang: 0,
          ticket_count: 1,
          chengbao: 0,
          auto: 0,
        },
    //HB麻将
    hbmajiang: localStorage.hbmajiang
      ? JSON.parse(localStorage.hbmajiang)
      : {
          score_type: 1,
          joker: 0,
          horse_count: 0,
          qianggang: 0,
          ticket_count: 1,
          chengbao: 0,
          auto: 0,
          is_pph: 0,
          is_qys: 0,
          is_qxd: 0,
          is_wgjb: 0,
          is_gbjb: 0,
          is_qgjb: 0,
          is_ssy: 0,
          ssy_bet_type: 1,
        },
    xiaxie: localStorage.xiaxie
      ? JSON.parse(localStorage.xiaxie)
      : {
          chip_type: 1,
          ticket_type: 1,
          rule_value1: 1,
          upper_limit: 100,
          auto: 0,
        },
    paijiu: localStorage.paijiu
      ? JSON.parse(localStorage.paijiu)
      : {
          max_count_type: 2,
          ticket_type: 1,
          score_type: 1,
          banker_mode: 2, //模式 2 明牌抢庄
          banker1: "unselected",
          banker2: "selected",
          bet_type: 0,
          special_card: 1,
          rule_type: 2,
          ready_time: "6",
          grab_time: "6",
          bet_time: "5",
          show_time: "6",
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          is_double_kill: 0,
          can_rub: 0,
          is_custom_score: 0,
          default_score: 0,
          score_custom: 100,
        },
    //大吃小牛牛 默认建房选项
    dxbull: localStorage.dxbull
      ? JSON.parse(localStorage.dxbull)
      : {
          ticket_type: 1,
          bet_type: 1,
          is_cardfive: 1, //牌型 五花牛(5倍)  1表示默认勾选
          is_cardbomb: 1, //牌型 炸弹牛(6倍)
          is_cardtiny: 1, //牌型 五小牛(8倍)
          auto: 0,
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
          max_count_type: 2,
        },
    //大吃小 默认建房选项
    dcx: localStorage.dcx
      ? JSON.parse(localStorage.dcx)
      : {
          max_count_type: 1, // 1九人房  2十二人房
          ticket_type: 1,
          bet_type: 1,
          is_cardjoker: 0, //天公x10,雷公x7,地公x5  1表示默认勾选
          is_cardbao9: 0, //暴玖x9                 1表示默认勾选
          auto: 0,
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
        },
    //赖子牛牛 默认建房选项
    laibull: localStorage.laibull
      ? JSON.parse(localStorage.laibull)
      : {
          max_count_type: 2, // 1六人房   2九人房  3十二人房
          ticket_type: 1,
          score_type: 1,
          rule_type: 2, //规则 1: 牛牛x3牛九x2牛八x2      2: 牛牛x4牛九x3牛八x2牛七x2
          is_cardfive: 1, //牌型 五花牛(5倍)  1表示默认勾选
          is_cardbomb: 1, //牌型 炸弹牛(6倍)
          is_cardtiny: 1, //牌型 五小牛(8倍)
          is_cardfour: 1,
          is_flush: 1,
          is_calabash: 1,
          is_straight: 1,
          is_sequence: 1,
          banker_mode: 2, //模式 2 明牌抢庄
          banker_score: 0,
          bet_type: 2,
          banker1: "unselected",
          banker2: "selected",
          ready_time: "10",
          grab_time: "10",
          bet_time: "10",
          show_time: "10",
          auto: 0,
        },
    //十三水 默认建房选项
    s13s: localStorage.s13s
      ? JSON.parse(localStorage.s13s)
      : {
          ticket_type: 1,
          score_type: 1,
          ready_time: "10",
          think_time: "30",
        },
    paijiuD: localStorage.paijiuD
      ? JSON.parse(localStorage.paijiuD)
      : {
          max_count_type: 1,
          ticket_type: 1,
          score_type: 1,
          bet_type: 4,
          ready_time: "6",
          grab_time: "6",
          bet_time: "5",
          show_time: "8",
          special_card: 1,
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          is_double_kill: 0,
          is_custom_score: 0,
          default_score: 0,
          score_custom: 100,
        },
    // 超级三加一
    jia31: localStorage.jia31
      ? JSON.parse(localStorage.jia31)
      : {
          ticket_type: 1,
          bet_type: 1,
          score_type: 1,
          ready_time: "6",
          grab_time: "6",
          bet_time: "7",
          show_time: "6",
          auto: 0,
          is_allow_club: 0,
          is_ban_guest: 0,
          max_count_type: 2,
        },
    // 血战金花
    flowerxp: localStorage.flowerxp
      ? JSON.parse(localStorage.flowerxp)
      : {
          default_score: 4, //底筹
          chip_type: 1,
          disable_pk: 0,
          bet_circle: 10, //下注圈数
          look_cond: 0, //必闷圈数
          pk_cond: 1, //比牌条件
          xp_circle: 1, //血拼圈数
          ticket_type: 1,
          chip_list: [4, 8, 16, 20], //筹码组
          base_xp_chip: 40, //血拼筹码基准值
          xp_chip: 120, //血拼筹码
          chip_total: [
            //所有筹码项
            { isSelect: !0, num: 4 },
            { isSelect: !0, num: 8 },
            { isSelect: !0, num: 10 },
            { isSelect: !1, num: 16 },
            { isSelect: !0, num: 20 },
            { isSelect: !1, num: 40 },
            { isSelect: !1, num: 100 },
            { isSelect: !1, num: 200 },
          ],
          auto: 0,
        },
    // 明牌金花
    flowermp: localStorage.flowermp
      ? JSON.parse(localStorage.flowermp)
      : {
          play_mode: 2, //模式   1经典  2明牌
          max_count_type: 1, // 1六人房  2九人房
          default_score: 4,
          chip_type: 1,
          disable_look: 0,
          disable_pk: 0,
          upper_limit: 1000,
          pk_score: 0,
          pk_round: 1,
          look_score: 0,
          ticket_type: 1,
          mode1: "selected",
          mode2: "unselected",
          ready_time: "10",
          bet_time: "15",
          is_laizi: 0, //是否有赖子
          auto: 0,
        },
  };
  $scope.chooseChip = function (e, t) {
    var flower = $scope.createInfo.flower;
    if ("chip_list" == e) {
      if (4 == flower.chip_list.length && !flower.chip_total[t].isSelect) {
        $scope.showResultFunc("已选4组筹码");
        return;
      }
      flower.chip_total[t].isSelect = !flower.chip_total[t].isSelect;
      flower.chip_list = [];
      for (var a = 0; a < flower.chip_total.length; a++) {
        if (flower.chip_total[a].isSelect) {
          flower.chip_list.push(flower.chip_total[a].num);
        }
      }
    }
  };
  $scope.changeRule = function (e, t) {
    var flowerxp = $scope.createInfo.flowerxp;
    if ("chip_list" == e) {
      if (4 == flowerxp.chip_list.length && !flowerxp.chip_total[t].isSelect) {
        return;
      }
      flowerxp.chip_total[t].isSelect = !flowerxp.chip_total[t].isSelect;
      flowerxp.chip_list = [];
      for (var a = 0; a < flowerxp.chip_total.length; a++) {
        if (flowerxp.chip_total[a].isSelect) {
          flowerxp.chip_list.push(flowerxp.chip_total[a].num);
        }
      }
      //根据血拼筹码基准定血拼筹码
      if (flowerxp.chip_list.length >= 1) {
        flowerxp.base_xp_chip =
          flowerxp.chip_list[flowerxp.chip_list.length - 1];
        if (flowerxp.base_xp_chip < 40) {
          flowerxp.base_xp_chip = 40;
        }
      } else {
        flowerxp.base_xp_chip = 40;
      }
      flowerxp.xp_chip = 3 * flowerxp.base_xp_chip;
    } else if ("xp_chip" == e) {
      flowerxp.xp_chip = t;
    }
  };
  $scope.selectChange = function (type, num) {
    if (type == 888) {
      $scope.is_cs = ($scope.is_cs + 1) % 2;
    }
    if ($scope.createInfo.isShow == 1) {
      if (type == 1) {
        $scope.createInfo.bullx.score_type = num;
      } else if (type == 2) {
        $scope.createInfo.bullx.rule_type = num;
      } else if (type == 3) {
        switch (num) {
          case 1:
            $scope.createInfo.bullx.is_cardfour =
              ($scope.createInfo.bullx.is_cardfour + 1) % 2;
            break;
          case 2:
            $scope.createInfo.bullx.is_cardfive =
              ($scope.createInfo.bullx.is_cardfive + 1) % 2;
            break;
          case 3:
            $scope.createInfo.bullx.is_straight =
              ($scope.createInfo.bullx.is_straight + 1) % 2;
            break;
          case 4:
            $scope.createInfo.bullx.is_flush =
              ($scope.createInfo.bullx.is_flush + 1) % 2;
            break;
          case 5:
            $scope.createInfo.bullx.is_calabash =
              ($scope.createInfo.bullx.is_calabash + 1) % 2;
            break;
          case 6:
            $scope.createInfo.bullx.is_cardbomb =
              ($scope.createInfo.bullx.is_cardbomb + 1) % 2;
            break;
          case 7:
            $scope.createInfo.bullx.is_sequence =
              ($scope.createInfo.bullx.is_sequence + 1) % 2;
            break;
          case 8:
            $scope.createInfo.bullx.is_cardtiny =
              ($scope.createInfo.bullx.is_cardtiny + 1) % 2;
            break;
          case 9:
            $scope.createInfo.bullx.is_laizi =
              ($scope.createInfo.bullx.is_laizi + 1) % 2;
            break;
        }
      } else if (type == 4) {
        $scope.createInfo.bullx.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.bullx.banker_score = num;
      } else if (type == 6) {
        $scope.createInfo.bullx.bet_type = num;
      } else if (type == 7) {
        $scope.createInfo.bullx.max_count_type = num;
        $scope.createInfo.bullx.num = "";
        $scope.createInfo.bullx.can_rub = 1;
        if (num == 5) {
          $scope.createInfo.bullx.max_count_type = 3;
          $scope.createInfo.bullx.num = 3;
        }
      } else if (type == 8) {
        $scope.createInfo.bullx.max_count_type = num;
        $scope.createInfo.bullx.num = "";
        $scope.createInfo.bullx.can_rub = 1;
        if (num == 5) {
          $scope.createInfo.bullx.max_count_type = 5;
          $scope.createInfo.bullx.num = 3;
        }
      } else if (type == 9) {
        if ($scope.createInfo.bullx.can_rub == 0) {
          $scope.createInfo.bullx.can_rub = 1;
        } else {
          $scope.createInfo.bullx.can_rub = 0;
        }
      } else if (type == 10) {
        $scope.createInfo.bullx.auto = ($scope.createInfo.bullx.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 4) {
      if (type == 1) {
        $scope.createInfo.flower.max_count_type = num;
      } else if (type == 2) {
        $scope.createInfo.flower.default_score = num;
      } else if (type == 3) {
        // $scope.createInfo.flower.chip_type=num;
        if (
          $scope.createInfo.flower.chip_type_arr.length == 4 &&
          !$scope.createInfo.flower.chip_total[num].isSelect
        ) {
          $scope.showResultFunc("已选择四组筹码");
          return;
        }
        var chip_type_arr = [];
        $scope.createInfo.flower.chip_total[num].isSelect =
          !$scope.createInfo.flower.chip_total[num].isSelect;
        $scope.createInfo.flower.chip_type_arr = [];
        for (var a = 0; a < $scope.createInfo.flower.chip_total.length; a++) {
          if ($scope.createInfo.flower.chip_total[a].isSelect) {
            $scope.createInfo.flower.chip_type_arr.push(
              $scope.createInfo.flower.chip_total[a].num
            );
            chip_type_arr.push(a + 1);
          }
        }
        $scope.createInfo.flower.chip_list =
          $scope.createInfo.flower.chip_type_arr;
        $scope.createInfo.flower.chip_type_arr = chip_type_arr;
      } else if (type == 4) {
        if (num == 1) {
          $scope.createInfo.flower.disable_look =
            ($scope.createInfo.flower.disable_look + 1) % 2;
        } else if (num == 2) {
          $scope.createInfo.flower.disable_pk =
            ($scope.createInfo.flower.disable_pk + 1) % 2;
        } else if (num == 3) {
          $scope.createInfo.flower.is_qp_tp_cur =
            !$scope.createInfo.flower.is_qp_tp_cur;
        } else if (num == 4) {
          $scope.createInfo.flower.has_235 = !$scope.createInfo.flower.has_235;
        }
      } else if (type == 5) {
        $scope.createInfo.flower.upper_limit = num;
      } else if (type == 6) {
        $scope.createInfo.flower.pk_score = num;
      } else if (type == 7) {
        $scope.createInfo.flower.look_score = num;
      } else if (type == 8) {
        $scope.createInfo.flower.ticket_type = num;
      } else if (type == 9) {
        $scope.createInfo.flower.pk_round = num;
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.flower.auto =
              ($scope.createInfo.flower.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.flower.is_allow_club =
              ($scope.createInfo.flower.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.flower.is_ban_guest =
              ($scope.createInfo.flower.is_ban_guest + 1) % 2;
            break;
        }
      } else if (type == 11) {
        $scope.createInfo.flower.swop_score = num;
      } else if ((type = 12)) {
        $scope.createInfo.flower.bet_round = num;
      }
    } else if ($scope.createInfo.isShow == 5) {
      //三公
      if (type == 1) {
        $scope.createInfo.sangong.score_type = num;
      } else if (type == 2) {
        $scope.createInfo.sangong.max_count_type = num;
      } else if (type == 3) {
        if (num == 1) {
          $scope.createInfo.sangong.is_cardjoker =
            ($scope.createInfo.sangong.is_cardjoker + 1) % 2;
        } else if (num == 2) {
        }
        //$scope.createInfo.sangong.is_cardbao9=($scope.createInfo.sangong.is_cardbao9+1)%2;
      } else if (type == 4) {
        $scope.createInfo.sangong.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.sangong.banker_score = num;
      } else if (type == 6) {
        $scope.createInfo.sangong.rule_type = num;
      } else if (type == 7) {
        if (num == 1) {
          $scope.createInfo.sangong.cardthreesan_cur =
            !$scope.createInfo.sangong.cardthreesan_cur;
          //if( $scope.createInfo.sangong.cardthreesan_cur){
          $scope.createInfo.sangong.cardthreesan = scoreList()[4];
          //}else{
          // $scope.createInfo.sangong.cardthreesan= scoreList()[4];
          // }
        }
        if (num == 2) {
          $scope.createInfo.sangong.cardthree_cur =
            !$scope.createInfo.sangong.cardthree_cur;
          // if( $scope.createInfo.sangong.cardthree_cur){
          $scope.createInfo.sangong.cardthree = scoreList()[2];
          // }else{
          //$scope.createInfo.sangong.cardthree= '';
          //}
        }
        if (num == 3) {
          $scope.createInfo.sangong.cardbao9_cur =
            !$scope.createInfo.sangong.cardbao9_cur;
          // if( $scope.createInfo.sangong.cardbao9_cur){
          $scope.createInfo.sangong.cardbao9 = scoreList()[4];
          // }else{
          //  $scope.createInfo.sangong.cardbao9= '';
          // }
        }
      } else if (type == 8) {
        $scope.createInfo.sangong.bet_type = num;
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.sangong.auto =
              ($scope.createInfo.sangong.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.sangong.is_allow_club =
              ($scope.createInfo.sangong.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.sangong.is_ban_guest =
              ($scope.createInfo.sangong.is_ban_guest + 1) % 2;
            break;
        }
      }
    } else if ($scope.createInfo.isShow == 6) {
      if (type == 1) {
        $scope.createInfo.erbagang.score_type = num;
      } else if (type == 2) {
        $scope.createInfo.erbagang.chip_type = num;
      } else if (type == 3) {
        $scope.createInfo.erbagang.rule_type = num;
      } else if (type == 4) {
        $scope.createInfo.erbagang.ticket_count = num;
      } else if (type == 10) {
        $scope.createInfo.erbagang.auto =
          ($scope.createInfo.erbagang.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 7) {
      if (type == 1) {
        $scope.createInfo.landlord.base_score = num;
      } else if (type == 2) {
        $scope.createInfo.landlord.ask_mode = num;
      } else if (type == 3) {
        $scope.createInfo.landlord.ticket_count = num;
      } else if (type == 10) {
        $scope.createInfo.landlord.auto =
          ($scope.createInfo.landlord.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 8) {
      if (type == 1) {
        $scope.createInfo.majiang.joker = num;
      } else if (type == 2) {
        $scope.createInfo.majiang.horse_count = num;
      } else if (type == 3) {
        $scope.createInfo.majiang.qianggang =
          ($scope.createInfo.majiang.qianggang + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.majiang.ticket_count = num;
      } else if (type == 5) {
        $scope.createInfo.majiang.chengbao =
          ($scope.createInfo.majiang.chengbao + 1) % 2;
      } else if (type == 10) {
        $scope.createInfo.majiang.auto =
          ($scope.createInfo.majiang.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 9) {
      if (type == 1) {
        $scope.createInfo.xiaxie.chip_type = num;
      } else if (type == 2) {
        if (num == 1) {
          $scope.createInfo.xiaxie.rule_value1 =
            ($scope.createInfo.xiaxie.rule_value1 + 1) % 2;
        }
      } else if (type == 3) {
        $scope.createInfo.xiaxie.ticket_type = num;
      } else if (type == 4) {
        $scope.createInfo.xiaxie.upper_limit = num;
      } else if (type == 10) {
        $scope.createInfo.xiaxie.auto = ($scope.createInfo.xiaxie.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 10) {
      if (type == 1) {
        $scope.createInfo.paijiu.default_score = num;
        $scope.createInfo.paijiu.is_custom_score = 0;
        $scope.createInfo.paijiu.score_type = num;
      } else if (type == 3) {
        if ($scope.createInfo.paijiu.special_card == 0) {
          $scope.createInfo.paijiu.special_card = 1;
        } else {
          $scope.createInfo.paijiu.special_card = 0;
        }
      } else if (type == 4) {
        $scope.createInfo.paijiu.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.paijiu.bet_type = num;
      } else if (type == 6) {
        $scope.createInfo.paijiu.max_count_type = num;
      } else if (type == 7) {
        $scope.createInfo.paijiu.rule_type = num;
      } else if (type == 8) {
        $scope.createInfo.paijiu.banker_mode = num;
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.paijiu.auto =
              ($scope.createInfo.paijiu.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.paijiu.is_allow_club =
              ($scope.createInfo.paijiu.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.paijiu.is_ban_guest =
              ($scope.createInfo.paijiu.is_ban_guest + 1) % 2;
            break;
          case 4:
            $scope.createInfo.paijiu.is_double_kill =
              ($scope.createInfo.paijiu.is_double_kill + 1) % 2;
            break;
          case 5:
            $scope.createInfo.paijiu.can_rub =
              ($scope.createInfo.paijiu.can_rub + 1) % 2;
            break;
        }
      } else if (type == 11) {
        $scope.createInfo.paijiu.default_score = 0;
        $scope.createInfo.paijiu.is_custom_score = 1;
      }
    } else if ($scope.createInfo.isShow == 12) {
      if (type == 1) {
        $scope.createInfo.dxbull.bet_type = num;
      } else if (type == 3) {
        if (num == 1)
          $scope.createInfo.dxbull.is_cardfive =
            ($scope.createInfo.dxbull.is_cardfive + 1) % 2;
        else if (num == 2)
          $scope.createInfo.dxbull.is_cardbomb =
            ($scope.createInfo.dxbull.is_cardbomb + 1) % 2;
        else if (num == 3)
          $scope.createInfo.dxbull.is_cardtiny =
            ($scope.createInfo.dxbull.is_cardtiny + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.dxbull.ticket_type = num;
      } else if (type == 10) {
        $scope.createInfo.dxbull.auto = ($scope.createInfo.dxbull.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 13) {
      if (type == 1) {
        $scope.createInfo.dcx.bet_type = num;
      } else if (type == 3) {
        if (num == 1)
          $scope.createInfo.dcx.is_cardjoker =
            ($scope.createInfo.dcx.is_cardjoker + 1) % 2;
        else if (num == 2)
          $scope.createInfo.dcx.is_cardbao9 =
            ($scope.createInfo.dcx.is_cardbao9 + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.dcx.ticket_type = num;
      } else if (type == 6) {
        $scope.createInfo.dcx.max_count_type = num;
      } else if (type == 10) {
        $scope.createInfo.dcx.auto = ($scope.createInfo.dcx.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 14) {
      if (type == 1) {
        $scope.createInfo.laibull.score_type = num;
      } else if (type == 2) {
        $scope.createInfo.laibull.rule_type = num;
      } else if (type == 3) {
        switch (num) {
          case 1:
            $scope.createInfo.laibull.is_cardfour =
              ($scope.createInfo.laibull.is_cardfour + 1) % 2;
            break;
          case 2:
            $scope.createInfo.laibull.is_cardfive =
              ($scope.createInfo.laibull.is_cardfive + 1) % 2;
            break;
          case 3:
            $scope.createInfo.laibull.is_straight =
              ($scope.createInfo.laibull.is_straight + 1) % 2;
            break;
          case 4:
            $scope.createInfo.laibull.is_flush =
              ($scope.createInfo.laibull.is_flush + 1) % 2;
            break;
          case 5:
            $scope.createInfo.laibull.is_calabash =
              ($scope.createInfo.laibull.is_calabash + 1) % 2;
            break;
          case 6:
            $scope.createInfo.laibull.is_cardbomb =
              ($scope.createInfo.laibull.is_cardbomb + 1) % 2;
            break;
          case 7:
            $scope.createInfo.laibull.is_sequence =
              ($scope.createInfo.laibull.is_sequence + 1) % 2;
            break;
          case 8:
            $scope.createInfo.laibull.is_cardtiny =
              ($scope.createInfo.laibull.is_cardtiny + 1) % 2;
            break;
        }
      } else if (type == 4) {
        $scope.createInfo.laibull.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.laibull.max_count_type = num;
      } else if (type == 6) {
        $scope.createInfo.laibull.bet_type = num;
      } else if (type == 10) {
        $scope.createInfo.laibull.auto =
          ($scope.createInfo.laibull.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 16) {
      if (type == 1) {
        $scope.createInfo.s13s.score_type = num;
      } else if (type == 4) {
        $scope.createInfo.s13s.ticket_type = num;
      }
    } else if ($scope.createInfo.isShow == 18) {
      if (type == 1) {
        $scope.createInfo.paijiuD.default_score = num;
        $scope.createInfo.paijiuD.is_custom_score = 0;
        $scope.createInfo.paijiuD.score_type = num;
      } else if (type == 3) {
        $scope.createInfo.paijiuD.special_card =
          ($scope.createInfo.paijiuD.special_card + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.paijiuD.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.paijiuD.bet_type = num;
      } else if (type == 6) {
        $scope.createInfo.paijiuD.max_count_type = num;
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.paijiuD.auto =
              ($scope.createInfo.paijiuD.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.paijiuD.is_allow_club =
              ($scope.createInfo.paijiuD.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.paijiuD.is_ban_guest =
              ($scope.createInfo.paijiuD.is_ban_guest + 1) % 2;
            break;
          case 4:
            $scope.createInfo.paijiuD.is_double_kill =
              ($scope.createInfo.paijiuD.is_double_kill + 1) % 2;
            break;
        }
      } else if (type == 11) {
        $scope.createInfo.paijiuD.default_score = 0;
        $scope.createInfo.paijiuD.is_custom_score = 1;
      }
    } else if ($scope.createInfo.isShow == 19) {
      if (type == 1) {
        $scope.createInfo.majiang.joker = num;
      } else if (type == 2) {
        $scope.createInfo.majiang.horse_count = num;
      } else if (type == 3) {
        $scope.createInfo.majiang.qianggang =
          ($scope.createInfo.majiang.qianggang + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.majiang.ticket_count = num;
      } else if (type == 5) {
        $scope.createInfo.majiang.chengbao =
          ($scope.createInfo.majiang.chengbao + 1) % 2;
      } else if (type == 10) {
        $scope.createInfo.majiang.auto =
          ($scope.createInfo.majiang.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 20) {
      if (type == 1) {
        $scope.createInfo.hbmajiang.joker = num;
        if ((num = 0)) {
          $scope.createInfo.hbmajiang.is_wgjb = 1;
        }
      } else if (type == 2) {
        $scope.createInfo.hbmajiang.horse_count = num;
      } else if (type == 3) {
        $scope.createInfo.hbmajiang.qianggang =
          ($scope.createInfo.hbmajiang.qianggang + 1) % 2;
        if ($scope.createInfo.hbmajiang.qianggang == 0) {
          $scope.createInfo.hbmajiang.is_qgjb = 0;
        }
      } else if (type == 4) {
        $scope.createInfo.hbmajiang.ticket_count = num;
      } else if (type == 5) {
        $scope.createInfo.hbmajiang.chengbao =
          ($scope.createInfo.hbmajiang.chengbao + 1) % 2;
      } else if (type == 6) {
        $scope.createInfo.hbmajiang.score_type = num;
      } else if (type == 7) {
        switch (num) {
          case 1:
            $scope.createInfo.hbmajiang.is_pph =
              ($scope.createInfo.hbmajiang.is_pph + 1) % 2;
            break;
          case 2:
            $scope.createInfo.hbmajiang.is_qys =
              ($scope.createInfo.hbmajiang.is_qys + 1) % 2;
            break;
          case 3:
            $scope.createInfo.hbmajiang.is_qxd =
              ($scope.createInfo.hbmajiang.is_qxd + 1) % 2;
            break;
          case 4:
            $scope.createInfo.hbmajiang.is_wgjb =
              ($scope.createInfo.hbmajiang.is_wgjb + 1) % 2;
            break;
          case 5:
            $scope.createInfo.hbmajiang.is_gbjb =
              ($scope.createInfo.hbmajiang.is_gbjb + 1) % 2;
            break;
          case 6:
            $scope.createInfo.hbmajiang.is_qgjb =
              ($scope.createInfo.hbmajiang.is_qgjb + 1) % 2;
            break;
          case 7:
            $scope.createInfo.hbmajiang.is_ssy =
              ($scope.createInfo.hbmajiang.is_ssy + 1) % 2;
            if ($scope.createInfo.hbmajiang.is_ssy == 0) {
              $scope.createInfo.hbmajiang.ssy_bet_type == 1;
            }
            break;
        }
      } else if (type == 8) {
        $scope.createInfo.hbmajiang.ssy_bet_type =
          $scope.createInfo.hbmajiang.ssy_bet_type = num;
      } else if (type == 10) {
        $scope.createInfo.hbmajiang.auto =
          ($scope.createInfo.hbmajiang.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 34) {
      if (type == 1) {
        $scope.createInfo.bbullx.default_score = num;
        $scope.createInfo.bbullx.score_type = num;
        $scope.createInfo.bbullx.is_custom_score = 0;
      } else if (type == 2) {
        $scope.createInfo.bbullx.rule_type = num;
      } else if (type == 3) {
        switch (num) {
          case 1:
            $scope.createInfo.bbullx.is_cardfour =
              ($scope.createInfo.bbullx.is_cardfour + 1) % 2;
            break;
          case 2:
            $scope.createInfo.bbullx.is_cardfive =
              ($scope.createInfo.bbullx.is_cardfive + 1) % 2;
            break;
          case 3:
            $scope.createInfo.bbullx.is_straight =
              ($scope.createInfo.bbullx.is_straight + 1) % 2;
            break;
          case 4:
            $scope.createInfo.bbullx.is_flush =
              ($scope.createInfo.bbullx.is_flush + 1) % 2;
            break;
          case 5:
            $scope.createInfo.bbullx.is_calabash =
              ($scope.createInfo.bbullx.is_calabash + 1) % 2;
            break;
          case 6:
            $scope.createInfo.bbullx.is_cardbomb =
              ($scope.createInfo.bbullx.is_cardbomb + 1) % 2;
            break;
          case 7:
            $scope.createInfo.bbullx.is_sequence =
              ($scope.createInfo.bbullx.is_sequence + 1) % 2;
            break;
          case 8:
            $scope.createInfo.bbullx.is_cardtiny =
              ($scope.createInfo.bbullx.is_cardtiny + 1) % 2;
            break;
          case 9:
            $scope.createInfo.bbullx.is_laizi =
              ($scope.createInfo.bbullx.is_laizi + 1) % 2;
            break;
          case 10:
            $scope.createInfo.bbullx.is_cardtinyfour =
              ($scope.createInfo.bbullx.is_cardtinyfour + 1) % 2;
            break;
          case 11:
            $scope.createInfo.bbullx.is_cardnbomb =
              ($scope.createInfo.bbullx.is_cardnbomb + 1) % 2;
            break;
        }
      } else if (type == 4) {
        $scope.createInfo.bbullx.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.bbullx.banker_score = num;
      } else if (type == 6) {
        $scope.createInfo.bbullx.bet_type = num;
      } else if (type == 7) {
        $scope.createInfo.bbullx.max_count_type = num;
      } else if (type == 9) {
        if ($scope.createInfo.bbullx.can_rub == 0) {
          $scope.createInfo.bbullx.can_rub = 1;
        } else {
          $scope.createInfo.bbullx.can_rub = 0;
        }
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.bbullx.auto =
              ($scope.createInfo.bbullx.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.bbullx.is_allow_club =
              ($scope.createInfo.bbullx.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.bbullx.is_ban_guest =
              ($scope.createInfo.bbullx.is_ban_guest + 1) % 2;
            break;
          case 4:
            $scope.createInfo.bbullx.is_double_kill =
              ($scope.createInfo.bbullx.is_double_kill + 1) % 2;
            break;
        }
      } else if (type == 11) {
        $scope.createInfo.bbullx.default_score = 0;
        $scope.createInfo.bbullx.is_custom_score = 1;
      }
    } else if ($scope.createInfo.isShow == 17) {
      if (type == 1) {
        $scope.createInfo.jia31.score_type = num;
      } else if (type == 2) {
        $scope.createInfo.jia31.bet_type = num;
      } else if (type == 3) {
        $scope.createInfo.jia31.ticket_type = num;
      } else if (type == 4) {
        $scope.createInfo.jia31.max_count_type = num;
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.jia31.auto =
              ($scope.createInfo.jia31.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.jia31.is_allow_club =
              ($scope.createInfo.jia31.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.jia31.is_ban_guest =
              ($scope.createInfo.jia31.is_ban_guest + 1) % 2;
            break;
        }
      }
    } else if ($scope.createInfo.isShow == 38) {
      if (type == 2) {
        $scope.createInfo.flowerxp.default_score = num;
      } else if (type == 3) {
        $scope.createInfo.flowerxp.chip_type = num;
      } else if (type == 4) {
        if (num == 2) {
          $scope.createInfo.flowerxp.disable_pk =
            ($scope.createInfo.flowerxp.disable_pk + 1) % 2;
        }
      } else if (type == 5) {
        $scope.createInfo.flowerxp.bet_circle = num;
      } else if (type == 6) {
        $scope.createInfo.flowerxp.look_cond = num;
      } else if (type == 7) {
        $scope.createInfo.flowerxp.pk_cond = num;
      } else if (type == 8) {
        $scope.createInfo.flowerxp.xp_circle = num;
      } else if (type == 9) {
        $scope.createInfo.flowerxp.ticket_type = num;
      } else if (type == 10) {
        $scope.createInfo.flowerxp.auto =
          ($scope.createInfo.flowerxp.auto + 1) % 2;
      }
    } else if ($scope.createInfo.isShow == 39) {
      //明牌金花
      if (type == 1) {
        $scope.createInfo.flower.max_count_type = num;
      } else if (type == 2) {
        $scope.createInfo.flower.default_score = num;
      } else if (type == 3) {
        $scope.createInfo.flower.chip_type = num;
      } else if (type == 4) {
        if (num == 1) {
          $scope.createInfo.flower.disable_look =
            ($scope.createInfo.flower.disable_look + 1) % 2;
        } else if (num == 2) {
          $scope.createInfo.flower.disable_pk =
            ($scope.createInfo.flower.disable_pk + 1) % 2;
        } else if (num == 4) {
          $scope.createInfo.flower.is_laizi =
            ($scope.createInfo.flower.is_laizi + 1) % 2;
        }
      } else if (type == 5) {
        $scope.createInfo.flower.upper_limit = num;
      } else if (type == 6) {
        $scope.createInfo.flower.pk_score = num;
      } else if (type == 7) {
        $scope.createInfo.flower.look_score = num;
      } else if (type == 8) {
        $scope.createInfo.flower.ticket_type = num;
      }
    } else if ($scope.createInfo.isShow == 43) {
      if (type == 1) {
        $scope.createInfo.zzbull.default_score = num;
        $scope.createInfo.zzbull.score_type = num;
        $scope.createInfo.zzbull.is_custom_score = 0;
      } else if (type == 2) {
        $scope.createInfo.zzbull.rule_type = num;
      } else if (type == 3) {
        $scope.createInfo.zzbull.special_card =
          ($scope.createInfo.zzbull.special_card + 1) % 2;
      } else if (type == 4) {
        $scope.createInfo.zzbull.ticket_type = num;
      } else if (type == 5) {
        $scope.createInfo.zzbull.banker_score = num;
      } else if (type == 6) {
        $scope.createInfo.zzbull.bet_type = num;
      } else if (type == 7) {
        if (num == 6) {
          $scope.createInfo.zzbull.is_add_card = 0;
          $scope.createInfo.zzbull.max_count_type = 1;
        } else {
          $scope.createInfo.zzbull.max_count_type = num;
          $scope.createInfo.zzbull.is_add_card = 1;
        }
      } else if (type == 9) {
        if ($scope.createInfo.zzbull.can_rub == 0) {
          $scope.createInfo.zzbull.can_rub = 1;
        } else {
          $scope.createInfo.zzbull.can_rub = 0;
        }
      } else if (type == 10) {
        switch (num) {
          case 1:
            $scope.createInfo.zzbull.auto =
              ($scope.createInfo.zzbull.auto + 1) % 2;
            break;
          case 2:
            $scope.createInfo.zzbull.is_allow_club =
              ($scope.createInfo.zzbull.is_allow_club + 1) % 2;
            break;
          case 3:
            $scope.createInfo.zzbull.is_ban_guest =
              ($scope.createInfo.zzbull.is_ban_guest + 1) % 2;
            break;
          case 4:
            $scope.createInfo.zzbull.is_double_kill =
              ($scope.createInfo.zzbull.is_double_kill + 1) % 2;
            break;
        }
      } else if (type == 11) {
        $scope.createInfo.zzbull.default_score = 0;
        $scope.createInfo.zzbull.is_custom_score = 1;
      }
    }
  };
  $scope.nextRecord = function () {
    var beforeIndex = parseInt($(" .showNumber i").text());
    if (beforeIndex < 5) {
      var afterIndex = beforeIndex + 1;
      $(".showNumber i").text(afterIndex);
      $(".showNumber").attr("data-pos", afterIndex);
      $scope.createInfo.bbullx.score_type = afterIndex;
    }
  };
  $scope.prevRecord = function () {
    var beforeIndex = parseInt($(" .showNumber i").text());
    if (beforeIndex > 1) {
      var afterIndex = beforeIndex - 1;
      $(".showNumber i").text(afterIndex);
      $(".showNumber").attr("data-pos", afterIndex);
      $scope.createInfo.bbullx.score_type = afterIndex;
    }
  };
  $scope.nextRecordFlower = function () {
    if ($scope.createInfo.flower.pk_score == 500) {
      return;
    }
    beforeIndex = $scope.createInfo.flower.pk_score / 25;
    var afterIndex = beforeIndex + 1;
    $(".processColor").width(afterIndex * 5 + "%");
    $scope.createInfo.flower.pk_score += 25;
  };
  $scope.prevRecordFlower = function () {
    if ($scope.createInfo.flower.pk_score == 0) {
      return;
    }
    beforeIndex = $scope.createInfo.flower.pk_score / 25;
    var afterIndex = beforeIndex - 1;
    $(".processColor").width(afterIndex * 5 + "%");
    $scope.createInfo.flower.pk_score -= 25;
  };
  $scope.nextRecordFlowerLook = function () {
    if ($scope.createInfo.flower.look_score == 500) {
      return;
    }
    beforeIndex = $scope.createInfo.flower.look_score / 25;
    var afterIndex = beforeIndex + 1;
    $(".processColorLook").width(afterIndex * 5 + "%");
    $scope.createInfo.flower.look_score += 25;
  };
  $scope.prevRecordFlowerLook = function () {
    if ($scope.createInfo.flower.look_score == 0) {
      return;
    }
    beforeIndex = $scope.createInfo.flower.look_score / 25;
    var afterIndex = beforeIndex - 1;
    $(".processColorLook").width(afterIndex * 5 + "%");
    $scope.createInfo.flower.look_score -= 25;
  };
  $scope.createBullx = function (max_count) {
    document.getElementById("media").play();
    leftTop();
    if (max_count) {
      $scope.createInfo.bullx.max_count_type = max_count;
    }
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 1;
  };
  // 牛牛新合集
  $scope.createBBullx = function () {
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    // $scope.createInfo.bbullx.max_count_type = 4;
    // $scope.createInfo.bbullx.score_type = 1;
    // $(".createRoom .mainPart").addClass('yh');
    if ($scope.createInfo.bbullx.is_custom_score == 0) {
      $scope.createInfo.bbullx.default_score =
        $scope.createInfo.bbullx.score_type;
    }
    $scope.createInfo.isShow = 34;
  };
  //6人
  $scope.createBullx6 = function () {
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.bullx.max_count_type = 1;
    //$(".createRoom .mainPart").addClass('yh');
    //$('.createTitle').hide();
    $scope.createInfo.isShow = 15;
  };
  //10人
  $scope.createBullx10 = function () {
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.bullx.max_count_type = 4;
    //$(".createRoom .mainPart").addClass('yh');
    //$('.createTitle').hide();
    $scope.createInfo.isShow = 17;
  };
  //13人
  $scope.createBullx13 = function () {
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.bullx.max_count_type = 5;
    //$(".createRoom .mainPart").addClass('yh');
    //$('.createTitle').hide();
    $scope.createInfo.isShow = 18;
  };
  $scope.isShowMaxCount = false;
  //炸金花
  $scope.createFlower = function (e) {
    document.getElementById("media").play();
    leftTop();
    $scope.isShowCopy = false;
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 4;
    $scope.createInfo.flower.play_mode = 1;
    $scope.createInfo.flower.isShowLimit = false;
    $scope.createInfo.flower.isShowSwopBet = false;
    // $scope.createInfo.flower.upper_limit==0;
    $scope.createInfo.flower.isShowBetRound = true;
    if (e == "jd") {
      $scope.createInfo.flower.play_type = 1;
      $scope.createInfo.flower.isShowLaizi = 0;
      $scope.createInfo.flower.laizi_num = "0";
      $scope.createInfo.flower.isShowLimit = true;
      $scope.createInfo.flower.swop_score = 0;
      $scope.createInfo.flower.isShowBetRound = false;
      $scope.createInfo.flower.bet_round = 0;
    } else if (e == "big") {
      $scope.createInfo.flower.play_type = 2;
      $scope.createInfo.flower.isShowLaizi = 0;
      $scope.createInfo.flower.laizi_num = "0";
      $scope.createInfo.flower.isShowLimit = true;
      $scope.createInfo.flower.swop_score = 0;
      $scope.createInfo.flower.is_big_flower = 1;
    } else if (e == "super") {
      $scope.createInfo.flower.play_type = 5;
      $scope.createInfo.flower.isShowLaizi = 0;
      $scope.createInfo.flower.laizi_num = "0";
      $scope.createInfo.flower.swop_score = 0;
    } else if (e == "mp") {
      $scope.createInfo.flower.play_type = 1;
      $scope.createInfo.flower.play_mode = 2;
      $scope.createInfo.flower.isShowLaizi = 1;
      $scope.createInfo.flower.swop_score = 0;
    } else if (e == "lz") {
      $scope.createInfo.flower.play_type = 1;
      $scope.createInfo.flower.isShowLaizi = 1;
      $scope.createInfo.flower.swop_score = 0;
      $scope.createInfo.flower.laizi_num = "2";
    } else if (e == "hp") {
      $scope.createInfo.flower.play_type = 4;
      $scope.createInfo.flower.isShowSwopBet = true;
      $scope.createInfo.flower.isShowLaizi = 0;
      $scope.createInfo.flower.upper_limit = 0;
      $scope.createInfo.flower.swop_score = 40;
      $scope.createInfo.flower.laizi_num = "0";
    }
    $(".showNumber2").css("width", "100%");
  };
  // 明牌金花
  $scope.isShowFlowerMaxCount = false;
  $scope.createFlowermp = function () {
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");

    $scope.isShowFlowerMaxCount = true;

    $scope.createInfo.isShow = 4;
    $scope.createInfo.flower.isShowLimit = false;
    $scope.createInfo.flower.isShowSwopBet = false;
    $scope.createInfo.flower.play_type = 1;
    $scope.createInfo.flower.play_mode = 2;
    $scope.createInfo.flower.isShowLaizi = 1;
    $scope.createInfo.flower.swop_score = 0;
  };
  $scope.createSangong = function (max_count) {
    document.getElementById("media").play();
    if (max_count) {
      $scope.createInfo.sangong.max_count_type = max_count;
    }

    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 5;
  };
  // 牛牛新合集
  $scope.createZzbull = function () {
    $scope.showResultFunc("敬请期待");
    return;
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");

    if ($scope.createInfo.zzbull.is_custom_score == 0) {
      $scope.createInfo.zzbull.default_score =
        $scope.createInfo.zzbull.score_type;
    }
    $scope.createInfo.isShow = 43;
  };
  $scope.createErba = function () {
    //$scope.showResultFunc('敬请期待')
    // return
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 6;
  };
  $scope.createLandlord = function () {
    // $scope.showResultFunc('敬请期待')
    //  return
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 7;
  };
  $scope.createMajiang = function () {
    // $scope.showResultFunc('敬请期待')
    // return
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 8;
  };
  $scope.createHzMajiang = function () {
    // $scope.showResultFunc('敬请期待')
    // return
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 19;
  };
  $scope.createHbMajiang = function () {
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 20;
  };
  $scope.createXiaxie = function () {
    $scope.showResultFunc("敬请期待");
    return;
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 9;
  };
  $scope.createPaijiu = function () {
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    if ($scope.createInfo.paijiu.is_custom_score == 0) {
      $scope.createInfo.paijiu.default_score =
        $scope.createInfo.paijiu.score_type;
    }
    $scope.createInfo.isShow = 10;
  };
  $scope.createDxBull = function () {
    document.getElementById("media").play();
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 12;
  };
  $scope.createDcx = function () {
    document.getElementById("media").play();
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 13;
  };
  $scope.createLaiBull = function () {
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 14;
  };

  $scope.createS13s = function () {
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    $scope.createInfo.isShow = 16;
  };
  $scope.createPaijiuD = function () {
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    // $(".createRoom .mainPart").addClass('yh');
    if ($scope.createInfo.paijiuD.is_custom_score == 0) {
      $scope.createInfo.paijiuD.default_score =
        $scope.createInfo.paijiuD.score_type;
    }
    $scope.createInfo.isShow = 18;
  };
  $scope.createJia31 = function () {
    document.getElementById("media").play();
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    // $(".createRoom .mainPart").addClass('yh');
    $scope.createInfo.isShow = 17;
  };

  $scope.createFlowerxp = function () {
    $scope.showResultFunc("敬请期待");
    return;
    leftTop();
    $(".createRoom .mainPart").css("height", "");
    $(".createRoom .mainPart .blueBack").css("height", "");
    // $(".createRoom .mainPart").addClass('yh');
    $scope.createInfo.isShow = 38;
  };
  $scope.selectBankerMode6 = function (type) {
    $scope.createInfo.bullx.banker1 = "unselected";
    $scope.createInfo.bullx.banker2 = "unselected";
    $scope.createInfo.bullx.banker3 = "unselected";
    $scope.createInfo.bullx.banker4 = "unselected";
    $scope.createInfo.bullx.banker5 = "unselected";
    $scope.createInfo.bullx["banker" + type] = "selected";
    $scope.createInfo.bullx.banker_mode = type;
  };
  $scope.selectFlowerMode = function (mode, type) {
    if (mode == 38) {
      $scope.showResultFunc("敬请期待");
      return;
    }
    if (type == 2) {
      $scope.createInfo.isShow = mode;
      $scope.createInfo.flower.mode = type;
    } else {
      $scope.createInfo.isShow = mode;
      $scope.createInfo.flower.mode = mode;
    }
    $scope.createInfo.flower.play_mode = type;
  };
  $scope.selectBankerModeNew = function (type) {
    $scope.createInfo.bbullx.banker1 = "unselected";
    $scope.createInfo.bbullx.banker2 = "unselected";
    $scope.createInfo.bbullx.banker3 = "unselected";
    $scope.createInfo.bbullx.banker4 = "unselected";
    $scope.createInfo.bbullx.banker5 = "unselected";
    $scope.createInfo.bbullx["banker" + type] = "selected";
    $scope.createInfo.bbullx.banker_mode = type;
  };
  $scope.selectBankerModeZzbull = function (type) {
    $scope.createInfo.zzbull.banker1 = "unselected";
    $scope.createInfo.zzbull.banker2 = "unselected";
    $scope.createInfo.zzbull.banker3 = "unselected";
    $scope.createInfo.zzbull.banker4 = "unselected";
    $scope.createInfo.zzbull.banker5 = "unselected";
    $scope.createInfo.zzbull["banker" + type] = "selected";
    $scope.createInfo.zzbull.banker_mode = type;
  };

  $scope.selectBankerModeSangong = function (type) {
    $scope.createInfo.sangong.banker1 = "unselected";
    $scope.createInfo.sangong.banker2 = "unselected";
    $scope.createInfo.sangong.banker4 = "unselected";
    $scope.createInfo.sangong["banker" + type] = "selected";
    $scope.createInfo.sangong.banker_mode = type;
  };
  $scope.selectBankerModeErbagang = function (type) {
    if (type == 1) {
      $scope.createInfo.erbagang.banker1 = "selected";
      $scope.createInfo.erbagang.banker2 = "unselected";
    } else if (type == 2) {
      $scope.createInfo.erbagang.banker1 = "unselected";
      $scope.createInfo.erbagang.banker2 = "selected";
    }
    $scope.createInfo.erbagang.banker_mode = type;
  };

  $scope.selectBankerModePaijiu = function (type) {
    $scope.createInfo.paijiu.banker1 = "unselected";
    $scope.createInfo.paijiu.banker2 = "unselected";
    $scope.createInfo.paijiu["banker" + type] = "selected";
    $scope.createInfo.paijiu.banker_mode = type;
  };

  $scope.selectBankerModeLaibull = function (type) {
    $scope.createInfo.laibull.banker1 = "unselected";
    $scope.createInfo.laibull.banker2 = "unselected";
    $scope.createInfo.laibull["banker" + type] = "selected";
    $scope.createInfo.laibull.banker_mode = type;
  };

  $scope.hideBindPhone = function () {
    $scope.createInfo.laibull.banker1 = "unselected";
  };

  $scope.createCommit = function () {
    document.getElementById("media").play();
    if ($scope.userInfo.card > 0) {
      if ($scope.is_operation) {
        return 0;
      }

      if (
        $scope.createInfo.isShow == 38 &&
        4 != $scope.createInfo.flowerxp.chip_list.length
      ) {
        $scope.showResultFunc("请选择四组筹码");
        return;
      }
      if (
        $scope.createInfo.isShow == 4 &&
        $scope.createInfo.flower.chip_type_arr.length < 4
      ) {
        $scope.showResultFunc("请选择四组筹码");
        return;
      }

      $scope.waiting();

      switch ($scope.createInfo.isShow) {
        case 1:
          //13人牛调用另外的gw
          if ($scope.createInfo.bullx.max_count_type == 5) {
            $scope.connectSocket(
              data.ws_ip + "/gamebdn",
              $scope.createInfo.isShow
            );
            localStorage.bullx = JSON.stringify($scope.createInfo.bullx);
          } else {
            $scope.connectSocket(
              data.ws_ip + "/gamedn",
              $scope.createInfo.isShow
            );
            localStorage.bullx = JSON.stringify($scope.createInfo.bullx);
          }
          break;
        case 4:
          $scope.connectSocket(
            data.ws_ip + "/gamezjh",
            $scope.createInfo.isShow
          );
          localStorage.flower = JSON.stringify($scope.createInfo.flower);
          break;
        case 5:
          $scope.connectSocket(
            data.ws_ip + "/gamesg",
            $scope.createInfo.isShow
          );
          localStorage.sangong = JSON.stringify($scope.createInfo.sangong);
          break;
        case 6:
          $scope.connectSocket(
            data.ws_ip + "/gaeeebk",
            $scope.createInfo.isShow
          );
          localStorage.erbagang = JSON.stringify($scope.createInfo.erbagang);
          break;
        case 7:
          $scope.connectSocket(
            data.ws_ip + "/gameddz",
            $scope.createInfo.isShow
          );
          localStorage.landlord = JSON.stringify($scope.createInfo.landlord);
          break;
        case 8:
          $scope.connectSocket(
            data.ws_ip + "/gamemj",
            $scope.createInfo.isShow
          );
          localStorage.majiang = JSON.stringify($scope.createInfo.majiang);
          break;
        case 9:
          $scope.connectSocket(
            data.ws_ip + "/gamexx",
            $scope.createInfo.isShow
          );
          localStorage.xiaxie = JSON.stringify($scope.createInfo.xiaxie);
          break;
        case 10:
          $scope.connectSocket(
            data.ws_ip + "/gamepj",
            $scope.createInfo.isShow
          );
          localStorage.paijiu = JSON.stringify($scope.createInfo.paijiu);
          break;
        case 12:
          $scope.connectSocket(
            data.ws_ip + "/gamedxdn",
            $scope.createInfo.isShow
          );
          localStorage.dxbull = JSON.stringify($scope.createInfo.dxbull);
          break;
        case 13:
          $scope.connectSocket(
            data.ws_ip + "/gamedcx",
            $scope.createInfo.isShow
          );
          localStorage.dcx = JSON.stringify($scope.createInfo.dcx);
          break;
        case 14:
          $scope.connectSocket(
            data.ws_ip + "/gamelzdn",
            $scope.createInfo.isShow
          );
          localStorage.laibull = JSON.stringify($scope.createInfo.laibull);
          break;
        case 16:
          $scope.connectSocket(
            data.ws_ip + "/gamesss",
            $scope.createInfo.isShow
          );
          localStorage.s13s = JSON.stringify($scope.createInfo.s13s);
          break;
        case 17:
          $scope.connectSocket(
            data.ws_ip + "/gamejia",
            $scope.createInfo.isShow
          );
          localStorage.jia31 = JSON.stringify($scope.createInfo.jia31);
          break;
        case 18:
          $scope.connectSocket(
            data.ws_ip + "/gamedpj",
            $scope.createInfo.isShow
          );
          localStorage.paijiuD = JSON.stringify($scope.createInfo.paijiuD);
          break;
        case 19:
          $scope.connectSocket(
            data.ws_ip + "/gamegdmj",
            $scope.createInfo.isShow
          );
          localStorage.majiang = JSON.stringify($scope.createInfo.majiang);
          break;
        case 20:
          $scope.gameType = 20;
          httpModule.createMj();
          break;
        case 34: //牛牛新合集banker_score_type
          $scope.connectSocket(
            data.ws_ip + "/gamebdn",
            $scope.createInfo.isShow
          );
          localStorage.bbullx = JSON.stringify($scope.createInfo.bbullx);
          break;
        case 38:
          $scope.connectSocket(
            data.ws_ip + "/gamexp",
            $scope.createInfo.isShow
          );
          localStorage.flowerxp = JSON.stringify($scope.createInfo.flowerxp);
          break;
        // 明牌金花
        case 39:
          $scope.connectSocket(
            data.ws_ip + "/gamezjh",
            $scope.createInfo.isShow
          );
          localStorage.flowermp = JSON.stringify($scope.createInfo.flowermp);
          break;
        //case 43: //至尊牛
        //    $scope.connectSocket("//", $scope.createInfo.isShow);
        //    localStorage.zzbull = JSON.stringify($scope.createInfo.zzbull);
        //    break;
      }
    } else {
      $scope.isShowHallTip = true;
      $scope.cancelCreate();
      $scope.tipText = "房卡不足";
    }
  };

  var wsapi;
  var width = window.innerWidth;
  var height = window.innerHeight;

  $scope.part = 2;
  $scope.cancelLog = true;
  $scope.isReconnect = true;
  $scope.connectOrNot = true;
  $scope.is_send_getGameData = true;
  $scope.club_info = {
    club_id: 0,
    club_name: "",
    is_self: 0,
    level: "",
  };
  $scope.club_list = "";
  $scope.is_cs = 0;
  $scope.guild_list = "";
  $scope.my_guild_id = 0;
  $scope.choose_guild={
  },
  $scope.is_cs = 0;
  $scope.guild_seting = {
    game_type: 1,
    val0: 0,
    val1: 0,
    val2: 0,
    val3: 0,
    // is_minus: 0,
    type: 1,
    low_score: 0,
    join_limit: 0,
    ready_limit: 0,
    bank_limit: 0,
    bet_limit: 0,
    is_all: 0,
  };
  $scope.my_club_info = "";
  $scope.my_guild_info = {};
  $scope.blockBtn = false;
  $scope.isShowApply = false;
  $scope.new_club_name = "";
  $scope.new_guild_name = "";
  $scope.user_info = "";
  $scope.giftList = [];
  $scope.bgH = null;
  $scope.bgW = null;
  $scope.giftInfo = {};
  $scope.spend_num = 0;
  $scope.isGiftInfo = false;
  $scope.skin_expire_type = 1;
  $scope.isGitListShow = false;
  $scope.is_open_chat = 0;
  $scope.showType = 0;
  $scope.loadingNum = 0;
  $scope.loadingTimer = "";
  $scope.loadingUrl = "";
  $scope.isShowLoading = true;
  $scope.isShowTipBindPhone = false;
  $scope.isShowLoading2 = false;
  $scope.maxCount = [6, 9, 12, 10, 13, 15, 17];
  $scope.gameName = [
    { game_type: "1", game_name: "牛牛" },
    { game_type: "4", game_name: "炸金花" },
    { game_type: "5", game_name: "三公" },
    { game_type: "6", game_name: "二八杠" },
    { game_type: "7", game_name: "斗地主" },
    { game_type: "8", game_name: "广东麻将" },
    { game_type: "9", game_name: "鱼虾蟹" },
    { game_type: "10", game_name: "九人牌九" },
    { game_type: "12", game_name: "大吃小牛牛" },
    { game_type: "13", game_name: "大吃小" },
    { game_type: "17", game_name: "超级三加一" },
    { game_type: "18", game_name: "大牌九" },
  ];
  $scope.connectOrNot = true;
  $scope.max_count_title = "";
  $scope.tzUrl = "";
  $scope.is_send_getGameData = true;
  $scope.is_can_send = false;
  $scope.isShowClubMember = false;
  $scope.isShowGuildMember = false;
  $scope.is_show_club = false;
  $scope.is_show_guild = false;
  $scope.isShowAlert = false;
  $scope.isShowMaxCount = false;
  $scope.func = "";
  $scope.auto = "";
  $scope.isShowNoty = false;
  $scope.notyMsg = "";
  $scope.is_operation_room = false;
  $scope.is_connect = false;
  $scope.room_number = 0;
  $scope.data_key = "";
  $scope.room_id = 0;
  $scope.gameType = 0;
  $scope.week_cs = 0;
  $scope.day_cs = 0;
  $scope.isShowSwitchGroup = false;
  $scope.isShowSwitchGuild = false;
  $scope.isShowResult = false;
  $scope.showResultText = "";
  $scope.org_list = "";
  $scope.isReconnect = true;
  $scope.tables = [];
  $scope.club_info = {
    club_id: 0,
    club_name: "",
    is_self: 0,
    level: "",
  };
  $scope.club_creator = "";
  $scope.isOpenClub = false;
  $scope.isOpenGuild = false;
  $scope.isClickCloseClub = false;
  $scope.is_self = false;
  $scope.op_club_id = 0;
  $scope.currentRoomPage = 1;
  $scope.currentCsPage = 1;
  $scope.currentGuildRoomPage = 1;
  $scope.totalRoomPage = 1;
  $scope.room_list = [];
  $scope.guild_room_list = [];
  $scope.member_list = [];
  $scope.guild_cs_list = [];
  $scope.guild_score_list = [];
  $scope.guild_member_list = [];
  $scope.opMemberId = 0;
  $scope.memberListTotalPage = 1;
  $scope.memberListPage = 0;
  $scope.height = window.innerHeight;
  $scope.roomCard = Math.ceil(globalData.card);
  $scope.user = userData;
  $scope.activity = [];
  $scope.isShowInvite = false;
  $scope.isShowShop = false;
  $scope.isShowMessage = false;
  $scope.showChangeGuideName = false;
  // $scope.guideName= userData.guideName;
  $scope.roomCardInfo = [];
  $scope.select = 1;
  $scope.ticket_count = 0;
  $scope.isDealing = false;
  $scope.isShowShopLoading = false;
  $scope.gameItems = [];
  $scope.startDate = "";
  $scope.endDate = "";
  $scope.sPhone = "";
  $scope.isPhone = false;
  $scope.isHasMyCode = false;
  $scope.isShowBindPhone = false;
  $scope.isShowQuitConfirm = false;
  $scope.isShowDeleteGame = false;
  $scope.isShowEditScore = false;
  $scope.isShowJoinRoom = false;
  $scope.quitTipText = "";
  $scope.joinTipText = "";
  $scope.isShowMyCode = true;
  $scope.isShowMyAccount = false;
  $scope.showSendCards = 0;
  $scope.sendCardsResult = false;
  $scope.showFeature = false;
  $scope.sendText = "";
  $scope.showResult = 2;
  $scope.addUser = {
    isShow1: false,
    isShow2: false,
    text1: "",
    text2: "",
    name: "",
    code: "",
    card: 0,
    accountCode: "",
    addUser: "",
  };
  ($scope.searchUser = {
    searchText: "",
  search_score_account_id : 0,
  }),
    ($scope.addMember = {
      isShow: false,
      text1: "",
      text2: "",
      name: "",
      code: "",
      card: 0,
      accountCode: "",
      avatar: "",
      remark: "",
    });
  $scope.addGuildMember = {
    isShow: false,
    text1: "",
    text2: "",
    name: "",
    code: "",
    card: 0,
    accountCode: "",
    avatar: "",
    remark: "",
  };
  $scope.isShowDelete = false;
  $scope.isShowKickConfirm = false;
  $scope.isShowSetting = false;
  $scope.nowItem = false;
  $scope.nowName = "";
  $scope.nowMname = "";
  $scope.choose_score = 0;
  $scope.searchText = "";
  $scope.members = [];
  $scope.sAuthcode = "";
  $scope.sPassword = "";
  $scope.isMyMange = false; //是否显示切换按钮
  $scope.isMyGuildMange = false; //是否显示切换按钮
  $scope.myMangeClubInfo = ""; //我当前选择的 公会id，默认第一个
  $scope.myMangeGuildInfo = ""; //我当前选择的 id，默认第一个
  $scope.my_mange_club_list = []; //我管理的公会列表
  $scope.my_mange_guild_list = []; //我管理的chaguan列表
  $scope.isShowMemberSwitchGroup = false; //切换弹框
  $scope.isShowCreateClub = false;
  $scope.isShowGuildClub = false;
  $scope.isShowOpenClub = false;
  $scope.isShowOpenGuild = false;
  $scope.isShowTip = false;
  $scope.isShowHallTip = false;
  $scope.tipText = ""; //切换弹框
  $scope.isShowMemberMange = false;
  $scope.isShowGuildMemberMange = false;
  $scope.isShowClubList = false;
  $scope.chooseClub = "";
  $scope.chooseGuild = "";
  $scope.updatePhone = {
    phoneError: "",
    authcodeError: "",
  };
  $scope.setPassword_show = false;
  $scope.username = "";
  $scope.password = "";
  $scope.passwordR = "";
  $scope.isShowIndiv = false;
  $scope.isShowIndivConfirm = false;
  $scope.isShowIndivBefore = false;
  $scope.isShowGuildSetting = false;
  $scope.isShowCsGuildShow = false;
  $scope.isShowGuildMemberScore = false;
  $scope.individuality = null;
  $scope.isShowJoinClub = false;
  $scope.addClubId = null;
  $scope.shopSelectType = 1;
  $scope.allCardName = [
    "青花瓷",
    "黑桃A",
    "猪年大吉",
    "福星高照",
    "欧式花纹",
    "幸运星",
    "经典扑克",
    "菱形宝石",
    "无敌战神",
    "唯美天使",
    "至尊王牌",
  ];
  $scope.allFramesName = [
    "瑞气祥云",
    "王者之星",
    "蓝色猫爪",
    "粉红猫爪",
    "晴天娃娃",
    "快乐娃娃",
    "冰蓝之心",
    "天使之翼",
    "至尊皇冠",
    "可爱熊猫",
    "无厘头",
    "双喜临门",
  ];

  function logMessage(message) {
  }

  var wsOperation = {
    CreateRoom: "CreateRoom",
    getGameData: "getGameData",
    openClub: "openClub",
    openGuild: "openGuild",
    closeGuild: "closeGuild",
    closeClub: "closeClub",
    getClubInfo: "getClubInfo",
    getClubRoomList: "getClubRoomList",
    getGuildRoomList: "getGuildRoomList",
    getClubMemberList: "getClubMemberList",
    getGuildMemberList: "getGuildMemberList",
    getGuildGameSetting: "getGuildGameSetting",
    getGuildCsList: "getGuildCsList",
    getGuildScoreList: "getGuildScoreList",
    delClubMember: "delClubMember",
    delGuildMember: "delGuildMember",
    setClubManage: "setClubManage",
    cancelClubManage: "cancelClubManage",
    overGame: "overGame",
    cancelAutoRoom: "cancelAutoRoom",
    quitClub: "quitClub",
    searchAccount: "searchAccount",
    addClubMember: "addClubMember",
    addGuildMember: "addGuildMember",
    createChatRoom: "createChatRoom",
    updateClub: "updateClub",
    updateGuild: "updateGuild",
    saveGuildGameSetting: "saveGuildGameSetting",
    getOtherRoomList: "getOtherRoomList",
    rejectClubMember: "rejectClubMember",
    agreeClubMember: "agreeClubMember",
  agreeGuildMember:"agreeGuildMember",
    remarkClubMember: "remarkClubMember",
    remarkGuildMember: "remarkGuildMember",
    editGuildScore: "editGuildScore",
    subGuildScore: "subGuildScore",
    addGuildScore: "addGuildScore",
    addClubAccount: "addClubAccount",
  };

  var ps = {
    my: "14.215.177.38",
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
      var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
      for (var i = 0; i < newkey.length; i++) {
        //遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
      }
      return newObj; //返回排好序的新对象
    },
    ksort: function (inputArr, sort_flags) {
      // original by: GeekFG (http://www.0-php.com)
      var tmp_arr = {},
        keys = [],
        sorter,
        i,
        k,
        that = this,
        strictForIn = false,
        populateArr = {};

      switch (sort_flags) {
        case "SORT_STRING":
          // compare items as strings
          sorter = function (a, b) {
            return that.strnatcmp(a, b);
          };
          break;
        case "SORT_LOCALE_STRING":
          // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
          var loc = this.i18n_loc_get_default();
          sorter = this.php_js.i18nLocales[loc].sorting;
          break;
        case "SORT_NUMERIC":
          // compare items numerically
          sorter = function (a, b) {
            return a + 0 - (b + 0);
          };
          break;
        // case 'SORT_REGULAR': // compare items normally (don't change types)
        default:
          sorter = function (a, b) {
            var aFloat = parseFloat(a),
              bFloat = parseFloat(b),
              aNumeric = aFloat + "" === a,
              bNumeric = bFloat + "" === b;
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
      strictForIn =
        this.php_js.ini["phpjs.strictForIn"] &&
        this.php_js.ini["phpjs.strictForIn"].local_value &&
        this.php_js.ini["phpjs.strictForIn"].local_value !== "off";
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
      var str = "";
      for (var key in data) {
        str +=
          key.toLowerCase() + "=" + encodeURIComponent(data[key]).toLowerCase();
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
        if (i != 0) arr.push(Math.pow(8, i));
      }
      return arr;
    },
    o: function (e) {
      var arr = "";
      var b = 0;
      for (var i = 0; i < e.length; i++) {
        if (e[i] == "111000" || e[i] == "101100" || e[i] == "110010") {
          b++;
        } else {
          arr += e[i];
        }
      }
      return { b, arr };
    },
    g: function (type) {
      var e = ps.t();
      var o = ps.sb(e.toString());
      var k = ps.o(o).arr;
      var bsk = ps.bs(k);
      var l = bsk.length.toString();
      var i = l[0].toString() + l[1].toString();
      var b = "";
      var a;
      for (var i = 1; i < l[2]; i++) {
        b = i + b;
      }
      a = b.split("").reverse().join("");
      if (type) {
        return a + b;
      } else {
        return b + a;
      }
    },
  };

  $scope.partChange = function (num) {
    if (num == 2) {
      $scope.is_show_guild = false;
      $scope.is_show_club = false;
      $scope.isShowClubMember = false;
      $scope.isShowGuildMember = false;
    }
    document.getElementById("media").play();
    $scope.part = num;
    if (num == 1) {
      $scope.currentRoomPage = 1;
      socketModule.getClubRoomList($scope.club_info.club_id);
    }
    if (num == 4) {
      // $scope.isShowGuildMember = true;
      $scope.currentGuildRoomPage = 1;
    if(!localStorage.getItem("choose_guild_guild_id")){
    socketModule.getGuildRoomList($scope.my_guild_info.guild_id);  
    }else{
      socketModule.getGuildRoomList(localStorage.getItem("choose_guild_guild_id")); 
    }
     
    }
  };

  $scope.toBindPhone = function () {
    $scope.partChange(3);
    $scope.clickPhone();
  };
  $scope.openSettingGuild = function () {
    $scope.isShowGuildSetting = true;
    socketModule.getGuildSetting();
  };

  $scope.openGuildCsList = function () {
    $scope.isShowCsGuildShow = true;
    socketModule.getGuildCsList();
  };
  $scope.closeGuildCsList = function () {
    $scope.isShowCsGuildShow = false;
  };
  $scope.openGuildMemberScoreList = function () {
    $scope.isShowGuildMemberScore = true;
    socketModule.getGuildScoreList();
  };
  $scope.searchGuildMemberScoreList = function () {
  $scope.guild_score_list = [];
    socketModule.getGuildScoreList();
  };
  $scope.closeGuildMemberScoreList = function () {
    $scope.isShowGuildMemberScore = false;
  };
  $scope.hideSettingGuild = function () {
    $scope.isShowGuildSetting = false;
  };

  $scope.loadMoreRoom = function () {
    $scope.currentRoomPage += 1;
    socketModule.getClubRoomList($scope.club_info.club_id);
  };
  $scope.loadMoreCsList = function () {
    $scope.currentCsPage += 1;
    socketModule.getGuildCsList($scope.my_guild_info.guild_id);
  };
  $scope.loadMoreGuildRoom = function () {
    $scope.currentGuildRoomPage += 1;
    socketModule.getGuildRoomList($scope.my_guild_info.guild_id);
  };
  // 匹配code
  $scope.GetQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      localStorage.setItem("code", unescape(r[2]));
      return unescape(r[2]);
    }
    return null;
  };

  var httpModule = {
    getRoomCardInfo: function () {
      var data = { dealer_num: globalData.dealerNum };

      Vue.http.post(request_url + "f/roomCardInfo", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;

          if (bodyData.result == 0) {
            $scope.roomCardInfo = bodyData.data.concat();

            for (var i = 0; i < $scope.roomCardInfo.length; i++) {
              $scope.roomCardInfo[i].num = i + 1;
              $scope.roomCardInfo[i].price = Math.ceil(
                $scope.roomCardInfo[i].price
              );
            }

            if ($scope.roomCardInfo.length >= 1) {
              $scope.select = $scope.roomCardInfo[0].goods_id;
            }
          } else {
            alert(bodyData.result_message);
          }
        },
        function (response) {
          logMessage(response.body);
        }
      );
    },
    getGameScore: function () {
      var data = {
        account_id: userData.accountId,
        from: dtStartDate,
        to: dtEndDate,
        dealer_num: globalData.dealerNum,
      };

      Vue.http.post(request_url + "activity/getGameScore", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;
          if (bodyData.result == 0) {
            $scope.gameItems = [];
            var resultData = bodyData.data;
            for (var i = 0; i < resultData.length; i++) {
              var temp = resultData[i];
              var type = temp["game_type"];
              var score = temp["score"];
              if (score > 0) {
                score = "+" + score;
              }
              $scope.gameItems.push({
                avatar: gameIcons[type],
                name: gameNames[type],
                score: score,
              });
            }
          } else {
            alert(bodyData.result_message);
          }
        },
        function (response) {
          logMessage(response.body);
        }
      );
    },
    getActivityInfo: function () {
      var data = {
        account_id: userData.accountId,
        dealer_num: globalData.dealerNum,
      };

      Vue.http.post(request_url + "f/getActivityInfo", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;

          if (bodyData.result == 0) {
            if (bodyData.data.length == 0) {
              if ($scope.roomCard <= 0) {
                clickShowAlert(1, "房卡不足");
              } else {
                // reconnectSocket();
                connectApi();
                $scope.is_connect = true;
              }
            } else {
              $scope.activity = bodyData.data.concat();
              clickShowAlert(5, $scope.activity[0].content);
            }
          } else {
            alert(bodyData.result_message);
          }
        },
        function (response) {
          logMessage(response.body);
        }
      );
    },
    getCards: function () {
      if ($scope.activity.length < 1) {
        logMessage("activity length less than 1");
        return;
      }

      var data = {
        account_id: userData.accountId,
        activity_id: $scope.activity[0].activity_id,
        dealer_num: globalData.dealerNum,
      };

      Vue.http.post(request_url + "f/updateActivityOpt", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;

          if (bodyData.result == 0) {
            $scope.roomCard =
              $scope.roomCard + Math.ceil($scope.activity[0].ticket_count);
            $scope.activity.splice(0, 1);

            if ($scope.activity.length == 0) {
              // reconnectSocket();
              connectApi();
              $scope.is_connect = true;
              viewMethods.clickCloseAlert();
            } else {
              clickShowAlert(5, $scope.activity[0].content);
            }
          } else {
            alert(bodyData.result_message);
          }
        },
        function (response) {
          logMessage(response.body);
        }
      );
    },
    buyCard: function (goodsId) {
      var data = {
        account_id: userData.accountId,
        open_id: globalData.openId,
        goods_id: goodsId,
        dealer_num: globalData.dealerNum,
      };
      Vue.http
        .post(request_url + "index.php/wxpay/flower/getPaymentOpt", data)
        .then(
          function (response) {
            var bodyData = response.body;

            if (typeof bodyData.result == "undefined") {
              alert("购买失败，请重新操作");
              $scope.isShowShopLoading = false;
            } else if (bodyData.result == "-1") {
              alert(bodyData.result_message);
              $scope.isShowShopLoading = false;
            } else {
              var obj_data = bodyData.data;
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: obj_data.appId,
                  timeStamp: obj_data.timeStamp,
                  nonceStr: obj_data.nonceStr,
                  package: "prepay_id=" + obj_data.prepay_id,
                  signType: obj_data.signType,
                  paySign: obj_data.paySign,
                },
                function (res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    alert("购买成功");
                    $scope.isShowShopLoading = false;
                    $scope.roomCard =
                      parseInt($scope.roomCard) + parseInt($scope.ticket_count);
                    viewMethods.clickHideShop();
                    return 0;
                  } else {
                    alert("购买失败，请重新操作");
                    $scope.isShowShopLoading = false;
                  }
                }
              );
            }
          },
          function (response) {
            alert("error");
            $scope.isShowShopLoading = false;
          }
        );
    },
    changeGuideName: function () {
      var data = { guide_id: userData.guideId, guide_name: userData.guideName };
      Vue.http.post(request_url + "manage/changeGuideName", data);
    },
    bindPhone: function (phone, authcode, password) {
      var data = {
        dealer_num: globalData.dealerNum,
        phone: phone,
        code: authcode,
        password: password,
      };
      Vue.http.post(request_url + "account/checkSmsCode", data).then(
        function (response) {
          var bodyData = response.body;
          if (bodyData.result == 0) {
            $scope.isShowBindPhone = false;
            $scope.isPhone = true;
            $scope.isAuthPhone = 0;
            $scope.phone = $scope.sPhone;

            if (
              bodyData.data.card_count != null &&
              bodyData.data.card_count != undefined &&
              bodyData.data.card_count != ""
            ) {
              $scope.roomCard =
                parseInt($scope.roomCard) + parseInt(bodyData.data.card_count);
            }

            if (bodyData.data.account_id != userData.accountId) {
              viewMethods.clickShowAlert(23, bodyData.result_message);
            } else {
              viewMethods.clickShowAlert(6, bodyData.result_message);
            }

            $scope.sPhone = "";
            $scope.sAuthcode = "";
            $scope.sPassword = "";
          } else {
            // logMessage(6666666666);
            $scope.updatePhone.authcodeError = "验证码错误，请重填";
          }
        },
        function (response) {
          $scope.authcodeTime = 0;
          viewMethods.clickShowAlert(7, "绑定失败");
        }
      );
    },
    saveMyCode: function (userCode) {
      var data = { my_code: userCode };
      Vue.http.post(request_url + "ay/updateMyCode", data).then(
        function (response) {
          var bodyData = response.body;
          if (bodyData.result == 0) {
            $scope.isShowMyCode = false;
            $scope.isHasMyCode = true;
            $scope.myCode = $scope.sMyCode;
            userData.myCode = $scope.sMyCode;
          } else {
            logMessage(6666666666);
            viewMethods.clickShowAlert(7, bodyData.result_message);
          }
        },
        function (response) {
          viewMethods.clickShowAlert(7, "修改失败");
        }
      );
    },
    saveAyncCard: function (accountId) {
      var data = { id: accountId };
      Vue.http.post(request_url + "ay/transferRoomCard", data).then(
        function (response) {
          var bodyData = response.body;
          viewMethods.clickShowAlert(7, bodyData.result_message);
          $scope.isShowMyAccount = false;
          setTimeout(function () {
            location.href = window.location.href;
          }, 1000);
        },
        function (response) {
          $scope.isShowMyAccount = false;
          viewMethods.clickShowAlert(7, "同步失败");
        }
      );
    },
    getMyAccount: function (phone) {
      var url = request_url + "/transfer/phoneUsers";
      window.location.replace(url);
      return;
      var data = { phone: phone };
      Vue.http.post(request_url + "ay/findByPhone", data).then(
        function (response) {
          var bodyData = [];
          response.body.data.forEach(function (c) {
            if (parseInt(c.ticket_count) > 0) bodyData.push(c);
          });
          if (bodyData.length < 1) {
            viewMethods.clickShowAlert(7, "该手机号下无其它有房卡的账号");
          } else {
            $scope.isShowMyAccount = true;
            myAccounts = bodyData;
          }
        },
        function (response) {
          viewMethods.clickShowAlert(7, "查询失败");
        }
      );
    },

    // 管理功能  开关
    setManageSwitch: function (is_on) {
      var data = { is_on: is_on };
      Vue.http.post(request_url + "manage/setManageSwitch", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;

          if (bodyData.result == 0) {
            if (is_on == 1) {
              $scope.roomCard -= 0;
            }
          } else {
            alert(bodyData.result_message);
          }
        },
        function (response) {
          logMessage(response.body);
        }
      );
    },
    getAuthcode: function (phone) {
      var data = { phone: phone };

      $http({
        url: request_url + "account/getMobileSms",
        method: "post",
      }).success(function (e) {
        if (e.code == "1") {
          var roomUrl = e.data.url;
          window.location.href = roomUrl;
        } else if (e.code == "0") {
          alert("房间号不存在");
        }
      });

      Vue.http.post(request_url + "account/getMobileSms", data).then(
        function (response) {
          logMessage(response.body);
          var bodyData = response.body;

          if (bodyData.result == 0) {
            $scope.authcodeTime = 60;
            authcodeTimer();
            $scope.authcodeType = 2;
          } else {
            viewMethods.clickShowAlert(7, bodyData.result_message);
          }
        },
        function (response) {
          viewMethods.clickShowAlert(7, "获取验证码失败");
        }
      );
    },
    searchUser: function () {
      var params = { account_id: $scope.addUser.code, tk: globalData.tk };
      $http({
        url: request_url + "f/search_account",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      })
        .success(function (e) {
          if (e.code == 200) {
            $scope.addUser.name = e.data.nickname;
            $scope.addUser.avatar = e.data.headimgurl;
            $scope.addUser.accountCode = e.data.account_id;
          } else {
            $scope.showResultFunc("没有此用户");
          }
        })
        .error(function (e) {
          console.log("寻找错误");
        });
    },
    sendCards: function () {
      if ($scope.blockBtn == true) {
        $scope.showResultFunc("请不要连续点击按钮!");
        return;
      }
      if ($scope.addUser.accountCode == $scope.user_info.account_id) {
        $scope.showResultFunc("不能给自己发送房卡!");
        return;
      }
      $scope.user_info.ticket_count -= $scope.addUser.card;
      $scope.blockBtn = true;

      var params = {
        account_id: $scope.user_info.account_id,
        num: parseInt($scope.addUser.card),
        add_account_id: $scope.addUser.accountCode,
        tk: globalData.tk,
      };

      $http({
        url: request_url + "f/send_cards",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: params,
      })
        .success(function (e) {
          if (e.code == 200) {
            $scope.showResultFunc("发送成功!");
          } else {
            $scope.showResultFunc("发送失败!");
          }
        })
        .error(function (e) {
          console.log("寻找错误");
        });
    },
    createMj: function () {
      var params = {
        operation: "CreateRoom",
        account_id: data.account_id,
        session: data.session,
        data: {
          data_key: Date.parse(new Date()) + randomString(5),
          joker: $scope.createInfo.hbmajiang.joker,
          horse_count: $scope.createInfo.hbmajiang.horse_count,
          qianggang: $scope.createInfo.hbmajiang.qianggang == 1 ? 2 : 1,
          chengbao: $scope.createInfo.hbmajiang.chengbao == 1 ? 2 : 1,
          js: $scope.createInfo.hbmajiang.ticket_count == 1 ? 4 : 8,
          base_score: $scope.createInfo.hbmajiang.score_type,
          duiduihu: $scope.createInfo.hbmajiang.is_qxd == 1 ? 2 : 1,
          pengpenghu: $scope.createInfo.hbmajiang.is_pph == 1 ? 2 : 1,
          qingyise: $scope.createInfo.hbmajiang.is_qys == 1 ? 2 : 1,
          qianggang_multiple: $scope.createInfo.hbmajiang.is_qgjb == 1 ? 2 : 1,
          nojoker_multiple: $scope.createInfo.hbmajiang.is_wgjb == 1 ? 2 : 1,
          gangbao_multiple: $scope.createInfo.hbmajiang.is_gbjb == 1 ? 2 : 1,
          shisanyao:
            $scope.createInfo.hbmajiang.is_ssy == 1
              ? $scope.createInfo.hbmajiang.ssy_bet_type
              : 1,
          player_num: 4,
        },
      };

      var sendData = socketModule.sendDataMJ(params);
      $scope.max_count_title = "麻将";

      localStorage.hbmajiang = JSON.stringify($scope.createInfo.hbmajiang);

      $.ajax({
        type: "POST",
        url: $scope.request_url + "/roomapi/createMj",
        data: sendData,
        contentType: "application/json",
        async: false,
        success: function (data) {
          var _data = JSON.parse(data);
          if (_data.result == -1) {
            $scope.showResultFunc(_data.result_message);
            $scope.is_operation = false;
          } else {
            $scope.is_operation = false;
            $scope.tzUrl = _data.data.url;
            $scope.showResultFunc("创建成功");
            socketModule.processCreateRoom(_data);
            $scope.cancelCreate();
          }
          $scope.$applyAsync();
        },
        error: function (jqXHR) {
          console.log("Error: " + jqXHR.status);
        },
      });
    },
  };

  var socketModule = {
    sendDataCode: function (obj) {
      var rest;
      if (obj != "@") {
        obj.data.timestamp = Date.parse(new Date()) / 1000;
        obj.data.token = globalData.session;
        var params = {
          operation: obj.operation,
          account_id: userData.accountId,
          session: globalData.session,
          s: ps.s(obj.data),
          data: obj.data,
        };
        var _obj = JSON.stringify(params);
        rest = $scope.dealsClubMember(_obj);
        if ($scope.cancelLog == false) {
        }
      } else {
        rest = obj;
      }
      $scope.ws.send(rest);
    },
    sendDataMJ: function (obj) {
      return "";
    },
    processCreateRoom(obj) {
      var game_name =
        globalData.hallName +
        ": " +
        $scope.max_count_title +
        obj.data.room_number +
        "房间";
      $scope.room_number = obj.data.room_number;
      $scope.data_key = obj.data.data_key;
      $scope.showAlert(666, game_name);
    },
    getGameData() {
      var sendData = {
        operation: "getGameData",
        account_id: "",
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
        },
      };
      socketModule.sendDataCode(sendData);
    },
    processGetGameData(obj) {
      var data = obj.data;

      $scope.is_can_send = true;
      $scope.is_send_getGameData = false;
      $scope.club_info = data.club_info;
      $scope.club_list = data.club_list;
    
    
    //
      $scope.guild_list = data.guild_list;
      var flag = false;
      var guildflag = false;
      for (var i in $scope.club_list) {
  
        if ($scope.club_list[i].account_id == userData.accountId) {
          $scope.my_club_info = $scope.club_list[i];
          $scope.club_list[i].is_self = 1;
          flag = true;
        } else {
          $scope.club_list[i].is_self = 0;
        }
        if ($scope.club_list[i].level == 2 || $scope.club_list[i].leve == 1) {
          $scope.my_mange_club_list.push($scope.club_list[i]);
        }
      }
      if ($scope.my_mange_club_list.length > 0) {
        $scope.myMangeClubInfo = $scope.my_mange_club_list[0];
      }
      //chaguan
      for (var i in $scope.guild_list) {
        if ($scope.guild_list[i].account_id == userData.accountId) {
          $scope.my_guild_info = $scope.guild_list[i];
      $scope.my_guild_id = $scope.guild_list[i].guild_id
          $scope.guild_list[i].is_self = 1;
      $scope.is_cs =1;
          $scope.chooseGuild = $scope.guild_list[i];
      $scope.myMangeguildInfo = $scope.guild_list[i];
          guildflag = true;
        } else {
          $scope.guild_list[i].is_self = 0;
      $scope.chooseGuild = $scope.guild_list[i];
        }
        $scope.my_mange_guild_list.push($scope.guild_list[i]);
      }
      var other_op_id = $scope.GetQueryString("club");
    var other_guild_id = $scope.GetQueryString("guild_id");

      $scope.user_info = data.user_info;
      $scope.user_info.account_id = userData.accountId;
      $scope.user_info.avatar = userData.avatar;
      $scope.user_info.id = userData.accountId;
      $scope.user_info.username = userData.accountId;

      if (flag == true) {
        $scope.isOpenClub = true;
      } else {
        $scope.isOpenClub = false;
      }

      if (guildflag == true) {
        $scope.isOpenGuild = true;
      }

      if (other_op_id) {
        socketModule.getOtherRoomList(other_op_id);
        $scope.part = 1;
      } else if (data.club_info.choose_club_id) {
        socketModule.getClubRoomList(data.club_info.choose_club_id);
      } else {
        socketModule.getClubRoomList(data.club_list[0].club_id);
      }
    if(other_guild_id){
      $scope.partChange(4);
     // $scope.part = 3;
    }
    },
    openClub: function () {
      socketModule.sendDataCode({
        operation: wsOperation.openClub,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
        },
      });
    },
    openGuild: function () {
      socketModule.sendDataCode({
        operation: wsOperation.openGuild,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
        },
      });
    },
    closeGuild: function () {
  
      socketModule.sendDataCode({
        operation: wsOperation.closeGuild,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
        },
      });
    },
    processOpenClub(obj) {
      if (obj.result == 0) {
        socketModule.getGameData();
      }
    },
    processOpenGuild(obj) {
      if (obj.result == 0) {
        socketModule.getGameData();
    socketModule.getGuildMemberList();
      }
    },
    processCloseGuild(obj) {
      if (obj.result == 0) {
        $scope.guild_list = [];
        $scope.my_mange_guild_list = [];
        $scope.chooseGuild = "";
        $scope.my_guild_info = [];
        $scope.myMangeguildInfo = [];
        $scope.is_show_guild = false;
        socketModule.getGameData();
        $scope.showResultFunc("关闭茶馆成功!");
        var url = "index.html";
    window.location.href = url;
      }
    },
    closeClub: function () {
      socketModule.sendDataCode({
        operation: wsOperation.closeClub,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
        },
      });
    },
    processCloseClub(obj) {
      if (obj.result == 0) {
        // $scope.isOpenClub=false;
        $scope.isClickCloseClub = true;
        socketModule.getGameData();
      }
    },
    getClubInfo: function (clubId) {
      socketModule.sendDataCode({
        operation: wsOperation.getClubInfo,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
          club_id: clubId,
        },
      });
    },
    getClubRoomList: function (clubId) {
      if ($scope.blockBtn == true) {
        $scope.showResultFunc("请不要频繁操作!");
        return;
      }
      if (!$scope.is_can_send) {
        return;
      }
      $scope.blockBtn = true;
      setTimeout(function () {
        $scope.blockBtn = false;
      }, 3000);
      socketModule.sendDataCode({
        operation: wsOperation.getClubRoomList,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
          club_id: clubId,
          page: $scope.currentRoomPage,
        },
      });
    },
    getGuildRoomList: function (guild_id) {
    if(!guild_id){
      guild_id = $scope.guild_list[0].guild_id
    }
      if (!$scope.is_can_send) {
        return;
      }
      $scope.blockBtn = true;
      setTimeout(function () {
        $scope.blockBtn = false;
      }, 3000);
      socketModule.sendDataCode({
        operation: wsOperation.getGuildRoomList,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: userData.accountId,
          guild_id: guild_id,
          page: $scope.currentGuildRoomPage,
        },
      });
    
    },
    processGetClubRoomList(obj) {
      var data = obj.data;
      if (obj.result == 0) {
        if ($scope.currentRoomPage == 1) {
          $scope.room_list = [];
        }
        if (data.rooms != undefined) {
          for (var i = 0; i < data.rooms.length; i++) {
            if (data.rooms[i].game_type == 16 && data.rooms[i].max_count == 4) {
              return;
            } else {
              $scope.room_list.push(data.rooms[i]);
            }
          }
        }
        $scope.club_info.club_id = data.club_id;
        $scope.club_info.club_name = data.club_name;
        $scope.club_info.is_self = data.is_self;
        $scope.club_creator = data.club_creator;
        $scope.totalRoomPage = data.total_page;
        for (var i in $scope.club_list) {
          if ($scope.club_list.club_id == data.club_id) {
            $scope.club_list.is_self = data.is_self;
          }
          if ($scope.club_list[i].club_id == data.club_id) {
            $scope.level = $scope.club_list[i].level;
          }
        }
      }
      $scope.$apply();
    },
    processGetGuildRoomList(obj) {
      var data = obj.data;
      if (obj.result == 0) {
        if ($scope.currentGuildRoomPage == 1) {
          $scope.guild_room_list = [];
        }
        if (data.rooms != undefined) {
          for (var i = 0; i < data.rooms.length; i++) {
            if (data.rooms[i].game_type == 16 && data.rooms[i].max_count == 4) {
              return;
            } else {
              $scope.guild_room_list.push(data.rooms[i]);
            }
          }
        }

       
        $scope.totalRoomPage = data.total_page;
    var choose_guild_tmp = localStorage.getItem('choose_guild');
    if(choose_guild_tmp){
      $scope.choose_guild.guild_id = choose_guild_tmp.guild_id;
      $scope.choose_guild.guild_name = localStorage.getItem('choose_guild_guild_id');
      $scope.choose_guild.is_self =  localStorage.getItem('choose_guild_guild_name');
      $scope.choose_guild.guild_creator = localStorage.getItem('choose_guild_guild_creator');
      $scope.choose_guild.guild_score =  localStorage.getItem('choose_guild_guild_score');
    }else{
      $scope.choose_guild.guild_id = data.guild_id;
      $scope.choose_guild.guild_name = data.guild_name;
      $scope.choose_guild.is_self = data.is_self;
      $scope.choose_guild.guild_creator = data.guild_creator;
      $scope.choose_guild.guild_score = data.score;
      localStorage.setItem('choose_guild_guild_id',data.guild_id);
      localStorage.setItem('choose_guild_guild_name',data.guild_name);
      localStorage.setItem('choose_guild_is_self',data.is_self);
      localStorage.setItem('choose_guild_guild_creator', data.guild_creator);
      localStorage.setItem('choose_guild_guild_score',data.score);
      
    }
        for (var i in $scope.guild_room_list) {
          if ($scope.my_guild_info.guild_id == data.guild_id) {
            $scope.my_guild_info.is_self = data.is_self;
          }
        }
      }
      $scope.$apply();
    },
    getOtherRoomList(opId) {
      socketModule.sendDataCode({
        operation: wsOperation.getOtherRoomList,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          op_account_id: opId,
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          page: $scope.currentRoomPage,
        },
      });
    },
    processGetOtherRoomList(obj) {
      var data = obj.data;
      if (obj.result == 0) {
        $scope.room_list = data.rooms;
        $scope.club_info.club_id = data.club_id;
        $scope.club_info.club_name = data.op_account_name + "的公会";
        $scope.club_info.is_self = data.is_self;
        $scope.club_creator = data.club_creator;
        $scope.totalRoomPage = data.total_page;
        for (var i in $scope.club_list) {
          if ($scope.club_list[i].club_id == data.club_id) {
            $scope.level = $scope.club_list[i].level;
          }
        }
      }
    },
    getClubMemberList: function (type) {
      var club_id;
      if ($scope.isMyMange) {
        club_id = $scope.myMangeClubInfo.club_id;
      } else {
        club_id = $scope.my_club_info.club_id;
      }
      var param = {
        timestamp: Date.parse(new Date()) / 1000,
        token: globalData.session,
        club_id: club_id,
        page: 1,
      };
      if ($scope.searchUser.searchText != "") {
        param.searchText = $scope.searchUser.searchText;
      }
      socketModule.sendDataCode({
        operation: wsOperation.getClubMemberList,
        account_id: userData.accountId,
        session: globalData.session,
        data: param,
      });
    },
    getGuildMemberList: function (type) {
      var guild_id;
      if ($scope.isMyGuildMange) {
        guild_id = $scope.myMangeGuildInfo.guild_id;
      } else {
        guild_id = $scope.my_guild_info.guild_id;
      }
      var param = {
        timestamp: Date.parse(new Date()) / 1000,
        token: globalData.session,
        guild_id: guild_id,
        page: 1,
      };
      if ($scope.searchUser.searchText != "") {
        param.searchText = $scope.searchUser.searchText;
      }
      socketModule.sendDataCode({
        operation: wsOperation.getGuildMemberList,
        account_id: userData.accountId,
        session: globalData.session,
        data: param,
      });
    },

    getGuildSetting: function () {
      var guild_id;
      if ($scope.isMyGuildMange) {
        guild_id = $scope.myMangeGuildInfo.guild_id;
      } else {
        guild_id = $scope.my_guild_info.guild_id;
      }
      var param = {
        timestamp: Date.parse(new Date()) / 1000,
        token: globalData.session,
        game_type: $scope.guild_seting.game_type,
        guild_id: guild_id,
        page: 1,
      };
      socketModule.sendDataCode({
        operation: wsOperation.getGuildGameSetting,
        account_id: userData.accountId,
        session: globalData.session,
        data: param,
      });
    },
    getGuildCsList: function () {
      var guild_id;
      if ($scope.isMyGuildMange) {
        guild_id = $scope.myMangeGuildInfo.guild_id;
      } else {
        guild_id = $scope.my_guild_info.guild_id;
      }
      var param = {
        timestamp: Date.parse(new Date()) / 1000,
        token: globalData.session,
        game_type: $scope.guild_seting.game_type,
        guild_id: guild_id,
        page: $scope.currentCsPage,
      };
      socketModule.sendDataCode({
        operation: wsOperation.getGuildCsList,
        account_id: userData.accountId,
        session: globalData.session,
        data: param,
      });
    },
    getGuildScoreList: function () {
      var guild_id;
      if ($scope.isMyGuildMange) {
        guild_id = $scope.myMangeGuildInfo.guild_id;
      } else {
        guild_id = $scope.my_guild_info.guild_id;
      }
    
      var param = {
        timestamp: Date.parse(new Date()) / 1000,
        token: globalData.session,
        game_type: $scope.guild_seting.game_type,
        guild_id: guild_id,
        page: 1,
      };
    if($scope.searchUser.search_score_account_id > 0){
      param.op_account_id = $scope.searchUser.search_score_account_id
    }
      socketModule.sendDataCode({
        operation: wsOperation.getGuildScoreList,
        account_id: userData.accountId,
        session: globalData.session,
        data: param,
      });
    },
    processGetClubMemberList(obj) {
      $scope.isShowSetting = false;
      var list = obj.data;
      $scope.member_list = [];
      for (var i = 0; i < list.length; i++) {
        $scope.member_list.push(list[i]);
      }

      // $scope.memberListTotalPage = Math.ceil(obj.total_page);
      $scope.$apply();
    },
    processGetGuildMemberList(obj) {
      $scope.isShowSetting = false;
      var list = obj.data;
      $scope.guild_member_list = [];
      for (var i = 0; i < list.length; i++) {
        $scope.guild_member_list.push(list[i]);
      }

      // $scope.memberListTotalPage = Math.ceil(obj.total_page);
      $scope.$apply();
    },
    searchAccount: function (id) {
      socketModule.sendDataCode({
        operation: wsOperation.searchAccount,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          account_id: $scope.addMember.code,
        },
      });
    },
    processSearchAccount: function (obj) {
      var data = obj.data;
      $scope.addMember.accountCode = data.account_id;
      $scope.addMember.avatar = data.avatar_url;
      $scope.addMember.name = data.nickname;
      $scope.addGuildMember.accountCode = data.account_id;
      $scope.addGuildMember.avatar = data.avatar_url;
      $scope.addGuildMember.name = data.nickname;
      $scope.$apply();
    },
    addClubMember: function () {
      if ($scope.isShowMemberMange) {
        if ($scope.chooseClub != "") {
          socketModule.sendDataCode({
            operation: wsOperation.addClubMember,
            account_id: userData.accountId,
            session: globalData.session,
            data: {
              timestamp: Date.parse(new Date()) / 1000,
              token: globalData.session,
              op_club_id: $scope.chooseClub.club_id,
              op_account_id: $scope.addMember.accountCode,
              remark: $scope.addMember.remark,
            },
          });
        }
      } else {
        socketModule.sendDataCode({
          operation: wsOperation.addClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            op_account_id: $scope.addMember.accountCode,
            remark: $scope.addMember.remark,
          },
        });
      }
    },
    addGuildMember: function () {
      if ($scope.chooseGuild != "") {
        socketModule.sendDataCode({
          operation: wsOperation.addGuildMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            guild_id: $scope.chooseGuild.guild_id,
            op_account_id: $scope.addMember.accountCode,
            remark: $scope.addMember.remark,
          },
        });
      } else {
        $scope.showResultFunc("请选择一个茶馆加入");
      }
    },
    processAddClubMember: function (obj) {
      socketModule.getGuildMemberList(1);
      $scope.showResultFunc(obj.result_message);
    },
    processAddGuildMember: function (obj) {
      socketModule.getGuildMemberList(1);
      $scope.showResultFunc(obj.result_message);
    },
    delClubMember: function (id) {
      if ($scope.myMangeClubInfo.club_id && $scope.isMyMange) {
        socketModule.sendDataCode({
          operation: wsOperation.delClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            op_club_id: $scope.myMangeClubInfo.club_id,
            op_account_id: id,
          },
        });
      } else {
        socketModule.sendDataCode({
          operation: wsOperation.delClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            op_account_id: id,
          },
        });
      }
    },
    delGuildMember: function (id) {
      socketModule.sendDataCode({
        operation: wsOperation.delGuildMember,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          op_account_id: id,
          guild_id: $scope.chooseGuild.guild_id,
          member_id: $scope.chooseGuild.member_id,
        },
      });
    },
    processDelClubMember: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        for (var i = 0; i < $scope.member_list.length; i++) {
          if ($scope.opMemberId == $scope.member_list[i].account_id) {
            $scope.member_list.splice(i, 1);
          }
        }
      }
    },
    processGetGuildCsList: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        for (var i = 0; i < data.length; i++) {
          data[i].room_number = parseInt(data[i].room_id) + 10000;
          $scope.guild_cs_list.push(data[i]);
        }
      }
    $scope.week_cs = obj.week_cs;
    $scope.day_cs = obj.day_cs;
    },

    processGetGuildScoreList: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        for (var i = 0; i < data.length; i++) {
          $scope.guild_score_list.push(data[i]);
        }
      }
    },

    processGetGuildGameSetting: function (obj) {
      var data = obj.data;
      if (obj.result == 0 && data.game_type) {
        $scope.guild_seting = obj.data;
      }

    },

    processDelGuildMember: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        for (var i = 0; i < $scope.guild_member_list.length; i++) {
          if (data.op_account_id == $scope.guild_member_list[i].account_id) {
            $scope.guild_member_list.splice(i, 1);
          }
        }
      }
    },
    addClubAccount: function (id) {
      socketModule.sendDataCode({
        operation: wsOperation.addClubAccount,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          club_id: id,
        },
      });
    },
    processAddClubAccount: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        $scope.showResultFunc(obj.result_message);
      }
    },
    setClubManage: function (id) {
      socketModule.sendDataCode({
        operation: wsOperation.setClubManage,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          op_account_id: id,
        },
      });
    },
    cancelClubManage: function (id) {
      socketModule.sendDataCode({
        operation: wsOperation.cancelClubManage,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          op_account_id: id,
        },
      });
    },
    processCancelClubManage: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        socketModule.getClubMemberList(1);
      }
    },
    processSetClubManage: function (obj) {
      var data = obj.data;
      if (obj.result == 0) {
        socketModule.getClubMemberList(1);
      }
    },
    overGame: function (type, roomId) {
      socketModule.sendDataCode({
        operation: wsOperation.overGame,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          game_type: type,
          room_id: roomId,
        },
      });
    },
    processOverGame: function (obj) {
      if (obj.result == 0) {
        $scope.showResultFunc(obj.result_message);
        socketModule.getClubRoomList($scope.club_info.club_id);
      }
    },
    cancelAutoRoom: function (type, roomId) {
      socketModule.sendDataCode({
        operation: wsOperation.cancelAutoRoom,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          game_type: $scope.gameType,
          account_id: userData.accountId,
          club_id: $scope.club_info.club_id,
          room_id: $scope.room_id,
          timestamp: Date.parse(new Date()) / 1000,
        },
      });
    },
    processCancelAutoRoom: function (obj) {
      if (obj.result == 0) {
        $scope.showResultFunc(obj.result_message);
        $scope.closeAlert();
        socketModule.getClubRoomList($scope.club_info.club_id);
      }
    },
    quitClub: function (club_id) {
      socketModule.sendDataCode({
        operation: wsOperation.quitClub,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          club_id: club_id,
        },
      });
    },
    processRemarkGuildMember: function (obj) {
      if (obj.result == 0) {
        socketModule.getGuildMemberList();
        $scope.choose_score = 0;
        $scope.nowItem = "";
        $scope.nowName = "";
        $scope.nowMname = "";
      }
    },
    processQuitClub: function (obj) {
      if (obj.result == 0) {
        socketModule.getGameData();
      }
    },
    processSubGuildScore: function (obj) {
      if (obj.result == 0) {
        socketModule.getGuildMemberList();
        $scope.choose_score = 0;
      }
    },
    processAddGuildScore: function (obj) {
      if (obj.result == 0) {
        socketModule.getGuildMemberList()();
        $scope.choose_score = 0;
      }
    },
    updateClub: function () {
      socketModule.sendDataCode({
        operation: wsOperation.updateClub,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          club_name: $scope.new_club_name,
        },
      });
    },
    updateGuild: function () {
      socketModule.sendDataCode({
        operation: wsOperation.updateGuild,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          guild_name: $scope.new_guild_name,
          guild_id: $scope.my_guild_info.guild_id,
        },
      });
    },
    saveGuildGameSetting: function () {
      socketModule.sendDataCode({
        operation: wsOperation.saveGuildGameSetting,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          guild_id: $scope.my_guild_info.guild_id,
          game_type: $scope.guild_seting.game_type,
          type: $scope.guild_seting.type,
          low_score: $scope.guild_seting.low_score,
          val0: $scope.guild_seting.val0,
          val1: $scope.guild_seting.val1,
          val2: $scope.guild_seting.val2,
          val3: $scope.guild_seting.val3,
          // is_minus: $scope.guild_seting.is_minus,
          join_limit: $scope.guild_seting.join_limit,
          ready_limit: $scope.guild_seting.ready_limit,
          bank_limit: $scope.guild_seting.bank_limit,
          bet_limit: $scope.guild_seting.bet_limit,
          is_all: $scope.guild_seting.is_all,
        },
      });
    },

    processUpdateClub: function (obj) {
      if (obj.result == 0) {
        $scope.showResultFunc("更新成功");
        $scope.my_club_info.club_name = $scope.new_club_name;
        $scope.new_club_name = "";
        $scope.hidechangeGuideName();
      }
    },
    processSaveGuildGameSetting: function (obj) {
      if (obj.result == 0) {
        $scope.showResultFunc("更新成功");
      }
    },
    processUpdateGuild: function (obj) {
      if (obj.result == 0) {
        $scope.showResultFunc("更新成功");
        $scope.my_guild_info.guild_name = $scope.new_guild_name;
        $scope.new_guild_name = "";
        $scope.hidechangeGuideName();
      }
    },
    createChatRoom: function () {
      socketModule.sendDataCode({
        operation: wsOperation.createChatRoom,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
        },
      });
    },
    processCreateChatRoom: function (obj) {
      if (obj.result == 0) {
        var url = "http://" + window.location.host + "/chat/index";
        window.location.replace(url);
      }
    },
    processGetToolsList: function (obj) {
      if (obj.result == 0) {
        $scope.giftList = obj.data;
      } else {
        console.log("获取失败");
      }
    },
    processGetSkinList: function (obj) {
      $scope.giftList = obj.data;
      for (var i = 0; i < $scope.giftList.length; i++) {
        if ($scope.giftList[i].skin_type == 1) {
          $scope.giftList[i].name = $scope.allCardName[i];
        } else {
          $scope.giftList[i].name = $scope.allFramesName[i];
        }
      }
      $scope.$apply();
    },
    processBuyTools: function (obj) {
      if (obj.result == 0) {
        console.log("购买成功");
        $scope.getGiftList();
        $scope.showResultFunc("购买成功");
      } else {
        $scope.showResultFunc("购买失败");
      }
    },
    processBuySkin: function (obj) {
      if (obj.result == 0) {
        $scope.userInfo.card -= $scope.spend_num;
        $scope.getSkinList();
        $scope.showResultFunc("购买成功");

        $scope.isGiftInfo = false;
      } else {
        $scope.showResultFunc("购买失败");
      }
    },
    processSetSkin: function (obj) {
      if (obj.result == 0) {
        $scope.getSkinList();
        $scope.showResultFunc("使用成功");
        $scope.isGiftInfo = false;
      } else {
        $scope.showResultFunc("使用成功");
      }
    },
    agreeClubMember: function (memberID) {
      $scope.opMemberId = memberID;
      if ($scope.myMangeClubInfo.club_id && $scope.isMyMange) {
        socketModule.sendDataCode({
          operation: wsOperation.agreeClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            op_club_id: $scope.myMangeClubInfo.club_id,
            op_account_id: memberID,
          },
        });
      } else {
        socketModule.sendDataCode({
          operation: wsOperation.agreeClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            token: globalData.session,
            op_account_id: memberID,
            timestamp: Date.parse(new Date()) / 1000,
          },
        });
      }
    },
  agreeGuildMember: function (memberID) {
    $scope.opMemberId = memberID;
    if ($scope.my_guild_info.guild_id) {
      socketModule.sendDataCode({
        operation: wsOperation.agreeGuildMember,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          timestamp: Date.parse(new Date()) / 1000,
          token: globalData.session,
          guild_id: $scope.my_guild_info.guild_id,
          member_id: memberID,
        },
      });
    }
  },
    processAgreeClubMember: function (obj) {
      if (obj.result == 0) {
        for (var i = 0; i < $scope.member_list.length; i++) {
          if ($scope.opMemberId == $scope.member_list[i].account_id) {
            $scope.member_list[i].status = 1;
          }
        }
      }
    },
  processAgreeGuildMember: function (obj) {
    socketModule.getGuildMemberList()
  },
    rejectClubMember: function (memberID) {
      if ($scope.myMangeClubInfo.club_id && $scope.isMyMange) {
        socketModule.sendDataCode({
          operation: wsOperation.rejectClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            timestamp: Date.parse(new Date()) / 1000,
            token: globalData.session,
            op_club_id: $scope.myMangeClubInfo.club_id,
            op_account_id: memberID,
          },
        });
      } else {
        socketModule.sendDataCode({
          operation: wsOperation.rejectClubMember,
          account_id: userData.accountId,
          session: globalData.session,
          data: {
            token: globalData.session,
            op_account_id: memberID,
            timestamp: Date.parse(new Date()) / 1000,
          },
        });
      }
    },
    processRejectClubMember: function (obj) {
      if (obj.result == 0) {
        socketModule.getClubMemberList(0);
      }
    },
    remarkClubMember: function () {
      socketModule.sendDataCode({
        operation: wsOperation.remarkClubMember,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          remark: $scope.nowMname,
          op_account_id: $scope.nowItem.account_id,
        },
      });
    },
    remarkGuildMember: function () {
      socketModule.sendDataCode({
        operation: wsOperation.remarkGuildMember,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          remark: $scope.nowMname,
          op_account_id: $scope.nowItem.account_id,
          guild_id: $scope.chooseGuild.guild_id,
        },
      });
    },
    editGuildScore: function (score) {
      if (score.isInteger == false) {
        $scope.showResultFunc("分数只可以为整数");
        return;
      }
      var operation_name = "addGuildScore";
      if (score < 0) {
        score = score * -1;
        operation_name = "subGuildScore";
      }
      socketModule.sendDataCode({
        operation: operation_name,
        account_id: userData.accountId,
        session: globalData.session,
        data: {
          token: globalData.session,
          remark: $scope.nowMname,
          op_account_id: $scope.nowItem.account_id,
          guild_id: $scope.chooseGuild.guild_id,
          score: score,
        },
      });
    },
    processRemarkClubMember: function (obj) {
      if (obj.result == 0) {
        // socketModule.getClubMemberList(1)
        for (var i = 0; i < $scope.member_list.length; i++) {
          if ($scope.nowItem.account_id == $scope.member_list[i].account_id) {
            $scope.member_list[i].remark = $scope.nowMname;
          }
        }
        // $scope.hideRemark();
      }
    },
  };

  $scope.connectApi = function (socket) {
    $scope.socket_url = socket;
    $scope.ws = new WebSocket(socket);
    $scope.ws.onopen = function () {
      $scope.connectOrNot = true;
      var tiao = setInterval(function () {
        $scope.ws.send("@");
      }, 3000);

      socketModule.getGameData();
      setTimeout(function () {
        $scope.isShowLoading2 = false;

        $scope.isShowTipBindPhone = data.isShowTipBindPhone;
      }, 1000);

      setTimeout(function () {
        // $scope.isShowLoading2 = false;
        $scope.isShowTipBindPhone = false;
      }, 2500);
    };
    $scope.ws.onmessage = function (evt) {
      $scope.ab2str(evt.data, (msg) => {
        if (msg == "@") {
          return;
        }
        var obj = eval("(" + $scope.dealClubMember(msg) + ")");
        if ($scope.cancelLog == false) {
        }
        if (obj.result != 0) {
          if (obj.operation == "updateClub") {
            $scope.showResultFunc("更新失败");
          } else if (obj.operation == "overGame") {
            $scope.showResultFunc("强制结算失败");
          } else if (obj.operation == "addClubAccount") {
            $scope.showResultFunc(obj.result_message);
          } else if (obj.operation == "getGameData") {
            alert(obj.result_message);
            $scope.logout();
          } else {
            $scope.showResultFunc(obj.result_message);
          }
        } else if (obj.result == 0) {
          if (obj.operation == wsOperation.getGameData) {
            socketModule.processGetGameData(obj);
          } else if (obj.operation == wsOperation.getClubRoomList) {
            socketModule.processGetClubRoomList(obj);
          } else if (obj.operation == wsOperation.getGuildRoomList) {
            socketModule.processGetGuildRoomList(obj);
          } else if (obj.operation == wsOperation.openClub) {
            socketModule.processOpenClub(obj);
          } else if (obj.operation == wsOperation.openGuild) {
            socketModule.processOpenGuild(obj);
          } else if (obj.operation == wsOperation.closeGuild) {
            socketModule.processCloseGuild(obj);
          } else if (obj.operation == wsOperation.closeClub) {
            socketModule.processCloseClub(obj);
          } else if (obj.operation == wsOperation.getClubMemberList) {
            socketModule.processGetClubMemberList(obj);
          } else if (obj.operation == wsOperation.getGuildMemberList) {
            socketModule.processGetGuildMemberList(obj);
          } else if (obj.operation == wsOperation.delClubMember) {
            socketModule.processDelClubMember(obj);
          } else if (obj.operation == wsOperation.getGuildCsList) {
            socketModule.processGetGuildCsList(obj);
          }  else if (obj.operation == wsOperation.getGuildScoreList) {
            socketModule.processGetGuildScoreList(obj);
          } 
      
      else if (obj.operation == wsOperation.delGuildMember) {
            socketModule.processDelGuildMember(obj);
          } else if (obj.operation == wsOperation.getGuildGameSetting) {
            socketModule.processGetGuildGameSetting(obj);
          } else if (obj.operation == wsOperation.cancelClubManage) {
            socketModule.processCancelClubManage(obj);
          } else if (obj.operation == wsOperation.setClubManage) {
            socketModule.processSetClubManage(obj);
          } else if (obj.operation == wsOperation.overGame) {
            socketModule.processOverGame(obj);
          } else if (obj.operation == wsOperation.cancelAutoRoom) {
            socketModule.processCancelAutoRoom(obj);
          } else if (obj.operation == wsOperation.quitClub) {
            socketModule.processQuitClub(obj);
          } else if (obj.operation == wsOperation.searchAccount) {
            socketModule.processSearchAccount(obj);
          } else if (obj.operation == wsOperation.addClubMember) {
            socketModule.processAddClubMember(obj);
          } else if (obj.operation == wsOperation.addGuildMember) {
            socketModule.processAddGuildMember(obj);
          } else if (obj.operation == wsOperation.createChatRoom) {
            socketModule.processCreateChatRoom(obj);
          } else if (obj.operation == "getToolsList") {
            socketModule.processGetToolsList(obj);
          } else if (obj.operation == "getSkinList") {
            socketModule.processGetSkinList(obj);
          } else if (obj.operation == "buyTools") {
            socketModule.processBuyTools(obj);
          } else if (obj.operation == "buySkin") {
            socketModule.processBuySkin(obj);
          } else if (obj.operation == "setSkin") {
            socketModule.processSetSkin(obj);
          } else if (obj.operation == "updateClub") {
            socketModule.processUpdateClub(obj);
          } else if (obj.operation == "saveGuildGameSetting") {
            socketModule.processSaveGuildGameSetting(obj);
          } else if (obj.operation == "updateGuild") {
            socketModule.processUpdateGuild(obj);
          } else if (obj.operation == "getOtherRoomList") {
            socketModule.processGetOtherRoomList(obj);
          } else if (obj.operation == "rejectClubMember") {
            socketModule.processRejectClubMember(obj);
          } else if (obj.operation == "agreeClubMember") {
            socketModule.processAgreeClubMember(obj);
          }  else if (obj.operation == "agreeGuildMember") {
            socketModule.processAgreeGuildMember(obj);
          }
      else if (obj.operation == "remarkGuildMember") {
            socketModule.processRemarkGuildMember(obj);
          } else if (obj.operation == "subGuildScore") {
            socketModule.processSubGuildScore(obj);
          } else if (obj.operation == "remarkClubMember") {
            socketModule.processRemarkClubMember(obj);
          } else if (obj.operation == "addGuildScore") {
            socketModule.processAddGuildScore(obj);
          } else if (obj.operation == "addClubAccount") {
            socketModule.processAddClubAccount(obj);
          } else {
            logMessage(obj.operation);
          }
        } else if (obj.result == -201) {
          $scope.connectOrNot = false;
          $scope.showAlert(31, obj.result_message);
        } else {
          $scope.connectOrNot = false;
          $scope.showAlert(6, obj.result_message);
        }
      });
    };
    $scope.ws.onclose = function (evt) {

      $scope.connectApi($scope.socket_url);
      //  window.location.reload();
    };
    $scope.ws.onerror = function (evt) {

    };
  };

  $scope.changeLoading = function () {
    setTimeout(function () {
      $scope.isShowLoading = false;
      $scope.isShowLoading2 = true;
    }, 500);

    $scope.loadingTimer = setInterval(function () {
      $scope.loadingNum++;
      $scope.loadingUrl =
        globalData.fileUrl +
        "files/images/loading/" +
        $scope.loadingNum +
        ".png";
      if ($scope.loadingNum == 11) {
        $scope.loadingNum = 1;
      }
      $scope.$apply();
    }, 100);
  };
  $scope.changeLoading();

  $scope.connectApi(globalData.club);

  $scope.chooseClubShowBtn = function () {
    $scope.isShowClubList = true;
    if ($scope.chooseClub == "") {
      $scope.chooseClub = $scope.my_mange_club_list[0];
    }
  };
  $scope.chooseClubHideBtn = function () {
    $scope.isShowClubList = false;
  };
  $scope.chooseClubBtn = function (e) {
    $scope.isShowClubList = false;
    $scope.chooseClub = e;
  };
  $scope.blurIpt = function () {
    window.scrollTo(0, 0);
  };
  $scope.showGift = function () {
    document.getElementById("media").play();

    // $scope.showResultFunc('敬请期待');
    // return
    // $scope.getGiftList();
    $scope.getSkinList();
    $scope.gitListShow();

    // $scope.getGiftBg();
    // $scope.getGiftItemBg();
    // $scope.getGiftInfoBg();
  };
  $scope.changeShopSelectType = function (num) {
    $scope.shopSelectType = num;
    $scope.getSkinList();
  };
  $scope.showIndivConfirm = function () {
    if ($scope.individuality == "" || !$scope.individuality) {
      $scope.showResultFunc("请输入防作弊码");
      return;
    }
    $scope.isShowIndiv = false;
    $scope.isShowIndivConfirm = true;
  };

  $scope.zhaohuifangkaConfirm = function () {
    $scope.sendZhaohuifangka();
  };

  $scope.sendZhaohuifangka = function () {
    var data = {
      // "account_id": userData.accountId,
      // "individuality": $scope.individuality,
      tk: globalData.tk,
    };

    // data = JSON.stringify(data);

    $http({
      url: request_url + "/account/zhaohuifangka",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .success(function (e) {
        if (e.code != 1) {
          $scope.showResultFunc(e.reresult_message);
          // alert("你或者你其他账号没有设置防伪码");
          return;
        } else {
          $scope.showResultFunc("找回成功");
          window.location.replace("index.html");
          // $scope.isShowIndivConfirm = false;
          // $scope.user_info.individuality = $scope.individuality;
        }
        //  $scope.$applyAsync();
      })
      .error(function (data) {
        console.log(data);
        alert("发生错误");
      });
  };

  $scope.hideIndivConfirm = function () {
    $scope.isShowIndiv = true;
    $scope.isShowIndivConfirm = false;
  };
  $scope.showIndivInfo = function () {
    if ($scope.user_info.individuality != "") {
      $scope.isShowIndivBefore = true;
    } else {
      $scope.isShowIndiv = true;
    }
  };
  $scope.hideIndivBefore = function () {
    $scope.isShowIndivBefore = false;
  };
  $scope.hideIndivInfo = function () {
    $scope.isShowIndiv = false;
  };
  $scope.setIndividuality = function () {
    $scope.sendIndividuality();
  };
  $scope.sendIndividuality = function () {
    var data = {
      account_id: userData.accountId,
      individuality: $scope.individuality,
      tk: globalData.tk,
    };

    data = JSON.stringify(data);

    $http({
      url: $scope.request_url + "/account/setIndividuality",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    })
      .success(function (e) {
        if (e.result == -1) {
          $scope.showResultFunc(e.result_message);
          $scope.is_operation = false;
        } else {
          $scope.showResultFunc(e.result_message);
          $scope.isShowIndivConfirm = false;
          $scope.user_info.individuality = $scope.individuality;
        }
        $scope.$applyAsync();
      })
      .error(function (data) {
        alert("发生错误：" + jqXHR.status);
      });
  };
  $scope.checkIndividuality = function (e) {
    return !!/^[0-9a-zA-Z]*$/g.test(e);
  };
  $scope.showJoinClub = function () {
    $scope.isShowJoinClub = true;
  };
  $scope.hideJoinClub = function () {
    $scope.isShowJoinClub = false;
  };
  $scope.backHome = function () {
    window.location.replace(baseUrl + "/home/?stop=1");
  };
  $scope.refesh = function () {
    window.location.replace(window.location.href);
  };
  $scope.giftName = function (e) {
    var giftName = {
      1: "bomb",
      2: "egg",
      3: "car",
      4: "cheer",
      5: "flower",
      6: "gift",
      7: "house",
      8: "kiss",
      9: "slap",
      10: "water",
    };
    return giftName[e];
  };
  $scope.getGiftList = function () {
    socketModule.sendDataCode({
      operation: "getToolsList",
      account_id: userData.accountId,
      session: globalData.session,
      data: {
        token: globalData.session,
      },
    });
  };
  $scope.getSkinList = function () {
    socketModule.sendDataCode({
      operation: "getSkinList",
      account_id: userData.accountId,
      session: globalData.session,
      data: {
        token: globalData.session,
        skin_type: $scope.shopSelectType,
      },
    });
  };
  $scope.gitListShow = function () {
    $scope.isGitListShow = true;
  };
  $scope.gitListHide = function () {
    $scope.isGitListShow = false;
  };
  $scope.gitInfoHide = function () {
    $scope.isGiftInfo = false;
  };
  $scope.buyGiftShow = function (e) {
    $scope.isGiftInfo = true;
    $scope.giftInfo = e;
  };
  $scope.buyGiftHide = function (e) {
    $scope.isGiftInfo = false;
    $scope.giftInfo = {};
  };
  $scope.buyGiftNum = function (e) {
    $scope.skin_expire_type = e;
  };
  $scope.buyGift = function (item) {
    var skin_kw = $scope.giftInfo.skin_kw;
    var skin_expire_type = $scope.skin_expire_type;

    socketModule.sendDataCode({
      operation: "buyTools",
      account_id: userData.accountId,
      session: globalData.session,
      data: {
        token: globalData.session,
        skin_kw: skin_kw,
        skin_expire_type: skin_expire_type,
      },
    });
  };
  $scope.buySkin = function (spend_num) {
    var skin_kw = $scope.giftInfo.skin_kw;
    $scope.spend_num = spend_num;

    socketModule.sendDataCode({
      operation: "buySkin",
      account_id: userData.accountId,
      session: globalData.session,
      data: {
        token: globalData.session,
        skin_type: $scope.shopSelectType,
        skin_kw: skin_kw,
        skin_expire_type: 0,
      },
    });
  };
  $scope.setSkin = function (item) {
    var skin_kw = $scope.giftInfo.skin_kw;

    socketModule.sendDataCode({
      operation: "setSkin",
      account_id: userData.accountId,
      session: globalData.session,
      data: {
        token: globalData.session,
        skin_type: $scope.shopSelectType,
        skin_kw: skin_kw,
      },
    });
  };
  $scope.getGiftBg = function () {

    var that = this;
    var img_url = $(".gift-shop-bg").attr("src");
    var img = new Image();
    img.src = img_url;
    var check = function () {
      if (img.width > 0 || img.height > 0) {
        clearInterval(set);
        $scope.bgH = $(".gift-shop-bg").height();
        $scope.bgW = $(".gift-shop-bg").width();
        $(".giftList").css({
          width: $scope.bgW * 0.82,
          height: $scope.bgH * 0.8,
        });
      }
    };
    var set = setInterval(check, 40);
  };
  $scope.getGiftItemBg = function () {
    $(".giftList .giftItemBg").each(function () {
      var img_url = $(this).attr("src");
      var img = new Image();
      img.src = img_url;
      var check = function () {
        if (img.width > 0 || img.height > 0) {
          clearInterval(set);
        }
      };
      var set = setInterval(check, 40);
    });
  };
  $scope.getGiftInfoBg = function () {
    var that = this;
    var img_url = $(".giftInfoBg").attr("src");
    var img = new Image();
    img.src = img_url;
    var check = function () {
      if (img.width > 0 || img.height > 0) {
        clearInterval(set);

        var w = $(".giftInfoBg").width();
        var h = $(".giftInfoBg").height();



        $(".giftInfo").css({
          height: h,
        });
      }
    };
    var set = setInterval(check, 40);
  };
  $scope.showGame = function (type) {
    $("#gamePart" + type).removeClass("hide");
    $(".partBack" + type).show();
  };
  $scope.hideGame = function (type) {
    $("#gamePart" + type).addClass("hide");
    $(".partBack" + type).hide();
  };
  $scope.goToApp = function () {
    $scope.showResultFunc("敬请期待");
  };
  $scope.goToGuild = function () {
    if ($scope.guild_list.length < 1) {
      $scope.showResultFunc("没有茶馆或者开启茶馆");
      return;
    }

    // $scope.my_guild_info.guild_id = $scope.guild_list[0]["guild_id"];
    $scope.partChange(4);
  };
  $scope.goToChat = function () {
    document.getElementById("media").play();
    $http({
      url: request_url + "/chat/index?hallName=" + scrName,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { tk: data.tk, hallName: scrName },
    })
      .success(function (e) {
        var url = "chat_index.html?mid=" + e.msg.group_id;
        window.location.replace(url);
      })
      .error(function (data) {
        console.log(data);
      });
  };
  $scope.showApply = function () {
    $scope.member_list = [];
    $scope.isShowApply = true;
    $scope.isMyMange = false;
    socketModule.getClubMemberList(0);
  };
  $scope.loadMoreClubMemberList = function () {
    socketModule.getClubMemberList();
  };
  ($scope.hideApply = function () {
    $scope.isShowApply = false;
  }),
    ($scope.agreeClubMember = function (memberID) {
      socketModule.agreeClubMember(memberID);
    }),
  ($scope.agreeGuildMember = function (memberID) {
    socketModule.agreeGuildMember(memberID);
  }),
    ($scope.rejectClubMember = function (memberID) {
      socketModule.rejectClubMember(memberID);
    }),
    ($scope.showGroupMember = function () {
      $scope.is_show_club = true;
      $scope.is_show_guild = false;
      if ($scope.isOpenClub == false) {
        $scope.isShowHallTip = true;
        $scope.tipText = "您还没开启俱乐部";
      }
      $scope.isShowClubMember = true;
      $scope.isMyMange = false;
      socketModule.getClubMemberList(1);
    }),
    ($scope.showGuildMember = function () {
      $scope.is_show_guild = true;
      $scope.is_show_club = false;
      if ($scope.isOpenGuild == false) {
        $scope.isShowHallTip = true;
        $scope.tipText = "您还没开启茶馆";
      }
      $scope.isShowGuildMember = true;
      $scope.isMyGuildMange = false;
      socketModule.getGuildMemberList(1);
    }),
    ($scope.hideGroupMember = function () {
      $scope.isMyMange = false;
      $scope.isShowClubMember = false;
    }),
    ($scope.showMyMange = function (e) {
      $scope.member_list = [];
      var my_mange_club_list = $scope.my_mange_club_list;
      if (my_mange_club_list.length == 0) {
        alert("没有可以管理的公会");
        return;
      }
      $scope.myMangeClubInfo = my_mange_club_list[0];
      $scope.isMyMange = true;
      if (e == "add") {
        $scope.isShowApply = true;
        $scope.isShowClubMember = false;
        socketModule.getClubMemberList(0);
      } else if (e == "member") {
        $scope.isShowClubMember = true;
        $scope.isShowApply = false;
        socketModule.getClubMemberList(1);
      }
    }),
    ($scope.showMemberSwitchGroup = function () {
      $scope.isShowMemberSwitchGroup = true;
    }),
    ($scope.hideMemberSwitchGroup = function () {
      $scope.isShowMemberSwitchGroup = false;
    }),
    ($scope.switchMemberGroup = function (e) {
      var my_mange_club_list = $scope.my_mange_club_list;
      for (var i = 0; i < my_mange_club_list.length; i++) {
        if (my_mange_club_list[i].club_id == e) {
          $scope.myMangeClubInfo = my_mange_club_list[i];
        }
      }
      if ($scope.isShowClubMember) {
        socketModule.getClubMemberList(1);
      } else if ($scope.isShowApply) {
        socketModule.getClubMemberList(0);
      }
      $scope.isShowMemberSwitchGroup = false;
    }),
    ($scope.hideDelete = function () {
        var url = "index.html";
    window.location.href = url;
    return;
      $scope.isShowClubMember = false;
      $scope.isMyMange = false;
      $scope.member_list = [];
      $scope.memberListPage = 0;
    }),
    ($scope.changeMname = function (item) {
      $scope.isShowDelete = true;
      $scope.isShowEditScore = false;
      $scope.nowItem = item;
      $scope.nowName = item.nickname;
      $scope.nowMname = item.remark;
    }),
    ($scope.editScore = function (item) {
      $scope.isShowDelete = true;
      $scope.isShowEditScore = true;
      $scope.nowItem = item;
      $scope.nowName = item.nickname;
      $scope.nowMname = item.remark;
      $scope.choose_score = item.score;
    }),
    ($scope.hideRemark = function () {
      $scope.isShowDelete = false;
      $scope.nowItem = "";
      $scope.nowName = "";
      $scope.nowMname = "";
    }),
    ($scope.showKickConfirm = function (item) {
      $scope.nowItem = item;
      $scope.isShowKickConfirm = true;
    });
  $scope.hideKickConfirm = function () {
    $scope.isShowKickConfirm = false;
  };
  ($scope.changeShowSetting = function (show, item) {
    $scope.nowItem = item;
    $scope.isShowSetting = show;
    $("#manager_sheet").css({ bottom: 0 });
  }),
    ($scope.hideMemberSetting = function () {
      $scope.isShowSetting = false;
    }),
    ($scope.remark = function () {
    }),
    ($scope.ensureChangeMname = function (nowMname) {
      $scope.nowMname = nowMname;
      socketModule.remarkClubMember();
      $scope.isShowDelete = false;
    }),
    ($scope.ensureChangeGuildMname = function (nowMname) {
      $scope.nowMname = nowMname;
      socketModule.remarkGuildMember();
      $scope.isShowDelete = false;
    }),
    ($scope.editGuildScore = function (score) {
      $scope.choose_score = score;
      socketModule.editGuildScore(score);
      $scope.isShowDelete = false;
    }),
    ($scope.searchAccount = function (id) {
      $scope.addMember.isShow1 = false;
      $scope.addMember.accountCode = "";
      $scope.addMember.avatar = "";
      $scope.addMember.name = "";
      if ($scope.addMember.code == "") {
        $scope.addMember.isShow1 = true;
        $scope.addMember.text1 = "请输入用户ID";
      } else {
        socketModule.searchAccount(id);
      }
    }),
    ($scope.addClubMember = function (id) {
      if ($scope.blockBtn == true) {
        $scope.showResultFunc("请不要连续点击按钮!");
        return;
      }

      if ($scope.isShowMemberMange) {
        if ($scope.chooseClub == "") {
          $scope.showResultFunc("请先选择要加入的公会!");
          return;
        } else {
          if ($scope.addMember.accountCode == "") {
            $scope.addMember.isShow1 = true;
            $scope.addMember.text1 = "请先搜索ID";
          } else if (
            $scope.user_info.account_id == $scope.addMember.accountCode
          ) {
            $scope.showResultFunc("不能添加自己!");
            return;
          } else {
            socketModule.addClubMember(id);
          }
        }
      } else {
        if ($scope.addMember.accountCode == "") {
          $scope.addMember.isShow1 = true;
          $scope.addMember.text1 = "请先搜索ID";
        } else if (
          $scope.user_info.account_id == $scope.addMember.accountCode
        ) {
          $scope.showResultFunc("不能添加自己!");
          return;
        } else if ($scope.my_club_info.is_self == 1) {
          $scope.blockBtn = true;
          socketModule.addClubMember(id);
        }
      }

      setTimeout(function () {
        $scope.blockBtn = false;
      }, 2000);
    }),
    ($scope.addGuildMember = function (id) {
      if ($scope.blockBtn == true) {
        $scope.showResultFunc("请不要连续点击按钮!");
        return;
      }

      if ($scope.isShowGuildMemberMange) {
        if ($scope.chooseGuild == "") {
          $scope.showResultFunc("请先选择要加入的茶馆!");
          return;
        } else {
          if ($scope.addMember.accountCode == "") {
            $scope.addMember.isShow1 = true;
            $scope.addMember.text1 = "请先搜索ID";
          } else if (
            $scope.user_info.account_id == $scope.addMember.accountCode
          ) {
            $scope.showResultFunc("不能添加自己!");
            return;
          } else {
            socketModule.addGuildMember(id);
          }
        }
      } else {
        if ($scope.addMember.accountCode == "") {
          $scope.addMember.isShow1 = true;
          $scope.addMember.text1 = "请先搜索ID";
        } else if (
          $scope.user_info.account_id == $scope.addMember.accountCode
        ) {
          $scope.showResultFunc("不能添加自己!");
          return;
        } else if ($scope.my_guild_info.is_self == 1) {
          $scope.blockBtn = true;
          socketModule.addGuildMember(id);
        }
      }

      setTimeout(function () {
        $scope.blockBtn = false;
      }, 2000);
    }),
    ($scope.clickSearch = function () {
      socketModule.getClubMemberList(1);
    }),
    ($scope.clickGuildSearch = function () {
      socketModule.getGuildMemberList(1);
    }),
    ($scope.showOpenClubConfirm = function () {
      $scope.isShowCreateClub = true;
    }),
    ($scope.showOpenGuildConfirm = function () {
      $scope.isShowCreateGuild = true;
    }),
    ($scope.hideOpenClubConfirm = function () {
      $scope.isShowCreateClub = false;
    }),
    ($scope.hideOpenGuildConfirm = function () {
      $scope.isShowCreateGuild = false;
    }),
    ($scope.showOpenClubConfirm2 = function () {
      $scope.isShowOpenClub = true;
    }),
    ($scope.showOpenGuildConfirm = function () {
      $scope.isShowOpenGuild = true;
    }),
    ($scope.hideOpenClubConfirm2 = function () {
      $scope.isShowOpenClub = false;
      $scope.isShowOpenGuild = false;
    }),
    ($scope.openClub = function () {
      $scope.hideOpenClubConfirm();
      socketModule.openClub();
    }),
    ($scope.openGuild = function () {
      $scope.hideOpenClubConfirm();
      socketModule.openGuild();
    }),
    ($scope.closeGuild = function () {
      // $scope.hideOpenClubConfirm();
      socketModule.closeGuild();
    }),
    ($scope.closeClub = function () {
      socketModule.closeClub();
    }),
    ($scope.hideSendCards = function () {
      $scope.showSendCards = 0;
      $scope.addUser.card = 0;
      $scope.addUser.code = "";
      $scope.addUser.isShow1 = false;
      $scope.addUser.isShow2 = false;
      $scope.addUser.text1 = "";
      $scope.addUser.text2 = "";
      $scope.addUser.accountCode = "";
      $scope.addUser.avatar = "";
    }),
    ($scope.ShowSendCards = function () {
      $scope.showSendCards = 1;
    }),
    ($scope.showSwitchGroup = function () {
      if (scope.club_list == "") {
        $scope.isShowTip = true;
        $scope.tipText = "暂无数据";
        return;
      }
      $scope.isShowSwitchGroup = true;
    }),
    ($scope.showSwitchGuild = function () {
      if (scope.guild_list == "") {
        $scope.isShowTip = true;
        $scope.tipText = "暂无数据";
        return;
      }
      $scope.isShowSwitchGuild = true;
    }),
    ($scope.hideTipBox = function () {
      $scope.isShowTip = false;
      $scope.tipText = "";
    }),
    ($scope.hideHallTip = function () {
      $scope.isShowHallTip = false;
      $scope.tipText = "";
    }),
    ($scope.hideSwitchGroup = function () {
      $scope.isShowSwitchGroup = false;
    }),
    ($scope.hideSwitchGuild = function () {
      $scope.isShowSwitchGuild = false;
    }),
    ($scope.setClubManage = function (id) {
      socketModule.setClubManage(id);
    }),
    ($scope.cancelClubManage = function (id) {
      socketModule.cancelClubManage(id);
    }),
    ($scope.delClubMember = function (id) {
      $scope.isShowKickConfirm = false;
      $scope.opMemberId = id;
      socketModule.delClubMember(id);
    }),
    ($scope.delGuildMember = function (id) {
      $scope.isShowKickConfirm = false;
      $scope.opMemberId = id;
      socketModule.delGuildMember(id);
    }),
    ($scope.addClubAccount = function (id) {
      if (!$scope.addClubId || $scope.addClubId.length == 0) {
        $scope.showResultFunc("请输入正确的工会ID!");
        return;
      }
      socketModule.addClubAccount($scope.addClubId);
    }),
    ($scope.clickRefresh = function () {
      $scope.currentRoomPage = 1;
      var other_op_id = $scope.GetQueryString("club");
      if (other_op_id && other_op_id != $scope.user_info.account_id) {
        socketModule.getOtherRoomList(other_op_id);
      } else {
        socketModule.getClubRoomList($scope.club_info.club_id);
      }
    }),
    ($scope.clickRefresh = function () {
      $scope.currentRoomPage = 1;
      var other_op_id = $scope.GetQueryString("club");
      if (other_op_id && other_op_id != $scope.user_info.account_id) {
        socketModule.getOtherRoomList(other_op_id);
      } else {
        socketModule.getClubRoomList($scope.club_info.club_id);
      }
    }),
    ($scope.clickRefreshGuild = function () {
      $scope.currentRoomPage = 1;
      socketModule.getGuildRoomList($scope.chooseGuild.guild_id);
    }),
    ($scope.switchGroup = function (clubId) {
      socketModule.getClubRoomList(clubId);
      $scope.isShowSwitchGroup = false;
    }),
    ($scope.switchGuild = function (guild_id) {
      socketModule.getGuildRoomList(guild_id);
  
      $scope.isShowSwitchGuild = false;
    }),
    ($scope.cardChange = function () {
      if (parseInt($scope.addUser.card) > parseInt(userData.card)) {
        $scope.addUser.card = userData.card;
      }
    }),
    ($scope.sendCard = function () {
      if ($scope.addUser.card == "" || $scope.addUser.card == 0) {
        $scope.addUser.isShow2 = true;
        $scope.addUser.text2 = "请放入正确房卡数";
        return;
      } else {
        $scope.addUser.isShow2 = false;
      }
      if ($scope.addUser.code == "") {
        $scope.addUser.isShow1 = true;
        $scope.addUser.text1 = "请输入用户ID";
        return;
      } else {
        $scope.addUser.isShow1 = false;
      }

      httpModule.sendCards();
    }),
    ($scope.getUserInfo = function () {
      if ($scope.addUser.code == "") {
        $scope.addUser.isShow1 = true;
        $scope.addUser.text1 = "请输入用户ID";
        return;
      } else {
        $scope.addUser.isShow1 = false;
      }
      httpModule.searchUser();
    }),
    ($scope.showResultFunc = function (text) {
      $scope.isShowResult = true;
      $scope.showResultText = text;
      setTimeout(function () {
        $scope.isShowResult = false;
        $scope.showResultText = "";
        $scope.$apply();
      }, 1200);
      $scope.$applyAsync();
    }),
    ($scope.changeAvatar = function () {
      window.location.replace("site/test");
    }),
    ($scope.goToPocket = function () {
      var url = request_url + "ay/rp";
      window.location.replace(url);
    }),
    ($scope.toInvite = function () {
      window.location.replace("/club/invite?invite_code=" + userData.accountId);
    }),
    ($scope.goTable = function () {
      $scope.part = 1;
      $scope.isShowAlert = false;
    }),
    ($scope.openShowAddMember = function (type) {
      if (type == "mange") {
        $scope.isShowMemberMange = true;
        if ($scope.chooseClub == "") {
          $scope.chooseClub = $scope.my_mange_club_list[0];
        }
      } else {
        $scope.isShowMemberMange = false;
        $scope.chooseClub = "";
      }
      $scope.addMember.isShow = true;
    }),
    ($scope.openShowAddGuildMember = function (type) {
      // if (type == 'mange') {
      //     $scope.isShowGuildMemberMange = true;
      //     if ($scope.chooseGuild == '') {
      //         $scope.chooseGuild = $scope.my_mange_guild_list[0];
      //     }
      // } else {
      //     $scope.isShowGuildMemberMange = false;
      //     $scope.chooseGuild = '';
      // }
      $scope.addGuildMember.isShow = true;
      $scope.addGuildMember.isShow1 = false;
    }),
    ($scope.hideAddMember = function () {
      $scope.isShowGuildMemberMange = false;
      $scope.addMember.isShow = false;
    }),
    ($scope.hideAddGuildMember = function () {
      $scope.isShowMemberGuildMange = false;
      $scope.addGuildMember.isShow = false;
    }),
    ($scope.getMemberInfo = function () {}),
    ($scope.confirmAddMember = function () {}),
    ($scope.gotoPackageRecord = function () {
      var url = "packageRecord.html";
      window.location.replace(url);
    }),
    ($scope.logout = function () {
      localStorage.clear();
      var url = "index.html";
      window.location.href = url;
    }),
    ($scope.clickShowAlert = function (type, text) {
      $scope.alertType = type;
      $scope.alertText = text;
      $scope.isShowAlert = true;
      setTimeout(function () {
        var alertHeight = $(".alertText").height();
        var textHeight = alertHeight;
        if (alertHeight < height * 0.15) {
          alertHeight = height * 0.15;
        }

        if (alertHeight > height * 0.8) {
          alertHeight = height * 0.8;
        }

        var mainHeight =
          alertHeight +
          height * (0.022 + 0.034) * 2 +
          height * 0.022 +
          height * 0.056;
        if (type == 8) {
          mainHeight = mainHeight - height * 0.022 - height * 0.056;
        }

        var blackHeight = alertHeight + height * 0.034 * 2;
        var alertTop = height * 0.022 + (blackHeight - textHeight) / 2;

        $(".alert .mainPart").css("height", mainHeight + "px");
        $(".alert .mainPart").css("margin-top", "-" + mainHeight / 2 + "px");
        $(".alert .mainPart .backImg .blackImg").css(
          "height",
          blackHeight + "px"
        );
        $(".alert .mainPart .alertText").css("top", alertTop + "px");
      }, 0);
    }),
    ($scope.clickCloseAlert = function () {
      $scope.isShowAlert = false;
      if ($scope.alertType == 1) {
        $scope.clickShowShop();
        if (!$scope.is_connect) {
          connectApi();
          $scope.is_connect = true;
        }
      }
    }),
    ($scope.clickShowShop = function () {
      window.location.href = "http://mp.weixin.qq.com/s/qLDZfj1KtJCzRIe04zwSwA";
    }),
    ($scope.clickHideShop = function () {
      $(".shop .shopBody").animate(
        {
          height: 0,
        },
        function () {
          $scope.isShowShop = false;
        }
      );
    }),
    ($scope.selectCard = function (num, count) {
      $scope.select = num;
      $scope.ticket_count = count;
    }),
    ($scope.clickGetCards = function () {
      httpModule.getCards();
    }),
    ($scope.showMessage = function () {
      $(".message .textPart").animate({
        height: "400px",
      });
      $scope.isShowMessage = true;
    }),
    ($scope.hideMessage = function () {
      $(".message .textPart").animate(
        {
          height: 0,
        },
        function () {
          $scope.isShowMessage = false;
        }
      );
    }),
    ($scope.shopBuy = function () {
      if ($scope.select > 0) {
        $scope.isShowShopLoading = true;
        var goods_id = $scope.select;
        httpModule.buyCard(goods_id);
      }
    }),
    // 管理功能  打开确认
    ($scope.clickOpenManage = function () {
      $scope.clickShowAlert(24, "群主管理功能永久免费开放，是否开启？");
    }),
    // 管理功能  关闭
    ($scope.clickCloseManage = function () {
      userData.isManageOn = false;
      httpModule.setManageSwitch(0);
    }),
    // 管理功能  打开
    ($scope.finishManageOn = function () {
      userData.isManageOn = true;
      httpModule.setManageSwitch(1);
      logMessage("开启管理功能");
      $scope.isShowAlert = false;
    }),
    ($scope.confirmChangeClubName = function (name) {
      $scope.new_club_name = name;
      if ($scope.new_club_name == "") {
        $scope.showResultFunc("公会名称不能为空");
        return;
      }
      socketModule.updateClub();
    }),
    ($scope.confirmChangeGuildName = function (name) {
      $scope.new_guild_name = name;
      if ($scope.new_guild_name == "") {
        $scope.showResultFunc("茶馆名称不能为空");
        return;
      }
      socketModule.updateGuild();
    }),
    ($scope.saveGuilSetting = function () {
      socketModule.saveGuildGameSetting();
    }),
    //去游戏战绩页面
    ($scope.toGameScore = function () {
      // window.location.href(request_url + "q/playRoomList");
      window.location.href = "roomList.html";
    }),
    ($scope.clickRedpackageRecord = function () {
      var url = request_url + "ay/myRP";
      window.location.replace(url);
    }),
    ($scope.clickMyTeam = function () {
      var url = request_url + "ay/myMT";
      window.location.replace(url);
    }),
    ($scope.toTransfer = function () {
      // window.location.replace(request_url + "transfer/phoneUsers");
    }),
    ($scope.clickMyRoom = function () {
      window.location.href = "roomListPlay.html";
    }),
    ($scope.closeShowGuild = function () {
      $scope.partChange(2);
      // window.location.href = "roomListPlay.html"
    }),
    ($scope.clickSendRedPackage = function () {
      if ($scope.phone == "" || $scope.phone.length != 11) {
        $scope.clickShowAlert(7, "请先完成手机认证，再使用此功能。");
      } else window.location.replace(request_url + "ay/rp");
    }),
    ($scope.changeStartDate = function () {
      logMessage("start date：" + $scope.startDate);
      var date = new Date($scope.startDate);
      var timestamp = convertTimestamp(date);

      logMessage(timestamp);
      logMessage(dtEndTimestamp);
      if (timestamp > dtEndTimestamp) {
        $scope.startDate = dtStartDate;
        return;
      } else {
        dtStartDate = $scope.startDate;
        dtStartTimestamp = timestamp;
      }
    }),
    ($scope.changeEndDate = function () {
      logMessage("end date：" + $scope.endDate);
      var date = new Date($scope.endDate);
      var timestamp = convertTimestamp(date);
      timestamp = timestamp + 86399;

      if (timestamp > todayTimestamp) {
        $scope.endDate = dtEndDate;
        return;
      } else {
        dtEndDate = $scope.endDate;
        dtEndTimestamp = timestamp;
        httpModule.getGameScore();
      }
    }),
    ($scope.clickNew = function () {
      window.location.replace(
        request_url + "manage/newmember?mid=" + globalData.guideId
      );
    }),
    ($scope.clickInvite = function () {
      window.location.replace(
        request_url + "manage/invite?code=" + muserData.userCode
      );
    }),
    ($scope.changeGuideNameFunc = function () {
      $scope.showChangeGuideName = true;
      $scope.guideName = userData.guideName;
    }),
    ($scope.hidechangeGuideName = function () {
      $scope.showChangeGuideName = false;
      $scope.guideName = userData.guideName;
    }),
    ($scope.openShowSendCards = function () {
      $scope.showSendCards = 1;
    }),
    ($scope.closeShowSendCards = function () {
      $scope.showSendCards = 0;
    }),
    ($scope.clickPhone = function () {
      return;
      // $scope.phoneText = '绑定手机';
      // $scope.phoneType = 1;
      // $scope.authcodeTime = 0;
      // $scope.authcodeText = '发送验证码';
      // $scope.authcodeType = 1;
      // $scope.isShowBindPhone = true;
    }),
    ($scope.setPassword = function () {
      // if ($scope.user.phone == '') {
      //     $scope.showResultFunc('请先绑定手机');
      //     return;
      // }
      $scope.setPassword_show = true;
      $scope.showFeature = false;
      $("#app-main").css({ overflow: "visible", height: "auto" });
    }),
    ($scope.setPassword_close = function () {
      $scope.setPassword_show = false;
    }),
    ($scope.setPassword_btn = function () {
      if (
        $scope.password == null ||
        $scope.password.length < 6 ||
        $scope.password == ""
      ) {
        $scope.showResultFunc("密码不能少于6位数");
        return;
      }
      var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
      if (!reg.test($scope.password)) {
        $scope.showResultFunc("密码必须含有英文加数字");
        return;
      }

      $.ajax({
        type: "POST",
        url: request_url + "/userapi/setPassword",
        data: {
          account_id: $scope.user_info.account_id,
          username: $scope.username,
          password: $scope.password,
          tk: data.tk,
        },
        dataType: "json",
        async: false,
        success: function (data) {
          alert(data.result_message);
          if (data.result == 1) {
            $scope.setPassword_show = false;
            $scope.username = "";
            $scope.password = "";
          }
        },
        error: function (jqXHR) {
          console.log("Error: " + jqXHR.status);
        },
      });
    }),
    ($scope.hideBindPhone = function () {
      $scope.isShowBindPhone = false;
    }),
    ($scope.hideMyCode = function () {
      $scope.isShowMyCode = false;
    }),
    ($scope.hideMyAccount = function () {
      $scope.isShowMyAccount = false;
    }),
    ($scope.clickEditPhone = function () {
      $scope.phoneText = "修改手机号";
      if (userData.password == "") {
        $scope.phoneText = "设置密钥";
      }
      $scope.phoneType = 2;
      $scope.authcodeTime = 0;
      $scope.authcodeText = "发送验证码";
      $scope.authcodeType = 1;
      $scope.isShowBindPhone = true;
    }),
    ($scope.showMyCode = function () {
      $scope.isShowMyCode = true;
    }),
    ($scope.saveMyCode = function () {
      var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
      if (!reg.test($scope.sMyCode)) {
        $scope.clickShowAlert(7, "请输入数字，汉字或字母");
      } else if ($scope.sMyCode.length > 6) {
        $scope.clickShowAlert(7, "你设置的防伪码过长，最长不超过6个字符");
      } else if ($scope.sMyCode.length < 1) {
        $scope.clickShowAlert(7, "防伪码至少含有一个字符");
      } else {
        httpModule.saveMyCode($scope.sMyCode);
      }
    }),
    ($scope.saveAyncCard = function () {
      if ($scope.sMyAccount.length < 1) {
        $scope.clickShowAlert(7, "请勾选一个账号进行同步。");
      } else httpModule.saveAyncCard($scope.sMyAccount);
    }),
    ($scope.getMyAccount = function () {
      if ($scope.phone.length != 11) {
        $scope.clickShowAlert(
          7,
          "请先完成手机认证，可找回同手机下其它无法登陆账号内的房卡"
        );
      } else {
        httpModule.getMyAccount($scope.phone);
      }
    }),
    ($scope.getAuthcode = function () {
      if ($scope.authcodeType != 1) {
        return;
      }

      var color = $("#authcode").css("background-color");
      if (color != "rgb(64, 112, 251)") {
        return;
      }

      var validPhone = checkPhone($scope.sPhone);

      if (validPhone == false) {
        $scope.clickShowAlert(7, "手机号码有误，请重填");
        return;
      }
      $scope.getAuthcodeHttp($scope.sPhone);
    }),
    ($scope.phoneChangeValue = function () {
      var result = checkPhone($scope.sPhone);
      if (result) {
        $("#authcode").css("background-color", "rgb(64,112,251)");
      } else {
        $("#authcode").css("background-color", "lightgray");
      }
    }),
    ($scope.finishBindPhone = function () {
      var url = window.location.href + "&id=" + 10000 * Math.random();
      window.location.replace(url);
    }),
    ($scope.closePage = function () {
      $scope.isShowBindPhone = false;
      data = {};
      Vue.http.post(request_url + "f/ulop", data).then(
        function (response) {
        },
        function (response) {
        }
      );
    }),
    ($scope.quitClub = function () {
      $scope.op_club_id = $scope.club_info.club_id;
      $scope.quitTipText =
        "是否退出" + $scope.club_info.club_name + "的俱乐部？";
      // $scope.showAlert(768,text);
      $scope.isShowQuitConfirm = true;
    }),
    ($scope.hideQuitConfirm = function () {
      $scope.isShowQuitConfirm = false;
    }),
    ($scope.confirmQuitTeam = function () {
      $scope.isShowAlert = 0;
      $scope.isShowSwitchGroup = false;
      $scope.isShowSwitchGuild = false;
      $scope.isShowQuitConfirm = false;
      socketModule.quitClub($scope.op_club_id);
    }),
    ($scope.toMyClub = function () {
      $scope.part = 3;
      $scope.showGroupMember();
    }),
    ($scope.toMyGuild = function () {
      $scope.part = 3;
      $scope.showGuildMember();
    }),
    ($scope.deleteGame = function () {
      $scope.isShowJoinRoom = false;
      $scope.quitTipText = "是否确认结算?";
      $scope.isShowDeleteGame = true;
    }),
    ($scope.hideDeleteGame = function () {
      $scope.quitTipText = "";
      $scope.isShowDeleteGame = false;
    }),
    ($scope.hideTipBindPhone = function () {
      $scope.isShowTipBindPhone = false;
    }),
    ($scope.cancelAuto = function () {
      $scope.isShowJoinRoom = false;
      socketModule.cancelAutoRoom();
    }),
    ($scope.confirmDeleteGame = function (type, roomId) {
      $scope.isShowDeleteGame = false;
      socketModule.overGame(type, roomId);
    }),
    ($scope.joinRoom = function (item) {
      var name = "";
      var text = "";
      for (var i in $scope.gameName) {
        if (item.game_type == $scope.gameName[i].game_type) {
          name = $scope.gameName[i].game_name;
        }
      }
      if (item.func == "xp") {
        name = "血拼金花";
      }
      $scope.joinTipText = "房间: " + item.room_number;
      $scope.gameType = item.game_type;
      $scope.room_number = item.room_number;
      $scope.room_id = item.room_id;
      $scope.alertText = text;
      $scope.func = item.func;
      $scope.auto = item.auto;
      $scope.data_key = item.data_key;

      // if($scope.club_info.is_self==1||$scope.level==2){
      //     $scope.showAlert(766,text)
      // }else {
      //     $scope.joinGame($scope.gameType);
      // }
      $scope.isShowJoinRoom = true;
    }),
    ($scope.hideJoinRoom = function () {
      $scope.isShowJoinRoom = false;
    }),
    ($scope.joinGame = function (type) {
      var url = "";

      url =request_url + "room?key=" + $scope.data_key + "&tk=" + globalData.tk;
      var html_url = "";
      $http({
        url: url,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .success(function (data) {
          html_url = data.msg.html_name;
          $scope.data_key = "";
          html_url = html_url + "?key=" + data.msg.data_key;
          window.location.replace(html_url);
        })
        .error(function (data) {
          console.log(data);
        });
    }),
    ($scope.createWait = function () {
      $scope.showResultFunc("敬请期待");
      return;
    }),
    ($scope.cancelCreate = function () {
      $scope.createInfo.isShow = 0;
      $(".main").css({ overflow: "visible", position: "static", top: "0" });
      // $('#copy_btn').show();
      $(".createRoom .mainPart").removeClass("yh");
    }),
    ($scope.copyClubUrl = function () {
      var input = "";
      var other_op_id = $scope.GetQueryString("club");
      let localUrl = window.location.href;
      let localUrlArray = localUrl.split("?");
      let localParam = localUrlArray[0];
      if (other_op_id) {
        input =
          appData.my_club_info.club_name +
          "的公会:" +
          localParam +
          "?club=" +
          other_op_id;
      } else {
        input =
          appData.my_club_info.club_name +
          "的公会:" +
          localParam +
          "?club=" +
          appData.user_info.account_id;
      }
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
      } catch (err) {}

      document.body.removeChild(el);
      if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      }

      $scope.showResultFunc("复制成功");

      return success;
    }),
    ($scope.copyRoomUrl = function (item) {
      let localhost = document.URL;
      localhost = localhost.replace("index.html", item.html_name);
      url =
        globalData.hallName +
        ": 房间号(" +
        item.room_number +
        ")" +
        localhost +
        "?key=" +
        item.data_key;
      var el = document.createElement("textarea");
      el.value = url;
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
      el.selectionEnd = url.length;
      var success = false;
      try {
        success = document.execCommand("copy");
      } catch (err) {}

      document.body.removeChild(el);
      if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      }

      $scope.showResultFunc("复制成功");

      return success;
    }),
    ($scope.copyId = function (id) {
      var input = id;
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
      } catch (err) {}

      document.body.removeChild(el);
      if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      }

      $scope.showResultFunc("复制成功");

      return success;
    }),
    ($scope.copyUrl = function () {
      var input = globalData.hallName + ":" + document.URL;
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
      } catch (err) {}

      document.body.removeChild(el);
      if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
      }

      $scope.showResultFunc("复制成功");

      return success;
    });
});

function randomString(len) {
  len = len || 32;
  var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = "";
  for (i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function fix_font() {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    //这个是安卓操作系统
    console.log("an");
  }
  if (isIOS) {
    //这个是ios操作系统
    console.log("ios");
    $(".selectPart").addClass("font_big");
  }
}

fix_font();
