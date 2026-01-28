package org.finalugproject.myugproject.controller;

import org.finalugproject.myugproject.DTO.request.LoginRequest;
import org.finalugproject.myugproject.DTO.request.SignUpRequest;
import org.finalugproject.myugproject.DTO.response.AuthResponse;
import org.finalugproject.myugproject.config.JwtProvider;
import org.finalugproject.myugproject.exception.UserException;
import org.finalugproject.myugproject.model.MyUser;
import org.finalugproject.myugproject.model.Role;
import org.finalugproject.myugproject.repository.MyUserRepository;
import org.finalugproject.myugproject.service.QuizzService;
import org.finalugproject.myugproject.service.serviceImp.MyUserServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final MyUserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final QuizzService quizzService;
    private final MyUserServiceImp myUserServiceImp;


    public AuthController(MyUserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder, QuizzService quizzService, MyUserServiceImp myUserServiceImp) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
        this.quizzService = quizzService;
        this.myUserServiceImp = myUserServiceImp;
    }


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody SignUpRequest signUpRequest) throws UserException{

        String firstName = signUpRequest.getFirstName();
        String lastName = signUpRequest.getLastName();
        String phoneNumber = signUpRequest.getPhoneNumber();
        String password = signUpRequest.getPassword();
        String email = signUpRequest.getEmail();
        Role userRole = signUpRequest.getUserRole();
        String userClass = signUpRequest.getUserClass();
        MyUser isEmailExist = userRepository.findByEmail(email);
        if(isEmailExist !=null){
            throw new UserException("Email is already registered");
        }

        MyUser createdUser = new MyUser();
        createdUser.setCreatedAt(LocalDateTime.now());
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setEmail(email);
        createdUser.setUserRole(userRole);
        createdUser.setUserClass(userClass);
        createdUser.setPhoneNumber(phoneNumber);

        MyUser savedUser = userRepository.save(createdUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();

        authResponse.setJwt(token);
        authResponse.setUserId(savedUser.getUserId());
        authResponse.setRole(savedUser.getUserRole());
        authResponse.setEmail(savedUser.getEmail());
        authResponse.setMessage("Sign up Successful");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signInUser(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        String email = jwtProvider.getEmailFromToken(token);
        MyUser user = userRepository.findByEmail(email);
        Role role = user.getUserRole();

        Map<String, Integer> scoresMap = quizzService.calculateAllSubjectScores(user);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setRole(role);
        authResponse.setJwt(token);
        authResponse.setEmail(email);
        authResponse.setUserId(user.getUserId());
        authResponse.setSubjectScores(scoresMap);
        authResponse.setMessage("Sign in Successful");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }


    private Authentication authenticate(String username, String password) {

        UserDetails userDetails = myUserServiceImp.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
