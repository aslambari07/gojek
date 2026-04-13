import { Router } from "express";
import adminRoutes from "./admin.routes.js";
import authRoutes from "./auth.routes.js";
import customerRoutes from "./customer.routes.js";
import driverRoutes from "./driver.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "gojek-clone-api" });
});

router.use("/auth", authRoutes);
router.use("/customer", customerRoutes);
router.use("/driver", driverRoutes);
router.use("/admin", adminRoutes);

export default router;
