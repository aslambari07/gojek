import { Router } from "express";
import { getDriverDashboard, toggleStatus, updateOrderStatus } from "../controllers/driver.controller.js";
import { authGuard, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authGuard, requireRole("driver"));
router.get("/dashboard", getDriverDashboard);
router.patch("/status", toggleStatus);
router.patch("/orders/:id/status", updateOrderStatus);

export default router;
