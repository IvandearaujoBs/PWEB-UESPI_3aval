export default function Filter({ onFilter }) {
  const handleChange = (e) => {
    onFilter(e.target.value)
  }

  return (
    <select
      className="border rounded px-4 py-2"
      onChange={handleChange}
      defaultValue=""
    >
      <option value="">Todos os continentes</option>
      <option value="Africa">África</option>
      <option value="Americas">Américas</option>
      <option value="Asia">Ásia</option>
      <option value="Europe">Europa</option>
      <option value="Oceania">Oceania</option>
    </select>
  )
}
