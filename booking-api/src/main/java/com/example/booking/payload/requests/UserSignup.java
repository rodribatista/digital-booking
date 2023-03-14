package com.example.booking.payload.requests;

import com.example.booking.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class UserSignup {

  @NotBlank(message = "Nombre no puede estar vacío")
  private String firstName;

  @NotBlank(message = "Apellido no puede estar vacío")
  private String lastName;

  @Email(message = "Email no es válido")
  @NotBlank(message = "Email no puede estar vacío")
  private String email;

  @NotBlank(message = "Password no puede estar vacío")
  @Length(min = 6, max = 16, message = "Password debe tener entre 6 y 16 caracteres")
  private String password;

}