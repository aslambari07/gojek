import { NextResponse } from "next/server";
import { orders } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["admin"]);

  if (auth.error) {
    return auth.error;
  }

  return NextResponse.json({ data: orders });
}
