package br.ufes.inf.nemo.platform.service;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLAnnotation;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLLiteral;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;

public class DBPediaService {

	public static String getDefiniton(String cell){
		
		String definition = "";
		cell = cell.replaceAll("  ", " ");
		cell = cell.replaceAll(" ", "_");
		
		IRI iri = IRI.create("http://www.productontology.org/id/" + cell + ".rdf");
		
		OWLOntologyManager m = OWLManager.createOWLOntologyManager();
		OWLDataFactory df = OWLManager.getOWLDataFactory();
		
		try {
			OWLOntology o = m.loadOntologyFromOntologyDocument(iri);
			
			for(OWLClass c : o.getClassesInSignature()){
				
				for(OWLAnnotation a : c.getAnnotations(o, df.getRDFSComment())){
					OWLLiteral val = (OWLLiteral) a.getValue();
					definition = val.toString();
					System.out.println(definition);
				}
				
			}
		} catch (OWLOntologyCreationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return definition;
	}
	
}
