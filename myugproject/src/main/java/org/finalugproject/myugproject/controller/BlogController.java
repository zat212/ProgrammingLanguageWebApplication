package org.finalugproject.myugproject.controller;


import org.finalugproject.myugproject.DTO.request.BlogRequest;
import org.finalugproject.myugproject.DTO.request.LessonRequest;
import org.finalugproject.myugproject.model.Blog;
import org.finalugproject.myugproject.model.Lesson;
import org.finalugproject.myugproject.service.BlogService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping(value = "/createBlog",consumes = {"multipart/form-data"})
    public ResponseEntity<?> createBlog(
            @RequestPart("blog") BlogRequest blogRequest,
            @RequestPart(value = "images",required = false) List<MultipartFile> imageFiles
    ){
        Blog createdBlog = blogService.createBlog(blogRequest,imageFiles);
        return ResponseEntity.ok(createdBlog);
    }

    @DeleteMapping("/{blogId}")
    public ResponseEntity<String> deleteBlog(@PathVariable Long blogId){
        String response = blogService.deleteBlog(blogId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long blogId) {
        Blog blog = blogService.findById(blogId);
        return new ResponseEntity<>(blog, HttpStatus.OK);
    }

    @PatchMapping("/{blogId}")
    public ResponseEntity<Blog> patchLesson(
            @PathVariable Long blogId,
            @RequestPart("blog") BlogRequest blogRequest,
            @RequestPart(value = "images", required = false) List<MultipartFile> images) {
        Blog updatedBlog = blogService.updateBlog(blogId, blogRequest, images);
        return ResponseEntity.ok(updatedBlog);
    }


    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs(){
        List<Blog> allBlog = blogService.findAllBLogs();
        return new ResponseEntity<>(allBlog, HttpStatus.OK);
    }

}
