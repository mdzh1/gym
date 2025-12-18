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

// دالة لتهيئة DISCORD_WEBHOOK_URL بعد تحميل .env
function initDiscordWebhook() {
    // التحقق من وجود المتغير من .env
    if (typeof window !== 'undefined' && window.DISCORD_WEBHOOK_URL && window.DISCORD_WEBHOOK_URL !== '') {
        window.DISCORD_WEBHOOK_URL = window.DISCORD_WEBHOOK_URL;
        console.log('✅ تم استخدام رابط Discord Webhook من ملف .env');
    } else {
        // استخدام القيمة الافتراضية
        window.DISCORD_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
        console.warn('⚠️ لم يتم العثور على رابط Discord Webhook في ملف .env');
        console.warn('يرجى إنشاء ملف .env وإضافة DISCORD_WEBHOOK_URL');
    }
    
    // لا حاجة لتعريف متغير عام - سيتم استخدام window.DISCORD_WEBHOOK_URL مباشرة
}

// انتظار تحميل .env أو التهيئة مباشرة إذا كان محملاً بالفعل
if (typeof window !== 'undefined') {
    if (window.envLoaded) {
        // .env تم تحميله بالفعل
        initDiscordWebhook();
    } else {
        // انتظار تحميل .env
        window.addEventListener('envLoaded', function() {
            initDiscordWebhook();
        });
        
        // في حالة فشل التحميل أو التأخير، انتظر قليلاً ثم تهيئة
        setTimeout(function() {
            if (!window.envLoaded) {
                console.warn('⏱️ انتهى وقت انتظار تحميل .env، سيتم استخدام القيمة الافتراضية');
                window.envLoaded = true;
                initDiscordWebhook();
            }
        }, 500);
        
        // تهيئة فورية كقيمة افتراضية (في حالة عدم وجود .env)
        initDiscordWebhook();
    }
} else {
    // في حالة عدم وجود window (Node.js مثلاً)
    // لا حاجة لتعريف متغير - سيتم استخدام window.DISCORD_WEBHOOK_URL
}

// مثال على الرابط:
// const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1234567890/abcdefghijklmnopqrstuvwxyz';

// ملاحظة: استبدل 'YOUR_WEBHOOK_URL_HERE' برابط الـ Webhook الفعلي الخاص بك

