/**
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Lucas Bassetti R. da Fonseca
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 */

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
		"Group",
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