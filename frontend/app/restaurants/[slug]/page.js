import { restaurants } from "@/lib/mock-data";

export default async function RestaurantDetailPage({ params }) {
  const { slug } = await params;
  const restaurant = restaurants.find((item) => item.id === slug) ?? restaurants[0];

  return (
    <main className="shell grid">
      <section className="hero">
        <div className="card">
          <div className="pill" style={{ background: "#fff1e4", color: "#ff7a00" }}>{restaurant.category}</div>
          <h1 className="section-title">{restaurant.name}</h1>
          <p className="section-subtitle">Rating {restaurant.rating} • ETA {restaurant.eta} • Ongkir Rp{restaurant.deliveryFee.toLocaleString("id-ID")}</p>
        </div>
        <div className="card">
          <h3>Cart summary</h3>
          <p className="muted">Subtotal, delivery fee, dan checkout bisa dihubungkan ke wallet atau payment gateway.</p>
          <strong>Total contoh: Rp57.000</strong>
        </div>
      </section>
      <section className="food-grid">
        {restaurant.menu.map((menu) => (
          <div key={menu.id} className="card">
            <h3>{menu.name}</h3>
            <p className="muted">Menu dummy untuk proses add to cart.</p>
            <strong>Rp{menu.price.toLocaleString("id-ID")}</strong>
            <button className="button" style={{ marginTop: 12 }}>Tambah ke cart</button>
          </div>
        ))}
      </section>
    </main>
  );
}
