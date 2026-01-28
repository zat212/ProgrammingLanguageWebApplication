package org.finalugproject.myugproject.DTO.request;// package org.finalugproject.myugproject.DTO.request;

public class QuizAttemptRequest {

    private Long lessonId;
    private Integer totalQuizzes;
    private Integer correctAnswers;
    private String attemptDate; // ISO string from frontend

    // Getters and Setters (required for Spring to deserialize JSON)

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Integer getTotalQuizzes() {
        return totalQuizzes;
    }

    public void setTotalQuizzes(Integer totalQuizzes) {
        this.totalQuizzes = totalQuizzes;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public String getAttemptDate() {
        return attemptDate;
    }

    public void setAttemptDate(String attemptDate) {
        this.attemptDate = attemptDate;
    }
}