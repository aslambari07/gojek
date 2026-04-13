import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ service }) {
  const hrefMap = {
    ride: "/order",
    food: "/order",
    send: "/order"
  };

  return (
    <div className="card" style={{ borderTop: `5px solid ${service.accent}` }}>
      <div className="pill" style={{ background: `${service.accent}18`, color: service.accent }}>
        {service.title}
      </div>
      <h3 style={{ marginBottom: 8 }}>{service.price}</h3>
      <p className="muted">{service.subtitle}</p>
      <ul className="list" style={{ marginTop: 14 }}>
        {service.priceDetails?.map((detail) => (
          <li key={detail} className="muted service-detail">
            {detail}
          </li>
        ))}
      </ul>
      <Link href={hrefMap[service.id]} className="button" style={{ marginTop: 12 }}>
        Buka layanan
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
