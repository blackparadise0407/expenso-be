import express from 'express';

import categoryApi from './categoryRoute';

const router = express.Router();

router.use('/categories', categoryApi);

export default router;
