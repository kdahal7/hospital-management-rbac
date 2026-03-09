package SpringAssignment.hospitalManagement.controller;

import SpringAssignment.hospitalManagement.dto.LoginRequestDto;
import SpringAssignment.hospitalManagement.dto.LoginResponseDto;
import SpringAssignment.hospitalManagement.dto.SignUpRequestDto;
import SpringAssignment.hospitalManagement.dto.SignupResponseDto;
import SpringAssignment.hospitalManagement.security.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Register and login endpoints")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login with email and password - returns JWT token")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    @Operation(summary = "Register a new user with role USER or ADMIN")
    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignUpRequestDto signupRequestDto) {
        return ResponseEntity.ok(authService.signup(signupRequestDto));
    }
}