package kr.co.dangdang.web.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionConfig {

	@ExceptionHandler(Exception.class)
	public String error(Exception e) {
		
		return "error";
	}
	
}
