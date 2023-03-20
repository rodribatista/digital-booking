package com.example.booking.services;

import com.example.booking.exceptions.EmailAlreadyExistsException;
import com.example.booking.exceptions.NotFoundException;
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

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

  @Autowired
  private RoleService roleService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bcryptEncoder;

  public User searchUserById(Long id) throws NotFoundException {
    return userRepository.findById(id).orElseThrow(
      () -> new NotFoundException("No existe un usuario con id " + id));
  }

  public User searchUserByEmail(String email) throws NotFoundException {
    return userRepository.findByEmail(email).orElseThrow(
      () -> new NotFoundException("No existe usuario asociado a " + email));
  }

  public UserDetails loadUserByUsername(String email)
      throws UsernameNotFoundException {
    User user = null;
    try {
      user = searchUserByEmail(email);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
  }

  private Set<SimpleGrantedAuthority> getAuthority(User user) {
    Set<SimpleGrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getTitle()));
    return authorities;
  }

  public User registerNewUser(UserSignup userDto)
      throws EmailAlreadyExistsException, NotFoundException {
    if(userRepository.existsByEmail(userDto.getEmail()))
      throw new EmailAlreadyExistsException("Ya existe un usuario con este email");
    return userRepository.save(
      User.builder()
        .firstName(userDto.getFirstName())
        .lastName(userDto.getLastName())
        .email(userDto.getEmail())
        .password(bcryptEncoder.encode(userDto.getPassword()))
        .role(roleService.findByTitle("USER"))
        .build());
  }

}