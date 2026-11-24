import { Router } from "express";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";
import { register } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, register);

export default authRouter;

