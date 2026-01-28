package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.model.QuizAttempt;
import org.finalugproject.myugproject.repository.QuizAttemptRepository;
import org.finalugproject.myugproject.service.QuizzAttemptService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizAttemptServiceImp implements QuizzAttemptService {

    private final QuizAttemptRepository quizAttemptRepository;

    public QuizAttemptServiceImp(QuizAttemptRepository quizAttemptRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @Override
    public List<QuizAttempt> findAllQuizAttempt() {
        List<QuizAttempt> foundQuizAttempt = quizAttemptRepository.findAll();
        return foundQuizAttempt;
    }
}
