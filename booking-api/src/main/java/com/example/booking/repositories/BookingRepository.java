package com.example.booking.repositories;

import com.example.booking.models.Booking;
import com.example.booking.models.Product;
import com.example.booking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

  List<Booking> searchAllByProduct(Product product);

  List<Booking> searchAllByUser(User user);

}