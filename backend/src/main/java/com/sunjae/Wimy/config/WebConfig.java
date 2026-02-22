package com.sunjae.Wimy.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // application.yml에 정의한 FRONTEND_URL 값을 가져옵니다.
    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        System.out.println("DEBUG: 현재 허용된 프론트엔드 주소는 [" + frontendUrl + "] 입니다.");

        registry.addMapping("/**") // 모든 경로에 대해
                .allowedOrigins(frontendUrl) // 변수 대신 직접 입력
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}