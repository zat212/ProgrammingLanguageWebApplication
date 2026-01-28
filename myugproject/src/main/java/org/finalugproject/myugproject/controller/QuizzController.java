package org.finalugproject.myugproject.controller;

import org.finalugproject.myugproject.DTO.request.QuizAttemptRequest;
import org.finalugproject.myugproject.DTO.request.QuizzRequest;
import org.finalugproject.myugproject.exception.QuizzException;
import org.finalugproject.myugproject.model.Quiz;
import org.finalugproject.myugproject.model.QuizAttempt;
import org.finalugproject.myugproject.repository.QuizAttemptRepository;
import org.finalugproject.myugproject.service.QuizzAttemptService;
import org.finalugproject.myugproject.service.QuizzService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
public class QuizzController {

    private final QuizzService quizzService;
    private final QuizzAttemptService quizzAttemptService;

    public QuizzController(QuizzService quizzService, QuizzAttemptService quizzAttemptService) {
        this.quizzService = quizzService;
        this.quizzAttemptService = quizzAttemptService;
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizzService.findAllQuizz();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long quizId) {
        Quiz quiz = quizzService.findQuizzById(quizId);
        return ResponseEntity.ok(quiz);
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<Quiz>> getQuizzesByLesson(@PathVariable Long lessonId) {
        List<Quiz> quizzes = quizzService.findQuizzByLessons(lessonId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizzRequest request) {
        Quiz createdQuiz = quizzService.createQuizz(request);
        return ResponseEntity.ok(createdQuiz);
    }

    @PutMapping("/{quizId}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long quizId, @RequestBody QuizzRequest request) throws QuizzException {
        Quiz updatedQuiz = quizzService.updateQuizz(quizId, request);
        return ResponseEntity.ok(updatedQuiz);
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<String> deleteQuiz(@PathVariable Long quizId) throws QuizzException {
        String message = quizzService.deleteQuizz(quizId);
        return ResponseEntity.ok(message);
    }

    @PostMapping("/quizAttempts")
    public ResponseEntity<Map<String, String>> saveQuizAttempt(
            @RequestBody QuizAttemptRequest request) {
        try {
            String message = quizzService.saveAttempt(request);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (RuntimeException e) {
            System.err.println("Error processing quiz attempt: " + e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", "Error saving attempt: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected server error saving quiz attempt: " + e.getMessage());
            return ResponseEntity.status(500).body(Map.of("message", "Failed to save quiz attempt due to a server error."));
        }
    }

    @GetMapping("/quizAttempts")
    public ResponseEntity<List<QuizAttempt>> getAllQuizAttempt() {
        List<QuizAttempt> getAllQuizAttempt = quizzAttemptService.findAllQuizAttempt();
        return new ResponseEntity<>(getAllQuizAttempt, HttpStatus.OK);
    }
}
