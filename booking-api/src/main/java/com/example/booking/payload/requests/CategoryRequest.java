package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class CategoryRequest {

  @NotBlank(message = "Título no puede estar vacío")
  private String title;

  @Length(max = 250, message = "Descripción puede contener máximo 250 caracteres")
  private String description;

  @NotBlank(message = "URL imagen no puede estar vacío")
  private String imageUrl;

}