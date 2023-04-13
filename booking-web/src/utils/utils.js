export const endpoint = 'http://18.230.184.65:8080/api/v1.0'

export const getBookings = (array) => {
  if (array)
    return array.map(booking => {
      return {
        start: new Date(booking.dateCheckIn),
        end: new Date(booking.dateCheckOut)
      }
  })
}