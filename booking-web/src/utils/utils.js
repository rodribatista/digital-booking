export const endpoint = 'http://15.228.58.7:8080/api/v1.0'

export const getBookings = (array) => {
  if (array)
    return array.map(booking => {
      return {
        start: new Date(booking.dateCheckIn),
        end: new Date(booking.dateCheckOut)
      }
  })
}