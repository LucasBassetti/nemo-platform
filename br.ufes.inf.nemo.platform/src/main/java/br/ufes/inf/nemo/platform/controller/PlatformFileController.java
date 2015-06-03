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
	
	@RequestMapping(value = "/openTree", method = RequestMethod.POST)
	public @ResponseBody String openTree(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename){
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		return FileUtil.openRepositoryFileAsString(path + filename);
		
	}
	
	@RequestMapping(value = "/openGraph", method = RequestMethod.POST)
	public @ResponseBody String openGraph(@RequestParam("stencil") String stencil, @RequestParam("filename") String filename){
		
		String path = FileUtil.replaceSlash(stencil + "/" + filename + "/");
		return FileUtil.openRepositoryBakFileAsString(path + filename);
		
	}
	
	
}