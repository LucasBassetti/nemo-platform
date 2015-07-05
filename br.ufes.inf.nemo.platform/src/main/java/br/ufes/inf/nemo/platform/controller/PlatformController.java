package br.ufes.inf.nemo.platform.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PlatformController {

	@RequestMapping("/index")
	public String index(HttpServletRequest request) {		
		return "index";
	}
	
	@RequestMapping("/models")
	public String models(HttpServletRequest request) {		
		return "dashboard/pages/models/models";
	}
	
	@RequestMapping("/settings")
	public String settings(HttpServletRequest request) {		
		return "dashboard/pages/settings/settings";
	}
	
	@RequestMapping("/about")
	public String about(HttpServletRequest request) {		
		return "dashboard/pages/about/about";
	}
	
	@RequestMapping("/derreference")
	public String derreference(HttpServletRequest request) {		
		return "lod/derreference";
	}
	
	@RequestMapping("/archimate")
	public String archimate(HttpServletRequest request) {		
		return "dashboard/pages/archimate/archimate";
	}
	
	@RequestMapping("/archimate-model")
	public String archmateModel(HttpServletRequest request) {
		
//		StardogConnection sc = StardogConnection.getInstance();
//		try {
//			sc.getConnection();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return "models/archimate/archimate-model";
	}
	
	@RequestMapping("/ontouml")
	public String ontouml(HttpServletRequest request) {		
		return "dashboard/pages/ontouml/ontouml";
	}
	
	@RequestMapping("/ontouml-model")
	public String ontoumlModel(HttpServletRequest request) {		
		return "models/ontouml/ontouml-model";
	}
	
	@RequestMapping("/mlt")
	public String mlt(HttpServletRequest request) {		
		return "dashboard/pages/mlt/mlt";
	}
	
	@RequestMapping("/mlt-model")
	public String mltModel(HttpServletRequest request) {		
		return "models/mlt/mlt-model";
	}
	
	
}
