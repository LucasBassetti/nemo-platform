package br.ufes.inf.nemo.platform.model;

public class EModel {

	String iri;
	ENode[] eNodes;
	ELink[] eLinks;
	
	public EModel() {}
	
	public EModel(String iri, ENode[] eNodes, ELink[] eLinks) {
		this.iri = iri;
		this.eNodes = eNodes;
		this.eLinks = eLinks;
	}

	public String getIri() {
		return iri;
	}

	public void setIri(String iri) {
		this.iri = iri;
	}
	
	public ENode[] geteNodes() {
		return eNodes;
	}

	public void seteNodes(ENode[] eNodes) {
		this.eNodes = eNodes;
	}

	public ELink[] geteLinks() {
		return eLinks;
	}

	public void seteLinks(ELink[] eLinks) {
		this.eLinks = eLinks;
	}

}
