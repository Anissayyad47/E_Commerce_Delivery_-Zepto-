package com.myprojects.java_backend.Common.Controller;


import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
import com.myprojects.java_backend.Common.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/getAllProducts")
    public ResponseEntity<MyResponseEntity<List<Products>>> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/getAllNewProducts")
    public ResponseEntity<MyResponseEntity<List<Product>>> getAllNewProducts(){
        return productService.getAllNewProducts();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<MyResponseEntity<Product>> getProductById(@PathVariable String id){
        return productService.getProductById(id);
    }

    @GetMapping("/get/similarProducts/{category}")
    public ResponseEntity<MyResponseEntity<List<Product>>> getAllProductsByCategory(@PathVariable String category){
        return productService.getAllProductsByCategory(category);
    }

    @GetMapping("/get/alsoLikeProducts/{subCategory}")
    public ResponseEntity<MyResponseEntity<List<Product>>> getAllProductsBySubCategory(@PathVariable String subCategory){
        return productService.getAllProductsBySubCategory(subCategory);
    }

//    @GetMapping("/search/{productName}")
//    public ResponseEntity<MyResponseEntity<List<Product>>> getProdcutByName(@PathVariable String productName){
//            return productService.getProdcutByName(productName);
//    }

//    @GetMapping("/search")
//    public Map<String, List<Products>> searchProducts(@RequestParam String query) {
//        return productService.searchProducts(query);
//    }
     @GetMapping("/search/{productName}")
     public ResponseEntity<?> searchProducts(@PathVariable String productName){
        return productService.searchProducts(productName);
     }
}
