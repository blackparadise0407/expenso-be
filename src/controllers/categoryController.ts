import { validate } from 'class-validator';

import { catchAsync } from '@/common/helpers/catchAsync';
import { CreateCategoryDTO } from '@/dto/categoryDto';
import { categoryService } from '@/services/categoryService';

export const categoryController = {
  get: catchAsync((req, res) => {
    res.send('a');
  }),
  create: catchAsync(async (req, res) => {
    const createCategory = new CreateCategoryDTO();
    createCategory.name = req.body.name;

    const err = await validate(createCategory);

    if (err.length) {
      throw err;
    }

    const category = await categoryService.createCategory(createCategory);

    res.json(category);
  }),
};
