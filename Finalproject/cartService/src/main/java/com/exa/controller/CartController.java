package com.exa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exa.dto.CartItemRequest;
import com.exa.dto.CartItemResponse;
import com.exa.dto.ProductDTO;
import com.exa.entity.CartItem;
import com.exa.service.CartService;

@RestController
@RequestMapping("/cart/api")
@CrossOrigin("http://localhost:4200")
public class CartController {

  @Autowired
  private CartService cartService;

  // Example: Extract userId from JWT and pass it here
  
  @GetMapping()
	  public ResponseEntity<String>getres(){
		  return ResponseEntity.ok("Welcoe");
	  }
  
  @GetMapping("/items")
  public ResponseEntity<List<CartItemResponse>> getCartItems(@RequestParam Long userId) {
    return ResponseEntity.ok(cartService.getItems(userId));
  }
  
  @GetMapping("/items/user/{userId}")
  public ResponseEntity<List<CartItemResponse>> getCartItemss(@PathVariable Long userId) {
    return ResponseEntity.ok(cartService.getItems(userId));
  }

  @PostMapping("/add")
  public ResponseEntity<Void> addItem(@RequestBody CartItemRequest request) {
    cartService.addProductToCart(request.getUserId(), request.getProductId(), request.getQuantity());
    return ResponseEntity.ok().build();
  }
  
  @PutMapping("/subtract")
  public ResponseEntity<Void> reduceItem(@RequestBody CartItemRequest request) {
	    cartService.reduceProductToCart(request.getUserId(), request.getProductId(), request.getQuantity());
	    return ResponseEntity.ok().build();
	  }

  @DeleteMapping("/remove/{userId}/{itemId}")
  public ResponseEntity<Void> removeItem(@PathVariable Long userId, @PathVariable Long itemId) {
    cartService.removeItem(userId, itemId);
    return ResponseEntity.ok().build();	
  }
  @DeleteMapping("/remove/bulk/{userId}")
  public ResponseEntity<Void> removeItems(@PathVariable Long userId, @RequestBody List<Long> itemIds) {
      cartService.removeItems(userId, itemIds);
      return ResponseEntity.ok().build();
  }

  @GetMapping("/total/{userId}")
  public ResponseEntity<Integer> getTotalQuantity(@PathVariable Long userId) {
    return ResponseEntity.ok(cartService.getTotalQuantity(userId));
  }
  
  @GetMapping("/totalCost/{userId}")
  public ResponseEntity<Double> getTotalCost(@PathVariable Long userId) {
    return ResponseEntity.ok(cartService.getTotal(userId));
  }
  
  @GetMapping("/items/{id}")
  public ResponseEntity<?> getItems(@PathVariable("id") Long userId) {
	  List<CartItemResponse> items = cartService.getCartItemsWithDetails(userId);
      return ResponseEntity.ok(items);

      
  }
  
  @GetMapping("/products/{id}")
  public ResponseEntity<ProductDTO> getProductThroughCart(@PathVariable Long id) {
      ProductDTO product = cartService.fetchProductDetails(id);
      return ResponseEntity.ok(product);
  }
  @DeleteMapping("/remove/ordered/{userId}")
  public ResponseEntity<Void> removeOrderedItems(@PathVariable Long userId, @RequestBody List<Long> productIds) {
      cartService.removeOrderedItems(userId, productIds);
      return ResponseEntity.ok().build();
  }



}