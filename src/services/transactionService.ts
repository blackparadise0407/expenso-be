import { FilterQuery, SortOrder } from 'mongoose';

import { CreateTransactionDTO } from '@/dto/transactionDto';
import { Transaction, TransactionModel } from '@/models/transactionModel';

export interface TransactionQuery extends PaginateQuery {
  income?: boolean;
  fromDate?: Date;
  toDate?: Date;
  order?: SortOrder;
  orderBy?: keyof Transaction;
  min?: number;
  max?: number;
  categoryId?: string;
}

export const transactionService = {
  create: async (payload: CreateTransactionDTO) => {
    const transaction = new TransactionModel(payload);
    await transaction.save();
    return transaction;
  },
  getAllByUserId: async (
    userId: string,
    queries: TransactionQuery = {
      pageIndex: 1,
      pageSize: 0,
    },
  ) => {
    const filters: FilterQuery<Transaction> = {
      createdById: userId,
    };
    if (queries.categoryId) {
      filters.category = queries.categoryId;
    }
    if (queries.fromDate) {
      filters.transactionDate = { $gte: queries.fromDate };
    }
    if (queries.toDate) {
      filters.transactionDate = { $lte: queries.toDate };
    }
    if (queries.min) {
      filters.amount = { $gte: queries.min };
    }
    if (queries.max) {
      filters.amount = { $lte: queries.max };
    }
    if (queries.income !== undefined) {
      filters.income = queries.income;
    }

    const sort: { [key: string]: SortOrder } = {};
    if (queries.orderBy) {
      sort[queries.orderBy] = queries.order ?? 'desc';
    }

    return TransactionModel.paginate(filters, {
      page: queries.pageIndex,
      limit: queries.pageSize,
      sort,
    });
  },
};
