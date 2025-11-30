'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import Filter from '@/components/Filter'
import CountryCard from '@/components/CountryCard'
import CountryModal from '@/components/CountryModal'
import LoadingSpinner from '@/components/LoadingSpinner'
import Footer from '@/components/Footer'
import { fetchAllCountries, searchCountries } from '@/utils/api'

export default function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('')

  useEffect(() => {
    loadCountries()
  }, [])

  const loadCountries = async () => {
    try {
      setLoading(true)
      const data = await fetchAllCountries()
      console.log('TOTAL DE PAÍSES:', data.length)   // debug
      setCountries(data)
      setFilteredCountries(data) // 🔴 NADA de filtrar só Europe aqui!
    } catch (error) {
      console.error('Erro ao carregar países:', error)
    } finally {
      setLoading(false)
    }
  }

  // função utilitária pra aplicar filtros em cima de uma lista
  const applyFilters = (base, term, region) => {
    let result = base

    if (region) {
      result = result.filter(c => c.region === region)
    }

    if (term && term.length >= 2) {
      const lower = term.toLowerCase()
      result = result.filter(c =>
        c.name?.common?.toLowerCase().includes(lower)
      )
    }

    return result
  }

  const handleSearch = async (term) => {
    setSearchTerm(term)

    // se o termo for curto, filtra só localmente
    if (term.length < 2) {
      const result = applyFilters(countries, '', selectedRegion)
      setFilteredCountries(result)
      return
    }

    try {
      setLoading(true)
      const results = await searchCountries(term)
      const result = applyFilters(results, term, selectedRegion)
      setFilteredCountries(result)
    } catch (error) {
      console.error('Erro na busca:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (region) => {
    setSelectedRegion(region)

    // aplica o filtro em cima da lista base (countries)
    const result = applyFilters(countries, searchTerm, region)
    setFilteredCountries(result)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Country Explorer
      </h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && filteredCountries.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          Nenhum país encontrado.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map(country => (
          <CountryCard 
            key={country.cca3}
            country={country}
            onClick={() => setSelectedCountry(country)}
          />
        ))}
      </div>

      {selectedCountry && (
        <CountryModal 
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}

      <Footer />
    </div>
  )
}
