import { drivers, orders, users, walletTransactions } from "../data/store.js";

export function getAdminDashboard(req, res) {
  const revenue = orders.reduce((sum, item) => sum + item.fare * 0.2, 0);

  return res.json({
    data: {
      totalUsers: users.length,
      totalDrivers: drivers.length,
      totalOrders: orders.length,
      revenue,
      transactions: walletTransactions.length
    }
  });
}

export function listUsers(req, res) {
  return res.json({ data: users });
}

export function listDrivers(req, res) {
  return res.json({ data: drivers });
}

export function verifyDriver(req, res) {
  const driver = drivers.find((item) => item.id === req.params.id);

  if (!driver) {
    return res.status(404).json({ message: "Driver tidak ditemukan" });
  }

  driver.verified = true;
  return res.json({ message: "Driver verified", data: driver });
}

export function suspendAccount(req, res) {
  const account = [...users, ...drivers].find((item) => item.id === req.params.id);

  if (!account) {
    return res.status(404).json({ message: "Akun tidak ditemukan" });
  }

  account.status = "suspended";
  return res.json({ message: "Akun disuspend", data: account });
}

export function monitorOrders(req, res) {
  return res.json({ data: orders });
}

export function getReports(req, res) {
  return res.json({
    data: {
      walletTransactions,
      applicationFeeRate: "20%",
      generatedAt: new Date().toISOString()
    }
  });
}
