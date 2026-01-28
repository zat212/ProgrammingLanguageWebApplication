package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.Subject;
import org.finalugproject.myugproject.model.UserSubjectMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserSubjectMarkRepository extends JpaRepository<UserSubjectMark, Long> {
    Optional<UserSubjectMark> findByUserAndLesson(MyUser user, Lesson lesson);

    @Query("SELECT SUM(m.score) FROM UserSubjectMark m WHERE m.user = :user AND m.subject = :subject")
    Integer calculateTotalScoreBySubjectAndUser(@Param("user") MyUser user, @Param("subject") Subject subject);
}