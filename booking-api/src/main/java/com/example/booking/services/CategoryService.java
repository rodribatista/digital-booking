package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.exceptions.SQLIntegrityException;
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
    return categoryRepository.findByTitle(title).orElseThrow(
        () -> new NotFoundException("No existe categoría con título " + title));
  }

  public Category createCategory(CategoryRequest categoryRequest) throws SQLIntegrityException {
    var category = Category.builder()
      .id(null)
      .title(categoryRequest.getTitle())
      .description(categoryRequest.getDescription())
      .imageUrl(categoryRequest.getImageUrl())
      .build();
    try { return categoryRepository.save(category); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
  }

  public Category updateCategory(Long id, CategoryRequest categoryRequest)
    throws NotFoundException, SQLIntegrityException {
    var category = getCategory(id);
    try {
      category.setTitle(categoryRequest.getTitle());
      category.setDescription(categoryRequest.getDescription());
      category.setImageUrl(categoryRequest.getImageUrl()); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return category;
  }

  public Category deleteCategory(Long id)
    throws NotFoundException, SQLIntegrityException {
    var categoryDeleted = getCategory(id);
    try { categoryRepository.delete(categoryDeleted); }
    catch (Exception e) {
      throw new SQLIntegrityException(
        "SQLIntegrityException has accured - " +  e.getCause().getCause().getMessage()); }
    return categoryDeleted;
  }

}