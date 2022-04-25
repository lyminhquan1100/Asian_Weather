package com.vti.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vti.entity.FavoriteCity;
import com.vti.entity.FavoriteCityKey;
import com.vti.entity.User;

public interface IFavoriteCityRepository extends JpaRepository<FavoriteCity, FavoriteCityKey>, JpaSpecificationExecutor<FavoriteCity> {
	public List<FavoriteCity> findByUser(User user, Pageable pageable);

	public void deleteByFavoriteCityId(FavoriteCityKey favoriteCityKey);

//	public void deleteById(FavoriteCity favoriteCity);
	
//	public void deleteByFavoriteCityId(FavoriteCityKey favoriteCityKey);

}
