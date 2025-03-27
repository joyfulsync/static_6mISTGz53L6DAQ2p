webpackJsonp([26], {
    "/8vw": function(e, t, s) {
        "use strict";
        var a = s("3cXf"),
        o = s.n(a),
        r = {
            staConnect: function(e, t) {
                var s = e.commit,
                a = phpWxIp + "/qx";
                s("staWebsocket", new ReconnectingWebSocket(a, null, {
                    debug: !0,
                    reconnectInterval: 3e3
                }))
            },
            updateMtype: function(e, t) {
                e.commit("processUpdateMtype", t)
            },
            sendDispatch: function(e, t) {
                t.data.timestamp = Date.parse(new Date) / 1e3;
                var s = {
                    operation: t.operation,
                    account_id: this.state.userInfo.account_id,
                    session: this.state.userInfo.token,
                    s: this.state.s(t.data),
                    data: t.data
                },
                a = o()(s),
                r = C.enc.Utf8.parse(this.state.g(1)),
                n = C.enc.Utf8.parse(this.state.g()),
                i = C.AES.encrypt(a, r, {
                    iv: n,
                    mode: C.mode.CBC,
                    padding: C.pad.ZeroPadding
                }),
                c = {
                    data: i.toString(),
                    operation: t.operation
                };
                e.commit("wsSendData", c)
            },
            wsDispatch: function(e, t) {
                switch (t.operation) {
                case "deleteMsgNotic":
                    e.commit("deleteMsgNotic", t);
                    break;
                case "deleteMsg":
                    e.commit("processDeleteMsg", t);
                    break;
                case "getCopyLink":
                    e.commit("processGetCopyLink", t);
                    break;
                case "delGroupNotic":
                    e.commit("delGroupNotic", t);
                    break;
                case "disAllowTalk":
                    e.commit("processDisAllowTalk", t);
                    break;
                case "banGroupUser":
                    e.commit("processBanGroupUser", t);
                    break;
                case "setFriendJoin":
                    e.commit("processSetFriendJoin", t);
                    break;
                case "outGroup":
                    e.commit("processOutGroup", t);
                    break;
                case "getPowerReceiveList":
                    e.commit("processGetPowerReceiveList", t);
                    break;
                case "deleteGroupUser":
                    e.commit("processDeleteGroupUser", t);
                    break;
                case "deleteGroupUserNotic":
                    e.commit("deleteGroupUserNotic", t);
                    break;
                case "sendMsg":
                    e.commit("sendWsMsg", o()(t));
                    break;
                case "getToken":
                    e.commit("setToken", t);
                    break;
                case "pullUserInfo":
                    e.commit("setUserInfo", t);
                    break;
                case "getGroupInfo":
                    e.commit("processGetGroupInfo", t);
                    break;
                case "delGroup":
                    e.commit("processDelGroup", t);
                    break;
                case "deleteGroupLog":
                    e.commit("processDelGroupLog", t);
                    break;
                case "sendGroup":
                    e.commit("processSendGroup", t);
                    break;
                case "getGroupChatList":
                    e.commit("processGetGroupChatList", t);
                    break;
                case "getQnToken":
                    e.commit("processGetQnToken", t);
                    break;
                case "sendImageGroup":
                    e.commit("processSendImageGroup", t);
                    break;
                case "setGroupNoty":
                    e.commit("processSetGroupNoty", t);
                    break;
                case "searchGroupChatLog":
                    e.commit("processSearchGroupChatLog", t);
                    break;
                case "createPowerCode":
                    e.commit("processCreatePowerCode", t);
                    break;
                case "receivePowerCode":
                    e.commit("processReceivePowerCode", t);
                    break;
                case "setUserCollection":
                    e.commit("processSetUserCollection", t);
                    break;
                case "checkCollection":
                    e.commit("processCheckCollection", t);
                    break;
                case "getUserCollection":
                    e.commit("processGetUserCollection", t);
                    break;
                case "deleteUserCollection":
                    e.commit("processDeleteUserCollection", t);
                    break;
                case "updateGroup":
                    e.commit("processUpdateGroup", t);
                    break;
                case "updateGroupPower":
                    e.commit("processUpdateGroupPower", t);
                    break;
                case "setPassword":
                    e.commit("processSetPassword", t);
                    break;
                case "getReceiveList":
                    e.commit("processGetReceiveList", t);
                    break;
                case "getSendList":
                    e.commit("processGetSendList", t);
                    break;
                case "getPowerReceiveList":
                    e.commit("processGetPowerReceiveList", t);
                    break;
                case "addGroupByUsers":
                    e.commit("processAddGroupByUsers", t);
                    break;
                case "sendCards":
                    e.commit("processSendCards", t);
                    break;
                case "getUserGroupApply":
                    e.commit("processGetUserGroupApply", t);
                    break;
                case "joinGroup":
                    e.commit("processJoinGroup", t);
                    break;
                case "setGroupAuth":
                    e.commit("processSetGroupAuth", t);
                    break;
                case "disAllowTalk":
                    e.commit("processDisAllowTalk", t);
                    break;
                case "agreeUserGroupApply":
                    e.commit("processAgreeUserGroupApply", t);
                    break;
                case "getAllJumpUrl":
                    e.commit("processGetAllJumpUrl", t);
                    break;
                case "setUserCard":
                    e.commit("processSetUserCard", t);
                    break;
                case "sendUserCard":
                    e.commit("processSendUserCard", t);
                    break;
                case "rechargeGroup":
                    e.commit("processRechargeGroup", t);
                    break;
                case "rechargeVoice":
                    e.commit("processRechargeVoice", t);
                    break;
                case "switchGroup":
                    e.commit("processSwitchGroup", t);
                    break;
                case "setGroupManage":
                    e.commit("processSetGroupManage", t);
                    break;
                case "transferGroup":
                    e.commit("processTransferGroup", t);
                    break;
                case "transferGroupNotic":
                    e.commit("processTransferGroupNotic", t);
                    break;
                case "pullVoiceInfo":
                    e.commit("processPullVoiceInfo", t);
                    break;
                case "getScoreList":
                    e.commit("processGetScoreList", t);
                    break;
                case "getScoreBoard":
                    e.commit("processGetScoreBoard", t);
                    break;
                case "getChatGameSetting":
                    e.commit("processGetChatGameSetting", t);
                    break;
                case "saveChatGameSetting":
                    e.commit("processSaveChatGameSetting", t);
                    break;
                case "setScoreCs":
                    e.commit("procesSetScoreCs", t);
                    break;
                case "getChatCsList":
                    e.commit("procesGetChatCsList", t);
                    break;
                case "openCs":
                    e.commit("procesOpenCs", t);
                    break;
                case "getIndexChatList":
                    e.commit("processGetIndexChatList", t);
                    break;
                case "getGroupList":
                    e.commit("processGetGroupList", t)
                }
            }
        };
        t.a = r
    },
    M93x: function(e, t, s) {
        "use strict";
        function a(e) {
            s("lQXI")
        }
        var o = s("sEFh"),
        r = s("QLHO"),
        n = s("C7Lr"),
        i = a,
        c = n(o.a, r.a, !1, i, null, null);
        t.a = c.exports
    },
    NHnr: function(e, t, s) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = s("BMa3"),
        o = s.n(a),
        r = s("Iufj"),
        n = s.n(r),
        i = s("kV13"),
        c = s("M93x"),
        u = s("YaEn"),
        p = s("YtJ0"),
        l = s("Q0Ca"),
        h = s("rBYo"),
        m = s("o6Zs"),
        g = s("y15U"),
        d = (s.n(g), s("iOuT"));
        s.n(d);
        i.a.use(n.a, o.a, i.a),
        i.a.use(h.
    default),
        s.i(l.a)(i.a),
        i.a.use(m.a),
        i.a.config.productionTip = !1,
        p.a.dispatch("staConnect"),
        new i.a({
            el: "#app",
            router: u.a,
            store: p.a,
            render: function(e) {
                return e(c.a)
            }
        })
    },
    Q0Ca: function(e, t, s) {
        "use strict";
        var a = s("ZLEe"),
        o = s.n(a),
        r = {
            fmtDate: function(e, t) {
                var e = new Date(e),
                s = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "h+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds(),
                    "q+": Math.floor((e.getMonth() + 3) / 3),
                    S: e.getMilliseconds()
                };
                /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var a in s) new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[a] : ("00" + s[a]).substr(("" + s[a]).length)));
                return t
            }
        };
        t.a = function(e) {
            o()(r).forEach(function(t) {
                e.filter(t, r[t])
            })
        }
    },
    QLHO: function(e, t, s) {
        "use strict";
        var a = function() {
            var e = this,
            t = e.$createElement,
            s = e._self._c || t;
            return s("div", {
                attrs: {
                    id: "app"
                }
            },
            [s("div", {
                staticClass: "outter",
                class: {
                    hideLeft: e.$route.path.split("/").length > 2
                }
            },
            [s("section", {
                staticClass: "app-content"
            },
            [s("keep-alive", [s("router-view", {
                attrs: {
                    name: "default"
                }
            })], 1)], 1)]), e._v(" "), s("transition", [s("router-view", {
                staticClass: "sub-page",
                attrs: {
                    name: "subPage"
                }
            })], 1), e._v(" "), s("div", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: !e.isOpen,
                    expression: "!isOpen"
                }],
                staticClass: "loadingBg"
            },
            [e._m(0)])], 1)
        },
        o = [function() {
            var e = this,
            t = e.$createElement,
            s = e._self._c || t;
            return s("div", {
                staticClass: "circle-loader"
            },
            [s("div", {
                staticClass: "circle-line"
            },
            [s("div", {
                staticClass: "circle circle-blue"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-blue"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-blue"
            })]), e._v(" "), s("div", {
                staticClass: "circle-line"
            },
            [s("div", {
                staticClass: "circle circle-yellow"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-yellow"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-yellow"
            })]), e._v(" "), s("div", {
                staticClass: "circle-line"
            },
            [s("div", {
                staticClass: "circle circle-red"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-red"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-red"
            })]), e._v(" "), s("div", {
                staticClass: "circle-line"
            },
            [s("div", {
                staticClass: "circle circle-green"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-green"
            }), e._v(" "), s("div", {
                staticClass: "circle circle-green"
            })])])
        }],
        r = {
            render: a,
            staticRenderFns: o
        };
        t.a = r
    },
    QutC: function(e, t) {},
    "UTg/": function(e, t, s) {
        "use strict";
        var a = s("hRKE"),
        o = s.n(a),
        r = s("3cXf"),
        n = s.n(r),
        i = JSON.parse(wxConfig);
        wx.config({
            debug: !1,
            appId: i.appId,
            timestamp: i.timestamp,
            nonceStr: i.nonceStr,
            signature: i.signature,
            jsApiList: i.jsApiList
        }),
        wx.ready(function() {
            wx.hideMenuItems({
                menuList: ["menuItem:copyUrl", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:refresh"]
            })
        }),
        wx.error(function(e) {});
        var c = function(e) {
            return e = e.replace(/\</g, "&lt;"),
            e = e.replace(/\>/g, "&gt;"),
            e = e.replace(/\n/g, "<br/>"),
            e = e.replace(/!h!/g, "<br/>"),
            e = e.replace(/\[emoji([0-9]*)\]/g, '<img src="http://res.hongloushangcheng.com/allbucket/chat/super_chat/v3/static/images/arclist/$1.gif" border="0" />')
        },
        u = function() {
            var e = 3;
            try {
                void 0 != WeixinJSBridge && WeixinJSBridge.invoke("getNetworkType", {},
                function(t) {
                    var s = new Audio;
                    s.src = "<?php echo $chat_url;?>music/notice.mp3";
                    var a = void 0; (a = s.play()) && a.then(function() {
                        var t = setInterval(function() {--e <= 0 && (s.pause(), clearInterval(t))
                        },
                        1e3)
                    }).
                    catch(function(e) {})
                })
            } catch(a) {
                var t = new Audio;
                t.src = "<?php echo $chat_url;?>music/notice.mp3";
                var s = void 0;
                s = t.play(),
                s && s.then(function() {
                    var s = setInterval(function() {--e <= 0 && (t.pause(), clearInterval(s))
                    },
                    1e3)
                }).
                catch(function(e) {})
            }
        },
        p = {
            setPageName: function(e, t) {
                e.currentPageName = t
            },
            toggleHeaderStatus: function(e, t) {
                e.headerStatus = t
            },
            staWebsocket: function(e, t) {
                e.websock = t,
                setInterval(function() {
                    e.websock.send("@")
                },
                3e3)
            },
            wsSendData: function(e, t) {
                "pullUserInfo" == t.operation ? e.websock.onopen = function(s) {
                    e.websock.send(t.data)
                }: e.websock.send(n()(t.data))
            },
            sendWsMsg: function(e, t) {
                e.websock.send(t)
            },
            setToken: function(e, t) {
                if ( - 1 == t.result) {
                    window.localStorage.removeItem("token"),
                    window.localStorage.removeItem("timestamp"),
                    window.localStorage.removeItem("expire"),
                    alert("登录过期请刷新页面");
                    var s = "http://" + window.location.host;
                    return void(window.location.href = s)
                }
                localStorage.setItem("token", t.data.t),
                localStorage.setItem("expire", t.data.expire),
                localStorage.setItem("timestamp", Date.parse(new Date) / 1e3),
                localStorage.setItem("account_id", parseInt(t.data.account_id)),
                e.userInfo.token = t.data.t;
                var a = function(e) {
                    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                    s = window.location.search.substr(1).match(t);
                    return null != s ? unescape(s[2]) : null
                } ("p_id"),
                o = void 0;
                o = a ? {
                    operation: "pullUserInfo",
                    data: {
                        token: t.data.t,
                        p_id: a
                    }
                }: {
                    operation: "pullUserInfo",
                    data: {
                        token: t.data.t
                    }
                },
                o.data.timestamp = Date.parse(new Date) / 1e3;
                var r = {
                    operation: o.operation,
                    account_id: e.userInfo.account_id,
                    session: e.userInfo.token,
                    s: e.s(o.data),
                    data: o.data
                },
                i = n()(r),
                c = C.enc.Utf8.parse(this.state.g(1)),
                u = C.enc.Utf8.parse(this.state.g()),
                p = C.AES.encrypt(i, c, {
                    iv: u,
                    mode: C.mode.CBC,
                    padding: C.pad.ZeroPadding
                }),
                l = p.toString();
                e.websock.send(l)
            },
            setUserInfo: function(e, t) {
                if ( - 1 == t.result) {
                    window.localStorage.removeItem("token"),
                    window.localStorage.removeItem("timestamp"),
                    window.localStorage.removeItem("expire"),
                    alert("登录过期请刷新页面");
                    var s = "http://" + window.location.host;
                    return void(window.location.href = s)
                }
                var a = t.data;
                this.state.userInfo.headimgurl = a.headimgurl,
                this.state.userInfo.nickname = a.nickname,
                this.state.userInfo.account_id = a.account_id,
                this.state.userInfo.saler_expire_time = a.saler_expire_time,
                this.state.userInfo.phone = a.phone,
                this.state.userInfo.ticket_count = a.ticket_count,
                this.state.userInfo.group_id = a.group_id,
                this.state.userInfo.llq_url = a.llq_url,
                this.state.tz_url = a.tz_url,
                this.state.userInfo.qn_token = a.qn_token,
                this.state.isConnet = !0,
                this.state.is_indexInfo = !0
            },
            processDeleteMsg: function(e, t) {
                t.data.type
            },
            deleteMsgNotic: function(e, t) {
                var s = t.data;
                1 == s.type ? (this.state.userChatList.msg.splice(this.state.userChatList.msg.findIndex(function(e) {
                    return e.msg_id === s.msg_id
                }), 1), this.state.isDelete = !0) : 2 == s.type && (this.state.groupChatList.msg.splice(this.state.groupChatList.msg.findIndex(function(e) {
                    return e.msg_id === s.msg_id
                }), 1), this.state.isDelete = !0),
                this.state.deleteData = s.user_info
            },
            processGetGroupInfo: function(e, t) {
                if (0 != t.result) return void e.showResultMessage(t.result_message);
                var s = t.data;
                this.state.groupInfo = s,
                this.state.isMember = s.is_member,
                this.state.isAuth = s.is_auth,
                this.state.applyMemberCount = s.apply_member_count,
                s.is_apply && 1 == s.is_apply ? this.state.isApply = 1 : this.state.isApply = 0;
                var a = e.userInfo.account_id;
                for (var o in s.users) s.users[o].account_id == a && (e.userInfo.group_power = s.users[o].power),
                s.users[o].account_id == s.wechat_user_id && (e.userInfo.group_power = s.users[o].power, s.users[o].is_manage = 1)
            },
            processDelGroup: function(e, t) {
                e.showResultMessage(t.result_message)
            },
            processSwitchGroup: function(e, t) {},
            processSendGroup: function(e, t) {
                if ( - 1 == t.result && "群过期,请使用熊卡续费群" == t.result_message) return e.isShowRecharge = !0,
                void setTimeout(function() {
                    e.isShowRecharge = !1
                },
                1e3);
                if ( - 1 == t.result && "群主开启禁言" == t.result_message) return e.isShowBan = !0,
                void setTimeout(function() {
                    e.isShowBan = !1
                },
                1e3);
                var s = t.data,
                a = s.to_id,
                o = void 0,
                r = s.msg;
                if ( - 1 != s.msg.indexOf("http") && 10 != s.msg_type && 2 != s.msg.msg_type && 20 != s.msg.msg_type) {
                    o = 3;
                    var n = /(http:\/\/|https:\/\/)((\w|=|\?|\:|\%|\.|\/|&|-)+)/g;
                    r = c(r),
                    r = r.replace(n, "<a href='$1$2'>$1$2</a>")
                } else if (20 == s.msg_type) {
                    o = 20;
                    var i = s.msg.split("_"),
                    p = i[0],
                    l = i[1];
                    1 == p ? r = e.hallName + "(牛牛房间" + l + "):" + e.baseUrl + "home/cn?i=" + l + "_": 2 == p ? r = e.hallName + "(牛牛房间" + l + "):" + e.baseUrl + "home/cn?i=" + l + "_": 3 == p ? r = e.hallName + "(牛牛房间" + l + "):" + e.baseUrl + "home/cn?i=" + l + "_": 4 == p ? r = e.hallName + "(金花房间" + l + "):" + e.baseUrl + "home/zh?i=" + l + "_": 5 == p ? r = e.hallName + "(三公房间" + l + "):" + e.baseUrl + "home/gn?i=" + l + "_": 6 == p ? r = e.hallName + "(二八杠房间" + l + "):" + e.baseUrl + "home/er?i=" + l + "_": 7 == p ? r = e.hallName + "(斗地主房间" + l + "):" + e.baseUrl + "home/dz?i=" + l + "_": 8 == p ? r = e.hallName + "(麻将房间" + l + "):" + e.baseUrl + "home/mj?i=" + l + "_": 9 == p ? r = e.hallName + "(鱼虾蟹房间" + l + "):" + e.baseUrl + "home/xx?i=" + l + "_": 10 == p ? r = e.hallName + "(牌九房间" + l + "):" + e.baseUrl + "home/pj?i=" + l + "_": 12 == p ? r = e.hallName + "(大吃小牛牛房间" + l + "):" + e.baseUrl + "home/dxb?i=" + l + "_": 13 == p ? r = e.hallName + "(大吃小房间" + l + "):" + e.baseUrl + "home/dcx?i=" + l + "_": 14 == p ? r = e.hallName + "(赖子牛牛房间" + l + "):" + e.baseUrl + "home/laib?i=" + l + "_": 16 == p ? r = e.hallName + "(13水房间" + l + "):" + e.baseUrl + "home/s13?i=" + l + "_": 17 == p ? r = e.hallName + "(超级三加一房间" + l + "):" + e.baseUrl + "home/j31?i=" + l + "_": 18 == p ? r = e.hallName + "(大牌九房间" + l + "):" + e.baseUrl + "home/dpj?i=" + l + "_": 19 == p && (r = e.hallName + "(广东麻将房间" + l + "):" + e.baseUrl + "home/gdmj?i=" + l + "_"),
                    r = c(r);
                    var n = /(http:\/\/|https:\/\/)((\w|=|\?|\:|\%|\.|\/|&|-)+)/g;
                    r = r.replace(n, "<a href='$1$2'>$1$2</a>")
                } else o = s.msg_type;
                this.state.isAllMusic && u(),
                this.state.groupChatList.mid && a == this.state.groupChatList.mid && (10 == o && (e.newMsg = {
                    msg: s.msg,
                    msg_id: s.msg_id
                }), s.from_id == e.userInfo.account_id ? this.state.groupChatList.msg.push({
                    account_id: e.userInfo.account_id,
                    date: this.state.getDate(),
                    headerUrl: e.userInfo.headimgurl,
                    msg_type: o,
                    name: e.userInfo.nickname,
                    text: 3 == o ? r: 20 == o ? r: c(s.msg),
                    lsText: s.msg,
                    msg_id: s.msg_id,
                    duration: null
                }) : this.state.groupChatList.msg.push({
                    account_id: s.from_id,
                    date: this.state.getDate(),
                    headerUrl: s.headerUrl,
                    msg_type: o,
                    name: s.nickname,
                    text: 3 == o ? r: 20 == o ? r: c(s.msg),
                    lsText: s.msg,
                    msg_id: s.msg_id,
                    duration: null
                }))
            },
            processGetGroupChatList: function(e, t) {
                var s = t.data,
                a = t.data;
                e.isGroupChatList = !0,
                e.scoreBoardList = [];
                for (var o = 0; o < a.msg.length; o++) {
                    if (20 == a.msg[o].msg_type) {
                        var r = a.msg[o].text.split("_"),
                        i = r[0],
                        u = r[1];
                        1 == i ? a.msg[o].text = e.hallName + "(牛牛房间" + u + "):" + e.baseUrl + "home/cn?i=" + u + "_": 2 == i ? a.msg[o].text = e.hallName + "(牛牛房间" + u + "):" + e.baseUrl + "home/cn?i=" + u + "_": 3 == i ? a.msg[o].text = e.hallName + "(牛牛房间" + u + "):" + e.baseUrl + "home/cn?i=" + u + "_": 4 == i ? a.msg[o].text = e.hallName + "(金花房间" + u + "):" + e.baseUrl + "home/zh?i=" + u + "_": 5 == i ? a.msg[o].text = e.hallName + "(三公房间" + u + "):" + e.baseUrl + "home/gn?i=" + u + "_": 6 == i ? a.msg[o].text = e.hallName + "(二八杠房间" + u + "):" + e.baseUrl + "home/er?i=" + u + "_": 7 == i ? a.msg[o].text = e.hallName + "(斗地主房间" + u + "):" + e.baseUrl + "home/dz?i=" + u + "_": 8 == i ? a.msg[o].text = e.hallName + "(麻将房间" + u + "):" + e.baseUrl + "home/mj?i=" + u + "_": 9 == i ? a.msg[o].text = e.hallName + "(鱼虾蟹房间" + u + "):" + e.baseUrl + "home/xx?i=" + u + "_": 10 == i ? a.msg[o].text = e.hallName + "(牌九房间" + u + "):" + e.baseUrl + "home/pj?i=" + u + "_": 12 == i ? a.msg[o].text = e.hallName + "(大吃小牛牛房间" + u + "):" + e.baseUrl + "home/dxb?i=" + u + "_": 13 == i ? a.msg[o].text = e.hallName + "(大吃小房间" + u + "):" + e.baseUrl + "home/dcx?i=" + u + "_": 14 == i ? a.msg[o].text = e.hallName + "(赖子牛牛房间" + u + "):" + e.baseUrl + "home/laib?i=" + u + "_": 16 == i ? a.msg[o].text = e.hallName + "(13水房间" + u + "):" + e.baseUrl + "home/s13?i=" + u + "_": 17 == i ? a.msg[o].text = e.hallName + "(超级三加一房间" + u + "):" + e.baseUrl + "home/j31?i=" + u + "_": 18 == i ? a.msg[o].text = e.hallName + "(大牌九房间" + u + "):" + e.baseUrl + "home/dpj?i=" + u + "_": 19 == i && (a.msg[o].text = e.hallName + "(广东麻将房间" + u + "):" + e.baseUrl + "home/gdmj?i=" + u + "_");
                        var p = a.msg[o].text,
                        l = a.msg[o].text;
                        l = c(l);
                        var h = /(http:\/\/|https:\/\/)((\w|=|\?|\:|\%|\.|\/|&|-)+)/g;
                        l = l.replace(h, "<a href='$1$2'>$1$2</a>"),
                        a.msg[o].msg_type = 20,
                        a.msg[o].text = l,
                        a.msg[o].oldText = a.msg[o].text,
                        a.msg[o].lsText = p,
                        a.msg[o].update_time = this.state.getDate(a.update_time),
                        a.msg[o].scoreInfo = null
                    }
                    var m = a.msg[o].text.indexOf("http");
                    if ( - 1 != m && 2 != a.msg[o].msg_type && 10 != a.msg[o].msg_type && 11 != a.msg[o].msg_type && 5 != a.msg[o].msg_type && 20 != a.msg[o].msg_type) {
                        var l = a.msg[o].text,
                        p = a.msg[o].text;
                        l = c(l);
                        var h = /(http:\/\/|https:\/\/)((\w|=|\?|\:|\%|\.|\/|&|-)+)/g;
                        l = l.replace(h, "<a href='$1$2'>$1$2</a>"),
                        a.msg[o].msg_type = 3,
                        a.msg[o].text = l,
                        a.msg[o].oldText = a.msg[o].text,
                        a.msg[o].lsText = p,
                        a.msg[o].update_time = this.state.getDate(a.update_time),
                        a.msg[o].scoreInfo = null
                    }
                    if ( - 1 == m && 2 != a.msg[o].msg_type && 10 != a.msg[o].msg_type && 11 != a.msg[o].msg_type && 5 != a.msg[o].msg_type && 20 != a.msg[o].msg_type) {
                        var p = a.msg[o].text;
                        a.msg[o].text = c(a.msg[o].text),
                        a.msg[o].lsText = p,
                        a.msg[o].oldText = a.msg[o].text,
                        a.msg[o].update_time = this.state.getDate(a.update_time),
                        a.msg[o].scoreInfo = null
                    }
                    if (5 == a.msg[o].msg_type) {
                        a.msg[o].scoreInfo = null;
                        var g = {
                            operation: "getScoreBoard",
                            data: {
                                token: localStorage.getItem("token"),
                                num: a.msg[o].text.split("-")[0],
                                type: a.msg[o].text.split("-")[1]
                            }
                        };
                        g.data.timestamp = Date.parse(new Date) / 1e3;
                        var d = {
                            operation: g.operation,
                            account_id: e.userInfo.account_id,
                            session: e.userInfo.token,
                            s: e.s(g.data),
                            data: g.data
                        },
                        f = n()(d),
                        _ = C.enc.Utf8.parse(this.state.g(1)),
                        v = C.enc.Utf8.parse(this.state.g()),
                        w = C.AES.encrypt(f, _, {
                            iv: v,
                            mode: C.mode.CBC,
                            padding: C.pad.ZeroPadding
                        }),
                        b = w.toString();
                        e.websock.send(b)
                    }
                }
                e.groupChatList = s,
                this.state.is_canGetChat = !0
            },
            processGetQnToken: function(e, t) {
                var s = t.data;
                e.userInfo.qn_token = s.qn_token
            },
            processUpdateGroup: function(e, t) {
                0 == t.result && (e.isShowSucess = !0, setTimeout(function() {
                    e.isShowSucess = !1
                },
                1e3))
            },
            processSendImageGroup: function(e, t) {
                if ( - 1 == t.result) return void alert(t.result_message);
                var s = t.data,
                a = s.to_id;
                this.state.isAllMusic && u(),
                this.state.groupChatList.mid && a == this.state.groupChatList.mid && (s.from_id == e.userInfo.account_id ? this.state.groupChatList.msg.push({
                    account_id: e.userInfo.account_id,
                    date: this.state.getDate(),
                    headerUrl: e.userInfo.headimgurl,
                    msg_type: s.msg_type,
                    name: e.userInfo.nickname,
                    text: s.msg,
                    lsText: s.msg,
                    msg_id: s.msg_id
                }) : this.state.groupChatList.msg.push({
                    account_id: s.from_id,
                    date: this.state.getDate(),
                    headerUrl: s.headerUrl,
                    msg_type: s.msg_type,
                    name: s.nickname,
                    text: s.msg,
                    lsText: s.msg,
                    msg_id: s.msg_id
                }))
            },
            processDelGroupLog: function(e, t) {
                e.isShowSucess = !0,
                setTimeout(function() {
                    e.isShowSucess = !1
                },
                1e3)
            },
            delGroupNotic: function(e, t) {
                var s = (t.data.wechat_group_id, t.data.wechat_user_id);
                this.state.userInfo.account_id != s && alert(t.data.wechat_group_name + "群已被群主删除")
            },
            processGetCopyLink: function(e, t) {
                var s = t.data;
                this.state.copyLink = s.short_url
            },
            processOutGroup: function(e, t) {
                0 == t.result && alert("退群成功");
                var s = e._lsGroupId,
                a = e.userInfo.group_list;
                a.splice(a.findIndex(function(e) {
                    return e.group_id === s
                }), 1),
                e.userInfo.group_list = a,
                e.isMe = !1
            },
            processSearchGroupChatLog: function(e, t) {
                var s = t.data;
                0 == s.length ? alert("没有查询到相关聊天记录") : e.groupChatLog = s
            },
            processReceivePowerCode: function(e, t) {
                var s = t.data,
                a = e.groupChatList.msg;
                for (var o in a) a[o].msg_id == s.msg_id && (a[o].is_receive = 1);
                e.receivePower = s,
                e.receivePower = t,
                s.to_user_info.account_id == e.userInfo.account_id && (e.userInfo.power_count = e.userInfo.power_count + parseInt(s.power_count))
            },
            processSetUserCollection: function(e, t) {
                t.data;
                0 == t.result && (e.isCollect = !0, setTimeout(function() {
                    e.isCollect = !1
                },
                500))
            },
            processCheckCollection: function(e, t) {
                e.collectList = t.data
            },
            processGetUserCollection: function(e, t) {
                for (var s = t.data,
                a = t.data,
                o = 0; o < a.length; o++) {
                    var r = a[o].content.indexOf("http");
                    if ( - 1 != r && 2 != a[o].content.msg_type) {
                        var n = a[o].content;
                        a[o].content;
                        n = c(n);
                        var i = /(http:\/\/|https:\/\/)((\w|=|\?|\:|\%|\.|\/|&|-)+)/g;
                        n = n.replace(i, "<a href='$1$2'>$1$2</a>"),
                        a[o].text = n
                    }
                    if ( - 1 == r && 2 != a[o].content.msg_type) {
                        a[o].content.text;
                        a[o].text = c(a[o].content)
                    }
                }
                e.UserCollection = s,
                this.state.is_canGetChat = !0
            },
            processDeleteUserCollection: function(e, t) {
                var s = t.data;
                if (this.state.is_canGetChat = !0, 0 == t.result) {
                    e.delCollect = !0,
                    setTimeout(function() {
                        e.delCollect = !1
                    },
                    500);
                    for (var a in e.UserCollection) e.UserCollection[a].id == s.collection_id && e.UserCollection.splice(a, 1)
                }
            },
            processCreatePowerCode: function(e, t) {
                if ( - 1 == t.result) return void alert(t.result_message);
                var s = t.data,
                a = s.wechat_group_id,
                o = e.userInfo,
                r = e.groupInfo.users;
                if (e.groupInfo.wechat_group_id == s.wechat_group_id) for (var n in r) o.account_id == s.form_user_info.account_id && (o.group_power = s.sub_power_count);
                s.form_user_info.account_id == e.userInfo.account_id && (e.toDialogue = !0, alert("生成宝箱成功")),
                this.state.groupChatList.mid && a == this.state.groupChatList.mid && (s.form_user_info.account_id == e.userInfo.account_id ? this.state.groupChatList.msg.push({
                    account_id: e.userInfo.account_id,
                    date: this.state.getDate(),
                    headerUrl: e.userInfo.headimgurl,
                    msg_type: 4,
                    is_receive: 0,
                    to_user_info: s.to_user_info,
                    from_user_info: s.form_user_info,
                    name: e.userInfo.nickname,
                    text: s.code,
                    lsText: s.msg,
                    msg_id: s.msg_id
                }) : this.state.groupChatList.msg.push({
                    account_id: s.form_user_info.account_id,
                    date: this.state.getDate(),
                    headerUrl: s.form_user_info.headimgurl,
                    msg_type: 4,
                    is_receive: 0,
                    to_user_info: s.to_user_info,
                    from_user_info: s.form_user_info,
                    name: s.form_user_info.nickname,
                    text: s.code,
                    lsText: s.msg,
                    msg_id: s.msg_id
                }))
            },
            processSetPassword: function(e, t) {
                0 == t.result && (e.isSetMsg = !0)
            },
            processGetReceiveList: function(e, t) {
                for (var s in t.data.list) e.getReceiveListGroup.push(t.data.list[s]);
                0 == t.result ? e.isGetReceiveList = 1 : e.isGetReceiveList = 2
            },
            processGetSendList: function(e, t) {
                for (var s in t.data.list) e.getSendListGroup.push(t.data.list[s]);
                0 == t.result ? e.isGetSendList = 1 : e.isGetSendList = 2
            },
            processAddGroupByUsers: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    e.isCreateGroup = 1,
                    e.isCreateId = t.data.wechat_group_id;
                    var a = {
                        group_id: s.wechat_group_id,
                        user_id: s.wechat_user_id,
                        group_name: s.group_name
                    };
                    e.userInfo.group_list ? e.userInfo.group_list.unshift(a) : (e.userInfo.group_list = [], e.userInfo.group_list.push(a))
                } else e.isCreateGroup = 2,
                e.isCreateId = ""
            },
            processSendCards: function(e, t) {
                0 == t.result ? e.isSendCard = 1 : e.isSendCard = 2,
                e.userInfo.ticket_count = t.data.receiveRs.data.ticket_count
            },
            processSetGroupNoty: function(e, t) {
                t.data;
                0 == t.result ? e.isSetGroupNoty = 1 : e.isSetGroupNoty = 2
            },
            processDeleteGroupUser: function(e, t) {
                0 == t.result ? e.isDelGroupUser = 1 : e.isDelGroupUser = 2
            },
            deleteGroupUserNotic: function(e, t) {
                t.data.wechat_group_id;
                e.isShowDelele = !0,
                setTimeout(function() {
                    e.isShowBan = !1
                },
                1e3)
            },
            processGetUserGroupApply: function(e, t) {
                var s = t.data;
                0 == t.result && (e.applyUserList = s)
            },
            processJoinGroup: function(e, t) {
                e.is_join = t.data.is_join,
                e.isShowSucess = !0,
                setTimeout(function() {
                    e.isShowSucess = !1
                },
                1e3)
            },
            processSetGroupAuth: function(e, t) {
                t.data;
                0 == t.result ? e.isAuth = 1 : e.isAuth = 2
            },
            processDisAllowTalk: function(e, t) {
                t.data;
                0 == t.result ? e.isTalk = 1 : e.isTalk = 2
            },
            processAgreeUserGroupApply: function(e, t) {
                0 == t.result ? e.isAgree = 1 : e.isAgree = 2
            },
            processGetAllJumpUrl: function(e, t) {
                var s = (t.data, document.getElementById("copy"));
                "" == e.tz_url ? e.group_url = e.baseUrl + "chat/index/chat/room/?mid=" + e.groupInfo.wechat_group_id: e.group_url = e.tz_url,
                s.value = e.groupInfo.group_name + "邀请:" + e.group_url
            },
            processSetUserCard: function(e, t) {
                e.getCardImg = t.data.card_url
            },
            processSendUserCard: function(e, t) {
                0 == t.result ? alert("发送成功") : alert(t.result_message)
            },
            processRechargeGroup: function(e, t) {
                0 == t.result ? (e.userInfo.ticket_count -= 80, e.isShowSucess = !0, setTimeout(function() {
                    e.isShowSucess = !1
                },
                1e3)) : alert(t.result_message)
            },
            processRechargeVoice: function(e, t) {
                0 == t.result ? (e.userInfo.ticket_count -= 50, e.isShowSucess = !0, setTimeout(function() {
                    e.isShowSucess = !1
                },
                1e3)) : alert(t.result_message)
            },
            processSetGroupManage: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    var a = e.groupInfo.users;
                    for (var o in a) a[o].account_id == s.wechat_user_id && (a[o].is_manage = s.is_manage)
                }
            },
            processTransferGroup: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    var a = e.userInfo.group_list;
                    for (var o in a) a[o].group_id == s.grou_id && (a[o].user_id = s.wechat_user_id);
                    e.isShowSucess = !0,
                    setTimeout(function() {
                        e.isShowSucess = !1
                    },
                    1e3)
                } else e.isShowFalse = !0,
                setTimeout(function() {
                    e.isShowFalse = !1
                },
                1e3)
            },
            processTransferGroupNotic: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    var a = e.userInfo.group_list;
                    for (var o in a) a[o].group_id == s.grou_id && (a[o].user_id = s.wechat_user_id)
                }
            },
            processPullVoiceInfo: function(e, t) {
                var s = t.data;
                0 == t.result ? window.location.href = s.voice_url + "?r=" + s.k: alert(t.result_message)
            },
            processUpdateGroupPower: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    var a = e.groupInfo;
                    for (var o in a.users) a.users[o].account_id == s.wechat_user_id && (a.users[o].power = s.power)
                } else e.showResultMessage(t.result_message)
            },
            processGetScoreList: function(e, t) {
                e.isGroupChatList = !1;
                var s = t.data;
                if (0 == t.result) {
                    if (0 == s.length) return;
                    for (var a in s) e.scoreList.push(s[a])
                } else e.showResultMessage(t.result_message)
            },
            processGetScoreBoard: function(e, t) {
                var s = t.data;
				console.log(s)
                if (0 == t.result) if (1 == e.isGroupChatList) {
					
                    var a = e.groupChatList.msg;
                    for (var r in a) void 0 != o()(a[r].text.split("-")[1]) && a[r].text.split("-")[0] == s.balance_scoreboard.room_number && (a[r].scoreInfo = s);
                    e.groupChatList.msg = a
                    console.log('a',a);
                } else e.canvasData = s;
                else e.showResultMessage(t.result_message)
            },
            processSaveChatGameSetting: function(e, t) {
                t.data;
                e.showResultMessage(t.result_message)
            },
            processGetChatGameSetting: function(e, t) {
                var s = t.data;
                0 == t.result ? 0 == s.length ? e.gameSetting = e.default_gameSetting: e.gameSetting = s: e.showResultMessage(t.result_message)
            },
            procesSetScoreCs: function(e, t) {
                t.data;
                if (0 == t.result) {
                    var s = e.scoreList;
                    for (var a in s) e.cs_room_number == s[a].room_number && (s[a].is_cs = 1, e.gameIsCs = !0)
                }
                setTimeout(function() {
                    e.gameIsCs = !1
                },
                1500),
                e.cs_room_number = "",
                e.showResultMessage(t.result_message)
            },
            procesGetChatCsList: function(e, t) {
                var s = t.data;
                if (0 == t.result) {
                    if (0 == s.length) return;
                    for (var a in s) e.csList.push(s[a]);
                    e.csList_total_page = t.total_page
                }
                e.showResultMessage(t.result_message)
            },
            procesOpenCs: function(e, t) {
                t.data;
                0 == t.result && (e.groupInfo.is_open_cs = 1),
                e.showResultMessage(t.result_message)
            },
            processGetIndexChatList: function(e, t) {
                t.data;
                t.result,
                e.showResultMessage(t.result_message)
            },
            processGetGroupList: function(e, t) {
                var s = t.data;
                0 == t.result && (e.myChatGroupList = s),
                e.showResultMessage(t.result_message)
            }
        };
        t.a = p
    },
    WMeU: function(e, t, s) {
        "use strict";
        var a = this,
        o = {
            contactsInitialList: function(e) {
                for (var t = [], s = e.allContacts, a = s.length, o = 0; o < a; o++) - 1 == t.indexOf(s[o].initial.toUpperCase()) && t.push(s[o].initial.toUpperCase());
                return t.sort()
            },
            contactsList: function(e, t) {
                for (var s = {},
                a = e.allContacts,
                o = a.length,
                r = 0; r < t.contactsInitialList.length; r++) {
                    var n = t.contactsInitialList[r];
                    s[n] = [];
                    for (var i = 0; i < o; i++) a[i].initial.toUpperCase() === n && s[n].push(a[i])
                }
                return s
            },
            sta_update: function(e) {
                return e.websock
            },
            msgInfo: function(e) {
                for (var t in a.$store.state.msgList.baseMsg) if (a.$store.state.msgList.baseMsg[t].mid == a.$route.query.msgInfo.mid) return a.$store.state.msgList.baseMsg[t]
            }
        };
        t.a = o
    },
    YaEn: function(e, t, s) {
        "use strict";
        var a = s("kV13"),
        o = s("cigS");
        a.a.use(o.a);
        var r = [{
            path: "/",
            redirect: "/chat/index/chat/room"
        },
        {
            path: "/chat/index/hall",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(21).then(function() {
                        var t = [s("kxt5")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/room",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(3).then(function() {
                        var t = [s("HQF+")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/menu",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(1).then(function() {
                        var t = [s("ATce")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/group-setting",
            name: "群设置",
            components: {
                subPage: function(e) {
                    return s.e(22).then(function() {
                        var t = [s("tyLF")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/tf",
            name: "转让群",
            components: {
                subPage: function(e) {
                    return s.e(16).then(function() {
                        var t = [s("riw7")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/tip",
            name: "上传收款码",
            components: {
                subPage: function(e) {
                    return s.e(17).then(function() {
                        var t = [s("UA4X")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/group-notice",
            name: "群公告",
            components: {
                subPage: function(e) {
                    return s.e(23).then(function() {
                        var t = [s("NoE9")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/renew",
            name: "群续费",
            components: {
                subPage: function(e) {
                    return s.e(5).then(function() {
                        var t = [s("KUlW")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/reVoice",
            name: "语音续费",
            components: {
                subPage: function(e) {
                    return s.e(6).then(function() {
                        var t = [s("11rO")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/apply",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(2).then(function() {
                        var t = [s("9nJN")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/create-group",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(4).then(function() {
                        var t = [s("F0Lr")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/apply",
            name: "申请管理",
            components: {
                subPage: function(e) {
                    return s.e(2).then(function() {
                        var t = [s("9nJN")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/searchGroupLog",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(13).then(function() {
                        var t = [s("Jv1w")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/manager-member",
            name: "",
            components: {
                subPage: function(e) {
                    return s.e(20).then(function() {
                        var t = [s("fw8o")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/setPoint",
            name: "设置群成员宝点",
            components: {
            default:
                function(e) {
                    return s.e(1).then(function() {
                        var t = [s("ATce")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                },
                subPage: function(e) {
                    return s.e(12).then(function() {
                        var t = [s("+8FZ")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/sendCollect",
            name: "发送收藏",
            components: {
                subPage: function(e) {
                    return s.e(18).then(function() {
                        var t = [s("lQSb")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/point",
            name: "发送爱心值",
            components: {
                subPage: function(e) {
                    return s.e(19).then(function() {
                        var t = [s("UPGR")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/gqr",
            name: "群二维码",
            components: {
                subPage: function(e) {
                    return s.e(9).then(function() {
                        var t = [s("zJhu")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/card",
            name: "名片设置",
            components: {
                subPage: function(e) {
                    return s.e(24).then(function() {
                        var t = [s("6bM0")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/chat/package-detail",
            name: "红包派送详情",
            components: {
                subPage: function(e) {
                    return s.e(8).then(function() {
                        var t = [s("dacV")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/my/center",
            name: "个人中心",
            components: {
                subPage: function(e) {
                    return s.e(0).then(function() {
                        var t = [s("A30q")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/my/sk",
            name: "卡",
            components: {
            default:
                function(e) {
                    return s.e(0).then(function() {
                        var t = [s("A30q")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                },
                subPage: function(e) {
                    return s.e(10).then(function() {
                        var t = [s("5T49")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/my/spw",
            name: "设置密码",
            components: {
            default:
                function(e) {
                    return s.e(0).then(function() {
                        var t = [s("A30q")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                },
                subPage: function(e) {
                    return s.e(14).then(function() {
                        var t = [s("YGeP")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/my/fkjl",
            name: "卡记录",
            components: {
            default:
                function(e) {
                    return s.e(0).then(function() {
                        var t = [s("A30q")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                },
                subPage: function(e) {
                    return s.e(15).then(function() {
                        var t = [s("+tCe")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/my/cjq",
            name: "创建群聊",
            components: {
            default:
                function(e) {
                    return s.e(0).then(function() {
                        var t = [s("A30q")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                },
                subPage: function(e) {
                    return s.e(11).then(function() {
                        var t = [s("i7mm")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        },
        {
            path: "/chat/index/qyh",
            name: "群邀请",
            components: {
            default:
                function(e) {
                    return s.e(7).then(function() {
                        var t = [s("BwwC")];
                        e.apply(null, t)
                    }.bind(this)).
                    catch(s.oe)
                }
            }
        }];
        t.a = new o.a({
            mode: "history",
            routes: r
        })
    },
    YtJ0: function(e, t, s) {
        "use strict";
        var a = s("ZLEe"),
        o = s.n(a),
        r = s("kV13"),
        n = s("HVJf"),
        i = s("UTg/"),
        c = s("WMeU"),
        u = s("/8vw");
        r.a.use(n.b);
        var p = phpVhref,
        l = phpIsWx,
        h = phpIsXl,
        m = phpWxUrl,
        g = phpWxIp,
        d = PhpAurl;
        window.iv = "mutaions_iv",
        window.key = "mutaions_key";
        var f = {
            wx_url: m,
            wx_ip: g,
            apiUrl: p,
            is_weixin: l,
            is_xianliao: h,
            aurl: d,
            websock: null,
            my: "14.215.177.38",
            getDate: function(e) {
                if (e && "" != e) var t = new Date(1e3 * e);
                else var t = new Date;
                return (t.getHours() > 9 ? t.getHours() : "0" + t.getHours()) + ":" + (t.getMinutes() > 9 ? t.getMinutes() : "0" + t.getMinutes())
            },
            delDate: function(e) {
                if (0 != e && e) {
                    var t = new Date(1e3 * e);
                    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ") + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + ((t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":") + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds())
                }
            },
            expireDate: function(e) {
                if (0 != e && e) {
                    var t = new Date(1e3 * e);
                    return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + ((t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " ")
                }
            },
            is_app: 0,
            count: 0,
            userInfo: {
                token: 0,
                headimgurl: "",
                nickname: "-",
                account_id: 0,
                qn_token: "",
                group_power: "",
                saler_expire_time: "",
                phone: "",
                ticket_count: "",
                group_id: "",
                group_list: "",
                llq_url: ""
            },
            tempAutoContent: "",
            baseUrl: baseUrl,
            hallName: hallName,
            isOpenPower: !1,
            isShowPowerTips: !1,
            toDialogue: !1,
            powerTips: "",
            isCollect: !1,
            delCollect: !1,
            groupList: [],
            myChatGroupList: "",
            groupMemberList: [],
            currentPageName: "",
            headerStatus: !0,
            is_join: 0,
            isConnet: !1,
            isfriendList: !1,
            shopList: [],
            searchGroupList: [],
            groupChatLog: "",
            receivePower: {},
            is_getGroupList: !1,
            is_indexInfo: !1,
            is_canSendChat: !1,
            is_canGetChat: !1,
            isGroupChatList: !1,
            scoreBoardList: [],
            chat_msg_id: "",
            chat_room_num: "",
            userChatList: [],
            scoreList: [],
            default_gameSetting: {
                score_type: "2",
                is_all: "0",
                val0: "",
                val1: "",
                val2: "",
                val3: "",
                min_val: ""
            },
            gameSetting: "",
            canvasData: "",
            groupChatList: {
                group_name: "",
                group_qrCode: "",
                mid: "",
                msg: [],
                newMsgCount: "",
                quiet: "",
                read: "",
                users: []
            },
            group_url: "",
            UserCollection: "",
            groupInfo: "",
            groupUsers: "",
            applyUserList: "",
            isMe: !1,
            isMusic: !0,
            isOnopen: !1,
            isAllMusic: !0,
            copyLink: "",
            isDelete: !1,
            deleteData: "",
            isShowSucess: !1,
            isShowFalse: !1,
            isShowBan: !1,
            isShowDelele: !1,
            isShowRecharge: !1,
            isSetMsg: !1,
            getReceiveListGroup: "",
            getSendListGroup: "",
            isCreateGroup: 0,
            isCreateId: "",
            isSendCard: 0,
            isSetGroupNoty: 0,
            isDelGroupUser: 0,
            isAuth: 0,
            isTalk: 0,
            isMember: 0,
            isAgree: 0,
            isGetReceiveList: 0,
            isGetSendList: 0,
            getCardImg: "",
            applyMemberCount: 0,
            _lsGroupId: "",
            newMsg: "",
            isShowTip: !1,
            showTip: "",
            cs_room_number: "",
            csList_total_page: "",
            gameIsCs: !1,
            csList: [],
            tz_url: "",
            showResultMessage: function(e) {
                if ("" != e) {
                    this.showTip = e,
                    this.isShowTip = !0;
                    var t = this;
                    setTimeout(function() {
                        t.isShowTip = !1
                    },
                    1e3)
                }
            },
            GetQueryString: function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
                s = window.location.search.substr(1).match(t);
                return null != s ? (localStorage.setItem("code", unescape(s[2])), unescape(s[2])) : null
            },
            smileList: function() {
                for (var e = [], t = 0; t < 75; t++) e.push({
                    id: "[emoji" + parseInt(t + 1) + "]"
                });
                return e
            },
            tsjList: function() {
                for (var e = [], t = 0; t < 38; t++) e.push({
                    id: "[tsj" + parseInt(t + 1) + "]"
                });
                return e
            },
            alList: function() {
                for (var e = [], t = 0; t < 14; t++) e.push({
                    id: "[al" + parseInt(t + 1) + "]"
                });
                return e
            },
            stopView: function() {},
            sortCharter: function(e, t) {
                return e.toString().toUpperCase() > t.toString().toUpperCase() ? 1 : e.toString().toUpperCase() == t.toString().toUpperCase() ? 0 : -1
            },
            objKeySort: function(e) {
                for (var t = o()(e).sort(f.sortCharter), s = {},
                a = 0; a < t.length; a++) s[t[a]] = e[t[a]];
                return s
            },
            ksort: function(e, t) {
                var s, a, o, r = {},
                n = [],
                i = this,
                c = !1,
                u = {};
                switch (t) {
                case "SORT_STRING":
                    s = function(e, t) {
                        return i.strnatcmp(e, t)
                    };
                    break;
                case "SORT_LOCALE_STRING":
                    var p = this.i18n_loc_get_default();
                    s = this.php_js.i18nLocales[p].sorting;
                    break;
                case "SORT_NUMERIC":
                    s = function(e, t) {
                        return e + 0 - (t + 0)
                    };
                    break;
                default:
                    s = function(e, t) {
                        var s = parseFloat(e),
                        a = parseFloat(t),
                        o = s + "" === e,
                        r = a + "" === t;
                        return o && r ? s > a ? 1 : s < a ? -1 : 0 : o && !r ? 1 : !o && r ? -1 : e > t ? 1 : e < t ? -1 : 0
                    }
                }
                for (o in e) e.hasOwnProperty(o) && n.push(o);
                for (n.sort(s), this.php_js = this.php_js || {},
                this.php_js.ini = this.php_js.ini || {},
                c = this.php_js.ini["phpjs.strictForIn"] && this.php_js.ini["phpjs.strictForIn"].local_value && "off" !== this.php_js.ini["phpjs.strictForIn"].local_value, u = c ? e: u, a = 0; a < n.length; a++) o = n[a],
                r[o] = e[o],
                c && delete e[o];
                for (a in r) r.hasOwnProperty(a) && (u[a] = r[a]);
                return c || u
            },
            s: function(e) {
                var t = f.ksort(e),
                s = "";
                for (var a in t) s += a.toLowerCase() + "=" + encodeURIComponent(t[a]).toLowerCase();
                return s += f.my,
                md5.getMd5(s)
            },
            sb: function(e) {
                for (var t = [], s = e.split(""), a = 0; a < s.length; a++) {
                    0 != a && t.push(" ");
                    var o = s[a],
                    r = o.charCodeAt().toString(2);
                    t.push(r)
                }
                return t.join("")
            },
            bs: function(e) {
                for (var t = [], s = e.split(" "), a = 0; a < s.length; a++) {
                    var o = s[a],
                    r = parseInt(o, 2),
                    n = String.fromCharCode(r);
                    t.push(n)
                }
                return t.join("")
            },
            t: function() {
                for (var e = new Array,
                t = 0; t < 16; t++) 0 != t && e.push(Math.pow(8, t));
                return e
            },
            o: function(e) {
                for (var t = "",
                s = 0,
                a = 0; a < e.length; a++)"111000" == e[a] || "101100" == e[a] || "110010" == e[a] ? s++:t += e[a];
                return {
                    b: s,
                    arr: t
                }
            },
            g: function(e) {
                for (var t = f.t(), s = f.sb(t.toString()), a = f.o(s).arr, o = f.bs(a), r = o.length.toString(), n = (r[0].toString(), r[1].toString(), ""), i = void 0, c = 1; c < r[2]; c++) n = c + n;
                return i = n.split("").reverse().join(""),
                e ? i + n: n + i
            }
        };
        t.a = new n.b.Store({
            state: f,
            mutations: i.a,
            actions: u.a,
            getters: c.a
        })
    },
    iOuT: function(e, t) {},
    lQXI: function(e, t) {},
    sEFh: function(e, t, s) {
        "use strict";
        var a = s("4YfN"),
        o = s.n(a),
        r = s("ZLEe"),
        n = s.n(r),
        i = s("sPgX"),
        c = s("BMa3"),
        u = s.n(c),
        p = s("HVJf"),
        l = s("KPSb"),
        h = s.n(l);
        "micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) && (window.alert = function(e) {
            var t = document.createElement("IFRAME");
            t.style.display = "none",
            t.setAttribute("src", "data:text/plain"),
            document.documentElement.appendChild(t),
            window.frames[0].window.alert(e),
            t.parentNode.removeChild(t)
        }),
        function() {
            var e = navigator.userAgent;
            navigator.appVersion,
            !!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && window.history.pushState({},
            "title", "#")
        } (),
        window.mixin = i.a,
        t.a = {
            name: "app",
            data: function() {
                return {
                    pageName: "",
                    code: 123,
                    routerAnimate: !1,
                    enterAnimate: "",
                    leaveAnimate: "",
                    sendMsg: {
                        operation: "createRoom",
                        RoomId: 10012,
                        accountId: 101
                    },
                    lock: !1,
                    isOpen: !1
                }
            },
            methods: {
                toggleMsgRead: function() {
                    this.$store.dispatch("staConnect")
                },
                testConnectWs: function() {
                    this.$store.dispatch("wsDispatch", this.sendMsg)
                },
                onmessage: function() {
                    var e = this;
                    this.$store.getters.sta_update.onmessage = function(t) {
                        e.$store.state.isOnopen = !0,
                        e.isOpen = !0,
                        "@" != t.data ? e.cjs(t.data) : e.$store.dispatch("wsDispatch", "@")
                    }
                },
                onclose: function() {
                    this.$store.getters.sta_update.onclose = function(e) {
                        this.$store.dispatch("staConnect")
                    }
                },
                pullUserInfo: function() {
                    var e = {
                        operation: "pullUserInfo",
                        data: {
                            token: localStorage.getItem("token")
                        }
                    };
                    this.$store.dispatch("sendDispatch", e)
                },
                cjs: function(e) {
                    var t = e,
                    s = C.enc.Utf8.parse(this.$store.state.g(1)),
                    a = C.enc.Utf8.parse(this.$store.state.g()),
                    o = C.AES.decrypt(t, s, {
                        iv: a,
                        padding: C.pad.ZeroPadding
                    }),
                    r = o.toString(C.enc.Utf8),
                    n = JSON.parse(r);
                    this.$store.dispatch("wsDispatch", n)
                },
                sortCharter: function(e, t) {
                    return e.toString().toUpperCase() > t.toString().toUpperCase() ? 1 : e.toString().toUpperCase() == t.toString().toUpperCase() ? 0 : -1
                },
                objKeySort: function(e) {
                    for (var t = n()(e).sort(this.sortCharter), s = {},
                    a = 0; a < t.length; a++) s[t[a]] = e[t[a]];
                    return s
                },
                getSign: function(e) {
                    var t = this.objKeySort(e),
                    s = "";
                    for (var a in t) s += a.toLowerCase() + "=" + encodeURIComponent(t[a]).toLowerCase();
                    return s += this.my,
                    h.a.getMd5(s)
                },
                ParseUrl: function(e) {
                    var t = /(\w+)=(\w+)/gi,
                    s = {};
                    return url.replace(t,
                    function(e, t, a) {
                        s[t] = a
                    }),
                    s
                },
                GetQueryString: function(e) {
                    var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
                    s = window.location.search.substr(1).match(t);
                    return null != s ? (localStorage.setItem("code", unescape(s[2])), unescape(s[2])) : null
                },
                getToken: function() {
                    var e = this,
                    t = this.GetQueryString("p_id"),
                    s = void 0;
                    s = t ? {
                        operation: "getToken",
                        data: {
                            code: e.GetQueryString("code"),
                            p_id: t
                        }
                    }: {
                        operation: "getToken",
                        data: {
                            code: e.GetQueryString("code")
                        }
                    },
                    this.$store.dispatch("sendDispatch", s)
                },
                addFriend: function() {
                    var e = {
                        operation: "addFriends",
                        data: {
                            token: localStorage.getItem("token"),
                            wechat_friends_id: localStorage.getItem("user_code")
                        }
                    };
                    this.$store.dispatch("sendDispatch", e)
                },
                start: function() {
                    this.pullUserInfo(),
                    this.GetQueryString("mid") ? this.$router.push({
                        path: "/",
                        query: {
                            mid: this.GetQueryString("mid")
                        }
                    }) : "undefined" != typeof group_id && group_id && 0 != group_id && (1 == this.GetQueryString("app") && (localStorage.setItem("chat", "1"), this.$store.state.is_app = 1), this.$router.push({
                        path: "/",
                        query: {
                            mid: group_id
                        }
                    }))
                },
                getHomeChatList: function() {
                    var e = {
                        operation: "getHomeChatList",
                        data: {
                            token: localStorage.getItem("token")
                        }
                    };
                    this.$store.dispatch("sendDispatch", e)
                },
                getGroupInfo: function(e) {
                    if (!this.lock) {
                        var t = {
                            operation: "getGroupInfo",
                            data: {
                                token: localStorage.getItem("token"),
                                wechat_group_id: e
                            }
                        };
                        this.$store.dispatch("sendDispatch", t)
                    }
                },
                queryJsConfig: function(e, t) {
                    u.a.get("http://wx.g6j7mc.top/wapi.php", "").then(function(e) {
                        t(null, e)
                    }).
                    catch(function(e) {
                        t(e)
                    })
                }
            },
            created: function() {},
            mounted: function() {
                this.start(),
                this.onmessage(),
                this.onclose()
            },
            computed: o()({},
            s.i(p.a)({
                token: function(e) {
                    return e.userInfo.token
                }
            }), {
                isConnet: function() {
                    return this.$store.state.isConnet
                },
                isOnopen: function() {
                    return this.$store.state.isOnopen
                }
            }),
            watch: {
                isOnopen: function() {
                    if (this.$store.state.isOnopen) {
                        var e = localStorage.getItem("token");
                        this.$store.state.isOnopen && this.GetQueryString("code") && !e && this.getToken()
                    }
                },
                $route: function(e, t) {
                    var s = e.path.split("/").length,
                    a = t.path.split("/").length;
                    2 === s && this.$store.commit("setPageName", e.name),
                    s !== a && (this.enterAnimate = s > a ? "animated bounceInRight": "animated bounceInLeft", this.leaveAnimate = s > a ? "animated bounceInLeft": "animated bounceInRight", 3 === s && (this.leaveAnimate = "animated fadeOutRight"))
                },
                isConnet: function() {
                    1 == this.$store.state.isConnet && localStorage.getItem("user_code") && (this.getAccountDetail(localStorage.getItem("user_code")), this.$router.push({
                        path: "/contact/stranger-user",
                        query: {
                            mid: localStorage.getItem("user_code")
                        }
                    })),
                    1 == this.$store.state.isConnet && localStorage.getItem("group_code") && (this.getGroupInfo(localStorage.getItem("group_code")), this.$router.push({
                        path: "/contact/stranger-group",
                        query: {
                            mid: localStorage.getItem("group_code")
                        }
                    }))
                }
            }
        }
    },
    sPgX: function(e, t, s) {
        "use strict";
        var a = {
            mounted: function() {
                this.$store.commit("setPageName", this.pageName)
            },
            activated: function() {
                this.$store.commit("setPageName", this.pageName)
            }
        };
        t.a = a
    },
    y15U: function(e, t) {}
},
["NHnr"]);
//# sourceMappingURL=app.16046541d4a9de0084a8.js.map
