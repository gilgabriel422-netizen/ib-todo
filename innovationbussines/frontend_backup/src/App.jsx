import React, { lazy, Suspense } from 'react'
const DashboardCobranzas = lazy(() => import('./pages/DashboardCobranzas.jsx'));
const DashboardContratos = lazy(() => import('./pages/DashboardContratos.jsx'));
const DashboardAtencionCliente = lazy(() => import('./pages/DashboardAtencionCliente.jsx'));
const DashboardPostventa = lazy(() => import('./pages/DashboardPostventa.jsx'));
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedPackages from './components/FeaturedPackages'
import StatsSection from './components/StatsSection'
import TestimonialsSection from './components/TestimonialsSection'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Chatbot from './components/Chatbot'
import NosotrosPage from './pages/NosotrosPage'
import PaquetesPage from './pages/PaquetesPage'
import ExperienciasPage from './pages/ExperienciasPage'
import ContactanosPage from './pages/ContactanosPage'
import LoginPage from './pages/LoginPage'
import HomePageDorada from './pages/HomePageDorada'
import Reviews from './pages/Reviews'
import RoleBasedRedirect from './components/RoleBasedRedirect'
import NotificacionesBar from './NotificacionesBar'
import { useAuth } from './contexts/AuthContext'
import ChatMensajes from './components/ChatMensajes'

function SoportePage() {
  const { user } = useAuth() || {};
  // Ajusta estos valores según tu lógica real
  const idConversacion = "1";
  const idUsuarioActual = user?.id || "123";
  return (
    <>
      <Navbar />
      <div className="pt-8 flex justify-center">
        <ChatMensajes conversacionId={idConversacion} remitenteId={idUsuarioActual} />
      </div>
      <Footer />
    </>
  );
}

function AppContent() {
  const { user } = useAuth() || {};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Agrega la redirección basada en rol aquí */}
      <RoleBasedRedirect />
      {user && <NotificacionesBar usuarioId={user.id} />}
      <Routes>
        <Route path="/soporte" element={<SoportePage />} />
        <Route path="/" element={
          <>
            <Navbar />
            <HomePageDorada />
            <Footer />
            <WhatsAppFloat />
            <Chatbot />
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
        <Route path="/admin-login" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <RoleBasedRedirect />
          </ProtectedRoute>
        } />
        <Route path="/dashboard-cobranzas" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardCobranzas /></div><Footer /></Suspense>} />
        <Route path="/dashboard-contratos" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardContratos /></div><Footer /></Suspense>} />
        <Route path="/dashboard-atencion" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardAtencionCliente /></div><Footer /></Suspense>} />
        <Route path="/dashboard-postventa" element={<Suspense fallback={<div>Cargando...</div>}><Navbar /><div className="pt-8"><DashboardPostventa /></div><Footer /></Suspense>} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App