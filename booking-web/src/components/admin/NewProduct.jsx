import React from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../utils/utils'
import { endpoint } from '../../utils/utils'

const categoriesData = fetchData(`${endpoint}/categories`)
const citiesData = fetchData(`${endpoint}/cities`)
const featuresData = fetchData(`${endpoint}/features`)

const NewProduct = () => {
  const navigate = useNavigate()

  const categories = categoriesData.read()
  const cities = citiesData.read()
  const features = featuresData.read()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('success', { state: { from: 'adminProduct' } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Información</h3>
      <div className="contLine">
        <div className="contInputs">
          <label htmlFor="title">Nombre de la propiedad</label>
          <input id="title" type="text" />
        </div>
        <div className="contInputs">
          <label htmlFor="category">Categoría</label>
          <select id="category">
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
          <input id="address_street" type="text" />
        </div>
        <div className="contInputs">
          <label htmlFor="address_number">Nro puerta</label>
          <input id="address_number" type="text" />
        </div>
        <div className="contInputs">
          <label htmlFor="city">Ciudad</label>
          <select id="city">
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
        <textarea id="description" rows={10} />
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
            />
            <label for={feature.id}>{feature.title}</label>
          </div>
        ))}
      </div>

      <hr />

      <h3>Imágenes</h3>

      <hr />

      <button>Crear producto</button>
    </form>
  )
}

export default NewProduct