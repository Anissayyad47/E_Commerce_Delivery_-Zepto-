package com.myprojects.java_backend.Common.Controller;

import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Orders;
import com.myprojects.java_backend.Common.Service.OrderService;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {
    @Autowired
    OrderService orderService;

//    Add orders
    @PostMapping("/addOrder")
    public ResponseEntity<MyResponseEntity<Orders>> addOrder(@RequestBody Orders order) {
        for(int i=0;i<order.getItems().size();i++){
            System.out.println("order : "+order.getItems().get(i).getProductName());
        }
        return orderService.createOrder(order);
    }

//    Get orders
    @GetMapping("/getOrders/{customerId}")
    public ResponseEntity<MyResponseEntity<List<Orders>>> getOrders(@PathVariable long customerId) {
        return orderService.getOrder(customerId);
    }

    @PatchMapping("/updateReadyOrder/{id}")
    public ResponseEntity<MyResponseEntity<Orders>> updateReadyOrder(@PathVariable Long id, @RequestBody Orders order) {
        return orderService.updateOrderReady(id, order);
    }

    @PatchMapping("/updateOrderOutForDelivery/{id}")
    public ResponseEntity<MyResponseEntity<Orders>> updateOrderOutForDelivery(@PathVariable Long id, @RequestBody Orders order){
        return orderService.updateOrderOutForDelivery(id, order);
    }

    @PatchMapping("/updateOrderComplete/{id}")
    public ResponseEntity<MyResponseEntity<Orders>> updateOrderCompleteCancel(@PathVariable Long id, @RequestBody Orders order){
        return orderService.updateOrderCompleteCancel(id, order);
    }

}
