import { BottomSheet } from '../ui/bottom-sheet'
import { useCartStore } from '../../../store/cartStore'
import { Trash2, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { formatPrice } from '../../../lib/utils'
import { motion, AnimatePresence } from 'motion/react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const tipAmount = (total * tipPercentage) / 100
  const grandTotal = total + tipAmount

  const handleCheckout = async () => {
    setIsSubmitting(true)
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FFB800', '#E6A500', '#FFF8E1', '#FFD700']
      })
    }
    
    await onCheckout(tipPercentage, note || undefined)
    setIsSubmitting(false)
  }

  if (items.length === 0) {
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange} title="Savat">
        <div className="flex flex-col items-center justify-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h3 className="text-xl font-semibold text-text mb-2">Savatingiz bo'sh</h3>
          <p className="text-text-muted text-center mb-6">
            Menyudan yoqtirgan taomlaringizni tanlang
          </p>
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-3 bg-gold hover:bg-gold-hover text-bg rounded-full font-semibold transition-colors"
          >
            Menyuga qaytish
          </button>
        </div>
      </BottomSheet>
    )
  }

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={`Savat (${items.length})`}>
      <div className="flex flex-col gap-4 pb-6">
        {/* Cart Items */}
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.menuItem.id + (item.modifications || '')}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-surface rounded-lg p-3 border border-border hover:border-gold transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-text font-semibold text-sm mb-1">{item.menuItem.name}</h3>
                    {item.modifications && (
                      <p className="text-text-muted text-xs mb-1 line-clamp-1">
                        💬 {item.modifications}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.menuItem.id, item.modifications)}
                    aria-label={`${item.menuItem.name}ni o'chirish`}
                    className="text-text-muted hover:text-red-500 transition-colors p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity - 1)}
                      aria-label="Miqdorni kamaytirish"
                      className="w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text hover:border-gold transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </motion.button>
                    <span className="text-text font-bold text-base w-8 text-center">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity + 1)}
                      aria-label="Miqdorni oshirish"
                      className="w-8 h-8 rounded-lg bg-gold hover:bg-gold-hover flex items-center justify-center shadow-sm transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 text-white" />
                    </motion.button>
                  </div>
                  
                  <div className="text-gold font-bold text-base">
                    {formatPrice(item.menuItem.price * item.quantity)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Tip Section */}
        <div className="bg-surface-2 rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <h3 className="text-text font-semibold text-sm">Xizmat haqqi (ixtiyoriy)</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((percentage) => (
              <motion.button
                key={percentage}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTipPercentage(percentage)}
                aria-label={`Xizmat haqqi ${percentage === 0 ? "yo'q" : percentage + ' foiz'}`}
                aria-pressed={tipPercentage === percentage}
                className="py-2 rounded-lg text-xs font-semibold transition-all border"
                style={{
                  background: tipPercentage === percentage ? 'var(--gold)' : 'var(--surface)',
                  color: tipPercentage === percentage ? 'white' : 'var(--text-muted)',
                  borderColor: tipPercentage === percentage ? 'var(--gold)' : 'var(--border)'
                }}
              >
                {percentage === 0 ? "Yo'q" : `${percentage}%`}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Note Section */}
        <div className="flex flex-col gap-2">
          <label className="text-text font-semibold text-sm">
            💬 Ofitsiantga eslatma (ixtiyoriy)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Masalan: iltimos tezroq keltiring..."
            className="w-full bg-surface-2 border border-border rounded-lg px-3 py-2.5 text-text text-sm placeholder:text-text-muted resize-none focus:outline-none focus:border-gold transition-colors"
            rows={3}
          />
        </div>

        {/* Total Section */}
        <div className="bg-gold/10 rounded-lg p-4 border-2 border-gold">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-text text-sm">
              <span>Jami:</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            {tipPercentage > 0 && (
              <div className="flex justify-between text-text text-sm">
                <span>Xizmat haqqi ({tipPercentage}%):</span>
                <span className="font-semibold">{formatPrice(tipAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-text text-lg font-bold pt-2 border-t border-gold">
              <span>Umumiy:</span>
              <span className="text-gold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleCheckout}
          disabled={isSubmitting}
          aria-label="Buyurtma berish"
          className="w-full bg-gold hover:bg-gold-hover disabled:bg-surface-2 text-white py-4 rounded-lg transition-all font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                ⏳
              </motion.div>
              <span>Yuborilmoqda...</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-6 h-6" />
              <span>Buyurtma berish</span>
            </>
          )}
        </motion.button>
      </div>
    </BottomSheet>
  )
}
