package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {


    List<QuizAttempt> findQuizAttemptByUser(MyUser user);

}