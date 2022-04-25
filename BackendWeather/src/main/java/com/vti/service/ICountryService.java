package com.vti.service;

import com.vti.entity.Country;

public interface ICountryService {
	public Country getCountryByName(String name);
	
	public Country getCountryById(int id);
	
	public Country getCapitalOfCountryByName(String name);
	
}
