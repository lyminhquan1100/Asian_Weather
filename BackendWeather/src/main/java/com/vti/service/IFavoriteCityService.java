package com.vti.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import com.vti.entity.FavoriteCity;
import com.vti.entity.Filter;
import com.vti.entity.User;


public interface IFavoriteCityService {
	public List<FavoriteCity> getAllFavoriteCities();

	public void createFavoriteCity(FavoriteCity favoriteCity);
	
	public List<FavoriteCity> getAllFavoriteCitiesByUserId(User user, Filter filter);

	public void deleteFavoriteCity(String idUser, Integer idCity);
}
