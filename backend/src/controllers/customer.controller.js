import { drivers, orders, restaurants, users, walletTransactions, wallets } from "../data/store.js";
import { createOrder, estimateFare } from "../services/order.service.js";

export function getDashboard(req, res) {
  const user = users.find((item) => item.id === req.user.sub);
  const wallet = wallets.find((item) => item.userId === req.user.sub);
  const recentOrders = orders.filter((item) => item.customerId === req.user.sub);

  return res.json({
    data: {
      profile: user,
      wallet,
      nearbyDrivers: drivers.filter((item) => item.verified),
      activeOrders: recentOrders,
      restaurants
    }
  });
}

export function getFareEstimate(req, res) {
  const distanceKm = Number(req.query.distanceKm || 0);
  const service = req.query.service || "ride";

  try {
    const restaurantSlug = req.query.restaurantSlug;
    const items = typeof req.query.items === "string"
      ? JSON.parse(req.query.items)
      : [];
    const estimation = estimateFare(distanceKm, service, { restaurantSlug, items });

    return res.json({
      data: {
        service,
        distanceKm,
        estimatedFare: estimation.total,
        breakdown: estimation.breakdown,
        etaMinutes: estimation.etaMinutes,
        items: estimation.items || []
      }
    });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}

export function bookOrder(req, res) {
  try {
    const result = createOrder({
      ...req.body,
      customerId: req.user.sub
    });

    return res.status(201).json({
      message: "Order berhasil dibuat",
      data: result.order,
      meta: {
        estimation: result.estimation,
        driver: result.driver
      }
    });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}

export function listRestaurants(req, res) {
  return res.json({ data: restaurants });
}

export function getRestaurantDetail(req, res) {
  const restaurant = restaurants.find((item) => item.slug === req.params.slug);

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant tidak ditemukan" });
  }

  return res.json({ data: restaurant });
}

export function getWallet(req, res) {
  const wallet = wallets.find((item) => item.userId === req.user.sub);
  const history = walletTransactions.filter((item) => item.userId === req.user.sub);

  return res.json({ data: { wallet, transactions: history } });
}

export function topUpWallet(req, res) {
  const wallet = wallets.find((item) => item.userId === req.user.sub);
  const amount = Number(req.body.amount || 0);

  if (!wallet || amount <= 0) {
    return res.status(422).json({ message: "Nominal top-up tidak valid" });
  }

  wallet.balance += amount;
  walletTransactions.unshift({
    id: `TRX-${walletTransactions.length + 1}`,
    userId: req.user.sub,
    type: "credit",
    amount,
    label: "Top up saldo",
    createdAt: new Date().toISOString()
  });

  return res.json({ message: "Top-up berhasil", data: wallet });
}

export function submitReview(req, res) {
  const order = orders.find((item) => item.id === req.params.id && item.customerId === req.user.sub);

  if (!order) {
    return res.status(404).json({ message: "Order tidak ditemukan" });
  }

  order.rating = req.body.rating;
  order.review = req.body.review;
  return res.json({ message: "Rating berhasil dikirim", data: order });
}
