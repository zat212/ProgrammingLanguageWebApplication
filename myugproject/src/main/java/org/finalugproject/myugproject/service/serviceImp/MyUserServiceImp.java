package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.config.JwtProvider;
import org.finalugproject.myugproject.exception.UserException;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.finalugproject.myugproject.repository.MyUserRepository;
import org.finalugproject.myugproject.service.MyUserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyUserServiceImp implements MyUserService {


    private final MyUserRepository myUserRepository;
    private final JwtProvider jwtProvider;

    public MyUserServiceImp(MyUserRepository myUserRepository, JwtProvider jwtProvider) {
        this.myUserRepository = myUserRepository;
        this.jwtProvider = jwtProvider;
    }


    @Override
    public MyUser findUserByEmail(String email) {
        MyUser user = myUserRepository.findByEmail(email);
        if(user == null){
            throw new UserException("User not found with email :"+email);
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UserException {
        MyUser user = myUserRepository.findByEmail(username);
        if(user == null){
            throw new UserException("User is invalid");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    @Override
    public MyUser updateUserRole(Long userId, Role newRole) {
        MyUser user = myUserRepository.findById(userId)
                .orElseThrow(() -> new UserException("User not found with id: " + userId));

        // Prevent changing admin roles accidentally
        if(user.getUserRole() == Role.ADMIN){
            throw new UserException("Cannot change role of an admin");
        }

        user.setUserRole(newRole);
        return myUserRepository.save(user);
    }


    public MyUser getLoggedInUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUserEmail = authentication.getName();
        return findUserByEmail(loggedInUserEmail);
    }
}
