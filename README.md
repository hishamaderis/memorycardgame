# Emoji Memory Card Game 🍓🍍

Permainan memori kad (*memory match*) berasaskan pelayar web menggunakan grid 4x4 dengan tema emoji buah-buahan. Permainan ini menjejaki masa penyelesaian dan menyimpan rekod skor pengguna dalam papan pendahulu (*Leaderboard*).

---

## 🚀 Ciri-Ciri Utama
* **Pendaftaran Pemain:** Memasukkan nama pemain sebelum memulakan permainan.
* **Grid 4x4:** Sebanyak 16 kad (8 pasang emoji buah-buahan) yang dijana secara rawak (*shuffle*).
* **Mekanik Permainan:**
  * Kad akan berputar/terbalik (*flip*) apabila ditekan.
  * Kad kekal terbuka jika pasangan yang dipilih adalah sama.
  * Kad akan ditutup semula jika pasangan tidak padan.
* **Pemasa (Timer):** Mengira masa bermula dari kad pertama yang ditekan sehingga semua pasangan berjaya ditemui.
* **Papan Skor (Leaderboard):** Memaparkan senarai nama pemain berserta masa penyelesaian terpantas (disusun daripada masa paling singkat).
* **Reka Bentuk Responsif:** Antara muka yang mesra pengguna dan boleh dimainkan pada peranti mudah alih mahupun komputer desktop.

---

## 🛠️ Spesifikasi Teknikal
* **Frontend:**
  * HTML5 (Struktur halaman)
  * CSS3 (Reka letak Grid, Responsif & Animasi *Flip*)
  * Vanilla JavaScript (Logik permainan, pemasa, dan kawalan state)
* **Penyimpanan Data:**
  * `LocalStorage` (Simulasi pangkalan data berasaskan format JSON untuk menyimpan maklumat skor pemain secara lokal).

---

## 📂 Struktur Fail Cadangan
Berikut adalah struktur fail yang dicadangkan untuk projek ini:
```text
memorycardgame/
├── PRD.md            # Product Requirements Document
├── README.md         # Dokumentasi Projek (Fail ini)
├── index.html        # Struktur Antara Muka Pengguna (UI)
├── style.css         # Gaya visual, reka letak grid, dan animasi
└── app.js            # Logik permainan, pengurusan LocalStorage & Pemasa
```

---

## 📊 Format Data Leaderboard (JSON Schema)
Data pemain dan skor disimpan dalam `localStorage` menggunakan format senarai objek JSON seperti berikut:

```json
[
  {
    "username": "Ali",
    "time_seconds": 45
  },
  {
    "username": "Budi",
    "time_seconds": 38
  }
]
```

---

## 💻 Cara Menjalankan Projek secara Lokal

1. **Klon Repositori:**
   ```bash
   git clone <url-repositori-anda>
   cd memorycardgame
   ```

2. **Jalankan Permainan:**
   Oleh kerana projek ini menggunakan teknologi web standard (HTML/CSS/JS), anda hanya perlu membuka fail `index.html` menggunakan pelayar web (browser) pilihan anda:
   * Klik dua kali pada fail `index.html` atau seret (*drag and drop*) fail tersebut ke dalam pelayar web.
   * Atau, anda boleh menggunakan extension seperti **Live Server** di VS Code untuk pengalaman pembangunan yang lebih baik.

---

## 📝 Senarai Semak Pembangunan (Roadmap)
* [ ] Menyediakan fail `index.html` dengan bekas grid (*grid container*) dan input nama.
* [ ] Membina gaya CSS (termasuk kesan *flip card* dan susun atur grid responsif).
* [ ] Menulis fungsi *shuffle* emoji dalam JavaScript untuk mengacak kedudukan kad.
* [ ] Melaksanakan logik permainan (semakan padanan kad, pemasa).
* [ ] Menyepadukan storan lokal (`localStorage`) untuk papan pendahulu (*Leaderboard*).
