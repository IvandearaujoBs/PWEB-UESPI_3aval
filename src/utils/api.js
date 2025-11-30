const API_BASE = 'https://restcountries.com/v3.1'

export async function fetchAllCountries() {
  const url = `${API_BASE}/all?fields=name,capital,flags,region,population,cca3`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Erro ao buscar países: ${res.status}`)
  }

  return await res.json()
}

export async function searchCountries(term) {
  const url = `${API_BASE}/name/${encodeURIComponent(term)}?fields=name,capital,flags,region,population,cca3`
  const res = await fetch(url)

  if (!res.ok) {
    if (res.status === 404) return []
    throw new Error(`Erro ao buscar países: ${res.status}`)
  }

  return await res.json()
}


export async function getCountryByCode(code) {
  const url = `${API_BASE}/alpha/${encodeURIComponent(
    code
  )}?fields=name,capital,flags,region,subregion,population,cca3,languages,currencies,area,timezones`

  const res = await fetch(`${API_BASE}/alpha/${encodeURIComponent(code)}`)

  if (!res.ok) {
    throw new Error(`Erro ao buscar país pelo código: ${res.status}`)
  }

  const data = await res.json()

  // /alpha/{code} em v3.1 costuma retornar um array com 1 país
  return Array.isArray(data) ? data[0] : data
}