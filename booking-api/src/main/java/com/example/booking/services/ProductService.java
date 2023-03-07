package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Address;
import com.example.booking.models.Feature;
import com.example.booking.models.Image;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.AddressRequest;
import com.example.booking.payload.requests.ImageRequest;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductService {

  private ProductRepository productRepository;
  private CategoryService categoryService;
  private FeatureService featureService;
  private AddressService addressService;
  private ImageService imageService;
  private CityService cityService;

  public Product getProduct(Long id)
    throws NotFoundException {
    return productRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe producto con id " + id));
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
    var product = new Product(
      null,
      productRequest.getTitle(),
      productRequest.getDescription(),
      addressService.createAddress(
        newAddressRequest(productRequest)),
      categoryService.getCategory(productRequest.getCategory_id()),
      handlerFeatures(productRequest.getFeatures_id()),
      handlerImages(productRequest.getImages_url()),
      true
    );
    return productRepository.save(product);
  }

  public Product updateProduct(Long id, ProductRequest productRequest)
    throws NotFoundException {
    if (!productRepository.existsById(id))
      throw new NotFoundException("No existe producto con id " + id);
    var product = getProduct(id);
    product.setTitle(productRequest.getTitle());
    product.setDescription(productRequest.getDescription());
    product.setAddress(
      addressService.updateAddress(id, newAddressRequest(productRequest)));
    product.setCategory(categoryService.getCategory(productRequest.getCategory_id()));
    product.setFeatures(handlerFeatures(productRequest.getFeatures_id()));
    return product;
  }

  public Product deleteProduct(Long id)
    throws NotFoundException {
    var productDeleted = getProduct(id);
    productRepository.deleteById(id);
    return productDeleted;
  }

  public Set<Feature> handlerFeatures(List<Long> featuresList) {
    return featuresList.stream()
      .map(feature_id -> {
        try {
          return featureService.getFeature(feature_id);
        } catch (NotFoundException e) {
          throw new RuntimeException(e);
        }
      }).collect(Collectors.toSet());
  }

  public AddressRequest newAddressRequest(ProductRequest productRequest) {
    return new AddressRequest(
      productRequest.getAddress_street(),
      productRequest.getAddress_number(),
      productRequest.getCity_id()
    );
  }

  private Set<Image> handlerImages(List<String> urlList) {
    return urlList.stream()
      .map(url ->
        imageService.createImage(new ImageRequest(url))
      ).collect(Collectors.toSet());
  }

}
