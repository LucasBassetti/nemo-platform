package br.ufes.inf.nemo.platform.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import org.semanticweb.owlapi.apibinding.OWLManager;
import org.semanticweb.owlapi.model.IRI;
import org.semanticweb.owlapi.model.OWLClass;
import org.semanticweb.owlapi.model.OWLDataFactory;
import org.semanticweb.owlapi.model.OWLDeclarationAxiom;
import org.semanticweb.owlapi.model.OWLEntity;
import org.semanticweb.owlapi.model.OWLInverseObjectPropertiesAxiom;
import org.semanticweb.owlapi.model.OWLObjectProperty;
import org.semanticweb.owlapi.model.OWLObjectPropertyDomainAxiom;
import org.semanticweb.owlapi.model.OWLObjectPropertyRangeAxiom;
import org.semanticweb.owlapi.model.OWLOntology;
import org.semanticweb.owlapi.model.OWLOntologyCreationException;
import org.semanticweb.owlapi.model.OWLOntologyManager;
import org.semanticweb.owlapi.model.OWLOntologyStorageException;
import org.semanticweb.owlapi.model.OWLSubClassOfAxiom;
import org.semanticweb.owlapi.model.OWLSubObjectPropertyOfAxiom;
import org.semanticweb.owlapi.model.OWLSymmetricObjectPropertyAxiom;

import br.ufes.inf.nemo.platform.interfaces.Exporter;
import br.ufes.inf.nemo.platform.model.JointLink;
import br.ufes.inf.nemo.platform.model.JointGraph;
import br.ufes.inf.nemo.platform.model.JointElement;

/**
 * OWL Exporter
 * @author lucas
 *
 */
public class OWLExporter implements Exporter {

	private OWLOntologyManager manager;
	private OWLOntology ontology;
	private OWLDataFactory factory;
	
	public OWLExporter(String iriBase) {
		
		try {
			manager = OWLManager.createOWLOntologyManager();		
			ontology = manager.createOntology(IRI.create(iriBase));
			factory = manager.getOWLDataFactory();			
		} catch (OWLOntologyCreationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@Override
	public String export(JointGraph graph) {
		
		//Generate Classes
		for(JointElement element : graph.geteElements()) {
			String classIri = element.getIri();
			OWLClass owlClass = factory.getOWLClass(IRI.create(classIri));				
			generateOWLDeclarationAxiom(owlClass);
		}
		
		//Generate Links
		for(JointLink link : graph.geteLinks()) {
			String objectPropertyIri = link.getIri();
			String domainIRI = link.getSource();
			String rangeIRI = link.getTarget();
			
			OWLClass domainClass = factory.getOWLClass(IRI.create(domainIRI));
			OWLClass rangeClass = factory.getOWLClass(IRI.create(rangeIRI));
			
			//Specialization relation
			if(objectPropertyIri.contains("specialisation") || objectPropertyIri.contains("specialization")) {
				generateOWLSubClassOfAxiom(domainClass, rangeClass);
			}
			//Other relations
			else {
				OWLObjectProperty objectProperty = factory.getOWLObjectProperty(IRI.create(objectPropertyIri));
				generateOWLDeclarationAxiom(objectProperty);
				generateOWLObjectPropertyDomainAxiom(objectProperty, domainClass);
				generateOWLObjectPropertyRangeAxiom(objectProperty, rangeClass);
			}
		}
		
		//Generate output
		try {
			
			ByteArrayOutputStream os = new ByteArrayOutputStream();
			PrintStream ps = new PrintStream(os);
			manager.saveOntology(ontology, ps);
			
			return os.toString("UTF8");
			
		} catch (OWLOntologyStorageException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return null;	
		
	}
	
	/**
	 * Method to generate a OWLDeclaration Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param axiom
	 * @return void
	 */
	
	public <A> void generateOWLDeclarationAxiom(A axiom){		
		OWLDeclarationAxiom declareClass = factory.getOWLDeclarationAxiom((OWLEntity) axiom);
		manager.addAxiom(ontology, declareClass);	
	}
	
	/**
	 * Method to generate a OWLSubClassOf Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param specializedClass
	 * @param generalizedClass
	 * @return void
	 */
	
	public void generateOWLSubClassOfAxiom(OWLClass specializedClass, OWLClass generalizedClass){	
		OWLSubClassOfAxiom subClassOf = factory.getOWLSubClassOfAxiom(specializedClass, generalizedClass);		
		manager.addAxiom(ontology, subClassOf);	
	}

	/**
	 * Method to generate a OWLSubObjectPropertyOf Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param specializedObjectProperty
	 * @param generalizedObjectProperty
	 * @return void
	 */
	
	public void generateOWLSubObjectPropertyOfAxiom(OWLObjectProperty specializedObjectProperty, OWLObjectProperty generalizedObjectProperty){	
		OWLSubObjectPropertyOfAxiom subObjectPropertyOf = factory.getOWLSubObjectPropertyOfAxiom(specializedObjectProperty, generalizedObjectProperty);		
		manager.addAxiom(ontology, subObjectPropertyOf);	
	}
	
	/**
	 * Method to generate a OWLInverseObjectPropertyOf Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param objectProperty
	 * @param inverseObjectProperty
	 * @return void
	 */
	
	public void generateOWLInverseObjectPropertiesAxiom(OWLObjectProperty objectProperty, OWLObjectProperty inverseObjectProperty){	
		OWLInverseObjectPropertiesAxiom inverseObjectProperties = factory.getOWLInverseObjectPropertiesAxiom(objectProperty, inverseObjectProperty);		
		manager.addAxiom(ontology, inverseObjectProperties);	
	}
	
	/**
	 * Method to generate a OWLSymmetricObjectProperty Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param objectProperty
	 * @param inverseObjectProperty
	 * @return void
	 */
	
	public void generateOWLSymmetricObjectPropertyAxiom(OWLObjectProperty objectProperty){	
		OWLSymmetricObjectPropertyAxiom symmetricObjectProperty = factory.getOWLSymmetricObjectPropertyAxiom(objectProperty);
		manager.addAxiom(ontology, symmetricObjectProperty);	
	}
	
	/**
	 * Method to generate a OWLObjectPropertyDomain Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param objectProperty
	 * @param domainClass
	 * @return void
	 */
	
	public void generateOWLObjectPropertyDomainAxiom(OWLObjectProperty objectProperty, OWLClass domainClass){		
		OWLObjectPropertyDomainAxiom domainAxiom = factory.getOWLObjectPropertyDomainAxiom(objectProperty, domainClass);
		manager.addAxiom(ontology, domainAxiom);	
	}
	
	/**
	 * Method to generate a OWLObjectPropertyRange Axiom and add on the ontology
	 * @author Lucas Bassetti
	 * @version 0.1
	 * @param objectProperty
	 * @param rangeClass
	 * @return void
	 */
	
	public void generateOWLObjectPropertyRangeAxiom(OWLObjectProperty objectProperty, OWLClass rangeClass){		
		OWLObjectPropertyRangeAxiom rangeAxiom = factory.getOWLObjectPropertyRangeAxiom(objectProperty, rangeClass);
		manager.addAxiom(ontology, rangeAxiom);	
	}

}
