package com.quiz.quiz_service.model;

import lombok.Data;

import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@RequiredArgsConstructor
public class Response {
    private Integer questionId;
    private String response;
    private Integer quizId;
    private Integer userId;
}
