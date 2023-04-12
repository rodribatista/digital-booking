import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url) => {

  const [response, setResponse] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(url)
    .then (res => {
      setError(null)
      setResponse(res.data)})
    .catch (err => {
      setResponse(null)
      setError(err)})
    .finally (() =>
      setLoading(false))
  }, [url])

  return { response, error, loading }
  
}

export default useFetch