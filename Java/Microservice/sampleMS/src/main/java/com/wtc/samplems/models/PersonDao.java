package com.wtc.samplems.models;


import javax.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;

/**
 * 
 * @author Pranav Kumar
 *
 */
@Transactional
public interface PersonDao  extends CrudRepository<Person, Long>{
	
	/**
	   * Return the user having the passed email or null if no user is found.
	   * 
	   * @param email the user email.
	   */
	  public Person findByEmail(String email);

}
