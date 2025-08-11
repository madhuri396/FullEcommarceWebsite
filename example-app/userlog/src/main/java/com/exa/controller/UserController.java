package com.exa.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exa.dto.AddressDTO;
import com.exa.dto.UserDTO;
import com.exa.dto.UserLoginDTO;
import com.exa.dto.UserPassChangeDTO;
import com.exa.dto.UserRegistrartionDTO;
import com.exa.entity.Address;
import com.exa.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ User Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserRegistrartionDTO registrationDTO) {
        UserDTO registeredUser = userService.registerUser(registrationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserLoginDTO loginDTO) {
        UserDTO registeredUser = userService.login(loginDTO);
        return ResponseEntity.status(HttpStatus.OK).body(registeredUser);
    }
    
    @GetMapping("/Address")
    
   public ResponseEntity<List<AddressDTO>> getAddresList(@RequestBody UserLoginDTO loginDTO){
    	List<AddressDTO> add= userService.getAllAddress(loginDTO);
    	 return ResponseEntity.status(HttpStatus.ACCEPTED).body(add);
    }
    @GetMapping("/Address/{userId}")
    
    public ResponseEntity<List<AddressDTO>> getAddresList(@PathVariable Long userId){
     	List<AddressDTO> add= userService.getAllAddressbyId(userId);
     	 return ResponseEntity.status(HttpStatus.ACCEPTED).body(add);
     }
@GetMapping("/Address/{userId}/{addressId}")
    
    public ResponseEntity<AddressDTO> getAddress(@PathVariable Long userId,@PathVariable Long addressId){
     	AddressDTO add= userService.getAddressbyAddressId(userId,addressId);
     	 return ResponseEntity.status(HttpStatus.ACCEPTED).body(add);
     }
    
    
    @PostMapping("/AddAddress/{userId}")
    public ResponseEntity<AddressDTO> addAddres(@PathVariable Long userId,@RequestBody AddressDTO add){
    	AddressDTO add1= userService.addAddress(userId,add);
   	 return ResponseEntity.status(HttpStatus.ACCEPTED).body(add1);
   }
    @PutMapping("/EditAddress/{userId}/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @RequestBody AddressDTO updatedAddress) {

        AddressDTO result = userService.updateAddress(userId, addressId, updatedAddress);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
    }
    
    @PutMapping("/EditProfile")
    public ResponseEntity<UserDTO> edituserInfo(@RequestBody UserDTO user){
    	UserDTO u= userService.updateUserInfo(user);
    	return ResponseEntity.status(HttpStatus.ACCEPTED).body(u);
    	
    	
    }
    
    @PutMapping("/UpdatePassword")
    public ResponseEntity<UserDTO> loginUser(@RequestBody UserPassChangeDTO userpass) {
        UserDTO passchanged = userService.changePass(userpass);
        return ResponseEntity.status(HttpStatus.OK).body(passchanged);
    } 
    
}