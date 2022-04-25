package com.vti.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.vti.entity.RoleUser;

public interface RoleUserRepository extends CrudRepository<RoleUser, Integer>{
	
	  @Transactional(readOnly = true)
	    @Query("select u from role_user u where u.userId = :id")
	    Iterable<RoleUser> findRolesOfUser(@Param("id") int adminId);

}
