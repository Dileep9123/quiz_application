package com.quiz.quiz_service.dao;


import com.quiz.quiz_service.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultDao extends JpaRepository<Result, Integer> {

    List<Result> findByQuizId(Integer quizId);

    List<Result> findByUserId(Integer userId);
    // Custom query methods can be defined here if needed


}
