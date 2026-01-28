package org.finalugproject.myugproject.repository;

import jakarta.transaction.Transactional;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.SavedLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;
import java.util.List;

public interface SavedLessonRepository extends JpaRepository<SavedLesson, Long> {

    /**
     * Checks if a specific lesson has already been saved by a specific user.
     */
    Optional<SavedLesson> findByUserAndLesson(MyUser user, Lesson lesson);

    /**
     * Retrieves all saved lessons for a specific user.
     */
    List<SavedLesson> findByUser(MyUser user);

    // You'll need a method for deleting/unsaving as well:
    // void deleteByUserAndLesson(MyUser user, Lesson lesson);

    @Modifying
    @Transactional
    void deleteByUserAndLesson(MyUser user, Lesson lesson);

}