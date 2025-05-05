package com.quiz.quiz_service.feign;

import com.quiz.quiz_service.model.AppUser;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Component
@FeignClient("user-service")
public interface UserInterface {

    @PostMapping("/user/submit/{userId}/{quizId}")
    ResponseEntity<String> submitQuiz(@PathVariable("userId") Integer userId,
                                 @PathVariable("quizId") Integer quizId);

    @GetMapping("/user/getUser/{id}")
    ResponseEntity<AppUser> getUser(@PathVariable("id") Integer id);


}
