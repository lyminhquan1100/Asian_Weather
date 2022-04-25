package com.vti.dto;

import com.vti.entity.City;
import com.vti.entity.Country;

public class CityDTO {

	private int id;
	
	private String name;
	
	private String description;
	
	private String lable;

    private Country country;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	@Override
	public String toString() {
		return "City [id=" + id + ", name=" + name + ", description=" + description + ", lable=" + lable + ", country="
				+ country + "]";
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public CityDTO() {
		
	}

	public String getLable() {
		return lable;
	}

	public void setLable(String lable) {
		this.lable = lable;
	}

	public CityDTO(int id, String name, String description, String lable, Country country) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.lable = lable;
		this.country = country;
	}
	public City convertToCity(){
		return new City(id,name,description,lable,country);
	}
	
}




















