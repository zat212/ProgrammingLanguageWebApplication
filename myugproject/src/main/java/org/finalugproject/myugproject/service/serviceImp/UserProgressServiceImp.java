package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.UserProgress;
import org.finalugproject.myugproject.repository.UserProgressRepository;
import org.finalugproject.myugproject.service.MyUserService;
import org.finalugproject.myugproject.service.UserProgressService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserProgressServiceImp implements UserProgressService {


    private final UserProgressRepository userProgressRepository;
    private final MyUserService myUserService;

    public UserProgressServiceImp(UserProgressRepository userProgressRepository, MyUserService myUserService) {
        this.userProgressRepository = userProgressRepository;
        this.myUserService = myUserService;
    }

    @Override
    public List<UserProgress> getUserProgress() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        Long userId = loggedInUser.getUserId();
        return userProgressRepository.findByUserId(userId);
    }

    @Override
    public UserProgress saveOrUpdateProgress(UserProgress progress) {

        return userProgressRepository.save(progress);
    }
}
