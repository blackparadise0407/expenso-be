import { validate } from 'class-validator';

import { catchAsync } from '@/common/helpers/catchAsync';
import { CreateTransactionDTO } from '@/dto/transactionDto';
import { transactionService } from '@/services/transactionService';

export const transactionController = {
  get: catchAsync(async (req, res) => {
    const transactions = await transactionService.getAllByUserId(
      req.auth?.payload.sub ?? '',
      req.query,
    );
    res.json(transactions);
  }),
  create: catchAsync(async (req, res) => {
    const createTransaction = new CreateTransactionDTO();

    createTransaction.amount = req.body.amount;
    createTransaction.createdById = req.auth?.payload.sub ?? '';
    createTransaction.name = req.body.name;
    createTransaction.transactionDate = req.body.transactionDate;
    createTransaction.category = req.body.category;

    const err = await validate(createTransaction);
    if (err.length) {
      throw err;
    }

    const transaction = await transactionService.create(createTransaction);

    res.json(transaction);
  }),
};
