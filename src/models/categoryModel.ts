import { model, Schema } from 'mongoose';

interface Category {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  createdById: string;
}

const schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
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

export const CategoryModel = model('Category', schema);
