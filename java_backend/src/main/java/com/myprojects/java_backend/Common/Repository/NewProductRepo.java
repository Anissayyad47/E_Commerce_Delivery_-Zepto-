package com.myprojects.java_backend.Common.Repository;

import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewProductRepo extends MongoRepository<Product,String> {
    List<Product> findByCommonDetailsCategory(String category);
    List<Product> findByCommonDetailsSubCategory(String subCategory);
}
