package br.ufes.inf.nemo.platform.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.ufes.inf.nemo.platform.service.DBPediaService;

@Controller
public class platformController {

	@RequestMapping("/index")
	public String index(HttpServletRequest request) {		
		return "index";
	}
	
	@RequestMapping("/models")
	public String models(HttpServletRequest request) {		
		return "dashboard/pages/models";
	}
	
	@RequestMapping("/about")
	public String about(HttpServletRequest request) {		
		return "dashboard/pages/about";
	}
	
	@RequestMapping("/archimate")
	public String archimate(HttpServletRequest request) {		
		return "dashboard/pages/archimate";
	}
	
	@RequestMapping("/archimate-model")
	public String archmateModel(HttpServletRequest request) {
		return "models/archimate/archimate-model";
	}
	
	@RequestMapping("/ontouml")
	public String ontouml(HttpServletRequest request) {		
		return "dashboard/pages/ontouml";
	}
	
	@RequestMapping("/ontouml-model")
	public String ontoumlModel(HttpServletRequest request) {		
		return "models/ontouml/ontouml-model";
	}
	
	@RequestMapping("/mlt")
	public String mlt(HttpServletRequest request) {		
		return "dashboard/pages/mlt";
	}
	
	@RequestMapping("/mlt-model")
	public String mltModel(HttpServletRequest request) {		
		return "models/mlt/mlt-model";
	}
	
	
}
