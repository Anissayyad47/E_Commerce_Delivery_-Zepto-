package com.myprojects.java_backend.Common.Service;

import com.myprojects.java_backend.Common.DTO.userDTO;
import com.myprojects.java_backend.Common.Entity.MyResponseEntity;
import com.myprojects.java_backend.Common.Entity.Users;
import com.myprojects.java_backend.Common.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    UserRepo userRepo;

    public ResponseEntity<MyResponseEntity<userDTO>> userRegister (Users user){
        Optional<Users> optionalUser = userRepo.findByEmail(user.getEmail());
        if(optionalUser.isPresent()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MyResponseEntity<>(400,"User already exits",null));
        }
        Users newUser = userRepo.save(user);
        userDTO userDTO = new userDTO();
        userDTO.setId(newUser.getId());
        userDTO.setUsername(newUser.getUsername());
        userDTO.setRole(newUser.getRole());
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"User registered successfully",userDTO));
    }

//    User login *******************************************************************************************************
    public ResponseEntity<MyResponseEntity<userDTO>> userLogin (Users user){
        Optional<Users> userExit = userRepo.findByEmail(user.getEmail());
        if(userExit.isEmpty()){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MyResponseEntity<>(404,"User not found",null));
        }
        Users newUser = userExit.get();
        userDTO userDTO = new userDTO();
        userDTO.setId(newUser.getId());
        userDTO.setUsername(newUser.getUsername());
        userDTO.setRole(newUser.getRole());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new MyResponseEntity<>(200,"User login successfully",userDTO));
    }
}
