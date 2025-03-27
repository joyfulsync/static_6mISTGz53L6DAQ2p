function getUrlParam(_0x26f080){
	var _0x54f0c6=new RegExp('(^|&)'+_0x26f080+'=([^&]*)(&|$)');
	var _0x1add06=window.location.search.substr(1).match(_0x54f0c6);
	if(_0x1add06!=null)return unescape(_0x1add06[2]);
	return null;
}