package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.LearningMaterial;
import org.finalugproject.myugproject.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningMaterialRepository extends JpaRepository<LearningMaterial,Long> {
    List<LearningMaterial> findByLesson(Lesson lesson);
}
