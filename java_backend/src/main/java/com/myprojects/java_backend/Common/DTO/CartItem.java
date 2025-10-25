package com.myprojects.java_backend.Common.DTO;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {
    private String productId;   // reference to product in catalog
    private int quantity;       // how many
    private double price;       // snapshot of price at the time of adding
    private double discountedPrice; // snapshot of discounted price
    private double total;       // price * quantity
    private double totalActualPrice;
}
