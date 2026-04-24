import { MenuItem } from '../../../types'
import { Clock, Plus } from 'lucide-react'
import { motion } from 'motion/react'

interface DishCardProps {
  dish: MenuItem
  onClick: () => void
  onAddToCart: (e: React.MouseEvent) => void
}

export function DishCard({ dish, onClick, onAddToCart }: DishCardProps) {
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('uz-UZ') + " so'm"
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-surface rounded-[var(--radius-card)] overflow-hidden border border-border/50 hover:border-gold/30 transition-all cursor-pointer group"
      onClick={onClick}
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {dish.image_url ? (
          <img
            src={dish.image_url}
            alt={dish.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
        )}
        {!dish.is_available && (
          <div className="absolute inset-0 bg-bg/80 flex items-center justify-center">
            <span className="text-text-muted text-sm px-4 py-2 bg-surface rounded-full">
              Vaqtinchalik mavjud emas
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-text text-lg mb-1">{dish.name}</h3>
        {dish.description && (
          <p className="text-text-muted text-sm mb-3 line-clamp-2">{dish.description}</p>
        )}

        <div className="flex items-center justify-between">
          <div>
            <div className="text-gold text-xl">{formatPrice(dish.price)}</div>
            <div className="flex items-center gap-1 text-text-muted text-xs mt-1">
              <Clock className="w-3 h-3" />
              <span>{dish.cook_time_minutes} daqiqa</span>
            </div>
          </div>

          <button
            onClick={onAddToCart}
            disabled={!dish.is_available}
            className="w-10 h-10 rounded-full bg-gold hover:bg-gold-hover disabled:bg-surface-2 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            style={{
              boxShadow: dish.is_available ? 'var(--shadow-gold)' : 'none'
            }}
          >
            <Plus className="w-5 h-5" style={{ color: dish.is_available ? 'var(--bg)' : 'var(--text-muted)' }} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
