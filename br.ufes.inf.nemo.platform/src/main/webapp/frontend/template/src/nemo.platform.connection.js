nemo.platform.Connection = Backbone.Model.extend({
	
	connection : undefined,
	
	endpoint : "http://localhost:5820/",
	username : "admin",
	password : "admin",
	
	database : "testDB",
	
	initialize : function() {

		this.initializeConnection();
		this.initializeDB();
		
	},
	
	initializeConnection : function() {
		
		var endpoint = this.endpoint;
		var username = this.username;
		var password = this.password;
		
		if(!this.connection) {
			this.connection = new Stardog.Connection();
			this.connection.setEndpoint(endpoint);
			this.connection.setCredentials(username, password);
			console.log('START CONNECTION!');
		}
		
	},
	
	initializeDB : function() {
		
		var $this = this;
		var exist = false;
		
		var database = this.database;
		
		this.connection.listDBs(function(data) {
            _.each(data.databases, function (dbName) {
            	if(dbName === database) {
            		console.log('Database: ' + dbName);
            		exist = true;
            	}
            });
            
            //if database not exist, create it!
            if(!exist) {
    			$this.createDB(database);
    		}
        }); 
		
	},
	
	setDB : function(database) {
		this.database = database;
	},
	
	getDB : function() {
		return this.database;
	},
	
	createDB : function(database) {
		
		var options = {
			"database" : database,
			"options" : {
				"database.namespaces" : [
					"np=http://localhost:8080/nemo-platform/ontology#",
				],
			},
			"files" : [],	
		};
		
		this.connection.createDB(
			options,
			function(data) {
				console.log('DATABASE CREATED!');
			});
		
	},
	
	testQuery : function() {
		
		
		
		var options = {
				"database" : this.database,
			};  
			
			this.connection.getDB(options, function(data) {
				console.log(JSON.stringify(data));
				//return data;
			});
		
			this.connection.getNamespaces(options, function(data) {
				console.log('NS: ' + JSON.stringify(data));
			});
			
//		this.connection.query({
//	        database: "testConnectionAPI",
//	        query: "select distinct * where { ?s ?p ?o }",  
//	        limit: 10,
//	        offset: 0,
//		},
//		function (data) {
//	        console.log(JSON.stringify(data.results.bindings));
//	    });
		
		var query = ' INSERT DATA { np:Test rdf:type owl:Class .' + 
					' np:Test rdfs:label "Test" . }';
			
		this.connection.query({
	        database: "testDB",
	        query: query,  
		},
		function (data) {
	        console.log(JSON.stringify(data));
	    });
		
		
		
		//this.connection.shutdownServer();
		
//		this.connection.dropDB({
//			"database" : "testDB",
//		}, function(data) {
//			console.log('DATABASE DROPPED!');
//		});
		
	},

});