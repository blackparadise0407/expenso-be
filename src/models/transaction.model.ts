import { Document, model, PaginateModel, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { Category } from './category.model';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  createdById: string;
  transactionDate: number;
  income: boolean;
  category: Category;
}

export type TransactionDocument = Document & Transaction;

const schema = new Schema<Transaction>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    transactionDate: {
      type: Number,
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

schema.plugin(mongoosePaginate);

export const TransactionModel = model<
  TransactionDocument,
  PaginateModel<TransactionDocument>
>('Transaction', schema);
