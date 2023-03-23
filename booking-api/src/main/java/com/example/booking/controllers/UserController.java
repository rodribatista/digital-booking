package com.example.booking.controllers;

import com.example.booking.config.TokenProvider;
import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.EmailAlreadyExistsException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.payload.requests.*;
import com.example.booking.payload.responses.AuthToken;
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

import javax.transaction.Transactional;
import javax.validation.Valid;

@AllArgsConstructor
@RequestMapping("${endpoint}/users")
@Controller
public class UserController {

  private AuthenticationManager authenticationManager;
  private TokenProvider jwtTokenUtil;
  private UserService userService;

  @PreAuthorize("hasRole('USER')")
  @GetMapping
  public ResponseEntity<User> getUser(
    @RequestHeader String Authorization
  ) throws BadRequestException, NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(userService.getUserFromToken(Authorization));
  }

  @PostMapping("/auth")
  public ResponseEntity<AuthToken> authenticateUser(
    @Valid @RequestBody UserLogin userLogin,
    BindingResult bindingResult
  ) throws BadRequestException, AuthenticationException, NotFoundException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        userLogin.getEmail(),
        userLogin.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    final String token = jwtTokenUtil.generateToken(authentication);
    return ResponseEntity.status(HttpStatus.OK)
      .body(new AuthToken(token));
  }

  @PostMapping("/signup")
  public ResponseEntity<User> createUser(
    @Valid @RequestBody UserSignup userRequest,
    BindingResult bindingResult
    ) throws BadRequestException, EmailAlreadyExistsException, NotFoundException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(userService.createUser(userRequest));
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(
    @PathVariable Long id,
    @Valid @RequestBody UserInfo userInfo,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(userService.updateUser(id, userInfo));
  }

  @Transactional
  @PutMapping("/{id}/email")
  public ResponseEntity<User> updateUserEmail(
    @PathVariable Long id,
    @Valid @RequestBody UserEmail userEmail,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(userService.updateUserEmail(id, userEmail));
  }

  @Transactional
  @PutMapping("/{id}/pass")
  public ResponseEntity<String> updateUserPassword(
    @PathVariable Long id,
    @Valid @RequestBody UserPass userPass,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    userService.updateUserPassword(id, userPass);
    return ResponseEntity.status(HttpStatus.OK)
      .body("Contraseña actualizada correctamente");
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<User> deleteUser(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(userService.deleteUser(id));
  }

}