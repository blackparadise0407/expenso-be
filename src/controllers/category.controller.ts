import { validate } from 'class-validator';

import { catchAsync } from '@/common/helpers/catchAsync';
import { CreateCategoryDTO } from '@/dto/category.dto';
import { categoryService } from '@/services/category.service';

export const categoryController = {
  get: catchAsync(async (req, res) => {
    const categories = await categoryService.getAllByUserId(
      req.auth?.payload.sub ?? '',
    );
    res.json(categories);
  }),
  create: catchAsync(async (req, res) => {
    const createCategory = new CreateCategoryDTO();
    createCategory.name = req.body.name;
    createCategory.description = req.body.description;
    createCategory.imgUrl = req.body.imgUrl;
    createCategory.createdById = req.auth?.payload.sub ?? '';

    const err = await validate(createCategory);

    if (err.length) {
      throw err;
    }

    const category = await categoryService.createCategory(createCategory);

    res.json(category);
  }),
};
