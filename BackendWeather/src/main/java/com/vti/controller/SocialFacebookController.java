package com.vti.controller;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.api.impl.FacebookTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vti.repository.IUserRepository;
import com.vti.service.IUserService;
import com.vti.utils.JwtUtil;
import com.vti.utils.ResponseJwt;
import com.vti.utils.TokenDTO;

@RestController
@CrossOrigin("*")
public class SocialFacebookController {
//
//	    @Autowired
//	    private JwtUtil jwtUtil;

//	    @Autowired
////	    @Qualifier("userDetailsService")
//	    private UserDetailsService  userDetailsService;
//	
	    @Autowired 
	    private IUserService userService;
	 
	
	
	/**
	 * This method is login Facebook.
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1
	 * @modifer: 
	 * @modifer_date: 
	 * @return : result
	 */	
	@PostMapping(value ="/auth/facebook")
	public ResponseJwt loginFacebook(@RequestBody TokenDTO token) {
		ResponseJwt result = new ResponseJwt(); // dùng để trả về kết quả JSON
		
		
		Facebook facebook = new FacebookTemplate(token.getToken()); // Tạo 1 phiên bản mới mã xác thực của facebook gửi về
		String[] fields = {"id","email","name","address"};// tên cột cần lấy
		User user = facebook.fetchObject("me", User.class,fields); // call api
		
		// lấy những thông tin api cần thiết mà facebook gửi về
		com.vti.entity.User entity = new com.vti.entity.User();
		entity.setId(user.getId());
		if(user.getEmail() == null) {
			entity.setEmail("nguoi dung dang ky bang sdt");
		}else {
			entity.setEmail(user.getEmail());			
		}
		entity.setName(user.getName());
		
		// nếu user không tồn tại thì lưu vào DB
		if(!userService.isExistsUserById(user.getId())) {
			userService.createUser(entity);
		}
		
		/* điều kiên entity khác null thì tạo json và trả về FE ngược lại thì thông báo FE biết là đã thất bại */
		if(Objects.nonNull(entity)) {
			Map<String, Object> map = new HashMap<>();
			map.put("data", entity);
			result.setData(map);
			result.setMessage("Success");
		}else {
			result.setMessage("Fail");
		}
		return result;
	}
	
//	
//	private String generateTokenFace(String id) {
//		final UserDetails userDetails = userDetailsService.loadUserByUsername(id);
//		String jwt = jwtUtil.generateToken(userDetails);
//		return jwt;
//	}
//	
	
	
	
}
