package com.myprojects.java_backend.Common.Controller;

import com.myprojects.java_backend.Common.Entity.DemoEntity;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("Demo")
public class DemoController {

    @Autowired
    DemoService demoService;

    @GetMapping("/get")
    public ResponseEntity<MyResponseEntity<List<DemoEntity>>> getDemo() {
        return demoService.getDemo();
    }
}
