package com.m9suns.forfun.tutorials.html5inaction.c4websocketsample.config.web;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.m9suns.forfun.tutorials.html5inaction.c4websocketsample.websocket.WebsocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(websocketHandler(), "/webchat");
	}

	@Bean
	public WebsocketHandler websocketHandler() {
		return new WebsocketHandler();
	}

}