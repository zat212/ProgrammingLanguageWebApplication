package org.finalugproject.myugproject.DTO.request;

import java.util.List;

public class QuizzRequest {

    private Long lessonId;
    private String quizText;
    private String quizType;
    private List<QuizzOptionRequest> options;
    private String correctOption;

    public QuizzRequest() {}

    public QuizzRequest(Long lessonId, String quizText, String quizType, List<QuizzOptionRequest> options, String correctOption) {
        this.lessonId = lessonId;
        this.quizText = quizText;
        this.quizType = quizType;
        this.options = options;
        this.correctOption = correctOption;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public String getQuizText() {
        return quizText;
    }

    public void setQuizText(String quizText) {
        this.quizText = quizText;
    }

    public String getQuizType() {
        return quizType;
    }

    public void setQuizType(String quizType) {
        this.quizType = quizType;
    }

    public List<QuizzOptionRequest> getOptions() {
        return options;
    }

    public void setOptions(List<QuizzOptionRequest> options) {
        this.options = options;
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }
}
