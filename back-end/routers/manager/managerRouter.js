import { Router } from 'express';
import managerController from '../../controller/manager/managerController';
import managerDomain from '../../domain/manager/managerDomain';

const router = Router();

router.post("/addCompetition", managerController.addCompetition);
router.get("/fetchAllCompetition", managerController.fetchAllCompetition);
router.delete("/deleteCompetition/:competition_index", managerController.deleteCompetition);

export default router;