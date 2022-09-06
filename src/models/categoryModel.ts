import { model, Schema } from 'mongoose';

interface Category {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
}

const schema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    imgUrl: {
      type: String,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    virtuals: true,
  },
);

export const CategoryModel = model('Category', schema);
