package com.vti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.vti.entity.Country;
import com.vti.repository.ICountryRepository;

@Service
public class CountryService implements ICountryService {
	
	@Autowired
	private ICountryRepository repository;

	
	public Country getCountryByName(String name) {
		return repository.findByName(name);
	}

	@Override
	public Country getCountryById(int id) {
		return repository.findById(id);
	}

	@Override
	public Country getCapitalOfCountryByName(String name) {
		return repository.findByCapitalName(name);
	}

}
