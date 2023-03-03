package com.example.booking.repositories;

import com.example.booking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

  @Modifying
  @Query("UPDATE Product c SET c.title = ?2, c.description = ?3, c.address = ?4 WHERE c.id = ?1")
  void update(
    Long id,
    String title,
    String description,
    String address
  );

}
