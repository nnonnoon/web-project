import { Router } from 'express';
import managerController from '../../controller/manager/managerController';

const router = Router();

router.post("/addCompetition", managerController.addCompetition);

router.get("/fetchAllCompetition", managerController.fetchAllCompetition);

export default router;