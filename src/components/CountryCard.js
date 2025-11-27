export default function CountryCard({ country, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={country.flags?.png} 
        alt={`Bandeira de ${country.name?.common}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{country.name?.common}</h3>
        <p className="text-gray-600">
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p className="text-gray-600">
          <strong>População:</strong> {country.population?.toLocaleString()}
        </p>
        <p className="text-gray-600">
          <strong>Região:</strong> {country.region}
        </p>
      </div>
    </div>
  )
}
