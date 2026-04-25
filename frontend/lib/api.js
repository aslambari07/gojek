const API_BASE_URL = "/api";

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Permintaan gagal");
  }

  return data;
}

export async function loginAccount(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export async function loginDemoCustomer() {
  return loginAccount({
    email: "alya@example.com",
    password: "demo123"
  });
}

export async function loginDemoDriver() {
  return loginAccount({
    email: "rudi@example.com",
    password: "driver123"
  });
}

export async function loginDemoAdmin() {
  return loginAccount({
    email: "admin@example.com",
    password: "admin123"
  });
}

export async function getCustomerDashboard(token) {
  return apiRequest("/customer/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getFareEstimate(params, token) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    search.set(key, typeof value === "string" ? value : JSON.stringify(value));
  });

  return apiRequest(`/customer/fare-estimate?${search.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function createOrder(payload, token) {
  return apiRequest("/customer/orders", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getWallet(token) {
  return apiRequest("/customer/wallet", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function topUpWallet(amount, token) {
  return apiRequest("/customer/wallet/top-up", {
    method: "POST",
    body: JSON.stringify({ amount }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getDriverDashboard(token) {
  return apiRequest("/driver/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateDriverStatus(status, token) {
  return apiRequest("/driver/status", {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function updateDriverOrderStatus(orderId, status, token) {
  return apiRequest(`/driver/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getAdminDashboard(token) {
  return apiRequest("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function getAdminOrders(token) {
  return apiRequest("/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
