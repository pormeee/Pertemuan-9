# 📱 Aplikasi Authentication dengan Firebase & Custom Claim

## 📌 Deskripsi

Aplikasi ini merupakan aplikasi mobile berbasis **React Native (Expo)** yang mengimplementasikan sistem **Authentication** dan **Authorization** menggunakan Firebase.

Aplikasi ini menggunakan **Custom Claim** untuk menentukan role user (admin dan user), sehingga lebih aman karena tidak dapat dimanipulasi langsung dari sisi client.

---

## 🚀 Fitur Utama

* ✅ Register & Login menggunakan Firebase Authentication
* ✅ Reset Password (Email)
* ✅ Role-based access (Admin & User)
* ✅ Custom Claim untuk keamanan role
* ✅ Backend menggunakan Express.js + Firebase Admin SDK
* ✅ Auto navigation berdasarkan status login

---

## 🧠 Teknologi yang Digunakan

* React Native (Expo)
* Firebase Authentication
* Firebase Firestore (opsional untuk data user)
* Firebase Admin SDK
* Express.js (Backend)
* Expo Secure Store

---

## 🔐 Cara Kerja Sistem

1. User melakukan **register**
2. Firebase membuat akun dan menghasilkan **UID**
3. UID dikirim ke backend
4. Backend menetapkan role menggunakan:

   ```
   setCustomUserClaims(uid, { role })
   ```
5. Aplikasi melakukan **refresh token**
6. Role dibaca dari **ID Token**
7. UI ditampilkan berdasarkan role

---

## 👤 Role User

| Role     | Akses               |
| -------- | ------------------- |
| 👑 Admin | Melihat Admin Panel |
| 👤 User  | Melihat User Mode   |

---

## 🔁 Flow Aplikasi

```plaintext
Register → Backend set role → Logout → Login → Role terbaca → Masuk Home
```

---

## 🔒 Keamanan

Custom Claim digunakan karena:

* Tidak bisa dimodifikasi dari client
* Disimpan di dalam token Firebase
* Hanya bisa di-set melalui backend (Firebase Admin SDK)

---

## ⚠️ Catatan Penting

* File `serviceAccountKey.json` tidak disertakan dalam repository (bersifat rahasia)
* IP backend bersifat dinamis (mengikuti jaringan lokal)
* Setelah register, user perlu login ulang untuk mendapatkan role terbaru

---

## 🧪 Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/pormeee/Pertemuan-9.git
cd Pertemuan-9
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan backend

```bash
cd server
node server.js
```

### 4. Jalankan aplikasi

```bash
npx expo start
```

---

## 🎬 Demo

Video demo aplikasi dapat dilihat pada:
👉 ([link gdrive](https://drive.google.com/drive/folders/1-K52jQUW-o7rKHIUXq3BxkCGv3V37FpB))

---

## 👨‍💻 Developer

**Zaid Haikal Rizqi Kartawidjaja**
**2410501007**

---

## 📌 Kesimpulan

Aplikasi ini berhasil mengimplementasikan:

* Authentication menggunakan Firebase
* Authorization menggunakan Custom Claim
* Sistem role-based yang aman dan scalable
