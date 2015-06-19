package br.ufes.inf.nemo.platform.model;

public class JointGraph {

	String iri;
	JointElement[] elements;
	JointLink[] links;
	
	public JointGraph() {}
	
	public JointGraph(String iri, JointElement[] elements, JointLink[] links) {
		this.iri = iri;
		this.elements = elements;
		this.links = links;
	}

	public String getIri() {
		return iri;
	}

	public void setIri(String iri) {
		this.iri = iri;
	}
	
	public JointElement[] geteElements() {
		return elements;
	}

	public void seteNodes(JointElement[] elements) {
		this.elements = elements;
	}

	public JointLink[] geteLinks() {
		return links;
	}

	public void seteLinks(JointLink[] links) {
		this.links = links;
	}

}
