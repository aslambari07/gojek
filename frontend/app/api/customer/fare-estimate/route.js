import { NextResponse } from "next/server";
import { estimateFare } from "../../../../lib/server/order-service.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["customer"]);

  if (auth.error) {
    return auth.error;
  }

  const { searchParams } = new URL(request.url);
  const distanceKm = Number(searchParams.get("distanceKm") || 0);
  const service = searchParams.get("service") || "ride";

  try {
    const restaurantSlug = searchParams.get("restaurantSlug");
    const itemsParam = searchParams.get("items");
    const items = typeof itemsParam === "string" ? JSON.parse(itemsParam) : [];
    const estimation = estimateFare(distanceKm, service, { restaurantSlug, items });

    return NextResponse.json({
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
    return NextResponse.json({ message: error.message }, { status: 422 });
  }
}
