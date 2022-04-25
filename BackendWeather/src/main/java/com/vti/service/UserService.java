package com.vti.service;

import java.util.HashMap;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.vti.entity.Filter;
import com.vti.entity.User;
import com.vti.repository.IUserRepository;
import com.vti.utils.ResponseJwt;

@Service
public class UserService implements IUserService {
	
	@Autowired
	private  IUserRepository userRepository;
	
	@Override
	public User getUserById(String id) {
		return userRepository.findById(id);
	}
	/**
	 * This method is exists User By ID.
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1.0
	 * @modifer: 
	 * @modifer_date: 
	 * @param: id
	 */
	@Override
	public boolean isExistsUserById(String id) {
		// TODO Auto-generated method stub
		return userRepository.existsById(id);
	}

	/**
	 * This method create User.
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1.0
	 * @modifer: 
	 * @modifer_date: 
	 * @param : user
	 */
	@Override
	public void createUser(User user) {
		// TODO Auto-generated method stub
		userRepository.save(user);
	}
	
	/**
	 * Get all user
	 * 
	 * @Description: .
	 * @author: Khuất Bá Tiến
	 * @create_date: 
	 * @version: 1
	 * @modifer: Đinh Huy Khánh
	 * @modifer_date: 19/05/2021
	 * @return : List user information
	 */	
	/**
	 * @modifer: Đinh Huy Khánh
	 * @modifer_date: 19/05/2021
	 * @edited_content :  thêm  tìm kiếm và phân trang và sắp xếp khi trả về danh sách user
	 * @param : search?
	 * @param: filter? ( page ?, pagesize?, type? ,field? )
	 * page : page bao nhiêu 
	 * pagesize : page được trả về bao nhiêu value
	 * field :  cột muốn sắp xếp 
	 * type : sắp xếp kiểu gì ( asc  || desc )
	 * */
	
	@Override
	public ResponseJwt getAllUsers(String search, Filter filter) {
		Specification<User> where = null;
		HashMap<String, Object> map = new HashMap<>();
		ResponseJwt result = new ResponseJwt();
		int totalPages = 0;
		int totalUsers = (int) userRepository.count();
		
		if(filter.getPage() <0 || filter.getPageSize()<=0 ) {
			result.setMessage("pageSize phải lớn hơn 0 và page không âm !");
			return result;
		}
		
		if(search != null && search != "") 
		{
			where = searchByField(search, "name");
		}
		
		Pageable pageable=null;
		if(filter.getField()!=null && filter.getField().equals("")!=true){
			pageable=PageRequest.of(filter.getPage(), filter.getPageSize(), filter.getType().equals("asc") ? Sort.by(filter.getField()).ascending(): Sort.by(filter.getField()).descending());
		}
		else {
			pageable=PageRequest.of(filter.getPage(), filter.getPageSize());
		}
		
		List<User>  users = userRepository.findAll(where,pageable).toList();
		totalPages = (int) ((totalUsers-1)/filter.getPageSize() +1);
		
		
		map.put("totalPages", totalPages);
		map.put("totalUsers", totalUsers);
		map.put("list", users);
		
		result.setMessage("Success");
		result.setData(map);
		
		return  result;
	}
	
	
	public Specification<User> searchByField(String search, String type){
		return new Specification<User>() {

			@Override
			public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				// TODO Auto-generated method stub
				return criteriaBuilder.like(root.get(type), "%"+search+"%");
			}
		};
	}
	@Override
	public long countIdByUser() {
		// TODO Auto-generated method stub
		return  userRepository.count();
	}
	
}
