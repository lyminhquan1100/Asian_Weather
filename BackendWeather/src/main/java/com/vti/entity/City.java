package com.vti.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "`City`")
//@Table(name = "`City`", catalog = "heroku_02daea0b415b4cd")

public class City implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "CityName", nullable = false, length = 255)
	private String name;
	
	@Column(name = "`Description`",length = 100)
	private String description;
	
	@Column(name = "LabelName", nullable = false, length = 255)
	private String lable;
	
	@OneToMany(mappedBy = "city")
	private List<FavoriteCity> favoriteCity;

	@ManyToOne
    @JoinColumn(name = "CountryID", referencedColumnName = "id", nullable = false)
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
		return "City [id=" + id + ", name=" + name + ", description=" + description + ", lable=" + lable + ", countryId="
				+ country.getId() + "]";
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

	
	public int getCountryId() {
		return country.getId();
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public City() {
		
	}

	public City(int id, String name, String description, String lable, Country country) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.lable = lable;
		this.country = country;
	}

	public String getLable() {
		return lable;
	}

	public void setLable(String lable) {
		this.lable = lable;
	}

	

	

}
