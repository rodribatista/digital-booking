package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class UserInfo {

  @NotBlank(message = "Nombre no puede estar vacío")
  private String firstName;

  @NotBlank(message = "Apellido no puede estar vacío")
  private String lastName;

}