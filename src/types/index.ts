export type OrderStatus = 'pending' | 'cooking' | 'ready' | 'completed' | 'cancelled'

export interface Organization {
  id: string
  name: string
  logo_url?: string
  address?: string
  phone?: string
}

export interface Category {
  id: string
  organization_id: string
  name: string
  icon?: string
  sort_order: number
  is_active: boolean
}

export interface MenuItem {
  id: string
  organization_id: string
  category_id: string
  name: string
  description?: string
  image_url?: string
  price: number
  cook_time_minutes: number
  is_available: boolean
  ingredients?: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  modifications?: string
}

export interface Order {
  id: string
  organization_id: string
  table_id: string
  status: OrderStatus
  total_amount: number
  tip_percentage: number
  customer_note?: string
  created_at: string
}

export interface Table {
  id: string
  organization_id: string
  table_number: number
  qr_code_id: string
}
