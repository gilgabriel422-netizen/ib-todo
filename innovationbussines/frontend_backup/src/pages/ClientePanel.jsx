import React from 'react'
import { FileText, Gift, HelpCircle, Menu, X, LogOut, BookOpen } from 'lucide-react'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { useAuth } from '../contexts/AuthContext'
import AyudaCliente from './AyudaCliente' // <-- Importa el componente de ayuda

const ClientePanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('contrato')
  const { logout } = useAuth()

  const sections = [
    { id: 'contrato', name: 'Contrato', icon: FileText },
    { id: 'beneficios', name: 'Beneficios', icon: Gift },
    { id: 'solicitar-reserva', name: 'Solicitar Reserva', icon: BookOpen },
    { id: 'ayuda', name: 'Ayuda', icon: HelpCircle }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'contrato':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Contrato</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                Aquí podrás ver el estado y detalle de tu contrato. Esta sección se puede conectar con el backend cuando esté listo.
              </p>
            </div>
          </div>
        )
      case 'beneficios':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Beneficios</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-4">
              <p className="text-sm text-gray-600">
                Consulta beneficios activos, promociones y descuentos exclusivos para clientes.
              </p>
            </div>
            {/* Sección de puntos/compensación */}
            <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Sistema de Puntos / Compensación</h3>
              <p className="text-sm text-yellow-900 mb-2">
                Por cada compra que realices, acumulas el <b>30%</b> del valor en puntos de compensación. ¡Canjéalos por descuentos o premios exclusivos!
              </p>
              <p className="text-sm text-yellow-900">
                <b>Tus puntos actuales:</b> <span id="puntos-cliente" className="font-bold">(próximamente)</span>
              </p>
            </div>
          </div>
        )
      case 'solicitar-reserva':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Solicitar Reserva</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-gray-600">
                Aquí podrás solicitar una nueva reserva. (Funcionalidad próximamente)
              </p>
            </div>
          </div>
        )
      case 'ayuda':
        return <AyudaCliente /> // <-- Aquí se muestra el formulario de ayuda
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen admin-theme bg-gradient-to-br from-gold-light via-gold to-gold-dark">
      {/* Sidebar desktop */}
      <aside className="w-64 bg-black text-white p-6 flex-shrink-0 hidden md:block">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-gold flex items-center justify-center">
            <span className="text-gold font-bold text-xl">IB</span>
          </div>
          <div className="text-2xl font-bold">Cliente Panel</div>
        </div>
        <nav>
          <ul>
            {sections.map((section) => (
              <li key={section.id} className="mb-4">
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
                    activeSection === section.id ? 'bg-gold text-black' : 'hover:bg-white/10'
                  }`}
                >
                  <section.icon size={20} className="mr-3" />
                  {section.name}
                </button>
              </li>
            ))}
            {/* Botón cerrar sesión */}
            <li className="mt-8">
              <button
                onClick={logout}
                className="flex items-center w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-white/10 text-red-400"
              >
                <LogOut size={20} className="mr-3" />
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden bg-black text-white p-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="w-9 h-9 rounded-full bg-white border-2 border-gold flex items-center justify-center">
            <span className="text-gold font-bold text-base">IB</span>
          </div>
          Cliente Panel
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 w-64 bg-black text-white p-6 z-50 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-lg">IB</span>
              </div>
              Cliente Panel
            </div>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul>
              {sections.map((section) => (
                <li key={section.id} className="mb-4">
                  <button
                    onClick={() => {
                      setActiveSection(section.id)
                      setIsSidebarOpen(false)
                    }}
                    className={`flex items-center w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 ${
                      activeSection === section.id ? 'bg-gold text-black' : 'hover:bg-white/10'
                    }`}
                  >
                    <section.icon size={20} className="mr-3" />
                    {section.name}
                  </button>
                </li>
              ))}
              {/* Botón cerrar sesión mobile */}
              <li className="mt-8">
                <button
                  onClick={() => {
                    logout()
                    setIsSidebarOpen(false)
                  }}
                  className="flex items-center w-full text-left py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-white/10 text-red-400"
                >
                  <LogOut size={20} className="mr-3" />
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </aside>
      )}

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  )
}

export default ClientePanel