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
      className="fixed bottom-6 left-4 right-4 max-w-[448px] mx-auto bg-white hover:bg-gray-50 text-text rounded-xl px-5 py-3.5 flex items-center justify-between shadow-2xl z-30 transition-all hover:shadow-3xl border-2 border-gold"
      style={{
        boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative bg-gold rounded-lg p-2">
          <ShoppingBag className="w-5 h-5 text-white" aria-hidden="true" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md" aria-hidden="true">
            {itemCount}
          </div>
        </div>
        <span className="font-semibold text-text">Savatni ko'rish</span>
      </div>
      <div className="text-xl font-bold text-gold">{formatPrice(total)}</div>
    </motion.button>
  )
}
