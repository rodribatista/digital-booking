package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Product;
import com.example.booking.payload.requests.ProductRequest;
import com.example.booking.repositories.ProductRepository;
import com.example.booking.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RequestMapping("${endpoint}/products")
@Controller
public class ProductController {

  private ProductRepository productRepository;
  private ProductService productService;

  @PostMapping()
  public ResponseEntity<Product> createProduct(
    @Valid @RequestBody ProductRequest productRequest,
    BindingResult bindingResult
  ) throws BadRequestException, NotFoundException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(productService.createProduct(productRequest));
  }

  @GetMapping()
  public ResponseEntity<List<Product>> getAllProducts() {
    var products = productRepository.findAll();
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(productService.getProduct(id));
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<Product> updateProduct(
    @PathVariable Long id,
    @Valid @RequestBody ProductRequest productRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(productService.updateProduct(id, productRequest));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<Product> deleteProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(productService.deleteProduct(id));
  }

}
