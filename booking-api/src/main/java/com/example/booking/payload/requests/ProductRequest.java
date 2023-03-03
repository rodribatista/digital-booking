package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class ProductRequest {

  @NotBlank(message = "Título no puede estar vacío")
  private String title;

  @Length(min = 150, message = "Descripción debe tener al menos 150 caracteres")
  @NotBlank(message = "Descripción no puede estar vacío")
  private String description;

  @NotBlank(message = "Dirección no puede estar vacío")
  private String address;

  @NotNull(message = "Categoría no puede estar vacío")
  @Min(message = "Categoría debe ser un valor mayor a 1", value = 1)
  private Long category_id;

}
