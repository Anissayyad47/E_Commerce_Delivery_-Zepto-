package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Orders;
import com.myprojects.java_backend.Common.Repository.OrdersRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    OrdersRepo ordersRepo;

    @Transactional
    public ResponseEntity<MyResponseEntity<Orders>> createOrder(Orders order) {
        // Link each OrderItem to its parent order
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }
        Orders orders = ordersRepo.save(order);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity(200,"Order is placed ",orders));
    }

//    Get Customer Orders
    public ResponseEntity<MyResponseEntity<List<Orders>>> getOrder(Long customerId) {
        try {
            List<Orders> orders = ordersRepo.findByCustomerId(customerId);

            if (orders.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new MyResponseEntity<>(404, "No orders found for this customer", orders));
            }

            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MyResponseEntity<>(200, "Your all orders", orders));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MyResponseEntity<>(500, "Error fetching orders, please try again", null));
        }
    }

    public ResponseEntity<MyResponseEntity<Orders>> updateOrderReady(Long id, Orders order) {
        Orders updateOrder = ordersRepo.findById(id).orElse(null);
        if (updateOrder != null) {
            updateOrder.setOrderStatus(order.getOrderStatus());
            ordersRepo.save(updateOrder);
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(new MyResponseEntity(200,"Order is updated ",updateOrder));
        } else
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MyResponseEntity(404,"Order not found ",null));
    }

    public ResponseEntity<MyResponseEntity<Orders>> updateOrderOutForDelivery(Long id, Orders order) {
        if(id==null){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity(400,"Id is null ",null));
        } else if(order==null){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity(400,"order is null ",null));
        }

        Orders updateOrder = ordersRepo.findById(id).orElse(null);
        if (updateOrder != null) {
            updateOrder.setOrderStatus(order.getOrderStatus());
            ordersRepo.save(updateOrder);
            return ResponseEntity
                    .status(HttpStatus.ACCEPTED)
                    .body(new MyResponseEntity(200,"Order is updated ",updateOrder));
        } else
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MyResponseEntity(404,"Order not found ",null));
    }
//    Order Complete
public ResponseEntity<MyResponseEntity<Orders>> updateOrderCompleteCancel(Long id, Orders order) {
    if(id==null){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MyResponseEntity(400,"Id is null ",null));
    } else if(order==null){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MyResponseEntity(400,"order is null ",null));
    }

    Orders updateOrder = ordersRepo.findById(id).orElse(null);
    if (updateOrder != null) {
        updateOrder.setOrderStatus(order.getOrderStatus());
        ordersRepo.save(updateOrder);
        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .body(new MyResponseEntity(200,"Order is updated ",updateOrder));
    } else
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MyResponseEntity(404,"Order not found ",null));
}
}
