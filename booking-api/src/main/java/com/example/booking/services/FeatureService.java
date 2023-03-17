package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Feature;
import com.example.booking.payload.requests.FeatureRequest;
import com.example.booking.repositories.FeatureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;

@AllArgsConstructor
@Service
public class FeatureService {

  private FeatureRepository featureRepository;

  public Feature getFeature(Long id)
    throws NotFoundException {
    return featureRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe característica con id " + id));
  }

  public Feature createFeature(FeatureRequest featureRequest) {
    var feature = Feature.builder()
      .id(null)
      .title(featureRequest.getTitle())
      .build();
    return featureRepository.save(feature);
  }

  public Feature updateFeature(Long id, FeatureRequest featureRequest)
    throws NotFoundException {
    if (!featureRepository.existsById(id))
      throw new NotFoundException("No existe característica con id " + id);
    var feature = getFeature(id);
    feature.setTitle(featureRequest.getTitle());
    return feature;
  }

  public Feature deleteFeature(Long id)
    throws NotFoundException {
    var featureDeleted = getFeature(id);
    featureRepository.deleteById(id);
    return featureDeleted;
  }

}