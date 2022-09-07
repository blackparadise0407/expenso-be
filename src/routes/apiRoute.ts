import express from 'express';

import { checkJwt } from '@/common/middlewares/auth';

import categoryApi from './categoryRoute';
import transactionApi from './transactionRoute';

const router = express.Router();

router.use('/categories', checkJwt, categoryApi);
router.use('/transactions', checkJwt, transactionApi);

export default router;
