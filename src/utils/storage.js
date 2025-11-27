export const getFavorites = () => {
  if (typeof window === 'undefined') return []
  const favorites = localStorage.getItem('countryFavorites')
  return favorites ? JSON.parse(favorites) : []
}

export const addFavorite = (country) => {
  const favorites = getFavorites()
  const exists = favorites.find(fav => fav.cca3 === country.cca3)
  if (!exists) {
    const updated = [...favorites, country]
    localStorage.setItem('countryFavorites', JSON.stringify(updated))
  }
}

export const removeFavorite = (countryCode) => {
  const favorites = getFavorites()
  const updated = favorites.filter(fav => fav.cca3 !== countryCode)
  localStorage.setItem('countryFavorites', JSON.stringify(updated))
}

export const isFavorite = (countryCode) => {
  const favorites = getFavorites()
  return favorites.some(fav => fav.cca3 === countryCode)
}