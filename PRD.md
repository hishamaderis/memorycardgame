# Product Requirements Document: Emoji Memory Card Game

## 1. Pengenalan

Projek ini bertujuan untuk membina permainan memori kad (memory match) berasaskan pelayar web menggunakan grid 4x4 dengan tema emoji buah-buahan. Permainan ini akan menjejaki masa penyelesaian dan menyimpan rekod skor pengguna.

## 2. Objektif Projek

* Membangunkan permainan web yang responsif.
* Menggunakan teknologi web standard (HTML5, CSS3, Vanilla JS).
* Menyediakan fungsi pendaftaran nama pemain.
* Mempunyai sistem papan pendahulu (*Leaderboard*) menggunakan fail JSON sebagai storan data.

## 3. Spesifikasi Teknikal

* **Frontend:** HTML5 (Struktur), CSS3 (Styling & Animasi), JavaScript (Logik Permainan).
* **Backend/Data:** JSON (Simpanan data pemain dan skor). *Nota: Untuk versi ini, JSON akan dikendalikan melalui LocalStorage atau simulasi API untuk kesederhanaan.*
* **Responsiviti:** Paparan harus berfungsi dengan baik pada peranti mudah alih dan desktop.

## 4. Ciri-ciri Utama (Features)

1. **Pendaftaran:** Input nama pemain sebelum permainan bermula.
2. **Grid 4x4:** 16 kad (8 pasangan emoji buah).
3. **Mekanik Permainan:**
* Kad terbalik apabila ditekan.
* Kad kekal terbuka jika pasangan sama.
* Kad tertutup semula jika pasangan tidak sama.


4. **Pemasa (Timer):** Mengira masa dari kad pertama ditekan sehingga semua pasangan ditemui.
5. **Papan Skor:** Memaparkan senarai nama pemain dan masa terpantas (Sorting berdasarkan masa paling singkat).

## 5. Aliran Pengguna (User Flow)

1. **Input:** Pengguna memasukkan nama.
2. **Setup:** Sistem menjana grid 4x4 secara rawak (*shuffle*).
3. **Gameplay:** Pengguna mencari pasangan emoji buah.
4. **Tamat:** Jika semua padan, sistem merekodkan masa.
5. **Leaderboard:** Sistem memaparkan senarai skor.

## 6. Struktur Data (JSON Schema)

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

## 7. Senarai Semak Pembangunan

* [ ] **HTML:** Sediakan div container untuk grid dan input box.
* [ ] **CSS:** Fokus kepada *grid layout* dan kesan *flip card* menggunakan `transform: rotateY()`.
* [ ] **JS - Shuffle:** Algoritma untuk mengacak kedudukan emoji setiap kali permainan baru bermula.
* [ ] **JS - Game Logic:** Fungsi untuk mengesan *match* dan menghentikan pemasa.
* [ ] **JS - Persistence:** Fungsi `localStorage.getItem` dan `setItem` untuk menyimpan data JSON.

---

### Nota Pelaksanaan

Untuk memastikan permainan berjalan lancar, pastikan anda menggunakan `CSS Grid` untuk susun atur 4x4 bagi memudahkan kawalan responsif pada pelbagai saiz skrin. Adakah anda ingin saya sediakan contoh kod asas untuk fungsi *shuffle* kad tersebut?