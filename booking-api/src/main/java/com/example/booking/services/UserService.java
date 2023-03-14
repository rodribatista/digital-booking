package com.example.booking.services;

import com.example.booking.exceptions.EmailAlreadyExistsException;
import com.example.booking.models.User;
import com.example.booking.payload.requests.UserSignup;
import com.example.booking.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bcryptEncoder;

  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email).orElseThrow(
      () -> new UsernameNotFoundException("Invalid username or password."));
    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
  }

  private Set<SimpleGrantedAuthority> getAuthority(User user) {
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getTitle()));
    return authorities;
  }

  public User registerNewUser(UserSignup userDto) throws EmailAlreadyExistsException {
    if(userRepository.existsByEmail(userDto.getEmail()))
      throw new EmailAlreadyExistsException("Ya existe un usuario con este email");
    return userRepository.save(newUserFromDTO(userDto));
  }

  private User newUserFromDTO(UserSignup userDto) {
    User user = new User();
    user.setFirstName(userDto.getFirstName());
    user.setLastName(userDto.getLastName());
    user.setEmail(userDto.getEmail());
    user.setPassword(bcryptEncoder.encode(userDto.getPassword()));
    user.setRole(roleService.findByTitle("USER"));
    return user;
  }

}