package com.example.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class BookingApplication {

  public static void main(String[] args) {
    SpringApplication.run(BookingApplication.class, args);
  }

}
