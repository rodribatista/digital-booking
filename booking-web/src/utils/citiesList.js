const normalizeText = text => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export const filterCities = (text, list) => {
  const reg = new RegExp(`${normalizeText(text)}`)
  return list.filter(city => {
      return reg.test(normalizeText(city.name))
  })
}