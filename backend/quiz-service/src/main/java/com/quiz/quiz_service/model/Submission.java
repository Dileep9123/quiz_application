package com.quiz.quiz_service.model;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Submission {
    private Integer quizId;
    private String quizTitle;
    private String author;
    private Integer score;
    private String status;
    private LocalDateTime timestamp;
}
