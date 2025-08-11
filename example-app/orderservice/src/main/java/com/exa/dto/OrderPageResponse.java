package com.exa.dto;

import java.util.List;

import com.exa.entity.Order;

public class OrderPageResponse {
    private List<Order> orders;
    private boolean hasMore;
	public List<Order> getOrders() {
		return orders;
	}
	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	public boolean isHasMore() {
		return hasMore;
	}
	public void setHasMore(boolean hasMore) {
		this.hasMore = hasMore;
	}

    // Getters and setters
}
