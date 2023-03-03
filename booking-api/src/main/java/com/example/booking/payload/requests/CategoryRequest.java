package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class CategoryRequest {

  @NotBlank(message = "Título no puede estar vacío")
  private String title;

  private String description;

  @NotBlank(message = "URL imagen no puede estar vacío")
  private String imageUrl;

}
