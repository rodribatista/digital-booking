package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Category;
import com.example.booking.payload.requests.CategoryRequest;
import com.example.booking.repositories.CategoryRepository;
import com.example.booking.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@RequestMapping("${endpoint}/categories")
@Controller
public class CategoryController {

  private CategoryRepository categoryRepository;
  private CategoryService categoryService;

  @PostMapping()
  public ResponseEntity<Category> createCategory(
    @RequestBody CategoryRequest categoryRequest
  ) throws BadRequestException {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(categoryService.createCategory(categoryRequest));
  }

  @GetMapping()
  public ResponseEntity<List<Category>> getAllCategories() {
    var categories = categoryRepository.findAll();
    if (categories.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(categories);
    return ResponseEntity.status(HttpStatus.OK)
      .body(categories);
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<Category> updateCategory(
    @PathVariable Long id,
    @RequestBody CategoryRequest categoryRequest
  ) throws NotFoundException, BadRequestException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(categoryService.updateCategory(id, categoryRequest));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<Category> deleteCategory(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(categoryService.deleteCategory(id));
  }

}
