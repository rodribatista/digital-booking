package com.example.booking.services;

import com.example.booking.exceptions.NotFoundException;
import com.example.booking.models.Booking;
import com.example.booking.payload.requests.BookingRequest;
import com.example.booking.repositories.BookingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@AllArgsConstructor
@Service
public class BookingService {

  private BookingRepository bookingRepository;
  private ProductService productService;
  private UserService userService;


  public Booking getBooking(Long id) throws NotFoundException {
    return bookingRepository.findById(id).orElseThrow(
      () -> new NotFoundException("No existe reserva con id " + id));
  }

  public List<Booking> getAllBookingsHasProduct(Long id)
    throws NotFoundException {
    return bookingRepository.
      searchAllByProduct(productService.getProduct(id));
  }

  public List<Booking> getAllBookingsHasUser(Long id)
    throws NotFoundException {
    return bookingRepository.
      searchAllByUser(userService.searchUserById(id));
  }

  public Booking createBooking(BookingRequest bookingRequest)
    throws NotFoundException {
    var booking = Booking.builder()
      .id(null)
      .arrivedTime(
        formatStringToLocalTime(bookingRequest.getArrivedTime()))
      .dateCheckIn(
        formatStringToLocalDate(bookingRequest.getDateCheckIn()))
      .dateCheckOut(
        formatStringToLocalDate(bookingRequest.getDateCheckOut()))
      .product(productService
        .getProduct(bookingRequest.getProduct_id()))
      .user(userService
        .searchUserById(bookingRequest.getUser_id()))
      .build();
    return bookingRepository.save(booking);
  }

  public Booking updateBooking(
    Long id, BookingRequest bookingRequest
  ) throws NotFoundException {
    var booking = getBooking(id);
    booking.setArrivedTime(
      formatStringToLocalTime(bookingRequest.getArrivedTime()));
    booking.setDateCheckIn(
      formatStringToLocalDate(bookingRequest.getDateCheckIn()));
    booking.setDateCheckOut(
      formatStringToLocalDate(bookingRequest.getDateCheckOut()));
    return booking;
  }

  public Booking deleteBooking(Long id)
    throws NotFoundException {
    var bookingDeleted = getBooking(id);
    bookingRepository.delete(bookingDeleted);
    return bookingDeleted;
  }

  public LocalTime formatStringToLocalTime(String time){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
    return LocalTime.parse(time,dtf);
  }

  public LocalDate formatStringToLocalDate(String date){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    return LocalDate.parse(date,dtf);
  }

}