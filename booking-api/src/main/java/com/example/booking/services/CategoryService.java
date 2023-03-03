package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Category;
import com.example.booking.payload.requests.CategoryRequest;
import com.example.booking.repositories.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@AllArgsConstructor
@Service
public class CategoryService {

  private CategoryRepository categoryRepository;

  public Category getCategory(Long id)
    throws NotFoundException {
    return categoryRepository.findById(id)
      .orElseThrow(() -> new NotFoundException("No existe categoría con id " + id));
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
    categoryRepository.update(
      id,
      categoryRequest.getTitle(),
      categoryRequest.getDescription(),
      categoryRequest.getImageUrl()
    );
    return getCategory(id);
  }

  public Category deleteCategory(Long id)
    throws NotFoundException {
    var categoryDeleted = getCategory(id);
    categoryRepository.deleteById(id);
    return categoryDeleted;
  }

}
