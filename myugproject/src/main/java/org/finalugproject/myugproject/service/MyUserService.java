package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.exception.UserException;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.springframework.security.core.userdetails.UserDetails;


public interface MyUserService {

    MyUser findUserByEmail(String loggedInUserEmail);

    UserDetails loadUserByUsername(String username) throws UserException;


    MyUser updateUserRole(Long userId, Role newRole); // new method


}
