package com.exa.dto;

import java.util.List;

public class UserRegistrartionDTO {
	 private String username;
	    private String email;
	    private String password;
	    private String phoneNumber;
	    private List<AddressDTO> addresses;

		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public List<AddressDTO> getAddresses() {
			return addresses;
		}
		public void setAddresses(List<AddressDTO> addresses) {
			this.addresses = addresses;
		}
		public String getPhoneNumber() {
			return phoneNumber;
		}
		public void setPhoneNumber(String phoneNumber) {
			this.phoneNumber = phoneNumber;
		}


}
