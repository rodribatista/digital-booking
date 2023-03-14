package com.example.booking.payload.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserLogin {

    private String email;
    private String password;

}