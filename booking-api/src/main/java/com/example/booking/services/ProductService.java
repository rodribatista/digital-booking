package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Feature;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProductService {

  private ProductRepository productRepository;
  private CategoryService categoryService;
  private FeatureService featureService;

  public Product getProduct(Long id)
    throws NotFoundException {
    return productRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe producto con id " + id));
  }

  public Product createProduct(ProductRequest productRequest)
    throws NotFoundException {
    var product = new Product(
      null,
      productRequest.getTitle(),
      productRequest.getDescription(),
      productRequest.getAddress(),
      true,
      categoryService.getCategory(productRequest.getCategory_id()),
      getFeatures(productRequest.getFeatures_id())
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
    product.setAddress(productRequest.getAddress());
    product.setCategory(categoryService.getCategory(productRequest.getCategory_id()));
    product.setFeatures(getFeatures(productRequest.getFeatures_id()));
    return product;
  }

  public Product deleteProduct(Long id)
    throws NotFoundException {
    var productDeleted = getProduct(id);
    productRepository.deleteById(id);
    return productDeleted;
  }

  public Set<Feature> getFeatures(List<Long> featuresList) {
    return featuresList.stream()
      .map(feature_id -> {
        try {
          return featureService.getFeature(feature_id);
        } catch (NotFoundException e) {
          throw new RuntimeException(e);
        }
      }).collect(Collectors.toSet());
  }

}
