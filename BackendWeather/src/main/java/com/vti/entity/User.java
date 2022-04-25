package com.vti.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "`User`")
//@Table(name = "`User`", catalog = "heroku_02daea0b415b4cd")
public class User implements Serializable {
private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "FacebookID", nullable = false, length = 100)
	private String id;
	
	@Column(name = "`Name`", length = 100)
	private String name;
	
	@Column(name = "Email", nullable = true, length = 100)
	private String email;
	
	@Column(name = "`Address`", length = 255)
	private String address;
	
	@Column(name = "CreateDate")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestam
    private Date createDate;
	
	@OneToMany(mappedBy = "user")
	private List<FavoriteCity> favoriteCities;

	
	
	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

//	public List<FavoriteCity> getFavoriteCities() {
//		return favoriteCities;
//	}
//
//	public void setFavoriteCities(List<FavoriteCity> favoriteCities) {
//		this.favoriteCities = favoriteCities;
//	}

	public User() {
		super();
	}
	public User(String id, String name, String email) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", address=" + address + ", createDate: "+createDate+
				 "]";
	}
	


}
