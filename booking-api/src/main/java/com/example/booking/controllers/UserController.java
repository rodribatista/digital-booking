package com.example.booking.controllers;

import com.example.booking.config.TokenProvider;
import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.EmailAlreadyExistsException;
import com.example.booking.payload.responses.AuthToken;
import com.example.booking.payload.requests.UserLogin;
import com.example.booking.payload.requests.UserSignup;
import com.example.booking.models.User;
import com.example.booking.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@AllArgsConstructor
@RequestMapping("${endpoint}/users")
@Controller
public class UserController {

  private AuthenticationManager authenticationManager;
  private TokenProvider jwtTokenUtil;
  private UserService userService;

  @PostMapping("/auth")
  public ResponseEntity<AuthToken> authenticateUser(
    @RequestBody UserLogin userLogin
  ) throws AuthenticationException {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        userLogin.getEmail(),
        userLogin.getPassword()
      ));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    final String token = jwtTokenUtil.generateToken(authentication);
    return ResponseEntity.status(HttpStatus.OK).body(new AuthToken(token));
  }

  @PostMapping("/signup")
  public ResponseEntity<User> registerNewUser(
    @Valid @RequestBody UserSignup userRequest,
    BindingResult bindingResult
    ) throws BadRequestException, EmailAlreadyExistsException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(userService.registerNewUser(userRequest));
  }

  @PreAuthorize("hasRole('ADMIN')")
  @GetMapping("/hello-admin")
  public String adminPing(){
    return "Only Admins Can Read This";
  }

  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  @GetMapping("/hello-admin-user")
  public String adminUser(){
    return "Only Admins and Users Can Read This";
  }

  @PreAuthorize("hasRole('USER')")
  @GetMapping("/hello-user")
  public String userPing(){
    return "Any User Can Read This";
  }

}