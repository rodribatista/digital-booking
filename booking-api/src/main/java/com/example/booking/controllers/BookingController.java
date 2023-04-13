package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.ConflictException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Booking;
import com.example.booking.payload.requests.BookingRequest;
import com.example.booking.services.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@AllArgsConstructor
@RequestMapping("${endpoint}/bookings")
@Controller
public class BookingController {

  private BookingService bookingService;

  @GetMapping("/{id}")
  public ResponseEntity<Booking> getBooking(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookingService.getBooking(id));
  }

  @GetMapping("/filter/product={id}")
  public ResponseEntity<List<Booking>> getAllBookingsHasProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    var bookings = bookingService
      .getAllBookingsHasProduct(id);
    if (bookings.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(bookings);
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookings);
  }

  @GetMapping("/filter/users")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<List<Booking>> getAllBookingsHasUser(
    @RequestHeader String Authorization
  ) throws NotFoundException, BadRequestException {
    var bookings = bookingService
      .getAllBookingsHasUser(Authorization);
    if (bookings.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(bookings);
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookings);
  }

  @PostMapping()
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Booking> createBooking(
    @RequestHeader String Authorization,
    @Valid @RequestBody BookingRequest bookingRequest,
    BindingResult bindingResult
  ) throws BadRequestException, NotFoundException, ConflictException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(bookingService.createBooking(Authorization, bookingRequest));
  }

  @DeleteMapping ("/{id}")
  @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
  public ResponseEntity<Booking> deleteBooking(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookingService.deleteBooking(id));
  }

}