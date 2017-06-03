// 链接服务器 userId 7 单对单id
var x = 0;//socket断掉重连次数3
var WsUrl = "172.50.96.122/bd-website";

function refresh(){
    window.location.href = window.location.href;
}

create();  //开始链接
function create(){
     // var userId = $("#cue").val();
     var userId = 7;

	$.ajax({
		type:"get",    //请求方式
		async:true,    //是否异步
		url:"http://172.50.96.122/bd-website/ws/r",
		dataType:"jsonp",    //跨域json请求一定是jsonp
		jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
		jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
		data:{"userId":userId},    //请求参数
		success: function(data) {
			//请求成功处理，和本地回调完全一样
			//alert(JSON.stringify(data[0].data)); 
			if(data[0].data == 'success'){
			   linkWebSocket();
         	   console.log(data[0].data);
			}
		}
	});				
}

function  linkWebSocket(){	
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://"+WsUrl+"/echo");
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket("ws://echo");
    } else {
        websocket = new SockJS("http://"+WsUrl+"/sockjs/echo");
    }
    websocket.onopen = function (evnt) {
    	 console.log("链接服务器成功");
    };
    websocket.onmessage = function (evnt) {
    	 // $("#msg").html(evnt.data);
		// console.log(evnt.data);
		// 接收到的数据
    	 changeSomething(evnt.data);
    };
    websocket.onerror = function (evnt) {
	   if(x < 3){
		   // setTimeout("linkWebSocket()",1000*10);		   
		  linkWebSocket();
		   // $("#msg").html("异常开始重连x"+x);
	   }
    };
    websocket.onclose = function (evnt) {

    }
    x++;
}
  function send(sendType,u){
      if (websocket != null) {
      	var _this = $(this);
      	var message = u;
      	var json;
      	switch(sendType){
      	   case 1 :
      	        json = "{msgBody:'"+message+"',targetId:'112',msgType:'1'}";//单发
      	        break;
      	   case 2 :
      	        json = "{msgBody:'"+message+"',targetId:'10086',msgType:'2'}";//群发
      	}
          websocket.send(json);
      } else {
          alert('未与服务器链接.');
      }
  }
$(".endBtn").click(function(){
  $(".content button").removeClass("active");
  $(".wait").css("display","block");
})
// 根据其他页面传递的的参数  指令做出改变
function changeSomething(order){
	console.log(order);
  
	switch(order){
    // a
      	case "a102" :
          $(".wait").css("display","none");
          $(".content").css("display","block");
          $(".content button").removeClass("active");
          $(".content .a-btn").addClass("active");
          $(".content .endBtn").addClass("active");
      	   break;
        case "a103" :
          $(".wait").css("display","block");
           $(".content button").removeClass("active");
           break;

    // b
        case "b103" :
          $(".wait").css("display","none");
          $(".content").css("display","block");
          $(".content button").removeClass("active");
          $(".content .b-btn").addClass("active");
          $(".content .endBtn").addClass("active");
            break;
        case "b104" :
          $(".wait").css("display","block");
           $(".content button").removeClass("active");
           break;
     // c
        case "c104" :
          $(".wait").css("display","none");
          $(".content").css("display","block");
          $(".content button").removeClass("active");
          $(".content .c-btn").addClass("active");
          $(".content .endBtn").addClass("active");
            break;
        case "c105" :
          $(".wait").css("display","block");
           $(".content button").removeClass("active");
           break;
    // 纠错
        case "wrong" :
          $(".content button").attr("disabled","");
          break;
        case "wrongEnd" :
          $(".content button").removeAttr("disabled","");
          break;
      	
// 任务结束
        case "allEnd" :
          $(".content button").removeClass("active");
          $(".content").css("display","none");
          $(".wait").css("display","block");
          break;

// 重置 reset
        case "reset" :
            $(".refresh").removeAttr("disabled","");
            break;
      	}
}