package com.quiz.quiz_service.dao;

import com.quiz.quiz_service.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface QuizDao extends JpaRepository<Quiz,Integer> {

    List<Quiz> findByCreatedUserId(Integer userId);
}

