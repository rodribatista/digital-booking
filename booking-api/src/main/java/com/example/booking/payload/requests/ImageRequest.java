package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Getter
public class ImageRequest {

  @NotBlank(message = "Url no puede estar vacío")
  @URL(message = "Url no es válido")
  private String url;

}
