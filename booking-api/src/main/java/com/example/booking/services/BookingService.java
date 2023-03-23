package com.example.booking.services;

import com.example.booking.exceptions.BadRequestException;
import com.example.booking.exceptions.ConflictException;
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

  public List<Booking> getAllBookingsHasUser(String token)
    throws NotFoundException, BadRequestException {
    var user = userService.getUserFromToken(token);
    return bookingRepository.searchAllByUser(user);
  }

  public Booking createBooking(String token, BookingRequest bookingRequest)
    throws NotFoundException, ConflictException, BadRequestException {
    var product = productService.getProduct(bookingRequest.getProduct_id());
    var dateCheckIn = formatStringToLocalDate(bookingRequest.getDateCheckIn());
    var dateCheckOut = formatStringToLocalDate(bookingRequest.getDateCheckOut());
    var user = userService.getUserFromToken(token);
    if(existBookingByDate(bookingRequest.getProduct_id(), dateCheckIn, dateCheckOut))
      throw new ConflictException("Ya existen reservas para las fechas indicadas");
    var booking = Booking.builder()
      .id(null)
      .arrivedTime(
        formatStringToLocalTime(bookingRequest.getArrivedTime()))
      .dateCheckIn(dateCheckIn)
      .dateCheckOut(dateCheckOut)
      .product(product)
      .user(user)
      .build();
    return bookingRepository.save(booking);
  }

  public Booking deleteBooking(Long id)
    throws NotFoundException {
    var bookingDeleted = getBooking(id);
    bookingRepository.delete(bookingDeleted);
    return bookingDeleted;
  }

  private LocalTime formatStringToLocalTime(String time){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
    return LocalTime.parse(time,dtf);
  }

  private LocalDate formatStringToLocalDate(String date){
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    return LocalDate.parse(date,dtf);
  }

  private Boolean existBookingByDate(
    Long product_id, LocalDate checkIn, LocalDate checkOut)
    throws NotFoundException {
    var listBookings = getAllBookingsHasProduct(product_id);
    return listBookings.stream()
      .anyMatch(booking ->
        checkIn.isBefore(booking.getDateCheckOut())
          && checkOut.isAfter(booking.getDateCheckIn()));
  }

}