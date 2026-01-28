package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.DTO.request.QuizAttemptRequest;
import org.finalugproject.myugproject.DTO.request.QuizzRequest;
import org.finalugproject.myugproject.exception.QuizzException;
import org.finalugproject.myugproject.model.*;
import org.finalugproject.myugproject.repository.*;
import org.finalugproject.myugproject.service.LessonService;
import org.finalugproject.myugproject.service.MyUserService;
import org.finalugproject.myugproject.service.QuizzService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizzServiceImp implements QuizzService {

    private final QuizRepository quizRepository;
    private final LessonService lessonService;
    private final MyUserService userService;
    private final SubjectRepository subjectRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final UserMarkRepository userMarkRepository;
    private final UserSubjectMarkRepository userSubjectMarkRepository;

    public QuizzServiceImp(QuizRepository quizRepository, LessonService lessonService, MyUserService userService, SubjectRepository subjectRepository, QuizAttemptRepository quizAttemptRepository, UserMarkRepository userMarkRepository, UserSubjectMarkRepository userSubjectMarkRepository) {
        this.quizRepository = quizRepository;
        this.lessonService = lessonService;
        this.userService = userService;
        this.subjectRepository = subjectRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.userMarkRepository = userMarkRepository;
        this.userSubjectMarkRepository = userSubjectMarkRepository;
    }

    @Override
    public List<Quiz> findAllQuizz() {
        List<Quiz> foundQuiz = quizRepository.findAll();
        return foundQuiz;
    }

    @Override
    public Quiz createQuizz(QuizzRequest request) {
        Lesson lesson = lessonService.findLessonById(request.getLessonId());

        Quiz quiz = new Quiz();
        quiz.setLesson(lesson);
        quiz.setQuizText(request.getQuizText());
        quiz.setQuizType(request.getQuizType());

        Quiz savedQuiz = quizRepository.save(quiz);

        if (request.getOptions() != null) {
            List<QuizOption> quizOptions = request.getOptions().stream().map(optReq -> {
                QuizOption option = new QuizOption();
                option.setQuiz(savedQuiz);
                option.setOptionText(optReq.getOptionText());
                option.setCorrect(optReq.isCorrect());
                option.setExplanation(optReq.getExplanation());
                return option;
            }).collect(Collectors.toList());

            savedQuiz.setQuizOptions(quizOptions);
            quizRepository.save(savedQuiz);  // optional, for bidirectional mapping
        }

        return savedQuiz;
    }

    @Override
    public String deleteQuizz(Long quizzId) throws QuizzException {
        Quiz foundQuiz = findQuizzById(quizzId);
        quizRepository.delete(foundQuiz);
        return "Quiz is deleted";
    }

    @Override
    public Quiz updateQuizz(Long quizzId, QuizzRequest request) throws QuizzException {
        return quizRepository.findById(quizzId).orElseThrow(() -> new QuizzException("quizz not found"));
    }

    @Override
    public List<Quiz> findQuizzByLessons(Long lessonId) {
        List<Quiz> foundByLesson = quizRepository.findByLesson(lessonService.findLessonById(lessonId));
        return foundByLesson;
    }

    @Override
    public Quiz findQuizzById(Long quizzId) {
        return quizRepository.findById(quizzId).orElseThrow(() -> new QuizzException("quizz not found"));
    }


    @Override
    public String saveAttempt(QuizAttemptRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = userService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("Authenticated user not found.");
        }

        Lesson lesson = lessonService.findLessonById(request.getLessonId());

        if (lesson == null) {
            throw new RuntimeException("Lesson not found with ID: " + request.getLessonId());
        }
        if (lesson.getSubject() == null) {
            throw new RuntimeException("Lesson ID " + request.getLessonId() + " is missing a Subject association.");
        }

        Subject lessonSubject = lesson.getSubject();
        int score = request.getCorrectAnswers();

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(loggedInUser);
        attempt.setLessonId(request.getLessonId());
        attempt.setTotalQuizzes(request.getTotalQuizzes());
        attempt.setCorrectAnswers(score);

        try {
            LocalDateTime attemptDateTime = LocalDateTime.parse(
                    request.getAttemptDate(),
                    DateTimeFormatter.ISO_INSTANT.withZone(java.time.ZoneId.of("UTC"))
            );
            attempt.setAttemptDate(attemptDateTime);
        } catch (Exception e) {
            attempt.setAttemptDate(LocalDateTime.now());
            System.err.println("Failed to parse attemptDate from frontend, using server time.");
        }
        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);


        Optional<UserSubjectMark> existingMarkOptional =
                userSubjectMarkRepository.findByUserAndLesson(loggedInUser, lesson);

        UserSubjectMark userSubjectMark;

        if (existingMarkOptional.isPresent()) {
            userSubjectMark = existingMarkOptional.get();

            if (score > userSubjectMark.getScore()) {
                userSubjectMark.setScore(score);
                userSubjectMark.setAchievedDate(LocalDateTime.now());
                System.out.println("Score improved for Lesson ID " + lesson.getLessonId() + ". New highest score: " + score);
            }
        } else {
            userSubjectMark = new UserSubjectMark(loggedInUser, lesson, lessonSubject, score);
        }

        userSubjectMarkRepository.save(userSubjectMark);

        return "Quiz score and Subject Mark recorded successfully! Attempt ID: " + savedAttempt.getAttemptId();
    }

    @Override
    public Map<String, Integer> calculateAllSubjectScores(MyUser user) {
        List<Subject> allSubjects = subjectRepository.findAll();
        Map<String, Integer> scores = new HashMap<>();
        for (Subject subject : allSubjects) {
            Integer totalScore = userSubjectMarkRepository.calculateTotalScoreBySubjectAndUser(user, subject);
            scores.put(subject.getSubjectName(), totalScore != null ? totalScore : 0);
        }

        return scores;    }
}



