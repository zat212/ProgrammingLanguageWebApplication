package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.DTO.request.LessonRequest;
import org.finalugproject.myugproject.exception.LessonException;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.SavedLesson;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessonService {

    String deleteLesson(Long lessonId) throws LessonException;

    Lesson updateLesson(Long lessonId,LessonRequest request,List<MultipartFile> images) throws LessonException;

    Lesson findLessonById(Long lessonId) throws LessonException;

    List<Lesson> findLessonBySubject(String subjectName);

    List<Lesson> findLessonByDifficulties(String lessonDifficult);

    List<Lesson> findAllLessons();

    Lesson createLesson(LessonRequest request, List<MultipartFile> imageFiles);

    Page<Lesson> getLessonPaginated(int page, int size);

    Page<Lesson> findLessonBySubjectPaginated(String subjectName, int page, int size);

     String saveLesson(Long lessonId);

    String unsaveLesson(Long lessonId);

    List<SavedLesson> getSavedLessonsByUser();

}
