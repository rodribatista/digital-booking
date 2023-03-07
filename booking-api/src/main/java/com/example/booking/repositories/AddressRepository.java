package com.example.booking.repositories;

import com.example.booking.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AddressRepository extends JpaRepository<Address, Long> {
}
