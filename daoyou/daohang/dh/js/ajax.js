(function() {
	var route=[];
	//1.定义ajax函数
	function ajax(config) {
		loading();
		$.ajax({
			url: config.url,
			type:config.type? 'get':'post',
			data: config.data,
			success: function(data) {
				if(config.getType=="html") {
					actionRoute(config,data);
					config.success(data);
					hideLoading();
					return;
				}
				config.success(data);
//				if(data.code == 200) {
//					var backContent=data.backContent;
//					if(backContent) config.success(data);
//					else config.success();
//				}
//				else alert(data.message);
				hideLoading();
			},
			error: function() {
				debugger
				alert("请求出错");
				hideLoading();
			}
		})
	}
	
	function actionRoute(config,data){
		if(config.route=="clear") route=[];
		else if(config.route=="push"){
			if(currentRoute)route.push(currentRoute);
		}
		currentRoute={};
		currentRoute.url=config.url;
		currentRoute.html=data;
	}
    
    if(window.history.length==1){//判断是第一次从微信菜单进入页面
         //写入空白历史记录
         pushHistory();  
     }
     //延时监听   
     setTimeout(function () {  
          //监听物理返回按钮  
          window.addEventListener("popstate", function(e) {        	  
//          	alert("sfd");
          	if(route.length>0){
          		if(routeListener){
          			currentRoute=route.pop();
          			routeListener(currentRoute);
          			pushHistory();
          		}
          	}else{
          		$("#exit").fadeIn(200)
          	}
//                layer.open({
//                        content: '您确定要返回微信吗？',
//                        btn: ['确认', '再逛逛'],
//                        shadeClose: false,
//                        yes: function(){
//                            //调用微信浏览器私有API关闭浏览器
//                            WeixinJSBridge.call('closeWindow');
//                        }, no: function(){
//                            //点击【再逛逛】，再次写入空白历史记录
//                            pushHistory();
//                        }
//                });
          }, false);  
      
       }, 300);  
      /**
       * [pushHistory 写入空白历史记录]
       * @author 邱先生
       * @copyright 烟火里的尘埃 
       * @version [V1.0版本] 
       * @date 2016-07-30
       * @return {[type]} [description]
       */         
     function pushHistory() {  
         var state = {  
             title: "title",  
             url: "#"  
         };  
         window.history.pushState(state, "title", "#");  
     }
     
     function exitCancel(){
    	 pushHistory();
    	 $("#exit").fadeOut(200)
     }
     
     function exitConfirm(){
    	 WeixinJSBridge.call('closeWindow');
     }
	
	function replaceRegion(array,nameKey){
		for (var int = 0; int < array.length; int++) {
			var element=array[int];
			if(element){
				var name=element.name;
				if(name == nameKey){
					array[int].value=array[int].value.replace(/ /g,"-")
				}
			}
		}
	}
	
	function loading() {
		var div=document.createElement("div");
		div.className="loading";
		div.id="windowLoading";
		
		var div_toast=document.createElement("div");
		div_toast.className="weui_toast weui_loading_toast";
		div_toast.style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);";
		
		var div_loading=document.createElement("div");
		div_loading.className="weui_loading";
		for (i=0;i<12;i++) {
			var loading=document.createElement("div");
			loading.className="weui_loading_leaf weui_loading_leaf_"+i;
			div_loading.appendChild(loading);
		}
		div_toast.appendChild(div_loading);
		
		var p=document.createElement("p");
		p.className="weui_toast_content";
		p.innerHTML="数据加载中";
		div_toast.appendChild(p);
		
		div.appendChild(div_toast);
		var body=document.getElementsByTagName("body")[0];
		body.appendChild(div);
	}
	
	function hideLoading(){
		var body=document.getElementsByTagName("body")[0];
		var loading=document.getElementById("windowLoading");
		if(loading) body.removeChild(loading);
	}
	
	function arrayToJSON(array){
		var json={};
		$.each(array, function(i, val) {
			var value=json[val.name];
			if(value){
				if(value instanceof Array) value.push(val.value);
				else{
					var list=[value];
					list.push(val.value);
					json[val.name]=list;
				}
			}else{
				json[val.name]=val.value;
			}
		});
		return json;
	}
	function myFormatdate(now){ 
        var d=new Date(parseInt(now))    
        var   year=d.getFullYear();
        var   month=d.getMonth()+1;     
        var   date=d.getDate();     
        var   hour=d.getHours();     
        var   minute=d.getMinutes();     
        var   second=d.getSeconds();
        if (month<10) {
            month='0'+(d.getMonth()+1);
        } 
        if (date<10) {
            date='0'+d.getDate();
        }  
        if (hour<10) {
            hour='0'+d.getHours();
        } 
        if (minute<10) {
            minute='0'+d.getMinutes();
        }   
        return   year+"-"+month+"-"+date+" "+hour+":"+minute;     
        }  

	/*
	 * 所有的全局变量都是window的属性
	 *
	 * */
	window.ajax = ajax;
	window.loading = loading;
	window.hideLoading = hideLoading;
	window.replaceRegion = replaceRegion;
	window.arrayToJSON = arrayToJSON;
	window.routeListener;
	window.route=route;
	window.currentRoute={};
	window.exitCancel=exitCancel;
	window.exitConfirm=exitConfirm;
	window.myFormatdate=myFormatdate;
})();