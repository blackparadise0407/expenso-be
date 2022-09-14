import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { Transaction } from '@/models/transaction.model';

type ICreateTransactionDTO = Pick<
  Transaction,
  | 'name'
  | 'amount'
  | 'createdById'
  | 'transactionDate'
  | 'income'
  | 'description'
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

  @IsNumber()
  transactionDate: number;

  @IsNotEmpty()
  name: string;

  @IsMongoId()
  category: string;

  @IsString()
  @IsOptional()
  description: string;
}
