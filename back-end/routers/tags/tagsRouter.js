import { Router } from 'express';
import tagsController from '../../controller/tags/tagsController';

const router = Router();

router.get("/fetchTags", tagsController.fetchTags);
router.post("/addTags", tagsController.addTags)

export default router;