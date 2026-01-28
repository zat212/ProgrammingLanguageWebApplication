package org.finalugproject.myugproject.controller;

import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.UserMark;
import org.finalugproject.myugproject.model.UserProgress;
import org.finalugproject.myugproject.repository.UserMarkRepository;
import org.finalugproject.myugproject.repository.UserProgressRepository;
import org.finalugproject.myugproject.service.CodeExecutionService;
import org.finalugproject.myugproject.service.MyUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/game")
public class GameController {

    private final UserMarkRepository userMarkRepository;
    private final CodeExecutionService codeExecutionService;
    private final MyUserService myUserService;
    private final UserProgressRepository userProgressRepository;

    public GameController(UserMarkRepository userMarkRepository, CodeExecutionService codeExecutionService, MyUserService myUserService, UserProgressRepository userProgressRepository) {
        this.userMarkRepository = userMarkRepository;
        this.codeExecutionService = codeExecutionService;
        this.myUserService = myUserService;
        this.userProgressRepository = userProgressRepository;
    }

    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startNewGame() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                .orElseGet(() -> {
                    UserMark newMark = new UserMark();
                    newMark.setUser(loggedInUser);
                    newMark.setJavaGameMark(0);
                    return newMark;
                });
        userMark.setJavaGameMark(0);
        userMarkRepository.save(userMark);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Java Game Marks reset to 0. Ready to start a new game!"
        ));
    }


    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitCode(@RequestBody Map<String, String> gameData) {
        String submittedCode = gameData.get("code");
        String desiredOutput = gameData.get("desiredOutput");
        String challengeId = gameData.get("challengeId");
        int challengeIDType = Integer.parseInt(challengeId);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        System.out.println(loggedInUserEmail);
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }

        boolean isCorrect = codeExecutionService.executeAndTest(submittedCode, desiredOutput);
        System.out.println("This is the challenge ID :" + challengeId);


        if (isCorrect) {

            UserProgress existing = userProgressRepository.findByUserIdAndChallengeId(
                    loggedInUser.getUserId(),
                    challengeIDType
            );
            if (existing != null && existing.isAnswered()) {
                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "alreadyAnswered", true,
                                "message", "Correct! But you already solved this mission earlier. No points added."
                        )
                );
            }

            UserProgress userProgress = new UserProgress();
            userProgress.setUserId(loggedInUser.getUserId());
            userProgress.setChallengeId(challengeIDType);
            userProgress.setAnswered(true);
            userProgressRepository.save(userProgress);

            UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                    .orElseGet(() -> {
                        UserMark newMark = new UserMark();
                        newMark.setUser(loggedInUser);
                        newMark.setJavaGameMark(0); // default
                        newMark.setPythonGameMark(0);
                        newMark.setJavascriptGameMark(0);
                        return newMark;
                    });

            int currentScore = userMark.getJavaGameMark();
            userMark.setJavaGameMark(currentScore + 10);
            userMarkRepository.save(userMark);
            return ResponseEntity.ok(Map.of("success", true, "message", "✅ Code Correct! +10 points added to Java Game Mark."));
        } else {
            return ResponseEntity.ok(Map.of("success", false, "message", "❌ Output did not match the expected result."));
        }
    }

    @PostMapping("/submitPython")
    public ResponseEntity<Map<String, Object>> submitCodePython(@RequestBody Map<String, String> gameData) {

        String submittedCode = gameData.get("code");
        String challengeId = gameData.get("challengeId");
        int challengeIDType = Integer.parseInt(challengeId);
        String desiredOutput = gameData.get("desiredOutput");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);

        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        boolean isCorrect = codeExecutionService.executeAndTestPython1(submittedCode, desiredOutput);

        if (isCorrect) {
            UserProgress existing = userProgressRepository.findByUserIdAndChallengeId(
                    loggedInUser.getUserId(),
                    challengeIDType
            );
            if (existing != null && existing.isAnswered()) {
                return ResponseEntity.ok(
                        Map.of(
                                "success", true,
                                "alreadyAnswered", true,
                                "message", "Correct! But you already solved this mission earlier. No points added."
                        )
                );
            }

            UserProgress userProgress = new UserProgress();
            userProgress.setUserId(loggedInUser.getUserId());
            userProgress.setChallengeId(challengeIDType);
            userProgress.setAnswered(true);
            userProgressRepository.save(userProgress);

            UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                    .orElseGet(() -> {
                        UserMark newMark = new UserMark();
                        newMark.setUser(loggedInUser);
                        newMark.setPythonGameMark(0);
                        return newMark;
                    });

            int currentScore = userMark.getPythonGameMark();
            userMark.setPythonGameMark(currentScore + 10);
            userMarkRepository.save(userMark);

            return ResponseEntity.ok(
                    Map.of(
                            "success", true,
                            "alreadyAnswered", false,
                            "message", "Correct! +10 points added."
                    )
            );
        }

        // ❌ If wrong answer
        return ResponseEntity.ok(
                Map.of(
                        "success", false,
                        "message", "❌ Output did not match the expected result."
                )
        );
    }

    @GetMapping("/javaLeaderBoard")
    public ResponseEntity<List<UserMark>> getAllJavaGameMark() {
        List<UserMark> userMarks = userMarkRepository.findByOrderByJavaGameMarkDesc();
        return ResponseEntity.ok(userMarks);
    }

    @GetMapping("/pythonLeaderBoard")
    public ResponseEntity<List<UserMark>> getAllPythonGameMark() {
        List<UserMark> userMarks = userMarkRepository.findByOrderByPythonGameMarkDesc();
        return ResponseEntity.ok(userMarks);
    }

    @GetMapping("/javaScriptLeaderBoard")
    public ResponseEntity<List<UserMark>> getAllJavaScriptGameMark() {
        List<UserMark> userMarks = userMarkRepository.findByOrderByJavascriptGameMarkDesc();
        return ResponseEntity.ok(userMarks);
    }


    @PostMapping("/startPythonGame")
    public ResponseEntity<Map<String, Object>> startNewGamePython() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                .orElseGet(() -> {
                    UserMark newMark = new UserMark();
                    newMark.setUser(loggedInUser);
                    newMark.setPythonGameMark(0);
                    return newMark;
                });
        userMark.setPythonGameMark(0);
        userMarkRepository.save(userMark);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Python Game Marks reset to 0. Ready to start a new game!"
        ));
    }





    @PostMapping("/startJsGame")
    public ResponseEntity<Map<String, Object>> startNewGameJs() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                .orElseGet(() -> {
                    UserMark newMark = new UserMark();
                    newMark.setUser(loggedInUser);
                    newMark.setJavascriptGameMark(0);
                    return newMark;
                });
        userMark.setJavascriptGameMark(0);
        userMarkRepository.save(userMark);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Python Game Marks reset to 0. Ready to start a new game!"
        ));
    }


    @PostMapping("/submitJs")
    public ResponseEntity<Map<String, Object>> submitCodeJs(@RequestBody Map<String, String> gameData) {
        String submittedCode = gameData.get("code");
        String desiredOutput = gameData.get("desiredOutput");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        boolean isCorrect = codeExecutionService.executeAndTestJavaScript(submittedCode, desiredOutput);

        System.out.println(isCorrect);

        if (isCorrect) {
            UserMark userMark = userMarkRepository.findUserMarkByUser(loggedInUser)
                    .orElseGet(() -> {
                        UserMark newMark = new UserMark();
                        newMark.setUser(loggedInUser);
                        newMark.setJavascriptGameMark(0);
                        return newMark;
                    });

            int currentScore = userMark.getJavascriptGameMark();
            userMark.setJavascriptGameMark(currentScore + 10);
            userMarkRepository.save(userMark);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "✅ Code Correct! +10 points added to JavaScript Game Mark."
            ));
        } else {
            return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "❌ Output did not match the expected result."
            ));
        }
    }


    @GetMapping("/userGameMark")
    public ResponseEntity<Optional<UserMark>> getUserMark(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        Optional<UserMark> userMark = userMarkRepository.findUserMarkByUser(loggedInUser);

        return ResponseEntity.ok(userMark);
    }

}