package br.ufes.inf.nemo.platform.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintStream;

public class FileUtil {

	public static String NP_EXTENSION = ".np";
	public static String BAK_EXTENSION = ".bak";
	
	public static String path;
	public static String repositoryFolder;
	
	public void setPath(String path) {
		FileUtil.path = System.getProperty("user.home") + path;
		FileUtil.repositoryFolder = FileUtil.replaceSlash(FileUtil.path + "/nemo/platform/repository/");
		FileUtil.createRepository(FileUtil.repositoryFolder);
	}
	
	/**
	 * Procedure to replace slash.
	 * @param path
	 */
	public static String replaceSlash(String value){
		if(System.getProperty("os.name").contains("Windows")){		
			return value = value.replaceAll("/", "\\\\");
		}
		
		return value;
	}
	
	/**
	 * Procedure to create repository folder.
	 * @param path
	 */
	public static void createRepositoryFolder(String path){
		FileUtil.createRepository(FileUtil.repositoryFolder + path);
	}
	
	/**
	 * Procedure to create folders if they do not exist.
	 * @param path
	 */
	private static void createRepository(String path){
		
		File file = new File(path);
		if (!file.exists()) {
			if (file.mkdirs()) {
				System.out.println("Directory is created!");
			} else {
				System.out.println("Failed to create directory!");
			}
		}
		
	}
	
	/**
	 * Generic procedure to check if file already exist in repository.
	 * @param filename
	 * @return
	 */
	private static Boolean checkFileExist(String path){
		
		File f = new File(path);
		if(f.exists()){
			return true;
		}
		
		return false;
	}
	
	/**
	 * Procedure to create a Repository File
	 * @param filename
	 * @return
	 */
	public static File createRepositoryFile(String filename) {
		return FileUtil.createFile(FileUtil.repositoryFolder, filename + FileUtil.NP_EXTENSION);
	}
	
	/**
	 * Procedure to create a Repository Bak File
	 * @param filename
	 * @return
	 */
	public static File createRepositoryBakFile(String filename) {
		return FileUtil.createFile(FileUtil.repositoryFolder, filename + FileUtil.BAK_EXTENSION);
	}
	
	/** 
	 * Generic Procedure for creating a File.
	 * @param path
	 * @param filename
	 * @return
	 */
    private static File createFile (String path, String filename) 
    {    	
		File file = new File(path + filename);		
		if (!file.exists()) {	
			try{
				file.createNewFile();
			}catch(IOException e){
				e.printStackTrace();
			}
		}
		return file;
	}
    
    /**
     * Procedure for write a String content in a File.
     * @param file
     * @param content
     * @throws IOException
     */
    public static void writeToFile (File file, String content) throws IOException
   	{
    	PrintStream printStream = new PrintStream(file);
		printStream.print(content);
		printStream.close();				
   	}
    
    /**
    * Generic procedure to gett all folder names
    * @param path
    * @param extension
    * @return
    */
    private static String[] getAllFolderNames(String path){

    	File folder = new File(path);

    	FilenameFilter filter = new FilenameFilter(){

    		@Override
    		public boolean accept(File dir, String name) {

    			if(name.substring(0, 1).equals(".") || dir.isHidden()){
    				return false;
    			}

    			return true;
    		}

    	};

    	return folder.list(filter);

    }
	
    /**
     * Procedure to open a repository file as string
     * @param filename
     * @return
     */
    public static String openRepositoryFileAsString(String filename) {
    	return FileUtil.openFileAsString(FileUtil.repositoryFolder, filename + FileUtil.NP_EXTENSION);
    }
    
    /**
     * Procedure to open a repository bak file as string
     * @param filename
     * @return
     */
    public static String openRepositoryBakFileAsString(String filename) {
    	return FileUtil.openFileAsString(FileUtil.repositoryFolder, filename + FileUtil.BAK_EXTENSION);
    }
    
    /**
     * Generic procedure to open a file as String.
     * @param filename
     * @return
     */
    private static String openFileAsString(String path, String filename){
    	
    	String content = "";
    	
		try {
 
			String line;
			
			BufferedReader br = new BufferedReader(new FileReader(path + filename));
			
			while ((line = br.readLine()) != null) {
				content = content + line;
			}
			
			br.close();
 
		} catch (IOException e) {
			//e.printStackTrace();
		}
		
		return content;
    	
    }
    
}
