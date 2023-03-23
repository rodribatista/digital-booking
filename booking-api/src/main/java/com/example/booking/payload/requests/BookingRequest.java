package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class BookingRequest {

  @DateTimeFormat(pattern = "HH:mm")
  @NotBlank(message = "Hora de llegada no puede estar vacío")
  private String arrivedTime;

  @NotBlank(message = "Fecha de check-in no puede estar vacío")
  private String dateCheckIn;

  @NotBlank(message = "Fecha de check-out no puede estar vacío")
  private String dateCheckOut;

  @NotNull(message = "Producto no puede ser nulo")
  @Min(message = "Producto debe ser un valor mayor a 1", value = 1)
  private Long product_id;

}