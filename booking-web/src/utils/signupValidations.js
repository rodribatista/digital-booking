export const validateFirstAndLastName = name => {
  return name.length >= 3
}

export const validateEmail = email => {
  return RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email)
}

export const validatePassword = password => {
  return password.length >= 6
}

export const comparePasswords = (password, confirmPassword) => {
  return password === confirmPassword
}