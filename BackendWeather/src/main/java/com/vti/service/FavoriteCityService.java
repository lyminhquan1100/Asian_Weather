package com.vti.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.vti.entity.FavoriteCity;
import com.vti.entity.FavoriteCityKey;
import com.vti.entity.Filter;
import com.vti.entity.User;
import com.vti.repository.IFavoriteCityRepository;

@Service
public class FavoriteCityService implements IFavoriteCityService{

	@Autowired
	private  IFavoriteCityRepository favoriteCityRepository;
	
	@Override
	public List<FavoriteCity> getAllFavoriteCities() {
		
		return (List<FavoriteCity>) favoriteCityRepository.findAll();
	}

	@Override
	public void createFavoriteCity(FavoriteCity favoriteCity) {
		favoriteCityRepository.save(favoriteCity);
	}

	@Override
	public List<FavoriteCity> getAllFavoriteCitiesByUserId(User user, Filter filter) {
		
		if(filter.getPageSize()<=0)
			filter.setPageSize(100000);
		if(filter.getPage()<=0)
			filter.setPage(1);
		
		filter.setPage(filter.getPage()-1);
		
		Pageable pageable=null;
		if(filter.getField()!=null && filter.getField().equals("")!=true){
			pageable=PageRequest.of(filter.getPage(), filter.getPageSize(), filter.getType().equals("asc") ? Sort.by(filter.getField()).ascending(): Sort.by(filter.getField()).descending());
		}
		else {
			pageable=PageRequest.of(filter.getPage(), filter.getPageSize());
		}
		
//		return  (List<User>) userRepository.findAll(where,pageable).toList();
		return (List<FavoriteCity>) favoriteCityRepository.findByUser(user,pageable);
	}

	@Override
	public void deleteFavoriteCity(String idUser, Integer idCity) {
		FavoriteCityKey favoriteCityKey = new FavoriteCityKey(idUser,idCity);
		favoriteCityRepository.deleteById(favoriteCityKey);
	}
}
