package com.example.booking.controllers;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Booking;
import com.example.booking.payload.requests.BookingRequest;
import com.example.booking.services.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

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

  @GetMapping("/filter/user={id}")
  public ResponseEntity<List<Booking>> getAllBookingsHasUser(
    @PathVariable Long id
  ) throws NotFoundException {
    var bookings = bookingService
      .getAllBookingsHasUser(id);
    if (bookings.isEmpty())
      return ResponseEntity.status(HttpStatus.NO_CONTENT)
        .body(bookings);
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookings);
  }

  @PostMapping()
  public ResponseEntity<Booking> createBooking(
    @Valid @RequestBody BookingRequest bookingRequest,
    BindingResult bindingResult
  ) throws BadRequestException, NotFoundException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(bookingService.createBooking(bookingRequest));
  }

  @Transactional
  @PutMapping("/{id}")
  public ResponseEntity<Booking> updateBooking(
    @PathVariable Long id,
    @Valid @RequestBody BookingRequest bookingRequest,
    BindingResult bindingResult
  ) throws NotFoundException, BadRequestException {
    if (bindingResult.hasErrors())
      throw new BadRequestException(bindingResult.getFieldError().getDefaultMessage());
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookingService.updateBooking(id, bookingRequest));
  }

  @DeleteMapping ("/{id}")
  public ResponseEntity<Booking> deleteProduct(
    @PathVariable Long id
  ) throws NotFoundException {
    return ResponseEntity.status(HttpStatus.OK)
      .body(bookingService.deleteBooking(id));
  }

}