package com.exa.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.transaction.Transactional;

@RepositoryRestController
public class ProductCustomController {

	 @Autowired
	    private ProductRepository productRepository;

	    @PutMapping("/products/update-stock")
	    @Transactional 
	    public ResponseEntity<Void> updateUnits(@RequestParam Long productId,
	                                            @RequestParam int unitsInStock) {
	        productRepository.updateUnitsInStock(productId, unitsInStock);
	        return ResponseEntity.ok().build();
	    }
	    
	    @PutMapping("/products/{id}/decrement")
	    @Transactional
	    public ResponseEntity<?> decrementStock(@PathVariable Long id, @RequestParam int quantity) {
	        int result = productRepository.decrementStock(id, quantity);
	        if (result == 0) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("Insufficient stock or product not found.");
	        }
	        return ResponseEntity.ok().build();
	    }

	    @PutMapping("/products/{id}/increment")
	    @Transactional
	    public ResponseEntity<?> incrementStock(@PathVariable Long id, @RequestParam int quantity) {
	        productRepository.incrementStock(id, quantity);
	        return ResponseEntity.ok().build();
	    }


}