package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject,Long> {

    Subject findBySubjectName(String subjectName);

}
