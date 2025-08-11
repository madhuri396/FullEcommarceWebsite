package com.exa.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.exa.repository")
@EntityScan(basePackages = "com.exa.entity")

@ComponentScan(basePackages = {
	    "com.exa.config",
	    "com.exa.service",
	    "com.exa.dto",
	    "com.exa.controller",
	    "com.exa.exceptions",
	    "com.exa.repository"// if utilities/services live here
	})

public class ProductsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProductsApplication.class, args);
	}

}
