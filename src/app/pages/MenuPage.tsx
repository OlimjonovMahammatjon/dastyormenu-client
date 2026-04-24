import { useState } from 'react'
import { mockOrganization, mockCategories, mockMenuItems, mockTable } from '../../data/mockData'
import { MenuItem } from '../../types'
import { HeroHeader } from '../components/menu/HeroHeader'
import { FilterBar } from '../components/menu/FilterBar'
import { DishGrid } from '../components/menu/DishGrid'
import { DishModal } from '../components/menu/DishModal'
import { CartFAB } from '../components/cart/CartFAB'
import { CartSheet } from '../components/cart/CartSheet'
import { useCartStore } from '../../store/cartStore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const [isDishModalOpen, setIsDishModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addItem = useCartStore((state) => state.addItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const navigate = useNavigate()

  const filteredDishes = activeCategory
    ? mockMenuItems.filter((item) => item.category_id === activeCategory)
    : mockMenuItems

  const handleDishClick = (dish: MenuItem) => {
    setSelectedDish(dish)
    setIsDishModalOpen(true)
  }

  const handleAddToCart = (dish: MenuItem, quantity = 1, modifications?: string) => {
    for (let i = 0; i < quantity; i++) {
      addItem(dish, modifications)
    }
    toast.success(`${dish.name} savatga qo'shildi`, {
      style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--border)'
      },
      iconTheme: {
        primary: 'var(--gold)',
        secondary: 'var(--bg)'
      }
    })
  }

  const handleCheckout = (tipPercentage: number, note?: string) => {
    const items = useCartStore.getState().items
    const total = useCartStore.getState().getTotal()

    const order = {
      id: 'order-' + Date.now(),
      organization_id: mockOrganization.id,
      table_id: mockTable.id,
      status: 'pending' as const,
      total_amount: total,
      tip_percentage: tipPercentage,
      customer_note: note,
      created_at: new Date().toISOString()
    }

    localStorage.setItem('currentOrder', JSON.stringify(order))
    clearCart()
    setIsCartOpen(false)

    toast.success('Buyurtma muvaffaqiyatli yuborildi!', {
      style: {
        background: 'var(--surface)',
        color: 'var(--text)',
        border: '1px solid var(--gold)'
      },
      iconTheme: {
        primary: 'var(--gold)',
        secondary: 'var(--bg)'
      }
    })

    setTimeout(() => {
      navigate('/tracking')
    }, 500)
  }

  return (
    <div className="min-h-screen bg-bg pb-32">
      <HeroHeader organization={mockOrganization} table={mockTable} />
      <FilterBar
        categories={mockCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <DishGrid
        dishes={filteredDishes}
        onDishClick={handleDishClick}
        onAddToCart={(dish) => handleAddToCart(dish, 1)}
      />

      <DishModal
        dish={selectedDish}
        open={isDishModalOpen}
        onOpenChange={setIsDishModalOpen}
        onAddToCart={(dish, quantity, modifications) => {
          handleAddToCart(dish, quantity, modifications)
        }}
      />

      <CartFAB onClick={() => setIsCartOpen(true)} />

      <CartSheet
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        onCheckout={handleCheckout}
      />
    </div>
  )
}
