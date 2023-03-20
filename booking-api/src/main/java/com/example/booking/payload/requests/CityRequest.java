package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class CityRequest {

  @NotBlank(message = "Nombre no puede estar vacío")
  private String name;

  @NotNull(message = "País no puede ser nulo")
  @Min(message = "País debe ser un valor mayor a 1", value = 1)
  private Long country_id;

}