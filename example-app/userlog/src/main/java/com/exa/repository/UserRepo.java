package com.exa.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exa.entity.User;
@Repository
public interface UserRepo extends JpaRepository<User,Long>{
	 boolean existsByEmail(String email);
	    boolean existsByUsername(String username);
	    
	    Optional<User> findByEmail(String email);

}
