package com.exa.dto;


public class ProductDTO {
    private Long id;
    private String name;
    private Long unitPrice;
    private String imageUrl;
    private int unitsInStock;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Long price) {
		this.unitPrice = price;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public int getUnitsInStock() {
		return unitsInStock;
	}
	public void setUnitsInStock(int unitsInStock) {
		this.unitsInStock = unitsInStock;
	}
}