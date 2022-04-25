package com.vti.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.vti.entity.Filter;
import com.vti.entity.User;
import com.vti.service.IUserService;
import com.vti.utils.ResponseJwt;


@RestController
@RequestMapping(value = "api/v1/users")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private IUserService userService;
	
	/**
	 * Get user by id
	 * 
	 * @Description: .
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : User information
	 */	
	@GetMapping(value = "id/{id}")
	public ResponseEntity<?> getUserById(@PathVariable(name = "id") String id) {		
		return new ResponseEntity<User>(userService.getUserById(id), HttpStatus.OK);
	}
	
	/**
	 * Check user exists
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : Boolean
	 */	
	@GetMapping(value = "/exists?id={id}")
	public ResponseEntity<Boolean> isExistsUserById(@PathVariable(name="id") String id){
		
		return new ResponseEntity<Boolean>(userService.isExistsUserById(id),HttpStatus.OK);
	}
	
	/**
	 * Get all user
	 * 
	 * @Description: .
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: Đinh Huy Khánh
	 * @modifer_date: 19/05/2021
	 * @return : List user information
	 */	
	/**
	 * @modifer: Đinh Huy Khánh
	 * @modifer_date: 19/05/2021
	 * @edited_content :  thêm  tìm kiếm và phân trang và sắp xếp khi trả về danh sách user
	 * @param : search?
	 * @param: filter? ( page ?, pagesize?, type? ,field? )
	 * page : page bao nhiêu 
	 * pagesize : page được trả về bao nhiêu value
	 * field :  cột muốn sắp xếp 
	 * type : sắp xếp kiểu gì ( asc  || desc )
	 * */
	@GetMapping
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseJwt getAllUser(String search, Filter filter){	
		
		ResponseJwt result = userService.getAllUsers(search,filter);
		
		return result;
	}
	
	@GetMapping(value="/total")
	public ResponseJwt isTotalUser() {
		ResponseJwt result = new ResponseJwt();
		Map<String, Object> map = new HashMap<>();
		
		map.put("total", userService.countIdByUser());
		result.setMessage("Success");
		result.setData(map);
		return result;
	}
}
