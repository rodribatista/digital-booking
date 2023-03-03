package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  private String description;

  @OneToOne(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
  @JoinColumn(name = "address_id")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Address address;

  private Boolean availability;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
  @JoinColumn(name = "categories_id")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Category category;

  @ManyToMany(cascade = CascadeType.MERGE)
  @JoinTable(name = "product_has_features",
    joinColumns = {@JoinColumn(name = "product_id")},
    inverseJoinColumns = {@JoinColumn(name = "features_id")})
  private Set<Feature> features;

}
