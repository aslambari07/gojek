import { demoAccounts } from "@/lib/demo";

export default function ProfilePage() {
  return (
    <main className="shell grid">
      <div className="card">
        <span className="pill">Akun Demo & Sistem</span>
        <h1 className="section-title">Akun, keamanan, role, dan akses simulasi.</h1>
        <div className="stats-grid">
          {Object.values(demoAccounts).map((account) => (
            <div key={account.email} className="card" style={{ padding: 16 }}>
              <div className="muted">{account.title}</div>
              <strong>{account.email}</strong>
              <div className="muted" style={{ marginTop: 8 }}>Password: {account.password}</div>
              <div className="pill" style={{ marginTop: 12 }}>{account.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Fitur sistem yang tersedia</h3>
        <div className="stats-grid">
          <div className="card" style={{ padding: 16 }}>
            <div className="muted">Auth</div>
            <strong>Email login, OTP demo, forgot password</strong>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="muted">Payment</div>
            <strong>GoPay wallet, top-up, debit order, tunai</strong>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="muted">Roles</div>
            <strong>Customer, driver, admin dengan dashboard terpisah</strong>
          </div>
        </div>
      </div>
    </main>
  );
}
