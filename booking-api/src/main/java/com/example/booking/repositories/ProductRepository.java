package com.example.booking.repositories;

import com.example.booking.models.Address;
import com.example.booking.models.Category;
import com.example.booking.models.City;
import com.example.booking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> searchAllByCategory(Category category);

  @Query("FROM Address d WHERE d.city = ?1")
  List<Address> searchAllAddressByCity(City city);

  Product searchByAddress(Address address);

}