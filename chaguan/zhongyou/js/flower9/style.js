var header_css = `
    <style>
        body{font-size: 0.12rem;}
        /*.f-cb:after{*/
        /*display:block;*/
        /*visibility:hidden;*/
        /*clear:both;*/
        /*height:0;*/
        /*overflow:hidden;*/
        /*content:'.';*/
        /*}*/
        .copy-tip {
            background: rgba(0, 0, 0, .6);
            color: #fff;
            position: fixed;
            bottom: .6rem;
            font-size: .15rem;
            border-radius: 5px;
            padding: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            z-index: 89;
        }

        #room_str {
            position: fixed;
            top: -300px;
        }

        .zhuonuo {
            position: fixed;
            width: 0.32rem;
            height: 0.32rem;
            top: .1104rem;
            right: 0.45rem;
            z-index: 110;
        }
        .zhuonuo2 {
            position: fixed;
            width: 4.5vh;
            height: 4.5vh;
            bottom: 0.75vh;
            right: 21vh;
            z-index: 110;
        }
        /*自动准备*/
        .auto-ready6,.auto-ready9 {
            position: absolute;
            bottom: .05rem;
            width: .34rem;
            height: .34rem;
            z-index: 100;
            right: 0.6rem;
        }
        .auto-ready6 img, .auto-ready9 img{
            width: 100%;
        }
        .auto-ready12,.auto-ready13,.auto-ready15,.auto-ready17{
            position: absolute;
            bottom: 0.75vh;
            width: 4.5vh;
            height: 4.5vh;
            z-index: 100;
            right: 27vh;
        }
        .auto-ready12 img,.auto-ready13 img,.auto-ready15 img,.auto-ready17 img{
            width: 100%;
        }

        #dialog {
            position: fixed;
            width: 300px;
            height: 150px;
            padding: 10px;
            box-sizing: border-box;
            background: #fff;
            font-size: 16px;
            left: 50%;
            top: 50%;
            margin-left: -150px;
            margin-top: -75px;
            border-radius: 10px;
            z-index: 99;
        }

        #dialog .main {
            word-wrap: break-word;
            word-break: normal;
        }

        #dialog .other {
            text-align: center;
            margin-top: 38px
        }

        #dialog img {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 35px;
        }

        .user-list {
            box-sizing:border-box;
            width: 100%;
        }

        .join-user-info {
            width: 15%;
            margin: 0 .0480rem;
            text-align: center;
            margin-right: 10px;
            display:inline;
        }
        .join-user-info span {
            display: block;
            width: 100%;
            height: .1200rem;
            overflow: hidden;
            line-height: .1200rem;
            font-size: .1056rem;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .join-user-info img {
            width: 100%;
            border-radius:3px;
        }
        .points {
            position: fixed;
            left: 50%;
            -webkit-transform: translate(-50%);
            -moz-transform: translate(-50%);
            -ms-transform: translate(-50%);
            -o-transform: translate(-50%);
            transform: translate(-50%);
            bottom: .0576rem;
            width: .8640rem;
            height: .2400rem;
            line-height: .2400rem;
            text-align: center;
            background-color: rgba(0,0,0,.5);
            border-radius: .1200rem;
            color: #FFF;
            font-size: .1440rem;
            z-index: 100;
        }
        .top {
            position: fixed;
            width: 100%;
            height: .4896rem;
            background-size: 100% 100%;
            z-index: 100;
        }
        .flex-cont {
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
        }
        .top {
            position: absolute;
            width: 100%;
            height: .4896rem;
            background: url(`+data.file_url+`fiesc/images/common/niuniu-top-bg1.png) no-repeat;
            background-size: 100% 100%;
            z-index: 100;
        }
        .top .left {
            padding: .1008rem 0 0 .05rem;
            /*flex: 1;*/
        }
        .top .left img {
            width: 0.21824rem;
            vertical-align: middle;
        }
        .top .left span {
            display: inline-block;
            padding: 0 .0736rem 0 0;
            min-width: .4528rem;
            height: .1920rem;
            line-height: .1920rem;
            text-align: right;
            color: #FFF;
            font-size: .1392rem;
            vertical-align: middle;
            margin-left: -0.03rem;
            background-color: #160f0d;
            border-radius: 0 .1128rem .1128rem 0;
        }
        .top .flex-item {
            text-align: center;
            color: #fefefe;
            font-size: .1440rem;
            line-height: 1.5;
            /* flex: 1; */
            /*padding-right: .1444rem;*/
            position: absolute;
            left: 50%;
            transform: translate(-50%);
        }
        .top .right {
            position: absolute;
            width: 1.3rem;
            /* flex: 1; */
            right: 0;
        }
        .top .rules-focus {
            display: inline-block;
            min-width: .7728rem;
        }
        .top .rules-focus span.kefu {
            /*background: url(*//*files/images/common/icon_copy.png) no-repeat;*/
            background-size: 100% 100%;
            right: 1.0rem;
        }
        .top .rules-focus span.watch {
            background: url(`+data.file_url+`files/images/common/icon_watch2.png) no-repeat;
            background-size: 100% 100%;
            left: 0.94rem;
        }
        .top .rules-focus span.watch .guestNum{
            position: absolute;
            right: 0rem;
            bottom: -0.05rem;
            display: block;
            background: red;
            width: 0.15rem;
            height: 0.15rem;
            line-height: 0.15rem;
            font-size: 12px;
            border-radius: 50%;
            text-align: center;
            font-family: Verdana;
        }
        .top .rules-focus span.rules {
            background: url(`+data.file_url+`fiesc/images/common/game-rules.png) no-repeat;
            background-size: 100% 100%;
            left: 0.54rem;
        }
        .top .rules-focus span {
            position: absolute;
            width: 0.32rem;
            height: 0.32rem;
            top: .1104rem;
        }
        .top .rules-focus span.return-index {
            background: url(`+data.file_url+`files/images/common/return-index3.png) no-repeat;
            background-size: 100% 100%;
            left: 0.1rem;
        }
        .chat {
            right: .1440rem;
            background: url(`+data.file_url+`files/images/common/game-chat02.png) no-repeat;
            background-size: 100% 100%;
        }
        .music{
            right: .6048rem;
        }
        .music, .chat {
            position: absolute;
            bottom: .05rem;
            width: .34rem;
            height: .34rem;
            text-align: center;
            line-height: .3744rem;
            z-index: 100;
        }
        .music img:last-of-type {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            width: .3744rem;
            height: .3744rem;
        }
        .icon-more-mask{
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 109;
            display: none;
        }
        .icon-more {
            background: url(`+data.file_url+`files/images/common/icon_more.png) no-repeat;
            background-size: 100% 100%;
            padding: 0.05rem 0 0.05rem 0.15rem;
            position: fixed;
            right: -0.35rem;
            bottom: 0.6rem;
            z-index: 110;
            -webkit-transition: right .3s;
            -moz-transition: right .3s;
            -ms-transition: right .3s;
            -o-transition: right .3s;
            transition: right .3s;
        }
        .icon-more .game-indiv{
            display: block;
            width: 0.3rem;
            height: 0.35rem;
            background: url(`+data.file_url+`files/images/common/game-indiv.png) no-repeat;
            background-size: 100% 100%;
        }
        .icon-more .game-rule{
            display: block;
            width: 0.3rem;
            height: 0.35rem;
            background: url(`+data.file_url+`files/images/common/game-rule.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 0.05rem;
        }
        .icon-more .game-sound{
            display: block;
            width: 0.3rem;
            height: 0.35rem;
            background: url(`+data.file_url+`files/images/common/game-sound.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 0.05rem;
        }
        .rules-mask2, .focus-mask, .share-mask {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background-color: rgba(0, 0, 0, .8);
        }

        .rules-mask2 .close, .focus-mask .close, .share-mask .close {
            position: absolute;
            right: 0.125rem;
            top: 0.09rem;
            width: .35rem;
            height: .35rem;
            background: url(`+data.file_url+`files/images/common_hailuo/cancel.png) no-repeat;
            background-size: 100% 100%;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
        }

        .rules-mask2 .content .rule-title {
            height: 0.4rem;
        }

        .rules-mask2 .content {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            padding: .0720rem .0720rem 0.2rem .0720rem;
            width: 3.2rem;
            /*height: 5rem;*/
            text-align: center;
            background: url(`+data.file_url+`files/images/common_hailuo/rule-tab.png) no-repeat;
            background-size: 100% 100%;
        }

        .rules-mask2 .content .niuniu-rules {
            height: 3.2rem;
            overflow-x: hidden;
            width: 96%;
            margin: 0 auto;
        }

        .rules-mask2 .content .rules-bottom-tab {
            width: 90%;
            margin: 0 auto;
            margin-top: 0.05rem;
            background: url(`+data.file_url+`files/images/flower_hailuo/rule-bottom-tab.png) no-repeat;
            background-size: 100% 100%;
            height: 1.4rem;
            text-align: left;
            padding: 0.1rem;
            color: #661616;
            font-family: 'SimHei';
        }

        .rules-mask2 .content .text {
            display: inline-block;
            height: .1536rem;
            line-height: 1;
            color: #ffffff;
            font-size: .1152rem;
        }

        .rules-mask2 .content .flex-cont {
            align-items: center;
            padding: .0520rem 0 .0520rem .168rem;
            font-size: .1152rem;
            line-height: 1.5;
            text-align: left;
            /*background: url("../images/newgame/niuniu-rules-line.png") no-repeat left bottom;*/
            background-size: 100% auto;
        }

        .rules-mask2 .content .niuniu-rules::-webkit-scrollbar {
            display: none;
        }

        .rules-mask2 .content .niuniu-rules .rules-text {
            text-align: justify;
            padding: 0 .0960rem 0 .310rem;
            line-height: 2;
            text-indent: -.2rem;
        }

        .rules-mask2 .content .flex-cont.rules-title {
            -webkit-justify-content: center;
            justify-content: center;
            font-size: .1920rem;
            color: #333;
            padding: .0480rem 0;
        }

        .rules-mask2 .content .flex-cont .name {
            color: #666;
            letter-spacing: .0240rem;
        }

        .rules-mask2 .content .flex-cont .flex-item {
            color: #333;
        }

        .rules-mask2 .content .rules-item span {
            display: inline-block;
            width: 50%;
            float: left;
        }
        .place{
            width: 1.2rem;
            height: 1.5rem;
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
        }
        .place .betRound {
            height: 20px;
            line-height: 20px;
            text-align: center;
            padding: 0 12px;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.4);
            color: #fff;
            font-size: 14px;
            width: 60%;
        }
        .place .scoresArea{position: relative;margin-top:0.2rem;width: 100%;height:100%;}
        .place .totalScore{
            position: relative;
            top: 10px;
            width: 0.8rem;
            height: 0.2rem;
            left: 50%;
            transform: translateX(-50%);
        }
        .place .totalScore img{
            position: absolute;
            width: 20px;
            left: 0.03rem;
            top: 0.025rem;
        }
        .place .totalScore .scores{
            background: url(`+data.file_url+`files/images/flower_hailuo/score-bg.png);
            background-size: 100% 100%;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            padding: 0px 12px;
            border-radius: 10px;
            color: #fff;
            font-size: 14px;
            width: 0.6rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .sidelines-mask {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background-color: rgba(0, 0, 0, .5);
        }

        .sidelines-content {
            box-sizing: border-box;
            position: fixed;
            right:  -3.5rem;
            top: 0rem;
            z-index: 999;
            width: 50%;
            min-height: 3.5rem;
            background-color: rgba(17, 23, 35, .9);
            padding: .4320rem .1200rem 0;
            -webkit-border-radius: 0 0 .0480rem .0480rem;
            -moz-border-radius: 0 0 .0480rem .0480rem;
            border-radius: 0 0 .0480rem .0480rem;
            font-family: '黑体';
            -webkit-transition: right .3s;
            -moz-transition: right .3s;
            -ms-transition: right .3s;
            -o-transition: right .3s;
            transition: right .3s;
        }

        .sidelines-num {
            height: .2112rem;
            line-height: .2112rem;
            font-size: .1152rem;
            text-align: center;
            color: #fff;
            background-color: rgba(45, 67, 103, .8);
            -webkit-border-radius: .0480rem;
            -moz-border-radius: .0480rem;
            border-radius: .0480rem;
            margin-bottom: .2880rem;
        }

        .sidelines-num i {
            color: #dbe5a1;
        }

        .sidelines-list {
            padding: .2400rem 0 .1200rem;
            background: rgba(45, 67, 103, .8) url(`+data.file_url+`fiesc/images/newgame/sidelines-list-bg.png) no-repeat center .0480rem / 100% auto;
            -webkit-border-radius: .0480rem;
            -moz-border-radius: .0480rem;
            border-radius: .0480rem;
            margin-bottom: .2400rem;
        }

        .sidelines-box {
            overflow-x: hidden;
            overflow-y: auto;
            height: 1.2000rem;
        }

        .sidelines-item {
            position: relative;
            height: .3072rem;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            margin-bottom: .0480rem;
            background: url(`+data.file_url+`fiesc/images/newgame/sidelines-item.jpg) no-repeat center center / 100% 100%;
        }

        .sidelines-path {
            overflow: hidden;
            width: .2880rem;
            height: .2880rem;
            margin: 0 .0480rem;
        }

        .sidelines-path img {
            width: 100%;
            height: 100%;
            -webkit-border-radius: .0480rem;
            -moz-border-radius: .0480rem;
            border-radius: .0480rem;
        }

        .sidelines-info {
            overflow: hidden;
            height: 100%;
            line-height: 1;
            -webkit-flex: 1;
            flex: 1;
            display: -webkit-flex;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: .1920rem;
            color: #fff;
            font-size: .1152rem;
        }

        .sidelines-name {
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .sidelines-icon {
            position: absolute;
            right: .0120rem;
            top: 50%;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
            width: .1248rem;
            height: .0768rem;
            background: url(`+data.file_url+`fiesc/images/newgame/sidelines-icon.png) no-repeat 0 0 / 100% 100%;
        }

        .sidelines-join-game {
            margin: 0 auto;
            width: .7200rem;
            height: .2400rem;
            line-height: .2400rem;
            color: #eefaff;
            text-align: center;
            background-color: #46bdf4;
            -webkit-border-radius: .0480rem;
            -moz-border-radius: .0480rem;
            border-radius: .0480rem;
        }
        .sidelines-look-game{
            margin: 0 auto;
            width: .900rem;
            height: .300rem;
            color: #eefaff;
        }
        .sidelines-look-game img{
            width: 100%;
            height: 100%;
        }

        .sidelines-join-game {
            background-color: #88d23a;
        }

        .sidelines-close {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: .1104rem;
            height: .1440rem;
            background: url(`+data.file_url+`fiesc/images/newgame/sidelines-closr.png) no-repeat center center / 100% 100%;
        }
    </style>

`
var body_css = `

<style>
    body.modal-show {position: fixed;width: 100%;}
    .record{position: fixed;top:0;left:0;height:100%;width:100%; z-index: 150;}
    .record .recordBack{position: fixed;top:0;left:0;height:100%;width:100%;background: #0d0a12;opacity:.7;}
    .record .leftLine{position: fixed;left: 0%;margin-left:20px;height:100%;width: 0;border-left:1px solid #ecb700;}
    .record .mainPart{position: absolute;top:0;left:0;height:100%;width:100%;overflow: auto;}
    .record .mainPart .recordList{position: relative;margin-left: 40px;margin-top: 20px;}
    .record .mainPart .recordList .recordTime{color:#ecb700;font-size: 14px;}
    .record .mainPart .recordList .yellowPoint{position: absolute;width:30px;height:30px;top:10px;left:-35px; }
    .record .mainPart .recordList .yellowPoint .point{background:#ecb700;position: absolute;height:6px;width:6px;border-radius:3px;top:12px;left:12px; }

    .record .mainPart .recordList .recordInfo{background:#cfced0;position: relative;width:80%;border-radius:6px;margin-top:5px;padding:5px 15px; }
    .record .mainPart .recordList .recordInfo .recordItem{height:40px;font-family:simHei; border-top:1px solid #ababab;line-height: 40px;font-size: 16px;}
    .record .mainPart .recordList .recordInfo .recordItem .name{float: left;height: 40px;width:120px;overflow: hidden;margin-left: 15px;}
    .record .mainPart .recordList .recordInfo .recordItem .score{float: right;width:80px;overflow: hidden;right: 15px;}
    .record .mainPart .recordList .recordInfo .borderNone{border: none;}
    .rules-mask, .focus-mask, .share-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, .8);
    }
    .rules-mask .content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        padding: .0720rem;
        width: 2.9856rem;
        background-color: rgba(255, 255, 255, .2);
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        border-radius: .0480rem;
        -webkit-box-shadow: 0 0 0.072rem #153b72 inset;
        -moz-box-shadow: 0 0 .0720rem #153b72 inset;
        box-shadow: 0 0 0.072rem #153b72 inset;
        text-align: center;
    }
    .rules-mask .content .niuniu-rules {
        background-color: #fff2d8;
        -webkit-box-shadow: 0 0 0.072rem #153b72 inset;
        -moz-box-shadow: 0 0 .0720rem #153b72 inset;
        box-shadow: 0 0 0.072rem #153b72 inset;
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        border-radius: .0480rem;
        margin-bottom: .0720rem;
        height: 3.3000rem;
        overflow-x: hidden;
    }
    .rules-mask .content .flex-cont {
        align-items: center;
        padding: .0520rem 0 .0520rem .3168rem;
        font-size: .1152rem;
        line-height: 1.5;
        text-align: left;
        background: url(`+data.file_url+`files/images/newgame/niuniu-rules-line.png) no-repeat left bottom;
        background-size: 100% auto;
    }
    .flex-cont {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .rules-mask .content .flex-cont .name {
        color: #666;
        letter-spacing: .0240rem;
    }
    .rules-mask .content .flex-cont .flex-item {
        color: #333;
    }
    .rules-mask .content .flex-cont.rules-title {
        -webkit-justify-content: center;
        justify-content: center;
        font-size: .1920rem;
        color: #333;
        padding: .0480rem 0;
    }
    .rules-mask .content .flex-cont {
        align-items: center;
        padding: .0520rem 0 .0520rem .3168rem;
        font-size: .1152rem;
        line-height: 1.5;
        text-align: left;
        border-bottom:solid 1px #ebc1a8;
    }
    .rules-mask .content .niuniu-rules .rules-text {
        text-align: justify;
        padding: 0 .0960rem 0 .310rem;
        line-height: 2;
        font-size: 14px;
        text-indent: -.2rem;
        color:#555;
    }

    .rules-mask .close, .focus-mask .close, .share-mask .close {
        position: absolute;
        left: 50%;
        bottom: .3480rem;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        transform: translate(-50%);
        width: .2688rem;
        height: .2688rem;
        background: url("`+data.file_url+`files/images/common/game-close3.png") no-repeat;
        background-size: 100% 100%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .chat-list-mask {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
    }
    .chat-list1 {
        position: fixed;
        right: .0750rem;
        bottom: .7rem;
        z-index: 199;
        width: 2.3040rem;
        transition: display 2s;
        background: url(`+data.file_url+`files/images/common_hailuo/message-tab.png) no-repeat center bottom;
        background-size: 100% 100%;
    }

    .chat-list-ul1 {
        box-sizing: border-box;
        width: 2.1696rem;
        height: 1.65rem;
        overflow-x: hidden;
        margin: .0672rem;
        padding: .0672rem .0672rem .0240rem .0672rem;
        -webkit-border-radius: .096rem;
        -moz-border-radius: .096rem;
        border-radius: .096rem;
    }

    .chat-list-ul1 li {
        height: .2688rem;
        line-height: .2688rem;
        margin: 0 0 .0480rem 0;
        padding: 0 .1056rem;
        font-size: .1200rem;
        color: #88382d;
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        border-radius: .0480rem;
        background: url(`+data.file_url+`fiesc/images/newgame/chat-border.png) no-repeat center bottom;
        background-size: auto .024rem;
    }
    .window-masks {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99999;
        background-color: rgba(0, 0, 0, 1);
    }
    .window-masks .border-opacity {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        border-radius: .0480rem;
        padding: .0720rem;
    }
    .window-masks.return-index .container {
        border: .0096rem solid #afb0b2;
    }

    .window-masks.return-index .container {
        border: .0096rem solid #afb0b2;
    }

    .window-masks.return-index .main {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        width: 1.8rem;
        min-height: 0.8rem;
        background-color: #302b91;
        border: .0048rem solid #fff;
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        border-radius: .0480rem;
        margin: 0.35rem 0.35rem 0.2rem 0.35rem;
        padding: .0960rem;
        color: #fff;
        font-size: .23rem;
        text-align: justify;
    }

    .window-masks.return-index .container .button {
        position: relative;
        text-align: center;
        margin-bottom: .0960rem;
    }

    .window-masks.return-index .container .sure, .window-masks.return-index .container .cancel {
        display: inline-block;
        width: 0.9rem;
        height: .3312rem;
        line-height: 0.3312rem;
        font-size: .1800rem;
        text-align: center;
        margin: 0 .0480rem;
        color: #fff;
    }

    .window-masks.return-index .container .sure {
        background: url(`+data.file_url+`files/images/daoyou/common/btn1.png) no-repeat;
        background-size: 100% 100%;
    }

    .window-masks.return-index .container .cancel {
        background: url(`+data.file_url+`files/images/daoyou/common/btn2.png) no-repeat;
        background-size: 100% 100%;
    }


    .window-masks.return-index .border-opacity-v2 .main {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        width: 2.7280rem;
        min-height: 1.2096rem;
        background-color: rgba(68, 68, 174, .5);
        border: .0048rem solid #19256d;
        -webkit-border-radius: .076rem;
        -moz-border-radius: .076rem;
        border-radius: .076rem;
        margin: .1200rem;
        padding: .0960rem;
        color: #e8b24c;
        font-size: .2304rem;
        text-align: justify;
    }

    .window-masks.return-index .border-opacity-v2 .container {
        border: none;
    }

    .window-masks.return-index .border-opacity-v2 .container .button {
        position: relative;
        text-align: center;
        margin-bottom: .0960rem;
        margin-top: .16rem;
        overflow-y: hidden;
    }

    .window-masks.return-index .border-opacity-v2 .container .sure, .window-masks.return-index .border-opacity-v2 .container .cancel {
        display: inline-block;
        width: 1.0272rem;
        height: .3696rem;
        font-size: .15441rem;
        line-height: .38rem;
        text-align: center;
        margin: 0 .086rem;
        color: #fff;
        font-weight: bold;
    }

    .window-masks.return-index .border-opacity-v2 .container .sure {
        background: url(`+data.file_url+`fiesc/images/newgame/decIndex-button1.png) no-repeat;
        background-size: 100% 100%;
        -webkit-text-stroke-width: 0.0048rem;
        -webkit-text-stroke-color: #14309f;
    }

    .window-masks.return-index .border-opacity-v2 .container .cancel {
        background: url(`+data.file_url+`fiesc/images/newgame/decIndex-button2.png) no-repeat;
        background-size: 100% 100%;
        -webkit-text-stroke-width: 0.0048rem;
        -webkit-text-stroke-color: #9e5f0f;
    }
    .window-masks {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99999;
        background-color: rgba(0, 0, 0, 1);
    }
    .window-masks .border-opacity {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        -webkit-border-radius: .0480rem;
        -moz-border-radius: .0480rem;
        padding: .0720rem;
        background: url(`+data.file_url+`files/images/daoyou/common/back_home_box.png);
        background-size: 100% 100%;
    }

    .window-masks .border-opacity .container {
        position: relative;
    }

    .alert .mainPart .backImg {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 0.5vh;
        top: 0;
        left: 0;
        background-size: 100% 300%;
        border: 0.1vh solid #3e3e3e;
        background: #fff!important;
    }
    .alert .mainPart .backImg .blackImg {
        position: absolute;
        width: 40.6vh;
        height: 25vh;
        border-radius: 1.5vh;
        top: 2.2vh;
        left: 2.2vh;
        background: #2f2f2f;
    }
    .alert .mainPart .alertText {
        position: absolute;
        width: 100%;
        line-height: 3.5vh;
        font-size: 2.5vh;
        width: 36vh;
        left: 50%;
        margin-left: -18vh;
        top: 5.6vh;
        text-align: center;
    }
    .mainPart .backImg .blackImg {
        background: #fff!important;
        border: none!important;
    }
    .alert .mainPart .alertText{
        color: #333;
        font-size: 2.2vh;
    }
    .rules-mask .close, .focus-mask .close, .share-mask .close{
        bottom:15%;
    }

    /* 声音对话框 */
    .audioRoom-pj{position: fixed;width: 100%;height:100%;top:0;left:0;z-index: 109;}
    .audioRoom-pj .audioRoomBack{width: 100%;height:100%;background: #000;opacity:0.6;}
    .audioRoom-pj .mainPart{width: 3rem;height:2rem;top:50%;left:50%;transform:translate(-50%,-50%);position: absolute;}
    .audioRoom-pj .mainPart .createB{
        background: url(`+data.file_url+`files/images/common/music-box.png) no-repeat;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        top: 0%;
        left: 0%;
        position: absolute;
        border-radius: 10px;
    }

    .audioRoom-pj .mainPart .createTitle {
        position: relative;
        height: 5vh;
        text-align: center;
    }

    .audioRoom-pj .mainPart .createTitle img {
        position: relative;
        height: 2.6vh;
        margin-top: 1.2vh;
    }

    .audioRoom-pj .mainPart .cancelCreate {
        width: 0.5rem;
        height: 0.5rem;
        top: -0.15rem;
        right: -0.15rem;
        position: absolute;
    }

    .audioRoom-pj .mainPart .createCommit {
        position: absolute;
        line-height: 5.5vh;
        height: 5.5vh;
        font-size: 2.5vh;
        width: 17vh;
        left: 50%;
        margin-left: -8.5vh;
        bottom: -7vh;
        text-align: center;
        background: url("../images/common/button2.png");
        background-size: 100%;
        color: #fff;
    }

    .audioRoom-pj .mainPart .blueBack {
        width: 42vh;
        height: 14vh;
        margin: 0 auto;
        position: relative;
        top: 0.5rem;
    }

    .audioRoom-pj .mainPart .blueBack .selectPart {
        width: 100%;
        margin-top: 4px;
        font-size: 2.2vh;
        position: relative;
        color: #b57c2e;
        border-radius: 0px;
        font-family: simHei;
        height: 4vh;
        line-height: 4vh;
        padding: 0.8vh 0;
        display: flex;
    }

    .audioRoom-pj .mainPart .blueBack .selectPart .selectTitle {
        float: left;
        width: 13vh;
        text-align: right;
        flex: 2;
    }

    .audioRoom-pj .mainPart .blueBack .selectPart .selectBox {
        float: left;
        height: 2.2vh;
        width: 1rem;
        margin-top: 0.7vh;
        flex: 3;
    }
    .audioRoom-pj .mainPart .blueBack .selectPart .selectBox img {
        float: left;
        height: 2.2vh;
        width: 100%;
        margin-top: 0.7vh;
    }

    .audioRoom-pj .mainPart .blueBack .selectPart .selectText {
        float: left;
        margin-left: 0.8vh;
        flex: 1;
    }
    .audioRoom-pj .mainPart .blueBack .selectPart .selectText img{
        width: 0.25rem;
        height: 0.25rem;
    }
    .indiv-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.7);
        z-index: 90;
    }
    .indiv-box{
        width: 2.7rem;
        height: 3.2rem;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background: url(`+data.file_url+`files/images/daoyou/page/set-indiv-bg.png) no-repeat;
        background-size: 100% 100%;
        z-index: 82;
    }
    .indiv-box-info{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .tip-text {
        width: 82vw;
        height: 19vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(`+data.file_url+`files/images/daoyou/indiv/text3.png) no-repeat;
        background-size: 100% 100%;
    }
    .indiv-mask .person-info {
        position: relative;
        height: 8vh;
        margin-left: 4vw;
        font-size: 0.15rem;
        color: #f59b7e;
    }
    .indiv-title{
        height: 0.75rem;
    }
    .indiv-content{
        height: 1.5rem;
        width: 90%;
        margin: 0 auto;
    }
    .indiv-content .person-info .avatar {
        position: absolute;
        width: 50px;
        height: 50px;
    }

    .indiv-content .person-info .name {
        position: absolute;
        left: 60px;
        top: 5px;
        width: 42vw;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    }

    .indiv-content .person-info .id {
        position: absolute;
        left: 60px;
        top: 30px;
    }
    .indiv-content .my-indiv {
        margin-top: 5vh;
        font-size: 0.15rem;
        margin-left: 4vw;
    }

    .indiv-content .my-indiv .label {
        color: #8a6737;
    }

    .indiv-content .my-indiv .my-indiv-text {
        color: #f59b7e;
    }
    .confirm-indiv2 {
        background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        left: 50%;
        transform: translateX(-50%);
        width: 1.1rem;
        height: 0.4rem;
    }
    .hide-indiv{
        position: absolute;
        width: 0.42rem;
        height: 0.42rem;
        right: 0.05rem;
        top: 0.03rem;
        background: url(`+data.file_url+`files/images/daoyou/hall/close.png) no-repeat;
        background-size: 100% 100%;
        z-index: 200;
    }
    .tip{
        position: absolute;
        width: 2rem;
        height: 0.2rem;
        line-height: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
        top: 2.4rem;
    }
    .enter-indiv{
        position: absolute;
        width: 2rem;
        height: 0.4rem;
        left: 50%;
        transform: translateX(-50%);
        top: 2rem;
    }
    .enter-indiv input {
        width: 100%;
        height: 100%;
        text-indent: 10px;
        font-size: 0.15rem;
        background: url(`+data.file_url+`files/images/daoyou/page/input-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .confirm-indiv {
        background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom:0.1rem;
        left: 50%;
        transform: translateX(-50%);
        width: 1.1rem;
        height: 0.4rem;
    }
    .flex-cont {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }

    .flex-cont .flex-item {
        -webkit-flex: 1;
        flex: 1;
    }
    .rules-daoyou-mask .content .flex-cont {
        background: url(`+data.file_url+`files/images/common/rules-line.png) no-repeat left bottom;
        background-size: 100% auto;
        align-items: center;
        padding: .0520rem 0 .0520rem 0.05rem;
        font-size: .14rem;
        line-height: 1.5;
        text-align: left;
        color: #e5652b;
        width: 80%;
        margin: 0 auto;
    }
    .rules-daoyou-mask .close, .focus-mask .close, .share-mask .close {
        position: absolute;
        left: 50%;
        -webkit-transform: translate(-50%);
        -moz-transform: translate(-50%);
        -ms-transform: translate(-50%);
        -o-transform: translate(-50%);
        transform: translate(-50%);
        width: .2688rem;
        height: .2688rem;
        background: url(`+data.file_url+`fiesc/images/newgame/niuniu-close.png) no-repeat;
        background-size: 100% 100%;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
    }
    .rules-daoyou-mask, .focus-mask, .share-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, .6);
    }
    .rules-daoyou-mask .content {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        padding: .0720rem;
        width: 3.3rem;
        text-align: center;
    }
    .rules-daoyou-mask .content .rule-title {
        background: url(`+data.file_url+`files/images/common/rule-title.png);
        background-size: 100% 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        color: #f8e30a;
    }
    .rules-daoyou-mask .content .niuniu-rules {
        background: url(`+data.file_url+`files/images/common/rules-item.png);
        background-size: 100% auto;
        height: 3.3000rem;
        margin-top: -1px;
        overflow: scroll;
    }
    .rules-daoyou-mask .content .niuniu-rules .name {
        /*width: 1.4rem;*/
    }
    .rules-daoyou-mask .content .rules-bottom {
        background: url(`+data.file_url+`files/images/common/rules-bottom.png);
        background-size: 100% 100%;
        height: 0.2rem;
    }
    .rules-daoyou-mask .content .flex-cont.color-value span {
        width: .288rem;
        height: .288rem;
    }

    .rules-daoyou-mask .content .color-value span:nth-child(1) {
        background: url(`+data.file_url+`fiesc/images/newgame/card0.png) no-repeat center center;
        background-size: auto 85%;
    }

    .rules-daoyou-mask .content .color-value span:nth-child(2) {
        background: url(`+data.file_url+`fiesc/images/newgame/card1.png) no-repeat center center;
        background-size: auto 85%;
    }

    .rules-daoyou-mask .content .color-value span:nth-child(3) {
        background: url(`+data.file_url+`fiesc/images/newgame/card2.png) no-repeat center center;
        background-size: auto 85%;
    }

    .rules-daoyou-mask .content .color-value span:nth-child(4) {
        background: url(`+data.file_url+`fiesc/images/newgame/card3.png) no-repeat center center;
        background-size: auto 85%;
    }
    .game-round{
        position: absolute;
        color: #fff;
        z-index: 99;
        width: 0.8rem;
        left: 50%;
        top: 1.5rem;
        text-align: center;
        transform: translateX(-50%);
        font-size: 16px;
        background: rgba(0,0,0,0.4);
        border-radius: 0.5rem;
    }
    .game-points{
        position: absolute;
        z-index: 9;
        color: #fff;
        left: 50%;
        text-align: center;
        transform: translateX(-50%);
        top: 0.4rem;
        width: 0.8rem;
        height: 0.25rem;
        line-height: 0.25rem;
        border-radius: 0.12rem;
        background: rgba(0,0,0,0.4);
    }
    .bottomTab {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6vh;
        z-index: 89;
    }
    .bottomRoomCard{
        position: fixed;
        bottom: 0.75vh;
        left: 2vh;
        z-index: 90;
        height: 4.5vh;
    }
    .bottomRoomCard img{
        height: 4.5vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 90;
    }
    .bottomRoomCard .num{
        display: inline-block;
        padding: 0 .05rem 0 0;
        min-width: .4528rem;
        height: .1920rem;
        line-height: .1920rem;
        text-align: right;
        color: #FFF;
        font-size: .1392rem;
        margin-top: 0.03rem;
        vertical-align: middle;
        background-color: #160f0d;
        border-radius: 0 .1128rem .1128rem 0;
    }
    .bottomWatch {
        background: url(`+data.file_url+`files/images/common/icon_watch2.png) no-repeat;
        background-size: 100% 100%;
        position: fixed;
        bottom: 0.75vh;
        right: 15vh;
        width: 4.5vh;
        height: 4.5vh;
        z-index: 90;
    }
    .bottomWatch .guestNum {
        position: absolute;
        right: -0.05rem;
        top: -0.05rem;
        display: block;
        color: #fff;
        background: red;
        width: 0.15rem;
        height: 0.15rem;
        line-height: 0.15rem;
        font-size: 12px;
        border-radius: 50%;
        text-align: center;
        font-family: Verdana;
    }
    .room-gameover {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999999;
        width: 100%;
        height: 100%;
        background-color: #000;
    }
    .room-gameover-ten {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999999;
        width: 100%;
        height: auto;
        background-color: #000;
    }
</style>

`




document.write(header_css)
document.write(body_css)