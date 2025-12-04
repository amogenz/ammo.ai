require('dotenv').config(); // Panggil modul rahasia
const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// --- 1. AMBIL KUNCI RAHASIA DARI ENV ---
// Jangan tulis key langsung di sini biar aman di GitHub!
const token = process.env.TELEGRAM_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

if (!token || !geminiKey) {
    console.error("❌ ERROR: Token atau API Key belum diisi di .env atau Dashboard Hosting!");
    process.exit(1);
}

// Inisialisasi Bot
const bot = new TelegramBot(token, { polling: true });
const chatHistories = new Map(); // Penyimpanan ingatan sementara

console.log("🔥 AMMO BOT (GITHUB VERSION) SUDAH AKTIF!");

// --- 2. PERSONA & DATABASE ---
const amogenzKnowledge = `
[DATABASE AMOGENZ]
Nama: AMOGENZ.
Slogan: "Dhemit ora Ndulit Setan ora Doyan".
Maskot: Burung Hantu Hijau.
Komunitas: Tempat anak muda belajar coding & teknologi.
Web: amogenz.my.id
`;

const systemPrompt = `
[Peran] Kamu adalah Ammo, Bot Telegram Amogenz.
[Sifat] Gaul, Ngegas dikit (Slank Lo/Gue), Lucu, tapi Pinter.
[Data] ${amogenzKnowledge}

[ATURAN PENTING]:
1. Kamu punya akses GOOGLE SEARCH. Gunakan jika user tanya Berita, Harga, Cuaca, atau Fakta Terbaru.
2. Kalau habis searching, JANGAN PELIT. Tulis data/angkanya di jawabanmu.
3. Jawab singkat padat khas chatting. Jangan kayak bikin makalah.
4. Kamu punya ingatan konteks chat sebelumnya. Jawab nyambung.
`;

// --- 3. FUNGSI GEMINI AI ---
async function tanyaGemini(chatId, pesanUser) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
    
    let history = chatHistories.get(chatId) || [];
    if (history.length > 20) history = history.slice(history.length - 20);

    const contents = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...history,
        { role: "user", parts: [{ text: pesanUser }] }
    ];

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: contents,
                tools: [{ google_search: {} }] // Fitur Search
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) return "Waduh, otak gue error. Google lagi gangguan.";

        let jawabanAI = "Gue bingung.";
        if (data.candidates && data.candidates[0].content) {
            jawabanAI = data.candidates[0].content.parts[0].text;
        }

        history.push({ role: "user", parts: [{ text: pesanUser }] });
        history.push({ role: "model", parts: [{ text: jawabanAI }] });
        chatHistories.set(chatId, history);

        return jawabanAI;

    } catch (error) {
        console.error("Gemini Error:", error);
        return "Sinyal putus, Bro.";
    }
}

// --- 4. LOGIKA CHAT ---
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    const isPrivate = msg.chat.type === 'private';
    const isMentioned = text.toLowerCase().includes('ammo');
    const isReply = msg.reply_to_message && msg.reply_to_message.from.username === (await bot.getMe()).username;

    if (isPrivate || isMentioned || isReply) {
        bot.sendChatAction(chatId, 'typing');
        const jawaban = await tanyaGemini(chatId, text);
        bot.sendMessage(chatId, jawaban, { parse_mode: 'Markdown', reply_to_message_id: msg.message_id });
    }
});

// --- 5. DUMMY SERVER (BIAR GAK MATI DI HOSTING) ---
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Ammo Bot is Running on Cloud! 🔥');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🌐 Server Web jalan di Port ${PORT}`);
});
