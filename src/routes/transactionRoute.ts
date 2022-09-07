import express from 'express';

import { transactionController } from '@/controllers/transactionController';

const router = express.Router();

router.get('/', transactionController.get);
router.post('/', transactionController.create);

export default router;
