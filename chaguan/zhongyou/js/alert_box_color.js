
var alert_box_color_css = `<style>`+`
       .createRoom .mainPart .createButton {
        height: 1.5rem;
        background: url("`+data.file_url+`files/images/daoyou/hall/create-button.png") no-repeat;
        background-size: 100% 100%;
    }
    
    
    .createRoom .mainPart .createTitle {
        position: relative;
        height: 1.3rem;
        text-align: center;
        background: url("`+data.file_url+`files/images/daoyou/hall/create-title.png") no-repeat;
        background-size: 100% 100%;
    }
    .buttonLeft2 {
        position: absolute;
        width: 100%;
        line-height: 3.3vh;
        height: 3.3vh;
        font-size: 2.5vh;
        width: 10vh;
        right: 15vh;
        bottom: 2.5vh;
        text-align: center;
        background: url("`+data.file_url+`iles/images/common/button1.png");
        background-size: 100%;
    }

    .buttonRight2 {
        position: absolute;
        width: 100%;
        line-height: 3.3vh;
        height: 3.3vh;
        font-size: 2.5vh;
        width: 10vh;
        right: 3vh;
        bottom: 2.5vh;
        text-align: center;
        background: url("`+data.file_url+`files/images/common/button2.png");
        background-size: 100%;
    }
    
    
    
    .createRoom .mainPart .blueBack {
        overflow-x: hidden;
        margin: 0 auto;
        position: relative;
        padding: 0 0 1.5vh 0;
        background: url("`+data.file_url+`files/images/daoyou/hall/create-content.png") no-repeat;
        background-size: 100% 100%;
    }
    .createRoom .mainPart .blueBack .selectPart {
        width: 92%;
        margin-top: 0.05rem;
        margin: 0 auto;
        line-height: 0.6rem;
        font-size: 14px;
        position: relative;
        color: #21a128;
        background: url("`+data.file_url+`files/images/daoyou/hall/create-item.png") no-repeat center;
        background-size: 100% 100%;
        border-radius: 0px;
        font-family: simHei;
        padding: 0.025rem 0 0.1rem 0;
    }
    .createRoom .mainPart .blueBack .selectPart .selectList .selectItem .selectBox {
        float: left;
        height: 0.45rem;
        width: 0.45rem;
        background: #e8c007;
        margin-top: 0.1rem;
        position: relative;
        background: url("`+data.file_url+`files/images/daoyou/hall/untick.png") no-repeat;
        background-size: 100% 100%;
    }
    .createRoom .mainPart .blueBack .selectPart .selectList .selectItem select {
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        text-indent: 0.22rem;
        position: relative;;
        width: 1.4rem;
        height: 0.54rem;
        left: 0.1rem;
        top: 0rem;
        color: #21a128;
        border: none;
        background-size: 100% 100%;
        background-image: url("`+data.file_url+`files/images/daoyou/hall/btnselect.png");
    }
    .entrance .img1 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bull6.png");
    }

    .entrance .img2 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_laibull.png");
    }

    .entrance .img3 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_sangong.png");
    }

    .entrance .img4 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_flower.png");
    }

    .entrance .img5 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_landlord.png");
    }

    .entrance .img6 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_majiang.png");
    }

    .entrance .img7 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_paijiu.png");
    }

    .entrance .img8 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_erbagang.png");
    }

    .entrance .img9 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_yxx.png");
    }

    .entrance .img10 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_dcx.png");
    }

    .entrance .img11 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_dxbull.png");
    }

    .entrance .img12 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_s13s.png");
    }

    .entrance .img16 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_flower2.png");
    }

    .entrance .img17 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_dpaijiu.png");
    }

    .entrance .img18 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_jia31.png");
    }

    .entrance .img19 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_majianghz.png");
    }

    /* 三个牛牛游戏 */
    .entrance .img13 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_cbull6.png");
    }

    .entrance .img14 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bull10.png");
    }

    .entrance .img15 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bull13.png");
    }

    .entrance .img24 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_flowerx.png");
    }

    .entrance .img28 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bull17.png");
    }

    .entrance .img29 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bull15.png");
    }

    /*img24金花合集*/
    .entrance .img19 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerxp.png");
    }

    .entrance .img22 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowercj.png");
    }

    .entrance .img23 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowermp.png");
    }

    .entrance .img25 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerjd.png?v=2019");
    }

    .entrance .img26 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerlz.png?v=2019");
    }

    .entrance .img27 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerhp.png?v=2019");
    }

    .entrance .img33 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_paijiux.png");
    }

    .entrance .img34 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_bullx.png");
    }

    .entrance .img51 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_app.png");
    }
    .entrance .img52 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_5jia1.png");
    }
    .entrance .img53 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_niusanzhang.png");
    }
    .entrance .img54 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_zhizunniu.png");
    }
    .entrance .img55 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_zhigou.png");
    }
    .entrance .img56 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_paijiu_poker.png");
    }
    .entrance .img57 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_21point.png");
    }
    .entrance .img58 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_zhizunniu.png");
    }
    .entrance2 .img16 {
        background: url("`+data.cfile_url+`files/images/gameicon/icon_flower2.png");
    }

    .entrance2 .img19 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerxp.png");
    }

    .entrance2 .img22 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowercj.png");
    }

    .entrance2 .img23 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowermp.png");
    }

    .entrance2 .img25 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerjd.png?v=2019");
    }

    .entrance2 .img26 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerlz.png?v=2019");
    }

    .entrance2 .img27 {
        background-image: url("`+data.cfile_url+`files/images/gameicon/icon_flowerhp.png?v=2019");
    }
    .alert .mainPart .backImg {
        background: url `+data.file_url+` files /images/ hall / navli-bj . png) no-repeat center;
        background-size: 100% 300%;
        border: 0.1vh solid #3e3e3e;
    }
    .notice {
        position: relative;
        margin-top: 1vh;
        bottom: 1vh;
        line-height: 5vh;
        height: 2vh;
        text-align: center;
        font-size: 12px;
        color: #374994;
        background: url(`+data.file_url+`files/images/common/mask-tips-text.png) no-repeat left bottom;
        background-size: 100% auto;
    }
    .createRoom .mainPart.yh .mask-icon.mask-top {
        top: 2%;
        left: 2%;
        background: url(`+data.file_url+`files/images/common/mask-top.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .createRoom .mainPart.yh .mask-icon.mask-right {
        top: 2%;
        right: 2%;
        background: url(`+data.file_url+`files/images/common/mask-right.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .createRoom .mainPart.yh .mask-icon.mask-bottom {
        bottom: 1.5%;
        right: 2%;
        background: url(`+data.file_url+`files/images/common/mask-bottom.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .createRoom .mainPart.yh .mask-icon.mask-left {
        bottom: 1.5%;
        left: 2%;
        background: url(`+data.file_url+`files/images/common/mask-left.jpg) no-repeat;
        background-size: 100% 100%;
    }
    
    
    .createRoom .mainPart .createCommit {
        position: relative;
        top: 0.1rem;
        margin-top: 0.37rem;
        line-height: 0.9rem;
        height: 0.86rem;
        font-size: 14px;
        width: 3.2rem;
        left: 25%;
        margin-left: -1.35rem;
        text-align: center;
        color: #fff;
    }

    .createRoom .mainPart .createCommit {
        margin-bottom: 1vh;
        margin-top: 0.05vh;
        background: url(`+data.file_url+`files/images/daoyou/hall/cancel.png);
        background-size: 100% 100%;
        height: 1.2rem;
        background-repeat: no-repeat;
        float: left;
    }
    
    .createRoom .mainPart .createCancel {
    position: relative;
    top: 0.1rem;
    margin-top: 0.37rem;
    line-height: 0.9rem;
    height: 0.86rem;
    font-size: 14px;
    width: 3.2rem;
    right: 10%;
    margin-left: -1.35rem;
    text-align: center;
    color: #fff;
}
    
    

    .createRoom .mainPart .createCancel {
        margin-bottom: 1vh;
        margin-top: 0.05vh;
        background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png);
        background-size: 100% 100%;
        height: 1.2rem;
        background-repeat: no-repeat;
        float: right;
    }
    .phone-number-box .phone-number {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 7.5rem;
        height: 9.4rem;
        background: url(`+data.file_url+`files/images/daoyou/joinroom/bg.png) no-repeat;
        background-size: 100% 100%;
    }
    .phone-number-box .phone {
        background: url(`+data.file_url+`files/images/daoyou/joinroom/num2.png) no-repeat;
        background-size: 100% 100%;
    }
    
    
     .phone-number-box .phone-btn {
        background: url(`+data.file_url+`files/images/newgame/phone-btn.png) no-repeat;
        background-size: 100% 100%;
    }

    .phone-number-box .phone-btn2 {
        color: #dcdcdc;
        background: url(`+data.file_url+`files/images/newgame/phone-btn1.png) no-repeat;
        background-size: 100% 100%;
    }
    
    .phone-number-box .phone-sure {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin: 0 auto;
        width: 40%;
        height: 1rem;
        background: url(`+data.file_url+`files/images/daoyou/hall/btn_confirm.png) no-repeat;
        background-size: 100% 100%;
        border: none;
    }

    .phone-number-box .close-window {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        width: 1.2rem;
        height: 1.2rem;
        background: url(`+data.file_url+`files/images/daoyou/joinroom/close.png) no-repeat 0 0 / 100% 100%;
    }

    .scoreSelect {
        -webkit-appearance: none;
        position: relative;
        width: 1rem;
        left: 0;
        top: 0.1rem;
        background-size: 100% 100%;
        background-image: url("`+data.file_url+`files/images/daoyou/hall/btnselect2.png");
    }
    .flex-cont.number .prev {
        background: url("`+data.file_url+`files/images/daoyou/hall/mins.png");
        background-size: 100% 100%;
        width: 0.56rem;
        height: 0.56rem;
    }

    .flex-cont.number .next {
        background: url("`+data.file_url+`files/images/daoyou/hall/plus.png");
        background-size: 100% 100%;
        width: 0.56rem;
        height: 0.56rem;
        margin-left: 0.25rem;
    }
    
    .flex-cont.number .showNumber,
    .flex-cont.number .showNumberLook {
        background: url("`+data.file_url+`files/images/daoyou/hall/dot.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 0;
        width: 0.48rem;
        height: 0.48rem;
        margin-right: -0.24rem;
        margin-top: -0.07rem;
    }
    
    
    .flex-cont.number .showNumber i {
        position: absolute;
        right: 0;
        top: -50%;
        -webkit-transform: translatex(45%);
        -moz-transform: translatex(45%);
        -ms-transform: translatex(45%);
        -o-transform: translatex(45%);
        transform: translatex(45%);
        width: 0.6rem;
        height: 0.6rem;
        line-height: 0.6rem;
        margin-top: 0.1rem;
        text-align: center;
        font-family: Arial;
        font-size: 0.36rem;
        font-style: normal;
        color: #fff;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        background: url("`+data.file_url+`files/images/hall/mask-show-number.png") no-repeat;
        background-size: 100% 100%;
        background-color: #4a80e8;
        -webkit-box-shadow: 0 .0144rem .0144rem #4a80e8;
        -moz-box-shadow: 0 .0144rem .0144rem #4a80e8;
        box-shadow: 0 .0144rem .0144rem #4a80e8;
    }
    
    
    .gameContainer {
        width: 100%;
        height: 74%;
        position: fixed;
        top: 26%;
        z-index: 101;
        animation: gameUp .3s;
        -webkit-animation: gameUp .3s;
        background: url(`+data.cfile_url+`files/images/hall/game_box.jpg?v=2019) no-repeat;
        background-size: 100% 100%;
        border-top-left-radius: 50% 10%;
        border-top-right-radius: 50% 10%;
    }
    
    
    .gameContainer2 {
        width: 100%;
        height: 74%;
        position: fixed;
        top: 52%;
        z-index: 101;
        animation: gameUp2 .3s;
        -webkit-animation: gameUp2 .3s;
        background: url(`+data.cfile_url+`files/images/hall/game_box.jpg?v=2019) no-repeat;
        background-size: 100% 100%;
        border-top-left-radius: 50% 10%;
        border-top-right-radius: 50% 10%;
    }
    
    .giftBox {
        width: 88vw;
        height: 66vh;
        position: fixed;
        z-index: 998;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url(`+data.file_url+`files/giftShop/5.png);
        background-size: 100% 100%;
    }
    
    
    .giftBtn {
        position: absolute;
        width: 94%;
        height: 24px;
        bottom: 1vh;
        background: url(`+data.file_url+`files/images/daoyou/shop/price.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;
        line-height: 24px;
        font-size: 12px;
        text-indent: 24px;
    }
    .giftIsBuy {
        position: absolute;
        width: 70%;
        height: 18px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1.5vh;
        background: url(`+data.file_url+`files/images/daoyou/shop/shiyong.png) no-repeat;
        background-size: 100% 100%;
        color: #fff;
        line-height: 24px;
        font-size: 9pt;
        text-indent: 22px;
    }
    .giftItemIsUse {
        position: absolute;
        width: 4vw;
        left: 0;
        top: 0;
        background: url(`+data.file_url+`files/images/daoyou/shop/is_using.png) no-repeat;
        background-size: 100% 100%;
    }
    
     .giftInfoBg {
        width: 54vw;
        height: 40vh;
        position: fixed;
        z-index: 999;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url(`+data.file_url+`files/giftShop/2.png) no-repeat;
        background-size: 100% 100%;
    }
    
    #app-person .head {
        position: relative;
        width: 100%;
        height: 21vw;
        overflow: hidden;
        background: url(`+data.file_url+`files/images/daoyou/page/top-bg.jpg) no-repeat;
        background-size: 100% 100%;
    }
    
    #app-person .roomcard {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.2rem;
        width: 2.8rem;
        height: 1.5rem;
        background: url(`+data.file_url+`files/images/daoyou/page/card-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    
    
    #app-person .item {
        position: relative;
        height: 12vw;
        overflow: hidden;
        border-top: 0vw solid #d9d9d9;
        margin-top: 1vw;
        /*position: relative;*/
        /*height: 100%;*/
        /*width: 100%;*/
        /*margin: 0 auto;*/
        /*overflow: hidden;*/
         background: url(`+data.file_url+`files/images/daoyou/page/item-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    
    
    #app-person .groupMenuDetail {
        position: relative;
        height: 27.5vw;
        margin-top: 1vw;
        overflow: hidden;
        width: 96vw;
        left: 50%;
        transform: translateX(-50%);

         background: url(`+data.file_url+`files/images/daoyou/page/item-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    
     #app-person .pageBottom {
        position: fixed;
        width: 100%;
        height: 1.2rem;
        bottom: 0rem;
        background: url(`+data.file_url+`files/images/daoyou/page/bottom-bg.png) no-repeat;
        background-size: 100% 100%;
    }
    
    
     #app-person .indiv-box {
        width: 74vw;
        height: 48vh;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(`+data.file_url+`files/images/daoyou/page/set-indiv-bg.png) no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }
    
    
    #app-person .hide-indiv {
        position: absolute;
        width: 1.1rem;
        height: 1.1rem;
        right: 0.1rem;
        top: 0.1rem;
        background: url(`+data.file_url+`files/images/daoyou/hall/close.png) no-repeat;
        background-size: 100% 100%;
        z-index: 1;
    }

    #app-person .tip-text {
        width: 82vw;
        height: 19vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: url(`+data.file_url+`files/images/daoyou/indiv/text3.png) no-repeat;
        background-size: 100% 100%;
    }

    #app-person .indiv-content {
        width: 64vw;
        left: 50%;
        transform: translateX(-50%);
        height: 24vh;
        margin-top: 4vh;
        position: relative;
        background: url(`+data.file_url+`files/images/daoyou/indiv/content.png) no-repeat;
        background-size: 100% 100%;
        color: #8a6737;
    }
    
    #app-person .enter-indiv input {
        width: 100%;
        height: 100%;
        text-indent: 10px;
        font-size: 0.4rem;
        background: url(`+data.file_url+`files/images/daoyou/page/input-bg.png) no-repeat;
        background-size: 100% 100%;
    }

    #app-person .confirm-indiv {
        background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        left: 50%;
        transform: translateX(-50%);
        width: 2.6rem;
        height: 1rem;
    }
	
	#app-person .zhfk-indiv {
	    background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png) no-repeat;
	    background-size: 100% 100%;
	    position: absolute;
	    bottom: -12vh;
	    left: 50%;
	    transform: translateX(-50%);
	    width: 2.6rem;
	    height: 1rem;
	}

    #app-person .btn-indiv {
        background: url(`+data.file_url+`files/images/daoyou/hall/cancel.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 2.5vh;
        left: 15%;
        width: 2.6rem;
        height: 0.9rem;
    }

    #app-person .confirm-indiv2 {
        background: url(`+data.file_url+`files/images/daoyou/hall/btn_confirm.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: 2.5vh;
        right: 15%;
        width: 2.6rem;
        height: 0.9rem;
    }
    
    #app-game .switch .box .title {
        background: url(`+data.file_url+`files/images/daoyou/club/switch_box_top.png) no-repeat;
        background-size: 100% 100%;
        height: 1.5vh;
    }

    #app-game .switch .box .groupList {
        margin: 0 auto;
        overflow: scroll;
        background: url(`+data.file_url+`files/images/daoyou/club/switch_box_center.png) no-repeat;
        background-size: 100% 100%;
    }
    
                
    #app-person .clubMemberBox{
        background: url(`+data.file_url+`files/images/daoyou/package/bg.jpg);
        background-size: 100%;
    }

    #app-game .switch .bottom {
        width: 56vw;
        height: 1.5vh;
        background: url(`+data.file_url+`files/images/daoyou/club/switch_box_bottom.png) no-repeat;
        background-size: 100% 100%;
    }
    
    #app-game .quit-confirm .box {
        position: fixed;
        width: 90vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 30vh;background: url(`+data.file_url+`files/images/daoyou/common/box_bg.png); background-size: 100% 100%;
    }
    
    
    #app-game .quit-confirm .box .quit-btn {
        background: url(`+data.file_url+`files/images/daoyou/common/btn1.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        left: 10vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }

    #app-game .quit-confirm .box .confirm-btn {
        background: url(`+data.file_url+`files/images/daoyou/common/btn2.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        right: 10vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }
    
    #app-game .join-confirm .box {
        position: fixed;
        width: 90vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 30vh;background: url(`+data.file_url+`files/images/daoyou/common/box_bg.png); background-size: 100% 100%;
    }
    
    #app-game .join-confirm .box .auto-btn {
        background: url(`+data.file_url+`files/images/daoyou/common/btn1.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        left: 50%;
        transform: translateX(-50%);
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }
    #app-game .join-confirm .box .quit-btn2 {
        background: url(`+data.file_url+`files/images/daoyou/common/btn1.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        left: 2vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }
    #app-game .join-confirm .box .quit-btn {
        background: url(`+data.file_url+`files/images/daoyou/common/btn1.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        left: 10vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }

    #app-game .join-confirm .box .confirm-btn2 {
        background: url(`+data.file_url+`files/images/daoyou/common/btn2.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        right: 2vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }
    #app-game .join-confirm .box .confirm-btn {
        background: url(`+data.file_url+`files/images/daoyou/common/btn2.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: 2vh;
        width: 26vw;
        height: 5vh;
        right: 10vw;
        color: #fff;
        font-size: 0.6rem;
        text-align: center;
        line-height: 5vh;
    }
    
    #app-game .join-club .box{
        background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png);
        background-size: 100% 100%;
        position: fixed;
        width: 86vw;
        height: 26vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    
    
    #app-game .tip-box .box{
        background: url(`+data.file_url+`files/images/daoyou/common/back_home_box.png);
        background-size: 100% 100%;
        position: fixed;
        width: 86vw;
        height: 26vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }
    
    .hall-tip-box .box{
        background: url(`+data.file_url+`files/images/daoyou/common/back_home_box.png);
        background-size: 100% 100%;
        position: fixed;
        width: 80vw;
        height: 26vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }`+`</style>`

    document.write(alert_box_color_css)

