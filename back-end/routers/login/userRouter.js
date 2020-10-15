import { Router } from 'express';
import userController from '../../controller/login/userController';

const router = Router();

router.post("/addUser", userController.addUser);
router.post("/changePassword", userController.changePassword);
router.get("/fetchAllUser", userController.fetchAllUser);
router.delete("/deleteUser/:index", userController.deleteUser);

export default router;