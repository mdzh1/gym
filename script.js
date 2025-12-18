// ============================================
// استمارة تسجيل الجيم - ملف JavaScript
// ============================================

// التحقق من وجود ملف config
if (typeof DISCORD_WEBHOOK_URL === 'undefined' || DISCORD_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE' || !DISCORD_WEBHOOK_URL) {
    console.error('خطأ: لم يتم العثور على رابط Discord Webhook. يرجى إعداد ملف .env');
    console.warn('ملاحظة: ملف .env محمي ولا يتم رفعه على GitHub');
}

// الحصول على عناصر DOM
const form = document.getElementById('gymForm');
const submitBtn = document.getElementById('submitBtn');
const alertContainer = document.getElementById('alertContainer');

// التحقق من صحة رقم الجوال (سعودي)
function validatePhone(phone) {
    const phoneRegex = /^(05|5)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// تنسيق رقم الجوال
function formatPhone(phone) {
    return phone.replace(/\s/g, '');
}

// عرض رسالة نجاح أو خطأ
function showAlert(message, type = 'success') {
    alertContainer.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}-fill me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    // إزالة الرسالة تلقائياً بعد 5 ثوان
    setTimeout(() => {
        const alert = alertContainer.querySelector('.alert');
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 5000);
}

// إظهار حالة التحميل
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
    } else {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

// إرسال البيانات إلى Discord
async function sendToDiscord(formData) {
    try {
        // إنشاء Embed للرسالة
        const embed = {
            title: "🎯 تسجيل جديد في الجيم",
            color: 0x6366f1, // لون أزرق
            fields: [
                {
                    name: "👤 الاسم الكامل",
                    value: formData.fullName,
                    inline: true
                },
                {
                    name: "📱 رقم الجوال",
                    value: formData.phone,
                    inline: true
                },
                {
                    name: "🎂 العمر",
                    value: formData.age.toString(),
                    inline: true
                },
                {
                    name: "📅 نوع الاشتراك",
                    value: formData.subscription,
                    inline: true
                },
                {
                    name: "🎯 هدف التمرين",
                    value: formData.goal,
                    inline: true
                },
                {
                    name: "💪 مدرب شخصي",
                    value: formData.personalTrainer,
                    inline: true
                }
            ],
            footer: {
                text: `تم التسجيل في ${new Date().toLocaleString('ar-SA', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}`
            },
            timestamp: new Date().toISOString()
        };

        // إرسال الطلب إلى Discord Webhook
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed],
                username: 'Gym Registration Bot',
                avatar_url: 'https://cdn-icons-png.flaticon.com/512/2344/2344107.png'
            })
        });

        if (!response.ok) {
            throw new Error(`خطأ في الإرسال: ${response.status} ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('خطأ في إرسال البيانات إلى Discord:', error);
        throw error;
    }
}

// حفظ البيانات محلياً (LocalStorage) - اختياري
function saveToLocalStorage(formData) {
    try {
        const registrations = JSON.parse(localStorage.getItem('gymRegistrations') || '[]');
        registrations.push({
            ...formData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('gymRegistrations', JSON.stringify(registrations));
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات محلياً:', error);
        return false;
    }
}

// التحقق من صحة الاستمارة
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value;
    const subscription = document.getElementById('subscription').value;
    const goal = document.getElementById('goal').value;
    const personalTrainer = document.querySelector('input[name="personalTrainer"]:checked');

    let isValid = true;

    // التحقق من الاسم
    if (!fullName || fullName.length < 3) {
        document.getElementById('fullName').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('fullName').classList.remove('is-invalid');
        document.getElementById('fullName').classList.add('is-valid');
    }

    // التحقق من رقم الجوال
    const formattedPhone = formatPhone(phone);
    if (!phone || !validatePhone(formattedPhone)) {
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('phone').classList.remove('is-invalid');
        document.getElementById('phone').classList.add('is-valid');
    }

    // التحقق من العمر
    const ageNum = parseInt(age);
    if (!age || ageNum < 16 || ageNum > 100) {
        document.getElementById('age').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('age').classList.remove('is-invalid');
        document.getElementById('age').classList.add('is-valid');
    }

    // التحقق من نوع الاشتراك
    if (!subscription) {
        document.getElementById('subscription').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('subscription').classList.remove('is-invalid');
        document.getElementById('subscription').classList.add('is-valid');
    }

    // التحقق من هدف التمرين
    if (!goal) {
        document.getElementById('goal').classList.add('is-invalid');
        isValid = false;
    } else {
        document.getElementById('goal').classList.remove('is-invalid');
        document.getElementById('goal').classList.add('is-valid');
    }

    // التحقق من مدرب شخصي
    if (!personalTrainer) {
        const trainerGroup = document.querySelector('.btn-group');
        trainerGroup.classList.add('border-danger');
        isValid = false;
    } else {
        const trainerGroup = document.querySelector('.btn-group');
        trainerGroup.classList.remove('border-danger');
    }

    return isValid;
}

// معالجة إرسال الاستمارة
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // التحقق من صحة البيانات
    if (!validateForm()) {
        showAlert('يرجى ملء جميع الحقول بشكل صحيح', 'danger');
        form.classList.add('was-validated');
        return;
    }

    // جمع البيانات
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        phone: formatPhone(document.getElementById('phone').value.trim()),
        age: parseInt(document.getElementById('age').value),
        subscription: document.getElementById('subscription').value,
        goal: document.getElementById('goal').value,
        personalTrainer: document.querySelector('input[name="personalTrainer"]:checked').value
    };

    // تفعيل حالة التحميل
    setLoading(true);

    try {
        // التحقق من وجود Webhook URL
        if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
            throw new Error('يرجى إعداد رابط Discord Webhook في ملف config.js');
        }

        // إرسال البيانات إلى Discord
        await sendToDiscord(formData);

        // حفظ البيانات محلياً
        saveToLocalStorage(formData);

        // عرض رسالة النجاح
        showAlert('تم إرسال التسجيل بنجاح! سيتم التواصل معك قريباً.', 'success');

        // إعادة تعيين الاستمارة
        form.reset();
        form.classList.remove('was-validated');
        
        // إزالة علامات التحقق
        document.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
            el.classList.remove('is-valid', 'is-invalid');
        });

    } catch (error) {
        console.error('خطأ:', error);
        showAlert(
            error.message || 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.',
            'danger'
        );
    } finally {
        // إلغاء حالة التحميل
        setLoading(false);
    }
});

// التحقق الفوري من الحقول أثناء الكتابة
document.getElementById('phone').addEventListener('input', function() {
    const phone = formatPhone(this.value);
    if (phone && validatePhone(phone)) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    } else {
        this.classList.remove('is-valid');
    }
});

document.getElementById('fullName').addEventListener('input', function() {
    if (this.value.trim().length >= 3) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    } else {
        this.classList.remove('is-valid');
    }
});

document.getElementById('age').addEventListener('input', function() {
    const age = parseInt(this.value);
    if (age >= 16 && age <= 100) {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
    } else {
        this.classList.remove('is-valid');
    }
});

// منع إدخال أرقام غير صحيحة في حقل الجوال
document.getElementById('phone').addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

// منع إدخال أرقام سالبة في حقل العمر
document.getElementById('age').addEventListener('keypress', function(e) {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

