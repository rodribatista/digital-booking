package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "features")
public class Feature {

  @Id
  @Null(message = "No se debe especificar un id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Título no puede estar vacío")
  @Column(name = "title")
  private String title;

  @JsonIgnore
  @ManyToMany(mappedBy = "features", fetch = FetchType.LAZY)
  private Set<Product> products;

}
