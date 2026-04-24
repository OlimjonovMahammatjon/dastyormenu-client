import { useState, useEffect } from 'react'
import { Order, OrderStatus } from '../../types'
import { TrackingView } from '../components/order/TrackingView'
import { Spinner } from '../components/ui/spinner'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function TrackingPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedOrder = localStorage.getItem('currentOrder')
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder))
    }
    setLoading(false)

    const interval = setInterval(() => {
      const currentOrder = localStorage.getItem('currentOrder')
      if (currentOrder) {
        const parsedOrder: Order = JSON.parse(currentOrder)

        const statusProgression: OrderStatus[] = ['pending', 'cooking', 'ready', 'completed']
        const currentIndex = statusProgression.indexOf(parsedOrder.status)

        if (currentIndex < statusProgression.length - 1) {
          parsedOrder.status = statusProgression[currentIndex + 1]
          localStorage.setItem('currentOrder', JSON.stringify(parsedOrder))
          setOrder({ ...parsedOrder })
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">📋</div>
        <h2 className="text-text text-xl mb-2">Buyurtma topilmadi</h2>
        <p className="text-text-muted text-center mb-6">Hozircha faol buyurtmangiz yo'q</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gold hover:bg-gold-hover text-bg px-6 py-3 rounded-[var(--radius-btn)] transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Menyuga qaytish
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-20 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:border-gold/50 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <TrackingView order={order} />
    </div>
  )
}
