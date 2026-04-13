import Link from "next/link";
import SectionCard from "@/components/SectionCard";
import { restaurants } from "@/lib/mock-data";

export default function RestaurantsPage() {
  return (
    <main className="shell grid">
      <SectionCard title="GoFood" subtitle="List restoran, ETA, rating, dan delivery fee.">
        <div className="food-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="card">
              <div className="pill" style={{ background: "#fff1e4", color: "#ff7a00" }}>{restaurant.category}</div>
              <h3>{restaurant.name}</h3>
              <p className="muted">⭐ {restaurant.rating} • {restaurant.eta}</p>
              <p>Ongkir Rp{restaurant.deliveryFee.toLocaleString("id-ID")}</p>
              <Link href={`/restaurants/${restaurant.id}`} className="button">Lihat menu</Link>
            </div>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
