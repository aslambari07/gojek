import { Router } from "express";
import { bookOrder, getDashboard, getFareEstimate, getRestaurantDetail, getWallet, listRestaurants, submitReview, topUpWallet } from "../controllers/customer.controller.js";
import { authGuard, requireRole } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authGuard, requireRole("customer"));
router.get("/dashboard", getDashboard);
router.get("/fare-estimate", getFareEstimate);
router.post("/orders", bookOrder);
router.get("/restaurants", listRestaurants);
router.get("/restaurants/:slug", getRestaurantDetail);
router.get("/wallet", getWallet);
router.post("/wallet/top-up", topUpWallet);
router.post("/orders/:id/review", submitReview);

export default router;
