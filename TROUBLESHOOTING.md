# 🔧 Troubleshooting Guide

Bu qo'llanma loyihada uchraydigan muammolarni hal qilish uchun.

## 🔴 401 Unauthorized Error

### Sabab
API Bearer token noto'g'ri, muddati o'tgan yoki yo'q.

### Yechim

1. **Token'ni tekshiring**
   ```bash
   # .env faylini oching
   cat .env
   
   # VITE_API_TOKEN mavjudligini tekshiring
   ```

2. **Backend'dan yangi token oling**
   - Backend admin panel'ga kiring
   - Yangi access token yarating
   - Token'ni `.env` faylga qo'shing

3. **Token formatini tekshiring**
   Token quyidagi formatda bo'lishi kerak:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIi...
   ```

4. **Rebuild qiling**
   ```bash
   npm run build
   ```

5. **Vercel'da environment variable'ni yangilang**
   - Vercel dashboard > Settings > Environment Variables
   - `VITE_API_TOKEN` ni yangilang
   - Redeploy qiling

### Debug

Development mode'da console'ni oching (F12):
```javascript
// Token mavjudligini tekshiring
console.log('Has token:', !!import.meta.env.VITE_API_TOKEN)

// Token preview
console.log('Token preview:', import.meta.env.VITE_API_TOKEN?.substring(0, 20))
```

## 🔴 404 Not Found Error

### Sabab
Table ID noto'g'ri yoki mavjud emas.

### Yechim

1. **URL'ni tekshiring**
   ```
   ✅ To'g'ri: https://dastyormenu-client.vercel.app/711efdee-e4c6-4016-92aa-4e2f351aa329
   ❌ Noto'g'ri: https://dastyormenu-client.vercel.app/invalid-id
   ```

2. **UUID formatini tekshiring**
   - 8-4-4-4-12 format (36 belgi)
   - Faqat raqamlar va harflar (a-f)
   - Kichik harflar

3. **QR kodni qayta skanerlang**
   - QR kod to'g'ri yaratilganligini tekshiring
   - Backend'da table mavjudligini tekshiring

4. **Backend'da table'ni tekshiring**
   ```bash
   curl -X GET \
     "https://dastyormenu-backend-production.up.railway.app/api/tables/711efdee-e4c6-4016-92aa-4e2f351aa329/" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

## 🔴 Network Error

### Sabab
Internet aloqasi yo'q yoki API server ishlamayapti.

### Yechim

1. **Internet aloqasini tekshiring**
   ```bash
   ping google.com
   ```

2. **API server statusini tekshiring**
   ```bash
   curl https://dastyormenu-backend-production.up.railway.app/api/
   ```

3. **CORS muammosini tekshiring**
   - Browser console'da CORS xatosi bormi?
   - Backend CORS sozlamalari to'g'rimi?

4. **Firewall/VPN**
   - VPN yoqilganmi?
   - Firewall API'ni bloklayaptimi?

## 🔴 Loading Stuck (Yuklanish to'xtab qoldi)

### Sabab
API juda sekin yoki timeout.

### Yechim

1. **Network tab'ni tekshiring**
   - F12 > Network
   - Qaysi request sekin?
   - Status code nima?

2. **Cache'ni tozalang**
   ```bash
   # Browser cache
   Ctrl+Shift+Delete
   
   # localStorage
   localStorage.clear()
   ```

3. **Timeout qo'shing**
   `src/services/api.ts` faylida:
   ```typescript
   const controller = new AbortController()
   const timeoutId = setTimeout(() => controller.abort(), 10000)
   
   fetch(url, {
     signal: controller.signal,
     ...options
   })
   ```

## 🔴 Empty Menu (Menyu bo'sh)

### Sabab
Menu items API'dan kelmayapti yoki filter noto'g'ri.

### Yechim

1. **API response'ni tekshiring**
   ```bash
   curl -X GET \
     "https://dastyormenu-backend-production.up.railway.app/api/menu/" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Filter'ni olib tashlang**
   ```typescript
   // is_available filter'siz
   const menuData = await api.getMenuItems()
   ```

3. **Backend'da menu items mavjudligini tekshiring**

4. **Console log'larni tekshiring**
   ```javascript
   console.log('Menu items:', menuData.results)
   ```

## 🔴 Images Not Loading

### Sabab
Image URL noto'g'ri yoki CORS muammosi.

### Yechim

1. **Image URL'ni tekshiring**
   - URL to'liq formatdami?
   - HTTPS protokolimi?

2. **CORS headers**
   Backend image server'da CORS yoqilganligini tekshiring

3. **Fallback emoji**
   Loyihada allaqachon fallback bor:
   ```typescript
   <ImageWithFallback src={url} fallback="🍽️" />
   ```

## 🔴 Order Not Creating

### Sabab
Order API'ga yuborilmayapti yoki validation xatosi.

### Yechim

1. **Request body'ni tekshiring**
   ```javascript
   console.log('Order data:', orderData)
   ```

2. **Required fields**
   - `table_id` (required)
   - `items` (required, array)
   - `tip_percentage` (required, number)

3. **Item structure**
   ```typescript
   {
     menu_item_id: "uuid",
     quantity: 1,
     modifications: "optional"
   }
   ```

4. **API response'ni tekshiring**
   ```javascript
   try {
     const order = await api.createOrder(orderData)
     console.log('Order created:', order)
   } catch (err) {
     console.error('Order error:', err)
   }
   ```

## 🔴 Vercel Deployment Issues

### Build Error

```bash
# Local'da build qiling
npm run build

# Xatolarni ko'ring
npm run type-check
```

### Environment Variables

1. Vercel dashboard > Settings > Environment Variables
2. Barcha `VITE_*` o'zgaruvchilarni qo'shing
3. Production, Preview, Development uchun alohida sozlang
4. Redeploy qiling

### Routing 404

`vercel.json` faylini tekshiring:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📊 Debug Mode

Development mode'da qo'shimcha log'lar:

```typescript
// src/services/api.ts
const DEBUG = import.meta.env.DEV

if (DEBUG) {
  console.log('🔵 API Request:', { url, method })
  console.log('🟢 API Response:', { status, data })
  console.error('🔴 API Error:', error)
}
```

Console'da ko'rish:
- 🔵 = Request
- 🟢 = Success
- 🔴 = Error
- ✅ = Data loaded
- ❌ = Failed

## 🆘 Yordam kerakmi?

1. **Console log'larni yuboring**
   - F12 > Console
   - Screenshot oling

2. **Network tab**
   - F12 > Network
   - Failed request'ni toping
   - Response'ni ko'ring

3. **Error message**
   - To'liq error message
   - Stack trace

4. **Environment**
   - Browser (Chrome, Safari, etc.)
   - OS (Windows, Mac, Linux)
   - URL

---

**Yana muammo bo'lsa:** GitHub Issues'da yangi issue oching
