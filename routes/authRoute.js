import express from "express";
import * as authController from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", authController.userRegister);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
//protected route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
