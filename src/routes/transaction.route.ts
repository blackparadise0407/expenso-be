import express from 'express';

import { transactionController } from '@/controllers/transaction.controller';

const router = express.Router();

router.get('/', transactionController.get);
router.post('/', transactionController.create);

export default router;