//package com.myprojects.java_backend.Common.Repository;
//
//import com.myprojects.java_backend.Common.Entity.Product;
//import com.myprojects.java_backend.Common.Entity.Products;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.data.mongodb.core.query.TextCriteria;
//import org.springframework.stereotype.Repository;
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//@Repository
//public class ProductRepoCustom {
//
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    public Map<String, List<Product>> searchProductsByText(String query) {
//        Map<String, List<Product>> resultMap = new HashMap<>();
//
//        // 1️⃣ Main matching products
//        TextCriteria textCriteria = TextCriteria.forDefaultLanguage().matching(query);
//        Query mainQuery = Query.query(textCriteria)
//                .with(Sort.by(Sort.Direction.DESC, "score"))
//                .limit(20);
//        mainQuery.fields().include("productName").include("productCategory").include("productPrice");
//
//        List<Product> mainResults = mongoTemplate.find(mainQuery, Product.class);
//        resultMap.put("matchingProducts", mainResults);
//
//        if (mainResults.isEmpty()) {
//            resultMap.put("categoryProducts", new ArrayList<>());
//            resultMap.put("subCategoryProducts", new ArrayList<>());
//            return resultMap;
//        }
//
//        // 2️⃣ Collect categories from main results
//        Set<String> categories = mainResults.stream()
//                .map(Product::getCommonDetails)
//                .collect(Collectors.toSet());
//
//        // 3️⃣ Product with same category (exclude main results)
//        Query categoryQuery = new Query();
//        categoryQuery.addCriteria(Criteria.where("productCategory").in(categories)
//                        .and("_id").nin(mainResults.stream().map(Product::getId).toList()))
//                .limit(10);
//
//        List<Product> categoryResults = mongoTemplate.find(categoryQuery, Product.class);
//        resultMap.put("categoryProducts", categoryResults);
//
//        // 4️⃣ Optional: if you have subCategory, do same for subCategory
//        // For now we can skip or use keyFeatures as subCategory replacement
//
//        resultMap.put("subCategoryProducts", new ArrayList<>()); // empty for now
//
//        return resultMap;
//    }
//}
