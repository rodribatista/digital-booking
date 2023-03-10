const user_db = {
  name: 'John Doe',
  email: 'john@mail.com',
  password: 'password'
}

export const loginCredentials = (email, password) => {
  if (email !== user_db.email) {
    return {
      status: 404,
      message: 'No existe una cuenta asociada al correo indicado'
    }
  } else if (email === user_db.email && password !== user_db.password) {
    return {
      status: 401,
      message: 'Por favor vuelva a intentarlo, sus credenciales son inválidas'
    }
  } else if (email === user_db.email && password === user_db.password) {
    return {
      status: 200,
      name: user_db.name,
    }
  } else {
    return {
      status: 500,
      message: 'Por favor vuelva a intentarlo, ha habido un error'
    }
  }
}