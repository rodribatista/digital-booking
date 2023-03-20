package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class UserEmail {

  @Email(message = "Email no es válido")
  @NotBlank(message = "Email no puede estar vacío")
  private String email;

}