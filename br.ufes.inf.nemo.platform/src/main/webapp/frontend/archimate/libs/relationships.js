/*
 * Template:
 * {
 * 		"relationshipKey1": "relationshipName1",
 * 		"relationshipKey3": "relationshipName2",
 * 		...
 * }
 */

var relationshipsKeys =
{
	"a" : "access",
	"c" : "composition",
	"f"	: "flow",
	"g" : "aggregation",
	"i" : "assignment",
	"n" : "influence",
	"o" : "association",
	"r" : "realisation",
	"s" : "specialisation",
	"t" : "triggering",
	"u" : "usedBy",
};

/*
 * Template:
 * {
 * 		"source": {
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			...
 * 		},
 * 		"source": {
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			"target": ["relationshipKey1", relationshipKey2", ...],
 * 			...
 * 		},
 * ...
 * }
 */

var relationships = 
{
	 "BusinessActor" : {
		 
		 "BusinessActor": ["c","f","g","o","s","t","u"],
		 "BusinessRole": ["f","i","o","t","u"],
		 "BusinessCollaboration": ["f","i","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["c","f","i","o","t","u"],
		 "BusinessProcess": ["f","i","o","t","u"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["c","f","i","o","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","r","u"],
		 "BusinessObject": ["a", "o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a", "o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["f","o","t"],
		 "ApplicationFunction": ["f","o","t"],
		 "ApplicationInteraction": ["f","o","t"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["i","o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["i","o","f","t"],
		 "Deliverable": ["r","o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessRole" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["c","f","g","o","s","t","u"],
		 "BusinessCollaboration": ["c","f","g","o","s","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["c","f","g","i","o","t","u"],
		 "BusinessProcess": ["f","i","o","t","u"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["f","i","o","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","r","u"],
		 "BusinessObject": ["a", "o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a", "o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["f","o","t"],
		 "ApplicationFunction": ["f","o","t"],
		 "ApplicationInteraction": ["f","o","t"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["i","o","f","t"],
		 "Deliverable": ["r","o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessCollaboration" : {
		 
		 "BusinessActor": ["f","g","o","t","u"],
		 "BusinessRole": ["c","f","g","o","s","t","u"],
		 "BusinessCollaboration": ["c","f","g","o","s","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["c","f","g","o","t","u"],
		 "BusinessProcess": ["f","i","o","t","u"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["f","i","o","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","r","u"],
		 "BusinessObject": ["a", "o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a", "o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["f","o","t"],
		 "ApplicationInteraction": ["f","o","t"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "Location" : {
		 
		 "BusinessActor": ["f","i","o","t","u"],
		 "BusinessRole": ["f","i","o","t","u"],
		 "BusinessCollaboration": ["f","i","o","t","u"],
		 "Location": ["c","f","g","o","t","u"],
		 "BusinessInterface": ["f","i","o","t","u"],
		 "BusinessProcess": ["i","o"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["i","o"],
		 "BusinessEvent": ["i","o","t"],
		 "BusinessService": ["i","o"],
		 "BusinessObject": ["i","o"],
		 "Representation": ["i","o"],
		 "Product": ["o"],
		 "Contract": ["i","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["i","o"],
		 "ApplicationCollaboration": ["i","o"],
		 "ApplicationInterface": ["i","o"],
		 "ApplicationFunction": ["i","o"],
		 "ApplicationInteraction": ["i","o"],
		 "ApplicationService": ["i","o"],
		 "DataObject": ["i","o"],
		 
		 "Node": ["i","o"],
		 "Device": ["i","o"],
		 "SystemSoftware": ["i","o"],
		 "InfrastructureInterface": ["i","o"],
		 "Network": ["i","o"],
		 "CommunicationPath": ["i","o"],
		 "InfrastructureFunction": ["i","o"],
		 "InfrastructureService": ["i","o"],
		 "Artifact": ["i","o"],
		 
		 "Stakeholder": ["i","o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["i","o"],
		 "Deliverable": ["i","o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessInterface" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["c","f","g","o","s","t","u"],
		 "BusinessProcess": ["o","u"],
		 "BusinessFunction": ["o","u"],
		 "BusinessInteraction": ["o","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessProcess" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["c","f","g","o","s","t","u"],
		 "BusinessFunction": ["c","f","g","o","s","t","u"],
		 "BusinessInteraction": ["c","f","g","o","s","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["f","o","r","t","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessFunction" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["c","f","g","o","s","t","u"],
		 "BusinessFunction": ["c","f","g","o","s","t","u"],
		 "BusinessInteraction": ["c","f","g","o","s","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["f","o","r","t","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessInteraction" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["c","f","g","o","s","t","u"],
		 "BusinessFunction": ["c","f","g","o","s","t","u"],
		 "BusinessInteraction": ["c","f","g","o","s","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["f","o","r","t","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t"],
		 "ApplicationCollaboration": ["f","o","t"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessEvent" : {
		 
		 "BusinessActor": ["o","t"],
		 "BusinessRole": ["o","t"],
		 "BusinessCollaboration": ["o","t"],
		 "Location": ["o","t"],
		 "BusinessInterface": ["o","t"],
		 "BusinessProcess": ["o","t"],
		 "BusinessFunction": ["o","t"],
		 "BusinessInteraction": ["o","t"],
		 "BusinessEvent": ["c","g","o","s","t"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o","t"],
		 "ApplicationCollaboration": ["o","t"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["t"],
	 },
	 
	 "BusinessService" : {
		 
		 "BusinessActor": ["o","u"],
		 "BusinessRole": ["o","u"],
		 "BusinessCollaboration": ["o","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["o","u"],
		 "BusinessProcess": ["f","o","t","u"],
		 "BusinessFunction": ["f","o","t","u"],
		 "BusinessInteraction": ["f","o","t","u"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["c","f","g","o","s","t","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
	 "BusinessObject" : {
		 
		 "BusinessActor": ["o"],
		 "BusinessRole": ["o"],
		 "BusinessCollaboration": ["o"],
		 "Location": ["o"],
		 "BusinessInterface": ["o"],
		 "BusinessProcess": ["o"],
		 "BusinessFunction": ["o"],
		 "BusinessInteraction": ["o"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["c","g","o","s"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["c","g","o","s"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
	 },
	 
	 "Representation" : {
		 
		 "BusinessActor": ["o"],
		 "BusinessRole": ["o"],
		 "BusinessCollaboration": ["o"],
		 "Location": ["o"],
		 "BusinessInterface": ["o"],
		 "BusinessProcess": ["o"],
		 "BusinessFunction": ["o"],
		 "BusinessInteraction": ["o"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["o","r"],
		 "Representation": ["c","g","o","s"],
		 "Product": ["o"],
		 "Contract": ["o","r"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
	 },
	 
	 "Product" : {
		 
		 "BusinessActor": ["o","u"],
		 "BusinessRole": ["o","u"],
		 "BusinessCollaboration": ["o","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["o","u"],
		 "BusinessProcess": ["o","u"],
		 "BusinessFunction": ["o","u"],
		 "BusinessInteraction": ["o","u"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["g","o","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["c","g","o","s"],
		 "Contract": ["a","g","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o","u"],
		 "ApplicationCollaboration": ["o","u"],
		 "ApplicationInterface": ["o","u"],
		 "ApplicationFunction": ["o","u"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["g","o","u"],
		 "DataObject": ["a","o"],
		 
		 "Node": ["o","u"],
		 "Device": ["o","u"],
		 "SystemSoftware": ["o","u"],
		 "InfrastructureInterface": ["o","u"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o","u"],
		 "InfrastructureService": ["g","o","u"],
		 "Artifact": ["a","o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
	 },
	 
	 "Contract" : {
		 
		 "BusinessActor": ["o"],
		 "BusinessRole": ["o"],
		 "BusinessCollaboration": ["o"],
		 "Location": ["o"],
		 "BusinessInterface": ["o"],
		 "BusinessProcess": ["o"],
		 "BusinessFunction": ["o"],
		 "BusinessInteraction": ["o"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["c","g","o","s"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["c","g","o","s"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
	 },
	 
	 "Meaning" : {
		 
		 "BusinessActor": ["o"],
		 "BusinessRole": ["o"],
		 "BusinessCollaboration": ["o"],
		 "Location": ["o"],
		 "BusinessInterface": ["o"],
		 "BusinessProcess": ["o"],
		 "BusinessFunction": ["o"],
		 "BusinessInteraction": ["o"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["o"],
		 "Meaning": ["c","g","o","s"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
	 },
	 
	 "Value" : {
		 
		 "BusinessActor": ["o"],
		 "BusinessRole": ["o"],
		 "BusinessCollaboration": ["o"],
		 "Location": ["o"],
		 "BusinessInterface": ["o"],
		 "BusinessProcess": ["o"],
		 "BusinessFunction": ["o"],
		 "BusinessInteraction": ["o"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["o"],
		 "BusinessObject": ["o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["o"],
		 "Meaning": ["o"],
		 "Value": ["c","g","o","s"],
		        
		 "ApplicationComponent": ["o"],
		 "ApplicationCollaboration": ["o"],
		 "ApplicationInterface": ["o"],
		 "ApplicationFunction": ["o"],
		 "ApplicationInteraction": ["o"],
		 "ApplicationService": ["o"],
		 "DataObject": ["o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["o"],
		 "Requirement": ["o"],
		 "Principle": ["o"],
		 "Constraint": ["o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
	 },
	 
	 "ApplicationComponent" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["f","i","o","t","u"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["f","i","o","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","r","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["c","f","g","o","s","t","u"],
		 "ApplicationCollaboration": ["c","f","g","o","s","t","u"],
		 "ApplicationInterface": ["c","f","g","o","t","u"],
		 "ApplicationFunction": ["i","o","u"],
		 "ApplicationInteraction": ["i","o","u"],
		 "ApplicationService": ["i","o","r","u"],
		 "DataObject": ["a","o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },

	 "ApplicationCollaboration" : {
		 
		 "BusinessActor": ["f","o","t","u"],
		 "BusinessRole": ["f","o","t","u"],
		 "BusinessCollaboration": ["f","o","t","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["f","i","o","t","u"],
		 "BusinessFunction": ["f","i","o","t","u"],
		 "BusinessInteraction": ["f","i","o","t","u"],
		 "BusinessEvent": ["o","t"],
		 "BusinessService": ["i","o","r","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["c","f","g","o","s","t","u"],
		 "ApplicationCollaboration": ["c","f","g","o","s","t","u"],
		 "ApplicationInterface": ["c","f","g","o","t","u"],
		 "ApplicationFunction": ["i","o","u"],
		 "ApplicationInteraction": ["i","o","u"],
		 "ApplicationService": ["i","o","r","u"],
		 "DataObject": ["a","o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },

	 "ApplicationInterface" : {
		 
		 "BusinessActor": ["o","u"],
		 "BusinessRole": ["o","u"],
		 "BusinessCollaboration": ["o","u"],
		 "Location": ["o"],
		 "BusinessInterface": ["f","o","t","u"],
		 "BusinessProcess": ["f","o","t","u"],
		 "BusinessFunction": ["f","o","t","u"],
		 "BusinessInteraction": ["o","u"],
		 "BusinessEvent": ["o"],
		 "BusinessService": ["i","o","u"],
		 "BusinessObject": ["a","o"],
		 "Representation": ["o"],
		 "Product": ["o"],
		 "Contract": ["a","o"],
		 "Meaning": ["o"],
		 "Value": ["o"],
		        
		 "ApplicationComponent": ["f","o","t","u"],
		 "ApplicationCollaboration": ["f","o","t","u"],
		 "ApplicationInterface": ["c","f","g","o","s","t","u"],
		 "ApplicationFunction": ["o","u"],
		 "ApplicationInteraction": ["o","u"],
		 "ApplicationService": ["i","o","u"],
		 "DataObject": ["a","o"],
		 
		 "Node": ["o"],
		 "Device": ["o"],
		 "SystemSoftware": ["o"],
		 "InfrastructureInterface": ["o"],
		 "Network": ["o"],
		 "CommunicationPath": ["o"],
		 "InfrastructureFunction": ["o"],
		 "InfrastructureService": ["o"],
		 "Artifact": ["o"],
		 
		 "Stakeholder": ["o"],
		 "Driver": ["o"],
		 "Assessment": ["o"],
		 "Goal": ["r","o"],
		 "Requirement": ["r","o"],
		 "Principle": ["r","o"],
		 "Constraint": ["r","o"],

		 "WorkPackage": ["o"],
		 "Deliverable": ["o"],
		 "Plateau": ["o"],
		 "Gap": ["o"],
		 
		 "Junction": ["f","t"],
	 },
	 
}

