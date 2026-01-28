package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.finalugproject.myugproject.repository.MyUserRepository;
import org.finalugproject.myugproject.repository.UserMarkRepository;
import org.finalugproject.myugproject.service.MyUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class MyUserController {

    private final MyUserRepository myUserRepository;
    private final MyUserService myUserService;

    public MyUserController(MyUserRepository myUserRepository, MyUserService myUserService) {
        this.myUserRepository = myUserRepository;
        this.myUserService = myUserService;
    }


    @GetMapping
    public ResponseEntity<List<MyUser>> getAllUsers(){
        List<MyUser> allUsers = myUserRepository.findAll();
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }


    @PutMapping("/{id}/role")
    public ResponseEntity<MyUser> updateUserRole(
            @PathVariable("id") Long userId,
            @RequestParam("role") Role newRole
    ){
        MyUser updatedUser = myUserService.updateUserRole(userId, newRole);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }


}
