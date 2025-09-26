package com.myprojects.java_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DeliveryOrderManagementZeptoApplication {

	public static void main(String[] args) {

        SpringApplication.run(DeliveryOrderManagementZeptoApplication.class, args);
        System.out.println("Server is running on port 8080");
	}

}
