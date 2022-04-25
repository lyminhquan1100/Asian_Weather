package com.vti.dto;

import com.vti.entity.User;

/**
 * This class is User DTO.
 * 
 * @Description: .
 * @author: Đinh Huy Khánh
 * @create_date: 3/5/2021
 * @version: 1.0
 * @modifer: 
 * @modifer_date: 
 * @return : userProfile
 */
public class UserDTO {
	
	private String id;
	private String name;
	private String email;
	private String password;
	
	
	public UserDTO(String id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public UserDTO(String id, String name, String email) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
	}
	
	public User toEntity(UserDTO user) {
		return new User( id, name, email);
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
}
