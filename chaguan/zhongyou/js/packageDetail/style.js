var header_css = `

    <style>
        .pointBag {
        }
        #qrDiv,#qrImg{left:-1000%}
        .pointBox {
            filter: alpha(opacity=50); /*IE*/
            -moz-opacity: 50; /*FireFox*/
            opacity: 0.5;
            background: #000;
            border-radius: 8px;
            width: 160px;
            height: 160px;
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -80px;
            margin-top: -80px;
        }

        .pointIcon {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -42px;
            margin-top: -70px;
        }

        .pointTxt {
            position: fixed;
            top: 50%;
            left: 50%;
            text-align: center;
            color: #fff;
            font-size: 18px;
            margin-top: 30px;
            width: 160px;
            margin-left: -80px;
        }

        .pointIcon2 {
            position: fixed;
            top: 50%;
            left: 50%;
            float: left;
            margin-left: -50px;
            margin-top: -70px;
        }

        .copy-tip {
            background: rgba(0, 0, 0, .6);
            color: #fff;
            position: fixed;
            top: 50vh;
            font-size: .9rem;
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
            right: 0.5rem;
            width: 3rem;
            z-index: 89;
            top: 1rem;
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
            margin-top: 30px
        }

        #dialog img {
            position: absolute;
            top: -20px;
            right: -20px;
            width: 35px;
        }

        .btnOpen {
            position: absolute;
            width: 36vw;
            height: 17vh;
            left: 50%;
            top: 48vh;
            transform: translateX(-50%);
            animation: btnOpen 2s infinite;
        }

        @keyframes btnOpen {
            0% {
                width: 34vw;
                height: 15vh;
            }
            50% {
                width: 44vw;
                height: 20vh;
            }
            100% {
                width: 34vw;
                height: 15vh;
            }
        }

        .light {
            position: absolute;
            width: 55vw;
            height: 30vh;
            left: 50%;
            top: 41vh;
            margin-left: -26vw;
            transform: translateX(-50%);
            animation: light 1.5s linear infinite;
        }

        @keyframes light {
            from {
                transform: rotate(0deg)
            }
            to {
                transform: rotate(359deg)
            }
        }

        .backToHall {
            position: fixed;
            left: 0.5rem;
            width: 3rem;
            z-index: 89;
            top: 1rem;
        }
    </style>

`


document.write(header_css)