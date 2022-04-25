package com.vti.service;

import com.vti.entity.Filter;
import com.vti.entity.User;
import com.vti.utils.ResponseJwt;

public interface IUserService {
	public User getUserById(String id);
	public boolean isExistsUserById(String id);
	public void createUser(User user);
	public ResponseJwt getAllUsers(String search, Filter filter);
	public long countIdByUser();
}
