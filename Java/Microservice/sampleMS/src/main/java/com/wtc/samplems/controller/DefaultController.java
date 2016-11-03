package com.wtc.samplems.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 
 * @author Pranav
 *
 */
@Controller
public class DefaultController {
	
	@RequestMapping("/")
	@ResponseBody
	  public String index() {
	    return "Developed by " +
	        "<a href='http://www.walkingtree.tech'>Walking Tree</a> :)";
	    
	    //Some Interesting message
	  }

}
