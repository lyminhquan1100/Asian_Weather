package com.vti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.repository.ICountTotalViewsRepository;

@Service
public class CountTotalViewsService implements ICountTotalViewsService{

	@Autowired
	private ICountTotalViewsRepository repository;
	
	@Override
	public void updateCountTotalViews(int count) {
		// TODO Auto-generated method stub
		repository.updateCountTotalViews(count);
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return repository.findByCount();
	}

}
