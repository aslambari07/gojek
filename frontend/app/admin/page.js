"use client";

import { useEffect, useState } from "react";
import { getAdminDashboard, getAdminOrders, loginDemoAdmin } from "@/lib/api";
import { systemHighlights } from "@/lib/mock-data";

export default function AdminPage() {
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadAdmin() {
      try {
        const login = await loginDemoAdmin();
        const [dashboardResponse, ordersResponse] = await Promise.all([
          getAdminDashboard(login.token),
          getAdminOrders(login.token)
        ]);

        if (active) {
          setDashboard(dashboardResponse.data);
          setOrders(ordersResponse.data);
        }
      } catch {
        if (active) {
          setDashboard(null);
          setOrders([]);
        }
      }
    }

    loadAdmin();
    return () => {
      active = false;
    };
  }, []);

  const stats = [
    { label: "Total User", value: dashboard?.totalUsers || 0 },
    { label: "Total Driver", value: dashboard?.totalDrivers || 0 },
    { label: "Total Order", value: dashboard?.totalOrders || 0 },
    { label: "Pendapatan", value: `Rp${Number(dashboard?.revenue || 0).toLocaleString("id-ID")}` }
  ];

  return (
    <main className="shell grid">
      <div className="card">
        <span className="pill">Admin Panel Live</span>
        <h1 className="section-title">Monitoring user, driver, order, dan keuangan secara realtime.</h1>
        <div className="stats-grid" style={{ marginTop: 16 }}>
          {stats.map((item) => (
            <div key={item.label} className="card" style={{ padding: 16 }}>
              <div className="muted">{item.label}</div>
              <strong style={{ fontSize: 28 }}>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <section className="admin-grid">
        <div className="card">
          <h3>Operational Monitor</h3>
          <ul className="list">
            {orders.map((item) => (
              <li key={item.id} className="card" style={{ padding: 16 }}>
                {item.id} • {item.service} • {item.status}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>System Highlights</h3>
          <ul className="list">
            {systemHighlights.map((item) => (
              <li key={item} className="card" style={{ padding: 16 }}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
