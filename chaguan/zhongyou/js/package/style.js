var header_css = `
<style>
        .black {
            -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
            filter: grayscale(100%);
        }
        .phone-number-box {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 100;
            background-color: rgba(0, 0, 0, .2);
        }

        .phone-number-box input {
            border: none;
            outline: none;
            background: none;
        }

        .phone-number-box .phone-number {
            position: absolute;
            left: 0;
            top: 50%;
            right: 0;
            margin: auto;
            width: 7.5rem;
            height: 7rem;
            background: url(`+data.file_url+`files/images/daoyou/joinroom/bg.png) no-repeat;
            background-size: 100% 100%;
        }

        .phone-number-box .phone-number-content {
            margin: .0720rem;
        }

        .phone-number-box .phone-number .tips-text {
            position: relative;
            height: 0.5rem;
        }

        .phone-number-box .phone, .phone-number-box .phone-code {
            left: 0;
            right: 0;
            margin: 0 auto;
            width: 86%;
            height: 1rem;
        }

        .phone-number-box .phone {
            background: url(`+data.file_url+`files/images/daoyou/joinroom/num.png) no-repeat;
            background-size: 100% 100%;
        }

        .phone-number-box .phone .enterNumBox {
            display: flex;
            padding: 0 5%;
        }

        .phone-number-box .phone .enterNumBox .enterNum {
            flex: 1;
            text-align: center;
            height: 1rem;
            line-height: 1rem;
            font-size: 0.7rem;
            color: #fff;
        }

        .phone-number-box .num-box {
            margin-top: 0.6rem;
            padding: 0 0.4rem 0.2rem 0.4rem;
        }

        .phone-number-box .num-box .line {
            display: flex;
            margin-top: 0.35rem;
        }

        .phone-number-box .num-box .line .lineNum {
            flex: 1;
            width: 1;
            height: 0.9rem;
            margin-right: 0.2rem;
        }

        .phone-number-box .phone-code {
            top: 1.0560rem;
        }

        .phone-number-box .phone-code input, .phone-number-box .phone input {
            position: absolute;
            width: 100%;
            height: 1rem;
            background: #ebc1a8;
            padding: 0 .1440rem;
            -webkit-border-radius: .2rem;
            -moz-border-radius: .2rem;
            border-radius: .2rem;
            color: #fff;
            font-size: 0.4rem;
        }

        input::-webkit-input-placeholder {
            color: #fff;
            opacity: 1;
        }

        .phone-number-box .phone-code input {
            padding-right: 1.2000rem;
        }

        .phone-number-box .phone-btn2, .phone-number-box .phone-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: .9120rem;
            height: .3840rem;
            line-height: .3840rem;
            vertical-align: middle;
            text-align: center;
            color: #fff;
            font-size: .132rem;
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
            margin-bottom: 0.5rem;
        }

        .phone-number-box .close-window {
            position: absolute;
            top: -0.5rem;
            right: -0.5rem;
            width: 1.2rem;
            height: 1.2rem;
            background: url(`+data.file_url+`files/images/daoyou/joinroom/close.png) no-repeat 0 0 / 100% 100%;
        }
    </style>

`


document.write(header_css)