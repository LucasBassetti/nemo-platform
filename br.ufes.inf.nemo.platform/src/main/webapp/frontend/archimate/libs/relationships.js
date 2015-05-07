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
	 
	 
}

