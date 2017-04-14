package top.builbu.website.websocket.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket//开启websocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new WebSocketHander(),"/echo").addInterceptors(new HandshakeInterceptor()).setAllowedOrigins("*");
        registry.addHandler(new WebSocketHander(),"/sockjs/echo").addInterceptors(new HandshakeInterceptor()).withSockJS();
    }

}
