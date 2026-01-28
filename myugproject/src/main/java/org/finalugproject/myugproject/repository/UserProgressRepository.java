package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);

//    List<UserProgress> findUserProgressByUs
    UserProgress findByUserIdAndChallengeId(Long userId, Integer challengeId);
}
