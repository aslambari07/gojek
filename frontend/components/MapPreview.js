export default function MapPreview() {
  return (
    <div className="card map">
      <div className="map-point" style={{ top: "26%", left: "22%" }} />
      <div className="map-point" style={{ top: "52%", left: "58%", background: "#ff7a00" }} />
      <div className="map-point" style={{ top: "68%", left: "36%", background: "#00a6fb" }} />
      <div style={{ position: "absolute", left: 20, top: 20 }}>
        <span className="pill">Live map preview</span>
      </div>
      <div style={{ position: "absolute", right: 20, bottom: 20 }} className="card">
        <div style={{ fontWeight: 700 }}>Driver ETA 4 menit</div>
        <div className="muted" style={{ fontSize: 14 }}>Rudi • Honda Vario • 0.4 km</div>
      </div>
    </div>
  );
}
