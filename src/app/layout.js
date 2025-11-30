import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Explorador de Países',
  description: 'Explore informações sobre países ao redor do mundo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {/* Header de Navegação */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-blue-800">
                 Country Explorer
              </Link>
              
              <div className="flex gap-6">
                <Link 
                  href="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Início
                </Link>
                <Link 
                  href="/favorites" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Favoritos
                </Link>
                <Link 
                  href="/about" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sobre
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  )
}