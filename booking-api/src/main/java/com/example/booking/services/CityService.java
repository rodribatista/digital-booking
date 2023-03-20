package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
import com.example.booking.models.City;
import com.example.booking.payload.requests.CityRequest;
import com.example.booking.repositories.CityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CityService {

  private CityRepository cityRepository;
  private CountryService countryService;

  public City getCity(Long id)
    throws NotFoundException {
    return cityRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe ciudad con id " + id));
  }

  public City getCityByName(String name)
    throws NotFoundException {
    return cityRepository.findByName(name).orElseThrow(
      () -> new NotFoundException("No existe ciudad con nombre " + name));
  }

  public City createCity(CityRequest cityRequest)
    throws NotFoundException, SQLIntegrityException {
    var city = City.builder()
      .id(null)
      .name(cityRequest.getName())
      .country(countryService.getCountry(cityRequest.getCountry_id()))
      .build();
    try { return cityRepository.save(city); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
  }

  public City updateCity(Long id, CityRequest cityRequest)
    throws NotFoundException, SQLIntegrityException {
    var city = getCity(id);
    try {
      city.setName(cityRequest.getName());
      city.setCountry(countryService.getCountry(cityRequest.getCountry_id())); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return city;
  }

  public City deleteCity(Long id)
    throws NotFoundException, SQLIntegrityException {
    var cityDeleted = getCity(id);
    try { cityRepository.delete(cityDeleted); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return cityDeleted;
  }

}