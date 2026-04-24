import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Order, OrderStatus } from '../../types'
import { TrackingView } from '../components/order/TrackingView'
import { Spinner } from '../components/ui/spinner'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { api } from '../../services/api'

export function TrackingPage() {
  const { tableId } = useParams<{ tableId?: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true)
        setError(null)

        // Get order ID from localStorage
        const orderId = localStorage.getItem('currentOrderId')
        
        if (!orderId) {
          setError('Buyurtma topilmadi')
          setLoading(false)
          return
        }

        // Fetch order from API
        const orderData = await api.getOrder(orderId)
        setOrder(orderData)

      } catch (err) {
        console.error('Error loading order:', err)
        setError(err instanceof Error ? err.message : 'Buyurtmani yuklashda xatolik')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()

    // Poll for order updates every 10 seconds
    const interval = setInterval(async () => {
      const orderId = localStorage.getItem('currentOrderId')
      if (orderId) {
        try {
          const orderData = await api.getOrder(orderId)
          setOrder(orderData)
        } catch (err) {
          console.error('Error polling order:', err)
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleBackToMenu = () => {
    if (tableId) {
      navigate(`/${tableId}`)
    } else {
      const storedTableId = localStorage.getItem('currentTableId')
      navigate(storedTableId ? `/${storedTableId}` : '/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-text-muted mt-4">Buyurtma yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface rounded-[var(--radius-card)] p-8 border border-border text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl text-text mb-3">Buyurtma topilmadi</h2>
          <p className="text-text-muted mb-6">
            {error || 'Hozircha faol buyurtmangiz yo\'q'}
          </p>
          <button
            onClick={handleBackToMenu}
            aria-label="Menyuga qaytish"
            className="w-full bg-gold hover:bg-gold-hover text-bg px-6 py-3 rounded-[var(--radius-btn)] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            style={{
              boxShadow: 'var(--shadow-gold)'
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Menyuga qaytish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-bg">
      <button
        onClick={handleBackToMenu}
        aria-label="Menyuga qaytish"
        className="fixed top-4 left-4 z-20 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:border-gold/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <TrackingView order={order} />
    </div>
  )
}
