package com.example.booking.repositories;

import com.example.booking.models.Address;
import com.example.booking.models.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

  List<Address> findAllByCity(City city);

}