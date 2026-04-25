import jwt from "jsonwebtoken";
import { env } from "./env.js";

export function getBearerToken(request) {
  const header = request.headers.get("authorization");
  return header?.startsWith("Bearer ") ? header.slice(7) : null;
}

export function requireAuth(request, roles = []) {
  const token = getBearerToken(request);

  if (!token) {
    return { error: Response.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const user = jwt.verify(token, env.jwtSecret);

    if (roles.length > 0 && !roles.includes(user.role)) {
      return { error: Response.json({ message: "Forbidden" }, { status: 403 }) };
    }

    return { user };
  } catch {
    return { error: Response.json({ message: "Invalid token" }, { status: 401 }) };
  }
}
