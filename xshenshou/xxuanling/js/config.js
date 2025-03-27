var BaseUrl =  "http://106.54.88.119:8082";
var WxUrl = "/";
var hallName = 'xxuanling';
var ResourceUrl = '';
var Suffix = '.html';
var _isTx = 0;

// document.write('<script type="text/javascript" src="http://' + _wip + ':1999/ssoss.js?v=' + _tt + '"> <\/script>');

document.write('<script type="text/javascript" src="fiesc/js/aes.js?v=1"> <\/script>');
document.write('<script type="text/javascript" src="files/js/md5.js?v=1"> <\/script>');

var newoss = 'http://ssxss8.oss-cn-hangzhou.aliyuncs.com/baby2/';
var oss =  document.getElementsByTagName('base')[0];
var localOss = window.localStorage.getItem('oss');
if (!localOss || localOss!=newoss ||  oss.href != newoss + '/'){
    oss.href = newoss;    
    window.localStorage.setItem('oss', newoss);

}