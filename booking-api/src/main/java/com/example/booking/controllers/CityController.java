package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.City;
import com.example.booking.payload.requests.CityRequest;
import com.example.booking.repositories.CityRepository;
import com.example.booking.services.CityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RequestMapping("${endpoint}/cities")
@Controller
public class CityController {

  private CityService cityService;
  private CityRepository cityRepository;

  @PostMapping()
  public ResponseEntity<City> createCity(
    @Valid @RequestBody CityRequest cityRequest,
    BindingResult bindingResult
  ) throws BadRequestException, NotFoundException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(cityService.createCity(cityRequest));
  }

  @GetMapping()
  public ResponseEntity<List<City>> getAllCities() {
    var countries = cityRepository.findAll();
    if (countries.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(countries);
    return ResponseEntity.status(HttpStatus.OK)
      .body(countries);
  }

  @GetMapping("/name={name}")
  public ResponseEntity<City> getCityByName(
    @PathVariable String name
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(cityService.getCityByName(name));
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<City> updateCity(
    @PathVariable Long id,
    @Valid @RequestBody CityRequest cityRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(cityService.updateCity(id, cityRequest));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<City> deleteCity(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(cityService.deleteCity(id));
  }

}
