package org.finalugproject.myugproject.controller;

import org.finalugproject.myugproject.DTO.request.LearningMaterialRequest;
import org.finalugproject.myugproject.exception.LearningMaterialException;
import org.finalugproject.myugproject.model.LearningMaterial;
import org.finalugproject.myugproject.service.LearningMaterialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class LearningMaterialController {

    private final LearningMaterialService learningMaterialService;

    public LearningMaterialController(LearningMaterialService learningMaterialService) {
        this.learningMaterialService = learningMaterialService;
    }

    @PostMapping(value = "/createMaterial", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createLearningMaterialWithFile(
            @RequestPart("material") LearningMaterialRequest materialRequest,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        try {
            LearningMaterial savedMaterial = learningMaterialService.createWithFile(materialRequest, files);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedMaterial);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to create learning material: " + e.getMessage());
        }
    }


    @GetMapping("/{lessonId}")
    public ResponseEntity<List<LearningMaterial>> findWithLessonId(@PathVariable Long lessonId) {
        List<LearningMaterial> foundMaterials = learningMaterialService.findByLesson(lessonId);
        return new ResponseEntity<>(foundMaterials, HttpStatus.OK);
    }

    @DeleteMapping("/{materialId}")
    public ResponseEntity<String> deleteByMaterialId(@PathVariable Long materialId) {
        String response = learningMaterialService.deleteLearningMaterial(materialId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PatchMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<LearningMaterial> updateLearningMaterial(
            @PathVariable Long id,
            @RequestPart("material") LearningMaterialRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        LearningMaterial updated = learningMaterialService.updateLearningMaterial(id, request, files);
        return ResponseEntity.ok(updated);
    }



}
