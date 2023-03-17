package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Image;
import com.example.booking.payload.requests.ImageRequest;
import com.example.booking.repositories.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@AllArgsConstructor
@Service
public class ImageService {

  private ImageRepository imageRepository;

  public Image getImage(Long id)
    throws NotFoundException {
    return imageRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe imagen con id " + id));
  }

  public Image createImage(ImageRequest imageRequest) {
    var image = Image.builder()
      .id(null)
      .url(imageRequest.getUrl())
      .build();
    return imageRepository.save(image);
  }

  public Image updateImage(Long id, ImageRequest imageRequest)
    throws NotFoundException {
    if (!imageRepository.existsById(id))
      throw new NotFoundException("No existe imagen con id " + id);
    var image = getImage(id);
    image.setUrl(imageRequest.getUrl());
    return image;
  }

}