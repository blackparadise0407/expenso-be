import express from 'express';

import { transactionController } from '@/controllers/transaction.controller';

const router = express.Router();

router.get('/', transactionController.get);
router.post('/', transactionController.create);
router.get('/analytics', transactionController.getAnalytic);
router.delete('/:id', transactionController.delete);

export default router;
