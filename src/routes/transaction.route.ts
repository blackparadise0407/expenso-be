import express from 'express';

import { checkPermissions } from '@/common/middlewares/auth.middleware';
import { transactionController } from '@/controllers/transaction.controller';

const router = express.Router();

router.get(
  '/',
  checkPermissions('read:transactions'),
  transactionController.get,
);
router.post('/', transactionController.create);
router.get('/analytics', transactionController.getAnalytic);
router.delete('/:id', transactionController.delete);

export default router;
