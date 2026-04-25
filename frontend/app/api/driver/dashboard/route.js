import { NextResponse } from "next/server";
import { drivers, orders } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["driver"]);

  if (auth.error) {
    return auth.error;
  }

  const driver = drivers.find((item) => item.id === auth.user.sub);
  const assignedOrders = orders.filter((item) => item.driverId === auth.user.sub);

  return NextResponse.json({
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
