package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.model.UserProgress;
import org.finalugproject.myugproject.service.UserProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class UserProgressController {

    private final UserProgressService service;

    public UserProgressController(UserProgressService service) {
        this.service = service;
    }

    @GetMapping("/getUserProgress")
    public List<UserProgress> getUserProgress() {
        return service.getUserProgress();
    }

    @PostMapping("/")
    public UserProgress saveOrUpdateProgress(@RequestBody UserProgress progress) {
        return service.saveOrUpdateProgress(progress);
    }
}
