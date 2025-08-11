package com.exa.dto;

import java.math.BigDecimal;

public class RazorpayOrderDTO {
    private String razorpayOrderId;
    private BigDecimal amount;

    public RazorpayOrderDTO(String razorpayOrderId, BigDecimal amount) {
        this.razorpayOrderId = razorpayOrderId;
        this.amount = amount;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
