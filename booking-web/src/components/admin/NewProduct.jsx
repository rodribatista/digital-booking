import React, { useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../utils/utils'
import { endpoint } from '../../utils/utils'
import axios from 'axios'

import warning from '../../assets/icons/warning.svg'

const categoriesData = fetchData(`${endpoint}/categories`)
const citiesData = fetchData(`${endpoint}/cities`)
const featuresData = fetchData(`${endpoint}/features`)

const NewProduct = () => {
  const navigate = useNavigate()

  const categories = categoriesData.read()
  const cities = citiesData.read()
  const features = featuresData.read()

  const [ product, setProduct ] = useState({
    title: '',
    description: '',
    address_street: '',
    address_number: '',
    city_id: 0,
    category_id: 0,
    features_id: [],
    images_url: []
  })

  const [ error, setError ] = useState('')

  const handleResponse = (response) => {
    if (response.status === 201) {
      navigate('success',
        { state: { from: 'adminProduct' } })
    } else {
      setError(response.data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const productValues = Object.values(product)
    if (productValues.every((value) => value)) {
      axios.post(`${endpoint}/products`, product,
      { headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
      .then((response) =>
        handleResponse(response))
      .catch(error =>
        handleResponse(error.response))
    } else {
      setError('Por favor, completa todos los campos')
    }
  }

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value.trim()
    })
  }

  const handleCheckbox = (e) => {
    const { id } = e.target
    if (e.target.checked) {
      product.features_id.push(id)
    } else {
      product.features_id.pop(id)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Información</h3>
      <div className="contLine">
        <div className="contInputs">
          <label htmlFor="title">Nombre de la propiedad</label>
          <input id="title" type="text" onChange={handleChange}/>
        </div>
        <div className="contInputs">
          <label htmlFor="category_id">Categoría</label>
          <select id="category_id" onChange={handleChange}>
            <option value={null} selected>
              Seleccionar una categoría
            </option>
            {categories.map((category) => (
              <option value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="contLine">
        <div className="contInputs">
          <label htmlFor="address_street">Dirección</label>
          <input id="address_street" type="text" onChange={handleChange}/>
        </div>
        <div className="contInputs">
          <label htmlFor="address_number">Nro puerta</label>
          <input id="address_number" type="text" onChange={handleChange}/>
        </div>
        <div className="contInputs">
          <label htmlFor="city_id">Ciudad</label>
          <select id="city_id" onChange={handleChange}>
            <option value={null} selected>
              Seleccionar una ciudad
            </option>
            {cities.map((city) => (
              <option value={city.id}>
                {city.name}, {city.country.code}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="contInputs">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" rows={10} onChange={handleChange}/>
      </div>

      <hr />

      <h3>Características</h3>
      <div id="contFeatures">
        {features.map((feature) => (
          <div>
            <input
              type="checkbox"
              id={feature.id}
              name={feature.title}
              value={feature.id}
              onChange={handleCheckbox}
            />
            <label for={feature.id}>{feature.title}</label>
          </div>
        ))}
      </div>

      <hr />

      <h3>Imágenes</h3>

      <hr />

      {error && 
        <div className='errors'>
          <img src={warning} alt="Icon error" />
          <error>{error}</error>
        </div>}
      <button>Crear producto</button>
    </form>
  )
}

export default NewProduct