export default function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className="card">
      {(title || subtitle || action) && (
        <div className="row" style={{ marginBottom: 16, alignItems: "flex-start" }}>
          <div>
            {title ? <h3 style={{ margin: 0, fontSize: 20 }}>{title}</h3> : null}
            {subtitle ? <p className="muted" style={{ margin: "6px 0 0" }}>{subtitle}</p> : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
