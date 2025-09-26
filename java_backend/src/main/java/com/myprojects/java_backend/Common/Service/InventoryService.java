package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Orders;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.NewProductRepo;
import com.myprojects.java_backend.Common.Repository.OrdersRepo;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InventoryService {
    @Autowired
    OrdersRepo ordersRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    ProductRepo productRepo;

    @Autowired
    NewProductRepo newProductRepo;

    public ResponseEntity<MyResponseEntity<Products>> addProduct(Products product){
        productRepo.save(product);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"Products added is successfully",product));
    }

    public ResponseEntity<MyResponseEntity<Product>> newProductAdd(Product product){
        newProductRepo.save(product);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"Products added is successfully",product));
    }

    public ResponseEntity<MyResponseEntity<Products>> updateProduct(String id , Map<String, Object> updates){
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update();

        // List of allowed fields
        List<String> allowedFields = Arrays.asList(
                "productName", "productDescription", "productCategory", "productBrand",
                "keyFeatures", "productIngredients", "dietaryPreference",
                "weight", "units", "productImages", "productPrice"
        );

        for (Map.Entry<String, Object> entry : updates.entrySet()) {
            String field = entry.getKey();
            Object value = entry.getValue();

            if (!allowedFields.contains(field) && !field.equals("productImagesAdd") && !field.equals("productImagesRemove")) {
                // skip unknown fields like "locale"
                continue;
            }

            switch (field) {
                case "units":
                    if (value instanceof Number) {
                        update.set("units", ((Number) value).intValue()); // safer than inc
                    }
                    break;

                case "productImagesAdd":
                    update.push("productImages", value);
                    break;

                case "productImagesRemove":
                    update.pull("productImages", value);
                    break;

                default:
                    update.set(field, value);
            }
        }

        Products products = mongoTemplate.findAndModify(
                query,
                update,
                org.springframework.data.mongodb.core.FindAndModifyOptions.options().returnNew(true),
                Products.class);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"Products updated successfully",products));
    }

    public ResponseEntity<MyResponseEntity<Products>> deleteProduct(String id){
        Products product = productRepo.findById(id).orElse(null);
        if (product != null){
            productRepo.delete(product);
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(204,"Product deleted successfully",product));
        }else return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MyResponseEntity<>(404,"Product not found",null));
    }
}
