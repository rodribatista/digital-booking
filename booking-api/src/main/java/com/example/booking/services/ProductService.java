package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProductService {

  private ProductRepository productRepository;
  private CategoryService categoryService;

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
      categoryService.getCategory(productRequest.getCategory_id())
    );
    return productRepository.save(product);
  }

  public Product updateProduct(Long id, ProductRequest productRequest)
    throws NotFoundException {
    if (!productRepository.existsById(id))
      throw new NotFoundException("No existe producto con id " + id);
    productRepository.update(
      id,
      productRequest.getTitle(),
      productRequest.getDescription(),
      productRequest.getAddress()
    );
    return getProduct(id);
  }

  public Product deleteProduct(Long id)
    throws NotFoundException {
    var productDeleted = getProduct(id);
    productRepository.deleteById(id);
    return productDeleted;
  }

}
