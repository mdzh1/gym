// ============================================
// ملف الإعدادات - Discord Webhook
// ============================================

// ⚠️ تحذير أمني مهم:
// لا تضع رابط الـ Webhook مباشرة في الكود عند النشر على GitHub أو أي منصة عامة
// يفضل استخدام:
// 1. متغيرات البيئة (Environment Variables)
// 2. Backend بسيط أو Serverless Function
// 3. ملف .gitignore لإخفاء هذا الملف

// رابط Discord Webhook
// للحصول على الرابط:
// 1. افتح Discord
// 2. اذهب إلى إعدادات القناة (Channel Settings)
// 3. اختر Integrations
// 4. اضغط على Create Webhook
// 5. انسخ رابط الـ Webhook وضعه هنا

// ⚠️ الرابط الحقيقي موجود في ملف .env (محمي)
// إذا لم يكن ملف .env موجوداً، سيتم استخدام القيمة الافتراضية
// ملف load-env.js يتم تحميله أولاً في index.html لقراءة .env

// التحقق من وجود المتغير من .env أو استخدام القيمة الافتراضية
if (typeof window !== 'undefined' && window.DISCORD_WEBHOOK_URL) {
    var DISCORD_WEBHOOK_URL = window.DISCORD_WEBHOOK_URL;
} else if (typeof DISCORD_WEBHOOK_URL === 'undefined' || !DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === '') {
    var DISCORD_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
}

// مثال على الرابط:
// const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz';

// ملاحظة: استبدل 'YOUR_WEBHOOK_URL_HERE' برابط الـ Webhook الفعلي الخاص بك

