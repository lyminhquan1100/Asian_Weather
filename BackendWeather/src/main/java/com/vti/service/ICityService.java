package com.vti.service;

import java.util.List;

import com.vti.entity.City;

public interface ICityService {

	public List<City> getAllCities(String search);
	
	public City getCityByName(String name);
	
	public City getCityById(int id);
}