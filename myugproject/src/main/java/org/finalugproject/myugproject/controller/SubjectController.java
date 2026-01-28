package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.model.Subject;
import org.finalugproject.myugproject.service.SubjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects(){
        List<Subject> allSubjects = subjectService.findAllSubject();
        return new ResponseEntity<>(allSubjects, HttpStatus.OK);
    }

}
