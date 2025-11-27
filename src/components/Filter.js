export default function Filter({ onFilter }) {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  return (
    <select 
      onChange={(e) => onFilter(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Todos os continentes</option>
      {regions.map(region => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  )
}
