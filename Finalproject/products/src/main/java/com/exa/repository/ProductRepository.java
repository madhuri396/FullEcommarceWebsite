package com.exa.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.exa.entity.Product;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel="product",path="products")
public interface ProductRepository extends JpaRepository<Product,Long>{

	
	Page<Product> findByCategoryId(@Param("id")long id, Pageable pageable);
	Page<Product> findByNameContaining(@Param("name")String name, Pageable pageable);
	@Modifying
	@Query("UPDATE Product p SET p.unitsInStock = :unitsInStock WHERE p.id = :productId")
	void updateUnitsInStock(@Param("productId") Long productId, @Param("unitsInStock") int unitsInStock);
	@Modifying
	@Query("UPDATE Product p SET p.unitsInStock = p.unitsInStock - :quantity WHERE p.id = :productId AND p.unitsInStock >= :quantity")
	int decrementStock(@Param("productId") Long productId, @Param("quantity") int quantity);

	@Modifying
	@Query("UPDATE Product p SET p.unitsInStock = p.unitsInStock + :quantity WHERE p.id = :productId")
	int incrementStock(@Param("productId") Long productId, @Param("quantity") int quantity);
}
