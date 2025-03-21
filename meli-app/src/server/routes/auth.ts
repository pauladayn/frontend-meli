import { Router } from "express";
import { handleLogin, handleCallback } from "../controllers/authControllers";

const authRouter = Router();

authRouter.get("/login", handleLogin);

authRouter.get("/callback", handleCallback);

export default authRouter;
