package com.quiz.user_service.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;


import lombok.Data;

import java.util.List;



@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @ElementCollection
    private List<Integer> questionIds; // From Question-Service

    private Integer teacherId; // From User-Service

    @ElementCollection
    private List<Integer> studentIds; // From User-Service
}
