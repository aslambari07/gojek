import { NextResponse } from "next/server";
import { findAccountByEmail, generateToken } from "../../../../lib/server/auth-service.js";

export async function POST(request) {
  const { email, password } = await request.json();
  const account = findAccountByEmail(email);

  if (!account || account.password !== password) {
    return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
  }

  return NextResponse.json({
    message: "Login berhasil",
    token: generateToken(account),
    data: {
      id: account.id,
      name: account.name,
      role: account.role,
      email: account.email
    }
  });
}
