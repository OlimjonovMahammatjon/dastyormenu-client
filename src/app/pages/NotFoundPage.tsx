import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { motion } from 'motion/react'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-gold/20 mb-4">404</div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl mb-4"
            role="img"
            aria-label="Sahifa topilmadi"
          >
            🍽️
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="bg-surface rounded-[var(--radius-card)] p-8 border border-border shadow-lg">
          <h1 className="text-2xl text-text mb-3 font-display">
            Sahifa topilmadi
          </h1>
          <p className="text-text-muted mb-6">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              aria-label="Bosh sahifaga qaytish"
              className="w-full bg-gold hover:bg-gold-hover text-bg py-3 px-6 rounded-[var(--radius-btn)] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              style={{
                boxShadow: 'var(--shadow-gold)'
              }}
            >
              <Home className="w-5 h-5" />
              <span>Bosh sahifaga qaytish</span>
            </button>

            <button
              onClick={() => navigate(-1)}
              aria-label="Orqaga qaytish"
              className="w-full bg-surface-2 hover:bg-surface text-text py-3 px-6 rounded-[var(--radius-btn)] transition-colors flex items-center justify-center gap-2 border border-border focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Orqaga qaytish</span>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
              <Search className="w-4 h-4" />
              <span>Menyuni ko'rish uchun bosh sahifaga o'ting</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-2">
          {['🍕', '🍔', '🍜', '🍰', '☕'].map((emoji, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-2xl opacity-30"
              role="img"
              aria-hidden="true"
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
