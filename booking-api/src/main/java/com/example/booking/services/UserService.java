package com.example.booking.services;

import com.example.booking.config.TokenProvider;
import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.EmailAlreadyExistsException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.User;
import com.example.booking.payload.requests.UserEmail;
import com.example.booking.payload.requests.UserInfo;
import com.example.booking.payload.requests.UserPass;
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

  @Autowired
  private TokenProvider jwtTokenUtil;

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

  public User getUserFromToken(String token
  ) throws BadRequestException, NotFoundException {
    var authorization = token.replace("Bearer ", "");
    var userEmail = jwtTokenUtil.getUsernameFromToken(authorization);
    var userDetail = loadUserByUsername(userEmail);
    if (!jwtTokenUtil.validateToken(authorization, userDetail))
      throw new BadRequestException("Token invalido");
    return searchUserByEmail(userEmail);
  }

  public User createUser(UserSignup userDto)
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

  public User updateUser(
    String token, UserInfo userInfo
  ) throws NotFoundException, BadRequestException {
    var user = getUserFromToken(token);
    user.setFirstName(userInfo.getFirstName());
    user.setLastName(userInfo.getLastName());
    return user;
  }

  public User updateUserEmail(
    String token, UserEmail userEmail
  ) throws NotFoundException, BadRequestException {
    var user = getUserFromToken(token);
    user.setEmail(userEmail.getEmail());
    return user;
  }

  public void updateUserPassword(
    String token, UserPass userPass
  ) throws NotFoundException, BadRequestException {
    var user = getUserFromToken(token);
    user.setPassword(
      bcryptEncoder.encode(userPass.getPassword()));
  }

  public User deleteUser(String token)
    throws NotFoundException, BadRequestException {
    var userDeleted = getUserFromToken(token);
    userRepository.delete(userDeleted);
    return userDeleted;
  }

}