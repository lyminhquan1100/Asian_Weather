package com.vti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Admin;

public interface IAdminRepository extends JpaRepository<Admin, Integer>, JpaSpecificationExecutor<Admin> {

	public boolean existsByEmailAndPassword(String email, String password);
	
	Admin findByEmail(String email);
//	Admin find
	
	boolean existsByEmail(String email);
}
