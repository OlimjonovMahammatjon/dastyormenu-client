import { BottomSheet } from '../ui/bottom-sheet'
import { useCartStore } from '../../../store/cartStore'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
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

  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckout = async () => {
    setIsSubmitting(true)
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#fcd34d']
      })
    }
    
    await onCheckout(0, note || undefined)
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
            className="px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: '#f59e0b',
              color: 'white'
            }}
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
                  <div className="flex items-center gap-2.5">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity - 1)}
                      aria-label="Miqdorni kamaytirish"
                      className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-all"
                    >
                      <Minus className="w-4 h-4" strokeWidth={2.5} />
                    </motion.button>
                    <span className="text-gray-900 font-bold text-lg w-10 text-center">
                      {item.quantity}
                    </span>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateQuantity(item.menuItem.id, item.modifications, item.quantity + 1)}
                      aria-label="Miqdorni oshirish"
                      className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-all"
                      style={{ backgroundColor: '#f59e0b' }}
                    >
                      <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </motion.button>
                  </div>
                  
                  <div className="font-bold text-lg" style={{ color: '#f59e0b' }}>
                    {formatPrice(item.menuItem.price * item.quantity)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Note Section */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-900 font-bold text-sm">
            💬 Ofitsiantga eslatma (ixtiyoriy)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Masalan: iltimos tezroq keltiring..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 transition-all"
            style={{ focusRingColor: '#f59e0b' }}
            rows={3}
          />
        </div>

        {/* Total Section */}
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 text-base font-semibold">Jami:</span>
            <span className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
              {formatPrice(total)}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          disabled={isSubmitting}
          aria-label="Buyurtma berish"
          className="w-full py-4 rounded-xl transition-all font-bold text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl disabled:opacity-50"
          style={{
            backgroundColor: isSubmitting ? '#d1d5db' : '#f59e0b',
            color: 'white'
          }}
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
              <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
              <span>Buyurtma berish</span>
            </>
          )}
        </motion.button>
      </div>
    </BottomSheet>
  )
}
