package com.wtc.samplems.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wtc.samplems.models.Person;
import com.wtc.samplems.models.PersonDao;

/**
 * 
 * @author Pranav Kumar
 *
 */
@Controller
@RequestMapping("/person")
public class PersonController {
	// ------------------------
		  // PRIVATE FIELDS
		  // -----------------------
	
	 @Autowired
	  private PersonDao personDao;
	 
	 
	// ------------------------
	  // PUBLIC METHODS
	  // ------------------------
	  
	  /**
	   * /create  --> Create a new person and save it in the database.
	   * 
	   * @param email Person's email
	   * @param name Person's name
	   * @return A string describing if the person is succesfully created or not.
	   */
	  @RequestMapping("/create")
	  @ResponseBody
	  public String create(String email, String name) {
	    Person person = null;
	    try {
	      person = new Person(email, name);
	      personDao.save(person);
	    }
	    catch (Exception ex) {
	      return "Error creating the person: " + ex.toString();
	    }
	    return "Person succesfully created! (id = " + person.getId() + ")";
	  }
	  
	  /**
	   * /delete  --> Delete the person having the passed id.
	   * 
	   * @param id The id of the person to delete
	   * @return A string describing if the person is succesfully deleted or not.
	   */
	  @RequestMapping("/delete")
	  @ResponseBody
	  public String delete(long id) {
	    try {
	      Person person = new Person(id);
	      personDao.delete(person);
	    }
	    catch (Exception ex) {
	      return "Error deleting the person: " + ex.toString();
	    }
	    return "Person succesfully deleted!";
	  }
	  
	  /**
	   * /get-by-email  --> Return the id for the person having the passed email.
	   * 
	   * @param email The email to search in the database.
	   * @return The person id or a message error if the person is not found.
	   */
	  @RequestMapping("/get-by-email")
	  @ResponseBody
	  public String getByEmail(String email) {
	    String personId;
	    try {
	      Person person = personDao.findByEmail(email);
	      personId = String.valueOf(person.getId());
	    }
	    catch (Exception ex) {
	      return "Person not found";
	    }
	    return "The person id is: " + personId;
	  }
	  
	  /**
	   * /update  --> Update the email and the name for the person in the database 
	   * having the passed id.
	   * 
	   * @param id The id for the person to update.
	   * @param email The new email.
	   * @param name The new name.
	   * @return A string describing if the person is succesfully updated or not.
	   */
	  @RequestMapping("/update")
	  @ResponseBody
	  public String updatePerson(long id, String email, String name) {
	    try {
	      Person person = personDao.findOne(id);
	      person.setEmail(email);
	      person.setName(name);
	      personDao.save(person);
	    }
	    catch (Exception ex) {
	      return "Error updating the person: " + ex.toString();
	    }
	    return "Person succesfully updated!";
	  }
	  

}
