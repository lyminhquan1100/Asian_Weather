package com.vti.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.entity.Country;

public interface ICountryRepository extends JpaRepository<Country, Integer>,JpaSpecificationExecutor<Country> {
	public Country findByName(String name);
	
	public Country findById(int id);
	
	public Country findByCapitalName(String name);
}
