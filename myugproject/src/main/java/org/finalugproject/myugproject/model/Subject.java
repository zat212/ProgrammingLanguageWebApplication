package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "subject_id")
    private long subjectId;

    @Column(name = "subject_name")
    private String subjectName;

    @OneToMany(mappedBy = "subject")
    @JsonBackReference
    private List<Lesson> lessons;

    public Subject() {
    }

    public Subject(long subjectId, String subjectName, List<Lesson> lessons) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.lessons = lessons;
    }

    public long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<Lesson> lessons) {
        this.lessons = lessons;
    }
}
