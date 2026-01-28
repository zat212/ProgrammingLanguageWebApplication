package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_lessons",
        // Ensure a user can only save a lesson once
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "lesson_id"})})
public class SavedLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Connects to MyUser
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-saved")
    private MyUser user;

    // Connects to Lesson
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id", nullable = false)
    @JsonManagedReference("lesson-savedLesson")
    private Lesson lesson;


    @Column(name = "saved_at", nullable = false)
    private LocalDateTime savedAt;

    public SavedLesson() {
        this.savedAt = LocalDateTime.now();
    }

    public SavedLesson(MyUser user, Lesson lesson) {
        this.user = user;
        this.lesson = lesson;
        this.savedAt = LocalDateTime.now();
    }

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public MyUser getUser() { return user; }
    public void setUser(MyUser user) { this.user = user; }

    public Lesson getLesson() { return lesson; }
    public void setLesson(Lesson lesson) { this.lesson = lesson; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}