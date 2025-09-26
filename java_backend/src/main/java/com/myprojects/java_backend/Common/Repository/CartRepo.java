package com.myprojects.java_backend.Common.Repository;

import com.myprojects.java_backend.Common.DTO.CartItem;
import com.myprojects.java_backend.Common.Entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserId(String userId);
}
