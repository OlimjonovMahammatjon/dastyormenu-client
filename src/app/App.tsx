import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { MenuPage } from './pages/MenuPage'
import { TrackingPage } from './pages/TrackingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </BrowserRouter>
  )
}