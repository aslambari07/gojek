import { NextResponse } from "next/server";
import { drivers } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function PATCH(request) {
  const auth = requireAuth(request, ["driver"]);

  if (auth.error) {
    return auth.error;
  }

  const driver = drivers.find((item) => item.id === auth.user.sub);
  const { status } = await request.json();

  driver.status = status || (driver.status === "online" ? "offline" : "online");
  return NextResponse.json({ message: "Status driver diupdate", data: driver });
}
