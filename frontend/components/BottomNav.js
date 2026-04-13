import Link from "next/link";
import { CircleUserRound, House, ReceiptText, Wallet } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/order", label: "Order", icon: ReceiptText },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: CircleUserRound }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ href, label, icon: Icon }) => (
        <Link key={href} href={href} className="button-secondary" style={{ padding: 12, flexDirection: "column" }}>
          <Icon size={18} />
          <span style={{ fontSize: 12 }}>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
