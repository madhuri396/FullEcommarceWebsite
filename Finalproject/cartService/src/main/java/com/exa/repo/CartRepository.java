package com.exa.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exa.entity.Carts;
@Repository
public interface CartRepository extends JpaRepository<Carts, Long> {
	  Optional<Carts> findByUserId(Long userId);
	}
