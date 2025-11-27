'use client'
import { useState, useEffect } from 'react'
import { getCountryByCode } from '@/utils/api'
import { addFavorite, removeFavorite, isFavorite } from '@/utils/storage'
import LoadingSpinner from './LoadingSpinner'

export default function CountryModal({ country, onClose }) {
  const [detailedCountry, setDetailedCountry] = useState(country)
  const [borderCountries, setBorderCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorite, setFavorite] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite(country.cca3))
    loadBorderCountries()
  }, [country])

  const loadBorderCountries = async () => {
    if (!country.borders || country.borders.length === 0) return
    
    setLoading(true)
    try {
      const borderPromises = country.borders.map(border => getCountryByCode(border))
      const borders = await Promise.all(borderPromises)
      setBorderCountries(borders)
    } catch (error) {
      console.error('Erro ao carregar países fronteiriços:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(country.cca3)
    } else {
      addFavorite(country)
    }
    setFavorite(!favorite)
  }

  const formatCurrency = (currencies) => {
    if (!currencies) return 'N/A'
    return Object.values(currencies).map(currency => 
      `${currency.name} (${currency.symbol || 'N/A'})`
    ).join(', ')
  }

  const formatLanguages = (languages) => {
    if (!languages) return 'N/A'
    return Object.values(languages).join(', ')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {loading && <LoadingSpinner />}
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{detailedCountry.name?.official}</h2>
            <div className="flex gap-2">
              <button
                onClick={handleFavoriteToggle}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  favorite 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {favorite ? '★ Favorito' : '☆ Favoritar'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                ✕ Fechar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda - Informações Básicas */}
            <div>
              <img
                src={detailedCountry.flags?.png}
                alt={`Bandeira de ${detailedCountry.name?.common}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <InfoItem label="Nome Comum" value={detailedCountry.name?.common} />
                  <InfoItem label="Capital" value={detailedCountry.capital?.[0] || 'N/A'} />
                  <InfoItem label="Região" value={detailedCountry.region} />
                  <InfoItem label="Sub-região" value={detailedCountry.subregion || 'N/A'} />
                </div>
                <div className="space-y-3">
                  <InfoItem 
                    label="População" 
                    value={detailedCountry.population?.toLocaleString()} 
                  />
                  <InfoItem 
                    label="Área" 
                    value={detailedCountry.area ? `${detailedCountry.area.toLocaleString()} km²` : 'N/A'} 
                  />
                  <InfoItem label="Fuso Horário" value={detailedCountry.timezones?.[0] || 'N/A'} />
                  <InfoItem label="Status" value={detailedCountry.status || 'N/A'} />
                </div>
              </div>
            </div>

            {/* Coluna Direita - Informações Detalhadas */}
            <div className="space-y-6">
              <InfoSection 
                title="Línguas" 
                value={formatLanguages(detailedCountry.languages)} 
              />
              
              <InfoSection 
                title="Moedas" 
                value={formatCurrency(detailedCountry.currencies)} 
              />
              
              <InfoSection 
                title="Domínios de Internet" 
                value={detailedCountry.tld?.join(', ') || 'N/A'} 
              />
              
              <InfoSection 
                title="Códigos" 
                value={`CCA3: ${detailedCountry.cca3}, CCN3: ${detailedCountry.ccn3}`} 
              />

              {/* Países Fronteiriços */}
              <div>
                <h4 className="font-semibold mb-2">Países Fronteiriços:</h4>
                {borderCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map(border => (
                      <span
                        key={border.cca3}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {border.name?.common}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Nenhum país fronteiriço</p>
                )}
              </div>

              {/* Mapa */}
              {detailedCountry.latlng && (
                <div>
                  <h4 className="font-semibold mb-2">Localização:</h4>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <iframe
                      width="100%"
                      height="200"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                        detailedCountry.latlng[1] - 5
                      },${detailedCountry.latlng[0] - 5},${
                        detailedCountry.latlng[1] + 5
                      },${detailedCountry.latlng[0] + 5}&layer=mapnik&marker=${
                        detailedCountry.latlng[0]
                      },${detailedCountry.latlng[1]}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente auxiliar para informações
const InfoItem = ({ label, value }) => (
  <div>
    <strong className="text-gray-700">{label}:</strong>
    <p className="text-gray-900">{value}</p>
  </div>
)

// Componente auxiliar para seções
const InfoSection = ({ title, value }) => (
  <div>
    <h4 className="font-semibold mb-1">{title}:</h4>
    <p className="text-gray-700">{value}</p>
  </div>
)
