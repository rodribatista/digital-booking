package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
import com.example.booking.models.City;
import com.example.booking.payload.requests.CityRequest;
import com.example.booking.repositories.CityRepository;
import com.example.booking.services.CityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("${endpoint}/cities")
@Controller
public class CityController {

  private CityService cityService;
  private CityRepository cityRepository;

  @PostMapping()
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<City> createCity(
    @Valid @RequestBody CityRequest cityRequest,
    BindingResult bindingResult
  ) throws BadRequestException, NotFoundException, SQLIntegrityException {
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
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<City> updateCity(
    @PathVariable Long id,
    @Valid @RequestBody CityRequest cityRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException, SQLIntegrityException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(cityService.updateCity(id, cityRequest));
  }

  @DeleteMapping ("/{id}")
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<City> deleteCity(
    @PathVariable Long id
  ) throws NotFoundException, SQLIntegrityException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(cityService.deleteCity(id));
  }

}