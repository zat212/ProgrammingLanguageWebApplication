package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.DTO.request.LearningMaterialRequest;
import org.finalugproject.myugproject.exception.LearningMaterialException;
import org.finalugproject.myugproject.model.LearningMaterial;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LearningMaterialService {


    LearningMaterial createWithFile(LearningMaterialRequest request, List<MultipartFile> imageFiles);

    String deleteLearningMaterial(Long learningMaterialId) throws LearningMaterialException;

    LearningMaterial updateLearningMaterial(Long learningMaterialId, LearningMaterialRequest request, List<MultipartFile> files);

    LearningMaterial findLearningMaterialById(Long learningMaterialId);

    List<LearningMaterial> findByLesson(Long lessonId);
}
