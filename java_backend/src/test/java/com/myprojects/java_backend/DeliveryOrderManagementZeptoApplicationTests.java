package com.myprojects.java_backend;

import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

@SpringBootTest
class DeliveryOrderManagementZeptoApplicationTests {

    @Autowired
    ProductService productService;
	@Test
	void contextLoads() {
	}
    @Test
    void testGetProductsBySubCategory() {
        List<Product> products = productService.testProductsBySubCategory("vegetables");

        assertNotNull(products);
        System.out.println("Found products: " + products.size());
        products.forEach(p -> System.out.println(p.getCommonDetails().getProductName()));
    }


}
