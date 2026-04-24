import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MenuItem, Category, Organization, Table } from '../../types'
import { HeroHeader } from '../components/menu/HeroHeader'
import { FilterBar } from '../components/menu/FilterBar'
import { DishGrid } from '../components/menu/DishGrid'
import { DishModal } from '../components/menu/DishModal'
import { CartFAB } from '../components/cart/CartFAB'
import { CartSheet } from '../components/cart/CartSheet'
import { useCartStore } from '../../store/cartStore'
import { toast } from 'sonner'
import { api, getTableIdFromURL } from '../../services/api'
import { Spinner } from '../components/ui/spinner'
import { AlertCircle } from 'lucide-react'

export function MenuPage() {
  const { tableId: paramTableId } = useParams<{ tableId?: string }>()
  const navigate = useNavigate()
  
  // State
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const [isDishModalOpen, setIsDishModalOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Data state
  const [table, setTable] = useState<Table | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  // Loading & error state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const addItem = useCartStore((state) => state.addItem)
  const clearCart = useCartStore((state) => state.clearCart)

  // Get table ID from URL or params
  const tableId = paramTableId || getTableIdFromURL()

  // Load data
  useEffect(() => {
    async function loadData() {
      if (!tableId) {
        setError('Table ID topilmadi. QR kodni qayta skanerlang.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        // Load table info
        const tableData = await api.getTable(tableId)
        setTable(tableData)

        // Store table ID for orders
        localStorage.setItem('currentTableId', tableId)

        // Load organization info
        const orgData = await api.getOrganization(tableData.organization_id)
        setOrganization(orgData)

        // Load categories
        const categoriesData = await api.getCategories(tableData.organization_id)
        setCategories(categoriesData)

        // Load menu items
        const menuData = await api.getMenuItems({ is_available: true })
        setMenuItems(menuData.results)

      } catch (err) {
        console.error('Error loading data:', err)
        setError(err instanceof Error ? err.message : 'Ma\'lumotlarni yuklashda xatolik')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [tableId])

  const filteredDishes = activeCategory
    ? menuItems.filter((item) => item.category_id === activeCategory)
    : menuItems

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

  const handleCheckout = async (tipPercentage: number, note?: string) => {
    if (!tableId) {
      toast.error('Table ID topilmadi')
      return
    }

    try {
      const items = useCartStore.getState().items
      
      // Prepare order data for API
      const orderData = {
        table_id: tableId,
        items: items.map(item => ({
          menu_item_id: item.menuItem.id,
          quantity: item.quantity,
          modifications: item.modifications
        })),
        customer_note: note,
        tip_percentage: tipPercentage
      }

      // Create order via API
      const order = await api.createOrder(orderData)
      
      // Store order ID for tracking
      localStorage.setItem('currentOrderId', order.id)
      
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
        navigate(`/${tableId}/tracking`)
      }, 500)
    } catch (err) {
      console.error('Error creating order:', err)
      toast.error('Buyurtma yuborishda xatolik yuz berdi', {
        style: {
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--destructive)'
        }
      })
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="text-text-muted mt-4">Menyu yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !table || !organization) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface rounded-[var(--radius-card)] p-8 border border-border text-center">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="text-xl text-text mb-3">Xatolik yuz berdi</h2>
          <p className="text-text-muted mb-6">
            {error || 'Ma\'lumotlarni yuklashda xatolik yuz berdi'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gold hover:bg-gold-hover text-bg py-3 px-6 rounded-[var(--radius-btn)] transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            style={{ boxShadow: 'var(--shadow-gold)' }}
          >
            Qayta urinish
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg pb-32">
      <HeroHeader organization={organization} table={table} />
      <FilterBar
        categories={categories}
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
