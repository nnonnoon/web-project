import { Router } from 'express';
import loggingController from '../../controller/logging/loggingController';

const router = Router();

router.get("/fetchResult/:competition_index", loggingController.fetchResult);
router.get("/fetchResultDetail/:competition_index/user=:user_index", loggingController.fetchResultDetail);

export default router;