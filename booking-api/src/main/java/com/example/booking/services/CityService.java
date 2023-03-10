package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
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
    var city = cityRepository.findByName(name);
    if (city == null) throw new NotFoundException("No existe ciudad con nombre " + name);
    return city;
  }

  public City createCity(CityRequest cityRequest)
    throws NotFoundException {
    var city = new City(
      null,
      cityRequest.getName(),
      countryService.getCountry(cityRequest.getCountry_id())
    );
    return cityRepository.save(city);
  }

  public City updateCity(Long id, CityRequest cityRequest)
    throws NotFoundException {
    var city = getCity(id);
    city.setName(cityRequest.getName());
    city.setCountry(countryService.getCountry(cityRequest.getCountry_id()));
    return city;
  }

  public City deleteCity(Long id)
    throws NotFoundException {
    var cityDeleted = getCity(id);
    cityRepository.deleteById(id);
    return cityDeleted;
  }

}
