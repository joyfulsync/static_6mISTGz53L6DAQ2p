var bull23_css =`
<style>
.load4 .loader {
  font-size: 20px;
 top: 40%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  margin-left: -.5em;
  margin-top: -.5em;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  transform:scale(.7);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0em -3em 0em 0.2em #ffffff, 2em -2em 0 0em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 0em #ffffff;
  }
  12.5% {
    box-shadow: 0em -3em 0em 0em #ffffff, 2em -2em 0 0.2em #ffffff, 3em 0em 0 0em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  25% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 0em #ffffff, 3em 0em 0 0.2em #ffffff, 2em 2em 0 0em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  37.5% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 0em #ffffff, 2em 2em 0 0.2em #ffffff, 0em 3em 0 0em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  50% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 0em #ffffff, 0em 3em 0 0.2em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  62.5% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 0em #ffffff, -2em 2em 0 0.2em #ffffff, -3em 0em 0 0em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  75% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 0.2em #ffffff, -2em -2em 0 0em #ffffff;
  }
  87.5% {
    box-shadow: 0em -3em 0em 0em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 0em #ffffff, -2em -2em 0 0.2em #ffffff;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0em -3em 0em 0.2em #ffffff, 2em -2em 0 0em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 0em #ffffff;
  }
  12.5% {
    box-shadow: 0em -3em 0em 0em #ffffff, 2em -2em 0 0.2em #ffffff, 3em 0em 0 0em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  25% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 0em #ffffff, 3em 0em 0 0.2em #ffffff, 2em 2em 0 0em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  37.5% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 0em #ffffff, 2em 2em 0 0.2em #ffffff, 0em 3em 0 0em #ffffff, -2em 2em 0 -0.5em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  50% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 0em #ffffff, 0em 3em 0 0.2em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 -0.5em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  62.5% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 0em #ffffff, -2em 2em 0 0.2em #ffffff, -3em 0em 0 0em #ffffff, -2em -2em 0 -0.5em #ffffff;
  }
  75% {
    box-shadow: 0em -3em 0em -0.5em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 0.2em #ffffff, -2em -2em 0 0em #ffffff;
  }
  87.5% {
    box-shadow: 0em -3em 0em 0em #ffffff, 2em -2em 0 -0.5em #ffffff, 3em 0em 0 -0.5em #ffffff, 2em 2em 0 -0.5em #ffffff, 0em 3em 0 -0.5em #ffffff, -2em 2em 0 0em #ffffff, -3em 0em 0 0em #ffffff, -2em -2em 0 0.2em #ffffff;
  }
}

*{padding: 0;margin:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-overflow-scrolling: touch;}a {text-decoration: none;color: #fff;}ul {list-style: none;}input{border: none;outline:none}body{font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', 微软雅黑, Arial, sans-serif;cursor: default;}
img{border: none;}
.roomCard{position: fixed;bottom:0.75vh;left: 2vh;;z-index:90;height: 4.5vh;}
.roomCard img{height: 4.5vh;position: absolute;left: 0;top:0;z-index: 90;}
.roomCard .num{height: 3vh;line-height: 3vh;text-align: right;color:#fff;font-size:2.2vh;margin-top:0.75vh;position:relative;}

.tableTab{position: fixed;top:0px;left: 0px;width: 100%;z-index:90;}
.tableHead{position: fixed;top:0;left: 0;width: 100%;z-index: 81;}
.addFriend{position: fixed;bottom:0.75vh;right: 15vh;width: 4.5vh;z-index:90;}
.bGameRule{position: fixed;bottom:0.75vh;right: 28vh;width: 4.5vh;z-index:112;}
.bottom{position: fixed;bottom:0;left: 0;width: 100%;z-index:90;}

.bottomTab{position: fixed;bottom:0;left: 0;width: 100%;height: 6vh;z-index: 89;}
.bottomNote{position: fixed;bottom:0.75vh;right: 28.5vh;width: 4.5vh;z-index:90;}
.bottomRule{position: fixed;bottom:0.75vh;right: 22vh;width: 4.5vh;z-index:112;}
.bottomSound{position: fixed;bottom: 0.75vh;right: 15.5vh;width: 4.5vh; height: 4.5vh;z-index:112;}
.bottomHome{position: fixed;bottom:0.75vh;right: 6.5vh;width: 4.5vh;z-index:90;}
.bottomWatch{position: fixed;bottom:0.75vh;right: 35vh;width: 4.5vh;z-index:90;}
.bottomMessage{position: fixed;bottom: 0.75vh;right: 1vh;width: 4.5vh; height: 4.5vh;z-index:91;}
.bottomChat{position: fixed;bottom: 0.75vh;right: 23vh;width: 4.5vh;z-index: 90;}

.baseScoreBG{position: absolute;top: 0;right:28%;width: 24%;z-index:91;text-align: center;color: #fff;height: 3.6vh;line-height: 3.6vh; background-color: black; border-radius: 1.8vh;opacity: 0.5}
.baseScore{position: absolute;top: 0;right: 28%;width: 24%;z-index:91;text-align: center;color: #fff;height: 3.6vh;line-height: 3.6vh;border-radius: 1.8vh;font-size: 2vh;}
.roundNumBG{position: absolute;top: 0;left:28%; width: 24%;z-index:91;text-align: center;color: #fff;height: 3.6vh;line-height: 3.6vh; background-color: black; border-radius: 1.8vh;opacity: 0.5}
.roundNum{position: absolute;top: 0;left:28%; width: 24%;z-index:91;text-align: center;color: #fff;height: 3.6vh;line-height: 3.6vh;border-radius: 1.8vh;font-size: 2vh;}

.main{width: 100%;position: relative;background: #fff;margin:0 auto;}

.title{overflow: hidden;word-break:break-all;}
.member{position: absolute;text-align: center;width: 6vh;height: 10vh;}
.member .background{width: 100%;position: absolute;top:0;left:0;}
.member .banker{left:-0.8vh; top: -0.2vh;width: 7.6vh; height: 7.2vh;position: absolute;}
.member .avatar{width: 100%;position: relative;border-radius:3px;}
.member .bottom{position: absolute; top: 40%; left: 0;width: 100%; height: 4.4vh}
.member .bottom .bname{position: absolute; top: 1px; left: 0px;width: 100%; height: 2vh; line-height: 2vh;text-align: center;color: white;font-size: 1.5vh;}
.member .bottom .bscore{position: absolute; top: 2.2vh; left: 0px;width: 100%; height: 2.2vh; line-height: 2.2vh; text-align: center;color: orange;font-size: 2vh;}

.memberMine{position: absolute;text-align: center;width: 150px;height: 110px;}

.member .isReady{position: absolute;}
.member .isReady .ready{height: 3vh;}


.member1{top:81vh;left:2vh;width: 7vh;height: 12.1vh;z-index: 99;}
.member1 .title{font-size:14px;line-height:20px;height: 20px;width: 58px;}
.member1 .score{bottom: 12%;line-height:14px;}
.member1 .isReady{top:-50px;left: -18px;width: 110px;text-align:center;}
.member1 .isReady .ready{margin-top: 20px;width:6vh;}

.member2{top:75%;right:1vh;}
.member2 .isReady{top:4vh;right: 8vh;}
.member2 .isReady .ready{width:6vh;}


.member3{top:67.5%;right:1vh;}
.member3 .isReady{top:4vh;right: 8vh;}
.member3 .isReady .ready{width:6vh;}

.member4{top:60%;right:1vh;}
.member4 .isReady{top:4vh;right: 8vh;}
.member4 .isReady .ready{width:6vh;}

.member5{top:52.5%;right:1vh;}
.member5 .isReady{top:4vh;right: 8vh;}
.member5 .isReady .ready{width:6vh;}

.member6{top:45%;right:1vh;}
.member6 .isReady{top:4vh;right: 8vh;}
.member6 .isReady .ready{width:6vh;}

.member7{top:37.5%;right:1vh;}
.member7 .isReady{top:4vh;right: 8vh;}
.member7 .isReady .ready{width:6vh;}

.member8{top:30%;right:1vh;}
.member8 .isReady{top:4vh;right: 8vh;}
.member8 .isReady .ready{width:6vh;}

.member9{top:22.5%;right:1vh;}
.member9 .isReady{top:4vh;right: 8vh;}
.member9 .isReady .ready{width:6vh;}

.member10{top:15%;right:1vh;}
.member10 .isReady{top:4vh;right: 8vh;}
.member10 .isReady .ready{width:6vh;}

.member11{top:7.5%;right:1vh;}
.member11 .isReady{top:4vh;right: 8vh;}
.member11 .isReady .ready{width:6vh;}

.member12{top:0%;right:1vh;}
.member12 .isReady{top:4vh;right: 8vh;}
.member12 .isReady .ready{width:6vh;}

.member13{top:0%;left:1vh;}
.member13 .isReady{top:4vh;left: 8vh;}
.member13 .isReady .ready{width:6vh;}

.member14{top:7.5%;left:1vh;}
.member14 .isReady{top:4vh;left: 8vh;}
.member14 .isReady .ready{width:6vh;}

.member15{top:15%;left:1vh;}
.member15 .isReady{top:4vh;left: 8vh;}
.member15 .isReady .ready{width:6vh;}


.member16{top:22.5%;left:1vh;}
.member16 .isReady{top:4vh;left: 8vh;}
.member16 .isReady .ready{width:6vh;}

.member17{top:30%;left:1vh;}
.member17 .isReady{top:4vh;left: 8vh;}
.member17 .isReady .ready{width:6vh;}

.member18{top:37.5%;left:1vh;}
.member18 .isReady{top:4vh;left: 8vh;}
.member18 .isReady .ready{width:6vh;}

.member19{top:45%;left:1vh;}
.member19 .isReady{top:4vh;left: 8vh;}
.member19 .isReady .ready{width:6vh;}

.member20{top:52.5%;left:1vh;}
.member20 .isReady{top:4vh;left: 8vh;}
.member20 .isReady .ready{width:6vh;}

.member21{top:60%;left:1vh;}
.member21 .isReady{top:4vh;left: 8vh;}
.member21 .isReady .ready{width:6vh;}

.member22{top:67.5%;left:1vh;}
.member22 .isReady{top:4vh;left: 8vh;}
.member22 .isReady .ready{width:6vh;}

.member23{top:75%;left:1vh;}
.member23 .isReady{top:4vh;left: 8vh;}
.member23 .isReady .ready{width:6vh;}

/* 玩家金币 */
.memberCoin{position: absolute;width: 2.5vh;height: 2.5vh; z-index: 100}
.memberCoin10{top: 84%; left: 4.5vh}
.memberCoin11{top: 84%; left: 4.5vh}
.memberCoin12{top: 84%; left: 4.5vh}
.memberCoin13{top: 84%; left: 4.5vh}
.memberCoin14{top: 84%; left: 4.5vh}
.memberCoin15{top: 84%; left: 4.5vh}
.memberCoin16{top: 84%; left: 4.5vh}
.memberCoin17{top: 84%; left: 4.5vh}

.memberCoin20{top: 70%; left: 89.5vw}
.memberCoin21{top: 70%; left: 89.5vw}
.memberCoin22{top: 70%; left: 89.5vw}
.memberCoin23{top: 70%; left: 89.5vw}
.memberCoin24{top: 70%; left: 89.5vw}
.memberCoin25{top: 70%; left: 89.5vw}
.memberCoin26{top: 70%; left: 89.5vw}
.memberCoin27{top: 70%; left: 89.5vw}

.memberCoin30{top: 57%; left: 89.5vw}
.memberCoin31{top: 57%; left: 89.5vw}
.memberCoin32{top: 57%; left: 89.5vw}
.memberCoin33{top: 57%; left: 89.5vw}
.memberCoin34{top: 57%; left: 89.5vw}
.memberCoin35{top: 57%; left: 89.5vw}
.memberCoin36{top: 57%; left: 89.5vw}
.memberCoin37{top: 57%; left: 89.5vw}

.memberCoin40{top: 44%; left: 89.5vw}
.memberCoin41{top: 44%; left: 89.5vw}
.memberCoin42{top: 44%; left: 89.5vw}
.memberCoin43{top: 44%; left: 89.5vw}
.memberCoin44{top: 44%; left: 89.5vw}
.memberCoin45{top: 44%; left: 89.5vw}
.memberCoin46{top: 44%; left: 89.5vw}
.memberCoin47{top: 44%; left: 89.5vw}

.memberCoin50{top: 31%; left: 89.5vw}
.memberCoin51{top: 31%; left: 89.5vw}
.memberCoin52{top: 31%; left: 89.5vw}
.memberCoin53{top: 31%; left: 89.5vw}
.memberCoin54{top: 31%; left: 89.5vw}
.memberCoin55{top: 31%; left: 89.5vw}
.memberCoin56{top: 31%; left: 89.5vw}
.memberCoin57{top: 31%; left: 89.5vw}

.memberCoin60{top: 18%; left: 89.5vw}
.memberCoin61{top: 18%; left: 89.5vw}
.memberCoin62{top: 18%; left: 89.5vw}
.memberCoin63{top: 18%; left: 89.5vw}
.memberCoin64{top: 18%; left: 89.5vw}
.memberCoin65{top: 18%; left: 89.5vw}
.memberCoin66{top: 18%; left: 89.5vw}
.memberCoin67{top: 18%; left: 89.5vw}

.memberCoin70{top: 5%; left: 89.5vw}
.memberCoin71{top: 5%; left: 89.5vw}
.memberCoin72{top: 5%; left: 89.5vw}
.memberCoin73{top: 5%; left: 89.5vw}
.memberCoin74{top: 5%; left: 89.5vw}
.memberCoin75{top: 5%; left: 89.5vw}
.memberCoin76{top: 5%; left: 89.5vw}
.memberCoin77{top: 5%; left: 89.5vw}

.memberCoin80{top: 5%; left: 6vw}
.memberCoin81{top: 5%; left: 6vw}
.memberCoin82{top: 5%; left: 6vw}
.memberCoin83{top: 5%; left: 6vw}
.memberCoin84{top: 5%; left: 6vw}
.memberCoin85{top: 5%; left: 6vw}
.memberCoin86{top: 5%; left: 6vw}
.memberCoin87{top: 5%; left: 6vw}

.memberCoin90{top: 18%; left: 6vw}
.memberCoin91{top: 18%; left: 6vw}
.memberCoin92{top: 18%; left: 6vw}
.memberCoin93{top: 18%; left: 6vw}
.memberCoin94{top: 18%; left: 6vw}
.memberCoin95{top: 18%; left: 6vw}
.memberCoin96{top: 18%; left: 6vw}
.memberCoin97{top: 18%; left: 6vw}

.memberCoin100{top: 31%; left: 6vw}
.memberCoin101{top: 31%; left: 6vw}
.memberCoin102{top: 31%; left: 6vw}
.memberCoin103{top: 31%; left: 6vw}
.memberCoin104{top: 31%; left: 6vw}
.memberCoin105{top: 31%; left: 6vw}
.memberCoin106{top: 31%; left: 6vw}
.memberCoin107{top: 31%; left: 6vw}

.memberCoin110{top: 44%; left: 6vw}
.memberCoin111{top: 44%; left: 6vw}
.memberCoin112{top: 44%; left: 6vw}
.memberCoin113{top: 44%; left: 6vw}
.memberCoin114{top: 44%; left: 6vw}
.memberCoin115{top: 44%; left: 6vw}
.memberCoin116{top: 44%; left: 6vw}
.memberCoin117{top: 44%; left: 6vw}

.memberCoin120{top: 57%; left: 6vw}
.memberCoin121{top: 57%; left: 6vw}
.memberCoin122{top: 57%; left: 6vw}
.memberCoin123{top: 57%; left: 6vw}
.memberCoin124{top: 57%; left: 6vw}
.memberCoin125{top: 57%; left: 6vw}
.memberCoin126{top: 57%; left: 6vw}
.memberCoin127{top: 57%; left: 6vw}

.memberCoin130{top: 70%; left: 6vw}
.memberCoin131{top: 70%; left: 6vw}
.memberCoin132{top: 70%; left: 6vw}
.memberCoin133{top: 70%; left: 6vw}
.memberCoin134{top: 70%; left: 6vw}
.memberCoin135{top: 70%; left: 6vw}
.memberCoin136{top: 70%; left: 6vw}
.memberCoin137{top: 70%; left: 6vw}

/* 自由抢庄 */
.memberFreeRobText1{position: absolute; top: 81%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText2{position: absolute; top: 65.5%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText3{position: absolute; top: 58%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText4{position: absolute; top: 50.5%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText5{position: absolute; top: 43%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText6{position: absolute; top: 35.5%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText7{position: absolute; top: 28%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText8{position: absolute; top: 20.5%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText9{position: absolute; top: 13%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText10{position: absolute; top: 5.5%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText11{position: absolute; top: 0%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText12{position: absolute; top: 0%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText13{position: absolute; top: 5.5%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText14{position: absolute; top: 13%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText15{position: absolute; top: 20.5%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText16{position: absolute; top: 28%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText17{position: absolute; top: 35.5%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText18{position: absolute; top: 43%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText19{position: absolute; top: 50.5%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText20{position: absolute; top: 58%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberFreeRobText21{position: absolute; top: 65.5%; left: 10.5vh; width: 5vh; height: 2.6vh;}

/* 固定庄 */
.memberGoText1{position: absolute; top: 81%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText2{position: absolute; top: 70%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText3{position: absolute; top: 60%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText4{position: absolute; top: 51%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText5{position: absolute; top: 41%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText6{position: absolute; top: 32%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText7{position: absolute; top: 22%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText8{position: absolute; top: 13%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText9{position: absolute; top: 3%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText10{position: absolute; top: 3%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText11{position: absolute; top: 13%; right: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText12{position: absolute; top: 22%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText13{position: absolute; top: 32%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText14{position: absolute; top: 41%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText15{position: absolute; top: 51%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText16{position: absolute; top: 60%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText17{position: absolute; top: 70%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText18{position: absolute; top: 70%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText19{position: absolute; top: 70%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText20{position: absolute; top: 70%; left: 10.5vh; width: 5vh; height: 2.6vh;}
.memberGoText21{position: absolute; top: 70%; left: 10.5vh; width: 5vh; height: 2.6vh;}

/* 明牌抢庄 */
.memberRobText1{position: absolute; top: 81%; left: 60%; width: 5vh; height: 2.6vh;}
.memberRobText2{position: absolute; top: 67%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText3{position: absolute; top: 59.5%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText4{position: absolute; top: 52%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText5{position: absolute; top: 44.5%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText6{position: absolute; top: 37%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText7{position: absolute; top: 29.5%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText8{position: absolute; top: 22%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText9{position: absolute; top: 14.5%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText10{position: absolute; top: 7%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText11{position: absolute; top: -0.3%; right: 12vh; width: 5vh; height: 2.6vh;}
.memberRobText12{position: absolute; top: -0.3%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText13{position: absolute; top: 7%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText14{position: absolute; top: 14.5%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText15{position: absolute; top: 22%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText16{position: absolute; top: 29.5%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText17{position: absolute; top: 37%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText18{position: absolute; top: 44.5%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText19{position: absolute; top: 52%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText20{position: absolute; top: 59.5%; left: 9vh; width: 5vh; height: 2.6vh;}
.memberRobText21{position: absolute; top: 67%; left: 9vh; width: 5vh; height: 2.6vh;}

.memberRobTimes1{position: absolute; top: 81%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes2{position: absolute; top: 67%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes3{position: absolute; top: 59.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes4{position: absolute; top: 52%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes5{position: absolute; top: 44.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes6{position: absolute; top: 37%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes7{position: absolute; top: 29.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes8{position: absolute; top: 22%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes9{position: absolute; top: 14.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes10{position: absolute; top: 7%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes11{position: absolute; top: -0.3%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes12{position: absolute; top: -0.3%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes13{position: absolute; top: 7%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes14{position: absolute; top: 14.5%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes15{position: absolute; top: 22%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes16{position: absolute; top: 29.5%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes17{position: absolute; top: 37%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes18{position: absolute; top: 44.5%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes19{position: absolute; top: 52%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes20{position: absolute; top: 59.5%; left: 14vh; width: 2.6vh; height: 2.6vh;}
.memberRobTimes21{position: absolute; top: 67%; left: 14vh; width: 2.6vh; height: 2.6vh;}

/* 投注倍数 */
.memberTimesText1{position: absolute; top: 81%; left: 9.8vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText2{position: absolute; top: 67%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText3{position: absolute; top: 59.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText4{position: absolute; top: 52%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText5{position: absolute; top: 44.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText6{position: absolute; top: 37%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText7{position: absolute; top: 29.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText8{position: absolute; top: 22%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText9{position: absolute; top: 14.5%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText10{position: absolute; top: 7%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText11{position: absolute; top: -0.3%; right: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText12{position: absolute; top: -0.3%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText13{position: absolute; top: 7%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText14{position: absolute; top: 14.5%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText15{position: absolute; top: 22%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText16{position: absolute; top: 29.5%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText17{position: absolute; top: 37%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText18{position: absolute; top: 44.5%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText19{position: absolute; top: 52%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText20{position: absolute; top: 59.5%; left: 9vh; width: 2.6vh; height: 2.6vh;}
.memberTimesText21{position: absolute; top: 67%; left: 9vh; width: 2.6vh; height: 2.6vh;}

/* 显示牛几图片 */
.memberBull1{position: absolute;top: 76%; left: 52%; width: 14.57vh; height: 6vh; z-index: 90;margin-left: -8.285vh}
.memberBull2{position: absolute;top: 72%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull3{position: absolute;top: 64.5%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull4{position: absolute;top: 57%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull5{position: absolute;top: 49.5%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull6{position: absolute;top: 42%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull7{position: absolute;top: 34.5%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull8{position: absolute;top: 27%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull9{position: absolute;top: 19.5%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull10{position: absolute;top: 12%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull11{position: absolute;top: 4.5%; right: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull12{position: absolute;top: 4.5%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull13{position: absolute;top: 12%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull14{position: absolute;top: 19.5%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull15{position: absolute;top: 27%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull16{position: absolute;top: 34.5%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull17{position: absolute;top: 42%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull18{position: absolute;top: 49.5%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull19{position: absolute;top: 57%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull20{position: absolute;top: 64.5%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}
.memberBull21{position: absolute;top: 72%; left: 12vh; width: 10.45vh; height: 4.5vh; z-index: 90;}

 /* 一局完毕显示得分  */
.memberScoreText1{position: absolute;top: 77%; left: 0; text-align: center; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText2{position: absolute;top: 67.5%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText3{position: absolute;top: 60%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText4{position: absolute;top: 52.5%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText5{position: absolute;top: 45%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText6{position: absolute;top: 37.5%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText7{position: absolute;top: 30%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText8{position: absolute;top: 22.5%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText9{position: absolute;top: 15%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText10{position: absolute;top:7.5%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText11{position: absolute;top:0%; right: 9.5vh; text-align: right; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText12{position: absolute;top:0%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText13{position: absolute;top:7.5%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText14{position: absolute;top: 15%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText15{position: absolute;top: 22.5%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText16{position: absolute;top: 30%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText17{position: absolute;top: 37.5%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText18{position: absolute;top: 45%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText19{position: absolute;top: 52.5%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText20{position: absolute;top: 60%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}
.memberScoreText21{position: absolute;top: 67.5%; left: 9.5vh; text-align: left; width: 11vh; height: 4vh; z-index: 99;}


.quitBack{position: absolute;width: 4.4vh;height: 4.4vh;border-radius:4px;top:0px;left:0;padding: 0.05rem;border: 2px solid #8f7d76;font-size:12px;color:#fff;}
.quitBack img{width: 100%;height: 100%;}
.quitBack2 {
    position: absolute;
    width: 6.4vh;
    height: 6.4vh;
    border-radius: 4px;
    top: 0px;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
}
.quitBack2 img{
    width: 5.8vh;
    height: 6.2vh;
}
.member1 .quitBack {
    position: absolute;
    width: 5.4vh;
    height: 5.4vh;
    border-radius: 6px;
    top: 0;
    left: 0;
}
.colorBorder{position: absolute;text-align: center;width: 45px;height: 69px;border:2px solid #df0000;border-radius:4px;top:9px;left:6px;}
 .colorBorder .backColor{background:#df0000;opacity:0.45;height:100%;position: absolute;bottom:0;left:0;width:100%;}
 .colorBorder1{width: 56px;height: 86px;border:3px solid #df0000;border-radius:6px;top:10px;left:6px; }
 @keyframes mycolor1{0% {border-color: #04c120;}50% {border-color: #ffff3c;}100% {border-color: #df0000;}}
 @-webkit-keyframes mycolor1 {0% {border-color: #04c120;}50% {border-color: #ffff3c;}100% {border-color: #df0000;}}
 @keyframes mycolor2{0% {background:#04c120;height: 0;}50% {background:#ffff3c;}100% {background:#df0000;height: 100%;}}
 @-webkit-keyframes mycolor2{0% {background:#04c120;height: 0;}50% {background:#ffff3c;}100% {background:#df0000;height: 100%;}}


 .place{width:120px;height:120px;position: absolute;top:30%;left:165px;}
 .place .scoresArea{position: relative;width: 100%;height:100%;}
 .place .totalScore{position: absolute;top:-25px;left: 20px;width: 80px;}
 .place .totalScore img{position: absolute;width: 20px;left: 0;top:0;}
 .place .totalScore .scores{height: 20px;line-height: 20px;text-align: right;padding: 0 13px;border-radius:10px;background: #376e8d;color:#fff;font-size:14px;width:40%;}

.messageSay{position: absolute;height: 3vh;font-size: 2vh;color: #fff;background: #060408;border-radius:1.5vh;padding: 0 1.5vh;opacity: .75;line-height: 3vh;z-index: 97}
.messageSay1{top:77%;left: 3%;}
.messageSay1 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay2{top:67.5%;right: 3%;}
.messageSay2 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay3{top:60%;right: 3%;}
.messageSay3 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay4{top:52.5%;right: 3%;}
.messageSay4 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay5{top:45%;right: 3%;}
.messageSay5 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay6{top:37.5%;right: 3%;}
.messageSay6 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay7{top:30%;right: 3%;}
.messageSay7 .triangle{position: absolute;top:3vh;right:3vh;width:0;height:0;border-top: 6px solid #060408;border-left: 12px solid transparent;}
.messageSay8{top:22.5%;right: 3%;}
.messageSay8 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay9{top:15%;right: 3%;}
.messageSay9 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay10{top:7.5%;right: 3%;}
.messageSay10 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay11{top:0%;right: 3%;}
.messageSay11 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay12{top:0%;left: 3%;}
.messageSay12 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay13{top:7.5%;left: 3%;}
.messageSay13 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay14{top:15%;left: 3%;}
.messageSay14 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay15{top:22.5%;left: 3%;}
.messageSay15 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay16{top:30%;left: 3%;}
.messageSay16 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay17{top:37.5%;left: 3%;}
.messageSay17 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay18{top:45%;left: 3%;}
.messageSay18 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay19{top:52.5%;left: 3%;}
.messageSay19 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay20{top:60%;left: 3%;}
.messageSay20 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}
.messageSay21{top:67.5%;left: 3%;}
.messageSay21 .triangle{position: absolute;top:3vh;left:3vh;width:0;height:0;border-top: 6px solid #060408;border-right: 12px solid transparent;}

/* 26 37 */
/*.cardDeal{position: absolute; top: 19%; left: 18%; width: 64%; height: 70%;}*/
.cardDeal{position: absolute; width: 100%; height: 100%;}
.card{width: 7.8vw;height:10.4vw;background:url("../images/common/card14.png");background-size:7.8vw 10.4vw;position: absolute;}


/* 1号位置暗牌 */
.card11{animation:mymove11 .3s ;-webkit-animation:mymove11 .3s ;left:28%;top:81vh;width: 8.5vh;height:11.5vh;background-size:8.5vh 11.5vh;margin-left: -3.4vh;box-shadow:1px 1px 5px #333;}
@keyframes mymove11{from {left:50%;top:40%;}to {left:28%;top:81vh}}
@-webkit-keyframes mymove11 {from {left:50%;top:40%;}to {left:28%;top:81vh}}

.card12{animation:mymove12 .3s ;-webkit-animation:mymove12 .3s ;left:43%;top:81vh;width: 8.5vh;height:11.5vh;background-size:8.5vh 11.5vh;margin-left: -3.4vh;box-shadow:1px 1px 5px #333;}
@keyframes mymove12{from {left:50%;top:40%;}to {left:43%;top:81vh}}
@-webkit-keyframes mymove12 {from {left:50%;top:40%;}to {left:43%;top:81vh}}

.card13{animation:mymove13 .3s ;-webkit-animation:mymove13 .3s ;left:58%;top:81vh;width: 8.5vh;height:11.5vh;background-size:8.5vh 11.5vh;margin-left: -3.4vh;box-shadow:1px 1px 5px #333;}
@keyframes mymove13{from {left:50%;top:40%;}to {left:58%;top:81vh}}
@-webkit-keyframes mymove13{from {left:50%;top:40%;}to {left:58%;top:81vh}}

.card14{animation:mymove14 .3s ;-webkit-animation:mymove14 .3s ;left:73%;top:81vh;width: 8.5vh;height:11.5vh;background-size:8.5vh 11.5vh;margin-left: -3.4vh;box-shadow:1px 1px 5px #333;}
@keyframes mymove14{from {left:50%;top:40%;}to {left:73%;top:81vh}}
@-webkit-keyframes mymove14{from {left:50%;top:40%;}to {left:73%;top:81vh}}

.card15{animation:mymove15 .3s ;-webkit-animation:mymove15 .3s ;left:88%;top:81vh;width: 8.5vh;height:11.5vh;background-size:8.5vh 11.5vh;margin-left: -3.4vh;box-shadow:1px 1px 5px #333;}
@keyframes mymove15{from {left:50%;top:40%;}to {left:88%;top:81vh}}
@-webkit-keyframes mymove15{from {left:50%;top:40%;}to {left:88%;top:81vh}}


/* 2号位置暗牌 */
.card21{animation:mymove21 .3s ;-webkit-animation:mymove21 .3s ;right:9vh;top:69.1%;}
@keyframes mymove21{from {right:50%;top:40%;}to {right:9vh;top:69.1%}}
@-webkit-keyframes mymove21 {from {right:50%;top:40%;}to {right:9vh;top:69.1%}}

.card22{animation:mymove22 .3s ;-webkit-animation:mymove22 .3s ;right:12vh;top:69.1%;}
@keyframes mymove22{from {right:50%;top:40%;}to {right:12vh;top:69.1%}}
@-webkit-keyframes mymove22 {from {right:50%;top:40%;}to {right:12vh;top:69.1%}}

.card23{animation:mymove23 .3s ;-webkit-animation:mymove23 .3s ;right:15vh;top:69.1%;}
@keyframes mymove23{from {right:50%;top:40%;}to {right:15vh;top:69.1%}}
@-webkit-keyframes mymove23{from {right:50%;top:40%;}to {right:15vh;top:69.1%}}

.card24{animation:mymove24 .3s ;-webkit-animation:mymove24 .3s ;right:18vh;top:69.1%;}
@keyframes mymove24{from {right:50%;top: 40%;}to {right: 18vh;top:69.1%}}
@-webkit-keyframes mymove24{from {right: 50%;top: 40%}to {right: 18vh;top:69.1%}}

.card25{animation:mymove25 .3s ;-webkit-animation:mymove25 .3s ;right:21vh;top:69.1%;}
@keyframes mymove25{from {right:50%;top: 40%;}to {right: 21vh;top:69.1%}}
@-webkit-keyframes mymove25{from {right: 50%;top: 40%}to {right: 21vh;top:69.1%}}

/* 2号位置摊牌 */
.card2_11{right:9vh;top:69.1%;}
.card2_21{right:12vh;top:69.1%;}
.card2_31{right:15vh;top:69.1%;}
.card2_41{right:18vh;top:69.1%;}
.card2_51{right:21vh;top:69.1%;}


/* 3号位置暗牌 */
.card31{animation:mymove31 .3s ;-webkit-animation:mymove31 .3s ;right:9vh;top:61.5%;}
@keyframes mymove31{from {right:50%;top:40%;}to {right:9vh;top:61.5%}}
@-webkit-keyframes mymove31 {from {right:50%;top:40%;}to {right:9vh;top:61.5%}}

.card32{animation:mymove32 .3s ;-webkit-animation:mymove32 .3s ;right:12vh;top:61.5%}
@keyframes mymove32{from {right:50%;top:40%;}to {right:12vh;top:61.5%}}
@-webkit-keyframes mymove32 {from {right:50%;top:40%;}to {right:12vh;top:61.5%}}

.card33{animation:mymove33 .3s ;-webkit-animation:mymove33 .3s ;right:15vh;top:61.5%}
@keyframes mymove33{from {right:50%;top:40%;}to {right:15vh;top:61.5%}}
@-webkit-keyframes mymove33{from {right:50%;top:40%;}to {right:15vh;top:61.5%}}

.card34{animation:mymove34 .3s ;-webkit-animation:mymove34 .3s ;right:18vh;top:61.5%;}
@keyframes mymove34{from {right:50%;top:40%;}to {right:18vh;top:61.5%}}
@-webkit-keyframes mymove34{from {right:50%;top:40%;}to {right:18vh;top:61.5%}}

.card35{animation:mymove35 .3s ;-webkit-animation:mymove35 .3s ;right:21vh;top:61.5%;}
@keyframes mymove35{from {right:50%;top:40%;}to {right:21vh;top:61.5%}}
@-webkit-keyframes mymove35{from {right:50%;top:40%;}to {right:21vh;top:61.5%}}

/* 3号位置摊牌牌 */
.card3_11{right:9vh;top:61.5%;}
.card3_21{right:12vh;top:61.5%;}
.card3_31{right:15vh;top:61.5%;}
.card3_41{right:18vh;top:61.5%;}
.card3_51{right:21vh;top:61.5%;}

/* 4号位置暗牌 */
.card41{animation:mymove41 .3s ;-webkit-animation:mymove41 .3s ;right:9vh;top:54.1%}
@keyframes mymove41{from {left:50%;top:40%;}to {right:9vh;top:54.1%}}
@-webkit-keyframes mymove41{from {left:50%;top:40%;}to {right:9vh;top:54.1%}}

.card42{animation:mymove42 .3s ;-webkit-animation:mymove42 .3s ;right:12vh;top:54.1%}
@keyframes mymove42{from {left:50%;top:40%;}to {right:12vh;top:54.1%}}
@-webkit-keyframes mymove42{from {left:50%;top:40%;}to {right:12vh;top:54.1%}}

.card43{animation:mymove43 .3s ;-webkit-animation:mymove43 .3s ;right:15vh;top:54.1%;}
@keyframes mymove43{from {left:50%;top:40%;}to {right:15vh;top:54.1%}}
@-webkit-keyframes mymove43 {from {left:50%;top:40%;}to {right:15vh;top:54.1%}}

.card44{animation:mymove44 .3s ;-webkit-animation:mymove44 .3s ;right:18vh;top:54.1%;}
@keyframes mymove44{from {left:50%;top:40%;}to {right:18vh;top:54.1%}}
@-webkit-keyframes mymove44 {from {left:50%;top:40%;}to {right:18vh;top:54.1%}}

.card45{animation:mymove45 .3s ;-webkit-animation:mymove45 .3s ;right:21vh;top:54.1%;}
@keyframes mymove45{from {left:50%;top:40%;}to {right:21vh;top:54.1%}}
@-webkit-keyframes mymove45{from {left:50%;top:40%;}to {right:21vh;top:54.1%}}

/* 4号位置摊牌 */
.card4_11{right:9vh;top:54.1%;}
.card4_21{right:12vh;top:54.1%;}
.card4_31{right:15vh;top:54.1%;}
.card4_41{right:18vh;top:54.1%;}
.card4_51{right:21vh;top:54.1%;}

/* 5号位置暗牌 */
.card51{animation:mymove51 .3s ;-webkit-animation:mymove51 .3s ;right:9vh;top:46.5%;}
@keyframes mymove51{from {left:50%;top:40%;}to {right:9vh;top:46.5%}}
@-webkit-keyframes mymove51{from {left:50%;top:40%;}to {right:9vh;top:46.5%}}

.card52{animation:mymove52 .3s ;-webkit-animation:mymove52 .3s ;right:12vh;top:46.5%;}
@keyframes mymove52{from {left:50%;top:40%;}to {right:12vh;top:46.5%}}
@-webkit-keyframes mymove52{from {left:50%;top:40%;}to {right:12vh;top:46.5%}}

.card53{animation:mymove53 .3s ;-webkit-animation:mymove53 .3s ;right:15vh;top:46.5%;}
@keyframes mymove53{from {left:50%;top:40%;}to {right:15vh;top:46.5%}}
@-webkit-keyframes mymove53 {from {left:50%;top:40%;}to {right:15vh;top:46.5%}}

.card54{animation:mymove54 .3s ;-webkit-animation:mymove54 .3s ;right:18vh;top:46.5%;}
@keyframes mymove54{from {left:50%;top:40%;}to {right:18vh;top:46.5%}}
@-webkit-keyframes mymove54 {from {left:50%;top:40%;}to {right:18vh;top:46.5%}}

.card55{animation:mymove55 .3s ;-webkit-animation:mymove55 .3s ;right:21vh;top:46.5%;}
@keyframes mymove55{from {left:50%;top:40%;}to {right:21vh;top:46.5%}}
@-webkit-keyframes mymove55{from {left:50%;top:40%;}to {right:21vh;top:46.5%}}

/* 5号位置摊牌 */
.card5_11{right:9vh;top:46.5%;}
.card5_21{right:12vh;top:46.5%;}
.card5_31{right:15vh;top:46.5%;}
.card5_41{right:18vh;top:46.5%;}
.card5_51{right:21vh;top:46.5%;}

/* 6号位置暗牌 */
.card61{animation:mymove61 .3s ;-webkit-animation:mymove61 .3s ;right:9vh;top:39.1%;}
@keyframes mymove61{from {left:50%;top:40%;}to {right:9vh;top:39.1%}}
@-webkit-keyframes mymove61{from {left:50%;top:40%;}to {right:9vh;top:39.1%}}

.card62{animation:mymove62 .3s ;-webkit-animation:mymove62 .3s ;right:12vh;top:39.1%;}
@keyframes mymove62{from {left:50%;top:40%;}to {right:12vh;top:39.1%}}
@-webkit-keyframes mymove62{from {left:50%;top:40%;}to {right:12vh;top:39.1%}}

.card63{animation:mymove63 .3s ;-webkit-animation:mymove63 .3s ;right:15vh;top:39.1%;}
@keyframes mymove63{from {left:50%;top:40%;}to {right:15vh;top:39.1%}}
@-webkit-keyframes mymove63 {from {left:50%;top:40%;}to {right:15vh;top:39.1%}}

.card64{animation:mymove64 .3s ;-webkit-animation:mymove64 .3s ;right:18vh;top:39.1%;}
@keyframes mymove64{from {left:50%;top:40%;}to {right:18vh;top:39.1%}}
@-webkit-keyframes mymove64 {from {left:50%;top:40%;}to {right:18vh;top:39.1%}}

.card65{animation:mymove65 .3s ;-webkit-animation:mymove65 .3s ;right:21vh;top:39.1%;}
@keyframes mymove65{from {left:50%;top:40%;}to {right:21vh;top:39.1%}}
@-webkit-keyframes mymove65{from {left:50%;top:40%;}to {right:21vh;top:39.1%}}

/* 6号位置摊牌 */
.card6_11{right:9vh;top:39.1%;}
.card6_21{right:12vh;top:39.1%;}
.card6_31{right:15vh;top:39.1%;}
.card6_41{right:18vh;top:39.1%;}
.card6_51{right:21vh;top:39.1%;}

/* 7号位置暗牌 */
.card71{animation:mymove71 .3s ;-webkit-animation:mymove71 .3s ;right:9vh;top:31.5%;}
@keyframes mymove71{from {left:50%;top:40%;}to {right:9vh;top:31.5%}}
@-webkit-keyframes mymove71{from {left:50%;top:40%;}to {right:9vh;top:31.5%}}

.card72{animation:mymove72 .3s ;-webkit-animation:mymove72 .3s ;right:12vh;top:31.5%;}
@keyframes mymove72{from {left:50%;top:40%;}to {right:12vh;top:31.5%}}
@-webkit-keyframes mymove72{from {left:50%;top:40%;}to {right:12vh;top:31.5%}}

.card73{animation:mymove73 .3s ;-webkit-animation:mymove73 .3s ;right:15vh;top:31.5%;}
@keyframes mymove73{from {left:50%;top:40%;}to {right:15vh;top:31.5%}}
@-webkit-keyframes mymove73 {from {left:50%;top:40%;}to {right:15vh;top:31.5%}}

.card74{animation:mymove74 .3s ;-webkit-animation:mymove74 .3s ;right:18vh;top:31.5%;}
@keyframes mymove74{from {left:50%;top:40%;}to {right:18vh;top:31.5%}}
@-webkit-keyframes mymove74 {from {left:50%;top:40%;}to {right:18vh;top:31.5%}}

.card75{animation:mymove75 .3s ;-webkit-animation:mymove75 .3s ;right:21vh;top:31.5%;}
@keyframes mymove75{from {left:50%;top:40%;}to {right:21vh;top:31.5%}}
@-webkit-keyframes mymove75{from {left:50%;top:40%;}to {right:21vh;top:31.5%}}

/* 7号位置摊牌 */
.card7_11{right:9vh;top:31.5%;}
.card7_21{right:12vh;top:31.5%;}
.card7_31{right:15vh;top:31.5%;}
.card7_41{right:18vh;top:31.5%;}
.card7_51{right:21vh;top:31.5%;}

/* 8号位置暗牌 */
.card81{animation:mymove81 .3s ;-webkit-animation:mymove81 .3s ;right:9vh;top:24.1%;}
@keyframes mymove81{from {left:50%;top:40%;}to {right:9vh;top:24.1%}}
@-webkit-keyframes mymove81 {from {left:50%;top:40%;}to {right:9vh;top:24.1%}}

.card82{animation:mymove82 .3s ;-webkit-animation:mymove82 .3s ;right:12vh;top:24.1%;}
@keyframes mymove82{from {left:50%;top:40%;}to {right:12vh;top:24.1%}}
@-webkit-keyframes mymove82 {from {left:50%;top:40%;}to {right:12vh;top:24.1%}}

.card83{animation:mymove83 .3s ;-webkit-animation:mymove83 .3s ;right:15vh;top:24.1%;}
@keyframes mymove83{from {left:50%;top:40%;}to {right:15vh;top:24.1%}}
@-webkit-keyframes mymove83{from {left:50%;top:40%;}to {right:15vh;top:24.1%}}

.card84{animation:mymove84 .3s ;-webkit-animation:mymove84 .3s ;right:18vh;top:24.1%;}
@keyframes mymove84{from {left:50%;top:40%;}to {right:18vh;top:24.1%}}
@-webkit-keyframes mymove84{from {left:50%;top:40%;}to {right:18vh;top:24.1%}}

.card85{animation:mymove85 .3s ;-webkit-animation:mymove85 .3s ;right:21vh;top:24.1%;}
@keyframes mymove85{from {left:50%;top:40%;}to {right:21vh;top:24.1%}}
@-webkit-keyframes mymove85{from {left:50%;top:40%;}to {right:21vh;top:24.1%}}

/* 8号位置摊牌 */
.card8_51{right:9vh;top:24.1%;}
.card8_41{right:12vh;top:24.1%;}
.card8_31{right:15vh;top:24.1%;}
.card8_21{right:18vh;top:24.1%;}
.card8_11{right:21vh;top:24.1%;}

/* 9号位置暗牌 */
.card95{animation:mymove95 .3s ;-webkit-animation:mymove95 .3s ;right:9vh;top:16.5%;}
@keyframes mymove95{from {left:50%;top:40%;}to {right:9vh;top:16.5%}}
@-webkit-keyframes mymove95 {from {left:50%;top:40%;}to {right:9vh;top:16.5%}}

.card94{animation:mymove94 .3s ;-webkit-animation:mymove94 .3s ;right:12vh;top:16.5%;}
@keyframes mymove94{from {left:50%;top:40%;}to {right:12vh;top:16.5%}}
@-webkit-keyframes mymove94 {from {left:50%;top:40%;}to {right:12vh;top:16.5%}}

.card93{animation:mymove93 .3s ;-webkit-animation:mymove93 .3s ;right:15vh;top:16.5%;}
@keyframes mymove93{from {left:50%;top:40%;}to {right:15vh;top:16.5%}}
@-webkit-keyframes mymove93{from {left:50%;top:40%;}to {right:15vh;top:16.5%}}

.card92{animation:mymove92 .3s ;-webkit-animation:mymove92 .3s ;right:18vh;top:16.5%;}
@keyframes mymove92{from {left:50%;top:40%;}to {right:18vh;top:16.5%}}
@-webkit-keyframes mymove92{from {left:50%;top:40%;}to {right:18vh;top:16.5%}}

.card91{animation:mymove91 .3s ;-webkit-animation:mymove91 .3s ;right:21vh;top:16.5%;}
@keyframes mymove91{from {left:50%;top:40%;}to {right:21vh;top:16.5%}}
@-webkit-keyframes mymove91{from {left:50%;top:40%;}to {right:21vh;top:16.5%}}

/* 9号位置摊牌 */
.card9_51{right:9vh;top:16.5%;}
.card9_41{right:12vh;top:16.5%;}
.card9_31{right:15vh;top:16.5%;}
.card9_21{right:18vh;top:16.5%;}
.card9_11{right:21vh;top:16.5%;}

/* 10号位置暗牌 */
.card105{animation:mymove105 .3s ;-webkit-animation:mymove105 .3s ;right:9vh;top:9.1%;}
@keyframes mymove105{from {left:50%;top:40%;}to {right:9vh;top:9.1%}}
@-webkit-keyframes mymove105 {from {left:50%;top:40%;}to {right:9vh;top:9.1%}}

.card104{animation:mymove104 .3s ;-webkit-animation:mymove104 .3s ;right:12vh;top:9.1%;}
@keyframes mymove104{from {left:50%;top:40%;}to {right:12vh;top:9.1%}}
@-webkit-keyframes mymove104 {from {left:50%;top:40%;}to {right:12vh;top:9.1%}}

.card103{animation:mymove103 .3s ;-webkit-animation:mymove103 .3s ;right:15vh;top:9.1%;}
@keyframes mymove103{from {left:50%;top:40%;}to {right:15vh;top:9.1%}}
@-webkit-keyframes mymove103{from {left:50%;top:40%;}to {right:15vh;top:9.1%}}

.card102{animation:mymove102 .3s ;-webkit-animation:mymove102 .3s ;right:18vh;top:9.1%;}
@keyframes mymove102{from {left:50%;top:40%;}to {right:18vh;top:9.1%}}
@-webkit-keyframes mymove102{from {left:50%;top:40%;}to {right:18vh;top:9.1%}}

.card101{animation:mymove101 .3s ;-webkit-animation:mymove101 .3s ;right:21vh;top:9.1%;}
@keyframes mymove101{from {left:50%;top:40%;}to {right:21vh;top:9.1%}}
@-webkit-keyframes mymove101{from {left:50%;top:40%;}to {right:21vh;top:9.1%}}

/* 10号位置摊牌 */
.card10_51{right:9vh;top:9.1%;}
.card10_41{right:12vh;top:9.1%;}
.card10_31{right:15vh;top:9.1%;}
.card10_21{right:18vh;top:9.1%;}
.card10_11{right:21vh;top:9.1%;}

/* 11号位置暗牌 */
.card115{animation:mymove115 .3s ;-webkit-animation:mymove115 .3s ;right:9vh;top:1.5%;}
@keyframes mymove115{from {left:50%;top:40%;}to {right:9vh;top:1.5%}}
@-webkit-keyframes mymove115 {from {left:50%;top:40%;}to {right:9vh;top:1.5%}}

.card114{animation:mymove114 .3s ;-webkit-animation:mymove114 .3s ;right:12vh;top:1.5%;}
@keyframes mymove114{from {left:50%;top:40%;}to {right:12vh;top:1.5%}}
@-webkit-keyframes mymove114 {from {left:50%;top:40%;}to {right:12vh;top:1.5%}}

.card113{animation:mymove113 .3s ;-webkit-animation:mymove113 .3s ;right:15vh;top:1.5%;}
@keyframes mymove113{from {left:50%;top:40%;}to {right:15vh;top:1.5%}}
@-webkit-keyframes mymove113{from {left:50%;top:40%;}to {right:15vh;top:1.5%}}

.card112{animation:mymove112 .3s ;-webkit-animation:mymove112 .3s ;right:18vh;top:1.5%;}
@keyframes mymove112{from {left:50%;top:40%;}to {right:18vh;top:1.5%}}
@-webkit-keyframes mymove112{from {left:50%;top:40%;}to {right:18vh;top:1.5%}}

.card111{animation:mymove111 .3s ;-webkit-animation:mymove111 .3s ;right:21vh;top:1.5%;}
@keyframes mymove111{from {left:50%;top:40%;}to {right:21vh;top:1.5%}}
@-webkit-keyframes mymove111{from {left:50%;top:40%;}to {right:21vh;top:1.5%}}

/* 11号位置摊牌 */
.card11_51{right:9vh;top:1.5%;}
.card11_41{right:12vh;top:1.5%;}
.card11_31{right:15vh;top:1.5%;}
.card11_21{right:18vh;top:1.5%;}
.card11_11{right:21vh;top:1.5%;}

/* 12号位置暗牌 */
.card125{animation:mymove125 .3s ;-webkit-animation:mymove125 .3s ;left:9vh;top:1.5%;}
@keyframes mymove125{from {left:50%;top:40%;}to {left:9vh;top:1.5%}}
@-webkit-keyframes mymove125 {from {left:50%;top:40%;}to {left:9vh;top:1.5%}}

.card124{animation:mymove124 .3s ;-webkit-animation:mymove124 .3s ;left:12vh;top:1.5%;}
@keyframes mymove124{from {left:50%;top:40%;}to {left:12vh;top:1.5%}}
@-webkit-keyframes mymove124 {from {left:50%;top:40%;}to {left:12vh;top:1.5%}}

.card123{animation:mymove123 .3s ;-webkit-animation:mymove123 .3s ;left:15vh;top:1.5%;}
@keyframes mymove123{from {left:50%;top:40%;}to {left:15vh;top:1.5%}}
@-webkit-keyframes mymove123{from {left:50%;top:40%;}to {left:15vh;top:1.5%}}

.card122{animation:mymove122 .3s ;-webkit-animation:mymove122 .3s ;left:18vh;top:1.5%;}
@keyframes mymove122{from {left:50%;top:40%;}to {left:18vh;top:1.5%}}
@-webkit-keyframes mymove122{from {left:50%;top:40%;}to {left:18vh;top:1.5%}}

.card121{animation:mymove121 .3s ;-webkit-animation:mymove121 .3s ;left:21vh;top:1.5%;}
@keyframes mymove121{from {left:50%;top:40%;}to {left:21vh;top:1.5%}}
@-webkit-keyframes mymove121{from {left:50%;top:40%;}to {left:21vh;top:1.5%}}

/* 12号位置摊牌 */
.card12_51{left:9vh;top:1.5%;}
.card12_41{left:12vh;top:1.5%;}
.card12_31{left:15vh;top:1.5%;}
.card12_21{left:18vh;top:1.5%;}
.card12_11{left:21vh;top:1.5%;}

/* 13号位置暗牌 */
.card135{animation:mymove135 .3s ;-webkit-animation:mymove135 .3s ;left:9vh;top:9.1%;}
@keyframes mymove135{from {left:50%;top:40%;}to {left:9vh;top:9.1%}}
@-webkit-keyframes mymove135 {from {left:50%;top:40%;}to {left:9vh;top:9.1%}}

.card134{animation:mymove134 .3s ;-webkit-animation:mymove134 .3s ;left:12vh;top:9.1%;}
@keyframes mymove134{from {left:50%;top:40%;}to {left:12vh;top:9.1%}}
@-webkit-keyframes mymove134 {from {left:50%;top:40%;}to {left:12vh;top:9.1%}}

.card133{animation:mymove133 .3s ;-webkit-animation:mymove133 .3s ;left:15vh;top:9.1%;}
@keyframes mymove133{from {left:50%;top:40%;}to {left:15vh;top:9.1%}}
@-webkit-keyframes mymove133{from {left:50%;top:40%;}to {left:15vh;top:9.1%}}

.card132{animation:mymove132 .3s ;-webkit-animation:mymove132 .3s ;left:18vh;top:9.1%;}
@keyframes mymove132{from {left:50%;top:40%;}to {left:18vh;top:9.1%}}
@-webkit-keyframes mymove132{from {left:50%;top:40%;}to {left:18vh;top:9.1%}}

.card131{animation:mymove131 .3s ;-webkit-animation:mymove131 .3s ;left:21vh;top:9.1%;}
@keyframes mymove131{from {left:50%;top:40%;}to {left:21vh;top:9.1%}}
@-webkit-keyframes mymove131{from {left:50%;top:40%;}to {left:21vh;top:9.1%}}

/* 13号位置摊牌 */
.card13_51{left:9vh;top:9.1%;}
.card13_41{left:12vh;top:9.1%;}
.card13_31{left:15vh;top:9.1%;}
.card13_21{left:18vh;top:9.1%;}
.card13_11{left:21vh;top:9.1%;}

/* 14号位置暗牌 */
.card145{animation:mymove145 .3s ;-webkit-animation:mymove145 .3s ;left:9vh;top:16.5%;}
@keyframes mymove145{from {left:50%;top:40%;}to {left:9vh;top:16.5%}}
@-webkit-keyframes mymove145 {from {left:50%;top:40%;}to {left:9vh;top:16.5%}}

.card144{animation:mymove144 .3s ;-webkit-animation:mymove144 .3s ;left:12vh;top:16.5%;}
@keyframes mymove144{from {left:50%;top:40%;}to {left:12vh;top:16.5%}}
@-webkit-keyframes mymove144 {from {left:50%;top:40%;}to {left:12vh;top:16.5%}}

.card143{animation:mymove143 .3s ;-webkit-animation:mymove143 .3s ;left:15vh;top:16.5%;}
@keyframes mymove143{from {left:50%;top:40%;}to {left:15vh;top:16.5%}}
@-webkit-keyframes mymove143{from {left:50%;top:40%;}to {left:15vh;top:16.5%}}

.card142{animation:mymove142 .3s ;-webkit-animation:mymove142 .3s ;left:18vh;top:16.5%;}
@keyframes mymove142{from {left:50%;top:40%;}to {left:18vh;top:16.5%}}
@-webkit-keyframes mymove142{from {left:50%;top:40%;}to {left:18vh;top:16.5%}}

.card141{animation:mymove141 .3s ;-webkit-animation:mymove141 .3s ;left:21vh;top:16.5%;}
@keyframes mymove141{from {left:50%;top:40%;}to {left:21vh;top:16.5%}}
@-webkit-keyframes mymove141{from {left:50%;top:40%;}to {left:21vh;top:16.5%}}

/* 14号位置摊牌 */
.card14_51{left:9vh;top:16.5%;}
.card14_41{left:12vh;top:16.5%;}
.card14_31{left:15vh;top:16.5%;}
.card14_21{left:18vh;top:16.5%;}
.card14_11{left:21vh;top:16.5%;}

/* 15号位置暗牌 */
.card155{animation:mymove155 .3s ;-webkit-animation:mymove155 .3s ;left:9vh;top:24.1%;}
@keyframes mymove155{from {left:50%;top:40%;}to {left:9vh;top:24.1%}}
@-webkit-keyframes mymove155 {from {left:50%;top:40%;}to {left:9vh;top:24.1%}}

.card154{animation:mymove154 .3s ;-webkit-animation:mymove154 .3s ;left:12vh;top:24.1%;}
@keyframes mymove154{from {left:50%;top:40%;}to {left:12vh;top:24.1%}}
@-webkit-keyframes mymove154 {from {left:50%;top:40%;}to {left:12vh;top:24.1%}}

.card153{animation:mymove153 .3s ;-webkit-animation:mymove153 .3s ;left:15vh;top:24.1%;}
@keyframes mymove153{from {left:50%;top:40%;}to {left:15vh;top:24.1%}}
@-webkit-keyframes mymove153{from {left:50%;top:40%;}to {left:15vh;top:24.1%}}

.card152{animation:mymove152 .3s ;-webkit-animation:mymove152 .3s ;left:18vh;top:24.1%;}
@keyframes mymove152{from {left:50%;top:40%;}to {left:18vh;top:24.1%}}
@-webkit-keyframes mymove152{from {left:50%;top:40%;}to {left:18vh;top:24.1%}}

.card151{animation:mymove151 .3s ;-webkit-animation:mymove151 .3s ;left:21vh;top:24.1%;}
@keyframes mymove151{from {left:50%;top:40%;}to {left:21vh;top:24.1%}}
@-webkit-keyframes mymove151{from {left:50%;top:40%;}to {left:21vh;top:24.1%}}

/* 15号位置摊牌 */
.card15_51{left:9vh;top:24.1%;}
.card15_41{left:12vh;top:24.1%;}
.card15_31{left:15vh;top:24.1%;}
.card15_21{left:18vh;top:24.1%;}
.card15_11{left:21vh;top:24.1%;}

/* 16号位置暗牌 */
.card165{animation:mymove165 .3s ;-webkit-animation:mymove165 .3s ;left:9vh;top:31.6%;}
@keyframes mymove165{from {left:50%;top:40%;}to {left:9vh;top:31.6%}}
@-webkit-keyframes mymove165 {from {left:50%;top:40%;}to {left:9vh;top:31.6%}}

.card164{animation:mymove164 .3s ;-webkit-animation:mymove164 .3s ;left:12vh;top:31.6%;}
@keyframes mymove164{from {left:50%;top:40%;}to {left:12vh;top:31.6%}}
@-webkit-keyframes mymove164 {from {left:50%;top:40%;}to {left:12vh;top:31.6%}}

.card163{animation:mymove163 .3s ;-webkit-animation:mymove163 .3s ;left:15vh;top:31.6%;}
@keyframes mymove163{from {left:50%;top:40%;}to {left:15vh;top:31.6%}}
@-webkit-keyframes mymove163{from {left:50%;top:40%;}to {left:15vh;top:31.6%}}

.card162{animation:mymove162 .3s ;-webkit-animation:mymove162 .3s ;left:18vh;top:31.6%;}
@keyframes mymove162{from {left:50%;top:40%;}to {left:18vh;top:31.6%}}
@-webkit-keyframes mymove162{from {left:50%;top:40%;}to {left:18vh;top:31.6%}}

.card161{animation:mymove161 .3s ;-webkit-animation:mymove161 .3s ;left:21vh;top:31.6%;}
@keyframes mymove161{from {left:50%;top:40%;}to {left:21vh;top:31.6%}}
@-webkit-keyframes mymove161{from {left:50%;top:40%;}to {left:21vh;top:31.6%}}

/* 16号位置摊牌 */
.card16_51{left:9vh;top:31.6%;}
.card16_41{left:12vh;top:31.6%;}
.card16_31{left:15vh;top:31.6%;}
.card16_21{left:18vh;top:31.6%;}
.card16_11{left:21vh;top:31.6%;}

/* 17号位置暗牌 */
.card175{animation:mymove175 .3s ;-webkit-animation:mymove175 .3s ;left:9vh;top:39.1%;}
@keyframes mymove175{from {left:50%;top:40%;}to {left:9vh;top:39.1%}}
@-webkit-keyframes mymove175 {from {left:50%;top:40%;}to {left:9vh;top:39.1%}}

.card174{animation:mymove174 .3s ;-webkit-animation:mymove174 .3s ;left:12vh;top:39.1%;}
@keyframes mymove174{from {left:50%;top:40%;}to {left:12vh;top:39.1%}}
@-webkit-keyframes mymove174 {from {left:50%;top:40%;}to {left:12vh;top:39.1%}}

.card173{animation:mymove173 .3s ;-webkit-animation:mymove173 .3s ;left:15vh;top:39.1%;}
@keyframes mymove173{from {left:50%;top:40%;}to {left:15vh;top:39.1%}}
@-webkit-keyframes mymove173{from {left:50%;top:40%;}to {left:15vh;top:39.1%}}

.card172{animation:mymove172 .3s ;-webkit-animation:mymove172 .3s ;left:18vh;top:39.1%;}
@keyframes mymove172{from {left:50%;top:40%;}to {left:18vh;top:39.1%}}
@-webkit-keyframes mymove172{from {left:50%;top:40%;}to {left:18vh;top:39.1%}}

.card171{animation:mymove171 .3s ;-webkit-animation:mymove171 .3s ;left:21vh;top:39.1%;}
@keyframes mymove171{from {left:50%;top:40%;}to {left:21vh;top:39.1%}}
@-webkit-keyframes mymove171{from {left:50%;top:40%;}to {left:21vh;top:39.1%}}

/* 17号位置摊牌 */
.card17_51{left:9vh;top:39.1%;}
.card17_41{left:12vh;top:39.1%;}
.card17_31{left:15vh;top:39.1%;}
.card17_21{left:18vh;top:39.1%;}
.card17_11{left:21vh;top:39.1%;}

/* 18号位置暗牌 */
.card185{animation:mymove185 .3s ;-webkit-animation:mymove185 .3s ;left:9vh;top:46.6%;}
@keyframes mymove185{from {left:50%;top:40%;}to {left:9vh;top:46.6%}}
@-webkit-keyframes mymove185 {from {left:50%;top:40%;}to {left:9vh;top:46.6%}}

.card184{animation:mymove184 .3s ;-webkit-animation:mymove184 .3s ;left:12vh;top:46.6%;}
@keyframes mymove184{from {left:50%;top:40%;}to {left:12vh;top:46.6%}}
@-webkit-keyframes mymove184 {from {left:50%;top:40%;}to {left:12vh;top:46.6%}}

.card183{animation:mymove183 .3s ;-webkit-animation:mymove183 .3s ;left:15vh;top:46.6%;}
@keyframes mymove183{from {left:50%;top:40%;}to {left:15vh;top:46.6%}}
@-webkit-keyframes mymove183{from {left:50%;top:40%;}to {left:15vh;top:46.6%}}

.card182{animation:mymove182 .3s ;-webkit-animation:mymove182 .3s ;left:18vh;top:46.6%;}
@keyframes mymove182{from {left:50%;top:40%;}to {left:18vh;top:46.6%}}
@-webkit-keyframes mymove182{from {left:50%;top:40%;}to {left:18vh;top:46.6%}}

.card181{animation:mymove181 .3s ;-webkit-animation:mymove181 .3s ;left:21vh;top:46.6%;}
@keyframes mymove181{from {left:50%;top:40%;}to {left:21vh;top:46.6%}}
@-webkit-keyframes mymove181{from {left:50%;top:40%;}to {left:21vh;top:46.6%}}

/* 18号位置摊牌 */
.card18_51{left:9vh;top:46.6%;}
.card18_41{left:12vh;top:46.6%;}
.card18_31{left:15vh;top:46.6%;}
.card18_21{left:18vh;top:46.6%;}
.card18_11{left:21vh;top:46.6%;}

/* 19号位置暗牌 */
.card195{animation:mymove195 .3s ;-webkit-animation:mymove195 .3s ;left:9vh;top:54.1%;}
@keyframes mymove195{from {left:50%;top:40%;}to {left:9vh;top:54.1%}}
@-webkit-keyframes mymove195 {from {left:50%;top:40%;}to {left:9vh;top:54.1%}}

.card194{animation:mymove194 .3s ;-webkit-animation:mymove194 .3s ;left:12vh;top:54.1%;}
@keyframes mymove194{from {left:50%;top:40%;}to {left:12vh;top:54.1%}}
@-webkit-keyframes mymove194 {from {left:50%;top:40%;}to {left:12vh;top:54.1%}}

.card193{animation:mymove193 .3s ;-webkit-animation:mymove193 .3s ;left:15vh;top:54.1%;}
@keyframes mymove193{from {left:50%;top:40%;}to {left:15vh;top:54.1%}}
@-webkit-keyframes mymove193{from {left:50%;top:40%;}to {left:15vh;top:54.1%}}

.card192{animation:mymove192 .3s ;-webkit-animation:mymove192 .3s ;left:18vh;top:54.1%;}
@keyframes mymove192{from {left:50%;top:40%;}to {left:18vh;top:54.1%}}
@-webkit-keyframes mymove192{from {left:50%;top:40%;}to {left:18vh;top:54.1%}}

.card191{animation:mymove191 .3s ;-webkit-animation:mymove191 .3s ;left:21vh;top:54.1%;}
@keyframes mymove191{from {left:50%;top:40%;}to {left:21vh;top:54.1%}}
@-webkit-keyframes mymove191{from {left:50%;top:40%;}to {left:21vh;top:54.1%}}

/* 19号位置摊牌 */
.card19_51{left:9vh;top:54.1%;}
.card19_41{left:12vh;top:54.1%;}
.card19_31{left:15vh;top:54.1%;}
.card19_21{left:18vh;top:54.1%;}
.card19_11{left:21vh;top:54.1%;}

/* 20号位置暗牌 */
.card205{animation:mymove205 .3s ;-webkit-animation:mymove205 .3s ;left:9vh;top:61.6%;}
@keyframes mymove205{from {left:50%;top:40%;}to {left:9vh;top:61.6%}}
@-webkit-keyframes mymove205 {from {left:50%;top:40%;}to {left:9vh;top:61.6%}}

.card204{animation:mymove204 .3s ;-webkit-animation:mymove204 .3s ;left:12vh;top:61.6%;}
@keyframes mymove204{from {left:50%;top:40%;}to {left:12vh;top:61.6%}}
@-webkit-keyframes mymove204 {from {left:50%;top:40%;}to {left:12vh;top:61.6%}}

.card203{animation:mymove203 .3s ;-webkit-animation:mymove203 .3s ;left:15vh;top:61.6%;}
@keyframes mymove203{from {left:50%;top:40%;}to {left:15vh;top:61.6%}}
@-webkit-keyframes mymove203{from {left:50%;top:40%;}to {left:15vh;top:61.6%}}

.card202{animation:mymove202 .3s ;-webkit-animation:mymove202 .3s ;left:18vh;top:61.6%;}
@keyframes mymove202{from {left:50%;top:40%;}to {left:18vh;top:61.6%}}
@-webkit-keyframes mymove202{from {left:50%;top:40%;}to {left:18vh;top:61.6%}}

.card201{animation:mymove201 .3s ;-webkit-animation:mymove201 .3s ;left:21vh;top:61.6%;}
@keyframes mymove201{from {left:50%;top:40%;}to {left:21vh;top:61.6%}}
@-webkit-keyframes mymove201{from {left:50%;top:40%;}to {left:21vh;top:61.6%}}

/* 20号位置摊牌 */
.card20_51{left:9vh;top:61.6%;}
.card20_41{left:12vh;top:61.6%;}
.card20_31{left:15vh;top:61.6%;}
.card20_21{left:18vh;top:61.6%;}
.card20_11{left:21vh;top:61.6%;}

/* 21号位置暗牌 */
.card215{animation:mymove215 .3s ;-webkit-animation:mymove215 .3s ;left:9vh;top:69.1%;}
@keyframes mymove215{from {left:50%;top:40%;}to {left:9vh;top:69.1%}}
@-webkit-keyframes mymove215 {from {left:50%;top:40%;}to {left:9vh;top:69.1%}}

.card214{animation:mymove214 .3s ;-webkit-animation:mymove214 .3s ;left:12vh;top:69.1%;}
@keyframes mymove214{from {left:50%;top:40%;}to {left:12vh;top:69.1%}}
@-webkit-keyframes mymove214 {from {left:50%;top:40%;}to {left:12vh;top:69.1%}}

.card213{animation:mymove213 .3s ;-webkit-animation:mymove213 .3s ;left:15vh;top:69.1%;}
@keyframes mymove213{from {left:50%;top:40%;}to {left:15vh;top:69.1%}}
@-webkit-keyframes mymove213{from {left:50%;top:40%;}to {left:15vh;top:69.1%}}

.card212{animation:mymove212 .3s ;-webkit-animation:mymove212 .3s ;left:18vh;top:69.1%;}
@keyframes mymove212{from {left:50%;top:40%;}to {left:18vh;top:69.1%}}
@-webkit-keyframes mymove212{from {left:50%;top:40%;}to {left:18vh;top:69.1%}}

.card211{animation:mymove211 .3s ;-webkit-animation:mymove211 .3s ;left:21vh;top:69.1%;}
@keyframes mymove211{from {left:50%;top:40%;}to {left:21vh;top:69.1%}}
@-webkit-keyframes mymove211{from {left:50%;top:40%;}to {left:21vh;top:69.1%}}

/* 21号位置摊牌 */
.card21_51{left:9vh;top:69.1%;}
.card21_41{left:12vh;top:69.1%;}
.card21_31{left:15vh;top:69.1%;}
.card21_21{left:18vh;top:69.1%;}
.card21_11{left:21vh;top:69.1%;}

/********************************* 翻牌   ***********************************************/
.cardOver{position: absolute;height: 100%;top:0;}
.cardOver .cardResult{position: relative;height: 100%;}
.cardOver .name{color: #fff;font-size: 10px;text-align: center;line-height: 16px;position: absolute;top: 15%;width: 100%;left:0;}

.cardOver .openCard{position: absolute;width: 100%;top: 34%;left: 15%;}
.cardOver .cards{width: 7.8vw;height: 10.4vw;position: absolute;}
.cardOver .face{width: 7.8vw;height: 10.4vw;border-radius:3px;position: absolute;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-transition:all .6s;transition: all .6s;}
.cardOver .front{background: url("../images/common/card14.png");background-size:7.8vw 10.4vw;z-index: 92;}
.cardOver .back{z-index: 91;box-shadow:1px 1px 5px #333;}
/*牌面定位样式*/
.cardOver .card{background: url("../images/common/card14.png");background-size:4.6vh 6.4vh;}
.cardOver .cardundefined{background: url("../images/common/card14.png");background-size:4.6vh 6.4vh;}
.cardOver .card-1{background: url("../images/common/card14.png");background-size:4.6vh 6.4vh;}
.cardOver .cardA1{background: url("../images/pai/cardA1.png")0 0/100% 100%;}
.cardOver .cardA2{background: url("../images/pai/cardA2.png")0 0/100% 100%;}
.cardOver .cardA3{background: url("../images/pai/cardA3.png")0 0/100% 100%;}
.cardOver .cardA4{background: url("../images/pai/cardA4.png")0 0/100% 100%;}
.cardOver .cardA5{background: url("../images/pai/cardA5.png")0 0/100% 100%;}
.cardOver .cardA6{background: url("../images/pai/cardA6.png")0 0/100% 100%;}
.cardOver .cardA7{background: url("../images/pai/cardA7.png")0 0/100% 100%;}
.cardOver .cardA8{background: url("../images/pai/cardA8.png")0 0/100% 100%;}
.cardOver .cardA9{background: url("../images/pai/cardA9.png")0 0/100% 100%;}
.cardOver .cardA10{background: url("../images/pai/cardA10.png")0 0/100% 100%;}
.cardOver .cardA11{background: url("../images/pai/cardA11.png")0 0/100% 100%;}
.cardOver .cardA12{background: url("../images/pai/cardA12.png")0 0/100% 100%;}
.cardOver .cardA13{background: url("../images/pai/cardA13.png")0 0/100% 100%;}
.cardOver .cardB1{background: url("../images/pai/cardB1.png")0 0/100% 100%;}
.cardOver .cardB2{background: url("../images/pai/cardB2.png")0 0/100% 100%;}
.cardOver .cardB3{background: url("../images/pai/cardB3.png")0 0/100% 100%;}
.cardOver .cardB4{background: url("../images/pai/cardB4.png")0 0/100% 100%;}
.cardOver .cardB5{background: url("../images/pai/cardB5.png")0 0/100% 100%;}
.cardOver .cardB6{background: url("../images/pai/cardB6.png")0 0/100% 100%;}
.cardOver .cardB7{background: url("../images/pai/cardB7.png")0 0/100% 100%;}
.cardOver .cardB8{background: url("../images/pai/cardB8.png")0 0/100% 100%;}
.cardOver .cardB9{background: url("../images/pai/cardB9.png")0 0/100% 100%;}
.cardOver .cardB10{background: url("../images/pai/cardB10.png")0 0/100% 100%;}
.cardOver .cardB11{background: url("../images/pai/cardB11.png")0 0/100% 100%;}
.cardOver .cardB12{background: url("../images/pai/cardB12.png")0 0/100% 100%;}
.cardOver .cardB13{background: url("../images/pai/cardB13.png")0 0/100% 100%;}
.cardOver .cardC1{background: url("../images/pai/cardC1.png")0 0/100% 100%;}
.cardOver .cardC2{background: url("../images/pai/cardC2.png")0 0/100% 100%;}
.cardOver .cardC3{background: url("../images/pai/cardC3.png")0 0/100% 100%;}
.cardOver .cardC4{background: url("../images/pai/cardC4.png")0 0/100% 100%;}
.cardOver .cardC5{background: url("../images/pai/cardC5.png")0 0/100% 100%;}
.cardOver .cardC6{background: url("../images/pai/cardC6.png")0 0/100% 100%;}
.cardOver .cardC7{background: url("../images/pai/cardC7.png")0 0/100% 100%;}
.cardOver .cardC8{background: url("../images/pai/cardC8.png")0 0/100% 100%;}
.cardOver .cardC9{background: url("../images/pai/cardC9.png")0 0/100% 100%;}
.cardOver .cardC10{background: url("../images/pai/cardC10.png")0 0/100% 100%;}
.cardOver .cardC11{background: url("../images/pai/cardC11.png")0 0/100% 100%;}
.cardOver .cardC12{background: url("../images/pai/cardC12.png")0 0/100% 100%;}
.cardOver .cardC13{background: url("../images/pai/cardC13.png")0 0/100% 100%;}
.cardOver .cardD1{background: url("../images/pai/cardD1.png")0 0/100% 100%;}
.cardOver .cardD2{background: url("../images/pai/cardD2.png")0 0/100% 100%;}
.cardOver .cardD3{background: url("../images/pai/cardD3.png")0 0/100% 100%;}
.cardOver .cardD4{background: url("../images/pai/cardD4.png")0 0/100% 100%;}
.cardOver .cardD5{background: url("../images/pai/cardD5.png")0 0/100% 100%;}
.cardOver .cardD6{background: url("../images/pai/cardD6.png")0 0/100% 100%;}
.cardOver .cardD7{background: url("../images/pai/cardD7.png")0 0/100% 100%;}
.cardOver .cardD8{background: url("../images/pai/cardD8.png")0 0/100% 100%;}
.cardOver .cardD9{background: url("../images/pai/cardD9.png")0 0/100% 100%;}
.cardOver .cardD10{background: url("../images/pai/cardD10.png")0 0/100% 100%;}
.cardOver .cardD11{background: url("../images/pai/cardD11.png")0 0/100% 100%;}
.cardOver .cardD12{background: url("../images/pai/cardD12.png")0 0/100% 100%;}
.cardOver .cardD13{background: url("../images/pai/cardD13.png")0 0/100% 100%;}
.cardOver .cardE1{background: url("../images/pai/cardE1.png")0 0/100% 100%;}
.cardOver .cardE2{background: url("../images/pai/cardE2.png")0 0/100% 100%;}
.cardOver .cardE3{background: url("../images/pai/cardE3.png")0 0/100% 100%;}
.cardOver .cardE4{background: url("../images/pai/cardE4.png")0 0/100% 100%;}
.cardOver .cardE5{background: url("../images/pai/cardE5.png")0 0/100% 100%;}
.cardOver .cardE6{background: url("../images/pai/cardE6.png")0 0/100% 100%;}
.cardOver .cardE7{background: url("../images/pai/cardE7.png")0 0/100% 100%;}
.cardOver .cardE8{background: url("../images/pai/cardE8.png")0 0/100% 100%;}
.cardOver .cardE9{background: url("../images/pai/cardE9.png")0 0/100% 100%;}
.cardOver .cardE10{background: url("../images/pai/cardE10.png")0 0/100% 100%;}
.cardOver .cardE11{background: url("../images/pai/cardE11.png")0 0/100% 100%;}
.cardOver .cardE12{background: url("../images/pai/cardE12.png")0 0/100% 100%;}
.cardOver .cardE13{background: url("../images/pai/cardE13.png")0 0/100% 100%;}
.cardOver .cardS1{background: url("../images/pai/cardS1.png?v=201923")0 0/100% 100%;}
.cardOver .cardS2{background: url("../images/pai/cardS2.png?v=201923")0 0/100% 100%;}
.cardOver .cardS3{background: url("../images/pai/cardS3.png?v=201923")0 0/100% 100%;}
.cardOver .cardS4{background: url("../images/pai/cardS4.png?v=201923")0 0/100% 100%;}
.cardOver .cardS5{background: url("../images/pai/cardS5.png?v=201923")0 0/100% 100%;}
.cardOver .cardS6{background: url("../images/pai/cardS6.png?v=201923")0 0/100% 100%;}
.cardOver .cardS7{background: url("../images/pai/cardS7.png?v=201923")0 0/100% 100%;}
.cardOver .cardS8{background: url("../images/pai/cardS8.png?v=201923")0 0/100% 100%;}
.cardOver .cardS9{background: url("../images/pai/cardS9.png?v=201923")0 0/100% 100%;}
.cardOver .cardS10{background: url("../images/pai/cardS10.png?v=201923")0 0/100% 100%;}
.cardOver .cardS11{background: url("../images/pai/cardS11.png?v=201923")0 0/100% 100%;}
.cardOver .cardS12{background: url("../images/pai/cardS12.png?v=201923")0 0/100% 100%;}
.cardOver .cardS13{background: url("../images/pai/cardS13.png?v=201923")0 0/100% 100%;}
.cardOver .cardT1{background: url("../images/pai/cardT1.png")0 0/100% 100%;}
.cardOver .cardT2{background: url("../images/pai/cardT2.png")0 0/100% 100%;}
.cardOver .cardT3{background: url("../images/pai/cardT3.png")0 0/100% 100%;}
.cardOver .cardT4{background: url("../images/pai/cardT4.png")0 0/100% 100%;}
.cardOver .cardT5{background: url("../images/pai/cardT5.png")0 0/100% 100%;}
.cardOver .cardT6{background: url("../images/pai/cardT6.png")0 0/100% 100%;}
.cardOver .cardT7{background: url("../images/pai/cardT7.png")0 0/100% 100%;}
.cardOver .cardT8{background: url("../images/pai/cardT8.png")0 0/100% 100%;}
.cardOver .cardT9{background: url("../images/pai/cardT9.png")0 0/100% 100%;}
.cardOver .cardT10{background: url("../images/pai/cardT10.png")0 0/100% 100%;}
.cardOver .cardT11{background: url("../images/pai/cardT11.png")0 0/100% 100%;}
.cardOver .cardT12{background: url("../images/pai/cardT12.png")0 0/100% 100%;}
.cardOver .cardT13{background: url("../images/pai/cardT13.png")0 0/100% 100%;}

.cardOver .cardF1{background: url("../images/pai/cardF1.png")0 0/100% 100%;}
.cardOver .cardF2{background: url("../images/pai/cardF2.png")0 0/100% 100%;}
.cardOver .cardF3{background: url("../images/pai/cardF3.png")0 0/100% 100%;}
.cardOver .cardF4{background: url("../images/pai/cardF4.png")0 0/100% 100%;}
.cardOver .cardF5{background: url("../images/pai/cardF5.png")0 0/100% 100%;}
.cardOver .cardF6{background: url("../images/pai/cardF6.png")0 0/100% 100%;}
.cardOver .cardF7{background: url("../images/pai/cardF7.png")0 0/100% 100%;}
.cardOver .cardF8{background: url("../images/pai/cardF8.png")0 0/100% 100%;}
.cardOver .cardF9{background: url("../images/pai/cardF9.png")0 0/100% 100%;}
.cardOver .cardF10{background: url("../images/pai/cardF10.png")0 0/100% 100%;}
.cardOver .cardF11{background: url("../images/pai/cardF11.png")0 0/100% 100%;}
.cardOver .cardF12{background: url("../images/pai/cardF12.png")0 0/100% 100%;}
.cardOver .cardF13{background: url("../images/pai/cardF13.png")0 0/100% 100%;}
.cardOver .cardG1{background: url("../images/pai/cardG1.png")0 0/100% 100%;}
.cardOver .cardG2{background: url("../images/pai/cardG2.png")0 0/100% 100%;}
.cardOver .cardG3{background: url("../images/pai/cardG3.png")0 0/100% 100%;}
.cardOver .cardG4{background: url("../images/pai/cardG4.png")0 0/100% 100%;}
.cardOver .cardG5{background: url("../images/pai/cardG5.png")0 0/100% 100%;}
.cardOver .cardG6{background: url("../images/pai/cardG6.png")0 0/100% 100%;}
.cardOver .cardG7{background: url("../images/pai/cardG7.png")0 0/100% 100%;}
.cardOver .cardG8{background: url("../images/pai/cardG8.png")0 0/100% 100%;}
.cardOver .cardG9{background: url("../images/pai/cardG9.png")0 0/100% 100%;}
.cardOver .cardG10{background: url("../images/pai/cardG10.png")0 0/100% 100%;}
.cardOver .cardG11{background: url("../images/pai/cardG11.png")0 0/100% 100%;}
.cardOver .cardG12{background: url("../images/pai/cardG12.png")0 0/100% 100%;}
.cardOver .cardG13{background: url("../images/pai/cardG13.png")0 0/100% 100%;}


.cardOver .card-flipped .front{z-index: 91;-webkit-transform: rotateY(180deg);transform: rotateY(180deg);}
.cardOver .card-flipped .back{z-index: 92;-webkit-transform: rotateY(0deg);transform: rotateY(0deg);}

/*40 自己牌尺寸 57*/
.myCards {position: absolute;width: 100%;top: 81%;}
.myCards .winText{position: absolute;width: 100%;top:-50px;}
.myCards .winText img{width: 120%;margin-left: -10%;}
.myCards .cards{width: 8.5vh;height:11.5vh;position: absolute; }
.myCards .face{width: 8.5vh;height: 11.5vh;border-radius:5px;position: absolute; transform-style: preserve-3d;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-transition:all .6s; transition:all .6s;}
.myCards .front{background: url("../images/common/card14.png");-webkit-transform: rotateY(0deg);transform: rotateY(0deg);background-size:8.5vh 11.5vh;z-index: 92;}
/*519 228*/
.myCards .back{background:url("../images/common/cards4.png");-webkit-transform: rotateY(180deg);transform: rotateY(180deg);z-index: 91;background-size:110.4vh 57.5vh;box-shadow:1px 1px 5px #333;}

.myCards .card-flipped .front{z-index: 91;-webkit-transform: rotateY(180deg);transform: rotateY(180deg);}
.myCards .card-flipped .back{z-index: 92;-webkit-transform: rotateY(0deg);transform: rotateY(0deg);}

/*牌面定位样式*/
.myCards .card{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.myCards .cardundefined{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.myCards .card-1{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.myCards .cardA1{background-position: 0 -34.5vh;}
.myCards .cardA2{background-position: -8.5vh -34.5vh;}
.myCards .cardA3{background-position: -17vh -34.5vh;}
.myCards .cardA4{background-position: -25.5vh -34.5vh;}
.myCards .cardA5{background-position: -34vh -34.5vh;}
.myCards .cardA6{background-position: -42.5vh -34.5vh;}
.myCards .cardA7{background-position: -51vh -34.5vh;}
.myCards .cardA8{background-position: -59.5vh -34.5vh;}
.myCards .cardA9{background-position: -68vh -34.5vh;}
.myCards .cardA10{background-position: -76.5vh -34.5vh;}
.myCards .cardA11{background-position: -85vh -34.5vh;}
.myCards .cardA12{background-position: -93.5vh -34.5vh;}
.myCards .cardA13{background-position: -102vh -34.5vh;}
.myCards .cardB1{background-position: 0 -23vh;}
.myCards .cardB2{background-position: -8.5vh -23vh;}
.myCards .cardB3{background-position: -17vh -23vh;}
.myCards .cardB4{background-position: -25.5vh -23vh;}
.myCards .cardB5{background-position: -34vh -23vh;}
.myCards .cardB6{background-position: -42.5vh -23vh;}
.myCards .cardB7{background-position: -51vh -23vh;}
.myCards .cardB8{background-position: -59.5vh -23vh;}
.myCards .cardB9{background-position: -68vh -23vh;}
.myCards .cardB10{background-position: -76.5vh -23vh;}
.myCards .cardB11{background-position: -85vh -23vh;}
.myCards .cardB12{background-position: -93.5vh -23vh;}
.myCards .cardB13{background-position: -102vh -23vh;}
.myCards .cardC1{background-position: 0 0;}
.myCards .cardC2{background-position: -8.5vh 0;}
.myCards .cardC3{background-position: -17vh 0;}
.myCards .cardC4{background-position: -25.5vh 0;}
.myCards .cardC5{background-position: -34vh 0;}
.myCards .cardC6{background-position: -42.5vh 0;}
.myCards .cardC7{background-position: -51vh 0;}
.myCards .cardC8{background-position: -59.5vh 0;}
.myCards .cardC9{background-position: -68vh 0;}
.myCards .cardC10{background-position: -76.5vh 0;}
.myCards .cardC11{background-position: -85vh 0;}
.myCards .cardC12{background-position: -93.5vh 0;}
.myCards .cardC13{background-position: -102vh 0;}
.myCards .cardD1{background-position: 0 -11.5vh;}
.myCards .cardD2{background-position: -8.5vh -11.5vh;}
.myCards .cardD3{background-position: -17vh -11.5vh;}
.myCards .cardD4{background-position: -25.5vh -11.5vh;}
.myCards .cardD5{background-position: -34vh -11.5vh;}
.myCards .cardD6{background-position: -42.5vh -11.5vh;}
.myCards .cardD7{background-position: -51vh -11.5vh;}
.myCards .cardD8{background-position: -59.5vh -11.5vh;}
.myCards .cardD9{background-position: -68vh -11.5vh;}
.myCards .cardD10{background-position: -76.5vh -11.5vh;}
.myCards .cardD11{background-position: -85vh -11.5vh;}
.myCards .cardD12{background-position: -93.5vh -11.5vh;}
.myCards .cardD13{background-position: -102vh -11.5vh;}
.myCards .cardE1{background-position: 0 -46vh;}
.myCards .cardE2{background-position: -8.5vh -46vh;}
.myCards .cardE3{background-position: -17vh -46vh;}
.myCards .cardE4{background-position: -25.5vh -46vh;}
.myCards .cardE5{background-position: -34vh -46vh;}
.myCards .cardE6{background-position: -42.5vh -46vh;}
.myCards .cardE7{background-position: -51vh -46vh;}
.myCards .cardE8{background-position: -59.5vh -46vh;}
.myCards .cardE9{background-position: -68vh -46vh;}
.myCards .cardE10{background-position: -76.5vh -46vh;}
.myCards .cardE11{background-position: -85vh -46vh;}
.myCards .cardE12{background-position: -93.5vh -46vh;}
.myCards .cardE13{background-position: -102vh -46vh;}
.myCards .cardS1{background: url("../images/pai/cardS1.png")0 0/100% 100%;}
.myCards .cardS2{background: url("../images/pai/cardS2.png")0 0/100% 100%;}
.myCards .cardS3{background: url("../images/pai/cardS3.png")0 0/100% 100%;}
.myCards .cardS4{background: url("../images/pai/cardS4.png")0 0/100% 100%;}
.myCards .cardS5{background: url("../images/pai/cardS5.png")0 0/100% 100%;}
.myCards .cardS6{background: url("../images/pai/cardS6.png")0 0/100% 100%;}
.myCards .cardS7{background: url("../images/pai/cardS7.png")0 0/100% 100%;}
.myCards .cardS8{background: url("../images/pai/cardS8.png")0 0/100% 100%;}
.myCards .cardS9{background: url("../images/pai/cardS9.png")0 0/100% 100%;}
.myCards .cardS10{background: url("../images/pai/cardS10.png")0 0/100% 100%;}
.myCards .cardS11{background: url("../images/pai/cardS11.png")0 0/100% 100%;}
.myCards .cardS12{background: url("../images/pai/cardS12.png")0 0/100% 100%;}
.myCards .cardS13{background: url("../images/pai/cardS13.png")0 0/100% 100%;}
.myCards .cardT1{background: url("../images/pai/cardT1.png")0 0/100% 100%;}
.myCards .cardT2{background: url("../images/pai/cardT2.png")0 0/100% 100%;}
.myCards .cardT3{background: url("../images/pai/cardT3.png")0 0/100% 100%;}
.myCards .cardT4{background: url("../images/pai/cardT4.png")0 0/100% 100%;}
.myCards .cardT5{background: url("../images/pai/cardT5.png")0 0/100% 100%;}
.myCards .cardT6{background: url("../images/pai/cardT6.png")0 0/100% 100%;}
.myCards .cardT7{background: url("../images/pai/cardT7.png")0 0/100% 100%;}
.myCards .cardT8{background: url("../images/pai/cardT8.png")0 0/100% 100%;}
.myCards .cardT9{background: url("../images/pai/cardT9.png")0 0/100% 100%;}
.myCards .cardT10{background: url("../images/pai/cardT10.png")0 0/100% 100%;}
.myCards .cardT11{background: url("../images/pai/cardT11.png")0 0/100% 100%;}
.myCards .cardT12{background: url("../images/pai/cardT12.png")0 0/100% 100%;}
.myCards .cardT13{background: url("../images/pai/cardT13.png")0 0/100% 100%;}

.myCards .cardF1{background: url("../images/pai/cardF1.png")0 0/100% 100%;}
.myCards .cardF2{background: url("../images/pai/cardF2.png")0 0/100% 100%;}
.myCards .cardF3{background: url("../images/pai/cardF3.png")0 0/100% 100%;}
.myCards .cardF4{background: url("../images/pai/cardF4.png")0 0/100% 100%;}
.myCards .cardF5{background: url("../images/pai/cardF5.png")0 0/100% 100%;}
.myCards .cardF6{background: url("../images/pai/cardF6.png")0 0/100% 100%;}
.myCards .cardF7{background: url("../images/pai/cardF7.png")0 0/100% 100%;}
.myCards .cardF8{background: url("../images/pai/cardF8.png")0 0/100% 100%;}
.myCards .cardF9{background: url("../images/pai/cardF9.png")0 0/100% 100%;}
.myCards .cardF10{background: url("../images/pai/cardF10.png")0 0/100% 100%;}
.myCards .cardF11{background: url("../images/pai/cardF11.png")0 0/100% 100%;}
.myCards .cardF12{background: url("../images/pai/cardF12.png")0 0/100% 100%;}
.myCards .cardF13{background: url("../images/pai/cardF13.png")0 0/100% 100%;}
.myCards .cardG1{background: url("../images/pai/cardG1.png")0 0/100% 100%;}
.myCards .cardG2{background: url("../images/pai/cardG2.png")0 0/100% 100%;}
.myCards .cardG3{background: url("../images/pai/cardG3.png")0 0/100% 100%;}
.myCards .cardG4{background: url("../images/pai/cardG4.png")0 0/100% 100%;}
.myCards .cardG5{background: url("../images/pai/cardG5.png")0 0/100% 100%;}
.myCards .cardG6{background: url("../images/pai/cardG6.png")0 0/100% 100%;}
.myCards .cardG7{background: url("../images/pai/cardG7.png")0 0/100% 100%;}
.myCards .cardG8{background: url("../images/pai/cardG8.png")0 0/100% 100%;}
.myCards .cardG9{background: url("../images/pai/cardG9.png")0 0/100% 100%;}
.myCards .cardG10{background: url("../images/pai/cardG10.png")0 0/100% 100%;}
.myCards .cardG11{background: url("../images/pai/cardG11.png")0 0/100% 100%;}
.myCards .cardG12{background: url("../images/pai/cardG12.png")0 0/100% 100%;}
.myCards .cardG13{background: url("../images/pai/cardG13.png")0 0/100% 100%;}


/*搓牌定位样式*/
.allow-rubcard .card{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.allow-rubcard .cardundefined{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.allow-rubcard .card-1{background: url("../images/common/card14.png");background-size:8.5vh 11.5vh;}
.allow-rubcard .cardA1{background-position: 0 -34.5vh;}
.allow-rubcard .cardA2{background-position: -8.5vh -34.5vh;}
.allow-rubcard .cardA3{background-position: -17vh -34.5vh;}
.allow-rubcard .cardA4{background-position: -25.5vh -34.5vh;}
.allow-rubcard .cardA5{background-position: -34vh -34.5vh;}
.allow-rubcard .cardA6{background-position: -42.5vh -34.5vh;}
.allow-rubcard .cardA7{background-position: -51vh -34.5vh;}
.allow-rubcard .cardA8{background-position: -59.5vh -34.5vh;}
.allow-rubcard .cardA9{background-position: -68vh -34.5vh;}
.allow-rubcard .cardA10{background-position: -76.5vh -34.5vh;}
.allow-rubcard .cardA11{background-position: -85vh -34.5vh;}
.allow-rubcard .cardA12{background-position: -93.5vh -34.5vh;}
.allow-rubcard .cardA13{background-position: -102vh -34.5vh;}
.allow-rubcard .cardB1{background-position: 0 -23vh;}
.allow-rubcard .cardB2{background-position: -8.5vh -23vh;}
.allow-rubcard .cardB3{background-position: -17vh -23vh;}
.allow-rubcard .cardB4{background-position: -25.5vh -23vh;}
.allow-rubcard .cardB5{background-position: -34vh -23vh;}
.allow-rubcard .cardB6{background-position: -42.5vh -23vh;}
.allow-rubcard .cardB7{background-position: -51vh -23vh;}
.allow-rubcard .cardB8{background-position: -59.5vh -23vh;}
.allow-rubcard .cardB9{background-position: -68vh -23vh;}
.allow-rubcard .cardB10{background-position: -76.5vh -23vh;}
.allow-rubcard .cardB11{background-position: -85vh -23vh;}
.allow-rubcard .cardB12{background-position: -93.5vh -23vh;}
.allow-rubcard .cardB13{background-position: -102vh -23vh;}
.allow-rubcard .cardC1{background-position: 0 0;}
.allow-rubcard .cardC2{background-position: -8.5vh 0;}
.allow-rubcard .cardC3{background-position: -17vh 0;}
.allow-rubcard .cardC4{background-position: -25.5vh 0;}
.allow-rubcard .cardC5{background-position: -34vh 0;}
.allow-rubcard .cardC6{background-position: -42.5vh 0;}
.allow-rubcard .cardC7{background-position: -51vh 0;}
.allow-rubcard .cardC8{background-position: -59.5vh 0;}
.allow-rubcard .cardC9{background-position: -68vh 0;}
.allow-rubcard .cardC10{background-position: -76.5vh 0;}
.allow-rubcard .cardC11{background-position: -85vh 0;}
.allow-rubcard .cardC12{background-position: -93.5vh 0;}
.allow-rubcard .cardC13{background-position: -102vh 0;}
.allow-rubcard .cardD1{background-position: 0 -11.5vh;}
.allow-rubcard .cardD2{background-position: -8.5vh -11.5vh;}
.allow-rubcard .cardD3{background-position: -17vh -11.5vh;}
.allow-rubcard .cardD4{background-position: -25.5vh -11.5vh;}
.allow-rubcard .cardD5{background-position: -34vh -11.5vh;}
.allow-rubcard .cardD6{background-position: -42.5vh -11.5vh;}
.allow-rubcard .cardD7{background-position: -51vh -11.5vh;}
.allow-rubcard .cardD8{background-position: -59.5vh -11.5vh;}
.allow-rubcard .cardD9{background-position: -68vh -11.5vh;}
.allow-rubcard .cardD10{background-position: -76.5vh -11.5vh;}
.allow-rubcard .cardD11{background-position: -85vh -11.5vh;}
.allow-rubcard .cardD12{background-position: -93.5vh -11.5vh;}
.allow-rubcard .cardD13{background-position: -102vh -11.5vh;}
.allow-rubcard .cardE1{background-position: 0 -46vh;}
.allow-rubcard .cardE2{background-position: -8.5vh -46vh;}
.allow-rubcard .cardE3{background-position: -17vh -46vh;}
.allow-rubcard .cardE4{background-position: -25.5vh -46vh;}
.allow-rubcard .cardE5{background-position: -34vh -46vh;}
.allow-rubcard .cardE6{background-position: -42.5vh -46vh;}
.allow-rubcard .cardE7{background-position: -51vh -46vh;}
.allow-rubcard .cardE8{background-position: -59.5vh -46vh;}
.allow-rubcard .cardE9{background-position: -68vh -46vh;}
.allow-rubcard .cardE10{background-position: -76.5vh -46vh;}
.allow-rubcard .cardE11{background-position: -85vh -46vh;}
.allow-rubcard .cardE12{background-position: -93.5vh -46vh;}
.allow-rubcard .cardE13{background-position: -102vh -46vh;}
.allow-rubcard .cardS1{background: url("../images/pai/cardS1.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS2{background: url("../images/pai/cardS2.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS3{background: url("../images/pai/cardS3.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS4{background: url("../images/pai/cardS4.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS5{background: url("../images/pai/cardS5.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS6{background: url("../images/pai/cardS6.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS7{background: url("../images/pai/cardS7.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS8{background: url("../images/pai/cardS8.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS9{background: url("../images/pai/cardS9.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS10{background: url("../images/pai/cardS10.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS11{background: url("../images/pai/cardS11.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS12{background: url("../images/pai/cardS12.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardS13{background: url("../images/pai/cardS13.png?v=2019")0 0/100% 100%;}
.allow-rubcard .cardT1{background: url("../images/pai/cardT1.png")0 0/100% 100%;}
.allow-rubcard .cardT2{background: url("../images/pai/cardT2.png")0 0/100% 100%;}
.allow-rubcard .cardT3{background: url("../images/pai/cardT3.png")0 0/100% 100%;}
.allow-rubcard .cardT4{background: url("../images/pai/cardT4.png")0 0/100% 100%;}
.allow-rubcard .cardT5{background: url("../images/pai/cardT5.png")0 0/100% 100%;}
.allow-rubcard .cardT6{background: url("../images/pai/cardT6.png")0 0/100% 100%;}
.allow-rubcard .cardT7{background: url("../images/pai/cardT7.png")0 0/100% 100%;}
.allow-rubcard .cardT8{background: url("../images/pai/cardT8.png")0 0/100% 100%;}
.allow-rubcard .cardT9{background: url("../images/pai/cardT9.png")0 0/100% 100%;}
.allow-rubcard .cardT10{background: url("../images/pai/cardT10.png")0 0/100% 100%;}
.allow-rubcard .cardT11{background: url("../images/pai/cardT11.png")0 0/100% 100%;}
.allow-rubcard .cardT12{background: url("../images/pai/cardT12.png")0 0/100% 100%;}
.allow-rubcard .cardT13{background: url("../images/pai/cardT13.png")0 0/100% 100%;}

.allow-rubcard .cardF1{background: url("../images/pai/cardF1.png")0 0/100% 100%;}
.allow-rubcard .cardF2{background: url("../images/pai/cardF2.png")0 0/100% 100%;}
.allow-rubcard .cardF3{background: url("../images/pai/cardF3.png")0 0/100% 100%;}
.allow-rubcard .cardF4{background: url("../images/pai/cardF4.png")0 0/100% 100%;}
.allow-rubcard .cardF5{background: url("../images/pai/cardF5.png")0 0/100% 100%;}
.allow-rubcard .cardF6{background: url("../images/pai/cardF6.png")0 0/100% 100%;}
.allow-rubcard .cardF7{background: url("../images/pai/cardF7.png")0 0/100% 100%;}
.allow-rubcard .cardF8{background: url("../images/pai/cardF8.png")0 0/100% 100%;}
.allow-rubcard .cardF9{background: url("../images/pai/cardF9.png")0 0/100% 100%;}
.allow-rubcard .cardF10{background: url("../images/pai/cardF10.png")0 0/100% 100%;}
.allow-rubcard .cardF11{background: url("../images/pai/cardF11.png")0 0/100% 100%;}
.allow-rubcard .cardF12{background: url("../images/pai/cardF12.png")0 0/100% 100%;}
.allow-rubcard .cardF13{background: url("../images/pai/cardF13.png")0 0/100% 100%;}
.allow-rubcard .cardG1{background: url("../images/pai/cardG1.png")0 0/100% 100%;}
.allow-rubcard .cardG2{background: url("../images/pai/cardG2.png")0 0/100% 100%;}
.allow-rubcard .cardG3{background: url("../images/pai/cardG3.png")0 0/100% 100%;}
.allow-rubcard .cardG4{background: url("../images/pai/cardG4.png")0 0/100% 100%;}
.allow-rubcard .cardG5{background: url("../images/pai/cardG5.png")0 0/100% 100%;}
.allow-rubcard .cardG6{background: url("../images/pai/cardG6.png")0 0/100% 100%;}
.allow-rubcard .cardG7{background: url("../images/pai/cardG7.png")0 0/100% 100%;}
.allow-rubcard .cardG8{background: url("../images/pai/cardG8.png")0 0/100% 100%;}
.allow-rubcard .cardG9{background: url("../images/pai/cardG9.png")0 0/100% 100%;}
.allow-rubcard .cardG10{background: url("../images/pai/cardG10.png")0 0/100% 100%;}
.allow-rubcard .cardG11{background: url("../images/pai/cardG11.png")0 0/100% 100%;}
.allow-rubcard .cardG12{background: url("../images/pai/cardG12.png")0 0/100% 100%;}
.allow-rubcard .cardG13{background: url("../images/pai/cardG13.png")0 0/100% 100%;}


/*癞子牌 */
.cardD0{background: url("../images/daoyou/bull/D0.png") !important;background-size:100% 100% !important;}
.cardE0{background: url("../images/daoyou/bull/E0.png")!important;background-size:100% 100% !important;}
.cardI0{background: url("../images/daoyou/bull/I0.png")!important;background-size:100% 100% !important;}
.cardJ0{background: url("../images/daoyou/bull/J0.png")!important;background-size:100% 100% !important;}
.cardK0{background: url("../images/daoyou/bull/K0.png")!important;background-size:100% 100% !important;}
.cardL0{background: url("../images/daoyou/bull/L0.png")!important;background-size:100% 100% !important;}
.cardO0{background: url("../images/daoyou/bull/O0.png")!important;background-size:100% 100% !important;}
.cardP0{background: url("../images/daoyou/bull/P0.png")!important;background-size:100% 100% !important;}
.cardQ0{background: url("../images/daoyou/bull/Q0.png")!important;background-size:100% 100% !important;}
.cardR0{background: url("../images/daoyou/bull/R0.png")!important;background-size:100% 100% !important;}

.cardF0{background: url("../images/daoyou/bull/F0.png")!important;background-size:100% 100% !important;}
.cardG0{background: url("../images/daoyou/bull/G0.png")!important;background-size:100% 100% !important;}
.cardH0{background: url("../images/daoyou/bull/H0.png")!important;background-size:100% 100% !important;}
.cardN0{background: url("../images/daoyou/bull/N0.png")!important;background-size:100% 100% !important;}
.cardU0{background: url("../images/daoyou/bull/U0.png")!important;background-size:100% 100% !important;}
.cardV0{background: url("../images/daoyou/bull/V0.png")!important;background-size:100% 100% !important;}
.cardW0{background: url("../images/daoyou/bull/W0.png")!important;background-size:100% 100% !important;}
.cardX0{background: url("../images/daoyou/bull/X0.png")!important;background-size:100% 100% !important;}
.cardY0{background: url("../images/daoyou/bull/Y0.png")!important;background-size:100% 100% !important;}
.cardZ0{background: url("../images/daoyou/bull/Z0.png")!important;background-size:100% 100% !important;}

/*搓牌样式*/
.allow-rubcard {
  position: fixed;
  left: 50%;
  bottom: 30%;
  z-index: 999;
  margin-left: -0.2280rem;
  width: 8.5vh;
  height: 11.5vh;
  -webkit-transform: scale(2.5);
  -moz-transform: scale(2.5);
  -ms-transform: scale(2.5);
  -o-transform: scale(2.5);
  transform: scale(2.5);
}
.cuocard {
  width: 100%;
  height: 100%;
}
.cuocard {
  box-sizing: border-box;
  position: absolute;
  transition: transform 0.5s;
  width: 8.5vh;
  height: 11.5vh;
  border: .0048rem solid #727c89;
  border-radius: .0480rem;
  background-color: #ffffff;
  background: url("../images/common/cards4.png");
  background-repeat: no-repeat;
  background-size: 110.4vh 57.5vh;
}

.cuopai {
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: transform 0.5s;
  transition: transform 0.5s;
  -webkit-transform-origin: 0rem 100% 0rem;
  transform-origin: 0rem 100% 0rem;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  background-image: url("../images/common/card14.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
/*自己牌，发完之后*/
.myCards .card0{top: 0;left: 28%;margin-left: -3.4vh;}
.myCards .card1{top: 0;left: 43%;margin-left: -3.4vh;}
.myCards .card2{top: 0;left: 58%;margin-left: -3.4vh;}
.myCards .card3{top: 0;left: 73%;margin-left: -3.4vh;}
.myCards .card4{top: 0;left: 88%;margin-left: -3.4vh;}

/*自己牌，摊牌之后*/
.myCards .card00{top: 0;left: 28%;margin-left: -3.4vh;}
.myCards .card01{top: 0;left: 43%;margin-left: -3.4vh;}
.myCards .card02{top: 0;left: 58%;margin-left: -3.4vh;}
.myCards .card03{top: 0;left: 73%;margin-left: -3.4vh;}
.myCards .card04{top: 0;left: 88%;margin-left: -3.4vh;}

.cardOver1{display: none;}
.cardOver2{right: 0;}
.cardOver3{right: 0;}
.cardOver4{left: -14px;}
.cardOver5{left:0;}
.cardOver6{left:0;}


.ranking{position: absolute;width: 200%;height:200%;top:0;left:0;display:none;}
.ranking .roundEndShow{display: none;}
.ranking .rankBack{width: 100%;height:100%;background: #000;opacity:1.0}
.ranking .rankBack .bg{position: absolute;width: 100%;height:100%;background: #000;opacity:1.0}
.ranking .rankText{width: 100%;position: absolute;top:10%;left: 0;}
.ranking .rankText .title{width: 100%;}
.ranking .rankText .time{text-align: center;margin-top: 24px;margin-bottom: 20px;}
.ranking .rankText .time a{border-radius: 5vw;border: 2px solid #f7d92b;color:#f7d92b;padding: 1vw 4vw;width: 400px;font-size: 6vw;}
.ranking .rankText .scoresItem{overflow: visible;width: 60%;margin:0 auto; margin-top: 10px;height:60px;line-height:60px;font-size:26px;position: relative;background-color: #1b160c; }
.ranking .rankText .scoresItemWhite{color:#fff; }
.ranking .rankText .scoresItemWhite a{color:#fff; }
.ranking .rankText .scoresItemYellow{color:#f7d92b;}
.ranking .rankText .scoresItemYellow a{color:#f7d92b;}
.ranking .rankText .scoresItem .avatar{
    height:90%;
    top:5%;
    border-radius:3px;
    position:absolute;
    left: 16%;
  }
.ranking .rankText .scoresItem .name{left: 30%;width: 50%;height: 24vw;overflow: hidden;word-break:break-all;position: absolute;top:0;}
.ranking .rankText .scoresItem .currentScores{width:25%;text-align: left;position: absolute;right: 0;top:0;}
.ranking  .button{width:100%;position: absolute;bottom:12%; }
.ranking  .button img{width:33%;}

/* 玩家消息 */
/*.message{position: fixed;width: 100%;height:100%;top:0;left:0;z-index: 112;}
.message .messageBack{width: 100%;height:100%;}
.message .textPart{width: 100%;position: absolute;left: 0;bottom:0;height:0; }
.message .textPart .head{width: 100%;}
.message .textPart .head img{width: 100%;height: 30px;}
.message .textPart .textItem{width: 80%;height: 40px;line-height: 40px;font-size: 14px;background: #150e2d;border-bottom:1px solid #322b4c;color:#bbb;padding:0 10%; }*/

.message{position: fixed;width: 100%;height:100%;z-index: 110;top:0;left:0;}
.message .messageBack{width: 100%;height:100%;position: absolute;top:0;left:0;}
/*.message .textPart{position: absolute;width: 34vh;height:40vh;bottom:7vh;right:2vh;padding:1.5vh; } */
.message .textPartOuter{position: absolute;width: 34vh;height:40vh;bottom:7vh;right:2vh;padding: 1vh 1vh 1vh 1vh;border: 0.2vh solid #a684f2;background: #634fa6;border-radius: 1vh;}
.message .textPart{position: absolute;width: 34vh;height:40vh;bottom:8.5vh;right:3.2vh;overflow: hidden;}
.message .textPart .outline{position: absolute;background: #634fa6;opacity: 1;width: 98%;height:100%;border:0.2vh solid #a684f2;border-radius:10px;top:-0.5vh;left: .5%;}
/*.message .textPart .textList {border:1px solid #a684f2;position: relative;height:39vh;overflow: auto;}*/
.message .textPart .textList {border:1px solid #a684f2;position: relative;}
.message .textPart .textList .textItem{width: 90%;height: 6vh;line-height: 6vh;font-size: 2.1vh;background: #150e2d;border-bottom:1px solid #666;color:#fff;padding:0 5%;position: relative;font-family: simHei;}

.erweima{position: fixed;width: 100%;height:100%;top:0;left:0;z-index: 109;}
.erweima .inviteBack{width: 100%;height:100%;background: #000;opacity:0.8;position: absolute;}
.erweima .inviteText{margin: 0 auto;margin-top:30%;width:300px;line-height: 40px;font-size: 18px;color: #fff;font-family: simHei;position: relative;}
.erweima .inviteText .invite1{width: 60px;position: absolute; top:240px;left: 140px;}

.createRoom{position: fixed;width: 100%;height:100%;top:0;left:0;z-index: 109;}
.createRoom .createRoomBack{width: 100%;height:100%;background: #000;opacity:0.6;}
.createRoom .mainPart{width: 45vh;height:65vh;top:44%;left:50%;margin-top:-30vh;margin-left: -22.5vh;position: absolute;}
.createRoom .mainPart .createB{width: 100%;height:100%;top:0%;left:0%;position: absolute;background:#634fa6;border:1px solid #a684f2;border-radius:10px; }
.createRoom .mainPart .createTitle{position:relative;height:5vh;text-align: center;}
.createRoom .mainPart .createTitle img{position:relative;height:2.6vh;margin-top: 1.2vh;}
.createRoom .mainPart .cancelCreate{width: 5vh;height:5vh;top:-2.5vh;right:-2.5vh;position: absolute;}
.createRoom .mainPart .createCommit{position: absolute;line-height: 5.5vh;height: 5.5vh;font-size: 2.5vh;width: 17vh;left:50%;margin-left:-8.5vh;bottom:-7vh;text-align: center;background:url("../images/common/button2.png");background-size:100%;color: #fff;}
.createRoom .mainPart .blueBack{width: 42vh;height: 46vh;background:#111431;border:1px solid #a684f2;border-radius:4px;margin:0 auto;position: relative; }
.createRoom .mainPart .blueBack .selectPart{width:100%;margin-top:4px;line-height:36px;font-size:2vh;position: relative;color:#111431;background:#bbbff1;border-radius:0px;font-family:simHei; }
.createRoom .mainPart .blueBack .selectPart .selectTitle{float: left;width:8vh;text-align: right; }
.createRoom .mainPart .blueBack .selectPart .selectList{float: left; width: 34vh}
.createRoom .mainPart .blueBack .selectPart .selectList .selectItem{float: left;position:relative;margin-left:25px; }
.createRoom .mainPart .blueBack .selectPart .selectList .selectItem .selectBox{float: left;height:2vh;width:2vh;border:1px solid #1d1045;border-radius:2px;background:#78899d;margin-top:0.7vh;position: relative; }
.createRoom .mainPart .blueBack .selectPart .selectList .selectItem img{position: absolute;width: 2vh;height:2vh;left: 0;top:0.7vh;}
.createRoom .mainPart .blueBack .selectPart .selectList .selectItem .selectText{float: left;margin-left: 0.8vh;}

.bankerSelected{position: absolute;width: 8.1vh;height: 5.5vh;border-style: solid;border-width: 0px;border-color: #392c62;color: #653604;text-align: center;font-size: 1.7vh;overflow: hidden;}
.bankerSelected .img{position: absolute;top: 0;left: 0;width:  8.1vh;height: 5.5vh;border-style: solid;border-width: 0.5px;border-color: #392c62;}
.bankerUnSelected{position: absolute;width:  8.1vh;height: 5.5vh;border-style: solid;border-width: 0px;border-color: #e8c007;color: #9a6b3a;text-align: center;font-size: 1.7vh;overflow: hidden;}
.bankerUnSelected .img{position: absolute;top: 0;left: 0;width:  8.1vh;height: 5.5vh;border-style: solid;border-width: 0.5px;border-color: #e8c007;}


.audioRoom{position: fixed;width: 100%;height:100%;top:0;left:0;z-index: 109;}
.audioRoom .audioRoomBack{width: 100%;height:100%;background: #000;opacity:0.6;}
.audioRoom .mainPart{width: 38vh;height:27vh;top:44%;left:50%;margin-top:-16vh;margin-left: -19vh;position: absolute;}
.audioRoom .mainPart .createB{width: 100%;height:100%;top:0%;left:0%;position: absolute;background:#634fa6;border:1px solid #a684f2;border-radius:10px; }
.audioRoom .mainPart .createTitle{position:relative;height:5vh;text-align: center;}
.audioRoom .mainPart .createTitle img{position:relative;height:2.6vh;margin-top: 1.2vh;}
.audioRoom .mainPart .cancelCreate{width: 5vh;height:5vh;top:-2.5vh;right:-2.5vh;position: absolute;}
.audioRoom .mainPart .createCommit{position: absolute;line-height: 5.5vh;height: 5.5vh;font-size: 2.5vh;width: 17vh;left:50%;margin-left:-8.5vh;bottom:-7vh;text-align: center;background:url("../images/common/button2.png");background-size:100%;color: #fff;}
.audioRoom .mainPart .blueBack{width: 35vh;height: 14vh;background:#111431;border:1px solid #a684f2;border-radius:4px;margin:0 auto;position: relative; }
.audioRoom .mainPart .blueBack .selectPart{width:100%;margin-top:4px;line-height:36px;font-size:2.2vh;position: relative;color:#111431;background:#bbbff1;border-radius:0px;font-family:simHei; }
.audioRoom .mainPart .blueBack .selectPart .selectTitle{float: left;width:13vh;text-align: right; }
.audioRoom .mainPart .blueBack .selectPart .selectList{float: right; width: 20vh}
.audioRoom .mainPart .blueBack .selectPart .selectList .selectItem{float: left;position:relative;margin-left:25px; }
.audioRoom .mainPart .blueBack .selectPart .selectList .selectItem .selectBox{float: left;height:2.2vh;width:2.2vh;border:1px solid #1d1045;border-radius:2px;background:#78899d;margin-top:0.7vh;position: relative; }
.audioRoom .mainPart .blueBack .selectPart .selectList .selectItem img{position: absolute;width: 2.8vh;height:2.8vh;left: 0;top:0;}
.audioRoom .mainPart .blueBack .selectPart .selectList .selectItem .selectText{float: left;margin-left: 0.8vh;}

.playerPK .pkE{width: 300px;position: absolute;top: 50%;left: 50%; transform: translate(-50%,-50%) rotate(-45deg);}
.playerPK .pkV{width: 68px; position: absolute;top: 41%;left: 33%; animation:moveV .5s ;-webkit-animation:moveV .5s ;}
.playerPK .pkS{width: 48px; position: absolute;top: 50%;right: 36%;animation:moveS .5s ;-webkit-animation:moveS .5s ;}

@keyframes moveV{0%{left:15%;top:60%;;width:120px;} 50%{left:15%;top:60%;;width:120px;} 100%{left:33%;top:41%;width:68px;}}
@-webkit-keyframes moveV{0%{left:15%;top:60%;;width:120px;} 50%{left:15%;top:60%;;width:120px;} 100%{left:33%;top:41%;width:68px;}}
@keyframes moveS{0%{right:15%;top:20%;;width:120px;}50%{right:15%;top:20%;;width:120px;}100%{right:36%;top:50%;width:48px;}}
@-webkit-keyframes moveS{0% {right:20%;top:20%;;width:120px;}50% {right:20%;top:20%;;width:120px;}100%{right:36%;top:50%;width:48px;}}

.showOnceIndiv{
    width: 2.2rem;height: 1.1rem;position: fixed;z-index: 200;top: 18vh;left: 50%; margin-left: -1.1rem;animation:indivOnce 0.8s ;-webkit-animation:indivOnce 0.8s ;
}
@keyframes indivOnce{0%{transform: scale(0.5)} 70%{transform: scale(1.4)} 100%{transform: scale(1)}}
@-webkit-keyframes indivOnce{0%{transform: scale(0.5)} 70%{transform: scale(1.4)} 100%{transform: scale(1)}}


</style>


`


document.write(bull23_css)