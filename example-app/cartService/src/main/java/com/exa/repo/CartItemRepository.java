package com.exa.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exa.entity.CartItem;
@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	  List<CartItem> findByCartUserId(Long userId);
//	List<CartItem> findByCart_User_Id(Long userId); // ✅ Correct
	}