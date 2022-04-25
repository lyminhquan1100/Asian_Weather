package com.vti.entity;

import java.io.Serializable;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "`Country`")
//@Table(name = "`Country`", catalog = "heroku_02daea0b415b4cd")
public class Country implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "CountryName", nullable = false, length = 255)
	private String name;
	
	@Column(name = "CapitalName", nullable = false, length = 255)
	private String capitalName;
	
	@Column(name = "FlagImage", nullable = false, length = 800)
	private String flagImage;
	
	@Column(name = "LabelName", nullable = false, length = 255)
	private String lable;
	
	@Column(name = "`Description`", length = 100)
	private String description;
	
	@OneToMany(mappedBy = "country")
	private List<City> cities;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCapitalName() {
		return capitalName;
	}

	public void setCapitalName(String capitalName) {
		this.capitalName = capitalName;
	}

	public String getFlagImage() {
		return flagImage;
	}

	public void setFlagImage(String flagImage) {
		this.flagImage = flagImage;
	}

	public String getLable() {
		return lable;
	}

	public void setLable(String lable) {
		this.lable = lable;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCities(List<City> cities) {
		this.cities = cities;
	}

	public Country() {
		super();
	}

	public Country(int id, String name, String capitalName, String flagImage, String lable, String description
			) {
		super();
		this.id = id;
		this.name = name;
		this.capitalName = capitalName;
		this.flagImage = flagImage;
		this.lable = lable;
		this.description = description;
	}

	@Override
	public String toString() {
		return "Country [id=" + id + ", name=" + name + ", capitalName=" + capitalName + ", flagImage=" + flagImage
				+ ", lable=" + lable + ", description=" + description + "]";
	}
	
	
	
}
