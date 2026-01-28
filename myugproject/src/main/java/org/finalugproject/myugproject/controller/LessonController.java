package org.finalugproject.myugproject.controller;

import org.finalugproject.myugproject.DTO.request.LessonRequest;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.SavedLesson;
import org.finalugproject.myugproject.service.LessonService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping(value = "/createLesson", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createLesson(
            @RequestPart("lesson") LessonRequest lessonRequest,
            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) {
        Lesson createdLesson = lessonService.createLesson(lessonRequest, imageFiles);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdLesson.getLessonId());
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLesson() {
        List<Lesson> allLesson = lessonService.findAllLessons();
        return new ResponseEntity<>(allLesson, HttpStatus.OK);
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<String> deleteLesson(@PathVariable Long lessonId) {
        String response = lessonService.deleteLesson(lessonId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long lessonId) {
        Lesson lesson = lessonService.findLessonById(lessonId);
        return new ResponseEntity<>(lesson, HttpStatus.OK);
    }

    @PatchMapping("/{lessonId}")
    public ResponseEntity<Lesson> patchLesson(
            @PathVariable Long lessonId,
            @RequestPart("lesson") LessonRequest lessonRequest,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        Lesson updatedLesson = lessonService.updateLesson(lessonId, lessonRequest, images);
        return ResponseEntity.ok(updatedLesson);
    }

    @GetMapping("/javaLessons")
    public ResponseEntity<Page<Lesson>> javaLesson(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Page<Lesson> javaLessons = lessonService.findLessonBySubjectPaginated("Java", page, size);
        return new ResponseEntity<>(javaLessons, HttpStatus.OK);
    }

    @GetMapping("/pythonLessons")
    public ResponseEntity<Page<Lesson>> pythonLesson(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6")int size) {
        Page<Lesson> pythonLessons = lessonService.findLessonBySubjectPaginated("Python",page,size);
        return new ResponseEntity<>(pythonLessons, HttpStatus.OK);
    }

    @GetMapping("/javaScriptLessons")
    public ResponseEntity<Page<Lesson>> javaScriptLesson(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6")int size) {
        Page<Lesson> javaScriptLessons = lessonService.findLessonBySubjectPaginated("JavaScript",page,size);
        return new ResponseEntity<>(javaScriptLessons, HttpStatus.OK);
    }

    @GetMapping("/getallLesson")
    public ResponseEntity<Page<Lesson>> getAllLessons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Page<Lesson> lessonPage = lessonService.getLessonPaginated(page, size);
        return ResponseEntity.ok(lessonPage);
    }

    @PostMapping("/{lessonId}/save")
    public ResponseEntity<String> saveLesson(@PathVariable Long lessonId) {
        String result = lessonService.saveLesson(lessonId);
        if (result.startsWith("Error:")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
        if (result.equals("Lesson is already saved by this user.")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/{lessonId}/unsave")
    public ResponseEntity<String> unsaveLesson(@PathVariable Long lessonId) {
        String result = lessonService.unsaveLesson(lessonId);
        if (result.startsWith("Error:")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
        if (result.equals("Lesson is not currently saved by this user.")) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.ok(result);
    }

    @GetMapping("/saved")
    private ResponseEntity<List<SavedLesson>> getSaveLessons(){
        List<SavedLesson> foundSaveLesson = lessonService.getSavedLessonsByUser();
        return new ResponseEntity<>(foundSaveLesson,HttpStatus.OK);
    }

}
