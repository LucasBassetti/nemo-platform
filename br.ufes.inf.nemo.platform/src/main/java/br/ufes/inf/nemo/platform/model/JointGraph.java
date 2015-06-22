package br.ufes.inf.nemo.platform.model;

public class JointGraph {

	String iri, prefix;
	JointElement[] elements;
	JointLink[] links;
	
	public JointGraph() {}
	
	public JointGraph(String iri, String prefix, JointElement[] elements, JointLink[] links) {
		this.iri = iri;
		this.prefix = prefix;
		this.elements = elements;
		this.links = links;
	}

	public String getIri() {
		return iri;
	}

	public void setIri(String iri) {
		this.iri = iri;
	}
	
	public String getPrefix() {
		return prefix;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public JointElement[] getElements() {
		return elements;
	}

	public void setElements(JointElement[] elements) {
		this.elements = elements;
	}

	public JointLink[] getLinks() {
		return links;
	}

	public void setLinks(JointLink[] links) {
		this.links = links;
	}

}
