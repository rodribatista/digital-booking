package com.example.booking.repositories;

import com.example.booking.models.Address;
import com.example.booking.models.Category;
import com.example.booking.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  List<Product> searchAllByCategory(Category category);

  Product searchByAddress(Address address);

}