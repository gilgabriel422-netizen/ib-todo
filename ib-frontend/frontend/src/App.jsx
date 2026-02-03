import React, { lazy, Suspense } from 'react'
const DashboardCobranzas = lazy(() => import('./pages/DashboardCobranzas.jsx'));
const CobranzasPanelModified = lazy(() => import('./pages/CobranzasPanel_modified.jsx'));
const DashboardContratos = lazy(() => import('./pages/DashboardContratos.jsx'));
const DashboardAtencionCliente = lazy(() => import('./pages/DashboardAtencionCliente.jsx'));
const DashboardPostventa = lazy(() => import('./pages/DashboardPostventa.jsx'));
const PaquetesAdmin = lazy(() => import('./pages/PaquetesAdmin.jsx'));
const SoportePanel = lazy(() => import('./pages/SoportePanel.jsx'));
const ContratosFisicosPanel = lazy(() => import('./pages/ContratosFisicosPanel.jsx'));
const AyudaCliente = lazy(() => import('./pages/AyudaCliente.jsx'));
const SoportePage = lazy(() => import('./pages/SoportePAge.jsx'));
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedPackages from './components/FeaturedPackages'
import StatsSection from './components/StatsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import NosotrosPage from './pages/NosotrosPage'
import PaquetesPage from './pages/PaquetesPage'
import ExperienciasPage from './pages/ExperienciasPage'
import ContactanosPage from './pages/ContactanosPage'
import LoginPage from './pages/LoginPage'
import HomePageDorada from './pages/HomePageDorada'
import Reviews from './pages/Reviews'
import AdminPanel from './pages/AdminPanel'
import ClientePanel from './pages/ClientePanel'
import ClienteIB1Panel from './pages/ClienteIB1Panel'
import ClienteIB2Panel from './pages/ClienteIB2Panel'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <HomePageDorada />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/resenias" element={
              <>
                <Navbar />
                <Reviews />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/nosotros" element={
              <>
                <Navbar />
                <NosotrosPage />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/paquetes" element={
              <>
                <Navbar />
                <PaquetesPage />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/experiencias" element={
              <>
                <Navbar />
                <ExperienciasPage />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/contactanos" element={
              <>
                <Navbar />
                <ContactanosPage />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            {/* Rutas de innovation */}
            <Route path="/paquetes-admin" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><PaquetesAdmin /></div><Footer /></Suspense>} />
            <Route path="/soporte-panel" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><SoportePanel /></div><Footer /></Suspense>} />
            <Route path="/soporte" element={
              <>
                <Navbar />
                <SoportePage />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/contratos-fisicos" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><ContratosFisicosPanel /></div><Footer /></Suspense>} />
            <Route path="/ayuda" element={
              <>
                <Navbar />
                <AyudaCliente />
                <Footer />
                <WhatsAppFloat />
              </>
            } />
            <Route path="/admin-login" element={<LoginPage />} />
            <Route path="/admin" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><AdminPanel /></div><Footer /></Suspense>} />
            <Route path="/cliente" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><ClientePanel /></div><Footer /></Suspense>} />
            <Route path="/cliente-ib1" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><ClienteIB1Panel /></div><Footer /></Suspense>} />
            <Route path="/cliente-black" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><ClienteIB2Panel /></div><Footer /></Suspense>} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            {/* Removed /admin intermediate redirect route - dashboards accessed directly after login */}
            {/* /dashboard-cobranzas removed; cobranzas users are redirected to /admin */}
            <Route path="/dashboard-contratos" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardContratos /></div><Footer /></Suspense>} />
            <Route path="/dashboard-cobranzas" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><CobranzasPanelModified /></div><Footer /></Suspense>} />
            <Route path="/dashboard-atencion" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardAtencionCliente /></div><Footer /></Suspense>} />
            <Route path="/dashboard-postventa" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardPostventa /></div><Footer /></Suspense>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
