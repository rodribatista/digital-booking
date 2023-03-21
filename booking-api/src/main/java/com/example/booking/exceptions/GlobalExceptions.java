package com.example.booking.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class GlobalExceptions {

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<String> badRequest(BadRequestException exception) {
    log.error(HttpStatus.BAD_REQUEST + " - " + exception.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body(exception.getMessage());
  }

  @ExceptionHandler(ConflictException.class)
  public ResponseEntity<String> conflict(ConflictException exception) {
    log.error(HttpStatus.CONFLICT + " - " + exception.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT)
      .body(exception.getMessage());
  }

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<String> notFound(NotFoundException exception) {
    log.error(HttpStatus.NOT_FOUND + " - " + exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body(exception.getMessage());
  }

  @ExceptionHandler(EmailAlreadyExistsException.class)
  public ResponseEntity<String> emailAlreadyExistsException(EmailAlreadyExistsException exception) {
    log.error(HttpStatus.CONFLICT + " - " + exception.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT)
      .body(exception.getMessage());
  }

  @ExceptionHandler(SQLIntegrityException.class)
  public ResponseEntity<String> conflict(SQLIntegrityException exception) {
    log.error(HttpStatus.CONFLICT + " - " + exception.getMessage());
    return ResponseEntity.status(HttpStatus.CONFLICT)
      .body(exception.getMessage());
  }

}