package com.m9suns.forfun.tutorials.html5inaction.c4websocketsample.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping({ "/", "/home" })
	public String homePage(Model model) {
		model.addAttribute("stringattributekey", "stringattributevalue");
		return "home";
	}

	@RequestMapping({ "/websocket" })
	public String websocket() {
		return "websocket";
	}
	
}
