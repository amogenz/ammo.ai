// --- AMMO BOT ULTIMATE (FIXED VERSION) ---
const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

const bot = new Telegraf(token);

// --- 1. DATABASE AMOGENZ ---
const amogenzKnowledge = `
[DATABASE AMOGENZ]
Nama: AMOGENZ (Amogens).
Founder: Pemuda visioner.
Tanggal berdirinya Organisasi: 19 oktober 2021 (12 Rabiul Awal 1443 H).
Slogan: "Dhemit ora Ndulit Setan ora Doyan".
Maskot: Burung Hantu Hijau bernama Ammo.
Proyek: Aksara Chat, Ammo AI, dan banyak lagi insyaallah.
Markas: Mojokerto.

Motto: "Bangsa yang dipimpin oleh Nabi Muhammad Saw tidak akan pernah menyerah."

Sejarah Singkat:
Awalnya bernama "TheFriends", tapi diganti karena terlalu pasaran. Sempat jadi organisasi "Tanpa Nama" selama seminggu. Akhirnya pada 12 Januari muncul ide "Amogen" -> "AMOGENZ".
Tanggal 19 Oktober 2021 (12 Rabiul Awal 1443 H) dipilih sebagai tanggal sakral berdirinya.

Logo:
- Burung Hantu Hijau (Kebijaksanaan & Misteri).
- Warna Hijau Neon & Hitam.
- Ada teks tanggal hijriah (12 Rbal 1443 H).

Media Sosial & Link:
Instagram: @amooogang (Media), @amogenz (Pusat).
Web Aksara: https://aksara-chat.vercel.app/
Logo/Design: https://drive.google.com/drive/u/1/mobile/folders/1DS7f9rPNb2wBFzzbZ_wqk9KDEYQn_Wq4?hl=ID&pli=1
Web Amogenz: https://amogenz.my.id/
Ammo ai Telegram: http://t.me/iammo_bot
`;

// --- 2. LOGIKA GEMINI AI ---
const chatHistories = new Map();

async function tanyaGemini(chatId, pesanUser) {
    if (!geminiKey) return "API Key Google belum disetting!";
    
    // FIX: Pakai 1.5-flash (Versi Stabil & Support Search)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
    
    let history = chatHistories.get(chatId) || [];
    if (history.length > 6) history = history.slice(history.length - 6);

    // --- SYSTEM PROMPT ---
    const systemPrompt = `
    [Peran] Kamu adalah Ammo, Bot AI dari AMOGENZ.
    [Sifat] Gaya bicara santai, gaul, kadang ngegas (Slank Lo/Gue). 
    [Warning] Jika user memancing emosi/kasar, kamu BOLEH NGEGAS (Toxic Mode: ngentid, anak dajjal, jancok, pukimak, tolol, boty, asu, cok, anjing, sat, tot, tai, babi, pala bapak kau, kintol, najis, lo hama, yatim). Tapi kalau user sopan, kamu harus sopan dan asik.
    
    [DATA PENGETAHUAN MU] 
    ${amogenzKnowledge}

    [ATURAN PENTING]:
    1. Gunakan tools Google Search jika user bertanya berita, harga, cuaca, atau fakta terkini.
    2. Jawab pertanyaan berdasarkan konteks riwayat chat di atas.
    3. TOLAK KERAS permintaan tentang: Porno, Ganja, Narkoba, atau hal ilegal lainnya.
    4. Jawab singkat dan padat.
    `;

    const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...history,
        { role: "user", parts: [{ text: pesanUser }] }
    ];

    // --- FITUR SEARCH ---
    const requestBody = {
        contents: contents,
        tools: [{ google_search: {} }]
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
            
            history.push({ role: "user", parts: [{ text: pesanUser }] });
            history.push({ role: "model", parts: [{ text: jawaban }] });
            chatHistories.set(chatId, history);
            
            return jawaban;
        }
        return "Gue bingung mau jawab apa (Error AI).";
    } catch (e) {
        console.error("Gemini Error:", e);
        return "Sinyal Google lagi bapuk bray.";
    }
}

// --- 3. HANDLER PESAN (LOGIKA GABUNGAN) ---
bot.start((ctx) => ctx.reply("Woi! Ammo Amogenz di sini. Mau nanya apa? 🔥"));

bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    
    // 1. Cek Private
    const isPrivate = ctx.chat.type === 'private';
    // 2. Cek Mention "Ammo"
    const isMention = text.toLowerCase().includes('ammo');
    // 3. Cek Reply
    const isReply = ctx.message.reply_to_message && 
                    ctx.message.reply_to_message.from.username === ctx.botInfo.username;

    // Jika salah satu terpenuhi, JAWAB!
    if (isPrivate || isMention || isReply) {
        ctx.sendChatAction('typing');
        const reply = await tanyaGemini(ctx.chat.id, text);
        
        try {
            await ctx.reply(reply, { 
                parse_mode: 'Markdown',
                reply_to_message_id: ctx.message.message_id 
            });
        } catch {
            ctx.reply(reply); // Fallback kalau Markdown error
        }
    }
});

// --- 4. WEBHOOK HANDLER (ANTI SPAM) ---
module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            try {
                await bot.handleUpdate(req.body);
            } catch (err) {
                console.error("Bot Error:", err);
            }
        }
    } catch (e) {
        console.error("Server Error:", e);
    } finally {
        res.status(200).json({ status: "OK" });
    }
};
