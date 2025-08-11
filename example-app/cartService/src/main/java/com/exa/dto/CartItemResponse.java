package com.exa.dto;


public class CartItemResponse {
    private Long itemId;
    private Long productId;
    private String productName;
    private Long productPrice;
    private int quantity;
    private String imageUrl;
    private Long totalprice;

    public CartItemResponse(Long itemId, Long productId,String productName, Long productPrice, int quantity,String imageUrl,long totalprice) {
        this.itemId = itemId;
        this.productId=productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.imageUrl=imageUrl;
        this.totalprice=totalprice;
    }

   

    
	// Getters and setters
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Long productPrice) {
        this.productPrice = productPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Long getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(Long totalprice) {
		this.totalprice = totalprice;
	}
}