import express from 'express';

import { categoryController } from '@/controllers/category.controller';

const router = express.Router();

router.get('/', categoryController.get);
router.post('/', categoryController.create);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;
