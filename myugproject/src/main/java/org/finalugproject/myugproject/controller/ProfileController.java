package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.DTO.request.MyUserRequest;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.finalugproject.myugproject.repository.MyUserRepository;
import org.finalugproject.myugproject.service.MyUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {


    private final MyUserService myUserService;
    private final MyUserRepository myUserRepository;

    public ProfileController(MyUserService myUserService, MyUserRepository myUserRepository) {
        this.myUserService = myUserService;
        this.myUserRepository = myUserRepository;
    }


    @GetMapping
    public ResponseEntity<MyUser> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser loggedInUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (loggedInUser == null) {
            throw new RuntimeException("User not found");
        }
        return ResponseEntity.ok(loggedInUser);
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody MyUserRequest userRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser existingUser = myUserService.findUserByEmail(loggedInUserEmail);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        if (userRequest.getFirstName() != null)
            existingUser.setFirstName(userRequest.getFirstName());

        if (userRequest.getLastName() != null)
            existingUser.setLastName(userRequest.getLastName());

        if (userRequest.getEmail() != null)
            existingUser.setEmail(userRequest.getEmail());

        if (userRequest.getPhoneNumber() != null)
            existingUser.setPhoneNumber(userRequest.getPhoneNumber());

        if (userRequest.getUserClass() != null)
            existingUser.setUserClass(userRequest.getUserClass());

        if (userRequest.getProfileImageUrl() != null)
            existingUser.setProfileImageUrl(userRequest.getProfileImageUrl());

        myUserRepository.save(existingUser);
        return ResponseEntity.ok(existingUser);
    }


    @PostMapping("/upload-image")
    public ResponseEntity<?> uploadProfileImage(@RequestParam("file") MultipartFile file) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        MyUser user = myUserService.findUserByEmail(loggedInUserEmail);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        try {
            Path uploadPath = Paths.get("uploads/profiles");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = user.getUserId() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            user.setProfileImageUrl(fileName);
            myUserRepository.save(user);

            return ResponseEntity.ok().body("Profile image updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }

    @GetMapping("/students")
    public ResponseEntity<List<MyUser>> getAllUsers(){
        List<MyUser> getAllStudents = myUserRepository.findByUserRole(Role.STUDENT);
        return new ResponseEntity<>(getAllStudents,HttpStatus.OK);
    }
}
