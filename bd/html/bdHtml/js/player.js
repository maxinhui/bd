var imgWidth = document.documentElement.clientWidth;
var imgHeight = document.documentElement.clientHeight;

$("img").css("width",imgWidth + "px").css("height",imgHeight + "px");
$(".choose").css("background-size",imgWidth+"px" +" "+imgHeight+"px")
    .css("width",imgWidth + "px").css("height",imgHeight + "px");
$(".modal-dialog").css("height",imgHeight + "px");
$(".default img").css("width",imgWidth + "px").css("height",imgHeight + "px");
$(".choose button:first-of-type").css("margin-top",imgHeight/6+"px");

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



// 链接服务器 userId 9 单对单id
var x = 0;//socket断掉重连次数3
var WsUrl = "172.50.96.122/bd-website";

create();  //开始链接

function create(){
     // var userId = $("#cue").val();
     var userId = 9;

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
        if(u == "a"){
          $(".content .a").css("display","block").siblings("div").css("display","none");
          $(".content img").removeClass("active");
          $(".content .a .a100").addClass("active");
          $(".othPoint").css("top","30%").css("left","53%");
        }
        if(u == "b"){
          $(".content .b").css("display","block").siblings("div").css("display","none");
          $(".content img").removeClass("active");
          $(".content .b .b100").addClass("active");
          $(".othPoint").css("top","37.5%").css("left","57.5%");
        }
        if(u == "c"){
          $(".content .c").css("display","block").siblings("div").css("display","none");
          $(".content img").removeClass("active");
          $(".content .c .c100").addClass("active");
          $(".othPoint").css("top","26.5%").css("left","32.3%");
        }
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

// $('.modal').modal('show');

  $(".default").on("click",function(){
      $(".default").css("display","none");
      $(".choose").css("display","block");
  })
  $(".choose button").on("click",function(){
    // confirm("确认进入？");
      $(".modal-dialog p").html($(this).text());
      $('.modal').modal('show');
      $(".modal .box").css("display","none");
      $(".modal .box").eq($(this).index()).css("display","block");
  })
  $(".modal .true").click(function(){
      $('.modal').modal('hide');
      $(".modal .box").css("display","none");
      $(".choose").css("display","none");
      $(".abcImg").css("display","block");
      $(".abcImg img").removeClass("active");
      $(".abcImg img").eq($(this).parent(".box").index()-1).addClass("active");
  })
  $(".modal .back").click(function(){
    $('.modal').modal('hide');
  })
// 根据其他页面传递的的参数  指令做出改变
function changeSomething(order){
	console.log(order);
	switch(order){
        // case "start" :
            
        //     break;
		    // 工作人员控制页面 接收到的参数
      	case "a101" :
            $(".abcImg img").removeClass("active");
            $(".abcImg").css("display","none");
            $(".content").css("display","block");
      		$(".content img").removeClass("active");
            $(".content .a .a101").addClass("active");
            clearInterval(aInterval);
            aInterval = setInterval("showHide()", 400);
            // ok
            $(".point").css("left","48.74%").css("bottom","21.01%");
      	    break;
      	case "a102" :
      		  $(".content img").removeClass("active");
            $(".content .a .a102").addClass("active");
            $(".point").css("left","39.5%").css("bottom","19.5%");
      	    break;
      	case "a103" :
      		  $(".content img").removeClass("active");
            $(".content .a .a103").addClass("active");
            $(".point").css("left","37%").css("bottom","18.3%");
      	    break;
        case "a104" :
            $(".content img").removeClass("active");
            $(".content .a .a104").addClass("active");
            $(".point").css("left","32%").css("bottom","17.5%");
            break;
        case "a105" :
            $(".content img").removeClass("active");
            $(".content .a .a105").addClass("active");
            $(".point").css("left","27.3%").css("bottom","18.7%");
            break;
        case "a106" :
            $(".content img").removeClass("active");
            $(".content .a .a106").addClass("active");
            $(".point").css("left","66%").css("bottom","74.7%");
            break;
        case "a107" :
            $(".content img").removeClass("active");
            $(".content .a .a107").addClass("active");
            $(".point").css("left","67.7%").css("bottom","77.7%");
            break;
        case "a108" :
            $(".content img").removeClass("active");
            $(".content .a .a108").addClass("active");
            $(".point").css("left","67.7%").css("bottom","81.8%");
            break;
        case "a109" :
            $(".content img").removeClass("active");
            $(".content .a .a109").addClass("active");
            $(".point").css("left","62.5%").css("bottom","88.7%");
            break;
          //乱入 
        // case "a0" :
        //     $(".content img").removeClass("active");
        //     $(".content .a .a0").addClass("active");
        //     break;

        case "b101" :
            $(".abcImg img").removeClass("active");
            $(".abcImg").css("display","none");
            $(".content").css("display","block");

            $(".content img").removeClass("active");
            $(".content .b .b101").addClass("active");
            clearInterval(bInterval);
            bInterval = setInterval("showHide()", 400);
            // ok
            $(".point").css("left","59%").css("bottom","32.5%");
            break;
        case "b102" :
            $(".content img").removeClass("active");
            $(".content .b .b102").addClass("active");
            $(".point").css("left","37.5%").css("bottom","27.5%");
            break;
        case "b103" :
            $(".content img").removeClass("active");
            $(".content .b .b103").addClass("active");
            $(".point").css("left","32.8%").css("bottom","27.55%");
            break;
        case "b104" :
            $(".content img").removeClass("active");
            $(".content .b .b104").addClass("active");
            $(".point").css("left","26.4%").css("bottom","27.25%");
            break;
        case "b105" :
            $(".content img").removeClass("active");
            $(".content .b .b105").addClass("active");
            $(".point").css("left","51.9%").css("bottom","45.2%");
            break;
        case "b106" :
            $(".content img").removeClass("active");
            $(".content .b .b106").addClass("active");
            $(".point").css("left","55%").css("bottom","47.5%");
            break;
        case "b107" :
            $(".content img").removeClass("active");
            $(".content .b .b107").addClass("active");
            $(".point").css("left","57%").css("bottom","64.5%");
            break;
        case "b108" :
            $(".content img").removeClass("active");
            $(".content .b .b108").addClass("active");
            $(".point").css("left","57%").css("bottom","67.7%");
            break;
        case "b109" :
            $(".content img").removeClass("active");
            $(".content .b .b109").addClass("active");
            $(".point").css("left","54%").css("bottom","75%");
            break;
            //乱入 
        // case "b0" :
        //     $(".content img").removeClass("active");
        //     $(".content .b .b0").addClass("active");
        //     break;

        case "c101" :
            $(".abcImg img").removeClass("active");
            $(".abcImg").css("display","none");
            $(".content").css("display","block");
            
            clearInterval(cInterval);
            cInterval = setInterval("showHide()", 400);
            // ok
            $(".point").css("left","49.8%").css("bottom","20%");
            $(".content img").removeClass("active");
            $(".content .c .c101").addClass("active");
            break;
        case "c102" :
            $(".content img").removeClass("active");
            $(".content .c .c102").addClass("active");
            $(".point").css("left","49.3%").css("bottom","25.1%");
            break;
        case "c103" :
            $(".content img").removeClass("active");
            $(".content .c .c103").addClass("active");
            $(".point").css("left","19.2%").css("bottom","27%");
            break;
        case "c104" :
            $(".content img").removeClass("active");
            $(".content .c .c104").addClass("active");
            $(".point").css("left","33.2%").css("bottom","38.7%");
            break;
        case "c105" :
            $(".content img").removeClass("active");
            $(".content .c .c105").addClass("active");
            $(".point").css("left","36%").css("bottom","42.2%");
            break;
        case "c106" :
            $(".content img").removeClass("active");
            $(".content .c .c106").addClass("active");
            $(".point").css("left","34.4%").css("bottom","54.3%");
            break;
        case "c107" :
            $(".content img").removeClass("active");
            $(".content .c .c107").addClass("active");
            $(".point").css("left","30.1%").css("bottom","62.46%");
            break;
        case "c108" :
            $(".content img").removeClass("active");
            $(".content .c .c108").addClass("active");
            $(".point").css("left","33.2%").css("bottom","74.4%");
            break;
        case "c109" :
            $(".content img").removeClass("active");
            $(".content .c .c109").addClass("active");
            $(".point").css("left","42.25%").css("bottom","88.7%");
            break;
            //乱入 
        // case "c0" :
        //     // $(".content img").removeClass("active");
        //     // $(".content .c .c0").addClass("active");
        //     break;

            
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
              $(".othPoint").css("display","none");
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
              $(".othPoint").css("display","none");
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
              $(".othPoint").css("display","none");
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
    // 回顾播放完 本次导航已结束
        case "a109-end" :
            $(".modal .over").css("display","block").siblings().css("display","none");
            $('.modal').modal('show');
            break;
        case "b109-end" :
            $(".modal .over").css("display","block").siblings().css("display","none");
            $('.modal').modal('show');
            break;
        case "c109-end" :
            $(".modal .over").css("display","block").siblings().css("display","none");
            $('.modal').modal('show');
            break;
    //结束界面指令
        case "end" :
            $(".modal .over").css("display","none").siblings().css("display","block");
            $('.modal').modal('hide');
            clearInterval(aInterval);
            clearInterval(bInterval);
            clearInterval(cInterval);
            clearInterval(othInterval);
            aInterval = null;
            bInterval = null;
            cInterval = null;
            // 闪烁小点隐藏
            $(".point").css("display","none");
            // 给路线图移除active
            $(".content img").removeClass("active");
            // 选择路线界面隐藏
            $(".choose").css("display","none");
            // 路线图隐藏
            $(".content").css("display","none");
            // 结束界面
            $(".end").css("display","block");
            break;
      	//任务结束指令
        case "allEnd" :
            // 结束界面隐藏
            $(".end").css("display","none");
            // 开始界面显示
            $(".default").css("display","block");
            break;
// 重置 reset
        case "reset" :
            window.location.href = window.location.href;
            break;
            
  }
}