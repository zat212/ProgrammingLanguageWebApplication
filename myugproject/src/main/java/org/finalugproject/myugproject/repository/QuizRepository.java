package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Long> {

    List<Quiz> findByLesson(Lesson lesson);
}
