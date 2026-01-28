package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.exception.UserException;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.UserMark;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface UserMarkRepository extends JpaRepository<UserMark,Long> {

    Optional<UserMark> findUserMarkByUser(MyUser user) throws UserException;

    UserMark findUserMarkByUserAndLesson(MyUser user, Lesson lesson) throws UserException;
    
    List<UserMark> findByOrderByJavaGameMarkDesc();

    List<UserMark> findByOrderByPythonGameMarkDesc();

    List<UserMark> findByOrderByJavascriptGameMarkDesc();
 }
