package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyUserRepository extends JpaRepository<MyUser,Long> {

    MyUser findByEmail(String email);

    List<MyUser> findByUserRole(Role userRole);
}
