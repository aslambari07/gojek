import { NextResponse } from "next/server";
import { walletTransactions, wallets } from "../../../../../lib/server/store.js";
import { requireAuth } from "../../../../../lib/server/auth.js";

export async function POST(request) {
  const auth = requireAuth(request, ["customer"]);

  if (auth.error) {
    return auth.error;
  }

  const wallet = wallets.find((item) => item.userId === auth.user.sub);
  const { amount } = await request.json();
  const numericAmount = Number(amount || 0);

  if (!wallet || numericAmount <= 0) {
    return NextResponse.json({ message: "Nominal top-up tidak valid" }, { status: 422 });
  }

  wallet.balance += numericAmount;
  walletTransactions.unshift({
    id: `TRX-${walletTransactions.length + 1}`,
    userId: auth.user.sub,
    type: "credit",
    amount: numericAmount,
    label: "Top up saldo",
    createdAt: new Date().toISOString()
  });

  return NextResponse.json({ message: "Top-up berhasil", data: wallet });
}
