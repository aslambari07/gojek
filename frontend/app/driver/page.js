"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { getDriverDashboard, loginDemoDriver, updateDriverOrderStatus, updateDriverStatus } from "@/lib/api";

const nextStatusMap = {
  assigned: "on_the_way",
  on_the_way: "completed",
  delivering: "completed",
  completed: "completed"
};

export default function DriverPage() {
  const [token, setToken] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  async function refreshDashboard(sessionToken) {
    const response = await getDriverDashboard(sessionToken);
    setDashboard(response.data);
  }

  useEffect(() => {
    let active = true;

    async function loadDriver() {
      try {
        const login = await loginDemoDriver();

        if (!active) {
          return;
        }

        setToken(login.token);
        await refreshDashboard(login.token);
      } catch (error) {
        if (active) {
          setStatusMessage(error.message);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadDriver();
    return () => {
      active = false;
    };
  }, []);

  async function handleToggleStatus() {
    if (!token || !dashboard?.profile) {
      return;
    }

    const nextStatus = dashboard.profile.status === "online" ? "offline" : "online";
    await updateDriverStatus(nextStatus, token);
    await refreshDashboard(token);
    setStatusMessage(`Status driver diubah menjadi ${nextStatus}.`);
  }

  async function handleAdvanceOrder(order) {
    if (!token) {
      return;
    }

    const nextStatus = nextStatusMap[order.status] || "completed";
    await updateDriverOrderStatus(order.id, nextStatus, token);
    await refreshDashboard(token);
    setStatusMessage(`${order.id} diperbarui ke status ${nextStatus}.`);
  }

  const profile = dashboard?.profile;
  const orders = dashboard?.orders || [];
  const earnings = dashboard?.earnings;

  return (
    <main className="shell grid">
      <section className="hero">
        <div className="card">
          <span className="pill">Driver App Live</span>
          <h1 className="section-title">{profile?.name || "Memuat driver..."}</h1>
          <p className="section-subtitle">
            {profile ? `${profile.vehicle} • Rating ${profile.rating} • Status ${profile.status}` : "Mengambil profil driver dari backend demo."}
          </p>
          <div className="row" style={{ marginTop: 16 }}>
            <button className="button" type="button" onClick={handleToggleStatus} disabled={!token}>
              {isLoading ? <LoaderCircle size={16} className="spin" /> : null}
              {profile?.status === "online" ? "Set Offline" : "Set Online"}
            </button>
            <button className="button-secondary" type="button">Buka navigasi</button>
          </div>
          {statusMessage ? <p className="status-success">{statusMessage}</p> : null}
        </div>
        <div className="card">
          <div className="muted">Penghasilan hari ini</div>
          <strong style={{ fontSize: 36 }}>Rp{Number(earnings?.today || 0).toLocaleString("id-ID")}</strong>
          <div className="muted" style={{ marginTop: 12 }}>Trip selesai: {earnings?.totalTrips || 0}</div>
        </div>
      </section>
      <section className="driver-grid">
        {orders.map((job) => (
          <div key={job.id} className="card">
            <div className="pill">{job.service}</div>
            <h3>{job.id}</h3>
            <p className="muted">{job.pickupAddress} → {job.destinationAddress}</p>
            <strong>Rp{job.fare.toLocaleString("id-ID")}</strong>
            <div className="muted" style={{ marginTop: 8 }}>Status: {job.status}</div>
            <div className="row" style={{ marginTop: 12 }}>
              <button className="button" type="button" onClick={() => handleAdvanceOrder(job)}>
                Lanjutkan status
              </button>
              <button className="button-secondary" type="button">Hubungi customer</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
