package br.ufes.inf.nemo.platform.archimate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufes.inf.nemo.platform.service.DBPediaService;

@Controller
public class archimateController {

	@RequestMapping(value = "/getDefinition", method = RequestMethod.POST)
	public @ResponseBody String getDefinition(@RequestParam("cellName") String cellName){
		
		String definition = DBPediaService.getDefiniton(cellName);
		
		return definition;
	}
	
}
