import "./globals.css";

export const metadata = {
  title: "Gojek Clone Suite",
  description: "Multi-service transport, food, courier, wallet, driver, and admin dashboard"
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
