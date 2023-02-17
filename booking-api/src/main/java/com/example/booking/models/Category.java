package com.example.booking.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "categories")
public class Category {

  @Id
  private Long id;

  @Column(name = "title")
  @NonNull
  private String title;

  @Column(name = "description")
  @Nullable
  private String description;

  @Column(name = "image_url")
  @NonNull
  private String imageUrl;

}
