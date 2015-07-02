package br.ufes.inf.nemo.platform.connection;

import java.io.FileInputStream;
import java.io.FileNotFoundException;

import org.openrdf.model.Graph;
import org.openrdf.model.Resource;
import org.openrdf.model.impl.ValueFactoryImpl;
import org.openrdf.rio.RDFFormat;

import com.complexible.common.openrdf.model.Graphs;
import com.complexible.stardog.StardogException;
import com.complexible.stardog.api.Connection;
import com.complexible.stardog.api.ConnectionConfiguration;
import com.complexible.stardog.api.admin.AdminConnection;
import com.complexible.stardog.api.admin.AdminConnectionConfiguration;

public class StardogConnection {

	private static StardogConnection instance;  
	  
    private StardogConnection() {  
        // cria conexões para o banco de dados  
    }  
  
    public synchronized static StardogConnection getInstance() {  
        if( instance == null ) {  
            instance = new StardogConnection();  
        }  
        return instance;  
    }  
  
    public void getConnection()  {  

		try {
			AdminConnection aAdminConnection = AdminConnectionConfiguration.toEmbeddedServer().credentials("admin", "admin").server("http://localhost:5820/").connect();
			
			if (aAdminConnection.list().contains("testConnectionAPI")) {
				aAdminConnection.drop("testConnectionAPI");
			}
	 
			// Convenience function for creating a non-persistent in-memory database with all the default settings.
			aAdminConnection.createMemory("testConnectionAPI");
			
			Connection aConn = ConnectionConfiguration
	                   .to("testConnectionAPI")
	                   .credentials("admin", "admin").server("http://localhost:5820/")
	                   .connect();
			
			aConn.begin();
			
			aConn.add().io()
			.format(RDFFormat.N3)
			.stream(new FileInputStream("data/sp2b_10k.n3"));

			Graph aGraph = Graphs.newGraph(ValueFactoryImpl.getInstance()
								       .createStatement(ValueFactoryImpl.getInstance().createURI("urn:subj"),
					 		 				ValueFactoryImpl.getInstance().createURI("urn:pred"),
					                 				ValueFactoryImpl.getInstance().createURI("urn:obj")));
	
			Resource aContext = ValueFactoryImpl.getInstance().createURI("urn:test:context");
	
			aConn.add().graph(aGraph, aContext);
	
			aConn.commit();
			
			aConn.close();
			//you must always log out of the dbms.
			aAdminConnection.close();
		} catch (StardogException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		

    	
    	
    }  
	
}
