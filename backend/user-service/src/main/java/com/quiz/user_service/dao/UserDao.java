package com.quiz.user_service.dao;



import com.quiz.user_service.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<AppUser, Integer> {


    AppUser findByEmail(String email);


}
