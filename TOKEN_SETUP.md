# 🔑 API Token Setup Guide

## Muammo: 401 Unauthorized

Agar 401 xatosi olsangiz, bu API authentication talab qilayotganini bildiradi.

## ✅ Yechim 1: Token'siz ishlash (Public API)

Agar API public bo'lsa (token talab qilmasa):

1. `.env` faylida token'ni comment qiling:
   ```env
   # VITE_API_TOKEN=your_token_here
   ```

2. Build qiling:
   ```bash
   npm run build
   ```

3. Test qiling:
   ```bash
   npm run dev
   ```

## 🔐 Yechim 2: Token bilan ishlash

Agar API token talab qilsa:

### 1. Backend'dan token oling

**Usul A: Login qiling**
```bash
curl -X POST \
  https://dastyormenu-backend-production.up.railway.app/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

Response:
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usul B: Backend admin'dan oling**
- Backend admin panel'ga kiring
- API tokens bo'limiga o'ting
- Yangi token yarating

### 2. Token'ni `.env` faylga qo'shing

```env
VITE_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Muhim:** 
- Token'ni to'liq ko'chiring
- Qo'shimcha bo'shliqlar qo'shmang
- Qo'shtirnoq ishlatmang

### 3. Build qiling

```bash
npm run build
```

### 4. Test qiling

```bash
npm run dev
```

Browser console'da (F12) tekshiring:
```
🔵 API Request: { hasToken: true, tokenPreview: "eyJhbGciOiJIUzI1NiIsInR5..." }
```

## 🚀 Vercel'da sozlash

### 1. Environment Variable qo'shing

1. Vercel dashboard'ga kiring
2. Project'ni tanlang
3. Settings > Environment Variables
4. Yangi variable qo'shing:
   - **Name:** `VITE_API_TOKEN`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **Environment:** Production, Preview, Development

### 2. Redeploy qiling

```bash
vercel --prod
```

yoki GitHub'ga push qiling (avtomatik deploy).

## 🔍 Token'ni tekshirish

### Browser Console'da

```javascript
// Token mavjudmi?
console.log('Has token:', !!import.meta.env.VITE_API_TOKEN)

// Token preview
console.log('Token:', import.meta.env.VITE_API_TOKEN?.substring(0, 30))
```

### cURL bilan

```bash
curl -X GET \
  "https://dastyormenu-backend-production.up.railway.app/api/tables/711efdee-e4c6-4016-92aa-4e2f351aa329/" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Agar 200 status olsangiz - token to'g'ri ✅
Agar 401 status olsangiz - token noto'g'ri ❌

## 🐛 Troubleshooting

### Token muddati o'tgan

**Belgi:** 401 error, "Token expired" message

**Yechim:** Yangi token oling (refresh token bilan yoki qayta login qiling)

### Token formati noto'g'ri

**Belgi:** 401 error, "Invalid token" message

**Yechim:** 
- Token to'liq ko'chirilganligini tekshiring
- Qo'shimcha bo'shliqlar yo'qligini tekshiring
- Token 3 qismdan iborat: `header.payload.signature`

### Token ishlamayapti

**Belgi:** 401 error, boshqa xabar yo'q

**Yechim:**
1. Backend'da token active ekanligini tekshiring
2. Token user'ning permission'lari to'g'rimi?
3. Backend CORS sozlamalari to'g'rimi?

### Environment variable yuklanmayapti

**Belgi:** `import.meta.env.VITE_API_TOKEN` undefined

**Yechim:**
1. `.env` fayli root papkada ekanligini tekshiring
2. Variable nomi `VITE_` bilan boshlanganligini tekshiring
3. Dev server'ni restart qiling: `npm run dev`
4. Build'ni qayta qiling: `npm run build`

## 📝 Best Practices

1. **Token'ni git'ga commit qilmang**
   - `.env` fayli `.gitignore`da bo'lishi kerak
   - `.env.example` faylida faqat template qoldiring

2. **Token'ni secure saqlang**
   - Environment variables'da saqlang
   - Code'da hardcode qilmang

3. **Token'ni muntazam yangilang**
   - Muddati o'tgan token'larni o'chiring
   - Yangi token yarating

4. **Har muhit uchun alohida token**
   - Development: test token
   - Production: production token
   - Staging: staging token

## 🆘 Yordam

Agar muammo hal bo'lmasa:

1. Console log'larni tekshiring (F12)
2. Network tab'da request headers'ni ko'ring
3. Backend team bilan bog'laning
4. GitHub Issues'da savol bering

---

**Eslatma:** Hozirgi holatda API token'siz ishlaydi. Agar 401 xatosi olsangiz, bu qo'llanmadan foydalaning.
