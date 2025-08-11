package com.exa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import com.exa.dto.TempOrderData;

import java.time.Duration;

@Component
public class TempOrderStore {

    private static final String PREFIX = "temp_order:";

    @Autowired
    private RedisTemplate<String, TempOrderData> redisTemplate;

    public void save(String razorpayOrderId, TempOrderData data) {
        String key = PREFIX + razorpayOrderId;
        redisTemplate.opsForValue().set(key, data, Duration.ofMinutes(15)); // auto-expire
    }

    public TempOrderData get(String razorpayOrderId) {
        return redisTemplate.opsForValue().get(PREFIX + razorpayOrderId);
    }

    public void remove(String razorpayOrderId) {
        redisTemplate.delete(PREFIX + razorpayOrderId);
    }
}
