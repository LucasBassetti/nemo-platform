package br.ufes.inf.nemo.platform.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class platformController {

	@RequestMapping("/index")
	public String index(HttpServletRequest request) {		
		return "index";
	}
	
}
