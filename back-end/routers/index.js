import { Router } from "express";
import authRouter from "./login/authRouter";
import userRouter from "./login/userRouter";
import managerRouter from "./manager/managerRouter";
import tagsRouter from "./tags/tagsRouter";
import passport from "../utils/passport";

const router = Router();

require("dotenv").config();

router.use(`${process.env.BASE_PATH || ''}/api/auth`, authRouter);

router.use(`${process.env.BASE_PATH || ''}/api/user`, passport.authenticate('jwt', { session: false }) , userRouter);

router.use(`${process.env.BASE_PATH || ''}/api/manager`, passport.authenticate('jwt', { session: false }) , managerRouter);

router.use(`${process.env.BASE_PATH || ''}/api/tags`, passport.authenticate('jwt', { session: false }) , tagsRouter);

export default router;