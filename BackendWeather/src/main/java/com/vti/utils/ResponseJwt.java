package com.vti.utils;


/**
 * This class Response JWT.
 * 
 * @Description: .
 * @author: Đinh Huy Khánh
 * @create_date: 3/5/2021
 * @version: 1.0
 * @modifer: 
 * @modifer_date: 
 */	
public class ResponseJwt {
	
	private String message;
	private Object data;
	public ResponseJwt() {
		super();
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
	
	

}
