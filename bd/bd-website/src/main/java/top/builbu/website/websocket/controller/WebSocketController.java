package top.builbu.website.websocket.controller;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.socket.WebSocketSession;

import top.builbu.business.user.entity.SessionUser;
import top.builbu.core.entity.Code;

@Slf4j
@Controller
@RequestMapping("/ws")
public class WebSocketController {
	
	@ResponseBody
	@RequestMapping("r")
	public String re(HttpSession session,HttpServletResponse res,SessionUser user,String callbackparam,WebSocketSession webSocketSession){
		res.setHeader("Access-Control-Allow-Origin", "*");
		log.debug(user.getUserId()+"");
		  	session.setAttribute(Code.USER_SESSION, user);
		
		return callbackparam+"([{'data':'success'}])";
	}
	
}
