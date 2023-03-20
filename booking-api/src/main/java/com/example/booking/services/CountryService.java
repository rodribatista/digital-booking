package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
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

  public Country createCountry(CountryRequest countryRequest
  ) throws SQLIntegrityException {
    var country = Country.builder()
      .id(null)
      .name(countryRequest.getName())
      .code(countryRequest.getCode())
      .build();
    try { return countryRepository.save(country); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
  }

  public Country updateCountry(Long id, CountryRequest countryRequest)
    throws NotFoundException, SQLIntegrityException {
    var country = getCountry(id);
    try {
      country.setName(countryRequest.getName());
      country.setCode(countryRequest.getCode()); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return country;
  }

  public Country deleteCountry(Long id)
    throws NotFoundException, SQLIntegrityException {
    var countryDeleted = getCountry(id);
    try { countryRepository.delete(countryDeleted); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return countryDeleted;
  }

}