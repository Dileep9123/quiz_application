package com.quiz.quiz_service.model;

import lombok.Data;
@Data
public class QuizDto {
    String category;
    Integer numQuestions;
    String title;
    Integer createdUserId;




}