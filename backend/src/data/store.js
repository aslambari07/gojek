export const users = [
  { id: "USR-1", name: "Alya Putri", email: "alya@example.com", phone: "081234567890", role: "customer", password: "demo123", walletBalance: 285000, status: "active" },
  { id: "ADM-1", name: "Admin Ops", email: "admin@example.com", phone: "081111111111", role: "admin", password: "admin123", walletBalance: 0, status: "active" }
];

export const drivers = [
  { id: "DRV-102", name: "Rudi Hartono", email: "rudi@example.com", phone: "082222222222", role: "driver", password: "driver123", status: "online", verified: true, rating: 4.9, vehicle: "Honda Vario", earnings: 265000 },
  { id: "DRV-231", name: "Sinta Lestari", email: "sinta@example.com", phone: "083333333333", role: "driver", password: "driver123", status: "offline", verified: true, rating: 4.8, vehicle: "Yamaha NMAX", earnings: 198000 }
];

export const restaurants = [
  {
    id: "RST-1",
    slug: "warteg-bahari",
    name: "Warteg Bahari Express",
    category: "Nusantara",
    rating: 4.8,
    etaMinutes: 22,
    deliveryFee: 7000,
    menu: [
      { id: "M-1", name: "Nasi Ayam Bakar", price: 28000, stock: 99 },
      { id: "M-2", name: "Sayur Asem", price: 12000, stock: 80 }
    ]
  },
  {
    id: "RST-2",
    slug: "kopi-kota",
    name: "Kopi Kota Senja",
    category: "Coffee & Pastry",
    rating: 4.9,
    etaMinutes: 18,
    deliveryFee: 5000,
    menu: [
      { id: "M-3", name: "Es Kopi Susu", price: 24000, stock: 120 },
      { id: "M-4", name: "Croissant Butter", price: 22000, stock: 50 }
    ]
  }
];

export const wallets = [
  { id: "WAL-1", userId: "USR-1", balance: 285000 }
];

export const walletTransactions = [
  { id: "TRX-1", userId: "USR-1", type: "credit", amount: 300000, label: "Top up via Virtual Account", createdAt: "2026-03-30T09:45:00+07:00" },
  { id: "TRX-2", userId: "USR-1", type: "debit", amount: 24000, label: "GoRide Plaza Indonesia", createdAt: "2026-03-30T10:15:00+07:00" }
];

export const orders = [
  {
    id: "ORD-10021",
    customerId: "USR-1",
    driverId: "DRV-102",
    service: "ride",
    status: "on_the_way",
    pickupAddress: "Plaza Indonesia",
    destinationAddress: "Kuningan City",
    distanceKm: 7.2,
    fare: 24000,
    paymentMethod: "wallet",
    rating: null,
    review: null
  },
  {
    id: "ORD-10022",
    customerId: "USR-1",
    driverId: "DRV-231",
    service: "courier",
    status: "delivering",
    pickupAddress: "Kemang",
    destinationAddress: "Tebet",
    distanceKm: 5.5,
    fare: 18000,
    paymentMethod: "cash",
    rating: null,
    review: null
  }
];

export const otpCodes = [
  { phone: "081234567890", code: "123456", verified: false }
];
