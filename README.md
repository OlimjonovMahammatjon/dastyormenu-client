# Dastyor - Restaurant Menu PWA 🍽️

Modern va interaktiv restoran menyu ilovasi. QR kod orqali mijozlar menyuni ko'rishlari, buyurtma berishlari va buyurtma holatini kuzatishlari mumkin.

## ✨ Xususiyatlar

- 📱 **PWA (Progressive Web App)** - Mobil qurilmalarda ilova kabi ishlaydi
- 🎨 **Zamonaviy UI/UX** - Shadcn/ui va Tailwind CSS bilan qurilgan
- ♿ **Accessibility** - WCAG standartlariga mos
- 🌙 **Dark Mode** - Yorug' va qorong'u rejim
- 🛒 **Savat boshqaruvi** - Zustand bilan state management
- 📊 **Buyurtma kuzatuvi** - Real-time status updates
- 🎯 **Responsive Design** - Barcha qurilmalarda mukammal ko'rinish
- ⚡ **Tez yuklash** - Vite build tool bilan optimallashtirilgan
- 🔌 **API Integration** - Backend bilan to'liq integratsiya
- 📱 **QR Code Support** - QR kod orqali to'g'ridan-to'g'ri stol menyusiga kirish

## 🚀 Ishga tushirish

### Talablar

- Node.js 18+ 
- npm yoki pnpm

### O'rnatish

```bash
# Dependencylarni o'rnatish
npm install

# Environment variables sozlash
cp .env.example .env
# .env faylida VITE_API_URL ni sozlang

# Development serverini ishga tushirish
npm run dev

# Production build
npm run build

# Build natijasini ko'rish
npm run preview
```

## 🔌 API Integration

Loyiha backend API bilan to'liq integratsiyalangan.

### URL Structure

QR kod skanerlanganda:
```
https://dastyormenu-client.vercel.app/711efdee-e4c6-4016-92aa-4e2f351aa329
```

Bu yerda `711efdee-e4c6-4016-92aa-4e2f351aa329` - table ID (UUID format)

### API Endpoints

- `GET /menu/` - Menyu elementlarini olish
- `GET /tables/{id}/` - Stol ma'lumotlarini olish
- `GET /organizations/{id}/` - Restoran ma'lumotlarini olish
- `GET /categories/` - Kategoriyalarni olish
- `POST /orders/` - Buyurtma yaratish
- `GET /orders/{id}/` - Buyurtma holatini olish

Batafsil ma'lumot uchun: [API_INTEGRATION.md](./API_INTEGRATION.md)

## 📦 Vercel'ga deploy qilish

### 1-usul: Vercel CLI orqali

```bash
# Vercel CLI o'rnatish
npm i -g vercel

# Deploy qilish
vercel

# Production'ga deploy
vercel --prod
```

### 2-usul: GitHub orqali

1. Loyihani GitHub'ga push qiling
2. [Vercel](https://vercel.com)'ga kiring
3. "Import Project" tugmasini bosing
4. GitHub repository'ni tanlang
5. Deploy tugmasini bosing

### Muhim: Vercel konfiguratsiyasi

`vercel.json` fayli allaqachon sozlangan va quyidagilarni ta'minlaydi:

- ✅ SPA routing (barcha yo'llar index.html'ga yo'naltiriladi)
- ✅ 404 sahifasi to'g'ri ishlaydi
- ✅ Assets uchun cache optimization
- ✅ Direct URL access ishlaydi

## 🏗️ Loyiha strukturasi

```
src/
├── app/
│   ├── components/
│   │   ├── cart/          # Savat komponentlari
│   │   ├── menu/          # Menyu komponentlari
│   │   ├── order/         # Buyurtma kuzatuvi
│   │   └── ui/            # Shadcn/ui komponentlari
│   ├── pages/
│   │   ├── MenuPage.tsx   # Asosiy menyu sahifasi
│   │   ├── TrackingPage.tsx # Buyurtma kuzatuvi
│   │   └── NotFoundPage.tsx # 404 sahifasi
│   └── App.tsx
├── data/
│   └── mockData.ts        # Mock ma'lumotlar
├── lib/
│   └── utils.ts           # Utility funksiyalar
├── store/
│   └── cartStore.ts       # Zustand store
├── styles/
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css          # CSS variables
└── types/
    └── index.ts           # TypeScript types
```

## 🎨 Texnologiyalar

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - UI components
- **Zustand** - State management
- **React Router v7** - Routing
- **Motion** - Animations
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 🔧 Konfiguratsiya

### Environment Variables

`.env` faylida quyidagi o'zgaruvchilarni sozlash mumkin:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Dastyor
```

### Theme Customization

`src/styles/theme.css` faylida ranglar va o'lchamlarni sozlash mumkin:

```css
:root {
  --gold: #FFB800;
  --bg: #0A0A0A;
  --surface: #1A1A1A;
  --text: #FFFFFF;
  /* ... */
}
```

## 📱 PWA Sozlamalari

PWA funksiyalarini yoqish uchun:

1. `manifest.json` faylini yarating
2. Service Worker qo'shing
3. `index.html`da manifest'ni ulang

## 🐛 Debugging

```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Format code
npm run format
```

## 📄 Litsenziya

Bu loyiha Figma dizaynidan olingan: [Client Menu PWA](https://www.figma.com/design/644Fry4dXIqIurVCUpWdlj/Client-Menu-PWA)

## 🤝 Hissa qo'shish

Pull requestlar qabul qilinadi! Katta o'zgarishlar uchun avval issue oching.

## 📞 Aloqa

Savollar yoki takliflar bo'lsa, issue oching yoki pull request yuboring.

---

**Yoqimli ishtaha!** 🍽️✨