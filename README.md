# Next.js Chat App with Supabase

تطبيق محادثة مطور بـ Next.js مع Supabase.

## المميزات

- تسجيل دخول وإنشاء حساب جديد
- محادثة مباشرة (real-time)
- API Routes للتفاعل مع قاعدة البيانات
- واجهة مستخدم جميلة ومتجاوبة
- دعم اللغة العربية
- Row Level Security (RLS)
- Middleware للحماية

## التقنيات المستخدمة

- Next.js 14
- TypeScript
- Supabase Authentication
- Supabase Database (PostgreSQL)
- Supabase Realtime
- Tailwind CSS
- API Routes

## إعداد المشروع

### 1. إعداد Supabase

1. انتقل إلى [Supabase](https://supabase.com/)
2. أنشئ مشروع جديد
3. انتقل إلى Settings → API
4. انسخ Project URL و anon key و service_role key

### 2. إعداد قاعدة البيانات

1. انتقل إلى SQL Editor في Supabase
2. انسخ محتوى ملف `supabase/migrations/initial_schema.sql`
3. نفذ الاستعلام لإنشاء الجداول والسياسات

### 3. متغيرات البيئة

1. افتح ملف `.env.local`
2. استبدل القيم بإعدادات Supabase الخاصة بك:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. رفع المشروع

1. أنشئ repository جديد على GitHub
2. ارفع جميع الملفات
3. تأكد من عدم رفع `.env.local`

### 5. ربط بـ Vercel

1. انتقل إلى [Vercel](https://vercel.com)
2. اربط الـ repository
3. أضف متغيرات البيئة في إعدادات Vercel
4. انتظر البناء والنشر

## بنية المجلدات

```
├── app/
│   ├── api/
│   │   ├── messages/
│   │   │   └── route.ts
│   │   └── profiles/
│   │       └── route.ts
│   ├── chat/
│   │   └── page.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase.ts
├── supabase/
│   └── migrations/
│       └── initial_schema.sql
├── middleware.ts
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## API Routes

### Messages API
- `GET /api/messages` - جلب جميع الرسائل
- `POST /api/messages` - إرسال رسالة جديدة

### Profiles API
- `GET /api/profiles` - جلب جميع الملفات الشخصية
- `POST /api/profiles` - إنشاء ملف شخصي جديد

## الحماية والأمان

- Row Level Security (RLS) مفعل على جميع الجداول
- Middleware للحماية من الوصول غير المصرح به
- المصادقة مطلوبة لجميع العمليات الحساسة
- التحقق من الهوية في API Routes

## المميزات التقنية

- **Real-time**: المحادثة تُحدث فورياً
- **Responsive**: يعمل على جميع الأجهزة
- **Arabic Support**: دعم كامل للغة العربية
- **TypeScript**: نوع آمن
- **Modern UI**: تصميم عصري مع Tailwind CSS

## الاستخدام

1. افتح التطبيق
2. أنشئ حساب جديد أو سجل الدخول
3. ابدأ المحادثة!

## استكشاف الأخطاء

### مشاكل شائعة:

1. **خطأ في الاتصال بقاعدة البيانات:**
   - تحقق من صحة متغيرات البيئة
   - تأكد من تنفيذ SQL schema

2. **مشاكل المصادقة:**
   - تحقق من إعدادات Authentication في Supabase
   - تأكد من صحة الـ keys

3. **مشاكل Realtime:**
   - تأكد من تفعيل Realtime في Supabase
   - تحقق من Publication settings

## إعدادات Supabase الإضافية

### Authentication Settings:
1. انتقل إلى Authentication → Settings
2. فعل "Enable email confirmations" إذا أردت
3. أضف Site URL: `http://localhost:3000` للتطوير

### Database Settings:
1. تأكد من تفعيل Realtime
2. تحقق من RLS policies
3. راجع indexes للأداء الأمثل

## الدعم

في حالة وجود مشاكل، تحقق من:
- إعدادات Supabase
- متغيرات البيئة
- Console logs في المتصفح
- Supabase logs في Dashboard