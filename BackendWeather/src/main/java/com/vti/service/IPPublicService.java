package com.vti.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.entity.IPPublic;
import com.vti.repository.IIPPublicRepository;

@Service
public class IPPublicService implements IIPPublicService {

	@Autowired
	private IIPPublicRepository repository;
	
	@Override
	public boolean isExistsByIpPublic(String ip) {
		// TODO Auto-generated method stub
		return repository.existsByIpPublic(ip);
	}

	@Override
	public IPPublic createIpPublic(IPPublic entity) {
		// TODO Auto-generated method stub
		return repository.save(entity);
	}

	@Override
	public Long countByIpPublic() {
		// TODO Auto-generated method stub
		return repository.countByIpPublic();
	}

}
