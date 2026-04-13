"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Bike, LoaderCircle, Package, Sparkles, UtensilsCrossed, Wallet } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import MapPreview from "@/components/MapPreview";
import SectionCard from "@/components/SectionCard";
import ServiceCard from "@/components/ServiceCard";
import { getCustomerDashboard, loginDemoCustomer } from "@/lib/api";
import { activeOrders, customer, nearbyDrivers, orderPricing, restaurants, services, walletTransactions } from "@/lib/mock-data";

export default function HomePage() {
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const login = await loginDemoCustomer();
        const response = await getCustomerDashboard(login.token);

        if (active) {
          setDashboard(response.data);
        }
      } catch {
        if (active) {
          setDashboard(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();
    return () => {
      active = false;
    };
  }, []);

  const profile = dashboard?.profile || customer;
  const wallet = dashboard?.wallet || { balance: customer.walletBalance };
  const liveOrders = useMemo(
    () => dashboard?.activeOrders?.map((order) => ({
      id: order.id,
      pickup: order.pickupAddress,
      destination: order.destinationAddress,
      status: order.status,
      fare: order.fare
    })) || activeOrders,
    [dashboard]
  );
  const liveRestaurants = dashboard?.restaurants?.map((restaurant) => ({
    id: restaurant.slug,
    name: restaurant.name,
    category: restaurant.category,
    eta: `${restaurant.etaMinutes} min`,
    rating: restaurant.rating
  })) || restaurants;
  const liveDrivers = dashboard?.nearbyDrivers?.map((driver, index) => ({
    id: driver.id,
    name: driver.name,
    vehicle: driver.vehicle,
    rating: driver.rating,
    distance: `${0.4 + (index * 0.4)} km`
  })) || nearbyDrivers;
  const liveTransactions = dashboard?.wallet
    ? walletTransactions.map((item, index) => ({
        ...item,
        time: item.time || `${30 - index} Mar 2026`
      }))
    : walletTransactions;

  const rideTotal = orderPricing.ride.breakdown.reduce((sum, item) => sum + item.amount, 0);
  const sendTotal = orderPricing.send.breakdown.reduce((sum, item) => sum + item.amount, 0);
  const foodTotal = orderPricing.food.breakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <main className="shell grid">
      <section className="hero">
        <div className="card">
          <span className="pill">Simulasi Gojek Customer App</span>
          <h1 className="section-title">Dashboard customer, layanan, order, dan pembayaran dalam satu sistem.</h1>
          <p className="section-subtitle">
            Landing ini sekarang menampilkan ringkasan live dari backend demo supaya UI-nya langsung terasa sebagai aplikasi.
          </p>
          <div className="wallet-grid" style={{ marginTop: 20 }}>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Saldo</div>
              <strong style={{ fontSize: 24 }}>Rp{Number(wallet.balance || customer.walletBalance).toLocaleString("id-ID")}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">GoPoints</div>
              <strong style={{ fontSize: 24 }}>{profile.points || customer.points}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Status sistem</div>
              <strong style={{ fontSize: 18 }}>{isLoading ? "Sinkronisasi..." : "Live backend demo"}</strong>
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <Link href="/order" className="button">Pesan sekarang</Link>
            <Link href="/wallet" className="button-secondary">Kelola pembayaran</Link>
          </div>
        </div>
        <MapPreview />
      </section>

      <section className="simulation-banner">
        <div className="card simulation-panel simulation-panel-primary">
          <div className="pill" style={{ background: "#dff8e2", color: "#0b7c1f" }}>
            <Sparkles size={14} />
            Sistem Lengkap
          </div>
          <h2 style={{ marginBottom: 8 }}>Order, wallet, driver, dan admin sudah tersambung.</h2>
          <p className="section-subtitle">
            Simulasi sekarang tidak berhenti di UI. Estimasi, pembuatan order, dan transaksi pembayaran diproses dari backend.
          </p>
          <div className="simulation-stats">
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">GoRide</div>
              <strong>Rp{rideTotal.toLocaleString("id-ID")}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">GoSend</div>
              <strong>Rp{sendTotal.toLocaleString("id-ID")}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">GoFood</div>
              <strong>Rp{foodTotal.toLocaleString("id-ID")}</strong>
            </div>
          </div>
          <Link href="/order" className="button" style={{ marginTop: 16 }}>
            Buka UI simulasi
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card simulation-panel">
          <strong style={{ display: "block", marginBottom: 14 }}>Status backend</strong>
          <ul className="list">
            <li className="simulation-list-item">
              <strong>Customer dashboard</strong>
              <span className="muted">{isLoading ? "Mengambil data..." : `${liveOrders.length} order customer terdeteksi.`}</span>
            </li>
            <li className="simulation-list-item">
              <strong>Pembayaran</strong>
              <span className="muted">GoPay wallet dan tunai tersedia di checkout simulasi.</span>
            </li>
            <li className="simulation-list-item">
              <strong>Role app</strong>
              <span className="muted">Halaman customer, driver, admin, dan profile demo siap dipakai.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="service-grid">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </section>

      <section className="admin-grid">
        <SectionCard
          title="Booking Ride Cepat"
          subtitle="Ringkasan order customer dan driver terdekat dari sistem demo."
          action={isLoading ? <LoaderCircle size={18} className="spin" /> : <Bike color="#00AA13" />}
        >
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Pickup</div>
              <strong>{liveOrders[0]?.pickup || "Belum ada"}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Tujuan</div>
              <strong>{liveOrders[0]?.destination || "Belum ada"}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Order aktif</div>
              <strong>{liveOrders.length}</strong>
            </div>
            <div className="card" style={{ padding: 16 }}>
              <div className="muted">Saldo wallet</div>
              <strong>Rp{Number(wallet.balance || customer.walletBalance).toLocaleString("id-ID")}</strong>
            </div>
          </div>
          <ul className="list" style={{ marginTop: 16 }}>
            {liveDrivers.map((driver) => (
              <li key={driver.id} className="card" style={{ padding: 16 }}>
                <div className="row">
                  <div>
                    <strong>{driver.name}</strong>
                    <div className="muted">{driver.vehicle}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div>{driver.distance}</div>
                    <div className="muted">⭐ {driver.rating}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Wallet & Payment"
          subtitle="GoPay, top-up, dan riwayat pembayaran customer."
          action={<Bell color="#00AA13" />}
        >
          <ul className="list">
            {liveTransactions.map((item) => (
              <li key={item.id} className="row card" style={{ padding: 16 }}>
                <div>
                  <strong>{item.label}</strong>
                  <div className="muted">{item.time}</div>
                </div>
                <strong style={{ color: item.type === "credit" ? "#00AA13" : "#17301b" }}>
                  {item.type === "credit" ? "+" : "-"}Rp{item.amount.toLocaleString("id-ID")}
                </strong>
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="food-grid">
        <SectionCard title="GoFood Pilihan" subtitle="Restoran yang tersedia di sistem demo." action={<UtensilsCrossed color="#ff7a00" />}>
          <ul className="list">
            {liveRestaurants.map((restaurant) => (
              <li key={restaurant.id} className="card" style={{ padding: 16 }}>
                <div className="row">
                  <div>
                    <strong>{restaurant.name}</strong>
                    <div className="muted">{restaurant.category}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div>⭐ {restaurant.rating}</div>
                    <div className="muted">{restaurant.eta}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Order Aktif" subtitle="Status pemesanan customer saat ini." action={<Package color="#00a6fb" />}>
          <ul className="list">
            {liveOrders.map((order) => (
              <li key={order.id} className="card" style={{ padding: 16 }}>
                <div className="row">
                  <div>
                    <strong>{order.id}</strong>
                    <div className="muted">{order.pickup} → {order.destination}</div>
                    <div style={{ marginTop: 6 }}>{order.status}</div>
                  </div>
                  <strong>Rp{order.fare.toLocaleString("id-ID")}</strong>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <Link href="/wallet" className="floating" aria-label="Buka wallet">
        <Wallet size={24} />
      </Link>
      <BottomNav />
    </main>
  );
}
