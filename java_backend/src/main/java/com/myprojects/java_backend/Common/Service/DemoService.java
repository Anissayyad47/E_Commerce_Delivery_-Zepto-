package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.Entity.DemoEntity;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Repository.DemoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DemoService {

    @Autowired
    DemoRepo demoRepo;

    public ResponseEntity<MyResponseEntity<List<DemoEntity>>> getDemo() {
        List<DemoEntity> demo = demoRepo.findAll();
        return  ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"Data is sendign",demo));
    }
}
