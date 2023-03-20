package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class UserPass {

  @NotBlank(message = "Password no puede estar vacío")
  @Length(min = 6, max = 16, message = "Password debe tener entre 6 y 16 caracteres")
  private String password;

}