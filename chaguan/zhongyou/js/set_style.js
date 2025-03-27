var set_css = `<style>`+
    `
        .a {
            width: 100%;
            height: 100%;
            position: fixed;
            top:0;
            left:0;
            background: url(`+data.cfile_url+`files/images/hall/bj.jpg?v=1);
            background-size:100vw 100vh;
        }
        
        .b {
            width: 100%;
            height: 100%;
            position: fixed;
            top:0;
            left:0;
            background: url(`+data.file_url+`files/images/daoyou/page/bg.jpg);
            background-size:100vw 100vh;
        }
        
        .c {
            background: url(`+data.file_url+`files/images/daoyou/hall/btn_copy.png);
            background-size: 100% 100%;
            color: #000;
            padding: 2px 4px;
        }
        
        .d {
            width: 80vw;
            background: url(`+data.file_url+`files/images/daoyou/indiv/box.png);
            background-size: 100% 100%;
        }
        
        .e {
            height: 50vw;
            background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); 
            background-size: 100% 100%; 
        }
        
        .f {
            height: 100vw;
            background: url(`+data.file_url+`files/images/daoyou/common/back_home_box.png) no-repeat;
            background-size: 100% 100%;
        }
        
        .g {
            width: 30vw;
            height: 11vw;
            left: 25%;
            transform: translateX(-50%); 
            position: absolute;
            top: 82vw;
            margin-top: 0;
            background:url(`+data.file_url+`files/images/daoyou/hall/confirm.png);
            background-size: 100% 100%;
        }
        
        .h {
            background: url(`+data.file_url+`files/images/daoyou/hall/tip_setAccount_bg.png) no-repeat;
            background-size: 100% 100%; 
            position: fixed;
            top:35%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 120;
            width: 90vw;
            height: 26vh;
        }
        
        .i {
        width:100vw;
        position: fixed;
        height:18.5vw;
        top:0vw;
        left:0vw;
        z-index:99;
        background: url(`+data.cfile_url+`files/images/hall/header-bj.jpg) no-repeat center;
        background-size:100% 100%;
        }
        
        .j {
            background: url(`+data.file_url+`files/images/daoyou/hall/btn_copy.png);
            background-size: 100% 100%;
            color: #000;
            padding: 2px 4px;
        }
        
        
        .k {
            position: relative;
            color:#fff;
            font-size: 3.5vw;
            float: left;
            margin-left: 0vw;
            z-index: 49;
            margin-top:8.5vw;
             width: 19vw;
             height:6.5vw;
             line-height:6.5vw;
             text-align:center;
             background: url(`+data.cfile_url+`files/images/hall/card_bg.png);
             background-size: 100% 100%;
        }
        
        .l {
            font-size: 5.5vw;
            height: 11vh; 
            text-align: center;
            line-height: 13vh; 
            word-wrap: break-word;
            word-break: break-all;
            color: #fff;
            background: url(`+data.file_url+`files/images/daoyou/page/code_box_top.png);
            background-size: 100% 100%;
        }
        
        .m {
            background: url(`+data.file_url+`files/images/daoyou/page/code_box_center.png);
            background-size: 100% 100%;
        }

        .aa {
            position: relative; 
            height: 15vh; 
            font-size: 4vw;
            background: url(`+data.file_url+`files/images/daoyou/page/code_box_bottom.png);
            background-size: 100% 100%;
        }
        
        .bb {
        position: relative;
         height: 16vh; 
         font-size: 4vw;
         background: url(`+data.file_url+`files/images/daoyou/page/code_box_bottom.png);
         background-size: 100% 100%;
        }
        
        .cc {
            position: absolute; 
            height: 8vh;
            line-height: 8vh;
            text-align: center;
            width: 28vw;
            top: 50%;
            transform: translateY(-40%);
            left: 12vw; 
            font-size: 6vw;
            background: url(`+data.file_url+`files/images/daoyou/page/btn1.png);
            background-size: 100% 100%;
        }

        .dd {
        position: absolute; 
        height: 8vh;
        line-height: 8vh;
        text-align: center;
        width: 28vw;
        top: 50%;
        transform: translateY(-40%);
        right: 12vw; 
        font-size: 6vw;
        background: url(`+data.file_url+`files/images/daoyou/page/btn2.png);
        background-size: 100% 100%;
        }
        
        .ee{
        background: url(`+data.file_url+`files/images/daoyou/page/code_box_center.png);
        background-size: 100% 100%;
        }
        
        .ff{
            padding: 1vw;
            font-size: 0.4rem;
            height: 7vh;
            line-height: 8vh;
            overflow-wrap: break-word;
            word-break: break-all;
            color: #fff;
            background-color: white;
            background: url(`+data.file_url+`files/images/daoyou/page/code_box_top.png);
            background-size: 100% 100%;
        }
        
        
        .gg{
            position: absolute; 
            height: 5.5vh;
            text-align: center;
            width: 24vw;top: 50%;
            transform: translateY(-40%);
            left: 12vw; 
            font-size: 6vw;
            background: url(`+data.file_url+`files/images/daoyou/hall/cancel.png);
            background-size: 100% 100%;
        }
        
        .hh {
        position: absolute;
         height: 5.5vh;
         text-align: center;
         width: 24vw;
         top: 50%;
         transform: translateY(-40%);
         right: 12vw; 
         font-size: 6vw;
         background: url(`+data.file_url+`files/images/daoyou/hall/confirm.png);
         background-size: 100% 100%;
        }
        
        .ii {
            height: 100vw;
            background: url(`+data.file_url+`files/images/daoyou/common/back_home_box.png) no-repeat;
            background-size: 100% 100%;
        }
        
        .jj {
        width: 30vw;
        height: 11vw;
        left: 25%;
        transform: translateX(-50%); 
        position: absolute;
        top: 82vw;
        margin-top: 0;
        background:url(`+data.file_url+`files/images/daoyou/hall/confirm.png);
        background-size: 100% 100%;
        }
        
        .yy {
            position: fixed;
            top: 10%;
            background: url(`+data.file_url+`files/images/daoyou/hall/noty-bg.png);
            background-size: 100% 100%;
            width: 100vw;
            height: 4vh;
            line-height: 3.5vh;
            color: white;
            font-size: 2vh;
            overflow: hidden;
            z-index: 99;
        }
        
        .vv {
            position: relative;
            top: 1vh;
            left: 50%;
            transform: translateX(-50%); 
            width: 48vw;
            height: 6vh;
            line-height: 6vh;
            text-align: left;
            color: white;
            background: url(`+data.file_url+`files/images/daoyou/club/switch_bg.png);
            background-size: 100% 100%;
        }
        
        .tt {
        position: fixed;
        height: 8vh;
        width: 100vw;
        background: url(`+data.file_url+`files/images/daoyou/club/top_bg.png);
        background-size: 100% 100%;
        }
        
        .aaa {
        background: url(`+data.file_url+`files/images/daoyou/hall/bg.jpg);
        background-size: 100vw 100vh;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        }
        
        
        .bbb {
            position: absolute;
            right: 5vw; 
            width: 27vw;
            height: 13vw;
            background: url(`+data.file_url+`files/images/daoyou/page/btn_get_code.png);
            background-size: 100% 100%;
            border-radius: 10px;
        }
        
        .ccc {
        position: absolute;
        right: 5vw; 
        width: 27vw;
        height: 13vw;
        background: url(`+data.file_url+`files/images/daoyou/page/btn_get_code.png);
        background-size: 100% 100%;
        }
        
        
        .ddd {
        position: relative;
        width: 98%;
        margin-left: 1%;
        height: 16vw;
        line-height: 16vw;
        background:url(`+data.file_url+`files/images/daoyou/page/item-bg.png);
        background-size: 100% 100%;
        text-align: center;
        margin-top: 0.3vh;
        font-size: 18px;
        overflow:hidden;
        }
        
        .eee{
        width: 100%;padding: 0 0.25rem 0 0;left: 0px !important;text-indent: 0;background: url(`+data.file_url+`files/images/daoyou/hall/btnselect3.png) no-repeat;background-size: 100% 100%;
        }
        
        
        .fff{
            position: fixed;top: 8vh;display: flex;font-size: 16px; height: 5vh;line-height: 5vh; width: 100vw;color: #d3a4cd;background: url(`+data.file_url+`files/images/daoyou/club/room_title_bg.png);background-size: 100% 100%;
        }
        
        .hhh{
        position: absolute; right: 4vw; top: 1vw; width: 14vw; height: 6vw; line-height: 8vw; border-radius: 0.5vw; background: url(`+data.file_url+`files/images/daoyou/page/btn_kick.png);background-size: 100% 100%; text-align: center; font-size: 2vh; color: rgb(116, 51, 46);
        }
        
        .ggg {
        position: absolute; right: 20vw; top: 1vw; width: 14vw; height: 6vw; line-height: 8vw; border-radius: 0.5vw; background: url(`+data.file_url+`files/images/daoyou/page/btn_remark.png);background-size: 100% 100%; text-align: center; font-size: 2vh;
        }
		
		.setfff {
		position: absolute; right: 20vw; top: 9vw; width: 14vw; height: 6vw; line-height: 8vw; border-radius: 0.5vw; background: url(`+data.file_url+`files/images/daoyou/page/btn_score.png);background-size: 100% 100%; text-align: center; font-size: 2vh;
		}
        
        .yyy {
        position: absolute;top: 0;left: 0;margin-left: 0;width: 8vh;height: 8vh;border-radius: 1vh;background: url(`+data.file_url+`files/images/daoyou/page/avatar_box.png);background-size: 100% 100%;
        }

        .ttt {
        position: relative;width: 98%;margin-left: 1%;height: 16vw;line-height: 18vw;background:url(`+data.file_url+`files/images/daoyou/page/item-bg.png);background-size: 100% 100%;text-align: center;margin-top: 0.3vh;color: white;overflow:hidden;
        }
        .rrr{
        height: 50vw;background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); background-size: 100% 100%; 
        }
        
		.setting{
		height: 90%;background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); background-size: 100% 100%; 
		}
        
        .www{
        height: 50vw;background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); background-size: 100% 100%; 
        }
        
        .qqq{
        height: 50vw;background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); background-size: 100% 100%; 
        }
        
        .iii{
        height: 50vw;background: url(`+data.file_url+`files/images/daoyou/page/remark_bg.png); background-size: 100% 100%; 
        }
        .vvv{
        background: url(`+data.file_url+`files/images/daoyou/indiv/box.png);background-size: 100% 100%;
        }
        
        
        .ooo{
        width: 100%;padding: 0 0.25rem 0 0;left: 0px !important;text-indent: 0;background: url(`+data.file_url+`files/images/daoyou/hall/btnselect3.png) no-repeat;background-size: 100% 100%;
        }
        .ppp{
        width: 100%;padding: 0 0.25rem 0 0;left: 0px !important;text-indent: 0;background: url(`+data.file_url+`files/images/daoyou/hall/btnselect3.png) no-repeat;background-size: 100% 100%;
        }
    `
    +
    `</style>`


document.write(set_css)