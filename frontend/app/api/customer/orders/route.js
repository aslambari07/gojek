import { NextResponse } from "next/server";
import { createOrder } from "../../../../lib/server/order-service.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function POST(request) {
  const auth = requireAuth(request, ["customer"]);

  if (auth.error) {
    return auth.error;
  }

  try {
    const body = await request.json();
    const result = createOrder({
      ...body,
      customerId: auth.user.sub
    });

    return NextResponse.json({
      message: "Order berhasil dibuat",
      data: result.order,
      meta: {
        estimation: result.estimation,
        driver: result.driver
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 422 });
  }
}
