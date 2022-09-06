import express from 'express';

import { categoryController } from '@/controllers/categoryController';

const router = express.Router();

router.get('/', categoryController.a);

export default router;
