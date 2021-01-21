import { Router } from 'express';
import loggingController from '../../controller/logging/loggingController';

const router = Router();

router.get("/fetchResult/:competition_index", loggingController.fetchResult);

export default router;