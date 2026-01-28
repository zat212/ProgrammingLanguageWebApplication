package org.finalugproject.myugproject.service.serviceImp;


import org.finalugproject.myugproject.model.Quiz;
import org.finalugproject.myugproject.model.QuizOption;
import org.finalugproject.myugproject.repository.QuizOptionRepository;
import org.finalugproject.myugproject.service.QuizOptionService;
import org.finalugproject.myugproject.service.QuizzService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizOptionServiceImp implements QuizOptionService {

    private final QuizOptionRepository quizOptionRepository;

    public QuizOptionServiceImp(QuizOptionRepository quizOptionRepository) {
        this.quizOptionRepository = quizOptionRepository;
    }


    @Override
    public List<QuizOption> findWithQuiz(Quiz quiz) {
        List<QuizOption> findWithQuiz = quizOptionRepository.findQuizOptionByQuiz(quiz);
        return findWithQuiz;
    }
}
