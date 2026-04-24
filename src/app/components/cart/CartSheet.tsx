import { BottomSheet } from '../ui/bottom-sheet'
import { useCartStore } from '../../../store/cartStore'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { formatPrice } from '../../../lib/utils'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCheckout: (tipPercentage: number, note?: string) => void
}

export function CartSheet({ open, onOpenChange, onCheckout }: CartSheetProps) {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const total = useCartStore((state) => state.getTotal())

  const [tipPercentage, setTipPercentage] = useState(0)
  const [note, setNote] = useState('')

  const tipAmount = (total * tipPercentage) / 100
  const grandTotal = total + tipAmount

  const handleCheckout = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB800', '#E6A500', '#FFF8E1']
      })
    }
    onCheckout(tipPercentage, note || undefined)
  }

  if (items.length === 0) {
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange} title="Savat">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-text-muted text-center">Savatingiz bo'sh</p>
        </div>
      </BottomSheet>
    )
  }

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title="Savat">
      <div className="space-y-4 pb-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.menuItem.id + (item.modifications || '')}
              className="bg-surface-2 rounded-xl p-4 border border-border"
            >
              <div className="flex gap-3">
                {item.menuItem.image_url && (
                  <img
                    src={item.menuItem.image_url}
                    alt={item.menuItem.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-text mb-1">{item.menuItem.name}</h3>
                  {item.modifications && (
                    <p className="text-text-muted text-xs mb-2">Izoh: {item.modifications}</p>
                  )}
                  <div className="text-gold">{formatPrice(item.menuItem.price)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <button
                  onClick={() => removeItem(item.menuItem.id, item.modifications)}
                  aria-label={`${item.menuItem.name}ni o'chirish`}
                  className="text-text-muted hover:text-red-500 transition-colors p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity - 1)}
                    aria-label="Miqdorni kamaytirish"
                    className="w-7 h-7 rounded-full bg-surface border border-border flex items-center justify-center text-text hover:border-gold/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-text w-6 text-center" aria-label={`Miqdor: ${item.quantity}`}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity + 1)}
                    aria-label="Miqdorni oshirish"
                    className="w-7 h-7 rounded-full bg-gold flex items-center justify-center hover:bg-gold-hover transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                  >
                    <Plus className="w-3 h-3" style={{ color: 'var(--bg)' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-2 rounded-xl p-4 space-y-3">
          <h3 className="text-text mb-2">Xizmat haqqi (ixtiyoriy):</h3>
          <div className="flex gap-2">
            {[0, 5, 10, 15].map((percentage) => (
              <button
                key={percentage}
                onClick={() => setTipPercentage(percentage)}
                aria-label={`Xizmat haqqi ${percentage === 0 ? "yo'q" : percentage + ' foiz'}`}
                aria-pressed={tipPercentage === percentage}
                className="flex-1 py-2 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
                style={{
                  background: tipPercentage === percentage ? 'var(--gold)' : 'var(--surface)',
                  color: tipPercentage === percentage ? 'var(--bg)' : 'var(--text-muted)'
                }}
              >
                {percentage === 0 ? "Yo'q" : `${percentage}%`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text mb-2">Ofitsiantga eslatma (ixtiyoriy):</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Masalan: iltimos tezroq keltiring..."
            className="w-full bg-surface-2 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text-muted resize-none focus:outline-none focus:border-gold/50"
            rows={2}
          />
        </div>

        <div className="bg-surface-2 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-text-muted">
            <span>Jami:</span>
            <span>{formatPrice(total)}</span>
          </div>
          {tipPercentage > 0 && (
            <div className="flex justify-between text-text-muted">
              <span>Xizmat haqqi ({tipPercentage}%):</span>
              <span>{formatPrice(tipAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-text text-lg pt-2 border-t border-border">
            <span>Umumiy:</span>
            <span className="text-gold">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          aria-label="Buyurtma berish"
          className="w-full bg-gold hover:bg-gold-hover text-bg py-4 rounded-[var(--radius-btn)] transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
          style={{
            boxShadow: 'var(--shadow-gold)'
          }}
        >
          Buyurtma berish
        </button>
      </div>
    </BottomSheet>
  )
}
