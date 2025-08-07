# دليل التثبيت - تطبيق المحادثة مع Supabase

## الخطوات المطلوبة

### 1. إعداد Supabase

#### إنشاء مشروع جديد:
1. اذهب إلى [supabase.com](https://supabase.com)
2. اضغط "Start your project"
3. سجل الدخول بـ GitHub
4. اضغط "New project"
5. اختر Organization
6. أدخل:
   - **Name**: `chat-app`
   - **Database Password**: (احفظ كلمة المرور)
   - **Region**: اختر الأقرب لك
7. اضغط "Create new project"

#### الحصول على المفاتيح:
1. انتظر حتى يكتمل إنشاء المشروع
2. اذهب إلى Settings → API
3. انسخ:
   - **Project URL**
   - **anon public key**
   - **service_role secret key** (لا تشاركها مع أحد)

### 2. إعداد قاعدة البيانات

#### تنفيذ SQL Schema:
1. اذهب إلى SQL Editor
2. اضغط "New query"
3. انسخ والصق محتوى ملف `supabase/migrations/initial_schema.sql`
4. اضغط "Run" لتنفيذ الاستعلام

#### تحقق من الجداول:
1. اذهب إلى Table Editor
2. يجب أن ترى جدولين:
   - `profiles`
   - `messages`

### 3. إعداد المتغيرات

#### إنشاء ملف البيئة:
1. في جذر المشروع، أنشئ ملف `.env.local`
2. أضف المتغيرات التالية:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ هام:** استبدل القيم بمفاتيحك الفعلية من Supabase

### 4. رفع المشروع على GitHub

#### إنشاء Repository:
1. اذهب إلى [github.com](https://github.com)
2. اضغط "New repository"
3. أدخل اسم المشروع: `nextjs-chat-supabase`
4. اجعله Public أو Private
5. **لا تضف** README أو .gitignore أو license
6. اضغط "Create repository"

#### رفع الملفات:
1. حمل جميع ملفات المشروع في ملف zip
2. فك الضغط في مجلد جديد
3. في Terminal/Command Prompt:

```bash
cd path/to/your/project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/nextjs-chat-supabase.git
git push -u origin main
```

### 5. النشر على Vercel

#### ربط المشروع:
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول بـ GitHub
3. اضغط "New Project"
4. اختر repository الخاص بك
5. اضغط "Import"

#### إضافة متغيرات البيئة:
1. في صفحة Import، اذهب إلى "Environment Variables"
2. أضف المتغيرات التالية:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-project-id.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: your-anon-key-here

Name: SUPABASE_SERVICE_ROLE_KEY
Value: your-service-role-key-here
```

3. اضغط "Deploy"

### 6. إعدادات Supabase الإضافية

#### Authentication Settings:
1. في Supabase Dashboard، اذهب إلى Authentication → Settings
2. في "Site URL"، أضف:
   - `http://localhost:3000` (للتطوير)
   - `https://your-vercel-app.vercel.app` (للإنتاج)
3. في "Redirect URLs"، أضف نفس URLs

#### Database Settings:
1. اذهب إلى Database → Replication
2. تأكد من تفعيل "Realtime" للجدول `messages`

## التحقق من التثبيت

### اختبار محلي:
```bash
npm install
npm run dev
```

### اختبار الإنتاج:
1. انتقل إلى رابط Vercel الخاص بك
2. جرب إنشاء حساب جديد
3. جرب تسجيل الدخول
4. جرب إرسال رسالة

## استكشاف الأخطاء

### أخطاء شائعة:

#### "Invalid API key":
- تحقق من صحة `NEXT_PUBLIC_SUPABASE_URL`
- تحقق من صحة `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### "Table doesn't exist":
- تأكد من تنفيذ SQL schema
- تحقق من وجود الجداول في Table Editor

#### "Authentication failed":
- تحقق من إعدادات Site URL
- تأكد من تفعيل Email Authentication

#### "Realtime not working":
- تحقق من تفعيل Realtime للجدول
- راجع إعدادات Publications

### فحص Logs:
1. **Browser Console**: F12 → Console
2. **Supabase Logs**: Dashboard → Logs
3. **Vercel Logs**: Dashboard → Functions → View Logs

## المساعدة

إذا واجهت مشاكل:
1. تحقق من جميع الإعدادات المذكورة أعلاه
2. راجع Console للأخطاء
3. تأكد من تطابق أسماء الجداول والحقول
4. تحقق من صحة متغيرات البيئة