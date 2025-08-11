package com.exa.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.exa.dto.AddressDTO;

@FeignClient(name = "userlog" , url = "http://localhost:8088")
public interface AddressClient {
	  @GetMapping("/api/users/Address/{userId}/{id}")
	    AddressDTO getAddressId(@PathVariable Long userId,@PathVariable Long id);

}


  

