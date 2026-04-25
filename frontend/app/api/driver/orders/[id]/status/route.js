import { NextResponse } from "next/server";
import { orders } from "../../../../../../lib/server/store.js";
import { requireAuth } from "../../../../../../lib/server/auth.js";

export async function PATCH(request, { params }) {
  const auth = requireAuth(request, ["driver"]);

  if (auth.error) {
    return auth.error;
  }

  const order = orders.find((item) => item.id === params.id && item.driverId === auth.user.sub);

  if (!order) {
    return NextResponse.json({ message: "Order tidak ditemukan" }, { status: 404 });
  }

  const { status } = await request.json();
  order.status = status;

  return NextResponse.json({ message: "Status order diperbarui", data: order });
}
