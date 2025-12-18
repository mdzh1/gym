// ============================================
// ملف الإعدادات - Discord Webhook
// ============================================

// ⚠️ تحذير أمني مهم:
// لا تضع رابط الـ Webhook مباشرة في الكود
// استخدم ملف .env للتطوير المحلي
// استخدم Vercel Environment Variables للنشر

// هذا الملف ينتظر تحميل .env ثم يهيئ المتغيرات
(function() {
    function initConfig() {
        // انتظار تحميل .env أو Vercel env
        if (!window.envReady) {
            setTimeout(initConfig, 100);
            return;
        }
        
        // التحقق من وجود DISCORD_WEBHOOK_URL
        if (!window.DISCORD_WEBHOOK_URL || window.DISCORD_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
            console.warn('⚠️ لم يتم العثور على رابط Discord Webhook');
            console.warn('📝 للتطوير المحلي: أنشئ ملف .env وأضف:');
            console.warn('   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...');
            console.warn('📝 للنشر على Vercel: أضف Environment Variable:');
            console.warn('   DISCORD_WEBHOOK_URL في إعدادات المشروع');
        } else {
            console.log('✅ تم تهيئة رابط Discord Webhook بنجاح');
        }
    }
    
    // بدء التهيئة
    initConfig();
})();
