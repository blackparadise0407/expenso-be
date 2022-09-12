import { FilterQuery, PipelineStage, SortOrder } from 'mongoose';

import { CreateTransactionDTO } from '@/dto/transaction.dto';
import { Transaction, TransactionModel } from '@/models/transaction.model';

export interface TransactionQuery {
  income?: boolean;
  fromDate?: Date;
  toDate?: Date;
  order?: SortOrder;
  orderBy?: keyof Transaction;
  min?: number;
  max?: number;
  categoryId?: string;
}

export type PaginatedTransactionQuery = PaginateQuery & TransactionQuery;

export const transactionService = {
  create: async (payload: CreateTransactionDTO) => {
    const transaction = new TransactionModel(payload);
    await transaction.save();
    return transaction;
  },
  getAllByUserId: async (
    userId: string,
    queries: PaginatedTransactionQuery = {
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
      filters.transactionDate = {
        $gte: queries.fromDate,
      };
    }
    if (queries.toDate) {
      filters.transactionDate = {
        ...filters.transactionDate,
        $lte: queries.toDate,
      };
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
      sort[queries.orderBy === 'name' ? 'lowerName' : queries.orderBy] =
        queries.order ?? 'desc';
    }

    return TransactionModel.paginate(filters, {
      page: queries.pageIndex,
      limit: queries.pageSize,
      sort,
    });
  },
  getAnalyticsByUserId: (userId: string, queries: TransactionQuery) => {
    const matchStage: PipelineStage = {
      $match: {
        createdById: userId,
      },
    };
    if (queries.fromDate) {
      matchStage.$match.transactionDate = {
        $gte: new Date(queries.fromDate),
      };
    }
    if (queries.toDate) {
      matchStage.$match.transactionDate = {
        ...matchStage.$match.transactionDate,
        $lte: new Date(queries.toDate),
      };
    }
    return TransactionModel.aggregate([
      matchStage,
      {
        $group: {
          _id: {
            $add: [
              { $dayOfYear: '$transactionDate' },
              { $multiply: [400, { $year: '$transactionDate' }] },
            ],
          },
          first: { $min: '$transactionDate' },
          transactions: { $push: '$$ROOT' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          transactionDate: '$first',
          transactions: {
            _id: 1,
            name: 1,
            amount: 1,
            transactionDate: 1,
            income: 1,
          },
          _id: 0,
        },
      },
    ]);
  },
};
