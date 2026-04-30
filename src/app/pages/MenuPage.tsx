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
      try {
        setLoading(true)
        setError(null)

        console.log('📱 Loading data...')

        // Try to load table info if tableId exists
        if (tableId) {
          try {
            const tableData = await api.getTable(tableId)
            console.log('✅ Table loaded:', tableData)
            setTable(tableData)
            localStorage.setItem('currentTableId', tableId)

            // Load organization info
            const orgId = tableData.organization || tableData.organization_id
            if (orgId) {
              try {
                const orgData = await api.getOrganization(orgId)
                console.log('✅ Organization loaded:', orgData)
                setOrganization(orgData)
              } catch (orgErr) {
                console.warn('⚠️ Organization not loaded, using defaults')
              }
            }
          } catch (tableErr) {
            console.warn('⚠️ Table not loaded, continuing without table info')
          }
        }

        // Always try to load menu items (even without table)
        try {
          const menuData = await api.getMenuItems({ is_available: true })
          console.log('✅ Menu items loaded:', menuData.results.length)
          setMenuItems(menuData.results)
        } catch (menuErr) {
          console.error('❌ Failed to load menu items:', menuErr)
          throw new Error('Menyu yuklanmadi')
        }

        // Try to load categories
        try {
          const categoriesData = await api.getCategories()
          console.log('✅ Categories loaded:', categoriesData.length)
          setCategories(categoriesData)
        } catch (catErr) {
          console.warn('⚠️ Categories not loaded, continuing without categories')
        }

      } catch (err) {
        console.error('❌ Error loading data:', err)
        setError('Menyu yuklanmadi. Iltimos, qayta urinib ko\'ring.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [tableId])

  const filteredDishes = activeCategory
    ? menuItems.filter((item) => {
        const catId = item.category_id || item.category_name
        return catId === activeCategory
      })
    : menuItems

  const handleDishClick = (dish: MenuItem) => {
    setSelectedDish(dish)
    setIsDishModalOpen(true)
  }

  const handleAddToCart = (dish: MenuItem, quantity = 1, modifications?: string) => {
    for (let i = 0; i < quantity; i++) {
      addItem(dish, modifications)
    }
    
    toast.success(`✅ ${dish.name} savatga qo'shildi`, {
      duration: 2000,
      style: {
        background: '#f0fdf4',
        color: '#166534',
        border: '1px solid #86efac',
        fontSize: '14px',
        fontWeight: '600'
      }
    })
  }

  const handleCheckout = async (tipPercentage: number, note?: string) => {
    if (!tableId) {
      toast.error('Stol raqami topilmadi. Iltimos, QR kodni qayta skanerlang.', {
        duration: 4000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5'
        }
      })
      return
    }

    // Check if we have table data with qr_code_id
    if (!table || !table.qr_code_id) {
      toast.error('QR kod ma\'lumoti topilmadi. Iltimos, sahifani yangilang.', {
        duration: 4000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5'
        }
      })
      return
    }

    try {
      const items = useCartStore.getState().items
      
      if (items.length === 0) {
        toast.error('Savatingiz bo\'sh', {
          duration: 3000
        })
        return
      }

      // Prepare order data for API - backend requires qr_code_id
      const orderData = {
        qr_code_id: table.qr_code_id,
        customer_note: note && note.trim() ? note.trim() : "",
        tip_percentage: tipPercentage || 0,
        items: items.map(item => ({
          menu_item_id: item.menuItem.id,
          quantity: item.quantity,
          modifications: item.modifications && item.modifications.trim() ? item.modifications.trim() : "",
          item_status: "pending"
        }))
      }

      console.log('📤 Sending order:', JSON.stringify(orderData, null, 2))

      // Create order via API
      const order = await api.createOrder(orderData)
      
      console.log('✅ Order created:', order)
      
      // Store order ID for tracking
      localStorage.setItem('currentOrderId', order.id)
      
      clearCart()
      setIsCartOpen(false)

      toast.success('🎉 Buyurtma muvaffaqiyatli yuborildi!', {
        duration: 3000,
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #86efac',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      })

      // Navigate to tracking page
      setTimeout(() => {
        navigate(`/${tableId}/tracking`)
      }, 1000)
    } catch (err: any) {
      console.error('❌ Error creating order:', err)
      console.error('❌ Error details:', err.details)
      
      let errorMessage = 'Buyurtma yuborishda xatolik yuz berdi'
      
      if (err.details) {
        // Show detailed error from backend
        const detailsStr = typeof err.details === 'object' 
          ? JSON.stringify(err.details, null, 2) 
          : String(err.details)
        errorMessage = `Xatolik: ${detailsStr}`
      } else if (err.message) {
        errorMessage = err.message
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        style: {
          background: '#fee2e2',
          color: '#991b1b',
          border: '1px solid #fca5a5',
          fontSize: '12px',
          maxWidth: '400px'
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

  // Error state - faqat menu yuklanmasa
  if (error && menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface rounded-[var(--radius-card)] p-8 border border-border text-center">
          <div className="text-6xl mb-6" role="img" aria-label="Xatolik">😕</div>
          
          <h2 className="text-2xl text-text mb-4 font-display">
            Kechirasiz!
          </h2>
          
          <p className="text-text-muted text-lg mb-8">
            Menyu yuklanmadi.
            <br />
            Iltimos, qayta urinib ko'ring.
          </p>
          
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gold hover:bg-gold-hover text-bg py-4 px-6 rounded-[var(--radius-btn)] transition-colors focus:outline-none focus:ring-2 focus:ring-gold text-lg font-medium"
            style={{ boxShadow: 'var(--shadow-gold)' }}
          >
            Qayta urinish
          </button>
        </div>
      </div>
    )
  }

  // Default organization if not loaded
  const displayOrg = organization || {
    id: 'default',
    name: 'Dastyor Restaurant',
    logo_url: undefined,
    address: undefined,
    phone: undefined
  }

  // Default table if not loaded
  const displayTable = table || {
    id: tableId || 'default',
    organization_id: 'default',
    organization: 'default',
    table_number: 0,
    qr_code_image: undefined,
    qr_code_url: undefined,
    assigned_waiter: null,
    waiter_name: null
  }

  return (
    <div className="min-h-screen bg-bg pb-32">
      <HeroHeader organization={displayOrg} table={displayTable} />
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
