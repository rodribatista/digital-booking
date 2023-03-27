import axios from 'axios'

export const endpoint = 'http://localhost:8080/api/v1.0'

const getSuspender = (promise) => {

  let status = 'pending'
  let response = null

  const suspender = promise.then(
    (res) => {
      status = 'success'
      response = res
    },
    (err) => {
      status = 'error'
      response = err
    }
  )

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender
      case 'error':
        throw response
      default:
        return response
    }
  }

  return { read }

}

export const fetchData = (url) => {
  const promise = axios.get(url)
  .then (response => response.data)
  return getSuspender(promise)
}

export const getBookings = (array) => {
  if (array)
    return array.map(booking => {
      return {
        start: new Date(booking.dateCheckIn),
        end: new Date(booking.dateCheckOut)
      }
  })
}