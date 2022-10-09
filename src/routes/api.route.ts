import express from 'express';

import { checkJwt } from '@/common/middlewares/auth.middleware';

import categoryApi from './category.route';
import transactionApi from './transaction.route';

const router = express.Router();

router.get('/ping', (_, res) => {
  res.send('Pong');
});
router.use('/categories', checkJwt, categoryApi);
router.use('/transactions', checkJwt, transactionApi);

export default router;
