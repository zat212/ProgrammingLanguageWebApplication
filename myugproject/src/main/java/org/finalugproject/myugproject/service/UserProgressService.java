package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.model.UserProgress;
import org.finalugproject.myugproject.repository.UserProgressRepository;

import java.util.List;

public interface UserProgressService {

    List<UserProgress> getUserProgress();

    UserProgress saveOrUpdateProgress(UserProgress progress);

}
