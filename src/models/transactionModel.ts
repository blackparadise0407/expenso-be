import { model, Schema } from 'mongoose';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  createdById: string;
  transactionDate: Date;
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
  },
  {
    versionKey: false,
    timestamps: true,
    virtuals: true,
  },
);

export const TransactionModel = model('Transaction', schema);
