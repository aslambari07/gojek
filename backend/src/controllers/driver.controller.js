import { drivers, orders } from "../data/store.js";

export function getDriverDashboard(req, res) {
  const driver = drivers.find((item) => item.id === req.user.sub);
  const assignedOrders = orders.filter((item) => item.driverId === req.user.sub);

  return res.json({
    data: {
      profile: driver,
      orders: assignedOrders,
      earnings: {
        today: driver?.earnings || 0,
        totalTrips: assignedOrders.length
      }
    }
  });
}

export function toggleStatus(req, res) {
  const driver = drivers.find((item) => item.id === req.user.sub);
  driver.status = req.body.status || (driver.status === "online" ? "offline" : "online");
  return res.json({ message: "Status driver diupdate", data: driver });
}

export function updateOrderStatus(req, res) {
  const order = orders.find((item) => item.id === req.params.id && item.driverId === req.user.sub);

  if (!order) {
    return res.status(404).json({ message: "Order tidak ditemukan" });
  }

  order.status = req.body.status;
  return res.json({ message: "Status order diperbarui", data: order });
}
