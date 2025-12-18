// ============================================
// Vercel Serverless Function
// إرجاع متغيرات البيئة بشكل آمن
// ============================================

export default function handler(req, res) {
    // السماح فقط بـ GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // إرجاع DISCORD_WEBHOOK_URL فقط (لا نعيد جميع المتغيرات)
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || 'YOUR_WEBHOOK_URL_HERE';
    
    res.status(200).json({
        DISCORD_WEBHOOK_URL: webhookUrl
    });
}

