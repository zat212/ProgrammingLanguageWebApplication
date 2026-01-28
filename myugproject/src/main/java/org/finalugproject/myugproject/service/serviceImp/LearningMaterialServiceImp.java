package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.DTO.request.LearningMaterialRequest;
import org.finalugproject.myugproject.exception.LearningMaterialException;
import org.finalugproject.myugproject.model.LearningMaterial;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.repository.LearningMaterialRepository;
import org.finalugproject.myugproject.service.LearningMaterialService;
import org.finalugproject.myugproject.service.LessonService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class LearningMaterialServiceImp implements LearningMaterialService {

    private final LearningMaterialRepository learningMaterialRepository;
    private final LessonService lessonService;

    public LearningMaterialServiceImp(LearningMaterialRepository learningMaterialRepository, LessonService lessonService) {
        this.learningMaterialRepository = learningMaterialRepository;
        this.lessonService = lessonService;
    }

    @Override
    public LearningMaterial createWithFile(LearningMaterialRequest request, List<MultipartFile> files) {
        Lesson lesson = lessonService.findLessonById(request.getLessonId());
        String fileUrl = saveUploadedFile(files);
        LearningMaterial material = new LearningMaterial();
        material.setMaterialTitle(request.getMaterialTitle());
        material.setMaterialType(request.getMaterialType());
        material.setMaterialUrl(fileUrl != null ? fileUrl : request.getMaterialUrl());
        material.setDescription(request.getDescription());
        material.setContent(request.getContent());
        material.setLesson(lesson);
        return learningMaterialRepository.save(material);
    }

    @Override
    public String deleteLearningMaterial(Long learningMaterialId) throws LearningMaterialException {
        LearningMaterial foundLearningMaterial = findLearningMaterialById(learningMaterialId);
        learningMaterialRepository.delete(foundLearningMaterial);
        return "Learning Material is deleted!";
    }

    @Override
    public LearningMaterial updateLearningMaterial(Long learningMaterialId, LearningMaterialRequest request, List<MultipartFile> files) throws LearningMaterialException {
        LearningMaterial foundLearningMaterial = findLearningMaterialById(learningMaterialId);
        if (request.getMaterialTitle() != null) {
            foundLearningMaterial.setMaterialTitle(request.getMaterialTitle());
        }
        if (request.getMaterialType() != null) {
            foundLearningMaterial.setMaterialType(request.getMaterialType());
        }
        if (request.getContent() != null) {
            foundLearningMaterial.setContent(request.getContent());
        }
        if (request.getDescription() != null) {
            foundLearningMaterial.setDescription(request.getDescription());
        }
        if (files != null && !files.isEmpty()) {
            String newFileUrl = saveUploadedFile(files);
            foundLearningMaterial.setMaterialUrl(newFileUrl);
        } else if (request.getMaterialUrl() != null) {
            // Keep or update URL if no file uploaded
            foundLearningMaterial.setMaterialUrl(request.getMaterialUrl());
        }

        return learningMaterialRepository.save(foundLearningMaterial);
    }

    private String saveUploadedFile(List<MultipartFile> files) {
        if (files == null || files.isEmpty()) return null;

        MultipartFile file = files.get(0);
        try {
            Path uploadDir = Paths.get("uploads/materials");
            Files.createDirectories(uploadDir);
            String uniqueFileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadDir.resolve(uniqueFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/materials/" + uniqueFileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    @Override
    public LearningMaterial findLearningMaterialById(Long learningMaterialId) throws LearningMaterialException {
        return learningMaterialRepository.findById(learningMaterialId)
                .orElseThrow(() -> new LearningMaterialException("Learning Material not found with Id: " + learningMaterialId));
    }

    @Override
    public List<LearningMaterial> findByLesson(Long lessonId) {
        Lesson lesson = lessonService.findLessonById(lessonId);
        return learningMaterialRepository.findByLesson(lesson);
    }
}
