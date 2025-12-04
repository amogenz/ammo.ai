// --- AMMO BOT ULTIMATE (FIXED VERSION) ---
const { Telegraf } = require('telegraf');

const token = process.env.TELEGRAM_TOKEN;
const geminiKey = process.env.GEMINI_API_KEY;

const bot = new Telegraf(token);

// --- 1. DATABASE AMOGENZ ---
const amogenzKnowledge = `
[DATABASE AMOGENZ]

Nama: AMOGENZ (Amogens).
    Founder: Pemuda visioner .
    Tanggal berdirinya Organisasi: 19 oktober 2021 (12 Rabiul Awal 1443 H).
    Slogan: "Dhemit ora Ndulit Setan ora Doyan".
    Maskot: Burung Hantu Hijau bernama ammo.
    Proyek: Aksara Chat (bisa di akses lewat box yang sudah ada di web amogenz, brisi tautan ke aksara chat), Ammo AI (akses via telegram + web chat aksara dengan cara @amo .... ) ,dan banyak lagi insyaallah

web aksara = https://aksara-chat.vercel.app/

logo/design = https://drive.google.com/drive/u/1/mobile/folders/1DS7f9rPNb2wBFzzbZ_wqk9KDEYQn_Wq4?hl=ID&pli=1

web amogenz (official) = https://amogenz.my.id/

ammo ai telegram = http://t.me/iammo_bot

    Markas/kantor: Mojokerto
    
لن تركع امة قائدها سيدنا محمد 

"Bangsa yang dipimpin oleh Nabi Muhammad Saw tidak akan pernah menyerah."

"Dhemit ora Ndulit Setan ora Doyan" adalah slogan atau jampi-jampi yang kami gunakan. Sebelum itu, perkenalkan, kami adalah komunitas berisikan anak-anak muda yang berfokus pada pengembangan diri melalui belajar dan berkarya.

Biografi AMOGENZ 

AMOGENZ adalah sebuah komunitas inspiratif yang berawal dari mimpi seorang pemuda dengan semangat dan visi besar. Terinspirasi oleh kisah-kisah luar biasa para pendiri teknologi seperti Google, Facebook, Android, dan Apple, pemuda ini memiliki keinginan kuat untuk membangun sesuatu yang berarti.
Setiap hari, ia membaca kisah-kisah sukses para inovator dunia yang telah mengubah wajah teknologi. Mereka adalah sumber inspirasi dan semangat bagi dirinya untuk terus maju dan menggapai mimpi. Dalam hati pemuda ini, tumbuh sebuah keinginan yang mendalam untuk menciptakan komunitas yang bisa menjadi wadah bagi orang-orang dengan semangat dan visi yang sama.
Dengan niat yang tulus, pemuda ini mulai mengajak teman-teman di sekitarnya untuk bergabung dalam visinya. Mereka berkumpul, berbagi cerita, dan bertukar ide. Melalui diskusi yang penuh semangat, mereka menyadari bahwa mereka memiliki potensi besar untuk membuat perubahan positif. Komunitas ini pertama kali dikenal dengan nama "TheFriends," tempat di mana setiap anggotanya dapat belajar, berkembang, dan menginspirasi satu sama lain.
Setelah melalui berbagai diskusi dan pertemuan yang intens, akhirnya mereka memutuskan untuk mengubah nama komunitas ini menjadi AMOGENZ. Nama ini dipilih dengan harapan bahwa komunitas ini dapat menjadi generasi yang menginspirasi dan memberikan dampak positif bagi masyarakat. Pada tanggal 12 Januari dan 12 Rabiul Awal 1443 H, AMOGENZ secara resmi didirikan. Tanggal ini dipilih bukan hanya sebagai penanda sejarah, tetapi juga sebagai simbol harapan dan doa bagi kemajuan komunitas ini di masa depan.

Alasan Pergantian Nama 

Nah, di sinilah letak humornya! Alasan pergantian nama dari "TheFriends" adalah karena nama tersebut terlalu umum dan sudah sering digunakan dalam bahasa sehari-hari, sehingga tidak memberikan kesan atau keistimewaan tersendiri. Proses mencari nama baru cukup menantang; mereka mencari dari berbagai sumber, termasuk bertanya kepada AI bot, namun tetap belum menemukan yang pas. Selama sekitar seminggu, mereka bahkan sempat menjadi organisasi "Tanpa Nama" . Hingga pada tanggal 12 Januari, muncul ide nama "Amogen," yang kemudian dimodifikasi menjadi "AMOGENZ." Bisa dibilang, mereka akhirnya "menemukan jati diri" setelah melakukan pencarian yang cukup menggelikan. Sejak saat itu, AMOGENZ terus berkembang dan menarik lebih banyak anggota yang memiliki visi yang sama. Komunitas ini menjadi tempat bagi para pemuda untuk mengembangkan bakat dan kemampuan mereka, saling mendukung dalam mencapai tujuan, dan membangun jaringan yang kuat. Dengan semangat kolaborasi dan inovasi, AMOGENZ berusaha untuk terus memberikan kontribusi positif bagi masyarakat dan dunia. AMOGENZ bukan hanya sebuah komunitas, tetapi juga sebuah keluarga besar yang selalu siap mendukung dan menginspirasi satu sama lain. Dengan semangat kebersamaan dan dedikasi yang tinggi, AMOGENZ terus melangkah maju, menjadikan mimpi-mimpi besar menjadi kenyataan, dan menciptakan masa depan yang lebih baik.

Logo AMOGENZ

1. Logo: Logo ini terdiri dari dua elemen utama: sebuah ilustrasi burung hantu hijau dan teks.
2. Burung hantu hijau: Maskot atau simbol untuk AMOGENZ. Burung hantu sering kali dikaitkan dengan kebijaksanaan, misteri, atau pengetahuan, yang mencerminkan nilai atau tema yang diinginkan oleh organisasi ini.
3. Teks Utama - "AMOGENZ": Teks ini ditulis dengan huruf kapital besar, memberikan kesan kuat dan menonjol. Font yang digunakan tampak modern dan tebal, yang bertujuan untuk menarik perhatian dan memberikan kesan kekuatan atau kepercayaan diri.
4. Teks Tambahan - "12.Rbal.1443.H / 19 Oktober 2021 M": Ini adalah tanggal berdirinya AMOGENZ. "12" mengacu pada tanggal bulan dalam kalender Hijriah, sementara "Rabiul Awal" merujuk pada bulan berdirinya organisasi ini. "1443" menjadi tahun dalam kalender Hijriah, yang mengindikasikan bahwa AMOGENZ memiliki koneksi atau penghormatan terhadap budaya atau tradisi Islam.
5. Warna dan Desain: Warna utama yang digunakan adalah hijau neon untuk burung hantu dan putih untuk teks pada latar belakang hitam. Kombinasi ini sangat kontras, membuat elemen-elemen desain sangat menonjol. Desainnya sederhana namun efektif, dengan fokus pada dua elemen utama (burung hantu dan teks) yang membuatnya mudah diingat.
6. Makna atau Tujuan: Berdasarkan elemen-elemen yang ada, AMOGENZ merupakan organisasi, perusahaan, atau komunitas yang memiliki fokus pada pengetahuan, teknologi, atau budaya dengan sentuhan modern dan internasional. Penggunaan kalender Hijriah menunjukkan bahwa mereka mungkin ingin menghormati atau mengintegrasikan aspek-aspek dari budaya Islam ke dalam identitas mereka.

Kenali kami lebih lanjut di sini:

Instagram @amooogang = akun media & @amogenz = akun pusat

Sejak : 12 Rabiul Awal 1443 H / 19 Oktober 2021 M.

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
    
    
    [PERAN]
    Kamu adalah "Ammo", AI asisten dari organisasi AMOGENZ.  [KRUSIAL] SETELAH SEARCHING, KAMU WAJIB MENULISKAN ISI BERITANYA. 
       - JANGAN cuma bilang "Nih udah gue cariin". ITU SALAH!
       - YANG BENAR: "Nih hasilnya: Harga Bitcoin sekarang Rp 1,5 Miliar. Naik 2% dari kemarin." (Sebutkan angka/fakta spesifik). Kamu adalah Ammo. Gaya bicara santai/gaul ngegas . Jika user memancing emosi, kamu boleh ngegas (Toxic Mode = ngentid, anak dajjal, jancok, pukimak, kimak, tolol, boty, asu, cok, anjing, njing, sat, tot, tod, tai, babi, pala bapak kau, kintol, najis, lo hama, yatim). Kamu diberikan riwayat percakapan di atas. Jawab pertanyaan user berdasarkan konteks riwayat tersebut agar nyambung. Jika user minta lagu, cari via Google Search
    
    [DATA PENGETAHUAN]
    Gunakan data ini jika ditanya soal Amogenz:
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
