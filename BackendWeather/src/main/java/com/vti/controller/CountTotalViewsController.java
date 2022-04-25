package com.vti.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.repository.ICountTotalViewsRepository;
import com.vti.service.ICountTotalViewsService;
import com.vti.utils.ResponseJwt;

@RestController
@RequestMapping(value = "api/v1/count")
@CrossOrigin("*")
public class CountTotalViewsController {
	
	@Autowired
	private ICountTotalViewsService service;
	
	@GetMapping
	private ResponseJwt getCount() {
		
		ResponseJwt result = new ResponseJwt();
		Map<String, Object> map = new HashMap<>();
		
		map.put("count", service.getCount());
		result.setMessage("Success");
		result.setData(map);
		
		return result;
	}

}
