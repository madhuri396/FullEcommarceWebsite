//package com.exa.service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.stereotype.Service;
//
//import com.exa.client.AddressClient;
//import com.exa.client.ProductClient;
//import com.exa.dto.AddressDTO;
//import com.exa.dto.CartItemDTO;
//import com.exa.dto.OrderRequestDTO;
//import com.exa.dto.ProductDTO;
//import com.exa.entity.Order;
//import com.exa.entity.OrderItem;
//import com.exa.entity.Payment;
//import com.exa.enums.OrderStatus;
//import com.exa.enums.PaymentStatus;
//import com.exa.repository.OrderRepository;
//
//@Service
//public class OrderService {
//
//    @Autowired
//    private OrderRepository orderRepo;
//
//    @Autowired
//    private ProductClient productClient;
//
//    @Autowired
//    private AddressClient addressClient;
//    
//    @Autowired
//    private RazorpayService razorpayService;
//
////    public Order placeOrder(OrderRequestDTO request) {
////        List<OrderItem> items = new ArrayList<>();
////        double total = 0;
////
////        for (CartItemDTO cartItem : request.getSelectedItems()) {
////            ProductDTO product = productClient.getProductById(cartItem.getProductId());
////
////            OrderItem item = new OrderItem();
////            item.setProductId(product.getId());
////            item.setProductName(product.getName());
////            item.setUnitPrice(product.getPrice());
////            item.setQuantity(cartItem.getQuantity());
////
////            items.add(item);
////            total += item.getUnitPrice() * item.getQuantity();
////        }
////
////        Payment payment = razorpayService.initiatePayment(total, request.getPaymentMethod());
////
////        Order order = new Order();
////        order.setUserId(request.getUserId());
////        order.setOrderDate(LocalDateTime.now());
////        order.setStatus(OrderStatus.CONFIRMED);
////        order.setReceiverName(request.getReceiverName());
////        order.setDeliveryPhone(request.getDeliveryPhone());
////        order.setDeliveryAddress(request.getDeliveryAddress());
////        order.setItems(items);
////        order.setTotalAmount(total);
////        order.setPayment(payment);
////
////        for (OrderItem item : items) {
////            item.setOrder(order);
////        }
////
////        return orderRepo.save(order);
////    }
//    
//    public Order placeOrder(OrderRequestDTO request) {
//       // // 🧩 Step 1: Fetch address from Login Reg microservice
//    	
//        AddressDTO address = addressClient.getAddressId(request.getUserId(),request.getAddressId());
//        if (address == null) {
//            throw new RuntimeException("Address not found for ID: " + request.getAddressId());
//        }
//
//        // 🧮 Step 2: Prepare order items and calculate total
//        List<OrderItem> items = new ArrayList<>();
//        BigDecimal total=BigDecimal.ZERO;
//
//        for (CartItemDTO cartItem : request.getCartItems()) {
//            ProductDTO product = productClient.getProductById(cartItem.getProductId());
//            if (product == null || product.getUnitPrice() == null) {
//            	System.out.println("Product fetched: " + product);
//
//                throw new RuntimeException("Product not found: ID " + cartItem.getProductId()+product.getUnitPrice());
//            }
//
//            OrderItem item = new OrderItem();
//            item.setProductId(product.getId());
//            item.setProductName(product.getName());
//            item.setUnitPrice(product.getUnitPrice());
//            item.setQuantity(cartItem.getQuantity());
//
//            items.add(item);
//            total = total.add(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
//
//            //total += item.getUnitPrice() * item.getQuantity();
//            System.out.println("Total order amount: ₹" + total);
//
//        }
//
//        // 💳 Step 3: Initiate payment
//        Payment payment = razorpayService.initiatePayment(total, request.getPaymentMethod());
//        payment.setMethod(request.getPaymentMethod());
//
//        // 📦 Step 4: Create and populate order
//        Order order = new Order();
//        order.setUserId(request.getUserId());
//        order.setOrderDate(LocalDateTime.now());
//        order.setStatus(OrderStatus.CONFIRMED);
//        order.setReceiverName(address.getReceiverName());
//        order.setDeliveryPhone(address.getPhoneNumber());
//
//        // Combine address fields into a single string
//        String fullAddress = String.join(", ",
//            address.getLine1(),
//            address.getLine2(),
//            address.getCity(),
//            address.getState(),
//            address.getZipCode(),
//            address.getCountry()
//        );
//        order.setDeliveryAddress(fullAddress);
//
//        order.setItems(items);
//        order.setTotalAmount(total);
//        order.setPayment(payment);
//        order.linkPayment(payment);
//
//
//        // 🔗 Step 5: Link items to order
//        for (OrderItem item : items) {
//            item.setOrder(order);
//        }
//
//        // 📝 Step 6: Save and return
//        return orderRepo.save(order);
//    }
//
//    public boolean verifyAndConfirmPayment(String razorpayOrderId, String paymentId, String signature) {
//        boolean isValid = razorpayService.verifySignature(razorpayOrderId, paymentId, signature);
//
//        if (isValid) {
//            Order order = orderRepo.findByPayment_RazorpayOrderId(razorpayOrderId)
//                .orElseThrow(() -> new RuntimeException("Order not found"));
//
//            order.setStatus(OrderStatus.CONFIRMED);
//            order.getPayment().setStatus(PaymentStatus.SUCCESS);
//            order.getPayment().setTransactionId(paymentId);
//
//            orderRepo.save(order);
//            return true;
//        }
//
//        return false;
//    }
//
//    public List<Order> getOrdersByUser(Long userId) {
//        return orderRepo.findByUserId(userId);
//    }
//    
//    public Page<Order> getOrdersByUser(Long userId, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size, Sort.by("orderDate").descending());
//        return orderRepo.findByUserId(userId, pageable);
//    }
//
//}
package com.exa.service;

