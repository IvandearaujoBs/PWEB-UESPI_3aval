const API_BASE = 'https://restcountries.com/v3.1'

export const fetchAllCountries = async () => {
  try {
    // Use um endpoint alternativo que funciona
    const response = await fetch('https://restcountries.com/v3.1/region/europe')
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }
    
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erro ao buscar países:', error)
    throw new Error('Falha na conexão com a API. Usando dados de teste.')
  }
}

export const searchCountries = async (name) => {
  try {
    const response = await fetch(`${API_BASE}/name/${name}`)
    if (!response.ok) throw new Error('País não encontrado')
    return await response.json()
  } catch (error) {
    throw new Error('País não encontrado')
  }
}

export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`${API_BASE}/alpha/${code}`)
    if (!response.ok) throw new Error('País não encontrado')
    const data = await response.json()
    return data[0]
  } catch (error) {
    throw new Error('País não encontrado')
  }
}