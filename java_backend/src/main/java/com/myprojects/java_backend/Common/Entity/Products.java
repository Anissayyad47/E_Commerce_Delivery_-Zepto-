package com.myprojects.java_backend.Common.Entity;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document (collection = "products")
@Getter @Setter
public class Products {
    @Id
    private String id;
    private String productName;
    private String productDescription;
    private String productCategory;
    private String productBrand;
    private String keyFeatures;
    private String productIngredients;
    private String dietaryPreference;
    private double weight;
    private int units;
    private List<String> productImages;
    private int productPrice;
}
