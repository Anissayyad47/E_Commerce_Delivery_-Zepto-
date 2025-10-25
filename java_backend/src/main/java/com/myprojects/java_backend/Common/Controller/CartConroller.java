package com.myprojects.java_backend.Common.Controller;

import com.myprojects.java_backend.Common.DTO.CartItem;
import com.myprojects.java_backend.Common.Entity.Cart;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin
public class CartConroller {

    @Autowired
    CartService cartService;

    @GetMapping("/getAllCart/{userId}")
    public ResponseEntity<MyResponseEntity<?>> getAllCart(@PathVariable String userId) {
        return cartService.getAllCart(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<MyResponseEntity<Cart>> addCart(@RequestBody Cart cart) {
        return cartService.addCart(cart);
    }

    @DeleteMapping("/remove/{userId}/{productId}")
    public ResponseEntity<MyResponseEntity<Cart>> removeItem(
            @PathVariable String userId,
            @PathVariable String productId) {
        return cartService.removeItemFromCart(userId, productId);
    }

    @DeleteMapping("/remove/qty/{userId}/{productId}")
    public ResponseEntity<MyResponseEntity<Cart>> removeItemQty(
            @PathVariable String userId,
            @PathVariable String productId) {
        return cartService.removeItemQty(userId, productId);
    }

    @PostMapping("/addItem/{userId}")
    public ResponseEntity<MyResponseEntity<Cart>> addItem(
            @PathVariable String userId,
            @RequestBody CartItem cartItem) {
        return cartService.addItemToCart(userId, cartItem);
    }

}
