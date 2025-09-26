package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.NewProductRepo;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    NewProductRepo newProductRepo;

    public ResponseEntity<MyResponseEntity<List<Products>>> getAllProducts(){
        try {
            List<Products> products = productRepo.findAll();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200,"Products are sended",products));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500,"Internal Server Error",null));
        }
    }

    public ResponseEntity<MyResponseEntity<List<Product>>> getAllNewProducts(){
        try {
            List<Product> products = newProductRepo.findAll();
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200,"Products are sended",products));
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500,"Internal Server Error",null));
        }
    }

//    get product by id
    public ResponseEntity<MyResponseEntity<Product>> getProductById(String id){
        try {
            return newProductRepo.findById(id)
                    .map(product -> ResponseEntity
                            .status(HttpStatus.OK)
                            .body(new MyResponseEntity<>(200, "Product found by id", product)))
                    .orElseGet(() -> ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(new MyResponseEntity<>(404, "Product not found", null)));
        } catch (Exception e) {
            e.printStackTrace(); // optional: log error
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "Server error, please try again later", null));
        }
    }

//    Get similar products
    public ResponseEntity<MyResponseEntity<List<Product>>> getAllProductsByCategory(String category){
        try {
            List<Product>  products = newProductRepo.findByCommonDetailsCategory(category);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200,"Similar Products Sended",products));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity<>(500,"Server error : failed to get similar products",null));
        }
    }
    //    Get similar products
    public ResponseEntity<MyResponseEntity<List<Product>>> getAllProductsBySubCategory(String subCategory){
        try {
            List<Product>  products = newProductRepo.findByCommonDetailsSubCategory(subCategory);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200,"You might also like Products Sended",products));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity<>(500,"Server error : failed to get similar products",null));
        }
    }
}
