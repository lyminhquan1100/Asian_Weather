package com.vti.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vti.dto.FavoriteCityDTO;
import com.vti.entity.FavoriteCity;
import com.vti.entity.FavoriteCityKey;
import com.vti.entity.Filter;
import com.vti.service.ICityService;
import com.vti.service.IFavoriteCityService;
import com.vti.service.IUserService;




@RestController
@RequestMapping(value = "api/v1/favoriteCities")
@CrossOrigin("*")
@Validated
public class FavoriteCityController {

	@Autowired
	private IFavoriteCityService favoriteCityService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ICityService cityService;
	
	/**
	 * Get all favorite city
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : userId, cityId
	 */
	@GetMapping()
	public ResponseEntity<?> getAllFavoriteCities() {

		// get data
		List<FavoriteCity> entities = favoriteCityService.getAllFavoriteCities();

		return new ResponseEntity<List<FavoriteCity>>(entities, HttpStatus.OK);
	}
	
	/**
	 * Get all favorite city by id
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : userId, cityId
	 */
	@GetMapping(value = "userId/{id}")
	public ResponseEntity<?> getAllFavoriteCities(@PathVariable(name = "id") String id, Filter filter) {

		// get data
		List<FavoriteCity> entities = favoriteCityService.getAllFavoriteCitiesByUserId(userService.getUserById(id),filter);

		return new ResponseEntity<List<FavoriteCity>>(entities, HttpStatus.OK);
	}
	
	/**
	 * Create favorite city
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 */
	@PostMapping()
	public String createFavoriteCity(@RequestBody FavoriteCityDTO dto) {

		try {
			FavoriteCityKey favoriteCityKey = new FavoriteCityKey(dto.getUserId(), dto.getCityId());
			
			dto.setFavoriteCityKey(favoriteCityKey);
			
			dto.setCity(cityService.getCityById(dto.getCityId()));	
			
			dto.setUser(userService.getUserById(dto.getUserId()));
			
			favoriteCityService.createFavoriteCity(dto.toEntity());
		} catch (DataIntegrityViolationException e) {
			return "{\"message\":" + "User hoặc city không tồn tại"+ "}"; 
		}
		catch (Exception e) {
			return "{\"message\":"+ e.getMessage();
		}
			
		return "{ \"message\":"+"\"Create Successfully\"" + "}";

	}
	
	/**
	 * Delete favorite city
	 * 
	 * @Description: 
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 */
	@DeleteMapping(value = "delete/idUser={idUser},idCity={idCity}")
	public ResponseEntity<?> deleteFavoriteCity(@PathVariable(name = "idUser") String idUser,@PathVariable Integer idCity) {
		
		try {
			favoriteCityService.deleteFavoriteCity(idUser,idCity);
		}
		catch (EmptyResultDataAccessException exception) {			
			return new ResponseEntity<String>("Không tìm thấy tài nguyên bạn yêu cầu, "
					+ "hãy check lại các parameters", HttpStatus.NOT_FOUND);
		}
		catch (Exception exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
		return new ResponseEntity<String>("Delete successfully!", HttpStatus.OK);
	}
}
