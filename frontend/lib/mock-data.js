export const customer = {
  name: "Alya Putri",
  points: 2480,
  walletBalance: 285000,
  currentLocation: "Jl. Sudirman, Jakarta Selatan"
};

export const services = [
  {
    id: "ride",
    title: "GoRide",
    subtitle: "Pesan motor cepat dengan live tracking",
    price: "Mulai Rp12.000",
    accent: "#00AA13",
    eta: "6-10 min",
    priceDetails: ["Tarif dasar Rp5.000", "2 km pertama Rp7.000", "Biaya aplikasi Rp2.000"]
  },
  {
    id: "food",
    title: "GoFood",
    subtitle: "Restoran favorit dan promo harian",
    price: "Menu mulai Rp18.000",
    accent: "#ff7a00",
    eta: "20-30 min",
    priceDetails: ["Menu mulai Rp18.000", "Ongkir Rp5.000-Rp9.000", "Biaya layanan Rp3.000"]
  },
  {
    id: "send",
    title: "GoSend",
    subtitle: "Kirim dokumen dan paket instan",
    price: "Mulai Rp15.000",
    accent: "#00a6fb",
    eta: "10-20 min",
    priceDetails: ["Tarif pickup Rp7.000", "Biaya per km Rp4.000", "Biaya perlindungan Rp2.500"]
  }
];

export const orderPricing = {
  ride: {
    id: "ride",
    title: "GoRide",
    badge: "Paling cepat",
    accent: "#00AA13",
    pickup: "Plaza Indonesia",
    destination: "Kuningan City",
    eta: "6-10 min",
    distanceKm: 7.2,
    breakdown: [
      { label: "Tarif dasar", amount: 5000 },
      { label: "Tarif jarak", amount: 17000 },
      { label: "Biaya aplikasi", amount: 2000 }
    ],
    note: "Cocok untuk perjalanan harian, meeting, dan mobilitas cepat di area Jakarta.",
    cta: "Pesan GoRide"
  },
  send: {
    id: "send",
    title: "GoSend",
    badge: "Instan sampai",
    accent: "#00a6fb",
    pickup: "Tokopedia Care, Thamrin",
    destination: "Jl. Tebet Timur Dalam VIII",
    eta: "15-25 min",
    distanceKm: 5.4,
    breakdown: [
      { label: "Biaya pickup", amount: 7000 },
      { label: "Tarif jarak", amount: 9000 },
      { label: "Biaya perlindungan", amount: 2500 },
      { label: "Biaya aplikasi", amount: 1500 }
    ],
    note: "Pas untuk kirim dokumen, makanan non-GoFood, dan paket kecil dalam kota.",
    cta: "Pesan GoSend"
  },
  food: {
    id: "food",
    title: "GoFood",
    badge: "Menu favorit",
    accent: "#ff7a00",
    pickup: "Warteg Bahari Express",
    destination: customer.currentLocation,
    eta: "20-25 min",
    distanceKm: 3.8,
    items: [
      { name: "Nasi Ayam Bakar", qty: 1, price: 28000 },
      { name: "Sayur Asem", qty: 1, price: 12000 },
      { name: "Es Teh Manis", qty: 2, price: 8000 }
    ],
    breakdown: [
      { label: "Subtotal menu", amount: 56000 },
      { label: "Biaya kemasan", amount: 3000 },
      { label: "Ongkir", amount: 7000 },
      { label: "Biaya layanan", amount: 3000 }
    ],
    note: "Ringkasan total menu, ongkir, dan biaya layanan tampil sebelum checkout.",
    cta: "Pesan GoFood"
  }
};

export const nearbyDrivers = [
  { id: "DRV-102", name: "Rudi", distance: "0.4 km", vehicle: "Honda Vario", rating: 4.9 },
  { id: "DRV-231", name: "Sinta", distance: "0.8 km", vehicle: "Yamaha NMAX", rating: 4.8 },
  { id: "DRV-077", name: "Bayu", distance: "1.2 km", vehicle: "Suzuki Address", rating: 4.7 }
];

export const restaurants = [
  {
    id: "warteg-bahari",
    name: "Warteg Bahari Express",
    category: "Nusantara",
    eta: "20-25 min",
    rating: 4.8,
    deliveryFee: 7000,
    menu: [
      { id: "m1", name: "Nasi Ayam Bakar", price: 28000 },
      { id: "m2", name: "Sayur Asem", price: 12000 }
    ]
  },
  {
    id: "kopi-kota",
    name: "Kopi Kota Senja",
    category: "Coffee & Pastry",
    eta: "15-20 min",
    rating: 4.9,
    deliveryFee: 5000,
    menu: [
      { id: "m3", name: "Es Kopi Susu", price: 24000 },
      { id: "m4", name: "Croissant Butter", price: 22000 }
    ]
  }
];

export const activeOrders = [
  {
    id: "ORD-10021",
    type: "ride",
    status: "Driver menuju titik jemput",
    pickup: "Plaza Indonesia",
    destination: "Kuningan City",
    fare: 24000
  },
  {
    id: "ORD-10022",
    type: "send",
    status: "Paket sedang diantar",
    pickup: "Kemang",
    destination: "Tebet",
    fare: 18000
  }
];

export const walletTransactions = [
  { id: "TRX-1", label: "Top up via Virtual Account", amount: 300000, type: "credit", time: "30 Mar 2026, 09:45" },
  { id: "TRX-2", label: "GoRide Plaza Indonesia", amount: 24000, type: "debit", time: "30 Mar 2026, 10:15" },
  { id: "TRX-3", label: "GoFood Warteg Bahari", amount: 52000, type: "debit", time: "29 Mar 2026, 19:05" }
];

export const driverProfile = {
  name: "Dimas Saputra",
  vehicle: "Honda Beat B 4123 XYZ",
  status: "Online",
  rating: 4.92,
  earningsToday: 265000,
  completedTrips: 14
};

export const incomingJobs = [
  { id: "JOB-301", service: "GoRide", from: "Blok M", to: "Senayan", fare: 22000 },
  { id: "JOB-302", service: "GoSend", from: "SCBD", to: "Kebayoran Baru", fare: 18500 }
];

export const adminStats = [
  { label: "Total User", value: "24.580" },
  { label: "Total Driver", value: "7.120" },
  { label: "Total Order", value: "148.220" },
  { label: "Pendapatan", value: "Rp1,28 M" }
];

export const systemHighlights = [
  "Realtime order monitoring dengan status live",
  "Wallet ledger untuk top-up, debit, refund, fee",
  "Role-based auth untuk customer, driver, admin",
  "Siap integrasi maps, payment gateway, dan chat"
];
