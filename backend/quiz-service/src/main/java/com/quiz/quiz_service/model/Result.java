package com.quiz.quiz_service.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quizId;
    private Integer userId;
    private Integer score;
    private String status; // Passed or Failed

    private LocalDateTime timestamp = LocalDateTime.now(); // Automatically set
}
