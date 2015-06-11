package br.ufes.inf.nemo.platform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufes.inf.nemo.platform.model.ELink;
import br.ufes.inf.nemo.platform.model.EModel;
import br.ufes.inf.nemo.platform.model.ENode;
import br.ufes.inf.nemo.platform.service.OWLExporter;
import br.ufes.inf.nemo.platform.util.FileUtil;

@Controller
public class PlatformExporterController {

	@RequestMapping(value = "/exportToOWL", method = RequestMethod.POST)
	public @ResponseBody String exportToOWL(@RequestParam("iri") String iri, @RequestParam("nodes") String nodes, @RequestParam("links") String links) {
		
//		System.out.println(iri);
//		System.out.println(nodes);
//		System.out.println(links);
		
		ENode[] eNodes = (ENode[]) FileUtil.getJavaFromJSON(nodes, ENode[].class);
		ELink[] eLinks = (ELink[]) FileUtil.getJavaFromJSON(links, ELink[].class);
		
		EModel eModel = new EModel(iri, eNodes, eLinks);
		
		OWLExporter owlExporter = new OWLExporter(eModel.getIri());
		return owlExporter.export(eModel);
		
	}
	
}
