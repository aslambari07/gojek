import cors from "cors";
import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Gojek clone API ready",
    docs: {
      health: "/api/health",
      auth: "/api/auth/login",
      customer: "/api/customer/dashboard",
      driver: "/api/driver/dashboard",
      admin: "/api/admin/dashboard"
    }
  });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ message: "Route tidak ditemukan" });
});

export default app;
