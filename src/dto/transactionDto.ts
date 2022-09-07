import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Transaction } from '@/models/transactionModel';

type ICreateTransactionDTO = Pick<
  Transaction,
  'name' | 'amount' | 'createdById' | 'transactionDate'
>;

export class CreateTransactionDTO implements ICreateTransactionDTO {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  createdById: string;

  @IsDateString()
  transactionDate: Date;

  @IsNotEmpty()
  name: string;
}
