import { NextResponse } from "next/server";
import { drivers, orders, users, walletTransactions } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["admin"]);

  if (auth.error) {
    return auth.error;
  }

  const revenue = orders.reduce((sum, item) => sum + item.fare * 0.2, 0);

  return NextResponse.json({
    data: {
      totalUsers: users.length,
      totalDrivers: drivers.length,
      totalOrders: orders.length,
      revenue,
      transactions: walletTransactions.length
    }
  });
}
