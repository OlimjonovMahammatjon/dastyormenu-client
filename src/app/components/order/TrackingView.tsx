import { Order, OrderStatus } from '../../../types'
import { Clock, CheckCircle2, Flame, Bell } from 'lucide-react'
import { motion } from 'motion/react'

interface TrackingViewProps {
  order: Order
}

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string }> = {
  pending: {
    label: 'Buyurtma qabul qilindi',
    icon: <Clock className="w-6 h-6" />,
    color: 'var(--gold)'
  },
  cooking: {
    label: 'Tayyorlanmoqda',
    icon: <Flame className="w-6 h-6" />,
    color: '#FF6B35'
  },
  ready: {
    label: 'Tayyor, ofitsiant olib keladi',
    icon: <Bell className="w-6 h-6" />,
    color: '#4CAF50'
  },
  completed: {
    label: 'Yetkazildi',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: '#4CAF50'
  },
  cancelled: {
    label: 'Bekor qilindi',
    icon: <Clock className="w-6 h-6" />,
    color: '#FF4444'
  }
}

export function TrackingView({ order }: TrackingViewProps) {
  const config = statusConfig[order.status]

  const statusSteps: OrderStatus[] = ['pending', 'cooking', 'ready', 'completed']
  const currentIndex = statusSteps.indexOf(order.status)

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('uz-UZ') + ' so\'m'
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-gradient-to-b from-surface to-bg border-b border-border p-6">
        <h1 className="font-display text-2xl text-text mb-2">Buyurtma kuzatuvi</h1>
        <p className="text-text-muted text-sm">Buyurtma #{order.id.slice(0, 8)}</p>
        <p className="text-text-muted text-sm">{formatTime(order.created_at)}</p>
      </div>

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface rounded-[var(--radius-card)] p-6 border border-border text-center"
        >
          <motion.div
            animate={{ rotate: order.status === 'cooking' ? 360 : 0 }}
            transition={{ duration: 2, repeat: order.status === 'cooking' ? Infinity : 0, ease: 'linear' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: config.color + '20', color: config.color }}
          >
            {config.icon}
          </motion.div>
          <h2 className="text-xl text-text mb-1">{config.label}</h2>
          {order.status === 'cooking' && (
            <p className="text-text-muted text-sm">Oshpazlarimiz buyurtmangizni tayyorlashmoqda...</p>
          )}
          {order.status === 'ready' && (
            <p className="text-text-muted text-sm">Buyurtmangiz tayyor, tez orada stolingizga olib kelinadi</p>
          )}
        </motion.div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-text mb-4">Jarayon:</h3>
          <div className="space-y-4">
            {statusSteps.map((status, index) => {
              const stepConfig = statusConfig[status]
              const isActive = index <= currentIndex
              const isCurrent = index === currentIndex

              return (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: isActive ? stepConfig.color + '20' : 'var(--surface-2)',
                      color: isActive ? stepConfig.color : 'var(--text-muted)',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {isActive ? stepConfig.icon : <div className="w-3 h-3 rounded-full bg-current" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${isActive ? 'text-text' : 'text-text-muted'}`}>
                      {stepConfig.label}
                    </div>
                  </div>
                  {isActive && !isCurrent && (
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border space-y-3">
          <div className="flex justify-between text-text-muted">
            <span>Jami:</span>
            <span>{formatPrice(order.total_amount)}</span>
          </div>
          {order.tip_percentage > 0 && (
            <div className="flex justify-between text-text-muted">
              <span>Xizmat haqqi ({order.tip_percentage}%):</span>
              <span>{formatPrice((order.total_amount * order.tip_percentage) / 100)}</span>
            </div>
          )}
          <div className="flex justify-between text-text text-lg pt-3 border-t border-border">
            <span>Umumiy:</span>
            <span className="text-gold">
              {formatPrice(order.total_amount + (order.total_amount * order.tip_percentage) / 100)}
            </span>
          </div>
          {order.customer_note && (
            <div className="pt-3 border-t border-border">
              <div className="text-text-muted text-sm mb-1">Eslatma:</div>
              <div className="text-text text-sm">{order.customer_note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
