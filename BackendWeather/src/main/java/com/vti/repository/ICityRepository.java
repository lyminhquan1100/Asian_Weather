package com.vti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.City;

public interface ICityRepository extends JpaRepository<City, Integer>,JpaSpecificationExecutor<City> {

	public City findByName(String name);
	
	public City findById(int id);
}
