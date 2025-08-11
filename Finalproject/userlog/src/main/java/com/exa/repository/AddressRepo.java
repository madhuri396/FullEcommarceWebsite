package com.exa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exa.entity.Address;
import com.exa.entity.User;

public interface AddressRepo extends JpaRepository<Address,Long> {

	
	List<Address> findByUser(User user);
	
	 List<Address> findByUserId(Long userId);

	
}
