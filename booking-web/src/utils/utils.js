export const endpoint = 'http://localhost:8080/api/v1.0'

export const getBookings = (array) => {
  if (array)
    return array.map(booking => {
      return {
        start: new Date(booking.dateCheckIn),
        end: new Date(booking.dateCheckOut)
      }
  })
}