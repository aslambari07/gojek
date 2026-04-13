"use client";

import { useEffect, useMemo, useState } from "react";
import { Bike, LoaderCircle, MapPinned, PackageCheck, ShoppingBag, Wallet } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import { createOrder, getFareEstimate, loginDemoCustomer } from "@/lib/api";
import { paymentMethods } from "@/lib/demo";
import { nearbyDrivers, restaurants, services } from "@/lib/mock-data";

const iconMap = {
  ride: Bike,
  send: PackageCheck,
  food: ShoppingBag
};

const initialForms = {
  ride: {
    pickupAddress: "Plaza Indonesia",
    destinationAddress: "Kuningan City",
    distanceKm: 7.2
  },
  send: {
    pickupAddress: "Tokopedia Care, Thamrin",
    destinationAddress: "Jl. Tebet Timur Dalam VIII",
    distanceKm: 5.4
  },
  food: {
    pickupAddress: "Warteg Bahari Express",
    destinationAddress: "Jl. Sudirman, Jakarta Selatan",
    distanceKm: 3.8,
    restaurantSlug: "warteg-bahari",
    items: [
      { id: "m1", qty: 1 },
      { id: "m2", qty: 1 }
    ]
  }
};

function getServiceKey(serviceId) {
  return serviceId === "send" ? "courier" : serviceId;
}

