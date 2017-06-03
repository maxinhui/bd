var imgWidth = 0;
var imgHeight = 0;

$(".defaultImg img").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");
$(".content img").css("height",window.innerHeight + "px");
$(".modal-dialog").css("height",window.innerHeight + "px");
// $("video").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");

// 按下F11全屏 获取宽高 调整宽高
$("body").keyup(function(){
	imgWidth = window.innerWidth;
  imgHeight = window.innerHeight;
  $(".defaultImg img").css("width",imgWidth + "px").css("height",imgHeight + "px");
	$(".content img").css("height",window.innerHeight + "px");
  // $("video").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");
	// console.log(1);
})

var aInterval = null;
var bInterval = null;
var cInterval = null;
var othInterval = null;
function showHide(){
    $(".point").fadeToggle("fast");
}
function othShowHide(){
    $(".othPoint").fadeToggle("fast");
}

// 链接服务器 userId 113 单对单id
var x = 0;//socket断掉重连次数3
var WsUrl = "172.50.96.122/bd-website";

create();  //开始链接
function create(){
     // var userId = $("#cue").val();
     var userId = 113;

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
		   linkWebSocket()
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
// 根据其他页面传递的的参数  指令做出改变
function changeSomething(order){
	console.log(order);
	switch(order){
		// 玩家选择ABC某座山
		    // 玩家选择 A山
      	case "a" :
      		  // console.log("a");
            // 默认图片隐藏
            
            $(".content").css("display","block");
            // 路线图显示
            $(".content div").removeClass("active");
            $(".content .a").addClass("active");
            $(".content img").removeClass("active");
            $(".content .a100").addClass("active");
            // 
            $(".point").css("width","30px").css("height","30px");
            $(".othPoint").css("width","30px").css("height","30px").css("top","32%").css("left","59.9%");
      	    break;
      	// 玩家选择 B山
      	case "b" :
      		  // console.log("b");
            // 默认图片隐藏
            // $(".defaultImg").css("display","none");  
            $(".content").css("display","block");
            // 路线图显示
            $(".content div").removeClass("active");
            $(".content .b").addClass("active");
            $(".content img").removeClass("active");
            $(".content .b100").addClass("active");
            // 
            $(".point").css("width","30px").css("height","30px");
            $(".othPoint").css("width","30px").css("height","30px").css("top","42%").css("left","55.4%");
      	    break;
        // 玩家选择 B山
      	case "c" :
      		  // console.log("c");
            // 默认图片隐藏
            // $(".defaultImg").css("display","none");  
            $(".content").css("display","block");
            // 路线图显示
            $(".content div").removeClass("active");
            $(".content .c").addClass("active");
            $(".content img").removeClass("active");
            $(".content .c100").addClass("active");
            // 
            $(".point").css("width","30px").css("height","30px");
            $(".othPoint").css("width","30px").css("height","30px").css("top","30%").css("left","34%");
      	    break;
   
      	
        // a
      	case "a101" :
            $(".defaultImg").css("display","none");  
            $(".content img").removeClass("active");
            $(".content .a101").addClass("active");
            clearInterval(aInterval);
            aInterval = null;
            aInterval = setInterval("showHide()", 400);
            // OK
            $(".point").css("left","54.5%").css("bottom","13.5%");
      	    break;
      	case "a102" :
            $(".point").css("left","48.1%").css("bottom","11.85%");
            $(".content img").removeClass("active");
            $(".content .a102").addClass("active");
      	    break;
      	case "a103" :
            $(".point").css("left","34.7%").css("bottom","11.6%");
            $(".content img").removeClass("active");
            $(".content .a103").addClass("active");
      	    break;
        case "a104" :
            $(".point").css("left","32%").css("bottom","14.1%");
            $(".content img").removeClass("active");
            $(".content .a104").addClass("active");
            break;
        case "a105" :
            $(".point").css("left","30%").css("bottom","24.5%");
            $(".content img").removeClass("active");
            $(".content .a105").addClass("active");
            break;
        case "a106" :
            $(".point").css("left","57.5%").css("bottom","63.8%");
            $(".content img").removeClass("active");
            $(".content .a106").addClass("active");
            break;
        case "a107" :
            $(".point").css("left","64.1%").css("bottom","67.4%");
            $(".content img").removeClass("active");
            $(".content .a107").addClass("active");
            break;
        case "a108" :
            $(".point").css("left","70.7%").css("bottom","74.4%");
            $(".content img").removeClass("active");
            $(".content .a108").addClass("active");
            break;
        case "a109" :
            $(".point").css("left","66.7%").css("bottom","87.7%");
            $(".content img").removeClass("active");
            $(".content .a109").addClass("active");
            break;
          // 乱入
        // case "a0" :
        //     break;

        // b
        case "b101" :
            $(".defaultImg").css("display","none");  
            $(".content img").removeClass("active");
            $(".content .b101").addClass("active");
            clearInterval(bInterval);
            bInterval = null;
            // OK
            bInterval = setInterval("showHide()", 400);
            $(".point").css("left","55.3%").css("bottom","22.9%");
            break;
        case "b102" :
            $(".point").css("left","40.3%").css("bottom","17.5%");
            $(".content img").removeClass("active");
            $(".content .b102").addClass("active");
            break;
        case "b103" :
            $(".point").css("left","31.7%").css("bottom","16%");
            $(".content img").removeClass("active");
            $(".content .b103").addClass("active");
            break;
        case "b104" :
            $(".point").css("left","25.2%").css("bottom","16.9%");
            $(".content img").removeClass("active");
            $(".content .b104").addClass("active");
            break;
        case "b105" :
            $(".point").css("left","52.2%").css("bottom","40.3%");
            $(".content img").removeClass("active");
            $(".content .b105").addClass("active");
            break;
        case "b106" :
            $(".point").css("left","53.5%").css("bottom","47.1%");
            $(".content img").removeClass("active");
            $(".content .b106").addClass("active");
            break;
        case "b107" :
            $(".point").css("left","54.2%").css("bottom","61.5%");
            $(".content img").removeClass("active");
            $(".content .b107").addClass("active");
            break;
        case "b108" :
            $(".point").css("left","53.4%").css("bottom","65.6%");
            $(".content img").removeClass("active");
            $(".content .b108").addClass("active");
            break;
        case "b109" :
            $(".point").css("left","51.7%").css("bottom","73.2%");
            $(".content img").removeClass("active");
            $(".content .b109").addClass("active");
            break;
          // 乱入
        // case "b0" :
        //     break;

        // c
        case "c101" :
            $(".defaultImg").css("display","none");  
            $(".content img").removeClass("active");
            $(".content .c101").addClass("active");
            clearInterval(cInterval);
            cInterval = null;
            cInterval = setInterval("showHide()", 400);
            // OK
            $(".point").css("left","48.6%").css("bottom","12.5%");
            break;
        case "c102" :
            $(".point").css("left","48.2%").css("bottom","16.9%");
            $(".content img").removeClass("active");
            $(".content .c102").addClass("active");
            break;
        case "c103" :
            $(".point").css("left","24.7%").css("bottom","21.7%");
            $(".content img").removeClass("active");
            $(".content .c103").addClass("active");
            break;
        case "c104" :
            $(".point").css("left","34.5%").css("bottom","32.4%");
            $(".content img").removeClass("active");
            $(".content .c104").addClass("active");
            break;
        case "c105" :
            $(".point").css("left","37.7%").css("bottom","38.6%");
            $(".content img").removeClass("active");
            $(".content .c105").addClass("active");
            break;
        case "c106" :
            $(".point").css("left","35.7%").css("bottom","49.8%");
            $(".content img").removeClass("active");
            $(".content .c106").addClass("active");
            break;
        case "c107" :
            $(".point").css("left","32.3%").css("bottom","58.75%");
            $(".content img").removeClass("active");
            $(".content .c107").addClass("active");
            break;
        case "c108" :
            $(".point").css("left","35.1%").css("bottom","70.7%");
            $(".content img").removeClass("active");
            $(".content .c108").addClass("active");
            break;
        case "c109" :
            $(".point").css("left","41.4%").css("bottom","86.7%");
            $(".content img").removeClass("active");
            $(".content .c109").addClass("active");
            break;
          // 乱入
        // case "c0" :
        //     break;
    
// 结束该景色 同时显示下一个景色路线图 闪烁的点不移动
    // a
        case "a101-end" :
            $(".content img").removeClass("active");
            $(".content .a102-fir").addClass("active");
            break;
        case "a102-end" :
            $(".content img").removeClass("active");
            $(".content .a103-fir").addClass("active");
            break;
        case "a103-end" :
            $(".content img").removeClass("active");
            $(".content .a104-fir").addClass("active");
            break;
        case "a104-end" :
            $(".content img").removeClass("active");
            $(".content .a105-fir").addClass("active");
            break;
        case "a105-end" :
            $(".content img").removeClass("active");
            $(".content .a106-fir").addClass("active");
            break;
        case "a106-end" :
            $(".content img").removeClass("active");
            $(".content .a107-fir").addClass("active");
            break;
        case "a107-end" :
            $(".content img").removeClass("active");
            $(".content .a108-fir").addClass("active");
            break;
        case "a108-end" :
            $(".content img").removeClass("active");
            $(".content .a109-fir").addClass("active");
            break;
        case "a109-end" :
            $(".modal-dialog p").html("本次导航已结束");
            $('.modal').modal('show');
            break;
    // b
        case "b101-end" :
            $(".content img").removeClass("active");
            $(".content .b102-fir").addClass("active");
            break;
        case "b102-end" :
            $(".content img").removeClass("active");
            $(".content .b103-fir").addClass("active");
            break;
        case "b103-end" :
            $(".content img").removeClass("active");
            $(".content .b104-fir").addClass("active");
            break;
        case "b104-end" :
            $(".content img").removeClass("active");
            $(".content .b105-fir").addClass("active");
            break;
        case "b105-end" :
            $(".content img").removeClass("active");
            $(".content .b106-fir").addClass("active");
            break;
        case "b106-end" :
            $(".content img").removeClass("active");
            $(".content .b107-fir").addClass("active");
            break;
        case "b107-end" :
            $(".content img").removeClass("active");
            $(".content .b108-fir").addClass("active");
            break;
        case "b108-end" :
            $(".content img").removeClass("active");
            $(".content .b109-fir").addClass("active");
            break;
        case "b109-end" :
            $(".modal-dialog p").html("本次导航已结束");
            $('.modal').modal('show');
            break;
    // c
        case "c101-end" :
            $(".content img").removeClass("active");
            $(".content .c102-fir").addClass("active");
            break;
        case "c102-end" :
            $(".content img").removeClass("active");
            $(".content .c103-fir").addClass("active");
            break;
        case "c103-end" :
            $(".content img").removeClass("active");
            $(".content .c104-fir").addClass("active");
            break;
        case "c104-end" :
            $(".content img").removeClass("active");
            $(".content .c105-fir").addClass("active");
            break;
        case "c105-end" :
            $(".content img").removeClass("active");
            $(".content .c106-fir").addClass("active");
            break;
        case "c106-end" :
            $(".content img").removeClass("active");
            $(".content .c107-fir").addClass("active");
            break;
        case "c107-end" :
            $(".content img").removeClass("active");
            $(".content .c108-fir").addClass("active");
            break;
        case "c108-end" :
            $(".content img").removeClass("active");
            $(".content .c109-fir").addClass("active");
            break;
        case "c109-end" :
            $(".modal-dialog p").html("本次导航已结束");
            $('.modal').modal('show');
            break;


// 错误路线 提示
          // 模态框显示
        case "wrong" :
            $(".modal-dialog p").html("您已偏离路线，正在为您重新规划路线");
            $('.modal').modal('show');
            break;
            // 模态框隐藏
        case "wrongEnd" :
            $('.modal').modal('hide');
            break;
            // 提示信息 方向
        case "左上" :
            $(".modal-dialog p").html("请往左前方行驶进入正确线路");
            break;
        case "上" :
            $(".modal-dialog p").html("请往前行驶进入指定线路");
            break;
        case "右上" :
            $(".modal-dialog p").html("请往右前方行驶进入指定线路");
            break;
        case "左" :
            $(".modal-dialog p").html("请往左行驶进入指定线路");
            break;
        case "右" :
            $(".modal-dialog p").html("请往右行驶进入指定线路");
            break;
        case "左下" :
            $(".modal-dialog p").html("请往左后方行驶进入指定线路");
            break;
        case "下" :
            $(".modal-dialog p").html("请往后方行驶进入指定线路");
            break;
        case "右下" :
            $(".modal-dialog p").html("请往右后方行驶进入指定线路");
            break;


// 乱入
        case "a0" :
            clearInterval(othInterval);
            othInterval = null;
            othInterval = setInterval("othShowHide()", 400);
            setTimeout(function(){
              clearInterval(othInterval);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("前方12km处发现同行");
            
            break;
        case "b0" :
            clearInterval(othInterval);
            othInterval = null;
            othInterval = setInterval("othShowHide()", 400);
            setTimeout(function(){
              clearInterval(othInterval);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("前方20km处发现同行");
            
            break;
        case "c0" :
            clearInterval(othInterval);
            othInterval = null;
            othInterval = setInterval("othShowHide()", 400);
            setTimeout(function(){
              clearInterval(othInterval);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("前方17km处发现同行");
            
            break;
        case "endOthPage" :
            clearInterval(othInterval);
            othInterval = null;
            $(".othPoint").css("display","none");
            $('.modal').modal('hide');
            break;
// 任务结束
        case "end" :
            $('.modal').modal('hide');
            clearInterval(aInterval);
            clearInterval(bInterval);
            clearInterval(cInterval);
            clearInterval(othInterval);
            $(".point").css("display","none");
            $(".othPoint").css("display","none");
            $(".content img").removeClass("active");
            $(".point").css("display","none");
            $(".content div").removeClass("active");
            $(".content").css("display","none");
            $(".defaultImg").css("display","block");
            break;

// 重置 reset
        case "reset" :
            window.location.href = window.location.href;
            break;
  }
}