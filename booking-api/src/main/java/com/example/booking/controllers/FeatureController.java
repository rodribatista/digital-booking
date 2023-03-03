package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Feature;
import com.example.booking.repositories.FeatureRepository;
import com.example.booking.services.FeatureService;
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
@RequestMapping("${endpoint}/features")
@Controller
public class FeatureController {

  private FeatureService featureService;
  private FeatureRepository featureRepository;

  @PostMapping()
  public ResponseEntity<Feature> createFeature(
    @Valid @RequestBody Feature feature,
    BindingResult bindingResult
  ) throws BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(featureService.createFeature(feature));
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
  public ResponseEntity<Feature> updateFeature(
    @PathVariable Long id,
    @Valid @RequestBody Feature feature,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(featureService.updateFeature(id, feature));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<Feature> deleteFeature(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(featureService.deleteFeature(id));
  }

}
