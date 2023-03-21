package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Address;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {

  private ProductRepository productRepository;
  private CategoryService categoryService;
  private FeatureService featureService;
  private ImageService imageService;
  private CityService cityService;

  public Product getProduct(Long id) throws NotFoundException {
    return productRepository.findById(id).orElseThrow(
      () -> new NotFoundException("No existe producto con id " + id));
  }

  public List<Product> getAllProductsRandom() {
    var randomList = productRepository.findAll();
    Collections.shuffle(randomList);
    return randomList;
  }

  public List<Product> getAllProductsHasCategory(Long id)
    throws NotFoundException {
    return productRepository.
      searchAllByCategory(categoryService.getCategory(id));
  }

  public List<Product> getAllProductsHasCity(Long id)
    throws NotFoundException {
    return productRepository
      .searchAllByAddress_City(cityService.getCity(id));
  }

  public List<Product> getAllProductsHasBooking(
    String checkIn, String checkOut) {
    return productRepository.
      searchAllByDates(
        formatStringToLocalDate(checkIn),
        formatStringToLocalDate(checkOut));
  }

  public List<Product> getAllProductsHasCityAndBooking(
    String checkIn, String checkOut, Long idCity
  ) throws NotFoundException {
    return productRepository
      .searchAllByDatesAndCity(
        formatStringToLocalDate(checkIn),
        formatStringToLocalDate(checkOut),
        cityService.getCity(idCity));
  }

  public Product createProduct(ProductRequest productRequest)
    throws NotFoundException {
    var product = Product.builder()
      .id(null)
      .title(productRequest.getTitle())
      .description(productRequest.getDescription())
      .address(handlerAddress(productRequest))
      .category(categoryService
        .getCategory(productRequest.getCategory_id()))
      .features(featureService
        .getFeatures(productRequest.getFeatures_id()))
      .images(imageService
        .createImages(productRequest.getImages_url()))
      .availability(true)
      .build();
    return productRepository.save(product);
  }

  public Product updateProduct(
    Long id, ProductRequest productRequest
  ) throws NotFoundException {
    var product = getProduct(id);
    product.setTitle(productRequest.getTitle());
    product.setDescription(productRequest.getDescription());
    product.setAddress(handlerAddress(productRequest));
    product.setCategory(categoryService
      .getCategory(productRequest.getCategory_id()));
    product.setFeatures(featureService
      .getFeatures(productRequest.getFeatures_id()));
    product.setImages(imageService
      .createImages(productRequest.getImages_url()));
    return product;
  }

  public void deleteProduct(Long id)
    throws NotFoundException {
    var productDeleted = getProduct(id);
    productRepository.delete(productDeleted);
    //return productDeleted;
  }

  private Address handlerAddress(
    ProductRequest productRequest
  ) throws NotFoundException {
    return Address.builder()
      .id(null)
      .street(productRequest.getAddress_street())
      .number(productRequest.getAddress_number())
      .city(cityService.getCity(productRequest.getCity_id()))
      .build();
  }

  public LocalDate formatStringToLocalDate(String date){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    return LocalDate.parse(date,dtf);
  }

}