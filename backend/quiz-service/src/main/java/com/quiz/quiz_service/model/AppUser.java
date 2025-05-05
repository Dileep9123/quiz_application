package com.quiz.quiz_service.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Data
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String password;


}