export default function OrderPage() {
  const [selectedService, setSelectedService] = useState("ride");
  const [token, setToken] = useState("");
  const [forms, setForms] = useState(initialForms);
  const [estimate, setEstimate] = useState(null);
  const [authError, setAuthError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  const activeForm = forms[selectedService];
  const selectedRestaurant = restaurants.find((item) => item.id === activeForm.restaurantSlug) || restaurants[0];
  const serviceMeta = services.find((item) => item.id === selectedService);
  const ActiveIcon = iconMap[selectedService];

  const normalizedItems = useMemo(() => (
    selectedService === "food"
      ? activeForm.items.filter((item) => item.qty > 0)
      : []
  ), [activeForm.items, selectedService]);

  useEffect(() => {
    let isActive = true;

    async function bootDemoSession() {
      try {
        const response = await loginDemoCustomer();

        if (isActive) {
          setToken(response.token);
          setAuthError("");
        }
      } catch (error) {
        if (isActive) {
          setAuthError(error.message);
        }
      }
    }

    bootDemoSession();
    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    async function fetchEstimate() {
      setIsLoadingEstimate(true);
      setRequestError("");

      try {
        const response = await getFareEstimate({
          service: getServiceKey(selectedService),
          distanceKm: Number(activeForm.distanceKm),
          restaurantSlug: selectedService === "food" ? selectedRestaurant.id : undefined,
          items: selectedService === "food" ? normalizedItems : undefined
        }, token);

        if (isActive) {
          setEstimate(response.data);
        }
      } catch (error) {
        if (isActive) {
          setEstimate(null);
          setRequestError(error.message);
        }
      } finally {
        if (isActive) {
          setIsLoadingEstimate(false);
        }
      }
    }

    fetchEstimate();
    return () => {
      isActive = false;
    };
  }, [activeForm.distanceKm, normalizedItems, selectedRestaurant.id, selectedService, token]);

  function updateField(field, value) {
    setForms((current) => ({
      ...current,
      [selectedService]: {
        ...current[selectedService],
        [field]: value
      }
    }));
    setSuccessMessage("");
  }

  function updateFoodQty(itemId, qty) {
    setForms((current) => ({
      ...current,
      food: {
        ...current.food,
        items: current.food.items.map((item) => (
          item.id === itemId ? { ...item, qty } : item
        ))
      }
    }));
    setSuccessMessage("");
  }

  async function handleCreateOrder() {
    if (!token || !estimate) {
      return;
    }

    setIsSubmitting(true);
    setRequestError("");
    setSuccessMessage("");

    try {
      const payload = {
        service: getServiceKey(selectedService),
        pickupAddress: selectedService === "food" ? selectedRestaurant.name : activeForm.pickupAddress,
        destinationAddress: activeForm.destinationAddress,
        distanceKm: Number(activeForm.distanceKm),
        paymentMethod,
        restaurantSlug: selectedService === "food" ? selectedRestaurant.id : undefined,
        items: selectedService === "food" ? normalizedItems : undefined
      };

      const response = await createOrder(payload, token);
      const driver = response.meta?.driver;
      setSuccessMessage(
        `${response.data.id} berhasil dibuat. Driver ${driver?.name || "siap ditugaskan"} dengan total Rp${response.data.fare.toLocaleString("id-ID")} via ${paymentMethods.find((item) => item.id === paymentMethod)?.label}.`
      );
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="shell grid">
      <section className="hero">
        <SectionCard
          title="Simulasi Order Gojek"
          subtitle="Frontend sederhana, tapi hitung tarif dan pembuatan order diambil dari backend demo."
          action={<div className="pill">Sistem live</div>}
        >
          <div className="service-selector">
            {services.map((service) => {
              const ServiceIcon = iconMap[service.id];
              const isActive = service.id === selectedService;

              return (
                <button
                  key={service.id}
                  type="button"
                  className={`service-option ${isActive ? "active" : ""}`}
                  style={{ "--service-accent": service.accent }}
                  onClick={() => {
                    setSelectedService(service.id);
                    setRequestError("");
                    setSuccessMessage("");
                  }}
                >
                  <div className="row" style={{ alignItems: "flex-start" }}>
                    <div>
                      <div className="pill" style={{ background: `${service.accent}18`, color: service.accent }}>
                        <ServiceIcon size={14} />
                        {service.title}
                      </div>
                      <strong style={{ display: "block", marginTop: 12 }}>{service.price}</strong>
                    </div>
                    <span className="muted">{service.eta}</span>
                  </div>
                  <p className="muted" style={{ marginBottom: 0 }}>{service.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="order-layout">
            <div className="card" style={{ padding: 18 }}>
              <div className="row" style={{ alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div className="pill" style={{ background: `${serviceMeta.accent}18`, color: serviceMeta.accent }}>
                    <ActiveIcon size={14} />
                    {serviceMeta.title}
                  </div>
                  <h3 style={{ marginBottom: 8 }}>Form order aktif</h3>
                  <p className="muted" style={{ margin: 0 }}>
                    Ubah alamat, jarak, atau item. Estimasi akan dihitung ulang dari backend.
                  </p>
                </div>
                <strong style={{ fontSize: 22 }}>
                  {estimate ? `Rp${estimate.estimatedFare.toLocaleString("id-ID")}` : "Estimasi..."}
                </strong>
              </div>

              <div className="form-grid">
                {selectedService === "food" ? (
                  <>
                    <label className="field">
                      <span>Restoran</span>
                      <select
                        value={activeForm.restaurantSlug}
                        onChange={(event) => updateField("restaurantSlug", event.target.value)}
                      >
                        {restaurants.map((restaurant) => (
                          <option key={restaurant.id} value={restaurant.id}>{restaurant.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="field">
                      <span>Alamat antar</span>
                      <input
                        value={activeForm.destinationAddress}
                        onChange={(event) => updateField("destinationAddress", event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Jarak kirim (km)</span>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={activeForm.distanceKm}
                        onChange={(event) => updateField("distanceKm", event.target.value)}
                      />
                    </label>
                    <div className="food-item-list">
                      {selectedRestaurant.menu.map((item) => {
                        const currentItem = activeForm.items.find((entry) => entry.id === item.id);
                        const qty = currentItem?.qty || 0;

                        return (
                          <div key={item.id} className="card" style={{ padding: 14 }}>
                            <div className="row">
                              <div>
                                <strong>{item.name}</strong>
                                <div className="muted">Rp{item.price.toLocaleString("id-ID")}</div>
                              </div>
                              <input
                                className="qty-input"
                                type="number"
                                min="0"
                                value={qty}
                                onChange={(event) => updateFoodQty(item.id, Number(event.target.value))}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <label className="field">
                      <span>Pickup</span>
                      <input
                        value={activeForm.pickupAddress}
                        onChange={(event) => updateField("pickupAddress", event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Tujuan</span>
                      <input
                        value={activeForm.destinationAddress}
                        onChange={(event) => updateField("destinationAddress", event.target.value)}
                      />
                    </label>
                    <label className="field">
                      <span>Jarak (km)</span>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={activeForm.distanceKm}
                        onChange={(event) => updateField("distanceKm", event.target.value)}
                      />
                    </label>
                  </>
                )}
              </div>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <strong style={{ display: "block", marginBottom: 14 }}>Ringkasan sistem</strong>
              <ul className="list">
                <li className="row">
                  <span className="muted">Metode bayar</span>
                  <div className="pill">
                    <Wallet size={14} />
                    {paymentMethods.find((item) => item.id === paymentMethod)?.label}
                  </div>
                </li>
                <li className="row">
                  <span className="muted">Autentikasi demo</span>
                  <strong>{token ? "Login customer aktif" : "Menyiapkan sesi..."}</strong>
                </li>
                <li className="row">
                  <span className="muted">ETA backend</span>
                  <strong>{estimate ? `${estimate.etaMinutes} menit` : "-"}</strong>
                </li>
              </ul>

              <div className="card" style={{ padding: 14, marginTop: 16, background: "#f7fbf7" }}>
                <strong style={{ display: "block", marginBottom: 10 }}>Metode pembayaran</strong>
                <div className="payment-methods">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      className={`payment-method ${paymentMethod === method.id ? "active" : ""}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <strong>{method.label}</strong>
                      <span className="muted">{method.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card" style={{ padding: 14, marginTop: 16, background: "#f7fbf7" }}>
                <strong style={{ display: "block", marginBottom: 10 }}>Rincian harga</strong>
                {isLoadingEstimate ? (
                  <div className="muted row" style={{ justifyContent: "flex-start" }}>
                    <LoaderCircle size={16} className="spin" />
                    Menghitung estimasi...
                  </div>
                ) : estimate ? (
                  <ul className="list">
                    {estimate.breakdown.map((item) => (
                      <li key={item.label} className="row">
                        <span className="muted">{item.label}</span>
                        <strong>Rp{item.amount.toLocaleString("id-ID")}</strong>
                      </li>
                    ))}
                    <li className="row" style={{ paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <strong>Total</strong>
                      <strong style={{ color: serviceMeta.accent }}>
                        Rp{estimate.estimatedFare.toLocaleString("id-ID")}
                      </strong>
                    </li>
                  </ul>
                ) : (
                  <p className="muted" style={{ margin: 0 }}>Estimasi belum tersedia.</p>
                )}
              </div>

              <button
                type="button"
                className="button"
                style={{ marginTop: 16, width: "100%" }}
                onClick={handleCreateOrder}
                disabled={!token || !estimate || isSubmitting}
              >
                {isSubmitting ? <LoaderCircle size={18} className="spin" /> : <ActiveIcon size={18} />}
                {isSubmitting ? "Memproses order..." : `Pesan ${serviceMeta.title}`}
              </button>

              {authError ? <p className="status-error">{authError}</p> : null}
              {requestError ? <p className="status-error">{requestError}</p> : null}
              {successMessage ? <p className="status-success">{successMessage}</p> : null}
            </div>
          </div>
        </SectionCard>

        <div className="card map">
          <div className="map-point" style={{ top: "20%", left: "26%" }} />
          <div className="map-point" style={{ top: "62%", left: "60%", background: serviceMeta.accent }} />
          <div style={{ position: "absolute", left: 16, top: 16 }} className="pill">
            <MapPinned size={14} />
            {selectedService === "food" ? selectedRestaurant.name : activeForm.pickupAddress}
          </div>
          <div style={{ position: "absolute", right: 16, bottom: 16 }} className="pill">
            {activeForm.destinationAddress}
          </div>
        </div>
      </section>

      <SectionCard title="Driver Terdekat" subtitle="Driver ini dipakai sebagai kandidat assignment otomatis.">
        <div className="stats-grid">
          {nearbyDrivers.map((driver) => (
            <div key={driver.id} className="card" style={{ padding: 16 }}>
              <strong>{driver.name}</strong>
              <div className="muted">{driver.vehicle}</div>
              <div style={{ marginTop: 12 }}>{driver.distance} • ⭐ {driver.rating}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
