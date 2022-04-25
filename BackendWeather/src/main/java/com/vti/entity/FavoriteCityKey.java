package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class FavoriteCityKey implements Serializable {

	private static final long serialVersionUID = 1L;
	
	
	@Column(name = "FacebookID", length = 100)
	private String facebookId;
	
	@Column(name = "CityID")
	private int cityId;

	public String getFacebookId() {
		return facebookId;
	}

	public void setFacebookId(String facebookId) {
		this.facebookId = facebookId;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	
	public FavoriteCityKey() {
		
	}

	public FavoriteCityKey(String facebookId, int cityId) {
		this.facebookId = facebookId;
		this.cityId = cityId;
	}
	
	
}
