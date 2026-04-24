# 🔌 API Integration Guide

Bu qo'llanma backend API bilan integratsiya bo'yicha ma'lumot beradi.

## 📡 API Endpoints

Base URL: `https://dastyormenu-backend-production.up.railway.app/api`

### 1. Get Menu Items
```
GET /menu/
```

**Query Parameters:**
- `category` (string, optional) - Category ID
- `is_available` (boolean, optional) - Filter by availability
- `search` (string, optional) - Search term
- `page` (integer, optional) - Page number

**Response:**
```json
{
  "count": 10,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "550f7ce-f4d7-4f31-9e5c-d05dd58b28f",
      "name": "Osh",
      "description": "Klassik taomlari",
      "price": 25000,
      "category_id": "cat-123",
      "image_url": "https://...",
      "is_available": true,
      "cook_time_minutes": 15,
      "ingredients": "Guruch, go'sht, sabzi"
    }
  ]
}
```

### 2. Get Table by ID
```
GET /tables/{id}/
```

**Path Parameters:**
- `id` (string, required) - Table UUID

**Response:**
```json
{
  "id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
  "organization_id": "33be3b97-f882-4399-888e-de18ffd8398e",
  "table_number": 5,
  "qr_code_image": "https://...",
  "qr_code_url": "https://...",
  "assigned_waiter": null,
  "waiter_name": null
}
```

### 3. Get Organization
```
GET /organizations/{id}/
```

**Response:**
```json
{
  "id": "33be3b97-f882-4399-888e-de18ffd8398e",
  "name": "Dastyor Restaurant",
  "logo_url": "https://...",
  "address": "Toshkent, Amir Temur ko'chasi",
  "phone": "+998901234567"
}
```

### 4. Get Categories
```
GET /categories/
```

**Query Parameters:**
- `organization` (string, optional) - Organization ID

**Response:**
```json
{
  "results": [
    {
      "id": "cat-123",
      "name": "Milliy taomlar",
      "icon": "🍲",
      "organization_id": "org-123"
    }
  ]
}
```

### 5. Create Order
```
POST /orders/
```

**Request Body:**
```json
{
  "table_id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
  "items": [
    {
      "menu_item_id": "550f7ce-f4d7-4f31-9e5c-d05dd58b28f",
      "quantity": 2,
      "modifications": "Achchiq qo'shmasangiz"
    }
  ],
  "customer_note": "Tezroq keltiring",
  "tip_percentage": 10
}
```

**Response:**
```json
{
  "id": "order-uuid",
  "table_id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
  "status": "pending",
  "total_amount": 50000,
  "tip_percentage": 10,
  "customer_note": "Tezroq keltiring",
  "created_at": "2025-04-24T10:30:00Z"
}
```

### 6. Get Order
```
GET /orders/{id}/
```

**Response:**
```json
{
  "id": "order-uuid",
  "table_id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
  "status": "cooking",
  "total_amount": 50000,
  "tip_percentage": 10,
  "customer_note": "Tezroq keltiring",
  "created_at": "2025-04-24T10:30:00Z",
  "updated_at": "2025-04-24T10:35:00Z"
}
```

## 🔄 Order Status Flow

```
pending → cooking → ready → completed
```

- **pending**: Buyurtma qabul qilindi
- **cooking**: Tayyorlanmoqda
- **ready**: Tayyor, ofitsiant olib keladi
- **completed**: Yetkazildi

## 🔐 Authentication

Hozircha authentication talab qilinmaydi. Kelajakda Bearer token qo'shilishi mumkin.

## 🚀 Usage in Code

### Initialize API Service

```typescript
import { api } from './services/api'

// Get table info
const table = await api.getTable('711efdee-e4c6-4016-92aa-4e2f351aa329')

// Get menu items
const menu = await api.getMenuItems({ is_available: true })

// Create order
const order = await api.createOrder({
  table_id: '711efdee-e4c6-4016-92aa-4e2f351aa329',
  items: [
    { menu_item_id: 'item-123', quantity: 2 }
  ],
  tip_percentage: 10
})
```

### URL Structure

QR kod skanerlanganda ochilgan URL:
```
https://dastyormenu-client.vercel.app/711efdee-e4c6-4016-92aa-4e2f351aa329
```

Format: `/{table_id}`

### Extract Table ID

```typescript
import { getTableIdFromURL } from './services/api'

const tableId = getTableIdFromURL()
// Returns: "711efdee-e4c6-4016-92aa-4e2f351aa329"
```

## 🔧 Environment Variables

`.env` faylida:

```env
VITE_API_URL=https://dastyormenu-backend-production.up.railway.app/api
```

## ⚠️ Error Handling

API xatolarini handle qilish:

```typescript
try {
  const data = await api.getTable(tableId)
} catch (error) {
  if (error instanceof APIError) {
    console.error('API Error:', error.status, error.message)
  } else {
    console.error('Network Error:', error)
  }
}
```

## 📊 Caching

API responses 5 daqiqa davomida cache qilinadi:

```typescript
import { getCached, setCache } from './services/api'

// Check cache
const cached = getCached<MenuItem[]>('menu-items')
if (cached) {
  return cached
}

// Fetch and cache
const data = await api.getMenuItems()
setCache('menu-items', data)
```

## 🔄 Polling

Order statusini har 10 sekundda yangilash:

```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    const order = await api.getOrder(orderId)
    setOrder(order)
  }, 10000)

  return () => clearInterval(interval)
}, [orderId])
```

## 🧪 Testing

API'ni test qilish uchun:

```bash
# Get menu items
curl https://dastyormenu-backend-production.up.railway.app/api/menu/

# Get table
curl https://dastyormenu-backend-production.up.railway.app/api/tables/711efdee-e4c6-4016-92aa-4e2f351aa329/
```

## 📝 Notes

- Barcha narxlar **tiyin**da (1 so'm = 100 tiyin)
- UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Vaqt formati: ISO 8601 (`2025-04-24T10:30:00Z`)
- Rasmlar: To'liq URL qaytariladi

## 🐛 Common Issues

### 404 Not Found
- Table ID noto'g'ri yoki mavjud emas
- UUID formatini tekshiring

### Network Error
- Internet aloqasini tekshiring
- API server ishlab turganini tekshiring

### CORS Error
- Backend CORS sozlamalari to'g'ri ekanligini tekshiring
- Vercel domain whitelist'da bo'lishi kerak

---

**API Documentation:** Contact backend team for full API docs
