package com.wtc.samplems.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 
 * @author Pranav Kumar
 *
 */
@Aspect
@Component
public class LoggingAspect {
	
	Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	
	@Before("execution(* com.wtc.samplems.controller.*.*(..))")
	public void logServicebefore(JoinPoint joinPoint) {
		logger.debug("Completed: " + joinPoint);
		System.out.println( "Completed: " + joinPoint );
	}
	@AfterReturning("execution(* com.wtc.samplems.controller.*.*(..))")
	public void logServiceAccess(JoinPoint joinPoint) {
		logger.debug("Completed: " + joinPoint);
		System.out.println( "Completed: " + joinPoint );
	}

}