import com.exa.client.AddressClient;
import com.exa.client.CartClient;
import com.exa.client.ProductClient;
import com.exa.dto.*;
import com.exa.entity.*;
import com.exa.enums.OrderStatus;
import com.exa.enums.PaymentStatus;
import com.exa.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ProductClient productClient;

    @Autowired
    private AddressClient addressClient;

    @Autowired
    private RazorpayService razorpayService;

    @Autowired
    private TempOrderStore tempOrderStore;
    
    @Autowired 
    private CartClient cartClient;

    public Order placeOrder(OrderRequestDTO request) {
        AddressDTO address = addressClient.getAddressId(request.getUserId(), request.getAddressId());
        if (address == null) {
            throw new RuntimeException("❌ Address not found for ID: " + request.getAddressId());
        }

        List<OrderItem> items = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CartItemDTO cartItem : request.getCartItems()) {
            ProductDTO product = productClient.getProductById(cartItem.getProductId());
            if (product == null || product.getUnitPrice() == null) {
                throw new RuntimeException("❌ Product not found or invalid: ID " + cartItem.getProductId());
            }

            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setUnitPrice(product.getUnitPrice());
            item.setQuantity(cartItem.getQuantity());

            items.add(item);
            total = total.add(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        Payment payment = razorpayService.initiatePayment(total, request.getPaymentMethod());
        payment.setMethod(request.getPaymentMethod());

        TempOrderData tempData = new TempOrderData();
        tempData.setUserId(request.getUserId());
        tempData.setReceiverName(address.getReceiverName());
        tempData.setDeliveryPhone(address.getPhoneNumber());
        tempData.setDeliveryAddress(String.join(", ",
            address.getLine1(), address.getLine2(), address.getCity(),
            address.getState(), address.getZipCode(), address.getCountry()
        ));
        tempData.setItems(items);
        tempData.setTotalAmount(total);
        tempData.setPaymentMethod(request.getPaymentMethod());

        tempOrderStore.save(payment.getRazorpayOrderId(), tempData);

        Order placeholderOrder = new Order();
        placeholderOrder.setPayment(payment);
        return placeholderOrder;
    }

    public Order verifyAndConfirmPayment(String razorpayOrderId, String paymentId, String signature) {
        boolean isValid = razorpayService.verifySignature(razorpayOrderId, paymentId, signature);
        if (!isValid) return null;

        TempOrderData tempData = tempOrderStore.get(razorpayOrderId);
        if (tempData == null) {
            throw new RuntimeException("❌ Temp order data not found for Razorpay Order ID: " + razorpayOrderId);
        }

        Order order = new Order();
        order.setUserId(tempData.getUserId());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.CONFIRMED);
        order.setReceiverName(tempData.getReceiverName());
        order.setDeliveryPhone(tempData.getDeliveryPhone());
        order.setDeliveryAddress(tempData.getDeliveryAddress());
        order.setItems(tempData.getItems());
        order.setTotalAmount(tempData.getTotalAmount());

        Payment payment = new Payment();
        payment.setStatus(PaymentStatus.SUCCESS);
        payment.setTransactionId(paymentId);
        payment.setRazorpayOrderId(razorpayOrderId);
        payment.setMethod(tempData.getPaymentMethod());
        payment.setAmount(tempData.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());

        order.setPayment(payment);
        order.linkPayment(payment);

        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        Order savedOrder = orderRepo.save(order);
        tempOrderStore.remove(razorpayOrderId);
        List<Long> orderedProductIds = order.getItems().stream()
        	    .map(OrderItem::getProductId)
        	    .collect(Collectors.toList());

        	try {
        	    cartClient.removeOrderedItems(order.getUserId(), orderedProductIds);
        	    System.out.println("✅ Removed ordered items from cart for user {}"+ order.getUserId());
        	} catch (Exception e) {
        		 System.out.println("⚠️ Failed to remove ordered items from cart: {}"+ e.getMessage());
        	}

        return savedOrder;
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    public Page<Order> getOrdersByUser(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("orderDate").descending());
        return orderRepo.findByUserId(userId, pageable);
    }
}
