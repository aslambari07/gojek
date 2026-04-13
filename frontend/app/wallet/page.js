"use client";

import { useEffect, useState } from "react";
import { CreditCard, LoaderCircle, Wallet } from "lucide-react";
import { getWallet, loginDemoCustomer, topUpWallet } from "@/lib/api";

const quickAmounts = [50000, 100000, 200000];

export default function WalletPage() {
  const [token, setToken] = useState("");
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function refreshWallet(sessionToken) {
    const response = await getWallet(sessionToken);
    setWallet(response.data.wallet);
    setTransactions(response.data.transactions);
  }

  useEffect(() => {
    let active = true;

    async function loadWallet() {
      try {
        const login = await loginDemoCustomer();

        if (!active) {
          return;
        }

        setToken(login.token);
        await refreshWallet(login.token);
      } catch (error) {
        if (active) {
          setStatus(error.message);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadWallet();
    return () => {
      active = false;
    };
  }, []);

  async function handleTopUp(amount) {
    if (!token) {
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      await topUpWallet(amount, token);
      await refreshWallet(token);
      setStatus(`Top up Rp${amount.toLocaleString("id-ID")} berhasil.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="shell grid">
      <section className="hero">
        <div className="card">
          <span className="pill">GoPay & Pembayaran</span>
          <h1 className="section-title">Saldo digital, top-up, dan riwayat transaksi customer demo.</h1>
          <p className="section-subtitle">
            Halaman ini sekarang membaca wallet langsung dari backend, jadi saldo akan berubah setelah order atau top-up.
          </p>
          <div className="quick-actions" style={{ marginTop: 16 }}>
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className="button"
                onClick={() => handleTopUp(amount)}
                disabled={isSubmitting || !token}
              >
                {isSubmitting ? <LoaderCircle size={16} className="spin" /> : <CreditCard size={16} />}
                Top up Rp{amount.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
          {status ? <p className="status-success">{status}</p> : null}
        </div>
        <div className="card">
          <div className="muted">Saldo saat ini</div>
          <strong style={{ fontSize: 36 }}>
            {isLoading ? "Memuat..." : `Rp${Number(wallet?.balance || 0).toLocaleString("id-ID")}`}
          </strong>
          <div className="muted" style={{ marginTop: 12 }}>
            Metode pembayaran aktif: GoPay Wallet untuk debit instan, dan tunai untuk penyelesaian di lapangan.
          </div>
          <div className="pill" style={{ marginTop: 16 }}>
            <Wallet size={14} />
            Sinkron ke backend demo
          </div>
        </div>
      </section>

      <section className="grid">
        {transactions.map((item) => (
          <div key={item.id} className="card">
            <div className="row">
              <div>
                <strong>{item.label}</strong>
                <div className="muted">{new Date(item.createdAt).toLocaleString("id-ID")}</div>
              </div>
              <strong style={{ color: item.type === "credit" ? "#00AA13" : "#17301b" }}>
                {item.type === "credit" ? "+" : "-"}Rp{item.amount.toLocaleString("id-ID")}
              </strong>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
