package com.myprojects.java_backend.Common.Repository;

import com.myprojects.java_backend.Common.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Long> {
    List<Orders> findByCustomerId(Long customerId);
}
