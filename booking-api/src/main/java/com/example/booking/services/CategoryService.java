package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Category;
import com.example.booking.payload.requests.CategoryRequest;
import com.example.booking.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CategoryService {

  private CategoryRepository categoryRepository;

  public Category getCategory(Long id)
    throws NotFoundException {
    return categoryRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe categoría con id " + id));
  }

  public Category getCategoryByTitle(String title)
    throws NotFoundException {
    var category = categoryRepository.findByTitle(title);
    if (category == null) throw new NotFoundException("No existe categoría con título " + title);
    return category;
  }

  public Category createCategory(CategoryRequest categoryRequest) {
    var category = new Category(
      null,
      categoryRequest.getTitle(),
      categoryRequest.getDescription(),
      categoryRequest.getImageUrl()
    );
    return categoryRepository.save(category);
  }

  public Category updateCategory(Long id, CategoryRequest categoryRequest)
    throws NotFoundException {
    if (!categoryRepository.existsById(id))
      throw new NotFoundException("No existe categoría con id " + id);
    var category = getCategory(id);
    category.setTitle(categoryRequest.getTitle());
    category.setDescription(categoryRequest.getDescription());
    category.setImageUrl(categoryRequest.getImageUrl());
    return category;
  }

  public Category deleteCategory(Long id)
    throws NotFoundException {
    var categoryDeleted = getCategory(id);
    categoryRepository.deleteById(id);
    return categoryDeleted;
  }

}
