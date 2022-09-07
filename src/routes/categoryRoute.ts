import express from 'express';

import { categoryController } from '@/controllers/categoryController';

const router = express.Router();

router.get('/', categoryController.get);
router.post('/', categoryController.create);

export default router;
