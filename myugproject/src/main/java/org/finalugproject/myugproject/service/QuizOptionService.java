package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.model.Quiz;
import org.finalugproject.myugproject.model.QuizOption;

import java.util.List;

public interface QuizOptionService {

    List<QuizOption> findWithQuiz(Quiz quiz);

}
