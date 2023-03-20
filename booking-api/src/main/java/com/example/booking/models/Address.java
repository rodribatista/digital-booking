package com.example.booking.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
@Table(name = "addresses")
public class Address {

  @Id
  @Column(name = "id", unique = true, nullable = false)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "street", nullable = false, length = 100)
  private String street;

  @Column(name = "number", nullable = false, length = 10)
  private String number;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "city_id", nullable = false)
  private City city;

}