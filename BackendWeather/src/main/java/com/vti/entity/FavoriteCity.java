package com.vti.entity;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

@Entity
@Table(name = "`FavouriteCity`")
//@Table(name = "`FavouriteCity`", catalog = "heroku_02daea0b415b4cd")
public class FavoriteCity implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	FavoriteCityKey favoriteCityId;
	

	@ManyToOne
	@MapsId("FacebookID")
	@JoinColumn(name = "FacebookID", nullable = false)
	@GeneratedValue
    private User user;
	
	@ManyToOne
	@MapsId("CityID")
	@JoinColumn(name = "CityID", nullable = false)
    private City city;


//	public String getUserId() {
//		return user.getId();
//	}
//
//	public void setUser(User user) {
//		this.user = user;
//	}
	
	public int getCountryId() {
		return city.getCountryId();
	}

//	public int getCityId() {
//		return city.getId();
//	}
	
//	public String getCityName() {
//		return city.getName();
//	}
	
	public String getCityLable() {
		return city.getLable();
	}
	
	public void setCity(City city) {
		this.city = city;
	}
	
	public String getCityName() {
		return city.getName();
	}
	

	public FavoriteCity() {
		
	}

	public FavoriteCity(User user, City city) {
		this.user = user;
		this.city = city;
	}

	public FavoriteCity(FavoriteCityKey favoriteCityId, User user, City city) {
		this.favoriteCityId = favoriteCityId;
		this.user = user;
		this.city = city;
	}

	public FavoriteCity(FavoriteCityKey favoriteCityId) {
		this.favoriteCityId = favoriteCityId;
	}
	@Override
	public String toString() {
		return "FavoriteCity [cityId=" + city.getId() + "cityName= "+city.getName()+"cityLabel: "+city.getLable()+"countryId: "+city.getCountryId()+ "]";
	}

	
}
