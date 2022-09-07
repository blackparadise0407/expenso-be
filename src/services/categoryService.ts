import { CreateCategoryDTO } from '@/dto/categoryDto';
import { CategoryModel } from '@/models/categoryModel';

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
