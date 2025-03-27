var app = new Vue({
    el: '#app',
    data: {
        is_show: false,
        on_union: false,
        list_show: false,
        setBos_show: false,
        is_show_tip: false,
        is_show_num_list: false,
        is_show_business: false,
        is_show_detailed: false,
        journal_show: false,
        is_show_devote: false,
        is_show_give_box: false,
        close_union: false,
        switch_club: false,
        page: 1,
        page2: 1,
        page3: 1,
        page4: 1,
        getPointType: 0,
        givePoint: '',
        tip_msg: '',
        search_uid: '',
        journal_search_uid: '',
        give_search_uid: '',
        member_list: [],
        point_list: [],
        my_point_list: [],
        devote_list: [],
        unionList: {},
        myInfo: {},
        nowUnionList: {},
        setInfo: {},
        temp: {},
        user: {},
        radioData: [
            {value: 1, name: '是'},
            {value: 0, name: '否'},
        ],
        typeRadioData: [
            {value: 0, name: '固定积分'},
            {value: 1, name: '百分比积分'},
        ],
        join_limit_list: [],
        bank_limit_list: [],
        numListMsg: "",
        numListType: "",
        numListUser: {},
        giveUser: {},
        number_info: "0",
        journalLock: false,
        listLock: false,
        myPointListLock: false,
        devoteLock: false,
        showGiveUid: false,
    },
    created: function () {
        this.init();
    },
    mounted: function () {
        window.addEventListener("scroll", this.scrollBottom, true);
    },
    methods: {
        closeJfModel: function () {
            this.close_union = true;
        },
        closeBox: function () {
            this.close_union = false;
        },
        closeUnion: function () {
            this.post(BaseUrl + "/Unions/closeUnion", {
                club_no: this.nowUnionList.club_no,
            }, (e) => {
                this.show_tip(e.msg);
                if (e.code == 1) {
                    location.reload();
                }
            });
        },
        give: function () {
            if (this.give_search_uid.length > 0 && this.givePoint.length > 0) {
                this.post(BaseUrl + "/Unions/give_score", {
                    club_no: this.nowUnionList.club_no,
                    number: this.givePoint,
                    user_id: this.give_search_uid,
                }, (e) => {
                    if (e.code == 1) {
                        this.closeGiveBox();
                        this.mime();
                        this.updateNowUnionInfo();
                    }
                    this.show_tip(e.msg);
                });
            }
        },
        closeGiveBox: function () {
            this.is_show_give_box = false;
            this.showGiveUid = false;
            this.give_search_uid = "";
            this.givePoint = '';
        },
        showGiveBox: function () {
            this.is_show_give_box = true;
        },
        searchGiveUid: function () {
            if (this.give_search_uid.length > 0) {
                this.post(BaseUrl + "/Unions/member", {
                    club_no: this.nowUnionList.club_no,
                    search_member_no: this.give_search_uid,
                }, (e) => {
                    if (e.code == 1) {
                        this.giveUser = e.data;
                        this.showGiveUid = true;
                    } else {
                        this.show_tip(e.msg);
                    }
                });
            }
        },
        closeDevote: function () {
            this.is_show_devote = false;
            this.devoteLock = false;
            this.page4 = 1;
            this.devote_list = [];
        },
        showDevote: function () {
            this.is_show_devote = true;
            this.getDevote();
        },
        getDevote: function () {
            this.post(BaseUrl + "/Unions/contribute_list", {
                club_no: this.nowUnionList.club_no,
                page: this.page4,
            }, (e) => {
                if (e.code == 1) {
                    if (e.data.list.length > 0) {
                        this.devote_list.push.apply(this.devote_list, e.data.list);
                        this.page4++;
                        this.devoteLock = false;
                    } else {
                        this.show_tip("数据加载完成");
                    }
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        getMyPointList: function () {
            this.post(BaseUrl + "/Unions/my_point_list", {
                club_no: this.nowUnionList.club_no,
                page: this.page3,
            }, (e) => {
                if (e.code == 1) {
                    if (e.data.list.length > 0) {
                        this.my_point_list.push.apply(this.my_point_list, e.data.list);
                        this.page3++;
                        this.myPointListLock = false;
                    } else {
                        this.show_tip("数据加载完成");
                    }
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        closeDetailed: function () {
            this.is_show_detailed = false;
            this.myPointListLock = false;
            this.page3 = 1;
            this.my_point_list = [];
        },
        showDetailed: function () {
            this.is_show_detailed = true;
            this.getMyPointList();
        },
        getLock: function (e) {
            if (e == "journal") {
                return this.journalLock;
            } else if (e == "list") {
                return this.listLock;
            } else if (e == "detailed") {
                return this.myPointListLock;
            }
        },
        scrollBottom: function (e) {
            let dom = e.target;
            let clientHeight = dom.clientHeight;
            let scrollTop = dom.scrollTop;
            let scrollHeight = dom.scrollHeight;
            if (clientHeight + scrollTop + 10 >= scrollHeight && !this.getLock(dom.id)) {
                if (dom.id == "journal") {
                    this.journalLock = true;
                    this.getPointList();
                } else if (dom.id == "list") {
                    this.listLock = true;
                    this.initUnionsMemberList();
                } else if (dom.id == "detailed") {
                    this.myPointListLock = true;
                    this.getMyPointList();
                }
            }
        },
        setNumberJf: function () {
            this.post(BaseUrl + "/Unions/point", {
                club_no: this.numListUser.club_id,
                number: this.number_info,
                uid: this.numListUser.uid,
                type: this.numListType == "add" ? 1 : 2,
            }, (e) => {
                if (e.code == 1) {
                    this.page = 1;
                    this.member_list = [];
                    this.search_uid = "";
                    this.closeListJfBox();
                    this.updateNowUnionInfo();
                    this.initUnionsMemberList();
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        setNumberInfo: function (e) {
            if (e === "-") {
                this.number_info = this.number_info.slice(0, this.number_info.length - 1);
            } else if (e === "@") {
                this.number_info = "0";
            } else {
                if (this.number_info.length < 8) {
                    if (this.number_info === '0') {
                        this.number_info = e;
                    } else {
                        let arr = [];
                        arr.push(this.number_info);
                        arr.push(e);
                        this.number_info = arr.join("")
                    }
                }
            }
            if (this.number_info.length === 0) {
                this.number_info = "0";
            }
        },
        closeListJfBox: function () {
            this.is_show_num_list = false;
            this.number_info = "0";
            this.numListUser = {};
            this.numListType = "";
        },
        setJf: function (e, member) {
            if (e === 'add') {
                this.numListMsg = "请输入增加的分数:";
            } else if (e === 'sub') {
                this.numListMsg = "请输入减少的分数:";
            }
            this.numListUser = member;
            this.numListType = e;
            this.is_show_num_list = true;
        },
        initUnionsMemberList: function () {
            this.post(BaseUrl + "/Unions/member_list", {
                club_no: this.nowUnionList.club_no,
                page: this.page,
                search_member_no: this.search_uid,
            }, (e) => {
                if (e.code == 1) {
                    if (e.data.list.length > 0) {
                        this.member_list.push.apply(this.member_list, e.data.list);
                        this.page++;
                        this.listLock = false;
                    } else {
                        this.show_tip("数据加载完成");
                    }
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        submit: function () {
            this.post(BaseUrl + "/Unions/setSets", {
                params: this.setInfo
            }, (e) => {
                if (e.code == 1) {
                    this.setBos_show = false;
                    this.show_tip("设置成功,重新开房生效!");
                } else {
                    this.show_tip(e.msg);
                }

            });
        },
        authRatio: function () {
            if (this.setInfo.type == 0 && this.setInfo.is_all == 1 && (this.setInfo.ratio > 100 || this.setInfo.ratio < 0)) {
                this.setInfo.ratio = this.temp.ratio;
                this.show_tip("范围0-100%");
            }
            if (this.setInfo.type == 0 && this.setInfo.is_all == 0) {
                if ((this.setInfo.ratio1 > 100 || this.setInfo.ratio1 < 0) || (this.setInfo.ratio2 > 100 || this.setInfo.ratio2 < 0) || (this.setInfo.ratio3 > 100 || this.setInfo.ratio3 < 0)) {
                    this.updateRatio();
                    this.show_tip("范围0-100%");
                    return;
                }
                if (this.setInfo.ratio1 < this.setInfo.ratio2 || this.setInfo.ratio2 < this.setInfo.ratio3) {
                    this.updateRatio();
                    this.show_tip("最低起扣分第1名>=第2名>=第3名");
                }
            }
        },
        updateRatio: function () {
            this.setInfo.ratio1 = this.temp.ratio1;
            this.setInfo.ratio2 = this.temp.ratio2;
            this.setInfo.ratio3 = this.temp.ratio3;
        },
        authPoint: function () {
            if (this.setInfo.type == 1 && this.setInfo.is_all == 0) {
                if (this.setInfo.point1 < this.setInfo.point2 || this.setInfo.point2 < this.setInfo.point3) {
                    this.setInfo.point1 = this.temp.point1;//固定扣分1
                    this.setInfo.point2 = this.temp.point2;//固定扣分2
                    this.setInfo.point3 = this.temp.point3;//固定扣分3
                    this.show_tip("最低起扣分第1名>=第2名>=第3名");
                }
            }
        },
        authLowerLimit: function () {
            if (this.setInfo.type == 1 && this.setInfo.is_all == 1 && this.setInfo.lower_limit <= this.setInfo.point) {
                this.setInfo.lower_limit = this.temp.lower_limit;
                this.setInfo.point = this.temp.point;
                this.show_tip("最低起扣分必须大于消耗标准");
            }
        },
        initUnionsSet: function () {
            this.post(BaseUrl + "/Unions/getSets", {
                'club_id': this.nowUnionList.club_no
            }, (e) => {
                if (e.code == 1) {
                    this.setInfo = e.data;
                    this.temp = Object.assign({}, e.data)
                    this.setJoinLimit(e.data);
                    this.setBankLimit(e.data);
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        setBankLimit: function (e) {
            this.bank_limit_list = [];
            e.bank_limit_select_val.forEach((i) => {
                this.bank_limit_list.push({
                    df: i,
                    title: "底分x准备人数x" + i + "分"
                });
            });
            this.setInfo.bank_limit = e.bank_limit;//默认值
        },
        setJoinLimit: function (e) {
            this.join_limit_list = [];
            e.join_limit_select_val.forEach((i) => {
                this.join_limit_list.push({
                    df: i,
                    title: "底分x" + i + "分"
                });
            });
            this.setInfo.join_limit = e.join_limit;//默认值
        },
        show_tip: function (msg) {
            this.tip_msg = msg;
            this.is_show_tip = true;
            setTimeout(() => {
                this.is_show_tip = false;
                this.tip_msg = '';
            }, 2000);
        },
        post: function (url, data, callback) {
            $.ajax({
                type: "post",
                url: url,
                dataType: 'JSON',
                data: data,
                async: false,
                headers: {'Accept': 'application/json', 'Authorization': window.localStorage.getItem("wwid")},
                success: callback,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    this.show_tip(errorThrown);
                }
            });
        },
        init: function () {
            this.club_list(1);
            document.getElementById('loading').style.display = 'none';
        },
        club_list: function (init = 0) {
            this.post(BaseUrl + "/Unions/club_list", {}, (e) => {
                if(e.code == 0) {
                     DynLoading.gotoWx();
                }
                else if (e.code == 1) {
                    this.unionList = e.data;
                    this.user = e.user;
                    if (init === 1) {
                        this.unionInfo();
                    }
                } else {
                    this.is_show = false;
                    this.show_tip(e.msg);
                }
            });
        },
        unionInfo: function () {
            let sessionClubId = window.localStorage.getItem("sessionClubId");
            let state = 0;
            //先找缓存
            if (sessionClubId) {
                this.unionList.forEach((e) => {
                    if (sessionClubId == e.club_no && e.is_jf == 1) {
                        this.nowUnionList = e;
                        state = 1;
                    }
                });
            }
            //默认是自己的工会
            if (state === 0) {
                this.unionList.forEach((e) => {
                    if (e.is_own == 1) {
                        this.nowUnionList = e;
                        state = 1;
                    }
                });
            }
            //如果没有其次给我加入的
            if (state === 0) {
                this.unionList.forEach((e) => {
                    if (e.is_jf == 1) {
                        this.nowUnionList = e;
                        state = 1;
                    }
                });
            }

            if (state === 1 && !isEmptyObject(this.nowUnionList)) {
                window.localStorage.setItem("sessionClubId", this.nowUnionList.club_no);
                this.nowUnionInfo()
            } else {
                this.is_show = false;
                this.show_tip("无开启积分俱乐部");
            }
        },
        nowUnionInfo: function () {
            if (this.nowUnionList.is_jf == 0 && this.nowUnionList.is_own == 1) {
                this.on_union = true;
            } else {
                this.is_show = true;
            }
        },
        onUnion: function () {
            this.post(BaseUrl + "/Unions/onUnionJf", {
                club_id: this.nowUnionList.club_no
            }, (e) => {
                if (e.code == 1) {
                    this.updateNowUnionInfo();
                    this.on_union = false;
                    this.is_show = true;
                }
                this.show_tip(e.msg);
            });
        },
        updateNowUnionInfo() {
            this.post(BaseUrl + "/Unions/updateNowUnionInfo", {
                club_id: this.nowUnionList.club_no
            }, (e) => {
                if (e.code == 1) {
                    this.nowUnionList = e.data;
                }
            });
        },
        showList: function () {
            this.initUnionsMemberList();
            this.list_show = true;
        },
        closeList: function () {
            this.list_show = false;
            this.page = 1;
            this.listLock = false;
            this.member_list = [];
            this.search_uid = "";
        },
        showSetBox: function () {
            this.initUnionsSet();
            this.setBos_show = true;
        },
        closeSetBos: function () {
            this.setBos_show = false;
        },
        searchList: function (e) {
            this.page = 1;
            this.listLock = false;
            this.member_list = [];
            if (e == 'all') {
                this.search_uid = "";
            }
            this.initUnionsMemberList();
        },
        showBusiness: function () {
            this.mime();
            this.is_show_business = true;
        },
        mime: function () {
            this.post(BaseUrl + "/Unions/mine", {
                club_no: this.nowUnionList.club_no,
            }, (e) => {
                if (e.code == 1) {
                    this.myInfo = e.data;
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        closeBusinessBox: function () {
            this.is_show_business = false;
        },
        pointType: function (e) {
            this.getPointType = e;
            this.page2 = 1;
            this.point_list = [];
            this.getPointList();
        },
        getPointList: function () {
            this.post(BaseUrl + "/Unions/point_list", {
                club_no: this.nowUnionList.club_no,
                page: this.page2,
                search_member_no: this.journal_search_uid,
                type: this.getPointType
            }, (e) => {
                if (e.code == 1) {
                    if (e.data.list.length > 0) {
                        this.point_list.push.apply(this.point_list, e.data.list);
                        this.page2++;
                        this.journalLock = false;
                    } else {
                        this.show_tip("数据加载完成");
                    }
                } else {
                    this.show_tip(e.msg);
                }
            });
        },
        journal: function () {
            this.journal_show = true;
            this.getPointList();
        },
        closeJournal: function () {
            this.journal_show = false;
            this.journalLock = false;
            this.getPointType = 0;
            this.page2 = 1;
            this.point_list = [];
            this.journal_search_uid = "";
        },
        searchJournalList: function (e) {
            this.page2 = 1;
            this.point_list = [];
            this.getPointType = 0;
            if (e == 'all') {
                this.journal_search_uid = "";
            }
            this.journalLock = false;
            this.getPointList();
        },
        switchClub: function () {
            this.switch_club = true;
            this.club_list();
        },
        closeSwitchClub: function () {
            this.switch_club = false;
        },
        choice: function (id) {
            //默认是自己的工会
            let state = 0;
            this.unionList.forEach((e) => {
                if (e.club_no == id) {
                    this.nowUnionList = e;
                    state = 1;
                }
            });
            if (state === 1) {
                window.localStorage.setItem("sessionClubId", id);
                this.closeSwitchClub();
            }
        },
        help: function () {
            this.post(BaseUrl + "/Unions/help", {}, (e) => {
                if (e.code == 1) {
                    window.location.href = e.data.url;
                } else {
                    this.show_tip("暂无帮助信息");
                }
            });
        },
    }
});

function isEmptyObject(obj) {
    let body = obj
    if (body == null) {
        return true
    }
    if (typeof obj === String) {
        body = body.trim()
    }
    if (!(body instanceof Object)) {
        body = body.toString()
    }
    return Object.keys(body).length === 0;
}