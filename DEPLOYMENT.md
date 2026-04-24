# 🚀 Deployment Guide - Dastyor

Bu qo'llanma loyihani Vercel'ga deploy qilish bo'yicha batafsil yo'riqnoma.

## 📋 Deployment oldidan tekshirish

Deploy qilishdan oldin quyidagilarni tekshiring:

```bash
# 1. Dependencylarni o'rnatish
npm install

# 2. Type checking
npm run type-check

# 3. Production build
npm run build

# 4. Build natijasini test qilish
npm run preview
```

## 🌐 Vercel'ga Deploy qilish

### Usul 1: Vercel Dashboard orqali (Tavsiya etiladi)

1. **GitHub'ga push qiling**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel'ga kiring**
   - [vercel.com](https://vercel.com) saytiga kiring
   - GitHub akkauntingiz bilan login qiling

3. **Loyihani import qiling**
   - "Add New Project" tugmasini bosing
   - GitHub repository'ni tanlang
   - "Import" tugmasini bosing

4. **Sozlamalar (avtomatik aniqlangan)**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Deploy qiling**
   - "Deploy" tugmasini bosing
   - 2-3 daqiqada deploy tugaydi

### Usul 2: Vercel CLI orqali

```bash
# 1. Vercel CLI o'rnatish
npm i -g vercel

# 2. Login qilish
vercel login

# 3. Birinchi deploy (test)
vercel

# 4. Production'ga deploy
vercel --prod
```

## ⚙️ Environment Variables

Vercel dashboard'da environment variables qo'shish:

1. Project Settings > Environment Variables
2. Quyidagi o'zgaruvchilarni qo'shing:

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Dastyor
VITE_ENABLE_ANALYTICS=true
```

## 🔄 Avtomatik Deploy

GitHub bilan integratsiya qilingan bo'lsa:

- ✅ `main` branchga push qilsangiz avtomatik production'ga deploy bo'ladi
- ✅ Boshqa branchlarga push qilsangiz preview deploy yaratiladi
- ✅ Pull Request ochsangiz preview URL yaratiladi

## 📱 Custom Domain

1. Vercel dashboard'da "Domains" bo'limiga o'ting
2. "Add Domain" tugmasini bosing
3. Domeningizni kiriting (masalan: `dastyor.uz`)
4. DNS sozlamalarini yangilang:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔒 HTTPS

Vercel avtomatik ravishda:
- ✅ SSL sertifikat beradi (Let's Encrypt)
- ✅ HTTPS'ni yoqadi
- ✅ HTTP'dan HTTPS'ga redirect qiladi

## 📊 Performance Optimization

Vercel'da avtomatik optimizatsiyalar:

- ✅ **Edge Network** - Global CDN
- ✅ **Image Optimization** - Avtomatik rasm optimizatsiyasi
- ✅ **Compression** - Gzip/Brotli
- ✅ **Caching** - Smart caching strategiyasi

## 🐛 Troubleshooting

### 404 Error (Routing muammosi)

Agar routing ishlamasa, `vercel.json` faylini tekshiring:

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

### Build Error

```bash
# Local'da build qilib ko'ring
npm run build

# Agar xato bo'lsa, loglarni o'qing
# Vercel dashboard'da "Deployments" > "Build Logs"
```

### Environment Variables ishlamayapti

- Vercel'da o'zgaruvchilar `VITE_` bilan boshlanishi kerak
- Deploy qilgandan keyin yangi o'zgaruvchilar uchun redeploy qiling

## 📈 Monitoring

Vercel Analytics'ni yoqish:

1. Project Settings > Analytics
2. "Enable Analytics" tugmasini bosing
3. Bepul plan: 100k requests/month

## 🔄 Rollback

Agar yangi deploy'da muammo bo'lsa:

1. Vercel dashboard > Deployments
2. Oldingi muvaffaqiyatli deploy'ni toping
3. "..." > "Promote to Production"

## 📝 Deployment Checklist

Deploy qilishdan oldin:

- [ ] `npm run build` muvaffaqiyatli ishlaydi
- [ ] `npm run preview` local'da to'g'ri ishlaydi
- [ ] Environment variables sozlangan
- [ ] `vercel.json` fayli mavjud
- [ ] `.vercelignore` fayli mavjud
- [ ] Git'da barcha o'zgarishlar commit qilingan
- [ ] README.md yangilangan

## 🎉 Deploy muvaffaqiyatli!

Deploy tugagandan keyin:

1. ✅ Production URL'ni oching
2. ✅ Barcha sahifalarni tekshiring
3. ✅ Mobile'da test qiling
4. ✅ Performance'ni tekshiring (Lighthouse)

---

**Muammolar bo'lsa:** [Vercel Documentation](https://vercel.com/docs)
