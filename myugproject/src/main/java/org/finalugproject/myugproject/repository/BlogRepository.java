package org.finalugproject.myugproject.repository;

import org.finalugproject.myugproject.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog,Long> {
}
