package com.example.booking.services;

import com.example.booking.models.Image;
import com.example.booking.payload.requests.ImageRequest;
import com.example.booking.repositories.ImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ImageService {

  private ImageRepository imageRepository;

  public List<Image> createImages(List<ImageRequest> listUrls) {
    List<Image> listImages = listUrls.stream()
      .map(imageRequest ->
        Image.builder()
        .id(null)
        .url(imageRequest.getUrl())
        .build())
      .collect(Collectors.toList());
    return imageRepository.saveAll(listImages);
  }

}