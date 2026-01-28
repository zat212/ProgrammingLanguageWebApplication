package org.finalugproject.myugproject.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long blog_id;

    private String imageUrls;

    private String blog_text;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String blog_description;

    private LocalDateTime created_at;

    public Blog() {
    }

    public Blog(long blog_id, String imageUrls, String blog_text, String blog_description, LocalDateTime created_at) {
        this.blog_id = blog_id;
        this.imageUrls = imageUrls;
        this.blog_text = blog_text;
        this.blog_description = blog_description;
        this.created_at = created_at;
    }

    public long getBlog_id() {
        return blog_id;
    }

    public void setBlog_id(long blog_id) {
        this.blog_id = blog_id;
    }

    public String getBlog_text() {
        return blog_text;
    }

    public void setBlog_text(String blog_text) {
        this.blog_text = blog_text;
    }

    public String getBlog_description() {
        return blog_description;
    }

    public void setBlog_description(String blog_description) {
        this.blog_description = blog_description;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }
}
