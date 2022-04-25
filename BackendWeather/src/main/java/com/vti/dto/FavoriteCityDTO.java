package com.vti.dto;

import com.vti.entity.City;
import com.vti.entity.FavoriteCity;
import com.vti.entity.FavoriteCityKey;
import com.vti.entity.User;

public class FavoriteCityDTO {
	
	private User user;
	private City city;
	
	private String userId;
	private int cityId;
	private FavoriteCityKey favoriteCityKey;
	
	public User getUser() {
		return user;
	}
	public FavoriteCityKey getFavoriteCityKey() {
		return favoriteCityKey;
	}
	public void setFavoriteCityKey(FavoriteCityKey favoriteCityKey) {
		this.favoriteCityKey = favoriteCityKey;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userIdString) {
		this.userId = userIdString;
	}
	public int getCityId() {
		return cityId;
	}
	public void setCityId(int cityId) {
		this.cityId = cityId;
	}
	public FavoriteCityDTO() {
		
	}
	
	public FavoriteCity toEntity () {		
		return new FavoriteCity(favoriteCityKey,user,city);
		
	}
}
