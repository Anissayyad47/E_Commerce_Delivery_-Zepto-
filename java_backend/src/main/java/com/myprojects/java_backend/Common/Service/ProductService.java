package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.NewProductRepo;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
//import com.myprojects.java_backend.Common.Repository.ProductRepoCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductService {

    @Autowired
    ProductRepo productRepo;

    @Autowired
    NewProductRepo newProductRepo;

//    @Autowired
//    private ProductRepoCustom productRepoCustom;

    @Autowired
    private MongoTemplate mongoTemplate;

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

//    search products

//    public Map<String, List<Products>> searchProducts(String query) {
//        return productRepoCustom.searchProductsByText(query);
//    }

    public ResponseEntity<?> searchProducts(String text) {

        // Step 1: Full-text search on MongoDB
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(text);
        Query query = Query.query(criteria);

        List<Product> matchingProducts = mongoTemplate.find(query, Product.class);

        // Step 2: If no products found
        if (matchingProducts.isEmpty()) {
            return ResponseEntity.ok(Map.of("message", "No results found"));
        }

        // Step 3: Get category & subcategory from first matched product
        String category = matchingProducts.get(0).getCommonDetails().getCategory();
        String subCategory = matchingProducts.get(0).getCommonDetails().getSubCategory();

        // Step 4: Find products by category and subcategory
        List<Product> categoryProducts = newProductRepo.findAll().stream()
                .filter(p -> p.getCommonDetails().getCategory().equalsIgnoreCase(category))
                .toList();

        List<Product> subCategoryProducts = newProductRepo.findAll().stream()
                .filter(p -> p.getCommonDetails().getSubCategory().equalsIgnoreCase(subCategory))
                .toList();

        // Step 5: Return clean structured response
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("matchingProducts", matchingProducts);
        response.put("categoryProducts", categoryProducts);
        response.put("subCategoryProducts", subCategoryProducts);

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<MyResponseEntity<List<Product>>> getProdcutByName(String productName){
        TextCriteria textCriteria = TextCriteria.forDefaultLanguage().matching(productName);

        Query query = Query.query(textCriteria)
                .with(Sort.by(Sort.Direction.DESC, "score"))  // sort by relevance
                .limit(20);  // limit results
        query.fields().include("commonDetails");
        List<Product> results = mongoTemplate.find(query, Product.class);
        if(results.isEmpty()){
            return  ResponseEntity.status(HttpStatus.OK).body(new MyResponseEntity<>(200,"No result found",null));
        }

        TextCriteria categoryText = TextCriteria.forDefaultLanguage().matching(results.get(0).getCommonDetails().getCategory());

        Query categoryQuery=query.query(Criteria.where("commonDetails").is(categoryText));
        List<Product> category=mongoTemplate.find(categoryQuery, Product.class);
        return  ResponseEntity.status(HttpStatus.OK).body(new MyResponseEntity<>(200,"Products are sended",category));
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
