package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Address;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    List<Address> addressesList = productRepository
      .searchAllAddressByCity(cityService.getCity(id));
    return addressesList.stream().map(
      address -> productRepository.searchByAddress(address))
      .collect(Collectors.toList());
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
    if (!productRepository.existsById(id))
      throw new NotFoundException("No existe producto con id " + id);
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

}