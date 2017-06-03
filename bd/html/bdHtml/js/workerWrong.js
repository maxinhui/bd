  // 链接服务器 userId 1 单对单id
  var x = 0;//socket断掉重连次数3
  var WsUrl = "172.50.96.122/bd-website";
  // 刷新
  $(".refresh").on("click",function(){
      // console.log($(this).text());
      window.location.href = window.location.href;
  })

  create();  //开始链接

  function create(){
     // var userId = $("#cue").val();
     var userId = 1;

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
        linkWebSocket();
        alert("异常开始重连x"+x);
       // $("#msg").html("异常开始重连x"+x);
      }
    };
    websocket.onclose = function (evnt) {

    }
    x++;
} 

  // 传送数据
  function send(sendType,u){
      if (websocket != null) {
        var _this = $(this);
        // var message = document.getElementById(u).value;
        var json;
        switch(sendType){
           case 1 :
                json = "{msgBody:'"+u+"',targetId:'112',msgType:'1'}";//单发
                break;
           case 2 :
                json = "{msgBody:'"+u+"',targetId:'10086',msgType:'2'}";//群发
        }
          websocket.send(json);
      } else {
          alert('未与服务器链接.');
      }
  }

  
  // 根据其他页面传递的的参数  指令做出改变
  function changeSomething(order){
    console.log(order);
    // $(".wait").css("display","none");
    switch(order){
        // 玩家开始游戏 页面接受到任务 界面隐藏
       case "a" :
            $(".wait").css("display","none");
            $(".errorContent").css("display","block");
            break;
       case "b" :
            $(".wait").css("display","none");
            $(".errorContent").css("display","block");
            break;
        case "c" :
            $(".wait").css("display","none");
            $(".errorContent").css("display","block");
            break;
        // 玩家完成游戏 页面返回到默认页面
        case "allEnd" :
            $(".errorContent").css("display","none");
            $(".wait").css("display","block");
            break;
            
// 重置 reset
        case "reset" :
            // window.location.reload();
            $(".refresh").removeAttr("disabled","");
            break;


    }
  }