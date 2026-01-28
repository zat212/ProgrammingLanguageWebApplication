package org.finalugproject.myugproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/lesson-images/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/lesson-images/");

        registry.addResourceHandler("/blog-images/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/blog-images/");

        registry.addResourceHandler("/uploads/materials/**")
                .addResourceLocations("file:uploads/materials/");

        registry.addResourceHandler("/uploads/profiles/**")
                .addResourceLocations("file:uploads/profiles/");


    }
}
