package com.vti.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.vti.entity.Country;
import com.vti.service.ICountryService;

@RestController
@RequestMapping(value = "api/v1/countries")
@CrossOrigin("*")
public class CountryController {
	@Autowired
	private ICountryService service;
	
	/**
	 * Get country by id
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : Country information
	 */
	@GetMapping(value = "id/{id}")
	public ResponseEntity<?> getCountryById(@PathVariable(name = "id") int id) {
		return new ResponseEntity<Country>(service.getCountryById(id), HttpStatus.OK);
	}
	
	/**
	 * Get country by name
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : Country information
	 */
	@GetMapping(value = "name/{name}")
	public ResponseEntity<?> getCountryByName(@PathVariable(name = "name") String name) {
		return new ResponseEntity<Country>(service.getCountryByName(name), HttpStatus.OK);
	}
	
	/**
	 * Get capital of country by name country
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : Country information
	 */
	@GetMapping(value = "capital/{name}")
	public ResponseEntity<?> getCapitalOfCountryByName(@PathVariable(name = "name") String name) {
		return new ResponseEntity<Country>(service.getCapitalOfCountryByName(name), HttpStatus.OK);
	}
}
