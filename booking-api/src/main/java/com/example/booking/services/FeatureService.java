package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Feature;
import com.example.booking.repositories.FeatureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class FeatureService {

  private FeatureRepository featureRepository;

  public Feature getFeature(Long id)
    throws NotFoundException {
    return featureRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe característica con id " + id));
  }

  public Feature createFeature(Feature feature) {
    return featureRepository.save(feature);
  }

  public Feature updateFeature(Long id, Feature feature)
    throws NotFoundException {
    if (!featureRepository.existsById(id))
      throw new NotFoundException("No existe característica con id " + id);
    var featureUpdate = getFeature(id);
    featureUpdate.setTitle(feature.getTitle());
    return featureUpdate;
  }

  public Feature deleteFeature(Long id)
    throws NotFoundException {
    var featureDeleted = getFeature(id);
    featureRepository.deleteById(id);
    return featureDeleted;
  }

}
