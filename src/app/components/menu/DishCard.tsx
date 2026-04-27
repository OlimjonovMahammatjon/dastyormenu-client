import { MenuItem } from '../../../types'
import { Clock, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { formatPrice } from '../../../lib/utils'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface DishCardProps {
  dish: MenuItem
  onClick: () => void
  onAddToCart: (e: React.MouseEvent) => void
}

export function DishCard({ dish, onClick, onAddToCart }: DishCardProps) {

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(245, 158, 11, 0.25)' }}
      className="bg-white rounded-xl overflow-hidden border-2 border-gray-100 hover:border-gold transition-all cursor-pointer group relative shadow-md"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface-2 to-surface">
        <ImageWithFallback
          src={dish.image_url}
          alt={dish.name}
          fallback="🍽️"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {!dish.is_available && (
          <div className="absolute inset-0 bg-bg/95 flex items-center justify-center">
            <div className="text-center">
              <span className="text-text-muted text-sm px-6 py-3 bg-surface rounded-full border-2 border-border">
                Vaqtinchalik mavjud emas
              </span>
            </div>
          </div>
        )}
        
        {/* Badge for new items */}
        {dish.is_available && (
          <div className="absolute top-3 right-3 bg-gold text-bg text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
            Yangi
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-text text-lg font-semibold mb-2 line-clamp-1 group-hover:text-gold transition-colors">
          {dish.name}
        </h3>
        
        {dish.description && (
          <p className="text-text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-gold text-2xl font-bold mb-1">
              {formatPrice(dish.price)}
            </div>
            <div className="flex items-center gap-1.5 text-text-muted text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{dish.cook_time_minutes} daqiqa</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAddToCart}
            disabled={!dish.is_available}
            aria-label={`${dish.name}ni savatga qo'shish`}
            className="w-11 h-11 rounded-lg bg-gold hover:bg-gold-hover disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
