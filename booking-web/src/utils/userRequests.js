import axios from 'axios'

/* 
export const loginCredentials = (email, password) => {
  const endpoint = 'url'
  const data = {
    email,
    password
  }
  axios.post(endpoint, data, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    let errorsArray = []
    if (data.status === 200) {
      window.location.href = '/home'
    } else if (data.status === 400) {
      errorsArray.push('Por favor vuelva a intentarlo, sus credenciales son inválidas')
    } else if (data.status === 404) {
      errorsArray.push('No existe una cuenta asociada al correo indicado')
    } else {
      errorsArray.push('Por favor vuelva a intentarlo, ha habido un error')
    }
    return errorsArray
  })
} */

const user_db = {
  email: 'john@mail.com',
  password: 'password'
}

export const loginCredentials = (email, password) => {
  let error = ''
  if (email !== user_db.email) {
    error = 'No existe una cuenta asociada al correo indicado'
  } else if (email === user_db.email && password !== user_db.password) {
    error = 'Por favor vuelva a intentarlo, sus credenciales son inválidas'
  } else if (email === user_db.email && password === user_db.password) {
    error = 200
  } else {
    error = 'Por favor vuelva a intentarlo, ha habido un error'
  }
  return error
}