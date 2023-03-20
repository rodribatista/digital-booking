package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
import com.example.booking.models.Feature;
import com.example.booking.payload.requests.FeatureRequest;
import com.example.booking.repositories.FeatureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class FeatureService {

  private FeatureRepository featureRepository;

  public Feature getFeature(Long id) throws NotFoundException {
    return featureRepository.findById(id).orElseThrow(
      () -> new NotFoundException("No existe característica con id " + id));
  }

  public List<Feature> getFeatures(List<Long> id)
    throws NotFoundException {
    try {
      return featureRepository.findAllById(id);
    } catch (Exception e) {
      throw new NotFoundException(e.getMessage());
    }
  }

  public Feature createFeature(FeatureRequest featureRequest
  ) throws SQLIntegrityException {
    var feature = Feature.builder()
      .id(null)
      .title(featureRequest.getTitle())
      .build();
    try { return featureRepository.save(feature); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }

  }

  public Feature updateFeature(Long id, FeatureRequest featureRequest
  ) throws NotFoundException, SQLIntegrityException {
    var feature = getFeature(id);
    try {
      feature.setTitle(featureRequest.getTitle());
      return feature; }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
  }

  public Feature deleteFeature(Long id)
    throws NotFoundException, SQLIntegrityException {
    var featureDeleted = getFeature(id);
    try { featureRepository.deleteById(id); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return featureDeleted;
  }

}