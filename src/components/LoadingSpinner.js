export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <span className="ml-4 text-gray-600">Carregando...</span>
    </div>
  )
}
