package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Category;
import com.example.booking.models.Country;
import com.example.booking.payload.requests.CountryRequest;
import com.example.booking.repositories.CountryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CountryService {

  private CountryRepository countryRepository;

  public Country getCountry(Long id)
    throws NotFoundException {
    return countryRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe país con id " + id));
  }

  public Country createCountry(CountryRequest countryRequest) {
    var country = new Country(
      null,
      countryRequest.getName(),
      countryRequest.getCode()
    );
    return countryRepository.save(country);
  }

  public Country updateCountry(Long id, CountryRequest countryRequest)
    throws NotFoundException {
    var country = getCountry(id);
    country.setName(countryRequest.getName());
    country.setCode(countryRequest.getCode());
    return country;
  }

  public Country deleteCountry(Long id)
    throws NotFoundException {
    var countryDeleted = getCountry(id);
    countryRepository.deleteById(id);
    return countryDeleted;
  }

}
