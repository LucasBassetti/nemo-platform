package br.ufes.inf.nemo.platform.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.ufes.inf.nemo.platform.util.FileUtil;

@Controller
public class PlatformFileController {

	
	/**
	 * Procedure to delete a model.
	 * @param filename
	 */	
	@RequestMapping("/deleteModel")
	public @ResponseBody void deleteModel(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename) {
		
		String path = FileUtil.replaceSlash(FileUtil.repositoryFolder + stencil + "/" + filename + "/");
		File dir = new File(path);
		
		for(File file : dir.listFiles()){ 
			file.delete();
		}
		
		dir.delete();
	}
	
	
	/**
	 * Procedure to check if a model file exist.
	 * @param filename
	 * @return
	 */
	@RequestMapping(value = "/checkModelFile", method = RequestMethod.POST)
	protected @ResponseBody String checkModelFile(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename){

		filename = FileUtil.replaceSlash(stencil + "/" + filename + "/" + filename + FileUtil.NP_EXTENSION);
		if(FileUtil.checkRepositoryFileExist(filename)){
			return "exist";
		}
		
		return null;
	}
	
	
	/**
	 * Procedure to save tree
	 * @param stencil
	 * @param filename
	 * @param tree
	 */
	@RequestMapping(value = "/saveTree", method = RequestMethod.POST)
	public @ResponseBody void saveTree(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename, @RequestParam("tree") String tree) {
		// TODO Auto-generated method stub
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		FileUtil.createRepositoryFolder(path);
		try {
			File file = FileUtil.createRepositoryFile(path + filename);
			FileUtil.writeToFile(file, tree);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * Procedure to save graph
	 * @param stencil
	 * @param filename
	 * @param graph
	 */
	@RequestMapping(value = "/saveGraph", method = RequestMethod.POST)
	public @ResponseBody void saveGraph(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename, @RequestParam("graph") String graph) {
		// TODO Auto-generated method stub
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		FileUtil.createRepositoryFolder(path);
		try {
			File file = FileUtil.createRepositoryBakFile(path + filename);
			FileUtil.writeToFile(file, graph);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * Procedure to get all Model saved files.
	 * @return
	 */
	@RequestMapping(value = "/getAllModels", method = RequestMethod.POST)
	protected @ResponseBody String getAllModels(@RequestParam("stencil") String stencil){
		String[] models = FileUtil.getAllRepositoryJSONFileNames(stencil);
		return FileUtil.parseStringToJSON("model", models);
	}
	
	/**
	 * Procedure to open tree
	 * @param stencil
	 * @param filename
	 * @return
	 */
	@RequestMapping(value = "/openTree", method = RequestMethod.POST)
	public @ResponseBody String openTree(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename){
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		return FileUtil.openRepositoryFileAsString(path + filename);
		
	}
	
	/**
	 * Procedure to open graph
	 * @param stencil
	 * @param filename
	 * @return
	 */
	@RequestMapping(value = "/openGraph", method = RequestMethod.POST)
	public @ResponseBody String openGraph(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename){
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		return FileUtil.openRepositoryBakFileAsString(path + filename);
		
	}
	
	
}