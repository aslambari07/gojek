import { NextResponse } from "next/server";
import { drivers, orders, restaurants, users, wallets } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["customer"]);

  if (auth.error) {
    return auth.error;
  }

  const user = users.find((item) => item.id === auth.user.sub);
  const wallet = wallets.find((item) => item.userId === auth.user.sub);
  const recentOrders = orders.filter((item) => item.customerId === auth.user.sub);

  return NextResponse.json({
    data: {
      profile: user,
      wallet,
      nearbyDrivers: drivers.filter((item) => item.verified),
      activeOrders: recentOrders,
      restaurants
    }
  });
}
