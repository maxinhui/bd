package top.builbu.website.websocket.controller;


import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import top.builbu.business.user.entity.SessionUser;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HandshakeInterceptor implements org.springframework.web.socket.server.HandshakeInterceptor {
    
	
	    
    //初次握手访问前
	
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
    	 
    	if (request instanceof ServletServerHttpRequest) {
            //ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
           // HttpSession session = servletRequest.getServletRequest().getSession(true);
           
            String collector = ((ServletServerHttpRequest) request).getServletRequest().getParameter("collector");
            if(null != collector && !"".equals(collector)){
            	SessionUser user = new SessionUser();
            	user.setUserId(Long.valueOf(collector));
            	map.put(SessionManager.USER_SESSION,user);
            }
                //使用userName区分WebSocketHandler，以便定向发送消息
//                Object temp = session.getAttribute(Code.USER_SESSION);
//                if(temp!= null){
//                    if(temp instanceof SessionUser){
                   // String userId = (String) servletRequest.getServletRequest().getAttribute("userId");
                   //   log.debug(userId);
//                    	SessionUser user = new SessionUser();
//                   user.setUpdateById(Long.valueOf(1));
//        
//                     log.debug("链接用户ID"+user.getUserId());
//                     map.put(SessionManager.USER_SESSION,user);  //存入数据，方便在hander中获取
//                     map.put(Code.USER_ID, user.getUserId());
                    // session.removeAttribute(Code.USER_SESSION);
                    
          //      }
            
//       }
    	}
        return true;
    }

    //初次握手访问后
    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {
    	 
    	log.debug("访问：" + serverHttpRequest.getRemoteAddress());	
    }
}