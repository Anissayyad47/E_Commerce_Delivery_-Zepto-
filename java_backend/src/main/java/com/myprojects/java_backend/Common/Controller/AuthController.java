package com.myprojects.java_backend.Common.Controller;

import com.myprojects.java_backend.Common.DTO.userDTO;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Users;
import com.myprojects.java_backend.Common.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<MyResponseEntity<userDTO>> userLogin(@RequestBody Users user){
        return authService.userLogin(user);
    }

    @PostMapping("/register")
    public ResponseEntity<MyResponseEntity<userDTO>> userRegister(@RequestBody Users user){
        return authService.userRegister(user);
    }
    @PostMapping("/post")
    public Users getData(@RequestBody Users user){
        return user;
    }
}
