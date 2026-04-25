import { drivers, orders, restaurants, users, walletTransactions, wallets } from "./store.js";

const SERVICE_ALIAS = {
  ride: "ride",
  send: "courier",
  courier: "courier",
  food: "food"
};

function normalizeService(service) {
  return SERVICE_ALIAS[service] || "ride";
}

export function estimateFare(distanceKm, service, options = {}) {
  const normalizedService = normalizeService(service);
  const safeDistance = Math.max(Number(distanceKm) || 0, 0);

  if (normalizedService === "food") {
    const restaurant = restaurants.find((item) => item.slug === options.restaurantSlug || item.id === options.restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant tidak ditemukan");
    }

    const items = Array.isArray(options.items) ? options.items : [];
    const normalizedItems = items
      .map((item) => {
        const menu = restaurant.menu.find((entry) => entry.id === item.id);
        const qty = Number(item.qty) || 0;

        if (!menu || qty <= 0) {
          return null;
        }

        return {
          id: menu.id,
          name: menu.name,
          qty,
          price: menu.price,
          subtotal: menu.price * qty
        };
      })
      .filter(Boolean);

    if (normalizedItems.length === 0) {
      throw new Error("Item GoFood belum dipilih");
    }

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const packagingFee = normalizedItems.length * 1000;
    const deliveryFee = restaurant.deliveryFee;
    const platformFee = 3000;
    const total = subtotal + packagingFee + deliveryFee + platformFee;

    return {
      service: normalizedService,
      breakdown: [
        { label: "Subtotal menu", amount: subtotal },
        { label: "Biaya kemasan", amount: packagingFee },
        { label: "Ongkir", amount: deliveryFee },
        { label: "Biaya layanan", amount: platformFee }
      ],
      total,
      items: normalizedItems,
      etaMinutes: restaurant.etaMinutes
    };
  }

  const config = {
    ride: {
      baseFare: 5000,
      pricePerKm: 2500,
      platformFee: 2000,
      minimumFare: 12000,
      etaBase: 5
    },
    courier: {
      pickupFee: 7000,
      pricePerKm: 1800,
      protectionFee: 2500,
      platformFee: 1500,
      minimumFare: 15000,
      etaBase: 10
    }
  }[normalizedService];

  const rawBreakdown = normalizedService === "ride"
    ? [
        { label: "Tarif dasar", amount: config.baseFare },
        { label: "Tarif jarak", amount: Math.round(safeDistance * config.pricePerKm) },
        { label: "Biaya aplikasi", amount: config.platformFee }
      ]
    : [
        { label: "Biaya pickup", amount: config.pickupFee },
        { label: "Tarif jarak", amount: Math.round(safeDistance * config.pricePerKm) },
        { label: "Biaya perlindungan", amount: config.protectionFee },
        { label: "Biaya aplikasi", amount: config.platformFee }
      ];

  const subtotal = rawBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const total = Math.max(subtotal, config.minimumFare);
  const breakdown = subtotal < total
    ? [...rawBreakdown, { label: "Penyesuaian minimum order", amount: total - subtotal }]
    : rawBreakdown;

  return {
    service: normalizedService,
    breakdown,
    total,
    etaMinutes: config.etaBase + Math.ceil(safeDistance * 1.5)
  };
}

function assignNearestDriver() {
  const onlineDrivers = drivers.filter((driver) => driver.status === "online" && driver.verified);
  return onlineDrivers.sort((a, b) => b.rating - a.rating)[0] || drivers[0];
}

export function createOrder(payload) {
  const normalizedService = normalizeService(payload.service);
  const distanceKm = Math.max(Number(payload.distanceKm) || 0, 0);
  const customer = users.find((user) => user.id === payload.customerId);

  if (!customer) {
    throw new Error("Customer tidak ditemukan");
  }

  if (!payload.pickupAddress || !payload.destinationAddress) {
    throw new Error("Alamat pickup dan tujuan wajib diisi");
  }

  const estimation = estimateFare(distanceKm, normalizedService, payload);
  const paymentMethod = payload.paymentMethod || "wallet";
  const driver = assignNearestDriver();

  if (!driver) {
    throw new Error("Driver tidak tersedia");
  }

  if (paymentMethod === "wallet") {
    const wallet = wallets.find((item) => item.userId === payload.customerId);

    if (!wallet || wallet.balance < estimation.total) {
      throw new Error("Saldo wallet tidak mencukupi");
    }

    wallet.balance -= estimation.total;
    customer.walletBalance = wallet.balance;
    walletTransactions.unshift({
      id: `TRX-${walletTransactions.length + 1}`,
      userId: payload.customerId,
      type: "debit",
      amount: estimation.total,
      label: `Pembayaran ${normalizedService === "food" ? "GoFood" : normalizedService === "courier" ? "GoSend" : "GoRide"}`,
      createdAt: new Date().toISOString()
    });
  }

  const order = {
    id: `ORD-${10020 + orders.length + 1}`,
    customerId: payload.customerId,
    driverId: driver.id,
    service: normalizedService,
    status: "assigned",
    pickupAddress: payload.pickupAddress,
    destinationAddress: payload.destinationAddress,
    distanceKm,
    fare: estimation.total,
    fareBreakdown: estimation.breakdown,
    paymentMethod,
    restaurantSlug: payload.restaurantSlug || null,
    items: estimation.items || [],
    etaMinutes: estimation.etaMinutes,
    rating: null,
    review: null
  };

  orders.unshift(order);
  driver.earnings += estimation.total;
  return { order, estimation, driver };
}
