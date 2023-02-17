package com.example.booking.repositories;

import com.example.booking.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Modifying
  @Query("UPDATE Category c SET c.title = ?2, c.description = ?3, c.imageUrl = ?4 WHERE c.id = ?1")
  void update(
    Long id,
    String title,
    String description,
    String imageUrl
  );

}
