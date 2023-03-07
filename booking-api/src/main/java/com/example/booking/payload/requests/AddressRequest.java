package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class AddressRequest {

  @NotBlank(message = "Calle no puede estar vacío")
  private String street;

  @NotBlank(message = "Nro puerta no puede estar vacío")
  private String number;

  @NotNull(message = "Ciudad no puede ser nulo")
  @Min(message = "Ciudad debe ser un valor mayor a 1", value = 1)
  private Long city_id;

}
