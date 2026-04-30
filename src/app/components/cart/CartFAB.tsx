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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={`Savat: ${itemCount} ta mahsulot, jami ${formatPrice(total)}`}
      className="fixed bottom-6 left-4 right-4 max-w-[480px] mx-auto rounded-2xl px-6 py-4 flex items-center justify-between z-30 transition-all shadow-2xl"
      style={{
        backgroundColor: '#f59e0b',
        boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)'
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative bg-white/20 backdrop-blur-sm rounded-xl p-2.5">
          <ShoppingBag className="w-6 h-6 text-white" aria-hidden="true" strokeWidth={2.5} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg" aria-hidden="true">
            {itemCount}
          </div>
        </div>
        <span className="font-bold text-white text-base">Savatni ko'rish</span>
      </div>
      <div className="text-2xl font-bold text-white">{formatPrice(total)}</div>
    </motion.button>
  )
}
