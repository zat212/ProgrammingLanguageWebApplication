package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "learning_materials")
public class LearningMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "material_id")
    private Long materialId;

    @Column(name = "material_title")
    private String materialTitle;

    @Column(name = "material_type")
    private String materialType;

    @Lob
    @Column(name = "material_content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "material_url")
    private String materialUrl;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    @JsonBackReference
    private Lesson lesson;

    public LearningMaterial() {
    }

    public LearningMaterial(Long materialId,
                            String materialTitle,
                            String materialType,
                            String content,
                            String materialUrl,
                            String description,
                            Lesson lesson) {
        this.materialId = materialId;
        this.materialTitle = materialTitle;
        this.materialType = materialType;
        this.content = content;
        this.materialUrl = materialUrl;
        this.description = description;
        this.lesson = lesson;
    }

    // Getters and Setters
    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }

    public String getMaterialTitle() {
        return materialTitle;
    }

    public void setMaterialTitle(String materialTitle) {
        this.materialTitle = materialTitle;
    }

    public String getMaterialType() {
        return materialType;
    }

    public void setMaterialType(String materialType) {
        this.materialType = materialType;
    }

    public String getMaterialUrl() {
        return materialUrl;
    }

    public void setMaterialUrl(String materialUrl) {
        this.materialUrl = materialUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
