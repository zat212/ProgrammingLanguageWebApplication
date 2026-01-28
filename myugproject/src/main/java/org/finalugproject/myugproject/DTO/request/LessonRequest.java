package org.finalugproject.myugproject.DTO.request;

public class LessonRequest {
    private String lessonTitle;
    private String lessonDescription;
    private String lessonLevel;
    private String imageUrls;
    private Long subject;

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

    public Long getSubject() {
        return subject;
    }

    public void setSubject(Long subject) {
        this.subject = subject;
    }
}
