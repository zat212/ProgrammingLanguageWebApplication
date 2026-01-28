package org.finalugproject.myugproject.service.serviceImp;

import jakarta.transaction.Transactional;
import org.finalugproject.myugproject.DTO.request.LessonRequest;
import org.finalugproject.myugproject.exception.LessonException;
import org.finalugproject.myugproject.model.*;
import org.finalugproject.myugproject.repository.*;
import org.finalugproject.myugproject.service.LessonService;
import org.finalugproject.myugproject.service.MyUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LessonServiceImp implements LessonService {

    private final LessonRepository lessonRepository;
    private final SubjectRepository subjectRepository;
    private final LearningMaterialRepository learningMaterialRepository;
    private final MyUserService userService;
    private final SavedLessonRepository savedLessonRepository;
    private final QuizRepository quizRepository;

    public LessonServiceImp(LessonRepository lessonRepository, SubjectRepository subjectRepository, LearningMaterialRepository learningMaterialRepository, MyUserService userService, SavedLessonRepository savedLessonRepository, QuizRepository quizRepository ){
        this.lessonRepository = lessonRepository;
        this.subjectRepository = subjectRepository;
        this.learningMaterialRepository = learningMaterialRepository;
        this.userService = userService;
        this.savedLessonRepository = savedLessonRepository;
        this.quizRepository = quizRepository;
    }

    @Override
    public Lesson createLesson(LessonRequest request, List<MultipartFile> imageFiles) {
        Lesson createLesson = new Lesson();

        Subject subject = subjectRepository.findById(request.getSubject())
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        createLesson.setSubject(subject);
        createLesson.setLessonTitle(request.getLessonTitle());
        createLesson.setLessonDescription(request.getLessonDescription());
        createLesson.setLessonLevel(request.getLessonLevel());
        createLesson.setCreated_at(LocalDateTime.now());

        if (imageFiles != null && !imageFiles.isEmpty()) {
            MultipartFile file = imageFiles.get(0);
            String uploadDir = System.getProperty("user.dir") + "/lesson-images";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();
            try {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, filename);
                Files.write(filePath, file.getBytes());
                createLesson.setImageUrls(filename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image: " + file.getOriginalFilename(), e);
            }
        }

        return lessonRepository.save(createLesson);
    }

    @Override
    public Page<Lesson> getLessonPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lessonRepository.findAll(pageable);
    }

    @Override
    public Page<Lesson> findLessonBySubjectPaginated(String subjectName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return lessonRepository.findBySubject_SubjectName(subjectName, pageable);
    }

    @Override
    @Transactional
    public String saveLesson( Long lessonId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = userService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        Lesson lesson = findLessonById(lessonId);
        if (lesson == null) {
            return "Error: Lesson not found.";
        }
        Optional<SavedLesson> existingSave = savedLessonRepository.findByUserAndLesson(loggedInUser, lesson);
        if (existingSave.isPresent()) {
            return "Lesson is already saved by this user.";
        }
        SavedLesson newSave = new SavedLesson(loggedInUser, lesson);
        savedLessonRepository.save(newSave);
        return "Lesson saved successfully!";
    }

    @Override
    @Transactional
    public String unsaveLesson(Long lessonId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = userService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        Lesson lesson = findLessonById(lessonId);
        if (lesson == null) {
            return "Error: Lesson not found.";
        }
        Optional<SavedLesson> existingSave = savedLessonRepository.findByUserAndLesson(loggedInUser, lesson);

        if (existingSave.isEmpty()) {
            return "Lesson is not currently saved by this user.";
        }
        savedLessonRepository.deleteByUserAndLesson(loggedInUser, lesson);
        return "Lesson unsaved successfully!";
    }

    @Override
    public List<SavedLesson> getSavedLessonsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = userService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        List<SavedLesson> entities = savedLessonRepository.findByUser(loggedInUser);
        return entities;
    }


    @Override
    public Lesson updateLesson(Long lessonId, LessonRequest request, List<MultipartFile> images) throws LessonException {
        Lesson foundLesson = findLessonById(lessonId);

        if (request.getLessonTitle() != null) {
            foundLesson.setLessonTitle(request.getLessonTitle());
        }
        if (request.getLessonLevel() != null) {
            foundLesson.setLessonLevel(request.getLessonLevel());
        }
        if (request.getLessonDescription() != null) {
            foundLesson.setLessonDescription(request.getLessonDescription());
        }
        if (request.getSubject() != null) {
            Subject subject = subjectRepository.findById(request.getSubject())
                    .orElseThrow(() -> new LessonException("Subject not found"));
            foundLesson.setSubject(subject);
        }

        // Handle single image overwrite
        if (images != null && !images.isEmpty()) {
            MultipartFile file = images.get(0);
            String uploadDir = System.getProperty("user.dir") + "/lesson-images";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            try {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, filename);
                file.transferTo(filePath.toFile());
                foundLesson.setImageUrls(filename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image: " + file.getOriginalFilename(), e);
            }
        }

        return lessonRepository.save(foundLesson);
    }

    @Override
    public String deleteLesson(Long lessonId) throws LessonException {
        Lesson foundLesson = findLessonById(lessonId);
        List<Quiz> findQuizByLesson = quizRepository.findByLesson(foundLesson);
        quizRepository.deleteAll(findQuizByLesson);
        List<LearningMaterial> foundLearningMaterials = learningMaterialRepository.findByLesson(foundLesson);
        learningMaterialRepository.deleteAll(foundLearningMaterials);
        lessonRepository.delete(foundLesson);
        return "Lesson is deleted!";
    }

    @Override
    public Lesson findLessonById(Long lessonId) throws LessonException {
        return lessonRepository.findById(lessonId)
                .orElseThrow(() -> new LessonException("Lesson not found with Id: " + lessonId));
    }

    @Override
    public List<Lesson> findLessonBySubject(String subjectName) {
        Subject subject = subjectRepository.findBySubjectName(subjectName);
        return lessonRepository.findBySubject(subject);
    }

    @Override
    public List<Lesson> findLessonByDifficulties(String lessonDifficult) {
        return lessonRepository.findByLessonLevel(lessonDifficult);
    }

    @Override
    public List<Lesson> findAllLessons() {
        return lessonRepository.findAll();
    }
}
