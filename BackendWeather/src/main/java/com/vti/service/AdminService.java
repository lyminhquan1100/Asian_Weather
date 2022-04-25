package com.vti.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vti.entity.Admin;
import com.vti.entity.Role;
import com.vti.entity.RoleUser;
import com.vti.repository.IAdminRepository;
import com.vti.repository.RoleRepository;
import com.vti.repository.RoleUserRepository;
import com.vti.utils.AdminForm;
import com.vti.utils.RoleIdConstants;
import com.vti.utils.StatusRegisterUserEnum;

@Service
public class AdminService implements IAdminService{

	
	@Autowired
	private IAdminRepository repository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleDAO;
	
	@Autowired
	private RoleUserRepository roleUserDAO;
	
	/**
	 * This method is exists By Email And Password.
	 * 
	 * @Description: .
	 * @author: Đinh Huy Khánh
	 * @create_date: 3/5/2021
	 * @version: 1.0
	 * @modifer: 
	 * @modifer_date: 
	 * @param : email 
	 * @param : password
	 */
	public boolean isAdminExistsByEmailAndPassword(String email, String password) {
		// chuyển string password về sha256
		String pswHash = passwordEncoder.encode(password);
		return repository.existsByEmailAndPassword(email, pswHash);
	}
	
	
	 public StatusRegisterUserEnum registerUser(AdminForm form) {
//	        logger.info("Start Register");
	        Admin admin = new Admin();
	        try {
//	            check existed username
	            if (repository.findByEmail(form.getEmail())!=null) {
	            	return StatusRegisterUserEnum.Existed_Email;
	            }
//	            check existed email

	            admin.setEmail(form.getEmail());
	            admin.setPassword(passwordEncoder.encode(form.getPassword()));
	            repository.save(admin);

	            Admin adSaveAdmin = repository.findByEmail(form.getEmail());
	            System.out.println(adSaveAdmin.toString());
//	            insert role user
	            RoleUser userRole = new RoleUser();
	            userRole.setRoleId(RoleIdConstants.ROLE_ADMIN);
	            userRole.setUserId(adSaveAdmin.getId());
	            roleUserDAO.save(userRole);
	            return StatusRegisterUserEnum.Success;
	        } catch (Exception e) {
//	            logger.error(e.getMessage());
	            return StatusRegisterUserEnum.Error_OnSystem;
	        }
	    }
	 
	 public List<Role> getListRole() {
	        return StreamSupport
	                .stream(roleDAO.findAll().spliterator(), false)
	                .collect(Collectors.toList());

	    }
	 
	 public List<Role> getActiveListRole(int adminId) {
	        List<RoleUser> listUserRoles = StreamSupport
	                .stream(roleUserDAO.findRolesOfUser(adminId).spliterator(), false).collect(Collectors.toList());

	        return getListRole().stream().filter(role -> {
	            return (listUserRoles.stream().filter(roleUser -> roleUser.getRoleId() == role.getId()).findFirst().orElse(null) != null);
	        }).collect(Collectors.toList());
	    }
	
}
