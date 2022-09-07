import { model, Schema } from 'mongoose';

import { Category } from './categoryModel';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  createdById: string;
  transactionDate: Date;
  income: boolean;
  category: Category;
}

const schema = new Schema<Transaction>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    transactionDate: {
      type: Date,
      required: true,
      index: -1,
    },
    amount: {
      type: Number,
      default: 0,
    },
    createdById: {
      type: String,
      default: '',
      index: true,
    },
    income: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

schema.set('toJSON', {
  virtuals: true,
});

export const TransactionModel = model('Transaction', schema);
