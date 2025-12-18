// ============================================
// تحميل متغيرات البيئة من ملف .env
// ============================================

// قراءة ملف .env وتحويله إلى متغيرات JavaScript
async function loadEnv() {
    try {
        const response = await fetch('.env');
        if (!response.ok) {
            console.warn('ملف .env غير موجود، سيتم استخدام القيمة الافتراضية من config.js');
            return;
        }
        
        const text = await response.text();
        const lines = text.split('\n');
        
        lines.forEach(line => {
            // تجاهل التعليقات والأسطر الفارغة
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine.startsWith('#')) {
                return;
            }
            
            // تقسيم السطر إلى key و value
            const match = trimmedLine.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                
                // إزالة علامات الاقتباس إذا كانت موجودة
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.slice(1, -1);
                }
                
                // تعيين المتغير في window (global scope)
                window[key] = value;
                
                // أيضاً تعيينه كمتغير عام
                if (typeof window[key] !== 'undefined') {
                    // إنشاء متغير عام
                    eval(`var ${key} = "${value.replace(/"/g, '\\"')}";`);
                }
            }
        });
        
        console.log('تم تحميل متغيرات البيئة من ملف .env بنجاح');
    } catch (error) {
        console.warn('خطأ في تحميل ملف .env:', error);
        console.warn('سيتم استخدام القيمة الافتراضية من config.js');
    }
}

// تحميل المتغيرات فوراً (قبل تحميل config.js)
loadEnv();

