package com.vti.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vti.entity.Admin;
import com.vti.entity.Role;
import com.vti.repository.IAdminRepository;
import com.vti.repository.IUserRepository;
import com.vti.service.AdminService;



/**
 * This class JwtRequestFilter.
 * 
 * @Description: .
 * @author: Đinh Huy Khánh
 * @create_date: 3/5/2021
 * @version: 1.0
 * @modifer: 
 * @modifer_date: 
 */	

@Service("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private IUserRepository userRepository;

	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IAdminRepository adminDAO;
	
	@Autowired
	private AdminService adminService;


	/**
	 * This method is loadUserByUsername.
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1.0
	 * @modifer: 
	 * @modifer_date: 
	 * @return : userDetail
	 */	
	/* để tìm user theo user name khi sử dụng token để xác thực */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Admin admin = adminDAO.findByEmail(email);
		if(!Objects.isNull(admin)) {
			List<Role> listActiveRoles = adminService.getActiveListRole(admin.getId());
            boolean isActive = true;
            
            if(listActiveRoles.size() == 0) {
                isActive = false;
            }
         // roles set
            Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
            for (Role role : listActiveRoles) {
                setAuths.add(new SimpleGrantedAuthority(role.getName()));
            }

            // make user for spring-security
            org.springframework.security.core.userdetails.User userDetail =
                    new org.springframework.security.core.userdetails.User(email, admin.getPassword(),
                            isActive, true, true, true, setAuths);

            return userDetail;
		}
		
		throw new UsernameNotFoundException(email + " not found");
	}

}
