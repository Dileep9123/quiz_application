package com.quiz.quiz_service.service;

import com.quiz.quiz_service.dao.QuizDao;
import com.quiz.quiz_service.dao.ResultDao;
import com.quiz.quiz_service.feign.QuestionInterface;
import com.quiz.quiz_service.feign.UserInterface;
import com.quiz.quiz_service.model.*;
import org.bouncycastle.jce.exception.ExtCertPathBuilderException;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionInterface questionInterface;

    @Autowired
    ResultDao resultDao;

    @Autowired
    UserInterface userInterface;


    public ResponseEntity<?> createQuiz(String category, int numQ, String title, int createdUserId) {
        try {
            List<Integer> questions = questionInterface.getQuestionsForQuiz(category, numQ).getBody();
            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestionIds(questions);
            quiz.setCreatedUserId(createdUserId);
            return ResponseEntity.status(HttpStatus.CREATED).body(quizDao.save(quiz));
        }
        catch(Exception e){
            e.printStackTrace();
            return  ResponseEntity.badRequest().body("Unable to create quiz Try Again!!!");
        }

    }

    public ResponseEntity<?> getQuizQuestions(Integer id) {
        Optional<Quiz> quizOptional = quizDao.findById(id);

        // Check if quiz is found
        if (quizOptional.isPresent()) {
            // Fetch the quiz object
            Quiz quiz = quizOptional.get();
            List<Integer> questionIds = quiz.getQuestionIds();
            return questionInterface.getQuestionsFromId(questionIds);
        } else {
            // If quiz is not found, return 404 Not Found
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Quiz not found for creator with ID " + id);
        }


    }

    public ResponseEntity<?> calculateResultAndSave(Integer quizId, Integer userId, List<Response> responses) {
        Integer score = questionInterface.getScore(responses).getBody();
        if (score == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to calculate score. Please try again later.");

        try {
            Result result = new Result();
            Quiz quiz = quizDao.findById(quizId).orElse(null);
            if (quiz == null) {
                return ResponseEntity.badRequest().body("Quiz not found");
            }

            result.setQuizId(quiz.getId());
            result.setUserId(userId);
            result.setScore(score);
            result.setStatus(score >= Math.floor(quiz.getQuestionIds().size() * 0.35) ? "passed" : "failed");
            result.setTimestamp(LocalDateTime.now());

            quizDao.save(quiz);
            resultDao.save(result);

            return ResponseEntity.ok(score);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to save result. Please try again later.");
        }
    }


    public ResponseEntity<?> getQuiz(Integer id) {
        try {
            // Find quiz by creator ID
            Optional<Quiz> quizOptional = quizDao.findById(id);

            // Check if quiz is found
            if (quizOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(quizOptional.get());
            } else {
                // If quiz is not found, return 404 Not Found
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Quiz not found for creator with ID " + id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            // Return a generic error response in case of exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to fetch quiz details. Please try again later.");
        }
    }

    public ResponseEntity<?> getQuizzesByUser(Integer userId) {

        try {
            List<Quiz> quizzes = quizDao.findByCreatedUserId(userId);
            if (quizzes.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("No quizzes found for user with ID " + userId);
            }
            return ResponseEntity.status(HttpStatus.OK).body(quizzes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to fetch quizzes. Please try again later.");
        }

    }

    public ResponseEntity<?> getQuizStats(Integer quizId) {
        try {
            List<Result> results = resultDao.findByQuizId(quizId);

            List<QuizStatsDTO> responseList = results.stream().map(result -> {
                AppUser user = null;
                try {
                    ResponseEntity<AppUser> userResponse = userInterface.getUser(result.getUserId());
                    user = userResponse.getBody();
                } catch (Exception e) {
                    e.printStackTrace();
                }

                return new QuizStatsDTO(
                        result.getUserId(),
                        user != null ? user.getName() : "Unknown",
                        result.getScore(),
                        result.getStatus()
                );
            }).collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("quizId", quizId);
            response.put("totalResponses", results.size());
            response.put("responses", responseList);

            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to fetch quiz stats. Please try again later.");
        }
    }

    public ResponseEntity<?> getSubmissions(Integer userId) {
        try {
            List<Result> results = resultDao.findByUserId(userId);
            if (results.isEmpty()) {
                return ResponseEntity.badRequest().body("No submissions found for user with ID " + userId);
            }

            List<Submission> submissions = new ArrayList<>();
            for (Result result : results) {
                Quiz quiz = quizDao.findById(result.getQuizId()).orElse(null);
                if (quiz == null) {
                    return ResponseEntity.badRequest()
                            .body("Quiz not found for ID " + result.getQuizId());
                }

                AppUser author = userInterface.getUser(quiz.getCreatedUserId()).getBody();
                if (author == null) {
                    return ResponseEntity.badRequest().body("Author not found for ID " + quiz.getCreatedUserId());
                }

                submissions.add(new Submission(
                        result.getQuizId(),
                        quiz.getTitle(),
                        author.getName(),
                        result.getScore(),
                        result.getStatus(),
                        result.getTimestamp()
                ));

            }

            return ResponseEntity.status(HttpStatus.OK).body(submissions);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to fetch submissions. Please try again later.");
        }
    }

}