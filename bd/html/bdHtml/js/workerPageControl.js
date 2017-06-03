// 链接服务器 userId 2 单对单id
  var x = 0;//socket断掉重连次数3
  var WsUrl = "172.50.96.122/bd-website";

  create();  //开始链接

  function create(){
       // var userId = $("#cue").val();
       var userId = 2;

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
         // setTimeout("linkWebSocket()",1000*10);      
          alert("异常开始重连x"+x);
         // $("#msg").html("异常开始重连x"+x);
       }
      };
      websocket.onclose = function (evnt) {

      }
      x++;
  }
  function send(sendType,u){
      console.log("send");
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
  // 刷新
  $(".refresh").on("click",function(){
      // console.log($(this).text());
      location.href = location.href;
  })
  // 当前第 条 文本修改
  $("ul button").on("click",function(){
      // console.log($(this).text());
      $(".start .step span").text($(this).text());
  })
  // 结束所有进程 按钮 进入确认返回 页面
  $(".endBtn").click(function(){
    $(".start").css("display","none");
    $(".endPage").css('display',"block");
  })
    // 确认 结束行程按钮 其他页面开始结束语
  $(".endPage .sure").on("click",function(){
    $(".start .step span").text("0");
    $(".endPage").css('display',"none");
    $(".start ul").removeClass("active");
    $(".start").css("display","none");
    $(".allEnd").css('display',"block");
  })
    // 返回 按钮
  $(".endPage .back").on("click",function(){
    $(".endPage").css('display',"none");
    $(".start").css("display","block");
  })
      // 页面开始结束语 点击所有页面返回初始
  $(".allEnd button").on("click",function(){
      // console.log($(this).text());
      // $(".start .step span").text("0");
      $(".allEnd").css("display","none");
      $(".wait").css("display","block");
  })
  // 是否结束该景点
  // 确认
  $(".modal .true").click(function(){
    $('.modal').modal('hide');
    // 传递此时的地点名
    send(2,$(".start .step span").text());
  })
  // 返回
  $(".modal .back").click(function(){
    // $('.modal').modal('hide');
  })
  // 根据其他页面传递的的参数  指令做出改变
  function changeSomething(order){
    console.log(order);
    // $(".talkPage").fadeIn("500");
    // $(".bdImg").css("display","none");
    switch(order){
      // 玩家选择ABC某座山
        // 玩家选择 A山
        case "a" :
          $(".wait").css("display","none");
          $(".start").css("display","block");
          $(".start ul").removeClass("active");
          $(".start .a").addClass("active");
          break;
        // 玩家选择 B山
        case "b" :
          $(".wait").css("display","none");
          $(".start").css("display","block");
          $(".start ul").removeClass("active");
          $(".start .b").addClass("active");
          break;
        // 玩家选择 C山
        case "c" :
          $(".wait").css("display","none");
          $(".start").css("display","block");
          $(".start ul").removeClass("active");
          $(".start .c").addClass("active");
          break;
        // 纠错
        case "wrong" :
          $(".start button").attr("disabled","");
          break;
        case "wrongEnd" :
          $(".start button").removeAttr("disabled","");
          break;
        // 玩家完成游戏 页面返回到默认页面
        case "allEnd" :
            $(".start .step span").text("0");
            $(".start ul").removeClass("active");
            $(".start").css("display","none");
            $(".wait").css("display","block");
            break;

// 是否结束该景点
    // a
        // case "a101-end" :
        //     $('.modal').modal('show');
        //     break;
        // case "a102-end" :
            
        //     break;
        // case "a103-end" :
            
        //     break;
        // case "a104-end" :
            
        //     break;
        // case "a105-end" :
            
        //     break;
        // case "a106-end" :
            
        //     break;
        // case "a107-end" :
            
        //     break;
        // case "a108-end" :
            
        //     break;
        // case "a109-end" :

        //     break;




        // 复制的页面 多个apk
        case "a101" :
          $(".start .step span").text("天龙桥");
          break;
        case "a102" :
          $(".start .step span").text("天福关驿");
          break;
        case "a103" :
          $(".start .step span").text("天龙天坑");
          break;
        case "a104" :
          $(".start .step span").text("青龙桥");
          break;
        case "a105" :
          $(".start .step span").text("黑龙桥");
          break;
        case "a106" :
          $(".start .step span").text("地缝入口");
          break;
        case "a107" :
          $(".start .step span").text("蛟龙寒窟");
          break;
        case "a108" :
          $(".start .step span").text("银河飞瀑");
          break;
        case "a109" :
          $(".start .step span").text("龙潭映月");
          break;


        case "b101" :
          $(".start .step span").text("石板热");
          break;
        case "b102" :
          $(".start .step span").text("斋戒坪");
          break;
        case "b103" :
          $(".start .step span").text("锅庄坪");
          break;
        case "b104" :
          $(".start .step span").text("海子沟");
          break;
        case "b105" :
          $(".start .step span").text("喇嘛寺");
          break;
        case "b106" :
          $(".start .step span").text("观光车");
          break;
        case "b107" :
          $(".start .step span").text("枯树滩");
          break;
        case "b108" :
          $(".start .step span").text("上干海子");
          break;
        case "b109" :
          $(".start .step span").text("幺妹峰");
          break;


        case "c101" :
          $(".start .step span").text("子梅垭口");
          break;
        case "c102" :
          $(".start .step span").text("泉华滩");
          break;
        case "c103" :
          $(".start .step span").text("沙德乡");
          break;
        case "c104" :
          $(".start .step span").text("朋布西乡");
          break;
        case "c105" :
          $(".start .step span").text("雅哈景区");
          break;
        case "c106" :
          $(".start .step span").text("新都桥");
          break;
        case "c107" :
          $(".start .step span").text("石泾河");
          break;
        case "c108" :
          $(".start .step span").text("塔公寺");
          break;
        case "c109" :
          $(".start .step span").text("雅拉雪山");
          break;
// 是否结束该页面
        case "endThisPage" :
          $('.modal').modal({backdrop: 'static'});
          // $('.modal').modal("show");
          break;

// 重置 reset
        case "reset" :
            //location.href=location.href;
            $(".refresh").removeAttr("disabled","");
            break;
          

  }
}