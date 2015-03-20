package com.m9suns.forfun.tutorials.html5inaction.c4websocketsample.websocket;

import org.apache.log4j.Logger;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

public class WebsocketHandler extends AbstractWebSocketHandler {
	private static final Logger logger = Logger.getLogger(WebsocketHandler.class);

	protected void handleTextMessage(WebSocketSession session,
			TextMessage message) throws Exception {
		logger.info("Received message: " + message.getPayload());
		Thread.sleep(2000);
		session.sendMessage(new TextMessage("Polo!"));
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session)
			throws Exception {
		logger.info("Connection established");
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session,
			CloseStatus status) throws Exception {
		logger.info("Connection closed. Status: " + status);
	}

}