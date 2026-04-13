# Gojek Clone Suite

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://frontend-chi-gold-54.vercel.app/)

Web aplikasi layanan transportasi dan multi-service dengan 3 area utama: customer, driver, dan admin panel.

## Struktur Project

```text
gojek/
├── frontend/              # Next.js app router
│   ├── app/
│   │   ├── admin/
│   │   ├── driver/
│   │   ├── order/
│   │   ├── profile/
│   │   ├── restaurants/
│   │   └── wallet/
│   ├── components/
│   └── lib/
├── backend/               # Express mock API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── data/
│       ├── middleware/
│       ├── routes/
│       └── services/
└── docs/
    ├── api-endpoints.md
    └── schema/database.sql
```

## Fitur yang Sudah Disiapkan

- Customer app: home, booking ride/courier, food catalog, wallet, profile
- Driver app: dashboard, status online/offline, order masuk, earnings
- Admin panel: statistik, monitor order, users, drivers, reports
- Backend auth JWT mock, OTP demo, order management, wallet, restaurant, admin monitoring
- Dummy data untuk user, driver, restaurant, wallet, dan order
- Database schema SQL untuk PostgreSQL / MySQL adaptation

## Kredensial Demo

- Customer: `alya@example.com` / `demo123`
- Driver: `rudi@example.com` / `driver123`
- Admin: `admin@example.com` / `admin123`
- OTP demo: `123456`

## Cara Menjalankan

1. Install dependency root:

```bash
npm install
```

2. Jalankan frontend dan backend sekaligus:

```bash
npm run dev
```

3. Buka aplikasi:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

## Contoh Endpoint Penting

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alya@example.com","password":"demo123"}'
```

```bash
curl http://localhost:4000/api/customer/dashboard \
  -H "Authorization: Bearer <token>"
```

## UI yang Disediakan

- Customer landing modern dengan service cards, map preview, wallet, order summary
- Halaman order dengan estimasi tarif dan driver terdekat
- Halaman GoFood dengan restaurant list dan detail menu
- Halaman wallet dengan top-up simulation dan ledger transaksi
- Dashboard driver dan admin sebagai contoh panel operasional

## Hasil Project

Saat project dijalankan, aplikasi menampilkan simulasi ekosistem Gojek versi web dengan tiga area utama yang sudah saling terhubung lewat backend demo:

- Customer app di `/` menampilkan dashboard utama berisi saldo wallet, poin, status sistem, layanan aktif, ringkasan order, daftar driver terdekat, dan rekomendasi restoran.
- Halaman order di `/order` menyediakan simulasi pemesanan `GoRide`, `GoSend`, dan `GoFood` dengan form alamat, estimasi tarif dari backend, pilihan metode pembayaran, dan proses create order.
- Driver app di `/driver` menampilkan profil driver, status online atau offline, penghasilan harian, daftar order masuk, serta tombol untuk melanjutkan status order.
- Admin panel di `/admin` menampilkan total user, total driver, total order, pendapatan, monitoring order operasional, dan highlight sistem.
- Fitur tambahan seperti wallet, profile, restoran, dan detail restoran tersedia untuk melengkapi flow demo end-to-end dari sisi customer.

## Flow Demo yang Bisa Dicoba

1. Buka halaman customer di `http://localhost:3000` untuk melihat dashboard utama.
2. Masuk ke halaman order dan pilih layanan `GoRide`, `GoSend`, atau `GoFood`.
3. Ubah alamat, jarak, atau item pesanan lalu lihat estimasi tarif yang dihitung ulang dari backend.
4. Buat order dan cek perubahan data pada halaman driver serta admin.
5. Buka halaman wallet atau profile untuk melihat simulasi data customer lainnya.

## Route Demo Utama

```text
/                      -> Customer dashboard
/order                 -> Simulasi pemesanan layanan
/restaurants           -> Daftar restoran
/restaurants/[slug]    -> Detail restoran
/wallet                -> Wallet dan riwayat transaksi
/profile               -> Profil customer
/driver                -> Dashboard driver
/admin                 -> Dashboard admin
```

## Catatan Arsitektur

- Frontend saat ini memakai mock data lokal agar UI bisa ditinjau cepat.
- Backend memakai in-memory store untuk demo. Tahap produksi tinggal ganti ke Prisma/Sequelize + PostgreSQL/MySQL.
- Realtime tracking bisa diintegrasikan via Socket.IO atau Firebase Realtime Database.
- Maps bisa dipasang ke komponen `MapPreview` dengan Google Maps API atau React Leaflet + OpenStreetMap.
  
# Gojek
# Gojek
# gojek
