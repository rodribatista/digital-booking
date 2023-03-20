package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class CountryRequest {

  @NotBlank(message = "Nombre no puede estar vacío")
  private String name;

  @NotBlank(message = "Código no puede estar vacío")
  @Length(min = 2, max = 2, message = "El código debe tener 2 caracteres")
  private String code;

}