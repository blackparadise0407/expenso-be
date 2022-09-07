import { CreateTransactionDTO } from '@/dto/transactionDto';
import { TransactionModel } from '@/models/transactionModel';

export const transactionService = {
  create: async (payload: CreateTransactionDTO) => {
    const transaction = new TransactionModel(payload);
    await transaction.save();
    return transaction;
  },
};
