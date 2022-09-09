import {
  IsBoolean,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transaction } from '@/models/transaction.model';

type ICreateTransactionDTO = Pick<
  Transaction,
  'name' | 'amount' | 'createdById' | 'transactionDate' | 'income'
>;

export class CreateTransactionDTO implements ICreateTransactionDTO {
  @IsBoolean()
  @IsOptional()
  income: boolean;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  createdById: string;

  @IsDateString()
  transactionDate: Date;

  @IsNotEmpty()
  name: string;

  @IsMongoId()
  category: string;
}
