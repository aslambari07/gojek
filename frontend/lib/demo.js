export const demoAccounts = {
  customer: {
    title: "Customer Demo",
    email: "alya@example.com",
    password: "demo123",
    role: "customer"
  },
  driver: {
    title: "Driver Demo",
    email: "rudi@example.com",
    password: "driver123",
    role: "driver"
  },
  admin: {
    title: "Admin Demo",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  }
};

export const paymentMethods = [
  { id: "wallet", label: "GoPay Wallet", description: "Saldo langsung terpotong saat order dibuat." },
  { id: "cash", label: "Tunai", description: "Pembayaran diselesaikan saat trip atau paket diterima." }
];
