package com.quiz.quiz_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuizStatsDTO {
    private Integer userId;
    private String username;
    private Integer score;
    private String status;
}
