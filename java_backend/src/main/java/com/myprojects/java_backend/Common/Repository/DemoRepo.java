package com.myprojects.java_backend.Common.Repository;

import com.myprojects.java_backend.Common.Entity.DemoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemoRepo extends JpaRepository<DemoEntity,Integer> {
}
