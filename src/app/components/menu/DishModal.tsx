import { MenuItem } from '../../../types'
import { BottomSheet } from '../ui/bottom-sheet'
import { Clock, Plus, Minus } from 'lucide-react'
import { useState } from 'react'

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

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('uz-UZ') + " so'm"
  }

  const handleAddToCart = () => {
    onAddToCart(dish, quantity, modifications || undefined)
    setQuantity(1)
    setModifications('')
    onOpenChange(false)
  }

  const totalPrice = dish.price * quantity

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange}>
      <div className="space-y-6 pb-6">
        {dish.image_url && (
          <div className="relative -mx-6 -mt-4 aspect-[16/10] overflow-hidden bg-surface-2">
            <img
              src={dish.image_url}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div>
          <h2 className="text-2xl text-text mb-2">{dish.name}</h2>
          {dish.description && (
            <p className="text-text-muted mb-4">{dish.description}</p>
          )}

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1 text-text-muted">
              <Clock className="w-4 h-4" />
              <span>{dish.cook_time_minutes} daqiqa</span>
            </div>
            <div className="text-gold text-xl">{formatPrice(dish.price)}</div>
          </div>
        </div>

        {dish.ingredients && (
          <div>
            <h3 className="text-text mb-2">Tarkibi:</h3>
            <p className="text-text-muted text-sm">{dish.ingredients}</p>
          </div>
        )}

        <div>
          <label className="block text-text mb-2">Qo'shimcha izohlar (ixtiyoriy):</label>
          <textarea
            value={modifications}
            onChange={(e) => setModifications(e.target.value)}
            placeholder="Masalan: achchiq qo'shmasangiz..."
            className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-muted resize-none focus:outline-none focus:border-gold/50"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between bg-surface-2 rounded-xl p-4">
          <span className="text-text">Miqdori:</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:border-gold/50 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-text w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-gold flex items-center justify-center hover:bg-gold-hover transition-colors"
            >
              <Plus className="w-4 h-4" style={{ color: 'var(--bg)' }} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!dish.is_available}
          className="w-full bg-gold hover:bg-gold-hover disabled:bg-surface-2 disabled:cursor-not-allowed text-bg py-4 rounded-[var(--radius-btn)] transition-colors flex items-center justify-center gap-2"
          style={{
            boxShadow: dish.is_available ? 'var(--shadow-gold)' : 'none'
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Savatga qo'shish • {formatPrice(totalPrice)}</span>
        </button>
      </div>
    </BottomSheet>
  )
}
