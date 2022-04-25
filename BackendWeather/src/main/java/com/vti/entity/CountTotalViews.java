package com.vti.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CountTotalViews")
//@Table(name = "CountTotalViews", catalog = "heroku_02daea0b415b4cd")
public class CountTotalViews implements Serializable{

private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "Id")
	private short id;
	
	@Column(name = "ViewsTotal")
	private int viewsTotal;
	
	
	public CountTotalViews(short id, int viewsTotal) {
		super();
		this.id = id;
		this.viewsTotal = viewsTotal;
	}

	public short getId() {
		return id;
	}

	public void setId(short id) {
		this.id = id;
	}

	public int getViewsTotal() {
		return viewsTotal;
	}

	public void setViewsTotal(int viewsTotal) {
		this.viewsTotal = viewsTotal;
	}
	
	
	
}
