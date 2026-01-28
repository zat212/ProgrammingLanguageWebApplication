package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "lesson_id")
    private long lessonId;

    @Column(name = "lesson_title")
    private String lessonTitle;

    @Lob
    @Column(name = "lesson_description", columnDefinition = "TEXT")
    private String lessonDescription;

    @Column(name = "lesson_level")
    private String lessonLevel;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    @JsonBackReference("lesson-savedLesson")
    private List<SavedLesson> savedByUsers;

    private String imageUrls;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<LearningMaterial> learningMaterials;

    // To connect with subject
    @ManyToOne
    @JoinColumn(name = "subject_id")
    @JsonManagedReference
    private Subject subject;

    @OneToMany(mappedBy = "lesson")
    @JsonBackReference
    private List<UserMark> userMarks;

    @OneToMany(mappedBy = "lesson")
    @JsonBackReference
    private List<Quiz> quizzes;

    private LocalDateTime created_at;

    public Lesson() {
    }


    public Lesson(long lessonId, String lessonTitle, String lessonDescription, String lessonLevel, String imageUrls, List<LearningMaterial> learningMaterials, Subject subject, List<UserMark> userMarks, List<Quiz> quizzes, LocalDateTime created_at) {
        this.lessonId = lessonId;
        this.lessonTitle = lessonTitle;
        this.lessonDescription = lessonDescription;
        this.lessonLevel = lessonLevel;
        this.imageUrls = imageUrls;
        this.learningMaterials = learningMaterials;
        this.subject = subject;
        this.userMarks = userMarks;
        this.quizzes = quizzes;
        this.created_at = created_at;
    }

    public long getLessonId() {
        return lessonId;
    }

    public void setLessonId(long lessonId) {
        this.lessonId = lessonId;
    }

    public String getLessonTitle() {
        return lessonTitle;
    }

    public void setLessonTitle(String lessonTitle) {
        this.lessonTitle = lessonTitle;
    }

    public String getLessonDescription() {
        return lessonDescription;
    }

    public void setLessonDescription(String lessonDescription) {
        this.lessonDescription = lessonDescription;
    }

    public String getLessonLevel() {
        return lessonLevel;
    }

    public void setLessonLevel(String lessonLevel) {
        this.lessonLevel = lessonLevel;
    }


    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    public List<LearningMaterial> getLearningMaterials() {
        return learningMaterials;
    }

    public void setLearningMaterials(List<LearningMaterial> learningMaterials) {
        this.learningMaterials = learningMaterials;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public List<UserMark> getUserMarks() {
        return userMarks;
    }

    public void setUserMarks(List<UserMark> userMarks) {
        this.userMarks = userMarks;
    }

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }


}
