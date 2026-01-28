package org.finalugproject.myugproject.DTO.response;

import org.finalugproject.myugproject.model.Role;

import java.util.Map;

public class AuthResponse {

    private String jwt;
    private String message;
    private Role role;     // 👈 added for role-based authentication
    private String email;    // optional, for frontend use
    private Long userId;     // optional, if you need it
    private Map<String, Integer> subjectScores;

    public AuthResponse() {}

    public AuthResponse(String jwt, String message, Role role) {
        this.jwt = jwt;
        this.message = message;
        this.role = role;
    }

    public AuthResponse(String jwt, String message, Role role, String email, Long userId) {
        this.jwt = jwt;
        this.message = message;
        this.role = role;
        this.email = email;
        this.userId = userId;
    }

    // Getters and setters
    public String getJwt() { return jwt; }
    public void setJwt(String jwt) { this.jwt = jwt; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Map<String, Integer> getSubjectScores() {
        return subjectScores;
    }

    public void setSubjectScores(Map<String, Integer> subjectScores) {
        this.subjectScores = subjectScores;
    }
}
