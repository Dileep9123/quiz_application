package com.quiz.quiz_service.controller;


import com.quiz.quiz_service.model.QuizDto;
import com.quiz.quiz_service.model.Response;
import com.quiz.quiz_service.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("quiz")
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDto quizDto){

        return quizService.createQuiz(quizDto.getCategory(), quizDto.getNumQuestions(), quizDto.getTitle(), quizDto.getCreatedUserId());
    }


    @GetMapping("getQuiz/{id}")
    public ResponseEntity<?> getQuiz(@PathVariable Integer id){
        return quizService.getQuiz(id);
    }

    @GetMapping("getQuizQuestions/{id}")
    public ResponseEntity<?> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("submit/{quizId}/{userId}")
    public ResponseEntity<?> submitQuiz(@PathVariable Integer quizId,@PathVariable Integer userId, @RequestBody List<Response> responses){

        return quizService.calculateResultAndSave(quizId,userId, responses);
    }


    @GetMapping("/getQuizzes/{userId}")
    public ResponseEntity<?> getQuizzesByUser(@PathVariable Integer userId) {
        return quizService.getQuizzesByUser(userId);
    }


    @GetMapping("/stats/{quizId}")
    public ResponseEntity<?> getQuizStats(@PathVariable Integer quizId) {
        return quizService.getQuizStats(quizId);
    }

    @GetMapping("/submissions/{userId}")
    public ResponseEntity<?> getSubmissions(@PathVariable Integer userId) {
        return quizService.getSubmissions(userId);
    }



}