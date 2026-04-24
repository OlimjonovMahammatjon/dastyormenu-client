import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../../store/cartStore'
import { motion } from 'motion/react'
import { formatPrice } from '../../../lib/utils'

interface CartFABProps {
  onClick: () => void
}

export function CartFAB({ onClick }: CartFABProps) {
  const itemCount = useCartStore((state) => state.getItemCount())
  const total = useCartStore((state) => state.getTotal())

  if (itemCount === 0) return null

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      onClick={onClick}
      aria-label={`Savat: ${itemCount} ta mahsulot, jami ${formatPrice(total)}`}
      className="fixed bottom-6 left-4 right-4 max-w-[448px] mx-auto bg-gold hover:bg-gold-hover text-bg rounded-[var(--radius-btn)] px-6 py-4 flex items-center justify-between shadow-lg z-30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
      style={{
        boxShadow: '0 8px 32px rgba(255, 184, 0, 0.4)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingBag className="w-6 h-6" aria-hidden="true" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-bg text-gold rounded-full flex items-center justify-center text-xs font-semibold" aria-hidden="true">
            {itemCount}
          </div>
        </div>
        <span>Savatni ko'rish</span>
      </div>
      <div className="text-lg font-semibold">{formatPrice(total)}</div>
    </motion.button>
  )
}
