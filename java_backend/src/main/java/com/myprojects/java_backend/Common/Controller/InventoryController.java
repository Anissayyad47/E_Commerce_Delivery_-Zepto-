package com.myprojects.java_backend.Common.Controller;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
import com.myprojects.java_backend.Common.Service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;

    @Autowired
    ProductRepo productRepo;

//    Add Product
    @PostMapping("/addProduct")
    public ResponseEntity<MyResponseEntity<Products>> addProduct(  @RequestBody Products product){
        return inventoryService.addProduct(product);
    }

//    Update Product
    @PatchMapping("/updates/{id}")
    public ResponseEntity<MyResponseEntity<Products>> updateProduct(@PathVariable String id, @RequestBody Map<String, Object> updates){
        return inventoryService.updateProduct(id, updates);
    }

//    Delete Product
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MyResponseEntity<Products>> deleteProduct(@PathVariable String id){
        return inventoryService.deleteProduct(id);
    }
//    Test
    @PostMapping("/newProduct")
    public ResponseEntity<MyResponseEntity<Product>> newProductAdd(  @RequestBody Product product){
        return inventoryService.newProductAdd(product);
    }
}
