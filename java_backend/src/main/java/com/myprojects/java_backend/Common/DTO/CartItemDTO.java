package com.myprojects.java_backend.Common.DTO;

import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CartItemDTO {
    private String productId;
    private int quantity;
    private double price;
    private double discountedPrice;
    private double total;
    private double totalActualPrice;
    private Product product; // full product details

    public CartItemDTO(CartItem item, Product product) {
        this.productId = item.getProductId();
        this.quantity = item.getQuantity();
        this.price = item.getPrice();
        this.discountedPrice = item.getDiscountedPrice();
        this.total = item.getTotal();
        this.product = product;
        this.totalActualPrice = item.getTotalActualPrice();
    }
}
