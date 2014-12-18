package com.m9suns.tutorials.spring.interfaces;

public interface MessageRenderer {
	
	void render();

	void setMessageProvider(MessageProvider provider);

	MessageProvider getMessageProvider();

}
