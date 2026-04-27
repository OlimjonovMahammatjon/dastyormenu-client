import { MenuItem } from '../../../types'
import { BottomSheet } from '../ui/bottom-sheet'
import { Clock, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { formatPrice } from '../../../lib/utils'
import { motion } from 'motion/react'

interface DishModalProps {
  dish: MenuItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart: (dish: MenuItem, quantity: number, modifications?: string) => void
}

export function DishModal({ dish, open, onOpenChange, onAddToCart }: DishModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [modifications, setModifications] = useState('')

  if (!dish) return null

  const handleAddToCart = () => {
    onAddToCart(dish, quantity, modifications || undefined)
    setQuantity(1)
    setModifications('')
    onOpenChange(false)
  }

  const totalPrice = dish.price * quantity

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col gap-5 pb-6">
        {/* Dish Info */}
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-text">{dish.name}</h2>
          {dish.description && (
            <p className="text-text-muted text-sm leading-relaxed">{dish.description}</p>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 rounded-lg border border-border">
              <Clock className="w-4 h-4 text-gold" />
              <span className="text-text-muted text-sm">{dish.cook_time_minutes} daqiqa</span>
            </div>
            <div className="text-gold text-2xl font-bold">{formatPrice(dish.price)}</div>
          </div>
        </div>

        {/* Ingredients */}
        {dish.ingredients && (
          <div className="bg-surface-2 rounded-lg p-4 border border-border">
            <h3 className="text-text font-semibold mb-2 text-sm">Tarkibi:</h3>
            <p className="text-text-muted text-sm leading-relaxed">{dish.ingredients}</p>
          </div>
        )}

        {/* Modifications */}
        <div className="flex flex-col gap-2">
          <label className="text-text font-semibold text-sm">
            Qo'shimcha izohlar (ixtiyoriy):
          </label>
          <textarea
            value={modifications}
            onChange={(e) => setModifications(e.target.value)}
            placeholder="Masalan: achchiq qo'shmasangiz..."
            className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-gold transition-colors"
            rows={3}
          />
        </div>

        {/* Quantity Selector */}
        <div className="bg-surface-2 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-text font-semibold text-sm">Miqdori:</span>
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Miqdorni kamaytirish"
                className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-text hover:border-gold hover:bg-gold/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <span className="text-text text-lg font-bold w-10 text-center">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Miqdorni oshirish"
                className="w-9 h-9 rounded-lg bg-gold hover:bg-gold-hover flex items-center justify-center shadow-sm hover:shadow-md transition-all"
              >
                <Plus className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-text-muted text-sm">Osh</span>
            <div className="text-right">
              <div className="text-text font-bold text-lg">{formatPrice(totalPrice)}</div>
              <div className="text-text-muted text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{dish.cook_time_minutes} daqiqa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleAddToCart}
          disabled={!dish.is_available}
          aria-label={`${dish.name}ni savatga qo'shish`}
          className="w-full bg-gold hover:bg-gold-hover disabled:bg-surface-2 disabled:cursor-not-allowed text-white py-4 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg"
        >
          <span>Savatga qo'shish</span>
        </motion.button>
      </div>
    </BottomSheet>
  )
}
