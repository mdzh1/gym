// ============================================
// تحميل متغيرات البيئة
// ============================================

(function() {
    // محاولة الحصول على المتغيرات من Vercel Serverless Function أولاً
    async function loadFromVercel() {
        try {
            const response = await fetch('/api/env');
            if (response.ok) {
                const data = await response.json();
                if (data.DISCORD_WEBHOOK_URL && data.DISCORD_WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
                    window.DISCORD_WEBHOOK_URL = data.DISCORD_WEBHOOK_URL;
                    console.log('✅ تم تحميل رابط Discord Webhook من Vercel Environment Variables');
                    window.envReady = true;
                    return true;
                }
            }
        } catch (error) {
            // Serverless Function غير متاح (تطوير محلي)
            console.log('ℹ️ Vercel API غير متاح - سيتم استخدام ملف env-config.js');
        }
        return false;
    }
    
    // محاولة تحميل من ملف env-config.js (يتم إنشاؤه من .env)
    function loadFromConfigFile() {
        try {
            // هذا الملف يتم إنشاؤه تلقائياً من .env
            if (typeof window.ENV_CONFIG !== 'undefined' && window.ENV_CONFIG.DISCORD_WEBHOOK_URL) {
                window.DISCORD_WEBHOOK_URL = window.ENV_CONFIG.DISCORD_WEBHOOK_URL;
                console.log('✅ تم تحميل رابط Discord Webhook من env-config.js');
                window.envReady = true;
                return true;
            }
        } catch (error) {
            console.log('ℹ️ ملف env-config.js غير موجود');
        }
        return false;
    }
    
    // تهيئة القيمة الافتراضية
    function setDefault() {
        window.DISCORD_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
        window.envReady = true;
        console.warn('⚠️ لم يتم العثور على رابط Discord Webhook');
        console.warn('📝 للتطوير المحلي: أنشئ ملف .env ثم شغّل: node create-env-config.js');
        console.warn('📝 للنشر على Vercel: أضف Environment Variable: DISCORD_WEBHOOK_URL');
    }
    
    // محاولة التحميل بالترتيب
    async function init() {
        // 1. محاولة من Vercel API
        const fromVercel = await loadFromVercel();
        if (fromVercel) return;
        
        // 2. محاولة من env-config.js
        const fromConfig = loadFromConfigFile();
        if (fromConfig) return;
        
        // 3. استخدام القيمة الافتراضية
        setDefault();
    }
    
    // بدء التهيئة
    init();
})();
