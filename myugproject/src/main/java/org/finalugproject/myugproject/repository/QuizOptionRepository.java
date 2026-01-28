package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.Quiz;
import org.finalugproject.myugproject.model.QuizOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizOptionRepository extends JpaRepository<QuizOption,Long> {

    List<QuizOption> findQuizOptionByQuiz(Quiz quiz);

}
