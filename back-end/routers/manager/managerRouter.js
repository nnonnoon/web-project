import { Router } from 'express';
import managerController from '../../controller/manager/managerController';

const router = Router();

router.post("/addCompetition", managerController.addCompetition);
router.get("/fetchCompetition/:competition_index", managerController.fetchCompetition);
router.get("/fetchAllCompetition", managerController.fetchAllCompetition);
router.patch("/updateCompetition/:competition_index", managerController.updateCompetition);
router.delete("/deleteCompetition/:competition_index", managerController.deleteCompetition);

router.post("/addUser", managerController.addUser);
router.get("/fetchUser/:user_index", managerController.fetchUser);
router.get("/fetchAllUser/:competition_index", managerController.fetchAllUser);
router.patch("/updateUser/:user_index", managerController.updateUser);
router.post("/deleteUser/:user_index", managerController.deleteUser);
router.post("/uploadUsers", managerController.uploadUsers);

router.post("/addGate", managerController.addGate);
router.post("/fetchGate/:gate_index", managerController.fetchGate);
router.get("/fetchAllGate/:competition_index", managerController.fetchAllGate);
router.patch("/updateGate/:gate_index", managerController.updateGate);
router.delete("/deleteGate/:gate_index", managerController.deleteGate);

router.post("/checkGateNo", managerController.checkGateNo);
router.post("/checkGateIP", managerController.checkGateIP);

export default router;