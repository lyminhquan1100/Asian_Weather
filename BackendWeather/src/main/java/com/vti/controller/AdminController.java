package com.vti.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.entity.Admin;
import com.vti.service.AdminService;
import com.vti.service.IAdminService;
import com.vti.utils.AdminForm;
import com.vti.utils.CustomUserDetailsService;
import com.vti.utils.JwtUtil;
import com.vti.utils.ResponseJwt;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.lang.Collections;

@RestController
@RequestMapping(value="api/v1/admin")
@CrossOrigin("*")
@Validated
public class AdminController {
	
	@Autowired
	private IAdminService service;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private AuthenticationManager authticationManager;
	@Autowired
	private CustomUserDetailsService userDetailsService;
	
	  @Autowired
	    private JwtUtil jwtUtil;
	
	/**
	 * This method is loginAdmin
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1.0
	 * @modifer: 
	 * @modifer_date: 
	 * return : result (json) 
	 */
	
	@PostMapping(value="/login")
	public ResponseJwt loginAdmin(@RequestBody @Valid  Admin admin){
		ResponseJwt result = new ResponseJwt();
		HashMap<String, String> map = new HashMap<>();
		
		try {
			authticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					admin.getEmail(), admin.getPassword()
					));
		} catch (Exception e) {
			result.setMessage("Incorrect email or password");
			return result;
		}
			
			
			final UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getEmail());			
			final String jwt = jwtUtil.generateToken(userDetails);
			map.put("jwt", jwt);
			
			map.put("email",admin.getEmail());
			result.setData(map);
			result.setMessage("Success");
			return result;
	}
	
	
	@PostMapping(value="/created")
	public String createAdmin(@RequestBody AdminForm form) {
		return adminService.registerUser(form).toString();
	}
	
	
	
}
