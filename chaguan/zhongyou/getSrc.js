var currentPath = function () {
    var jsPath = document.currentScript ? document.currentScript.src : function () {
        var js = document.scripts
            , last = js.length - 1
            , src;
        for (var i = last; i > 0; i--) {
            if (js[i].readyState === 'interactive') {
                src = js[i].src;
                break;
            }
        }
        return src || js[last].src;
    }();
    return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
}();
var srcUrl
console.log("currentPath========",currentPath);
var scrName = getSrc(currentPath)
console.log("scrName========",scrName);

function getSrc(path){
    //去掉http://和https://
 //    let newStr = path.replace('https://',"")
	// srcUrl = newStr
 //    newStr = newStr.replace("http://","")
 //    console.log("newStr=======",newStr)

 //    newStrArray = newStr.split("/")
 //    console.log("newStr=====Array",newStr)
 //    for (let i = 0; i < newStrArray.length; i++) {
 //        console.log("ffffff",newStrArray)
 //        if (newStrArray[i] == ""){
 //            console.log("-----------",newStrArray[i-1])
 //            return newStrArray[i-1]
 //        }
 //    }
  return 'zhongyou'
}