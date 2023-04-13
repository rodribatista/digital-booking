import React, { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext }  from '../hooks/userContext'

import NewProduct from '../components/admin/NewProduct'

import goback from '../assets/icons/atomo_back.svg'

import '../styles/admin.css'

const Admin = () => {

  const { userInfo } = useUserContext()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    if (userInfo && userInfo.role.title !== 'ADMIN') {
      navigate('/')}
  }}, [])

  const [showNewProduct, setShowNewProduct] = useState(false)

  return (
    <>

      <div className='adminHeader'>
        <h1>Administración</h1>
        <img src={goback} alt="Flecha para volver atras"
          onClick={() => navigate(-1)}/>
      </div>

      <main className='adminPage'>

        <section>
          <div className='adminSection'>
            <h2>Crear propiedad</h2>
            <button alt="Boton mostrar formulario de nueva propiedad"
              onClick={() => setShowNewProduct(!showNewProduct)}>
                {showNewProduct ? 'Ocultar' : 'Mostrar'}
              </button>
          </div>
          {showNewProduct && <NewProduct/>}
        </section>

      </main>
      
    </>
  )
}

export default Admin