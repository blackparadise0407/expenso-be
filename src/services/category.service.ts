import { CreateCategoryDTO } from '@/dto/category.dto';
import { CategoryModel } from '@/models/category.model';

export const categoryService = {
  createCategory: async (payload: CreateCategoryDTO) => {
    const category = new CategoryModel(payload);
    await category.save();
    return category;
  },
  getAllByUserId: (userId: string) => {
    return CategoryModel.find({ createdById: userId }).sort({ name: 1 });
  },
};
