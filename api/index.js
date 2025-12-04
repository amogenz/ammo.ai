const { Telegraf } = require('telegraf');

// Ambil kunci rahasia dari settingan Vercel nanti
const token = process.env.TELEGRAM_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

const bot = new Telegraf(token);

// --- OTAK GEMINI AI ---
const chatHistories = new Map();
const systemPrompt = "Kamu Ammo, Bot AI AMOGENZ. Jawab singkat, padat, gaul.";

async function tanyaGemini(chatId, pesanUser) {
    if (!geminiKey) return "API Key Google belum disetting!";
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    // Manage History (Hemat Memori)
    let history = chatHistories.get(chatId) || [];
    if (history.length > 5) history = history.slice(history.length - 5);

    const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...history,
        { role: "user", parts: [{ text: pesanUser }] }
    ];

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents })
        });
        const data = await response.json();
        
        if (data.candidates) {
            const jawaban = data.candidates[0].content.parts[0].text;
            history.push({ role: "user", parts: [{ text: pesanUser }] });
            history.push({ role: "model", parts: [{ text: jawaban }] });
            chatHistories.set(chatId, history);
            return jawaban;
        }
        return "Gue bingung mau jawab apa.";
    } catch (e) {
        return "Google lagi error bray.";
    }
}

// --- PESAN MASUK ---
bot.start((ctx) => ctx.reply("Ammo Online via Vercel! ⚡"));

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    // Jawab kalau private chat ATAU ada kata 'ammo'
    if (ctx.chat.type === 'private' || text.toLowerCase().includes('ammo')) {
        ctx.sendChatAction('typing');
        const reply = await tanyaGemini(ctx.chat.id, text);
        try {
            await ctx.reply(reply, { parse_mode: 'Markdown' });
        } catch {
            ctx.reply(reply); // Kirim polos kalau markdown error
        }
    }
});

// --- KODE KHUSUS VERCEL (WEBHOOK) ---
module.exports = async (req, res) => {
    try {
        // Vercel cuma terima POST dari Telegram
        if (req.method === 'POST') {
            await bot.handleUpdate(req.body);
        }
        res.status(200).json({ status: "OK", message: "Bot Aman Jaya" });
    } catch (e) {
        res.status(500).json({ error: "Ada error bray" });
    }
};

