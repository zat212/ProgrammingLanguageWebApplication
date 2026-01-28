package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.DTO.request.QuizAttemptRequest;
import org.finalugproject.myugproject.DTO.request.QuizzRequest;
import org.finalugproject.myugproject.exception.QuizzException;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Quiz;

import java.lang.management.LockInfo;
import java.util.List;
import java.util.Map;

public interface QuizzService {

    List<Quiz> findAllQuizz();

    Quiz createQuizz(QuizzRequest request);

    String deleteQuizz(Long QuizzId) throws QuizzException;

    Quiz updateQuizz(Long quizzId, QuizzRequest request) throws QuizzException;

    List<Quiz> findQuizzByLessons(Long LessonId);

    Quiz findQuizzById(Long quizzId);

    String saveAttempt(QuizAttemptRequest request);

    Map<String, Integer> calculateAllSubjectScores(MyUser user);


}
