package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.DTO.CartItem;
import com.myprojects.java_backend.Common.DTO.CartItemDTO;
import com.myprojects.java_backend.Common.DTO.CartResponseDTO;
import com.myprojects.java_backend.Common.Entity.Cart;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Product;
import com.myprojects.java_backend.Common.Entity.Products;
import com.myprojects.java_backend.Common.Repository.CartRepo;
import com.myprojects.java_backend.Common.Repository.NewProductRepo;
import com.myprojects.java_backend.Common.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartRepo cartRepository;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private NewProductRepo newProductRepo;

    public ResponseEntity<MyResponseEntity<Cart>> addCart(Cart cart) {
        try {
            // Check if cart already exists for this user
            Optional<Cart> existingCartOpt = cartRepository.findByUserId(cart.getUserId());

            Cart savedCart;

            if (existingCartOpt.isPresent()) {
                Cart existingCart = existingCartOpt.get();

                // merge new cart items with existing cart
                existingCart.setItems(cart.getItems());
                existingCart.setCartTotal(cart.getCartTotal());
                existingCart.setUpdatedAt(Instant.now());

                savedCart = cartRepository.save(existingCart);
            } else {
                // create new cart
                cart.setCreatedAt(Instant.now());
                cart.setUpdatedAt(Instant.now());

                savedCart = cartRepository.save(cart);
            }

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new MyResponseEntity<>(200, "item is added to cart", savedCart));


        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "There is problem while adding items to cart please try again after some time", null));
        }
    }

    public ResponseEntity<MyResponseEntity<Cart>> removeItemFromCart(String userId, String productId) {
        try {
            // Fetch existing cart
            Optional<Cart> existingCartOpt = cartRepository.findByUserId(userId);

            if (existingCartOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new MyResponseEntity<>(404, "Cart not found for user", null));
            }

            Cart existingCart = existingCartOpt.get();

            // Remove item by productId
            boolean removed = existingCart.getItems().removeIf(item -> item.getProductId().equals(productId));

            if (!removed) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new MyResponseEntity<>(404, "Item not found in cart", existingCart));
            }

            // Recalculate cart total
            double total = existingCart.getItems().stream()
                    .mapToDouble(CartItem::getTotal)
                    .sum();
            existingCart.setCartTotal(total);
            existingCart.setUpdatedAt(Instant.now());

            double totalActual = existingCart.getItems().stream()
                    .mapToDouble(CartItem::getTotalActualPrice)
                    .sum();
            existingCart.setCartActualTotal(totalActual);
            existingCart.setUpdatedAt(Instant.now());

            // Save updated cart
            Cart updatedCart = cartRepository.save(existingCart);

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200, "Item removed from cart", updatedCart));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "Error while removing item from cart, try again later", null));
        }
    }

    public ResponseEntity<MyResponseEntity<Cart>> addItemToCart(String userId, CartItem newItem) {
        try {
            // Fetch existing cart
            Optional<Cart> existingCartOpt = cartRepository.findByUserId(userId);

            Cart cart;

            if (existingCartOpt.isPresent()) {
                cart = existingCartOpt.get();

                boolean found = false;

                // Check if item already exists in cart
                for (CartItem item : cart.getItems()) {
                    if (item.getProductId().equals(newItem.getProductId())) {
                        // Item exists → increase quantity
//                        item.setQuantity(item.getQuantity() + newItem.getQuantity());
//                        item.setTotal(item.getQuantity() * item.getDiscountedPrice());
                        item.setQuantity(item.getQuantity() + 1);
                        item.setTotal(item.getQuantity() * item.getDiscountedPrice());
                        item.setTotalActualPrice(item.getQuantity() * item.getPrice());
                        found = true;
                        break;
                    }
                }

                // If item not found → add new
                if (!found) {
                    newItem.setTotal(newItem.getQuantity() * newItem.getDiscountedPrice());
                    cart.getItems().add(newItem);
                }

            } else {
                // No existing cart → create new cart
                cart = Cart.builder()
                        .userId(userId)
                        .items(List.of(newItem))
                        .createdAt(Instant.now())
                        .updatedAt(Instant.now())
                        .cartTotal(newItem.getQuantity() * newItem.getDiscountedPrice())
                        .build();
            }

            // Recalculate cart total
            double total = cart.getItems().stream()
                    .mapToDouble(CartItem::getTotal)
                    .sum();
            cart.setCartTotal(total);
            cart.setUpdatedAt(Instant.now());

            double totalDiscounted = cart.getItems().stream()
                    .mapToDouble(CartItem::getTotalActualPrice)
                    .sum();
            cart.setCartActualTotal(totalDiscounted);
            cart.setUpdatedAt(Instant.now());

            // Save cart
            Cart savedCart = cartRepository.save(cart);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new MyResponseEntity<>(200, "Item added/updated in cart", savedCart));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "Error adding item to cart, please try again", null));
        }
    }
    public ResponseEntity<MyResponseEntity<Cart>> removeItemQty(String userId, String productId) {
        try {
            // Fetch existing cart
            Optional<Cart> existingCartOpt = cartRepository.findByUserId(userId);

            Cart cart;

            if (existingCartOpt.isPresent()) {
                cart = existingCartOpt.get();

                boolean found = false;

                // Check if item already exists in cart
                Iterator<CartItem> iterator = cart.getItems().iterator();
                while (iterator.hasNext()) {
                    CartItem item = iterator.next();
                    if (item.getProductId().equals(productId)) {
                        item.setQuantity(item.getQuantity() - 1);
                        item.setTotal(item.getQuantity() * item.getDiscountedPrice());
                        item.setTotalActualPrice(item.getQuantity() * item.getPrice());

                        if (item.getQuantity() == 0) {
                            iterator.remove(); // removes the item safely from the list
                        }
                        break;
                    }
                }

                // If item not found → add new

            } else {
                // No existing cart → create new cart
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new MyResponseEntity<>(404, "Item not found in cart", null));
            }

            // Recalculate cart total
            double total = cart.getItems().stream()
                    .mapToDouble(CartItem::getTotal)
                    .sum();
            cart.setCartTotal(total);
            cart.setUpdatedAt(Instant.now());

            double totalDiscounted = cart.getItems().stream()
                    .mapToDouble(CartItem::getTotalActualPrice)
                    .sum();
            cart.setCartActualTotal(totalDiscounted);
            cart.setUpdatedAt(Instant.now());

            // Save cart
            Cart savedCart = cartRepository.save(cart);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new MyResponseEntity<>(200, "Item removed/updated in cart", savedCart));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "Error removing item to cart, please try again", null));
        }
    }

//    Get Cart
    public ResponseEntity<MyResponseEntity<?>> getAllCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);

        if (cart == null) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity<>(500, "No cart details found", null));
        }

        // Extract all product IDs from cart items
        List<String> productIds = cart.getItems().stream()
                .map(CartItem::getProductId)
                .collect(Collectors.toList());

        // Fetch all products in a single query
        List<Product> products = newProductRepo.findAllById(productIds);

        // Map products by ID for easy lookup
        Map<String, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        // Merge product details into CartItemResponse
        List<CartItemDTO> cartItemsWithProducts = cart.getItems().stream()
                .map(item -> new CartItemDTO(item, productMap.get(item.getProductId())))
                .collect(Collectors.toList());

        // Build final cart response DTO
        CartResponseDTO cartResponse = new CartResponseDTO(
                cart.getId(),
                cart.getUserId(),
                cart.getWarehouseId(),
                cart.getCartTotal(),
                cartItemsWithProducts,
                cart.getCreatedAt(),
                cart.getUpdatedAt()
        );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200, "Cart items sent", cartResponse));
    }


}
