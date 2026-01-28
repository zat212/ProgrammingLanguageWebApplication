package org.finalugproject.myugproject.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_subject_marks",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "lesson_id"})})
public class UserSubjectMark {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mark_id")
    private Long markId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private MyUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id", nullable = false)
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "achieved_score", nullable = false)
    private int score;

    @Column(name = "achieved_date")
    private LocalDateTime achievedDate;

    public UserSubjectMark() {
        this.achievedDate = LocalDateTime.now();
    }

    public UserSubjectMark(MyUser user, Lesson lesson, Subject subject, int score) {
        this.user = user;
        this.lesson = lesson;
        this.subject = subject;
        this.score = score;
        this.achievedDate = LocalDateTime.now();
    }

    public Long getMarkId() { return markId; }
    public void setMarkId(Long markId) { this.markId = markId; }
    public MyUser getUser() { return user; }
    public void setUser(MyUser user) { this.user = user; }
    public Lesson getLesson() { return lesson; }
    public void setLesson(Lesson lesson) { this.lesson = lesson; }
    public Subject getSubject() { return subject; }
    public void setSubject(Subject subject) { this.subject = subject; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public LocalDateTime getAchievedDate() { return achievedDate; }
    public void setAchievedDate(LocalDateTime achievedDate) { this.achievedDate = achievedDate; }
}