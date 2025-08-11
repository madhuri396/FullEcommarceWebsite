package com.exa.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage()); // this will be "Invalid password" or whatever you throw
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error); // use 401 for auth errors
    }

    // You can handle other exceptions too
    // @ExceptionHandler(Exception.class) ...
}