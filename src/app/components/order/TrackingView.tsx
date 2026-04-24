import { Order, OrderStatus } from '../../../types'
import { Clock, CheckCircle2, Flame, Bell } from 'lucide-react'
import { motion } from 'motion/react'
import { formatPrice, formatTime } from '../../../lib/utils'

interface TrackingViewProps {
  order: Order
}

const statusConfig: Record<OrderStatus, { label: string; icon: React.ReactNode; color: string; description?: string }> = {
  pending: {
    label: 'Buyurtma qabul qilindi',
    icon: <Clock className="w-6 h-6" />,
    color: 'var(--gold)',
    description: 'Buyurtmangiz qabul qilindi va tez orada tayyorlanishni boshlaydi'
  },
  cooking: {
    label: 'Tayyorlanmoqda',
    icon: <Flame className="w-6 h-6" />,
    color: '#FF6B35',
    description: 'Oshpazlarimiz buyurtmangizni tayyorlashmoqda...'
  },
  ready: {
    label: 'Tayyor, ofitsiant olib keladi',
    icon: <Bell className="w-6 h-6" />,
    color: '#4CAF50',
    description: 'Buyurtmangiz tayyor, tez orada stolingizga olib kelinadi'
  },
  completed: {
    label: 'Yetkazildi',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: '#4CAF50',
    description: 'Buyurtmangiz muvaffaqiyatli yetkazildi. Yoqimli ishtaha!'
  },
  cancelled: {
    label: 'Bekor qilindi',
    icon: <Clock className="w-6 h-6" />,
    color: '#FF4444',
    description: 'Buyurtma bekor qilindi'
  }
}

export function TrackingView({ order }: TrackingViewProps) {
  const config = statusConfig[order.status]

  const statusSteps: OrderStatus[] = ['pending', 'cooking', 'ready', 'completed']
  const currentIndex = statusSteps.indexOf(order.status)

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-gradient-to-b from-surface to-bg border-b border-border p-6">
        <h1 className="font-display text-2xl text-text mb-2">Buyurtma kuzatuvi</h1>
        <p className="text-text-muted text-sm">Buyurtma #{order.id.slice(0, 8)}</p>
        <p className="text-text-muted text-sm">
          <time dateTime={order.created_at}>{formatTime(order.created_at)}</time>
        </p>
      </div>

      <div className="p-6 space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface rounded-[var(--radius-card)] p-6 border border-border text-center"
          role="status"
          aria-live="polite"
        >
          <motion.div
            animate={{ rotate: order.status === 'cooking' ? 360 : 0 }}
            transition={{ duration: 2, repeat: order.status === 'cooking' ? Infinity : 0, ease: 'linear' }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: config.color + '20', color: config.color }}
            aria-hidden="true"
          >
            {config.icon}
          </motion.div>
          <h2 className="text-xl text-text mb-2">{config.label}</h2>
          {config.description && (
            <p className="text-text-muted text-sm">{config.description}</p>
          )}
        </motion.div>

        <div className="bg-surface rounded-[var(--radius-card)] p-6 border border-border">
          <h3 className="text-text mb-4">Jarayon:</h3>
          <div className="space-y-4" role="list">
            {statusSteps.map((status, index) => {
              const stepConfig = statusConfig[status]
              const isActive = index <= currentIndex
              const isCurrent = index === currentIndex

              return (
                <div key={status} className="flex items-center gap-3" role="listitem">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      backgroundColor: isActive ? stepConfig.color + '20' : 'var(--surface-2)',
                      color: isActive ? stepConfig.color : 'var(--text-muted)',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)'
                    }}
                    aria-hidden="true"
                  >
                    {isActive ? stepConfig.icon : <div className="w-3 h-3 rounded-full bg-current" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${isActive ? 'text-text font-medium' : 'text-text-muted'}`}>
                      {stepConfig.label}
                    </div>
                  </div>
                  {isActive && !isCurrent && (
                    <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} aria-label="Bajarildi" />
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
