# 🔴 Backend Muammolari va Yechimlar

## Hozirgi Muammolar

### 1. CORS Error ❌
```
Access to fetch at 'https://dastyormenu-backend-production.up.railway.app/api/orders/' 
from origin 'https://dastyormenu-client.vercel.app' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Sabab:** Backend CORS sozlamalari noto'g'ri yoki yo'q.

**Yechim (Backend):**
```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "https://dastyormenu-client.vercel.app",
    "http://localhost:5173",  # Development
]

# Yoki barcha originlarga ruxsat berish (faqat development uchun)
CORS_ALLOW_ALL_ORIGINS = True

# CORS middleware qo'shish
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Eng yuqorida
    'django.middleware.common.CommonMiddleware',
    ...
]
```

### 2. 502 Bad Gateway ❌
```
POST https://dastyormenu-backend-production.up.railway.app/api/orders/ 
net::ERR_FAILED 502 (Bad Gateway)
```

**Sabab:** 
- Backend server ishlamayapti
- Railway.app server restart bo'lmoqda
- Backend kodda xato

**Yechim:**
1. Railway.app dashboard'ni tekshiring
2. Backend logs'ni ko'ring
3. Server restart qiling
4. Environment variables to'g'ri sozlanganini tekshiring

---

## Buyurtma Berish API

### Endpoint
```
POST /api/orders/
```

### Request Format (To'g'ri)
```json
{
  "qr_code_id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
  "customer_note": "",
  "tip_percentage": 0,
  "items": [
    {
      "menu_item_id": "550f7ce-f4d7-4f31-9e5c-d05dd58b28f",
      "quantity": 2,
      "modifications": "",
      "item_status": "pending"
    }
  ]
}
```

### Required Fields
- ✅ `qr_code_id` (string, UUID) - **REQUIRED**
- ✅ `customer_note` (string) - Bo'sh string bo'lishi mumkin
- ✅ `tip_percentage` (number) - 0 bo'lishi mumkin
- ✅ `items` (array) - Kamida 1 ta item
  - ✅ `menu_item_id` (string, UUID)
  - ✅ `quantity` (number)
  - ✅ `modifications` (string) - Bo'sh string bo'lishi mumkin
  - ✅ `item_status` (string) - "pending"

---

## Backend Team uchun Checklist

### CORS Sozlamalari
- [ ] `django-cors-headers` o'rnatilgan
- [ ] `CORS_ALLOWED_ORIGINS` sozlangan
- [ ] Vercel domain whitelist'da
- [ ] Middleware to'g'ri tartibda

### API Endpoint
- [ ] `/api/orders/` POST method ishlayapti
- [ ] Validation to'g'ri
- [ ] Error messages aniq
- [ ] Response format to'g'ri

### Server
- [ ] Railway.app server running
- [ ] Environment variables to'g'ri
- [ ] Database connection ishlayapti
- [ ] Logs tekshirilgan

---

## Frontend Error Handling

Frontend quyidagi xatolarni handle qiladi:

1. **CORS Error** - "Backend server bilan bog'lanishda muammo"
2. **502 Bad Gateway** - "Server vaqtincha ishlamayapti"
3. **503 Service Unavailable** - "Server texnik xizmat ko'rsatilmoqda"
4. **Network Error** - "Internet aloqasini tekshiring"
5. **Validation Error** - Backend'dan kelgan aniq xato

---

## Test Qilish

### cURL bilan test
```bash
curl -X POST https://dastyormenu-backend-production.up.railway.app/api/orders/ \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "qr_code_id": "711efdee-e4c6-4016-92aa-4e2f351aa329",
    "customer_note": "Test order",
    "tip_percentage": 0,
    "items": [
      {
        "menu_item_id": "550f7ce-f4d7-4f31-9e5c-d05dd58b28f",
        "quantity": 1,
        "modifications": "",
        "item_status": "pending"
      }
    ]
  }'
```

### Postman bilan test
1. Method: POST
2. URL: `https://dastyormenu-backend-production.up.railway.app/api/orders/`
3. Headers:
   - `Content-Type: application/json`
   - `Accept: application/json`
4. Body: Raw JSON (yuqoridagi format)

---

## Aloqa

Agar muammolar davom etsa:
1. Backend logs'ni tekshiring
2. Railway.app dashboard'ni ko'ring
3. CORS sozlamalarini qayta tekshiring
4. Frontend console'dagi to'liq xatoni yuboring

---

**Oxirgi yangilanish:** 2024
**Status:** ❌ CORS va 502 muammolari hal qilinishi kerak
