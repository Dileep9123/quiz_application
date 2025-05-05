package com.quiz.user_service.service;


import com.quiz.user_service.dao.UserDao;
import com.quiz.user_service.model.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public ResponseEntity<?> login(AppUser teacher){
        AppUser temp = userDao.findByEmail(teacher.getEmail());
        if(temp==null)
            return  ResponseEntity.badRequest().body("User Account Not Found on this Email");

        if(temp.getPassword().equals(teacher.getPassword()))
            return ResponseEntity.status(HttpStatus.OK).body(temp);
        else
            return  ResponseEntity.badRequest().body("Invalid Password");
    }


    public  ResponseEntity<?> signup(AppUser user){
        AppUser temp = userDao.findByEmail(user.getEmail());
        if(temp != null) return ResponseEntity.badRequest().body("Email already Exists");
        return ResponseEntity.status(HttpStatus.CREATED).body(userDao.save(user));
    }


    public ResponseEntity<?> getUser(Integer id) {
        AppUser user = userDao.findById(id).orElse(null);
        if(user==null)
            return ResponseEntity.badRequest().body("User Not Found");
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }




}
