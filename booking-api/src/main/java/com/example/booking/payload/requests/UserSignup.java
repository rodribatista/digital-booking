package com.example.booking.payload.requests;

import com.example.booking.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserSignup {

  private String firstName;
  private String lastName;
  private String email;
  private String password;

}