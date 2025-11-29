'use client'
import { useState, useEffect } from 'react'
import CountryCard from '@/components/CountryCard'
import CountryModal from '@/components/CountryModal'
import { getFavorites, removeFavorite } from '@/utils/storage'
import Footer from '@/components/Footer'
import Filter from '@/components/Filter'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState('') 

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = () => {
    const favs = getFavorites()
    setFavorites(favs)
  }

  const handleRemoveFavorite = (countryCode) => {
    removeFavorite(countryCode)
    loadFavorites() 
  }



  const filteredFavorites = selectedRegion
  ? favorites.filter(country =>
      country.region?.toLowerCase() === selectedRegion.toLowerCase()
    )
  : favorites


  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Meus Países Favoritos
        </h1>
        
        <div className="text-center mt-16">
          <div className="text-6xl mb-4">X</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Nenhum país favorito ainda
          </h2>
          <p className="text-gray-500">
            Adicione países aos favoritos clicando no botão "Favoritar" nos detalhes do país.
          </p>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Meus Países Favoritos ({favorites.length})
      </h1>

      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600">
          Países que você marcou como favoritos
        </p>

        {/* Filtro por continente */}
        <Filter onFilter={setSelectedRegion} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFavorites.map(country => (
          <div key={country.cca3} className="relative">
            <CountryCard 
              country={country}
              onClick={() => setSelectedCountry(country)}
            />
            <button
              onClick={() => handleRemoveFavorite(country.cca3)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              title="Remover dos favoritos"
            >
              ✕
            </button>
          </div>
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