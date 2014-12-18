package com.m9suns.tutorials.spring.impl;

import com.m9suns.tutorials.spring.interfaces.MessageProvider;

public class HelloWorldMessageProvider implements MessageProvider {

	public String getMessage() {
		return "Hello World!";
	}

}
