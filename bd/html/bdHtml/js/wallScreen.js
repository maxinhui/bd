// 墙壁屏幕
  var imgWidth = 0;
  var imgHeight = 0;

  $(".defaultImg img").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");
  $(".mountain > img").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");
  $(".modal-dialog").css("height",window.innerHeight + "px");
  $("video").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");

  // 按下F11全屏 获取宽高 调整宽高
  $("body").keyup(function(){
    imgWidth = window.innerWidth;
    imgHeight = window.innerHeight;
    $(".defaultImg img").css("width",imgWidth + "px").css("height",imgHeight + "px");
    $(".mountain > img").css("width",imgWidth + "px").css("height",imgHeight + "px");
    $(".modal-dialog").css("height",window.innerHeight + "px");
    $("video").css("width",window.innerWidth + "px").css("height",window.innerHeight + "px");
    // console.log(1);
  })

// 闪烁小点
var point = null;
function showHide(){
    $(".smallMap .point").fadeToggle("fast");
}

var num = 0;
var rotateNum = null;

// 链接服务器 userId 112 单对单id
var x = 0;//socket断掉重连次数3
var WsUrl = "172.50.96.122/bd-website";

create();  //开始链接
function create(){
     // var userId = $("#cue").val();
     var userId = 112;

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
// 根据其他页面传递的的参数  指令做出改变
function changeSomething(order){
  console.log(order);
  // 获取音频
  var audios = $("audio");
  // 获取视频
  var videos = $("video");
  var videoA1 = videos[0];
  var videoA2 = videos[1];
  var videoA3 = videos[2];
  var videoA4 = videos[3];
  var videoA5 = videos[4];
  var videoA6 = videos[5];
  var videoA7 = videos[6];
  var videoA8 = videos[7];
  var videoA9 = videos[8];
  var videoA10 = videos[9];
  var videoB1 = videos[10];
  var videoB2 = videos[11];
  var videoB3 = videos[12];
  var videoB4 = videos[13];
  var videoB5 = videos[14];
  var videoB6 = videos[15];
  var videoB7 = videos[16];
  var videoB8 = videos[17];
  var videoB9 = videos[18];
  var videoB10 = videos[19];
  var videoC1 = videos[20];
  var videoC2 = videos[21];
  var videoC3 = videos[22];
  var videoC4 = videos[23];
  var videoC5 = videos[24];
  var videoC6 = videos[25];
  var videoC7 = videos[26];
  var videoC8 = videos[27];
  var videoC9 = videos[28];
  var videoC10 = videos[29];

  switch(order){
  // 玩家点击屏幕进入选择界面
        case "start" :
          $(".defaultImg img").removeClass("active").siblings("img.sec").addClass("active");
          break;
  // 玩家选择ABC某座山
        // 玩家选择 A山
        case "a" :
          // console.log("a");
          $("body > div").removeClass("mountainBlock");
          $(".defaultImg").css("display","none");
          // A山 div显示
          $("#a").addClass("mountainBlock");
          // 选择a山
          $("#a > img").addClass("active");
            break;
        // 玩家选择 B山
        case "b" :
          // console.log("b");
          $("body > div").removeClass("mountainBlock");
          $(".defaultImg").css("display","none");
          // B山 div显示
          $("#b").addClass("mountainBlock");
          // 选择b山
          $("#b > img").addClass("active");
          break;
        case "c" :
          // console.log("c");
          $("body > div").removeClass("mountainBlock");
          $(".defaultImg").css("display","none");
          // C山 div显示
          $("#c").addClass("mountainBlock");
          // 选择c山
          $("#c > img").addClass("active");
          break;



  // A山的某座峰
         case "a101" :
            $('.modal').modal('hide');
          // 单个选择界面消失
            $("#a > img").removeClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a101 video").addClass("active");
            // 让视频归0
            videoA1.currentTime = 0;
            videoA1.play();
            setTimeout(function(){
              videoA1.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点 同时让地面下一张路线图显示
              send(2,"endThisPage");
              send(2,"a101-end");
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 旋转
            setTimeout(function(){
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },3200)
            setTimeout(function(){
              clearInterval(rotateNum);
              rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },9500)
           // A山 景色 第一张 默认起点图 添加active显示
            $(".mountain > div").removeClass("active");
            $("#a101").addClass("active");
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a101").addClass("active");
           break;
        case "a102" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第二帧 添加active显示
            $("#a102").addClass("active");
            // $("#a102").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a102 video").addClass("active");
            // 乱入的小点
            $(".smallMap .point").css("left","68%").css("bottom","73%");
            // 让视频归0
            videoA2.currentTime = 0;
            videoA2.play();
            setTimeout(function(){
              videoA2.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点 同时让地面下一张路线图显示
              send(2,"endThisPage");
              send(2,"a102-end");
            },16500)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            setTimeout(function(){
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[1].style.transform = "rotate("+num+"deg)";
                 $(".smallMap .pointBox")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },1000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a102").addClass("active");
            break;
        case "a103" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第三帧 添加active显示
            $("#a103").addClass("active");
            // $("#a103").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a103 video").addClass("active");
            videoA3.currentTime = 0;
            videoA3.play();
            setTimeout(function(){
              videoA3.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点 同时让地面下一张路线图显示
              send(2,"endThisPage");
              send(2,"a103-end");
            },18000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            setTimeout(function(){
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[2].style.transform = "rotate("+num+"deg)";
               },200);
            },1000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a103").addClass("active");
              
                  break;
        case "a104" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a104").addClass("active");
            // $("#a104").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a104 video").addClass("active");
            videoA4.currentTime = 0;
            videoA4.play();
            setTimeout(function(){
              videoA4.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点 同时让地面下一张路线图显示
              send(2,"endThisPage");
              send(2,"a104-end");
            },22000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num++;
               $(".smallMap .path")[3].style.transform = "rotate("+num+"deg)";
            },200);
            // 5s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[3].style.transform = "rotate("+num+"deg)";
               },200);
            },5800)
            // 9s -> 无
            setTimeout(function(){
               clearInterval(rotateNum);
            },11000)
            // 14s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[3].style.transform = "rotate("+num+"deg)";
               },200);
            },14000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a104").addClass("active");
              
          break;
        case "a105" :
          // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a105").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a105 video").addClass("active");
            videoA5.currentTime = 0;
            videoA5.play();
            setTimeout(function(){
              videoA5.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"a105-end");
            },19000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a105").addClass("active");
              
          break;
        case "a106" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a106").addClass("active");
            // $("#a106").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a106 video").addClass("active");
            videoA6.currentTime = 0;
            videoA6.play();
            setTimeout(function(){
              videoA6.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"a106-end");
            },18000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[5].style.transform = "rotate("+num+"deg)";
            },200);
            setTimeout(function(){
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            },4000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a106").addClass("active");
              
          break;
        case "a107" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a107").addClass("active");
            // $("#a107").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a107 video").addClass("active");
            videoA7.currentTime = 0;
            videoA7.play();
            setTimeout(function(){
              videoA7.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"a107-end");
            },18000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 3s ->
            setTimeout(function(){
              clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[6].style.transform = "rotate("+num+"deg)";
               },200);
            },3000)
            // 6s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[6].style.transform = "rotate("+num+"deg)";
               },200);
            },6000)
            // 8s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },8800)
            // 12s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[6].style.transform = "rotate("+num+"deg)";
               },200);
            },12500)
            // 15s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },15000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a107").addClass("active");
              
          break;
        case "a108" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a108").addClass("active");
            // $("#a108").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a108 video").addClass("active");
            videoA8.currentTime = 0;
            videoA8.play();
            setTimeout(function(){
              videoA8.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"a108-end");
            },19000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num++;
               $(".smallMap .path")[7].style.transform = "rotate("+num+"deg)";
             },200);
            // 10s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },10000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a108").addClass("active");
              
          break;
        case "a109" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#a109").addClass("active");
            // $("#a109").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#a109 video.fir").addClass("active");
            videoA9.currentTime = 0;
            videoA9.play();
            setTimeout(function(){
              videoA9.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              $(".modal-dialog p").html("您已走完全部行程，现在进入精彩回顾");
              $('.modal').modal('show');
            },18000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[8].style.transform = "rotate("+num+"deg)";
             },200);
            setTimeout(function(){
              $('.modal').modal('hide');
              $("video").removeClass("active");
              $("#a109 video.sec").addClass("active");
              videoA10.currentTime = 0;
              videoA10.play();
              // 小地图隐藏
              $(".smallMap img").removeClass("active");
              $(".smallMap").css("display","none");
            },20000)
            setTimeout(function(){
              // 回顾暂停
              videoA10.pause();
              // 自动弹出 本次导航已结束 地面手机也要弹框
              send(2,"a109-end");
              $(".modal-dialog p").html("本次导航已结束");
              $('.modal').modal('show');
            },47300)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .a109").addClass("active");
              
          break;



  // B山的某座峰
        case "b101" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            // 单个选择界面消失
            $("#b > img").removeClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b101 video").addClass("active");
            // 让视频归0
            videoB1.currentTime = 0;
            videoB1.play();
            setTimeout(function(){
              videoB1.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b101-end");
            },16000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[9].style.transform = "rotate("+num+"deg)";
             },200);
            // 4s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[9].style.transform = "rotate("+num+"deg)";
               },200);
            },4500)
            // 4s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },8000)
           // B山 景色 第一张 默认起点图 添加active显示
            $(".mountain > div").removeClass("active");
            $("#b101").addClass("active");
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b101").addClass("active");
              
           break;
        case "b102" :
            // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // B山 第二帧 添加active显示
            $("#b102").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b102 video").addClass("active");
            // 让视频归0
            videoB2.currentTime = 0;
            videoB2.play();
            setTimeout(function(){
              videoB2.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b102-end");
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b102").addClass("active");
             
            break;
        case "b103" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // B山 第三帧 添加active显示
            $("#b103").addClass("active");
            // $("#a103").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b103 video").addClass("active");
            // 乱入的小点
            $(".smallMap .point").css("left","77%").css("bottom","66%");
            videoB3.currentTime = 0;
            videoB3.play();
            setTimeout(function(){
              videoB3.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b103-end");
            },16500)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 3s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[11].style.transform = "rotate("+num+"deg)";
                 $(".smallMap .pointBox")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },3000)
            // 6s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[11].style.transform = "rotate("+num+"deg)";
                 $(".smallMap .pointBox")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },6000)
            // 10s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },10000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b103").addClass("active");
              
            break;
        case "b104" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // B山 第四帧 添加active显示
            $("#b104").addClass("active");
            // $("#a104").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b104 video").addClass("active");
            videoB4.currentTime = 0;
            videoB4.play();
            setTimeout(function(){
              videoB4.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b104-end");
            },14000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 6s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[12].style.transform = "rotate("+num+"deg)";
               },200);
            },6000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b104").addClass("active");
              
          break;
        case "b105" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // B山 第四帧 添加active显示
            $("#b105").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b105 video").addClass("active");
            videoB5.currentTime = 0;
            videoB5.play();
            setTimeout(function(){
              videoB5.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b105-end");
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 10s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[13].style.transform = "rotate("+num+"deg)";
               },200);
            },10500)
            // 15s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },15000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b105").addClass("active");
              
          break;
        case "b106" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#b106").addClass("active");
            // $("#a106").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b106 video").addClass("active");
            videoB6.currentTime = 0;
            videoB6.play();
            setTimeout(function(){
              videoB6.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b106-end");
            },16000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 4s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[14].style.transform = "rotate("+num+"deg)";
               },200);
            },4000)
            // 7s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },7000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b106").addClass("active");
              
          break;
        case "b107" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#b107").addClass("active");
            // $("#a106").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b107 video").addClass("active");
            videoB7.currentTime = 0;
            videoB7.play();
            setTimeout(function(){
              videoB7.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b107-end");
            },14000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 7s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[15].style.transform = "rotate("+num+"deg)";
               },200);
            },7500)
            // 10s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },10000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b107").addClass("active");
             
          break;
        case "b108" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#b108").addClass("active");
            // $("#a106").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b108 video").addClass("active");
            videoB8.currentTime = 0;
            videoB8.play();
            setTimeout(function(){
              videoB8.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"b108-end");
            },16000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 8s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[16].style.transform = "rotate("+num+"deg)";
               },200);
            },8000)
            // 11s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },11000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b108").addClass("active");
              
          break;
        case "b109" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#b109").addClass("active");
            // $("#a109").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#b109 video.fir").addClass("active");
            videoB9.currentTime = 0;
            videoB9.play();
            setTimeout(function(){
              videoB9.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              $(".modal-dialog p").html("您已走完全部行程，现在进入精彩回顾");
              $('.modal').modal('show');
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[17].style.transform = "rotate("+num+"deg)";
             },200);
            // 5s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },5000)
            // 13s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[17].style.transform = "rotate("+num+"deg)";
               },200);
            },13000)
            setTimeout(function(){
              $('.modal').modal('hide');
              $("video").removeClass("active");
              $("#b109 video.sec").addClass("active");
              videoB10.currentTime = 0;
              videoB10.play();
              $(".smallMap img").removeClass("active");
              $(".smallMap").css("display","none");
            },19000)
            setTimeout(function(){
              videoB10.pause();
              // 
              send(2,"b109-end");
              $(".modal-dialog p").html("本次导航已结束");
              $('.modal').modal('show');
            },42300)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .b109").addClass("active");
              
          break;


  // C山的某座峰
        case "c101" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            // 单个选择界面消失
            $("#c > img").removeClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c101 video").addClass("active");
            // 让视频归0
            videoC1.currentTime = 0;
            videoC1.play();
            setTimeout(function(){
              videoC1.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // console.log(3)
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c101-end");
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 5s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[18].style.transform = "rotate("+num+"deg)";
                 // console.log($(".smallMap .path")[18]);
               },200);
               // console.log(1);
            },5500)
            // 13s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[18].style.transform = "rotate("+num+"deg)";
               },200);
               // console.log(2);
            },13500)
           // C山 景色 第一张 默认起点图 添加active显示
            $(".mountain > div").removeClass("active");
            $("#c101").addClass("active");
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c101").addClass("active");
             
           break;
        case "c102" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // C山 第二帧 添加active显示
            $("#c102").addClass("active");
            // $("#a102").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c102 video").addClass("active");
            // 让视频归0
            videoC2.currentTime = 0;
            videoC2.play();
            setTimeout(function(){
              videoC2.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c102-end");
            },16500)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[19].style.transform = "rotate("+num+"deg)";
            },200);
            // 9s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },9000)
            // 12s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[19].style.transform = "rotate("+num+"deg)";
               },200);
            },12500)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c102").addClass("active");
              
            break;
        case "c103" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // C山 第三帧 添加active显示
            $("#c103").addClass("active");
            // $("#a103").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c103 video").addClass("active");
            videoC3.currentTime = 0;
            videoC3.play();
            setTimeout(function(){
              videoC3.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c103-end");
            },16200)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[20].style.transform = "rotate("+num+"deg)";
            },200);
            // 3s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[20].style.transform = "rotate("+num+"deg)";
               },200);
            },3000)
            // 6s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[20].style.transform = "rotate("+num+"deg)";
               },200);
            },6000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c103").addClass("active");
              
            break;
        case "c104" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // C山 第四帧 添加active显示
            $("#c104").addClass("active");
            // $("#a104").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c104 video").addClass("active");
            // 乱入的小点
            $(".smallMap .point").css("left","62%").css("bottom","80%");
            videoC4.currentTime = 0;
            videoC4.play();
            setTimeout(function(){
              videoC4.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c104-end");
            },16200)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 4s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[21].style.transform = "rotate("+num+"deg)";
                 $(".smallMap .pointBox")[0].style.transform = "rotate("+num+"deg)";
               },200);
            },4500)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c104").addClass("active");
             
          break;
        case "c105" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#c105").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c105 video").addClass("active");
            videoC5.currentTime = 0;
            videoC5.play();
            setTimeout(function(){
              videoC5.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c105-end");
            },16000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num--;
               $(".smallMap .path")[22].style.transform = "rotate("+num+"deg)";
            },200);
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c105").addClass("active");
              
          break;
        case "c106" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#c106").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c106 video").addClass("active");
            videoC6.currentTime = 0;
            videoC6.play();
            setTimeout(function(){
              videoC6.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c106-end");
            },16000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num++;
               $(".smallMap .path")[23].style.transform = "rotate("+num+"deg)";
            },200);
            // 5s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[23].style.transform = "rotate("+num+"deg)";
               },200);
            },5000)
            // 14s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },14000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c106").addClass("active");
              
          break;
        case "c107" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#c107").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c107 video").addClass("active");
            videoC7.currentTime = 0;
            videoC7.play();
            setTimeout(function(){
              videoC7.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c107-end");

            },15800)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 0s ->
            rotateNum = setInterval(function(){
               if(num >= 360){
                 num = 0;
               }
               num++;
               $(".smallMap .path")[24].style.transform = "rotate("+num+"deg)";
            },200);
            // 4s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },4000)
            // 5s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num--;
                 $(".smallMap .path")[24].style.transform = "rotate("+num+"deg)";
               },200);
            },5500)
            // 13s ->
            setTimeout(function(){
               clearInterval(rotateNum);
            },13000)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c107").addClass("active");
              
          break;
        case "c108" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#c108").addClass("active");
            // $("#a105").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c108 video").addClass("active");
            videoC8.currentTime = 0;
            videoC8.play();
            setTimeout(function(){
              videoC8.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              // 页面控制端是否结束该景点
              send(2,"endThisPage");
              send(2,"c108-end");

            },14200)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            // 8s ->
            setTimeout(function(){
               clearInterval(rotateNum);
               rotateNum = setInterval(function(){
                 if(num >= 360){
                   num = 0;
                 }
                 num++;
                 $(".smallMap .path")[25].style.transform = "rotate("+num+"deg)";
               },200);
            },8500)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c108").addClass("active");
              
          break;
        case "c109" :
        // 上一个 是否结束该页面
            $('.modal').modal('hide');
            $(".mountain > div").removeClass("active");
            // A山 第四帧 添加active显示
            $("#c109").addClass("active");
            // $("#a109").find("img.fir").addClass("active");
            // 开始视频
            $("video").removeClass("active");
            $("#c109 video.fir").addClass("active");
            videoC9.currentTime = 0;
            videoC9.play();
            setTimeout(function(){
              videoC9.pause();
              // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
              $(".modal-dialog p").html("您已走完全部行程，现在进入精彩回顾");
              $('.modal').modal('show');
            },17000)
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            setTimeout(function(){
              $('.modal').modal('hide');
              $("video").removeClass("active");
              $("#c109 video.sec").addClass("active");
              videoC10.currentTime = 0;
              videoC10.play();
              $(".smallMap img").removeClass("active");
              $(".smallMap").css("display","none");
            },19000)
            setTimeout(function(){
              videoC10.pause();
              // 
              send(2,"c109-end");
              $(".modal-dialog p").html("本次导航已结束");
              $('.modal').modal('show');
            },44700)
            // 小地图显示
            $(".smallMap").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap .c109").addClass("active");
              
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
            clearInterval(point);
            point = setInterval("showHide()", 400);
            setTimeout(function(){
              clearInterval(point);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("前方12km处发现同行");

            break;
        case "b0" :
            clearInterval(point);
            point = setInterval("showHide()", 400);
            setTimeout(function(){
              clearInterval(point);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("左前方20km处发现同行");

            break;
        case "c0" :
            clearInterval(point);
            point = setInterval("showHide()", 400);
            setTimeout(function(){
              clearInterval(point);
              $(".smallMap .pointBox .point").css("display","none");
            },4000)
            $('.modal').modal('show');
            $(".modal-dialog p").html("右前方17km处发现同行");

            break;
        // 结束乱入
        case "endOthPage" :
            clearInterval(point);
            point = null;
            $(".smallMap .pointBox .point").css("display","none");
            $('.modal').modal('hide');
            break;
    // 是否结束该页面
        case "天龙桥" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 天福官驿 ]");
            break;
        case "天福官驿" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 天龙天坑 ]");
            break;
        case "天龙天坑" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 青龙桥 ]");
            break;
        case "青龙桥" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 黑龙桥 ]");
            break;
        case "黑龙桥" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 地缝入口 ]");
            break;
        case "地缝入口" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 蛟龙寒窟 ]");
            break;
        case "蛟龙寒窟" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 银河飞瀑 ]");
            break;
        case "银河飞瀑" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 龙潭映月 ]");
            break;
          // b
        case "石板热" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 斋戒坪 ]");
            break;
        case "斋戒坪" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 锅庄坪 ]");
            break;
        case "锅庄坪" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 海子沟售票处 ]");
            break;
        case "海子沟" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 喇嘛寺 ]");
            break;
        case "喇嘛寺" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 观光车终点站 ]");
            break;
        case "观光车" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 枯树滩 ]");
            break;
        case "枯树滩" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 上干海子 ]");
            break;
        case "上干海子" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 幺妹峰大本营 ]");
            break;
          // c
        case "子梅垭口" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 泉华滩 ]");
            break;
        case "泉华滩" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 沙德乡 ]");
            break;
        case "沙德乡" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 朋布西乡 ]");
            break;
        case "朋布西乡" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 雅哈景区 ]");
            break;
        case "雅哈景区" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 新都桥观景台 ]");
            break;
        case "新都桥" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 石泾河 ]");
            break;
        case "石泾河" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 塔公寺 ]");
            break;
        case "塔公寺" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("即将进入下一个景点 [ 雅拉雪山 ]");
            break;
      // 结束语
        case "end" :
            // 清除旋转定时
              num = 0;
              clearInterval(rotateNum);
              rotateNum = null;
            clearInterval(point);
            point = null;
            $('.modal').modal('hide');
            $(".defaultImg img").removeClass("active").siblings("img.thr").addClass("active");
            $(".defaultImg").css("display","block");
            $(".smallMap img").removeClass("active");
            $(".smallMap").css("display","none");
            $("video").removeClass("active");
            $(".mountain > div").removeClass("active");
            $("body > div").removeClass("mountainBlock");
            break;
// 任务结束
        case "allEnd" :
            $('.modal').modal('show');
            $(".modal-dialog p").html("感谢您的参与！正在为您跳转首页...");
            setTimeout(function(){
              $('.modal').modal('hide');
              
              $(".defaultImg img").removeClass("active").siblings("img.fir").addClass("active");
              $(".defaultImg").css("display","block");
            },2000)
            break;

// 重置 reset
        case "reset" :
            window.location.href = window.location.href;
            break;
        }
}