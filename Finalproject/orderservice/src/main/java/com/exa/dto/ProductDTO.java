package com.exa.dto;

import java.math.BigDecimal;

public class ProductDTO {
    private Long id;
    private String name;
    private BigDecimal unitPrice;
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
//	public BigDecimal getPrice() {
//		return unitPrice;
//	}
//	public void setPrice(BigDecimal price) {
//		this.unitPrice = price;
//	}
	@Override
    public String toString() {
        return "ProductDTO{id=" + id + ", name='" + name + "', price=" + unitPrice + "}";
    }
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

}