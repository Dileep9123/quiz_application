package com.quiz.question_service.model;

import lombok.Data;

import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Response {
    private Integer questionId;
    private String response;
    private Integer quizId;
    private Integer  userId;
}
