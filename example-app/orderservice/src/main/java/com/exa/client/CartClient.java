package com.exa.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.exa.dto.CartItemDTO;

@FeignClient(name = "cartService", url = "http://localhost:9004")
public interface CartClient {
    @GetMapping("/cart/api/items/{userId}")
    List<CartItemDTO> getCartItems(@PathVariable Long userId);
    @DeleteMapping("/cart/api/remove/ordered/{userId}")
    void removeOrderedItems(@PathVariable Long userId, @RequestBody List<Long> productIds);

}
