package com.vti.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vti.entity.CountTotalViews;

public interface ICountTotalViewsRepository  extends JpaRepository<CountTotalViews, Short>, JpaSpecificationExecutor<CountTotalViews>{

	 @Transactional
	@Modifying
	@Query("update CountTotalViews  set viewsTotal =:count where id = 1")
	public void updateCountTotalViews(@Param("count") int count);
	
	@Query("SELECT viewsTotal FROM CountTotalViews WHERE id = 1")
	public int findByCount();
}
