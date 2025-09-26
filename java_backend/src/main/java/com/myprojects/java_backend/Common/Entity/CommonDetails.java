package com.myprojects.java_backend.Common.Entity;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommonDetails {
    private String productName;
    private String qty;
    private double discountPrice;
    private double actualPrice;
    private String category;
    private String subCategory;
    private List<String> productImages; // multiple images
}
