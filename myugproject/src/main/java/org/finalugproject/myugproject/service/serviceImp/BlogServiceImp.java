package org.finalugproject.myugproject.service.serviceImp;

import org.finalugproject.myugproject.DTO.request.BlogRequest;
import org.finalugproject.myugproject.exception.BlogException;
import org.finalugproject.myugproject.model.Blog;
import org.finalugproject.myugproject.repository.BlogRepository;
import org.finalugproject.myugproject.service.BlogService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BlogServiceImp implements BlogService {

    private final BlogRepository blogRepository;

    public BlogServiceImp(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @Override
    public Blog createBlog(BlogRequest request,List<MultipartFile> imageFiles) {
        Blog createBlog = new Blog();

        createBlog.setBlog_description(request.getBlogDescription());
        createBlog.setCreated_at(LocalDateTime.now());
        createBlog.setBlog_text(request.getBlogText());

        if(imageFiles != null && !imageFiles.isEmpty()){
            MultipartFile file = imageFiles.get(0);
            String uploadDir = System.getProperty("user.dir") + "/blog-images";
            File dir = new File(uploadDir);
            if(!dir.exists()) dir.mkdirs();
            try{
                String filename = UUID.randomUUID()+"_"+file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir,filename);
                Files.write(filePath, file.getBytes());
                createBlog.setImageUrls(filename);
            }catch (IOException e){
                throw new RuntimeException("Failed to save image: " + file.getOriginalFilename(), e);
            }
        }
        return blogRepository.save(createBlog);
    }

    @Override
    public String deleteBlog(Long blogId) throws BlogException {
        Blog foundBlog = findById(blogId);
        blogRepository.delete(foundBlog);
        return "Blog is deleted!";
    }

    @Override
    public Blog updateBlog(Long blogId, BlogRequest request,List<MultipartFile> images) throws BlogException {
        Blog foundBlog = findById(blogId);

        if(request.getBlogDescription()!=null){
            foundBlog.setBlog_description(request.getBlogDescription());
        }

        if(request.getBlogText()!=null){
            foundBlog.setBlog_text(request.getBlogText());
        }

        if (images != null && !images.isEmpty()) {
            MultipartFile file = images.get(0);
            String uploadDir = System.getProperty("user.dir") + "/blog-images";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            try {
                String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, filename);
                file.transferTo(filePath.toFile());
                foundBlog.setImageUrls(filename);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image: " + file.getOriginalFilename(), e);
            }
        }

        return blogRepository.save(foundBlog);
    }

    @Override
    public List<Blog> findByName(String blogTitle) {
        List<Blog> foundBlogs = findByName(blogTitle);
        return foundBlogs;
    }

    @Override
    public Blog findById(Long blogId) throws BlogException {
        return blogRepository.findById(blogId).orElseThrow(()->new BlogException("Blog is not found!"));
    }

    @Override
    public List<Blog> findAllBLogs() {
        List<Blog> allBlogs = blogRepository.findAll();
        return allBlogs;
    }
}
