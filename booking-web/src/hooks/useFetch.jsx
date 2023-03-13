import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (url) => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(url)
    .then (res => setResponse(res.data))
    .catch (err => setError(err))
    .finally (() => setLoading(false))
  }, [url])

  return { response, error, loading }
  
}

export default useFetch