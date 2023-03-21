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

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(productService.getProduct(id));
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

  @GetMapping("/random")
  public ResponseEntity<List<Product>> getAllProductsRandom() {
    var products = productService.getAllProductsRandom();
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

  @GetMapping("/filter/category={id}")
  public ResponseEntity<List<Product>> getAllProductsHasCategory(
    @PathVariable Long id
  ) throws NotFoundException {
    var products = productService.getAllProductsHasCategory(id);
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

  @GetMapping("/filter/city={id}")
  public ResponseEntity<List<Product>> getAllProductsHasCity(
    @PathVariable Long id
  ) throws NotFoundException {
    var products = productService.getAllProductsHasCity(id);
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

  @GetMapping("/filter/checkIn={dateIn}/checkOut={dateOut}")
  public ResponseEntity<List<Product>> getAllProductsHasBooking(
    @PathVariable String dateIn,
    @PathVariable String dateOut) {
    var products = productService
      .getAllProductsHasBooking(dateIn, dateOut);
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

  @GetMapping("/filter/checkIn={dateIn}/checkOut={dateOut}/city={idCity}")
  public ResponseEntity<List<Product>> getAllProductsHasBooking(
    @PathVariable String dateIn,
    @PathVariable String dateOut,
    @PathVariable Long idCity) throws NotFoundException {
    var products = productService
      .getAllProductsHasCityAndBooking(dateIn, dateOut, idCity);
    if (products.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(products);
    return ResponseEntity.status(HttpStatus.OK)
      .body(products);
  }

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
  public ResponseEntity<String> deleteProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    productService.deleteProduct(id);
    return ResponseEntity.status(HttpStatus.OK)
      .body("Producto eliminado correctamente");
  }

}