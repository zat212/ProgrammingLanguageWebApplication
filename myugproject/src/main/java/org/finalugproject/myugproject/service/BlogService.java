package org.finalugproject.myugproject.service;

import org.finalugproject.myugproject.DTO.request.BlogRequest;
import org.finalugproject.myugproject.exception.BlogException;
import org.finalugproject.myugproject.model.Blog;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BlogService {

    Blog createBlog(BlogRequest request,List<MultipartFile> imageFiles);

    String deleteBlog(Long blogId) throws BlogException;

    Blog updateBlog(Long blogId,BlogRequest request,List<MultipartFile> images) throws BlogException;

    List<Blog> findByName(String blogTitle);

    Blog findById(Long blogId) throws BlogException;

    List<Blog> findAllBLogs();
}
