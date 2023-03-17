package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Role;
import com.example.booking.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RoleService {

  private RoleRepository roleRepository;

  public Role findByTitle(String name) throws NotFoundException {
    return roleRepository.findRoleByTitle(name).orElseThrow(
      () -> new NotFoundException("No existe rol con nombre " + name));
  }

}