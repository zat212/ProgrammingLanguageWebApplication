package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.model.QuizOption;
import org.finalugproject.myugproject.service.QuizOptionService;
import org.finalugproject.myugproject.service.QuizzService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quizOpts")
public class QuizOptionController {


    private final QuizOptionService quizOptionService;
    private final QuizzService quizzService;

    public QuizOptionController(QuizOptionService quizOptionService, QuizzService quizzService) {
        this.quizOptionService = quizOptionService;
        this.quizzService = quizzService;
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<List<QuizOption>> findWithQuiz(@PathVariable Long quizId){
        List<QuizOption> foundOpts = quizOptionService.findWithQuiz(quizzService.findQuizzById(quizId));
        return ResponseEntity.ok(foundOpts);
    }



}
