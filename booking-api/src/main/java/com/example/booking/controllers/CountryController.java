package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
import com.example.booking.models.Country;
import com.example.booking.payload.requests.CountryRequest;
import com.example.booking.repositories.CountryRepository;
import com.example.booking.services.CountryService;
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
@RequestMapping("${endpoint}/countries")
@Controller
public class CountryController {

  private CountryService countryService;
  private CountryRepository countryRepository;

  @PostMapping()
  public ResponseEntity<Country> createCountry(
    @Valid @RequestBody CountryRequest countryRequest,
    BindingResult bindingResult
  ) throws BadRequestException, SQLIntegrityException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(countryService.createCountry(countryRequest));
  }

  @GetMapping()
  public ResponseEntity<List<Country>> getAllCountries() {
    var countries = countryRepository.findAll();
    if (countries.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(countries);
    return ResponseEntity.status(HttpStatus.OK)
      .body(countries);
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<Country> updateCountry(
    @PathVariable Long id,
    @Valid @RequestBody CountryRequest countryRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException, SQLIntegrityException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(countryService.updateCountry(id, countryRequest));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<Country> deleteCountry(
    @PathVariable Long id
  ) throws NotFoundException, SQLIntegrityException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(countryService.deleteCountry(id));
  }

}