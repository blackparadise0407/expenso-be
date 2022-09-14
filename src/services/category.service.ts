import { BadRequestException } from '@/common/exceptions/BadRequestException';
import { ForbiddenException } from '@/common/exceptions/ForbiddenException';
import { NotFoundException } from '@/common/exceptions/NotFoundException';
import { CreateCategoryDTO } from '@/dto/category.dto';
import { Category, CategoryModel } from '@/models/category.model';
import { TransactionModel } from '@/models/transaction.model';

export const categoryService = {
  createCategory: async (payload: CreateCategoryDTO) => {
    const category = new CategoryModel(payload);
    await category.save();
    return category;
  },
  getAllByUserId: (userId: string) => {
    return CategoryModel.find({ createdById: userId }).sort({ name: 1 });
  },
  updateById: async (userId: string, payload: Partial<Category>) => {
    const foundCategory = await CategoryModel.findById(payload.id);
    if (!foundCategory) {
      throw new NotFoundException();
    }
    if (userId !== foundCategory.createdById) {
      throw new ForbiddenException();
    }
    foundCategory.set(payload);
    return await foundCategory.save();
  },
  deleteById: async (
    userId: string,
    categoryId: string,
    forcedDelete = false,
  ) => {
    const foundCategory = await CategoryModel.findById(categoryId);
    if (!foundCategory) {
      throw new NotFoundException();
    }
    const relatedTransactions = await TransactionModel.exists({
      category: foundCategory,
    });
    if (relatedTransactions && !forcedDelete) {
      throw new BadRequestException(
        'Cannot delete category due to existing transactions that are related to',
      );
    }
    if (relatedTransactions && forcedDelete) {
      await TransactionModel.deleteMany({ category: foundCategory });
    }
    if (userId !== foundCategory.createdById) {
      throw new ForbiddenException();
    }
    await foundCategory.delete();
  },
};
