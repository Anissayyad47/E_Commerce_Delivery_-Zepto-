package com.myprojects.java_backend.Common.Entity;

import com.myprojects.java_backend.Common.DTO.CartItem;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(collection = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {

    @Id
    private String id;  // cartId (unique)

    private String userId;  // which user owns this cart
    private String warehouseId; // from which warehouse items are added

    private double cartTotal;  // total amount (with discounts)
    private double cartActualTotal;
    private List<CartItem> items;  // list of cart items

    private Instant createdAt;
    private Instant updatedAt;
}
