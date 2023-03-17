package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Address;
import com.example.booking.payload.requests.AddressRequest;
import com.example.booking.repositories.AddressRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class AddressService {

  private AddressRepository addressRepository;
  private CityService cityService;

  public Address getAddress(Long id)
    throws NotFoundException {
    return addressRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe dirección con id " + id));
  }

  public Address createAddress(AddressRequest addressRequest)
    throws NotFoundException {
    var address = Address.builder()
      .id(null)
      .street(addressRequest.getStreet())
      .number(addressRequest.getNumber())
      .city(cityService.getCity(addressRequest.getCity_id()))
      .build();
    return addressRepository.save(address);
  }

  public Address updateAddress(Long id, AddressRequest addressRequest)
    throws NotFoundException {
    var address = getAddress(id);
    address.setStreet(addressRequest.getStreet());
    address.setNumber(addressRequest.getNumber());
    address.setCity(cityService.getCity(addressRequest.getCity_id()));
    return address;
  }

}