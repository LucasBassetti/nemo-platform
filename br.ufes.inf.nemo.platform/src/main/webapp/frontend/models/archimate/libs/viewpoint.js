/*
 * Template:
 * 
 * "ViewpointName1" = [
 * 		"ArchiMateElement1",
 * 		"ArchiMateElement2",
 * 		...
 * ],
 * "ViewpointName2" = [
 * 		"ArchiMateElement1",
 * 		"ArchiMateElement2",
 * 		...
 * ],
 * ...
 */

var viewpoint = 
{
	"Total" : [
	
		"BusinessActor",
		"BusinessRole",
		"BusinessCollaboration",
		"Location",
		"BusinessInterface",
		"BusinessProcess",
		"BusinessFunction",
		"BusinessInteraction",
		"BusinessEvent",
		"BusinessService",
		"BusinessObject",
		"Representation",
		"Product",
		"Contract",
		"Meaning",
		"Value",
		
		"ApplicationComponent",
		"ApplicationCollaboration",
		"ApplicationInterface",
		"ApplicationFunction",
		"ApplicationInteraction",
		"ApplicationService",
		"DataObject",
		
		"Node",
		"Device",
		"SystemSoftware",
		"InfrastructureInterface",
		"Network",
		"CommunicationPath",
		"InfrastructureFunction",
		"InfrastructureService",
		"Artifact",
		
		"Stakeholder",
		"Driver",
		"Assessment",
		"Goal",
		"Requirement",
		"Principle",
		"Constraint",
		
		"WorkPackage",
		"Deliverable",
		"Plateau",
		"Gap",
		
		"Junction",
	],

	"Actor Co-operation": [
	  
		"BusinessActor",
		"BusinessRole",
		"BusinessCollaboration",
		"BusinessInterface",
		"BusinessService",
		
		"ApplicationComponent",
		"ApplicationInterface",
		"ApplicationService",
   		
   		"Junction", 
	],

	"Application Behaviour": [
	
		"ApplicationComponent",
		"ApplicationCollaboration",
		"ApplicationInterface",
		"ApplicationFunction",
		"ApplicationInteraction",
		"ApplicationService",
		"DataObject",
   		
   		"Junction", 
	],


	"Application Co-operation": [

	    "Location",
	    
		"ApplicationComponent",
		"ApplicationCollaboration",
		"ApplicationInterface",
		"ApplicationFunction",
		"ApplicationInteraction",
		"ApplicationService",
		"DataObject",
   		
   		"Junction", 
	],

	"Application Structure": [

  		"ApplicationComponent",
  		"ApplicationCollaboration",
  		"ApplicationInterface",
  		"DataObject",
   		
   		"Junction", 
	],

	"Application Usage": [

  		"BusinessRole",
  		"BusinessProcess",
  		"BusinessFunction",
  		"BusinessInteraction",
  		"BusinessEvent",
  		"BusinessObject",
  		
  		"ApplicationComponent",
  		"ApplicationCollaboration",
  		"ApplicationInterface",
  		"ApplicationService",
  		"DataObject",
   		
   		"Junction", 
	],
	
	"Business Function": [
	                      
		"BusinessActor",
		"BusinessRole",
		"BusinessFunction",   
   		
   		"Junction", 
	],
	                      	
	"Business Process": [

 		"BusinessActor",
 		"BusinessRole",
 		"BusinessCollaboration",
 		"Location",
 		"BusinessProcess",
 		"BusinessFunction",
 		"BusinessInteraction",
 		"BusinessEvent",
 		"BusinessService",
 		"BusinessObject",
 		"Representation",
 		
 		"ApplicationService",
   		
   		"Junction", 
	],
	
	"Business Proces Co-operation": [

  		"BusinessActor",
  		"BusinessRole",
  		"BusinessCollaboration",
  		"Location",
  		"BusinessProcess",
  		"BusinessFunction",
  		"BusinessInteraction",
  		"BusinessEvent",
  		"BusinessService",
  		"BusinessObject",
  		"Representation",
  		
  		"ApplicationService",    
   		
   		"Junction", 
	],
	
	"Business Product": [
	                 	
 		"BusinessActor",
 		"BusinessRole",
 		"BusinessInterface",
 		"BusinessProcess",
 		"BusinessFunction",
 		"BusinessInteraction",
 		"BusinessEvent",
 		"BusinessService",
 		"Product",
 		"Contract",
 		"Value",
 		
 		"ApplicationComponent",
 		"ApplicationInterface",
 		"ApplicationService",
   		
   		"Junction",       	
	],
	
	"Goal Contribution": [

  		"Goal",
  		"Requirement",
  		"Principle",
  		"Constraint",
	],
  	
	"Goal Realisation": [

   		"Goal",
   		"Requirement",
   		"Principle",
   		"Constraint",                    	
	],
	
	"Implementation and Deployment": [
	                              	
  		"ApplicationComponent",
  		"ApplicationCollaboration",
  		"DataObject",
  		
  		"Node",
  		"Device",
  		"SystemSoftware",
  		"Network",
  		"CommunicationPath",
  		"InfrastructureService",
  		"Artifact",
  		
  		"Junction",	 		                      	
	 ],

	"Implementation and Migration": [
	                             	
 		"BusinessActor",
 		"BusinessRole",
 		"BusinessCollaboration",
 		"Location",
 		"BusinessInterface",
 		"BusinessProcess",
 		"BusinessFunction",
 		"BusinessInteraction",
 		"BusinessEvent",
 		"BusinessService",
 		"BusinessObject",
 		"Representation",
 		"Product",
 		
 		"ApplicationComponent",
 		"ApplicationCollaboration",
 		"ApplicationInterface",
 		"ApplicationFunction",
 		"ApplicationInteraction",
 		"ApplicationService",
 		"DataObject",
 		
 		"Node",
 		"Device",
 		"SystemSoftware",
 		"InfrastructureInterface",
 		"Network",
 		"CommunicationPath",
 		"InfrastructureFunction",
 		"InfrastructureService",
 		"Artifact",
 		
 		"Goal",
 		"Requirement",
 		"Constraint",
 		
 		"WorkPackage",
 		"Deliverable",
 		"Plateau",
 		"Gap",
 		
 		"Junction",	                      	
	],
	
	"Information Structure": [
	                      	
  		"BusinessObject",
  		"Representation",
  		"Meaning",
  		
  		"DataObject",
  		
  		"Artifact",
  		
  		"Junction",		                      	
	],
	
	"Infrastructure": [
	               	
   		"Location",
   		
   		"Node",
   		"Device",
   		"SystemSoftware",
   		"InfrastructureInterface",
   		"Network",
   		"CommunicationPath",
   		"InfrastructureFunction",
   		"InfrastructureService",
   		"Artifact",
   		
   		"Junction",	                      	
	],
	
	"Infrastructure Usage": [
	                 		
 		"ApplicationComponent",
 		"ApplicationFunction",
 		
 		"Node",
 		"Device",
 		"SystemSoftware",
 		"InfrastructureInterface",
 		"Network",
 		"CommunicationPath",
 		"InfrastructureFunction",
 		"InfrastructureService",
 		
 		"Junction",		                      	
	],

	"Layered": [
	        	
		"BusinessActor",
		"BusinessRole",
		"BusinessCollaboration",
		"Location",
		"BusinessInterface",
		"BusinessProcess",
		"BusinessFunction",
		"BusinessInteraction",
		"BusinessEvent",
		"BusinessService",
		"BusinessObject",
		"Representation",
		"Product",
		"Contract",
		"Meaning",
		"Value",
		
		"ApplicationComponent",
		"ApplicationCollaboration",
		"ApplicationInterface",
		"ApplicationFunction",
		"ApplicationInteraction",
		"ApplicationService",
		"DataObject",
		
		"Node",
		"Device",
		"SystemSoftware",
		"InfrastructureInterface",
		"Network",
		"CommunicationPath",
		"InfrastructureFunction",
		"InfrastructureService",
		"Artifact",
		
		"Stakeholder",
		"Driver",
		"Assessment",
		"Goal",
		"Requirement",
		"Principle",
		"Constraint",
		
		"WorkPackage",
		"Deliverable",
		"Plateau",
		"Gap",
		
		"Junction",	                      	
	],
	
	"Migration": [
      	
  		"Plateau",
  		"Gap",
  		
  		"Junction",		                      	
	],
	
	"Motivation": [
	               
   		"Stakeholder",
   		"Driver",
   		"Assessment",
   		"Goal",
   		"Requirement",
   		"Principle",
   		"Constraint",
 	],
	
	"Organisation": [
	
		"BusinessActor",
		"BusinessRole",
		"BusinessCollaboration",
		"Location",
		"BusinessInterface",
   		
   		"Junction", 
	],
	
 	"Principles": [
 	          	
  		"Goal",
  		"Principle",
 	],
 	
 	"Project": [
 	       	
   		"BusinessActor",
   		"BusinessRole",
   		
   		"Goal",
   		
   		"WorkPackage",
   		"Deliverable",
   		
   		"Junction", 		                      	
 	],

 	"Requirements Realisation": [
 	                        	
		"BusinessActor",
		"BusinessRole",
		"BusinessCollaboration",
		"Location",
		"BusinessInterface",
		"BusinessProcess",
		"BusinessFunction",
		"BusinessInteraction",
		"BusinessEvent",
		"BusinessService",
		"BusinessObject",
		"Representation",
		"Product",
		
		"ApplicationComponent",
		"ApplicationCollaboration",
		"ApplicationInterface",
		"ApplicationFunction",
		"ApplicationInteraction",
		"ApplicationService",
		"DataObject",
		
		"Node",
		"Device",
		"SystemSoftware",
		"InfrastructureInterface",
		"Network",
		"CommunicationPath",
		"InfrastructureFunction",
		"InfrastructureService",
		"Artifact",
		
		"Goal",
		"Requirement",
		"Constraint",
		
		"Junction", 	                      	
 	],
 	
 	"Service Realisation": [
 	                   	
   		"BusinessActor",
   		"BusinessRole",
   		"BusinessCollaboration",
   		"BusinessProcess",
   		"BusinessFunction",
   		"BusinessInteraction",
   		"BusinessEvent",
   		"BusinessService",
   		"BusinessObject",
   		
   		"ApplicationComponent",
   		"ApplicationCollaboration",
   		"ApplicationService",
   		"DataObject",
   		
   		"Junction", 		                      	
 	],

 	"Stakeholder": [
 	                
   		"Stakeholder",
   		"Driver",
   		"Assessment",
   		"Goal",
 	],
}