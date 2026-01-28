package org.finalugproject.myugproject.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "user_marks")
public class UserMark {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_mark_id")
    private long userMarkId;

    // Connect with user
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private MyUser user;

    // Connect with lesson
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    @JsonManagedReference
    private Lesson lesson;

    @Column(name = "java_game_mark")
    private int javaGameMark;

    @Column(name = "python_game_mark")
    private int pythonGameMark;

    @Column(name = "javascript_game_mark")
    private int javascriptGameMark;

    public UserMark() {
    }

    public UserMark(long userMarkId, MyUser user, Lesson lesson, int javaGameMark, int pythonGameMark, int javascriptGameMark) {
        this.userMarkId = userMarkId;
        this.user = user;
        this.lesson = lesson;
        this.javaGameMark = javaGameMark;
        this.pythonGameMark = pythonGameMark;
        this.javascriptGameMark = javascriptGameMark;
    }

    public long getUserMarkId() {
        return userMarkId;
    }

    public void setUserMarkId(long userMarkId) {
        this.userMarkId = userMarkId;
    }

    public MyUser getUser() {
        return user;
    }

    public void setUser(MyUser user) {
        this.user = user;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public int getJavaGameMark() {
        return javaGameMark;
    }

    public void setJavaGameMark(int javaGameMark) {
        this.javaGameMark = javaGameMark;
    }

    public int getPythonGameMark() {
        return pythonGameMark;
    }

    public void setPythonGameMark(int pythonGameMark) {
        this.pythonGameMark = pythonGameMark;
    }

    public int getJavascriptGameMark() {
        return javascriptGameMark;
    }

    public void setJavascriptGameMark(int javascriptGameMark) {
        this.javascriptGameMark = javascriptGameMark;
    }
}
