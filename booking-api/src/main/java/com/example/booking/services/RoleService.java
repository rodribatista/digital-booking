package com.example.booking.services;

import com.example.booking.models.Role;
import com.example.booking.repositories.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RoleService {

  private RoleRepository roleRepository;

  public Role findByTitle(String name) {
    return roleRepository.findRoleByTitle(name);
  }

}