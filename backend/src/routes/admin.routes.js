import { Router } from "express";
import { getAdminDashboard, getReports, listDrivers, listUsers, monitorOrders, suspendAccount, verifyDriver } from "../controllers/admin.controller.js";
import { authGuard, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authGuard, requireRole("admin"));
router.get("/dashboard", getAdminDashboard);
router.get("/users", listUsers);
router.get("/drivers", listDrivers);
router.patch("/drivers/:id/verify", verifyDriver);
router.patch("/accounts/:id/suspend", suspendAccount);
router.get("/orders", monitorOrders);
router.get("/reports", getReports);

export default router;
