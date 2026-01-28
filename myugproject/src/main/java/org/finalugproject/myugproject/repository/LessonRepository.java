package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.Subject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface LessonRepository extends JpaRepository<Lesson,Long> {

    List<Lesson> findBySubject(Subject subject);


    List<Lesson> findByLessonLevel(String lessonLevel);

    Page<Lesson> findBySubject_SubjectName(String subjectName, Pageable pageable);

}
