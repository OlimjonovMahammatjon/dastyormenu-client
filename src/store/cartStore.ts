import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, MenuItem } from '../types'

interface CartStore {
  items: CartItem[]
  addItem: (menuItem: MenuItem, modifications?: string) => void
  removeItem: (menuItemId: string, modifications?: string) => void
  updateQuantity: (menuItemId: string, modifications: string | undefined, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem, modifications) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.menuItem.id === menuItem.id && item.modifications === modifications
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.menuItem.id === menuItem.id && item.modifications === modifications
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }

          return {
            items: [...state.items, { menuItem, quantity: 1, modifications }]
          }
        })
      },

      removeItem: (menuItemId, modifications) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.menuItem.id === menuItemId && item.modifications === modifications)
          )
        }))
      },

      updateQuantity: (menuItemId, modifications, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId, modifications)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.menuItem.id === menuItemId && item.modifications === modifications
              ? { ...item, quantity }
              : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        const state = get()
        return state.items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'dastyor-cart'
    }
  )
)
