package com.example.booking.services;

import com.example.booking.exceptions.BadRequestException;
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

  public Category createCategory(CategoryRequest categoryRequest)
    throws BadRequestException {
    if (categoryRequest.getTitle().isBlank() || categoryRequest.getImageUrl().isBlank())
      throw new BadRequestException("Hay campos obligatorios no completados");
    var category = new Category(
      null,
      categoryRequest.getTitle(),
      categoryRequest.getDescription(),
      categoryRequest.getImageUrl()
    );
    return categoryRepository.save(category);
  }

  public Category updateCategory(Long id, CategoryRequest categoryRequest)
    throws NotFoundException, BadRequestException {
    if (categoryRequest.getTitle().isBlank() || categoryRequest.getImageUrl().isBlank())
      throw new BadRequestException("Hay campos obligatorios no completados");
    if (!categoryRepository.existsById(id))
      throw new NotFoundException("No existe categoría con id " + id);
    categoryRepository.update(
      id,
      categoryRequest.getTitle(),
      categoryRequest.getDescription(),
      categoryRequest.getImageUrl()
    );
    return categoryRepository.findById(id).orElseThrow();
  }

  public Category deleteCategory(Long id)
    throws NotFoundException {
    if (!categoryRepository.existsById(id))
      throw new NotFoundException("No existe categoría con id " + id);
    var categoryDeleted = categoryRepository.findById(id).orElseThrow();
    categoryRepository.deleteById(id);
    return categoryDeleted;
  }

}
