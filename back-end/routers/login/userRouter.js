import { Router } from 'express';
import userController from '../../controller/login/userController';

const router = Router();

router.post("/addUser", userController.addUser);

export default router;