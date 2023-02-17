package com.example.booking.services;

import com.example.booking.models.Category;
import com.example.booking.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoryService {

  private CategoryRepository categoryRepository;

  public Category createCategory(Category category) {
    return categoryRepository.save(category);
  }

  public Category getCategoryById(Long id) {
    return categoryRepository.findById(id).orElse(null);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public void updateCategory(Long id, Category category) {
    categoryRepository.update(id, category.getTitle(), category.getDescription(), category.getImageUrl());
  }

  public void deleteCategory(Long id) {
    categoryRepository.deleteById(id);
  }

}
