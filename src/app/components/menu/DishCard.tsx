import { MenuItem } from '../../../types'
import { Clock, Plus, Star } from 'lucide-react'
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
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden cursor-pointer group relative transition-all border border-gray-200"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      }}
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ImageWithFallback
          src={dish.image_url}
          alt={dish.name}
          fallback="🍽️"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {!dish.is_available && (
          <div className="absolute inset-0 bg-white/95 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <span className="text-gray-700 text-sm px-5 py-2.5 bg-white rounded-xl shadow-md font-semibold border border-gray-200">
                Vaqtinchalik mavjud emas
              </span>
            </div>
          </div>
        )}

        {/* Rating Badge */}
        {dish.is_available && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 border border-gray-100">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-900">4.8</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-gray-900 text-base font-bold mb-1.5 line-clamp-1 leading-tight">
          {dish.name}
        </h3>
        
        {/* Description */}
        {dish.description && (
          <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        )}

        {/* Price and Time Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-gray-900 text-xl font-bold">
            {formatPrice(dish.price)}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{dish.cook_time_minutes} daqiqa</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCart}
          disabled={!dish.is_available}
          aria-label={`${dish.name}ni savatga qo'shish`}
          className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2"
          style={{
            backgroundColor: dish.is_available ? '#f59e0b' : '#e5e7eb',
            borderColor: dish.is_available ? '#f59e0b' : '#d1d5db',
            color: 'white',
            boxShadow: dish.is_available ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none'
          }}
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span>Savatga qo'shish</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
