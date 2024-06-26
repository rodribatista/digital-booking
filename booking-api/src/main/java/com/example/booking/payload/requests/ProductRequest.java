package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@AllArgsConstructor
@Getter
public class  ProductRequest {

  @NotBlank(message = "Título no puede estar vacío")
  private String title;

  @Length(min = 100, message = "Descripción debe tener al menos 100 caracteres")
  @Length(max = 1250, message = "Descripción puede contener máximo 1250 caracteres")
  @NotBlank(message = "Descripción no puede estar vacío")
  private String description;

  @NotBlank(message = "Calle no puede estar vacío")
  private String address_street;

  @NotBlank(message = "Nro puerta no puede estar vacío")
  private String address_number;

  @NotNull(message = "Ciudad no puede ser nulo")
  @Min(message = "Ciudad debe ser un valor mayor a 1", value = 1)
  private Long city_id;

  @NotNull(message = "Categoría no puede ser nulo")
  @Min(message = "Categoría debe ser un valor mayor a 1", value = 1)
  private Long category_id;

  @NotNull(message = "Características no puede ser nulo")
  private List<Long> features_id;

  @NotNull(message = "Imagenes no puede ser nulo")
  private List<ImageRequest> images_url;

}