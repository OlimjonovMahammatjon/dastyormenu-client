const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dastyormenu-backend-production.up.railway.app/api'

// API Error handling
class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new APIError(response.status, `API Error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new Error('Network error: Ma\'lumotlarni yuklashda xatolik yuz berdi')
  }
}

// Types
export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category_id: string
  image_url?: string
  is_available: boolean
  cook_time_minutes: number
  ingredients?: string
}

export interface Category {
  id: string
  name: string
  icon: string
  organization_id: string
}

export interface Table {
  id: string
  organization_id: string
  table_number: number
  qr_code_image?: string
  qr_code_url?: string
  assigned_waiter?: string | null
  waiter_name?: string | null
}

export interface Organization {
  id: string
  name: string
  logo_url?: string
  address?: string
  phone?: string
}

export interface MenuResponse {
  count: number
  next: string | null
  previous: string | null
  results: MenuItem[]
}

// API Functions
export const api = {
  // Get table by ID
  async getTable(tableId: string): Promise<Table> {
    return fetchAPI<Table>(`/tables/${tableId}/`)
  },

  // Get organization by ID
  async getOrganization(organizationId: string): Promise<Organization> {
    return fetchAPI<Organization>(`/organizations/${organizationId}/`)
  },

  // Get menu items with filters
  async getMenuItems(params?: {
    category?: string
    is_available?: boolean
    search?: string
    page?: number
  }): Promise<MenuResponse> {
    const searchParams = new URLSearchParams()
    
    if (params?.category) searchParams.append('category', params.category)
    if (params?.is_available !== undefined) searchParams.append('is_available', String(params.is_available))
    if (params?.search) searchParams.append('search', params.search)
    if (params?.page) searchParams.append('page', String(params.page))

    const query = searchParams.toString()
    return fetchAPI<MenuResponse>(`/menu/${query ? `?${query}` : ''}`)
  },

  // Get categories
  async getCategories(organizationId?: string): Promise<Category[]> {
    const query = organizationId ? `?organization=${organizationId}` : ''
    const response = await fetchAPI<{ results: Category[] }>(`/categories/${query}`)
    return response.results
  },

  // Create order
  async createOrder(orderData: {
    table_id: string
    items: Array<{
      menu_item_id: string
      quantity: number
      modifications?: string
    }>
    customer_note?: string
    tip_percentage: number
  }) {
    return fetchAPI('/orders/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  },

  // Get order by ID
  async getOrder(orderId: string) {
    return fetchAPI(`/orders/${orderId}/`)
  },
}

// Helper function to extract table ID from URL
export function getTableIdFromURL(): string | null {
  const path = window.location.pathname
  const segments = path.split('/').filter(Boolean)
  
  // URL format: /711efdee-e4c6-4016-92aa-4e2f351aa329
  if (segments.length > 0) {
    const tableId = segments[0]
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (uuidRegex.test(tableId)) {
      return tableId
    }
  }
  
  return null
}

// Cache helper
const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T
  }
  cache.delete(key)
  return null
}

export function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() })
}
