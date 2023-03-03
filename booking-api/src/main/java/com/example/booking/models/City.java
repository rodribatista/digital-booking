package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "cities")
public class City {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name")
  private String name;

  @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
  @JoinColumn(name = "country_id")
  @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
  private Country country;

}
