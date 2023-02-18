package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

@AllArgsConstructor
@Getter
public class CategoryRequest {

  @NonNull
  private String title;
  @Nullable
  private String description;
  @NonNull
  private String imageUrl;

}
