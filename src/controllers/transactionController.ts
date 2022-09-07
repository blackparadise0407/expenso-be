import { validate } from 'class-validator';

import { catchAsync } from '@/common/helpers/catchAsync';
import { CreateTransactionDTO } from '@/dto/transactionDto';
import { transactionService } from '@/services/transactionService';

export const transactionController = {
  get: catchAsync((req, res) => {
    res.send('a');
  }),
  create: catchAsync(async (req, res) => {
    const createTransaction = new CreateTransactionDTO();

    createTransaction.amount = req.body.amount;
    createTransaction.createdById = req.auth?.payload.sub ?? '';
    createTransaction.name = req.body.name;
    createTransaction.transactionDate = req.body.transactionDate;

    const err = await validate(createTransaction);
    if (err.length) {
      throw err;
    }

    const transaction = await transactionService.create(createTransaction);

    res.json(transaction);
  }),
};
