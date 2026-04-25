import { NextResponse } from "next/server";
import { walletTransactions, wallets } from "../../../../lib/server/store.js";
import { requireAuth } from "../../../../lib/server/auth.js";

export async function GET(request) {
  const auth = requireAuth(request, ["customer"]);

  if (auth.error) {
    return auth.error;
  }

  const wallet = wallets.find((item) => item.userId === auth.user.sub);
  const history = walletTransactions.filter((item) => item.userId === auth.user.sub);

  return NextResponse.json({ data: { wallet, transactions: history } });
}
