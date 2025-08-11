package com.exa.dto;

import java.util.List;

public class OrderRequestDTO {
    private Long userId;
    private List<CartItemDTO> cartItems;
//    private String receiverName;
//    private String deliveryPhone;
//    private String deliveryAddress;
    private Long addressId;
    private String paymentMethod;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<CartItemDTO> getCartItems() {
		return cartItems;
	}
	public void setCartItems(List<CartItemDTO> selectedItems) {
		this.cartItems = selectedItems;
	}
//	public String getReceiverName() {
//		return receiverName;
//	}
//	public void setReceiverName(String receiverName) {
//		this.receiverName = receiverName;
//	}
//	public String getDeliveryPhone() {
//		return deliveryPhone;
//	}
//	public void setDeliveryPhone(String deliveryPhone) {
//		this.deliveryPhone = deliveryPhone;
//	}
//	public String getDeliveryAddress() {
//		return deliveryAddress;
//	}
//	public void setDeliveryAddress(String deliveryAddress) {
//		this.deliveryAddress = deliveryAddress;
//	}
	public String getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public Long getAddressId() {
		return addressId;
	}
	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}
}
