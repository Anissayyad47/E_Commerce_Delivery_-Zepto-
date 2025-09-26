package com.myprojects.java_backend.Common.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter @Setter
public class CartResponseDTO {
    private String id;
    private String userId;
    private String warehouseId;
    private double cartTotal;
    private List<CartItemDTO> items;
    private Instant createdAt;
    private Instant updatedAt;

    public CartResponseDTO(String id, String userId, String warehouseId, double cartTotal,
                        List<CartItemDTO> items, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.userId = userId;
        this.warehouseId = warehouseId;
        this.cartTotal = cartTotal;
        this.items = items;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
