import { Router } from "express";
import authRouter from "./login/authRouter";
import userRouter from "./login/userRouter";
import passport from "../utils/passport";

const router = Router();

require("dotenv").config();

router.use(`${process.env.BASE_PATH || ''}/api/auth`, authRouter);

router.use(`${process.env.BASE_PATH || ''}/api/user`, passport.authenticate('jwt', { session: false }) , userRouter);

export default router;