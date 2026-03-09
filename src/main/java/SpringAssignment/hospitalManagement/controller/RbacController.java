package SpringAssignment.hospitalManagement.controller;

import SpringAssignment.hospitalManagement.dto.UserInfoDto;
import SpringAssignment.hospitalManagement.entity.User;
import SpringAssignment.hospitalManagement.mapper.UserMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Tag(name = "RBAC", description = "Role-based access control endpoints")
public class RbacController {

    private final UserMapper userMapper;

    @GetMapping("/public/welcome")
    @Operation(summary = "Public - no authentication required")
    public ResponseEntity<Map<String, String>> publicWelcome() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome! This endpoint is accessible to everyone.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/dashboard")
    @Operation(summary = "User dashboard - requires USER or PATIENT role",
            security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<Map<String, Object>> userDashboard() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserInfoDto userInfo = userMapper.toUserInfoDto(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to your dashboard, " + userInfo.getUsername() + "!");
        response.put("user", userInfo);
        response.put("content", "This content is visible to authenticated users.");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/admin/dashboard")
    @Operation(summary = "Admin dashboard - requires ADMIN role",
            security = @SecurityRequirement(name = "Bearer Authentication"))
    public ResponseEntity<Map<String, Object>> adminDashboard() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserInfoDto userInfo = userMapper.toUserInfoDto(user);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome, Admin " + userInfo.getUsername() + "!");
        response.put("user", userInfo);
        response.put("adminContent", "This content is only visible to administrators.");
        return ResponseEntity.ok(response);
    }
}
