package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "IPPublic")
//@Table(name = "IPPublic", catalog = "heroku_02daea0b415b4cd")
public class IPPublic implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "IpPublic", nullable = false, length = 20)
	private String ipPublic;

	
	
	public IPPublic(String ipPublic) {
		super();
		this.ipPublic = ipPublic;
	}
	
	public IPPublic() {
		super();
		
	}
	
	

	public String getIpPublic() {
		return ipPublic;
	}

	public void setIpPublic(String ipPublic) {
		this.ipPublic = ipPublic;
	}

}
