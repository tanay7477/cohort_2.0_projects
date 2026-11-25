import { Router } from "express";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { register , verifyEmail ,login ,getMe } from "../controllers/auth.controllers.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);
authRouter.get("/verify-email",verifyEmail)
authRouter.post('/login', loginValidator ,login)
authRouter.get('/get-me',authUser , getMe)

export default authRouter;

