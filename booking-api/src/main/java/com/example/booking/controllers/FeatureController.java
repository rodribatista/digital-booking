package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
import com.example.booking.models.Feature;
import com.example.booking.payload.requests.FeatureRequest;
import com.example.booking.repositories.FeatureRepository;
import com.example.booking.services.FeatureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("${endpoint}/features")
@Controller
public class FeatureController {

  private FeatureService featureService;
  private FeatureRepository featureRepository;

  @PostMapping()
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<Feature> createFeature(
    @Valid @RequestBody FeatureRequest featureRequest,
    BindingResult bindingResult
  ) throws BadRequestException, SQLIntegrityException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(featureService.createFeature(featureRequest));
  }

  @GetMapping()
  public ResponseEntity<List<Feature>> getAllFeatures() {
    var features = featureRepository.findAll();
    if (features.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(features);
    return ResponseEntity.status(HttpStatus.OK)
      .body(features);
  }

  @Transactional
  @PutMapping("/{id}")
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<Feature> updateFeature(
    @PathVariable Long id,
    @Valid @RequestBody FeatureRequest featureRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException, SQLIntegrityException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(featureService.updateFeature(id, featureRequest));
  }

  @DeleteMapping ("/{id}")
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<Feature> deleteFeature(
    @PathVariable Long id
  ) throws NotFoundException, SQLIntegrityConstraintViolationException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(featureService.deleteFeature(id));
  }

}