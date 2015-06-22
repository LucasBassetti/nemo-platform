package br.ufes.inf.nemo.platform.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufes.inf.nemo.platform.model.JointLink;
import br.ufes.inf.nemo.platform.model.JointGraph;
import br.ufes.inf.nemo.platform.model.JointElement;
import br.ufes.inf.nemo.platform.service.OWLExporter;
import br.ufes.inf.nemo.platform.util.FileUtil;

@Controller
public class PlatformExporterController {

	@RequestMapping(value = "/exportToOWL", method = RequestMethod.POST)
	public @ResponseBody String exportToOWL(@RequestParam("iri") String iri, @RequestParam("prefix") String prefix, @RequestParam("nodes") String nodes, @RequestParam("links") String links) {
		
		JointElement[] jointElements = (JointElement[]) FileUtil.getJavaFromJSON(nodes, JointElement[].class);
		JointLink[] jointLinks = (JointLink[]) FileUtil.getJavaFromJSON(links, JointLink[].class);
		
		JointGraph jointGraph = new JointGraph(iri, prefix, jointElements, jointLinks);
		
		OWLExporter owlExporter = new OWLExporter(jointGraph.getIri(), jointGraph.getPrefix());
		return owlExporter.export(jointGraph);
		
	}
	
}
