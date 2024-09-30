import { Router } from 'express';
import { LeituraController } from '../controllers/leituraController';

const router = Router();
const leituraController = new LeituraController();

router.post('/upload', leituraController.upload);
router.patch('/confirm', leituraController.confirm);
router.get('/:customerCode/list', leituraController.list);

export default router;