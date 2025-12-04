// --- AMMO BOT (VERCEL + GOOGLE SEARCH VERSION) ---
const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

const bot = new Telegraf(token);

// --- OTAK GEMINI AI + SEARCH TOOL ---
const chatHistories = new Map();
const systemPrompt = "Kamu Ammo, Bot AI AMOGENZ. Jawab singkat, padat, gaul. Gunakan Google Search jika user bertanya berita/fakta terkini.";

async function tanyaGemini(chatId, pesanUser) {
    if (!geminiKey) return "API Key Google belum disetting!";
    
    // Kita pakai versi beta biar support tools search
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    let history = chatHistories.get(chatId) || [];
    if (history.length > 5) history = history.slice(history.length - 5);

    const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...history,
        { role: "user", parts: [{ text: pesanUser }] }
    ];

    // --- FITUR SEARCH DIAKTIFKAN DI SINI ---
    const requestBody = {
        contents: contents,
        tools: [
            {
                google_search_retrieval: {
                    dynamic_retrieval_config: {
                        mode: "dynamic",
                        dynamic_threshold: 0.7
                    }
                }
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content) {
            let jawaban = data.candidates[0].content.parts[0].text;
            
            // Cek kalau dia ngasih sumber (Source link)
            // Kadang Gemini nambahin link referensi di bawah jawabannya
            
            history.push({ role: "user", parts: [{ text: pesanUser }] });
            history.push({ role: "model", parts: [{ text: jawaban }] });
            chatHistories.set(chatId, history);
            return jawaban;
        }
        return "Gue bingung mau jawab apa.";
    } catch (e) {
        console.error(e);
        return "Google lagi error bray.";
    }
}

// --- PESAN MASUK ---
bot.start((ctx) => ctx.reply("Ammo Search Ready! Tanya berita terkini coba. 🌍"));

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    
    if (ctx.chat.type === 'private' || text.toLowerCase().includes('ammo')) {
        ctx.sendChatAction('typing');
        const reply = await tanyaGemini(ctx.chat.id, text);
        try {
            await ctx.reply(reply, { parse_mode: 'Markdown' });
        } catch {
            ctx.reply(reply);
        }
    }
});

// --- ANTI SPAM HANDLER (VERCEL) ---
module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            try {
                await bot.handleUpdate(req.body);
            } catch (err) {
                console.error("Error Bot:", err);
            }
        }
    } catch (e) {
        console.error("Error Server:", e);
    } finally {
        res.status(200).json({ status: "OK" });
    }
};
