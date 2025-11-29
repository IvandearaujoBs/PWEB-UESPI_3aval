import Footer from '@/components/Footer'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ivanildo dos Santos Araujo e Jefferson Ricardo do Amaral Melo",
      role: "Desenvolvedores Full Stack",
      description: "Responsável pela integração com API e funcionalidades principais"
    },
  ]

  const technologies = [
    "Next.js 14",
    "React",
    "Tailwind CSS",
    "REST Countries API",
    "LocalStorage API"
  ]

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        Sobre o Explorador de Países
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Descrição do Projeto */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Sobre o Projeto</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">
              O <strong>Explorador de Países</strong> é uma aplicação web interativa 
              desenvolvida para a disciplina de Programação Web da Universidade Estadual do Piauí - UESPI.
            </p>
            <p className="text-gray-700">
              Esta aplicação permite explorar informações detalhadas sobre países ao redor do mundo, 
              incluindo dados geográficos, culturais, políticos e econômicos, tudo obtido através da 
              REST Countries API.
            </p>
          </div>
        </section>

        {/* Funcionalidades */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Busca por nome do país",
              "Filtro por continente",
              "Visualização detalhada de informações",
              "Sistema de favoritos com armazenamento local",
              "Design responsivo (mobile-first)",
              "Interface moderna e intuitiva"
            ].map((feature, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tecnologias Utilizadas */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Tecnologias</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Equipe */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> Nossa Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API Utilizada */}
        <section>
          <h2 className="text-2xl font-semibold mb-4"> API Utilizada</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">REST Countries API</h3>
            <p className="text-gray-700 mb-3">
              Fornece dados atualizados sobre países do mundo todo, incluindo informações 
              sobre bandeiras, capitais, populações, línguas, moedas e muito mais.
            </p>
            <a 
              href="https://restcountries.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
               Acessar REST Countries API
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}