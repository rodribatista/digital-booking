package com.example.booking.repositories;

import com.example.booking.models.Category;
import com.example.booking.models.City;
import com.example.booking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> searchAllByCategory(Category category);

  List<Product> searchAllByAddress_City(City city);

  @Query("FROM Product p WHERE p.id NOT IN" +
    "(SELECT b.product FROM Booking b " +
    "WHERE b.dateCheckIn < ?2 AND b.dateCheckOut > ?1)")
  List<Product> searchAllByDates(LocalDate checkIn, LocalDate checkOut);

  @Query("FROM Product p WHERE p.id NOT IN" +
    "(SELECT b.product FROM Booking b " +
    "WHERE b.dateCheckIn < ?2 AND b.dateCheckOut > ?1)" +
    "AND p.address.city = ?3")
  List<Product> searchAllByDatesAndCity(
    LocalDate checkIn, LocalDate checkOut, City city);

}