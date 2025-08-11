package com.exa.repo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.exa.dto.ProductDTO;

import jakarta.transaction.Transactional;

@FeignClient(name = "products", url = "http://localhost:9001") // adjust URL or use service discovery
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ProductDTO getProductById(@PathVariable Long id);
    
    @PutMapping("/api/products/update-stock")
    void updateUnits(@RequestParam Long productId,@RequestParam int unitsInStock);
    @PutMapping("/api/products/{id}/decrement")
    void decrementStock(@PathVariable Long id, @RequestParam int quantity) ;
    
    @PutMapping("/api/products/{id}/increment")
    void incrementStock(@PathVariable Long id, @RequestParam int quantity) ;
}