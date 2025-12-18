// ============================================
// إنشاء ملف env-config.js من .env
// استخدم: node create-env-config.js
// ============================================

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const outputPath = path.join(__dirname, 'env-config.js');

try {
    // قراءة ملف .env
    if (!fs.existsSync(envPath)) {
        console.error('❌ ملف .env غير موجود!');
        console.log('📝 أنشئ ملف .env أولاً وأضف:');
        console.log('   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...');
        process.exit(1);
    }
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    const config = {};
    
    lines.forEach(line => {
        const trimmed = line.trim();
        
        // تجاهل التعليقات والأسطر الفارغة
        if (!trimmed || trimmed.startsWith('#')) {
            return;
        }
        
        // تقسيم السطر إلى key و value
        const equalIndex = trimmed.indexOf('=');
        if (equalIndex === -1) {
            return;
        }
        
        const key = trimmed.substring(0, equalIndex).trim();
        let value = trimmed.substring(equalIndex + 1).trim();
        
        // إزالة علامات الاقتباس
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        
        config[key] = value;
    });
    
    // التحقق من وجود DISCORD_WEBHOOK_URL
    if (!config.DISCORD_WEBHOOK_URL) {
        console.error('❌ DISCORD_WEBHOOK_URL غير موجود في ملف .env!');
        process.exit(1);
    }
    
    // إنشاء ملف env-config.js
    const jsContent = `// ============================================
// ملف الإعدادات - تم إنشاؤه تلقائياً من .env
// ⚠️ هذا الملف محمي ولا يتم رفعه على GitHub
// ============================================

window.ENV_CONFIG = ${JSON.stringify(config, null, 2)};
`;
    
    fs.writeFileSync(outputPath, jsContent, 'utf8');
    
    console.log('✅ تم إنشاء ملف env-config.js بنجاح!');
    console.log('📝 يمكنك الآن فتح index.html في المتصفح');
    
} catch (error) {
    console.error('❌ خطأ في إنشاء ملف env-config.js:', error.message);
    process.exit(1);
}

