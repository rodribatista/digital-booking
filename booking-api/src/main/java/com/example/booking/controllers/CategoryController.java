package com.example.booking.controllers;

import com.example.booking.models.Category;
import com.example.booking.services.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/v1/categories")
@Controller
public class CategoryController {

  private CategoryService categoryService;

  @PostMapping()
  public ResponseEntity<Category> createCategory(@RequestBody Category category) {
    return ResponseEntity.ok(categoryService.createCategory(category));
  }

  @GetMapping()
  public ResponseEntity<List<Category>> getAllCategories() {
    return ResponseEntity.ok(categoryService.getAllCategories());
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
    categoryService.updateCategory(id, category);
    return ResponseEntity.ok(categoryService.getCategoryById(id));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.ok("Categoría eliminada con éxito");
  }

}
