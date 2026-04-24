import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { MenuPage } from './pages/MenuPage'
import { TrackingPage } from './pages/TrackingPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)'
          }
        }}
      />
      <Routes>
        {/* Table-specific menu route */}
        <Route path="/:tableId" element={<MenuPage />} />
        
        {/* Tracking page */}
        <Route path="/:tableId/tracking" element={<TrackingPage />} />
        
        {/* Fallback to menu page for root */}
        <Route path="/" element={<MenuPage />} />
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}