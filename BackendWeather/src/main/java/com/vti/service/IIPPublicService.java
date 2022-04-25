package com.vti.service;

import com.vti.entity.IPPublic;

public interface IIPPublicService {
		public boolean isExistsByIpPublic(String ip);
		public IPPublic createIpPublic(IPPublic entity);
		public Long countByIpPublic();
}
