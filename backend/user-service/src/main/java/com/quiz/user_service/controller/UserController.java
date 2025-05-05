package com.quiz.user_service.controller;



import com.quiz.user_service.model.AppUser;
import com.quiz.user_service.service.UserService;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AppUser user){
           return userService.login(user);
    }

    @GetMapping
    public  String hello(){
        return "hello";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody AppUser user){
        return  userService.signup(user);
    }

    @GetMapping("/getUser/{id}")
    public  ResponseEntity<?> getUser(@PathVariable Integer id){
        return userService.getUser(id);
    }



}
