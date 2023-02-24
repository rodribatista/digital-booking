
const validateFirstNameAndLastName = name => {
  return name.length >= 2
}

const validateEmail = email => {
  return RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)
}

const validatePassword = password => {
  return password.length >= 6
}

const comparePasswords = (password1, password2) => {
  return password1 === password2
}

export const showSignupErrors = (firstName, lastName, email, password1, password2) => {
  let errorsArray = []
  if (!validateFirstNameAndLastName(firstName) || !validateFirstNameAndLastName(lastName))
    errorsArray.push('Debes ingresar un nombre y apellido válidos')
  if (!validateEmail(email))
    errorsArray.push('Debes ingresar un email válido')
  if (!validatePassword(password1))
    errorsArray.push('La contraseña debe tener al menos 6 caracteres')
  if (!comparePasswords(password1, password2))
    errorsArray.push('Ambas contraseñas deben ser iguales')
  return errorsArray
}